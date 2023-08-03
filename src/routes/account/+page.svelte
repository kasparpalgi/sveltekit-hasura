<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { nhostClient } from '$lib/backend/api';
	import { user } from '$lib/backend/api';

	let userInfo = '';

	$: {
		user.subscribe((value) => {
			userInfo = value;
		});
	}

	onMount(() => {
		if (!userInfo) {
			goto('/');
		}
	});

	async function logOut() {
		await nhostClient.auth.signOut();
		goto('/');
	}
</script>

<h1>Heya {userInfo.displayName}!</h1>
<button on:click={logOut}>Logout</button>
