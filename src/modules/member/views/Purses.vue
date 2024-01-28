<template>
	<div id="purses">
		<scroller>
			<div class="px-4 mt-3">
				<div class="warp background-white text-left pa-4 radius-1">
					<div class="flex space-between">
						<div>
							<div class="body-2 text-grey">{{$$t('total')}}</div>
							<div class="mt-2 money-number"><span class="caption">{{currencySymbol}}</span>
								{{formatNum(memberData && memberData.balance + gameBalance, 2)}}{{currencyDenomination}}
							</div>
						</div>

						<div class="mt-3 px-5 btn radius-4 text-white" @click="redirectWithdraw('recharge')">
							{{$$t('deposit')}}
						</div>
					</div>

					<van-row type="flex" justify="space-between" class="mt-6 text-grey">
						<template v-for="(item, index) in navs">
							<van-col span="8" :key="index">
								<div class="text-center" @click="redirectWithdraw(item.link)">
									<van-image :src="`/images/member/purses/${item.img}.png`" width="40" />
									<div>{{item.text}}</div>
								</div>
							</van-col>
						</template>
					</van-row>

					<div class="body-2 mt-10 flex text-grey align-items-center space-between"
						v-if="skgCode === skgGameCode">
						<div class="flex align-items-center">
							<span class="mr-2">{{$$t('walletDetails')}}</span>
							<van-icon name="/images/member/purses/refresh.png" size="18" :class="{refresh: refreshIcon}"
								@click="refreshBalance" />
						</div>
						<div @click="onTransformAll">{{$$t('recycle')}}</div>
					</div>

					<van-row class="mt-5 purse-details" type="flex" justify="center" v-if="skgCode === skgGameCode">
						<van-col span="12">
							<div class="text-center">
								<div class="flex justify-content-center align-items-center">
									<van-image src="/images/member/purses/purse.png" width="16" height="14" />
									<div class="caption text-grey ml-1">{{$$t('centralWallet')}}</div>
								</div>
								<div class="subtitle-4 main-text mt-1">{{currencySymbol}}{{memberData &&
                                    memberData.balance}}{{currencyDenomination}}
								</div>
							</div>
						</van-col>

						<van-col span="12">
							<div class="text-center">
								<div class="flex justify-content-center align-items-center">
									<van-image src="/images/member/purses/purse.png" width="16" height="14" />
									<div class="caption text-grey ml-1">{{$$t('gameWallet')}}</div>
								</div>
								<div class="subtitle-4 main-text mt-1">
									{{gameBalance>0 ? currencySymbol + gameBalance + currencyDenomination : '——'}}
								</div>
							</div>
						</van-col>
					</van-row>

					<van-divider class="mt-2" />
					<van-row type="flex" align="center" class="mt-6 games">
						<template v-for="(item, index) in platforms">
							<van-col span="6" :key="index" :class="{purse: index%4}">
								<div class="text-center py-3 px-2">
									<div class="caption">{{item.platformName}}</div>
									<div class="caption text-grey mt-1">{{currencySymbol}}{{balance &&
                                        balance[item.platformCode] || 0.00}}{{currencyDenomination}}
									</div>
								</div>
							</van-col>
						</template>
					</van-row>
				</div>
			</div>
		</scroller>
	</div>
</template>

