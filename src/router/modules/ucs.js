export default [
	{
		path: "ucs",
		component: () => import(`@/modules/ucs/views/Ucs`),
		children: [
			{
				name: "ucs",
				path: "",
				component: () => import(`@/modules/ucs/views/Tournaments`),
				meta: {
					title: "tournaments.title",
					routerLeft: '/app/dashboard',
					rightIcon: 'filter-o',
					childPage: true
				}
			},
			
			{
				name: "ucsNotes",
				path: "/app/ucsNotes",
				component: () => import(`@/modules/ucs/views/UcsNote`),
				meta: {
					title: "ucsNote.title",
					routerLeft: '/app/dashboard',
					childPage: true
				}
			},	
		]

	},
	
	{
		name: "bets",
		path: "ucs/bets",
		component: () => import(`@/modules/ucs/views/Bets`),
		meta: {
			title: "bets.title",
			childPage: true
		}
	},
	
	{
		name: "ucsNotesDetails",
		path: "ucsNotes/details",
		component: () => import(`@/modules/ucs/views/UcsNotesDetails`),
		meta: {
			title: "ucsNotesDetails.title",
			childPage: true
		}
	},
	
];
