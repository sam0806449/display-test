<!--提现-->
<template>
    <div id="withdraw">
        <div class="my-3 px-3">
            <van-row gutter="16" type="flex" justify="space-between">
                <van-col span="12">
                    <van-button
                            :color="type==='bank' ? 'linear-gradient(to right, rgb(117, 162, 255), rgb(70, 132, 255))' : null"
                            block
                            class="radius-1" @click="changeType('bank')">
                        {{$$t('btn_1')}}
                    </van-button>
                </van-col>
                <van-col span="12">
                    <van-button 
                            v-if="skgCode !== skyLotteryCode"
                            class="radius-1"
                            :color="type==='virtual' ? 'linear-gradient(to right, rgb(117, 162, 255), rgb(70, 132, 255))' : null"
                            block
                            @click="changeType('virtual')">
                        {{$$t('btn_2')}}
                    </van-button>
                </van-col>
            </van-row>
        </div>

        <div class="withdraw-warp">
            <div v-show="type==='bank'" class="bank">
                <scroller>
                    <div class="pb-3">
                        <div class="background-white bank-warp">
                            <div class="flex space-between px-4 py-2">
                                <div class="subtitle-3">{{$$t('amount')}}</div>
                                <div class="right"
                                     v-if="(Number(withdrawInfo && withdrawInfo.minWithdrawMoney) ===0) && (Number(withdrawInfo && withdrawInfo.maxWithdrawMoney) ===0)">
                                    {{$$t('unlimited')}}
                                </div>
                                <div class="right" v-else>（{{$$t('moneyDesc')}}{{currencySymbol}}{{withdrawInfo &&
                                    withdrawInfo.minWithdrawMoney}}{{currencyDenomination}}--{{currencySymbol}}{{withdrawInfo && withdrawInfo.maxWithdrawMoney}}）{{currencyDenomination}}
                                </div>
                            </div>

                            <div class="virtual-card">
                                <van-field v-model="money"
                                           :type="(withdrawInfo && withdrawInfo.isIntegerMoney) ? 'digit' : 'number'"
                                           @touchstart.native.stop="showKeyboard = true" readonly
                                >
                                    <span slot="left-icon" class="money-number">{{currencySymbol}}</span>
                                    <div slot="right-icon" class="caption main-text">
                                        <div>{{currencyDenomination}}</div>
                                        <div class="px-3" @click="money=withdrawInfo.balance.toString()">{{$$t('all')}}</div>
                                    </div>
                                </van-field>
                            </div>
                            <van-divider class="ma-0 px-4"/>

                            <div class="px-4 body-2 main-text mt-2">{{$$t('balance')}}{{currencySymbol}}{{withdrawInfo
                                && withdrawInfo.balance}}{{currencyDenomination}}
                            </div>

                            <div class="mt-4">
                                <van-field :label="$$t('counterFee_c')"
                                           :value="`${currencySymbol}${counterFee}${currencyDenomination}`" disabled
                                           label-class="label_title van-ellipsis"
                                           class="v_main_color"/>
                                <van-field :label="$$t('arriveMoney')"
                                           :value="`${currencySymbol}${money}${currencyDenomination}`" disabled
                                           label-class="label_title van-ellipsis"
                                           class="v_black"/>
                                <van-field :label="$$t('_4')"
                                           :value="`${currencySymbol}${withdrawInfo && withdrawInfo.dml}${currencyDenomination}`" disabled
                                           label-class="label_title van-ellipsis"
                                           class="v_black"/>

                            </div>
                        </div>

                        <div class="background-white mt-3 pa-4">
                            <div class="subtitle-3 mb-4">{{$$t('banLists')}}</div>

                            <van-radio-group v-model="radio">
                                <van-cell-group :border="false">
                                    <template v-for="(item, index) in cardItems">
                                        <van-cell clickable @click="changeRadio(item)" :key="index">
                                            <template #right-icon>
                                                <van-radio :name="item.objId"/>
                                            </template>

                                            <template #title>
                                                <div class="subtitle-4">{{item.payeeName}} <span class="subtitle-1">（{{item.bankName}}）</span>
                                                </div>
                                                <div class="text-grey subtitle-1 mt-1">{{ handleToSecretString(item.bankCardNumber)}}</div>
                                            </template>
                                        </van-cell>
                                    </template>
                                </van-cell-group>
                            </van-radio-group>
                            <van-divider class="ma-0"/>
                            <div class="main-text text-center subtitle-1 mt-4 pb-1" @click="redirectRouter('bank/add')">
                                + {{$$t('addBank')}}
                            </div>
                        </div>

                        <div class="mt-5 px-4">
                            <van-button color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block
                                        class="radius-2" @click="showWithdraw">
                                {{$$t('btn')}}
                            </van-button>
                        </div>
                    </div>
                </scroller>
            </div>

            <div v-show="type==='virtual'" class="virtual">
                <scroller>
                    <div class="pb-3">
                        <div class="background-white virtual-warp">
                            <div class="subtitle-3 px-4 py-2">{{$$t('amount')}}</div>

                            <div class="virtual-card">
                                <van-field v-model="money"
                                           :type="(withdrawInfo && withdrawInfo.isIntegerMoney) ? 'digit' : 'number'"
                                           @touchstart.native.stop="showKeyboard = true" readonly
                                >
                                    <span slot="left-icon" class="money-number">{{currencySymbol}}</span>
                                    <div slot="right-icon" class="caption main-text">
                                        <div>{{currencyDenomination}}</div>
                                        <div class="px-3"  @click="money=withdrawInfo.balance.toString()">{{$$t('all')}}</div>
                                    </div>
                                </van-field>
                            </div>
                            <van-divider class="ma-0 px-4"/>

                            <div class="px-4 body-2 main-text mt-2">{{$$t('balance')}}{{currencySymbol}}{{withdrawInfo
                                && withdrawInfo.balance}}{{currencyDenomination}}
                            </div>

                            <div class="mt-4">
                                <van-field :label="$$t('counterFee_c')"
                                           :value="`${currencySymbol}${counterFee}${currencyDenomination}`" disabled
                                           label-class="label_title van-ellipsis"
                                           class="v_main_color"/>
                                <van-field :label="$$t('exchangeRate')"
                                           :value="`1${virtualName}≈${exchangeRate}${memberData && memberData.currencyCode}`"
                                           disabled label-class="label_title van-ellipsis"
                                           class="v_main_color"/>
                                <van-field :label="`${$$t('arrive')}≈`" :value="`${getVirtualMoney}${virtualName}`"
                                           disabled
                                           label-class="label_title" class="v_black"/>
                                <van-field :label="$$t('_4')"
                                           :value="`${currencySymbol}${withdrawInfo && withdrawInfo.dml}${currencyDenomination}`"
                                           disabled
                                           label-class="label_title" class="v_black"/>
                            </div>
                        </div>

                        <div class="background-white mt-3 pa-4">
                            <div class="subtitle-3 mb-4">{{$$t('address_c')}}</div>

                            <van-radio-group v-model="radio">
                                <van-cell-group :border="false">
                                    <template v-for="(item, index) in cardItems">
                                        <van-cell clickable @click="changeRadio(item)" :key="index">
                                            <template #right-icon>
                                                <van-radio :name="item.objId"/>
                                            </template>

                                            <template #title>
                                                <div class="subtitle-4">{{item.payeeName}} <span class="subtitle-1">（{{item.bankName}}）</span>
                                                </div>
                                                <div class="text-grey subtitle-1 mt-1">{{handleToSecretString(item.bankCardNumber)}}</div>
                                            </template>
                                        </van-cell>
                                    </template>
                                </van-cell-group>
                            </van-radio-group>

                            <van-divider class="ma-0"/>

                            <div class="main-text text-center subtitle-1 mt-4 pb-1"
                                 @click="redirectRouter('virtual/add')">
                                + {{$$t('add')}}
                            </div>
                        </div>

                        <div class="mt-5 px-4">
                            <van-button color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block
                                        class="radius-2" @click="showWithdraw">
                                {{$$t('btn')}}
                            </van-button>
                        </div>
                    </div>
                </scroller>
            </div>
        </div>

        <van-number-keyboard
                v-model="money"
                :show="showKeyboard"
                :maxlength="10"
                @blur="hideShowMoneyKeyboard"
                :close-button-text="$t('common.complete')"
                :extra-key="(withdrawInfo && withdrawInfo.isIntegerMoney) ? '' : '.'"
                theme="custom"
        />

        <van-popup :close-on-click-overlay="false" v-model="showPopup" class="drawPass">
            <div class="title">
                <div>{{$$t('pwdDesc')}}</div>
                <div class="icon">
                    <van-icon name="cross" size="20" @click="closePopup"/>
                </div>
            </div>
            <div class="title-2">{{$$t('actually')}}</div>
            <div class="center align-items-center">
                <span class="money-number">{{currencySymbol}}</span>
                <div class="text">{{money}}{{currencyDenomination}}</div>
            </div>
            <van-divider style="margin: 0; padding: 0 15px; margin-top: 11.5px"/>
            <div class="desc">
                <div class="desc-title">{{$$t('counterFee')}}</div>
                <div class="desc-number">{{currencySymbol}}{{counterFee}}{{currencyDenomination}}</div>
            </div>

            <van-password-input
                    :value="drawPass"
                    :length="4"
                    :gutter="8"
                    :focused="showPopup"
                    @focus="showPwdKeyboard = true"
            />
        </van-popup>

        <van-number-keyboard
                :show="showPwdKeyboard"
                z-index="3006"
                theme="custom"
                :close-button-text="$t('common.complete')"
                @input="onInput"
                @delete="onDelete"
                @blur="showPwdKeyboard = false"
                :hide-on-click-outside="false"
                @close="submitWithdraw"
        />
    </div>
