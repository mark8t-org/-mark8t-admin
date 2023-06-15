<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// import { phpStore, transformPHP } from '../admin/parseHtml';

	let reverse = false;
	let output = '';

	// import Quill from 'quill';

	import { Utils } from '@mark8t/core';
	import { emailsWithRestParamaters } from '../emails';

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
	let lang = 'en';
	const api = import.meta.env.VITE_API_URL;

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

	$: emailTemplates = `<?php 
		$lang = $_GET['lang'] ?? 'en';
		$text = [
			'en' => [
			'subject' => 'Shipping Confirmation for Order #'.$_GET['order_id'],
			'greeting' => 'Hello '.$_GET['name'].',',
			'shipment_details' => 'Your order has been shipped and is on its way to you! Here are the details of your shipment:',
			'tracking_number' => 'Tracking Number: '.$_GET['tracking_number'],
			'estimated_delivery' => 'Estimated Delivery Date: '.$_GET['estimated_delivery'],
			'website' => 'You can track your shipment and view the details of your order on our website: https://mark8t.ca',
			'questions' => 'If you have any questions or concerns, please feel free to contact us at inquiries@mark8t.ca.',
			'regards' => 'Best regards,<br>The Mark8t Team',
			],
			'fr' => [
			'subject' => 'Confirmation d\'expédition pour la commande #'.$_GET['order_id'],
			'greeting' => 'Bonjour '.$_GET['name'].',',
			'shipment_details' => 'Votre commande a été expédiée et est en route vers vous ! Voici les détails de votre expédition :',
			'tracking_number' => 'Numéro de suivi : '.$_GET['tracking_number'],
			'estimated_delivery' => 'Date de livraison estimée : '.$_GET['estimated_delivery'],
			'website' => 'Vous pouvez suivre votre expédition et consulter les détails de votre commande sur notre site web : https://mark8t.ca',
			'questions' => "Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter à inquiries@mark8t.ca.",
			'regards' => "Cordialement,<br>L'équipe Mark8t",
			],
		];
		?>
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title><?php echo $text[$lang]['subject']; ?></title>
		</head>
		<body>
			<table cellpadding="0" cellspacing="0" border="0" width="100%">
			<tr>
				<td align="center" valign="top" bgcolor="#FFFFFF">
		<table cellpadding="0" cellspacing="0" border="0" width="600">
		<tr>
		<td align="center" valign="top" style="padding: 30px;">
		<img src="https://mark8t.ca/storage/logo.svg" alt="Mark8t" width="175" height="100" style="display: block;">
		</td>
		</tr>
		</table>
		</td>
		</tr>
		<tr>
		<td align="center" valign="top" bgcolor="#FFFFFF" style="padding: 30px;">
		<table cellpadding="0" cellspacing="0" border="0" width="600">
		<tr>
		<td align="left" valign="top" style="padding: 20px;">
		<p><?php echo $text[$lang]['greeting']; ?></p>
		<p><?php echo $text[$lang]['shipment_details']; ?></p>
		<p><?php echo $text[$lang]['tracking_number']; ?></p>
		<p><?php echo $text[$lang]['estimated_delivery']; ?></p>
		<p><?php echo $text[$lang]['website']; ?></p>
		<p><?php echo $text[$lang]['questions']; ?></p>
		<p><?php echo $text[$lang]['regards']; ?></p>
		</td>
		</tr>
		</table>
		</td>
		</tr>
		</table>

		</body>
		</html>
	`;
	// $: emailTemplate = transformPHP(emailTemplates);

	onMount(() => {
		importEmailTemplate();
		// emailTemplate = transformPHP(emailTemplates);
		// import
		// window.transformPHP = transformPHP;
		//emailTemplate = output;
		// phpStore.subscribe((value) => {
		// emailTemplate = value;
		// });
		//console.log(output);
	});
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<div class="w-100">
	<strong>Email Templates <small>(preview)</small></strong>

	<hr />
	<p>
		<small
			>This page allows you to manage and configure the different email templates. <br /> You send test
			emails to your self, or preview them here.
		</small>
	</p>
	<hr />
	<!-- <label for="email-type">(preview)</label> -->
	<select
		on:wheel={(event) => {}}
		id="email-type"
		class="w-100"
		bind:value={selectedEmailType}
		on:change={importEmailTemplate}
	>
		<!-- <option value="">Select an email type</option> -->
		{#each Object.entries(Utils.Schema._EMAILS_LISTING_) as [key, value, index]}
			<option value={key}>{value.name}</option>
		{/each}
	</select>
	<!-- show filename from fileNames -->
</div>

<hr />
<div hidden>
	<!-- <label for="email-description">Email Description:</label> -->
	<!-- <textarea
		id="email-description"
		class="w-100"
		bind:value={_EMAILS_LISTING_[selectedEmailType].description}
		disabled
	/> -->
	<label for="email-template"><h3 class="w-100">Template</h3></label>
	<pre id="editor" use:quill>
		<!-- {"<!DOCTYPE html" + emailTemplate.split("<!DOCTYPE html")[1]} -->
</pre>
</div>
<!-- <hr /> -->
<div>
	<!-- <label for="email-template"><h3 class="w-100">Preview</h3></label> -->
	<div id="editor-preview">
		{@html emailPreview}
	</div>
</div>

<style>
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
