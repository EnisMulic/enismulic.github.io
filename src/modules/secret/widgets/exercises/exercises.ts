// Personal records and goals for the secret page, in the order shown, updated by hand.
// Lifts are in kg; runs are times as 'm:ss', where lower is better.
export interface Exercise {
  label: string;
  pr: number | string;
  goal: number | string;
  // When the PR was set, as 'YYYY-MM-DD'
  date: string;
}

export const exercises: Exercise[] = [
  { label: 'Bench', pr: 85, goal: 100, date: '2026-05-02' },
  { label: 'Squat', pr: 120, goal: 140, date: '????-??-??' },
  { label: 'Overhead press', pr: 60, goal: 60, date: '2025-08-29' },
  { label: 'Deadlift', pr: 125, goal: 170, date: '????-??-??' },
  { label: '5K', pr: 'NONE', goal: '30:00', date: '????-??-??' },
];
