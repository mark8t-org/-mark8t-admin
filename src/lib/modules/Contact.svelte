<script lang="ts">
	import Input from '../components/Input.svelte'; // Assuming you have a Tailwind-styled Input component
	import Accordion from '../components/Accordion.svelte'; // The refactored accordion component

	import { Stores } from '@mark8t/core';
	let { Account, Website } = Stores;
	export let locked = false;
	export let redirectUrl = '';
	export let openExternally = false;

	let overrideOpenState;
	let panelContactInfo = localStorage.getObject('--panel--panelContactInfo');

	// Update the local storage when the accordion's state changes
	const handlePanelToggle = (event) => {
		console.log(event.detail.open);
		localStorage.setObject('--panel--panelContactInfo', event.detail.open);
	};
</script>

<Accordion
	title="Contact & Social"
	initialState={panelContactInfo === {} ? false : panelContactInfo}
	{locked}
	{redirectUrl}
	{openExternally}
	on:change={handlePanelToggle}
>
	<Input
		label="Phone"
		type="tel"
		pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
		maxlength="17"
		bind:value={$Website.siteContactPhone}
	/>
	<Input label="Email" bind:value={$Website.siteContactEmail} />
	<Input label="Facebook" bind:value={$Website.siteContactFacebook} />
	<Input label="Instagram" bind:value={$Website.siteContactInstagram} />
</Accordion>

<style>
	/* Add any custom styles or overrides here */
</style>
