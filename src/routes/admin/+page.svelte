<script lang="ts">
	import Row from './../../lib/components/dashboards/Row.svelte';
	import Button from './../../lib/components/dashboards/Button.svelte';
	import PromoCard from './../../lib/components/dashboards/PromoCard.svelte';
	import { onMount } from 'svelte';

	import type Mark8tCore from '@mark8t/core';
	import TableWithPagination from '$lib/components/TableWithPagination.svelte';

	export let example: boolean = false;
	export let title;

	const unsavedChanges = () => {};

	let Core: typeof Mark8tCore;
	let Admin: typeof any;
	let Modules: typeof any;

	let menuOpen = false;
	$: Account = Core?.Stores.Account;

	export let data;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	onMount(() => {
		Core = data.props?.Core as typeof Mark8tCore;
		Admin = data.props?.Admin as typeof any;
		Modules = data.props?.Modules as typeof any;
	});
</script>

{#if Core}
	{#if Admin}
		{#if Modules}
			{#if example}
				<PromoCard
					title="Special Offer"
					description="Get 50% off your first a corner of the Mark8t."
					buttonText="Start free trial"
					imageUrl="image-offer.png"
					titleClass="text-lg"
					descClass="text-sm"
					buttonClass="bg-blue-700 hover:bg-blue-800"
					imageClass="w-24 md:w-44"
				/>
			{/if}
			<Modules.Dashboard account={$Account} {unsavedChanges} overrideOpenState={false} />
		{/if}
	{/if}
{/if}
