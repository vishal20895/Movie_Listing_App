<script>
  import { movies } from '$lib/stores/movies';
  import { onMount } from 'svelte';
   import { tmdb } from '$lib/services/tmbd';

  let genres = [];
  let selectedGenre = '';
  let selectedYear = '';
  let selectedRating = 0;

  onMount(async () => {
    try {
      genres = await tmdb.getGenres();
    } catch (err) {
      console.error('Failed to load genres:', err);
    }
  });

  const handleGenreChange = (e) => {
    selectedGenre = e.target.value;
    movies.updateFilter('genre', selectedGenre ? parseInt(selectedGenre) : null);
  };

  const handleYearChange = (e) => {
    selectedYear = e.target.value;
    movies.updateFilter('year', selectedYear ? selectedYear : null);
  };

  const handleRatingChange = (e) => {
    selectedRating = parseFloat(e.target.value);
    movies.updateFilter('rating', selectedRating);
  };

  const resetFilters = () => {
    selectedGenre = '';
    selectedYear = '';
    selectedRating = 0;
    movies.resetFilters();
  };
</script>

<div class="filters">
  <div class="filter-group">
    <label for="genre">Genre:</label>
    <select id="genre" value={selectedGenre} on:change={handleGenreChange}>
      <option value="">All Genres</option>
      {#each genres as genre}
        <option value={genre.id}>{genre.name}</option>
      {/each}
    </select>
  </div>

  <div class="filter-group">
    <label for="year">Year:</label>
    <input
      id="year"
      type="number"
      min="1900"
      max={new Date().getFullYear()}
      value={selectedYear}
      on:change={handleYearChange}
      placeholder="Select year"
    />
  </div>

  <div class="filter-group">
    <label for="rating">Min Rating: {selectedRating.toFixed(1)}</label>
    <input
      id="rating"
      type="range"
      min="0"
      max="10"
      step="0.5"
      value={selectedRating}
      on:change={handleRatingChange}
    />
  </div>

  <button on:click={resetFilters} class="btn-reset">Reset Filters</button>
</div>

<style>
  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1.5rem;
    background: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }

  select, input[type="number"], input[type="range"] {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.95rem;
  }

  select:focus, input[type="number"]:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }

  .btn-reset {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s;
  }

  .btn-reset:hover {
    background: #ee5a52;
  }
</style>