'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'life-os-state-v1';

export const defaultState = {
  completedScores: {}, // { [assessmentName]: score }
  lifeStage: null, // 'foundation' | 'building' | 'leading' | 'transition'
  goalsByArea: {}, // { [dimName]: [{ statement, start, end, actions:[{text, log:[iso...]}] }] }
  visionTexts: {}, // { [dimName]: string }
  visionImages: {}, // { [slotId]: dataUrl }
  oneLiners: {}, // { [slotId]: string }
  visionYear: '2026',
  visionView: 'edit', // 'edit' | 'poster'
};

const LifeOSStateContext = createContext(null);

export function LifeOSStateProvider({ children }) {
  const [state, setState] = useState(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setState((s) => ({ ...s, ...JSON.parse(raw) }));
      }
    } catch (err) {
      console.warn('Failed to load saved Life OS data', err);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Failed to save Life OS data', err);
    }
  }, [state, hydrated]);

  const update = useCallback((patch) => {
    setState((s) => (typeof patch === 'function' ? { ...s, ...patch(s) } : { ...s, ...patch }));
  }, []);

  const resetAll = useCallback(() => {
    setState(defaultState);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <LifeOSStateContext.Provider value={{ state, update, resetAll, hydrated }}>
      {children}
    </LifeOSStateContext.Provider>
  );
}

export function useLifeOSState() {
  const ctx = useContext(LifeOSStateContext);
  if (!ctx) throw new Error('useLifeOSState must be used within LifeOSStateProvider');
  return ctx;
}
