<script>
  import { movies } from '$lib/stores/movies';
  import { tmdb } from '$lib/services/tmbd';

  // Local search text, used to control input and debounce logic
  let searchQuery = '';

  // Timer reference to prevent firing API calls on every keystroke
  let debounceTimer;

  // Handles user input and triggers debounced movie search
  const handleSearch = async (e) => {
    searchQuery = e.target.value;

    // Clear previous timer to ensure only latest input triggers search
    clearTimeout(debounceTimer);

    // Persist search term in global store for consistency across components
    movies.updateFilter('searchQuery', searchQuery);

    // Avoid unnecessary API calls for very short queries
    if (searchQuery.trim().length > 2) {
      debounceTimer = setTimeout(async () => {
        try {
          movies.setLoading(true);

          // Fetch movies matching the search query
          const results = await tmdb.searchMovies(searchQuery);
          movies.setMovies(results);
        } catch (err) {
          movies.setError(err.message);
        }
      }, 500);
    }
  };
</script>

<div class="my-8">
  <input
    type="text"
    placeholder="Search movies..."
    value={searchQuery}
    on:input={handleSearch}
    class="w-full p-4 text-base border-2 border-gray-200 rounded-lg
           focus:outline-none focus:border-indigo-500 transition-colors"
  />
</div>
