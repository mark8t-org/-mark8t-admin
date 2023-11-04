import { writable } from 'svelte/store';

const Account = writable(
	localStorage.getObject('account')
);

export default Account;