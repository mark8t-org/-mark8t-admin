<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	export let Core: typeof any;
	$: Account = Core?.Stores.Account;

	let loggedInFrom = '';
	let loggedInFromLong = '';

	const handleOnLogin = (evt: Event) => {
		evt.preventDefault();
		loggedInFromLong = window.location.href;
		loggedInFrom = loggedInFromLong.split(base)[1];

		console.log('Login - handleOnLogin - loggedInFrom - ');
		localStorage.setItem('user.loggedInFrom', loggedInFrom);
		window.location.href = `${base}/login`;
		// window.requestLogin();
	};
</script>

{#if !$Account}
	{#if !$page.url.pathname.includes('admin')}
		<button class="login-button">
			<a on:click={handleOnLogin} href="{base}/login">Login</a>
		</button>
	{:else}
		<!-- <a on:click={handleOnLogin} href="{base}/login">...</a> -->
		{#if Core}
			<Core.Components.Spinner message={'authorizing'} />
		{/if}
	{/if}
{:else}
	<button class="login-button">
		<a href="{base}/admin/account">{$Account?.username || ''}</a>
	</button>
{/if}
