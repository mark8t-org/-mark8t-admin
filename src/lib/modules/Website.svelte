<script>
	import { onMount } from 'svelte';

	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import IconButton, { Icon } from '@smui/icon-button';
	import Textfield from '@smui/textfield';

	import { Stores, Components } from '@mark8t/core';
	export let unsavedChanges;
	export let overrideOpenState;
	let panelWebsite = false;
	panelWebsite = localStorage.getObject('--panel--panelWebsite');
	$: website = {};

	let data = {};
	const standardFields = {
		// 'siteAddress': '',
		siteName: 'Site Name',
		siteDescription: 'Site Description',
		siteKeywords: 'Site Keywords'
		// 'siteLogo': '',
		// 'siteFavicon': '',
		// 'siteUrl': '',
		// 'siteContact': '',
		// 'siteContactPhone': '',
		// 'siteContactEmail': '',
	};

	if (overrideOpenState) panelWebsite = true;

	onMount(() => {
		// Stores.Website.STORE_WEBSITE.subscribe((value) => {
		// 	website = value || {};
		// });
	});
</script>

<Accordion>
	<Panel
		bind:open={panelWebsite}
		on:click={(e) => {
			localStorage.setObject('--panel--panelWebsite', panelWebsite);
		}}
	>
		<Header>
			<strong class="mdc-typography--headline6">Website</strong>
			<IconButton slot="icon" toggle pressed={panelWebsite}>
				<Icon class="material-icons" on>expand_less</Icon>
				<Icon class="material-icons">expand_more</Icon>
			</IconButton>
		</Header>
		<!-- <Content class="mdc-typography--body2">
			{#each Object.entries(standardFields) as [key, value]}
				<Components.Web.Static.Input
					bind:value={website[key]}
					label={value}
					input={unsavedChanges}
				/>
			{/each}
		</Content> -->
	</Panel>
</Accordion>
