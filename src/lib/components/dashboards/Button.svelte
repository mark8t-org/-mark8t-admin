<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	export let type = 'regular'; // 'regular', 'split', 'dropdown'
	export let buttonText = ''; // Default button text
	export let hoverColor = 'bg-gray-100'; // Default hover color
	export let textColor = 'text-gray-500'; // Default text color
	export let backgroundColor = 'bg-white'; // Default background color
	let buttonElement;
	interface MenuItem {
		text: string;
		href: string;
	}
	export let menuItems: MenuItem[] = []; // Default empty menu items
	let menuOpen = false;

	// Function to toggle the dropdown menu
	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	// Action: Click outside
	function clickOutside(node) {
		const handleClickOutside = (event) => {
			if (node && !node.contains(event.target) && menuOpen) {
				menuOpen = false;
			}
		};

		// Register the click outside handler
		onMount(() => window.addEventListener('click', handleClickOutside));

		// Cleanup the event listener when the component is destroyed
		onDestroy(() => window.removeEventListener('click', handleClickOutside));

		return {
			destroy() {
				window.removeEventListener('click', handleClickOutside);
			}
		};
	}
</script>

<!-- Regular Button -->
{#if type === 'regular'}
	<button
		class={`border-gray-500 rounded-full px-5 py-2 border ${textColor} ${hoverColor} focus:outline-none`}
	>
		{buttonText}
	</button>

	<!-- Split Button -->
{:else if type === 'split'}
	<div class="inline-flex">
		<button
			class={`border-gray-500 rounded-l-full px-5 py-2 border-y border-l ${textColor} ${hoverColor} focus:outline-none`}
		>
			{buttonText}
		</button>
		<button
			class={`border-gray-500 rounded-r-full px-2 py-2 border-y border-r ${textColor} ${hoverColor} focus:outline-none flex items-center justify-center`}
		>
			<!-- SVG for the split button icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
			</svg>
		</button>
	</div>

	<!-- Dropdown Button -->
{:else if type === 'dropdown'}
	<div class="relative inline-flex" bind:this={buttonElement} use:clickOutside>
		<button
			class={`border-gray-500 rounded-l-full px-5 py-2 border-y border-l ${textColor} ${hoverColor} focus:outline-none`}
		>
			{buttonText}
		</button>
		<button
			on:click={toggleMenu}
			class={`border-gray-500 rounded-r-full px-2 py-2 border-y border-r ${textColor} ${hoverColor} focus:outline-none flex items-center justify-center`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
			</svg>
		</button>
		{#if menuOpen}
			<div class={`absolute right-0 mt-2 w-48 ${backgroundColor} rounded-md shadow-lg py-1 z-50`}>
				{#each menuItems as item}
					<a
						href={item.href}
						class={`block px-4 py-2 ${textColor} hover:${hoverColor}`}
						on:click={() => (menuOpen = false)}>{item.text}</a
					>
				{/each}
			</div>
		{/if}
	</div>
{/if}
