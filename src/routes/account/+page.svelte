<script>
	import { goto } from '$app/navigation';
	import { nhostClient } from '$lib/backend/api';

	let error = '';

	async function logOut() {
    try {
        await nhostClient.auth.signOut();
        goto('/');
    } catch (err) {
        error = err.message;
    }
}
</script>
<h1>My account</h1>
<button on:click={logOut}>Logout</button>
