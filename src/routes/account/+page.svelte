<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { nhostClient } from '$lib/backend/api';
	import { user } from '$lib/backend/api';

	let userInfo = '';
    let avatarUrl = '';

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

    async function upload(event) {
        event.preventDefault();
        
        const { storage } = await nhostClient.storage.upload({ avatarUrl });

        console.log('Store: ',storage);

        // await nhostClient.auth.updateProfile({
        //     avatar_url: url
        // });
    }

	async function logOut() {
		await nhostClient.auth.signOut();
		goto('/');
	}
</script>

<h1>Heya {userInfo.displayName}!</h1>
<form on:submit={upload}>
	<strong>Upload profile picture:</strong><br />
	<input bind:value={avatarUrl} type="file" accept="image/*" />
	<br />
	<input type="submit" value="Upload Image" />
</form>

<p>
	<button on:click={logOut}>Logout</button>
</p>
