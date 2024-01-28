<template>
	<div id="betLists">
		<van-dropdown-menu active-color="rgb(70 132 255)">
			<van-dropdown-item :title="dropdownTitle" ref="type">
				<div class="dropdown-warp">
					<div class="title">{{$$t('chooseType')}}</div>
					<div class="btns">
						<div class="btn van-ellipsis" :class="{active: recordType === type.value}"
							v-for="(type, index) in typeOptions" :key="index" @click="typeClick(type)">
							<span>{{type.text}}</span>
						</div>
					</div>
				</div>
			</van-dropdown-item>

			<van-dropdown-item :title="dateDropdownTitle" ref="date">
				<div class="dropdown-warp">
					<div class="btns">
						<div class="btn van-ellipsis" :class="{active: date === time.value}"
							v-for="(time, index) in dateOptions" :key="index" @click="timeClick(time)">
							<span>{{time.text}}</span>
						</div>
					</div>
				</div>
			</van-dropdown-item>
		</van-dropdown-menu>


		<div class="betLists">
			<scroll-view :onRefresh="onRefresh" :loadMore="onLoadMore" ref="betLists_scroll">
				<div class="px-4 pt-3 pb-4" v-if="items.length > 0">
					<div class="betList background-white van-hairline--surround radius-2 px-3 mb-2"
						v-for="(item, index) in items" :key="index" @click="goDetails(item)">
						<div class="top flex space-between align-items-center van-hairline--top-bottom">
							<div class="caption">{{item.createTime}}</div>
							<div class="caption text-grey">{{datesMaker(item.dates)}}
							</div>
						</div>

						<div class="py-2 radius-1">
							<!-- 两端对齐 -->
							<van-row type="flex" justify="space-between" align="center">
								<van-col span="22">
									<van-row type="flex" justify="space-between">
										<van-col span="12" class="text-left caption-bold">{{item.lotteryName}}</van-col>
										<van-col span="12">
											<div class="caption-bold text-right"
												:class="{status_0 : Number(item.status) === 0,status_1 : Number(item.status) === 1}">
												{{item.statusDesc}}
											</div>
										</van-col>
									</van-row>

									<van-row type="flex" justify="space-between">
										<van-col span="20">
											<div class="mt-2 text-left">
												<div class="betContent caption-bold" v-if="item.playType === 'Single'">
													{{item.betContent}}
												</div>

												<div v-else-if="item.groupName === 'Rps'">
													<div v-if="item.playType === 'Rps_Banker_Player'">
														<template v-for="(img, index) in getRpsBankerLists(item)">
															<van-image :src="`/images/lottery/rps/${img}.png`"
																width="24" height="24" class="mr-1" :key="index" />
														</template>
													</div>

													<div v-else-if="item.playType === 'Rps_Mora'">
														<van-image :src="`/images/lottery/rps/${item.betContent}.png`"
															width="24" height="24" v-if="culture === 'zh-CN'" />

														<van-image
															:src="`/images/lottery/rps/${item.betContent}_en.png`"
															width="24" height="24" v-else />
													</div>

													<van-image :src="`/images/lottery/rps/${item.betContent}.png`"
														width="24" height="24" v-else />
												</div>

												<van-image :src="`/images/lottery/guess/${item.betContent}.png`"
													height="24" v-else-if="item.playType === 'Guess'" />
												<div class="subtitle-1 " v-else-if="item.playType === 'DoubleSide'">
													{{item.betContentName}}
												</div>

												<div class="flex align-items-center"
													v-else-if="item.groupName === 'SicBo'">
													<div class="subtitle-3" v-if="item.playType === 'Sum'">
														{{item.betContent}}({{item.playTypeName}})
													</div>

													<div class="flex align-items-center" v-else>
														<van-image :src="`/images/lottery/sicBo/${e}.png`"
															v-for="(e, i) in getPaigowArray(item.betContent)" :key="i"
															width="20" height="20" :class="{'mr-1': i === 0}">
														</van-image>
													</div>
												</div>

												<div class="van-ellipsis" v-else-if="item.groupName === 'Mark6' || item.groupName === 'VNSouth' || item.groupName === 'SSC' || item.groupName === 'PK10' || item.groupName === 'K3'">
													[{{item.playTypeName}}] {{item.betContentName}}
												</div>

												<van-image :src="`/images/lottery/${getColors(item.betContent)}.png`"
													width="28" height="24" v-else />
											</div>
										</van-col>
										<van-col span="4">
										</van-col>
									</van-row>

									<van-row type="flex" justify="space-between">
										<van-col span="12" class="text-left">
											<div class="caption bet_money mt-2">
												{{$t('lottery.betMoney')}}：{{item.currencySymbol}}{{item.money}}{{item.currencyDenomination}}
											</div>
										</van-col>

										<van-col span="12">
											<div class="caption-bold mt-2 text-right"
												:class="{status_1 : Number(item.status) === 1}"
												>{{item.currencySymbol + item.winMoney + item.currencyDenomination}}
											</div>
											<!-- <div class="mt-2 text-right" v-else>- -</div> -->
										</van-col>
									</van-row>
								</van-col>

								<van-col span="2">
									<div class="ml-1">
										<van-icon name="arrow" size="16" />
									</div>
								</van-col>
							</van-row>
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
	</div>
