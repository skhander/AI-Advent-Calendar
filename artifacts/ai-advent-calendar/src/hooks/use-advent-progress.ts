import { useCallback, useState } from 'react';

const STORAGE_KEY = 'ai-advent-calendar-opened-v1';

function readProgress(): number[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter((value): value is number => Number.isInteger(value) && value >= 1 && value <= 9) : [];
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