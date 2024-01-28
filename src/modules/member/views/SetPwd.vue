<template>
	<div id="setPwd">
		<div class="setPwd-wap">
			<van-tabs v-model="activeTab" :border="true" title-active-color="rgb(96, 142, 255)" color="rgb(77, 140, 252)">
				<van-tab :title="$$t('loginPwd')">
					<van-field v-model="oldPassword" :border="false" :label="$$t('oldPwd')" maxlength="16"
						:placeholder="$$t('oldPwdP')" @click-right-icon="changeType" :type="passwordType">
						<van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
							slot="right-icon" />
					</van-field>

					<van-field v-model="newPassword" :border="false" :label="$$t('newPwd')" maxlength="16"
						:placeholder="$$t('newPwdP')" @click-right-icon="changeType" :type="passwordType">
						<van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
							slot="right-icon" />
					</van-field>

					<van-field v-model="confirmPassword" :border="false" :label="$$t('confirmPwd')" maxlength="16"
						:placeholder="$$t('confirmPwdP')" @click-right-icon="changeType" :type="passwordType">
						<van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
							slot="right-icon" />
					</van-field>
				</van-tab>

				<van-tab :title="$$t('WithdrawalsPwd')">
					<van-field v-model="oldPassword" :border="false" :label="$$t('oldPwd')"
						:placeholder="$$t('oldPwdP')" @click-right-icon="changeType" :maxlength="4"
						:type="passwordType">
						<van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
							slot="right-icon" />
					</van-field>

					<van-field v-model="newPassword" :border="false" :label="$$t('newPwd')"
						:placeholder="$$t('newPwdP')" @click-right-icon="changeType" maxlength="4" :type="passwordType">
						<van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
							slot="right-icon" />
					</van-field>

					<van-field v-model="confirmPassword" :border="false" :label="$$t('confirmPwd')"
						:placeholder="$$t('confirmPwdP')" @click-right-icon="changeType" maxlength="4"
						:type="passwordType">
						<van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
							slot="right-icon" />
					</van-field>
				</van-tab>
			</van-tabs>

		</div>

		<div class="loginPwd-btn">
			<van-button block @click="changePwd"
				color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))">
				{{$$t('confirm')}}
			</van-button>
		</div>

		<div class="retrieve-pwd">{{activeTab===0 ? '' : $$t('retrieveWithdrawalPwd')}}</div>
	</div>
</template>

<script>
	export default {
		name: 'SetPwd',

		data() {
			return {
				activeTab: 0,
				oldPassword: '',
				newPassword: '',
				confirmPassword: '',
				passwordType: 'password',
			}
		},

		watch: {
			activeTab() {
				this.oldPassword = null
				this.newPassword = null
				this.confirmPassword = null
				this.passwordType = 'password'
			}
		},

		methods: {
			changePwd() {
				let url = ''
				if (this.activeTab === 0) url = '/api/Account/ModifiyLoginPassword'
				if (this.activeTab === 1) url = '/api/Account/ModifiyPaymentPassword'
				this.$post(url, {
						oldPassword: this.oldPassword,
						newPassword: this.newPassword,
						confirmPassword: this.confirmPassword
					})
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.$toast(data.data)
						this.oldPassword = ''
						this.newPassword = ''
						this.confirmPassword = ''
					})
					.catch(error => {
						this.procError(error)
					})
			},

			changeType() {
				if (this.passwordType === 'password') {
					if (this.activeTab === 1) {
						this.passwordType = 'digit'
					} else {
						this.passwordType = ''
					}
				} else {
					this.passwordType = 'password'
				}
			},

			redirectRouter() {
				if (this.activeTab !== 0) return
				this.$router.push('/forgetPwd')
			},

			formatter(v) {
				// eslint-disable-next-line no-useless-escape
				return v.replace(/[^\d]/g, '')
			},

			$$t(v) {
				return this.$t('setPwd.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#setPwd {
		height: 100%;

		.setPwd-wap {
			padding: 0 16px;
			margin-top: 10px;
			background-color: white;

			/deep/ .van-tabs__wrap {
				height: 56px;

				.van-tab__text {
					font-size: 16px;
					font-weight: 600;
					margin-top: 10px;
				}
			}

			/deep/ .van-tabs__content {
				text-align: left;

				.van-cell {
					height: 56px;
					padding: 17px 0;

					.van-cell__title {
						font-size: 16px;
						font-weight: 600;
						width: unset;
					}
				}
			}
		}

		.van-field {
			height: 56px;
			border-bottom: 1px #CCCCCC solid;
		}

		.van-field:nth-child(3) {
			border-bottom: none;
		}

		.loginPwd-btn {
			padding: 0 16px;

			.van-button {
				height: 44px;
				margin-top: 16px;
				border-radius: 5px;
				background-size: 100%;

				.van-button__text {
					font-size: 16px;
					font-weight: bold;
					color: #ffffff;
				}
			}
		}

		.retrieve-pwd {
			margin-top: 20px;
			font-size: 14px;
			color: #999999;
			padding: 0 16px;
		}
	}
</style>
