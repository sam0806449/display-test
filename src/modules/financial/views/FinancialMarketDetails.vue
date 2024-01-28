<template>
    <div id="financialMarketDetails">
        <div class="view-background">
            <div class="view-background-flex">
                <div class="view-background-flex-top"></div>
                <div class="view-background-flex-bottom"></div>
            </div>
        </div>
        <scroller>
            <div class="warp">
                <div class="marketDetails-top">
                    <div class="title">{{item && item.name}}</div>
                    <div class="desc van-ellipsis">{{$$t('titleDesc1')}}{{item && item.name}}{{$$t('titleDesc2')}}</div>
                </div>

                <div class="marketDetails-annualized">
                    <van-row type="flex" justify="space-between">
                        <van-col span="12">
                            <div class="text">{{$$t('annualized')}}</div>
                            <div class="number">{{item && item.annualizedIncomeBenchmark}}%</div>
                        </van-col>
                        <van-col span="12" class="right">
                            <div class="text">{{$$t('period')}}</div>
                            <div class="number van-ellipsis">{{getDayFormat(item && item.cycleType, item && item.cycle)}}</div>
                        </van-col>
                    </van-row>

                    <div class="tag">
                        <van-tag color="#0BA194" plain size="medium">
                            <van-icon name="images/financial/risk.png" size="8"/>
                            {{$$t('desc1')}}
                        </van-tag>
                        <van-tag color="#999999" plain size="medium">{{item.currencySymbol}}{{item && item.minimumPurchaseAmount}}{{currencyDenomination}}{{$$t('desc2')}}
                        </van-tag>
                    </div>
                </div>

                <div class="marketDetails-desc">
                    <div class="desc-1 van-ellipsis">{{$$t('assetsDesc1')}}</div>
                    <div class="desc-2 van-ellipsis">
                        <van-icon name="success" size="12"/>
                        {{$$t('assetsDesc2')}}
                    </div>
                    <div class="desc-3 van-ellipsis">
                        <van-icon name="success" size="12"/>
                        {{$$t('assetsDesc3')}}
                    </div>
                    <div class="desc-4 van-ellipsis">
                        <van-icon name="success" size="12"/>
                        {{$$t('assetsDesc4')}}
                    </div>
                </div>

                <div class="marketDetails-rules">
                    <van-cell :border="false" center :title="$$t('rulesTitle')" :value="getDayRules ? '' : $$t('details')"
                              @click="redirectRules()"
                              title-class="marketDetails-rules-title" value-class="rules-value">
                        <van-icon v-if="!getDayRules" name="arrow" slot="right-icon"/>
                    </van-cell>

                    <div class="marketDetails-rules-text" v-if="getDayRules">
                        {{$$t('rules4_1')}}{{item.currencySymbol}}{{item && item.minimumPurchaseAmount}}{{currencyDenomination}}{{$$t('rules4_1_2')}}{{currencySymbol}}1{{currencyDenomination}}{{$$t('rules4_2')}}
                    </div>

                    <div v-else>
                        <van-steps :active="stepsActive" active-color="#F36A06">
                            <van-step>
                                <h3>{{$$t('deal')}}</h3>
                                <p>{{formatDate(dateFormat(new Date()))}}</p>
                            </van-step>
                            <van-step>
                                <h3>{{$$t('income')}}</h3>
                                <p>{{afterByDayFormat(new Date().getTime() ,1)}}</p>
                            </van-step>
                            <van-step>
                                <h3>{{$$t('redemptionDate')}}</h3>
                                <p>{{afterByDayFormat(new Date(), getDay(item.cycleType, item && item.cycle))}}</p>
                            </van-step>
                        </van-steps>

                        <div class="marketDetails-rules-desc">
                            <ul type="disc">
                                <li>{{$$t('rules1')}}</li>
                                <li>{{$$t('rules2')}}</li>
                                <li>{{$$t('rules3')}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </scroller>

        <van-tabbar>
            <div class="btn">
                <van-button hairline block color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))" @click="redirectBuy">{{$$t('buy')}}
                </van-button>
            </div>
        </van-tabbar>
    </div>
</template>

