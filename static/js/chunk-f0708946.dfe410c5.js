(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-f0708946"],{"68bd":function(t,e,s){"use strict";s.r(e);s("99af"),s("a9e3");var a=s("6a57"),i={name:"TeamReport",data:function(){return{teamReport:{},dropdownTitle:"",date:1}},created:function(){this.dropdownTitle=this.$$t("today")},activated:function(){this.onLoad()},watch:{date:function(){this.onLoad()}},computed:{startDate:function(){return 60===this.date?this.getLastMonthFirst():30===this.date?this.getCurrentMonthFirst():7===this.date?Object(a.d)(Object(a.b)(new Date,7),"yyyy-MM-dd"):3===this.date?Object(a.d)(Object(a.b)(new Date,2),"yyyy-MM-dd"):2===this.date?Object(a.d)(Object(a.b)(new Date,1),"yyyy-MM-dd"):Object(a.d)(Object(a.b)(new Date,0),"yyyy-MM-dd")},endDate:function(){var t=Number(this.date);return 7===t||1===t||30===t?Object(a.d)(new Date,"yyyy-MM-dd"):60===t?this.getLastMonthLastDay():Object(a.d)(Object(a.b)(new Date,Number(t-1)),"yyyy-MM-dd")},dateOptions:function(){return[{text:this.$$t("lastMonth"),value:60},{text:this.$$t("nearlyAMonth"),value:30},{text:this.$$t("nearlySevenDays"),value:7},{text:this.$$t("nearlyTwoDays"),value:3},{text:this.$$t("yesterday"),value:2},{text:this.$$t("today"),value:1}]}},methods:{onLoad:function(){var t=this;this.showProgress(),this.$post("/api/Account/GetTeamReport?startDate=".concat(this.startDate,"&endDate=").concat(this.endDate)).then((function(e){return t.checkResp(e,(function(t){return!0===t.data.success}))})).then((function(e){t.teamReport=e.data,t.showProgress(!1)})).catch((function(e){t.showProgress(!1),t.procError(e)}))},typeClick:function(t){this.dropdownTitle=t.text,this.date=t.value,this.$refs.type.toggle()},goSubordinate:function(){sessionStorage.setItem("startDate",this.startDate),sessionStorage.setItem("endDate",this.endDate),this.redirectRouter("subordinate")},goFirstRecharge:function(){sessionStorage.setItem("startDate",this.startDate),sessionStorage.setItem("endDate",this.endDate),this.redirectRouter("firstRecharge")},$$t:function(t){return this.$t("teamReport."+t)}}},n=(s("84e6"),s("2877")),r=Object(n.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"teamReport"}},[s("div",{staticClass:"flex space-between align-items-center mt-3 px-4"},[s("van-dropdown-menu",{attrs:{"active-color":"rgb(70 132 255)"}},[s("van-dropdown-item",{ref:"type",attrs:{title:t.dropdownTitle}},[s("div",{staticClass:"dropdown-warp"},[s("div",{staticClass:"btns"},t._l(t.dateOptions,(function(e,a){return s("div",{key:a,staticClass:"btn",class:{active:t.date===e.value},on:{click:function(s){return t.typeClick(e)}}},[s("span",[t._v(t._s(e.text))])])})),0)])])],1),s("div",{staticClass:"text-grey body-2 van-ellipsis ml-2"},[t._v(t._s(t.$$t("titleDesc")))])],1),s("div",{staticClass:"team-warp"},[s("scroller",[s("div",{staticClass:"px-4 pb-3"},[s("div",{staticClass:"performance radius-2"},[s("div",{staticClass:"title"},[t._v(t._s(t.$$t("teamPerformance")))]),s("div",{staticClass:"center"},[s("div",[s("div",{staticClass:"number"},[t._v(t._s(t.currencySymbol)+t._s(t.teamReport.teamBalance)+t._s(t.currencyDenomination)+" ")]),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("teamBalance")))])]),s("div",[s("div",{staticClass:"number"},[t._v(" "+t._s(t.currencySymbol)+t._s(t.teamReport.teamDepositMoney)+t._s(t.currencyDenomination)+" ")]),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("teamDepositMoney")))])]),s("div",[s("div",{staticClass:"number"},[t._v(" "+t._s(t.currencySymbol)+t._s(t.teamReport.teamWithdrawMoney)+t._s(t.currencyDenomination)+" ")]),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("teamWithdrawMoney")))])]),s("div",[s("div",{staticClass:"number"},[t._v(" "+t._s(t.currencySymbol)+t._s(t.teamReport.teamDepositPormMoney)+t._s(t.currencyDenomination)+" ")]),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("teamDepositPormMoney")))])]),s("div",[s("div",{staticClass:"number"},[t._v(" "+t._s(t.currencySymbol)+t._s(t.teamReport.teamPormMoney)+t._s(t.currencyDenomination)+" ")]),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("teamPormMoney")))])]),s("div",[s("div",{staticClass:"number"},[t._v(t._s(t.currencySymbol)+t._s(t.teamReport.gameProfit)+t._s(t.currencyDenomination)+" ")]),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("gameProfit")))])])])]),s("div",{staticClass:"total radius-2"},[s("div",{staticClass:"title"},[t._v(t._s(t.$$t("teamNumber")))]),s("div",{staticClass:"center"},[s("div",{on:{click:t.goSubordinate}},[s("div",{staticClass:"number"},[s("span",[t._v(t._s(t.teamReport.allChildCount))]),s("van-icon",{attrs:{name:"images/member/proceed.png",size:"12"}})],1),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("allChildCount")))])]),s("div",[s("div",{staticClass:"number"},[t._v(t._s(t.teamReport.childCount))]),s("div",{staticClass:"text"},[t._v(t._s(t.$$t("childCount")))])]),s("div",[s("div",{staticClass:"number"},[t._v(t._s(t.teamReport.registerCount))]),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("registerCount")))])]),s("div",{on:{click:t.goFirstRecharge}},[s("div",{staticClass:"number"},[s("span",[t._v(t._s(t.teamReport.firstDepositCount))]),s("van-icon",{attrs:{name:"images/member/proceed.png",size:"12"}})],1),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("firstDepositCount")))])]),s("div",[s("div",{staticClass:"number"},[t._v(t._s(t.teamReport.gameMemberCount))]),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("gameMemberCount")))])]),s("div")])]),s("div",{staticClass:"offers mt-4 radius-2"},[s("div",{staticClass:"title"},[t._v(t._s(t.$$t("preferential")))]),s("div",{staticClass:"center"},[s("div",[s("div",{staticClass:"number"},[t._v(t._s(t.currencySymbol)+t._s(t.teamReport.rebateMoney)+t._s(t.currencyDenomination)+" ")]),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("rebateMoney")))])]),s("div",[s("div",{staticClass:"number"},[t._v(" "+t._s(t.currencySymbol)+t._s(t.teamReport.gameReturnMoney)+t._s(t.currencyDenomination)+" ")]),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("gameReturnMoney")))])]),t.skgCode===t.skgGameCode?s("div",[s("div",{staticClass:"number"},[t._v(" "+t._s(t.currencySymbol)+t._s(t.teamReport.gameReturnMoney)+t._s(t.currencyDenomination)+" ")]),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("gameReturnMoney_1")))])]):t._e(),t.skgCode===t.skgGameCode?s("div",[s("div",{staticClass:"number"},[t._v(" "+t._s(t.currencySymbol)+t._s(t.teamReport.gameRebateMoney)+t._s(t.currencyDenomination)+" ")]),s("div",{staticClass:"text van-ellipsis"},[t._v(t._s(t.$$t("gameRebateMoney")))])]):t._e()])])])])],1)])}),[],!1,null,"47bbdbca",null);e.default=r.exports},"84e6":function(t,e,s){"use strict";s("e082")},e082:function(t,e,s){}}]);