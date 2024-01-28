<template>
	<div id="bets">
		<van-nav-bar left-arrow @click-left="onClickLeft" @click-right="onClickRight">
			<template #title>
				<van-dropdown-menu active-color="black">
					<van-dropdown-item v-model="league" :title="dropdownTitle" ref="dropdownItem">
						<div class="dropdownItem_warp" style="background-color: rgb(245, 245, 249);z-index: 3;">
							<scroller>
								<div class="pa-3" v-if="leagues.length > 0">
									<template v-for="(item,index) in leagues">
										<div class="background-white pa-2 radius-1 mb-2 caption" :key="index"
											@click="changeLeague(item)">
											<van-row type="flex" justify="space-between" align="center" gutter="10">
												<van-col span="6" class="text-left text-grey_1">
													{{formatDateUcs(item.startTime)}}(UTC-5)
												</van-col>
												<van-col span="12"
													class="text-center text-grey_1 caption-bold van-ellipsis">
													{{item.leagueName}}
												</van-col>
												<van-col span="6" class="text-right"> <span
														class="text-grey_1 caption-bold">{{$$t('volume')}}</span>
													<span style="color: rgb(241, 153, 74);">
														{{item.fullTimeVolume}}</span>
												</van-col>
											</van-row>

											<div class="mt-4">
												<van-row type="flex" justify="space-between" align="center" gutter="10">
													<van-col span="10" class="text-center teamName">
														<van-image :src="item.homeTeamLogo || '/images/ucs/match.png'" width="38"></van-image>
														<div class="mt-1">{{item.homeTeamName}}</div>
													</van-col>
													<van-col span="4" class="text-center">
														<van-image src="/images/ucs/vs.png" width="31" height="22">
														</van-image>
													</van-col>
													<van-col span="10" class="text-center teamName">
														<van-image :src="item.awayTeamLogo || '/images/ucs/match.png'" width="38"></van-image>
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
							</scroller>
						</div>
					</van-dropdown-item>
				</van-dropdown-menu>
			</template>

			<template #right>
				<van-icon name="description" size="20" />
			</template>
		</van-nav-bar>

		<div class="pa-3">
			<div class="background-white pa-2 radius-1">
				<van-row type="flex" justify="space-between" align="center" gutter="10">
					<van-col span="6" class="text-left text-grey_1">
						{{formatDateUcs(match && match.startTime)}}(UTC-5)
					</van-col>
					<van-col span="12" class="text-center text-grey_1 caption-bold">
						{{match && match.leagueName}}
					</van-col>
					<van-col span="6" class="text-right"> <span
							class="text-grey_1 caption-bold">{{$$t('volume')}}</span>
						<span style="color: rgb(241, 153, 74);">
							{{match && match.fullTimeVolume}}</span>
					</van-col>
				</van-row>

				<div class="mt-4">
					<van-row type="flex" justify="space-between" align="center" gutter="10">
						<van-col span="10" class="text-center teamName">
							<van-image :src="match.homeTeamLogo || '/images/ucs/match.png'" width="38"></van-image>
							<div class="mt-1 van-ellipsis">{{match.homeTeamName}}</div>
						</van-col>
						<van-col span="4" class="text-center">
							<van-image src="/images/ucs/vs.png" width="31" height="22"></van-image>
						</van-col>
						<van-col span="10" class="text-center teamName">
							<van-image :src="match.awayTeamLogo || '/images/ucs/match.png'" width="38"></van-image>
							<div class="mt-1 van-ellipsis">{{match.awayTeamName}}</div>
						</van-col>
					</van-row>
				</div>
			</div>
		</div>

		<van-count-down :time="60000" @finish="onMatchItem(match)" ref="countDown" class="px-4 text-right">
			<template #default="timeData">
				<span class="timeData_block radius-1">{{ timeData.minutes }}</span>
				<span class="timeData_colon">:</span>
				<span class="timeData_block radius-1">{{ timeData.seconds }}</span>
			</template>
		</van-count-down>



		<van-tabs v-model="tab" background="rgb(245, 245, 249)" color="rgb(64, 128, 255)" title-active-color="#7e838f"
			title-inactive-color="#7e838f" class="subtitle-3">
			<van-tab :title="$$t('full')" name="1"></van-tab>
			<van-tab :title="$$t('half')" name="2"></van-tab>
		</van-tabs>

		<div class="odds_items">
			<scroller>
				<div class="px-3 pb-3" v-if="oddss.length > 0">
					<template v-for="(item, index) in oddss">
						<van-row type="flex" justify="space-between" align="center" :key="index"
							class="py-4 background-white radius-1 mb-2">
							<van-col span="6">
								<div class="subtitle-1 ucs-text">{{item.score}}</div>
							</van-col>
							<van-col span="6">
								<div class="subtitle-1 ucs-text">{{item.odds}}%</div>
							</van-col>
							<van-col span="6">
								<div class="subtitle-1 ucs-text">{{item.volume}}</div>
							</van-col>
							<van-col span="6">
								<van-button round type="info" size="mini" @click="onBetClick(item)"><span
										class="px-2">{{$$t('bet')}}</span></van-button>
							</van-col>
						</van-row>
					</template>
				</div>

				<van-empty v-else :description="$t('common.noMore')" class="text-center">
					<template #image>
						<van-image src="images/empty/no-more.png" width="280" height="130" />
					</template>
				</van-empty>
			</scroller>
		</div>


		<van-popup v-model="showBetPopup" position="bottom" round class="betPopup">
			<div class="pt-3 mb-10">
				<div class="mb-4 px-3">
					<div class="subtitle-1">
						{{$$t('balance')}}：{{currencySymbol}}{{memberData && memberData.balance}}{{currencyDenomination}}
					</div>
					<div class="macth_info radius-2 pt-2 pb-4 mt-2 white-text">
						<div class="subtitle-5">{{Number(tab)===1 ? $$t('full') : $$t('half')}}
							{{betMatchItem && betMatchItem.score}}
						</div>
						<div class="caption mt-1">{{betMatchItem && betMatchItem.leagueName}}</div>

						<van-row align="center" class="mt-3 px-2">
							<van-col span="10">
								<div class="subtitle-1">{{betMatchItem && betMatchItem.homeTeamName}}</div>
							</van-col>
							<van-col span="4">
								<van-image src="images/ucs/vs_match.png" width="31" height="22" />
							</van-col>
							<van-col span="10">
								<div class="subtitle-1">{{betMatchItem && betMatchItem.awayTeamName}}</div>
							</van-col>
						</van-row>
					</div>
				</div>

				<div class="divider_match"></div>

				<van-row align="center" class="mt-3">
					<van-col span="8">
						<div class="caption ucs-text">{{$$t('money')}}</div>
					</van-col>
					<van-col span="8">
						<div class="caption ucs-text">{{$$t('odds')}}</div>
					</van-col>
					<van-col span="8">
						<div class="caption ucs-text">{{$$t('handlingFee')}}</div>
					</van-col>
				</van-row>

				<van-row align="center" class="mt-3">
					<van-col span="8">
						<div class="">
							<van-field v-model="betMoney" maxlength="8" type="digit" class="betMoney_input" />
						</div>
					</van-col>
					<van-col span="8">
						<div class="subtitle-1 ucs-text">X{{betMatchItem && betMatchItem.odds}}%</div>
					</van-col>
					<van-col span="8">
						<div class="subtitle-1 ucs-text">{{handlingFee}}%</div>
					</van-col>
				</van-row>


				<van-row gutter="4" type="flex" justify="center" align="center" class="mt-3">
					<template v-for="m in moneyArrs">
						<van-col :key="m">
							<van-button size="mini" plain hairline type="info" @click="setBetMoney(m)"><span
									class="px-6 ucs-text">{{m}}</span>
							</van-button>
						</van-col>
					</template>
					<van-col>
						<van-button size="mini" plain hairline type="info" @click="setBetMoney(null)"><span
								class="px-6 ucs-text">{{$t('common.all')}}</span>
						</van-button>
					</van-col>
				</van-row>

				<van-divider :style="{ color: '#7e838f', borderColor: '#7e838f', padding: '0 16px' }"
					class="ma-0 mt-3" />

				<van-row align="center" class="mt-3 px-4 subtitle-1">
					<van-col span="12">
						<div class="text-left" style="color: #f1994a;">
							{{$$t('expectedMoney')}}：{{currencySymbol}}{{expectedMoney}}{{currencyDenomination}}
						</div>
					</van-col>
					<van-col span="12">
						<div class="subtitle-1 ucs-text text-right">
							{{$$t('handlingFee')}}：{{handlingFeeMoney}}
						</div>
					</van-col>
				</van-row>

				<div class="px-4 mt-6">
					<van-button color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block round
						@click="onBet">
						<span class="subtitle-5">{{$$t('onBet')}}</span>
					</van-button>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import {
		dateFormatMt_8, string2date
	} from '@/common/js/dateUtil'
	import sessionContext from '@/mixins/sessionContext'
	export default {
		name: 'Bets',
		mixins: [sessionContext],

		data: () => ({
			match: {},
			leagues: [],
			league: 0,
			dropdownTitle: '',
			tab: 1,
			oddss: [],
			betMoney: 0,
			showBetPopup: false,
			moneyArrs: [10, 50, 100],
			betMatchItem: {},
			handlingFee: null
		}),

		created() {
			let d = this.$sessionGet('math-data')
			this.dropdownTitle = d.leagueName
			this.match = d
			this.onMatchItem(d)
			this.onLoadLeagues(d.leagueId)
			this.ongetHandlingFee()
		},

		computed: {
			expectedMoney() {
				if (this.betMoney < 1) {
					return 0
				} else {
					let e = Number(this.betMoney) * (1 + this.betMatchItem.odds / 100)
					return e.toFixed(2)
				}
			},

			handlingFeeMoney() {
				if (Number(this.betMoney) < 1) {
					return 0
				} else {
					let e = Number(this.betMoney) * (this.betMatchItem.odds / 100) * (Number(this.handlingFee) / 100)
					return this.currencySymbol + e.toFixed(2) + this.currencyDenomination
				}
			}
		},

		watch: {
			tab() {
				let d = this.match
				this.onMatchItem(d)
			}
		},

		methods: {
			onLoadLeagues(leagueId) {
				this.$post('/api/Match/Match', {
						pageIndex: 1,
						pageSize: 20,
						leagueId: leagueId
					})
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.leagues = d.items
					})
					.catch(error => {
						this.procError(error)
					})
			},

			onMatchItem(item) {
				this.showProgress()
				this.$post('/api/Match/MatchItem', {
						matchId: item.matchId,
						isFirstHalf: Number(this.tab) === 2,
					})
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.oddss = data.data
						this.$refs.countDown.reset();
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			onBetClick(item) {
				this.betMatchItem = item
				this.showBetPopup = true
			},

			onBet() {
				if (Number(this.memberData.balance) < Number(this.betMoney)) {
					this.$info(this.$$t('balance_t'))
					return
				}

				if (Number(this.betMoney) < 1) {
					this.$info(this.$$t('betMoney_t'))
					return
				}

				this.showProgress()
				this.$post('/api/Match/Bet', {
						betMoney: this.betMoney,
						matchItemObjId: this.betMatchItem.matchItemObjId,
					})
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(() => {
						this.showProgress(false)
						this.betMoney = 0
						this.betMatchItem = {}
						this.showBetPopup = false
						this.initMemberData()
						this.$success(this.$$t('betSuccess'))
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			ongetHandlingFee() {
				this.$get('/api/Match/HandlingFee')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.handlingFee = data.data
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			changeLeague(item) {
				this.match = item
				this.onMatchItem(item)
				this.$refs.dropdownItem.toggle()
			},

			setBetMoney(m) {
				if (m) {
					this.betMoney = m
				} else {
					this.betMoney = Math.floor(Number(this.memberData.balance))
				}
			},

			formatDateUcs(d) {
				if (!d || d === 'undefined' || d === 'null') return
				if (this.isAndroid()) return dateFormatMt_8(new Date(d), 'MM-dd hh:mm')
				else return dateFormatMt_8(string2date(d), 'MM/dd hh:mm')
			},
			
			onClickLeft() {
				this.redirectRouter(this.skgCode === this.skgUcsCode ? '/app/tournaments' : '/app/ucs')
			},

			onClickRight() {
				this.redirectRouter(this.skgCode === this.skgUcsCode ? '/app/tournamentsNotes' : '/app/ucsNotes')
			},

			$$t(v, p) {
				return this.$t('bets.' + v, p)
			}
		},

		beforeRouteLeave(to, form, next) {
			sessionStorage.removeItem('math-data')
			next()
		},

		beforeRouteEnter(to, from, next) {
			let e = sessionStorage.getItem('math-data')
			if (e) next()
			else next('/app/ucs')
		},
	}
</script>

<style lang="less" scoped>
	#bets {
		height: 100%;

		.teamName {
			font-size: 14px;
			font-weight: 600;
			color: #474c66;
		}

		/deep/ .van-tabs {
			.van-tabs__line {
				z-index: 0 !important;
			}
		}

		.odds_items {
			position: absolute;
			top: 280px;
			left: 0;
			right: 0;
			bottom: 0;
		}

		.betPopup {
			.macth_info {
				background: linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255));
			}

			.divider_match {
				height: 10px;
				background-color: rgb(245, 245, 249);
			}

			.betMoney_input {
				padding: 0 !important;
				border: 1px solid black;
				width: 90px;
				margin: auto;

				/deep/.van-field__control {
					text-align: center;
				}
			}
		}

		/deep/ .van-nav-bar__title {
			.van-dropdown-menu {
				.van-popup {
					height: 350px !important;

					.dropdownItem_warp {
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
					}
				}
			}
		}

		.timeData_colon {
			display: inline-block;
			margin: 0 4px;
		}

		.timeData_block {
			display: inline-block;
			width: 22px;
			color: #fff;
			font-size: 12px;
			text-align: center;
			background-color: rgb(91, 127, 251);
		}
	}
</style>
