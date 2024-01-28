<template>
	<!--  我的下级  -->
	<div id="subordinate">
		<van-tabs v-model="active" animated swipeable>
			<van-tab v-for="(item, index) in items" :title="item" :key="index">
				<div class="details-content">
					<scroll-view :onRefresh="onRefresh" :loadMore="onLoad">
						<div v-if="lists.length > 0">
							<template v-for="(list, index) in lists">
								<div class="details-list" :key="index" @click="goDetails(list)">
									<div class="left">
										<van-image round fit="cover" width="40" height="40"
											src="/images/account/user.png" />
									</div>
									<div class="right">
										<div class="right-t">
											<div class="title">{{list.memberAccount}}</div>
											<div class="time">
												{{formatDateSS(list.lastLoginTime)}}
											</div>
										</div>
										<div class="right-b">
											<div class="desc">{{$$t('child')}}({{list.childAmount}})</div>
											<div class="status">{{(list.isOnline) ? $$t('online') : $$t('offline')}}
											</div>
										</div>
									</div>
								</div>
							</template>
						</div>
						<van-empty v-else :description="$t('common.noMore')" class="text-center">
							<template #image>
								<van-image src="/images/empty/no-more.png" width="280" height="130" />
							</template>
						</van-empty>
					</scroll-view>
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	export default {
		name: 'Subordinate',

		data() {
			return {
				active: 0,
				items: [
					this.$$t('level1'),
					this.$$t('level2'),
					this.$$t('level3')
				],
				lists: [],
				pageIndex: 1,
				refresh: false,
				membershipLevel: 1
			}
		},

		created() {
			this.onRefresh()
		},

		watch: {
			active(v) {
				this.membershipLevel = Number(v) + 1
				this.onRefresh()
			}
		},

		methods: {
			onLoad(done) {
				this.$post(
						`/api/MemberAgent/GetMemberAgentPage?membershipLevel=${this.membershipLevel}&pageSize=10&pageIndex=${this.pageIndex}&isDeposit=${true}`
					)
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
								this.refresh = false
								done()
							}
						} else {
							if (d.items.length > 0) {
								this.lists.push(...d.items)
								if (done) done(false)
							} else {
								if (done) done(true)
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

			goDetails(item) {
				this.$sessionSet('subordinate-item', item)
				this.$router.push('subordinate/details')
			},

			$$t(v) {
				return this.$t('subordinate.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#subordinate {
		height: 100%;

		/deep/ .van-tabs {
			height: 100%;
		}

		/deep/ .van-tabs__wrap {
			border-bottom: solid 1px #f5f6f7;
		}

		/deep/ .van-tabs__content {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 43px;
		}

		.details-content {
			overflow: hidden;
			position: absolute;
			width: 100%;
			bottom: 0;
			top: 0;

			.details-list {
				background-color: white;
				padding: 0 20px;
				width: 100%;
				height: 66px;
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
					height: 66px;
					margin-left: 12px;

					.right-t,
					.right-b {
						text-align: left;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.right-t {
						margin-top: 12px;

						.title {
							font-size: 14px;
						}

						.time {
							color: #999999;
						}
					}

					.right-b {
						margin-top: 5px;
						color: #999999;
					}
				}
			}
		}
	}
</style>
