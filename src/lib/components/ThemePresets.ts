
export let ThemePresets = (style, open, i = 1) => {

	let data = [
		{
			id: 0,
			theme: 'acrylic dark',
			sidebar: {
				orientation: 'start',
				css: {
					aside: `
			top-0 scrollbar
      bg-gray-900
      h-screen
      overflow-y-auto
      lg:bg-transparent lg:block lg:relative lg:w-64 lg:z-auto
      ${style.mobileOrientation[style.orientation]}
      ${open ? 'absolute w-8/12 z-40 sm:w-5/12' : 'hidden'}
			`,
					div: 'pb-32 lg:pb-6'
				}
			},
			sidebarItems: {
				css: {
					title: `mx-4 text-sm`,
					section: `font-medium mb-4 pl-5 text-gray-500 text-lg lg:pl-6`,
					link: `flex items-center justify-start my-1 p-3 text-white w-full mica`,
					active: `border-white lg:border-red-300 border-l-4 lg:border-l-0 lg:border-r-4`
				}
			}
		},
		{
			id: 1,
			theme: 'acrylic light',
			sidebar: {
				css: {
					aside: `
					top-0 scrollbar
					bg-gray-900
					h-screen
					overflow-y-auto
					lg:bg-transparent lg:block lg:relative lg:w-64 lg:z-auto
					${style.mobileOrientation[style.orientation]}
					${open ? 'absolute w-8/12 z-40 sm:w-5/12' : 'hidden'}
					`,
					div: 'pb-32 lg:pb-6'
				}
			},
			sidebarItems: {
				css: {
					title: `mx-4 text-sm`,
					section: `font-medium mb-4 pl-5 text-gray-500 text-lg lg:pl-6`,
					active: `border-green-500 border-l-4 lg:border-l-0 lg:border-r-4 lg:border-gray-500`,
					link: `flex items-center justify-start my-1 p-3 text-gray-400 w-full lg:hover:text-grey-400 lg:hover:bg-gray-900`
				}
			}
		},
		{
			id: 2,
			theme: 'mica',
			sidebar: {
				css: {
					aside: `
						top-0 scrollbar
						bg-gray-900
						h-screen
						overflow-y-auto
						lg:bg-transparent lg:block lg:relative lg:w-64 lg:z-auto
						${style.mobileOrientation[style.orientation]}
						${open ? 'absolute w-8/12 z-40 sm:w-5/12' : 'hidden'}
						`,
					div: 'pb-32 lg:pb-6'
				}
			},
			sidebarItems: {
				css: {
					title: `mx-4 text-sm`,
					section: `font-medium mb-4 pl-5 text-gray-500 text-lg lg:pl-6`,
					active: `border-green-500 border-l-4 lg:border-l-0 lg:border-r-4 lg:border-gray-500`,
					link: `flex items-center justify-start my-1 p-3 text-gray-800 w-full lg:hover:bg-gray-100`
				}
			}
		},
		{
			id: 3,
			theme: 'white',
			sidebar: {
				css: {
					aside: `
					top-0 scrollbar
					bg-gray-900
					h-screen
					overflow-y-auto
					lg:bg-transparent lg:block lg:relative lg:w-64 lg:z-auto
					${style.mobileOrientation[style.orientation]}
					${open ? 'absolute w-8/12 z-40 sm:w-5/12' : 'hidden'}
					`,
					div: 'pb-32 lg:pb-6'
				}
			},
			sidebarItems: {
				css: {
					title: `mx-4 text-sm`,
					section: `font-medium mb-4 pl-5 text-gray-500 text-lg lg:pl-6`,
					active: `border-green-500 border-l-4 lg:border-l-0 lg:border-r-4 lg:border-gray-500`,
					link: `flex items-center justify-start my-1 p-3 text-gray-800 w-full lg:hover:bg-gray-100`
				}
			}
		},
		{
			id: 4,
			theme: 'dark',
			sidebar: {
				css: {
					aside: `
					top-0 scrollbar
					bg-gray-900
					h-screen
					overflow-y-auto
					lg:bg-transparent lg:block lg:relative lg:w-64 lg:z-auto
					${style.mobileOrientation[style.orientation]}
					${open ? 'absolute w-8/12 z-40 sm:w-5/12' : 'hidden'}
					`,
					div: 'pb-32 lg:pb-6'
				}
			},
			sidebarItems: {
				css: {
					title: `mx-4 text-sm`,
					section: `font-medium mb-4 pl-5 text-gray-500 text-lg lg:pl-6`,
					active: `border-green-500 border-l-4 lg:border-l-0 lg:border-r-4 lg:border-gray-500`,
					link: `flex items-center justify-start my-1 p-3 text-gray-800 w-full lg:hover:bg-gray-100`
				}
			}
		},
		{
			id: 5,
			theme: 'light',
			sidebar: {
				css: {
					aside: `
					top-0 scrollbar
					bg-gray-900
					h-screen
					overflow-y-auto
					lg:bg-transparent lg:block lg:relative lg:w-64 lg:z-auto
					${style.mobileOrientation[style.orientation]}
					${open ? 'absolute w-8/12 z-40 sm:w-5/12' : 'hidden'}
					`,
					div: 'pb-32 lg:pb-6'
				}
			},
			sidebarItems: {
				css: {
					title: `mx-4 text-sm`,
					section: `font-medium mb-4 pl-5 text-gray-500 text-lg lg:pl-6`,
					active: `border-green-500 border-l-4 lg:border-l-0 lg:border-r-4 lg:border-gray-500`,
					link: `flex items-center justify-start my-1 p-3 text-gray-800 w-full lg:hover:bg-gray-100`
				}
			}
		},
		{
			id: 6,
			theme: 'black',
			sidebar: {
				css: {
					aside: `
					top-0 scrollbar
					bg-gray-900
					h-screen
					overflow-y-auto
					lg:bg-transparent lg:block lg:relative lg:w-64 lg:z-auto
					${style.mobileOrientation[style.orientation]}
					${open ? 'absolute w-8/12 z-40 sm:w-5/12' : 'hidden'}
					`,
					div: 'pb-32 lg:pb-6'
				}
			},
			sidebarItems: {
				css: {
					title: `mx-4 text-sm`,
					section: `font-medium mb-4 pl-5 text-gray-500 text-lg lg:pl-6`,
					active: `border-green-500 border-l-4 lg:border-l-0 lg:border-r-4 lg:border-gray-500`,
					link: `flex items-center justify-start my-1 p-3 text-gray-800 w-full lg:hover:bg-gray-100`
				}
			}
		},
	]

	if (i === -1) {
		return data;
	}
	return data[i];
};