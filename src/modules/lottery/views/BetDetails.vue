<template>
	<div id="betDetails" class="text-left">
		<scroller>
			<div class="pt-5 pl-5 subtitle-4">{{item.lotteryName}}</div>
			<div class="pt-1 pl-5 caption text-grey">{{datesMaker(item.dates)}}</div>

			<div class="mt-5 text-left center">
				<van-cell :title="$$t('playTypeName')" value-class="subtitle-3" :value="item.playTypeName"
					class="v_radius" />

				<van-cell :title="$$t('betContent')" size="large">
					<div slot="default" class="flex justify-content-end">
						<div class="betContent white-text" v-if="item.playType === 'Single'">{{item.betContent}}</div>

						<div class="flex align-items-center" style="justify-content: end;"
							v-else-if="item.groupName === 'Rps'">
							<div class="mr-2">{{item.betContentName}}</div>

							<div v-if="item.playType === 'Rps_Banker_Player'">
								<template v-for="(img, index) in getRpsBankerLists(item)">
									<van-image :src="`/images/lottery/rps/${img}.png`" width="28" height="28"
										class="mr-1" :key="index" />
								</template>
							</div>

							<div v-else-if="item.playType === 'Rps_Mora'">
								<van-image :src="`/images/lottery/rps/${item.betContent}.png`" width="28" height="28"
									v-if="culture === 'zh-CN'" />

								<van-image :src="`/images/lottery/rps/${item.betContent}_en.png`" width="28" height="28"
									v-else />
							</div>

							<van-image :src="`/images/lottery/rps/${item.betContent}.png`" width="28" height="28"
								v-else />
						</div>

						<div v-else-if="item.groupName === 'SeDie'">
							<van-image :src="`/images/lottery/guess/${item.betContent}.png`" height="24"
								v-if="isNumber(item.betContent)" />
							<div class="subtitle-1" v-else>{{item.betContentName}}</div>
						</div>

						<div class="flex align-items-center" style="justify-content: end;"
							v-else-if="item.groupName === 'SicBo'">
							<div class="subtitle-3" v-if="item.playType === 'Sum'">
								{{item.betContent}}({{item.playTypeName}})
							</div>

							<div v-else-if="item.playType === 'DoubleSide'">
								{{item.betContentName}}
							</div>

							<div class="flex align-items-center" v-else>
								<van-image :src="`/images/lottery/sicBo/${e}.png`"
									v-for="(e, i) in getPaigowArray(item.betContent)" :key="i" width="20" height="20"
									:class="{'mr-1': i === 0}">
								</van-image>
							</div>
						</div>

						<div v-else-if="item.groupName === 'PK10' || item.groupName === 'K3' || item.groupName === 'SSC' || item.groupName === 'VNSouth' || item.groupName === 'Mark6'">
							<div class="mr-2" style="word-break: break-word; text-align: left;">{{item.betContentName}}</div>
						</div>

						<div class="flex align-items-center" style="justify-content: end;" v-else>
							<div class="mr-2">{{item.betContentName}}</div>
							<van-image :src="`/images/lottery/${getColors()}.png`" width="28" height="24" />
						</div>
					</div>
				</van-cell>

				<van-cell :title="$$t('money')" size="large"
					:value="`${item.currencySymbol}${item.money }${item.currencyDenomination}`"
					value-class="red-text subtitle-3" />

				<van-cell :title="$$t('betNums')" size="large" :value="item.betNums" />


				<van-cell :title="$$t('orderId')" size="large" :value="item.orderId">
					<van-icon name="/images/gamebet/copy.png" size="20" slot="right-icon" class="ml-2"
						@click="copyBtnClick(item.orderId)" />
				</van-cell>
				<van-cell :title="$$t('createTime')" size="large" :value="item.createTime" />

				<van-cell :title="$$t('odds')" size="large" :value="item.odds" class="mt-3" />

				<van-cell :title="$$t('result')" size="large" v-if="item.result" :class="item.groupName">
					<div slot="default" class="text-center" style="display: flex;justify-content: end;">
						<div class="flex" v-if="item.groupName === 'Lucky3'">
							<div class="betContent white-text " v-if="isNumber(item.result)">{{item.result}}</div>
							<van-image :src="`/images/lottery/${item.result}.png`" width="28" height="24" v-else />
						</div>

						<div class="flex align-items-center" v-else-if="item.groupName === 'Rps'">
							<template v-for="(img, index) in getRps(item.result)">
								<van-image :src="`/images/lottery/rps/${img}.png`" width="24" height="24" class="mr-1"
									:key="index" />
							</template>
						</div>

						<div class="flex align-items-center" v-else-if="item.groupName === 'SeDie'">
							<template v-for="(r, index) in item && item.result && item.result.split(',')">
								<van-image :src="`/images/lottery/guess/${r}.png`" width="24" height="24" :key="index"
									class="mr-2" />
							</template>
						</div>

						<div class="flex align-items-center" v-else-if="item.groupName === 'SicBo' || item.groupName === 'K3'">
							<template v-for="(r, index) in getArry(item && item.result)">
								<van-image :src="`/images/lottery/sicBo/${r}.png`" width="24" height="24" :key="index"
									class="mr-2" />
							</template>
						</div>

						<div v-else-if="item.groupName === 'PK10'" class="text-left" style="width: 75%;">
							<template v-for="(r, i) in getArry(item && item.result)">
								<div :class="`b-pk10-${r}`" :key="i">{{r}}</div>
							</template>
						</div>

						<div v-else-if="item.groupName === 'SSC'" class="text-left flex" style="width: 75%;">
							<template v-for="(r, i) in getArry(item && item.result)">
								<div class="ssc-num-box" :key="i">{{r}}</div>
							</template>
						</div>

						<div v-else-if="item.groupName === 'VNSouth'" class="text-left flex" style="width: 100%;">
							<div class="vnsouth-current-wrap">
								<div
									v-for="(
										item, resultIndex
									) in getVNSouthResult(item && item.result)"
									:key="`result-${resultIndex}`"
									class="flex"
									:style=" resultIndex < 2 ? 'font-weight: 900' : 'font-weight: 400'"
								>
									<div
										class="flex align-items-center justify-content-center vnsouth-current-name"
									>
										{{ item.awards }}
									</div>
									<div class="vnsouth-current-result">
										{{ item.result }}
									</div>
								</div>
							</div>
						</div>

						<div v-else-if="item.groupName === 'Mark6'" class="flex align-items-center" style="width: 100%; justify-content: end;">
							<div 
								v-for="(num, i) in getArry(item && item.result)"
								:key="i"
								style="display: flex;"
							>
								<div 
									v-if="i === 6"
									:class="['mark6-num-small']"
									style="font-size: 18px;line-height: 24px; align-items: flex-start;"
								>+</div> 
								<div
									:class="['mr-1']"
									style="display: flex;flex-direction: column;"
								>
									<div
										:class="['mark6-num-small']"
										:style="`background-image: url(/images/lottery/${getMark6Color(num)}_.png);`"
									>{{ num }}</div>
									<div style="color: #444; font-size: 12px;font-weight: bold; text-align: center;">{{ getCurZodiac(item.resultSx && item.resultSx.split(',')[i]) }}</div>
								</div>
							</div>
						</div>

						<div v-else>
							<template v-for="(r, index) in getArry(item && item.result)">
								<van-image :src="`/images/lottery/${r}.png`" width="28" height="24" :key="index"
									class="mr-1" />
							</template>
						</div>
					</div>
				</van-cell>

				<van-cell :title="$t('gameBetDetails.winMoneyY')" value-class="red-text subtitle-3"
					:value="`${item && item.currencySymbol}${item && item.winMoney}${currencyDenomination}`" />
				<van-cell :title="$$t('profitLoss')" size="large"
					:value="`${item.currencySymbol}${item.profitLoss}${item.currencyDenomination}`" />
			</div>

			<div class="px-6 btn pb-6">
				<van-row gutter="24" v-if="isRevoke">
					<van-col span="12">
						<van-button block :disabled="disRevoke" class="radius-1" @click="onRevoke">{{$$t('revoke')}}
							<van-count-down :time="RemainingTime" @change="(data) => handleDisRevoke(data)" />
						</van-button>
					</van-col>
					<van-col span="12">
						<van-button color="linear-gradient(to right, #4684FF, #81AAFF)" block class="radius-1"
							@click="againLottery">{{$$t('again')}}
						</van-button>
					</van-col>
				</van-row>

				<div v-else>
					<van-button color="linear-gradient(to right, #4684FF, #81AAFF)" block class="radius-1"
						@click="againLottery">{{$$t('again')}}
					</van-button>
				</div>
			</div>
		</scroller>
	</div>
