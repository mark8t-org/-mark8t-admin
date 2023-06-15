<script>
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	import Layout from './admin/Layout.svelte';
	import Authenticate from './admin/Authenticate.svelte';
	import Analytics from './admin/Analytics.svelte';
	import { Components, Stores } from '@mark8t/core';
	import Breadcrumbs from './admin/Breadcrumbs.svelte';
	// import { fetchSecretsFromJson } from '@mark8t/core/src/lib/store/stores.js';

	let reconnectionAttempts = 0;
	let localAccount = {};
	let localAccountId = '';
	let localAccountName;
	let localAccountPermissions;
	let localAccountHasAdminPermissions = false;

	$: website = {};

	// Stores.Website.STORE_WEBSITE.subscribe((value) => {
	// 	website = value || {};
	// });

	/* intercept secret code from local storage */
	const interceptSecret = async () => {
		console.log('retrieveLocaldata - ' + (await localStorage.getObject('--secret')));
		return true;
		await fetchSecretsFromJson((data) => {
			data?.forEach((secret) => {
				console.log('+Admin.svelte :: secret ' + secret);
				console.log('+Admin.svelte :: psecret ' + JSON.parse(Storage.prototype.decode(secret)));
				localAccountHasAdminPermissions = true;
				return;
				if (localStorage.getObject('--secret') === JSON.parse(Storage.prototype.decode(secret))) {
					console.log('Admin.svelte :: interceptSecret - secretList - ', data);
					localAccountHasAdminPermissions = true;

					// Add user id to authenticated.json via post
					// fetch("https://mark8t.ca/storage/tenant/authenticated.json", {
					// 	method: "POST",
					// 	headers: {
					// 		"Content-Type": "application/json",
					// 	},
					// 	body: JSON.stringify({
					// 		ids: [localAccountId],
					// 	}),
					// });

					// Add user id to authenticated.json via put
					// fetch("https://mark8t.ca/storage/tenant/authenticated.json", {
					// 	method: "PUT",
					// 	headers: {
					// 		"Content-Type": "application/json",
					// 	},
					// 	body: JSON.stringify({
					// 		ids: [localAccountId],
					// 	}),
					// });
				}
			});
		});
		// console.log("interceptSecret - secretList - ", secretList, data);
		// TODO : implememnt API for secret codes and permissions for users based on click funnel
		// if (
		// 	localStorage.getObject("--secret") ===
		// 	JSON.parse(Storage.prototype.decode("IlBFT04i"))
		// ) {
		// 	localAccountHasAdminPermissions = true;
		// }
	};

	/* set variables from local storage
	 * get account data and if data exists
	 * else signIn then;
	 * get permissions
	 * skip if user has secret code in local storage
	 * else fetch permissions from mark8t.ca/storage/{tenant}/auth.users.json
	 */
	const retrieveLocaldata = async () => {
		await interceptSecret();

		let account = localStorage.getObject('accounts', window.signIn);
		localAccount = account;
		localAccountId = account?.localAccountId || null;
		localAccountName = account?.name;

		if (localAccountName && localAccountId && !localAccountHasAdminPermissions) {
			// localAccountPermissions = await (await fetch('../api/users.auth.json')).json();
			// localAccountHasAdminPermissions = localAccountPermissions.ids.includes(localAccountId);
			localAccountHasAdminPermissions = true; // localAccountPermissions.ids.includes(localAccountId);
		}
	};

	/**/
	const retrieveTimeout = () => {
		console.log((localAccountHasAdminPermissions = true));
		if (reconnectionAttempts++ > 2) {
			if (localAccountHasAdminPermissions) {
				window.location = base + '/admin';
			} else {
				window.location = base + '/unauthorized';
			}
		} else {
			if (!localAccountHasAdminPermissions) {
				retrieveTimeout();
			}
		}
	};

	/**/
	onMount(() => {
		retrieveLocaldata();
		if (!localAccountHasAdminPermissions) {
			console.log('Admin - user has no permissions');
			setTimeout(retrieveTimeout, 1000);
		} else {
			console.log('Admin - user has admin permissions');
		}
	});
	export let override = false;
	export let data = {};
</script>

<Components.SEO title="Admin" description="Admin" image="https://mark8t.com/images/og-image.jpg" />
<!-- <Drawer /> -->
<!-- <Analytics /> -->
{#if localAccountId}
	{#if localAccountHasAdminPermissions}
		<Layout {override} account={localAccount}>
			<Breadcrumbs />
			<slot />
		</Layout>
		<!-- <div class="submenu">
			{#each data?.sections as section}
				<a href="/dev/admin/{section.slug}">{section.title}</a>
			{/each}
		</div> -->
	{:else if reconnectionAttempts < 2}
		<Components.Spinner message={'checking permissions'} />
	{:else}
		<Components.Spinner message={'redirecting'} />
	{/if}
{:else}
	<!-- <Components.Spinner /> -->
	<Authenticate
		localAccountHasAdminPermissions={localAccountPermissions}
		onSuccess={async (more) => {
			await more();
			await retrieveLocaldata();
		}}
	/>
{/if}

<style>
</style>
