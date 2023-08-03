<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { nhostClient } from '$lib/backend/api';
	import { user } from '$lib/backend/api';

	let userInfo = '';
	let file;

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

        if (file) {
            try {
                await nhostClient.storage.upload({ file });
                console.log('File uploaded successfully');
            } catch (err) {
                console.log('Error uploading file:', err);
            }
        } else {
            console.log('No file selected');
        }
    }

	function handleFileSelect(event) {
		file = event.target.files[0];
	}

	// await nhostClient.auth.updateProfile({
	//     avatar_url: url
	// });

	async function logOut() {
		await nhostClient.auth.signOut();
		goto('/');
	}
</script>

<h1>Heya {userInfo.displayName}!</h1>
<form on:submit={upload}>
	<strong>Upload profile picture:</strong><br />
	<input type="file" accept="image/*" on:change={handleFileSelect} />
	<br />
	<input type="submit" value="Upload Image" />
</form>

<p>
	<button on:click={logOut}>Logout</button>
</p>
