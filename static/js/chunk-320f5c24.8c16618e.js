(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-320f5c24"],{ab23:function(t,s,a){"use strict";a.r(s);a("d3b7"),a("ac1f"),a("3ca3"),a("466d"),a("1276"),a("5cc6"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),a("ddb0"),a("2b3d");var i={name:"InviteUser",data:function(){return{showShare:!1,intrs:null,intrImage:"images/invite/code.png",options:[{name:this.$$t("copyLink"),icon:"link",value:"copy"},{name:this.$$t("download"),icon:"qrcode",value:"qrcode"}]}},created:function(){this.onLoad()},computed:{bgStyle:function(){return{"background-image":"url(/images/invite/banner_".concat(this.culture,".png)"),"background-size":"100% 380px",height:"380px",position:"relative"}}},methods:{onLoad:function(){var t=this;this.$post("/api/MemberAgent/GetMemberIntr").then((function(s){return t.checkResp(s,(function(t){return!0===t.data.success}))})).then((function(s){var a=s.data;t.intrs=a,t.intrImage="data:image/png;base64,"+a.intrImage})).catch((function(s){t.procError(s)}))},onSelect:function(t){var s=this.intrs.intrClipboard;"copy"===t.value&&s?this.copyBtnClick(s):"qrcode"===t.value&&this.downQrCode(),this.showShare=!1},downQrCode:function(){this.downloadFileByBase64(this.intrImage,"code.png")},dataURLtoBlob:function(t){for(var s=t.split(","),a=s[0].match(/:(.*?);/)[1],i=atob(s[1]),e=i.length,n=new Uint8Array(e);e--;)n[e]=i.charCodeAt(e);return new Blob([n],{type:a})},downloadFileByBase64:function(t,s){var a=this.dataURLtoBlob(t),i=URL.createObjectURL(a);this.downloadFile(i,s)},downloadFile:function(t){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"What's the fuvk",a=document.createElement("a");a.setAttribute("href",t),a.setAttribute("download",s),a.setAttribute("target","_blank");var i=document.createEvent("MouseEvents");i.initEvent("click",!0,!0),a.dispatchEvent(i)},$$t:function(t){return this.$t("invite."+t)}}},e=(a("b9df"),a("2877")),n=Object(e.a)(i,(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"inviteUser"}},[t._m(0),a("scroller",[a("div",{staticClass:"warp pb-7"},[a("div",{staticClass:"top"},[a("div",{staticClass:"top-img",style:t.bgStyle},[a("div",{staticClass:"code text-grey"},[a("div",{staticClass:"caption mb-1 van-ellipsis"},[t._v(t._s(t.$$t("title")))]),a("van-image",{attrs:{src:"/images/invite/code.png",width:"76",height:"72"}}),a("div",{staticClass:"caption mt-1 van-ellipsis"},[t._v(t._s(t.$$t("scan")))])],1)]),a("div",{staticClass:"px-7"},[a("van-button",{attrs:{size:"small",hairline:"",block:"",color:"linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))"},on:{click:function(s){t.showShare=!0}}},[t._v(t._s(t.$$t("share"))+" ")]),a("div",{staticClass:"pt-3 pb-8"},[a("div",{staticClass:"link px-3"},[a("div",{staticClass:"text-grey van-ellipsis"},[t._v(t._s(t.intrs&&t.intrs.intrUrl))]),a("div",{staticClass:"main-text van-ellipsis",on:{click:function(s){return t.copyBtnClick(t.intrs&&t.intrs.intrUrl)}}},[t._v(t._s(t.$$t("copyLink")))])])])],1)]),a("div",{staticClass:"invite-center px-3 pt-3"},[a("div",{staticClass:"warp radius-2 px-9 pt-4"},[a("div",{staticClass:"title subtitle-4 main-text"},[t._v(t._s(t.$$t("award")))]),a("van-row",{staticClass:"pb-8",attrs:{type:"flex",justify:"space-between"}},[a("van-col",{staticClass:"mt-3",attrs:{span:"12"}},[a("div",{staticClass:"main-text subtitle-1",on:{click:function(s){return t.redirectRouter("subordinate")}}},[a("span",{staticClass:"mr-1"},[t._v(t._s(t.intrs&&t.intrs.childAmount)+" "+t._s(t.$$t("person")))]),a("van-icon",{attrs:{name:"images/member/proceed.png",size:"12"}})],1),a("div",{staticClass:"caption"},[t._v(t._s(t.$$t("register")))])]),a("van-col",{staticClass:"mt-3",attrs:{span:"12"}},[a("div",{staticClass:"main-text subtitle-1",on:{click:function(s){return t.redirectRouter("subordinate")}}},[a("span",{staticClass:"mr-1"},[t._v(t._s(t.intrs&&t.intrs.childAmount)+" "+t._s(t.$$t("person")))]),a("van-icon",{attrs:{name:"images/member/proceed.png",size:"12"}})],1),a("div",{staticClass:"caption"},[t._v(t._s(t.$$t("inviteSuccess")))])]),a("van-col",{staticClass:"mt-3",attrs:{span:"12"}},[a("div",{staticClass:"main-text subtitle-1"},[t._v(t._s(t.currencySymbol)+t._s(0===Number(t.intrs&&t.intrs.invitationBonusReceived)?t.intrs&&t.intrs.yesterdayRebate:t.intrs&&t.intrs.invitationBonusReceived)+t._s(t.currencyDenomination))]),a("div",{staticClass:"caption"},[t._v(t._s(t.$$t("winnings")))])]),a("van-col",{staticClass:"mt-3",attrs:{span:"12"}},[a("div",{staticClass:"main-text subtitle-1"},[t._v(t._s(t.currencySymbol)+t._s(t.intrs&&t.intrs.yesterdayRebate)+t._s(t.currencyDenomination))]),a("div",{staticClass:"caption"},[t._v(t._s(t.$$t("yesterdayRebate")))])])],1)],1)]),a("div",{staticClass:"invite-center px-3 pt-3"},[a("div",{staticClass:"warp radius-2 px-6 pt-4"},[a("div",{staticClass:"title subtitle-4 main-text"},[t._v(t._s(t.$$t("step")))]),a("van-row",{staticClass:"mt-5",attrs:{type:"flex",justify:"space-between",align:"center"}},[a("van-col",{staticClass:"mt-3",attrs:{span:"6"}},[a("van-image",{attrs:{src:"/images/invite/fx.png",width:"44",height:"44"}})],1),a("van-col",{staticClass:"mt-3",attrs:{span:"3"}},[a("van-image",{attrs:{src:"/images/invite/right-icon.png",width:"21",height:"28"}})],1),a("van-col",{staticClass:"mt-3",attrs:{span:"6"}},[a("van-image",{attrs:{src:"/images/invite/yq.png",width:"44",height:"44"}})],1),a("van-col",{staticClass:"mt-3",attrs:{span:"3"}},[a("van-image",{attrs:{src:"/images/invite/right-icon.png",width:"21",height:"28"}})],1),a("van-col",{staticClass:"mt-3",attrs:{span:"6"}},[a("van-image",{attrs:{src:"/images/invite/zc.png",width:"44",height:"44"}})],1)],1),a("van-row",{staticClass:"mt-1",attrs:{type:"flex",justify:"space-between"}},[a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"text ma-auto text-grey caption van-multi-ellipsis--l3"},[t._v(t._s(t.$$t("step_1")))])]),a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"text ma-auto  text-grey caption van-multi-ellipsis--l3"},[t._v(t._s(t.$$t("step_2")))])]),a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"text ma-auto text-grey caption van-multi-ellipsis--l3"},[t._v(t._s(t.$$t("step_3")))])])],1),a("van-row",{staticClass:"mt-3",attrs:{type:"flex",align:"center"}},[a("van-col",{staticClass:"mt-3",attrs:{span:"6"}},[a("van-image",{attrs:{src:"/images/invite/kf.png",width:"44",height:"44"}})],1),a("van-col",{staticClass:"mt-3",attrs:{span:"3"}},[a("van-image",{attrs:{src:"/images/invite/right-icon.png",width:"21",height:"28"}})],1),a("van-col",{staticClass:"mt-3",attrs:{span:"6"}},[a("van-image",{attrs:{src:"/images/invite/sj.png",width:"44",height:"44"}})],1),a("van-col",{staticClass:"mt-3",attrs:{span:"3"}}),a("van-col",{staticClass:"mt-3",attrs:{span:"6"}})],1),a("van-row",{staticClass:"pb-11 mt-1",attrs:{type:"flex",justify:"space-between"}},[a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"ma-auto text-grey caption van-multi-ellipsis--l3"},[t._v(t._s(t.$$t("step_4")))])]),a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"text ma-auto  text-grey caption van-multi-ellipsis--l3"},[t._v(t._s(t.$$t("step_5")))])]),a("van-col",{attrs:{span:"6"}})],1)],1)]),a("div",{staticClass:"invite-center px-3 pt-3"},[a("div",{staticClass:"warp radius-2 px-3 pt-4 pb-11"},[a("div",{staticClass:"title subtitle-4 main-text"},[t._v(t._s(t.$$t("proxy")))]),a("div",{staticClass:"flex mt-4"},[a("div",{staticClass:"subtitle-3 mr-6"},[a("div",{staticClass:"mt-4"},[t._v(t._s(t.$$t("proxy_0")))]),a("div",{staticClass:"mt-8"},[t._v(t._s(t.$$t("proxy_1")))]),a("div",{staticClass:"mt-8"},[t._v(t._s(t.$$t("proxy_2")))]),a("div",{staticClass:"mt-8"},[t._v(t._s(t.$$t("proxy_3")))])]),a("div",[a("van-image",{attrs:{src:"/images/invite/proxy.png",width:"6.667rem",height:"5.173rem"}})],1)])])])])]),a("van-share-sheet",{attrs:{options:t.options},on:{select:t.onSelect},model:{value:t.showShare,callback:function(s){t.showShare=s},expression:"showShare"}})],1)}),[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"view-background"},[s("div",{staticClass:"view-background-flex"},[s("div",{staticClass:"view-background-flex-top"}),s("div",{staticClass:"view-background-flex-bottom"})])])}],!1,null,"6d658c7e",null);s.default=n.exports},b12c:function(t,s,a){},b9df:function(t,s,a){"use strict";a("b12c")}}]);