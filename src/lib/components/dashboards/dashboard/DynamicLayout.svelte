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
			text: 'text-gray-300',
			container: 'background h-screen overflow-hidden w-full lg:p-4',
			content: 'content h-screen overflow-hidden relative lg:rounded-2xl',
			mainContainer: 'flex flex-col h-screen pl-0 w-full lg:space-y-4 lg:w-[calc(100%-16rem)]',
			main: 'main h-screen pb-36 pt-4 px-2 md:pb-8 md:px-4 lg:px-6'
		},
		layout1: {
			text: 'text-gray-900',
			container: 'background h-screen overflow-hidden w-full lg:p-4 parent',
			content: 'content h-screen overflow-hidden relative lg:rounded-2xl',
			mainContainer: 'flex flex-col h-screen pl-0 w-full lg:space-py-4 lg:w-[calc(100%-16rem)]',
			main: 'main h-screen pb-36 pt-4 px-2 md:pb-8 md:px-4 lg:px-6'
		},
		layout2: {
			text: 'text-gray-100',
			container: 'background h-screen overflow-hidden w-full lg:p-4 parent',
			content: 'content h-screen overflow-hidden relative lg:rounded-2xl',
			mainContainer: 'flex flex-col h-screen pl-0 w-full lg:space-py-4 lg:w-[calc(100%-16rem)]',
			main: 'main h-screen overflow-auto pb-36 pt-4 px-2 text-white md:pb-8 md:px-4 lg:mt-4 lg:px-6'
		},
		layout3: {
			text: 'text-gray-900',
			container: 'bg-gray-100 h-screen overflow-hidden relative lg:p-4',
			content: '', // Empty as the layout doesn't specify a specific content style
			mainContainer: 'flex flex-col w-full h-screen pl-0 lg:space-y-4',
			main: 'main h-screen overflow-auto pb-36 pt-8 px-2 md:pb-8 md:pt-4 lg:pt-0'
		},
		layout4: {
			text: 'text-gray-300',
			container: 'bg-gray-900 h-screen overflow-hidden relative',
			content: '', // Empty as the layout doesn't specify a specific content style
			mainContainer: 'flex flex-col h-screen pl-0 w-full lg:pl-20 lg:space-y-4',
			main: 'main h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4'
		},
		layout5: {
			text: 'text-gray-900',
			container: 'bg-gray-100 h-screen overflow-hidden relative',
			content: '', // Empty as the layout doesn't specify a specific content style
			mainContainer: 'flex flex-col h-screen pl-0 w-full lg:pl-24 lg:space-y-4',
			main: 'main h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 lg:px-4'
		},
		layout6: {
			text: 'text-gray-900',
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

<div class={layouts[layoutType].text + ' ' + layoutType + ' ' + layouts[layoutType].container}>
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
		// backdrop-filter: blur(24px);
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

	.layout0 {
		.background {
			background-image: url('./mac.webp');
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

	// mica like theme
	.layout2 {
		.content {
			background: rgba(30, 30, 30, 0.7); /* Dark background with some transparency */
			border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border for a bit of depth */
			box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5); /* More pronounced shadow for a pop-out effect */
			backdrop-filter: blur(10px); /* The blur effect */
			-webkit-backdrop-filter: blur(10px); /* For Safari compatibility */
			overflow: hidden; /* To contain the blur to the element's boundaries */
			border-radius: 8px; /* Optional: rounded corners */
			color: #ffffff; /* Light text color for readability */

			// LIGHT
			// background: rgba(255, 255, 255, 0.7); /* Adjust color and opacity to mimic Mica's look */
			// border: 1px solid rgba(255, 255, 255, 0.5); /* Optional: border to enhance the glass effect */
			// box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
			// backdrop-filter: blur(10px); /* The blur effect */
			// -webkit-backdrop-filter: blur(10px); /* For Safari compatibility */
			// overflow: hidden; /* To contain the blur to the element's boundaries */
			// border-radius: 8px; /* Optional: rounded corners like Fluent Design */
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

	.layout6 {
		.content {
			backdrop-filter: blur(24px);
		}
	}
</style>
