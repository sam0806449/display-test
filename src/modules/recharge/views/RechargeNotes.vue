<template>
    <div id="rechargeNotes">
        <van-dropdown-menu active-color="#1989fa">
            <van-dropdown-item v-model="recordType" :options="recordTypeOption"/>
            <van-dropdown-item v-model="date" :options="dateOptions"/>
        </van-dropdown-menu>

        <div class="center">
            <scroll-view
                    :onRefresh="onRefresh"
                    :loadMore="onLoad">
                <div class="px-4 mt-1 background-white" v-if="items.length > 0">
                    <template v-for="(item, index) in items">
                        <div :key="index">
                          <div class="detail text-left" @click="goDetails(item)">
                            <div class="left">
                              <div class="title">
                                {{getRecordType(item.recordType)}}{{item.currencySymbol}}{{item.moneyY}}{{currencyDenomination}}
                              </div>
                              <div class="desc">{{item.orderTime}}</div>
                            </div>

                            <div class="right">
                              <div class="status-1" v-if="Number(item.status)===0">{{$$t('status_0')}}</div>
                              <div class="status-1" v-else-if="Number(item.status)===1">{{$$t('status_1')}}</div>
                              <div v-else-if="Number(item.status)===2">
                                <div class="number" :class="{profit_win: getSymbol(item.recordType) === '-'}">{{getSymbol(item.recordType)}}{{item.moneyY}}</div>
                                <div class="status-2">{{$$t('status_2')}}</div>
                              </div>
                              <div v-else class="status-cancel">{{$$t('status_3')}}</div>
                            </div>
                          </div>
                          <van-divider v-show="index < items.length"/>
                        </div>
                    </template>
                </div>

                <van-empty v-else :description="$t('common.noMore')" class="text-center">
                    <template #image>
                        <van-image src="/images/empty/no-more.png" width="280" height="130"/>
                    </template>
                </van-empty>
            </scroll-view>
        </div>
    </div>
</template>

<script>
import {dateFormat, beforeByDay} from '@/common/js/dateUtil'

export default {
	name: 'RechargeNotes',

	data() {
		return {
			date: 1,
			recordType: '',
			items: [],
			refresh: false,
			recordTypeOption: [
				{text: this.$$t('all'), value: ''},
				{text: this.$$t('recharge'), value: 1},
				{text: this.$$t('withdraw'), value: 2},
        {text: this.$$t('deduction'), value: 15},
			],
			pageIndex: 1
		}
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
				{text: this.$$t('nearlySevenDays'), value: 7},
				{text: this.$$t('nearlyTwoDays'), value: 3},
				{text: this.$$t('yesterday'), value: 2},
				{text: this.$$t('today'), value: 1}
			]
		},

		endDate() {
			if (this.date === 7 || this.date === 1) return dateFormat(new Date(), 'yyyy-MM-dd')
			else return dateFormat(beforeByDay(new Date(), Number(this.date - 1)), 'yyyy-MM-dd')
		},

	},

	watch: {
		date() {
			this.items = []
			this.pageIndex = 1
			this.onRefresh()
		},

		recordType() {
			this.items = []
			this.pageIndex = 1
			this.onRefresh()
		}
	},

	created() {
		this.onLoad()
	},

	methods: {
		onLoad(done) {
			this.showProgress()
			this.$post(`/api/Account/GetTransactionRecord?recordType=${this.recordType}&pageSize=10&pageIndex=${this.pageIndex}&startDate=${this.startDate}&endDate=${this.endDate}`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.pageIndex = this.pageIndex + 1
					if (this.refresh) {
						this.items = []
						this.items = d.items
						if (done) {
							this.refresh = false
							done()
						}
					} else {
						if (d.items.length > 0) {
							this.items.push(...d.items)
							if (done) done(false)
						} else {
							if (done) done(true)
						}
					}
					this.showProgress(false)
				})
				.catch(error => {
					if (done) done(true)
					this.showProgress(false)
					this.procError(error)
				})
		},

		onRefresh(done) {
			this.refresh = true
			this.pageIndex = 1
			this.onLoad(done)
		},

		goDetails(item) {
			this.$sessionSet('Note-Data', item)
			this.$router.push('rechargeNotes/details')
		},

		getRecordType(r) {
			if (r === 1) return this.$$t('recharge')
			else if (r === 2) return this.$$t('withdraw')
			else if (r === 3) return this.$$t('transfer')
			else if (r === 4) return this.$$t('rakeback')
			else if (r === 15) return this.$$t('deduction')
		},


		getSymbol(r) {
			if (r === 2) return '-'
			else if (r === 15) return '-'
			else return '+'
		},

		$$t(v) {
			return this.$t('rechargeNotes.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#rechargeNotes {
    height: 100%;

    > .title {
        position: relative;
        text-align: right;
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        color: #666666;
        margin: 10px 16px 10px 0;
    }

    .center {
        background-color: #f5f5f9;
        overflow-y: hidden;
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 0;

        .van-divider {
            margin: 0;
        }

        .detail {
            height: 63px;
            display: flex;
            justify-content: space-between;
            color: #333333;

            .left {
                .title {
                    height: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    margin-top: 11.5px;
                }

                .desc {
                    height: 16px;
                    font-size: 12px;
                    line-height: 1.33;
                    color: #666666;
                    margin-top: 4px;
                }
            }

            .right {
                height: 100%;
                text-align: right;

                .status-1 {
                    height: 20px;
                    margin-top: 21.5px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #44bb00;
                }


                .status-cancel {
                    height: 20px;
                    margin-top: 21.5px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #333333;
                }

                .status-2 {
                    height: 16px;
                    line-height: 16px;
                    margin-top: 6px;
                    margin-bottom: 11.5px;
                    font-size: 12px;
                    font-weight: 500;
                    color: #999999;
                }

                .number {
                    height: 20px;
                    line-height: 20px;
                    margin-top: 9.5px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #333333;
                }

                .profit_win {
                    color: red;
                }
            }
        }
    }
}
</style>
