<script>
  import "../app.css";
  import { onMount } from 'svelte';
  import { auth } from '$lib/stores/auth';
  import { watchlist } from '$lib/stores/watchlist';
  import Header from '$lib/components/Header.svelte';

  onMount(() => {
    // Hydrate auth from localStorage
    auth.hydrate();

    // Subscribe to auth changes and load watchlist for logged-in user
    const unsubscribe = auth.subscribe(authState => {
      if (authState.isLoggedIn && authState.user) {
        watchlist.loadWatchlist(authState.user.id);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  });
</script>

<Header />

<main class="main-content">
  <slot />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: #f8f9fa;
  }

  :global(.main-content) {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    min-height: calc(100vh - 70px); /* Adjust according to header height */
  }
</style>
