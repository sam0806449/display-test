export default [
	{
		name: 'recharge',
		path: 'recharge',
		component: () => import(`@/modules/recharge/views/Recharge`),
		meta: {
			title: 'recharge.title',
			rightIcon: 'question-o',
			routerRight: '/app/service/rechargeText',
			childPage: true
		}
	},

	{
		name: 'rechargeNotes',
		path: 'rechargeNotes',
		component: () => import(`@/modules/recharge/views/RechargeNotes`),
		meta: {
			title: 'rechargeNotes.title',
			childPage: true
		}
	},

	{
		name: 'rechargeNotesDetails',
		path: 'rechargeNotes/details',
		component: () => import(`@/modules/recharge/views/RechargeNotesDetails`),
		meta: {
			title: 'rechargeNotesDetails.title',
			keepAlive: true,
			childPage: true
		}
	},

	{
		name: 'transferBank',
		path: 'recharge/transferBank',
		component: () => import(`@/modules/recharge/transfer/Bank`),
		meta: {
			title: 'transferBank.title',
			childPage: true
		}
	},

	{
		name: 'transferScanCode',
		path: 'recharge/transferScanCode',
		component: () => import(`@/modules/recharge/transfer/ScanCode`),
		meta: {
			title: 'transferScanCode.title',
			childPage: true
		}
	},

	{
		name: 'transferQrCode',
		path: 'recharge/transferQrCode',
		component: () => import(`@/modules/recharge/transfer/QrCode`),
		meta: {
			title: 'transferQrCode.title',
			childPage: true
		}
	},

	{
		name: 'hrefForm',
		path: 'recharge/hrefForm',
		component: () => import(`@/modules/recharge/transfer/HrefForm`),
		meta: {
			title: 'recharge.title',
			childPage: true
		}
	},

	{
		name: 'virtual',
		path: 'recharge/virtual',
		component: () => import(`@/modules/recharge/transfer/Virtual`),
		meta: {
			title: 'virtual.title',
			childPage: true
		}
	},
]
