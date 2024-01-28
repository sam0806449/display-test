<template>
	<div id="exchangeMoney" class="background-white">
		<div class="pt-9">
			<div class="subtitle-3 px-4 mb-1">{{$$t('toMemberAccount')}}</div>
			<van-field v-model="transfer.toMemberAccount"
				:placeholder="`${$t('register.pLeft')}${$$t('toMemberAccount')}`" class="mb-1" />

			<div class="subtitle-3 px-4 mb-1 mt-4">{{$$t('transferMoney')}}</div>
			<van-field v-model="transfer.transferMoney" type="digit"
				:placeholder="`${$t('register.pLeft')}${$$t('transferMoney')}`" />

			<div class="subtitle-3 px-4 mb-1 mt-4">{{$$t('remark')}}</div>
			<van-field v-model="transfer.memberRemark" rows="2" type="textarea" maxlength="10" show-word-limit
				:placeholder="`${$t('register.pLeft')}${$$t('remark')}`" />
		</div>

		<div class="btn mt-10">
			<van-button color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block class="radius-2"
				@click="confirmClick">
				{{$$t('btn')}}
			</van-button>
		</div>


		<van-popup :close-on-click-overlay="false" closeable v-model="showPopup" class="drawPass" @close="hidePayPassword">
			<div class="subtitle-1 text-center py-4">{{$$t('popTitle')}}</div>
			<div class=" pt-3 pb-6">
				<van-password-input :value="transfer.payPassword" :length="4" :gutter="8" :focused="showPopup"
					@focus="showPwdKeyboard = true" />
			</div>
		</van-popup>

		<van-number-keyboard v-model="transfer.payPassword" :show="showPwdKeyboard" z-index="3006" theme="custom"
			:close-button-text="$t('common.complete')"
			@blur="showPwdKeyboard = false" :hide-on-click-outside="false" @close="submitTransfer" />
	</div>
</template>

<script>
	import sessionContext from '@/mixins/sessionContext'

	export default {
		name: 'ExchangeMoney',
		mixins: [sessionContext],

		data() {
			return {
				transfer: {
					toMemberAccount: null,
					transferMoney: null,
					memberRemark: null,
					payPassword: ''
				},
				showPopup: false,
				showPwdKeyboard: false
			}
		},
		
		watch: {
			'transfer.payPassword' (v) {
				this.transfer.payPassword = v.slice(0, 4)
			}
		},

		methods: {
			confirmClick() {
				if (Number(this.transfer.transferMoney) < 1) {
					this.$info(this.$$t('info_1'))
					return
				}

				if (!this.transfer.toMemberAccount || !this.transfer.memberRemark) {
					this.$info(this.$$t('info_2'))
					return
				}
				
				this.showPopup = true
				this.showPwdKeyboard = true
			},

			onTransferByMember() {
				this.showProgress()
				this.$post('/api/Account/TransferByMember', this.transfer)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.showProgress(false)
						this.$info(data.data)
						this.onClear()
						this.initMemberData()
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			submitTransfer() {
				if (this.transfer.payPassword.length < 4) {
					this.$toast(this.$t('withdraw.pwdToast'))
					return
				}
				
				let e = this.memberData && this.memberData.memberType
				if (Number(e) === 2) {
					this.$error(this.$$t('pwdError'))
					return
				}
				
				this.onTransferByMember()
			},

			onClear() {
				this.showPopup = false
				this.showPwdKeyboard = false
				this.transfer.toMemberAccount = null
				this.transfer.transferMoney = null
				this.transfer.memberRemark = null
				this.transfer.payPassword = ''
			},
			
			hidePayPassword () {
				this.showPopup = false
				this.showPwdKeyboard = false
				this.transfer.payPassword = ''
			},

			$$t(v) {
				return this.$t('exchangeMoney.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#exchangeMoney {
		height: 100%;
		text-align: left;

		.btn {
			padding: 0 16px 0 16px;

			.van-button__text {
				height: 22px;
				font-size: 16px;
				font-weight: bold;
				line-height: 1.38;
				color: #ffffff;
			}
		}

		.user_desc {
			height: 52px;
			background-color: rgb(245, 245, 249);
			color: rgb(153, 153, 153);
			display: table-cell;
			vertical-align: middle;
		}


		.drawPass {
			width: 295px;
			border-radius: 8px;
			background-color: #ffffff;

			.van-password-input {
				ul {
					li {
						border: solid 1px #e5e5e5;
					}
				}
			}
		}
	}
</style>
