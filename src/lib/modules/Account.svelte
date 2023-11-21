<script lang="ts">
	import { onMount } from 'svelte';

	import { Components, Stores } from '@mark8t/core';
	import Input from '../components/Input.svelte';
	import Accordion from '../components/Accordion.svelte';

	import Theme from '../stores/Theme';

	export let unsavedChanges: () => void;
	export let overrideOpenState = false;

	let { Account, Website } = Stores;
	let panelInfo = false;
	export let locked = false;
	export let redirectUrl = '';
	export let openExternally = false;

	// Retrieve panel state from local storage or default
	panelInfo = localStorage.getItem('--panel--panelInfo') || false;

	$: if (panelInfo) {
		// Code to handle when panel is open
	} else {
		// Code to handle when panel is closed
	}
</script>

<Accordion title="Account" initialState={overrideOpenState} {locked} {redirectUrl} {openExternally}>
	<Input
		on:input={unsavedChanges}
		theme={$Theme.theme.includes('dark') ? 'dark' : 'light'}
		label="Name"
		value={$Account?.name == 'unknown' ? 'No name set' : 'error'}
		adisabled={true}
	/>
	<Input
		on:input={unsavedChanges}
		theme={$Theme.theme.includes('dark') ? 'dark' : 'light'}
		label="Username"
		value={$Account.username}
		adisabled={true}
	/>
	<Input
		on:input={unsavedChanges}
		theme={$Theme.theme.includes('dark') ? 'dark' : 'light'}
		label="Tenant"
		value={$Website.siteName}
		adisabled={true}
	/>
	<Input
		on:input={unsavedChanges}
		theme={$Theme.theme.includes('dark') ? 'dark' : 'light'}
		label="Tenant ID"
		value={$Account.localAccountId}
		adisabled={true}
	/>
</Accordion>
