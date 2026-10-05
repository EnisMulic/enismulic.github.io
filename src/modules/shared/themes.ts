// Themes in the nav's theme menu, in menu order; the first is the default. Each id needs a matching
// :root[data-theme='<id>'] block of colors in Layout.astro. `icon` is the inner markup of a 24x24 stroke icon.
// `season` is a ['MM-DD', 'MM-DD'] range, inclusive and in the visitor's local time, when the theme replaces the
// default for anyone who hasn't picked a theme themselves. A range may wrap the new year, like ['12-20', '01-06'].
// `locked` themes only show in the menu once the visitor has unlocked the secret page, except while they're in season
// or in use; their season still applies to everyone.
export interface Theme {
  id: string;
  label: string;
  icon: string;
  season?: [string, string];
  locked?: boolean;
}

export const themes: Theme[] = [
  {
    id: 'dark',
    label: 'Dark',
    icon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  },
  {
    id: 'light',
    label: 'Light',
    icon: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
  },
  {
    id: 'halloween',
    label: 'Halloween',
    season: ['10-01', '10-31'],
    locked: true,
    icon: '<path d="M12 7V4a2 2 0 0 1 2-2"/><path d="M12 7c-2.5-1.5-6-1-8 1.5s-2 7 0 10 5.5 3.5 8 2c2.5 1.5 6 1 8-2s2-7.5 0-10-5.5-3-8-1.5z"/><path d="M12 7c-1.5 2.5-1.5 11 0 13.5"/>',
  },
  {
    id: 'christmas',
    label: 'Christmas',
    season: ['12-01', '12-31'],
    locked: true,
    icon: '<path d="M12 2l-5 7h3l-4 6h4l-4 5h12l-4-5h4l-4-6h3z"/><line x1="12" y1="20" x2="12" y2="23"/>',
  },
  {
    // My birthday
    id: 'me',
    label: 'Me',
    season: ['06-23', '06-23'],
    locked: true,
    icon: '<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3M12 8v3M17 8v3"/><path d="M7 4h.01M12 4h.01M17 4h.01"/>',
  },
];
