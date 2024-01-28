<template>
    <div id="notes">
        <van-tabs v-model="status" animated swipeable title-active-color="rgb(96, 142, 255)" color="rgb(77, 140, 252)">
            <van-tab v-for="(item, index) in getItems" :title="item.text" :key="index">
            </van-tab>
        </van-tabs>

        <div class="notes-content">
            <scroll-view
                    ref="easyRefresh"
                    :onRefresh="onRefresh"
                    :loadMore="onLoad">
                <div v-if="lists.length > 0">
                    <template v-for="(list, index) in lists">
                        <div class="notes-list" :key="index" @click.stop="redirectNotesDetails(list)">
                            <div class="left">
                                    <van-image
                                            round
                                            lazy-load
                                            width="1.2267rem"
                                            height="1.2267rem"
                                            :src="$portrait(list.categoryIco)"
                                    >
                                    <template slot="loading">
                                        <van-loading type="spinner" size="20"/>
                                    </template>
                                </van-image>
                            </div>
                            <div class="right">
                                <div class="right-left">
                                    <div class="title van-ellipsis">{{list.taskTitle}}</div>
                                    <div class="center">
                                        <van-tag color="#FBD079" size="medium">{{list.statusDesc}}</van-tag>
                                    </div>
                                </div>
                                <div class="right-r">
                                    <div class="number">{{currencySymbol}}{{list.price}}{{currencyDenomination}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="van-hairline--bottom" v-if="index < (lists.length-1)"
                             style="margin: 0 16px" :key="`${index}_note`"/>
                    </template>
                </div>

                <van-empty v-else :description="$t('common.noMore')" class="text-center">
                    <template #image>
                        <van-image src="/images/empty/task.png" width="280" height="130"/>
                    </template>

                    <van-button hairline block plain round color="rgb(96, 142, 255)"
                                @click="redirectTask">
                        {{$$t('btn')}}
                    </van-button>
                </van-empty>
            </scroll-view>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Notes',

	activated() {
		this.onRefresh()
	},

	data() {
		return {
			status: 0,
			refresh: false,
			pageIndex: 1,
			lists: [] // 防止v-if判断时出现页面闪动
		}
	},

	computed: {
		getItems() {
			return [
				{text: this.$$t('unfinished')},
				{text: this.$$t('review')},
				{text: this.$$t('finished')},
				{text: this.$$t('failure')}
			]
		}
	},

	watch: {
		status() {
			this.onRefresh()
		}
	},

	methods: {
		onLoad(done) {
			this.$post('/api/Task/GetTaskApplyPaged', {
				pageIndex: this.pageIndex,
				pageSize: 10,
				status: this.status
			})
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.pageIndex = this.pageIndex + 1
					if (this.refresh) {
						this.lists = []
						this.lists = d.items
						if (done) {
							setTimeout(() => {
								this.refresh = false
								done()
							}, 1000)
						}
					} else {
						if (d.items.length > 0) {
							this.lists.push(...d.items)
							setTimeout(() => {
								if (done) done(false)
							}, 1000)
						} else {
							setTimeout(() => {
								if (done) done(true)
							}, 1000)
						}
					}
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

		redirectNotesDetails(list) {
			this.$post('/api/Task/GetTask?objId=' + list.taskId)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					d.category_task_applyId = list.objId
					d.renounceStatus = d.status
					d.status = list.status
					d.statusDesc = list.statusDesc
					this.$sessionSet('Note-data', d)
					this.$router.push('notes/details')
				})
				.catch(error => {
					this.procError(error)
				})
		},

		redirectTask() {
			this.$router.push('/app/task')
		},

		$$t(v) {
			return this.$t('notes.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#notes {
    height: 100%;

    .notes-content {
        overflow: hidden;
        position: absolute;
        width: 100%;
        bottom: 50px;
        top: 48px;

        .notes-list {
            background-color: white;
            padding: 0 20px;
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .left {
                height: 46px;
                width: 46px;
            }

            .right {
                text-align: left;
                margin-left: 10px;
                width: 100%;
                height: 80px;
                display: flex;
                justify-content: space-between;

                .right-left {
                    width: 120px;

                    .title {
                        font-weight: 600;
                        margin-top: 16px;
                        line-height: 20px;
                        height: 20px;
                        font-size: 14px;
                    }

                    .center {
                        margin-top: 6px;
                    }
                }

                .right-r {
                    text-align: center;

                    .number {
                        height: 22px;
                        line-height: 22px;
                        font-size: 16px;
                        color: #CC332D;
                        margin-top: 34px;
                    }
                }
            }
        }
    }

    .van-button--plain {
        background-color: transparent;
    }

    .value-green {
        color: #13D167;
    }
}
</style>
