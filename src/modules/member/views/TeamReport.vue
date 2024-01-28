<template>
	<div id="teamReport">
		<div class="flex space-between align-items-center mt-3 px-4">
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

			<div class="text-grey body-2 van-ellipsis ml-2">{{$$t('titleDesc')}}</div>
		</div>

		<div class="team-warp">
			<scroller>
				<div class="px-4 pb-3">
					<div class="performance radius-2">
						<div class="title">{{$$t('teamPerformance')}}</div>
						<div class="center">
							<div>
								<div class="number">{{currencySymbol}}{{teamReport.teamBalance}}{{currencyDenomination}}
								</div>
								<div class="text van-ellipsis">{{$$t('teamBalance')}}</div>
							</div>

							<div>
								<div class="number">
									{{currencySymbol}}{{teamReport.teamDepositMoney}}{{currencyDenomination}}
								</div>
								<div class="text van-ellipsis">{{$$t('teamDepositMoney')}}</div>
							</div>
							<div>
								<div class="number">
									{{currencySymbol}}{{teamReport.teamWithdrawMoney}}{{currencyDenomination}}
								</div>
								<div class="text van-ellipsis">{{$$t('teamWithdrawMoney')}}</div>
							</div>
							<div>
								<div class="number">
									{{currencySymbol}}{{teamReport.teamDepositPormMoney}}{{currencyDenomination}}
								</div>
								<div class="text van-ellipsis">{{$$t('teamDepositPormMoney')}}</div>
							</div>

							<div>
								<div class="number">
									{{currencySymbol}}{{teamReport.teamPormMoney}}{{currencyDenomination}}
								</div>
								<div class="text van-ellipsis">{{$$t('teamPormMoney')}}</div>
							</div>

							<div>
								<div class="number">{{currencySymbol}}{{teamReport.gameProfit}}{{currencyDenomination}}
								</div>
								<div class="text van-ellipsis">{{$$t('gameProfit')}}</div>
							</div>
						</div>
					</div>

					<div class="total radius-2">
						<div class="title">{{$$t('teamNumber')}}</div>
						<div class="center">
							<div @click="goSubordinate">
								<div class="number"><span>{{teamReport.allChildCount}}</span>
									<van-icon name="images/member/proceed.png" size="12" />
								</div>
								<div class="text van-ellipsis">{{$$t('allChildCount')}}</div>
							</div>
							<div>
								<div class="number">{{teamReport.childCount}}</div>
								<div class="text">{{$$t('childCount')}}</div>
							</div>
							<div>
								<div class="number">{{teamReport.registerCount}}</div>
								<div class="text van-ellipsis">{{$$t('registerCount')}}</div>
							</div>

							<div @click="goFirstRecharge">
								<div class="number"><span>{{teamReport.firstDepositCount}}</span>
									<van-icon name="images/member/proceed.png" size="12" />
								</div>
								<div class="text van-ellipsis">{{$$t('firstDepositCount')}}</div>
							</div>

							<div>
								<div class="number">{{teamReport.gameMemberCount}}</div>
								<div class="text van-ellipsis">{{$$t('gameMemberCount')}}</div>
							</div>
							<div></div>
						</div>
					</div>

					<div class="offers mt-4 radius-2">
						<div class="title">{{$$t('preferential')}}</div>
						<div class="center">
							<div>
								<div class="number">{{currencySymbol}}{{teamReport.rebateMoney}}{{currencyDenomination}}
								</div>
								<div class="text van-ellipsis">{{$$t('rebateMoney')}}</div>
							</div>
							<div>
								<div class="number">
									{{currencySymbol}}{{teamReport.gameReturnMoney}}{{currencyDenomination}}
								</div>
								<div class="text van-ellipsis">{{$$t('gameReturnMoney')}}</div>
							</div>
							<div v-if="skgCode === skgGameCode">
								<div class="number">
									{{currencySymbol}}{{teamReport.gameReturnMoney}}{{currencyDenomination}}
								</div>
								<div class="text van-ellipsis">{{$$t('gameReturnMoney_1')}}</div>
							</div>
							<div v-if="skgCode === skgGameCode">
								<div class="number">
									{{currencySymbol}}{{teamReport.gameRebateMoney}}{{currencyDenomination}}
								</div>
								<div class="text van-ellipsis">{{$$t('gameRebateMoney')}}</div>
							</div>
						</div>
					</div>
				</div>

			</scroller>
		</div>
	</div>
