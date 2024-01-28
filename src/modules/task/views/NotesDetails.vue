<template>
    <div id="notesDetails">
        <scroller>
            <div class="notesDetails-content">
                <div class="notesDetails-list">
                    <div class="left">
                        <van-image
                                width="46"
                                height="46"
                                :src="$portrait(task.categoryIco)"
                        />
                    </div>
                    <div class="right">
                        <div>
                            <div class="title">{{task.title}}</div>
                        </div>
                        <div class="right-r">
                            <div class="number">{{currencySymbol}}{{task.price}}{{currencyDenomination}}</div>
                        </div>
                    </div>
                </div>

                <div class="desc">
                    <van-cell :title="$$t('numbers')"
                              :value="`${Number(task.applyNum)}${$$t('done')}，${$$t('surplus')}${Number(task.maxNum) - Number(task.applyNum)}${$$t('piece')}`"/>
                    <van-cell :title="$$t('status')" :value="getStatus(task.isEnd)"
                              :value-class="taskStatusClass(task.isEnd)"/>
                    <van-cell :title="$$t('createdTime')" :value="formatDate(task.createTime)"/>
                    <van-cell :title="$$t('endTime')" :value="formatDate(task.endTime)"/>
                    <van-cell :title="$$t('rewardRequest')" :value="task.info" value-class="van-ellipsis"/>
                    <van-cell :title="$$t('taskLink')" :value="task.taskLink" @click.stop="goLink"
                              value-class="value-green">
                        <van-icon slot="right-icon" name="images/common/copy.png" class="ml-2" size="20" @click.stop="copyBtnClick(task.taskLink)"/>
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

        <van-tabbar fixed v-if="Number(task.status) === 0 && task.renounceStatus===1">
            <van-button hairline icon="images/task/renounce.png" class="renounce" @click="onRenounce">
                {{$$t('renounce')}}
            </van-button>
            <van-button hairline color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))" class="submit"
                        @click="$router.push('/app/task/submit')">
                {{$$t('submit')}}
            </van-button>
        </van-tabbar>

        <van-tabbar fixed v-if="Number(task.renounceStatus)===0">
            <van-button hairline icon="images/task/renounce.png" block @click="onRenounce">
                {{$$t('renounce')}}
            </van-button>
        </van-tabbar>


    </div>
</template>

<script>
export default {
	name: 'NotesDetails',

	activated() {
		this.task = this.$sessionGet('Note-data')
	},

	data() {
		return {
			activeNames: ['1'],
			task: {}
		}
	},

	methods: {
		onRenounce() {
			this.$dialog.confirm({
				title: this.$t('common.point'),
				message: this.$t('common.renounceDesc'),
			})
				.then(() => {
					this.$post('/api/Task/GiveupTask?taskApplyObjId=' + (this.task && this.task.category_task_applyId))
						.then(resp => {
							return this.checkResp(resp, (r) => r.data.success === true)
						})
						.then(data => {
							this.$toast(data.data)
							this.$router.push('/app/taskNotes')
						})
						.catch(error => {
							this.procError(error)
						})
				})
		},

		goLink () {
			window.open(this.task.taskLink)
		},

		getStatus(isEnd) {
			return isEnd ? this.$$t('isEnd') : this.task && this.task.statusDesc
		},

		taskStatusClass(isEnd) {
			let status = this.task.status
			if (status === -2 || status === -1 || status === 3 || isEnd) return 'task-status-red'
			else return 'task-status-green'
		},

		$$t(v) {
			return this.$t('notesDetails.' + v)
		}
	},

	beforeRouteLeave(to, form, next) {
		if (to.name !== 'taskSubmit') {
			sessionStorage.removeItem('Note-data')
		}
		next()
	}
}
</script>

<style lang="less" scoped>
#notesDetails {
    height: 100%;
    background-color: #F5F5F9;

    .notesDetails-content {
        text-align: left;

        .task-status-green {
            color: #13D167;
        }

        .task-status-red {
            color: red;
        }

        .notesDetails-list {
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

    .renounce {
        width: 130px;

        .van-button__text {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .submit {
        width: 245px;
    }

    .value-green {
        color: #2440b3;
    }
}
</style>
