import UxIcon from './components/dashboards/dashboard/sidebar/icons/UxIcon.svelte';
import ArIcon from './components/dashboards/dashboard/sidebar/icons/ArIcon.svelte';
import VideosIcon from './components/dashboards/dashboard/sidebar/icons/VideosIcon.svelte';
import AllAppsIcon from './components/dashboards/dashboard/sidebar/icons/AllAppsIcon.svelte';
import UpdatesIcon from './components/dashboards/dashboard/sidebar/icons/UpdatesIcon.svelte';
import PhotographyIcon from './components/dashboards/dashboard/sidebar/icons/PhotographyIcon.svelte';
import IllustrationIcon from './components/dashboards/dashboard/sidebar/icons/IllustrationIcon.svelte';
import GraphicDesignIcon from './components/dashboards/dashboard/sidebar/icons/GraphicDesignIcon.svelte';
import DocumentationIcon from './components/dashboards/dashboard/sidebar/icons/DocumentationIcon.svelte';

// loop through the files in ./modules/ creating an array of the names
import * as modules from './modules/index';

import { base } from "$app/paths"

const adminPanels = Object.keys(modules.default);

export const data = [
	// {
	// 	section: ' ',
	// 	content: [
	// 		{
	// 			title: 'Mark8t',
	// 			link: base + '/admin/owner'
	// 		}
	// 	]
	// },
	// {
	// 	section: '',
	// 	content: [
	// 		{
	// 			title: 'Accounts',
	// 			icon: AllAppsIcon,
	// 			link: base + '/admin/accounts'
	// 		},
	// 		{
	// 			title: 'Tenants',
	// 			icon: AllAppsIcon,
	// 			link: base + '/admin/tenants'
	// 		},
	// 		{
	// 			title: 'Emails',
	// 			icon: ArIcon,
	// 			link: base + '/admin/emails'
	// 		},
	// 		{
	// 			title: 'Updates',
	// 			icon: UpdatesIcon,
	// 			link: '/admin/updates'
	// 		}
	// 	]
	// },
	{
		section: '   ',
		content: [
			{
				title: 'Dashboard',
				icon: AllAppsIcon,
				link: base + '/admin'
			}
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
		section: '  ',
		content: [
			{
				title: 'Support',
				icon: ArIcon,
				link: base + '/admin/documentation'
			}
		]
	}
];