<script>
	import sessionContext from '@/mixins/sessionContext'

	export default {
		name: 'Purses',
		mixins: [sessionContext],

		data: () => ({
			platforms: [],
			balance: {},
			gameBalance: 0,
			refreshIcon: false,
			errorMsg: []
		}),

		computed: {
			navs() {
				if (this.skgCode === this.skgGameCode) {
					return [{
							img: 'zz',
							text: this.$$t('transfer'),
							link: 'purses/transfer'
						},
						{
							img: 'qk',
							text: this.$$t('withdraw'),
							link: 'withdraw'
						},
						{
							img: 'zhgl',
							text: this.$$t('cards'),
							link: 'cards'
						}
					]
				} else {
					return [{
						img: 'qk',
						text: this.$$t('withdraw'),
						link: 'withdraw'
					}, {
						img: 'zhgl',
						text: this.$$t('cards'),
						link: 'cards'
					}]
				}
			}
		},

		created() {
			if (this.skgCode === this.skgGameCode) this.onGetOpenPlatforms()
		},

		activated() {
			this.initMemberData()
		},

		methods: {
			onLoad(items) {
				if (this.isVirtualMember() || this.isDottedMember()) return;
				this.showProgress()
				this.gameBalance = 0
				for (let item in items) {
					this.$get('/api/Game/RefreshBalance?platformCode=' + items[item].platformCode)
						.then(resp => {
							return this.checkResp(resp, (r) => r.data.success === true)
						})
						.then(data => {
							let d = Number(data.data)
							this.showProgress(false)
							this.balance[items[item].platformCode] = d
							if (Number(d) > 0) this.gameBalance = this.formatNum(this.gameBalance + d, 2)
							if (Number(item) === Number(items.length - 1)) {
								setTimeout(() => {
									this.showProgress(false)
								}, 2000)
							}
						})
						.catch(error => {
							this.showProgress(false)
							this.procError(error)
						})
				}
			},

			onTransformAll() {
				if (this.isVirtualMember() || this.isDottedMember()) {
					return
				}
				this.showProgress(true, 10000)
				let items = this.platforms
				this.gameBalance = 0
				this.errorMsg = [];
				const regArray = items.map( t => this.$get(`/api/Game/TransformByPlatformCode?type=1&money=0&platformCode=${t.platformCode}`))
				
				Promise.allSettled(regArray).then( results => {
						results.forEach(result => {
							if (result.status === 'fulfilled') {
								//成功
								const url = result.value.config.url;
								const platformCode = url.substring(url.indexOf('platformCode=')+13)
								let money = Number(result.value.data.data);
								if (isNaN(money)) {
									money = 0;
								}
								this.balance[platformCode] = money;
								this.gameBalance = this.formatNum(this.gameBalance + money, 2)
								
							} else {
								//失败
								const url = result.reason.config.url;
								const platformCode = url.substring(url.indexOf('platformCode=')+13)
								this.errorMsg.push(items.find(t => t.platformCode === platformCode).platformName)
							}
						})
						this.showProgress(false);
						if (!this.errorMsg.length) {
							// 全部成功
							setTimeout(() => 
								this.$success(this.$t('common.transformSuccess'))
							, 0)
						} else {
							setTimeout(() =>
								this.$dialog.confirm({
									title: this.$$t('_1'),
									message: this.errorMsg.join() + ', ' + this.$$t('_2'),
								})
								.then(() => {})
								.catch(() => {})

							, 0)
						}
						this.initMemberData();
					}
				)
			},

			onGetOpenPlatforms() {
				this.$get('/api/Game/GetOpenPlatforms')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.platforms = data.data
						this.onLoad(data.data)
					})
					.catch(error => {
						this.procError(error)
					})
			},


			refreshBalance() {
				this.refreshIcon = !this.refreshIcon;
				setTimeout(() => {
					this.refreshIcon = !this.refreshIcon;
				}, 1000)

				this.initMemberData()
				this.onLoad(this.platforms)
			},

			redirectWithdraw(n) {
				let e = this.memberData && this.memberData.memberType
				if (this.isDottedMember()) {
					return;
				}
				if (e === 2 && n !== 'withdraw') {
					return this.$error(this.$t('common.isDotted'));
				}
				if (n === 'withdraw') {
					this.$post('/api/Withdraw/GetWithdrawMoneyShowInfo')
						.then(resp => {
							return this.checkResp(resp, (r) => r.data.success === true)
						})
						.then(() => {
							this.$router.push('withdraw')
						})
						.catch(error => {
							if (Number(error.message) === 1) {
								this.$router.push('bank/add')
							} else if (Number(error.message) === 2) {
								this.$dialog.confirm({
										title: this.$t('common.point'),
										message: this.$$t('pwdDesc'),
									})
									.then(() => {
										this.$router.push('setWithdrawalPwd')
									});
							}
						})
				} else {
					this.$router.push(n)
				}
			},

			$$t(v) {
				return this.$t('purses.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#purses {
		height: 100%;

		.warp {
			.refresh {
				transform: rotate(360deg);
				transition: all 1s;
			}

			.btn {
				height: 32px;
				line-height: 32px;
				background-image: linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255));
			}

			.purse-details {
				.van-col:first-child {
					position: relative;
				}

				.van-col:first-child:after {
					content: "";
					display: block;
					border-right: 1px solid #9FA4AB;
					height: 20px;
					position: absolute;
					right: 0;
					top: calc(50% - 12px);
				}
			}

			.purse {
				position: relative;
			}

			.purse :after {
				content: "";
				display: block;
				border-right: 1px solid #9FA4AB;
				height: 20px;
				position: absolute;
				left: 0;
				top: calc(50% - 12px);
			}

			.platform_title :after {
				content: "";
				display: block;
				height: 0 !important;
				width: 0 !important;
			}
		}
	}
</style>
