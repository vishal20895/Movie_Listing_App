<script>
  import { movies } from '$lib/stores/movies';
//   import { tmdb } from '$lib/services/tmdb';
  import { tmdb } from '$lib/services/tmbd';

  let searchQuery = '';
  let debounceTimer;

  const handleSearch = async (e) => {
    searchQuery = e.target.value;
    clearTimeout(debounceTimer);

    movies.updateFilter('searchQuery', searchQuery);

    if (searchQuery.trim().length > 2) {
      debounceTimer = setTimeout(async () => {
        try {
          movies.setLoading(true);
          const results = await tmdb.searchMovies(searchQuery);
          movies.setMovies(results);
        } catch (err) {
          movies.setError(err.message);
        }
      }, 500);
    }
  };
</script>

<div class="search-bar">
  <input
    type="text"
    placeholder="Search movies..."
    value={searchQuery}
    on:input={handleSearch}
    class="search-input"
  />
</div>

<style>
  .search-bar {
    margin: 2rem 0;
  }

  .search-input {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    transition: border-color 0.3s;
  }

  .search-input:focus {
    outline: none;
    border-color: #667eea;
  }
</style>
