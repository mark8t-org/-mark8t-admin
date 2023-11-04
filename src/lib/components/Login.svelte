<script lang="ts">
	import { base } from '$app/paths';

	let loggedInFrom = '';
	let loggedInFromLong = '';

	//
	const handleOnLogin = (evt: Event) => {
		evt.preventDefault();
		loggedInFromLong = window.location.href;
		loggedInFrom = loggedInFromLong.split(base)[1];
		console.log('Login - handleOnLogin - loggedInFrom - ', loggedInFrom);

		localStorage.setItem('user.loggedInFrom', loggedInFrom);
		window.location.href = `${base}/login`;
	};
</script>

<button class="login-button">
	<a on:click={handleOnLogin} href="{base}/login">Login</a>
</button>
