<script>
	import { isSignedIn } from '$lib/backend/api';

	let signedIn;

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
