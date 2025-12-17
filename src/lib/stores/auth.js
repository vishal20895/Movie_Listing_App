import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Auth store manages user session state using localStorage
function createAuthStore() {
  const { subscribe, set } = writable({
    user: null,
    isLoggedIn: false,
    token: null
  });

  return {
    subscribe,

    // Registers a new user and immediately logs them in
    signup: (email, password, username) => {
      if (!email || !password || !username) {
        throw new Error('All fields required');
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');

      if (users.find(u => u.email === email)) {
        throw new Error('Email already exists');
      }

      const user = {
        id: Date.now(),
        email,
        password,
        username
      };

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      const token = btoa(JSON.stringify({ id: user.id, email }));

      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));

      set({ user, isLoggedIn: true, token });
    },

    // Authenticates existing user against stored credentials
    login: (email, password) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const user = users.find(
        u => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const token = btoa(JSON.stringify({ id: user.id, email }));

      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));

      set({ user, isLoggedIn: true, token });
    },

    // Clears session data and resets auth state
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      set({ user: null, isLoggedIn: false, token: null });
    },

    // Restores auth state on client refresh (SSR-safe)
    hydrate: () => {
      if (!browser) return;

      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

      if (token && user) {
        set({ user, isLoggedIn: true, token });
      }
    }
  };
}

export const auth = createAuthStore();
