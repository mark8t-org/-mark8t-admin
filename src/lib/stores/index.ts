import { writable } from 'svelte/store';

import Theme from './theme';
import Account from './account';

const Categories = writable(
	localStorage.getObject('categories')
);

const Loading = writable(false);
const Backups = writable(null);

export {
	Categories,
	Backups,
	Loading,
	Account,
	Theme
};
export default {
	Categories,
	Backups,
	Loading,
	Account,
	Theme
};