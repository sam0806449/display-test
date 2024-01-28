<template>
    <div id="memberDetails">
        <EasyRefresh :userSelect="false" :bouncing="false">
            <van-cell-group class="memberDetails-top">
                <van-cell :title="$$t('memberName')" :value="memberInfo && memberInfo.memberName  || $t('common.unSet')"
                          size="large" is-link
                          @click="changeUrl('memberName')"/>
                <van-cell :title="$$t('tel')" :value="memberInfo && memberInfo.tel  || $t('common.unSet')" size="large"
                          is-link @click="changeUrl('tel')"/>
            </van-cell-group>

            <van-cell-group class="memberDetails-bt">
                <van-cell :title="$$t('wechat')" :value="memberInfo && memberInfo.wechat || $t('common.unSet')"
                          size="large" is-link
                          @click="changeUrl('wechat')"/>
                <van-cell :title="$$t('email')"
                          :value="getEmailText"
                          size="large" is-link
                          @click="changeUrl('email')"/>
                <van-cell :title="$$t('qq')" :value="memberInfo && memberInfo.qq || $t('common.unSet')" size="large"
                          is-link
                          @click="changeUrl('qq')"/>
				<van-cell title="Zalo" :value="memberInfo && memberInfo.zalo || $t('common.unSet')" size="large"
                          is-link
                          @click="changeUrl('zalo')"/>
				<van-cell title="Telegram" :value="memberInfo && memberInfo.telegram || $t('common.unSet')" size="large"
                          is-link
                          @click="changeUrl('telegram')"/>
				<van-cell title="Facebook" :value="memberInfo && memberInfo.faceBook || $t('common.unSet')" size="large"
                          is-link
                          @click="changeUrl('facebook')"/>
            </van-cell-group>
        </EasyRefresh>


        <van-dialog v-model="show" :title="title" show-cancel-button @confirm="changeInfo">
            <van-cell-group>
                <van-field v-model="fieldValue" :placeholder="$$t('fieldValueDesc')"/>
            </van-cell-group>
        </van-dialog>

        <van-dialog v-model="showTel" :title="title" show-cancel-button @confirm="changeTel">
            <van-cell-group>
                <van-field v-model="fieldValue" :placeholder="$$t('fieldValueDesc')">
                    <div slot="left-icon" @click="redirectRouter('searchCountry')">
                        <div class="flex align-items-center">
                            <div class="mr-1">{{'+' + getPhoneCode}}</div>
                            <van-icon name="arrow-down"/>
                        </div>
                    </div>
                </van-field>
            </van-cell-group>
        </van-dialog>

        <van-dialog v-model="showEmail" :title="`${$$t('update')}${$$t('email')}`" closeOnClickOverlay
                    :showConfirmButton="false" class="emailDialog">
            <div class="subtitle-1 mb-2">{{$$t('email')}}</div>
            <van-field v-model="eForm.email" :placeholder="$$t('fieldValueDesc')"/>

            <div class="subtitle-1 mb-2 mt-6">{{$$t('code')}}</div>
            <van-field v-model="eForm.code" :placeholder="$$t('fieldValueDesc')"/>


            <van-button @click="confirmButtonClick"
                        color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block
                        class="mt-10 mb-5">
                {{confirmButton? $$t('vCode'): $$t('getCode')}}
            </van-button>
        </van-dialog>
    </div>
</template>

<script>
import sessionContext from '@/mixins/sessionContext'
import countrys from '@/common/js/countryCode'

