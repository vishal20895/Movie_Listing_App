<script>
  import { auth } from '$lib/stores/auth';
   import { watchlist } from '$lib/stores/watchlist';
</script>

<header class="navbar">
  <div class="container">
    <div class="logo">
      <h1>🎬 MovieFlix</h1>
    </div>
    
    <nav class="nav-links">
      <a href="/">Home</a>
      {#if $auth.isLoggedIn}
        <a href="/watchlist">Watchlist</a>
        <span class="user-info">
          Welcome, <strong>{$auth.user?.username}</strong>
        </span>
        <button on:click={() => auth.logout()} class="btn-logout">
          Logout
        </button>
      {:else}
        <a href="/login">Login</a>
        <a href="/signup">Sign Up</a>
      {/if}
    </nav>
  </div>
</header>

<style>
  .navbar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
  }

  .nav-links a:hover {
    opacity: 0.8;
  }

  .user-info {
    font-size: 0.9rem;
  }

  .btn-logout {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid white;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .btn-logout:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 600px) {
    .nav-links {
      gap: 1rem;
    }
    .user-info {
      display: none;
    }
  }
</style>
