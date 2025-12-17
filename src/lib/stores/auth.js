import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createAuthStore() {
  const { subscribe, set, update } = writable({
    user: null,
    isLoggedIn: false,
    token: null
  });

  return {
    subscribe,
    
    signup: (email, password, username) => {
      if (!email || !password || !username) {
        throw new Error('All fields required');
      }
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) {
        throw new Error('Email already exists');
      }

      const user = { id: Date.now(), email, password, username };
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      const token = btoa(JSON.stringify({ id: user.id, email }));
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));

      set({ user, isLoggedIn: true, token });
    },

    login: (email, password) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const token = btoa(JSON.stringify({ id: user.id, email }));
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));

      set({ user, isLoggedIn: true, token });
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      set({ user: null, isLoggedIn: false, token: null });
    },

    hydrate: () => {
      if (browser) {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        
        if (token && user) {
          set({ user, isLoggedIn: true, token });
        }
      }
    }
  };
}

export const auth = createAuthStore();
