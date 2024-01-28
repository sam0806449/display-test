export default [{
		name: "service",
		path: "service",
		component: () => import(`@/modules/service/views/Service`),
		meta: {
			title: "service.title",
			class: 'service',
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "serviceGames",
		path: "service/games",
		component: () => import(`@/modules/service/views/Games`),
		meta: {
			title: "s_games.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "serviceLottery",
		path: "service/games/lottery",
		component: () => import(`@/modules/service/views/games/Lottery`),
		meta: {
			title: "lottery.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "serviceGaming",
		path: "service/games/gaming",
		component: () => import(`@/modules/service/views/games/Gaming`),
		meta: {
			title: "gaming.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},


	{
		name: "serviceRealbet",
		path: "service/games/realbet",
		component: () => import(`@/modules/service/views/games/Realbet`),
		meta: {
			title: "realbet.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},


	{
		name: "serviceSport",
		path: "service/games/sport",
		component: () => import(`@/modules/service/views/games/Sport`),
		meta: {
			title: "sport.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "serviceOthers",
		path: "service/games/others",
		component: () => import(`@/modules/service/views/games/Others`),
		meta: {
			title: "others.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "serviceAbout",
		path: "service/about",
		component: () => import(`@/modules/service/views/About`),
		meta: {
			title: "s_about.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "serviceResponsibility",
		path: "service/about/responsibility",
		component: () => import(`@/modules/service/views/about/Responsibility`),
		meta: {
			title: "responsibility.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "serviceAboutUs",
		path: "service/about/index",
		component: () => import(`@/modules/service/views/about/AboutUs`),
		meta: {
			title: "aboutUs.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "servicePrivacy",
		path: "service/about/privacy",
		component: () => import(`@/modules/service/views/about/Privacy`),
		meta: {
			title: "privacy.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "serviceAccounts",
		path: "service/accounts",
		component: () => import(`@/modules/service/views/Accounts`),
		meta: {
			title: "accounts.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "serviceTransfer",
		path: "service/transfer",
		component: () => import(`@/modules/service/views/Transfer`),
		meta: {
			title: "transfer.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "serviceBrowser",
		path: "service/browser",
		component: () => import(`@/modules/service/views/Browser`),
		meta: {
			title: "browser.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "serviceSportsBetting",
		path: "service/sportsBetting",
		component: () => import(`@/modules/service/views/SportsBetting`),
		meta: {
			title: "sportsBetting.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "serviceHijack",
		path: "service/hijack",
		component: () => import(`@/modules/service/views/Hijack`),
		meta: {
			title: "hijack.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "servicePreferentialRules",
		path: "service/preferentialRules",
		component: () => import(`@/modules/service/views/PreferentialRules`),
		meta: {
			title: "preferentialRules.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "ucsRebate",
		path: "service/ucsRebate",
		component: () => import(`@/modules/service/views/UcsRebate`),
		meta: {
			title: "ucsRebate.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},
	
	{
		name: "rechargeText",
		path: "service/rechargeText",
		component: () => import(`@/modules/service/views/RechargeText`),
		meta: {
			title: "rechargeText.title",
			childPage: true,
			keepAlive: true
		}
	},
	
];
