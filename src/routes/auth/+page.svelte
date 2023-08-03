<script>
	import { goto } from '$app/navigation';
	import { nhostClient } from '$lib/backend/api';

	let email = '';
	let password = '';
	let error = '';

	async function register(event) {
		event.preventDefault();

		try {
			// Sign up the user with the email and password
			const result = await nhostClient.auth.signUp({ email, password });

			// Check if the there are no errors
			if (!result.error) {
				goto('/account'); // If no errors redirect to the account page
			} else {
				error = result.error.message; // If signup was not successful, set the error message accordingly
			}
		} catch (e) {
			error = e.message;
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
