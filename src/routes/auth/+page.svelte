<script>
	import { goto } from '$app/navigation';
	import { nhostClient } from '$lib/backend/api';

	let email = '';
	let password = '';
	let error = '';

	async function register(event) {
		event.preventDefault(); // Tell Svelte not to take the HTML form’s default action so we can code the logic ourselves.
		try {
			await nhostClient.auth.signUp({ email, password });
			goto('/account');
		} catch (err) {
			error = err.message;
		}
	}
</script>

<h1>Sign up</h1>
<form on:submit={register}>
	<p>
		<label for="email">Your email: *</label><br />
		<input bind:value={email} name="email" required />
	</p>
	<p>
		<label for="password">Secure password: *</label><br />
		<input bind:value={password} type="password" name="password" required />
	</p>
	{#if error}
		<p>{error}</p>
	{/if}
	<button type="submit">SignUp</button>
</form>
