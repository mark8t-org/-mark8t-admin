<script lang="ts">
	import { onMount } from 'svelte';
	import View from './View.svelte';
	// import DynamicForm from "../form/DynamicForm.svelte";

	import Menu from '@smui/menu';
	import List, { Item, Separator, Text } from '@smui/list';
	import Button, { Label } from '@smui/button';

	let clicked = 'nothing yet';

	export let override = false;
	export let account;
	const username = account?.name || 'Admin';
	const usernameInititals =
		username
			?.split(' ')
			?.map((word) => word[0])
			?.join('') || '';

	import { Stores } from '@mark8t/core';
	import TopNavbar from './TopNavbar.svelte';

	let Account = Stores.Account;
	let Website = Stores.Website;

	let people = [
		{ first: 'Hans', last: 'Emil' },
		{ first: 'Max', last: 'Mustermann' },
		{ first: 'Roman', last: 'Tisch' }
	];

	let prefix = '';
	let first = '';
	let last = '';
	let i = 0;

	$: filteredPeople = prefix
		? people.filter((person) => {
				const name = `${person.last}, ${person.first}`;
				return name.toLowerCase().startsWith(prefix.toLowerCase());
		  })
		: people;

	$: selected = filteredPeople[i];

	$: reset_inputs(selected);

	function create() {
		people = people.concat({ first, last });
		i = people.length - 1;
		first = last = '';
	}

	function update() {
		selected.first = first;
		selected.last = last;
		people = people;
	}

	function remove() {
		// Remove selected person from the source array (people), not the filtered array
		const index = people.indexOf(selected);
		people = [...people.slice(0, index), ...people.slice(index + 1)];

		first = last = '';
		i = Math.min(i, filteredPeople.length - 2);
	}

	function reset_inputs(person) {
		first = person ? person.first : '';
		last = person ? person.last : '';
	}

	onMount(() => {});
</script>


<View {override}>
	<slot />
	<!-- <div class="container"> -->
	<!-- <h1 /> -->
	<!-- <DynamicForm /> -->

	<!-- <section hidden>
			<input placeholder="filter prefix" bind:value={prefix} />
			<select bind:value={i} size={5}>
				{#each filteredPeople as person, i}
					<option value={i}>{person.last}, {person.first}</option>
				{/each}
			</select>
			<label><input bind:value={first} placeholder="first" /></label>
			<label><input bind:value={last} placeholder="last" /></label>
			<div class="buttons">
				<button on:click={create} disabled={!first || !last}
					>create</button
				>
				<button
					on:click={update}
					disabled={!first || !last || !selected}>update</button
				>
				<button on:click={remove} disabled={!selected}>delete</button>
			</div>
		</section> -->
	<!-- </div> -->
</View>
