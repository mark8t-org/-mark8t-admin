<script lang="ts">
	import { base } from '$app/paths';

	import { requestLogout } from '../msal.config';

	const msClientID = import.meta.env.VITE_API_MS_AUTH_CLIENT_ID;

	export let Core: typeof any;
	$: Account = Core?.Stores.Account;

	let loggedOutFrom = '';
	let loggedOutFromLong = '';

	const handleOnLogout = (evt: Event) => {
		// evt.preventDefault();
		// console.log('Logout - handleOnLogout - loggedOutFrom - ', loggedOutFrom, loggedOutFromLong);
		// localStorage.setItem('user.loggedOutFrom', loggedOutFrom);
		requestLogout();
	};
</script>

{#if $Account}
	<button class="logout-button">
		<a on:click={requestLogout} href="{base}/logout">Logout</a>
	</button>
{/if}
