<script>
	import { data } from '../../../../data';
	import { page } from '$app/stores';

	export let theme;
	const style = { ...theme?.sidebarItems.css };
	console.log('SidebarItems :: style', style);
</script>

<ul class="mt-6 md:pl-6">
	<li>
		{#each data as { section, content } (section)}
			<div class="mb-10">
				<div class={style.section}>{section}</div>
				{#each content as item (item.title)}
					<a
						href={item.link}
						class={`${style.link} ${item.link === $page.url.pathname && style.active}`}
					>
						<span><svelte:component this={item.icon} /></span>
						<span class={style.title}>{item.title}</span>
					</a>
				{/each}
			</div>
		{/each}
	</li>
</ul>

<!--
<style>
	.micas {
		background-color: rgba(255, 255, 255, 0.1); /* White with 10% opacity */
		backdrop-filter: blur(5px); /* Blur the underlying content */
	}

	.mica {
		border-radius: 4px; /* Optional, for rounded corners */
		transition:
			backdrop-filter 0.3s,
			background-color 0.3s; /* Smooth transitions */
	}

	.mica:hover {
		backdrop-filter: blur(10px); /* Increase the blur on hover */
		background-color: rgba(255, 255, 255, 0.15); /* Slightly more opaque white on hover */
	}
</style> -->
