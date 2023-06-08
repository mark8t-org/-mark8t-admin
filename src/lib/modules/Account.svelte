<script lang="ts">
	import { onMount } from 'svelte';
	import { Panel, Header, Content } from '@smui-extra/accordion';
	import IconButton, { Icon } from '@smui/icon-button';

	import { Components, Stores } from '@mark8t/core';
	export let unsavedChanges;
	export let overrideOpenState = false;

	let panelInfo = false;
	panelInfo = localStorage.getObject('--panel--panelInfo');
	let panelContactInfo = localStorage.getObject('--panel--panelContactInfo');
	let account = {};
	let website = {};

	//...
	function unsavedAreYouSureChanges() {
		if (confirm('are you sure you want to change this?')) {
			unsavedChanges();
		} else {
			getLatestDataFromLocalStorage();
		}
	}

	if (overrideOpenState) panelInfo = true;
	//...
	onMount(() => {
		Stores.Account.subscribe((value) => {
			account = value || {};
			console.log(value);
		});
		Stores.Website.STORE_WEBSITE.subscribe((value) => {
			website = value;
		});
	});
</script>

<Panel
	bind:open={panelInfo}
	on:click={(e) => {
		localStorage.setObject('--panel--panelInfo', panelInfo);
	}}
>
	<Header style="cursor:pointer;">
		<strong class="mdc-typography--headline6">Account</strong>
		<IconButton slot="icon" toggle pressed={panelInfo} hidden={overrideOpenState}>
			<Icon class="material-icons" on>expand_less</Icon>
			<Icon class="material-icons">expand_more</Icon>
		</IconButton>
	</Header>
	<Content>
		<Components.Web.Static.Input label="Name" bind:value={account.name} disabled={true} />
		<Components.Web.Static.Input label="Username" bind:value={account.username} disabled={true} />
		<Components.Web.Static.Input label="Tenant" bind:value={website.siteName} disabled={true} />
		<Components.Web.Static.Input
			label="Tenant ID"
			bind:value={account.localAccountId}
			disabled={true}
		/>
	</Content>
</Panel>
