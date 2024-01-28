<template>
    <div id="financialBuy">
        <div class="view-background">
            <div class="view-background-flex">
                <div class="view-background-flex-top"></div>
                <div class="view-background-flex-bottom"></div>
            </div>
        </div>

        <scroller>
            <div class="warp">
                <div class="financialBuy-title">
                    <div>{{title}}</div>
                </div>
                <div class="financialBuy-money">
                    <div class="title">{{$$t('money')}}</div>

                    <div class="center">
                        <van-field v-model="money" @click-right-icon.stop="closeMoney"
                                   type="digit" center right-icon="images/financial/close.png"
                                   @click-input.stop="showKeyboard = true" readonly>
                            <span slot="left-icon" class="currencySymbol">{{currencySymbol}}</span>

                            <div slot="right-icon" class="subtitle-2">{{currencyDenomination}}</div>
                        </van-field>
                    </div>

                    <div class="tags">
                        <van-tag color="#FDECE8" text-color="#FD723F" size="large" @click="setMoney(1000)">
                            {{currencySymbol}}1000{{currencyDenomination}}
                        </van-tag>
                        <van-tag color="#FDECE8" text-color="#FD723F" size="large" @click="setMoney(2000)">
                            {{currencySymbol}}2000{{currencyDenomination}}
                        </van-tag>
                        <van-tag color="#FDECE8" text-color="#FD723F" size="large" @click="setMoney(5000)">
                            {{currencySymbol}}5000{{currencyDenomination}}
                        </van-tag>
                    </div>
                    <van-divider style="margin: 0"/>
                    <div class="desc" v-show="Number(memberData && memberData.balance) < Number(minimumPurchaseAmount)">
                        {{$$t('moneyDesc1')}}<span>{{$$t('moneyDesc2')}}</span>
                    </div>
                </div>

                <div class="financialBuy-after">
                    <div v-if="isShow===2">
                        <div class="title">{{$$t('expiration')}}</div>
                        <div class="desc">
                            {{$$t('expirationDesc1')}}<span>{{$$t('expirationDesc2')}}</span>，{{$$t('expirationDesc3')}}<span>{{$$t('expirationDesc4')}}</span>
                        </div>
                        <van-divider style="margin: 0; padding: 0;"/>
                    </div>
                    <van-cell :title="$$t('payment')" is-link
                              :value="`${$$t('balance')}${currencySymbol}${memberData && memberData.balance}${currencyDenomination}`"
                              size="large"/>
                </div>

                <div class="financialBuy-check">
                    <van-checkbox v-model="checked" checked-color="rgb(70, 132, 255)">
                        {{$$t('checkDesc')}}
                    </van-checkbox>
                </div>

                <div class="financialBuy-btn">
                    <van-button hairline block
                                color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))"
                                @click="hideShowMoneyKeyboard">{{$$t('determine')}}
                    </van-button>
                </div>

            </div>
        </scroller>

        <van-number-keyboard
                v-model="money"
                :show="showKeyboard"
                :maxlength="10"
                @close="hideShowMoneyKeyboard"
                @blur="showKeyboard = false"
                :close-button-text="$t('common.complete')"
                :hide-on-click-outside="false"
                theme="custom"
        />

        <van-popup :close-on-click-overlay="false" v-model="showPopup">
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

            <van-password-input
                    :value="payPassWord"
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
                @close="submitBuy"
        />
    </div>
</template>

<script>
import sessionContext from '@/mixins/sessionContext'