</template>

<script>
	import {
		beforeByDay,
		dateFormat
	} from "@/common/js/dateUtil";

	export default {
		name: 'BetLists',

		data: () => ({
			recordType: '',
			dropdownTitle: '',
			dateDropdownTitle: '',
			date: 1,
			refresh: false,
			pageIndex: 1,
			items: []
		}),

		created() {
			this.dropdownTitle = this.typeOptions[0].text
			this.dateDropdownTitle = this.dateOptions[3].text
		},

		activated() {
			this.onRefresh()
		},

		computed: {
			startDate() {
				// beforeByDay
				if (this.date === 7) return dateFormat(beforeByDay(new Date(), 7), 'yyyy-MM-dd')
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

			typeOptions() {
				return [{
						text: this.$$t('all'),
						value: ''
					},
					{
						text: this.$$t('type_1'),
						value: '0'
					},
					{
						text: this.$$t('type_2'),
						value: '2'
					},
					{
						text: this.$$t('type_3'),
						value: '1'
					},
					{
						text: this.$$t('type_4'),
						value: '-1'
					},
				]
			},

			endDate() {
				let d = Number(this.date)
				if (d === 7 || d === 1) return dateFormat(new Date(), 'yyyy-MM-dd')
				else return dateFormat(beforeByDay(new Date(), Number(d - 1)), 'yyyy-MM-dd')
			}
		},

		methods: {
			onLoad(done) {
				this.showProgress()
				this.$get(
						`/api/Lottery/GetDropBillRecord?status=${this.recordType}&pageIndex=${this.pageIndex}&pageSize=20&startDate=${this.startDate}&endDate=${this.endDate}`
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

			onLoadMore(done) {
				this.refresh = false
				this.onLoad(done)
			},

			onRefresh(done) {
				this.refresh = true
				this.pageIndex = 1
				this.onLoad(done)
			},

			timeClick(e) {
				this.$refs.betLists_scroll.goTop()
				this.dateDropdownTitle = e.text
				this.date = e.value
				this.items = []
				this.onRefresh()
				this.$refs.date.toggle()
			},

			typeClick(e) {
				this.$refs.betLists_scroll.goTop()
				this.dropdownTitle = e.text
				this.recordType = e.value
				this.items = []
				this.onRefresh()
				this.$refs.type.toggle()
			},

			getColors(t) {
				if (t === '' || t === null || !t) return
				let c = t.split(",")
				if (c.length > 1) return c[0] + '_' + c[1]
				else return c[0]
			},

			getRpsBankerLists(e) {
				let c = e.betContent.split("_")
				let arr = []
				arr.push('Banker_' + c[0])
				arr.push('Player_' + c[1])
				if (e.playType === 'Rps_Banker_Player') return arr
				else return e.betContent.split(",")
			},

			goDetails(item) {
				sessionStorage.setItem('betLists-Data', JSON.stringify(item))
				this.$router.push('betLists/details')
			},

			getPaigowArray(v) {
				return v.split("&")
			},

			$$t(v) {
				return this.$t('betLists.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#betLists {
		.dropdown-warp {
			padding: 12px 12px 0 12px;

			.active {
				background: url("/images/task/dropdown-menu.png") no-repeat;
				background-size: 100% 32px;

				span {
					color: white !important;
				}
			}

			.title {
				height: 20px;
				line-height: 20px;
				font-size: 14px;
				font-weight: 500;
				text-align: left;
				color: #333333;
			}

			.btns {
				margin-top: 12px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.btn {
					width: 115px;
					height: 32px;
					margin-bottom: 12px;
					border-radius: 16px;
					background-color: #f5f5f9;
					text-align: center;
					padding: 8px 0;

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


		.betLists {
			overflow: hidden;
			position: absolute;
			width: 100%;
			bottom: 0;
			top: 44px;

			.betList {
				color: rgb(51, 51, 51);

				.top {
					height: 30px;
					line-height: 30px;
				}

				.bet_money {
					color: rgb(70, 132, 255);
				}

				.status_0 {
					color: rgb(68, 187, 0);
				}

				.status_1 {
					color: rgb(224, 32, 32);
				}
			}
		}
	}
</style>
