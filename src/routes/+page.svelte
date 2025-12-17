<script>
  import { onMount } from 'svelte';
  import { movies, filteredMovies } from '$lib/stores/movies';
//   import { tmdb } from '$lib/services/tmdb';
  import { tmdb } from '$lib/services/tmbd';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Filters from '$lib/components/Filters.svelte';
  import MovieCard from '$lib/components/MovieCard.svelte';
  import WatchlistBtn from '$lib/components/WatchlistBtn.svelte';

  let loading = false;
  let error = null;

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

<div class="page">
  <h1>Discover Movies</h1>
  <SearchBar />
  <Filters />

  {#if loading}
    <div class="loading">Loading movies...</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else if $filteredMovies.length === 0}
    <div class="empty">No movies found. Try adjusting your filters.</div>
  {:else}
    <div class="movies-grid">
      {#each $filteredMovies as movie (movie.id)}
        <div class="movie-item">
          <MovieCard {movie} />
          <WatchlistBtn {movie} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .page {
    animation: fadeIn 0.3s ease-in;
  }

  .movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
  }

  .movie-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .loading, .error, .empty {
    text-align: center;
    padding: 2rem;
    font-size: 1.1rem;
    border-radius: 8px;
  }

  .loading {
    background: #e3f2fd;
    color: #1976d2;
  }

  .error {
    background: #ffebee;
    color: #d32f2f;
  }

  .empty {
    background: #f5f5f5;
    color: #666;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>