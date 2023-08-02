<script>
	import { goto } from '$app/navigation';
	import { nhostClient } from '$lib/backend/api';

	let email = '';
	let password = '';
	let error = '';

	async function register(event) {
    event.preventDefault();
    try {
        await nhostClient.auth.signUp({ email, password });
        goto('/account');
    } catch (err) {
        error = err.message;
    }
}
</script>

<form on:submit={register}>
	<input bind:value={email} placeholder="Email" required />
	<input bind:value={password} type="password" placeholder="Password" required />
	{#if error}
		<p>{error}</p>
	{/if}
	<button type="submit">Register</button>
</form>
