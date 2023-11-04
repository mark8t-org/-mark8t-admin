<script lang="ts">
	import { base } from '$app/paths';
	import { Services, Stores } from '@mark8t/core';

	import { requestLogout } from '../msal.config';

	$: Website = Stores.Website;
	$: Account = Stores.Account;

	let isOpen = false;
	let themeColour = 'bg-indigo-500';
	let bgColor = '';
	let colour = '';

	let isThemeOpen = false; // New state variable for theme dropdown visibility
	let isColourOpen = false; // New state variable for colour dropdown visibility

	import { Theme } from '../services';
	import { ThemePresets } from '../components/ThemePresets';

	const style = {
		orientation: 'end',
		mobileOrientation: {
			start: 'left-0',
			end: 'right-0'
		}
	};
	export let themes: Array<Theme> = ThemePresets(style, false, -1);

	const tailwindColors = [
		'bg-gray-500',
		'bg-black text-white',
		'bg-white-500 text-black',
		'bg-red-500',
		'bg-yellow-500',
		'bg-green-500',
		'bg-blue-500',
		'bg-indigo-500',
		'bg-purple-500',
		'bg-pink-500'
	];

	function setThemeColourBasedOnId(id: number) {
		Theme.set(themes[id]);
	}

	function setThemeColour(color: string) {
		themeColour = color; // Convert to the format like "bg-indigo-500"
		bgColor = 'transparent'; // Set bgColor to transparent after selecting theme color
	}

	//TODO MOVE TO STORE
	function getMultiNameInitials(account) {
		if (!account) return 'U';

		// If the account has a displayName, extract initials
		if (account.displayName) {
			return account.displayName
				.split(' ')
				.map((word) => word[0])
				.join('');
		}

		// If the account has a givenName and surname, extract initials
		if (account.givenName && account.surname) {
			return account.givenName[0] + account.surname[0];
		}

		// If the account has an email, extract initials from email
		if (account.username) {
			const emailParts = account.username.split('@');
			if (emailParts.length > 0) {
				return emailParts[0]
					.split('.')
					.map((part) => part[0])
					.join('');
			}
		}

		// Default to 'U' if no initials are found
		return 'U';
	}

	function toggleMenu() {
		isOpen = !isOpen;

		if (isOpen === false) isColourOpen = false;
	}

	function clearCache() {
		window.localStorage.clear();
		toggleMenu();
	}

	function signOut() {
		// Assuming window.signOut is a function you've defined elsewhere
		// if (typeof window.requestLogout === 'function') {
		requestLogout();
		// }
		toggleMenu();
	}
	function toggleThemeMenu() {
		isThemeOpen = !isThemeOpen;
	}
	function toggleColourOpen() {
		isColourOpen = !isColourOpen;
	}

	$: colour = themeColour;
</script>

<nav class={bgColor + ' p-4 flex justify-between items-center'}>
	<!-- -->
	<a class="text-white font-bold" href="/"
		>{$Website?.siteName} -
		<small class="font-size:2px !important;">
			{$Website?.siteUrl}
		</small></a
	>

	<!-- -->
	<div class="relative flex items-center">
		<button
			type="button"
			id="signOut"
			class="text-white focus:outline-none ml-2 flex items-center"
			on:click={toggleMenu}
		>
			<span class="px-2 md:hidden lg:block">{$Account?.username}</span>
			<span
				id="label"
				class={`${colour} rounded-full w-10 h-10 flex items-center justify-center ml-2`}
			>
				{getMultiNameInitials($Account)}
			</span>
		</button>
	</div>
</nav>
<!-- <div
	class={isOpen
		? 'opacity-100 translate-y-0 absolute'
		: 'opacity-0 translate-y-1' +
		  ' absolute left-50% transform -translate-x-50% mt-5 w-screen max-w-md px-4 transition ease-out duration-200 z-10'}
