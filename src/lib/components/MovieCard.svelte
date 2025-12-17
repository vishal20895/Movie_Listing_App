<script>
  // TMDB helper used to generate full image URLs from poster paths
  import { tmdb } from '$lib/services/tmbd';

  // Movie object received from the parent movie list
  export let movie;
</script>

<div
  class="bg-white rounded-lg overflow-hidden shadow-md
         transition-all duration-300 cursor-pointer
         hover:-translate-y-2 hover:shadow-xl"
>
  <!-- Navigates to movie details page using movie id -->
  <a href={`/movie/${movie.id}`} class="block">
    <div class="relative overflow-hidden aspect-[2/3]">
      <!-- Fallback image is used when poster is missing -->
      <img
        src={tmdb.getImageUrl(movie.poster_path) || 'https://via.placeholder.com/500x750?text=No+Image'}
        alt={movie.title}
        loading="lazy"
        class="w-full h-full object-cover"
      />

      <!-- Rating is shown only on hover -->
      <div
        class="absolute inset-0 bg-black/70 flex items-end p-4
               opacity-0 transition-opacity duration-300 hover:opacity-100"
      >
        <span class="text-yellow-400 font-bold text-lg">
          ⭐ {movie.vote_average.toFixed(1)}
        </span>
      </div>
    </div>

    <div class="p-4">
      <!-- Title is clamped to two lines to keep cards uniform -->
      <h3 class="text-base font-semibold mb-2 line-clamp-2">
        {movie.title}
      </h3>

      <!-- Release year is derived from the full release date -->
      <p class="text-sm text-gray-600">
        {new Date(movie.release_date).getFullYear()}
      </p>
    </div>
  </a>
</div>
