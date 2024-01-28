<template>
    <div id="preferential">
        <van-tabs v-model="groupActive" animated ellipsis swipeable title-active-color="rgb(64, 128, 255)"
                  title-inactive-color="rgb(153, 153, 153)" color="rgb(64, 128, 255)">
            <template v-for="(item, index) in activityGroups">
                <van-tab :title="item.groupName" :name="item.objId" :key="index"/>
            </template>
        </van-tabs>


        <div class="lists">
            <scroll-view
                    :onRefresh="onRefresh"
                    :loadMore="onLoadMore">
                <div class="warp" v-if="topActive==='preferential'">
                    <div class="pb-2" v-if="activityLists.length > 0">
                        <div v-for="(item, index) in activityLists" :key="index" class="background-white item"
                             @click="goDetails(item)">
                            <van-image :src="$portrait(item.bannerImg)" lazy-load fit="fill" height="125" width="100%">
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="22"/>
                                </template>
                            </van-image>

                            <div class="promotions-title">
                                <h6>{{item.title}}</h6>
                                <div>
                                    <p>
                                        <span>{{getTime(item)}}</span>
                                    </p>
                                    <p>
                                        <span>{{$$t('details')}}</span>
                                        <van-icon name="arrow" slot="right-icon" size="16"/>
                                    </p>
                                </div>
                                <span class="over" v-if="isEndDate(item.startTime, item.endTime)"></span>
                            </div>
                        </div>
                    </div>

                    <van-empty v-else :description="$t('common.noMore')" class="text-center">
                        <template #image>
                            <van-image src="/images/empty/no-more.png" width="280" height="130"/>
                        </template>
                    </van-empty>
                </div>

                <div class="pa-4 tasks" v-if="topActive==='task'">
                    <div class="text-left body-2">{{$$t('received_1')}}：<span class="main-text">{{received}}</span>{{$$t('received_2')}}：<span
                            class="main-text">{{available}}</span>
                    </div>

                    <div v-if="activityStatusList.length > 0">
                        <template v-for="(item, index) in activityStatusList">
                            <div class="radius-2 task background-white py-2 mt-3 text-left" :key="index">
                                <div class="task_title caption white-text py-1" >{{item.title}}</div>
                                <van-row  gutter="25" type="flex" justify="space-between" align="center">
                                    <van-col span="16">
                                        <div class="text-left pl-4 mt-1">
                                            <div class="headline radius-1">{{item.completed}}/{{item.requirement}}</div>
                                            <van-slider :value="getSlider(item)" bar-height="6px" active-color="#518bff"
                                                        disabled
                                                        min="0" :max="item.requirement"
                                                        class="mt-1 radius-3">
                                                <template #button>
                                                    <div class="custom-button" style="display: none"></div>
                                                </template>
                                            </van-slider>

                                            <div class="caption text-grey mt-1">{{item.activityCalculationCycleDesc}}{{getTypeText(item)}}：{{currencySymbol}}{{item.requirement}}{{currencyDenomination}}</div>
                                            <div class="caption text-grey mt-1">{{$$t('reward')}}：{{item.gift}}{{currencyDenomination}}</div>
                                        </div>
                                    </van-col>
                                    <van-col span="8" class="pr-3">
                                        <div class="btn px-5" @click="goFinish(item)">{{getStatus(item.status)}}</div>
                                    </van-col>
                                </van-row>
                            </div>
                        </template>
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