</template>

<script>
	export default {
		name: 'BetDetails',

		data: () => ({
			RemainingTime: null,
			item: {},
			isRevoke: false,
			disRevoke: false,
			zodiacList: [],
		}),


		activated() {
			this.getZodiacData();
			this.item = this.$sessionGet('betLists-Data')
			let t = this.item.lotteryType
			if (t) this.onGetCurrentDates(t)
		},

		methods: {
			handleDisRevoke(data){
				if(data.hours === 0 && data.minutes === 0 && data.seconds < 6){
					this.disRevoke = true
				} else this.disRevoke = false
			},
			onGetCurrentDates(t) {
				if (!t) return
				this.$get('/api/Lottery/GetCurrentDates?type=' + t)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						let status = this.item.status
						this.isRevoke = (Number(status) === 0) && (Number(d.dates) === Number(this.item.dates));
						if (['VNSouth'].includes(this.item.groupName) && d.dates === this.item.dates) {
							this.isRevoke = Number(status) === 0;
						}
						// 倒数计时
					    this.RemainingTime = d.secondsRemaining * 1000
					})
					.catch(error => {
						this.isRevoke = false
						this.procError(error)
					})
			},

			onRevoke() {
				this.$dialog.confirm({
						title: this.$t('common.point'),
						message: this.$$t('revoke_d'),
					})
					.then(() => {
						// on confirm
						this.showProgress()
						this.$get('/api/Lottery/Revoke?orderId=' + this.item.orderId)
							.then(resp => {
								return this.checkResp(resp, (r) => r.data.success === true)
							})
							.then(data => {
								this.showProgress(false)
								this.$success(data.data)
								setTimeout(() => {
									this.redirectRouter('/app/betLists')
								}, 500)
							})
							.catch(error => {
								this.showProgress(false)
								this.procError(error)
							})
					})
					.catch(() => {
						// on cancel
					});
			},

			againLottery() {
				let path = ''
				if (this.item.groupName === 'PK10' || this.item.groupName === 'K3') {
					path = '/app/PK10'
					this.$sessionSet('new_pull', true)
				} else if (this.item.groupName === 'SSC') {
					path = '/app/ssc'
					this.$sessionSet('new_pull', true)
				} else {
					path = '/app/lottery'
				}

				this.$sessionSet('rules_code',this.item.groupName)
				this.$sessionSet('gameCode_item', this.item.lotteryType)
				this.$router.push({
					path: path,
					query: {
						gameCode: this.item.lotteryType
					}
				})
			},

			getColors() {
				let t = this.item.betContent
				if (t === '' || t === null || !t) return
				let c = t.split(",")
				if (c.length > 1) return c[0] + '_' + c[1]
				else return c[0]
			},

			getRps(bet) {
				if (bet) {
					let c = bet.split(",")
					let v = []
					let b = ['Scissors', 'Stone', 'Cloth']
					let bp = ['Banker', 'Player']
					for (let i = 0; i < c.length; i++) {
						v.push(bp[i] + '_' + b[Number(c[i]) - 1])
					}

					let number = Number(c[0]) - Number(c[1])
					let pbText = ''
					if (number === -2 || number === 1) pbText = 'Banker'
					else if (number === -1 || number === 2) pbText = 'Player'
					else pbText = 'Tie'

					v.splice(0, 0, pbText);

					return v
				} else {
					return null
				}

			},

			isNumber(val) {
				val = Number(val)
				if (parseFloat(val).toString() == "NaN") {
					return false;
				} else {
					return true;
				}
			},

			getRpsBankerLists(e) {
				let c = e.betContent.split("_")
				let arr = []
				arr.push('Banker_' + c[0])
				arr.push('Player_' + c[1])
				if (e.playType === 'Rps_Banker_Player') return arr
				else return e.betContent.split(",")
			},

			getPaigowArray(v) {
				return v.split("&")
			},

			getArry(a) {
				if (a) return a.split(",")
				else return []
			},

			$$t(v) {
				return this.$t('betDetails.' + v)
			},

			getVNSouthResult(VNSouthresult) {
				try {
					const result = VNSouthresult.split("+");
					return [
						{
							awards: this.$t('pk10._400'),
							result: result[0]
						},
						{
							awards: this.$t('pk10._401'),
							result: result[1]
						},
						{
							awards: this.$t("pk10._402"),
							result: result[2],
						},
						{
							awards: this.$t("pk10._403"),
							result: result[3].replaceAll("|", "-"),
						},
						{
							awards: this.$t("pk10._404"),
							result: result[4].replaceAll("|", "-"),
						},
						{
							awards: this.$t("pk10._405"),
							result: result[5],
						},
						{
							awards: this.$t("pk10._406"),
							result: result[6].replaceAll("|", "-"),
						},
						{
							awards: this.$t("pk10._407"),
							result: result[7],
						},
						{
							awards: this.$t("pk10._408"),
							result: result[8],
						},
					];
				} catch (error) {
					return [];
				}
			},

			getZodiacData() {
				this.$get("/api/Lottery/GetZodiac")
				.then((resp) => {
					return this.checkResp(resp, (r) => r.data.success === true);
				})
				.then((data) => {
					this.zodiacList = data.data;
				})
				.catch((error) => {
					this.procError(error);
				});
			},

			getMark6Color(content) {
				switch(+content) {
					case 1:
					case 2:
					case 7:
					case 8:
					case 12:
					case 13:
					case 18:
					case 19:
					case 23:
					case 24:
					case 29:
					case 30:
					case 34:
					case 35:
					case 40:
					case 45:
					case 46:
						return 'red';
					case 3:
					case 4:
					case 9:
					case 10:
					case 14:
					case 15:
					case 20:
					case 25:
					case 26:
					case 31:
					case 36:
					case 37:
					case 41:
					case 42:
					case 47:
					case 48:
						return 'blue';
					case 5:
					case 6:
					case 11:
					case 16:
					case 17:
					case 21:
					case 22:
					case 27:
					case 28:
					case 32:
					case 33:
					case 38:
					case 39:
					case 43:
					case 44:
					case 49:
						return 'green';
					default:
						return '';
				}
			},

			getCurZodiac(content) {
				try {
                    return this.zodiacList.find((item) => item.zodiac === content)?.zodiacName || 'null';
                } catch {
                    return 'null';
                }
			},
		},


		// beforeRouteLeave(to, form, next) {
		// 	sessionStorage.removeItem('betLists-Data')
		// 	next()
		// },

		beforeRouteEnter(to, from, next) {
			let e = JSON.parse(sessionStorage.getItem('betLists-Data'))
			if (!e) next('/app/lottery')
			else next()
		}
	}
