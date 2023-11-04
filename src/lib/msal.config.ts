import { PublicClientApplication } from '@azure/msal-browser';

import type Mark8tCore from '@mark8t/core';

// build redirect url from environment variables
const redirectUrl = import.meta.env.VITE_REDIRECT_URL;
const baseUrl = import.meta.env.VITE_BASE_URL;
const clientId = import.meta.env.VITE_API_MS_AUTH_CLIENT_ID;
const tenantName = import.meta.env.VITE_API_MS_AUTH_TENANT_NAME;
const flowName = import.meta.env.VITE_API_MS_AUTH_USER_FLOW;

// scopes
const scopes = [
	// 'https://graph.microsoft.com/User.Read.All',
	// 'https://graph.microsoft.com/AppRoleAssignment.ReadWrite.All',
	// 'https://graph.microsoft.com/AppRoleAssignment.ReadWrite.All',
	'openid',
	// 'email',
	'offline_access'
	// 'profile'
];

// Static Configuration
const staticConfig = {
	auth: {
		// response_type: 'id_token code token',
		// responseType: 'id_token code token',
		// responseMode: 'query',
		// code_challenge_method: 'false',
		// validateAuthority: false,
		// navigateToLoginRequestUrl: false,
		// extraQueryParameters: { domain_hint: 'organizations' }
	},
	cache: {
		// cacheLocation: 'localStorage',
		// storeAuthStateInCookie: false
	},
	system: {
		// windowHashTimeout: 60000,
		// iframeHashTimeout: 6000,
		// loadFrameTimeout: 0
	}
};

// Combining them to build the complete MSAL config
const buildMsalConfig = (
	tenantName: string,
	authClientID: string, // this is read by msal
	flowName: string,
	redirectUrl: string,
	baseUrl: string,
	scopes: Array<string>) => {
	return {
		...staticConfig,
		...{
			auth: {
				azureAD: `${tenantName}.onmicrosoft.com`,
				clientId,
				authorityDomain: `${tenantName}.b2clogin.com`,
				authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${flowName}`,
				knownAuthorities: [tenantName + '.b2clogin.com'],
				redirectUri: redirectUrl + baseUrl + 'admin',
				// postLogoutRedirectUri: redirectUrl + baseUrl + 'logout/',
				scopes: scopes
			}
		}
	};
};

const msalConfig = buildMsalConfig(tenantName, clientId, flowName, redirectUrl, baseUrl, scopes);
const msalInstance = new PublicClientApplication(msalConfig);

const settings = {
	logoutPopup: false,
	loginRedirectParams: {
		// extraQueryParameters: msalConfig.auth.extraQueryParameters,
		scopes
	}
}

async function handleRedirectPromise(Core: typeof Mark8tCore) {

	await msalInstance.initialize();

	msalInstance
		.handleRedirectPromise()
		.then((response) => {
			if (response) {
				Core.Stores.Account.set(response.account);
				msalInstance.setActiveAccount(response.account);
				console.log('Authentication - handleRedirectPromise - response - ', response);
			}
		})
		.catch((error) => {
			console.error(error);
		});

	if (msalInstance.getActiveAccount()) {
		Core.Stores.Account.set(msalInstance.getActiveAccount() as AccountInfo);
	} else {
		requestLogin();
	}
}

/**
 * Login user
 * @param callback
 */
function requestLogin(callback?: (response: object | void) => void) {

	//call loginRedirect from msalInstance
	msalInstance
		.loginRedirect(settings.loginRedirectParams)
		.then((response) => {
			console.log("msal.config :: loginRedirect :: response", response);
			if (callback) callback(response);
		})
		.catch((error) => {
			console.log(error);
		});
}

//TODO: move to msal.service.ts???
/**
 * Logout user
 * @param callback
 * @returns void
 **/
function requestLogout(callback?: (response: object | void) => void) {

	//check if msalInstance is initialized
	if (!msalInstance || !msalInstance.getAllAccounts()) {
		console.error('msalInstance not initialized');
		return;
	}

	//create logout request for msal
	const logoutRequest = {
		account: msalInstance.getAllAccounts()[0],
		postLogoutRedirectUri: redirectUrl + baseUrl + ''
	};


	//logout user from msalInstance
	if (settings.logoutPopup) {
		msalInstance.logoutPopup(logoutRequest).then((response) => {
			console.log("msal.config :: logoutPopup :: response", response);
			// localStorage.setItem('msal logoutPopup', JSON.stringify(response));
			// Core?.Stores.Account.set({});
			if (callback) callback(response);
		});
		return;
	} else {
		msalInstance.logoutRedirect(logoutRequest).then((response) => {
			console.log("msal.config :: logoutRedir ::ect response", response);
			// localStorage.setItem('msal logoutPopup', JSON.stringify(response));
			// Core?.Stores.Account.set({});
			if (callback) callback(response);
		});
		return;
	}
};

export {
	msalInstance,
	msalConfig,
	handleRedirectPromise,
	requestLogin,
	requestLogout
}