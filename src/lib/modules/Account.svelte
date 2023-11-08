<script lang="ts">
	import { onMount } from 'svelte';

	import { Components, Stores } from '@mark8t/core';
	import Input from '../components/Input.svelte';
	import Accordion from '../components/Accordion.svelte';

	export let unsavedChanges: () => void;
	export let overrideOpenState = false;

	let { Account, Website } = Stores;
	let panelInfo = false;
	export let locked = false;
	export let redirectUrl = '';
	export let openExternally = false;

	// Retrieve panel state from local storage or default
	panelInfo = localStorage.getItem('--panel--panelInfo') || false;

	function unsavedAreYouSureChanges() {
		if (confirm('Are you sure you want to discard changes?')) {
			unsavedChanges();
		} else {
			// Get latest data from local storage or another source
			// getLatestDataFromLocalStorage();
		}
	}

	onMount(() => {
		console.log(Components);
		console.log(panelInfo);
	});

	$: if (panelInfo) {
		// Code to handle when panel is open
	} else {
		// Code to handle when panel is closed
	}
</script>

<Accordion title="Account" initialState={overrideOpenState} {locked} {redirectUrl} {openExternally}>
	<Input label="Name" value={$Account?.name} disabled={true} />
	<Input label="Username" value={$Account?.username} disabled={true} />
	<Input label="Tenant" value={$Website?.siteName} disabled={true} />
	<Input label="Tenant ID" value={$Account?.localAccountId} disabled={true} />
</Accordion>
