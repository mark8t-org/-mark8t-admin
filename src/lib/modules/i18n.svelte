<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import { base } from '$app/paths';
	import Checkbox from '@smui/checkbox';
	// import { phpStore, transformPHP } from '../admin/parseHtml';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import Button from '@smui/button';

	// import Quill from 'quill';

	import { Utils } from '@mark8t/core';
	import { emailsWithRestParamaters } from '../emails';

	type User = {
		id: number;
		name: string;
		username: string;
		email: string;
		website: string;
	};

	const api = import.meta.env.VITE_API_URL;

	let reverse = false;
	let output = '';

	let selectedEmailType =
		localStorage.getObject('--admin-emails-selectedEmailType') ||
		Object.keys(Utils.Schema._EMAILS_LISTING_)[0];
	let emailDescription = '';
	let editor;

	function createFileNames(emailTypes) {
		return emailTypes.map((emailType) => emailType.name.toLowerCase() + '.php');
	}

	let fileNames = createFileNames(Utils.Schema._EMAILS_LISTING_);
	let emailPreview = '';
	let emailPreviewLink = base + '/admin/EmailsPreview';
	let lang = 'en';

	const importEmailTemplate = () => {
		let emailtemplateTestUrl = '';
		let emailtemplateFileName = fileNames[
			Object.keys(Utils.Schema._EMAILS_LISTING_).indexOf(selectedEmailType)
		].replaceAll(' ', '-');

		localStorage.setObject('--admin-emails-selectedEmailType', selectedEmailType);
		console.log(
			'--admin-emails-selectedEmailType',
			Utils.Schema._EMAILS_LISTING_[selectedEmailType]
		);

		emailtemplateTestUrl = api + '/api/dev/mail/';
		emailtemplateTestUrl += emailtemplateFileName;
		if (emailsWithRestParamaters[emailtemplateFileName.replace('.php', '').replaceAll('_', '-')]) {
			emailtemplateTestUrl =
				emailsWithRestParamaters[emailtemplateFileName.replace('.php', '').replaceAll('_', '-')];
		}

		// emailtemplateTestUrl += `?lang=fr&name=John&order_id=12345&tracking_number=XYZ123&estimated_delivery=2022-12-31`;
		//emailtemplateTestUrl += `&name=${name}&contact=${contact}`;

		fetch(emailtemplateTestUrl)
			.then((res) => res.text())
			.then((data) => {
				emailPreview = data;
			});
		// console.log(_EMAILS_LISTING_[selectedEmailType].template);
	};

	// fetch(emailtemplateTestUrl)
	// 	.then((res) => res.text())
	// 	.then((data) => {
	// 		emailPreview = data;
	// 	});

	//selectedEmailType = Object.keys(_EMAILS_LISTING_)[2];

	function quill(node) {
		// let q = new Quill(node, {
		// 	modules: {
		// 		toolbar: [
		// 			[{ header: [1, 2, 3, 4, 5, 6, false] }],
		// 			['bold', 'italic', 'underline'],
		// 			[{ list: 'ordered' }, { list: 'bullet' }],
		// 			['link', 'image']
		// 		]
		// 	},
		// 	placeholder: '...',
		// 	theme: 'snow'
		// });
		// q.clipboard.dangerouslyPasteHTML(0, emailTemplate);
	}

	// $: output = parseHTML(emailTemplate, reverse);

	onMount(() => {
		importEmailTemplate();
		// import
		// window.transformPHP = transformPHP;
		//emailTemplate = output;
		// phpStore.subscribe((value) => {
		// emailTemplate = value;
		// });
		//console.log(output);
	});
</script>

<div class="w-100">
	<strong>Emails <small>(preview)</small></strong>

	<hr />
	<p>
		<small><a href={emailPreviewLink}>Preview the email templates.</a></small>
		<br />
		<small>Enable or disable various automated emails. </small>
	</p>
	<hr />

	<DataTable table$aria-label="User list" style="width: 100%;">
		<Head>
			<Row>
				<Cell numeric>ID</Cell>
				<Cell style="width: 100%;">Name</Cell>
				<Cell>Enabled</Cell>
			</Row>
		</Head>
		<Body>
			{#each Object.entries(Utils.Schema._EMAILS_LISTING_) as [key, value, index]}
				<Row
					class="pointer"
					on:click={() => {
						value.enabled = !value.enabled;
					}}
				>
					<Cell numeric>{key}</Cell>
					<Cell>{value.name}</Cell>
					<Cell>
						<Checkbox checked={value.enabled} touch /></Cell
					>
				</Row>
			{/each}
		</Body>
	</DataTable>
</div>

<hr />

<style lang="scss">
	:global(.pointer) {
		cursor: pointer;
	}

	:global(.indent) {
		margin-left: 3rem;
		line-height: 2.8rem;
	}

	#email-type {
		padding: 0.75rem;
		font-size: 1.5rem;
	}

	:global(#editor) {
		white-space: pre-wrap; /* Preserves whitespace */
		font-family: monospace; /* Optional, for a fixed-width font */
		min-height: 300px;
	}
	#editor-preview {
		min-height: 300px;
		border: 1px solid;
		/* margin: 1rem; */
	}
</style>
