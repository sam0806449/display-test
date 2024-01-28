export default [
	{
		name: "member",
		path: "member",
		component: () => import(`@/modules/member/views/Member`),
		meta: {
			title: "member.title",
			class: 'member',
			keepAlive: true
		}
	},

	{
		name: 'teamReport',
		path: 'teamReport',
		component: () => import(`@/modules/member/views/TeamReport`),
		meta: {
			title: 'teamReport.title',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: 'subordinate',
		path: 'subordinate',
		component: () => import(`@/modules/member/views/Subordinate`),
		meta: {
			title: 'subordinate.title',
			childPage: true
		}
	},

	{
		name: 'subordinateDetails',
		path: 'subordinate/details',
		component: () => import(`@/modules/member/views/SubordinateDetails`),
		meta: {
			title: 'subordinateDetails.title',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: 'setPwd',
		path: 'setPwd',
		component: () => import(`@/modules/member/views/SetPwd`),
		meta: {
			title: 'setPwd.title',
			childPage: true
		}
	},
	{
		name: 'memberInfo',
		path: 'member/info',
		component: () => import(`@/modules/member/views/MemberInfo`),
		meta: {
			title: 'memberInfo.title',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: 'memberDetails',
		path: 'member/details',
		component: () => import(`@/modules/member/views/MemberDetails`),
		meta: {
			title: 'memberDetails.title',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: 'profits',
		path: 'profits',
		component: () => import(`@/modules/member/views/Profits`),
		meta: {
			title: 'profits.title',
			childPage: true,
		}
	},

	{
		name: "changeNotes",
		path: "changeNotes",
		component: () => import(`@/modules/member/views/ChangeNotes`),
		meta: {
			title: "changeNotes.title",
			clickLeft: '/app/member',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: "changeNotesDetails",
		path: "changeNotes/details",
		component: () => import(`@/modules/member/views/ChangeNotesDetails`),
		meta: {
			title: "changeNotesDetails.title",
			clickLeft: '/changeNotes',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: "setUp",
		path: "setUp",
		component: () => import(`@/modules/member/views/SetUp`),
		meta: {
			title: "setUp.title",
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: "feedback",
		path: "feedback",
		component: () => import(`@/modules/member/views/Feedback`),
		meta: {
			title: "feedback.title",
			childPage: true,
			keepAlive: true
		}
	},


	{
		name: "purses",
		path: "purses",
		component: () => import(`@/modules/member/views/Purses`),
		meta: {
			title: "purses.title",
			childPage: true,
			rightText: 'rechargeNotes',
			routerRight: '/app/rechargeNotes',
			keepAlive: true
		}
	},

	{
		name: "pursesTransfer",
		path: "purses/transfer",
		component: () => import(`@/modules/member/views/PursesTransfer`),
		meta: {
			title: "pursesTransfer.title",
			childPage: true,
			rightText: 'transferRecord',
			routerRight: '/app/transferRecord',
			keepAlive: true
		}
	},

	{
		name: "changeLanguage",
		path: "changeLanguage",
		component: () => import(`@/modules/member/views/ChangeLanguage`),
		meta: {
			title: "changeLanguage.title",
			childPage: true,
			isVisit: true
		}
	},

	{
		name: 'cards',
		path: 'cards',
		component: () => import(`@/modules/member/views/Cards`),
		meta: {
			title: 'cards.title',
			childPage: true,
			keepAlive: true
		}
	},
	{
		name: 'addBank',
		path: 'bank/add',
		component: () => import(`@/modules/member/views/AddBank`),
		meta: {
			title: 'addBank.title',
			childPage: true,
			rightIcon: '/images/member/server.png',
			routerRight: '/app/service',
		}
	},
	{
		name: 'editBank',
		path: 'bank/edit',
		component: () => import(`@/modules/member/views/AddBank`),
		meta: {
			title: 'addBank._4',
			childPage: true,
			rightIcon: '/images/member/server.png',
			routerRight: '/app/service',
		},
		props: (route) => route.params
	},

	{
		name: 'AddVirtual',
		path: 'virtual/add',
		component: () => import(`@/modules/member/views/AddVirtual`),
		meta: {
			title: 'addVirtual.title',
			childPage: true,
			rightIcon: '/images/member/server.png',
			routerRight: '/app/service',
		}
	},

	{
		name: 'rebates',
		path: 'rebates',
		component: () => import(`@/modules/member/views/Rebates`),
		meta: {
			title: 'rebates.title',
			rightText: 'rebateRecord',
			routerRight: '/app/rebateNotes',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: 'rebateRecord',
		path: 'rebateRecord',
		component: () => import(`@/modules/member/views/RebateRecord`),
		meta: {
			title: 'rebateRecord.title',
			childPage: true,
		}
	},

	{
		name: 'rebateRecordDetails',
		path: 'rebateRecord/details',
		component: () => import(`@/modules/member/views/RebateRecordDetails`),
		meta: {
			title: 'memberDetails.title',
			childPage: true,
		}
	},

	{
		name: 'rebateNotes',
		path: 'rebateNotes',
		component: () => import(`@/modules/member/views/RebateNotes`),
		meta: {
			title: 'rebateNotes.title',
			childPage: true,
		}
	},

	{
		name: 'rebateNotesDetails',
		path: 'rebateNotes/details',
		component: () => import(`@/modules/member/views/RebateNotesDetails`),
		meta: {
			title: 'rebateNotesDetails.title',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: 'setWithdrawalPwd',
		path: 'setWithdrawalPwd',
		component: () => import(`@/modules/member/views/SetWithdrawalPwd`),
		meta: {
			title: 'setWithdrawalPwd.title',
			childPage: true,
		}
	},

	{
		name: 'forgetPwd',
		path: 'forgetPwd',
		component: () => import(`@/modules/member/views/ForgetPwd`),
		meta: {
			title: 'forgetPwd.title',
			childPage: true,
			isVisit: true
		}
	},

	{
		name: 'transferRecord',
		path: 'transferRecord',
		component: () => import(`@/modules/member/views/TransferRecord`),
		meta: {
			title: 'transferRecord.title',
			childPage: true,
		}
	},

	{
		name: 'memberSearchCountry',
		path: 'member/searchCountry',
		component: () => import(`@/modules/member/views/MemberSearchCountry`),
		meta: {
			title: 'searchCountry.title',
			keepAlive: true,
			childPage: true
		}
	},
	
	{
		name: 'exchangeMoney',
		path: 'exchangeMoney',
		component: () => import(`@/modules/member/views/ExchangeMoney`),
		meta: {
			title: 'exchangeMoney.title',
			childPage: true
		}
	},
	
	{
		name: 'addPay',
		path: 'addPay',
		component: () => import(`@/modules/member/views/AddPay`),
		meta: {
			title: 'addPay.title',
			childPage: true
		}
	},
	
	{
		name: 'firstRecharge',
		path: 'firstRecharge',
		component: () => import(`@/modules/member/views/FirstRecharge`),
		meta: {
			title: 'subordinate.title',
			childPage: true
		}
	},
	
	{
		name: 'subordinateAgent',
		path: 'subordinateAgent',
		component: () => import(`@/modules/member/views/SubordinateAgent`),
		meta: {
			title: 'subordinateAgent.title',
			childPage: true
		}
	}
];
