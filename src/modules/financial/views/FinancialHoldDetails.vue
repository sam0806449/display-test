<template>
    <div id="financialHoldDetails">
        <scroller>
            <div class="warp">
                <div class="details-top">
                    <div class="title">{{item && item.financialProductName}}</div>
                    <div class="desc van-ellipsis">{{$$t('titleDesc1')}}{{item && item.financialProductName}}{{$$t('titleDesc2')}}</div>
                </div>

                <div class="details-balance">
                    <div class="title">{{$$t('total')}}</div>
                    <div class="number">{{currencySymbol}}{{item && item.credit}}{{currencyDenomination}}</div>

                    <van-row type="flex" justify="space-around">
                        <van-col span="6">
                            <div class="text van-ellipsis">{{$$t('annualized')}}</div>
                            <div class="number">{{item && item.annualizedIncomeBenchmark}}%</div>
                        </van-col>
                        <van-col span="6">
                            <div class="text van-ellipsis">{{$$t('lastIncome')}}</div>
                            <div class="number">{{currencySymbol}}{{item && item.lastIncome}}{{currencyDenomination}}</div>
                        </van-col>
                        <van-col span="6">
                            <div class="text van-ellipsis">{{$$t('totalIncome')}}</div>
                            <div class="number">{{currencySymbol}}{{item && item.totalIncome}}{{currencyDenomination}}</div>
                        </van-col>
                    </van-row>


                    <div class="details-balance-btn" v-if="getDayRules">
                        <van-button color="rgb(253, 236, 232)" size="large" @click="showPopupClick">{{$$t('transferOut')}}</van-button>
                        <van-button color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))" size="large" @click="redirectBuy">{{$$t('transferIn')}}</van-button>
                    </div>
                </div>

                <div class="marketDetails-rules" v-if="getDayRules">
                    <van-cell :border="false" center :title="$t('financialMarketDetails.rulesTitle')"
                              title-class="marketDetails-rules-title">
                    </van-cell>

                    <div class="marketDetails-rules-text">
                        {{$t('financialMarketDetails.rules4_1')}}{{currencySymbol}}{{item && item.minimumPurchaseAmount}}{{currencyDenomination}}{{$t('financialMarketDetails.rules4_2')}}
                    </div>
                </div>

                <div class="details-maturity" v-else>
                    <van-cell center :title="`${Number(item && item.daysToRedemption) < 2 ? '' : item.daysToRedemption}${Number(item && item.daysToRedemption) < 2 ? $$t('expired') : $$t('daysToRedemption')}`" :value="$$t('redemption')"
                              value-class="maturity-value"
                              title-class="maturity-title" label-class="maturity-label" :border="false"
                              :label="`${$$t('redemptionDesc1')}${formatDate(item && item.updateTime)}${$$t('redemptionDesc2')}`"
                              class="details-maturity-cell" @click="showPopupClick">
                        <van-icon name="arrow" slot="right-icon"/>
                    </van-cell>

                    <van-steps :active="stepsActive" active-color="#F36A06">
                        <van-step>
                            <h3>{{$$t('deal')}}</h3>
                            <p>{{formatDate(item && item.createTime)}}</p>
                        </van-step>
                        <van-step>
                            <h3>{{$$t('income')}}</h3>
                            <p>{{afterByDayFormat(item && item.createTime, 1)}}</p>
                        </van-step>
                        <van-step>
                            <h3>{{$$t('redemptionDate')}}</h3>
                            <p>{{formatDate(item && item.redemptionDate)}}</p>
                        </van-step>
                    </van-steps>

                    <van-cell-group>
                        <van-cell :title="$$t('buyMoney')" :value="(currencySymbol + item.credit)" :border="false"/>
                        <van-cell :title="$$t('calculating')" :value="formatDate(item && item.createTime)" :border="false"/>
                        <van-cell :title="$$t('redemptionTime')" :value="formatDate(item && item.redemptionDate)" :border="false"/>
                    </van-cell-group>

                </div>
            </div>
        </scroller>

        <van-popup
                v-model="showPopup"
                closeable
                close-icon-position="top-left"
                position="bottom"
        >
            <div class="title">{{$$t('redemption')}}</div>
            <div class="popup-top">
                <div class="popup-top-title">{{item && item.financialProductName}}</div>
                <div class="popup-top-desc">{{$$t('titleDesc1')}}{{item && item.financialProductName}}{{$$t('titleDesc2')}}</div>
            </div>
            <van-divider style="margin: 0; padding: 0 16px;background-color: white;"/>

            <div class="popup-money-1" v-if="getDayRules">
                <van-field v-model="money" @click-right-icon.stop="money = 0"
                           type="digit" center right-icon="images/financial/close.png"
                           @click-input.stop="showKeyboard = true">
                    <div class="money-number" slot="left-icon">{{currencySymbol}}</div>
                </van-field>
            </div>

            <div class="popup-money" v-else>
                <div class="popup-money-title">{{$$t('money')}}</div>
                <div class="popup-money-number">
                    {{currencySymbol}}{{item && item.credit}}
                </div>
            </div>
            <van-divider style="margin: 0; padding: 0 16px;background-color: white;"/>

            <div class="popup-btn">
                <van-button hairline block color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))" @click="onRedemption">
                    {{$$t('determine')}}
                </van-button>
            </div>
        </van-popup>

        <van-tabbar v-if="!getDayRules">
            <div class="btn">
                <van-button hairline block color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))" @click="redirectBuy">
                    {{$$t('again')}}
                </van-button>
            </div>
        </van-tabbar>
    </div>
