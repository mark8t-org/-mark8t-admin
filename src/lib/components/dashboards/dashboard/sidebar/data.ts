import UxIcon from './icons/UxIcon.svelte';
import ArIcon from './icons/ArIcon.svelte';
import VideosIcon from './icons/VideosIcon.svelte';
import AllAppsIcon from './icons/AllAppsIcon.svelte';
import UpdatesIcon from './icons/UpdatesIcon.svelte';
import PhotographyIcon from './icons/PhotographyIcon.svelte';
import IllustrationIcon from './icons/IllustrationIcon.svelte';
import GraphicDesignIcon from './icons/GraphicDesignIcon.svelte';
import DocumentationIcon from './icons/DocumentationIcon.svelte';

// loop through the files in ./modules/ creating an array of the names
import * as modules from '../../../../modules/index';

import { base } from "$app/paths"

const adminPanels = Object.keys(modules.default);

export const data = [
	{
		section: ' ',
		content: [
			{
				title: 'Mark8t',
				// icon: AllAppsIcon,
				link: base + '/admin/owner'
			},
			// {
			// 	title: 'Updates',
			// 	icon: UpdatesIcon,
			// 	link: '/admin/updates'
			// }
		]
	},
	{
		section: '',
		content: [
			{
				title: 'Accounts',
				icon: AllAppsIcon,
				link: base + '/admin/accounts'
			},
			{
				title: 'Tenants',
				icon: AllAppsIcon,
				link: base + '/admin/tenants'
			},
			{
				title: 'Emails',
				icon: ArIcon,
				link: base + '/admin/emails'
			},
			// {
			// 	title: 'Updates',
			// 	icon: UpdatesIcon,
			// 	link: '/admin/updates'
			// }
		]
	},
	{
		section: 'Tenant',
		content: [
			{
				title: 'Dashboard',
				icon: AllAppsIcon,
				link: base + '/admin'
			},
			// {
			// 	title: 'Updates',
			// 	icon: UpdatesIcon,
			// 	link: '/admin/updates'
			// }
		]
	},
	{
		section: 'Website',
		content: adminPanels.map((panel) => {
			return {
				title: panel,
				icon: UxIcon,
				link: base + `/admin/${panel.toLowerCase()}`
			};
		})
	},
	{
		section: 'Guides',
		content: [
			// {
			// 	title: 'Documentation',
			// 	icon: DocumentationIcon,
			// 	link: base + '/admin/documentation'
			// },
			{
				title: 'Help & Support',
				icon: ArIcon,
				link: base + '/admin/documentation'
			}
		]
	}
];
