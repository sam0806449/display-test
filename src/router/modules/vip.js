export default [
	{
		name: "privileges",
		path: "privileges",
		component: () => import(`@/modules/vip/views/Privileges`),
		meta: {
			title: "privileges.title",
			class: 'privileges',
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: "privilegesDetails",
		path: "privileges/details",
		component: () => import(`@/modules/vip/views/PrivilegesDetails`),
		meta: {
			title: "privilegesDetails.title",
			childPage: true,
			keepAlive: true
		}
	},

	{
		name: "rebatesRules",
		path: "rebates/rules",
		component: () => import(`@/modules/vip/views/RebatesRules`),
		meta: {
			title: "rebatesRules.title",
			childPage: true,
			keepAlive: true,
		}
	}

];
