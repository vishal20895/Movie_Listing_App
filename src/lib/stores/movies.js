import { writable, derived } from 'svelte/store';

function createMoviesStore() {
  const { subscribe, set, update } = writable({
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

    setMovies: (movies) => {
      update(state => ({ ...state, movies, loading: false }));
    },

    setLoading: (loading) => {
      update(state => ({ ...state, loading }));
    },

    setError: (error) => {
      update(state => ({ ...state, error, loading: false }));
    },

    updateFilter: (key, value) => {
      update(state => ({
        ...state,
        filters: { ...state.filters, [key]: value }
      }));
    },

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

// Derived store for filtered movies
export const filteredMovies = derived(movies, $movies => {
  let filtered = $movies.movies;

  if ($movies.filters.searchQuery) {
    filtered = filtered.filter(m =>
      m.title.toLowerCase().includes($movies.filters.searchQuery.toLowerCase())
    );
  }

  if ($movies.filters.genre) {
    filtered = filtered.filter(m =>
      m.genre_ids?.includes($movies.filters.genre)
    );
  }

  if ($movies.filters.year) {
    filtered = filtered.filter(m =>
      new Date(m.release_date).getFullYear() === parseInt($movies.filters.year)
    );
  }

  if ($movies.filters.rating > 0) {
    filtered = filtered.filter(m => m.vote_average >= $movies.filters.rating);
  }

  return filtered;
});