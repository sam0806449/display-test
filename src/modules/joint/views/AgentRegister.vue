<template>
    <div id="agentRegister">
        <scroller>
            <div class="px-4 py-3 text-left">
                <div class="background-white pt-4 pb-5 radius-2 px-6">
                    <div class="subtitle-3 mb-1"><span class="required">*</span>{{$$t('memberName')}}</div>
                    <van-field v-model="regForm.memberName" :border="false" :placeholder="`${$$t('pLeft')}${$$t('memberName')}`"/>

                    <div class="subtitle-3 mt-3 mb-1"><span class="required">*</span>{{$$t('memberAccount')}}</div>
                    <van-field v-model="regForm.memberAccount" :border="false" type="url" :placeholder="`${$$t('pLeft')}${$$t('memberAccount')}`"/>

                    <div class="subtitle-3 mt-3 mb-1"><span class="required">*</span>{{$$t('password')}}</div>
                    <van-field v-model="regForm.password" :border="false"
                               :placeholder="`${$$t('pLeft')}${$$t('password')}`"
                               :type="passwordType" @click-right-icon="changeType" ref="password">
                        <van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
                                  slot="right-icon"/>
                    </van-field>

                    <div class="subtitle-3 mt-3 mb-1"><span class="required">*</span>{{$$t('confirmPassword')}}</div>
                    <van-field v-model="regForm.confirmPassword" :border="false"
                               :placeholder="`${$$t('pLeft')}${$$t('confirmPassword')}`"
                               :type="passwordType" @click-right-icon="changeType">
                        <van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
                                  slot="right-icon"/>
                    </van-field>

                    <template v-if="phoneRegFields && phoneRegFields.isShow">
						<div class="subtitle-3 mt-3 mb-1"><span class="required">{{phoneRegFields.isRequired ? '*' : ''}}</span>{{ phoneRegFields.cnName }}</div>
						<van-field v-model="regForm.tel" :border="false" :placeholder="`${$$t('pLeft')}${phoneRegFields.cnName}`">
							<div slot="left-icon" @click="redirectRouter('/app/joint/searchCountry')">
								<div class="flex align-items-center">
									<div class="mr-1">{{'+' + phoneCod}}</div><van-icon name="arrow-down" />
								</div>
							</div>
						</van-field>
					</template>

                    <template v-if="emailRegFields && emailRegFields.isShow">
						<div class="subtitle-3 mt-3 mb-1"><span class="required">{{emailRegFields.isRequired ? '*' : ''}}</span>{{ emailRegFields.cnName }}</div>
						<van-field v-model="regForm.email" :border="false" :placeholder="`${$$t('pLeft')}${emailRegFields.cnName}`"/>
					</template>

                    <div class="subtitle-3 mt-3 mb-1"><span class="required">*</span>{{$$t('currency')}}</div>
                    <van-field
                            readonly
                            clickable right-icon="arrow"
                            :value="currency"
                            @click="showCurrency = true"
                    />

                    <div class="subtitle-3 mt-3 mb-1"><span class="required">*</span>{{$$t('bankName')}}</div>
                    <van-field v-model="regForm.bankName" :border="false"
                               right-icon="arrow"
                               readonly clickable
                               :placeholder="`${$$t('pLeft')}${$$t('bankName')}`"
                               @click="showBanks=true"/>

                    <div class="subtitle-3 mt-3 mb-1"><span class="required">*</span>{{$$t('bankAccount')}}</div>
                    <van-field v-model="regForm.bankAccount" :border="false"  :placeholder="`${$$t('pLeft')}${$$t('bankAccount')}`"/>

                    <div class="subtitle-3 mt-3 mb-1"><span class="required">*</span>{{$$t('bankAddress')}}</div>
                    <van-field v-model="regForm.bankAddress" :border="false" :placeholder="`${$$t('pLeft')}${$$t('bankAddress')}`"/>

                    <template v-for="(f, index) in filterRegFields">
                        <div :key="index" v-show="f.isShow">
                            <div class="subtitle-3 mt-3"><span class="required">{{f.isRequired ? '*' : ''}}</span>
                                {{f.cnName}}
                            </div>
                            <van-field v-model="regForm[f.fieldName]" :border="false"
                                       maxlength="30"
                                       :placeholder="`${$$t('pLeft')}${f.cnName}`"
                            />
                        </div>
                    </template>


                    <div class="verification mt-5 mb-1">
                        <div class="subtitle-3 mt-3"><span class="required">*</span>{{$$t('verifyCode')}}</div>
                        <van-field v-model="regForm.verifyCode" :border="false" type="digit" maxlength="4"
                                   @focus.once="getVerification"
                                   :placeholder="`${$$t('pLeft')}${$$t('verifyCode')}`" @click-right-icon="getVerification">
                            <van-image slot="right-icon" :src="verifyCodeImg" width="60" height="30"/>
                        </van-field>
                    </div>


                    <div class="subtitle-3 mt-3 mb-1"><span class="required">*</span>{{$$t('safetyPassword')}}</div>
                    <van-password-input
                            :value="regForm.safetyPassword"
                            :length="4"
                            :gutter="12"
                            :focused="showKeyboard"
                            @focus="showKeyboard = true"
                    />

                    <div class="mt-16">
                        <van-button type="info" block class="radius-2" @click="registerClick">{{$$t('btn')}}
                        </van-button>
                    </div>
                </div>
            </div>
        </scroller>

        <van-popup v-model="showBanks" safe-area-inset-bottom round position="bottom">
            <van-picker
                    show-toolbar
                    :columns="bankNames"
                    @cancel="showBanks = false"
                    @confirm="onConfirmBanks"
            />
        </van-popup>

        <van-number-keyboard
                v-model="regForm.safetyPassword"
                :maxlength="4"
                :show="showKeyboard"
                @blur="showKeyboard = false"
        />

        <van-popup v-model="showCurrency" safe-area-inset-bottom position="bottom">
            <van-picker
                    show-toolbar
                    value-key="name"
                    :columns="currencys"
                    @cancel="showCurrency = false"
                    @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
