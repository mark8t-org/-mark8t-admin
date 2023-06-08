<script>
	import { onMount } from 'svelte';
	import { Panel, Header, Content } from '@smui-extra/accordion';
	import IconButton, { Icon } from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import { Stores, Components } from '@mark8t/core';

	let panelInfo = false;
	let panelContactInfo = false;
	panelInfo = localStorage.getObject('--panel--panelInfo');
	panelContactInfo = localStorage.getObject('--panel--panelContactInfo');
	$: account = {};
	$: website = {};

	export let unsavedChanges;
	export let overrideOpenState;

	const unsavedAreYouSureChanges = () => {
		if (confirm('are you sure you want to change this?')) {
			unsavedChanges();
		} else {
			getLatestDataFromLocalStorage();
		}
	};

	onMount(() => {
		Stores.Account.subscribe((value) => {
			account = value || {};
		});
		Stores.Website.STORE_WEBSITE.subscribe((value) => {
			website = value || {};
		});
		if (overrideOpenState) panelInfo = true;
	});
</script>

<!-- CONTACT INFO -->
<Panel
	bind:open={panelContactInfo}
	on:click={(e) => {
		localStorage.setObject('--panel--panelContactInfo', panelContactInfo);
	}}
>
	<Header>
		<strong class="mdc-typography--headline6">Contact & Social</strong>
		<span slot="description" />
		<IconButton slot="icon" toggle pressed={panelContactInfo}>
			<Icon class="material-icons" on>expand_less</Icon>
			<Icon class="material-icons">expand_more</Icon>
		</IconButton>
	</Header>
	<Content>
		<Components.Web.Static.Input
			label="Phone"
			class="w-100"
			type="tel"
			pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
			maxlength="17"
			bind:value={website.siteContactPhone}
			input={unsavedChanges}
		/>
		<Components.Web.Static.Input
			label="Email"
			class="w-100"
			bind:value={website.siteContactEmail}
			input={unsavedChanges}
		/>
		<Components.Web.Static.Input
			label="Facebook"
			class="w-100"
			bind:value={website.siteContactFacebook}
			input={unsavedChanges}
		/>
		<Components.Web.Static.Input
			label="Instagram"
			class="w-100"
			bind:value={website.siteContactInstagram}
			input={unsavedChanges}
		/>
	</Content>
</Panel>
