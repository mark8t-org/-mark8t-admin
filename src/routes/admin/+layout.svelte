<script lang="ts">
	import { onMount } from 'svelte';
	import Styles from '$lib/components/Styles.svelte';

	// import Content from '$lib/components/dashboards/Content.svelte';

	import type Mark8tCore from '@mark8t/core';
	import type Mark8tAdmin from '../../lib/index';

	let Core: typeof Mark8tCore;
	let Admin: typeof Mark8tAdmin;

	export let data;

	onMount(() => {
		Core = data.props?.Core as typeof Mark8tCore;
		Admin = data.props?.Admin as typeof Mark8tAdmin;
	});
</script>

{#if Core}
	<Styles />
	{#if Admin}
		<Admin {Core} override={true}>
			<slot />
		</Admin>
	{/if}
{/if}
