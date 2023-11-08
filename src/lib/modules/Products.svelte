<script>
	import { onMount } from 'svelte';

	import { base } from '$app/paths';

	import Accordion from '../components/Accordion.svelte';

	import Product from '../admin/Product.svelte';
	import '../admin/View.svelte.scss?inline';
	// import ContactList from "../ContactList.svelte";
	// import DialogForEditing from "../DialogForEditing.svelte";

	// import Breadcrumbs from "../admin/Breadcrumbs.svelte";

	// import Modules from "../modules/index.js";

	// import { _NEW_PRODUCT_ } from '../../schema.js';
	import { Utils, Stores } from '@mark8t/core';

	const Products = Stores.Products;
	const Website = Stores.Website;
	const Google = Stores.Google;
	const Account = Stores.Account;
	export let overrideOpenState;
	export let override = false;
	let productContainer;
	let layoutContainer;

	let openBanner = false;
	let centered = false;
	let mobileStacked = true;

	export let locked = false;
	export let redirectUrl = '';
	export let openExternally = false;

	let openDialogForEditing = false;
	let data = {};
	let clicked = 0;

	let open = false;
	let active = 'Inbox';

	let panelProducts = true;

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

	// Function to handle external opening
	function handleExternalOpen() {
		if (openExternally && redirectUrl) {
			window.open(redirectUrl, '_blank');
		}
	}

	let AreYouSureChanges = 'are you sure you want to change this?';

	// import {
	// 	fetchAdmin,
	// 	getAccountDataFromLocalStorage,
	// } from '../../stores.js';
	import Overview from '../admin/Overview.svelte';
	import OverviewModules from '../admin/OverviewModules.svelte';
	import SavedChanges from '../admin/SavedChanges.svelte';

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

	//
	function getPanelInfo() {
		panelProducts = localStorage.getObject('--panel--panelProducts');
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
		// if (confirm($Translations.AreYouSureChanges)) {
		if (confirm(AreYouSureChanges)) {
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

	onMount(() => {
		//TODO
		// getAccountDataFromLocalStorage();
		getPanelInfo();
		// fetchAdmin();

		// getWebsiteInfoFromJson();
		// getProductsInfoFromJson();
		// getGoogleInfoFromJson();
	});
</script>

<Accordion
	title="Products"
	initialState={overrideOpenState}
	{locked}
	{redirectUrl}
	{openExternally}
>
	<div class="flex flex-wrap justify-center overflow-auto">
		<!-- Add New Product Card -->
		<div
			class="m-2 p-4 min-w-[275px] min-h-[275px] bg-white border border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer"
			on:click={onAddProduct}
		>
			<span class="text-6xl text-gray-300">+</span>
		</div>
		<!-- Product Cards -->
		{#each products as product, i}
			<Product {product} {removeProduct} {unsavedChanges} />
		{/each}
	</div>
</Accordion>
