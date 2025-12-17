<script>
  import { onMount } from 'svelte';
  import { movies, filteredMovies } from '$lib/stores/movies';
  import { tmdb } from '$lib/services/tmbd';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Filters from '$lib/components/Filters.svelte';
  import MovieCard from '$lib/components/MovieCard.svelte';
  import WatchlistBtn from '$lib/components/WatchlistBtn.svelte';

  let loading = false;
  let error = null;

  // Fetch popular movies on component mount
  onMount(async () => {
    try {
      loading = true;
      const popularMovies = await tmdb.getPopularMovies();
      movies.setMovies(popularMovies);
    } catch (err) {
      error = 'Failed to load movies. Please try again.';
      movies.setError(error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>MovieFlix - Discover Movies</title>
</svelte:head>

<div class="animate-[fadeIn_0.3s_ease-in]">
  <h1 class="text-3xl font-bold mb-6">Discover Movies</h1>
  
  <SearchBar />
  <Filters />

  <!-- Loading state -->
  {#if loading}
    <div class="text-center p-8 text-lg rounded-lg bg-blue-50 text-blue-700">
      Loading movies...
    </div>
  
  <!-- Error state -->
  {:else if error}
    <div class="text-center p-8 text-lg rounded-lg bg-red-50 text-red-700">
      {error}
    </div>
  
  <!-- Empty state - no movies found -->
  {:else if $filteredMovies.length === 0}
    <div class="text-center p-8 text-lg rounded-lg bg-gray-100 text-gray-600">
      No movies found. Try adjusting your filters.
    </div>
  
  <!-- Movies grid -->
  {:else}
    <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
      {#each $filteredMovies as movie (movie.id)}
        <div class="flex flex-col gap-2">
          <MovieCard {movie} />
          <WatchlistBtn {movie} />
        </div>
      {/each}
    </div>
  {/if}
</div>