<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
//   import { tmdb } from '$lib/services/tmdb';
import { tmdb } from '$lib/services/tmbd';
  import { auth } from '$lib/stores/auth';
  import WatchlistBtn from '$lib/components/WatchlistBtn.svelte';

  let movie = null;
  let loading = true;
  let error = null;

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

  const getGenreNames = (genres) => {
    return genres?.map(g => g.name).join(', ') || 'N/A';
  };

  const formatCurrency = (num) => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
  <div class="loading">Loading movie details...</div>
{:else if error}
  <div class="error">{error}</div>
{:else if movie}
  <div class="movie-details">
    <button class="btn-back" on:click={goBack}>← Back</button>
    
    <div class="details-content">
      <div class="poster-section">
        <img
          src={tmdb.getImageUrl(movie.poster_path) || 'https://via.placeholder.com/500x750?text=No+Image'}
          alt={movie.title}
          class="poster"
        />
        {#if $auth.isLoggedIn}
          <WatchlistBtn {movie} />
        {/if}
      </div>

      <div class="info-section">
        <h1>{movie.title}</h1>
        
        {#if movie.tagline}
          <p class="tagline">"{movie.tagline}"</p>
        {/if}

        <div class="meta-info">
          <div class="meta-item">
            <span class="label">Rating:</span>
            <span class="value">⭐ {movie.vote_average.toFixed(1)}/10</span>
          </div>
          
          <div class="meta-item">
            <span class="label">Release Date:</span>
            <span class="value">{formatDate(movie.release_date)}</span>
          </div>

          <div class="meta-item">
            <span class="label">Genres:</span>
            <span class="value">{getGenreNames(movie.genres)}</span>
          </div>

          {#if movie.runtime}
            <div class="meta-item">
              <span class="label">Runtime:</span>
              <span class="value">{movie.runtime} minutes</span>
            </div>
          {/if}

          <div class="meta-item">
            <span class="label">Budget:</span>
            <span class="value">{formatCurrency(movie.budget)}</span>
          </div>

          <div class="meta-item">
            <span class="label">Revenue:</span>
            <span class="value">{formatCurrency(movie.revenue)}</span>
          </div>
        </div>

        <div class="overview">
          <h2>Overview</h2>
          <p>{movie.overview || 'No overview available.'}</p>
        </div>

        {#if movie.credits?.cast && movie.credits.cast.length > 0}
          <div class="cast-section">
            <h2>Cast</h2>
            <div class="cast-list">
              {#each movie.credits.cast.slice(0, 5) as actor}
                <div class="cast-member">
                  {#if actor.profile_path}
                    <img
                      src={tmdb.getImageUrl(actor.profile_path)}
                      alt={actor.name}
                      class="cast-image"
                    />
                  {:else}
                    <div class="cast-image-placeholder">No Image</div>
                  {/if}
                  <p class="actor-name">{actor.name}</p>
                  <p class="character-name">{actor.character}</p>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .btn-back {
    background: #667eea;
    color: white;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 2rem;
    transition: background 0.3s;
  }

  .btn-back:hover {
    background: #5568d3;
  }

  .movie-details {
    animation: fadeIn 0.3s ease-in;
  }

  .details-content {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 3rem;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .poster-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .poster {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .info-section h1 {
    margin: 0 0 1rem 0;
    font-size: 2.5rem;
    color: #333;
  }

  .tagline {
    font-style: italic;
    color: #666;
    font-size: 1.1rem;
    margin: 0 0 2rem 0;
  }

  .meta-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f5f5f5;
    border-radius: 8px;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
  }

  .meta-item .label {
    font-weight: 600;
    color: #667eea;
    margin-bottom: 0.25rem;
  }

  .meta-item .value {
    color: #333;
  }

  .overview {
    margin-bottom: 2rem;
  }

  .overview h2 {
    margin-top: 0;
    color: #333;
  }

  .overview p {
    line-height: 1.6;
    color: #555;
    text-align: justify;
  }

  .cast-section {
    margin-top: 2rem;
  }

  .cast-section h2 {
    color: #333;
    margin-bottom: 1rem;
  }

  .cast-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1.5rem;
  }

  .cast-member {
    text-align: center;
  }

  .cast-image {
    width: 100%;
    aspect-ratio: 2/3;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }

  .cast-image-placeholder {
    width: 100%;
    aspect-ratio: 2/3;
    background: #e0e0e0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    margin-bottom: 0.5rem;
  }

  .actor-name {
    font-weight: 600;
    margin: 0.5rem 0 0.25rem 0;
    color: #333;
    font-size: 0.9rem;
  }

  .character-name {
    margin: 0;
    color: #666;
    font-size: 0.85rem;
  }

  .loading, .error {
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

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .details-content {
      grid-template-columns: 1fr;
    }

    .poster-section {
      grid-row: 1;
    }

    .info-section h1 {
      font-size: 1.8rem;
    }

    .meta-info {
      grid-template-columns: 1fr;
    }

    .cast-list {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
  }
</style>