</template>

<script>
import sessionContext from '@/mixins/sessionContext'

export default {
	name: 'Withdraw',
  mixins: [sessionContext],

	data() {
		return {
			withdrawInfo: null,
			money: '1',
			counterFee: 0,
			drawPass: '',
			showKeyboard: false,
			showPwdKeyboard: false,
			showPopup: false,
			cards: [],
			type: 'bank',
			radio: '',
			exchangeRate: 0,
			virtualName: ''
		}
	},

	created() {
		this.onLoadWithdrawInfo()
	},

	computed: {
		cardItems() {
			if (this.type === 'bank') return this.cards.filter(e => e.currencyType === 0)
			else return this.cards.filter(e => e.currencyType === 1)
		},

		getVirtualMoney() {
			if (this.exchangeRate === 0 || this.exchangeRate === 1) return this.money
			else if (this.currencyDenomination === 'k') return Number(this.money * 1000 / this.exchangeRate)
			else return Number(this.money / this.exchangeRate)
		},
		
		// bankDisabled () {
		// 	let e = this.cards.filter(e => e.currencyType === 0)
		// 	return e.length < 1
		// },
		
		// virtualDisabled () {
		// 	let e = this.cards.filter(e => e.currencyType === 1)
		// 	return e.length < 1
		// },
	},

	watch: {
		money(newVal, oldVal) {
			let reg = /^[1-9](\d{0,8})(\.(\d{0,2}))?$/g;
			let m = 0
			if (!reg.test(newVal)) {
				if (newVal === '') {
					this.money = ''
					return;
				}
				this.money = oldVal
				m = oldVal
			} else {
				this.money = newVal
				m = newVal
			}

			this.calculateCounterFee(m)
		},
	},

	methods: {
		onLoadWithdrawInfo() {
			this.$post('/api/Withdraw/GetWithdrawMoneyShowInfo')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.withdrawInfo = data.data
					this.onLoadCard()
				})
				.catch(error => {
					this.procError(error)
				})
		},

		onLoadCard() {
			this.$post('/api/Account/GetMemberBankCard')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.cards = data.data
					let t = this.type === 'bank' ? 0 : 1
					let c = this.cards.filter(e => e.currencyType === t)[0]
					if (!c) {
						this.changeType('virtual')
					} else {
						this.radio = c.objId
						this.exchangeRate = c.exchangeRate
						this.virtualName = c.bankName
					}
				})
				.catch(error => {
					this.procError(error)
				})
		},

		calculateCounterFee(m) {
			this.$post('/api/Withdraw/CalculateCounterFee?money=' + m)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.counterFee = data.data
				})
				.catch(error => {
					this.procError(error)
				})
		},

		showWithdraw() {
			if (Number(this.money) < Number(this.withdrawInfo && this.withdrawInfo.minWithdrawMoney)) {
				this.$toast(this.$$t('minMoneyDesc'))
				return
			}

			if ((Number(this.money) > Number(this.withdrawInfo && this.withdrawInfo.maxWithdrawMoney)) && Number(this.withdrawInfo && this.withdrawInfo.maxWithdrawMoney) !== 0) {
				this.$toast(this.$$t('maxMoneyDesc'))
				return
			}

			if ((Number(this.money) + Number(this.counterFee)) > Number(this.withdrawInfo.balance)) {
				this.$toast(this.$$t('balanceDesc'))
				return
			}

			if (!this.withdrawInfo.withdrawalAccountObjId) {
				return
			}

            if (this.withdrawInfo.memberAppendDeposit > 0) {
                this.$dialog.confirm({
                    title: this.$t('common.point'),
                    message: `${this.$$t('_1')} ${this.currencySymbol}${this.withdrawInfo.memberAppendDeposit}${this.currencyDenomination}，${this.$$t('_2')} ${this.currencySymbol}${this.withdrawInfo.balance}${this.currencyDenomination}，${this.$$t('_3')} ${this.currencySymbol}${this.withdrawInfo.balance}${this.currencyDenomination}`,
                })
                .then(() => {
                    this.drawPass = ''
                    this.showPopup = true
                    this.showPwdKeyboard = true
                })
                .catch(() => {})
				return
            } else {
                this.drawPass = ''
                this.showPopup = true
                this.showPwdKeyboard = true
            }
			
		},

		submitWithdraw() {
			if (this.drawPass.length < 4) {
				this.$toast(this.$$t('pwdToast'))
				return
			}
			
			this.$post(`/api/Withdraw/SubmitWithdrawMoney?withdrawPass=${this.drawPass.toString()}&money=${this.money}&counterFee=${this.counterFee}&withdrawalAccountObjId=${this.withdrawInfo.withdrawalAccountObjId}`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$toast(data.data)
					this.showKeyboard = false
					this.showPopup = false
					this.money = '1'
          this.initMemberData()
          this.onLoadWithdrawInfo()
				})
				.catch(error => {
					this.showKeyboard = false
					this.showPopup = false
					this.procError(error)
				})
		},

		hideShowMoneyKeyboard() {
			this.showKeyboard = false
			this.showWithdraw()
		},

		onInput(key) {
			this.drawPass = (this.drawPass + key).slice(0, 4)
		},

		onDelete() {
			this.drawPass = this.drawPass.slice(0, this.drawPass.length - 1)
		},

		closePopup() {
			this.showPopup = false
			this.showPwdKeyboard = false
			this.drawPass = ''
		},

		changeRadio(item) {
			this.radio = item.objId
			this.withdrawInfo.withdrawalAccountObjId = item.objId
			this.withdrawInfo.bankName = item.bankName
			this.withdrawInfo.bankCardNO = item.bankCardNumber
			this.exchangeRate = item.exchangeRate
			this.virtualName = item.bankName
		},

		changeType(t) {
			this.type = t
			if (this.cardItems.length === 0 && t === 'virtual') {
				this.type = 'bank'
				this.$dialog.confirm({
					title: this.$t('common.point'),
					message: this.$$t('addVirtual'),
				})
					.then(() => {
						this.$router.push('virtual/add')
					})
					.catch(() => {
					})
				return
			}
			let item = this.cardItems[0]
			this.radio = item.objId
			this.withdrawInfo.withdrawalAccountObjId = item.objId
			this.withdrawInfo.bankName = item.bankName
			this.withdrawInfo.bankCardNO = item.bankCardNumber
			this.exchangeRate = item.exchangeRate
			this.virtualName = item.bankName
		},

		$$t(v) {
			return this.$t('withdraw.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#withdraw {
    height: 100%;
    text-align: left;

    .withdraw-warp {
        .bank, .virtual {
            position: absolute;
            top: 68px;
            right: 0;
            left: 0;
            bottom: 0;
        }

        .bank-warp, .virtual-warp {
            .virtual-card {
                padding: 4px 16px;

                .van-cell {
                    height: 40px;
                    padding: 0;
                    margin-top: 14px;

                    /deep/ .van-field__left-icon {
                        margin: 8px 8px 8px 0;
                    }

                    /deep/ .van-field__body {
                        font-size: 32px;
                        font-weight: bold;
                        color: #333333;
                    }

                    .van-field__right-icon {
                        > div {
                            height: 20px;
                            font-size: 14px;
                            line-height: 1.43;
                            color: #0091ff;
                        }
                    }
                }
            }

            /deep/ .label_title {
                font-size: 14px;
                font-weight: bolder;
                color: #323233;
            }

            .v_main_color {
                /deep/ .van-field__control {
                    font-size: 16px;
                    font-weight: bolder;
                    color: rgb(63, 128, 252);
                    -webkit-text-fill-color: rgb(63, 128, 252);
                }
            }

            .v_black {
                /deep/ .van-field__control {
                    font-size: 16px;
                    font-weight: bolder;
                    color: #323233;
                    -webkit-text-fill-color: #323233;

                }
            }
        }

        .btn {
            padding: 30px 16px 0 16px;

            .van-button__text {
                height: 22px;
                font-size: 16px;
                font-weight: bold;
                line-height: 1.38;
                color: #ffffff;
            }
        }
    }

    .van-popup--center {
        top: 36.5%;
    }

    .drawPass {
        width: 295px;
        height: 246px;
        border-radius: 8px;
        background-color: #ffffff;

        .title {
            height: 24px;
            margin-top: 12px;
            display: flex;
            justify-content: center;

            > div {
                height: 24px;
                line-height: 24px;
                font-size: 17px;
                font-weight: 500;
                color: #333333;
            }

            .icon {
                position: absolute;
                right: 16px;
                top: 12px;
            }
        }

        .title-2 {
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #666666;
            text-align: center;
            margin-top: 16px;
        }

        .center {
            height: 40px;
            text-align: center;
            display: flex;
            justify-content: center;
            margin-top: 8px;

            .van-icon {
                margin: 8px 8px 8px 0;
            }

            .text {
                height: 40px;
                font-size: 32px;
                font-weight: bold;
                line-height: 40px;
                color: #333333;
            }
        }

        .desc {
            height: 16px;
            display: flex;
            justify-content: space-between;
            margin: 7.5px 15px 20px 15px;

            .desc-title {
                height: 16px;
                font-size: 12px;
                line-height: 1.33;
                color: #999999;
            }

            .desc-number {
                height: 16px;
                font-size: 12px;
                line-height: 1.33;
                color: #333333;
            }
        }

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
