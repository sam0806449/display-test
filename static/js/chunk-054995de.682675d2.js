(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-054995de"],{"6a3f":function(t,e,s){"use strict";s.r(e);s("7db0"),s("c975"),s("d81d"),s("a434"),s("b0c0"),s("a9e3");var o={name:"LotteryLobby",data:function(){return{active:0,items:[],lotteries:[],loading:!1}},created:function(){this.onGetGroup()},methods:{onGetGroup:function(){var t=this;this.loading||(this.showProgress(),this.loading=!0,this.$get("/api/Lottery/GetGroup").then((function(e){return t.checkResp(e,(function(t){return!0===t.data.success}))})).then((function(e){var s=e.data;t.items=s.map((function(t){return{text:t.name,lotteries:t.lotteries,type:t.type}})),t.skgCode===t.skyLotteryCode&&t.items.splice(0,0,{text:t.$t("dashboard.hot")+t.$t("lottery.title"),lotteries:t.$sessionGet("gamePlatformsLottery"),type:"hot"}),t.active=Number(sessionStorage.getItem("group_code_index"))||0,t.lotteries=t.items[t.active].lotteries,t.changeNav(t.active),t.showProgress(!1),t.loading=!1})).catch((function(e){t.showProgress(!1),t.procError(e),t.loading=!1})))},changeNav:function(t){var e=Number(sessionStorage.getItem("group_code_index"));this.loading||t===e||(this.active=t,sessionStorage.setItem("group_code_index",t),sessionStorage.setItem("rules_code",this.items[t].type),this.onGetGroup())},goLottery:function(t){var e;if(this.skgCode===this.skyLotteryCode&&0===this.active){var s=JSON.parse(sessionStorage.getItem("gameCategorysLottery")).find((function(e){return e.type===t.type&&"hot"!==e.bigType})).bigType;sessionStorage.setItem("rules_code",s)}else{var o=JSON.parse(sessionStorage.getItem("gameCategorysLottery")).find((function(e){return e.type===t.type&&"hot"!==e.bigType})).bigType;sessionStorage.setItem("rules_code",o),e=o}if(["PK10","K3","SSC","VNSouth","Mark6"].indexOf(e)>-1)return sessionStorage.removeItem("current_lottery"),sessionStorage.removeItem("second_title"),sessionStorage.setItem("gameCode_item",t.type),void("SSC"===e?this.$router.push("ssc"):"VNSouth"===e?this.$router.push("vnsouth"):"Mark6"===e?this.$router.push("mark6"):this.$router.push("PK10"));sessionStorage.setItem("gameCode_item",t.type),this.$router.push("lottery")}},beforeRouteLeave:function(t,e,s){"dashboard"===t.name&&(sessionStorage.removeItem("group_code_index"),sessionStorage.removeItem("rules_code")),s()}},i=(s("ad69"),s("2877")),n=Object(i.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"background-white",attrs:{id:"lotteryLobby"}},[s("div",{staticClass:"pt-1"},[s("div",{staticClass:"btn-box"},[s("vue-touch-scroll",{staticClass:"flex",attrs:{type:"horizontal","hide-scrollbar":""}},t._l(t.items,(function(e,o){return s("div",{key:o,staticClass:"btn",class:[{"btn-active":t.active===o},{"btn-disabled":t.loading&&t.active!==o}],on:{click:function(e){return t.changeNav(o)}}},[t._v(" "+t._s(e.text)+" ")])})),0)],1),s("div",{staticClass:"lobby-box"},[s("scroller",[s("van-row",{attrs:{type:"flex"}},[t._l(t.lotteries,(function(e,o){return[s("van-col",{key:o,staticClass:"game-item",attrs:{span:"8"},on:{click:function(s){return t.goLottery(e)}}},[s("van-image",{attrs:{src:t.getLotteryImage(e.icon),width:"1.6rem",height:"1.6rem"},scopedSlots:t._u([{key:"loading",fn:function(){return[s("van-loading",{attrs:{type:"spinner",size:"22"}})]},proxy:!0}],null,!0)}),s("div",{staticClass:"body-2 mt-1"},[t._v(t._s(e.name))]),-1===e.type.indexOf("js")?s("van-count-down",{attrs:{time:1e3*Number(e.lotteryTime.secondsRemaining)},on:{finish:function(e){return t.$_throttle(t.onGetGroup)}},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.days,i=e.hours,n=e.minutes,r=e.seconds;return[o||i?[s("span",{staticClass:"block"},[t._v(" "+t._s(0==+o&&+i<10?"0"+i:i+24*o)+" ")]),s("span",{staticClass:"colon"},[t._v(":")])]:t._e(),s("span",{staticClass:"block"},[+n<10?s("span",[t._v("0")]):t._e(),t._v(t._s(n)+" ")]),s("span",{staticClass:"colon"},[t._v(":")]),s("span",{staticClass:"block"},[+r<10?s("span",[t._v("0")]):t._e(),t._v(t._s(r)+" ")])]}}],null,!0)}):t._e()],1)]}))],2),s("div",{staticStyle:{width:"100%",height:"20vh"}})],1)],1)])])}),[],!1,null,"4cd76674",null);e.default=n.exports},"953c":function(t,e,s){},ad69:function(t,e,s){"use strict";s("953c")}}]);