<template>
	<video-bg class="video-bg">
		<scroller>
			<div id="register" class="main_area register_container">
				<van-nav-bar v-if="skgCodeKey !== 'SG666'" :border="false" @click-right="$router.push('/app/changeLanguage')"
					@click-left="$router.push('/app/joint')">
					<template #right>
						<div v-if="!useLangByInviteCode">
							<van-icon name="/images/account/login/language.png" size="24" />
							<span class="white-text ml-1">{{$$t('language')}}</span>
						</div>
					</template>

					<template #left>
						<div v-if="skgCode !== skyLotteryCode">
							<van-icon name="/images/account/joint.png" size="24" />
							<span class="white-text ml-1">{{$$t('joint')}}</span>
						</div>
					</template>
				</van-nav-bar>

				<div class="logo_area">
					<!-- <div v-if="skinCode === 'SGYF'" class="header_logo">
					<van-image src="/images/common/h5-wf-login-logo.png" />
					</div> -->
					<div class="header_logo">
						<van-image :src="$portrait(siteConfig && siteConfig.logo && siteConfig.logo.loginLogo84)" lazy-load>
							<template v-slot:loading>
							<van-loading type="spinner" size="22"/>
							</template>
						</van-image>
					</div>
				</div>

				<div class="card_container register_area" :class="skgCodeKey">
					<div class="title swap_reslog">
						{{$$t('title')}} <span class="cancel main-text"
							@click="redirectRouter('/login')">{{$$t('login')}}</span>
					</div>
					<div class="card_container_warp">
						<div class="register-b">
							<div class="warp">
								<van-form validate-first>

								<div class="regFields-item">
									<span class="required">*</span>
									<van-field v-model="regForm.memberAccount" :border="false"
										:placeholder="$$t('userPlaceholder')">
										<van-icon name="images/account/register/register-icon-user.png" size="20"
											slot="left-icon" />
									</van-field>
								</div>
								
								<div class="regFields-item">
									<span class="required">*</span>
									<van-field v-model="regForm.password" :border="false"
										:placeholder="$$t('pwdPlaceholder')" :type="passwordType"
										@click-right-icon="changeType" ref="password">
										<van-icon name="images/account/register/register-icon-password.png" size="20"
											slot="left-icon" />
										<van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
											slot="right-icon" />
									</van-field>
								</div>

								<div class="regFields-item">
									<span class="required">*</span>
									<van-field v-model="regForm.confirmPassword" :border="false"
										:placeholder="$$t('confirmPwdP')" :type="passwordType"
										@click-right-icon="changeType">
										<van-icon name="images/account/register/register-icon-confirm-password.png"
											size="20" slot="left-icon" />
										<van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
											slot="right-icon" />
									</van-field>
								</div>

								<van-field readonly center clickable right-icon="arrow"
									:placeholder="$$t('changeCurrency')" @click="showCurrency = true">
									<div slot="input" class="flex align-items-center">
										<van-image :src="`/images/common/${cultureCode}.png`" width="18" height="18"
											class="mr-1" />
										{{currency}}
									</div>
									<van-icon name="images/account/register/currency.png" size="20" slot="left-icon" />
								</van-field>

								<template v-for="(f, index) in regFields">
									<div :key="`regFields-${index}`" class="regFields-item">
										<span v-if="f.isRequired" class="required">*</span>
										<div v-if="f.fieldName==='emailVerifyCode'">
											<van-row gutter="10">
												<van-col span="16">
													<van-field v-model="regForm.emailVerifyCode" center clearable
														:placeholder="$$t('emailVerifyCodeDesc')">
														<van-icon
															name="images/account/register/register-icon-verification-code.png"
															size="20" slot="left-icon" />
													</van-field>
												</van-col>
												<van-col span="8">
													<van-button class="radius-2" size="normal"
														@click="getEmailVerifyCode">{{$$t('get')}}
													</van-button>
												</van-col>
											</van-row>
										</div>

										<div v-else>
											<van-field v-model="regForm[f.fieldName]" :border="false"
												:rules="f.fieldName === 'tel' ? [{ validator , message: $$t('_1') }]: [{}]"
												:type="getFieldType(f.fieldName)" center
												:maxlength="getFieldLength(f.fieldName)"
												:placeholder="`${culture === 'vi-VN' ? '' : $$t('pLeft')}${f.cnName}${f.isRequired ? '' : $$t('pRight')}`"
												:readonly="f.fieldName==='birthday'"
												@click="showTimePicker(f.fieldName)">
												<van-icon :name="`images/account/register/register-${f.fieldName}.png`"
													size="20" v-if="f.fieldName!=='tel'" slot="left-icon" />

												<div v-else slot="left-icon" @click="redirectRouter('/searchCountry')">
													<div class="flex align-items-center">
														<div class="mr-1">{{'+' + phoneCod}}</div>
														<van-icon name="arrow-down" />
													</div>
												</div>
											</van-field>
										</div>
									</div>
								</template>

								<div class="verification" v-if="Number(validatorType) === 0">
									<van-field v-model="regForm.verifyCode" :border="false" type="digit" maxlength="4"
										center @focus.once="getVerification" @keyup.enter.native="registerBtnClick"
										:placeholder="$$t('verifyCodePlaceholder')">
										<van-icon name="images/account/register/register-icon-verification-code.png"
											size="20" slot="left-icon" />
									</van-field>
									<img :src="verifyCodeImg" class="verification-img" @click="getVerification">
								</div>

								<div class="btns mt-3">
									<van-button type="info" class="radius-2" block @click="registerBtnClick">
										{{$$t('btn')}}
									</van-button>
								</div>
							</van-form>	
							</div>
						</div>
					</div>
				</div>
			</div>
		</scroller>
		<van-dialog v-model="showVerification" width="240" class="pa-5" :closeOnClickOverlay="true"
			:showConfirmButton="false">
			<verification ref="dragVerify" :imgsrc="img" :smallsrc="smallImg" :topy="topy" :array="array"
				handler-bg="#5b7ffb" handlerIcon="van-icon-arrow van-icon body-2 white-text"
				successIcon="van-icon-passed van-icon body-2 white-text" :isPassing.sync="isPassing" :width="width"
				:height="height" :codekey="codekey" :showRefresh="true" :text="$$t('verificationText')"
				:successText="$$t('vSuccessText')" @refresh="refreshImg" @passcallback="onPass"
				refreshIcon="van-icon-replay van-icon white-text"></verification>
		</van-dialog>
		
		<van-popup v-model="showPicker" position="bottom">
			<van-datetime-picker type="date" :min-date="minDate" :max-date="maxDate"
				@cancel="showPicker = false" @confirm="confirmBirthday" />
		</van-popup>

		<van-popup v-model="showCurrency" round position="bottom">
			<van-picker show-toolbar value-key="name" :columns="currencys"
				@cancel="showCurrency = false" @confirm="onConfirm">
				<template #option="item">
					<div class="flex align-items-center text-center space-between"
						style="min-width: 80px">
						<van-image :src="`images/common/${item.cultureCode}.png`" width="24" height="24"
							class="mr-1" />
						<div>{{item.name}}</div>
					</div>
				</template>
			</van-picker>
		</van-popup>
	</video-bg>
