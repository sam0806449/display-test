<template>
    <div id="rebateRecord">
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

            <div class="text-grey body-2 van-ellipsis ml-2">{{$$t('titleDesc')}}</div>
        </div>

        <div class="rebateRecord-warp">
            <scroll-view
                    :onRefresh="onRefresh"
                    :loadMore="onLoad">
                <div class="pb-3">
                    <div class="rebateRecords">
                        <div class="background-white" v-if="items.length > 0">
                            <template v-for="(item, index) in items">
                                <div class="item py-3 px-3" :key="`${index}-1`" @click="goDetails(item)">
                                    <div class="left">
                                        <van-image
                                                round
                                                fit="cover"
                                                width="40"
                                                height="40"
                                                src="/images/account/user.png"
                                        />
                                    </div>
                                    <div class="right">
                                        <div class="right-t">
                                            <div class="body-2">{{$$t('memberAccount')}}{{item.srcMember}}</div>
                                            <div class="body-2">{{$$t('betMoney')}}{{item.currencySymbol}}{{item.betMoneyY}}{{currencyDenomination}}</div>
                                        </div>
                                        <div class="right-b mt-3">
                                            <div class="body-2">{{$$t('money')}}{{item.currencySymbol}}{{item.moneyY}}{{currencyDenomination}}</div>
<!--                                            <div class="body-2">{{$$t('premiumRatio')}}{{item.premiumRatio}}%</div>-->
                                        </div>
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
	name: 'RebateRecord',

	data: () => ({
		dropdownTitle: '',
		date: 1,
		pageIndex: 1,
		refresh: false,
		items: []
	}),

	computed: {
		startDate() {
			// beforeByDay
			if (this.date === 60) return this.getLastMonthFirst()
			else if (this.date === 30) return this.getCurrentMonthFirst()
			else if (this.date === 7) return dateFormat(beforeByDay(new Date(), 7), 'yyyy-MM-dd')
			else if (this.date === 3) return dateFormat(beforeByDay(new Date(), 2), 'yyyy-MM-dd')
			else if (this.date === 2) return dateFormat(beforeByDay(new Date(), 1), 'yyyy-MM-dd')
			else return dateFormat(beforeByDay(new Date(), 0), 'yyyy-MM-dd')
		},

		dateOptions() {
			return [
				{text: this.$$t('lastMonth'), value: 60},
				{text: this.$$t('nearlyAMonth'), value: 30},
				{text: this.$$t('nearlySevenDays'), value: 7},
				{text: this.$$t('nearlyTwoDays'), value: 3},
				{text: this.$$t('yesterday'), value: 2},
				{text: this.$$t('today'), value: 1}
			]
		},

		endDate() {
			let d = Number(this.date)
			if (d === 7 || d === 1 || d === 30) return dateFormat(new Date(), 'yyyy-MM-dd')
			else if (d === 60) return this.getLastMonthLastDay()
			else return dateFormat(beforeByDay(new Date(), d - 1), 'yyyy-MM-dd')
		}
	},

	watch: {
		date() {
			this.onRefresh()
		}
	},

	created() {
		this.dropdownTitle = this.$$t('today')
		this.onLoad()
	},

	methods: {
		goDetails(item) {
			this.$router.push({path: 'rebateRecord/details', query: {item: item} })
		},

		onLoad(done) {
			this.showProgress()
			this.$post(`/api/MemberAgent/GetRebateDetailPage`, {
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

		typeClick(e) {
			this.dropdownTitle = e.text
			this.date = e.value
			this.$refs.type.toggle()
		},

		$$t(v) {
			return this.$t('rebateRecord.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#rebateRecord {
    .rebateRecord-warp {
        overflow: hidden;
        position: absolute;
        width: 100%;
        bottom: 0;
        top: 54px;
        left: 0;
        right: 0;

        .rebateRecords {
            .van-divider {
                margin: 0;
            }
            color: rgb(51, 51, 51);
            .item {
                background-color: white;
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                border-bottom: solid 1px #f5f6f7;


                .left {
                    height: 40px;
                    width: 40px;
                }

                .right {
                    width: 100%;
                    margin-left: 12px;

                    .right-t, .right-b {
                        text-align: left;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
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
