<template>
    <div id="profits">
        <van-tabs v-model="date" animated swipeable title-active-color="rgb(96, 142, 255)" color="rgb(77, 140, 252)">
            <van-tab v-for="(item, index) in dateOptions" :title="item.text" :name="item.tag" :key="index">
            </van-tab>
        </van-tabs>

        <div class="profits-content">
            <div class="view-background">
                <div class="view-background-flex">
                    <div class="view-background-flex-top"></div>
                    <div class="view-background-flex-bottom"></div>
                </div>
            </div>
            <scroller>
                <div class="warp px-4">
                    <div class="text-center pt-5 text-white number">{{currencySymbol}}{{profits.profitLoss}}{{currencyDenomination}}</div>
                    <div class="body-2 text-white mt-3">{{$$t('profitLoss')}}</div>
                    <div class="rules text-center px-2 py-4 mt-3 elevation-1">
                        {{$$t('profitLossDesc')}}
                    </div>
                    <div class="red-text mt-4 text-left caption">
                        {{$$t('info_desc')}}
                    </div>

                    <div class="notes mt-2 text-center pa-3 elevation-1">
                        <div class="title-before subtitle-1 text-left pl-2">{{$$t('notes')}}</div>
                        <van-row type="flex" class="mt-3">
                            <van-col span="8" v-for="(item, index) in records" :key="index">
                                <div class="item py-3">
                                    <div class="money main-text"><span class="subtitle-2">{{currencySymbol}}</span>{{profits[item.code]}}
                                        <span class="subtitle-2">{{currencyDenomination}}</span>
                                    </div>
                                    <div class="text mt-1 caption">{{$$t(item.code)}}</div>
                                </div>
                            </van-col>
                        </van-row>
                    </div>

                    <div class="games mt-2 text-center pa-3 elevation-1" v-if="profits &&  profits.gameProfitLoss && profits.gameProfitLoss.length > 0">
                        <div class="title-before subtitle-1 text-left pl-2">{{$$t('game')}}</div>
                        <van-row type="flex" class="mt-3">
                            <van-col span="8" v-for="(item, index) in profits && profits.gameProfitLoss" :key="index">
                                <div class="item py-3">
                                    <div class="money main-text"><span class="subtitle-2">{{currencySymbol}}</span>{{item.money}}
                                        <span class="subtitle-2">{{currencyDenomination}}</span>
                                    </div>
                                    <div class="text mt-1 caption">{{item.name}}</div>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
import {dateFormat, beforeByDay} from '@/common/js/dateUtil'

export default {
	name: 'Profits',

	data: () => ({
		date: 1,
		records: [
			{code: 'depositMoney'},
			{code: 'premiumMoney'},
			{code: 'rebateMoney'},
			{code: 'financialIncome'},
			{code: 'depositPormMoney'},
			{code: 'pormMoney'},
			{code: 'withdrawalMoney'},
		],
		profits: {}
	}),

	watch: {
		date() {
			this.onLoad()
		}
	},


	created() {
		this.onLoad()
	},

	computed: {
		startDate() {
			// beforeByDay
			if (this.date === 7) return dateFormat(beforeByDay(new Date(), 7), 'yyyy-MM-dd')
			else if (this.date === 3) return dateFormat(beforeByDay(new Date(), 2), 'yyyy-MM-dd')
			else if (this.date === 2) return dateFormat(beforeByDay(new Date(), 1), 'yyyy-MM-dd')
			else return dateFormat(beforeByDay(new Date(), 0), 'yyyy-MM-dd')
		},

		dateOptions() {
			return [
				{text: this.$$t('nearlySevenDays'), tag: 7},
				{text: this.$$t('nearlyTwoDays'), tag: 3},
				{text: this.$$t('yesterday'), tag: 2},
				{text: this.$$t('today'), tag: 1}
			]
		},

		endDate() {
			if (this.date === 7 || this.date === 1) return dateFormat(new Date(), 'yyyy-MM-dd')
			else return dateFormat(beforeByDay(new Date(), Number(this.date - 1)), 'yyyy-MM-dd')
		}
	},

	methods: {
		onLoad() {
			this.showProgress()
			this.$post(`/api/Account/GetProfitLossSummary?startDate=${this.startDate}&endDate=${this.endDate}`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.profits = data.data
					this.showProgress(false)
				})
				.catch(error => {
					this.procError(error)
				})
		},

		$$t(v) {
			return this.$t('profits.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#profits {
    height: 100%;

    .profits-content {
        overflow: hidden;
        position: absolute;
        width: 100%;
        bottom: 0;
        top: 44px;

        background-color: rgb(248, 250, 250);

        .view-background {
            position: absolute;
            width: 100%;
            height: 100%;
            background: url('/images/profits/banner.png') no-repeat top right;
            background-size: 100% 300px;

            .view-background-flex {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;

                .view-background-flex-top {
                    flex: 1;
                    background: url('/images/profits/banner.png') no-repeat top right;
                    background-size: 100% 300px;
                }

                .view-background-flex-bottom {
                    flex: 1;
                    background: transparent;
                }
            }
        }

        .warp {
            height: 100%;
            background: url('/images/profits/banner.png') rgb(248, 250, 250) no-repeat top right;
            background-size: 100% 120px;

            .number {
                font-size: 30px;
            }

            .rules {
                background-color: white;
                height: 64px;
                border-radius: 15px;
                font-size: 12px;
            }

            .games, .notes {
                border-radius: 8px;
                background-color: white;

                .item {
                    .money {
                        font-size: 20px;
                    }
                }
            }
        }
    }
}
</style>
