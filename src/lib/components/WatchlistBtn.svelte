<script>
  import { watchlist } from '$lib/stores/watchlist';
  import { auth } from '$lib/stores/auth';

  export let movie;

  let isInWatchlist = false;

  $: isInWatchlist = $watchlist.some(m => m.id === movie.id);

  const handleClick = () => {
    if (!$auth.isLoggedIn) {
      alert('Please login to use watchlist');
      return;
    }

    if (isInWatchlist) {
      watchlist.removeMovie($auth.user.id, movie.id);
    } else {
      watchlist.addMovie($auth.user.id, movie);
    }
  };
</script>

<button
  on:click={handleClick}
  class="watchlist-btn"
  class:added={isInWatchlist}
>
  {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
</button>

<style>
  .watchlist-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
  }

  .watchlist-btn:hover {
    background: #5568d3;
    transform: scale(1.02);
  }

  .watchlist-btn.added {
    background: #51cf66;
  }

  .watchlist-btn.added:hover {
    background: #40c057;
  }
</style>