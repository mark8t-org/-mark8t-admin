<script>
	import { base } from '$app/paths';
	import { Login, Logout } from '../lib/components';
	import Styles from '../lib/components/Styles.svelte';

	let menuActive = false;

	const toggleMenu = () => {
		menuActive = !menuActive;
	};
</script>

<Styles />
<div class="header-container">
	<div class="menu-toggle">
		<button id="menu-btn" on:click={toggleMenu}> ☰ </button>
	</div>
	<div class="menu-items" class:active={menuActive}>
		<Login />
		<Logout />
	</div>
</div>
