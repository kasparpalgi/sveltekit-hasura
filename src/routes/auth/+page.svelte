<script>
	import { goto } from '$app/navigation';
	import { nhostClient } from '$lib/backend/api';

	let email = '';
	let password = '';
	let error = '';

	async function register(event) {
		event.preventDefault();

		const result = await nhostClient.auth.signUp({ email, password });

		// Check if the signup was successful
		if (result && result.status === 'success') {
			goto('/account');
		} else {
			error = result.error.message; // If signup was not successful, set the error message accordingly
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
		<p class="error">{error}</p>
	{/if}
	<button type="submit">SignUp</button>
</form>

<style>
	.error {
		color: red;
	}
</style>