export default {
	name: 'FinancialBuy',
	mixins: [sessionContext],

	data() {
		return {
			title: '',
			isHot: false,
			again: true,
			money: 1,
			minimumPurchaseAmount: 0,
			productId: '',
			payPassWord: '',
			showKeyboard: false,
			showPwdKeyboard: false,
			showPopup: false,
			checked: false,
			isShow: 1
		}
	},

	watch: {
		money(newVal, oldVal) {
			let reg = /^[1-9](\d{0,8})(\.(\d{0,2}))?$/g;
			if (!reg.test(newVal)) {
				if (newVal == '') {
					this.money = ''
					return;
				}
				this.money = oldVal
			} else {
				this.money = newVal
			}
		}
	},

	created() {
		this.productId = this.$route.query.productId
		this.title = this.$route.query.title
		this.isHot = this.$route.query.isHot
		this.again = this.$route.query.again
		this.isShow = Number(this.$route.query.isShow)
		this.minimumPurchaseAmount = this.$route.query.minimumPurchaseAmount
		this.money = this.$route.query.minimumPurchaseAmount || 1
		this.initMemberData()
	},

	methods: {
		showBuy() {
			if (!this.checked) {
				this.showPopup = false
				this.$toast(this.$$t('checkToast'))
				return
			}

			if (Number(this.money) < Number(this.minimumPurchaseAmount)) {
				this.$toast(this.$$t('minDesc') + this.minimumPurchaseAmount)
				return
			}

			if (Number(this.money) > Number(this.memberData.balance)) {
				this.$toast(this.$$t('insufficient'))
				return
			}

			this.payPassWord = ''
			this.showPopup = true
			this.showPwdKeyboard = true
		},

		submitBuy() {
			if (this.payPassWord.length < 4) {
				this.showPopup = false
				this.$toast(this.$$t('pwdToast'))
				return
			}

			this.$post(`/api/Financial/BuyIn?productId=${this.productId}&money=${this.money}&payPassWord=${this.payPassWord}`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(() => {
					this.showPopup = false
					this.initMemberData()
					if (this.isShow === 2) this.$router.push('/app/financial/hold')
					else this.$router.back()
					this.$success(this.$$t('buySuccess'))
				})
				.catch(error => {
					this.showPopup = false
					this.procError(error)
				})
		},

		closeMoney() {
			this.money = 1
		},

		setMoney(m) {
			this.money = m
		},

		hideShowMoneyKeyboard() {
			this.showKeyboard = false
			this.showBuy()
		},

		onInput(key) {
			this.payPassWord = (this.payPassWord + key).slice(0, 4)
		},

		onDelete() {
			this.payPassWord = this.payPassWord.slice(0, this.payPassWord.length - 1)
		},

		closePopup() {
			this.showPopup = false
			this.showPwdKeyboard = false
			this.payPassWord = ''
		},

		$$t(v) {
			return this.$t('financialBuy.' + v)
		}

	},

	beforeRouteLeave(to, form, next) {
		if (this.isHot) {
			if (to.name === 'financialMarketDetails') next('/app/financial')
			sessionStorage.removeItem('productId')
			next()
		} else if (this.again) {
			if (to.name === 'financialMarketDetails') next('/app/financialHold/details')
			next()
		} else {
			next()
		}

	},
}
</script>

<style lang="less" scoped>
#financialBuy {
    height: 100%;

    .view-background {
        position: absolute;
        width: 100%;
        height: 100%;
        background: white;

        .view-background-flex {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;

            .view-background-flex-top {
                flex: 1;
                background: white;
            }

            .view-background-flex-bottom {
                flex: 1;
                background: transparent;
            }
        }
    }

    .warp {
        text-align: left;

        .financialBuy-title {
            background-color: white;
            height: 48px;
            padding: 16px 13px 0 16px;

            > div {
                font-size: 16px;
            }
        }

        .financialBuy-money {
            margin-top: 10px;
            background-color: white;
            padding: 16px;

            .title {
                font-size: 16px;
                font-weight: bolder;
            }

            .currencySymbol {
                font-size: 30px;
                font-weight: bolder;
                align-items: center;
            }

            /deep/ .van-cell {
                height: 40px;
                padding: 0;
                margin-top: 12px;

                .van-field__body {
                    height: 40px;
                    font-size: 32px;
                    font-weight: bold;
                    line-height: 1.25;
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

            .tags {
                margin-top: 18px;
                margin-bottom: 11px;

                .van-tag {
                    margin-right: 15px;
                }

                .van-tag:last-child {
                    margin-right: 0;
                }
            }

            .desc {
                margin-top: 16px;
                font-size: 14px;

                span {
                    color: rgb(242, 85, 53);
                }
            }
        }

        .financialBuy-after {
            margin-top: 10px;
            padding-top: 13px;
            padding-bottom: 13px;
            padding-left: 16px;
            /*height: 165px;*/
            background-color: white;

            .title {
                font-size: 18px;
                font-weight: 600;
            }

            .desc {
                margin-top: 10px;
                margin-bottom: 17px;
                font-size: 14px;
                color: #999999;

                span {
                    color: #F25535;
                }
            }

            .van-cell {
                padding-top: 18px;
                padding-bottom: 18px;
                padding-left: 0;

                .van-cell__title {
                    font-size: 18px;
                    font-weight: 600;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }

        .financialBuy-check {
            padding: 0 16px;
            margin-top: 30px;
            font-size: 14px;
        }

        .financialBuy-btn {
            margin-top: 20px;
            padding: 0 16px;

            .van-button {
                border-radius: 5px;

                .van-button__text {
                    font-size: 16px;
                }
            }

        }
    }

    .van-popup--center {
        top: 36.5%;
    }

    .van-popup {
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
            margin-top: 14px;

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

        .van-password-input {
            margin-top: 26px;

            ul {
                li {
                    border: solid 1px #e5e5e5;
                }
            }
        }
    }
}
</style>
