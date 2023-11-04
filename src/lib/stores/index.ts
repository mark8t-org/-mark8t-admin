import { writable } from 'svelte/store';

import Theme from './theme';
import Account from './account';

const Categories = writable(
	localStorage.getObject('categories')
);

export {
	Categories,
	Account,
	Theme
};
export default {
	Categories,
	Account,
	Theme
};