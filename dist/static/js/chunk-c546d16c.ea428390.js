(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-c546d16c"],{"8a75":function(t,e,a){"use strict";a("e319")},e319:function(t,e,a){},f1ad:function(t,e,a){"use strict";a.r(e);var i={name:"RechargeNotesDetails",data:function(){return{item:{},isShowBtn:!1}},activated:function(){this.item=this.$sessionGet("Note-Data")},methods:{getRecordType:function(t){return 1===t?this.$$t("recharge"):2===t?this.$$t("withdraw"):3===t?this.$$t("transfer"):4===t?this.$$t("rakeback"):15===t?this.$$t("deduction"):void 0},cancelWithdraw:function(t){var e=this;this.$dialog.confirm({title:this.$t("common.point"),message:this.$$t("cancelDesc")}).then((function(){e.$post("/api/Withdraw/CancelWithdraw?orderId="+t).then((function(t){return e.checkResp(t,(function(t){return!0===t.data.success}))})).then((function(t){e.$router.push("rechargeNotes"),e.$toast(t.data)})).catch((function(t){e.procError(t)}))})).catch((function(){}))},$$t:function(t){return this.$t("rechargeNotesDetails."+t)}},beforeRouteLeave:function(t,e,a){sessionStorage.removeItem("Note-Data"),a()}},n=(a("8a75"),a("2877")),c=Object(n.a)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"details"}},[a("div",{staticClass:"title"},[t._v(t._s(t.item.currencySymbol)+t._s(t.item.moneyY)+t._s(t.currencyDenomination))]),0===Number(t.item.status)?a("div",{staticClass:"mb-3"},[a("div",{staticClass:"desc",staticStyle:{"margin-bottom":"14px"}},[t._v(t._s(t.$$t("status_0")))]),2===t.item.recordType?a("div",{staticClass:"btn"},[a("span",{on:{click:function(e){return t.cancelWithdraw(t.item.orderId)}}},[t._v(t._s(t.$$t("cancel")))])]):t._e()]):1===Number(t.item.status)?a("div",{staticClass:"status-1 desc mb-3"},[t._v(t._s(t.$$t("status_1")))]):2===Number(t.item.status)?a("div",{staticClass:"status-1 desc mb-3"},[t._v(t._s(t.$$t("status_2")))]):a("div",{staticClass:"status-1 desc mb-3"},[t._v(t._s(t.$$t("status_3")))]),a("div",{staticClass:"center text-left"},[a("van-cell",{attrs:{title:t.$$t("type"),value:t.getRecordType(t.item.recordType)}}),t.item&&t.item.orderId?a("van-cell",{attrs:{title:t.$$t("orderId"),value:t.item.orderId}},[a("van-icon",{staticClass:"van-icon-copy",attrs:{slot:"right-icon",name:"images/common/copy.png",size:"20"},on:{click:function(e){return t.copyBtnClick(t.item.orderId)}},slot:"right-icon"})],1):t._e(),a("van-cell",{attrs:{title:t.$$t("createTime"),value:t.item.orderTime}}),a("van-cell",{attrs:{title:t.$$t("money"),value:""+t.item.currencySymbol+t.item.moneyY+t.currencyDenomination}}),a("van-cell",{attrs:{title:t.$$t("otherMoney"),value:""+t.item.currencySymbol+t.item.otherMoneyY+t.currencyDenomination}}),t.item.beforeBalanceY?a("van-cell",{attrs:{title:t.$$t("beforeBalance"),value:""+t.item.currencySymbol+t.item.beforeBalanceY+t.currencyDenomination}}):t._e(),t.item.afterBalanceY?a("van-cell",{attrs:{title:t.$$t("afterBalance"),value:""+t.item.currencySymbol+t.item.afterBalanceY+t.currencyDenomination}}):t._e(),a("van-cell",{attrs:{title:t.$$t("remark"),value:t.item.remark||"——"}})],1)])}),[],!1,null,"32340b47",null);e.default=c.exports}}]);