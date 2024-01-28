export default [
	{
		name: 'joint',
		path: 'joint',
		component: () => import(`@/modules/joint/views/Joint`),
		meta: {
			title: 'joint.title',
			rightIcon: 'question-o',
			routerRight: 'joint/helps',
			childPage: true,
			isVisit: true
		}
	},

	{
		name: 'helps',
		path: 'joint/helps',
		component: () => import(`@/modules/joint/views/Helps`),
		meta: {
			title: 'joint.title',
			childPage: true,
			isVisit: true
		}
	},

	{
		name: 'agentRegister',
		path: 'joint/register',
		component: () => import(`@/modules/joint/views/AgentRegister`),
		meta: {
			title: 'agentRegister.title',
			childPage: true,
			isVisit: true
		}
	},

	{
		name: 'jointSearchCountry',
		path: 'joint/searchCountry',
		component: () => import(`@/modules/joint/views/JointSearchCountry`),
		meta: {
			title: 'searchCountry.title',
			keepAlive: true,
			childPage: true,
			isVisit: true
		}
	},
]
