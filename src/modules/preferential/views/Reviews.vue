<template>
    <div id="reviews">
        <div class="reviews-top">
            <van-row type="flex" justify="space-between">
                <van-col span="6">{{$$t('title_1')}}</van-col>
                <van-col span="6">{{$$t('title_2')}}</van-col>
                <van-col span="6" class="van-ellipsis">{{$$t('title_3')}}</van-col>
                <van-col span="6">{{$$t('title_4')}}</van-col>
            </van-row>
        </div>

        <div class="mt-3 px-4">
            <van-dropdown-menu active-color="rgb(70 132 255)">
                <van-dropdown-item :title="dropdownTitle" ref="type">
                    <div class="dropdown-warp">
                        <div class="btns">
                            <div class="btn van-ellipsis" :class="{active: status === c.value}" v-for="(c, index) in statusOptions"
                                 :key="index" @click="typeClick(c)">
                                <span>{{c.text}}</span>
                            </div>
                        </div>
                    </div>
                </van-dropdown-item>

                <van-dropdown-item :title="dateTitle" ref="date">
                    <div class="dropdown-warp"> 
                        <div class="btns">
                            <div class="btn van-ellipsis" :class="{active: date === c.value}" v-for="(c, index) in dateOptions"
                                 :key="index" @click="dateClick(c)">
                                <span>{{c.text}}</span>
                            </div>
                        </div>
                    </div>
                </van-dropdown-item>
            </van-dropdown-menu>
        </div>

        <div class="reviews-center">
            <scroll-view
                    :onRefresh="onRefresh"
                    :loadMore="onLoad">
                <div class="warp">
                    <div v-if="items.length > 0">
                        <div v-for="(item, index) in items" :key="index" @click="goDetails(item)">
                            <div class="item pl-3 py-4">
                                <van-row type="flex" justify="space-between" align="center">
                                    <van-col span="6" class="text-left">{{item.activityTitle}}</van-col>
                                    <van-col span="6">{{item.activityReceiveParam}}</van-col>
                                    <van-col span="6">{{formatDate(item.createTime)}}</van-col>
                                    <van-col span="6" class="status_color">{{getStatus(item.status)}}</van-col>
                                </van-row>
                            </div>
                            <van-divider  class="ma-0"/>
                        </div>
                    </div>

                    <van-empty v-else :description="$t('common.noMore')" class="text-center">
                        <template #image>
                            <van-image src="/images/empty/no-more.png" width="280" height="130"/>
                        </template>
                    </van-empty>
                </div>
            </scroll-view>
        </div>
    </div>
</template>

<script>
import {dateFormat, beforeByDay} from '@/common/js/dateUtil'

export default {
	name: 'Reviews',

	data: () => ({
		items: [],
		dropdownTitle: '',
		pageIndex: 1,
		refresh: false,
		status: '',
		dateTitle: '',
		date: 1,
    }),


	created() {
		this.dropdownTitle = this.$$t('all')
        this.dateTitle = this.$$t('today')
		this.onLoad()
	},

	computed: {
		statusOptions() {
			return [
				{text: this.$$t('all'), value: ''},
				{text: this.$$t('tab_1'), value: '0'},
				{text: this.$$t('tab_2'), value: '2'},
				{text: this.$$t('tab_3'), value: '-1'}
			]
		},

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
		status () {
			this.onRefresh()
        },

        date () {
			this.onRefresh()
        }
    },

	methods: {
		onLoad(done) {
			this.showProgress()
			this.$get(`/api/Activity/GetReceiveRecordList?pageSize=10&pageIndex=${this.pageIndex}&status=${this.status}&startDate=${this.startDate}&endDate=${this.endDate}`,)
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

        goDetails (item) {
			this.$router.push({path: 'reviews/details', query: {id: item.objId}})
        },

		onRefresh(done) {
			this.refresh = true
			this.pageIndex = 1
			this.onLoad(done)
		},

		getStatus (v) {
			if (v === 0) return this.$$t('status_0')
			if (v === 1) return this.$$t('status_1')
			if (v === 2) return this.$$t('status_2')
			if (v === -1) return this.$$t('status_3')
        },

		typeClick(e) {
			this.dropdownTitle = e.text
			this.status = e.value
			this.$refs.type.toggle()
		},

		dateClick(e) {
			this.dateTitle = e.text
			this.date = e.value
			this.$refs.date.toggle()
		},

		$$t(v) {
			return this.$t('reviews.' + v)
		}
    }
}
</script>

<style lang="less" scoped>
#reviews {
    /deep/ .van-dropdown-menu {
        .van-dropdown-menu__bar {
            height: 32px;
            box-shadow: none;
            background-color: unset;
        }

        .van-dropdown-menu__title {
            text-align: center;
            height: 32px;
            padding: 0 24px;
            line-height: 32px;
            border-radius: 2px;
            background-color: #fff;
        }

        .van-dropdown-item {
            top: 144.969px !important;
        }

        .van-dropdown-menu__item {
            justify-content: unset;
        }
        .van-dropdown-menu__item:last-child {
            justify-content: flex-end;
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

    .reviews-top {
        background-color: white;
        height: 44px;
        padding-top: 16px;
        font-size: 14px;
    }

    .reviews-center {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 98px;
        .warp {
            background-color: white;
            height: 100%;
            .item {
                font-size: 14px;
                .status_color {
                    color: rgb(242, 85, 53);
                }
            }
        }
    }
}
</style>
