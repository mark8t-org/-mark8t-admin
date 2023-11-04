<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	import TopNavbar from '$lib/admin/TopNavbar.svelte';
	import TopBar from './TopBar.svelte';
	import Overlay from './Overlay.svelte';
	import Sidebar from './sidebar/Sidebar.svelte';
	import { closeSidebar, sidebarOpen } from './store.ts';

	import { Theme } from '../../../services';
	import { onMount } from 'svelte';

	type LType = 'layout0' | 'layout1' | 'layout2' | 'layout3' | 'layout4' | 'layout5';
	export let layoutType: LType = 'layout1';

	// Common functionality across layouts
	if (browser) {
		page.subscribe(() => {
			if ($sidebarOpen && window.innerWidth < 1024) {
				closeSidebar();
			}
		});
	}

	// Different layout styles
	const layouts = {
		layout0: {
			container: 'background h-screen overflow-hidden w-full lg:p-4',
			content: 'content h-screen overflow-hidden relative lg:rounded-2xl',
			mainContainer: 'flex flex-col h-screen pl-0 w-full lg:space-y-4 lg:w-[calc(100%-16rem)]',
			main: 'main h-screen pb-36 pt-4 px-2 md:pb-8 md:px-4 lg:px-6'
		},
		layout1: {
			container: 'background h-screen overflow-hidden w-full lg:p-4 parent',
			content: 'content h-screen overflow-hidden relative lg:rounded-2xl',
			mainContainer: 'flex flex-col h-screen pl-0 w-full lg:space-py-4 lg:w-[calc(100%-16rem)]',
			main: 'main h-screen pb-36 pt-4 px-2 md:pb-8 md:px-4 lg:px-6'
		},
		layout2: {
			container: 'background h-screen overflow-hidden w-full lg:p-4 parent',
			content: 'content h-screen overflow-hidden relative lg:rounded-2xl',
			mainContainer: 'flex flex-col h-screen pl-0 w-full lg:space-py-4 lg:w-[calc(100%-16rem)]',
			main: 'main h-screen overflow-auto pb-36 pt-4 px-2 text-black md:pb-8 md:px-4 lg:mt-4 lg:px-6'
		},
		layout3: {
			container: 'bg-gray-100 h-screen overflow-hidden relative lg:p-4',
			content: '', // Empty as the layout doesn't specify a specific content style
			mainContainer: 'flex flex-col w-full h-screen pl-0 lg:space-y-4',
			main: 'main h-screen overflow-auto pb-36 pt-8 px-2 md:pb-8 md:pt-4 lg:pt-0'
		},
		layout4: {
			container: 'bg-gray-900 h-screen overflow-hidden relative',
			content: '', // Empty as the layout doesn't specify a specific content style
			mainContainer: 'flex flex-col h-screen pl-0 w-full lg:pl-20 lg:space-y-4',
			main: 'main h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4'
		},
		layout5: {
			container: 'bg-gray-100 h-screen overflow-hidden relative',
			content: '', // Empty as the layout doesn't specify a specific content style
			mainContainer: 'flex flex-col h-screen pl-0 w-full lg:pl-24 lg:space-y-4',
			main: 'main h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 lg:px-4'
		},
		layout6: {
			container: 'bg-gray-100 h-screen overflow-hidden relative',
			content: '', // Empty as the layout doesn't specify a specific content style
			mainContainer: 'flex flex-col h-screen pl-0 w-full lg:pl-24 lg:space-y-4',
			main: 'main h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 lg:px-4'
		}
	};

	onMount(() => {
		console.log('Theme.get().id', Theme.get().id);
		layoutType = ('layout' + (Theme.get().id || 0)) as LType;

		Theme.subscribe(async (value) => {
			layoutType = ('layout' + (value.id || 0)) as LType;
		});
	});
</script>

<div class={layoutType + ' ' + layouts[layoutType].container}>
	<div class={layoutType + ' ' + layouts[layoutType].content}>
		<TopNavbar />
		<div class="flex items-start">
			<Overlay />
			<Sidebar mobileOrientation="end" />
			<div class={layoutType + ' ' + layouts[layoutType].mainContainer}>
				<TopBar />
				<main class={layoutType + ' ' + layouts[layoutType].main}>
					<slot />
				</main>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.background {
		// background-image: url('./mac.webp');
		background-image: url('/background-1920.jpg');
		background-size: cover;
		background-position: center;
	}

	.content {
		backdrop-filter: blur(24px);
	}

	.main {
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

	/** Layout Specific Styles **/
	.layout0 {
		.background {
		}
		.content {
			background-color: rgba(16, 18, 27, 0.4);
		}
		.main {
			color: #f9fafb;
			background-color: rgba(16, 18, 27, 0.4);
		}
	}

	.layout1 {
		.background {
			background-image: url('./mac.webp');
		}
		.content,
		.main {
			background-color: rgb(255 255 255 / 31%);
			backdrop-filter: blur(20px);
			-webkit-backdrop-filter: blur(20px);
		}
		.parent:before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			background: linear-gradient(
				180deg,
				rgba(255, 255, 255, 0.72) 0%,
				rgba(255, 255, 255, 0.45) 100%
			);
			-webkit-backdrop-filter: saturate(3);
			backdrop-filter: saturate(3);
		}
	}

	.layout2,
	.layout4 {
		.container {
			background-color: #f9fafb;
		}
	}

	.layout3 {
		.container {
			background-color: #1a1a1a;
		}
	}
</style>
