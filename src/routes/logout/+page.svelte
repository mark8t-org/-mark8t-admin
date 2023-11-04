<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	onMount(() => {
		goto(`${base}/admin`);
	});
</script>

<h1>Redirecting...</h1>
