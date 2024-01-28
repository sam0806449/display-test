<template>
	<div id="tournaments">
		<van-tabs v-model="tab" animated swipeable title-active-color="rgb(96, 142, 255)" color="rgb(77, 140, 252)">
			<van-tab v-for="(item, index) in tabOptions" :title="item.text" :name="item.tag" :badge="getCount(item)"
				:key="index">
			</van-tab>
		</van-tabs>

		<van-tabs v-model="finishedTab" type="card" color="rgb(77, 140, 252)" class="pt-2" :before-change="beforeChange"
			v-if="tab===3">
			<template v-for="item in finishedDateOptions">
				<van-tab :title="item.text" :name="item.tag" :key="item.tag"></van-tab>
			</template>
		</van-tabs>

		<div class="notes-content" :style="styleOption">
			<div v-if="tab !== 2 " class="notes-warps">
				<scroll-view :onRefresh="onRefresh" :loadMore="onLoadMore" ref="league_scroll">
					<div class="pa-3" v-if="items.length > 0">
						<template v-for="(item, index) in items">
							<div class="background-white pa-3 radius-1 mb-2" :key="index" @click="goBets(item)">
								<van-row type="flex" justify="space-between" align="center">
									<van-col span="6" class="text-left text-grey_1">
										{{formatDateUcs(item.startTime, 'MM_dd')}}(UTC-5)
									</van-col>
									<van-col span="12" class="text-center text-grey_1 caption-bold">{{item.leagueName}}
									</van-col>
									<van-col span="6" class="text-right"> <span
											class="text-grey_1 caption-bold">{{$$t('volume')}}</span>
										<span style="color: rgb(241, 153, 74);"> {{item.fullTimeVolume}}</span>
									</van-col>
								</van-row>

								<div class="mt-4">
									<van-row type="flex" justify="space-between" align="center"
										v-if="Number(item.status) !== 3">
										<van-col span="10" class="text-center teamName">
											<van-image :src="item.homeTeamLogo || '/images/ucs/match.png'" width="38">
												<template v-slot:loading>
													<van-loading type="spinner" size="22" />
												</template>
											</van-image>
											<div class="mt-1">{{item.homeTeamName}}</div>
										</van-col>
										<van-col span="4" class="text-center">
											<van-image src="/images/ucs/vs.png" width="31" height="22"></van-image>
										</van-col>
										<van-col span="10" class="text-center teamName">
											<van-image :src="item.awayTeamLogo || '/images/ucs/match.png'" width="38">
												<template v-slot:loading>
													<van-loading type="spinner" size="22" />
												</template>
											</van-image>
											<div class="mt-1">{{item.awayTeamName}}</div>
										</van-col>
									</van-row>

									<van-row type="flex" justify="space-between" align="center" v-else>
										<van-col span="6" class="text-center teamName">
											<van-image :src="item.homeTeamLogo || '/images/ucs/match.png'" width="38">
												<template v-slot:loading>
													<van-loading type="spinner" size="22" />
												</template>
											</van-image>
											<div class="mt-1">{{item.homeTeamName}}</div>
										</van-col>
										<van-col span="6" class="text-center">
											<div class="money-number red-text">{{item.fullTimeScore}}</div>
											<div class="caption text-grey">{{$$t('halfTimeScore')}}:
												{{item.halfTimeScore}}
											</div>
										</van-col>
										<van-col span="6" class="text-center teamName">
											<van-image :src="item.awayTeamLogo || '/images/ucs/match.png'" width="38">
												<template v-slot:loading>
													<van-loading type="spinner" size="22" />
												</template>
											</van-image>
											<div class="mt-1">{{item.awayTeamName}}</div>
										</van-col>
									</van-row>
								</div>
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

			<div class="text-left  radius-1 leagues-index-bar" v-else>
				<scroll-view :onRefresh="onLeagueRefresh" :loadMore="onLeagueLoadMore" ref="league_match_scroll">
					<div class="leagues-items pa-3" v-if="leagues.length > 0">
						<template v-for="(match, index) in leagues">
							<div class="background-white radius-1 mb-2 py-3 px-3" :key="index"
								@click="goBets(match)">
								<van-row type="flex" justify="space-between" align="center">
									<van-col span="6" class="text-left text-grey_1 caption">
										{{formatDateUcs(match.startTime, 'MM_dd')}}(UTC-5)
									</van-col>
									<van-col span="12" class="text-center text-grey_1 caption-bold">
										{{match.leagueName}}
									</van-col>
									<van-col span="6" class="text-right"> <span
											class="text-grey_1 caption-bold">{{$$t('volume')}}</span>
										<span style="color: rgb(241, 153, 74);">
											{{match.fullTimeVolume}}</span>
									</van-col>
								</van-row>
						
								<div class="mt-4">
									<van-row type="flex" justify="space-between" align="center">
										<van-col span="10" class="text-center teamName">
											<van-image :src="match.homeTeamLogo || '/images/ucs/match.png'" width="38">
												<template v-slot:loading>
													<van-loading type="spinner" size="22" />
												</template>
											</van-image>
											<div class="mt-1">{{match.homeTeamName}}</div>
										</van-col>
										<van-col span="4" class="text-center">
											<van-image src="/images/ucs/vs.png" width="31" height="22">
											</van-image>
										</van-col>
										<van-col span="10" class="text-center teamName">
											<van-image :src="match.awayTeamLogo || '/images/ucs/match.png'" width="38">
												<template v-slot:loading>
													<van-loading type="spinner" size="22" />
												</template>
											</van-image>
											<div class="mt-1">{{match.awayTeamName}}</div>
										</van-col>
									</van-row>
								</div>
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

		<van-popup v-model="showDatetime" position="bottom" :close-on-click-overlay="false">
			<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate"
				@confirm="confirmDatetime" @cancel="showDatetime=false" />
		</van-popup>

		<van-popup v-model="filtering" position="right" class="filtering">
			<van-nav-bar :title="$$t('filtering')" left-arrow @click-left="onUcsClickLeft">
				<template #right>
					<van-button plain hairline type="info" size="small" class="px-3 radius-1" @click="filterLeagues">{{$$t('confirm')}}</van-button>
				</template>
			</van-nav-bar>

			<div class="filtering_warps">
				<scroller>
					<div class="pb-3 text-left">
						<van-checkbox-group v-model="leagueIds" ref="checkboxGroup">
							<template v-for="(item, index) in filters">
								<van-cell-group inset :title="item.fir" :border="false" :key="index">
									<template v-for="league in item.leagues">
										<van-cell :key="league.leagueId">
											<template #title>
												<div class="flex align-items-center">
													<van-icon :name="league.leagueLogo" size="28" class="mr-3" />
													<div class="subtitle-1">{{league.leagueName}}</div>
												</div>
											</template>

											<template #right-icon>
												<van-checkbox :name="league.leagueId" ref="checkboxes" />
											</template>
										</van-cell>
									</template>
								</van-cell-group>
							</template>
						</van-checkbox-group>
					</div>
				</scroller>
			</div>
			<div class="flex space-between align-items-center btns px-4 py-2 background-white">
				<div class="body-2 text-grey">{{$$t('checked')}}[<span class="red-text">{{leagueIds.length}}</span>]</div>
				<div>
					<van-button type="info" size="small" @click="checkAll" class="mr-4 px-3 radius-1">{{$$t('checkAll')}}</van-button>
					<van-button type="info" size="small" @click="toggleAll" class="px-3 radius-1">{{$$t('toggleAll')}}</van-button>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import {
		dateFormatMt_8
	} from '@/common/js/dateUtil'
	import pinyin from 'pinyin'
	import {
		dateFormat,
		beforeByDay,
		string2date
	} from '@/common/js/dateUtil'

	export default {
		name: 'Tournaments',

		data() {
			return {
				tab: 0,
				refresh: false,
				pageIndex: 1,
				items: [],
				leagues: [],
				leaguesActive: ['1'],
				matchCounts: [],
				finishedTab: 1,
				status: 0,
				startTime: 0,
				minDate: new Date(2021, 0, 1),
				maxDate: new Date(),
				currentDate: new Date(),
				showDatetime: false,
				demandDate_c: null,
				filters: [],
				leagueIds: []
			}
		},

		computed: {
			tabOptions() {
				return [{
						text: this.$$t('today'),
						tag: 0
					},
					{
						text: this.$$t('tomorrow'),
						tag: 1,
					},

					{
						text: this.$$t('league'),
						tag: 2
					},
					{
						text: this.$$t('finished'),
						tag: 3
					}
				]
			},

			finishedDateOptions() {
				return [{
						text: this.$$t('today'),
						tag: 1
					},
					{
						text: this.$t('changeNotes.yesterday'),
						tag: 2,
					},
					{
						text: this.$t('changeNotes.nearlyTwoDays'),
						tag: 3
					},
					{
						text: this.$$t('more'),
						tag: 4
					}
				]
			},

			demandDate() {
				if (this.finishedTab === 3) return dateFormat(beforeByDay(new Date(), 2), 'yyyy-MM-dd')
				else if (this.finishedTab === 2) return dateFormat(beforeByDay(new Date(), 1), 'yyyy-MM-dd')
				else return dateFormat(beforeByDay(new Date(), 0), 'yyyy-MM-dd')
			},

			styleOption() {
				if (this.skgCode === this.skgUcsCode) {
					if (this.tab === 3) {
						return {
							top: '2.346rem',
							bottom: 0
						}
					} else {
						return {
							bottom: 0
						}
					}
				} else {
					if (this.tab === 3) {
						return {
							top: '2.346rem',
							bottom: '1.333rem'
						}
					} else {
						return {
							bottom: '1.333rem'
						}
					}
				}
			},

			filtering: {
				get() {
					return this.$store.getters.filtering
				},

				set(v) {
					this.$store.commit("setFiltering", v);
				}
			}
		},

		watch: {
			tab(v) {
				this.pageIndex = 1
				this.demandDate_c = null
				if (v === 2) {
					this.$store.commit("setShowFilter", true);
					this.$nextTick(() => {
						this.$refs.league_match_scroll.goTop()
						this.onLeagueRefresh()
					})
				} else {
					this.$store.commit("setShowFilter", false);
					this.$nextTick(() => {
						this.$refs.league_scroll.goTop()
						this.onRefresh()
					})
				}
			},

			finishedTab(v) {
				if (v === 4) {
					this.showDatetime = true
				} else {
					this.$nextTick(() => {
						this.$refs.league_scroll.goTop()
						this.demandDate_c = null
						this.onRefresh()
					})
				}
			}
		},

		created() {
			this.onMatchCount()
			this.onLeagueItems()
		},

		activated() {
			if (this.tab !== 2) this.$store.commit("setShowFilter", false)
			this.onRefresh()
		},

		methods: {
			onLoad(done) {
				let p = {}
				if (this.tab === 3) {
					p = {
						pageIndex: this.pageIndex,
						pageSize: 10,
						beginTime: this.demandDate_c || this.demandDate,
						endTime: this.demandDate_c || this.demandDate,
						status: this.status
					}
				} else {
					p = {
						pageIndex: this.pageIndex,
						pageSize: 10,
						startTime: this.startTime,
						status: 0
					}
				}
				this.showProgress()
				this.$post('/api/Match/Match', p)
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
						}, 1500)

					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			onLeague(done) {
				this.showProgress()
				this.$post('/api/Match/Match', {
						pageIndex: this.pageIndex,
						pageSize: 10,
						leagueId: this.leagueIds.toString()
					})
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.pageIndex = this.pageIndex + 1
						if (this.refresh) {
							this.leagues = []
							this.leagues = d.items
							if (done) {
								setTimeout(() => {
									this.refresh = false
									done()
								}, 1000)
							}
						} else {
							if (d.items.length > 0) {
								this.leagues.push(...d.items)
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

			onLeagueItems() {
				this.showProgress()
				this.$post('/api/Match/LeagueBasic', {
						pageIndex: this.pageIndex,
						pageSize: 500,
					})
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data.items

						let arr = []
						const Letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
							'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
						]

						for (let i = 0; i < Letters.length; i++) {
							let obj = {
								fir: Letters[i],
								leagues: []
							}

							for (let c = 0; c < d.length; c++) {
								let py = pinyin(d[c].leagueName[0], {
									style: pinyin.STYLE_FIRST_LETTER
								})[0][0].toUpperCase()
								if (Letters[i] === py) {
									obj.leagues.push(d[c])
								}
							}

							arr.push(obj)
						}

						this.filters = arr.filter(e => e.leagues.length > 0)

						setTimeout(() => {
							this.showProgress(false)
						}, 1000)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			onMatchCount() {
				this.$get('/api/Match/MatchCount')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.matchCounts = data.data
					})
					.catch(error => {
						this.procError(error)
					})
			},

			getCount(item) {
				if (this.matchCounts.length < 1) return
				let e = this.matchCounts.filter(e => e.statisticType === Number(item.tag) + 1)[0]
				return e.count
			},

			onRefresh(done) {
				this.refresh = true
				this.pageIndex = 1
				if (this.tab === 3) {
					this.status = 3
				} else {
					this.startTime = this.tab
				}
				this.onLoad(done)
			},

			onLoadMore(done) {
				this.refresh = false
				if (this.tab === 3) {
					this.status = 3
				} else {
					this.startTime = this.tab
				}
				this.onLoad(done)
			},

			onLeagueRefresh(done) {
				this.refresh = true
				this.pageIndex = 1
				this.onLeague(done)
			},

			onLeagueLoadMore(done) {
				this.refresh = false
				this.onLeague(done)
			},

			formatDateUcs(d, f) {
				let v = null
				if (!d || d === 'undefined' || d === 'null') return
				if (this.isAndroid()) {
					if (f === 'MM_dd') v = "MM-dd hh:mm"
					else v = 'yyyy-MM-dd'
					return dateFormatMt_8(new Date(d), v)
				} else {
					if (f === 'MM_dd') v = "MM/dd hh:mm"
					else v = 'yyyy/MM/dd'
					return dateFormatMt_8(string2date(d), v)
				}
			},

			confirmDatetime(d) {
				let v = null
				if (this.isAndroid()) v = 'yyyy-MM-dd'
				else v = 'yyyy/MM/dd'
				this.demandDate_c = this.formatDate(dateFormatMt_8(new Date(d), v))
				this.onRefresh()
				this.showDatetime = false
			},

			beforeChange(index) {
				// 返回 false 表示阻止此次切换
				if (index === 4) {
					this.showDatetime = true
					return true;
				}

				// 返回 Promise 来执行异步逻辑
				return new Promise((resolve) => {
					// 在 resolve 函数中返回 true 或 false
					resolve(true);
				});
			},

			goBets(d) {
				if (Number(d.status) === 0 || Number(d.status) === 2 || Number(d.status) === 4) {
					this.$sessionSet('math-data', d)
					this.redirectRouter('ucs/bets')
				} else {
					this.$info(d.statusDesc)
				}
			},

			onUcsClickLeft() {
				this.$store.commit("setFiltering", false);
			},

			checkAll() {
				this.$refs.checkboxGroup.toggleAll(true);
			},

			toggleAll() {
				this.$refs.checkboxGroup.toggleAll();
			},
			
			filterLeagues () {
				this.$store.commit("setFiltering", false);
				this.onLeagueRefresh()
			},

			$$t(v) {
				return this.$t('tournaments.' + v)
			}
		},
	}
</script>

<style lang="less" scoped>
	#tournaments {
		.notes-content {
			overflow: hidden;
			position: absolute;
			width: 100%;
			top: 48px;

			.notes-warps {
				height: 100%;
				width: 100%;
			}

			.teamName {
				font-size: 14px;
				font-weight: 600;
				color: #474c66;
			}

			.leagues-index-bar {
				width: 100%;
				height: 100%;

				.van-index-bar {
					height: 100%;
				}

				.leagues-items {
					height: 100%;
				}
			}

			.week_block {
				width: 32px;
				height: 32px;
				background-color: rgb(64, 128, 255);
				color: white;
				line-height: 32px;
				text-align: center;
			}
		}

		/deep/ .van-collapse {
			.van-collapse-item__content {
				background-color: #f5f5f9 !important;
				padding: 0 !important;
			}
		}

		.filtering {
			width: 100%;
			height: 100%;
			background-color: #f5f5f9;

			.filtering_warps {
				position: absolute;
				top: 45px;
				left: 0;
				right: 0;
				bottom: 50px;
			}

			.btns {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
			}
		}
	}
</style>
