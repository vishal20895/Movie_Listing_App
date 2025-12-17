<script>
  import { onMount } from 'svelte';
  import { movies } from '$lib/stores/movies';
  import { tmdb } from '$lib/services/tmbd';

  // Local state for filters
  let genres = [];
  let selectedGenre = '';
  let selectedYear = '';
  let selectedRating = 0;

  // Fetch genres from TMDb on mount
  onMount(async () => {
    try {
      genres = await tmdb.getGenres();
    } catch (err) {
      console.error('Failed to load genres:', err);
    }
  });

  // Update store filters when UI changes
  const handleGenreChange = () => {
    movies.updateFilter('genre', selectedGenre ? parseInt(selectedGenre) : null);
  };

  const handleYearChange = () => {
    movies.updateFilter('year', selectedYear ? parseInt(selectedYear) : null);
  };

  const handleRatingChange = () => {
    movies.updateFilter('rating', selectedRating);
  };

  // Reset all filters
  const resetFilters = () => {
    selectedGenre = '';
    selectedYear = '';
    selectedRating = 0;
    movies.resetFilters();
  };
</script>

<div
  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-100 rounded-lg mb-8"
>
  <!-- Genre Filter -->
  <div class="flex flex-col">
    <label for="genre" class="font-semibold mb-2 text-gray-800">Genre</label>
    <select
      id="genre"
      bind:value={selectedGenre}
      on:change={handleGenreChange}
      class="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <option value="">All Genres</option>
      {#each genres as genre}
        <option value={genre.id}>{genre.name}</option>
      {/each}
    </select>
  </div>

  <!-- Year Filter -->
  <div class="flex flex-col">
    <label for="year" class="font-semibold mb-2 text-gray-800">Year</label>
    <input
      id="year"
      type="number"
      min="1900"
      max={new Date().getFullYear()}
      bind:value={selectedYear}
      on:change={handleYearChange}
      placeholder="Select year"
      class="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </div>

  <!-- Rating Filter -->
  <div class="flex flex-col">
    <label for="rating" class="font-semibold mb-2 text-gray-800">
      Min Rating: {selectedRating.toFixed(1)}
    </label>
    <input
      id="rating"
      type="range"
      min="0"
      max="10"
      step="0.5"
      bind:value={selectedRating}
      on:change={handleRatingChange}
      class="cursor-pointer"
    />
  </div>

  <!-- Reset Button -->
  <div class="flex items-end">
    <button
      on:click={resetFilters}
      class="w-full bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
    >
      Reset Filters
    </button>
  </div>
</div>
