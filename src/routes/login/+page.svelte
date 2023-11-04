<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	onMount(() => {
		// window.requestLogin();
		window.location.href = `${base}/admin`;
	});
</script>

<h1>Redirecting...</h1>