</script>

<style lang="less" scoped>
	#betDetails {
		.betContent {
			width: 28px;
			height: 28px;
			line-height: 28px;
			text-align: center;
			background-image: url(/images/lottery/list_number.png);
			background-size: 100%;
		}

		.betContent_p {
			position: absolute;
			right: 16px;
		}

		.v_radius {
			border-radius: 12px 12px 0 0;
		}

		.btn {
			margin-top: 68px;
		}
		.ssc-num-box {
			padding-top: 1px;
			color: #fff;
			text-align: center !important;
			font-size: 20px;
			font-weight: 700;
			border-radius: 50%;
			line-height: 20px;
			min-width: 20px;
			max-height: 20px;
			margin-right: 4px !important;
			background: linear-gradient(to left, rgba(66, 101, 241, 0.7), rgba(100, 150, 251, 0.7)) !important;
		}

		.VNSouth {
			flex-wrap: wrap;
			.van-cell__title,
			.van-cell__value {
				flex: 0 0 100%;
			}
		}

		.Mark6 {
			flex-wrap: wrap;
			.van-cell__title {
				flex: 0 0 25%;
			}
			.van-cell__value {
				flex: 0 0 75%;
			}
		}

		.vnsouth-current-wrap {
			margin: 0.15rem;
			border-left: 1px solid rgba(117, 162, 251, 0.3);
			border-top: 1px solid rgba(117, 162, 251, 0.3);
		}

		.vnsouth-current-name {
			color: #5b7ffb;
			padding: 0.1rem;
			width: 2.5rem;
			border-right: 1px solid rgba(117, 162, 251, 0.3);
			border-bottom: 1px solid rgba(117, 162, 251, 0.3);
		}

		.vnsouth-current-result {
			color: #5b7ffb;
			padding: 0.1rem;
			flex: 1;
			text-align: center;
			border-right: 1px solid rgba(117, 162, 251, 0.3);
			border-bottom: 1px solid rgba(117, 162, 251, 0.3);
		}

		.mark6-num {
			border-radius: 50%;
			color: #444;
			width: 32px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			text-transform: initial;
			white-space: normal;
			font-weight: bold;
			background-size: contain;
		}
		.mark6-num-small {
			border-radius: 50%;
			color: #444;
			width: 25px;
			height: 25px;
			display: flex;
			align-items: center;
			justify-content: center;
			text-transform: initial;
			white-space: normal;
			font-weight: bold;
			background-size: contain;
			font-size: 12px;
		}
	}
</style>