import {validUserName, validPwd, validConfirmPwd, validVerifyCode, validCardNo} from '@/utils/validate'
import countrys from '@/common/js/countryCode'

export default {
	name: 'AgentRegister',

	data: () => ({
		verifyCodeImg: 'images/account/vcode.png',
		regFields: [],
		passwordType: 'password',
		currencys: [],
		currency: '',
		bankNames: [],
		showCurrency: false,
		showBanks: false,
		showKeyboard: false,
		regForm: {
			memberAccount: '',
			memberName: '',
			tel: '',
			email: '',
			qq: '',
			wechat: '',
			facebook: '',
			whatsapp: '',
			bankAccount: '',
			bankName: '',
			bankAddress: '',
			safetyPassword: '',
			password: '',
			confirmPassword: '',
			verifyCodeKey: '',
			verifyCode: '',
			currencyCode: '',
			currencySymbol: '',
			TelPrefix: ''
		},
		phoneCod: ''
	}),

	computed: {
		filterRegFields() {
			return this.regFields.filter((item) => !['phone', 'email'].includes(item.fieldName));
		},
		phoneRegFields() {
			return this.regFields.filter((item) => item.fieldName === 'phone')[0];
		},
		emailRegFields() {
			return this.regFields.filter((item) => item.fieldName === 'email')[0];
		}
	},

	watch: {
		'regForm.currencyCode'(v) {
			this.onLoadBanks(v)
		}
	},

	created() {
		this.getCurrency()
		this.getRegisterFields()
	},

	methods: {
		handleValid() {
			return this.validOther(this.regForm.memberName, true, 'memberName')
			&& validUserName(this.regForm.memberAccount)
			&& validPwd(this.regForm.password)
			&& validConfirmPwd(this.regForm.password, this.regForm.confirmPassword)
			&& this.validOther(this.regForm.tel, this.phoneRegFields.isShow && this.phoneRegFields.isRequired, 'tel')
			&& this.validOther(this.regForm.email, this.emailRegFields.isShow && this.emailRegFields.isRequired, 'email')
			&& validCardNo(this.regForm.bankAccount)
			&& this.validOther(this.regForm.bankAddress, true, 'bankAddress')
			&& this.validOtherRegFields()
			&& validVerifyCode(this.regForm.verifyCode)
			&& this.validOther(this.regForm.safetyPassword, true, 'safetyPassword')
		},


		validOther(value, isRequired, type) {
			if (!isRequired) {
				return true;
			}

			if (value === null || value === '') {
				if (['tel', 'email', 'memberName', 'bankAddress', 'safetyPassword'].includes(type)) {
					this.$toast(`${this.$$t(type)}${this.$t('common.noNull')}`);
				} else {
					this.$toast(`${type}${this.$t('common.noNull')}`);
				}
				
				return false;
			}

			if (type === 'safetyPassword' && value.length < 4) {
				this.$toast(`${this.$$t(type)}${this.$t('validate.incorrectLength')}`);
				return false;
			}

			return true;
		},

		validOtherRegFields() {
			return !this.filterRegFields.some((item) => {
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

		registerClick() {
			if (this.handleValid()) {
				this.showProgress()
				this.regForm.TelPrefix = this.phoneCod
				this.$post('/api/Agent/Register', this.regForm)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.showProgress(false)
						this.$success(data.data)
					})
					.catch(error => {
						this.showProgress(false)
						this.regForm.verifyCode = null
						this.getVerification()
						this.procError(error)
					})
			}
		},

		onLoadBanks(v) {
			this.$post('/api/Withdraw/GetAllCustomBank?currencyCode=' + v)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					if (d.length <= 0) return
					this.bankNames = d.map(e => {
						return e.bankName
					})
					this.regForm.bankName = this.bankNames[0]
				})
				.catch(error => {
					this.procError(error)
				})
		},

		getRegisterFields() {
			this.$post('/api/Agent/GetSystemAgentSetting')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.regFields = d.registerFields
				})
				.catch(error => {
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
					this.showProgress(false)
					let d = data.data
					this.verifyCodeImg = 'data:image/png;base64,' + d.img
					this.regForm.verifyCodeKey = d.key
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		getCurrency() {
			this.$post('/api/Account/GetCurrency')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.currencys = d
					let v = d.filter(e => e.isDefault === true)
					let e = this.$route.query.countryCode || v[0] && v[0].code
					if (e) this.setCode(e)
				})
				.catch(error => {
					this.procError(error)
				})
		},

		setCode(v) {
			let e = this.currencys.filter(e => e.code === v)[0]
			this.regForm.currencyCode = e.code;
			this.regForm.currencySymbol = e.symbol
			this.currency = e.name
			let code = e.cultureCode.substring(5, 3)
			this.phoneCod = countrys.getPhoneCode(code)
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
			this.currency = v.name
			let e = v.cultureCode.substring(5, 3)
			this.phoneCod = countrys.getPhoneCode(e)
			this.showCurrency = false;
		},

		onConfirmBanks(v) {
			if (this.showBanks) {
				this.regForm.bankName = v
				this.showBanks = false
			}
		},

		$$t(v) {
			return this.$t('agentRegister.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#agentRegister {
    .van-field {
        margin-top: 4px;
        border-radius: 4px;
        background-color: rgb(242, 242, 242);
    }

    .verification {
        .van-field {
            padding: 4px 16px;
        }

        /deep/ .van-field__right-icon {
            padding-top: 3px;
        }
    }

    .required {
        color: rgb(255, 23, 23);
    }

    .van-password-input {
        margin: 0;

        li {
            background-color: rgb(242, 242, 242);
        }
    }
}
</style>
