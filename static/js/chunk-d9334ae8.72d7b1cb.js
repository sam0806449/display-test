(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d9334ae8"],{1522:function(t,e,i){},ae7f:function(t,e,i){"use strict";i("1522")},e113:function(t,e,i){"use strict";i.r(e);i("99af"),i("4de4"),i("a434"),i("a9e3");var s=i("2909"),n={name:"Preferential",data:function(){return{activityGroups:[],groupActive:"",activityLists:[],activityStatusList:[],slider:10,pageIndex:1}},watch:{groupActive:function(t){this.pageIndex=1,"preferential"===this.topActive?(this.activityLists=[],this.onGetActivityList(t)):(this.activityStatusList=[],this.onGetActivityStatusList(t))},topActive:function(t){var e=this.groupActive;this.pageIndex=1,"preferential"===t?(this.activityLists=[],this.onGetActivityList(e)):(this.activityStatusList=[],this.onGetActivityStatusList(e))}},computed:{topActive:function(){return this.$store.getters.topActive},received:function(){return this.activityStatusList.filter((function(t){return 0===Number(t.status)||-1===Number(t.status)})).length},available:function(){return this.activityStatusList.filter((function(t){return 1===Number(t.status)})).length}},activated:function(){this.pageIndex=1,this.onGetActivityGroups()},methods:{onLoad:function(t){"preferential"===this.topActive?this.onGetActivityList(this.groupActive,t):this.onGetActivityStatusList(this.groupActive,t)},onGetActivityGroups:function(){var t=this;this.$get("/api/Activity/GetActivityGroups").then((function(e){return t.checkResp(e,(function(t){return!0===t.data.success}))})).then((function(e){var i=e.data;i.splice(0,0,{objId:"",groupName:t.$t("common.all")}),t.activityGroups=i,i.length>0&&(t.groupActive=i[0].objId),t.onRefresh()})).catch((function(e){t.procError(e)}))},onGetActivityList:function(t,e){var i=this;this.showProgress(),this.$get("/api/Activity/GetActivityList?groupId=".concat(t,"&pageSize=10&pageIndex=").concat(this.pageIndex)).then((function(t){return i.checkResp(t,(function(t){return!0===t.data.success}))})).then((function(t){var n,a=t.data;(i.pageIndex=i.pageIndex+1,i.refresh)?(i.activityLists=[],i.activityLists=a.items,e&&(i.refresh=!1,e())):a.items.length>0?((n=i.activityLists).push.apply(n,Object(s.a)(a.items)),e&&e(!1)):e&&e(!0);i.showProgress(!1)})).catch((function(t){e&&e(!0),i.showProgress(!1),i.procError(t)}))},onGetActivityStatusList:function(t,e){var i=this;this.showProgress(),this.$get("/api/Activity/GetActivityStatusList?groupId=".concat(t,"&pageSize=10&pageIndex=").concat(this.pageIndex)).then((function(t){return i.checkResp(t,(function(t){return!0===t.data.success}))})).then((function(t){var n,a=t.data;(i.pageIndex=i.pageIndex+1,i.refresh)?(i.activityStatusList=[],i.activityStatusList=a.items,e&&(i.refresh=!1,e())):a.items.length>0?((n=i.activityStatusList).push.apply(n,Object(s.a)(a.items)),e&&e(!1)):e&&e(!0);i.showProgress(!1)})).catch((function(t){e&&e(!0),i.showProgress(!1),i.procError(t)}))},onActivityReceive:function(t){var e=this;1!==t.giftType?this.$post("/api/Activity/ActivityReceive",{objId:t.objId,activityReceiveParams:null}).then((function(t){return e.checkResp(t,(function(t){return!0===t.data.success}))})).then((function(t){e.$toast(t.data)})).catch((function(t){e.procError(t)})):this.goDetails(t)},onRefresh:function(t){this.refresh=!0,this.pageIndex=1,this.onLoad(t)},onLoadMore:function(t){this.refresh=!1,this.onLoad(t)},goFinish:function(t){0===Number(t.status)?this.$router.push("dashboard"):1===Number(t.status)&&this.onActivityReceive(t)},getTypeText:function(t){var e=t.requirementType;return 0===e?this.$$t("requirementType_1"):1===e?this.$$t("requirementType_2"):2===e?this.$$t("requirementType_3"):this.$$t("requirementType_4")},getStatus:function(t){return 0===Number(t)?this.$$t("status_0"):1===Number(t)?this.$$t("status_1"):this.$$t("status_2")},getTime:function(t){return null===t.endTime?this.$$t("time"):this.formatDate(t.startTime)+"~"+this.formatDate(t.endTime)},goDetails:function(t){this.$router.push({path:"preferential/details",query:{details_id:t.objId}})},getSlider:function(t){return Number(t.completed)>=Number(t.requirement)?Number(t.requirement):Number(t.completed)<0?0:t.completed},$$t:function(t){return this.$t("preferential."+t)}}},a=(i("ae7f"),i("2877")),r=Object(a.a)(n,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"preferential"}},[i("van-tabs",{attrs:{animated:"",ellipsis:"",swipeable:"","title-active-color":"rgb(64, 128, 255)","title-inactive-color":"rgb(153, 153, 153)",color:"rgb(64, 128, 255)"},model:{value:t.groupActive,callback:function(e){t.groupActive=e},expression:"groupActive"}},[t._l(t.activityGroups,(function(t,e){return[i("van-tab",{key:e,attrs:{title:t.groupName,name:t.objId}})]}))],2),i("div",{staticClass:"lists"},[i("scroll-view",{attrs:{onRefresh:t.onRefresh,loadMore:t.onLoadMore}},["preferential"===t.topActive?i("div",{staticClass:"warp"},[t.activityLists.length>0?i("div",{staticClass:"pb-2"},t._l(t.activityLists,(function(e,s){return i("div",{key:s,staticClass:"background-white item",on:{click:function(i){return t.goDetails(e)}}},[i("van-image",{attrs:{src:t.$portrait(e.bannerImg),"lazy-load":"",fit:"fill",height:"125",width:"100%"},scopedSlots:t._u([{key:"loading",fn:function(){return[i("van-loading",{attrs:{type:"spinner",size:"22"}})]},proxy:!0}],null,!0)}),i("div",{staticClass:"promotions-title"},[i("h6",[t._v(t._s(e.title))]),i("div",[i("p",[i("span",[t._v(t._s(t.getTime(e)))])]),i("p",[i("span",[t._v(t._s(t.$$t("details")))]),i("van-icon",{attrs:{slot:"right-icon",name:"arrow",size:"16"},slot:"right-icon"})],1)]),t.isEndDate(e.startTime,e.endTime)?i("span",{staticClass:"over"}):t._e()])],1)})),0):i("van-empty",{staticClass:"text-center",attrs:{description:t.$t("common.noMore")},scopedSlots:t._u([{key:"image",fn:function(){return[i("van-image",{attrs:{src:"/images/empty/no-more.png",width:"280",height:"130"}})]},proxy:!0}],null,!1,2253742339)})],1):t._e(),"task"===t.topActive?i("div",{staticClass:"pa-4 tasks"},[i("div",{staticClass:"text-left body-2"},[t._v(t._s(t.$$t("received_1"))+"："),i("span",{staticClass:"main-text"},[t._v(t._s(t.received))]),t._v(t._s(t.$$t("received_2"))+"："),i("span",{staticClass:"main-text"},[t._v(t._s(t.available))])]),t.activityStatusList.length>0?i("div",[t._l(t.activityStatusList,(function(e,s){return[i("div",{key:s,staticClass:"radius-2 task background-white py-2 mt-3 text-left"},[i("div",{staticClass:"task_title caption white-text py-1"},[t._v(t._s(e.title))]),i("van-row",{attrs:{gutter:"25",type:"flex",justify:"space-between",align:"center"}},[i("van-col",{attrs:{span:"16"}},[i("div",{staticClass:"text-left pl-4 mt-1"},[i("div",{staticClass:"headline radius-1"},[t._v(t._s(e.completed)+"/"+t._s(e.requirement))]),i("van-slider",{staticClass:"mt-1 radius-3",attrs:{value:t.getSlider(e),"bar-height":"6px","active-color":"#518bff",disabled:"",min:"0",max:e.requirement},scopedSlots:t._u([{key:"button",fn:function(){return[i("div",{staticClass:"custom-button",staticStyle:{display:"none"}})]},proxy:!0}],null,!0)}),i("div",{staticClass:"caption text-grey mt-1"},[t._v(t._s(e.activityCalculationCycleDesc)+t._s(t.getTypeText(e))+"："+t._s(t.currencySymbol)+t._s(e.requirement)+t._s(t.currencyDenomination))]),i("div",{staticClass:"caption text-grey mt-1"},[t._v(t._s(t.$$t("reward"))+"："+t._s(e.gift)+t._s(t.currencyDenomination))])],1)]),i("van-col",{staticClass:"pr-3",attrs:{span:"8"}},[i("div",{staticClass:"btn px-5",on:{click:function(i){return t.goFinish(e)}}},[t._v(t._s(t.getStatus(e.status)))])])],1)],1)]}))],2):i("van-empty",{staticClass:"text-center",attrs:{description:t.$t("common.noMore")},scopedSlots:t._u([{key:"image",fn:function(){return[i("van-image",{attrs:{src:"/images/empty/no-more.png",width:"280",height:"130"}})]},proxy:!0}],null,!1,2253742339)})],1):t._e()])],1)],1)}),[],!1,null,"b7ec7fd6",null);e.default=r.exports}}]);