<template>
	<div id="task">
		<van-dropdown-menu active-color="rgb(70 132 255)">
			<van-dropdown-item :title="dropdownTitle" ref="type">
				<div class="dropdown-warp">
					<div class="btns">
						<div class="btn van-ellipsis" :class="{active: categoryCode === c.code}"
							v-for="(c, index) in categorys" :key="index" @click="typeClick(c)">
							<span>{{c.name}}</span>
						</div>
					</div>
				</div>
			</van-dropdown-item>
			<van-dropdown-item v-model="order" :options="getOrders" />
		</van-dropdown-menu>

		<div class="task-content">
			<scroll-view :onRefresh="onRefresh" :loadMore="onLoadData">
				<div v-if="lists.length > 0">
					<template v-for="(list, index) in lists">
						<div class="task-list" :key="index" @click.stop="goTaskDetails(list)">
							<div class="left">
								<van-image width="46" height="46" lazy-load :src="$portrait(list.categoryIco)">
									<template slot="loading">
										<van-loading type="spinner" size="20" />
									</template>
								</van-image>
							</div>
							<div class="right">
								<van-row type="flex" justify="space-between" gutter="4">
									<van-col span="12">
										<div class="title van-ellipsis">{{list.title}}</div>
										<div class="desc">{{$$t('surplus')}}：{{Number(list.maxNum) -
                                	      Number(list.applyNum)}}/{{Number(list.maxNum)}}
										</div>
										<div class="center">
											<van-tag color="#FBD079" size="medium">{{list.categoryName}}</van-tag>
										</div>
									</van-col>
									<van-col span="8">
										<div class="right-r text-center">
											<div class="number">{{currencySymbol}}{{list.price}}{{currencyDenomination}}
											</div>
											<div class="btn" @click.stop="applyTask(list)">{{list.isApply ? $$t('received') :
                                	          $$t('receive')}}
											</div>
										</div>
									</van-col>
								</van-row>
							</div>
						</div>
						<div class="van-hairline--bottom" v-if="index < (lists.length-1)" :key="`${index}_t`"
							style="margin: 0 16px" />
					</template>
				</div>

				<van-empty v-else :description="$t('common.noMore')" class="text-center">
					<template #image>
						<van-image src="/images/empty/no-more.png" width="280" height="130" />
					</template>
				</van-empty>
			</scroll-view>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Task',

		activated() {
			this.onLoadTaskCategory()
			this.onRefresh()
		},

		data() {
			return {
				order: '0',
				dropdownTitle: this.$$t('type'),
				refresh: false,
				lists: [],
				categorys: [],
				categoryCode: '',
				pageIndex: 1,
			}
		},
		computed: {
			getOrders() {
				return [{
						text: this.$$t('defaultSort'),
						value: '0'
					},
					{
						text: this.$$t('latestSort'),
						value: '1'
					},
					{
						text: this.$$t('highestCommission'),
						value: '2'
					},
				]
			},
		},

		watch: {
			order() {
				this.onRefresh()
			}
		},

		methods: {
			onLoadData(done) {
				this.$post('/api/Task/GetTaskPaged', {
						pageIndex: this.pageIndex,
						pageSize: 10,
						categoryCode: this.categoryCode,
						orderBy: this.order
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
							this.refresh = false
							setTimeout(() => {
								if (done) done()
							}, 1000)
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
						if (done) done(true)
						this.procError(error)
					})
			},

			onLoadTaskCategory() {
				this.$post('/api/Task/GetTaskCategory?isHome=false')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						d.splice(0, 0, {
							code: '',
							name: this.$t('common.all')
						});
						this.dropdownTitle = d.filter(e => e.code === this.categoryCode)[0].name
						this.categorys = d
					})
					.catch(error => {
						this.procError(error)
					})
			},

			applyTask(item) {
				let objId = item.objId
				let category_task_applyId = null
				if (item.isApply) {
					this.$error(this.$$t('received'))
					return
				}
				this.showProgress()
				this.$post('/api/Task/ApplyTask?objId=' + objId)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						category_task_applyId = data.data
						return this.$post('/api/Task/GetTask?objId=' + objId)
					})
					.then(resp => {
						this.showProgress(false)
						let d = resp.data.data
						d.category_task_applyId = category_task_applyId
						d.status = 0
						d.renounceStatus = 1
						d.statusDesc = this.$$t('unfinished')
						this.$sessionSet('Note-data', d)
						this.$router.push('notes/details')
						this.$success(this.$$t('receiveDesc'));
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			typeClick(e) {
				this.dropdownTitle = e.name
				this.categoryCode = e.code
				this.onRefresh()
				this.$refs.type.toggle()
			},

			goTaskDetails(list) {
				this.$post('/api/Task/GetTask?objId=' + list.objId)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.$sessionSet('Task-Data', data.data)
						this.$router.push({
							path: '/task/details',
							query: {
								task_objId: list.objId
							}
						})
					})
					.catch(error => {
						this.procError(error)
					})
			},

			onRefresh(done) {
				this.refresh = true
				this.pageIndex = 1
				this.onLoadData(done)
			},

			$$t(v) {
				return this.$t('task.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#task {
		height: 100%;

		/deep/ .van-dropdown-menu__title {
			height: 32px;
			width: 130px;
			line-height: 32px;
			border-radius: 15px;
			background-color: #F8F8F7;
		}

		/deep/ .van-dropdown-menu__title--active {
			background-image: url("/images/task/dropdown-menu.png");
			background-size: 100%;
			color: white !important;
		}

		.active {
			background: url("/images/task/dropdown-menu.png") no-repeat;
			background-size: 100% 32px;

			span {
				color: white !important;
			}
		}

		/deep/ .van-dropdown-menu__title::after {
			right: 20px;
		}

		/deep/ .van-dropdown-menu__bar {
			box-shadow: none;
		}

		.dropdown-warp {
			padding: 20px 10px 10px 10px;

			.btns {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.btn {
					width: 111px;
					line-height: 32px;
					margin-bottom: 12px;
					border-radius: 16px;
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

			.btns:after {
				display: block;
				content: "";
				width: 30%;
				height: 0px;
			}
		}

		.task-content {
			overflow: hidden;
			position: absolute;
			width: 100%;
			bottom: 50px;
			top: 48px;

			.task-list {
				padding: 0 16px;
				width: 100%;
				height: 90px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				background-color: white;

				.left {
					margin-left: 12px;
					width: 46px;
					height: 46px;
				}

				.right {
					text-align: left;
					margin-left: 16px;
					width: 100%;
					height: 90px;

					.title {
						max-width: 160px;
						font-size: 14px;
						font-weight: 600;
						margin-top: 10px;
					}

					.center {
						margin-top: 8px;
					}

					.right-r {
						text-align: center;

						.number {
							height: 20px;
							line-height: 20px;
							font-size: 14px;
							color: #CC332D;
							margin-top: 14px;
						}

						.btn {
							background: url("/images/task/btn.png") no-repeat;
							background-size: 80px 32px;
							width: 80px;
							height: 32px;
							text-align: center;
							line-height: 32px;
							margin-top: 5px;
							color: #fff;
							display: inline-block;
						}
					}

					.desc {
						margin-top: 2px;
						font-size: 12px;
						color: #666666;
					}
				}
			}
		}

	}
</style>
