<script>
	import { goto } from '$app/navigation';
	import { nhostClient } from '$lib/backend/api';
	import { isSignedIn, user } from '$lib/backend/api';

	async function logOut() {
		nhostClient.auth.signOut();
		goto('/');
	}
</script>

<h1>My account</h1>
<button on:click={logOut}>Logout</button>
