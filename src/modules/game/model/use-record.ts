import { useEffect, useState } from 'react';
import { RECORD_STORAGE_KEY } from './constants';

export const useRecord = (score: number) => {
  const [savedRecord, setSavedRecord] = useState(() => {
    try {
      const value = Number(localStorage.getItem(RECORD_STORAGE_KEY));
      return value > 0 ? value : 0;
    } catch {
      return 0;
    }
  });
  const record = Math.max(savedRecord, score);

  useEffect(() => {
    if (score <= savedRecord) return;
    setSavedRecord(score);
    try {
      localStorage.setItem(RECORD_STORAGE_KEY, String(score));
    } catch {}
  }, [score, savedRecord]);

  return record;
};
