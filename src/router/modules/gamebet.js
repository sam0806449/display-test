export default [
	{
		name: "gameBet",
		path: "gameBet",
		component: () => import(`@/modules/gamebet/views/GameBet`),
		meta: {
			title: "gameBet.title",
			keepAlive: true,
			childPage: true,
		}
	},
	{
		name: "gameBetDetails",
		path: "gameBet/details",
		component: () => import(`@/modules/gamebet/views/GameBetDetails`),
		meta: {
			title: "gameBetDetails.title",
			keepAlive: true,
			childPage: true,
		}
	}
];