</template>

<script>
	import {
		validUserName,
		validPwd,
		validConfirmPwd
	} from '@/utils/validate'
	import {
		dateFormatMt_8
	} from '@/common/js/dateUtil'
	import {
		setTokenFromCookie,
		setCultureFromCookie
	} from '@/utils/auth'
	import sessionContext from '@/mixins/sessionContext'
	import Verification from '@/components/Verification'
	import countrys from '@/common/js/countryCode'
	import VideoBg from '@/components/CanvasVideo'

	export default {
		name: 'Register',
		mixins: [sessionContext],

		components: {
			Verification,
			VideoBg
		},

		data: () => ({
			verifyCodeImg: 'images/account/vcode.png',
			regFields: [],
			passwordType: 'password',
			minDate: new Date(1975, 0, 1),
			maxDate: new Date(2025, 10, 1),
			showPicker: false,
			vipId: '',
			currencys: [],
			currency: '',
			showCurrency: false,
			regForm: {
				memberAccount: '',
				password: '',
				confirmPassword: '',
				verifyCodeKey: '',
				verifyCode: '',
				invitationCode: '',
				memberName: '',
				tel: '',
				wechat: '',
				qq: '',
				email: '',
				payPass: '',
				birthday: null,
				currencyCode: '',
				currencySymbol: '',
				facebook: '',
				whatsapp: '',
				emailVerifyCode: '',
				emailVerifyCodeKey: '',
				TelPrefix: '',
				regUrl: '',
			},
			cultureCode: '',
			readonly: false,
			img: '',
			smallImg: '',
			array: [],
			topy: 0,
			width: 0,
			height: 0,
			codekey: '',
			isPassing: false,
			showVerification: false,
			phoneCod: '',
            timer: null,
            preCurrencyCode: '',
			langCurrencyMap: [
				{name: "简体中文", code: "zh-CN", currency: "CNY", isDefault: true, isOpen: true},
				{name: "English", code: "en-US", currency: "USD", isDefault: false, isOpen: true},
				{name: "Tiếng Việt", code: "vi-VN", currency: "VND", isDefault: false, isOpen: true},
				{name: "ไทย", code: "th-TH", currency: "THB", isDefault: false, isOpen: true},
				{name: "bahasa Indonesia", code: "id-ID", currency: "IDR", isDefault: false, isOpen: true},
				{name: "हिंदी", code: "hi-IN", currency: "INR", isDefault: false, isOpen: true}
			],
			useLangByInviteCode: false,
		}),


		computed: {
			validatorType() {
				return this.siteConfig && this.siteConfig.validatorType
			},
		},

		created() {
			this.initLang()
			this.getRegisterFields()
			let vip = this.$route.query.vip
			let s_vip = this.$sessionGet('vip-data')
			if (vip) { 
				this.readonly = true
				this.$sessionSet('vip-data', vip)
			} else {
				this.getCurrency()
			}
			this.regForm.invitationCode = vip || s_vip || ''
		},

		watch: {
			'regForm.invitationCode'() {
				const vm = this;
				this.debounce(vm.getInviteCodeInfo);
			}
		},

		methods: {
			validator(val) {
				// 仅对 越南电话号码限制 10位数
				if (this.phoneCod !== '84') return
				if(val.length !== 10) return false
				else return true
			},

			initLang() {
				let lang = navigator.language || navigator.userLanguage;
				let sc = this.siteConfig && this.siteConfig.cultures.filter(e => e.isDefault === true)[0].code;
				if (!this.culture || this.culture === '') {
					setCultureFromCookie(lang || sc);
					this.$store.commit("setCulture", lang || sc);
				}
			},

			registerBtnClick() {
				this.regForm.TelPrefix = this.phoneCod;
				if (this.phoneCod === '84') {
					const phone = this.regFields.filter((e) => e.fieldName === "tel")[0];
					if (phone && phone.isShow && this.regForm.tel.length !== 10) {
						this.$info(this.$t('validate.phone'));
						return;
					}
				}
				if (Number(this.validatorType) === 1) {
					if (this.handleValid()) this.getCreateSliderCode()
				} else {
					this.onRegister()
				}
			},

			getRegisterFields() {
				this.showProgress()
				this.$post('/api/Account/GetRegisterFields')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.regFields = d
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			getVerification() {
				this.showProgress(true)
				this.$post('/api/Account/GetVerifyImg')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.showProgress(false);
						let d = data.data;
						this.verifyCodeImg = 'data:image/png;base64,' + d.img;
						this.regForm.verifyCodeKey = d.key;
					})
					.catch(error => {
						this.showProgress(false);
						this.procError(error);
					})
			},

			getEmailVerifyCode() {
				if (!this.regForm.email) {
					this.$info(this.$$t('pLeft') + 'Email');
					return;
				}
				this.showProgress(true)
				this.$get('/api/Account/GetEmailVerifyCode?email=' + this.regForm.email)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.showProgress(false);
						this.regForm.emailVerifyCodeKey = data.data;
						this.$success(this.$t('common.success'));
					})
					.catch(error => {
						this.showProgress(false);
						this.procError(error);
					})
			},

			handleValid() {
				return validUserName(this.regForm.memberAccount)
				&& validPwd(this.regForm.password)
				&& validConfirmPwd(this.regForm.password, this.regForm.confirmPassword)
				&& this.validOtherRegFields()
				&& this.checkName();
			},

			checkName() {
				if (this.regForm.memberName[0] === ' ' || this.regForm.memberName.slice(-1) === ' ') {
					this.$toast(this.$t("validate.spaceMoreOne"));
					return false;
				}

				return true;
			},

			validOtherRegFields() {
				return !this.regFields.some((item) => {
					if (!item.isShow || !item.isRequired) {
						return false;
					}
					if (this.regForm[item.fieldName] === '' || this.regForm[item.fieldName] === null) {
						this.$toast(`${item.cnName}${this.$t('common.noNull')}`);
						return true;
					}
					return false;
				})
			},

			onRegister() {
				if (this.handleValid()) {
					this.showProgress(true)
					this.regForm.regUrl = window.location.href;
					this.$post('/api/Account/Register', this.regForm)
						.then(resp => {
							return this.checkResp(resp, (r) => r.data.success === true)
						})
						.then(data => {
							let d = data.data
							setTokenFromCookie(d.token)
							this.$store.commit("setToken", d.token);
							this.initSystem()
							this.$sessionSet('tabbar', 'dashboard')
							this.$sessionSet('Home-Popup', false)
							this.$router.push('/app/dashboard')
							this.$success(this.$$t('success'))
							this.showProgress(false)
						})
						.catch(error => {
							this.showProgress(false)
							this.regForm.verifyCode = null
							this.getVerification()
							this.procError(error)
						})
				}
			},

			getCurrency(inviteLinkCurrencyCode) {
				this.$post('/api/Account/GetCurrency')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.currencys = d
						let siteConfig = JSON.parse(sessionStorage.getItem('SiteConfig'))
						// SGDP 隐藏美元
						if (siteConfig.codeKey === 'SGDP') {
							let finder = this.currencys.findIndex(t => t.code === "USD")
							if (finder > -1) this.currencys.splice(finder,1)
						}
					
						if (inviteLinkCurrencyCode){
							this.setCode(inviteLinkCurrencyCode)
						} else {	
							let v = d.find(e => e.isDefault === true)
							let e = this.$route.query.countryCode || v && v.code
							if (!e) e = d[0].code
							this.setCode(e)	
						}

					})
					.catch(error => {
						this.procError(error)
					})
			},

			getCreateSliderCode() {
				this.$get('/api/Account/CreateSliderCode')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.img = d.normal
						this.smallImg = d.small
						this.topy = d.y
						this.array = d.array
						this.width = d.width
						this.height = d.height
						this.codekey = d.key
						this.regForm.verifyCodeKey = d.key
						this.showVerification = true
					})
					.catch(error => {
						this.procError(error)
					})
			},

			onPass() {
				this.showVerification = false
				this.regForm.regUrl = window.location.href;
				this.showProgress(true)
				this.$post('/api/Account/Register', this.regForm)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						setTokenFromCookie(d.token)
						this.initSystem()
						this.$sessionSet('tabbar', 'dashboard')
						this.$sessionSet('Home-Popup', false)
						this.$router.push('/app/dashboard')
						this.$success(this.$$t('success'))
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			refreshImg() {
				this.getCreateSliderCode()
			},

			changeType() {
				if (this.passwordType === 'password') {
					this.passwordType = ''
				} else {
					this.passwordType = 'password'
				}
				this.$nextTick(() => {
					this.$refs.password.focus()
				})
			},

			onConfirm(v) {
				this.regForm.currencyCode = v.code;
				this.regForm.currencySymbol = v.symbol
				this.cultureCode = v.cultureCode
				this.currency = v.name
				let e = v.cultureCode.substring(5, 3)
				this.phoneCod = countrys.getPhoneCode(e)
				this.showCurrency = false;
			},

			getFieldType(f) {
				if (f === 'tel' || f === 'qq' || f === 'payPass' || f === 'invitationCode') return 'digit'
				else return 'text'
			},

			getFieldLength(f) {
				if (f === 'tel') {
					// 84是越南
					if (this.phoneCod === '84') return 10
					else return 11
				}
				else if (f === 'payPass') return 4
				else if (f === 'qq') return 12
				else if (f === 'email' || f === 'facebook' || f === 'whatsapp') return 30
				else return 16
			},

			showTimePicker(f) {
				if (f === 'birthday') this.showPicker = true
			},

			confirmBirthday(v) {
				this.regForm.birthday = dateFormatMt_8(new Date(v), 'yyyy-MM-dd')
				this.showPicker = false
			},

			redirectRouter(r) {
				this.$router.push(r)
			},

			setCode(v) {
				let e = this.currencys.filter(e => e.code === v)[0]
				this.regForm.currencyCode = e.code;
				this.regForm.currencySymbol = e.symbol
				this.cultureCode = e.cultureCode
				this.currency = e.name
				let code = e.cultureCode.substring(5, 3)
				this.phoneCod = countrys.getPhoneCode(code)
			},

			$$t(v) {
				return this.$t('register.' + v)
			},

			debounce(func, delay = 500) {
				clearTimeout(this.timer);        
				this.timer = setTimeout(function() {       
					func();
				}, delay);
			},

			getInviteCodeInfo() {
				if (this.regForm.invitationCode.length < 4) {
					if (this.preCurrencyCode && this.regForm.currencyCode !== this.preCurrencyCode) {
						this.regForm.currencyCode = this.preCurrencyCode;
						this.setCode(this.preCurrencyCode)
					}
					return;
				}
				const data = new FormData()
				data.append('code', this.regForm.invitationCode)
				this.$post('/api/Account/GetInviteCodeInfo', data, {'Content-Type': 'application/x-www-form-urlencoded'})
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						if (data.data && data.data.currencyCode) {
							if (!this.preCurrencyCode) {
								this.preCurrencyCode = this.regForm.currencyCode;
							}
							this.regForm.currencyCode = data.data.currencyCode;
							let langCode = this.langCurrencyMap.find(t => t.currency === data.data.currencyCode).code
							if (langCode) {
								this.useLangByInviteCode = 1
								this.initLocale(langCode)
								this.getRegisterFields()
								this.getCurrency(data.data.currencyCode)
							}
							// this.$success(this.$$t('getSuccess'))
							return;
						}   
						if (this.preCurrencyCode) {
							this.regForm.currencyCode = this.preCurrencyCode;
							this.setCode(this.preCurrencyCode)
						}
					})
					.catch(error => {
						if (this.preCurrencyCode) {
							this.regForm.currencyCode = this.preCurrencyCode;
							this.setCode(this.preCurrencyCode)
						}
						this.procError(error)
					})
			},
		}
	}
