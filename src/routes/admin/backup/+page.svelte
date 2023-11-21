<script lang="ts">
	import { onMount } from 'svelte';
	const unsavedChanges = () => {};

	let Core: typeof any;
	let Admin: typeof any;
	let Modules: typeof any;

	export let data;
	onMount(() => {
		Core = data.props?.Core as typeof any;
		Admin = data.props?.Admin as typeof any;
		Modules = data.props?.Modules as typeof any;
	});
</script>

{#if Core}
	{#if Admin}
		{#if Modules}
			<Modules.Backup
				{unsavedChanges}
				overrideOpenState={true}
				locked={true}
				disabled={true}
				initialState={true}
			/>
		{/if}
	{/if}
{/if}
