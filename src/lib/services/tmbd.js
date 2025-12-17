// API key is injected via environment variables to avoid hardcoding secrets
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Base TMDB API URL used by all endpoints
const BASE_URL = 'https://api.themoviedb.org/3';

// Base URL for serving movie images
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Simple sanity check to confirm env configuration
console.log('API Key loaded:', API_KEY ? 'Yes' : 'No');

/**
 * Centralized API helper
 * - Attaches API key automatically
 * - Handles query params
 * - Normalizes error handling
 */
async function apiCall(endpoint, params = {}) {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params
  });

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;
  console.log('Fetching:', url);

  try {
    const response = await fetch(url);

    // TMDB returns useful error text even on failed responses
    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Response:', errorData);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // Errors are logged here and rethrown for callers to handle
    console.error('TMDb API Error:', error);
    throw error;
  }
}

export const tmdb = {
  // Fetches trending popular movies for landing/home page
  getPopularMovies: async (page = 1) => {
    try {
      const data = await apiCall('/movie/popular', { page });
      return data.results || [];
    } catch (error) {
      console.error('getPopularMovies error:', error);
      return [];
    }
  },

  // Searches movies based on user input
  searchMovies: async (query, page = 1) => {
    try {
      const data = await apiCall('/search/movie', { query, page });
      return data.results || [];
    } catch (error) {
      console.error('searchMovies error:', error);
      return [];
    }
  },

  // Fetches full movie details along with credits and trailers
  getMovieDetails: async (id) => {
    try {
      return await apiCall(`/movie/${id}`, {
        append_to_response: 'credits,videos'
      });
    } catch (error) {
      console.error('getMovieDetails error:', error);
      return null;
    }
  },

  // Loads static genre reference data used for filtering
  getGenres: async () => {
    try {
      const data = await apiCall('/genre/movie/list');
      return data.genres || [];
    } catch (error) {
      console.error('getGenres error:', error);
      return [];
    }
  },

  // Discovers movies by genre with popularity-based sorting
  getMoviesByGenre: async (genreId, page = 1) => {
    try {
      const data = await apiCall('/discover/movie', {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc'
      });
      return data.results || [];
    } catch (error) {
      console.error('getMoviesByGenre error:', error);
      return [];
    }
  },

  // Generates full image URL from TMDB image path
  getImageUrl: (path) => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}${path}`;
  }
};
