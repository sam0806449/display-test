(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6fadc019"],{"2cbc":function(t,e,s){"use strict";s("8e95")},4836:function(t,e,s){"use strict";s.r(e);var i=s("2909"),n={name:"FinancialNotes",data:function(){return{categorys:[{text:this.$t("common.all"),value:""},{text:this.$$t("category1"),value:1},{text:this.$$t("category2"),value:2},{text:this.$$t("category3"),value:3}],dropdownTitle:"",items:[],refresh:!1,recordType:1,pageIndex:1}},activated:function(){this.dropdownTitle=this.$t("common.all"),this.onRefresh()},methods:{onLoad:function(t){var e=this;this.showProgress(),this.$post("/api/Financial/GetMemberFinMoneyRecords",{recordType:this.recordType,pageIndex:this.pageIndex,pageSize:10}).then((function(t){return e.checkResp(t,(function(t){return!0===t.data.success}))})).then((function(s){var n,a=s.data;(e.pageIndex=e.pageIndex+1,e.refresh)?(e.items=[],e.items=a.items,t&&(e.refresh=!1,t())):a.items.length>0?((n=e.items).push.apply(n,Object(i.a)(a.items)),t&&t(!1)):t&&t(!0);e.showProgress(!1)})).catch((function(s){t&&t(!0),e.showProgress(!1),e.procError(s)}))},onLoadMore:function(t){this.refresh=!1,this.onLoad(t)},onRefresh:function(t){this.refresh=!0,this.pageIndex=1,this.onLoad(t)},getRecordType:function(t){return 1===t?this.$$t("category1"):2===t?this.$$t("category2"):3===t?this.$$t("category3"):void 0},typeClick:function(t){this.recordType=t.value,this.dropdownTitle=t.text,this.onRefresh(),this.$refs.type.toggle()},$$t:function(t){return t?this.$t("financialNotes."+t):""}}},a=(s("2cbc"),s("2877")),o=Object(a.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"financialNotes"}},[s("div",{staticClass:"px-4 flex"},[s("van-dropdown-menu",{attrs:{"active-color":"rgb(70 132 255)"}},[s("van-dropdown-item",{ref:"type",attrs:{title:t.dropdownTitle}},[s("div",{staticClass:"dropdown-warp"},[s("div",{staticClass:"btns"},t._l(t.categorys,(function(e,i){return s("div",{key:i,staticClass:"btn van-ellipsis",class:{active:t.recordType===e.value},on:{click:function(s){return t.typeClick(e)}}},[s("span",[t._v(t._s(e.text))])])})),0)])])],1)],1),s("div",{staticClass:"notes-center"},[s("scroll-view",{attrs:{onRefresh:t.onRefresh,loadMore:t.onLoadMore}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.items.length>0,expression:"items.length>0"}],staticClass:"notes-content"},[t._l(t.items,(function(e,i){return[s("div",{key:i,staticClass:"list"},[s("div",{staticClass:"list-left"},[s("div",{staticClass:"list-left-tag van-ellipsis"},[s("van-tag",{attrs:{color:"#DE6470",plain:""}},[t._v(t._s(t.getRecordType(e.recordType)))])],1),s("div",{staticClass:"list-left-center"},[s("div",{staticClass:"title"},[t._v(t._s(e.productName))]),s("div",{staticClass:"desc"},[t._v(t._s(t.formatDate(e.createTime)))])])]),s("div",{staticClass:"list-right"},[t._v(t._s(t.currencySymbol)+t._s(e.money)+t._s(t.currencyDenomination))])]),s("van-divider",{directives:[{name:"show",rawName:"v-show",value:i<t.items.length-1,expression:"index< items.length-1"}],key:i,staticStyle:{margin:"0",padding:"0 16px","background-color":"white"}})]}))],2),s("van-empty",{directives:[{name:"show",rawName:"v-show",value:0===t.items.length,expression:"items.length === 0"}],staticClass:"text-center",attrs:{description:t.$t("common.noMore")},scopedSlots:t._u([{key:"image",fn:function(){return[s("van-image",{attrs:{src:"/images/empty/no-more.png",width:"280",height:"130"}})]},proxy:!0}])})],1)],1)])}),[],!1,null,"6ab91dfe",null);e.default=o.exports},"8e95":function(t,e,s){}}]);