</template>

<script>
	import {
		dateFormat,
		beforeByDay
	} from '@/common/js/dateUtil'

	export default {
		name: 'TeamReport',

		data() {
			return {
				teamReport: {},
				dropdownTitle: '',
				date: 1,
			}
		},

		created() {
			this.dropdownTitle = this.$$t('today')
		},
		
		activated() {
			this.onLoad()
		},

		watch: {
			date() {
				this.onLoad()
			}
		},

		computed: {
			startDate() {
				// beforeByDay
				if (this.date === 60) return this.getLastMonthFirst()
				else if (this.date === 30) return this.getCurrentMonthFirst()
				else if (this.date === 7) return dateFormat(beforeByDay(new Date(), 7), 'yyyy-MM-dd')
				else if (this.date === 3) return dateFormat(beforeByDay(new Date(), 2), 'yyyy-MM-dd')
				else if (this.date === 2) return dateFormat(beforeByDay(new Date(), 1), 'yyyy-MM-dd')
				else return dateFormat(beforeByDay(new Date(), 0), 'yyyy-MM-dd')
			},
			
			endDate() {
				let d = Number(this.date)
				if (d === 7 || d === 1 || d === 30) return dateFormat(new Date(), 'yyyy-MM-dd')
				else if (d === 60) return this.getLastMonthLastDay()
				else return dateFormat(beforeByDay(new Date(), Number(d - 1)), 'yyyy-MM-dd')
			},

			dateOptions() {
				return [{
						text: this.$$t('lastMonth'),
						value: 60
					},
					{
						text: this.$$t('nearlyAMonth'),
						value: 30
					},
					{
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
			}
		},

		methods: {
			onLoad() {
				this.showProgress()
				this.$post(`/api/Account/GetTeamReport?startDate=${this.startDate}&endDate=${this.endDate}`)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.teamReport = data.data
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			typeClick(e) {
				this.dropdownTitle = e.text
				this.date = e.value
				this.$refs.type.toggle()
			},

			goSubordinate() {
				sessionStorage.setItem('startDate', this.startDate)
				sessionStorage.setItem('endDate', this.endDate)
				this.redirectRouter('subordinate')
			},

			goFirstRecharge() {
				sessionStorage.setItem('startDate', this.startDate)
				sessionStorage.setItem('endDate', this.endDate)
				this.redirectRouter('firstRecharge')
			},

			$$t(v) {
				return this.$t('teamReport.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#teamReport {

		height: 100%;
		text-align: left;

		.team-warp {
			overflow: hidden;
			position: absolute;
			width: 100%;
			bottom: 0;
			top: 54px;
			left: 0;
			right: 0;
			padding-top: 12px;
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
		}

		.performance,
		.total,
		.offers {
			background-color: white;
			padding-bottom: 12px;

			.title {
				padding-top: 12px;
				padding-left: 16px;
				font-size: 14px;
				font-weight: bold;
			}

			.center {
				width: 100%;
				display: flex;
				justify-content: space-around;
				text-align: center;
				flex-wrap: wrap;

				>div {
					margin-top: 24px;
					width: 50%;
					height: 48px;
					padding: 0 6px;

					.number {
						font-size: 20px;
						font-weight: 600;
						color: rgb(82, 149, 253);
					}

					.text {
						margin-top: 4px;
					}
				}
			}
		}

		.total {
			margin-top: 16px;

			span {
				margin-left: 10px;
			}

			.van-icon {
				left: 8px;
			}
		}
	}
</style>
