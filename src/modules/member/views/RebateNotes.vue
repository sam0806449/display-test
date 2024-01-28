<template>
    <div id="rebateNotes">
        <div class="flex space-between align-items-center mt-3 px-4">
            <van-dropdown-menu active-color="rgb(70 132 255)">
                <van-dropdown-item :title="dropdownTitle" ref="type">
                    <div class="dropdown-warp">
                        <div class="btns">
                            <div class="btn" :class="{active: date === c.value}" v-for="(c, index) in dateOptions"
                                 :key="index" @click="typeClick(c)">
                                <span>{{c.text}}</span>
                            </div>
                        </div>
                    </div>
                </van-dropdown-item>
            </van-dropdown-menu>

            <div class="text-grey text-right van-ellipsis body-2">{{$$t('titleDesc')}}</div>
        </div>

        <div class="rebateNotes-warp">
            <scroll-view
                    :onRefresh="onRefresh"
                    :loadMore="onLoad">
                <div class="pb-3">
                    <div class="rebateNotess">
                        <div class="px-4 background-white" v-if="items.length > 0">
                            <template v-for="(item, index) in items">
                                <div class="detail text-left py-3" :key="index" @click="goDetails(item)">
                                    <div class="left">
                                        <div class="title">
                                            {{$$t('rebate')}}{{item.currencySymbol}}{{item.money}}{{currencyDenomination}}
                                        </div>
                                        <div class="mt-3 body-2" style="color: rgb(153, 153, 153)">{{item.createTime}}</div>
                                    </div>

                                    <div class="right">
                                        <div class="body-2">{{$$t('betMoney')}}{{item.currencySymbol}}{{item.betMoney}}{{currencyDenomination}}</div>
                                        <div class="body-2 mt-3">{{$$t('premiumRatio')}}{{item.premiumRatio}}%</div>
                                    </div>
                                </div>
                                <van-divider v-show="index < items.length" :key="index"/>
                            </template>
                        </div>
                        <van-empty v-else :description="$t('common.noMore')" class="text-center background-white">
                            <template #image>
                                <van-image src="/images/empty/no-more.png" width="280" height="130"/>
                            </template>
                        </van-empty>
                    </div>
                </div>
            </scroll-view>
        </div>

    </div>
</template>

<script>
import {dateFormat, beforeByDay} from '@/common/js/dateUtil'

export default {
	name: 'RebateNotes',

	data: () => ({
		dropdownTitle: '',
		date: 0,
		pageIndex: 1,
		items: []
	}),

	computed: {
		startDate() {
			// beforeByDay
			if (this.date === 60) return this.getLastMonthFirst()
			else if (this.date === 30) return this.getCurrentMonthFirst()
			else if (this.date === 7) return dateFormat(beforeByDay(new Date(), 7), 'yyyy-MM-dd')
			else if (this.date === 2) return dateFormat(beforeByDay(new Date(), 2), 'yyyy-MM-dd')
			else if (this.date === 1) return dateFormat(beforeByDay(new Date(), 1), 'yyyy-MM-dd')
			else return dateFormat(beforeByDay(new Date(), 0), 'yyyy-MM-dd')
		},

		dateOptions() {
			return [
				{text: this.$$t('lastMonth'), value: 60},
				{text: this.$$t('nearlyAMonth'), value: 30},
				{text: this.$$t('nearlySevenDays'), value: 7},
				{text: this.$$t('nearlyTwoDays'), value: 2},
				{text: this.$$t('yesterday'), value: 1},
				{text: this.$$t('today'), value: 0}
			]
		},

		endDate() {
			let d = Number(this.date)
			if (d === 7 || d === 0 || d === 30) return dateFormat(new Date(), 'yyyy-MM-dd')
			else if (d === 60) return this.getLastMonthLastDay()
			else return dateFormat(beforeByDay(new Date(), d), 'yyyy-MM-dd')
		}
	},

	watch: {
		date() {
			this.items = []
			this.pageIndex = 1
			this.onRefresh()
		}
	},


	created() {
		this.dropdownTitle = this.$$t('today')
		this.onLoad()
	},

	methods: {
		onLoad(done) {
			this.showProgress()
			this.$post(`/api/Premium/GetPremiumRecordPage`, {
				pageSize: 10, pageIndex: this.pageIndex, beginDate: this.startDate, endDate: this.endDate
			})
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
			this.$router.push('rebateNotes/details')
		},

		typeClick(e) {
			this.dropdownTitle = e.text
			this.date = e.value
			this.$refs.type.toggle()
		},

		$$t(v) {
			return this.$t('rebateNotes.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#rebateNotes {
    .rebateNotes-warp {
        overflow: hidden;
        position: absolute;
        width: 100%;
        bottom: 0;
        top: 54px;
        left: 0;
        right: 0;

        .rebateNotess {
            .van-divider {
                margin: 0;
            }

            .detail {
                display: flex;
                justify-content: space-between;
                color: #333333;

                .left {
                    .title {
                        font-size: 14px;
                        font-weight: 600;
                    }
                }

                .right {
                    text-align: right;

                    .status-1 {
                        font-size: 14px;
                        font-weight: 500;
                        color: #44bb00;
                    }


                    .status-cancel {
                        font-size: 14px;
                        font-weight: 500;
                        color: #333333;
                    }

                    .status-2 {
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
                }
            }
        }
    }

    /deep/ .van-dropdown-menu {
        .van-dropdown-menu__bar {
            height: 32px;
            box-shadow: none;
            background-color: unset;
        }

        .van-dropdown-menu__title {
            text-align: center;
            height: 32px;
            padding: 0 16px;
            line-height: 32px;
            border-radius: 15px;
            background-color: #fff;
        }

        .van-dropdown-item {
            top: 101.984px !important;
        }

        .van-dropdown-menu__title::after {
            right: 5px;
        }
    }

    .active {
        background-color: rgb(223, 236, 255) !important;

        span {
            color: rgb(82, 149, 253) !important;
        }
    }

    .dropdown-warp {
        padding: 12px 10px 16px 10px;

        .btns {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .btn {
                width: 111px;
                line-height: 32px;
                margin-bottom: 12px;
                border-radius: 5px;
                background-color: #f5f5f9;
                text-align: center;

                span {
                    height: 16px;
                    font-size: 12px;
                    line-height: 16px;
                    text-align: center;
                    color: #333333;
                }
            }
        }
    }
}
</style>
