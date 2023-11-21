<script>
	import { openSidebar } from './store';
	import Search from '../Search.svelte';
</script>

<header class="h-16 md:h-20 items-center relative w-full z-10">
	<div
		class="
        flex
        flex-col
        flex-center
        h-full
        px-3
        mx-auto
        relative
        justify-center
      "
	>
		<div
			class="
          flex
          items-center
          pl-1
          relative
          w-full
          sm:ml-0 sm:pr-2
          lg:max-w-68
        "
		>
			<!-- SEARCH -->
			<Search />
			<div class="container flex left-0 relative w-3/4">
				<!-- HAMBURGER -->
				<div class="flex group h-full items-center relative w-12">
					<button
						type="button"
						aria-expanded="false"
						aria-label="Toggle sidenav"
						class="text-4xl text-white focus:outline-none lg:hidden"
						on:click={openSidebar}
					>
						&#8801;
					</button>
				</div>

				<!-- ICONS -->
				<div
					class="hidden
            flex
            items-center
            justify-end
            ml-5
            p-1
            relative
            w-9/12
            sm:mr-0 sm:right-auto
            md:w-1/4
          "
				>
					<span class="block pr-1 text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"
							/>
						</svg>
					</span>
					<span class="block inline-block px-3 py-2 relative rounded text-white">
						<span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
								/>
							</svg>
						</span>
						<span
							class="
                absolute
                bg-blue-700
                font-bold
                px-2
                py-0.5
                right-0
                rounded-full
                text-xs
                top-0
              "
						>
							3
						</span>
					</span>
					<span class="block pl-5 relative">
						<img
							alt="User Avatar"
							src="/images/user.svg"
							class="h-10 mx-auto object-cover rounded-full w-10"
						/>
					</span>
				</div>
			</div>
		</div>
	</div>
</header>
