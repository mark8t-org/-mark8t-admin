<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// import Theme from '../stores/Theme';

	export let label: string;
	export let value: string = '';
	export let disabled: boolean = false;
	export let placeholder: string = '';
	export let theme: 'light' | 'dark' = 'light'; // Default to light theme

	const dispatch = createEventDispatcher<{
		input: string;
		focus: FocusEvent;
		blur: FocusEvent;
	}>();

	let inputId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
	let errorMessageId = `${inputId}-error-message`;

	function handleInput(event: Event) {
		value = (event.target as HTMLInputElement).value;
		dispatch('input', value);
	}

	function handleFocus(event: FocusEvent) {
		dispatch('focus', event);
	}

	function handleBlur(event: FocusEvent) {
		dispatch('blur', event);
	}
</script>

<div class="relative">
	{#if label}
		<label
			for={inputId}
			class={`block text-sm font-medium leading-5
        ${theme === 'dark' ? 'text-white' : 'text-gray-700'}
        md:text-base lg:text-lg`}
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
		class={`mt-1 block w-full px-3 py-2 bg-transparent border rounded-md text-sm shadow-sm
      ${
				theme === 'dark'
					? 'border-gray-600 text-white placeholder-gray-100'
					: 'border-gray-300 text-gray-700 placeholder-gray-400'
			}
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:text-gray-500 disabled:border-gray-200
      text-base md:text-lg lg:text-xl`}
		on:input={handleInput}
		on:focus={handleFocus}
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
			<svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 20 20" fill="none" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 6L14 14M14 6L6 14" />
			</svg>
		</button>
	{/if}
	{#if !value}
		<span
			id={errorMessageId}
			class="text-xs text-red-600"
			aria-live="assertive"
			md:text-sm
			lg:text-base
		>
			This field is required.
		</span>
	{/if}
</div>
