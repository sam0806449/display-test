<!-- 游戏注单 -->
<template>
	<div id="gamebet">
		<van-dropdown-menu active-color="rgb(0 145 255)">
			<van-dropdown-item :title="dropdownTitle" ref="type">
				<div class="dropdown-warp">
					<div class="btns">
						<div class="btn" :class="{active: platform === c.value}" v-for="(c, index) in openPlatforms"
							:key="index" @click="typeClick(c)">
							<span>{{c.text}}</span>
						</div>
					</div>
				</div>
			</van-dropdown-item>
			<van-dropdown-item v-model="date" :options="dateOptions" />
		</van-dropdown-menu>

		<div class="gamebet-content">
			<scroll-view :onRefresh="onRefresh" :loadMore="onLoadMore">
				<div class="py-2 px-4" v-if="items.length > 0">
					<div class="gamebet-list" v-for="(item, index) in items" :key="index" @click="goDetails(item)">
						<div class="gamebet-list-t flex">
							<div class="text-left flex">
								<div class="subtitle-1">{{item.gameName}} <span class="caption">（{{item.platformName}}）</span> </div>
							</div>
							<div class="text-right">{{item.orderTime}}</div>
						</div>
						
						<div class="gamebet-list-b flex space-between align-items-center mt-1">
							<div>{{$$t('betAmount')}}：{{item.currencySymbol}}{{item.betMoneyY}}{{currencyDenomination}}</div>
							<div
							:class="{profit_win: Number(item.profitMoneyY) > 0}">{{$$t('profit')}}：{{item.currencySymbol}}{{item.profitMoneyY}}{{currencyDenomination}}</div>
						</div>
					</div>
				</div>

				<van-empty v-else :description="$t('common.noMore')" class="text-center">
					<template #image>
						<van-image src="/images/empty/no-more.png" width="280" height="130" />
					</template>
				</van-empty>
			</scroll-view>
		</div>

		<div class="totalData px-4 py-3 background-white text-left text-grey_1">
			<van-row type="flex" justify="space-between">
				<van-col span="12">
					{{$$t('total')}}: <span class="text-black body-2">({{dateText}})</span>
				</van-col>
				<van-col span="12"  class="text-right">
					{{$$t('betMoneyY')}}：<span
						class="text-black subtitle-1">{{getMText(totalData && totalData.betMoneyY)}}</span>
				</van-col>
			</van-row>

			<van-row type="flex" justify="space-between" class="mt-3">
				<van-col span="12">
					{{$$t('realBetMoneyY')}}: <span
						class="text-black subtitle-1">{{getMText(totalData && totalData.realBetMoneyY)}}</span>
				</van-col>
				<van-col span="12" class="text-right">
					{{$$t('profitMoneyY')}}：
					<span class="red-text subtitle-1">{{getMText(totalData && totalData.profitMoneyY)}}</span>
				</van-col>
			</van-row>
		</div>
	</div>
</template>

