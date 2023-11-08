<script lang="ts">
	import UserProfileButton from './UserProfileButton.svelte';
	import Row from './dashboards/Row.svelte';

	export let data: any[] = [];
	let currentPage = 1;
	let colour = 'bg-blue-500';
	const itemsPerPage = 10;
	const totalPages = Math.ceil(data.length / itemsPerPage);

	function goToPage(page: number): void {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
		// Tracking or additional logic can go here
		console.log(`Navigating to page ${page}`);
	}

	$: paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	// Handle 'Previous' and 'Next' actions
	function previousPage(): void {
		goToPage(currentPage - 1);
	}

	function nextPage(): void {
		goToPage(currentPage + 1);
	}

	console.log(data[0]);
</script>

<div class="mt-8 rounded-2xl" style="background: rgb(146 151 179 / 13%)">
	<div class="p-4 mx-auto">
		<div class="py-8">
			<div class="py-4">
				<div class="max-w-full overflow-x-auto rounded-lg">
					<table class="w-full leading-normal text-white">
						<thead>
							<tr>
								<th
									scope="col"
									class="px-5 py-3 border-b border-gray-200 text-left text-sm uppercase font-normal"
								>
									User
								</th>
								<th
									scope="col"
									class="px-5 py-3 border-b border-gray-200 text-left text-sm uppercase font-normal"
								>
									Environment
								</th>
								<th
									scope="col"
									class="px-5 py-3 border-b border-gray-200 text-left text-sm uppercase font-normal"
								>
									ID
								</th>
								<th
									scope="col"
									class="px-5 py-3 border-b border-gray-200 text-left text-sm uppercase font-normal"
								>
									Status
								</th>
								<!-- <th
									scope="col"
									class="px-5 py-3 border-b border-gray-200 text-left text-sm uppercase font-normal"
								/> -->
							</tr>
						</thead>

						<Row rowData={[]} override={true}>
							{#each paginatedData as user (user.username)}
								<tbody>
									<tr>
										<td class="px-5 py-5 border-b border-gray-200 text-sm">
											<div class="flex items-center">
												<div class="flex-shrink-0">
													<span class="block relative -m-5">
														<UserProfileButton account={user} {colour} hideUsername />
													</span>
												</div>
												<div class="ml-10">
													<p class="whitespace-no-wrap">{user.username}</p>
												</div>
											</div>
										</td>
										<td class="px-5 py-5 border-b border-gray-200 text-sm">
											<p class="whitespace-no-wrap">{user.environment}</p>
										</td>
										<td class="px-5 py-5 border-b border-gray-200 text-sm">
											<p class="whitespace-no-wrap">{user.localAccountId}</p>
										</td>
										<td class="px-5 py-5 border-b border-gray-200 text-sm">
											<span class="relative inline-block px-3 py-1 font-semibold leading-tight">
												<span
													aria-hidden="true"
													class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
												/>
												<span class="relative">{user.status || 'Online'}</span>
											</span>
										</td>
										<!-- <td class="px-5 py-5 border-b border-gray-200 text-sm"
											>+
											<span class="text-indigo-600 hover:text-indigo-900">Edit</span>
										</td> -->
									</tr>
								</tbody>
							{/each}
						</Row>
					</table>
					{#if itemsPerPage <= data.length}
						<!-- Pagination Controls -->
						<div class="flex justify-between items-center pt-4">
							<button
								class="rounded-md px-4 py-2 text-sm font-medium text-gray-500 bg-white hover:bg-gray-100 disabled:opacity-50"
								disabled={currentPage <= 1}
								on:click={previousPage}
							>
								Previous
							</button>

							<!-- Page Number Buttons -->
							{#each Array(totalPages) as _, index (index)}
								<button
									class="rounded-md px-4 py-2 text-sm font-medium text-gray-500 bg-white hover:bg-gray-100"
									class:selected={index + 1 === currentPage ? 'bg-blue-500 text-white' : ''}
									on:click={() => goToPage(index + 1)}
								>
									{index + 1}
								</button>
							{/each}

							<button
								class="rounded-md px-4 py-2 text-sm font-medium text-gray-500 bg-white hover:bg-gray-100 disabled:opacity-50"
								disabled={currentPage >= totalPages}
								on:click={nextPage}
							>
								Next
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
