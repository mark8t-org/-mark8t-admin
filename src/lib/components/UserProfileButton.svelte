<!-- UserProfileButton.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let account; // Account object to be passed in from parent component

	// Function to get initials from the account name (to be defined or imported)
	// export const getMultiNameInitials = (account) => {
	// 	// Implementation to extract initials from the account's name
	// 	return account?.username
	// 		.split(' ')
	// 		.map((n) => n[0])
	// 		.join('')
	// 		.toUpperCase();
	// };

	///////////////////////////

	//TODO MOVE TO STORE
	function getMultiNameInitials(account) {
		if (!account) return 'U';

		// If the account has a displayName, extract initials
		if (account.displayName) {
			return account.displayName
				.split(' ')
				.map((word) => word[0])
				.join('')
				.toUpperCase();
		}

		// If the account has a givenName and surname, extract initials
		if (account.givenName && account.surname) {
			return (account.givenName[0] + account.surname[0]).toUpperCase();
		}

		// If the account has an email, extract initials from email
		if (account.username) {
			const emailParts = account.username.split('@');
			if (emailParts.length > 0) {
				return emailParts[0]
					.split('.')
					.map((part) => part[0])
					.join('')
					.toUpperCase();
			}
		}

		// Default to 'U' if no initials are found
		return 'U';
	}

	///////////////////////

	export let colour = 'bg-blue-500'; // Default colour, can be overridden by parent component
	export let hideUsername = false;

	const dispatch = createEventDispatcher();

	function toggleMenu() {
		dispatch('toggleMenu');
	}
</script>

<nav>
	<div class="relative flex items-center">
		<button
			type="button"
			id="signOut"
			class="text-white focus:outline-none ml-2 flex items-center"
			on:click={toggleMenu}
		>
			{#if !hideUsername}
				<span class="px-2 md:hidden lg:block">{account?.username}</span>
			{/if}
			<span
				id="label"
				class={`${colour} rounded-full w-10 h-10 flex items-center justify-center ml-2`}
			>
				{getMultiNameInitials(account)}
			</span>
		</button>
	</div>
</nav>

<style>
	.rounded-full {
		border-radius: 9999px;
	}
</style>
