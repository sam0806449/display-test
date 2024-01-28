export default [{
		name: "preferential",
		path: "preferential",
		component: () => import(`@/modules/preferential/views/Preferential`),
		meta: {
			title: "preferential.title",
			keepAlive: true,
			isVisit: true
		}
	},
	{
		name: "preferentialDetails",
		path: "preferential/details",
		component: () => import(`@/modules/preferential/views/PreferentialDetails`),
		meta: {
			title: "preferentialDetails.title",
			childPage: true,
			keepAlive: true,
			isVisit: true
		}
	},
	{
		name: "preferentialApply",
		path: "preferential/apply",
		component: () => import(`@/modules/preferential/views/PreferentialApply`),
		meta: {
			title: "preferentialApply.title",
			childPage: true
		}
	},

	{
		name: "reviews",
		path: "preferential/reviews",
		component: () => import(`@/modules/preferential/views/Reviews`),
		meta: {
			title: "reviews.title",
			childPage: true
		}
	},

	{
		name: "reviewsDetails",
		path: "preferential/reviews/details",
		component: () => import(`@/modules/preferential/views/ReviewsDetails`),
		meta: {
			title: "reviewsDetails.title",
			childPage: true,
			keepAlive: true,
		}
	},

	{
		name: "preferentialUcs",
		path: "preferentialUcs",
		component: () => import(`@/modules/preferential/views/PreferentialUcs`),
		meta: {
			title: "preferential.title",
			keepAlive: true,
			childPage: true,
			rightText: 'progress',
			routerRight: 'preferential/reviews',
			isVisit: true
		}
	},
];
