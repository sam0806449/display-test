<template>
	<div id="member">
		<div class="view-background">
			<div class="view-background-flex">
				<div class="view-background-flex-top"></div>
				<div class="view-background-flex-bottom"></div>
			</div>
		</div>
		<scroller>
			<div class="warp">
				<div class="memberInfo text-left white-text">
					<div class="memberInfo-warp pt-3 pl-4 ">
						<div @click="redirectRouter('member/info')">
							<van-image round lazy-load width="60" height="60"
								:src="getAvatar(Number(memberData && memberData.avatar)) || '/images/service/avatar.png'" />
						</div>
						<div>
							<div class="body-2 ml-4">ID：{{memberData && memberData.memberAccount}}</div>
							<div class="body-2 mt-2 ml-4">{{$$t('invitationCode')}}：{{memberData &&
                                memberData.invitationCode}}
								<van-tag class="ml-2" color="#feb94c"
									@click="copyBtnClick(memberData && memberData.invitationCode)">
									{{$$t('copy')}}
								</van-tag>
							</div>
							<div v-if="skgCodeKey !== 'SGMGM'" class="vip-progress mt-2">
								<van-image lazy-load width="40" height="14" src="/images/member/vipLv.png" class="mr-3">
									<div class="vip-lv_position">{{memberData && memberData.vipLevel}}</div>
								</van-image>

								<van-progress :percentage="getPercentage" track-color="rgb(63, 100, 215)"
									stroke-width="8" />

								<van-image lazy-load width="40" height="14" src="/images/member/vipLv-1.png"
									class="ml-3">
									<div class="vip-lv_position">{{Number(memberData && memberData.vipLevel) + 1}}</div>
								</van-image>
							</div>
						</div>
					</div>
				</div>

				<div v-if="skgCodeKey !== 'SGMGM'" class="caption text-center text-white mt-2">{{$$t('promotion')}}
					<span>{{$$t('turnover')}} {{memberData && memberData.currencySymbol}}{{getPromotion}}{{memberData && memberData.currencyDenomination}}</span>
					<span>,{{$$t('deposit')}} {{currencySymbol}}{{getDepositRequire}}{{currencyDenomination}}</span> 
				</div>

				<div class="balance mt-2 pt-4 pl-4">
					<div class="balance-top">
						<div class="mr-1"> 
							<van-image round lazy-load width="23" height="22" src="/images/member/balance.png" />
						</div>
						<div class="caption mr-3">{{$$t('totalMoney')}}</div>
						<!-- <div class="caption btn radius-4" @click="onTransformAll" v-if="skgCode === skgGameCode">
							{{$$t('recycling')}}
						</div> -->
					</div>


					<div class="balance-btm mt-3">
						<div class="headline mr-3">{{memberData && memberData.currencySymbol}}{{memberData &&
                            memberData.balance}}{{memberData && memberData.currencyDenomination}}
						</div>
						<div class="ml-1">
							<van-image round lazy-load width="22" height="22" src="/images/member/refresh.png"
								:class="{refresh: refreshIcon}" @click="refreshBalance" />
						</div>
					</div>
				</div>

				<div class="navs px-4">
					<div class="navs-warp radius-2 px-8 elevation-2">
						<div v-if="skgCodeKey !== 'SGMGM'" @click="redirectRouter('privileges')">
							<van-image round lazy-load width="48" height="56" src="/images/member/tq.png" />

							<div class="headline van-multi-ellipsis--l2">{{$$t('privileges')}}</div>
						</div>

						<div v-if="skgCodeKey !== 'SGMGM'" class="center"></div>
						<div @click="redirectRouter('task')">
							<van-image round lazy-load width="48" height="56" src="/images/member/rw.png" />
							<div class="headline van-multi-ellipsis--l2">{{$$t('bounty')}}</div>
						</div>
					</div>
				</div>

				<van-row type="flex" justify="space-around" align="center" gutter="5" class="member-nav px-4">
					<van-col span="6" v-for="(n, index) in balanceItems" :key="index" @click="goBalance(n.url)">
						<van-image width="44" height="36" :src='n.img' lazy-load>
							<template slot="loading">
								<van-loading type="spinner" size="22" />
							</template>
						</van-image>
						<div class="title van-ellipsis">{{n.title}} </div>
					</van-col>
				</van-row>

				<div class="features mt-3 px-4 pt-3 pb-4 text-left">
					<div class="subtitle-3">{{$$t('features')}}</div>

					<van-row type="flex" align="center" gutter="5">
						<van-col span="6" v-for="(n, index) in features" :key="index" class="mt-5"
							@click="goFeatures(n.url)">
							<van-image width="26" height="26" :src='n.img' lazy-load>
								<template slot="loading">
									<van-loading type="spinner" size="22" />
								</template>
							</van-image>
							<div class="title mt-1 van-multi-ellipsis--l2">{{n.title}}</div>
						</van-col>
					</van-row>
				</div>

				<div class="text-left mt-3">
					<van-cell v-if="skgCode !== skyLotteryCode" 
					:title="$$t('inviteUser')" center size="large" is-link
						@click="redirectRouter('inviteUser')">
						<template #icon>
							<van-icon name="/images/member/yq.png" class="mr-2" size="26" />
						</template>
					</van-cell>
					<van-cell :title="$$t('helpCenter')" center size="large" is-link
						@click="redirectRouter('service/games')" v-if="skgCode === skgGameCode && skgCodeKey !== 'SG666'">
						<template #icon>
							<van-icon name="/images/member/help.png" class="mr-2" size="26" />
						</template>
					</van-cell>

					<van-cell :title="$$t('about')" center size="large" is-link
						@click="redirectRouter('service/about/index')" v-if="skgCode === skgGameCode">
						<template #icon>
							<van-icon name="/images/member/about.png" class="mr-2" size="26" />
						</template>
					</van-cell>

					<van-cell :title="$$t('download')" center size="large" is-link class="mt-3"
						@click="linkOpen(siteConfig && siteConfig.appDownloadUrl)">
						<template #icon>
							<van-icon name="/images/member/appDownload.png" class="mr-2" size="26" />
						</template>
					</van-cell>
				</div>

				<div class="abort mt-3 px-3 pb-3">
					<van-button type="default" block class="radius-2" @click="onLogout">{{$$t('LogOut')}}</van-button>
				</div>
			</div>
		</scroller>

		<van-popup v-model="showReportPopup" :close-on-click-overlay="false" closeable :style="{ width: '340px' }"
			class="member_popup">
			<div class="center">
				<div class="title text-center pl-4 py-4">{{$$reports('title')}}</div>
				<div class="day_popup background-white px-4 pt-5">
					<van-row gutter="12">
						<template v-for="(item,i) in checkInItems">
							<div :key="i">
								<van-col span="6" class="mb-4" v-if="i < (checkInItems.length - 1)">
									<div class="day_box radius-2">
										<div class="isCheck">
											<van-overlay :show="item.isCheck">
												<div @click.stop>
													<van-icon name="/images/toolbar/isCheck.png" size="32" />
												</div>
											</van-overlay>
											<div class="pt-1 px-3">
												<van-icon name="/images/toolbar/report_m.png" size="38" />
											</div>
											<div class="number">{{getCheckInMoney(item)}}</div>
										</div>
										<div class="day_number" :class="{day_number_now: item.isNow || item.isCheck}">
											{{item.days}}{{$$reports('day')}}
										</div>
									</div>
								</van-col>

								<van-col span="12" v-else>
									<div class="day_box  radius-2">
										<div class="isCheck">
											<van-overlay :show="item.isCheck">
												<div @click.stop>
													<van-icon name="/images/toolbar/isCheck.png" size="32" />
												</div>
											</van-overlay>

											<div class="flex justify-content-center align-items-center pt-3"
												style="padding-bottom: 9px;">
												<div class="mr-1">
													<van-icon name="/images/toolbar/day_7.png" size="42" />
												</div>
												<div class="number">{{getCheckInMoney(item)}}</div>
											</div>
										</div>

										<div class="day_number" :class="{day_number_now: item.isNow || item.isCheck}">
											{{item.days}}{{$$reports('day')}}
										</div>
									</div>
								</van-col>
							</div>
						</template>
					</van-row>
				</div>

				<div class="subtitle-1">{{$$reports('info')}} <span class="main-text">{{checkDays}}</span>
					{{$$reports('day')}}
				</div>

				<div class="mt-2 flex justify-content-center align-items-center">
					<div class="mr-1">
						<van-icon name="/images/toolbar/report_m.png" size="34" />
					</div>
					<div class="main-text" style="font-size: 20px; font-weight: 500;">+ {{isNowMoney}}</div>
				</div>

				<div class="px-9 pb-5 mt-2">
					<van-button color="linear-gradient(to right, rgb(117, 162, 255), rgb(70, 132, 255))" block round
						:disabled="isNowCheck" @click="onCheckIn">
						{{ isNowCheck ? $$reports('btnSuccess') : $$reports('btn')}}
					</van-button>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import sessionContext from '@/mixins/sessionContext'

	export default {
		name: 'Member',
		mixins: [sessionContext],

		data: () => ({
			refreshIcon: false,
			checkInItems: [],
			checkDays: 0,
			isNowMoney: 0
		}),

		computed: {
			getPercentage() {
				let b = 0
				let c = null
				// const test = {
				// 	'当前总打码量': this.memberData.currentTotalDml,
				// 	'晋级打码量要求': this.memberData.dmlRequire,
				// 	'当前总存款': this.memberData.currentTotalDeposit,
				// 	'晋级存款要求': this.memberData.depositRequire
				// }
				// 当前总存款 / 晋级存款要求 为 a
				// 当前总打码量 / 晋级打码量要求 为 b
				// 假如 a > 1 就用 1 来算
				// 假如 b > 1 就用 1 来算
                // 百分比计算方式： (b * 0.5 + a * 0.5) * 100

				if (Number(this.memberData && this.memberData.currentTotalDml) === 0 || 
					Number(this.memberData && this.memberData.dmlRequire) === 0) return 0
				let v = Number(this.memberData && this.memberData.currentTotalDml) / 
						Number(this.memberData && this.memberData.dmlRequire)
				let p = Number(this.memberData && this.memberData.currentTotalDeposit) / 
						Number(this.memberData && this.memberData.depositRequire)
				if (v > 1) v = 1
				if (p > 1) p = 1
				b = (p * 0.5 + v * 0.5) * 100
				if (b <= 0) b = 0
				c = b.toString().split(".")[1]
				if (c && c.length > 1) b = b.toFixed(2).toString()
				return b
			},

			getPromotion() {
				let m = this.memberData
				let p = this.formatNum((m && m.dmlRequire) - (m && m.currentTotalDml), 2)
				if (p <= 0) p = 0
				return p
			},

			getDepositRequire() {
				let m = this.memberData
				let p = this.formatNum((m && m.depositRequire) - (m && m.currentTotalDeposit), 2)
				if (p <= 0) p = 0
				return p
			},

			showReportPopup: {
				get() {
					return this.$store.getters.showReportPopup
				},

				set(v) {
					this.$store.commit("setShowReportPopup", v);
				}
			},

			isNowCheck() {
				if (this.checkInItems.length < 1) return
				let d = this.checkInItems.filter(e => e.isNow === true)[0]
				return d.isCheck
			},

			features() {
				let e = [{
						img: '/images/member/zb.png',
						title: this.$$t('changeNotes'),
						url: 'changeNotes'
					},
					{
						img: '/images/member/lc.png',
						title: this.$$t('financial'),
						url: 'financial'
					},
					{
						img: '/images/member/dl.png',
						title: this.$$t('teamReport'),
						url: 'teamReport'
					},
					{
						img: '/images/member/fyjl.png',
						title: this.$$t('rebateRecord'),
						url: 'rebateRecord'
					},
					{
						img: '/images/member/rebate.png',
						title: this.$$t('rebates'),
						url: 'rebates'
					},
					{
						img: '/images/member/joint.png',
						title: this.$$t('joint'),
						url: 'joint'
					},
					{
						img: '/images/member/exchangeMoney.png',
						title: this.$$t('exchange'),
						url: 'exchangeMoney'
					},
					{
						img: '/images/member/zhsz.png',
						title: this.$$t('memberInfo'),
						url: 'member/info'
					},
				]
				
				if (this.siteConfig && !this.siteConfig.isOpenTransferByMember) {
					let index = e.findIndex(t => t.url === 'exchangeMoney')
					e.splice(index,1)
				}

				if (this.skgCode === this.skyLotteryCode) {
					let index = e.findIndex(t => t.url === 'rebates')
					e.splice(index,1)
				}
				
				if (this.memberData && Number(this.memberData.memberType) === 0 && this.skgCode !== this.skgUcsCode) e.push({
					img: 'images/member/xjkh.png',
					title: this.$t('subordinateAgent.title'),
					url: 'subordinateAgent'
				})

				return e
			},

			balanceItems() {
				return [{
						img: '/images/member/qb.png',
						title: this.$$t('purses'),
						url: 'purses'
					},
					{
						img: '/images/member/jy.png',
						title: this.$$t('rechargeNotes'),
						url: 'rechargeNotes'
					},
					{
						img: '/images/member/tz.png',
						title: this.$$t('gameBet'),
						url: 'gameBet'
					},
					{
						img: '/images/member/hz.png',
						title: this.$$t('profits'),
						url: 'profits'
					},
				]
			}
		},

		watch: {
			showReportPopup(v) {
				if (v) this.onGetCheckInInfo()
			}
		},

		activated() {
			this.initMemberData()
		},

		methods: {
			onTransformAll() {
				this.showProgress()
				this.$get('/api/Game/TransformAll')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(() => {
						this.$success(this.$t('common.transformSuccess'))
						this.initMemberData()
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			onLogout() {
				this.$dialog.confirm({
						title: this.$t('common.point'),
						message: this.$t('common.signOut'),
					})
					.then(() => {
						this.showProgress(true)
						this.$post('/api/Account/Logout')
							.then(resp => {
								return this.checkResp(resp, (r) => r.data.success === true)
							})
							.then(() => {
								this.showProgress(false)
								this.removeSession()
								this.$router.push('/app/dashboard')
							})
							.catch(error => {
								this.showProgress(false)
								this.procError(error)
							})
					})
					.catch(() => {})
			},

			refreshBalance() {
				this.refreshIcon = !this.refreshIcon;
				setTimeout(() => {
					this.refreshIcon = !this.refreshIcon;
				}, 1000)

				this.refreshMemberData()
			},

			onGetCheckInInfo() {
				this.$post('/api/CheckIn/GetCheckInInfo')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.checkInItems = d.items
						this.checkDays = d.checkDays
						if (d.items.length < 1) return
						let item = d.items.filter(e => e.isNow === true)
						if (item.length < 1) {
							this.isNowMoney = 0
							return;
						} else {
							if (item[0].isCheck) {
								this.isNowMoney = item[0].minMoney
							} else {
								if (item[0].moneyType === 1) {
									this.isNowMoney = item[0].minMoney + '~' + item[0].maxMoney
								} else {
									this.isNowMoney = item[0].minMoney
								}
							}
						}
					})
					.catch(error => {
						this.procError(error)
					})
			},

			onCheckIn() {
				this.showProgress()
				this.$post('/api/CheckIn/CheckIn')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.isNowMoney = data.data
						this.onGetCheckInInfo()
						this.showProgress(false)
						this.$success(this.$$reports('btnSuccess'))
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			getCheckInMoney(item) {
				if (item.moneyType === 0) {
					return '+' + item.minMoney
				} else {
					if (item.isCheck) return '+' + item.minMoney
					else return item.minMoney + '~' + item.maxMoney
				}
			},

			goFeatures(v) {
				if (v === 'exchangeMoney' && this.isDottedMember()) return
				this.redirectRouter(v)
			},

			goBalance(e) {
				if (e === 'purses' && this.isDottedGames()) return
				this.redirectRouter(e)
			},

			$$t(v) {
				return this.$t('member.' + v)
			},

			$$reports(v) {
				return this.$t('reports.' + v)
			}

		}
	}
</script>

<style lang="less" scoped>
	#member {
		height: 100%;
		background-color: rgb(248, 250, 250);

		.view-background {
			position: absolute;
			width: 100%;
			height: 100%;
			background: url('/images/banner/service_bg.png') no-repeat top right;
			background-size: 100% 300px;

			.view-background-flex {
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100%;

				.view-background-flex-top {
					flex: 1;
					background: url('/images/banner/service_bg.png') no-repeat top right;
					background-size: 100% 300px;
				}

				.view-background-flex-bottom {
					flex: 1;
					background: transparent;
				}
			}
		}

		.warp {
			height: 100%;
			background: url('/images/banner/member_bg.png') rgb(248, 250, 250) no-repeat top right;
			background-size: 100% 188px;

			.memberInfo-warp {
				display: flex;
				justify-content: flex-start;
			}

			.vip-progress {
				position: relative;
				display: flex;
				align-items: center;
				margin-left: -50px;

				.van-progress {
					width: 190px;
				}
			}

			.balance {
				width: 315px;
				margin: auto;
				background: url('/images/banner/member_top.png') no-repeat;
				background-size: 100% 85px;
				height: 85px;
				color: rgb(255, 233, 179);

				.balance-top {
					display: flex;
					align-items: center;

					.btn {
						height: 24px;
						padding: 0 8px;
						line-height: 24px;
						border: 1px solid rgb(255, 233, 179);
					}
				}

				.balance-btm {
					display: flex;
					align-items: center;

					.refresh {
						transform: rotate(360deg);
						transition: all 1s;
					}
				}
			}

			.navs {
				height: 70px;

				>.navs-warp {
					height: 100%;
					background-color: white;
					display: flex;
					justify-content: space-between;
					align-items: center;

					>div {
						display: flex;
						align-items: center;
					}

					>.center {
						width: 1px;
						height: 40px;
						background-color: #CCCCCC;
					}
				}
			}

			.member-nav {
				margin-top: 3px;
				height: 80px;
				background-color: white;
				color: #666666;

				.van-col {
					text-align: center;

					.title {
						height: 16px;
						line-height: 16px;
						font-size: 12px;
					}
				}
			}

			.features {
				background-color: white;

				.van-col {
					text-align: center;

					.title {
						min-height: 16px;
						font-size: 12px;
					}
				}
			}
		}

		.member_popup {
			border-radius: 10px;

			.center {
				background-image: url("/images/toolbar/nav_bg.png");
				background-size: 100%;
				background-repeat: no-repeat;
				background-position: top;

				.title {
					font-size: 20px;
					font-weight: bold;
					color: white;
				}

				.day_popup {
					.day_box {
						border: 1px solid #C1D4FF;

						.number {
							color: rgb(241, 105, 43);
							font-size: 12px;
							margin-top: 1px;
							padding-bottom: 1px;
						}

						.day_number {
							width: 100%;
							height: 20px;
							background-color: #C1D4FF;
							color: white;
							font-size: 12px;
							line-height: 20px;
							text-align: center;
						}

						.day_number_now {
							background-color: #7EA1FC !important;
						}

						.isCheck {
							position: relative;

							/deep/ .van-overlay {
								position: absolute;
								border-top-left-radius: 4px;
								border-top-right-radius: 4px;

								>div {
									.van-icon {
										position: absolute;
										top: 50%;
										left: 50%;
										transform: translate(-50%, -50%);
									}
								}
							}
						}
					}
				}

			}
		}
	}
</style>
