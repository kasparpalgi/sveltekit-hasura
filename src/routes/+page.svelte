<script>
	import { isSignedIn } from '$lib/backend/api'; // Import the isSignedIn store

	let signedIn;

	// Subscribe to the isSignedIn store and set the signedIn variable accordingly
	isSignedIn.subscribe((value) => {
		signedIn = value;
	});
</script>

<h1>SvelteKit + NHost Stack (Hasura, Hasura Auth, Hasura Storage & Hasura Functions)</h1>
<p>
	{#if signedIn}
		<a href="/account">My account➡️</a>
	{:else}
		<a href="/auth">Register or login here➡️</a>
	{/if}
</p>
