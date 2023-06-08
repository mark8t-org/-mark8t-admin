<script>
	import { onMount } from 'svelte';

	import { base } from '$app/paths';

	import Card, { PrimaryAction, Actions, ActionButtons, ActionIcons } from '@smui/card';

	// import AdminDrawer from "../admin/AdminDrawer.svelte";

	// import Input from "@smui/textfield";
	// import Checkbox from "@smui/checkbox";
	// import FormField from "@smui/form-field";
	import Button, { Label } from '@smui/button';
	import Banner, { CloseReason } from '@smui/banner';
	import IconButton, { Icon } from '@smui/icon-button';
	// import Paper, { Title, Subtitle } from "@smui/paper";
	// import TopAppBar, { Row, Section } from "@smui/top-app-bar";
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
	import Product from '../admin/Product.svelte';
	import '../admin/View.svelte.scss?inline';
	// import ContactList from "../ContactList.svelte";
	// import DialogForEditing from "../DialogForEditing.svelte";

	// import Breadcrumbs from "../admin/Breadcrumbs.svelte";

	// import Modules from "../modules/index.js";

	// import { _NEW_PRODUCT_ } from '../../schema.js';
	import { Utils, Stores } from '@mark8t/core';
	let productContainer;
	let layoutContainer;

	let openBanner = false;
	let centered = false;
	let mobileStacked = true;

	const closedReasons = {
		[CloseReason.PRIMARY]: 'Primary',
		[CloseReason.SECONDARY]: 'Secondary',
		[CloseReason.UNSPECIFIED]: 'Unspecified'
	};
	let closedReason = 'None yet.';

	let openDialogForEditing = false;
	let data = {};
	let clicked = 0;

	let open = false;
	let active = 'Inbox';

	let panelInfo = false;
	let panelProducts = false;
	let pFeatured = false;
	let panel1Open = false;
	let panelContactInfo = false;
	let panel3Open = false;
	let panel4Open = false;
	let panelLayouts = false;
	let panelWebsite = false;

	// let account;
	// let email = '';
	// let name = '';
	// let tenant = '';
	// let tenantid = '';
	let layoutSelected;
	$: account = {};
	$: google = {};
	$: website = {};
	$: products = [];
	$: layouts = [
		{
			name: 'Default Layout',
			description: 'New Product Description',
			price: 0,
			image: 'https://via.placeholder.com/150',
			link: 'https://via.placeholder.com/150',
			id: 0
		}
	];

	// import {
	// 	fetchAdmin,
	// 	getAccountDataFromLocalStorage,
	// 	_API_STORE_ACCOUNT_,
	// 	_API_STORE_WEBSITE_,
	// 	_API_STORE_PRODUCTS_,
	// 	_API_STORE_GOOGLE_
	// } from '../../stores.js';
	import Overview from '../admin/Overview.svelte';
	import OverviewModules from '../admin/OverviewModules.svelte';
	import SavedChanges from '../admin/SavedChanges.svelte';

	//
	function handleBannerClosed(event) {
		closedReason = closedReasons[event.detail.reason];
	}

	//
	function setActive(value) {
		active = value;
		open = false;
	}

	//TODO: MOVE SOME VARIABLES TO STORE
	function getLatestDataFromLocalStorage() {
		//msal account
		//account = JSON.parse(localStorage.getItem('accounts'));

		//tenant data
		// website = JSON.parse(localStorage.getItem('--store-website'));
		// products = JSON.parse(localStorage.getItem('--store-products')) || [];
		// products?.sort((a, b) => a.id - b.id).reverse();
		// google = JSON.parse(localStorage.getItem('--store-google'));

		layoutSelected = JSON.parse(localStorage.getObject('--data-layoutSelected')) || layouts[0];
	}

	// //
	// function getAccountInfo() {
	//   name = account.name;
	//   email = account.username;
	//   tenantid = account.localAccountId;
	// }

	//
	function getPanelInfo() {
		panelInfo = localStorage.getObject('--panel--panelInfo');
		panelProducts = localStorage.getObject('--panel--panelProducts');
		panel1Open = localStorage.getObject('--panel--panel1Open');
		panelContactInfo = localStorage.getObject('--panel--panelContactInfo');
		panel3Open = localStorage.getObject('--panel--panel3Open');
		panel4Open = localStorage.getObject('--panel--panel4Open');
		panelLayouts = false; // localStorage.getObject("--panel--panelLayouts");
		panelWebsite = localStorage.getObject('--panel--panelWebsite');
		pFeatured = localStorage.getObject('--panel--featured');
	}

	// scroll product section when hovering with mouse and using scroll wheel
	const handleWheel = (e) => {
		let t = productContainer.getElement();

		if (t.scrollLeft >= 0 && t.scrollLeft < t.scrollWidth - t.clientWidth) {
			t.scrollLeft += e.deltaY;
		}
		if (t.scrollLeft > 0 && t.scrollLeft < t.scrollWidth - t.clientWidth - 1) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	//
	const unsavedAreYouSureChanges = () => {
		if (confirm('are you sure you want to change this?')) {
			unsavedChanges();
		} else {
			getLatestDataFromLocalStorage();
		}
	};

	//
	const unsavedChanges = () => {
		openBanner = true;
		open = true;
	};

	// TODO: call network service to set data
	async function onSave() {
		//console.log(postJson);
		//localStorage.setItem('accounts', JSON.stringify(account));
		await Stores.Products.postJsonToTenant(website, 'website.json');
		await Stores.Products.postJsonToTenant(google, 'google.json');
		await Stores.Products.postJsonToTenant(products, 'products.json');

		localStorage.setObject('--store-website', website, 1);
		localStorage.setObject('--store-products', products, 1);
		localStorage.setObject('--store-google', google, 30);

		getPanelInfo();
		fetchAdmin();

		openDialogForEditing = false;
	}

	//
	async function onDiscard() {
		getLatestDataFromLocalStorage();
		fetchAdmin();
	}

	// first step in adding product
	function onAddProduct() {
		let product = Utils.Schema._NEW_PRODUCT_(products);

		data = product;

		openDialogForEditing = true;
		return;
	}

	// save new products
	function onSaveProducts(newProduct) {
		if (products.indexOf(newProduct) === -1 && products.push(newProduct)) {
			localStorage.setObject('--store-products', products, 1);
		} else {
			products[products.indexOf(newProduct)] = newProduct;
			localStorage.setObject('--store-products', products, 1);
		}
		products = [...products];
		//sort products by id
		products?.sort((a, b) => a.id - b.id).reverse();
		openDialogForEditing = false;
		open = true;
		unsavedChanges();
	}

	//remove product by id from array
	function removeProduct(id) {
		products = products.filter((product) => product.id !== id);
		unsavedChanges();
	}

	// let scrollPosition;
	// $: () => {
	//   document.getElementById(
	//     "saved-changes"
	//   ).style = `position:absolute;top: ${scrollPosition}px;`;
	// };
	export let override = false;

	onMount(() => {
		//TODO
		// getAccountDataFromLocalStorage();
		getPanelInfo();
		// fetchAdmin();

		// getWebsiteInfoFromJson();
		// getProductsInfoFromJson();
		// getGoogleInfoFromJson();

		Stores.Account.subscribe((value) => {
			account = value || {};
		});
		Stores.Website.STORE_WEBSITE.subscribe((value) => {
			website = value || {};
		});
		Stores.Products.STORE_PRODUCTS.subscribe((value) => {
			products = value || [];
		});
		Stores.Website.STORE_GOOGLE.subscribe((value) => {
			google = value || {};
		});
	});
</script>

<Panel
	bind:open={panelProducts}
	on:click={(e) => {
		localStorage.setObject('--panel--panelProducts', panelProducts);
	}}
>
	<Header>
		<strong class="mdc-typography--headline6">Products</strong>
		<IconButton slot="icon" toggle pressed={panelProducts}>
			<Icon class="material-icons" on>expand_less</Icon>
			<Icon class="material-icons">expand_more</Icon>
		</IconButton>

		<Button
			raised
			disabled={!panelProducts}
			on:click={(e) => {
				onAddProduct();
				e.preventDefault();
				e.stopPropagation();
			}}>Add New</Button
		>
		<Button
			raised
			on:click={(e) => {
				e.preventDefault();
				e.stopPropagation();
				window.location.href = base + '/admin/products';
			}}>View All</Button
		>
		<!-- <Button raised on:click={onAddProduct}>View All</Button> -->
	</Header>
	<Content
		bind:this={productContainer}
		style="display:flex;overflow:auto;flex-flow:wrap;justify-content:center;"
		on:wheel={handleWheel}
	>
		<Card style="min-width:275px;min-height:275px;margin:0.5rem;" on:click={onAddProduct}>
			<span class="plus">+</span>
			<Content>{''}</Content>
			<Actions style="opacity:0; user-events:none;">
				<ActionButtons>
					<Button
						on:click={() => {
							openDialogForEditing = true;
						}}
					>
						<Label>Edit</Label>
					</Button>
					<Button style="color:red;" on:click={() => clicked++}>
						<Label>Delete</Label>
					</Button>
				</ActionButtons>
			</Actions>
		</Card>
		{#each products as product, i}
			<Product {product} {removeProduct} {unsavedChanges} />
		{/each}
	</Content>
</Panel>

<style>
	.plus {
		content: '\003F';
		opacity: 0.1;
		left: 32%;
		top: 40%;
		font-size: 166px;
		position: absolute;
	}
	.img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		max-width: 275px;
	}
</style>
