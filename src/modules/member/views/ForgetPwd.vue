<template>
    <div id="forgetPwd">
        <div class="forgetPwd-wrapper px-4">
            <div class="forgetPwd-input">
                <van-field v-model="forgetPwdForm.memberAccount" maxlength="16" :border="false"
                           :placeholder="$$t('userPlaceholder')">
                    <van-icon name="images/account/login/user-name.png" size="20" color="#333333" slot="left-icon"/>
                </van-field>

                <van-field v-model="forgetPwdForm.password" maxlength="4" :border="false" class="forgetPwd-password"
                           :type="passwordType" :placeholder="$$t('WPwdPlaceholder')" @click-right-icon="changeType"
                           ref="password">
                    <van-icon name="images/account/login/password.png" size="20" color="#333333" slot="left-icon"/>
                    <van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
                              slot="right-icon"/>
                </van-field>

                <div class="verification">
                    <van-field v-model="forgetPwdForm.verifyCode" maxlength="4" type="digit" :border="false"
                               @focus.once="getVerification" @keyup.enter.native="handleForgetPwd"
                               :placeholder="$$t('verifyCodePlaceholder')">
                        <van-icon name="images/account/register/register-icon-verification-code.png" size="20"
                                  slot="left-icon"/>
                    </van-field>
                    <img :src="verifyCodeImg" class="verification-img" @click="getVerification">
                </div>
            </div>
            <van-button @click="handleForgetPwd" color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block class="mt-10">
                {{$$t('btn')}}
            </van-button>


            <div class="body-2 mt-5 text-center text-grey">{{$$t('desc_1')}}<span class="main-text" @click="linkOpen(siteConfig && siteConfig.kfUrl)">{{$$t('desc_2')}}</span>{{$$t('desc_3')}}</div>
        </div>
    </div>
</template>

<script>
import {validLoginUserName, validPayPwd, validVerifyCode} from '@/utils/validate'

export default {
	name: 'ForgetPwd',

	data() {
		return {
			forgetPwdForm: {
				memberAccount: null,
				password: null,
				verifyCode: null,
				verifyCodeKey: null
			},
			verifyCodeImg: 'images/account/vcode.png',
			passwordType: 'password'
		}
	},

	methods: {
		handleForgetPwd() {
			if (validLoginUserName(this.forgetPwdForm.memberAccount) && validPayPwd(this.forgetPwdForm.password) && validVerifyCode(this.forgetPwdForm.verifyCode)) {
				this.showProgress(true)
				this.$post('/api/Account/ForgetPassWord', this.forgetPwdForm)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.$toast(data.data)
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.getVerification()
						this.procError(error)
					})
			}
		},

		getVerification() {
			this.$post('/api/Account/GetVerifyImg')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.verifyCodeImg = 'data:image/png;base64,' + d.img
					this.forgetPwdForm.verifyCodeKey = d.key
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

		$$t(v) {
			return this.$t('forgetPwd.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#forgetPwd {
    width: 100%;
    height: 100%;
    text-align: left;
    background-color: white;

    .van-nav-bar {
        .van-nav-bar__text:active {
            background-color: transparent;
        }
    }

    .forgetPwd-wrapper {

        .decoration {
            height: 30px;
            font-size: 24px;
            font-weight: bold;
            line-height: 1.25;
            color: #333333;
            &::before {
                right: 0;
                left: 50px;
            }
        }

        .forgetPwd-input {
            margin-top: 12px;
            padding-top: 12px;
            .forgetPwd-password {
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
                border-bottom: 1px #CCCCCC solid;

                .van-field__left-icon {
                    margin-right: 8px;
                }
            }
        }

        .van-row {
            margin-top: 20px;

            .van-col {
                height: 20px;
                font-size: 14px;
                font-weight: 500;
                line-height: 1.43;
                color: #666666;
            }
        }

        .van-button {
            margin-top: 30px;
            height: 44px;
            border-radius: 5px;

            .van-button__text {
                font-size: 16px;
                font-weight: bold;
                line-height: 1.38;
                color: #ffffff;
            }
        }

        .forget-password {
            text-align: center;
            margin-top: 24px;
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            line-height: 1.43;
            color: #666666;
        }
    }
}
</style>
