import { setting } from './content';

type NotionProperty = { type: string; [key: string]: any };
export type NotionPage = { id: string; properties: Record<string, NotionProperty> };

const notionToken = () => setting('NOTION_API_TOKEN', 'the Notion widgets');

// All rows of a data source, oldest first, following pagination.
export async function notionRows(dataSourceId: string): Promise<NotionPage[]> {
  const token = notionToken();
  if (!token) return [];
  const rows: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_size: 100,
        start_cursor: cursor,
        sorts: [{ timestamp: 'created_time', direction: 'ascending' }],
      }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(`Notion query for ${dataSourceId} failed (${res.status}): ${body.message}`);
    rows.push(...body.results);
    cursor = body.has_more ? body.next_cursor : undefined;
  } while (cursor);
  return rows;
}

// Reads a property as text, whatever its type (columns may be text, number, URL or select).
export function text(page: NotionPage, name: string): string | undefined {
  const p = page.properties[name];
  if (!p) return undefined;
  const value = p[p.type];
  let out: string | undefined;
  if (p.type === 'title' || p.type === 'rich_text') out = value.map((t: { plain_text: string }) => t.plain_text).join('');
  else if (p.type === 'select' || p.type === 'status') out = value?.name;
  else if (value !== null && value !== undefined) out = String(value);
  return out?.trim() || undefined;
}

export const number = (page: NotionPage, name: string) => {
  const t = text(page, name);
  return t ? Number(t) : undefined;
};
