export default [
	{
		name: 'messages',
		path: 'messages',
		component: () => import(`@/modules/messages/views/Messages`),
		meta: {
			title: 'messages.title',
			childPage: true,
			clickLeft: '/app/dashboard',
			isVisit: true
		}
	},

	{
		name: 'bulletinDetails',
		path: 'messages/bulletinDetails',
		component: () => import(`@/modules/messages/views/BulletinDetails`),
		meta: {
			title: 'messages.bulletinDetails',
			childPage: true,
			isVisit: true
		}
	},

	{
		name: 'stationDetails',
		path: 'messages/stationDetails',
		component: () => import(`@/modules/messages/views/StationDetails`),
		meta: {
			title: 'messages.stationsDetails',
			childPage: true
		}
	},

	{
		name: 'scrollMsgs',
		path: 'scrollMsgs',
		component: () => import(`@/modules/messages/views/ScrollMsgs`),
		meta: {
			title: 'messages.scrollMsgs',
			clickLeft: '/app/dashboard',
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	}
]
