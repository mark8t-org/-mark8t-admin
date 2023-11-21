import { browser } from '$app/environment';

export const csr = true;
export const prerender = false;
export const ssr = true;

// use sessions storage to ensure that Tenant has been loaded before rendering the page but not to call the server on subsuquent page loads
export async function load({ fetch }) {
	if (browser) {
		const Core = (await import('@mark8t/core')).default;
		const Auth = (await import('../../lib/services/auth.ts')).default;
		let auth = await Auth.guard(Core);

		const Admin = (await import('../../lib/+Admin.svelte')).default;
		const Modules = (await import('../../lib/modules/index')).default;
		return {
			props: {
				Core: Core,
				Auth: auth,
				Admin: Admin,
				Modules: Modules,
				Latest: await Core.Services.getLatestModified(fetch),
				Tenant: await Core.Services.Tenant.fetch(),
			}
		};
	}
}