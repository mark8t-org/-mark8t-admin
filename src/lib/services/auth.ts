import { handleRedirectPromise, requestLogin, requestLogout } from '../msal.config';

import type Mark8tCore from '@mark8t/core';

/**
 * initialize and handle redirect promise,
 * set active account if exists
 * login if no active account
 * @param Core
 */
async function guard(Core: typeof Mark8tCore) {
	handleRedirectPromise(Core);
}

/**
 * Login user
 */
async function login() {
	requestLogin();
}

/**
 * Logout user
 */
async function logout() {
	requestLogout();
}

// const checkSecret = async () => {
// 	// read secret variable from query params & if secret exists, set local storage and return
// 	let url = new URL(window.location.href);
// 	let secretFirst = url.searchParams.get('secret');
// 	if (secretFirst === 'PEON') {
// 		console.log('Authenticate - secret - ', secretFirst);
// 		await localStorage.setObject('--secret', secretFirst);
// 		localAccountHasAdminPermissions = true;
// 		//return;
// 	}
// };

export default {
	guard,
	login,
	logout
}