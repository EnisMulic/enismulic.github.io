import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { setting } from '../../lib/content';

// The NYT session cookie (NYT-S) of the account whose game stats the secret page shows. It's a login, so keep it secret.
const nytCookie = () => setting('NYT_COOKIE', 'Connections stats');

// One entry, 'stats': lifetime Connections stats from the NYT Games state endpoint.
export const connections = defineCollection({
  loader: async () => {
    const cookie = nytCookie();
    if (!cookie) return [];
    const res = await fetch('https://www.nytimes.com/svc/games/state/connections/latests', {
      headers: { Cookie: `NYT-S=${cookie}`, 'User-Agent': 'Mozilla/5.0' },
    });
    if (!res.ok) throw new Error(`NYT Games stats failed (HTTP ${res.status}); NYT_COOKIE may have expired.`);
    const all = (await res.json()).player?.stats;
    const stats = all?.connections;
    if (!stats) throw new Error('NYT Games stats have no Connections data; NYT_COOKIE may be logged out.');
    return [{
      id: 'stats',
      currentStreak: stats.current_streak,
      maxStreak: stats.max_streak,
      played: stats.puzzles_completed,
      won: stats.puzzles_won,
      lastPlayed: stats.last_played_print_date,
      // Games by mistakes made, 0 to 4; four mistakes loses the game
      mistakes: [0, 1, 2, 3, 4].map(n => stats.mistakes?.[n] ?? 0),
      // Wins solving the purple (hardest) group first, and solving purple, blue, green, yellow in that order
      purpleFirst: all.cxns_prpl_frst?.purple_first_wins ?? 0,
      reverseRainbow: all.cxns_reverse_rainbow?.reverse_rainbow_wins ?? 0,
    }];
  },
  schema: z.object({
    currentStreak: z.number().int(),
    maxStreak: z.number().int(),
    played: z.number().int(),
    won: z.number().int(),
    lastPlayed: z.string().optional(),
    mistakes: z.array(z.number().int()).length(5),
    purpleFirst: z.number().int(),
    reverseRainbow: z.number().int(),
  }),
});
