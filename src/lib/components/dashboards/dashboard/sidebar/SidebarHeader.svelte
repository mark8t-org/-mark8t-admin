<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import Logout from '$lib/components/Logout.svelte';

	export let Core: typeof any;
	$: Account = Core?.Stores.Account;
</script>

<!-- <div class="flex h-20 items-center justify-start pl-4 lg:pl-8"> -->
<!-- <Login {Core} /> -->
<!-- <Logout {Core} /> -->
<!-- </div> -->
