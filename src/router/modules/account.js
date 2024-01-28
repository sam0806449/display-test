export default [{
		name: "login",
		path: "/login",
		component: () => import(`@/modules/account/views/Login`),
		meta: {
			title: "login.title",
			isVisit: true
		}
	},

	{
		name: "register",
		path: "/register",
		component: () => import(`@/modules/account/views/Register`),
		meta: {
			title: "register.title",
			isVisit: true
		}
	},

	{
		name: "searchCountry",
		path: "/searchCountry",
		component: () => import(`@/modules/account/views/SearchCountry`),
		meta: {
			title: "searchCountry.title",
			keepAlive: true,
			isVisit: true
		}
	},

	{
		name: "example",
		path: "/example",
		component: () => import(`@/modules/account/views/Example`),
		meta: {
			title: "example.title",
			isVisit: true
		}
	},

];
