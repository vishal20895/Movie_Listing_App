<script>
  import { watchlist } from '$lib/stores/watchlist';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import MovieCard from '$lib/components/MovieCard.svelte';
  import WatchlistBtn from '$lib/components/WatchlistBtn.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    if (!$auth.isLoggedIn) {
      goto('/login');
    }
  });
</script>

<svelte:head>
  <title>My Watchlist - MovieFlix</title>
</svelte:head>

<div class="watchlist-page">
  <h1>My Watchlist</h1>

  {#if !$auth.isLoggedIn}
    <div class="error">
      Please <a href="/login">login</a> to view your watchlist.
    </div>
  {:else if $watchlist.length === 0}
    <div class="empty">
      <p>Your watchlist is empty.</p>
      <a href="/" class="btn-explore">Explore Movies</a>
    </div>
  {:else}
    <div class="watchlist-stats">
      <p>You have <strong>{$watchlist.length}</strong> movie(s) in your watchlist</p>
    </div>

    <div class="movies-grid">
      {#each $watchlist as movie (movie.id)}
        <div class="movie-item">
          <MovieCard {movie} />
          <WatchlistBtn {movie} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .watchlist-page {
    animation: fadeIn 0.3s ease-in;
  }

  .watchlist-page h1 {
    color: #333;
    margin-bottom: 2rem;
  }

  .watchlist-stats {
    background: #e3f2fd;
    color: #1976d2;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    font-weight: 500;
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

  .empty {
    text-align: center;
    padding: 3rem 2rem;
    background: white;
    border-radius: 8px;
  }

  .empty p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }

  .btn-explore {
    display: inline-block;
    background: #667eea;
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.3s;
  }

  .btn-explore:hover {
    background: #5568d3;
  }

  .error {
    background: #ffebee;
    color: #d32f2f;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
  }

  .error a {
    color: #d32f2f;
    font-weight: 600;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .movies-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1.5rem;
    }
  }
</style>