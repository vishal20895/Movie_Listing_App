<script>
  import { auth } from '$lib/stores/auth';
  import { watchlist } from '$lib/stores/watchlist';
  // watchlist store is imported so navbar can react to changes
  // (useful for badge/count even if not shown yet)
</script>

<header
  class="sticky top-0 z-50
         bg-gradient-to-r from-indigo-500 to-purple-600
         text-white"
>
  <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    <!-- App branding / home navigation -->
    <div>
      <h1 class="text-xl font-bold"> MovieFlix</h1>
    </div>

    <nav class="flex items-center gap-4 sm:gap-8">
      <!-- Home is always visible -->
      <a href="/" class="hover:opacity-80">
        Home
      </a>

      {#if $auth.isLoggedIn}
        <!-- Watchlist is available only for authenticated users -->
        <a href="/watchlist" class="hover:opacity-80">
          Watchlist
        </a>

        <!-- Username is shown for logged-in users, hidden on small screens -->
        <span class="hidden sm:block text-sm">
          Welcome, <strong>{$auth.user?.username}</strong>
        </span>

        <!-- Logout clears auth state from the global store -->
        <button
          on:click={() => auth.logout()}
          class="border border-white/70 px-4 py-2 rounded
                 bg-white/20 hover:bg-white/30 transition"
        >
          Logout
        </button>
      {:else}
        <!-- Auth routes for unauthenticated users -->
        <a href="/login" class="hover:opacity-80">
          Login
        </a>
        <a href="/signup" class="hover:opacity-80">
          Sign Up
        </a>
      {/if}
    </nav>
  </div>
</header>
