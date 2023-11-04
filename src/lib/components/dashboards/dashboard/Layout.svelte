<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	import TopBar from './TopBar.svelte';
	import Overlay from './Overlay.svelte';
	import Sidebar from './sidebar/Sidebar.svelte';
	import { closeSidebar, sidebarOpen } from './store';
	import TopNavbar from '$lib/admin/TopNavbar.svelte';

	export let Core;
	$: Account = Core?.Stores.Account;

	import type { Theme } from '../../types.ts';

	let themes: Array<Theme> = [
		{
			title: 'Dark',
			image: '/path/to/dark/theme/image.jpg',
			subtitle: 'Dark Mode',
			colour: 'bg-gray-900'
		},
		{
			title: 'Light',
			image: '/path/to/light/theme/image.jpg',
			subtitle: 'Light Mode',
			colour: 'bg-gray-100'
		},
		{
			title: 'White',
			image: '/path/to/white/theme/image.jpg',
			subtitle: 'White Mode',
			colour: 'bg-white'
		},
		{
			title: 'Blue Grey',
			image: '/path/to/blue-grey/theme/image.jpg',
			subtitle: 'Blue Grey Mode',
			colour: 'bg-blue-600'
		}
	];

	if (browser) {
		page.subscribe(() => {
			// close Sidebar on route changes. it's triggered when viewport is less than 1024px
			if ($sidebarOpen && window.innerWidth < 1024) {
				closeSidebar();
			}
		});
	}
</script>

<!-- lg:w-[calc(100%-16rem)] class get the remained width of the main tag from lg:viewport by subtracting
(the total width by the width of the Sidebar component which is w-64 = 16rem)-->

{#if true}
	<div class="background h-screen overflow-hidden w-full lg:p-4">
		<div class="content h-screen overflow-hidden relative lg:rounded-2xl">
			<TopBar />
			<TopNavbar />
			<div class="flex items-start">
				<Overlay />
				<Sidebar mobileOrientation="end" {Core} />
				<div class="flex flex-col h-screen pl-0 w-full lg:space-y-4 lg:w-[calc(100%-16rem)]">
					<main class="main h-screen pb-36 pt-4 px-2 md:pb-8 md:px-4 lg:px-6">
						<slot />
					</main>
				</div>
			</div>
		</div>
	</div>
{/if}

{#if false}
	<div class="background h-screen overflow-hidden w-full lg:p-4 parent">
		<div class="content h-screen overflow-hidden relative lg:rounded-2xl">
			<div class="flex items-start">
				<Overlay />
				<Sidebar mobileOrientation="end" />
				<div class="flex flex-col h-screen pl-0 w-full lg:space-py-4 lg:w-[calc(100%-16rem)]">
					<TopBar />
					<main
						class="
					 	main
						h-screen
					  	overflow-auto
					  	pb-36
					  	pt-4
					  	px-2
					  	text-black
					  	md:pb-8
					  	md:px-4
					  	lg:mt-4
					  	lg:px-6
					"
					>
						<slot />
					</main>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.background {
		background-image: url('./4pKqq.jpg');
		background-size: cover;
		background-position: center;
	}
	.content {
		background-color: rgba(16 18 27 / 40%);
		backdrop-filter: blur(24px);
	}
	.main {
		color: #f9fafb;
		background-color: rgba(16 18 27 / 40%);
		overflow: auto;
	}
	.main::-webkit-scrollbar {
		width: 6px;
		border-radius: 10px;
	}
	.main::-webkit-scrollbar-thumb {
		background: rgb(1 2 3 / 40%);
		border-radius: 10px;
	}
</style>
