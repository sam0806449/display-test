(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-c4c7ca7a"],{"1adc":function(e,t){function i(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}i.keys=function(){return[]},i.resolve=i,e.exports=i,i.id="1adc"},2906:function(e,t,i){"use strict";i("ab9e")},"2b16":function(e,t,i){},"302d":function(e,t,i){},6108:function(e,t,i){},"8d5e":function(e,t,i){"use strict";i("302d")},"8fcd":function(e,t,i){"use strict";i("a9e3"),i("d3b7"),i("ac1f"),i("3ca3"),i("841c"),i("ddb0"),i("2b3d");var s=i("16b7"),r=i.n(s),n=(i("c975"),i("45fc"),i("466d"),window.navigator.userAgent);function o(){return/Android|iPhone|webOS|BlackBerry|SymbianOS|Windows Phone|iPad|iPod/i.test(n)}var a=["dingtalk","mqqbrowser","sogoumobilebrowser","crios","edgios","fxios"];var c={water:{width:1920,height:1080,sources:{mp4:"https://crane3.im6ge.com/common/img/slots/mp4/mp4/cartoon.mp4",ts:"https://crane3.im6ge.com/common/img/slots/mp4/mp4/cartoon.ts",poster:"images/banner/login_bg.png"}}},d=new URLSearchParams(location.search),l=d.get("source")||"water",u=d.get("canvas"),h=d.get("bg")||1,g={data:function(){return{isMobile:o(),container:{width:window.innerWidth,height:window.innerHeight},showCanvas:!1}},computed:{useVideo:function(){return null!=u?!Number(u):(!o()||function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=!!n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);if(!e.length)return t;var i=n.toLowerCase();return t&&e.some((function(e){return-1!==i.indexOf(e)}))}())&&!/MicroMessenger/i.test(n)&&!("miniprogram"===window.__wxjs_environment||/miniProgram/i.test(n))},showBg:function(){return Number(h)},source:function(){return c[l]},containerStyle:function(){return{width:"100%",height:"100%"}},viewStyle:function(){return{top:"0px",left:"0px"}},canvasStyle:function(){return this.showCanvas?{height:"100%"}:{height:"0"}}},methods:{init:function(){this.isMobile||(this.container={width:this.container.width,height:0})},initPlayer:function(){var e=this;if(!this.useVideo){var t=this.source.sources,i=this.$refs.canvas;window.player=new r.a(t.ts,{canvas:i,loop:!0,autoplay:!0,poster:t.poster,disableWebAssembly:!0,chunkSize:1048576,videoBufferSize:524288}),setTimeout((function(){e.showCanvas=!0}),2500)}}},created:function(){this.init()},mounted:function(){this.initPlayer()}},f=(i("8d5e"),i("2877")),m=Object(f.a)(g,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"canvasVideo"}},["SGSBO"===e.skgCodeKey||"SGMGM"===e.skgCodeKey?[i("div",{staticClass:"m-bg",class:{"SGMGM-bg":"SGMGM"===e.skgCodeKey}},[i("div",{staticClass:"view__mask"},[e._t("default")],2)])]:"SGMP"===e.skgCodeKey?[i("div",{staticClass:"m-bg SGMP-bg"},[i("div",{staticClass:"view__mask"},[e._t("default")],2)])]:"SGU3"===e.skgCodeKey?[i("div",{staticClass:"m-bg SGU3-bg"},[i("div",{staticClass:"view__mask"},[e._t("default")],2)])]:"SG666"===e.skgCodeKey?[i("div",{staticClass:"m-bg SG666-bg"},[i("div",{staticClass:"view__mask"},[e._t("default")],2)])]:i("div",{staticClass:"container",class:{"container--mobile":e.isMobile},style:e.containerStyle},[i("div",{staticClass:"view",style:e.viewStyle},[e.showBg?i("img",{staticClass:"view__bg",attrs:{src:"images/banner/login_bg.png"}}):e._e(),e.useVideo?i("video",{staticClass:"view__video",class:{"mix-blend":e.showBg},attrs:{muted:"",loop:"",playsinline:"",autoplay:"autoplay",preload:"auto","mtt-playsinline":"true","webkit-playsinline":"true","x5-video-player-type":"h5-page",poster:e.source.sources.poster},domProps:{muted:!0}},[i("source",{attrs:{type:"video/mp4",src:e.source.sources.mp4}})]):i("canvas",{ref:"canvas",staticClass:"view__canvas",class:{"mix-blend":e.showBg},style:e.canvasStyle}),i("div",{staticClass:"view__mask"},[e._t("default")],2)])])],2)}),[],!1,null,"6be1f3ec",null);t.a=m.exports},"9a0f":function(e,t,i){"use strict";i("c975"),i("a15b"),i("a9e3");var s={name:"dragVerify",props:{isPassing:{type:Boolean,default:!1},width:{type:Number,default:250},height:{type:Number,default:40},text:{type:String,default:"swiping to the right side"},successText:{type:String,default:"success"},background:{type:String,default:"#eee"},progressBarBg:{type:String,default:"#76c61d"},completedBg:{type:String,default:"#76c61d"},circle:{type:Boolean,default:!1},radius:{type:String,default:"4px"},handlerIcon:{type:String},successIcon:{type:String},handlerBg:{type:String,default:"#fff"},textSize:{type:String,default:"14px"},textColor:{type:String,default:"#333"},imgsrc:{type:String},smallsrc:{type:String},codekey:{type:String},array:{type:Array,default:function(){return[]}},topy:{type:Number,default:0},barWidth:{type:Number,default:70},barHeight:{type:Number,default:40},barRadius:{type:Number,default:2},showRefresh:{type:Boolean,default:!1},refreshIcon:{type:String},showTips:{type:Boolean,default:!0},successTip:{type:String,default:""},failTip:{type:String,default:""},diffWidth:{type:Number,default:20}},mounted:function(){var e=this.$refs.dragVerify;e.style.setProperty("--textColor",this.textColor),e.style.setProperty("--width",Math.floor(this.width/2)+"px"),e.style.setProperty("--pwidth",-Math.floor(this.width/2)+"px")},computed:{handlerStyle:function(){return{width:"40px",height:"40px",background:this.handlerBg}},message:function(){return this.isPassing?"":this.text},successMessage:function(){return this.isPassing?this.successText:""},dragVerifyStyle:function(){return{width:this.width+"px",height:"40px",lineHeight:"40px",background:this.background,borderRadius:this.circle?"20px":this.radius}},dragVerifyImgStyle:function(){return{width:this.width+"px",position:"relative",overflow:"hidden"}},progressBarStyle:function(){return{background:this.progressBarBg,height:"40px",borderRadius:this.circle?"40px 0 0 40px":this.radius}},textStyle:function(){return{height:"40px",width:this.width+"px",fontSize:this.textSize}}},data:function(){return{isMoving:!1,x:0,isOk:!1,isKeep:!1,movebarStyle:{},showBar:!0,clipBarx:0,showErrorTip:!1,t1:new Date,t2:new Date,arrayDate:[],timeout:null,currentTime:0,lastTime:0,lastX:0}},methods:{checkimgLoaded:function(){this.clipBarx=0,this.movebarStyle={background:"url(".concat(this.smallsrc,")"),"background-size":"42px",width:"42px",height:"42px",top:this.topy+"px"}},dragStart:function(e){this.isPassing||(this.isMoving=!0,this.x=e.pageX||e.touches[0].pageX),this.showBar=!0,this.showErrorTip=!1,this.$emit("handlerMove")},dragMoving:function(e){if(this.isMoving&&!this.isPassing){this.t1=new Date;var t=(e.pageX||e.touches[0].pageX)-this.x;this.currentTime=(new Date).getTime(),this.currentTime-this.lastTime>=30&&t!==this.lastX&&(this.lastTime=this.currentTime,this.lastX=parseInt(t),this.arrayDate.push([parseInt(t),(new Date).getTime()])),this.$refs.handler.style.left=t+"px",this.$refs.progressBar.style.width=t+"px",this.$refs.moveBar.style.left=t+"px"}},dragFinish:function(e){var t=this;if(this.isMoving&&!this.isPassing){clearTimeout(this.timeout);var i=(e.pageX||e.changedTouches[0].pageX)-this.x;this.t2=new Date;var s={point:Math.round(Number(i)),key:this.codekey,timespan:this.t2-this.t1,datelist:this.arrayDate.join("|")};this.$get("/api/Account/CheckSliderCode",s).then((function(e){return t.checkResp(e,(function(e){return!0===e.data.success}))})).then((function(){t.passVerify()})).catch((function(e){t.isOk=!0;var i=t;setTimeout((function(){i.$refs.handler.style.left="0",i.$refs.progressBar.style.width="0",i.$refs.moveBar.style.left="0",i.isOk=!1}),500),t.showErrorTip=!0,t.arrayDate=[],t.$emit("passfail"),t.procError(e)})),this.isMoving=!1}},passVerify:function(){var e=this;this.$emit("update:isPassing",!0),this.isMoving=!1,this.$refs.handler.children[0].className=this.successIcon,this.$refs.progressBar.style.background=this.completedBg,this.$refs.message.style["-webkit-text-fill-color"]="unset",this.$refs.message.style.animation="slidetounlock2 3s infinite",this.$refs.progressBar.style.color="#fff",this.$refs.progressBar.style.fontSize=this.textSize,this.isKeep=!0,setTimeout((function(){e.$refs.moveBar.style.left=e.clipBarx+"px",setTimeout((function(){e.isKeep=!1}),200)}),100),this.$emit("passcallback")},reset:function(){this.reImg(),this.checkimgLoaded()},reImg:function(){this.$emit("update:isPassing",!1);var e=this.$options.data();for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(this[t]=e[t]);var i=this.$refs.handler,s=this.$refs.message;i.style.left="0",this.$refs.progressBar.style.width="0",i.children[0].className=this.handlerIcon,s.style["-webkit-text-fill-color"]="transparent",s.style.animation="slidetounlock 3s infinite",s.style.color=this.background},refreshimg:function(){this.$emit("refresh")},getStyle:function(e){var t=this.width/10,i=this.height/2,s=0,r=0,n=this.indexOf(this.array,e);return r=e>9?-i:0,s=e>9?(e-10)*-t:e*-t,n>9&&e<10&&(r-=i),e>9&&n<10&&(r+=i),{"background-position":(s+=(n-e)*-t)+"px "+r+"px","background-image":"url("+this.imgsrc+")",width:this.width/10+"px",height:this.height/2+"px"}},indexOf:function(e,t){if(e&&e.indexOf)return e.indexOf(t);for(var i=e.length,s=0;s<i;s++)if(e[s]===t)return s;return-1}},watch:{imgsrc:{immediate:!1,handler:function(){this.reImg()}}}},r=(i("e520"),i("2906"),i("2877")),n=Object(r.a)(s,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"drag-verify-container"},[i("div",{style:e.dragVerifyImgStyle},[i("div",{style:{width:e.width+"px",height:e.height+"px"}},[i("img",{ref:"checkImg",staticStyle:{display:"none"},style:{width:e.width+"px",height:e.height+"px"},attrs:{src:e.imgsrc,alt:""},on:{load:e.checkimgLoaded}}),e._l(20,(function(t){return[i("div",{key:t,staticClass:"cut_bg",style:e.getStyle(t-1),attrs:{id:"bb"+Number(t-1)}})]}))],2),i("div",{ref:"moveBar",staticClass:"move-bar",class:{goFirst:e.isOk,goKeep:e.isKeep},style:e.movebarStyle}),i("div",{ref:"clipBar",staticClass:"clip-bar"}),e.showRefresh&&!e.isPassing?i("div",{staticClass:"refresh"},[i("i",{class:e.refreshIcon,on:{click:e.refreshimg}})]):e._e(),e.showTips&&e.isPassing?i("div",{staticClass:"tips success"},[e._v(e._s(e.successTip)+" ")]):e._e()]),i("div",{ref:"dragVerify",staticClass:"drag_verify",style:e.dragVerifyStyle,on:{mousemove:e.dragMoving,mouseup:e.dragFinish,mouseleave:e.dragFinish,touchmove:e.dragMoving,touchend:e.dragFinish}},[i("div",{ref:"progressBar",staticClass:"dv_progress_bar",class:{goFirst2:e.isOk},style:e.progressBarStyle},[e._v(" "+e._s(e.successMessage)+" ")]),i("div",{ref:"message",staticClass:"dv_text",style:e.textStyle},[e._v(" "+e._s(e.message)+" ")]),i("div",{ref:"handler",staticClass:"dv_handler dv_handler_bg",class:{goFirst:e.isOk},style:e.handlerStyle,on:{mousedown:e.dragStart,touchstart:e.dragStart}},[i("i",{class:e.handlerIcon})])])])}),[],!1,null,"3d775304",null);t.a=n.exports},a976:function(e,t,i){"use strict";i("6108")},ab9e:function(e,t,i){},afd8:function(e,t,i){"use strict";i("4de4"),i("a9e3");t.a={countryCodes:[{english_name:"Chinese",chinese_name:"中国",country_code:"CN",phone_code:"86"},{english_name:"United States",chinese_name:"美国",country_code:"US",phone_code:"1"},{english_name:"Vietnam",chinese_name:"越南",country_code:"VN",phone_code:"84"},{english_name:"Thailand",chinese_name:"泰国",country_code:"TH",phone_code:"66"},{english_name:"Indonesia",chinese_name:"印度尼西亚",country_code:"ID",phone_code:"62"},{english_name:"India",chinese_name:"印度",country_code:"IN",phone_code:"91"}],getPhoneCode:function(e){if(!e)return"";var t=this.countryCodes.filter((function(t){return t.country_code===e}));return t.length>0?t[0].phone_code:""},getCountryCode:function(e){if(!e)return"";var t=this.countryCodes.filter((function(t){return Number(t.phone_code)===Number(e)}));return t.length>0?t[0].country_code:""}}},b76e:function(e,t,i){"use strict";i.r(t);i("99af"),i("4de4"),i("7db0"),i("c740"),i("fb6a"),i("45fc"),i("a434"),i("b0c0"),i("a9e3"),i("c96a");var s=i("61f7"),r=i("6a57"),n=i("5f87"),o=i("c28f"),a=i("9a0f"),c=i("afd8"),d=i("8fcd"),l={name:"Register",mixins:[o.a],components:{Verification:a.a,VideoBg:d.a},data:function(){return{verifyCodeImg:"images/account/vcode.png",regFields:[],passwordType:"password",minDate:new Date(1975,0,1),maxDate:new Date(2025,10,1),showPicker:!1,vipId:"",currencys:[],currency:"",showCurrency:!1,regForm:{memberAccount:"",password:"",confirmPassword:"",verifyCodeKey:"",verifyCode:"",invitationCode:"",memberName:"",tel:"",wechat:"",qq:"",email:"",payPass:"",birthday:null,currencyCode:"",currencySymbol:"",facebook:"",whatsapp:"",emailVerifyCode:"",emailVerifyCodeKey:"",TelPrefix:"",regUrl:""},cultureCode:"",readonly:!1,img:"",smallImg:"",array:[],topy:0,width:0,height:0,codekey:"",isPassing:!1,showVerification:!1,phoneCod:"",timer:null,preCurrencyCode:"",langCurrencyMap:[{name:"简体中文",code:"zh-CN",currency:"CNY",isDefault:!0,isOpen:!0},{name:"English",code:"en-US",currency:"USD",isDefault:!1,isOpen:!0},{name:"Tiếng Việt",code:"vi-VN",currency:"VND",isDefault:!1,isOpen:!0},{name:"ไทย",code:"th-TH",currency:"THB",isDefault:!1,isOpen:!0},{name:"bahasa Indonesia",code:"id-ID",currency:"IDR",isDefault:!1,isOpen:!0},{name:"हिंदी",code:"hi-IN",currency:"INR",isDefault:!1,isOpen:!0}],useLangByInviteCode:!1}},computed:{validatorType:function(){return this.siteConfig&&this.siteConfig.validatorType}},created:function(){this.initLang(),this.getRegisterFields();var e=this.$route.query.vip,t=this.$sessionGet("vip-data");e?(this.readonly=!0,this.$sessionSet("vip-data",e)):this.getCurrency(),this.regForm.invitationCode=e||t||""},watch:{"regForm.invitationCode":function(){this.debounce(this.getInviteCodeInfo)}},methods:{validator:function(e){if("84"===this.phoneCod)return 10===e.length},initLang:function(){var e=navigator.language||navigator.userLanguage,t=this.siteConfig&&this.siteConfig.cultures.filter((function(e){return!0===e.isDefault}))[0].code;this.culture&&""!==this.culture||(Object(n.d)(e||t),this.$store.commit("setCulture",e||t))},registerBtnClick:function(){if(this.regForm.TelPrefix=this.phoneCod,"84"===this.phoneCod){var e=this.regFields.filter((function(e){return"tel"===e.fieldName}))[0];if(e&&e.isShow&&10!==this.regForm.tel.length)return void this.$info(this.$t("validate.phone"))}1===Number(this.validatorType)?this.handleValid()&&this.getCreateSliderCode():this.onRegister()},getRegisterFields:function(){var e=this;this.showProgress(),this.$post("/api/Account/GetRegisterFields").then((function(t){return e.checkResp(t,(function(e){return!0===e.data.success}))})).then((function(t){var i=t.data;e.regFields=i,e.showProgress(!1)})).catch((function(t){e.showProgress(!1),e.procError(t)}))},getVerification:function(){var e=this;this.showProgress(!0),this.$post("/api/Account/GetVerifyImg").then((function(t){return e.checkResp(t,(function(e){return!0===e.data.success}))})).then((function(t){e.showProgress(!1);var i=t.data;e.verifyCodeImg="data:image/png;base64,"+i.img,e.regForm.verifyCodeKey=i.key})).catch((function(t){e.showProgress(!1),e.procError(t)}))},getEmailVerifyCode:function(){var e=this;this.regForm.email?(this.showProgress(!0),this.$get("/api/Account/GetEmailVerifyCode?email="+this.regForm.email).then((function(t){return e.checkResp(t,(function(e){return!0===e.data.success}))})).then((function(t){e.showProgress(!1),e.regForm.emailVerifyCodeKey=t.data,e.$success(e.$t("common.success"))})).catch((function(t){e.showProgress(!1),e.procError(t)}))):this.$info(this.$$t("pLeft")+"Email")},handleValid:function(){return Object(s.j)(this.regForm.memberAccount)&&Object(s.i)(this.regForm.password)&&Object(s.f)(this.regForm.password,this.regForm.confirmPassword)&&this.validOtherRegFields()&&this.checkName()},checkName:function(){return" "!==this.regForm.memberName[0]&&" "!==this.regForm.memberName.slice(-1)||(this.$toast(this.$t("validate.spaceMoreOne")),!1)},validOtherRegFields:function(){var e=this;return!this.regFields.some((function(t){return!(!t.isShow||!t.isRequired)&&((""===e.regForm[t.fieldName]||null===e.regForm[t.fieldName])&&(e.$toast("".concat(t.cnName).concat(e.$t("common.noNull"))),!0))}))},onRegister:function(){var e=this;this.handleValid()&&(this.showProgress(!0),this.regForm.regUrl=window.location.href,this.$post("/api/Account/Register",this.regForm).then((function(t){return e.checkResp(t,(function(e){return!0===e.data.success}))})).then((function(t){var i=t.data;Object(n.e)(i.token),e.$store.commit("setToken",i.token),e.initSystem(),e.$sessionSet("tabbar","dashboard"),e.$sessionSet("Home-Popup",!1),e.$router.push("/app/dashboard"),e.$success(e.$$t("success")),e.showProgress(!1)})).catch((function(t){e.showProgress(!1),e.regForm.verifyCode=null,e.getVerification(),e.procError(t)})))},getCurrency:function(e){var t=this;this.$post("/api/Account/GetCurrency").then((function(e){return t.checkResp(e,(function(e){return!0===e.data.success}))})).then((function(i){var s=i.data;if(t.currencys=s,"SGDP"===JSON.parse(sessionStorage.getItem("SiteConfig")).codeKey){var r=t.currencys.findIndex((function(e){return"USD"===e.code}));r>-1&&t.currencys.splice(r,1)}if(e)t.setCode(e);else{var n=s.find((function(e){return!0===e.isDefault})),o=t.$route.query.countryCode||n&&n.code;o||(o=s[0].code),t.setCode(o)}})).catch((function(e){t.procError(e)}))},getCreateSliderCode:function(){var e=this;this.$get("/api/Account/CreateSliderCode").then((function(t){return e.checkResp(t,(function(e){return!0===e.data.success}))})).then((function(t){var i=t.data;e.img=i.normal,e.smallImg=i.small,e.topy=i.y,e.array=i.array,e.width=i.width,e.height=i.height,e.codekey=i.key,e.regForm.verifyCodeKey=i.key,e.showVerification=!0})).catch((function(t){e.procError(t)}))},onPass:function(){var e=this;this.showVerification=!1,this.regForm.regUrl=window.location.href,this.showProgress(!0),this.$post("/api/Account/Register",this.regForm).then((function(t){return e.checkResp(t,(function(e){return!0===e.data.success}))})).then((function(t){var i=t.data;Object(n.e)(i.token),e.initSystem(),e.$sessionSet("tabbar","dashboard"),e.$sessionSet("Home-Popup",!1),e.$router.push("/app/dashboard"),e.$success(e.$$t("success"))})).catch((function(t){e.showProgress(!1),e.procError(t)}))},refreshImg:function(){this.getCreateSliderCode()},changeType:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},onConfirm:function(e){this.regForm.currencyCode=e.code,this.regForm.currencySymbol=e.symbol,this.cultureCode=e.cultureCode,this.currency=e.name;var t=e.cultureCode.substring(5,3);this.phoneCod=c.a.getPhoneCode(t),this.showCurrency=!1},getFieldType:function(e){return"tel"===e||"qq"===e||"payPass"===e||"invitationCode"===e?"digit":"text"},getFieldLength:function(e){return"tel"===e?"84"===this.phoneCod?10:11:"payPass"===e?4:"qq"===e?12:"email"===e||"facebook"===e||"whatsapp"===e?30:16},showTimePicker:function(e){"birthday"===e&&(this.showPicker=!0)},confirmBirthday:function(e){this.regForm.birthday=Object(r.e)(new Date(e),"yyyy-MM-dd"),this.showPicker=!1},redirectRouter:function(e){this.$router.push(e)},setCode:function(e){var t=this.currencys.filter((function(t){return t.code===e}))[0];this.regForm.currencyCode=t.code,this.regForm.currencySymbol=t.symbol,this.cultureCode=t.cultureCode,this.currency=t.name;var i=t.cultureCode.substring(5,3);this.phoneCod=c.a.getPhoneCode(i)},$$t:function(e){return this.$t("register."+e)},debounce:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;clearTimeout(this.timer),this.timer=setTimeout((function(){e()}),t)},getInviteCodeInfo:function(){var e=this;if(this.regForm.invitationCode.length<4)this.preCurrencyCode&&this.regForm.currencyCode!==this.preCurrencyCode&&(this.regForm.currencyCode=this.preCurrencyCode,this.setCode(this.preCurrencyCode));else{var t=new FormData;t.append("code",this.regForm.invitationCode),this.$post("/api/Account/GetInviteCodeInfo",t,{"Content-Type":"application/x-www-form-urlencoded"}).then((function(t){return e.checkResp(t,(function(e){return!0===e.data.success}))})).then((function(t){if(t.data&&t.data.currencyCode){e.preCurrencyCode||(e.preCurrencyCode=e.regForm.currencyCode),e.regForm.currencyCode=t.data.currencyCode;var i=e.langCurrencyMap.find((function(e){return e.currency===t.data.currencyCode})).code;i&&(e.useLangByInviteCode=1,e.initLocale(i),e.getRegisterFields(),e.getCurrency(t.data.currencyCode))}else e.preCurrencyCode&&(e.regForm.currencyCode=e.preCurrencyCode,e.setCode(e.preCurrencyCode))})).catch((function(t){e.preCurrencyCode&&(e.regForm.currencyCode=e.preCurrencyCode,e.setCode(e.preCurrencyCode)),e.procError(t)}))}}}},u=(i("a976"),i("2877")),h=Object(u.a)(l,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("video-bg",{staticClass:"video-bg"},[i("scroller",[i("div",{staticClass:"main_area register_container",attrs:{id:"register"}},["SG666"!==e.skgCodeKey?i("van-nav-bar",{attrs:{border:!1},on:{"click-right":function(t){return e.$router.push("/app/changeLanguage")},"click-left":function(t){return e.$router.push("/app/joint")}},scopedSlots:e._u([{key:"right",fn:function(){return[e.useLangByInviteCode?e._e():i("div",[i("van-icon",{attrs:{name:"/images/account/login/language.png",size:"24"}}),i("span",{staticClass:"white-text ml-1"},[e._v(e._s(e.$$t("language")))])],1)]},proxy:!0},{key:"left",fn:function(){return[e.skgCode!==e.skyLotteryCode?i("div",[i("van-icon",{attrs:{name:"/images/account/joint.png",size:"24"}}),i("span",{staticClass:"white-text ml-1"},[e._v(e._s(e.$$t("joint")))])],1):e._e()]},proxy:!0}],null,!1,383057813)}):e._e(),i("div",{staticClass:"logo_area"},[i("div",{staticClass:"header_logo"},[i("van-image",{attrs:{src:e.$portrait(e.siteConfig&&e.siteConfig.logo&&e.siteConfig.logo.loginLogo84),"lazy-load":""},scopedSlots:e._u([{key:"loading",fn:function(){return[i("van-loading",{attrs:{type:"spinner",size:"22"}})]},proxy:!0}])})],1)]),i("div",{staticClass:"card_container register_area",class:e.skgCodeKey},[i("div",{staticClass:"title swap_reslog"},[e._v(" "+e._s(e.$$t("title"))+" "),i("span",{staticClass:"cancel main-text",on:{click:function(t){return e.redirectRouter("/login")}}},[e._v(e._s(e.$$t("login")))])]),i("div",{staticClass:"card_container_warp"},[i("div",{staticClass:"register-b"},[i("div",{staticClass:"warp"},[i("van-form",{attrs:{"validate-first":""}},[i("div",{staticClass:"regFields-item"},[i("span",{staticClass:"required"},[e._v("*")]),i("van-field",{attrs:{border:!1,placeholder:e.$$t("userPlaceholder")},model:{value:e.regForm.memberAccount,callback:function(t){e.$set(e.regForm,"memberAccount",t)},expression:"regForm.memberAccount"}},[i("van-icon",{attrs:{slot:"left-icon",name:"images/account/register/register-icon-user.png",size:"20"},slot:"left-icon"})],1)],1),i("div",{staticClass:"regFields-item"},[i("span",{staticClass:"required"},[e._v("*")]),i("van-field",{ref:"password",attrs:{border:!1,placeholder:e.$$t("pwdPlaceholder"),type:e.passwordType},on:{"click-right-icon":e.changeType},model:{value:e.regForm.password,callback:function(t){e.$set(e.regForm,"password",t)},expression:"regForm.password"}},[i("van-icon",{attrs:{slot:"left-icon",name:"images/account/register/register-icon-password.png",size:"20"},slot:"left-icon"}),i("van-icon",{attrs:{slot:"right-icon",name:e.passwordType?"closed-eye":"eye-o",size:"20",color:"#333333"},slot:"right-icon"})],1)],1),i("div",{staticClass:"regFields-item"},[i("span",{staticClass:"required"},[e._v("*")]),i("van-field",{attrs:{border:!1,placeholder:e.$$t("confirmPwdP"),type:e.passwordType},on:{"click-right-icon":e.changeType},model:{value:e.regForm.confirmPassword,callback:function(t){e.$set(e.regForm,"confirmPassword",t)},expression:"regForm.confirmPassword"}},[i("van-icon",{attrs:{slot:"left-icon",name:"images/account/register/register-icon-confirm-password.png",size:"20"},slot:"left-icon"}),i("van-icon",{attrs:{slot:"right-icon",name:e.passwordType?"closed-eye":"eye-o",size:"20",color:"#333333"},slot:"right-icon"})],1)],1),i("van-field",{attrs:{readonly:"",center:"",clickable:"","right-icon":"arrow",placeholder:e.$$t("changeCurrency")},on:{click:function(t){e.showCurrency=!0}}},[i("div",{staticClass:"flex align-items-center",attrs:{slot:"input"},slot:"input"},[i("van-image",{staticClass:"mr-1",attrs:{src:"/images/common/"+e.cultureCode+".png",width:"18",height:"18"}}),e._v(" "+e._s(e.currency)+" ")],1),i("van-icon",{attrs:{slot:"left-icon",name:"images/account/register/currency.png",size:"20"},slot:"left-icon"})],1),e._l(e.regFields,(function(t,s){return[i("div",{key:"regFields-"+s,staticClass:"regFields-item"},[t.isRequired?i("span",{staticClass:"required"},[e._v("*")]):e._e(),"emailVerifyCode"===t.fieldName?i("div",[i("van-row",{attrs:{gutter:"10"}},[i("van-col",{attrs:{span:"16"}},[i("van-field",{attrs:{center:"",clearable:"",placeholder:e.$$t("emailVerifyCodeDesc")},model:{value:e.regForm.emailVerifyCode,callback:function(t){e.$set(e.regForm,"emailVerifyCode",t)},expression:"regForm.emailVerifyCode"}},[i("van-icon",{attrs:{slot:"left-icon",name:"images/account/register/register-icon-verification-code.png",size:"20"},slot:"left-icon"})],1)],1),i("van-col",{attrs:{span:"8"}},[i("van-button",{staticClass:"radius-2",attrs:{size:"normal"},on:{click:e.getEmailVerifyCode}},[e._v(e._s(e.$$t("get"))+" ")])],1)],1)],1):i("div",[i("van-field",{attrs:{border:!1,rules:"tel"===t.fieldName?[{validator:e.validator,message:e.$$t("_1")}]:[{}],type:e.getFieldType(t.fieldName),center:"",maxlength:e.getFieldLength(t.fieldName),placeholder:""+("vi-VN"===e.culture?"":e.$$t("pLeft"))+t.cnName+(t.isRequired?"":e.$$t("pRight")),readonly:"birthday"===t.fieldName},on:{click:function(i){return e.showTimePicker(t.fieldName)}},model:{value:e.regForm[t.fieldName],callback:function(i){e.$set(e.regForm,t.fieldName,i)},expression:"regForm[f.fieldName]"}},["tel"!==t.fieldName?i("van-icon",{attrs:{slot:"left-icon",name:"images/account/register/register-"+t.fieldName+".png",size:"20"},slot:"left-icon"}):i("div",{attrs:{slot:"left-icon"},on:{click:function(t){return e.redirectRouter("/searchCountry")}},slot:"left-icon"},[i("div",{staticClass:"flex align-items-center"},[i("div",{staticClass:"mr-1"},[e._v(e._s("+"+e.phoneCod))]),i("van-icon",{attrs:{name:"arrow-down"}})],1)])],1)],1)])]})),0===Number(e.validatorType)?i("div",{staticClass:"verification"},[i("van-field",{attrs:{border:!1,type:"digit",maxlength:"4",center:"",placeholder:e.$$t("verifyCodePlaceholder")},on:{"~focus":function(t){return e.getVerification(t)}},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.registerBtnClick(t)}},model:{value:e.regForm.verifyCode,callback:function(t){e.$set(e.regForm,"verifyCode",t)},expression:"regForm.verifyCode"}},[i("van-icon",{attrs:{slot:"left-icon",name:"images/account/register/register-icon-verification-code.png",size:"20"},slot:"left-icon"})],1),i("img",{staticClass:"verification-img",attrs:{src:e.verifyCodeImg},on:{click:e.getVerification}})],1):e._e(),i("div",{staticClass:"btns mt-3"},[i("van-button",{staticClass:"radius-2",attrs:{type:"info",block:""},on:{click:e.registerBtnClick}},[e._v(" "+e._s(e.$$t("btn"))+" ")])],1)],2)],1)])])])],1)]),i("van-dialog",{staticClass:"pa-5",attrs:{width:"240",closeOnClickOverlay:!0,showConfirmButton:!1},model:{value:e.showVerification,callback:function(t){e.showVerification=t},expression:"showVerification"}},[i("verification",{ref:"dragVerify",attrs:{imgsrc:e.img,smallsrc:e.smallImg,topy:e.topy,array:e.array,"handler-bg":"#5b7ffb",handlerIcon:"van-icon-arrow van-icon body-2 white-text",successIcon:"van-icon-passed van-icon body-2 white-text",isPassing:e.isPassing,width:e.width,height:e.height,codekey:e.codekey,showRefresh:!0,text:e.$$t("verificationText"),successText:e.$$t("vSuccessText"),refreshIcon:"van-icon-replay van-icon white-text"},on:{"update:isPassing":function(t){e.isPassing=t},"update:is-passing":function(t){e.isPassing=t},refresh:e.refreshImg,passcallback:e.onPass}})],1),i("van-popup",{attrs:{position:"bottom"},model:{value:e.showPicker,callback:function(t){e.showPicker=t},expression:"showPicker"}},[i("van-datetime-picker",{attrs:{type:"date","min-date":e.minDate,"max-date":e.maxDate},on:{cancel:function(t){e.showPicker=!1},confirm:e.confirmBirthday}})],1),i("van-popup",{attrs:{round:"",position:"bottom"},model:{value:e.showCurrency,callback:function(t){e.showCurrency=t},expression:"showCurrency"}},[i("van-picker",{attrs:{"show-toolbar":"","value-key":"name",columns:e.currencys},on:{cancel:function(t){e.showCurrency=!1},confirm:e.onConfirm},scopedSlots:e._u([{key:"option",fn:function(t){return[i("div",{staticClass:"flex align-items-center text-center space-between",staticStyle:{"min-width":"80px"}},[i("van-image",{staticClass:"mr-1",attrs:{src:"images/common/"+t.cultureCode+".png",width:"24",height:"24"}}),i("div",[e._v(e._s(t.name))])],1)]}}])})],1)],1)}),[],!1,null,"605cda48",null);t.default=h.exports},e520:function(e,t,i){"use strict";i("2b16")}}]);