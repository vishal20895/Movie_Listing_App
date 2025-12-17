<script>
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';
  let loading = false;

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

<div class="auth-container">
  <div class="auth-form">
    <h1>Login</h1>
    
    {#if error}
      <div class="error-message">{error}</div>
    {/if}

    <form on:submit={handleSubmit}>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          placeholder="your@email.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          placeholder="Your password"
        />
      </div>

      <button type="submit" disabled={loading} class="btn-submit">
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>

    <p class="auth-link">
      Don't have an account? <a href="/signup">Sign up</a>
    </p>
  </div>
</div>

<style>
  .auth-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
  }

  .auth-form {
    background: white;
    padding: 3rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  .auth-form h1 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
  }

  .error-message {
    background: #ffebee;
    color: #d32f2f;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }

  .btn-submit {
    width: 100%;
    padding: 0.75rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
  }

  .btn-submit:hover:not(:disabled) {
    background: #5568d3;
  }

  .btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .auth-link {
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
  }

  .auth-link a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
  }

  .auth-link a:hover {
    text-decoration: underline;
  }
</style>
