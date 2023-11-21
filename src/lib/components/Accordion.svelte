<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	const dispatch = createEventDispatcher();

	export let title: string;
	export let initialState: boolean = false;
	export let disabled: boolean = false;
	export let locked: boolean = false;
	export let redirectUrl: string = '';
	export let openExternally: boolean = false;

	// Define a key for localStorage based on the title
	const localStorageKey = `--accordion-${title.replace(/\s+/g, '-').toLowerCase()}`;

	// Create a writable store and initialize it with the value from localStorage if present
	let expanded = writable(false);

	// Read the initial state from localStorage or use the default value
	$: {
		const storedState = localStorage.getItem(localStorageKey);
		if (storedState) {
			expanded.set(storedState === 'true');
		}
		if (locked) {
			expanded.set(true);
		}
	}

	// Whenever the expanded state changes, write the new state to localStorage
	$: {
		expanded.subscribe((value) => {
			localStorage.setItem(localStorageKey, value.toString());
		});
	}

	let click = () => {};

	function toggle() {
		console.log('toggle', locked, disabled, $expanded);
		if (locked && redirectUrl) {
			goto(redirectUrl);
			// window.location.href = redirectUrl;
			return;
		} else if (!disabled) {
			if (!locked) expanded.update((n) => !n);
			return;
		}
		dispatch('change', { open: $expanded });
	}

	function openInNewWindow() {
		if (redirectUrl) {
			goto(redirectUrl, { target: '_blank' });
			// window.open(redirectUrl, '_blank');
		}
	}

	onMount(() => {
		// Initial data fetch or other onMount actions can go here
	});
</script>

<div class="p-4 shadow-md rounded-lg">
	<div
		class="flex justify-between items-center cursor-pointer select-none"
		role="button"
		aria-expanded={$expanded}
		aria-controls="details"
		tabindex="0"
		on:click={toggle}
		on:keypress={(e) => {
			if (e.key === 'Enter') toggle();
		}}
	>
		<h2 class="text-xl font-semibold" id="heading">{title}</h2>
		<div class="flex items-center">
			{#if openExternally}
				<!-- <a
					href={redirectUrl}
					target="popup"
					on:click={"window.open('" +
						redirectUrl +
						"','popup','width=600,height=600'); return false;"}
				>
					Open Link in Popup
				</a> -->
				<button
					class="p-2 mr-2 rounded-full"
					aria-label="Open in new window"
					target="_blank"
					on:click|stopPropagation={openInNewWindow}
				>
					<!-- Icon for external link -->
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14 13l3 3m0 0l-3 3m3-3H10a2 2 0 01-2-2V7"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M17 17H7V7h7"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			{/if}
			{#if !locked}
				<div class={'p-2 rounded-full'}>
					<svg
						class={$expanded ? 'transform rotate-180' : ''}
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8 9l4 4 4-4"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
			{/if}
		</div>
	</div>
	{#if $expanded}
		<div id="details" aria-labelledby="heading" class="mt-4 space-y-4" transition:slide>
			<slot />
		</div>
	{/if}
</div>
