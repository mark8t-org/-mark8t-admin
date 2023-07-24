<script lang="ts">
	import Menu from '@smui/menu';
	import List, { Item, Separator, Text } from '@smui/list';
	import { Stores } from '@mark8t/core';
	const Website = Stores.Website;
	const Account = Stores.Account;
	let menu;
	function getMultiNameInitials(name) {
		return name
			?.split(' ')
			?.map((word) => word[0])
			?.join('');
	}
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
	<a class="navbar-brand" href="/">{$Website?.siteName}</a>
	<div class="btn-group ml-auto dropleft">
		<!-- <button type="button" id="signIn" class="btn btn-secondary" onclick="window.signIn()">Sign-in</button> -->
		<button type="button" id="signOut" class="btn btn-primary" on:click={() => menu.setOpen(true)}>
			<span>{$Account?.name}</span>
			<h5 id="label" class="user-name-circle">
				{getMultiNameInitials($Account?.name)}
			</h5>
		</button>
		<Menu bind:this={menu} style="margin-top:46px;">
			<List>
				<Item on:SMUI:action={window.localStorage.clear}>
					<Text>Clear Cache</Text>
				</Item>
				<Separator />
				<Item on:SMUI:action={window.signOut}>
					<Text>Logout</Text>
				</Item>
			</List>
		</Menu>
	</div>
</nav>

<style>
	button {
		margin-right: 1.25rem;
	}

	.user-name-circle {
		padding: 0px;
		margin: -5px;
		margin-left: 0.5rem;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background-color: #fff;
		border: 2px solid #000;
		display: inline-block;
		text-align: center;
		line-height: 34px;
		font-size: 20px;
		color: #000;
	}

	* {
		font-family: inherit;
		font-size: inherit;
	}

	input {
		display: block;
		margin: 0 0 0.5em 0;
	}

	select {
		float: left;
		margin: 0 1em 1em 0;
		width: 14em;
	}

	.buttons {
		clear: both;
	}

	.navbar {
		background-color: var(--smui-theme-primary) !important;
	}

	.navbar-brand {
		color: var(--smui-theme-on-primary);
	}

	button#signOut {
		background-color: var(--smui-theme-primary);
		color: var(--smui-theme-on-primary);
	}

	.user-name-circle {
		border: 2px solid var(--smui-theme-on-primary);
		color: var(--smui-theme-on-primary);
	}

	/* Dark Mode */
	.navbar.smui-dark {
		background-color: var(--smui-theme-primary-dark);
	}

	.navbar-brand.smui-dark {
		color: var(--smui-theme-on-primary-dark);
	}

	button#signOut.smui-dark {
		background-color: var(--smui-theme-primary-dark);
		color: var(--smui-theme-on-primary-dark);
	}

	.user-name-circle.smui-dark {
		border: 2px solid var(--smui-theme-on-primary-dark);
		color: var(--smui-theme-on-primary-dark);
	}
</style>
