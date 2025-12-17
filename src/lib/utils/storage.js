// Centralized wrapper around localStorage to ensure safe JSON handling
export const storage = {
  // Reads and parses stored JSON value, returns null on failure
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },

  // Serializes and stores value, returns success status
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  // Removes a single key from storage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  // Clears all stored data (used on logout or reset)
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  }
};