export default {
	name: 'Preferential',

	data: () => ({
		activityGroups: [],
		groupActive: '',
		activityLists: [],
		activityStatusList: [],
		slider: 10,
		pageIndex: 1
	}),

	watch: {
		groupActive(v) {
			this.pageIndex = 1
			if (this.topActive === 'preferential') {
				this.activityLists = []
				this.onGetActivityList(v)
			} else {
				this.activityStatusList = []
				this.onGetActivityStatusList(v)
			}
		},

		topActive(v) {
			let e = this.groupActive
			this.pageIndex = 1
			if (v === 'preferential') {
				this.activityLists = []
				this.onGetActivityList(e)
			} else {
				this.activityStatusList = []
				this.onGetActivityStatusList(e)
			}
		}
	},

	computed: {
		topActive() {
			return this.$store.getters.topActive
		},

		received() {
			return this.activityStatusList.filter(e => Number(e.status) === 0 || Number(e.status) === -1).length
		},

		available () {
			return this.activityStatusList.filter(e => Number(e.status) === 1).length
        }
	},

	activated() {
		this.pageIndex = 1
		this.onGetActivityGroups()
	},

	methods: {
		onLoad(done) {
			if (this.topActive === 'preferential') {
				this.onGetActivityList(this.groupActive, done)
			} else {
				this.onGetActivityStatusList(this.groupActive, done)
			}
		},

		onGetActivityGroups() {
			this.$get('/api/Activity/GetActivityGroups')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					d.splice(0, 0, {objId: '', groupName: this.$t('common.all')});
					this.activityGroups = d
					if (d.length > 0) this.groupActive = d[0].objId
                    this.onRefresh()
				})
				.catch(error => {
					this.procError(error)
				})
		},

		onGetActivityList(groupId, done) {
			this.showProgress()
			this.$get(`/api/Activity/GetActivityList?groupId=${groupId}&pageSize=10&pageIndex=${this.pageIndex}`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.pageIndex = this.pageIndex + 1
					if (this.refresh) {
						this.activityLists = []
						this.activityLists = d.items
						if (done) {
							this.refresh = false
							done()
						}
					} else {
						if (d.items.length > 0) {
							this.activityLists.push(...d.items)
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

		onGetActivityStatusList(groupId, done) {
			this.showProgress()
			this.$get(`/api/Activity/GetActivityStatusList?groupId=${groupId}&pageSize=10&pageIndex=${this.pageIndex}`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.pageIndex = this.pageIndex + 1
					if (this.refresh) {
						this.activityStatusList = []
						this.activityStatusList = d.items
						if (done) {
							this.refresh = false
							done()
						}
					} else {
						if (d.items.length > 0) {
							this.activityStatusList.push(...d.items)
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

		onActivityReceive(item) {
			if (item.giftType === 1) {
				this.goDetails(item)
				return
            }
			this.$post('/api/Activity/ActivityReceive', {
				objId: item.objId,
				activityReceiveParams: null
			})
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$toast(data.data)
				})
				.catch(error => {
					this.procError(error)
				})
		},

		onRefresh(done) {
			this.refresh = true
			this.pageIndex = 1
			this.onLoad(done)
		},

		onLoadMore(done) {
			this.refresh = false
			this.onLoad(done)
		},

		goFinish(item) {
			if (Number(item.status) === 0) this.$router.push('dashboard')
			else if (Number(item.status) === 1) this.onActivityReceive(item)
		},

		getTypeText(item) {
			let type = item.requirementType
			return type === 0 ? this.$$t('requirementType_1') : (type === 1 ? this.$$t('requirementType_2') : (type === 2 ? this.$$t('requirementType_3') : this.$$t('requirementType_4')))
		},

		getStatus(s) {
			if (Number(s) === 0) return this.$$t('status_0')
			else if (Number(s) === 1) return this.$$t('status_1')
			else return this.$$t('status_2')
		},

		getTime(item) {
			if (item.endTime === null) return this.$$t('time')
			else return this.formatDate(item.startTime) + '~' + this.formatDate(item.endTime)
		},

		goDetails(item) {
			this.$router.push({path: 'preferential/details', query: {details_id: item.objId}})
		},

		getSlider(item) {
			if (Number(item.completed) >= Number(item.requirement)) return Number(item.requirement)
			return Number(item.completed) < 0 ? 0 : item.completed
		},

		$$t(v) {
			return this.$t('preferential.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#preferential {
    .lists {
        background-color: #f5f5f9;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 44px;

        .warp {
            padding-top: 12px;

            .item {
                border-radius: 8px;
                overflow: hidden;
                width: 343px;
                padding: 0;
                margin: 0 auto 12px;

                .van-image {
                    display: block;
                }

                .promotions-title {
                    text-align: left;
                    box-shadow: 0 0 4px 0 #e5e5e5;
                    background-color: #fff;
                    padding: 8px 8px 10px 8px;
                    position: relative;

                    .over {
                        display: inline-block;
                        width: 52px;
                        height: 52px;
                        background: url(/images/promotions/list/invalid-name-over.png) no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        top: 4px;
                        right: 20px;
                    }

                    h6 {
                        font-size: 14px;
                        color: #333;
                        font-weight: 500;
                    }

                    > div {
                        display: flex;
                        justify-content: space-between;
                        height: 16px;

                        p {
                            font-size: 12px;
                            color: #666;
                            margin-top: 4px;
                            display: flex;
                            align-items: center;

                            span {
                                display: block;
                            }

                            &:nth-child(1) .van-icon {
                                margin-right: 4px;
                            }
                        }
                    }
                }
            }
        }
    }

    .tasks {
        .task {
            .task_title {
                display: inline-flex;
                padding: 16px 12px;
                background-image: url("/images/preferential/title_bg.png");
                background-size: 100% 24px;
                background-repeat: no-repeat;
            }

            .btn {
                height: 32px;
                line-height: 32px;
                background-image: url("/images/promotions/task-btn.png");
                background-size: 100% 32px;
                background-repeat: no-repeat;
                color: white;
            }

            .custom-button {
                width: 0;
            }
        }
    }
}

</style>
