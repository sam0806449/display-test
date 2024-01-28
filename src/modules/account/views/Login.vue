<template>
    <video-bg class="video-bg">
    <div id="login" class="main_area login_container">
        <van-nav-bar v-if="skgCodeKey !== 'SG666'" :border="false" @click-right="$router.push('/app/changeLanguage')"
                     @click-left="$router.push('/app/joint')">
            <template #right>
                <div>
                    <van-icon name="/images/account/login/language.png" size="24"/>
                    <span class="white-text ml-1">{{$$t('language')}}</span>
                </div>
            </template>

            <template #left>
                <div v-if="skgCode !== skyLotteryCode">
                    <van-icon name="/images/account/joint.png" size="24"/>
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
        <div class="card_container login_area" :class="skgCodeKey">
            <div class="title swap">{{$$t('title')}}
                <span class="cancel main-text" @click="redirectRouter('/register')">{{$$t('register')}}</span>
            </div>

            <div class="login-input">
                <van-field v-model="loginForm.memberAccount" maxlength="16" :border="false" type="url" clearable
                           :placeholder="$$t('userPlaceholder')">
                    <van-icon name="images/account/login/user-name.png" size="20" color="#333333" slot="left-icon"/>
                </van-field>

                <van-field v-model="loginForm.password" maxlength="16" :border="false" class="login-password" clearable
                           :type="passwordType" :placeholder="$$t('pwdPlaceholder')" @click-right-icon="changeType"
                           ref="password">
                    <van-icon name="images/account/login/password.png" size="20" color="#333333" slot="left-icon"/>
                    <van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
                              slot="right-icon"/>
                </van-field>

                <div class="verification" v-if="Number(validatorType) !== 1">
                    <van-field v-model="loginForm.verifyCode" maxlength="4" type="digit" :border="false"
                               @focus.once="getVerification" @keyup.enter.native="handleLogin" clearable
                               :placeholder="$$t('verifyCodePlaceholder')">
                        <van-icon name="images/account/register/register-icon-verification-code.png" size="20"
                                  slot="left-icon"/>
                    </van-field>
                    <img :src="verifyCodeImg" class="verification-img" @click="getVerification">
                </div>
            </div>

            <div class="login_nav mt-4">
                <div class="text-left ml-2">
                    <van-checkbox v-model="rememberPwd" icon-size="20px">{{$$t('remember')}}</van-checkbox>
                </div>

                <div class="text-right main-text mr-2" @click="redirectRouter('/app/forgetPwd')">
                    {{$$t('forgetPwd')}}
                </div>
            </div>

            <div class="btn mt-3">
                <van-button type="info" class="radius-2" block @click="loginClick">{{$$t('btn')}}</van-button>
            </div>

            <div class="main-text body-2 mt-4 flex justify-content-center">
                <div @click="goDashboard">{{$$t('goHome')}}</div>
				<span class="text-grey_1 px-2 subtitle-2" v-if="siteConfig && siteConfig.allowFreeMember">|</span>
				<div class="text-grey" @click="redirectRouter('/example')" v-if="siteConfig && siteConfig.allowFreeMember">{{$t('example.tryGame')}}</div>
            </div>
        </div>


        <van-dialog v-model="showVerification" class="pa-5" :closeOnClickOverlay="true"
                    :showConfirmButton="false">
            <verification ref="dragVerify"
                          :imgsrc="img"
                          :smallsrc="smallImg"
                          :topy="topy"
                          :array="array"
                          handler-bg="#5b7ffb"
                          handlerIcon="van-icon-arrow van-icon body-2 white-text"
                          successIcon="van-icon-passed van-icon body-2 white-text"
                          :isPassing.sync="isPassing"
                          :width="width"
                          :height="height"
                          :codekey="codekey"
                          :showRefresh="true"
                          :text="$$t('verificationText')"
                          :successText="$$t('vSuccessText')"
                          @refresh="refreshImg"
                          @passcallback="onPass"
                          refreshIcon="van-icon-replay van-icon white-text"
            ></verification>
        </van-dialog>
    </div>
  </video-bg>
</template>

<script>
import {validLoginUserName, validPwd, validVerifyCode} from '@/utils/validate'
import {setTokenFromCookie} from '@/utils/auth'
import sessionContext from '@/mixins/sessionContext'
import Verification from '@/components/Verification'
import VideoBg from '@/components/CanvasVideo'

