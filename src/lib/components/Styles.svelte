<script lang="ts">
	const styles = [
		// {
		// 	name: 'Material Typography',
		// 	value: 'https://cdn.jsdelivr.net/npm/@material/typography@13.0.0/dist/mdc.typography.css'
		// }
	];
</script>

<svelte:head>
	<link rel="preconnect" href="https://rsms.me/" />
	<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

	{#each styles as style}
		<link rel="stylesheet" href={style.value} />
	{/each}
	<style lng="scss">
		/* $primary-color: #007bff; */
		/* $hover-color: lighten($primary-color, 10%); */
		/* $shadow-color: rgba(0, 0, 0, 0.1); */
		:root {
			--mdc-theme-surface: rgba(0, 0, 0, 0);
			--mdc-theme-on-surface: rgba(255, 255, 255, 0.87);
			--mdc-theme-primary: #f96057;
			--mdc-theme-on-primary: #fff;
			--mdc-theme-primary-dark: #f8ce52;
			--mdc-theme-on-primary-dark: #fff;
			--font-family-sans-serif: 'Inter', 'Roboto', 'Helvetica Neue', sans-serif;
			--font-family-monospace: 'Roboto Mono', 'Courier New', monospace;
		}
		body {
			font-family: var(--font-family-sans-serif);
		}
	</style>

	<!--
	<style lang="scss">
		// Strip unit function to make the mixin more robust
		@function strip-unit($value) {
			@return $value / ($value * 0 + 1);
		}

		// Fluid typography mixin
		@mixin fluid-type($min-vw, $max-vw, $min-font-size, $max-font-size) {
			$unit: unit($min-vw);

			@if $unit == unit($max-vw) and $unit == unit($min-font-size) and $unit == unit($max-font-size)
			{
				font-size: $min-font-size !important;
				@media screen and (min-width: $min-vw) {
					font-size: calc(
						#{$min-font-size} + #{strip-unit($max-font-size - $min-font-size)} *
							((100vw - #{$min-vw}) / #{strip-unit($max-vw - $min-vw)})
					) !important;
				}
				@media screen and (min-width: $max-vw) {
					font-size: $max-font-size !important;
				}
			}
		}

		// Variables
		$primary-color: #007bff;
		$hover-color: lighten($primary-color, 10%);
		$shadow-color: rgba(0, 0, 0, 0.1);
		$font-family: 'Roboto', 'Helvetica Neue', sans-serif;
		.header-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem 2rem;
			position: fixed;
			top: 0;
			width: 100%;
			background-color: white;
			box-shadow: 0px 2px 10px $shadow-color;
			z-index: 100;
			font-family: $font-family;

			@include fluid-type(420px, 1920px, 1rem, 1.2rem);

			@media (max-width: 768px) {
				flex-direction: column;
				align-items: center; // Changed from flex-end to center
				button + button {
					margin-top: 0.5rem;
				}
			}

			.menu-toggle {
				display: none; // Hidden by default

				@media (max-width: 768px) {
					display: block; // Displayed on mobile
				}
			}

			.menu-items {
				display: flex;

				@media (max-width: 768px) {
					display: none;
					flex-direction: column;
					align-items: flex-end;
					position: absolute;
					top: 100%;
					right: 0;
					background-color: white;
					box-shadow: 0px 2px 10px $shadow-color;
					width: 100%;
					z-index: 99;

					&.active {
						display: block; // Shown when active
					}
				}

				// General button styles
				button {
					margin-left: 1.5rem;
					padding: 0.5rem 1.5rem;
					border: none;
					background-color: $primary-color;
					color: white !important;
					cursor: pointer;
					font-family: $font-family;

					@include fluid-type(420px, 1920px, 1rem, 1.1rem);

					> a {
						font-size: inherit; // Ensure that the font size is inherited from the button
						color: white;
						font-weight: 400;
						font-size: 18px;
					}

					&:hover {
						background-color: $hover-color;
					}
				}
			}
			// Specific button classes
			.login-button,
			.logout-button {
				@media (max-width: 768px) {
					margin-left: 0;
				}
			}
		}
	</style> -->
</svelte:head>
