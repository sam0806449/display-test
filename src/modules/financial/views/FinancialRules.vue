<template>
    <div id="financialRules">
        <scroller>
            <div class="warp">
                <div class="rule-top">
                    <van-steps :active="stepsActive" active-color="#F36A06">
                        <van-step>
                            <h3>{{$$t('deal')}}</h3>
                            <p>{{$$t('dealDesc')}}</p>
                        </van-step>
                        <van-step>
                            <h3>{{$$t('income')}}</h3>
                            <p>{{$$t('incomeDesc')}}</p>
                        </van-step>
                        <van-step>
                            <h3>{{$$t('redemptionDate')}}</h3>
                            <p>{{$$t('redemptionDateDesc')}}</p>
                        </van-step>
                    </van-steps>

                    <div class="rules-desc">
                        <ul type="disc">
                            <li>{{$$t('rules1_1')}}</li>
                            <li>{{$$t('rules1_2')}}</li>
                            <li>{{$$t('rules1_3')}}</li>
                        </ul>
                    </div>
                </div>

                <div class="rule-div">
                    <div class="title">{{$$t('rules_buy_title')}}</div>
                    <div class="text">
                        {{$$t('rules_buy_3')}}{{currencySymbol}}{{minimumPurchaseAmount}}{{$$t('rules_buy_1')}}
                    </div>
                    <div class="desc">{{$$t('rules_buy_2')}}</div>
                </div>

                <div class="rule-div">
                    <div class="title">{{$$t('rules_revenue_title')}}</div>
                    <div class="text">
                        {{$$t('rules_revenue_1')}}
                    </div>
                </div>

                <div class="rule-div">
                    <div class="title">{{$$t('rules_maturity_title')}}</div>
                    <div class="text">
                        {{$$t('rules_maturity_1')}}
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'FinancialRules',

	data() {
		return {
			stepsActive: 3,
			minimumPurchaseAmount: 0
		}
	},

	activated () {
		this.minimumPurchaseAmount = this.$route.query.minimumPurchaseAmount
    },

	methods: {
		$$t(v) {
			return this.$t('financialRules.' + v)
		}
    }
}
</script>

<style lang="less" scoped>
#financialRules {
    height: 100%;

    .warp {
        text-align: left;

        .rule-top {
            background-color: white;

            /deep/ .van-steps {
                padding: 0 16px;
                padding-top: 45px;

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

            .rules-desc {
                padding: 0 16px 12px 16px;
                font-size: 14px;
                color: #999999;

                span {
                    margin-right: 6px;
                    font-size: 16px;
                    color: red;
                }
            }
        }
        .rule-div {
            margin-top: 10px;
            padding: 16px 16px 12px 16px;
            background-color: white;
            .title {
                font-size: 18px;
                font-weight: 600;
            }

            .text {
                margin-top: 12px;
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

            .desc {
                margin-top: 4px;
                font-size: 14px;
                color: #F4333C;
            }
        }
    }
}
</style>
