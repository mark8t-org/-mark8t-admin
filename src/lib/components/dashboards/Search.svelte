<script lang="ts">
	let searchText: string = '';
	let showDropdown: boolean = false;
	let isLoading: boolean = false;
	const cache = new Map<string, string[]>(); // Cache to store search results

	const items = [
		'Option 1',
		'Option 2',
		'Option 3',
		'Option 4',
		'Option 5',
		{
			id: 0
		}
	]; // Example items, replace with actual data
	let filteredItems: string[];

	const fetchItems = (searchTerm: string): Promise<string[]> => {
		// Simulate fetching data with a delay
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve([
					...items.filter((item) => String(item).toLowerCase().includes(searchTerm.toLowerCase()))
				]);
			}, 500);
		});
	};

	$: {
		if (searchText) {
			// Check cache first
			if (cache.has(searchText)) {
				filteredItems = cache.get(searchText);
			} else {
				isLoading = true;
				fetchItems(searchText).then((results) => {
					cache.set(searchText, results); // Store results in cache
					filteredItems = results;
					isLoading = false;
				});
			}
		} else {
			filteredItems = [];
		}
	}

	function handleInput(event: Event) {
		searchText = (event.target as HTMLInputElement).value;
		showDropdown = searchText.length > 0;
	}

	function handleBlur() {
		setTimeout(() => {
			showDropdown = false;
		}, 100); // Delay to allow click event on dropdown items
	}

	function clearSearch() {
		searchText = '';
		showDropdown = false;
	}
</script>

<div class="relative">
	<input
		type="text"
		placeholder="Search..."
		class="form-input px-4 py-2 w-full bg-transparent text-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
		style="background-color: rgba(146, 151, 179, 0.13);"
		bind:value={searchText}
		on:input={handleInput}
		on:blur={handleBlur}
	/>
	{#if searchText}
		<button
			class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
			on:click={clearSearch}
		>
			X
		</button>
	{/if}

	{#if showDropdown}
		<div
			class="absolute z-10 w-full bg-white text-black border border-gray-200 rounded-md mt-1 max-h-60 overflow-auto"
		>
			{#if isLoading}
				<div class="px-4 py-2">Loading...</div>
			{:else if filteredItems.length === 0}
				<div class="px-4 py-2">No results found</div>
			{:else}
				{#each filteredItems as item (item)}
					<div
						class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
						on:click={() => console.log(`Selected: ${item}`)}
					>
						{item}
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	.form-input {
		@apply border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm;
	}
</style>