export default {
	name: 'MemberDetails',
	mixins: [sessionContext],

	data() {
		return {
			show: false,
			fieldValue: '',
			url: '',
			title: '',
			showEmail: false,
			showTel: false,
			confirmButton: false,
			eForm: {
				email: '',
				code: '',
				key: ''
			},
		}
	},

	computed: {
		getEmailText() {
			if (this.memberInfo && this.memberInfo.email) {
				if (this.siteConfig && this.siteConfig.isOpenEmailVerification) {
					if (this.memberInfo && this.memberInfo.isEmailVerified) {
						return this.memberInfo.email
					} else {
						return this.memberInfo.email + this.$$t('unV')
					}
				} else {
					return this.memberInfo.email || this.$t('common.unSet')
				}
			} else {
				return this.$t('common.unSet')
			}
		},

		getPhoneCode() {
			let e = this.culture.substring(5, 3)
			return this.$route.query.phone_code || countrys.getPhoneCode(e)
		}
	},

	methods: {
		changeUrl(f) {
			if (f === 'memberName') {
				this.url = '/api/Account/ModifiyMemName?memberName='
				this.title = this.$$t('memberName')
			}

			if (f === 'tel') {
				this.title = this.$$t('tel')
				this.showTel = true
				return
			}

			if (f === 'wechat') {
				this.url = '/api/Account/ModifiyMemWechat?wechat='
				this.title = this.$$t('wechat')
			}

			if (f === 'email') {
				if (this.memberInfo.isEmailVerified) {
					this.$info(this.$$t('kf'))
					return
				}
				if (this.siteConfig.isOpenEmailVerification) {
					this.showEmail = true
					return
				}

				this.url = '/api/Account/ModifiyMemEmail?email='
				this.title = this.$$t('email')
			}
			if (f === 'qq') {
				this.url = '/api/Account/ModifiyMemQq?qq='
				this.title = this.$$t('qq')
			}

			if (f === 'zalo') {
				this.url = '/api/Account/ModifiyField?fieldName=zalo&fieldValue='
				this.title = 'Zalo'
			}

			if (f === 'telegram') {
				this.url = '/api/Account/ModifiyField?fieldName=telegram&fieldValue='
				this.title = 'Telegram'
			}

			if (f === 'facebook') {
				this.url = '/api/Account/ModifiyField?fieldName=facebook&fieldValue='
				this.title = 'Facebook'
			}

			this.show = true
		},

		changeInfo() {
			if (this.url === '/api/Account/ModifiyMemName?memberName='){
				if (this.memberInfo.currencyCode === 'CNY') {
					if (this.fieldValue.length<2 || this.fieldValue.length > 15){
						this.$toast(`${this.$$t('memberName')}${this.$t('validate.incorrectLength')}(2-15)`)
						return
					}
				} else {
					if (this.fieldValue.length<4 || this.fieldValue.length > 30){
						this.$toast(`${this.$$t('memberName')}${this.$t('validate.incorrectLength')}(4-30)`)
						return
					}
					if (this.fieldValue[0] === ' ' || this.fieldValue.slice(-1) === ' ') {
						this.$toast(this.$t("validate.spaceMoreOne"));
						return;
					}
				}
			}
			if (this.fieldValue === null || this.fieldValue === '') {
				this.$toast(this.$t('common.noNull'))
				return
			}

			this.$post(this.url + this.fieldValue)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$toast(data.data)
					this.fieldValue = null
					this.getMemberInfo()
				})
				.catch(error => {
					this.fieldValue = null
					this.procError(error)
				})
		},

		changeTel() {
			if (this.fieldValue === null || this.fieldValue === '') {
				this.$toast(this.$t('common.noNull'))
				return
			}

			this.$post(`/api/Account/ModifiyMemTel?tel=${this.fieldValue}&telPrefix=${this.getPhoneCode}`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$toast(data.data)
					this.fieldValue = null
					this.getMemberInfo()
				})
				.catch(error => {
					this.fieldValue = null
					this.procError(error)
				})

		},

		getMemberInfo() {
			this.$post('/api/Account/GetUserInfo')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.$store.commit('setMemberInfo', d)
				})
				.catch(error => {
					this.procError(error)
				})
		},

		getEmailVerifyCode() {
			if (!this.eForm.email) {
				this.$info(this.$$t('emailDesc'))
				return
			}
			this.showProgress(true)
			this.$get('/api/Account/GetEmailVerifyCode?email=' + this.eForm.email)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.showProgress(false)
					this.eForm.key = data.data
					this.confirmButton = true
					this.$success(this.$$t('codeS'))
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		onModifiyMemEmail() {
			if (!this.eForm.code) {
				this.$info(this.$$t('codeDesc'))
				return
			}
			this.$post(`/api/Account/ModifiyMemEmail?email=${this.eForm.email}&code=${this.eForm.code}&key=${this.eForm.key}`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.getMemberInfo()
					sessionStorage.removeItem('SiteConfig')
					this.showEmail = false
					this.getSiteConfig()
					this.$success(data.data)
				})
				.catch(error => {
					this.showEmail = false
					this.procError(error)
				})
		},

		confirmButtonClick() {
			if (this.confirmButton) {
				this.onModifiyMemEmail()
			} else {
				this.getEmailVerifyCode()
			}
		},

		$$t(v) {
			return this.$t('memberDetails.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#memberDetails {
    height: 100%;
    text-align: left;

    .memberDetails-top {
        margin-top: 10px;
    }

    .memberDetails-bt {
        margin-top: 10px;
    }

    .emailDialog {

    }

    /deep/ .van-dialog__content {
        padding: 16px;

        .van-cell {
            border-radius: 5px;
            border: 1px rgb(231, 235, 238) solid;
        }
    }
}
</style>
