<script>
  import { watchlist } from '$lib/stores/watchlist';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import MovieCard from '$lib/components/MovieCard.svelte';
  import WatchlistBtn from '$lib/components/WatchlistBtn.svelte';
  import { onMount } from 'svelte';

  // Redirect unauthenticated users to login page
  onMount(() => {
    if (!$auth.isLoggedIn) {
      goto('/login');
    }
  });
</script>

<svelte:head>
  <title>My Watchlist - MovieFlix</title>
</svelte:head>

<div class="animate-fadeIn">
  <h1 class="mb-8 text-3xl font-bold text-gray-800">
    My Watchlist
  </h1>

  {#if !$auth.isLoggedIn}
    <div
      class="rounded-lg bg-red-50 p-6
             text-center text-red-700"
    >
      Please
      <a
        href="/login"
        class="font-semibold underline"
      >
        login
      </a>
      to view your watchlist.
    </div>

  {:else if $watchlist.length === 0}
    <div
      class="rounded-lg bg-white p-12
             text-center shadow"
    >
      <p class="mb-8 text-lg text-gray-600">
        Your watchlist is empty.
      </p>

      <a
        href="/"
        class="inline-block rounded
               bg-indigo-500 px-8 py-3
               font-semibold text-white
               transition hover:bg-indigo-600"
      >
        Explore Movies
      </a>
    </div>

  {:else}
    <div
      class="mb-8 rounded-lg
             bg-blue-50 p-6
             font-medium text-blue-700"
    >
      You have <strong>{$watchlist.length}</strong>
      movie(s) in your watchlist
    </div>

    <div
      class="grid gap-8
             grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
    >
      {#each $watchlist as movie (movie.id)}
        <div class="flex flex-col gap-2">
          <MovieCard {movie} />
          <WatchlistBtn {movie} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  /* Tailwind animation helper */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in;
  }
</style>
