<script>
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let username = '';
  let error = '';
  let loading = false;

  // Handles signup form submission with basic client-side validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    error = '';

    if (password !== confirmPassword) {
      error = 'Passwords do not match';
      return;
    }

    if (password.length < 6) {
      error = 'Password must be at least 6 characters';
      return;
    }

    loading = true;
    try {
      auth.signup(email, password, username);
      await goto('/');
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>Sign Up - MovieFlix</title>
</svelte:head>

<div class="flex items-center justify-center min-h-[80vh]">
  <div
    class="w-full max-w-md bg-white p-8 rounded-lg
           shadow-lg"
  >
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-8">
      Create Account
    </h1>

    {#if error}
      <div
        class="mb-6 rounded bg-red-50 p-4
               text-red-700 font-medium"
      >
        {error}
      </div>
    {/if}

    <form on:submit={handleSubmit} class="space-y-6">
      <div>
        <label
          for="username"
          class="block mb-2 font-semibold text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          bind:value={username}
          required
          placeholder="Choose a username"
          class="w-full rounded border border-gray-300
                 px-3 py-2 text-base
                 focus:outline-none focus:ring-2
                 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label
          for="email"
          class="block mb-2 font-semibold text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          placeholder="your@email.com"
          class="w-full rounded border border-gray-300
                 px-3 py-2 text-base
                 focus:outline-none focus:ring-2
                 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label
          for="password"
          class="block mb-2 font-semibold text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          placeholder="At least 6 characters"
          class="w-full rounded border border-gray-300
                 px-3 py-2 text-base
                 focus:outline-none focus:ring-2
                 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label
          for="confirmPassword"
          class="block mb-2 font-semibold text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          bind:value={confirmPassword}
          required
          placeholder="Confirm password"
          class="w-full rounded border border-gray-300
                 px-3 py-2 text-base
                 focus:outline-none focus:ring-2
                 focus:ring-indigo-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        class="w-full rounded bg-indigo-500
               py-2 font-semibold text-white
               transition hover:bg-indigo-600
               disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>

    <p class="mt-6 text-center text-gray-600">
      Already have an account?
      <a
        href="/login"
        class="ml-1 font-semibold text-indigo-500 hover:underline"
      >
        Login
      </a>
    </p>
  </div>
</div>
