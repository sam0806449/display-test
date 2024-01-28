<template>
	<div class="ucsHot">
		<van-row gutter="4" class="mt-2 px-3">
			<van-col span="8">
				<van-button class="radius-2 text-left" block color="linear-gradient(90deg,#4476f8,#5686ff)" icon="fire">{{$t('dashboard.income')}}
				</van-button>
			</van-col>
			<van-col span="8">
				<van-button class="radius-2 text-left" plain block color="#8198aa" icon="newspaper-o"
					@click="goRanks">{{$t('dashboard.leaderboard')}}</van-button>
			</van-col>
			<van-col span="8">
				<van-button class="radius-2 preferential text-left" plain block color="#8198aa" icon="gift-o"
					@click="redirectRouter('preferentialUcs')">{{$t('preferential.title')}}</van-button>
			</van-col>
		</van-row>

		<div class="ucsHot-warp">
			<scroller :userSelect="false">
				<div class="px-3 pb-2" v-show="hotMatch.length > 0">
					<template v-for="(item, index) in hotMatch">
						<div class="list-item text-left" :key="index" @click="goBets(item)">
							<div class="list-lefts">
								<div class="circleblock cirles">
									<div class="nametitle">{{$$t('volume')}}</div>
									<div class="nums fontColor">{{formatNum(item && item.recommendedOdds && item.recommendedOdds.volume/ 1000, 0)}}K</div>
								</div>
							</div>
							<div class="list-rights">
								<div class="bodan">
									<div class="itavs">
										<span class="bodanbofen">{{item && item.recommendedOdds && item.recommendedOdds.score}}</span><span
											class="bodansx">@<span
												class="vsa">{{item && item.recommendedOdds && item.recommendedOdds.odds}}</span>%</span>
									</div>
									<div class="dates">{{formatDateUcs(item.startTime)}}(UTC-5)</div>
								</div>
								<div class="matchname">
									<div class="teamh">
										<van-image :src="item.homeTeamLogo || '/images/ucs/match.png'" width="17px" height="17px">
											<template v-slot:loading>
												<van-loading type="spinner" size="22" />
											</template>
										</van-image>
										<div class="matchfonts">{{item.homeTeamName}}</div>
									</div>

									<van-image src="/images/dashboard/vs_hot.png" width="26px" height="17px"
										class="vspng" />

									<div class="teamc">
										<div class="matchfonts text-left">{{item.awayTeamName}}</div>
										<van-image :src="item.awayTeamLogo || '/images/ucs/match.png'" width="17px" height="17px">
											<template v-slot:loading>
												<van-loading type="spinner" size="22" />
											</template>
										</van-image>
									</div>
								</div>
								<div class="leguaname">
									<div class="names text-left">{{item.leagueName}}</div>
								</div>
							</div>
						</div>
					</template>
				</div>

				<van-empty v-show="hotMatch.length < 1" :description="$t('common.noMore')" class="text-center">
					<template #image>
						<van-image src="images/empty/no-more.png" width="280" height="130" />
					</template>
				</van-empty>
			</scroller>
		</div>
	</div>
</template>

<script>
	import {
		dateFormatMt_8,
		string2date
	} from '@/common/js/dateUtil'

	export default {
		name: 'UcsHot',

		props: {
			hotMatch: {
				type: Array,
				default: () => []
			}
		},

		methods: {
			goBets(d) {
				if (!this.isLogin()) return
				if (Number(d.status) === 0 || Number(d.status) === 2 || Number(d.status) === 4) {
					this.$sessionSet('hotMatch-data', d.recommendedOdds)
					this.redirectRouter('hotMatchBet')
				} else {
					this.$info(d.statusDesc)
				}
			},

			formatDateUcs(d) {
				if (!d || d === 'undefined' || d === 'null') return
				if (this.isAndroid()) return dateFormatMt_8(new Date(d), 'yyyy-MM-dd hh:mm')
				else return dateFormatMt_8(string2date(d), 'yyyy/MM/dd hh:mm')
			},
			
			goRanks () {
				if (!this.isLogin()) return
				this.redirectRouter('ranks')
			},

			$$t(v) {
				return this.$t('tournaments.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	.ucsHot {
		.preferential {
			background-image: url(/images/dashboard/preferential_btn.png);
			background-size: 100% 100%;
		}

		.ucsHot-warp {
			margin-top: 10px;
			position: absolute;
			top: 305px;
			right: 0;
			left: 0;
			bottom: 0;

			.list-item {
				background-image: url(/images/dashboard/ucs_bg.png);
				background-position: 50%;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 118px;
				border-radius: 6px 6px;
				box-sizing: border-box;
				padding: 10px 14px;

				.list-lefts {
					margin-right: 8px;

					.circleblock {
						width: 72px;
						height: 72px;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						border-radius: 50%;
						box-shadow: 0 0 0.16rem 0 rgb(91 125 239 / 20%);

						.nametitle {
							color: #929ec1;
							font-size: 12px;
							text-align: center;
						}

						.nums {
							color: #4176f7;
							font-size: 20px;
							font-weight: 600;
						}
					}
				}


				.list-rights {
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					flex-direction: column;
					flex: 1;
					height: 100%;

					.bodan {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.itavs {
							font-size: 16px;
							font-weight: 700;
							margin-top: 4px;
							flex: 1;
							display: flex;
							align-items: center;

							.bodanbofen {
								color: #53618b;
								margin-right: 10px;
								width: 100%;
								white-space: nowrap;
							}

							.bodansx {
								color: #ee1c25;
								white-space: nowrap;
							}
						}

						.dates {
							color: #929ec1;
							font-size: 12px;
							text-align: right;
							width: 75px;
						}
					}

					.matchname {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: flex-start;

						.teamh {
							display: flex;
							align-items: center;
							justify-content: flex-end;
							flex: 1;

							.matchfonts {
								color: #929ec1;
								font-size: 12px;
								vertical-align: middle;
								margin-left: 6px;
								width: 80px;
								text-align: right;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								overflow: hidden;
								-webkit-box-orient: vertical;
							}
						}

						.vspng {
							margin: 0 8px;
						}


						.teamc {
							display: flex;
							align-items: center;
							justify-content: flex-start;
							flex: 1;

							.matchfonts {
								color: #929ec1;
								font-size: 12px;
								vertical-align: middle;
								margin-right: 6px;
								width: 80px;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								overflow: hidden;
								-webkit-box-orient: vertical;
							}
						}
					}


					.leguaname {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.names {
							color: #929ec1;
							font-size: 12px;
						}

						.clamp2 {
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}

				}
			}
		}
	}
</style>
