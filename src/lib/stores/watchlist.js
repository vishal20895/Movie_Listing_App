import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createWatchlistStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,

    loadWatchlist: (userId) => {
      if (browser) {
        const key = `watchlist_${userId}`;
        const stored = JSON.parse(localStorage.getItem(key) || '[]');
        set(stored);
      }
    },

    addMovie: (userId, movie) => {
      update(list => {
        if (!list.find(m => m.id === movie.id)) {
          const updated = [...list, movie];
          if (browser) {
            localStorage.setItem(`watchlist_${userId}`, JSON.stringify(updated));
          }
          return updated;
        }
        return list;
      });
    },

    removeMovie: (userId, movieId) => {
      update(list => {
        const updated = list.filter(m => m.id !== movieId);
        if (browser) {
          localStorage.setItem(`watchlist_${userId}`, JSON.stringify(updated));
        }
        return updated;
      });
    },

    isInWatchlist: (movieId) => {
      let inList = false;
      subscribe(list => {
        inList = list.some(m => m.id === movieId);
      })();
      return inList;
    }
  };
}

export const watchlist = createWatchlistStore();