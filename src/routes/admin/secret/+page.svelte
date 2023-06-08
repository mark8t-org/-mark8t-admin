<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text';

	import Card, { Content } from '@smui/card';

	let valueC = '';

	const checkValue = (value) => {
		if (value.length > 0) {
		} else {
			return false;
		}
		if (value == 'PEON') {
			return true;
		}
	};
</script>

<br />
<br />
<br />
<section class="container">
	<br />
	<Card
		padded
		style="max-width:420px;width:100%;text-align:center;
	margin:0px auto;"
	>
		<div class="card-container" />
		<div class="columns margins">
			<div>
				<br />
				<form
					on:submit={() => {
						goto(base + '/dev/admin?secret=' + valueC);
					}}
				>
					<Textfield type="password" variant="outlined" bind:value={valueC}>
						<Icon class="material-icons" slot="trailingIcon">delete</Icon>
					</Textfield>
				</form>
			</div>
			<div style="width:100%;text-align:center;">
				Already a member? <a href={base + '/admin'} style="color:var(--primary)">Login</a>
			</div>
		</div>
		<br />
	</Card>
</section>
