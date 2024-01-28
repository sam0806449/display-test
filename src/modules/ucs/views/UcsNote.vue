<template>
	<div id="ucsNote">
		<van-tabs v-model="tab" color="rgb(64, 128, 255)" title-active-color="#4080ff">
			<van-tab :title="$$t('tab_0')" name="0"></van-tab>
			<van-tab :title="$$t('tab_1')" name="1"></van-tab>
		</van-tabs>


		<div class="flex space-between align-items-center mt-3 px-3">
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

			<div class="text-grey caption van-ellipsis ml-2">{{$$t('title_desc', {
				totalCount: totalData && totalData.totalCount,
				money: getMoneyUcsText(totalData && totalData.money),
				winMoney: getMoneyUcsText(totalData && totalData.winMoney)
			})}}</div>
		</div>

		<div class="notes-content" :style="{bottom : skgCode === skgUcsCode ? '0' : '50px'}">
			<scroll-view :onRefresh="onRefresh" :loadMore="onLoadMore">
				<div class="px-3 text-left pb-4 pt-3" v-if="items.length > 0">
					<template v-for="(item, index) in items">
						<div class="px-3 pt-4 pb-3 background-white radius-1 mb-3" style="position: relative;"
							:key="index" @click="goUcsNotesDetails(item)">
							<div class="caption-bold ucs-text">{{item.leagueName}}</div>
							<div class="mt-2 flex align-items-center subtitle-1">
								<div class="text_color mr-3">{{item.homeTeamName}}</div>
								<div class="mr-3">
									<van-image src="/images/ucs/vs.png" width="14" height="10"></van-image>
								</div>
								<div class="text_color">{{item.awayTeamName}}</div>
							</div>

							<div class="match_info mt-3 py-1 px-2 subtitle-5 radius-1 text-center">
								{{item.isFirstHalf ? $$t('half') : $$t('full')}} {{item.dropScore}} x{{item.odds}}%
							</div>

							<van-divider :style="{ color: '#d8d8d8', borderColor: '#d8d8d8', padding: '0' }"
								class="ma-0 mt-3" />

							<div class="flex mt-2 space-between subtitle-1">
								<div> <span class="ucs-text">{{$$t('bet')}} </span> <span
										class="text_color">{{currencySymbol}}{{item.money}}{{currencyDenomination}}</span>
								</div>
								<div> <span class="ucs-text">{{$$t('settlement')}} </span> <span
										class="text_color">{{currencySymbol}}{{item.winMoney}}{{currencyDenomination}}</span>
								</div>
							</div>

							<van-image
								:src="`/images/ucs/${getstatusImg(Number(item.status))}.png`" width="44"
								class="status_img"></van-image>
						</div>
					</template>
				</div>

				<van-empty v-else :description="$t('common.noMore')" class="text-center">
					<template #image>
						<van-image src="images/empty/no-more.png" width="280" height="130" />
					</template>
				</van-empty>
			</scroll-view>
		</div>
	</div>
</template>

<script>
	import {
		dateFormat,
		beforeByDay
	} from '@/common/js/dateUtil'
	export default {
		name: 'UcsNote',

		data: () => ({
			tab: 0,
			refresh: false,
			pageIndex: 1,
			items: [],
			dropdownTitle: '',
			date: 1,
			totalData: {}

		}),

		creatded () {
			this.dropdownTitle = this.$$t_date('today')
			this.onRefresh()
		},

		activated() {
			this.dropdownTitle = this.$$t_date('today')
			this.onRefresh()
		},

		computed: {
			startDate() {
				// beforeByDay
				if (this.date === 30) return this.getCurrentMonthFirst()
				else if (this.date === 7) return dateFormat(beforeByDay(new Date(), 7), 'yyyy-MM-dd')
				else if (this.date === 3) return dateFormat(beforeByDay(new Date(), 2), 'yyyy-MM-dd')
				else if (this.date === 2) return dateFormat(beforeByDay(new Date(), 1), 'yyyy-MM-dd')
				else return dateFormat(beforeByDay(new Date(), 0), 'yyyy-MM-dd')
			},

			dateOptions() {
				return [{
						text: this.$$t_date('nearlyAMonth'),
						value: 30
					},
					{
						text: this.$$t_date('nearlySevenDays'),
						value: 7
					},
					{
						text: this.$$t_date('nearlyTwoDays'),
						value: 3
					},
					{
						text: this.$$t_date('yesterday'),
						value: 2
					},
					{
						text: this.$$t_date('today'),
						value: 1
					}
				]
			},

			endDate() {
				let d = Number(this.date)
				if (d === 7 || d === 1 || d === 30) return dateFormat(new Date(), 'yyyy-MM-dd')
				else return dateFormat(beforeByDay(new Date(), Number(d - 1)), 'yyyy-MM-dd')
			}
		},

		watch: {
			tab() {
				this.onRefresh()
			},

			date() {
				this.onRefresh()
			}
		},

		methods: {
			onLoad(done) {
				this.showProgress()
				this.$post('/api/Match/QueryMatchOrder', {
						pageIndex: this.pageIndex,
						pageSize: 10,
						status: Number(this.tab),
						startDropTime: this.startDate,
						endDropTime: this.endDate
					})
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.totalData = d.totalData
						this.totalData.totalCount = d.paged.totalCount
						this.pageIndex = this.pageIndex + 1
						if (this.refresh) {
							this.items = []
							this.items = d.items
							if (done) {
								setTimeout(() => {
									this.refresh = false
									done()
								}, 1000)
							}
						} else {
							if (d.items.length > 0) {
								this.items.push(...d.items)
								setTimeout(() => {
									if (done) done(false)
								}, 1000)
							} else {
								setTimeout(() => {
									if (done) done(true)
								}, 1000)
							}
						}
						setTimeout(() => {
							this.showProgress(false)
						}, 1000)
					})
					.catch(error => {
						this.showProgress(false)
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


			typeClick(e) {
				this.dropdownTitle = e.text
				this.date = e.value
				this.$refs.type.toggle()
			},

			getstatusImg(status) {
				let e = ''
				if (status === 0) e = 'confirm'
				else if (status === 1) e = 'win'
				else if (status === 2) e = 'lose'
				else e = 'revoke'
				return e
			},

			goUcsNotesDetails(item) {
				this.$sessionSet('uscDetails-data', item)
				this.redirectRouter('ucsNotes/details')
			},

			getMoneyUcsText(v) {
				return this.currencySymbol + v + this.currencyDenomination
			},


			$$t_date(v) {
				return this.$t('teamReport.' + v)
			},
			$$t(v, P) {
				return this.$t('ucsNote.' + v, P)
			}
		}
	}
</script>

<style lang="less" scoped>
	#ucsNote {
		height: 100%;

		.text_color {
			color: #4d526b;
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
				padding: 0 20px;
				line-height: 32px;
				border-radius: 15px;
				background-color: #fff;
			}

			.van-dropdown-item {
				top: 145px !important;
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


		.notes-content {
			overflow: hidden;
			position: absolute;
			width: 100%;
			top: 100px;

			.match_info {
				background-color: #f6f6f6;
				display: inline-block;
			}

			.status_img {
				position: absolute;
				top: 55px;
				right: 16px;
			}
		}


	}
</style>
