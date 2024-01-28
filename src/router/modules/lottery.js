export default [
	{
		name: 'lottery',
		path: 'lottery',
		component: () => import(`@/modules/lottery/views/Lottery`),
		meta: {
			title: 'lottery.title',
			keepAlive: true,
			childPage: true,
		}
	},

	{
		name: 'betLists',
		path: 'betLists',
		component: () => import(`@/modules/lottery/views/BetLists`),
		meta: {
			title: 'betLists.title',
			keepAlive: true,
			childPage: true,
		}
	},

	{
		name: 'betDetails',
		path: 'betLists/details',
		component: () => import(`@/modules/lottery/views/BetDetails`),
		meta: {
			title: 'betDetails.title',
			keepAlive: true,
			childPage: true,
		}
	},
	{
		name: 'betRule',
		path: 'lottery/rule',
		component: () => import(`@/modules/lottery/views/BetRule`),
		meta: {
			title: 'betRule.title',
			keepAlive: true,
			childPage: true,
		}
	},

	{
		name: 'lotteryLobby',
		path: 'lotteryLobby',
		component: () => import(`@/modules/lottery/views/LotteryLobby2`),
		meta: {
			title: 'lotteryLobby.title',
			class: 'lotteryLobby',
			routerLeft: '/app/dashboard',
			childPage: true,
		}
	},
	
	{
		name: 'pk10',
		path: 'pk10',
		component: () => import(`@/modules/lottery/views/PK10`),
		meta: {
			title: 'pk10.title',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: 'pk10simple',
		path: 'pk10simple',
		component: () => import(`@/modules/lottery/views/PK10simple`),
		meta: {
			title: 'pk10.title',
			childPage: true,
			keepAlive: true
		}
	},


	{
		name: 'ssc',
		path: 'ssc',
		component: () => import(`@/modules/lottery/views/Ssc`),
		meta: {
			title: 'pk10.title2',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: 'sscSimple',
		path: 'sscSimple',
		component: () => import(`@/modules/lottery/views/SscSimple`),
		meta: {
			title: 'pk10.title2',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: 'vnsouth',
		path: 'vnsouth',
		component: () => import(`@/modules/lottery/views/Vnsouth`),
		meta: {
			title: 'betRule._90',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: 'mark6',
		path: 'mark6',
		component: () => import(`@/modules/lottery/views/Mark6`),
		meta: {
			title: 'betRule._106',
			childPage: true,
			keepAlive: true
		}
	},
	
	{
		name: 'pK10Bet',
		path: 'pk10/bet',
		component: () => import(`@/modules/lottery/views/PK10Bet`),
		meta: {
			title: 'pK10Bet.title',
			childPage: true,
		}
	},

	{
		name: 'lotteryTrend',
		path: 'lotteryTrend',
		component: () => import(`@/modules/lottery/views/LotteryTrend`),
		meta: {
			title: 'pk10._611',
			keepAlive: true,
			childPage: true,
		}
	},
	
]
