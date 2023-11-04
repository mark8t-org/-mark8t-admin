import { writable } from 'svelte/store';

const Theme = writable(
	localStorage.getObject('theme')
);

export default Theme;