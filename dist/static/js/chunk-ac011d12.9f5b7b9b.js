(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-ac011d12"],{"022c":function(t,e,n){"use strict";n("e4be")},"63c0":function(t,e,n){"use strict";n("99af");e.a={computed:{},methods:{getRecentResults:function(t,e){var n=this;return this.$get("/api/Lottery/GetRecentResults?type=".concat(t,"&num=").concat(e)).then((function(t){return n.checkResp(t,(function(t){return!0===t.data.success})),t.data.data})).catch((function(t){n.procError(t)}))},getCurrentDatesData:function(t){var e=this;return this.$get("/api/Lottery/GetCurrentDates?type="+t).then((function(t){if(e.checkResp(t,(function(t){return!0===t.data.success})),0!==t.data.data.secondsRemaining)return t.data.data;setTimeout((function(){e.getCurrentDatesData()}),1e3)})).catch((function(t){e.procError(t)}))},getCalcResult:function(t){var e=this;return this.$get("api/Lottery/GetlmclResult?lotteryType=".concat(t)).then((function(t){return e.checkResp(t,(function(t){return!0===t.data.success})),t.data.data})).catch((function(t){e.procError(t)}))}}}},bc4d:function(t,e,n){"use strict";n.r(e);n("99af"),n("7db0"),n("4160"),n("d81d"),n("b0c0"),n("a9e3"),n("ac1f"),n("1276"),n("159b");var a=n("2909"),r=n("5530"),s=(n("96cf"),n("1da1")),i={name:"LotteryTrend",mixins:[n("63c0").a],data:function(){return{bigType:"SSC",loading:!1,menu:!1,lottery:"",datesNum:"20",lotteries:[],recentResultsList:[],trendUpdateKey:0,isShowGraph:!0,isShowNum:!0,trendLotteryList:[],activeTrend:"all",activeTrendLottery:"",active_tabIndex:0,curDates:0,timer_getRecentResults:null,timer_getCurrentDatesData:null}},mounted:function(){this.init()},beforeDestroy:function(){this.custom_clearTimeout()},computed:{tabs:function(){return[this.$$t("_139"),this.$$t("_140"),this.$$t("_141"),this.$$t("_142"),this.$$t("_143")]},settingData:function(){return[{name:this.$$t("_612"),key:"20"},{name:this.$$t("_613"),key:"30"},{name:this.$$t("_614"),key:"50"}]},currentTitle:function(){var t=this,e=this.lotteries.find((function(e){return e.type===t.lottery}));return e&&e.name||""},currentRangeTitle:function(){var t=this,e=this.settingData.find((function(e){return e.key===t.datesNum}));return e&&e.name||""}},watch:{recentResultsList:function(){this.trendUpdateKey+=1,this.showGraph()},active_tabIndex:function(){this.trendUpdateKey+=1,this.showGraph()}},methods:{init:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.loading=!0,t.lottery=sessionStorage.getItem("gameCode_item"),t.lotteries.length){e.next=5;break}return e.next=5,t.getLotteryitems();case 5:return e.next=7,t.getRecentResults(t.lottery,t.datesNum).then((function(e){0!==t.trendUpdateKey&&Number(e[0].dates)!==t.curDates?t.timer_getRecentResults=setTimeout((function(){t.init()}),3e3):(t.maker(e),t.loading=!1,t.showGraph(),t.handleLotteryRefresh())}));case 7:case"end":return e.stop()}}),e)})))()},handleLotteryRefresh:function(){var t=this;this.getCurrentDatesData(this.lottery).then((function(e){var n=e.secondsRemaining;t.timer_getCurrentDatesData=setTimeout((function(){t.getCurrentDatesData(t.lottery).then((function(e){var n=e.lastNo;t.curDates=Number(n),t.init()}))}),1e3*Number(n)+1e4)}))},getLotteryitems:function(){var t=this,e=JSON.parse(sessionStorage.getItem("gameCategoryLotteryGroup"));this.lotteries=e.find((function(e){return e.type===t.bigType})).lotteries},selectLottery:function(t){this.custom_clearTimeout(),sessionStorage.setItem("gameCode_item",t.type),this.init(),this.menu=!1},selectRange:function(t){this.custom_clearTimeout(),this.datesNum=t,this.init(),this.menu=!1},custom_clearTimeout:function(){clearTimeout(this.timer_getRecentResults),clearTimeout(this.timer_getCurrentDatesData),this.timer_getRecentResults=null,this.timer_getCurrentDatesData=null,this.trendUpdateKey=0},maker:function(t){for(var e=[],n=[],s=[],i=[],c=[],o=[],u=[],l=0;l<5;l+=1){e.push([]),s.push([]),i.push([]),c.push([]),o.push([]);for(var d=0;d<10;d+=1)e[l].push(0),s[l].push(0),i[l].push(0),c[l].push(0),o[l].push(0)}for(var h=0;h<t.length;h+=1){u.push([]);for(var f=0;f<5;f+=1){u[h].push([]);for(var m=0;m<10;m+=1)u[h][f].push(0)}}var p=t.map((function(t,a){var l=t.num.split(",");return 0===a&&(n=l),l.forEach((function(t,r){e[r][t]+=1,t===n[r]?(i[r][t]+=1,i[r][t]>s[r][t]&&(s[r][t]=i[r][t])):(s[r][t]=s[r][t]>1?s[r][t]:1,i[r][t]=1),o[r].forEach((function(e,n){+t!==n?(o[r][n]+=1,o[r][n]>c[r][n]&&(c[r][n]=o[r][n])):o[r][n]=0})),u[a][r].forEach((function(e,n){+t!==n?0!==a&&-1!==u[a-1][r][n]?u[a][r][n]=u[a-1][r][n]+1:u[a][r][n]=1:u[a][r][n]=-1}))})),n=l,Object(r.a)(Object(r.a)({},t),{},{calcMaxMissNum:u[a]})}));this.recentResultsList=[].concat(Object(a.a)(p),[{dates:this.$$t("_621"),key:"show",showTotal:e},{dates:this.$$t("_622"),key:"average",showTotal:e},{dates:this.$$t("_623"),key:"max",showTotal:[].concat(c)},{dates:this.$$t("_624"),key:"link",showTotal:[].concat(s)}])},showGraph:function(){var t=this;this.isShowGraph?this.$nextTick((function(){for(var e=t.$refs["trend-num-1"],n=0;n<e.length-1;n+=1)e[n].innerHTML=t.drawLine(e[n],e[n+1],e[n].textContent,1)})):this.trendUpdateKey+=1},drawLine:function(t,e,n,a){var r=document.getElementById("trend-table"),s=Number(t.getBoundingClientRect().top)-Number(r.getBoundingClientRect().top)+t.getBoundingClientRect().height/2,i=Number(t.getBoundingClientRect().left)-Number(r.getBoundingClientRect().left)+t.getBoundingClientRect().width/2,c=Number(e.getBoundingClientRect().top)-Number(r.getBoundingClientRect().top)+e.getBoundingClientRect().height/2,o=Number(e.getBoundingClientRect().left)-Number(r.getBoundingClientRect().left)+e.getBoundingClientRect().width/2,u=o-i,l=c-s,d=Math.sqrt(u*u+l*l),h=360*Math.atan2(l,u)/(2*Math.PI),f=(o+i)/2-5,m=(c+s)/2-0,p=h<=-90?360+h:h,g="";switch(a){case 1:g="#ac2330";break;case 2:g="#207fab";break;case 3:g="#ff6e0e";break;case 4:g="#8a0f9c";break;case 5:g="#0f9c33"}return'<div class="trend-active trend-active-'.concat(a,'">').concat(n,"</div><div style='position:absolute; background: ").concat(g,"; height:1px; z-index: 1; top:").concat(m,"px;left:").concat(f-d/2,"px;width:").concat(d,"px;transform:rotate(").concat(p,"deg);'></div>")},$$t:function(t,e){return this.$t("pk10."+t,e)}}},c=(n("c69b"),n("022c"),n("2877")),o=Object(c.a)(i,(function(){var t=this,e=this,n=e.$createElement,a=e._self._c||n;return a("div",{attrs:{id:"lotteryTrend"}},[a("van-nav-bar",{staticClass:"navbar",attrs:{"left-arrow":"",border:""},on:{"click-left":function(){return t.$router.back()}},scopedSlots:e._u([{key:"title",fn:function(){return[a("div",{staticClass:"white-text",on:{click:function(){return e.menu=!e.menu}}},[a("span",{staticClass:"mr-1"},[e._v(e._s(e.currentTitle)+"-"+e._s(e.currentRangeTitle))]),a("van-icon",{attrs:{name:e.menu?"arrow-up":"arrow-down",size:"14",color:"white"}})],1)]},proxy:!0}])}),a("van-popup",{staticClass:"menu",style:{height:"100%"},attrs:{position:"top","get-container":"#lotteryTrend",overlay:!1},model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[a("div",{staticClass:"lotteries flex flex-wrap"},e._l(e.lotteries,(function(t,n){return a("div",{key:n,staticClass:"lottery-item",class:{"lottery-item-active":e.lottery===t.type},attrs:{span:"8"},on:{click:function(n){return e.selectLottery(t)}}},[e._v(" "+e._s(t.name)+" ")])})),0),a("van-divider"),a("div",{staticClass:"setting lotteries flex flex-wrap"},e._l(e.settingData,(function(t,n){return a("div",{key:n,staticClass:"lottery-item",class:{"lottery-item-active":e.datesNum===t.key},attrs:{span:"8"},on:{click:function(n){return e.selectRange(t.key)}}},[e._v(" "+e._s(t.name)+" ")])})),0)],1),a("van-tabs",{attrs:{color:"rgb(64, 128, 255)","title-active-color":"#4080ff"},model:{value:e.active_tabIndex,callback:function(t){e.active_tabIndex=t},expression:"active_tabIndex"}},e._l(e.tabs,(function(t,n){return a("van-tab",{key:n,attrs:{title:t,disabled:e.loading}})})),1),a("table",[a("tr",{staticClass:"deep-bg-color"},[a("td",[e._v(e._s(e.$t("lottery.datesNumber")))]),e._l(10,(function(t){return a("td",{key:t},[e._v(e._s(t-1))])}))],2)]),a("div",{staticClass:"table-box"},[a("table",{key:e.trendUpdateKey,attrs:{id:"trend-table"}},e._l(e.recentResultsList,(function(t,n){return a("tr",{key:n,class:[{"deep-bg-color":n%2!=0,"showTotal-bg-color":n>e.recentResultsList.length-5}]},[t.dates?a("td",[e._v(e._s(t.dates))]):e._e(),t.calcMaxMissNum&&t.calcMaxMissNum[e.active_tabIndex]?e._l(t.calcMaxMissNum[e.active_tabIndex],(function(n,r){return a("td",{key:r},[-1!==n?a("span",[e._v(e._s(n))]):a("span",{ref:"trend-num-1",refInFor:!0,attrs:{id:t.dates}},[a("div",{staticClass:"trend-active trend-active-1"},[e._v(e._s(r))])])])})):e._e(),t.showTotal&&t.showTotal[e.active_tabIndex]?e._l(t.showTotal[e.active_tabIndex],(function(n,r){return a("td",{key:r},["show"===t.key?a("span",[e._v(e._s(n))]):"average"===t.key?a("span",[e._v(" "+e._s(n>0?((e.datesNum-n)/n).toFixed(0):0)+" ")]):(t.key,a("span",[e._v(e._s(n))]))])})):e._e()],2)})),0)]),e.loading?a("van-loading",{staticClass:"loading",attrs:{type:"spinner",size:"22"}}):e._e()],1)}),[],!1,null,"7ec72621",null);e.default=o.exports},bd3e:function(t,e,n){},c69b:function(t,e,n){"use strict";n("bd3e")},e4be:function(t,e,n){}}]);