</script>

<style lang="less" scoped>
	/deep/ .van-dialog {
		touch-action: pan-y;
	}
	#register {
		touch-action: pan-y;
		padding-bottom: 20px;
		.van-nav-bar {
			background-color: transparent;
		}
	}

	.main_area {
		overflow: hidden;
		position: relative;
		height: 100%;


		.logo_area {
			margin-top: 17px;
			margin-bottom: 20px;

			.header_logo {
				width: 37%;
				margin: 0 auto;
			}
		}

		.register_area {
			padding: 17px 24px 22px;
			background-image: url(/images/banner/ribbon.png);
			background-size: 102px 49px;
			background-repeat: no-repeat;
			background-position: left top;

			&.SG666 {
				background-image: none !important;
			}

			.card_container_warp {
				min-height: 300px;
				position: relative;
			}
		}

		.card_container {
			border-radius: 16px;
			box-shadow: 0px -2px 15px rgba(0, 0, 0, 0.1);
			padding: 16px 18px;
			background-color: #FFF;
			width: 85%;
			margin: auto;
			opacity: 0.8;

			&.SG666 {
				width: 100%;
				border-radius: none;
				box-shadow: none;
				opacity: 1;
			}

			.title {
				font-weight: 600;
				text-align: center;
				font-size: 17px;
				color: #404040;
				margin-bottom: 16px;
				position: relative;
				z-index: 1;
			}

			.cancel {
				font-weight: 600;
				font-size: 13px;
				position: absolute;
				right: 0;
				top: inherit;
			}

			.register-input {
				padding-top: 16px;

				.van-cell {
					background-color: transparent;
				}

				.register-password {
					margin-top: 22px;
				}

				.verification {
					margin-top: 22px;
					position: relative;

					.verification-img {
						position: absolute;
						top: 8px;
						right: 20px;
						width: 60px;
						height: 28px;
					}
				}

				.van-field {
					height: 44px;
					border: 1px #CCCCCC solid;
					border-radius: 20px;

					.van-field__left-icon {
						margin-right: 8px;
					}
				}
			}

			.register_nav {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					display: flex;
					align-items: center;
				}
			}
		}
	}

	.register-b {
		padding-top: 16px;
		height: 100%;

		.warp {
			height: 100%;
		}

		.van-cell {
			background-color: transparent;
		}

		.verification {
			position: relative;

			.verification-img {
				position: absolute;
				top: 8px;
				right: 20px;
				width: 60px;
				height: 28px;
			}
		}

		.van-field {
			height: 44px;
			border: 1px #CCCCCC solid;
			border-radius: 20px;
			margin-bottom: 12px;

			.van-field__left-icon {
				margin-right: 8px;
			}
		}
	}
	.regFields-item {
		position: relative;
	}
	.required {
		position: absolute;
		left: 7px;
		top: 7px;
		font-size: 16px;
        color: rgb(255, 23, 23);
    }

</style>
