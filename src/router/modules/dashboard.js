export default [{
		name: "dashboard",
		path: "dashboard",
		component: () => import(`@/modules/dashboard/views/Dashboard`),
		meta: {
			title: "dashboard.title",
			leftIcon: '/images/toolbar/noticeBar.png',
			rightIcon: '/images/toolbar/language.png',
			rightText: 'changeLanguage',
			routerLeft: '/app/messages',
			routerRight: '/app/changeLanguage',
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "hotMatchBet",
		path: "hotMatchBet",
		component: () => import(`@/modules/dashboard/views/HotMatchBet`),
		meta: {
			title: "hotMatchBet.title",
			childPage: true
		}
	},
	
	{
		name: "ranks",
		path: "ranks",
		component: () => import(`@/modules/dashboard/views/Ranks`),
		meta: {
			title: "ranks.title",
			rightIcon: 'question-o',
			routerRight: '/app/ranks/rules',
			childPage: true
		}
	},
	
	{
		name: "ranksRules",
		path: "ranks/rules",
		component: () => import(`@/modules/dashboard/views/RanksRules`),
		meta: {
			title: "ranksRules.title",
			keepAlive: true,
			childPage: true
		}
	}
];
