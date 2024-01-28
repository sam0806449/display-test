import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "./modules/dashboard";
import Account from "./modules/account";
import Preferential from "./modules/preferential";
import Service from "./modules/service";
import Member from "./modules/member";
import Games from "./modules/games";
import Vip from "./modules/vip";
import Financial from "./modules/financial";
import Task from "./modules/task";
import Messages from "./modules/messages";
import Gamebet from "./modules/gamebet";
import Recharge from "./modules/recharge";
import Withdraw from "./modules/withdraw";
import Invite from "./modules/invite";
import Joint from "./modules/joint";
import Lottery from "./modules/lottery";
import Turntable from "./modules/turntable";
import Ucs from "./modules/ucs";
import skgUcs from "./modules/skgUcs";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "hash",
	routes: [
		{
			name: "appHome",
			path: "/app",
			redirect: "/app/dashboard",
			component: () => import(`@/components/AppHome`),
			children: [
				...Dashboard,
				...Preferential,
				...Service,
				...Member,
				...Games,
				...Vip,
				...Financial,
				...Task,
				...Messages,
				...Gamebet,
				...Recharge,
				...Withdraw,
				...Invite,
				...Joint,
				...Lottery,
				...Turntable,
				...Ucs,
				...skgUcs
			]
		},
		...Account,
		{path: "*", redirect: "/app/dashboard"}
	]
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject)
		return originalPush.call(this, location, onResolve, onReject);
	return originalPush.call(this, location).catch(err => err);
};

export default router;
