(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-61a66d8b"],{"0f14":function(t,e,a){"use strict";a("d851")},"8b8c":function(t,e,a){"use strict";a.r(e);a("99af"),a("7db0"),a("c975");var o={name:"AllGame",data:function(){return{categoryCode:"",gameCategorys:[],platforms:[]}},created:function(){this.getGameCategorys()},watch:{categoryCode:function(){this.getGamePlatform()}},methods:{getPlatformImg:function(t){return t.hasGameItems?"".concat(this.siteConfig.imgPath,"/common/img/slots/platform/").concat(t.imageName,"_").concat(this.categoryCode,".png"):this.getGameImg(t.platformCode,t.imageName)},goRouter:function(t){if("SGLottery"!==t.platformCode)"SGUcs"!==t.platformCode?t.hasGameItems?this.$router.push({path:"gameLists",query:{platformCode:t.platformCode,title:t.platformName,categoryCode:this.platformCodeActive}}):this.getGameLoginUrl(t.platformCode,t.gameCode):this.isLogin()&&this.redirectRouter("/app/ucs");else if(this.isLogin())if("SGLottery"!==t.gameCode){var e,a=JSON.parse(sessionStorage.getItem("gameCategorysLottery")).find((function(e){return e.type===t.gameCode})).bigType;sessionStorage.setItem("rules_code",a),sessionStorage.setItem("gameCode_item",t.gameCode),e=["PK10","K3"].indexOf(a)>-1?"PK10":"lottery",this.$router.push(e)}else this.redirectRouter("/app/lotteryLobby")},getGamePlatform:function(){var t=this;this.platforms=[],this.$get("/api/Game/GamePlatforms?categoryCode=".concat(this.categoryCode||"all","&source=1")).then((function(e){return t.checkResp(e,(function(t){return!0===t.data.success}))})).then((function(e){t.platforms=e.data})).catch((function(e){t.procError(e)}))},getGameCategorys:function(){var t=this;this.$get("/api/Game/GameCategorys").then((function(e){return t.checkResp(e,(function(t){return!0===t.data.success}))})).then((function(e){var a=e.data;t.gameCategorys=a,t.categoryCode||(t.categoryCode=t.gameCategorys[0].code),t.getGamePlatform()})).catch((function(e){t.procError(e)}))},$$t:function(t){return this.$t("collections."+t)}}},r=(a("0f14"),a("2877")),i=Object(r.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"collections"}},[a("van-tabs",{attrs:{animated:"",ellipsis:"",swipeable:"","title-active-color":"rgb(64, 128, 255)","title-inactive-color":"black",color:"rgb(64, 128, 255)"},model:{value:t.categoryCode,callback:function(e){t.categoryCode=e},expression:"categoryCode"}},[t._l(t.gameCategorys,(function(t,e){return[a("van-tab",{key:e,attrs:{title:t.name,name:t.code,"title-class":"tab_title"}})]}))],2),a("div",{staticClass:"games"},[a("scroller",[a("div",{staticStyle:{display:"flex","flex-wrap":"wrap",padding:"0.256rem"}},[t._l(t.platforms,(function(e,o){return[e.hasGameItems?a("div",{key:e.gameCode+o,style:"width: calc((100% - 0.256rem)/2); margin-right: "+(o%2==0?"0.256rem":0)+"; margin-bottom: 0.256rem; height: calc(((100vw - 0.768rem) * 8) /18);"},[a("van-image",{staticClass:"elevation-1",attrs:{"lazy-load":"",src:t.getPlatformImg(e),width:"100%",height:"100%"},nativeOn:{click:function(a){return a.stopPropagation(),t.goRouter(e)}},scopedSlots:t._u([{key:"loading",fn:function(){return[a("van-loading",{attrs:{type:"spinner",size:"20"}})]},proxy:!0}],null,!0)})],1):a("div",{key:e.imageName+o,staticStyle:{"margin-bottom":"0.256rem",width:"100%","min-height":"3.384rem",display:"flex","align-items":"center","justify-content":"center"}},["gw.png"===e.imageName&&"th-TH"===t.culture?a("van-image",{staticClass:"elevation-1",attrs:{src:"/images/dashboard/gw.png","lazy-load":""},nativeOn:{click:function(a){return a.stopPropagation(),t.goRouter(e)}}}):a("van-image",{staticClass:"elevation-1",staticStyle:{width:"100%",display:"block"},attrs:{src:t.getGameImg(e.platformCode,e.imageName),"lazy-load":""},nativeOn:{click:function(a){return a.stopPropagation(),t.goRouter(e)}},scopedSlots:t._u([{key:"loading",fn:function(){return[a("van-loading",{attrs:{type:"spinner",size:"20"}})]},proxy:!0}],null,!0)})],1)]}))],2)])],1)],1)}),[],!1,null,"335f80a2",null);e.default=i.exports},d851:function(t,e,a){}}]);