<script>
import {dateFormat} from '@/common/js/dateUtil'
export default {
	name: 'FinancialMarketDetails',

	data() {
		return {
			stepsActive: 3,
			item: {}
		}
	},

	activated() {
		let productId = this.$route.query.productId || sessionStorage.getItem('productId')
		this.onLoad(productId)
	},

	computed: {
		getDayRules () {
			return Number(this.item && this.item.cycleType) === 0 && Number(this.item && this.item.cycle) < 2;
		},
	},

	methods: {
		onLoad(productId) {
			this.$get('/api/Financial/GetProduct?objId=' + productId)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.item = data.data
				})
				.catch(error => {
					this.procError(error)
				})

		},

		redirectBuy() {
			this.$router.push({
				path: '/app/financial/buy',
				query: {
					productId: this.item.id,
					title: this.item.name,
					isShow: this.getDayRules ? 1 : 2,
					minimumPurchaseAmount: this.item.minimumPurchaseAmount
				}
			})
		},

		getDay(type, n) {
			if (type === 1) {
				return n * 30
			} else if (type === 2) {
				return n * 30 * 12
			} else {
				return n
			}
		},

		getDayFormat(type, n) {
			if (type === 1) {
				return n * 30 + this.$$t('day')
			} else if (type === 2) {
				return n * 30 * 12 + this.$$t('day')
			} else {
				if (n < 2) return this.$t('financial.unLimited')
				else return n + this.$$t('day')
			}
		},

		redirectRouter(r) {
			this.$router.push(r)
		},

		redirectRules() {
			if (this.getDayRules) return
			this.$router.push({
				path: '/app/financial/rules',
				query: {minimumPurchaseAmount: this.item.minimumPurchaseAmount}
			})
		},

		dateFormat (d) {
			return dateFormat(d, 'yyyy-MM-dd')
        },

		$$t(key) {
			if (!key) return ''
			return this.$t('financialMarketDetails.' + key)
		}
	},

	beforeRouteLeave(to, form, next) {
		if (to.name === 'financialMarket') sessionStorage.removeItem('productId')
		next()
	},
}
</script>

<style lang="less" scoped>
#financialMarketDetails {
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
        padding-bottom: 120px;

        .marketDetails-top {
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

        .marketDetails-annualized {
            padding-top: 16px;
            padding-left: 16px;
            height: 125px;
            background-color: white;

            .text {
                font-size: 14px;
                color: #999999;
            }

            .number {
                line-height: 40px;
                height: 40px;
                margin-top: 2px;
                color: #FE5535;
                font-weight: 600;
                font-size: 30px;
            }

            .right {
                .number {
                    font-size: 28px;
                    color: black;
                }
            }

            .tag {
                margin-top: 11px;

                .van-tag:first-child {
                    margin-right: 7px;
                }
            }

        }

        .marketDetails-desc {
            height: 54px;
            margin-top: 10px;
            background-color: white;
            padding: 0 16px;
            display: flex;
            align-items: center;

            div {
                font-size: 14px;
                margin-right: 18px;
                height: 20px;
                max-width: 100px;
            }

            .desc-1 {
                font-size: 12px;
                color: #999999;
                margin-right: 10px;
                max-width: 30px;
            }

            .desc-4 {
                margin-right: 0;
            }
        }

        .marketDetails-highlights {
            margin-top: 10px;
            min-height: 200px;
            background-color: white;
            padding: 20px 16px 0 16px;

            .title {
                font-size: 18px;
                font-weight: 600;
            }

            .center {
                margin-top: 6px;
                display: flex;
                align-items: center;

                .highlights-left {
                    margin-right: 10px;
                }

                .highlights-right {
                    .highlights-right-title {
                        font-size: 14px;
                    }

                    .highlights-right-desc {
                        margin-top: 4px;
                        font-size: 14px;
                        color: #999999;
                    }
                }
            }
        }

        .marketDetails-rules {
            /*height: 260px;*/
            background-color: white;
            margin-top: 10px;
            padding: 0 16px 16px 16px;

            .van-cell {
                padding: 20px 0 0 0 !important;
            }

            .marketDetails-rules-title {
                font-size: 18px;
                font-weight: 600;
            }

            .rules-value {
                font-size: 12px;
            }

            .van-steps {
                padding: 0;
                margin-top: 38px;

                /deep/ .van-step {
                    .van-step__circle-container {
                        top: 40px;
                    }

                    /deep/ .van-step__line {
                        top: 40px;
                    }
                }

                .van-steps__items {
                    padding-bottom: 0;

                }

                .van-step--horizontal:last-child {
                    text-align: right;
                }
            }

            .marketDetails-rules-text {
                margin-top: 12px;
                font-size: 14px;
                color: #999999;
            }
            .marketDetails-rules-desc {
                font-size: 14px;
                color: #999999;

                ul {
                    padding: 0 16px;
                    list-style: unset;
                    li {
                        margin-top: 10px;
                    }
                    li::marker {
                        color: #F4333C;
                    }
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
