(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-147d48bc"],{"43d4":function(e,t,s){"use strict";s.r(t);var i={name:"QrCode",data:function(){return{payUrl:"https://www.liantu.com/images/2013/case/5.jpg",showPreview:!1,images:[]}},created:function(){var e=sessionStorage.getItem("payUrl");this.payUrl=e,this.images.push(e)},beforeRouteLeave:function(e,t,s){sessionStorage.removeItem("payUrl"),s()},beforeRouteEnter:function(e,t,s){JSON.parse(sessionStorage.getItem("payUrl"))?s():s("/dashboard")}},a=(s("49f9"),s("2877")),r=Object(a.a)(i,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"qrCode"}},[s("div",{staticClass:"qrCode-content"},[s("van-image",{attrs:{width:"180",height:"180",src:e.payUrl,"lazy-load":""},on:{click:function(t){e.showPreview=!0}}}),s("div",{staticClass:"press"},[e._v("点击预览图片保存")]),e._m(0),s("p",{staticClass:"problem"},[e._v(" 温馨提醒：如充值未及时到账请联系24小时在线客服。 ")])],1),s("van-image-preview",{attrs:{images:e.images},model:{value:e.showPreview,callback:function(t){e.showPreview=t},expression:"showPreview"}})],1)}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"qrCode-rules"},[t("div",{staticClass:"title"},[this._v("扫码步骤")]),t("div",{staticClass:"text"},[this._v(" 1.点击预览保存二维码图片到相册，同时在相册打开该图片 "),t("br"),this._v("2.点击更多，识别二维码 "),t("br"),this._v("3.如果已成功充值至账户，请返回网站 ")])])}],!1,null,"6920848c",null);t.default=r.exports},"49f9":function(e,t,s){"use strict";s("9669")},9669:function(e,t,s){}}]);