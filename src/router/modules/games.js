export default [
	{
		name: "gameLists",
		path: "gameLists",
		component: () => import(`@/modules/games/views/GameLists`),
		meta: {
			title: "gameLists.title",
			leftIcon: 'arrow-left',
			rightIcon: 'search',
			routerLeft: 'dashboard',
			routerRight: 'searchGames',
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "collections",
		path: "collections",
		component: () => import(`@/modules/games/views/Collections`),
		meta: {
			title: "collections.title",
			keepAlive: true
		}
	},

	{
		name: "searchGames",
		path: "searchGames",
		component: () => import(`@/modules/games/views/SearchGames`),
		meta: {
			title: "searchGames.title",
			childPage: true,
			isVisit: true
		}
	},

	{
		name: "allGame",
		path: "allGame",
		component: () => import(`@/modules/games/views/AllGame`),
		meta: {
			title: "profits.game",
			keepAlive: true,
		}
	}
];