</template>

<script>
export default {
	name: 'FinancialHoldDetails',

	data() {
		return {
			stepsActive: 4,
			showPopup: false,
			item: {},
			money: 0
		}
	},

	activated() {
		let productId = this.$route.query.productId || sessionStorage.getItem('productId')
		this.onLoad(productId)
	},

	computed: {
		getDayRules() {
			return Number(this.item && this.item.cycleType) === 0 && Number(this.item && this.item.cycle) < 2;
		},
	},

	methods: {
		onLoad(productId) {
			this.$get('/api/Financial/GetMemberAssetsDetail?objId=' + productId)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.item = data.data
					this.money = Number(data.data.credit)
				})
				.catch(error => {
					this.procError(error)
				})
		},

		onRedemption() {
			this.$dialog.confirm({
				title: this.$t('common.point'),
				message: this.$$t('isRedeem'),
			})
				.then(() => {
					if (Number(this.money > Number(this.item.credit))) {
						this.$toast(this.$$t('transferDesc'))
                        return
                    }
					this.$post(`/api/Financial/SellOut?assetsId=${this.item.id}&money=${this.money}`)
						.then(resp => {
							return this.checkResp(resp, (r) => r.data.success === true)
						})
						.then(() => {
							let e = sessionStorage.getItem('productId')
                            if (this.getDayRules)this.onLoad(e)
                            else this.$router.push('/app/financial/hold')
							this.showPopup = false
							this.$success(this.$$t('successful'))
						})
						.catch(error => {
							this.procError(error)
						})
				})
				.catch(() => {
				})

		},

		showPopupClick() {
			if (Number(this.item.daysToRedemption) > 0) {
				this.$toast(this.$$t('noRedeemable'))
			} else {
				this.showPopup = true
			}
		},

		redirectBuy() {
			this.$router.push({
				path: '/app/financial/buy',
				query: {
					productId: this.item.financialProductId,
					title: this.item.financialProductName,
					again: true,
					minimumPurchaseAmount: this.item.minimumPurchaseAmount
				}
			})
		},

		$$t(v) {
			return this.$t('financialHoldDetails.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#financialHoldDetails {
    height: 100%;

    .warp {
        text-align: left;
        padding-bottom: 120px;

        .details-top {
            height: 70px;
            background-color: white;
            padding-left: 16px;
            padding-top: 16px;
            border-bottom: 1px solid #CCCCCC;

            .title {
                font-size: 16px;
                font-weight: 600;
            }

            .desc {
                margin-top: 4px;
                font-size: 14px;
                color: #999999;
            }
        }

        .details-balance {
            text-align: center;
            background-color: white;
            padding-bottom: 12px;

            .details-balance-btn {
                padding: 16px;
                display: flex;
                justify-content: space-between;
                .van-button:first-child {
                    margin-right: 16px;
                    .van-button__text {
                        color: rgb(253, 114, 63);
                    }
                }
            }

            .title {
                font-size: 14px;
                padding-top: 19px;
                font-weight: 600;
            }

            .number {
                margin-top: 4px;
                font-size: 30px;
                font-weight: 600;
            }

            .van-row {
                margin-top: 14px;

                .text {
                    font-size: 14px;
                    color: #999999;
                }

                .number {
                    margin-top: 4px;
                    font-size: 16px;
                    color: #FE5535;
                }
            }
        }

        .marketDetails-rules {
            background-color: white;
            margin-top: 10px;
            padding: 0 16px 16px 16px;
            .van-cell {
                padding: 20px 0 0 0 !important;
            }
            .marketDetails-rules-text {
                margin-top: 12px;
                font-size: 14px;
                color: #999999;
            }

            .marketDetails-rules-title {
                font-size: 18px;
                font-weight: 600;
            }
        }

        .details-maturity {
            margin-top: 10px;
            background-color: white;

            .details-maturity-cell {
                padding-top: 16px;

                .van-cell__title, .van-cell__value {
                    flex: unset;
                }
            }

            .maturity-title {
                font-size: 16px;
                font-weight: 600;
            }

            .maturity-label {
                font-weight: 500;
                font-size: 14px;
                color: #999999;
            }

            .maturity-value {
                width: 50px !important;
            }

            /deep/ .van-steps {
                padding: 0 16px;
                margin-top: 34px;

                .van-step--horizontal .van-step__title {
                    text-align: center;
                }

                .van-step--horizontal:last-child .van-step__title {
                    text-align: right;
                }

                .van-step--horizontal:first-child .van-step__title {
                    text-align: left;
                }

                .van-step {
                    .van-step__circle-container {
                        top: 40px;
                    }

                    /deep/ .van-step__line {
                        top: 40px;
                    }
                }
            }

            .van-cell-group {
                padding-top: 6px;

                .van-cell {
                    padding: 6px 16px;
                }
            }
        }
    }

    .van-popup {
        padding-bottom: 30px;
        .title {
            font-size: 18px;
            font-weight: 600;
            margin-top: 16px;
        }

        .popup-top {
            text-align: left;
            height: 70px;
            background-color: white;
            padding-left: 16px;
            padding-top: 16px;

            .popup-top-title {
                font-size: 16px;
                font-weight: 600;
            }

            .popup-top-desc {
                margin-top: 4px;
                font-size: 14px;
                color: #999999;
            }
        }

        .popup-money-1 {
            padding: 0 16px;
            height: 40px;
            text-align: center;
            display: flex;
            justify-content: center;
            margin-top: 14px;

            /deep/.van-field__control{
                font-weight: 600;
                font-size: 30px;
            }
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

        .popup-money {
            text-align: center;
            padding: 16px;

            .popup-money-title {
                font-weight: 600;
                font-size: 14px;
            }

            .popup-money-number {
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: 600;
                font-size: 30px;
                margin-top: 12px;
            }
        }

        .popup-btn {
            padding: 0 16px;
            margin-top: 45px;

            .van-button {
                border-radius: 5px;

                .van-button__text {
                    font-size: 16px;
                }
            }

        }


    }

    .van-tabbar {
        width: 100%;
        height: 100px;
        background-color: white;

        .btn {
            padding: 20px 16px 36px 16px;
            width: 100%;

            .van-button {
                border-radius: 8px;

                .van-button__text {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
