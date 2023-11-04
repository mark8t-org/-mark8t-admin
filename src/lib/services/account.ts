
import { get } from 'svelte/store';

import { Account } from '../stores';

import type Mark8tCore from '@mark8t/core';

/**
 * TODO: THEME TYPE
 */
function getAccount() {
	console.log('getAccount', get(Account) || localStorage.getObject('account') || localStorage.setObject('account', { mode: 'light' }));
	return get(Account) || localStorage.getObject('account') || localStorage.setObject('account', { mode: 'light' })
}

/**
 * TODO: THEME TYPE
 */
function setAccount(account: any) {
	console.debug('setAccount', account);
	localStorage.setObject('account', account);
	Account.set(account);
}

function subscribe(callback: (value: any) => void) {
	return Account.subscribe(callback);
}

export default {
	get: getAccount,
	set: setAccount,
	subscribe
}