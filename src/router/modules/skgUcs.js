export default [
	{
		name: "tournamentsNotes",
		path: "tournamentsNotes",
		component: () => import(`@/modules/ucs/views/UcsNote`),
		meta: {
			title: "ucsNote.title",
			keepAlive: true
		}
	},

	{
		name: "tournaments",
		path: "tournaments",
		component: () => import(`@/modules/ucs/views/Tournaments`),
		meta: {
			title: "tournaments.title",
			keepAlive: true
		}
	},
];
