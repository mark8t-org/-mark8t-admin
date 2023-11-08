<script lang="ts">
	import { onMount } from 'svelte';
	import Input from '../components/Input.svelte';
	import Accordion from '../components/Accordion.svelte'; // The refactored accordion component
	import { Stores } from '@mark8t/core';
	export let unsavedChanges;
	export let overrideOpenState;
	let { Website } = Stores;

	export let locked = false;
	export let redirectUrl = '';
	export let openExternally = false;

	let panelWebsite = false;
	panelWebsite = localStorage.getItem('--panel--panelWebsite') || false;

	const standardFields = {
		siteName: 'Site Name',
		siteDescription: 'Site Description',
		siteKeywords: 'Site Keywords'
	};

	// if (overrideOpenState === true) panelWebsite = true;

	onMount(() => {
		// Your subscription logic here
	});

	// Update the local storage when the accordion's state changes
	const handlePanelToggle = (event) => {
		panelWebsite = event.detail.open;
		localStorage.setItem('--panel--panelWebsite', panelWebsite);
	};
</script>

<Accordion title="Website" initialState={overrideOpenState} {locked} {redirectUrl} {openExternally}>
	{#each Object.entries(standardFields) as [key, label]}
		<Input value={$Website[key]} {label} on:input={unsavedChanges} />
	{/each}
</Accordion>

<style>
	/* Custom styles if needed */
</style>
