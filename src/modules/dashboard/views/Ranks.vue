<template>
	<div id="ranks">
		<van-tabs v-model="tab" animated ellipsis swipeable title-active-color="rgb(64, 128, 255)"
			title-inactive-color="rgb(153, 153, 153)" color="rgb(64, 128, 255)" @change="onLoadRanks"
			v-if="tabs.length === 2">
			<template v-for="(item, index) in tabs">
				<van-tab :title="item.title" :name="item.name" :key="index"></van-tab>
			</template>
		</van-tabs>

		<div class="tabs_ranks" v-else-if="tabs.length === 1">
			<template v-for="(item, index) in tabs">
				<div class="subtitle-1" style="color: rgb(64, 128, 255);" :key="index">
					{{item.title}}
				</div>
			</template>
		</div>

		<van-row gutter="4" type="flex" justify="space-between" align="center"
			class="ranks_header caption mt-1 text-grey_1">
			<van-col span="6">{{$$t_ranks('memberAccount')}}</van-col>
			<van-col span="6">{{$$t_ranks('profitRate')}}</van-col>
			<van-col span="6">{{$$t_ranks('totalProfit')}}</van-col>
			<van-col span="6">{{$$t_ranks('recommend')}}</van-col>
		</van-row>

		<div class="ranks-warps" :style="warpsStyle">
			<scroller :userSelect="false">
				<div class="py-2 caption background-white subtitle-1" v-show="ranks.length > 0">
					<template v-for="(item, index) in ranks">
						<van-row class="py-2" type="flex" justify="space-between" align="center" gutter="4"
							:key="index">
							<van-col span="6" class="text-left flex pl-3">
								<van-icon :name="`/images/ranks/award${index + 1}.png`" size="22" class="mr-1"
									v-if="index < 3" />
								<div v-else>
									{{index + 1}}.
								</div>
								{{parseStringToStar(item.memberAccount)}}
							</van-col>
							<van-col span="6" class="profitRate">{{item.profitRate}}%</van-col>
							<van-col span="6" class="subtitle-3">
								{{currencySymbol}}{{item.totalProfit}}{{currencyDenomination}}
							</van-col>
							<van-col span="6">
								<van-button type="info" size="mini" round @click="onBetClick(item.recommendedOdds)">
									<span class="px-1">{{$$t_ranks('bet_btn')}}</span>
								</van-button>
							</van-col>
						</van-row>
						<van-divider class="ma-0 px-4" v-show="ranks.length-1 > index" />
					</template>
				</div>

				<van-empty v-show="ranks.length < 1" :description="$t('common.noMore')" class="text-center">
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
							<van-field v-model="betMoney" type="digit" maxlength="8" class="betMoney_input" />
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
	import sessionContext from '@/mixins/sessionContext'

	export default {
		name: 'Ranks',
		mixins: [sessionContext],

		data() {
			return {
				ranks: [],
				tab: 0,
				betMoney: 0,
				showBetPopup: false,
				moneyArrs: [10, 50, 100],
				betMatchItem: {},
				handlingFee: null,
				isOpenWeekRanks: false,
				isOpenMonthRanks: false
			}
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
			},

			tabs() {
				if (this.isOpenWeekRanks && this.isOpenMonthRanks) {
					return [{
							title: this.$$t_ranks('tab_0'),
							name: '0'
						},
						{
							title: this.$$t_ranks('tab_1'),
							name: '1'
						}
					]
				} else if (this.isOpenWeekRanks) {
					return [{
						title: this.$$t_ranks('tab_0'),
						name: '0'
					}]
				} else if (this.isOpenMonthRanks) {
					return [{
						title: this.$$t_ranks('tab_1'),
						name: '1'
					}]
				} else {
					return []
				}
			},

			warpsStyle() {
				if (this.tabs.length > 0) {
					return {
						top: '2.1867rem'
					}
				} else {
					return {
						top: '1.013rem'
					}
				}
			}
		},

		created() {
			this.onGetMatchConfig()
		},

		methods: {
			onLoadRanks() {
				this.showProgress()
				this.$get(`/api/Match/GetRanks?type=${this.tab}`)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.ranks = data.data
						this.showProgress(false)
					})
					.catch(error => {
						this.ranks = []
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

			onGetMatchConfig() {
				this.$get('/api/Match/GetMatchConfig')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.handlingFee = d.handlingFee
						this.isOpenWeekRanks = d.isOpenWeekRanks
						this.isOpenMonthRanks = d.isOpenMonthRanks
						this.showProgress(false)

						if (this.isOpenWeekRanks || this.isOpenMonthRanks) {
							this.tab = this.tabs[0].name
							this.onLoadRanks()
						}

					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			setBetMoney(m) {
				if (m) {
					this.betMoney = m
				} else {
					this.betMoney = Math.floor(Number(this.memberData.balance))
				}
			},

			parseStringToStar(str) {
				return str.substr(0, str.length - 3) + '***'
			},

			$$t(v) {
				return this.$t('bets.' + v)
			},

			$$t_ranks(v) {
				return this.$t('ranks.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#ranks {
		.ranks_header {
			background: #e4f1ff;
			height: 34px;
			line-height: 34px;
			;
		}

		.tabs_ranks {
			height: 44px;
			line-height: 44px;
		}

		.ranks-warps {
			background-color: #f5f5f9;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;

			.profitRate {
				text-align: center;
				color: #ff6110;
			}
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

				/deep/ .van-field__control {
					text-align: center;
				}
			}
		}
	}
</style>