export default {
	name: 'Login',
	mixins: [sessionContext],

	components: {
		Verification,
        VideoBg
	},

	data: () => ({
		loginForm: {
			memberAccount: null,
			password: null,
			verifyCode: null
		},
		showVerification: false,
		verifyCodeImg: 'images/account/vcode.png',
		passwordType: 'password',
		rememberPwd: true,
		img: '',
		smallImg: '',
		array: [],
		topy: 0,
		width: 0,
		height: 0,
		codekey: '',
		isPassing: false
	}),

	computed: {
		validatorType() {
			return this.siteConfig && this.siteConfig.validatorType
		},
	},

	created() {
        const prv_account = localStorage.getItem('remember-account')
        if ( prv_account && Object.keys(prv_account).length ) {
            const parse = JSON.parse(prv_account)
            this.loginForm.memberAccount = parse['memberAccount']
            this.loginForm.password = parse['password']
        }
	},

	methods: {
        setPrvAccount(){
              const data = {
               memberAccount: this.loginForm.memberAccount,
               password: this.loginForm.password
            }
            localStorage.setItem('remember-account', JSON.stringify(data))
        },
		loginClick() {
			if (Number(this.validatorType) === 1) {
				if (validLoginUserName(this.loginForm.memberAccount) && validPwd(this.loginForm.password)) this.getCreateSliderCode()
			} else {
				this.handleLogin()
			}
            if (this.rememberPwd) this.setPrvAccount()
		},

		handleLogin() {
			if (validLoginUserName(this.loginForm.memberAccount) && validPwd(this.loginForm.password) && validVerifyCode(this.loginForm.verifyCode)) {
				this.showProgress(true)
				this.$post('/api/Account/Login', this.loginForm)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
                        this.removeSession();
						let d = data.data;
						setTokenFromCookie(d.token);
                        this.$store.commit("setToken", d.token);
						this.initSystem();
						this.$sessionSet('tabbar', 'dashboard');
						this.$sessionSet('Home-Popup', false);
						this.$success(this.$$t('success'));
						this.$router.push('/app/dashboard');
					})
					.catch(error => {
						this.showProgress(false)
						this.loginForm.verifyCode = null
						this.getVerification()
						this.procError(error)
					})
			}
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
					this.showVerification = true
				})
				.catch(error => {
					this.procError(error)
				})
		},

		getVerification() {
			this.$post('/api/Account/GetVerifyImg')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.verifyCodeImg = 'data:image/png;base64,' + d.img
					this.loginForm.verifyCodeKey = d.key
				})
				.catch(error => {
					this.procError(error)
				})
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

		onPass() {
			this.showVerification = false
			this.showProgress(true)
			this.$post('/api/Account/Login', this.loginForm)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
                    this.removeSession();
					let d = data.data;
					setTokenFromCookie(d.token);
                    this.$store.commit("setToken", d.token);
					this.initSystem();
					this.$sessionSet('tabbar', 'dashboard');
					this.$sessionSet('Home-Popup', false);
					this.$success(this.$$t('success'));
					this.$router.push('/app/dashboard');
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		refreshImg() {
			this.getCreateSliderCode()
		},

		goDashboard() {
			this.$sessionSet('tabbar', 'dashboard')
			this.redirectRouter('/app/dashboard')
		},

		$$t(v) {
			return this.$t('login.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#login {
    z-index: 1000;
    touch-action: pan-y;
    .van-nav-bar {
        background-color: transparent;
    }
}

/deep/.video-bg {
  z-index: 1;
}

.main_area {
    margin-bottom: 0;
    overflow: hidden;
    height: 100%;
    position: relative;


    .logo_area {
        margin-top: 17px;
        margin-bottom: 20px;

        .header_logo {
            width: 37%;
            margin: 0 auto;
        }
    }

    .register_area, .login_area {
        padding: 17px 24px 22px;
        background-image: url(/images/banner/ribbon.png);
        background-size: 102px 49px;
        background-repeat: no-repeat;
        background-position: left top;

        .register_area-warp {
            height: 400px;
        }
    }

    .card_container {
        border-radius: 16px;
        box-shadow: 0px -2px 15px rgba(0, 0, 0, 0.1);
        padding: 16px 32px;
        background-color: #FFF;
        width: 85%;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        opacity: 0.8;

        &.SG666 {
            width: 100%;
            border-radius: none;
            box-shadow: none;
            opacity: 1;

            &.login_area {
                background-image: none !important;
            }
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

        .login-input {
            padding-top: 16px;

            .van-cell {
                background-color: transparent;
            }

            .login-password {
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

        .login_nav {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
                display: flex;
                align-items: center;
            }
        }
    }
	
	/deep/ .van-dialog {
		width: unset;
	}
}
</style>
