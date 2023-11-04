
import { get } from 'svelte/store';

import { Theme } from '../stores';

import type Mark8tCore from '@mark8t/core';

/**
 * TODO: THEME TYPE
 */
function getTheme() {
	console.log('getTheme', get(Theme) || localStorage.getObject('theme') || localStorage.setObject('theme', { mode: 'light' }));
	return get(Theme) || localStorage.getObject('theme') || localStorage.setObject('theme', { mode: 'light' })
}

/**
 * TODO: THEME TYPE
 */
function setTheme(theme: any) {
	console.debug('setTheme', theme);
	localStorage.setObject('theme', theme);
	Theme.set(theme);
}

function subscribe(callback: (value: any) => void) {
	return Theme.subscribe(callback);
}

export default {
	get: getTheme,
	set: setTheme,
	subscribe
}