> -->
<div
	class={(isOpen
		? 'right-0 opacity-100 translate-y-0 absolute z-20'
		: 'right-0 opacity-0 translate-y-1') +
		' absolute left-50% transform -translate-x-50% mt-5 w-screen max-w-md px-4 transition ease-out duration-200 z-10'}
>
	<div
		class="flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5"
	>
		<div
			class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5"
		>
			<a
				on:click={() => {
					toggleMenu();
				}}
				href={base + '/admin/settings'}
				class={'block px-4 py-2 bg-white text-gray-800    hover:' + colour}>Profile</a
			>
			<div class="border-t"></div>

			<a
				on:click={() => {
					toggleMenu();
				}}
				href={base + '/admin'}
				class={'block px-4 py-2   text-gray-800  hover:' + colour}>Dashboard</a
			>
			<div class="border-t"></div>

			<!-- Colour Dropdown Trigger -->
			<div
				class={'relative ' + colour + ' hover:' + colour + ' px-4 py-2 cursor-pointer'}
				on:click={toggleColourOpen}
				on:keypress={toggleColourOpen}
				role="button"
				tabindex="0"
			>
				<span class="">Accent</span>

				<!-- Colour Dropdown -->
				<div
					class={(isColourOpen
						? 'right-1 opacity-100 translate-y-0 '
						: 'right-1 opacity-0 translate-y-1 pointer-events-none') +
						' fixed left-50% transform -translate-x-50% mt-5 w-screen max-w-md px-4 transition ease-out duration-200 z-10'}
				>
					<div
						class={'w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white ' +
							' text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'}
					>
						<!-- Colours -->
						{#each tailwindColors as colour}
							<span
								class={colour}
								on:click={() => setThemeColour(colour)}
								on:keypress={() => setThemeColour(colour)}
								role="button"
								tabindex="0"
							>
								<a
									class={`block px-4 py-2 text-gray-800 hover: ` +
										colour +
										` ` +
										colour +
										` hover:text-white`}
								>
									{colour.replace('bg-', '').replace('-500', '')}
								</a>
							</span>
						{/each}
					</div>
				</div>
			</div>

			<!-- Theme Dropdown Trigger -->
			<div
				class="relative px-4 py-2 cursor-pointer"
				on:click={toggleThemeMenu}
				on:keypress={toggleThemeMenu}
				role="button"
				tabindex="0"
			>
				<span class={'text-gray-800' + ' hover:' + colour}>Theme</span>

				<!-- Theme Dropdown -->
				<div
					class={(isThemeOpen
						? 'opacity-100 translate-y-0'
						: 'opacity-0 translate-y-1 pointer-events-none') +
						' fixed left-50% transform -translate-x-50% mt-5 w-screen max-w-md px-4 transition ease-out duration-200 z-10'}
				>
					<div
						class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-black text-sm leading-6 shadow-lg ring-1 ring-gray-900/5"
					>
						<!-- Themes -->
						{#each themes as theme}
							<div
								on:click={() => setThemeColourBasedOnId(theme.id)}
								role="button"
								tabindex="0"
								class={' hover:opacity-75'}
							>
								<img src={theme.image} alt={theme.theme} class="w-full h-32 object-cover" />
								<div class="p-4">
									<h3 class="font-bold">{theme.theme}</h3>
									<p>{theme.theme}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="border-t"></div>

			<a href={''} class={'block px-4 py-2'} on:click={clearCache}
				><span class={'text-gray-800 hover:'}>ClearCache</span></a
			>
			<div class="border-t"></div>
			<a href={''} class={'block px-4 py-2'} on:click={signOut}
				><span class={'text-gray-800 hover:'}>Logout</span></a
			>
		</div>
	</div>
</div>

<style lang="scss">
	.user-name-circle {
		padding: 0;
		width: 2.375rem; // 38px
		height: 2.375rem; // 38px
		border-radius: 50%;
		background-color: white;
		border: 2px solid black;
		text-align: center;
		line-height: 2.125rem; // 34px
		font-size: 1.25rem; // 20px
		color: black;
	}

	* {
		font-family: inherit;
		font-size: inherit;
	}
</style>
