import { useCallback, useState } from 'react';

const STORAGE_KEY = 'ai-advent-calendar-opened-v4';
const V3_STORAGE_KEY = 'ai-advent-calendar-opened-v3';
const V2_STORAGE_KEY = 'ai-advent-calendar-opened-v2';
const ORIGINAL_STORAGE_KEY = 'ai-advent-calendar-opened-v1';

function readProgress(): number[] {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    const v3 = current === null ? localStorage.getItem(V3_STORAGE_KEY) : null;
    const v2 = current === null && v3 === null ? localStorage.getItem(V2_STORAGE_KEY) : null;
    const original = current === null && v3 === null && v2 === null ? localStorage.getItem(ORIGINAL_STORAGE_KEY) : null;
    const saved = JSON.parse(current ?? v3 ?? v2 ?? original ?? '[]');
    if (!Array.isArray(saved)) return [];
    const valid = saved.filter((value): value is number => Number.isInteger(value) && value >= 1 && value <= 9);
    // Follow lesson concepts as the calendar changes: 1 ↔ 6, then 2 ↔ 3, then 3 ↔ 5.
    const afterFirstMove = original === null ? valid : valid.map(value => value === 1 ? 6 : value === 6 ? 1 : value);
    const afterSecondMove = original === null && v2 === null ? afterFirstMove : afterFirstMove.map(value => value === 2 ? 3 : value === 3 ? 2 : value);
    const opened = current !== null ? afterSecondMove : afterSecondMove.map(value => value === 3 ? 5 : value === 5 ? 3 : value);
    const unique = [...new Set(opened)];
    if (current === null && (v3 !== null || v2 !== null || original !== null)) localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
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