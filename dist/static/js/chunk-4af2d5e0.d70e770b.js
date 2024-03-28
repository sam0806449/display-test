(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4af2d5e0"],{"0d0a":function(t,e,s){"use strict";s("6a7a")},"167a":function(t,e,s){},"605f":function(t,e,s){"use strict";s("167a")},"6a7a":function(t,e,s){},"92d0":function(t,e,s){"use strict";s("96ab")},"96ab":function(t,e,s){},a7e3:function(t,e,s){"use strict";s.r(e);s("99af");var n=s("2909"),i={name:"Bulletin",props:{items:{type:Array,default:function(){return[]}}},methods:{goDetails:function(t){sessionStorage.setItem("bulletin-data",JSON.stringify(t)),this.$router.push("messages/bulletinDetails")},$$t:function(t){return this.$t("messages."+t)}}},a=(s("0d0a"),s("2877")),o=Object(a.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"bulletin"}},[t.items.length>0?s("div",{staticClass:"bulletin-warp"},t._l(t.items,(function(e,n){return s("div",{key:n,staticClass:"center",on:{click:function(s){return t.goDetails(e)}}},[s("div",{staticClass:"header px-4 caption"},[s("div",[s("van-icon",{attrs:{name:"images/messages/messages.png",size:"24",color:"#fdf0cc"}}),s("span",{staticClass:"body-2 van-ellipsis"},[t._v(t._s(e.title))])],1)]),s("div",{staticClass:"text"},[s("div",{domProps:{innerHTML:t._s(e.summary)}})]),s("van-divider"),s("van-cell",{attrs:{title:e.time,"is-link":"",center:"",value:t.$$t("view"),"title-class":"cell-title","value-class":"cell-value"}},[s("van-icon",{attrs:{slot:"icon",name:"images/messages/date.png",size:"16"},slot:"icon"})],1)],1)})),0):s("van-empty",{staticClass:"text-center",attrs:{description:t.$$t("noMore")},scopedSlots:t._u([{key:"image",fn:function(){return[s("van-image",{attrs:{src:"/images/empty/message.png",width:"280",height:"130"}})]},proxy:!0}])})],1)}),[],!1,null,"7dc63286",null).exports,r=(s("c740"),s("a434"),{name:"Station",props:{items:{type:Array,default:function(){return[]}}},methods:{onDeleteMessage:function(t){var e=this;this.isLogin()&&(this.showProgress(),this.$post("/api/Account/DeleteMessage?id="+t).then((function(t){return e.checkResp(t,(function(t){return!0===t.data.success}))})).then((function(){e.items.splice(e.items.findIndex((function(e){return e.id===t})),1),e.showProgress(!1),e.$success(e.$$t("success"))})).catch((function(t){e.showProgress(!1),e.procError(t)})))},onReadMessage:function(t){var e=this;1!==t.status&&this.$post("/api/Account/ReadMessage?id="+t.id).then((function(t){return e.checkResp(t,(function(t){return!0===t.data.success}))})).then((function(){})).catch((function(t){e.procError(t)}))},goDetails:function(t){this.isLogin()&&(sessionStorage.setItem("station-data",JSON.stringify(t)),this.onReadMessage(t),this.$router.push("messages/stationDetails"))},$$t:function(t){return this.$t("messages."+t)}}}),c=(s("605f"),{name:"Messages",components:{Bulletin:o,Station:Object(a.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"bulletin"}},[t.items.length>0?s("div",{staticClass:"bulletin-warp"},t._l(t.items,(function(e,n){return s("div",{key:n,staticClass:"center",on:{click:function(s){return t.goDetails(e)}}},[s("div",{staticClass:"text van-ellipsis"},[0===e.status?s("van-icon",{attrs:{dot:""}}):t._e(),s("div",{domProps:{innerHTML:t._s(e.summary)}})],1),s("van-divider"),s("van-cell",{attrs:{title:e.time,center:"","title-class":"cell-title",icon:"delete"}},[s("van-icon",{attrs:{slot:"icon",name:"images/messages/date.png",size:"16"},slot:"icon"}),s("van-icon",{staticStyle:{"line-height":"inherit"},attrs:{slot:"right-icon",name:"delete",color:"#e02020",size:"16"},on:{click:function(s){return s.stopPropagation(),t.onDeleteMessage(e.id)}},slot:"right-icon"})],1)],1)})),0):s("van-empty",{staticClass:"text-center",attrs:{description:t.$$t("noMore")},scopedSlots:t._u([{key:"image",fn:function(){return[s("van-image",{attrs:{src:"/images/empty/message.png",width:"280",height:"130"}})]},proxy:!0}])})],1)}),[],!1,null,"388e3fe7",null).exports},created:function(){this.onLoad()},watch:{type:function(){this.items=[],this.pageIndex=1,this.onLoad()}},data:function(){return{type:1,items:[],pageIndex:1,refresh:!1}},methods:{onLoad:function(t){var e=this;this.$post("/api/Account/GetMessageRecord?type=".concat(this.type,"&pageSize=10&pageIndex=").concat(this.pageIndex)).then((function(t){return e.checkResp(t,(function(t){return!0===t.data.success}))})).then((function(s){var i,a=s.data;(e.pageIndex=e.pageIndex+1,e.refresh)?(e.items=[],e.items=a.items,t&&(e.refresh=!1,t())):a.items.length>0?((i=e.items).push.apply(i,Object(n.a)(a.items)),t&&t(!1)):t&&t(!0)})).catch((function(t){e.procError(t)}))},onRefresh:function(t){this.refresh=!0,this.pageIndex=1,this.onLoad(t)},$$t:function(t){return this.$t("messages."+t)}}}),l=(s("92d0"),Object(a.a)(c,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"messages"}},[s("van-tabs",{attrs:{border:!1,color:"rgb(77, 140, 252)"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},[s("van-tab",{attrs:{title:t.$$t("bulletins")}},[s("scroll-view",{attrs:{onRefresh:t.onRefresh,loadMore:t.onLoad}},[s("bulletin",{attrs:{items:t.items}})],1)],1),s("van-tab",{attrs:{title:t.$$t("stations")}},[s("scroll-view",{attrs:{onRefresh:t.onRefresh,loadMore:t.onLoad}},[s("station",{attrs:{items:t.items}})],1)],1)],1)],1)}),[],!1,null,"32f6263b",null));e.default=l.exports}}]);