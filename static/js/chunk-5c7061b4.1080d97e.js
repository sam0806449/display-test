(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5c7061b4"],{4324:function(t,e,a){"use strict";a.r(e);a("99af"),a("7db0"),a("a434"),a("a9e3"),a("d3b7"),a("ac1f"),a("25f0"),a("1276");var s={name:"GameBetDetails",data:function(){return{item:null,sportDetail:null,activeNames:["1"],zodiacList:[]}},computed:{getImg:function(){var t=this.item,e=t.platformCode,a=t.gameImageName;return this.siteConfig&&this.siteConfig.imgPath+"/common/img/slots/"+e+"/"+a}},activated:function(){this.getZodiacData(),this.item=this.$sessionGet("game-item"),this.sportDetail=this.item.sportDetail},methods:{transYxx:function(t){return{1:"Deer",2:"Gourd",3:"Chicken",4:"Fish",5:"Crab",6:"Shrimp"}[t]},isNumber:function(t){return t=Number(t),"NaN"!=parseFloat(t).toString()},getArry:function(t){return t?t.split(","):[]},getRpsBankerLists:function(t){var e=t.betContent.split("_"),a=[];return a.push("Banker_"+e[0]),a.push("Player_"+e[1]),"Rps_Banker_Player"===t.playType?a:t.betContent.split(",")},getRps:function(t){if(t){for(var e=t.split(","),a=[],s=["Scissors","Stone","Cloth"],i=["Banker","Player"],l=0;l<e.length;l++)a.push(i[l]+"_"+s[Number(e[l])-1]);var r=Number(e[0])-Number(e[1]),n="";return n=-2===r||1===r?"Banker":-1===r||2===r?"Player":"Tie",a.splice(0,0,n),a}return null},getLeague:function(){return this.sportDetail.sportDetailItem[0].league},getType:function(){return this.sportDetail.sportDetailItem[0].betType},getBetTeam:function(){return this.sportDetail.sportDetailItem[0].betTeam},getBetTeamText:function(){var t=this.sportDetail.sportDetailItem;return"".concat(t.length+this.$$t("type_d")+"1",",").concat(this.$$t("hk_odds"),"@").concat(this.sportDetail.odds)},getOdds:function(){return this.sportDetail.sportDetailItem[0].odds},getScore:function(){var t=this.sportDetail.sportDetailItem;return"".concat(t[0].homeTeamName," VS ").concat(t[0].awayTeamName,"<br/>").concat(t[0].homeScore,":").concat(t[0].awayScore)},$$t:function(t){return this.$t("gameBetDetails."+t)},getVNSouthResult:function(t){try{var e=t.split("+");return[{awards:this.$t("pk10._400"),result:e[0]},{awards:this.$t("pk10._401"),result:e[1]},{awards:this.$t("pk10._402"),result:e[2]},{awards:this.$t("pk10._403"),result:e[3].replaceAll("|","-")},{awards:this.$t("pk10._404"),result:e[4].replaceAll("|","-")},{awards:this.$t("pk10._405"),result:e[5]},{awards:this.$t("pk10._406"),result:e[6].replaceAll("|","-")},{awards:this.$t("pk10._407"),result:e[7]},{awards:this.$t("pk10._408"),result:e[8]}]}catch(t){return[]}},getZodiacData:function(){var t=this;this.$get("/api/Lottery/GetZodiac").then((function(e){return t.checkResp(e,(function(t){return!0===t.data.success}))})).then((function(e){t.zodiacList=e.data})).catch((function(e){t.procError(e)}))},getMark6Color:function(t){switch(+t){case 1:case 2:case 7:case 8:case 12:case 13:case 18:case 19:case 23:case 24:case 29:case 30:case 34:case 35:case 40:case 45:case 46:return"red";case 3:case 4:case 9:case 10:case 14:case 15:case 20:case 25:case 26:case 31:case 36:case 37:case 41:case 42:case 47:case 48:return"blue";case 5:case 6:case 11:case 16:case 17:case 21:case 22:case 27:case 28:case 32:case 33:case 38:case 39:case 43:case 44:case 49:return"green";default:return""}},getCurZodiac:function(t){try{var e;return(null===(e=this.zodiacList.find((function(e){return e.zodiac===t})))||void 0===e?void 0:e.zodiacName)||"null"}catch(t){return"null"}}},beforeRouteLeave:function(t,e,a){sessionStorage.removeItem("game-item"),a()}},i=(a("6301"),a("2877")),l=Object(i.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.item?a("div",{staticClass:"text-left",attrs:{id:"details"}},[a("scroller",[a("div",{staticClass:"details-t"},[a("van-image",{staticClass:"ml-4 mr-3",attrs:{src:t.getImg,width:"40","lazy-load":""},scopedSlots:t._u([{key:"loading",fn:function(){return[a("van-loading",{attrs:{type:"spinner",size:"20"}})]},proxy:!0}],null,!1,2352118052)}),a("div",{staticClass:"flex flex-d-column"},[a("p",[t._v(t._s(t.item&&t.item.gameName))]),a("div",{staticClass:"caption text-grey"},[t._v(t._s(t.datesMaker(t.item&&t.item.gameNo)))])])],1),a("div",{staticClass:"details-content"},[t.sportDetail?a("div",[t.sportDetail&&t.sportDetail.sportDetailItem.length>1?a("div",[a("van-collapse",{model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},[a("van-collapse-item",{attrs:{title:t.$$t("betTeam"),name:"1"},scopedSlots:t._u([{key:"value",fn:function(){return[t._v(" "+t._s(t.getBetTeamText())+" ")]},proxy:!0}],null,!1,3176339679)},t._l(t.sportDetail&&t.sportDetail.sportDetailItem,(function(e,s){return a("div",{key:s},[a("div",[t._v(t._s(t.$$t("league"))+"："+t._s(e.league))]),a("div",[t._v(t._s(e.homeTeamName)+" VS "+t._s(e.awayTeamName))]),a("div",[t._v(t._s(t.$$t("score"))+"："+t._s(e.homeScore)+" : "+t._s(e.awayScore))]),a("div",[t._v(t._s(t.$$t("betTeam"))+"："+t._s(e.betTeam))]),a("div",[t._v(t._s(t.$$t("hk_odds"))+"："+t._s(e.odds))]),t.sportDetail&&t.sportDetail.sportDetailItem.length-1>s?a("van-divider",{staticClass:"my-3"}):t._e()],1)})),0)],1)],1):a("div",[a("van-cell",{attrs:{title:t.$$t("league"),value:t.getLeague()}}),a("van-cell",{attrs:{title:t.$$t("score")},scopedSlots:t._u([{key:"default",fn:function(){return[a("div",{staticClass:"text-center",domProps:{innerHTML:t._s(t.getScore())}})]},proxy:!0}],null,!1,1643618166)}),a("van-cell",{attrs:{title:t.$$t("type"),value:t.getType()}}),a("van-cell",{attrs:{title:t.$$t("betTeam"),"value-class":"betTeam"},scopedSlots:t._u([{key:"default",fn:function(){return[a("div",{domProps:{innerHTML:t._s(t.getBetTeam())}})]},proxy:!0}],null,!1,1948750315)}),a("van-cell",{attrs:{title:t.$$t("hk_odds"),value:t.getOdds()}}),a("van-cell",{attrs:{title:t.$$t("status"),value:t.item.statusDesc}})],1)]):a("div",[a("van-cell",{attrs:{title:t.$$t("gameName"),value:t.item&&t.item.gameName}}),a("van-cell",{attrs:{title:t.$$t("platformName"),value:t.item&&t.item.platformName,border:!(!t.item||!t.item.playType)}}),t.item&&t.item.playType&&"pm"!==t.item.platformCode?a("van-cell",{attrs:{title:t.$t("betDetails.betContent"),border:!1}},[["ffPK10","sfPK10","wfPK10","jsPK10","azxy10","xyft"].includes(t.item&&t.item.gameCode)?a("div",{staticClass:"text-left"},[t._v(" "+t._s(t.item&&t.item.playType)+" ")]):a("div",[t._v(" "+t._s(t.item&&t.item.playType)+" ")])]):t._e(),a("van-divider",{staticClass:"ma-0 px-4"})],1),a("van-cell",{attrs:{title:t.$$t("orderId"),value:t.item&&t.item.orderId,"value-class":"van-ellipsis"}},[a("van-icon",{staticClass:"ml-2",attrs:{slot:"right-icon",name:"/images/gamebet/copy.png",size:"20"},on:{click:function(e){return t.copyBtnClick(t.item&&t.item.orderId)}},slot:"right-icon"})],1),a("van-cell",{attrs:{title:t.$$t("orderTime"),value:t.item&&t.item.orderTime}}),a("van-cell",{attrs:{title:t.$$t("betMoneyY"),value:""+(t.item&&t.item.currencySymbol)+(t.item&&t.item.betMoneyY)+t.currencyDenomination}}),a("van-cell",{attrs:{title:t.$$t("realBetMoneyY"),value:""+(t.item&&t.item.currencySymbol)+(t.item&&t.item.realBetMoneyY)+t.currencyDenomination}}),t.item&&t.item.gameResult?a("van-cell",{class:t.item.tableCode,attrs:{title:t.$t("lottery.result_text")}},[a("div",{staticClass:"text-center",staticStyle:{display:"flex","justify-content":"end"},attrs:{slot:"default"},slot:"default"},["Lucky3"===t.item.tableCode?a("div",{staticClass:"flex"},[t.isNumber(t.item.gameResult)?a("div",{staticClass:"betContent white-text "},[t._v(t._s(t.item.gameResult))]):a("van-image",{attrs:{src:"/images/lottery/"+t.item.gameResult+".png",width:"28",height:"24"}})],1):"Rps"===t.item.tableCode?a("div",{staticClass:"flex align-items-center"},[t._l(t.getRps(t.item.gameResult),(function(t,e){return[a("van-image",{key:e,staticClass:"mr-1",attrs:{src:"/images/lottery/rps/"+t+".png",width:"24",height:"24"}})]}))],2):"SeDie"===t.item.tableCode?a("div",{staticClass:"flex align-items-center"},[t._l(t.item&&t.item.gameResult&&t.item.gameResult.split(","),(function(t,e){return[a("van-image",{key:e,staticClass:"mr-2",attrs:{src:"/images/lottery/guess/"+t+".png",width:"24",height:"24"}})]}))],2):"SicBo"===t.item.tableCode||"K3"===t.item.tableCode?a("div",{staticClass:"flex align-items-center"},[t._l(t.getArry(t.item&&t.item.gameResult),(function(t,e){return[a("van-image",{key:e,staticClass:"mr-2",attrs:{src:"/images/lottery/sicBo/"+t+".png",width:"24",height:"24"}})]}))],2):"PK10"===t.item.tableCode?a("div",{staticClass:"text-left",staticStyle:{width:"75%"}},[t._l(t.getArry(t.item&&t.item.gameResult),(function(e,s){return[a("div",{key:s,class:"b-pk10-"+e},[t._v(t._s(e))])]}))],2):"SSC"===t.item.tableCode?a("div",{staticClass:"text-left flex",staticStyle:{width:"75%"}},[t._l(t.getArry(t.item&&t.item.gameResult),(function(e,s){return[a("div",{key:s,staticClass:"ssc-num-box"},[t._v(t._s(e))])]}))],2):"Yxx"===t.item.tableCode?a("div",{staticClass:"text-left flex",staticStyle:{width:"75%"}},[t._l(t.getArry(t.item&&t.item.gameResult),(function(e,s){return[a("van-image",{key:s,staticClass:"mr-1",attrs:{src:"/images/lottery/"+t.transYxx(e)+".png",width:"28",height:"24"}})]}))],2):"VNSouth"===t.item.tableCode?a("div",{staticClass:"text-left flex",staticStyle:{width:"100%"}},[a("div",{staticClass:"vnsouth-current-wrap"},t._l(t.getVNSouthResult(t.item&&t.item.gameResult),(function(e,s){return a("div",{key:"result-"+s,staticClass:"flex",style:s<2?"font-weight: 900":"font-weight: 400"},[a("div",{staticClass:"flex align-items-center justify-content-center vnsouth-current-name"},[t._v(" "+t._s(e.awards)+" ")]),a("div",{staticClass:"vnsouth-current-result"},[t._v(" "+t._s(e.result)+" ")])])})),0)]):"Mark6"===t.item.tableCode?a("div",{staticClass:"flex align-items-center",staticStyle:{width:"100%","justify-content":"end"}},t._l(t.getArry(t.item&&t.item.gameResult),(function(e,s){return a("div",{key:s,staticStyle:{display:"flex"}},[6===s?a("div",{class:["mark6-num-small"],staticStyle:{"font-size":"18px","line-height":"24px","align-items":"flex-start"}},[t._v("+")]):t._e(),a("div",{class:["mr-1"],staticStyle:{display:"flex","flex-direction":"column"}},[a("div",{class:["mark6-num-small"],style:"background-image: url(/images/lottery/"+t.getMark6Color(e)+"_.png);"},[t._v(t._s(e))]),a("div",{staticStyle:{color:"#444","font-size":"12px","font-weight":"bold","text-align":"center"}},[t._v(t._s(t.getCurZodiac(t.item.gameResultSx&&t.item.gameResultSx.split(",")[s])))])])])})),0):a("div",["SGLottery"===t.item.platformCode?a("div",[t._l(t.getArry(t.item&&t.item.gameResult),(function(t,e){return[a("van-image",{key:e,staticClass:"mr-1",attrs:{src:"/images/lottery/"+t+".png",width:"28",height:"24"}})]}))],2):a("div",[t._v(t._s(t.item.gameResult))])])])]):t._e(),a("van-cell",{attrs:{title:t.$$t("winMoneyY"),"value-class":"red-text subtitle-3",value:""+(t.item&&t.item.currencySymbol)+(t.item&&t.item.winMoneyY)+t.currencyDenomination}}),a("van-cell",{attrs:{title:t.$$t("returnMoneyY"),value:""+(t.item&&t.item.currencySymbol)+(t.item&&t.item.returnMoneyY)+t.currencyDenomination}}),a("van-cell",{attrs:{title:t.$$t("profitMoneyY"),value:""+(t.item&&t.item.currencySymbol)+(t.item&&t.item.profitMoneyY)+t.currencyDenomination}})],1)])],1):t._e()}),[],!1,null,null,null);e.default=l.exports},6301:function(t,e,a){"use strict";a("9357")},9357:function(t,e,a){}}]);