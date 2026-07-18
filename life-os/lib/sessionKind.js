// Tracks which identity the *current* session actually authenticated as --
// a real account or the demo fallback -- separately from whether an account
// happens to exist on this device. Without this, "Continue in demo mode"
// after a real account was created would still show the account's name,
// since the account itself never goes away. Lives in sessionStorage so it
// resets naturally when the tab/browser closes, unlike the persistent
// account and app-state data in localStorage.
const KEY = 'life-os-session-kind';

export function setSessionKind(kind) {
  try {
    window.sessionStorage.setItem(KEY, kind);
  } catch {
    // ignore
  }
}

export function getSessionKind() {
  try {
    return window.sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function clearSessionKind() {
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
