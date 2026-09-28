import { useCallback, useState } from 'react';

const STORAGE_KEY = 'ai-advent-calendar-opened-v2';
const PREVIOUS_STORAGE_KEY = 'ai-advent-calendar-opened-v1';

function readProgress(): number[] {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    const previous = current === null ? localStorage.getItem(PREVIOUS_STORAGE_KEY) : null;
    const saved = JSON.parse(current ?? previous ?? '[]');
    if (!Array.isArray(saved)) return [];
    const valid = saved.filter((value): value is number => Number.isInteger(value) && value >= 1 && value <= 9);
    // Doors 1 and 6 exchanged lessons. Keep each visited concept marked open.
    const opened = previous === null ? valid : valid.map(value => value === 1 ? 6 : value === 6 ? 1 : value);
    const unique = [...new Set(opened)];
    if (previous !== null) localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
    return unique;
  } catch {
    return [];
  }
}

export function useAdventProgress() {
  const [opened, setOpened] = useState<number[]>(readProgress);

  const openDoor = useCallback((number: number) => {
    setOpened(previous => {
      if (previous.includes(number)) return previous;
      const next = [...previous, number];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Browsing without storage still works. */ }
      return next;
    });
  }, []);

  return { opened, openDoor };
}