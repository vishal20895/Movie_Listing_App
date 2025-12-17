<script>
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  // Local form state
  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  // Handles authentication and redirects on success
  const handleSubmit = async (e) => {
    e.preventDefault();
    error = '';
    loading = true;

    try {
      auth.login(email, password);
      await goto('/');
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>Login - MovieFlix</title>
</svelte:head>

<div class="flex items-center justify-center min-h-[80vh]">
  <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-center mb-8 text-gray-800">
      Login
    </h1>

    {#if error}
      <!-- Displays authentication errors from auth store -->
      <div class="mb-6 p-4 rounded bg-red-50 text-red-600">
        {error}
      </div>
    {/if}

    <form on:submit={handleSubmit}>
      <div class="mb-6">
        <label for="email" class="block mb-2 font-semibold text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          placeholder="your@email.com"
          class="w-full px-4 py-3 border rounded
                 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div class="mb-6">
        <label for="password" class="block mb-2 font-semibold text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          placeholder="Your password"
          class="w-full px-4 py-3 border rounded
                 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        class="w-full py-3 font-semibold rounded text-white
               bg-indigo-500 hover:bg-indigo-600
               disabled:opacity-60 disabled:cursor-not-allowed
               transition"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>

    <p class="text-center mt-6 text-gray-600">
      Don't have an account?
      <a href="/signup" class="text-indigo-500 font-semibold hover:underline">
        Sign up
      </a>
    </p>
  </div>
</div>
