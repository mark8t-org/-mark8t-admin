import { writable } from 'svelte/store';
import Theme from './theme';
const Categories = writable(
	localStorage.getObject('categories')
);

export { Categories, Theme };
export default { Categories, Theme };