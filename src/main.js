// rem 自动化适配
// import "lib-flexible/flexible.js";

// style
import "@/common/css/reset.css"
import "@/common/css/globe.less"
import "@/common/css/common.less"
import '@/common/css/lottery.less';
import '@/common/font/font.less';

import Vue from 'vue'
import App from './App.vue'

import Vant from 'vant';
import {
	Lazyload
} from 'vant';
import 'vant/lib/index.css';


import store from "./store"
import router from "./router"

// 国际化
import i18n from "@/globe/i18n";

// 跨域
import axios from "axios";
import promiseHelper from "./mixins/promiseHelper";
import siteHelper from "./mixins/siteHelper";


// 复制
import VueClipboard from "vue-clipboard2"

// 兼容 IE
import "core-js/stable";
import "regenerator-runtime/runtime";

import VueScroller from 'vue-scroller'
import VueTouchScroll  from "vue-touch-scroll"

import EasyRefresh from "vue-easyrefresh";

import LottieVuePlayer from "@lottiefiles/vue-lottie-player";

Vue.component("ScrollView", () => import("./components/ScrollView"))

// 用户是否登陆判定页面跳转
import {
	getTokenFromCookie
} from "@/utils/auth"

router.beforeEach(function(to, from, next) {
	if (getTokenFromCookie()) {
		if (to.name === "login" || to.name === "register") {
			next("/app/dashboard");
		} else {
			next();
		}
	} else {
		if (to.meta.isVisit) {
			next();
		} else {
			next("/login")
		}
	}
});

// 禁用双指放大
document.documentElement.addEventListener(
    'touchstart',
    function(event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    },
    {
      passive: false
    }
  )

  // 禁用双击放大
  var lastTouchEnd = 0
  document.documentElement.addEventListener(
    'touchend',
    function(event) {
      var now = Date.now()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    {
      passive: false
    }
  )

  document.addEventListener("gesturestart", function (event) {
	event.preventDefault();
  });


  document.addEventListener("dblclick", function (event) {
	event.preventDefault();
  }); 

	// document.addEventListener(
	// 	"touchmove",
	// 	function(e) {
	// 		e.preventDefault()
	// 	}, {
	// 		passive: false
	// 	}
	// )

// rem 自动化适配
const docEl = document.documentElement;
function setBodyFontSize () {
	if (document.body) {
		document.body.style.fontSize = 12 + 'px'
	}
	else {
		document.addEventListener('DOMContentLoaded', setBodyFontSize)
	}
}
function setRemUnit() {
	let rem;
	if (window.orientation == 180 || window.orientation == 0) {
		rem = docEl.clientWidth / 10;
	}
	if (window.orientation == 90 || window.orientation == -90) {
		rem = docEl.clientHeight / 10;
	}
	setTimeout(() => {
		docEl.style.fontSize = rem + "px";
	},0)
}
document.addEventListener('DOMContentLoaded',function(){
	setBodyFontSize();
    setRemUnit();
});
window.addEventListener("resize", setRemUnit);

// 阻止浏览器菜单的出现
// document.oncontextmenu = function(e) {
// 	e.preventDefault();
// };

Vue.use(Lazyload);
Vue.use(Vant);
Vue.mixin(siteHelper);
Vue.mixin(promiseHelper);
Vue.use(VueScroller);
Vue.use(VueTouchScroll);
Vue.use(EasyRefresh);
Vue.use(VueClipboard);
Vue.use(LottieVuePlayer);

Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
	i18n,
	router,
	store,
	render: h => h(App),
}).$mount('#app')
