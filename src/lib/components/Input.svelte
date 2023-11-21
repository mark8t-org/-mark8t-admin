<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// Exported properties with TypeScript types and default values
	export let label: string;
	export let value: string = '';
	export let disabled: boolean = false;
	export let placeholder: string = '';
	export let theme: 'light' | 'dark' = 'light'; // Default to light theme

	// Event dispatcher to handle input, focus, and blur events
	const dispatch = createEventDispatcher<{
		input: string;
		focus: FocusEvent;
		blur: FocusEvent;
	}>();

	// Generate unique IDs for input and error message elements
	let inputId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
	let errorMessageId = `${inputId}-error-message`;

	// Handle input changes, dispatching the new value
	function handleInput(event: Event) {
		value = (event.target as HTMLInputElement).value;
		dispatch('input', value);
	}

	// Handle focus event, select all text, and dispatch event
	function handleFocus(event: FocusEvent) {
		(event.target as HTMLInputElement).select();
		dispatch('focus', event);
	}

	// Handle blur event and dispatch event
	function handleBlur(event: FocusEvent) {
		dispatch('blur', event);
	}
</script>

<!-- Component structure with dynamic classes based on the theme -->
<div class="relative">
	{#if label}
		<label
			for={inputId}
			class={`block text-sm font-medium leading-5 ${
				theme === 'dark' ? 'text-white' : 'text-gray-700'
			} md:text-base lg:text-lg`}
		>
			{label}
		</label>
	{/if}
	<input
		type="text"
		bind:value
		id={inputId}
		{placeholder}
		{disabled}
		style="cursor:cell;"
		class={`mt-1 block w-full px-3 py-2 bg-transparent border rounded-md text-sm shadow-sm
      ${
				theme === 'dark'
					? 'border-gray-600 text-white placeholder-gray-400 disabled:text-white'
					: 'border-gray-300 text-gray-700 placeholder-gray-400'
			}
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:text-gray-500 disabled:border-gray-200
      text-base md:text-lg lg:text-xl`}
		on:input={handleInput}
		on:focus={handleFocus}
		on:click={handleFocus}
		on:blur={handleBlur}
		aria-invalid={value ? 'false' : 'true'}
		aria-describedby={value ? '' : errorMessageId}
		aria-required="true"
	/>
	{#if value && !disabled}
		<button
			type="button"
			class={`absolute inset-y-0 right-0 pr-3 flex items-center justify-center w-10 h-10
        ${theme === 'dark' ? 'text-white' : 'text-gray-700'}
        md:w-12 md:h-12`}
			aria-label="Clear input"
			on:click={() => (value = '')}
		>
			<!-- SVG for clear icon -->
			<svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 20 20" fill="none" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 6L14 14M14 6L6 14" />
			</svg>
		</button>
	{/if}
	{#if !value}
		<span
			id={errorMessageId}
			class="text-xs text-red-600 md:text-sm
			lg:text-base"
			aria-live="assertive"
		>
			This field is required.
		</span>
	{/if}
</div>
