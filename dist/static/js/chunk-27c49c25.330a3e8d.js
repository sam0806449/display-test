(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-27c49c25"],{"6ca9":function(e,t,s){"use strict";s.r(t);s("b0c0");var a=s("2909"),o={name:"GameLists",data:function(){return{tab:"",categoryCode:null,platformCode:null,games:[],title:"",refresh:!1,pageIndex:1}},computed:{tabs:function(){return[{text:this.$$t("all"),code:""},{text:this.$$t("hot"),code:"hot"},{text:this.$$t("new"),code:"new"},{text:this.$$t("favor"),code:"favor"}]}},watch:{tab:function(){this.$refs.game_lists.goTop(),this.pageIndex=1,this.onRefresh(null,this.categoryCode,this.platformCode)}},activated:function(){this.tab="",this.title=this.$route.query.title,this.platformCode=this.$route.query.platformCode,this.categoryCode=this.$route.query.categoryCode,this.onRefresh(null,this.categoryCode,this.platformCode)},methods:{onLoad:function(e,t,s){var o=this;this.$sessionSet("games-search",{categoryCode:t,platformCode:s,platformName:this.title}),this.showProgress(),this.$post("/api/Game/Games",{categoryCode:t,platformCode:s,pageIndex:this.pageIndex,pageSize:20,tag:this.tab,source:1}).then((function(e){return o.checkResp(e,(function(e){return!0===e.data.success}))})).then((function(t){var s,i=t.data;(o.pageIndex=o.pageIndex+1,o.refresh)?(o.items=[],o.games=i.items,e&&(o.refresh=!1,e())):i.items.length>0?((s=o.games).push.apply(s,Object(a.a)(i.items)),e&&e(!1)):e&&e(!0);o.showProgress(!1)})).catch((function(e){o.showProgress(!1),o.procError(e)}))},onLoadMore:function(e){this.refresh=!1,this.onLoad(e,this.categoryCode,this.platformCode)},onRefresh:function(e){this.refresh=!0,this.pageIndex=1,this.onLoad(e,this.categoryCode,this.platformCode)},changeFavorite:function(e){var t=this,s="",a=e.isFavorites;this.isLogin()&&(s=a?"/api/Game/RemoveGameFavorites":"/api/Game/AddGameFavorites",this.showProgress(),this.$get(s+"?platformCode="+e.platformCode+"&gameCode="+e.gameCode).then((function(e){return t.checkResp(e,(function(e){return!0===e.data.success}))})).then((function(){a?t.$success(t.$$t("delSuccess")):t.$success(t.$$t("success")),t.onRefresh(),t.showProgress(!1)})).catch((function(e){t.showProgress(!1),t.procError(e)})))},$$t:function(e){return this.$t("gameLists."+e)}},beforeRouteLeave:function(e,t,s){"dashboard"===e.name&&sessionStorage.removeItem("games-search"),s()}},i=(s("cb69"),s("2877")),r=Object(i.a)(o,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"gameLists"}},[s("van-tabs",{attrs:{animated:"",ellipsis:"",swipeable:"","title-active-color":"rgb(64, 128, 255)","title-inactive-color":"black",color:"rgb(64, 128, 255)"},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[e._l(e.tabs,(function(e,t){return[s("van-tab",{key:t,attrs:{title:e.text,name:e.code,"title-class":"tab_title"}})]}))],2),s("div",{staticClass:"games"},[s("scroll-view",{ref:"game_lists",attrs:{onRefresh:e.onRefresh,loadMore:e.onLoadMore}},[s("div",{staticClass:"warp"},[e.games.length>0?s("div",[s("van-row",{attrs:{gutter:15,justify:"space-between"}},e._l(e.games,(function(t,a){return s("van-col",{key:a,attrs:{span:"12"}},[s("div",{staticClass:"top",on:{click:function(s){return e.getGameLoginUrl(t.platformCode,t.gameCode)}}},[s("van-image",{attrs:{height:"164","lazy-load":"",src:e.getGameImg(t.platformCode,t.imageName,t.categoryCode)},scopedSlots:e._u([{key:"loading",fn:function(){return[s("van-loading",{attrs:{type:"spinner",size:"24"}})]},proxy:!0}],null,!0)})],1),s("div",{staticClass:"bottom"},[s("span",{staticClass:"van-ellipsis"},[e._v(e._s(t.gameName))]),s("van-icon",{attrs:{name:"/images/games/"+(t.isFavorites?"favorite-active":"favorite")+".png",size:"18"},on:{click:function(s){return e.changeFavorite(t)}}})],1)])})),1)],1):s("van-empty",{staticClass:"text-center",attrs:{description:e.$t("common.noMore")},scopedSlots:e._u([{key:"image",fn:function(){return[s("van-image",{attrs:{src:"/images/empty/no-more.png",width:"280",height:"130"}})]},proxy:!0}])})],1)])],1)],1)}),[],!1,null,"ff74e726",null);t.default=r.exports},cb69:function(e,t,s){"use strict";s("e8d4")},e8d4:function(e,t,s){}}]);