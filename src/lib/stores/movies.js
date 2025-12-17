import { writable, derived } from 'svelte/store';

// Movies store is the single source of truth for movie data and filters
function createMoviesStore() {
  const { subscribe, update } = writable({
    movies: [],
    loading: false,
    error: null,
    filters: {
      genre: null,
      year: null,
      rating: 0,
      searchQuery: ''
    }
  });

  return {
    subscribe,

    // Replaces movie list after API calls and clears loading state
    setMovies: (movies) => {
      update(state => ({ ...state, movies, loading: false }));
    },

    // Controls global loading indicator during async operations
    setLoading: (loading) => {
      update(state => ({ ...state, loading }));
    },

    // Stores error and ensures loading state is cleared
    setError: (error) => {
      update(state => ({ ...state, error, loading: false }));
    },

    // Updates individual filter values without affecting others
    updateFilter: (key, value) => {
      update(state => ({
        ...state,
        filters: { ...state.filters, [key]: value }
      }));
    },

    // Resets all filters back to initial defaults
    resetFilters: () => {
      update(state => ({
        ...state,
        filters: {
          genre: null,
          year: null,
          rating: 0,
          searchQuery: ''
        }
      }));
    }
  };
}

export const movies = createMoviesStore();

// Applies client-side filtering based on current filter state
export const filteredMovies = derived(movies, ($movies) => {
  let filtered = $movies.movies;

  // Text search is applied first to reduce dataset size early
  if ($movies.filters.searchQuery) {
    filtered = filtered.filter(m =>
      m.title
        .toLowerCase()
        .includes($movies.filters.searchQuery.toLowerCase())
    );
  }

  // Genre filter matches TMDB genre ids
  if ($movies.filters.genre) {
    filtered = filtered.filter(m =>
      m.genre_ids?.includes($movies.filters.genre)
    );
  }

  // Year filter is derived from release date
  if ($movies.filters.year) {
    filtered = filtered.filter(m =>
      new Date(m.release_date).getFullYear() ===
      parseInt($movies.filters.year)
    );
  }

  // Rating filter acts as a minimum threshold
  if ($movies.filters.rating > 0) {
    filtered = filtered.filter(
      m => m.vote_average >= $movies.filters.rating
    );
  }

  return filtered;
});
