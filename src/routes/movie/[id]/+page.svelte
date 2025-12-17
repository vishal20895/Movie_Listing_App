<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { tmdb } from '$lib/services/tmbd';
  import { auth } from '$lib/stores/auth';
  import WatchlistBtn from '$lib/components/WatchlistBtn.svelte';

  let movie = null;
  let loading = true;
  let error = null;

  // Fetch movie details using route param id
  onMount(async () => {
    try {
      movie = await tmdb.getMovieDetails($page.params.id);
    } catch (err) {
      error = 'Failed to load movie details';
      console.error(err);
    } finally {
      loading = false;
    }
  });

  const getGenreNames = (genres) =>
    genres?.map(g => g.name).join(', ') || 'N/A';

  const formatCurrency = (num) =>
    num
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0
        }).format(num)
      : 'N/A';

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : 'N/A';

  // Simple browser back navigation
  const goBack = () => {
    window.history.back();
  };
</script>

<svelte:head>
  {#if movie}
    <title>{movie.title} - MovieFlix</title>
  {/if}
</svelte:head>

{#if loading}
  <div class="text-center p-8 text-blue-700 bg-blue-50 rounded-lg">
    Loading movie details...
  </div>

{:else if error}
  <div class="text-center p-8 text-red-700 bg-red-50 rounded-lg">
    {error}
  </div>

{:else if movie}
  <div class="animate-fadeIn">
    <button
      on:click={goBack}
      class="mb-8 px-6 py-2 rounded font-semibold text-white
             bg-indigo-500 hover:bg-indigo-600 transition"
    >
      ← Back
    </button>

    <div
      class="grid gap-12 bg-white p-8 rounded-lg shadow
             grid-cols-1 md:grid-cols-[300px_1fr]"
    >
      <!-- Poster + Watchlist -->
      <div class="flex flex-col gap-6">
        <img
          src={tmdb.getImageUrl(movie.poster_path) || 'https://via.placeholder.com/500x750?text=No+Image'}
          alt={movie.title}
          class="w-full rounded-lg shadow-lg"
        />

        {#if $auth.isLoggedIn}
          <WatchlistBtn {movie} />
        {/if}
      </div>

      <!-- Movie Info -->
      <div>
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          {movie.title}
        </h1>

        {#if movie.tagline}
          <p class="italic text-gray-600 mb-8">
            "{movie.tagline}"
          </p>
        {/if}

        <!-- Metadata -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-4
                 bg-gray-100 p-6 rounded-lg mb-8"
        >
          <div>
            <p class="font-semibold text-indigo-500">Rating</p>
            <p>⭐ {movie.vote_average.toFixed(1)}/10</p>
          </div>

          <div>
            <p class="font-semibold text-indigo-500">Release Date</p>
            <p>{formatDate(movie.release_date)}</p>
          </div>

          <div>
            <p class="font-semibold text-indigo-500">Genres</p>
            <p>{getGenreNames(movie.genres)}</p>
          </div>

          {#if movie.runtime}
            <div>
              <p class="font-semibold text-indigo-500">Runtime</p>
              <p>{movie.runtime} minutes</p>
            </div>
          {/if}

          <div>
            <p class="font-semibold text-indigo-500">Budget</p>
            <p>{formatCurrency(movie.budget)}</p>
          </div>

          <div>
            <p class="font-semibold text-indigo-500">Revenue</p>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
        </div>

        <!-- Overview -->
        <div class="mb-10">
          <h2 class="text-2xl font-semibold mb-2 text-gray-800">
            Overview
          </h2>
          <p class="text-gray-600 leading-relaxed text-justify">
            {movie.overview || 'No overview available.'}
          </p>
        </div>

        <!-- Cast -->
        {#if movie.credits?.cast?.length}
          <div>
            <h2 class="text-2xl font-semibold mb-4 text-gray-800">
              Cast
            </h2>

            <div
              class="grid gap-6
                     grid-cols-[repeat(auto-fill,minmax(100px,1fr))]"
            >
              {#each movie.credits.cast.slice(0, 5) as actor}
                <div class="text-center">
                  {#if actor.profile_path}
                    <img
                      src={tmdb.getImageUrl(actor.profile_path)}
                      alt={actor.name}
                      class="w-full aspect-[2/3] object-cover rounded-lg mb-2"
                    />
                  {:else}
                    <div
                      class="w-full aspect-[2/3] rounded-lg bg-gray-200
                             flex items-center justify-center text-gray-400 mb-2"
                    >
                      No Image
                    </div>
                  {/if}

                  <p class="font-semibold text-sm text-gray-800">
                    {actor.name}
                  </p>
                  <p class="text-xs text-gray-600">
                    {actor.character}
                  </p>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