<script>
	import {
		dateFormat,
		beforeByMonth,
		beforeByDay
	} from '@/common/js/dateUtil'

	export default {
		name: 'GameBet',
		data() {
			return {
				platform: '',
				date: 1,
				openPlatforms: [],
				items: [],
				refresh: false,
				pageIndex: 1,
				dropdownTitle: '',
				totalData: {}
			}
		},

		computed: {
			startDate() {
				// beforeByDay
				if (this.date === 30) return dateFormat(beforeByMonth(new Date(), 1), 'yyyy-MM-dd')
				else if (this.date === 7) return dateFormat(beforeByDay(new Date(), 7), 'yyyy-MM-dd')
				else if (this.date === 3) return dateFormat(beforeByDay(new Date(), 2), 'yyyy-MM-dd')
				else if (this.date === 2) return dateFormat(beforeByDay(new Date(), 1), 'yyyy-MM-dd')
				else return dateFormat(beforeByDay(new Date(), 0), 'yyyy-MM-dd')
			},

			dateOptions() {
				return [{
						text: this.$$t('nearlySevenDays'),
						value: 7
					},
					{
						text: this.$$t('nearlyTwoDays'),
						value: 3
					},
					{
						text: this.$$t('yesterday'),
						value: 2
					},
					{
						text: this.$$t('today'),
						value: 1
					}
				]
			},

			endDate() {
				if (this.date === 7 || this.date === 1) return dateFormat(new Date(), 'yyyy-MM-dd')
				else return dateFormat(beforeByDay(new Date(), Number(this.date - 1)), 'yyyy-MM-dd')
			},

			dateText() {
				let e = this.dateOptions.filter(e => e.value === Number(this.date))[0]
				return e.text
			}
		},

		watch: {
			platform() {
				this.pageIndex = 1
				this.items = []
				this.onRefresh()
			},

			date() {
				this.items = []
				this.pageIndex = 1
				this.onRefresh()
			}
		},

		created() {
			this.GetOpenPlatforms()
		},

		methods: {
			GetOpenPlatforms() {
				this.$get('/api/Game/GetOpenPlatforms')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						if (this.skgCode === this.skyLotteryCode) {
							this.openPlatforms.push({
								value: 'SGLottery',
								text: this.$$t('SGLottery')
							})
						} else {
						this.openPlatforms = d.map(e => {
							return {
								text: e.platformName,
								value: e.platformCode
							}
						})
						this.openPlatforms.splice(0, 0, {
							value: '',
							text: this.$$t('all')
						});
						
						if (this.skgCode === this.skgGameCode) {
							this.openPlatforms.splice(1, 0, {
								value: 'SGLottery',
								text: this.$$t('SGLottery')
							});
							
							this.openPlatforms.splice(2, 0, {
								value: 'SGUcs',
								text: this.$$t('SGUcs')
							});
						} else {
							this.openPlatforms.splice(1, 0, {
								value: 'SGUcs',
								text: this.$$t('SGUcs')
							});
						}
						}
						
						this.dropdownTitle = this.openPlatforms[0].text
						this.platform = this.openPlatforms[0].value
						this.refresh = true
						this.pageIndex = 1
						this.onQueryGameOrder()

					})
					.catch(error => {
						this.procError(error)
					})
			},

			onQueryGameOrder(done) {
				this.showProgress()
				this.$get(
						`/api/Game/QueryGameOrder?platformCode=${this.platform}&pageSize=20&pageIndex=${this.pageIndex}&startDate=${this.startDate}&endDate=${this.endDate}`
						)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.pageIndex = this.pageIndex + 1
						if (this.refresh) {
							this.items = []
							this.items = d.items
							this.totalData = d.totalData
							if (done) {
								this.refresh = false
								done()
							}
						} else {
							if (d.items.length > 0) {
								this.items.push(...d.items)
								this.totalData = d.totalData
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

			onLoadMore(done) {
				this.refresh = false
				this.onQueryGameOrder(done)
			},

			onRefresh(done) {
				this.refresh = true
				this.pageIndex = 1
				this.onQueryGameOrder(done)
			},

			typeClick(e) {
				this.dropdownTitle = e.text
				this.platform = e.value
				this.$refs.type.toggle()
			},

			goDetails(item) {
				this.$sessionSet('game-item', item)
				this.$router.push('gamebet/details')
			},

			getMText(v) {
				return this.currencySymbol + v + this.currencyDenomination
			},

			$$t(v) {
				return this.$t('gameBet.' + v)
			}
		}
	}
</script>

<style lang="less">
	#gamebet {
		/deep/ .van-dropdown-menu {
			.van-dropdown-menu__bar {
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

			.btns:after {
				display: block;
				content: "";
				width: 30%;
				height: 0px;
			}
		}

		.gamebet-content {
			overflow: hidden;
			position: absolute;
			width: 100%;
			bottom: 80px;
			top: 48px;

			.gamebet-content-warp {
				height: 100%;
				padding-top: 12px;
			}

			.gamebet-list {
				padding: 8px 12px 10px;
				border-radius: 8px;
				box-shadow: 0 0 4px 0 #e5e5e5;
				background-color: #ffffff;
				margin: 0 auto 8px;
				flex-direction: column;
				display: flex;
				justify-content: space-between;

				div {
					color: #333333;
				}

				.gamebet-list-t {
					font-size: 12px;
					color: #999;
					justify-content: space-between;
					align-items: center;

					span {
						color: #999;
					}
				}

				.gamebet-list-b {
					justify-content: space-between;
					align-items: center;

					.profit_win {
						color: red;
					}
				}
			}
		}

		.totalData {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
</style>
