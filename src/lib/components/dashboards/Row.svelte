<script lang="ts">
	import Button from './Button.svelte';
	interface RowOptions {
		text: string;
		href: string;
	}
	interface Row {
		id: number;
		name: string;
		image: string;
		status: string;
		buttonType: string;
		buttonOptions: RowOptions[];
	}

	export let override: Boolean = false;
	export let rowData: Row[]; // Data object for the row
</script>

{#if !override}
	{#each rowData as row (row.id)}
		<div key={row.key} class="flex items-center justify-between p-4 touch-friendly">
			<!-- Left-aligned Image and Name -->
			<div class="flex items-center space-x-2">
				<img src={row.image} alt={row.name} class="w-12 h-12 rounded-full" />
				<span class="font-medium">{row.name}</span>
			</div>

			<!-- Status in the center with colored circle indicator -->
			<div class="flex items-center justify-center flex-1">
				<span class={`inline-block w-3 h-3 ${row.statusColour} rounded-full mr-2`}></span>
				<span class="status-styles">{row.status}</span>
			</div>

			<!-- Right-aligned Buttons -->
			<div class="flex items-center">
				<!-- <Button type={row.buttonType} /> -->
				<Button
					key={row.key}
					type="dropdown"
					buttonText="Open"
					menuItems={[
						{ text: 'Option 1', href: '#' },
						{ text: 'Option 2', href: '#' },
						{ text: 'Option 3', href: '#' }
					]}
				/>
			</div>
		</div>
	{/each}
{:else}
	<slot />
{/if}
