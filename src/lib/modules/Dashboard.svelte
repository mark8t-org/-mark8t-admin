<script>
	import Row from '../components/dashboards/Row.svelte';
	import TableWithPagination from '../components/TableWithPagination.svelte';
	import Input from '../components/Input.svelte';
	import Accordion from '../components/Accordion.svelte';
	import { Account, Contact, Website, Products, Emails, I18n, Backup } from '../modules';
	import { onMount } from 'svelte';

	const unsavedChanges = () => {};
	export let account = {};
</script>

<!-- <div class="mt-6 mb-3 text-gray-400">Recent</div>

<div class="p-4 font-normal rounded-2xl" style="background-color: rgb(146 151 179 / 13%)">
	<Row
		rowData={[
			{
				id: 0,
				image: '',
				name: '',
				role: '',
				created_at: '',
				status: 'active',
				statusColour: 'bg-green-500',
				buttonText: 'Status',
				buttonType: 'dropdown',
				buttonOptions: [
					{ text: 'Active', href: '#' },
					{ text: 'Passive', href: '#' },
					{ text: 'Offline', href: '#' }
				]
			}
		]}
	/>
</div> -->

<!-- <div class="mt-6 mb-3 text-gray-400">User</div> -->

<TableWithPagination data={[account]} />

<div class="mt-6 mb-3 text-gray-400">Modules</div>

<div class="p-4 font-normal rounded-2xl" style="background-color: rgb(146 151 179 / 13%)">
	<Account {unsavedChanges} overrideOpenState={false} />
	<Contact {unsavedChanges} overrideOpenState={false} />
	<Website {unsavedChanges} overrideOpenState={false} />
	<Products
		{unsavedChanges}
		locked={true}
		openExternally={true}
		redirectUrl={'./admin/products'}
		overrideOpenState={false}
	/>
	<!-- <Emails {unsavedChanges} locked={true} overrideOpenState={false} /> -->
	<!-- <I18n {unsavedChanges} locked={true} overrideOpenState={false} /> -->
	<!-- <Backup {unsavedChanges} locked={true} overrideOpenState={false} /> -->
</div>
