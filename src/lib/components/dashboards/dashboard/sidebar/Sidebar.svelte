<script lang="ts">
	import { sidebarOpen } from '../store';
	import SidebarItems from './SidebarItems.svelte';
	import SidebarHeader from './SidebarHeader.svelte';

	import { Theme } from '../../../../services';
	import { ThemePresets } from '../../../ThemePresets';
	import { onMount } from 'svelte';

	export let Core: typeof any;
	$: Account = Core?.Stores.Account;

	const style = {
		orientation: 'end',
		mobileOrientation: {
			start: 'left-0',
			end: 'right-0'
		}
	};
	let theme = ThemePresets(style, $sidebarOpen);
	sidebarOpen.subscribe((value) => {
		// theme = ThemePresets(style, value);
		// Theme.set(theme);
	});
	Theme.subscribe((value) => {
		theme = ThemePresets(style, $sidebarOpen);
	});
</script>

<svelte:window
	on:resize={() => {
		if (window.innerWidth > 1024) {
			$sidebarOpen = true;
		} else {
			$sidebarOpen = false;
		}
		ThemePresets(style, $sidebarOpen);
	}}
/>

<aside class={theme?.sidebar?.css?.aside}>
	<div class={theme?.sidebar?.css?.div}>
		<SidebarHeader {theme} {Core} />
		<SidebarItems {theme} />
	</div>
</aside>
