<script>
	import { onMount } from 'svelte';

	import { base } from '$app/paths';

	import Button, { Label } from '@smui/button';
	import IconButton, { Icon } from '@smui/icon-button';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import Card, { PrimaryAction, Actions, ActionButtons, ActionIcons } from '@smui/card';

	import { Utils, Stores } from '@mark8t/core';

	export let product;
	export let removeProduct;
	export let unsavedChanges;

	let data;
	let openDialogForEditing = false;
</script>

<Card
	on:click={(e) => {
		data = product;
		console.log(data);
		openDialogForEditing = true;
		e.stopPropagation();
	}}
>
	<span style="content: '\003F';opacity:0.01;left:37%;top:40%;font-size:166px;position:absolute;">
		&#63;</span
	>
	<img src={product.thumb} class="img" />
	<Content class="center p-2">{product.name}</Content>
	<Actions>
		<ActionButtons>
			<Button
				on:click={(e) => {
					data = product;
					console.log(data);
					openDialogForEditing = true;
					e.stopPropagation();
				}}
			>
				<Label style="color:var(--primary) !important;">Edit</Label>
			</Button>
			<Button
				style="color:red;"
				on:click={(e) => {
					if (confirm('Are you sure you want to delete ' + product.name + '?')) {
						removeProduct(product.id);
					}
					e.stopPropagation();
				}}
			>
				<Label>Delete</Label>
			</Button>
		</ActionButtons>
		<ActionIcons>
			<IconButton
				on:click={() => {
					product.featured = !product.featured;
					// unsavedChanges();
				}}
				toggle
				aria-label="Add to featured"
				title="Add to featured"
			>
				<Icon class="material-icons" on>favorite</Icon>
				<Icon class="material-icons">favorite_border</Icon>
			</IconButton>
			<IconButton
				class="material-icons"
				on:click={() => {
					// if product has hidden add it, otherwise remove it
					if (Utils.Common.hasTag(product, 'hiddden')) {
						product.tags = product.tags.filter((tag) => tag !== 'hiddden');
					} else {
						product.tags.push('hiddden');
					}
					unsavedChanges();
				}}
				title="Share"
				>{Utils.Common.hasTag(product, 'hiddden') ? 'visibility_off' : 'visibility'}</IconButton
			>
			<!-- <IconButton
            class="material-icons"
            on:click={() => clicked++}
            title="More options">more_vert</IconButton
          > -->
		</ActionIcons>
	</Actions>
</Card>

<style>
	.img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		max-width: 275px;
	}
	:global(.mdc-card) {
		margin: 7px;
	}
</style>
