<script lang="ts">
	import { onMount } from 'svelte';
	import Dialog from './Dialog.svelte';
	import {
		backupAllData,
		backupList,
		restoreBackup,
		renameBackup,
		deleteBackup
	} from '../services/backup';

	import { Services } from '@mark8t/core';

	import { Loading, Backups } from '../stores';

	let dialogValue = '';
	let dialogOpen = false;
	let dialogOnDismiss = () => {};

	let backups: Array<String> = [];
	let selectedBackup: string;
	let restoreDisabled = true;

	$: Tenant = Services.Tenant.get().tenantId;
	// $: backupTarget = 'new-backup-2023-02-13-10-18-16.tar.gz';

	async function handleBackupClick() {
		await backupAllData(Tenant, 'suffex');
		await backupList(Tenant);
	}

	function handleRestoreClick() {
		console.log('selectedBackup', selectedBackup);
		restoreBackup(Tenant, selectedBackup);
	}

	function handleSelect(backup) {
		selectedBackup = backup;
		restoreDisabled = false;
	}

	async function handleRenameClick() {
		if (!selectedBackup) return;
		let a = await prompt(selectedBackup);
		// dialogValue = selectedBackup;
		// dialogOpen = !dialogOpen;
		// return;
		if (!a) return;
		// dialogOpen = true;
		// dialogOnDismiss = () => {
		// dialogOpen = false;
		renameBackup('3988fc5a_af7d_4ffb_8ce4_06132bd037a2', selectedBackup, a).then(() => {
			backups = backups.map((backup) => {
				if (backup.filename === selectedBackup) {
					backup.filename = a;
				}
				return backup;
			});
			backupList(tenant);
		});
		// };
	}

	function handleDeleteBackup() {
		if (!selectedBackup) return;
		deleteBackup(Tenant, selectedBackup).then(() => {
			backups = backups.filter((backup) => {
				return backup.filename !== selectedBackup;
			});
			selectedBackup = null;
			restoreDisabled = true;
		});
	}

	//
	const handleSave = (value) => {
		dialogValue = value;
		console.log(value);
		// dialogOnDismiss();

		renameBackup(Tenant, selectedBackup, value).then(() => {
			backups = backups.map((backup) => {
				if (backup.filename === selectedBackup) {
					backup.filename = value;
				}
				return backup;
			});
		});
	};

	//
	onMount(async () => {
		backupList(Tenant);
	});
</script>

<div class="flex items-center justify-between">
	<h2 class="text-lg font-medium">Backups</h2>
	<hr class="border-gray-200" />
</div>

<p class="mt-2 text-sm">
	This page is for managing backups. You can create a new backup, restore an existing backup, rename
	a backup, or delete a backup.
</p>

<hr class="my-4 border-gray-200" />

<Dialog
	bind:value={dialogValue}
	on:save={handleSave}
	bind:open={dialogOpen}
	on:dialogOnDismiss={() => {
		dialogOpen = !dialogOpen;
	}}
/>

<button
	class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
	on:click={handleBackupClick}
	disabled={$Loading}
>
	{$Loading ? '...' : 'Backup'}
</button>

<button
	class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 ml-2"
	on:click={handleRestoreClick}
	disabled={$Loading || restoreDisabled}
>
	Restore
</button>

<ul class="backup-list mt-4">
	{#if $Backups}
		{#each $Backups as backup}
			<li
				class="backup-list-item flex justify-between items-center border-b border-gray-300 py-2 px-4 cursor-pointer hover:bg-gray-800"
				class:selected={selectedBackup === backup.filename}
				on:click={() => handleSelect(backup.filename)}
			>
				<div class="flex flex-col">
					<span class="text-lg font-medium">{backup.filename}</span>
					<span class="text-sm text-gray-500">{backup.filesize} bytes</span>
					<span class="text-sm text-gray-500">Modified: {backup.modified_date}</span>
					<span class="text-sm text-gray-500">Created: {backup.created_date}</span>
				</div>
				<div class="flex space-x-2">
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
						on:click={handleRestoreClick}>Restore</button
					>
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
						on:click={handleRenameClick}>Rename</button
					>
					<button
						class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
						on:click={handleDeleteBackup}>Delete</button
					>
				</div>
			</li>
		{/each}
	{/if}
</ul>

<style>
	.backup-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.backup-list-item {
		padding: 10px;
		border-bottom: 1px solid #ddd;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.backup-list-item:last-child {
		border-bottom: none;
	}

	.backup-list-item.selected {
		background-color: #ddd;
	}
</style>
