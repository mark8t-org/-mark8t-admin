<script lang="ts">
	import Input from '../components/Input.svelte'; // Assuming you have a Tailwind-styled Input component
	import Accordion from '../components/Accordion.svelte'; // The refactored accordion component

	import { Stores } from '@mark8t/core';
	import Theme from '../stores/Theme';

	export let unsavedChanges: () => void;
	export let overrideOpenState = false;

	let { Account, Website } = Stores;

	let panelContactInfo = false;
	export let locked = false;
	export let redirectUrl = '';
	export let openExternally = false;

	panelContactInfo = localStorage.getObject('--panel--panelContactInfo') || false;

	// Update the local storage when the accordion's state changes
	const handlePanelToggle = (event) => {
		console.log(event.detail.open);
		localStorage.setObject('--panel--panelContactInfo', event.detail.open);
	};
</script>

<Accordion
	theme={$Theme.theme.includes('dark') ? 'dark' : 'light'}
	title="Contact & Social"
	initialState={overrideOpenState}
	{locked}
	{redirectUrl}
	{openExternally}
	on:change={handlePanelToggle}
>
	<Input
		theme={$Theme.theme.includes('dark') ? 'dark' : 'light'}
		label="Phone"
		type="tel"
		pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
		maxlength="17"
		bind:value={$Website.siteContactPhone}
	/>
	<Input
		theme={$Theme.theme.includes('dark') ? 'dark' : 'light'}
		label="Email"
		bind:value={$Website.siteContactEmail}
	/>
	<Input
		theme={$Theme.theme.includes('dark') ? 'dark' : 'light'}
		label="Facebook"
		bind:value={$Website.siteContactFacebook}
	/>
	<Input
		theme={$Theme.theme.includes('dark') ? 'dark' : 'light'}
		label="Instagram"
		bind:value={$Website.siteContactInstagram}
	/>
</Accordion>
