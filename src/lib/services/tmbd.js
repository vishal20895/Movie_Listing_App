const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

console.log('API Key loaded:', API_KEY ? 'Yes' : 'No');

// Helper function for API requests
async function apiCall(endpoint, params = {}) {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params
  });

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;
  
  console.log('Fetching:', url);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Response:', errorData);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('TMDb API Error:', error);
    throw error;
  }
}

export const tmdb = {
  // Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const data = await apiCall('/movie/popular', { page });
      return data.results || [];
    } catch (error) {
      console.error('getPopularMovies error:', error);
      return [];
    }
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const data = await apiCall('/search/movie', { query, page });
      return data.results || [];
    } catch (error) {
      console.error('searchMovies error:', error);
      return [];
    }
  },

  // Get movie details with credits and videos
  getMovieDetails: async (id) => {
    try {
      const data = await apiCall(`/movie/${id}`, {
        append_to_response: 'credits,videos'
      });
      return data;
    } catch (error) {
      console.error('getMovieDetails error:', error);
      return null;
    }
  },

  // Get all genres
  getGenres: async () => {
    try {
      const data = await apiCall('/genre/movie/list');
      return data.genres || [];
    } catch (error) {
      console.error('getGenres error:', error);
      return [];
    }
  },

  // Get movies by genre with filters
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

  // Get image URL for poster/backdrop
  getImageUrl: (path, size = 'w500') => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}${path}`;
  }
};