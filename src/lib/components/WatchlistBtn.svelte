<script>
  import { watchlist } from '$lib/stores/watchlist';
  import { auth } from '$lib/stores/auth';

  // Movie for which watchlist action is performed
  export let movie;

  // Derived state to check whether current movie exists in watchlist
  let isInWatchlist = false;

  // Reacts automatically when watchlist or movie changes
  $: isInWatchlist = $watchlist.some(m => m.id === movie.id);

  // Handles add/remove logic based on auth state and watchlist status
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
  class="px-6 py-3 rounded font-semibold text-white
         transition-all duration-300
         bg-indigo-500 hover:bg-indigo-600 hover:scale-[1.02]"
  class:bg-green-500={isInWatchlist}
  class:hover:bg-green-600={isInWatchlist}
>
  {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
</button>
