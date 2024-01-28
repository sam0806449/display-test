<template>
    <div id="taskDetails">
        <scroller>
            <div class="taskDetails-content">
                <div class="taskDetails-list">
                    <div class="left">
                        <van-image
                                width="46"
                                height="46"
                                :src="$portrait(task && task.categoryIco)"
                        />
                    </div>
                    <div class="right">
                        <div>
                            <div class="title">{{task && task.title}}</div>
                        </div>
                        <div class="right-r">
                            <div class="number">{{currencySymbol}}{{task && task.price}}{{currencyDenomination}}</div>
                        </div>
                    </div>
                </div>

                <div class="desc">
                    <van-cell :title="$$t('numbers')"
                              :value="`${Number(task.applyNum)}${$$t('done')}，${$$t('surplus')}${Number(task.maxNum) - Number(task.applyNum)}${$$t('piece')}`"/>
                    <van-cell :title="$$t('createdTime')" :value="formatDate(task && task.createTime)"/>
                    <van-cell :title="$$t('endTime')" :value="formatDate(task && task.endTime)"/>
                    <van-cell :title="$$t('rewardRequest')" :value="task.info"/>
                    <van-cell :title="$$t('taskLink')" :value="task.taskLink" @click.stop="goLink"
                              value-class="value-green">
                        <van-icon slot="right-icon" name="images/common/copy.png" size="20" class="ml-2" @click.stop="copyBtnClick(task.taskLink)"/>
                    </van-cell>

                    <div class="desc-task">
                        <div class="flex space-between align-items-center">
                            <div class="title">{{$$t('description')}}</div>
                            <van-icon name="images/common/copy.png" size="20" @click.stop="copyBtnClick(task.content)"/>
                        </div>
                        <div class="text">
                            <easyRefresh :userSelect="false">
                                {{task.content}}
                            </easyRefresh>
                        </div>
                    </div>
                </div>

                <van-collapse v-model="activeNames">
                    <van-collapse-item :title="$$t('step')" name="1">
                        <div v-html="task.stepInfo"></div>
                    </van-collapse-item>
                </van-collapse>
            </div>
        </scroller>


        <van-tabbar fixed>
            <van-button hairline block color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))" @click="applyTask"
                        class="submit">
                {{$$t('recieveTask')}}
            </van-button>
        </van-tabbar>
    </div>
</template>

<script>
export default {
	name: 'TaskDetails',

	activated() {
		this.task = this.$sessionGet('Task-Data')
	},


	data() {
		return {
			activeNames: ['1'],
			task: {}
		}
	},

	methods: {
		applyTask() {
			let objId = this.$route.query.task_objId
			if (!objId) return
			this.showProgress()
			this.$post('/api/Task/ApplyTask?objId=' + objId)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(() => {
					this.showProgress(false)
					this.$success(this.$t('task.receiveDesc'));
					this.$router.push('/app/task')
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

        goLink () {
			window.open(this.task.taskLink)
        },

		$$t(v) {
			return this.$t('taskDetails.' + v)
		}
	},


	beforeRouteLeave(to, form, next) {
		if (to.name !== 'taskRules') sessionStorage.removeItem('Task-Data')
		next()
	},

	beforeRouteEnter(to, from, next) {
		let e = to.query.task_objId
		if (!e) next('/task')
		else next()
	}
}
</script>

<style lang="less" scoped>
#taskDetails {
    height: 100%;
    background-color: #F5F5F9;

    /deep/ .v-easy-refresh {
        .v-easy-refresh-header, .v-easy-refresh-footer {
            display: none;
        }
    }

    .taskDetails-content {
        text-align: left;

        .taskDetails-list {
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 1px solid #f5f6f7;
            background-color: white;

            .left {
                height: 46px;
                width: 46px;
                margin-left: 16px;
            }

            .right {
                margin-left: 16px;
                width: 100%;
                height: 80px;
                display: flex;
                justify-content: space-between;

                .title {
                    font-weight: 600;
                    margin-top: 16px;
                    line-height: 20px;
                    height: 20px;
                    font-size: 14px;
                }

                .right-r {
                    text-align: center;
                    margin-right: 16px;

                    .number {
                        height: 22px;
                        line-height: 22px;
                        font-size: 16px;
                        color: #CC332D;
                        margin-top: 30px;
                    }
                }
            }
        }

        .desc {
            text-align: left;
            background-color: white;

            .desc-task {
                height: 90px;
                padding: 0 16px;

                .title {
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: 600;
                    margin-top: 10px;
                }

                .text {
                    margin-top: 6px;
                    color: #999999;
                    height: 60px;
                }
            }
        }

        .van-collapse {
            margin-top: 10px;
            padding-bottom: 50px;
        }
    }

    .van-button {
        height: 50px;

        .van-button__text {
            font-size: 18px;
        }
    }

    .value-green {
        color: #2440b3;
    }
}
</style>
