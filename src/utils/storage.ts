/**
 * Storage Utility
 * Provides safe, centralized access to localStorage operations
 */

const STORAGE_KEYS = {
  TASKS: "hintro_kanban_tasks",
  ACTIVITIES: "hintro_activities",
  AUTH_TOKEN: "hintro_auth_token",
  SAVED_EMAIL: "hintro_saved_email",
  REMEMBER_ME: "hintro_remember_me",
} as const;

function isLocalStorageAvailable(): boolean {
  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function saveToStorage<T>(key: string, data: T): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Failed to save to storage (${key}):`, error);
    return false;
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (!isLocalStorageAvailable()) {
    return fallback;
  }
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Failed to load from storage (${key}):`, error);
    return fallback;
  }
}

export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to remove from storage (${key}):`, error);
    return false;
  }
}

export function clearAllStorage(): boolean {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error("Failed to clear storage:", error);
    return false;
  }
}

export { STORAGE_KEYS };
