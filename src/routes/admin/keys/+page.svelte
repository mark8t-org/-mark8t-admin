<script lang="ts">
	import { onMount } from 'svelte';
	const unsavedChanges = () => {};
	import type Mark8tCore from '@mark8t/core';
	let Core: typeof Mark8tCore;
	let Admin: typeof any;
	let Modules: typeof any;

	export let data;
	onMount(() => {
		Core = data.props?.Core as typeof Mark8tCore;
		Admin = data.props?.Admin as typeof any;
		Modules = data.props?.Modules as typeof any;
	});
</script>

{#if Core}
	{#if Admin}
		{#if Modules}
			<Modules.Keys
				{unsavedChanges}
				overrideOpenState={true}
				locked={true}
				disabled={true}
				initialState={true}
			/>
		{/if}
	{/if}
{/if}
