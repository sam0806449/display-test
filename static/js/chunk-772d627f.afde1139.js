(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-772d627f"],{"28a6":function(t,e,s){"use strict";s.r(e);s("fb6a"),s("a9e3");var r={name:"ExchangeMoney",mixins:[s("c28f").a],data:function(){return{transfer:{toMemberAccount:null,transferMoney:null,memberRemark:null,payPassword:""},showPopup:!1,showPwdKeyboard:!1}},watch:{"transfer.payPassword":function(t){this.transfer.payPassword=t.slice(0,4)}},methods:{confirmClick:function(){Number(this.transfer.transferMoney)<1?this.$info(this.$$t("info_1")):this.transfer.toMemberAccount&&this.transfer.memberRemark?(this.showPopup=!0,this.showPwdKeyboard=!0):this.$info(this.$$t("info_2"))},onTransferByMember:function(){var t=this;this.showProgress(),this.$post("/api/Account/TransferByMember",this.transfer).then((function(e){return t.checkResp(e,(function(t){return!0===t.data.success}))})).then((function(e){t.showProgress(!1),t.$info(e.data),t.onClear(),t.initMemberData()})).catch((function(e){t.showProgress(!1),t.procError(e)}))},submitTransfer:function(){if(this.transfer.payPassword.length<4)this.$toast(this.$t("withdraw.pwdToast"));else{var t=this.memberData&&this.memberData.memberType;2!==Number(t)?this.onTransferByMember():this.$error(this.$$t("pwdError"))}},onClear:function(){this.showPopup=!1,this.showPwdKeyboard=!1,this.transfer.toMemberAccount=null,this.transfer.transferMoney=null,this.transfer.memberRemark=null,this.transfer.payPassword=""},hidePayPassword:function(){this.showPopup=!1,this.showPwdKeyboard=!1,this.transfer.payPassword=""},$$t:function(t){return this.$t("exchangeMoney."+t)}}},a=(s("a85c"),s("2877")),n=Object(a.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"background-white",attrs:{id:"exchangeMoney"}},[s("div",{staticClass:"pt-9"},[s("div",{staticClass:"subtitle-3 px-4 mb-1"},[t._v(t._s(t.$$t("toMemberAccount")))]),s("van-field",{staticClass:"mb-1",attrs:{placeholder:""+t.$t("register.pLeft")+t.$$t("toMemberAccount")},model:{value:t.transfer.toMemberAccount,callback:function(e){t.$set(t.transfer,"toMemberAccount",e)},expression:"transfer.toMemberAccount"}}),s("div",{staticClass:"subtitle-3 px-4 mb-1 mt-4"},[t._v(t._s(t.$$t("transferMoney")))]),s("van-field",{attrs:{type:"digit",placeholder:""+t.$t("register.pLeft")+t.$$t("transferMoney")},model:{value:t.transfer.transferMoney,callback:function(e){t.$set(t.transfer,"transferMoney",e)},expression:"transfer.transferMoney"}}),s("div",{staticClass:"subtitle-3 px-4 mb-1 mt-4"},[t._v(t._s(t.$$t("remark")))]),s("van-field",{attrs:{rows:"2",type:"textarea",maxlength:"10","show-word-limit":"",placeholder:""+t.$t("register.pLeft")+t.$$t("remark")},model:{value:t.transfer.memberRemark,callback:function(e){t.$set(t.transfer,"memberRemark",e)},expression:"transfer.memberRemark"}})],1),s("div",{staticClass:"btn mt-10"},[s("van-button",{staticClass:"radius-2",attrs:{color:"linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))",block:""},on:{click:t.confirmClick}},[t._v(" "+t._s(t.$$t("btn"))+" ")])],1),s("van-popup",{staticClass:"drawPass",attrs:{"close-on-click-overlay":!1,closeable:""},on:{close:t.hidePayPassword},model:{value:t.showPopup,callback:function(e){t.showPopup=e},expression:"showPopup"}},[s("div",{staticClass:"subtitle-1 text-center py-4"},[t._v(t._s(t.$$t("popTitle")))]),s("div",{staticClass:" pt-3 pb-6"},[s("van-password-input",{attrs:{value:t.transfer.payPassword,length:4,gutter:8,focused:t.showPopup},on:{focus:function(e){t.showPwdKeyboard=!0}}})],1)]),s("van-number-keyboard",{attrs:{show:t.showPwdKeyboard,"z-index":"3006",theme:"custom","close-button-text":t.$t("common.complete"),"hide-on-click-outside":!1},on:{blur:function(e){t.showPwdKeyboard=!1},close:t.submitTransfer},model:{value:t.transfer.payPassword,callback:function(e){t.$set(t.transfer,"payPassword",e)},expression:"transfer.payPassword"}})],1)}),[],!1,null,"502896b7",null);e.default=n.exports},a85c:function(t,e,s){"use strict";s("c900")},c900:function(t,e,s){}}]);