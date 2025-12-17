import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Watchlist store is scoped per user and persisted in localStorage
function createWatchlistStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,

    // Loads persisted watchlist for the logged-in user
    loadWatchlist: (userId) => {
      if (!browser) return;

      const key = `watchlist_${userId}`;
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      set(stored);
    },

    // Adds a movie only if it does not already exist in the watchlist
    addMovie: (userId, movie) => {
      update(list => {
        if (list.some(m => m.id === movie.id)) {
          return list;
        }

        const updated = [...list, movie];

        if (browser) {
          localStorage.setItem(
            `watchlist_${userId}`,
            JSON.stringify(updated)
          );
        }

        return updated;
      });
    },

    // Removes a movie and syncs updated list to persistence
    removeMovie: (userId, movieId) => {
      update(list => {
        const updated = list.filter(m => m.id !== movieId);

        if (browser) {
          localStorage.setItem(
            `watchlist_${userId}`,
            JSON.stringify(updated)
          );
        }

        return updated;
      });
    },

    // Synchronous helper for quick existence checks
    isInWatchlist: (movieId) => {
      let exists = false;

      subscribe(list => {
        exists = list.some(m => m.id === movieId);
      })();

      return exists;
    }
  };
}

export const watchlist = createWatchlistStore();
