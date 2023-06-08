<script lang="ts">
	import { onMount } from 'svelte';

	let Core: typeof any;
	let Admin: typeof any;

	export let data;
	onMount(() => {
		Core = data.props?.Core as typeof any;
		Admin = data.props?.Admin as typeof any;
	});
</script>

{#if Core}
	{#if Admin}
		<Admin override={true}>
			<slot />
		</Admin>
	{/if}
{/if}
