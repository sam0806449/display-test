export default [
	{
		path: "financial",
		component: () => import(`@/modules/financial/views/Financial`),
		children: [
			{
				name: "financialMarket",
				path: "",
				component: () => import(`@/modules/financial/views/FinancialMarket`),
				meta: {
					title: "financial.title",
					rightIcon: '/images/financial/kf.png',
					routerRight: '/app/service',
					class: 'financial',
					routerLeft: '/app/member',
					keepAlive: true,
					childPage: true
				}
			},

			{
				name: "financialHold",
				path: "hold",
				component: () => import(`@/modules/financial/views/FinancialHold`),
				meta: {
					title: "financial.title",
					rightIcon: '/images/financial/kf.png',
					routerRight: '/app/service',
					routerLeft: '/app/member',
					class: 'financial',
					keepAlive: true,
					childPage: true
				}
			}
		]

	},
	{
		name: "financialMarketDetails",
		path: "financialMarket/details",
		component: () => import(`@/modules/financial/views/FinancialMarketDetails`),
		meta: {
			title: "financial.title",
			rightIcon: '/images/financial/kf.png',
			routerLeft: '/app/financial',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: "financialBuy",
		path: "financial/buy",
		component: () => import(`@/modules/financial/views/FinancialBuy`),
		meta: {
			title: "financialBuy.title",
			rightIcon: '/images/financial/kf.png',
			routerLeft: '/app/financialMarket/details',
			childPage: true
		}
	},

	{
		name: "financialIncome",
		path: "financial/income",
		component: () => import(`@/modules/financial/views/FinancialIncome`),
		meta: {
			title: "financialIncome.title",
			rightIcon: '/images/financial/kf.png',
			routerLeft: '/app/financial/hold',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: "financialNotes",
		path: "financial/notes",
		component: () => import(`@/modules/financial/views/FinancialNotes`),
		meta: {
			title: "financialNotes.title",
			rightIcon: '/images/financial/kf.png',
			routerLeft: '/app/financial/hold',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: "financialHoldDetails",
		path: "financialHold/details",
		component: () => import(`@/modules/financial/views/FinancialHoldDetails`),
		meta: {
			title: "financialHoldDetails.title",
			rightIcon: '/images/financial/kf.png',
			routerLeft: '/app/financial/hold',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: "financialRules",
		path: "financial/rules",
		component: () => import(`@/modules/financial/views/FinancialRules`),
		meta: {
			title: "financialRules.title",
			rightIcon: '/images/financial/kf.png',
			routerLeft: '/app/financialMarket/details',
			childPage: true,
			keepAlive: true
		}
	},
];
