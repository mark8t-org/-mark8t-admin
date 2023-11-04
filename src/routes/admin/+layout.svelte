<script lang="ts">
	import { onMount } from 'svelte';
	import { Login, Logout } from '$lib/components';
	import Styles from '$lib/components/Styles.svelte';

	import Content from '$lib/components/dashboards/Content.svelte';

	let Core: typeof any;
	let Admin: typeof any;

	let menuActive = false;

	const toggleMenu = () => {
		menuActive = !menuActive;
	};
	export let data;

	onMount(() => {
		Core = data.props?.Core as typeof any;
		Admin = data.props?.Admin as typeof any;
	});
</script>

{#if Core}
	<Styles />
	{#if Admin}
		<Admin {Core} override={true}>
			<slot />
		</Admin>
	{/if}
{/if}
