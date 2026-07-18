'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { hashPassword, randomSalt } from '../lib/auth';

const STORAGE_KEY = 'life-os-account-v1';

const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const [account, setAccount] = useState(null); // { name, email, passwordHash, salt, createdAt } | null
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setAccount(JSON.parse(raw));
    } catch (err) {
      console.warn('Failed to load account', err);
    }
    setHydrated(true);
  }, []);

  const createAccount = useCallback(async ({ name, email, password }) => {
    const salt = randomSalt();
    const passwordHash = await hashPassword(password, salt);
    const acct = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      salt,
      createdAt: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(acct));
    setAccount(acct);
    return acct;
  }, []);

  const verifyCredentials = useCallback(
    async ({ email, password }) => {
      if (!account) return { ok: false, reason: 'no-account' };
      if (email.trim().toLowerCase() !== account.email) return { ok: false, reason: 'no-account' };
      const hash = await hashPassword(password, account.salt);
      if (hash !== account.passwordHash) return { ok: false, reason: 'bad-password' };
      return { ok: true };
    },
    [account]
  );

  const clearAccount = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setAccount(null);
  }, []);

  return (
    <AccountContext.Provider value={{ account, hydrated, createAccount, verifyCredentials, clearAccount }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');
  return ctx;
}
