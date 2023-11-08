<script>
	export let title = 'Apps'; // Default title
	export let description =
		'Grab yourself 10 free images from Adobe Stock in a 30-day free trial plan and find the perfect image that will help you with your new project.'; // Default description
	export let buttonText = 'Start Free Trial'; // Default button text
	export let imageUrl = 'image-offer.png'; // Default image URL
	export let titleClass = 'text-lg text-white'; // Default title classes
	export let descriptionClass = 'text-sm text-white'; // Default description classes
	export let buttonClass = 'bg-blue-700 text-white'; // Default button classes
	export let imageClass = 'w-24 md:w-44 object-cover object-center'; // Default image classes
</script>

<div
	class="flex flex-wrap md:flex-nowrap items-center justify-between w-full rounded-2xl py-6 px-12 custom-bg"
>
	<div>
		<h3 class={`flex items-center m-0 font-medium ${titleClass}`}>
			<img class="mr-2" width="25" height="25" src="/image-offer.png" alt="Offer" />
			{title}
		</h3>
		<div class={`font-normal mt-4 mb-4 overflow-hidden ${descriptionClass}`}>
			{description}
		</div>
		<button class={`py-2 px-4 rounded-2xl ${buttonClass}`}>
			{buttonText}
		</button>
	</div>
	<img class={imageClass} src={imageUrl} alt={title} />
</div>

<style>
	/* Custom background class */
	.custom-bg {
		/* Add your custom styles or Tailwind classes */
	}
</style>
