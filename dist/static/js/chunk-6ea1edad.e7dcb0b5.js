(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6ea1edad"],{"925f":function(t,e,s){"use strict";s("b4e5")},b4e5:function(t,e,s){},d5ad:function(t,e,s){"use strict";s.r(e);s("4de4"),s("4160"),s("d81d"),s("a434"),s("a9e3"),s("159b");var i=s("229e"),a=s("2cd8");i.a.use(a.a);var r={name:"PrivilegesDetails",data:function(){return{type:0,items:[],setItem:{},tableTh:[],tableData:[],ratesTh:[],birthdayBonus:0,bs:null}},computed:{warpStyle:function(){return this.skgCode===this.skgGameCode&&"SGDP"!==this.siteConfig.codeKey?{top:"56px"}:{top:"0"}}},mounted:function(){this.init()},activated:function(){this.skgCode!==this.skgUcsCode&&"SGDP"!==this.siteConfig.codeKey||(this.type=1),this.onGetVipLevel(),this.onGetVipSetting()},beforeDestroy:function(){this.bs.destroy()},methods:{onGetVipLevel:function(){var t=this;this.$post("/api/VipLevel/GetVipLevel").then((function(e){return t.checkResp(e,(function(t){return!0===t.data.success}))})).then((function(e){var s=e.data;t.items=s.vipLevelRebateRates;var i=s.vipLevelRebateRates.filter((function(e){return e.level===(Number(t.$sessionGet("vipLevel_data"))||t.memberInfo&&t.memberInfo.vipLevel)}));t.birthdayBonus=i&&i[0].birthdayBonus;var a=s.vipLevelRebateRates[0].vipLevelRebateRates.map((function(t){return{platformCode:t.platformCode,platformName:t.platformName}}));a.splice(0,0,{platformCode:"lv",platformName:t.$$t("level")}),t.ratesTh=a,t.tableData=[],s.vipLevelRebateRates.forEach((function(e){var s={};e.vipLevelRebateRates.forEach((function(t){s.lv="VIP"+e.level,s[t.platformCode]=t.rate+"%"})),t.tableData.push(s)}))})).catch((function(e){t.procError(e)}))},onGetVipSetting:function(){var t=this;this.$post("/api/VipLevel/GetVipSetting").then((function(e){return t.checkResp(e,(function(t){return!0===t.data.success}))})).then((function(e){t.setItem=e.data})).catch((function(e){t.procError(e)}))},init:function(){this.bs=new i.a(this.$refs.scroll,{observeDOM:!0,scrollX:!0,scrollY:!1,eventPassthrough:"vertical"})},$$t:function(t,e){return this.$t("privilegesDetails."+t,e)}}},l=(s("925f"),s("2877")),n=Object(l.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"privilegesDetails"}},[t.skgCode===t.skgGameCode&&"SGDP"!==t.siteConfig.codeKey?s("van-tabs",{staticClass:"mt-3",attrs:{border:!1,"title-active-color":"rgb(89, 126, 247)",color:"rgb(77, 140, 252)"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},[s("van-tab",{attrs:{title:t.$$t("tab_1")}}),s("van-tab",{attrs:{title:t.$$t("tab_2")}})],1):t._e(),s("div",{staticClass:"warp",style:t.warpStyle},[s("div",{staticClass:"warp-center"},[s("scroller",[s("div",{staticClass:"title text-center flex align-items-center justify-content-center"},[s("van-image",{attrs:{src:"/images/vip/details/vip.png",width:"20"}}),s("span",{staticClass:"subtitle-1 ml-1"},[t._v(t._s(0===t.type?t.$$t("tab_1"):t.$$t("tab_2")))])],1),s("div",{directives:[{name:"show",rawName:"v-show",value:0===t.type,expression:"type===0"}],ref:"scroll",staticClass:"scroll-wrapper"},[s("div",{staticClass:"scroll-content"},[s("table",{staticClass:"table caption"},[s("tr",{staticClass:"caption"},[t._l(t.ratesTh,(function(e,i){return[s("th",{key:i},[t._v(t._s(e.platformName))])]}))],2),t._l(t.tableData,(function(e,i){return s("tr",{key:i},[t._l(t.ratesTh,(function(i,a){return[s("td",{key:a},[t._v(t._s(e[i.platformCode]))])]}))],2)}))],2)])]),s("table",{directives:[{name:"show",rawName:"v-show",value:1===t.type,expression:"type===1"}],staticClass:"table caption"},[s("tr",{staticClass:"caption"},[s("th",[t._v(t._s(t.$$t("level")))]),s("th",[t._v(t._s(t.$$t("dayWithdrawalNumMax")))]),s("th",[t._v(t._s(t.$$t("dayWithdrawalMax")))])]),t._l(t.items,(function(e,i){return[s("tr",{key:i},[s("td",[t._v("VIP"+t._s(e.level))]),s("td",[t._v(t._s(e.withdrawalTimesLimit))]),s("td",[t._v(t._s(t.currencySymbol)+t._s(e.dayWithdrawalMax)+t._s(t.currencyDenomination))])])]}))],2),s("div",{staticClass:"px-4 py-3 background-white"},[t.skgCode===t.skgGameCode&&"SGDP"!==t.siteConfig.codeKey?s("div",{staticClass:"main-text text-left",on:{click:function(e){return t.redirectRouter("/app/rebates/rules")}}},[t._v(" "+t._s(t.$$t("details"))+" ")]):t._e(),s("div",{staticClass:"gift pt-4 pb-5 mt-4"},[s("div",{staticClass:"text_color"},[t._v(t._s(t.$$t("birthdayBonus"))+"："),s("span",{staticClass:"main-text"},[t._v(t._s(t.birthdayBonus))])]),t.memberInfo&&t.memberInfo.birthday?s("div",{staticClass:"caption text-grey mt-2"},[t._v(" "+t._s(t.$$t("birthday_info"))+" ")]):s("div",{staticClass:"info mt-2"},[s("div",{staticClass:"text-grey"},[t._v(t._s(t.$$t("set_info")))]),s("div",{staticClass:"btn main-text",on:{click:function(e){return t.redirectRouter("/app/member/info")}}},[t._v(t._s(t.$$t("set"))+" ")])])]),s("div",{staticClass:"subtitle-5 main-text mt-6"},[t._v(t._s(t.$$t("rules")))]),s("van-divider"),s("div",{staticClass:"text-left"},[s("div",{staticClass:"subtitle-3 flex"},[s("div",{staticClass:"support-circle mr-3"},[s("span",{staticClass:"support-num"},[t._v("1")])]),t._v(" "+t._s(t.$$t("support_1_title"))+" ")]),s("div",{staticClass:"pl-6 mt-1 text-grey"},[t._v(t._s(t.$$t("support_1_1")))])]),t.setItem.openRelegation?s("div",[s("div",{staticClass:"text-left mt-6"},[s("div",{staticClass:"subtitle-3 flex"},[s("div",{staticClass:"support-circle mr-3"},[s("span",{staticClass:"support-num"},[t._v("2")])]),t._v(" "+t._s(t.$$t("support_2_title"))+" ")]),s("div",{staticClass:"pl-6 mt-1 text-grey"},[t._v(" "+t._s(t.$$t("support_2_1",{day:t.setItem.relegationPeriod}))+" ")])]),s("div",{staticClass:"text-left mt-6"},[s("div",{staticClass:"subtitle-3 flex"},[s("div",{staticClass:"support-circle mr-3"},[s("span",{staticClass:"support-num"},[t._v("3")])]),t._v(" "+t._s(t.$$t("support_3_title"))+" ")]),s("div",{staticClass:"pl-6 mt-1 text-grey"},[t._v(" "+t._s(t.$$t("support_3_1",{dayDesc:t.setItem.relegationPeriodDesc,day:t.setItem.relegationPeriod}))+" ")])])]):t._e(),s("div",{staticClass:"text-left mt-6"},[s("div",{staticClass:"subtitle-3 flex"},[s("div",{staticClass:"support-circle mr-3"},[s("span",{staticClass:"support-num"},[t._v("4")])]),t._v(" "+t._s(t.$$t("support_4_title"))+" ")]),s("div",{staticClass:"pl-6 mt-1 text-grey"},[t._v(" "+t._s(t.$$t("support_4_1"))+" ")])]),s("div",{staticClass:"text-left mt-6"},[s("div",{staticClass:"subtitle-3 flex"},[s("div",{staticClass:"support-circle mr-3"},[s("span",{staticClass:"support-num"},[t._v("5")])]),t._v(" "+t._s(t.$$t("support_5_title"))+" ")]),s("div",{staticClass:"pl-6 mt-1 text-grey"},[t._v(" "+t._s(t.$$t("support_5_1"))+" ")])]),s("div",{staticClass:"text-left mt-6"},[s("div",{staticClass:"subtitle-3 flex"},[s("div",{staticClass:"support-circle mr-3"},[s("span",{staticClass:"support-num"},[t._v("6")])]),t._v(" "+t._s(t.$$t("support_6_title"))+" ")]),s("div",{staticClass:"pl-6 mt-1 text-grey"},[t._v(" "+t._s(t.$$t("support_6_1",{siteTitle:t.siteConfig&&t.siteConfig.siteTitle}))+" ")])])],1)])],1)])],1)}),[],!1,null,"17d1683c",null);e.default=n.exports}}]);