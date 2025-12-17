<script>
//   import { tmdb } from '$lib/services/tmdb';
  import { tmdb } from '$lib/services/tmbd';
  export let movie;
</script>

<div class="movie-card">
  <a href={`/movie/${movie.id}`} class="movie-link">
    <div class="poster">
      <img
        src={tmdb.getImageUrl(movie.poster_path) || 'https://via.placeholder.com/500x750?text=No+Image'}
        alt={movie.title}
        loading="lazy"
      />
      <div class="overlay">
        <span class="rating">⭐ {movie.vote_average.toFixed(1)}</span>
      </div>
    </div>
    <div class="info">
      <h3>{movie.title}</h3>
      <p class="year">{new Date(movie.release_date).getFullYear()}</p>
    </div>
  </a>
</div>

<style>
  .movie-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }

  .movie-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .movie-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .poster {
    position: relative;
    overflow: hidden;
    aspect-ratio: 2/3;
  }

  .poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: flex-end;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .movie-card:hover .overlay {
    opacity: 1;
  }

  .rating {
    color: #ffd700;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .info {
    padding: 1rem;
  }

  .info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .year {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
</style>