<template>
	<div id="hotMatchBet" class="text-center">
		<scroller :userSelect="false">
			<div class="macth_info px-3 py-2 mt-2 white-text">
				<div class="subtitle-5">
					{{$$t('against')}} {{item.score}}
				</div>
				<div class="caption mt-1">{{item.leagueName}}</div>

				<van-row align="center" class="mt-3 px-2">
					<van-col span="10">
						<div class="subtitle-1">{{item.homeTeamName}}</div>
					</van-col>
					<van-col span="4">
						<van-image src="images/ucs/vs_match.png" width="31" height="22" />
					</van-col>
					<van-col span="10">
						<div class="subtitle-1">{{item.awayTeamName}}</div>
					</van-col>
				</van-row>
			</div>

			<div class="background-white py-3 mt-2">
				<van-row align="center">
					<van-col span="8">
						<div class="caption ucs-text">{{$$tBets('money')}}</div>
					</van-col>
					<van-col span="8">
						<div class="caption ucs-text">{{$$tBets('odds')}}</div>
					</van-col>
					<van-col span="8">
						<div class="caption ucs-text">{{$$tBets('handlingFee')}}</div>
					</van-col>
				</van-row>

				<van-row align="center" class="mt-3">
					<van-col span="8">
						<div class="">
							<van-field v-model="betMoney" maxlength="8" type="digit" class="betMoney_input" />
						</div>
					</van-col>
					<van-col span="8">
						<div class="subtitle-1 ucs-text">X{{item.odds}}%</div>
					</van-col>
					<van-col span="8">
						<div class="subtitle-1 ucs-text">{{handlingFee}}%</div>
					</van-col>
				</van-row>

				<van-row gutter="4" type="flex" justify="space-between" align="center" class="mt-3 px-4">
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
							{{$$tBets('expectedMoney')}}：{{currencySymbol}}{{expectedMoney}}{{currencyDenomination}}
						</div>
					</van-col>
					<van-col span="12">
						<div class="subtitle-1 ucs-text text-right">
							{{$$tBets('handlingFee')}}：{{handlingFeeMoney}}
						</div>
					</van-col>
				</van-row>
			</div>

			<div class="background-white mt-2 px-3 py-2 text-left">
				<div class="subtitle-1">
					{{$$tBets('balance')}}：{{currencySymbol}}{{memberData && memberData.balance}}{{currencyDenomination}}
				</div>
			</div>

			<div class="px-4 btns">
				<van-row gutter="12">
					<van-col span="12">
						<van-button block plain type="info" class="radius-2" @click="$router.back()"><span
								class="subtitle-1">{{$$t('cancel')}}</span>
						</van-button>
					</van-col>
					<van-col span="12">
						<van-button block color="#597ef7" class="radius-2" @click="onBet"><span
								class="subtitle-1">{{$$t('deal')}}</span>
						</van-button>
					</van-col>
				</van-row>
			</div>
		</scroller>
	</div>
</template>

<script>
	export default {
		name: 'HotMatchBet',

		data: () => ({
			item: {},
			betMoney: 0,
			moneyArrs: [10, 50, 100],
			handlingFee: null,
		}),


		created() {
			this.item = this.$sessionGet('hotMatch-data')
			this.onGetHandlingFee()
		},

		computed: {
			expectedMoney() {
				if (this.betMoney < 1) {
					return 0
				} else {
					let e = Number(this.betMoney) * (1 + this.item.odds / 100)
					return e.toFixed(2)
				}
			},

			handlingFeeMoney() {
				if (Number(this.betMoney) < 1) {
					return 0
				} else {
					let e = Number(this.betMoney) * (this.item.odds / 100) * (Number(this.handlingFee) / 100)
					return this.currencySymbol + e.toFixed(2) + this.currencyDenomination
				}
			}
		},


		methods: {
			onBet() {
				if (Number(this.memberData.balance) < Number(this.betMoney)) {
					this.$info(this.$$tBets('balance_t'))
					return
				}

				if (Number(this.betMoney) < 1) {
					this.$info(this.$$tBets('betMoney_t'))
					return
				}

				this.showProgress()
				this.$post('/api/Match/Bet', {
						betMoney: this.betMoney,
						matchItemObjId: this.item.matchItemObjId,
					})
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(() => {
						this.betMoney = 0
						this.initMemberData()
						this.showProgress(false)
						this.$success(this.$$tBets('betSuccess'))

						this.$dialog.confirm({
								title: this.$t('common.point'),
								message: this.$$t('bet_t'),
								confirmButtonColor: '#597ef7'
							})
							.then(() => {
								// on confirm
								this.redirectRouter('/app/tournamentsNotes')
							})
							.catch(() => {
								// on cancel
							});

					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			onGetHandlingFee() {
				this.showProgress()
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

			setBetMoney(m) {
				if (m) {
					this.betMoney = m
				} else {
					this.betMoney = Math.floor(Number(this.memberData.balance))
				}
			},

			$$tBets(v, p) {
				return this.$t('bets.' + v, p)
			},

			$$t(v) {
				return this.$t('hotMatchBet.' + v)
			}
		},

		beforeRouteLeave(to, form, next) {
			sessionStorage.removeItem('hotMatch-data')
			next()
		},
	}
</script>

<style lang="less" scoped>
	#hotMatchBet {
		.macth_info {
			background: linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255));
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

		.btns {
			margin-top: 145px;
		}
	}
</style>
