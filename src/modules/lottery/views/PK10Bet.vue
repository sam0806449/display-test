<template>
	<div id="pK10Bet" class="text-left background-white">
		<div class="px-3 background-white body-2 py-2 van-hairline--bottom text-center">
			<van-row type="flex" justify="space-between" gutter="10">
				<van-col span="6" class="text-left van-ellipsis">{{$$t('playType')}}</van-col>
				<van-col span="6" class="van-ellipsis">{{$$t('betContent')}}</van-col>
				<van-col span="6" class="van-ellipsis">{{$$t('betMoney')}}</van-col>
				<van-col span="6" class="text-right van-ellipsis">{{$$t('money')}}</van-col>
			</van-row>
		</div>

		<div class="warps">
			<scroller>
				<template v-for="(item, index) in transBetList">
					<van-row type="flex" justify="space-between" align="center" gutter="10"
						class="py-2 van-hairline--bottom background-white px-3 text-center" :key="index">
						<van-col span="6" class="text-left">{{getPayText(item)}}</van-col>

						<van-col span="6"
							v-if="['fiveElement1st', 'fiveElement2nd', 'fiveElement3rd'].includes(item.playType)">
							<div class="flex align-items-center">
								<div v-for="(b, index) in getArry(item.betContent)" :key="index">{{$t(`pk10.${b}`)}},
								</div>
							</div>
						</van-col>
						<van-col span="6" class="van-ellipsis" v-else-if="['Mismatch', 'RowNo'].includes(current_lottery)">{{getBetText(item)}}</van-col>
						<van-col span="6" v-else-if="activeTab==='baseBet'">{{getBetText(item)}}</van-col>
						<van-col span="6" v-else-if="!isMake">{{getBetText(item)}}</van-col>
						<van-col span="6" class="van-ellipsis" v-else>{{item.betContent}}</van-col>

						<van-col span="6" style="margin: auto;" v-if="!isMake">
							<van-field v-model="item.singMoney" type="digit" maxlength="9" center class="money_bet"
								@input="onChangeBetMoney($event, item.playType, item.betContent)"
								v-if="item.playType === 'niuniuDouble'">
								<span slot="left-icon">{{currencySymbol}}</span>
								<span slot="right-icon">{{currencyDenomination}}</span>
							</van-field>
							<van-field v-model="item.money" type="digit" maxlength="9" center class="money_bet" v-else>
								<span slot="left-icon">{{currencySymbol}}</span>
								<span slot="right-icon">{{currencyDenomination}}</span>
							</van-field>
						</van-col>
						<van-col span="6" style="margin: auto;" v-else>
							<van-field v-model="money" type="digit" maxlength="9" center readonly class="money_bet">
								<span slot="left-icon">{{currencySymbol}}</span>
								<span slot="right-icon">{{currencyDenomination}}</span>
							</van-field>
						</van-col>

						<van-col span="6" class="text-right" v-if="!isMake">
							{{currencySymbol}}{{item.money}}{{currencyDenomination}}
						</van-col>
						<van-col span="6" class="text-right" v-else>
							{{currencySymbol}}{{betMoney}}{{currencyDenomination}}
						</van-col>
					</van-row>
				</template>
			</scroller>
		</div>

		<div class="footer pt-2">
			<div class="flex align-items-center space-between pb-2 van-hairline--bottom px-3">
				<div class="flex align-items-center">
					<div class="mr-1"> <span class="caption">{{$$t('money')}}</span> {{currencySymbol}}</div>
					<van-field v-model="money" type="digit" maxlength="9" center @input="onChangeMoney"
						class="quick_bet mr-1" />
					<div class="caption">{{currencyDenomination}}</div>
				</div>

				<div class="flex space-between align-items-center text-center">
					<div class="flex radius-2">
						<template v-for="(e, index) in betMoneys">
							<div class="block_number subtitle-3" :key="index" @click="onChangeMoney(e)">{{e}}</div>
						</template>
					</div>
				</div>
			</div>

			<van-row type="flex" justify="space-between" align="center" gutter="10">
				<van-col span="16" class="text-center">
					<div class="body-2">
						<span v-if="siteConfig.codeKey === 'SGMGM' && culture === 'vi-VN'">{{$$t_lottery('number')}}<span class="red-text subtitle-1">{{betNumber}}</span>，</span>
						<span v-else-if="siteConfig.codeKey === 'SGMP' && culture === 'vi-VN'">{{$$t_lottery('number')}}<span class="red-text subtitle-1">{{betNumber}}</span>，</span>
						<span v-else><span class="red-text subtitle-1">{{betNumber}}</span>{{$$t_lottery('number')}}，</span>
						{{$$t('total')}}：{{currencySymbol}}<span class="red-text subtitle-1">{{betMoney}}</span> {{currencyDenomination}}
					</div>
				</van-col>
				<van-col span="8">
					<van-button color="linear-gradient(to right, #4684FF, #81AAFF)" block :disabled="isDisabled"
						@click="onBet">
						{{$$t_lottery('bet')}}
					</van-button>
				</van-col>
			</van-row>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'PK10Bet',

		data() {
			return {
				baseBet: null,
				money: 2,
				betMoneys: [10, 20, 50, 100, 1000],
				isDisabled: false,
				activeTab: null,
				singMoney: 0,
				timeOutDatesBet: null,
				current_lottery: null,
				get betNumber(){
					return Number(sessionStorage.getItem("betNumber")) || 1;
				},
				zodiacList: [],
			}
		},

		created() {
			this.onGetCurrentDates()
			this.zodiacList = this.$sessionGet('zodiacList')
			this.current_lottery = sessionStorage.getItem('current_lottery')
			this.baseBet = this.$sessionGet('baseBet-data')
			let isMake = this.$sessionGet('isMake')
			this.activeTab = sessionStorage.getItem('activeTab-data')
			if (this.current_lottery === 'niuniu') {
				let niuniuEquales = this.baseBet.betContent.filter(e => e.playType === 'niuniuEquales')
				if (niuniuEquales.length > 0) {
					this.money = niuniuEquales[0].money
				} else {
					// this.niuniuDoubleMoney =Number( this.baseBet.betContent[0].money) / 5
				}
			} else if (isMake && this.activeTab === 'allBet') {
				let m = this.baseBet.betContent[0].money
				this.money = m / this.betNumber
			} else {
				this.money = this.baseBet.betContent[0].money
			}
			this.sortBetData(this.baseBet)
			if (this.current_lottery === 'fanTan') this.sortFanTan()
		},

		computed: {
			transBetList() {
				if (!this.baseBet) return []
				return this.baseBet.betContent;
			},
			// betNumber() {
			// 	if (this.isMake && this.activeTab === 'allBet') {
			// 		return sessionStorage.getItem('betNumber') || 1
			// 	} else {
			// 		return this.baseBet && this.baseBet.betContent.length
			// 	}
			// },

			betMoney() {
				if (!this.baseBet) return
				if (this.isMake && this.activeTab === 'allBet') {
					return this.betNumber * Number(this.money)
				} else if (this.current_lottery === 'niuniu') {
					let niuniuDouble = this.baseBet.betContent.filter(e => e.playType === 'niuniuDouble')
					let niuniuEquales = this.baseBet.betContent.filter(e => e.playType === 'niuniuEquales')
					let m = 0
					if (niuniuDouble.length > 0) {
						for (let i = 0; i < niuniuDouble.length; i++) {
							m += Number(niuniuDouble[i].singMoney) * 5
						}
					}
					if (niuniuEquales.length > 0) {
						for (let i = 0; i < niuniuEquales.length; i++) {
							m += Number(niuniuEquales[i].money)
						}
					}
					return m
				} else {
					let m = 0
					let e = this.baseBet && this.baseBet.betContent
					for (let i = 0; i < e.length; i++) {
						m += Number(e[i].money)
					}
					return m
				}
			},

			isMake() {
				let e = sessionStorage.getItem('isMake')
				return (e === 'true' ? true : false) || false
			}
		},


		methods: {
			sortFanTan(){
				// 番大小单双，番，角，三门，正，念，通
				// fanTanDxds，fan，jiao，sanmen，zheng，nian，1tong 2tong 3tong 4tong
				const sortList = {
					fanTanDxds: 0,
					fan: 1,
					jiao: 2,
					sanmen: 3,
					zheng: 4,
					nian: 5,
					"1tong": 6,
					"2tong": 7,
					"3tong": 8,
					"4tong": 9,
				};
				this.baseBet.betContent = this.baseBet.betContent.map((item) => {
					return {
						...item,
						sortIndex: sortList[item.playType],
					};
				}).sort((a, b) => a.sortIndex - b.sortIndex);
			},
			sortBetData(data){
				const type = sessionStorage.getItem("current_lottery")
				if (type === '单球1-5') {
					data.betContent.sort((a,b) => (a.betContent > b.betContent) ? 1 : ((b.betContent > a.betContent) ? -1 : 0))
				}
			},
			onGetCurrentDates() {
				let t = sessionStorage.getItem('gameCode_item')
				this.$get('/api/Lottery/GetCurrentDates?type=' + t)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						if (d.dates !== this.baseBet.dates) {
							let current_lottery = sessionStorage.getItem('current_lottery')
							if (!current_lottery) return
							this.$dialog.confirm({
									message: this.$$t('d_t', {
										fN: this.baseBet.dates,
										lN: d.dates
									}),
								})
								.then(() => {
									// on confirm
									this.baseBet.dates = d.dates
									this.$sessionSet('baseBet-data', this.baseBet)
									this.timeOutDatesBet = setTimeout(() => {
										this.onGetCurrentDates()
									}, (d.secondsRemaining === 0 ? 1 : d.secondsRemaining) * 1000)
								})
								.catch(() => {
									// on cancel
									this.$router.back()
								});
						} else {
							this.timeOutDatesBet = setTimeout(() => {
								this.onGetCurrentDates()
							}, (d.secondsRemaining === 0 ? 1 : d.secondsRemaining) * 1000)
						}
					})
					.catch(error => {
						this.procError(error)
					})
			},

			onBet() {
				for (let ins in this.baseBet.betContent){
					if (this.baseBet.betContent[ins].singMoney){
						delete this.baseBet.betContent[ins].singMoney
					}
					if (!this.baseBet.betContent[ins].money){
						this.$error(this.$t('lottery.money_t'))
						return
					}
				}

				let finalBetData = JSON.parse(JSON.stringify(this.baseBet)) // 赋值出来才不会影响介面显示

				// 送出前个别处理
				const specialHandleType = ['任选二组选', '任选三组三', '任选三组六']
				for (let ins in finalBetData.betContent){
					if (specialHandleType.indexOf(finalBetData.betContent[ins].playType)>-1){
						// special: 字串替换
						const prev = this.$sessionGet('special-baseBet-data').join()
						let lastString = finalBetData.betContent[ins].betContent.substr(finalBetData.betContent[ins].betContent.indexOf('|'))
						finalBetData.betContent[ins].betContent = prev + lastString
					}
				}

				this.showProgress()
				this.isDisabled = true
				this.$post('/api/Lottery/Bet', finalBetData)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.showProgress(false)
						this.$success(data.data)
						const type = sessionStorage.getItem("rules_code")
						
						setTimeout(() => {
							this.isDisabled = false
							if (type === 'SSC') this.redirectRouter('/app/ssc')
							else if (type === 'VNSouth') this.redirectRouter('/app/vnsouth')
							else if (type === 'Mark6') this.redirectRouter('/app/mark6')
							else this.redirectRouter('/app/pk10')
						}, 1000);
					})
					.catch(error => {
						this.isDisabled = false
						this.showProgress(false)
						this.procError(error)
					})
			},

			getPayText(v) {
				let items = this.$sessionGet('bet-items')
				if (!items) return
				let e = items.filter(e => e.playType === v.playType)

				return e[0] ? this.transPlayName(
					`${v.playType} ${v.betContent}`,
					e[0].playTypeName
				) : ''
			},

			getBetText(d) {
				let items = this.$sessionGet('bet-items')
				if (!items) return
				let e = items.filter(e => e.playType === d.playType)
				let bets = e[0] && e[0].lotteryBetContent
				const curData = bets.filter(e => e.betContent === d.betContent);
				if (!curData.length) {
					return this.getCurZodiac(d.playType, d.betContent)
				}
				return curData[0].betContentName
			},

			onChangeMoney(e) {
				if (!this.baseBet) return
				this.money = e
				if (this.isMake && this.activeTab === 'allBet') {
					this.baseBet.betContent[0].money = this.betMoney
				} else if (this.current_lottery === 'niuniu') {
					this.baseBet.betContent.forEach((b) => {
						if (b.playType === 'niuniuDouble') {
							b.singMoney = e
							b.money = e * 5
						} else {
							b.money = e
						}
					})
				} else {
					this.baseBet.betContent.forEach((b) => {
						b.money = e
						b.singMoney = e
					})
				}
				
				this.$sessionSet('baseBet-data', this.baseBet)
			},

			onChangeBetMoney(e, code, betContent) {
				this.baseBet.betContent.forEach((b) => {
					if (b.playType === code) {
						if (code == 'niuniuDouble' && betContent === b.betContent){
							 b.money = e * 5
						}
					}
					
					this.$sessionSet('baseBet-data', this.baseBet)
				})
			},

			getArry(a) {
				if (a) return a.split(",")
				else return []
			},

			$$t_lottery(v) {
				return this.$t('lottery.' + v)
			},

			$$t(v, p) {
				return this.$t('pK10Bet.' + v, p)
			},

			getCurZodiac(curPlayType, content) {
				if (
					[
						"ComboZodiac",
						"RowZodiac2",
						"RowZodiac3",
						"RowZodiac4",
						"RowZodiac5",
					].includes(curPlayType)
				) {
					const list = content.split(",");

					return list
						.map((item) =>
							this.zodiacList.find((t) => t.zodiac === item)
								? this.zodiacList.find((t) => t.zodiac === item)
									.zodiacName
								: item
						)
						.join(",");
				}

				if (
					["Rowtail2", "Rowtail3", "Rowtail4", "Rowtail5"].includes(
						curPlayType
					)
				) {
					const list = content.split(",");
					return list
						.map((item) => {
							switch (item) {
								case "0Tail":
									return this.$t("pk10._529");
								case "1Tail":
									return this.$t("pk10._530");
								case "2Tail":
									return this.$t("pk10._531");
								case "3Tail":
									return this.$t("pk10._532");
								case "4Tail":
									return this.$t("pk10._533");
								case "5Tail":
									return this.$t("pk10._534");
								case "6Tail":
									return this.$t("pk10._535");
								case "7Tail":
									return this.$t("pk10._536");
								case "8Tail":
									return this.$t("pk10._537");
								case "9Tail":
									return this.$t("pk10._538");
								default:
									return item;
							}
						})
						.join(",");
				}
				return content;
			},

			transPlayName(playName, originName) {
				const type = playName.split(" ")[0];
				const name = [
					"ExtraNo",
					"ExtraNoColor",
					"SideColor",
					"SideSideColor",
					"SpecialZodiac",
					"ComboZodiac",
					"5Elements",
					"PickBallNo",
					"OneZodiac",
					"ColorBalls",
					"Win2/3",
					"Win2",
					"Win3",
					"Win4",
					"ExtraBallZodiac",
					"ZodiacNo",
					"ExtraBallTail",
				].includes(type)
					? type
					: playName;
				switch (name) {
					case "ExtraNo2Sides big":
					case "ExtraNo2Sides small":
						return this.$t("pk10._543");
					case "ExtraNo2Sides odd":
					case "ExtraNo2Sides even":
						return this.$t("pk10._544");
					case "ExtraNo2Sides SumBig":
					case "ExtraNo2Sides SumSmall":
						return this.$t("pk10._545");
					case "ExtraNo2Sides SumOdd":
					case "ExtraNo2Sides SumEven":
						return this.$t("pk10._546");
					case "ExtraNo2Sides SkyZodiac":
					case "ExtraNo2Sides GroundZodiac":
						return this.$t("pk10._547");
					case "ExtraNo2Sides FirstZodiac":
					case "ExtraNo2Sides LastZodiac":
						return this.$t("pk10._548");
					case "ExtraNo2Sides PoultryZodiac":
					case "ExtraNo2Sides BeastZodiac":
						return this.$t("pk10._549");
					case "ExtraNo2Sides ExtraTailBig":
					case "ExtraNo2Sides ExtraTailSmall":
						return this.$t("pk10._550");
					case "ExtraNo2Sides bigOdd":
					case "ExtraNo2Sides smallOdd":
					case "ExtraNo2Sides bigEven":
					case "ExtraNo2Sides smallEven":
						return this.$t("pk10._551");
					case "ExtraNo":
						return this.$t("pk10._552");
					case "ExtraNoColor":
						return this.$t("pk10._553");
					case "SideColor":
						return this.$t("pk10._554");
					case "SideSideColor":
						return this.$t("pk10._555");
					case "SpecialZodiac":
						return this.$t("pk10._556");
					case "HeadTail 0Head":
					case "HeadTail 1Head":
					case "HeadTail 2Head":
					case "HeadTail 3Head":
					case "HeadTail 4Head":
						return this.$t("pk10._557");
					case "HeadTail 0Tail":
					case "HeadTail 1Tail":
					case "HeadTail 2Tail":
					case "HeadTail 3Tail":
					case "HeadTail 4Tail":
					case "HeadTail 5Tail":
					case "HeadTail 6Tail":
					case "HeadTail 7Tail":
					case "HeadTail 8Tail":
					case "HeadTail 9Tail":
						return this.$t("pk10._558");
					case "ComboZodiac":
						return this.$t("pk10._559");
					case "5Elements":
						return this.$t("pk10._560");
					case "PickBallNo":
						return this.$t("pk10._561");
					case "BallNo1 big":
					case "BallNo1 small":
						return this.$t("pk10._562");
					case "BallNo1 odd":
					case "BallNo1 even":
						return this.$t("pk10._563");
					case "BallNo1 SumBig":
					case "BallNo1 SumSmall":
						return this.$t("pk10._564");
					case "BallNo1 SumOdd":
					case "BallNo1 SumEven":
						return this.$t("pk10._565");
					case "BallNo1 TailBig":
					case "BallNo1 TailSmall":
						return this.$t("pk10._566");
					case "BallNo1 Red":
					case "BallNo1 Blue":
					case "BallNo1 Green":
						return this.$t("pk10._567");
					case "BallNo2 big":
					case "BallNo2 small":
						return this.$t("pk10._568");
					case "BallNo2 odd":
					case "BallNo2 even":
						return this.$t("pk10._569");
					case "BallNo2 SumBig":
					case "BallNo2 SumSmall":
						return this.$t("pk10._570");
					case "BallNo2 SumOdd":
					case "BallNo2 SumEven":
						return this.$t("pk10._571");
					case "BallNo2 TailBig":
					case "BallNo2 TailSmall":
						return this.$t("pk10._572");
					case "BallNo2 Red":
					case "BallNo2 Blue":
					case "BallNo2 Green":
						return this.$t("pk10._573");
					case "BallNo3 big":
					case "BallNo3 small":
						return this.$t("pk10._574");
					case "BallNo3 odd":
					case "BallNo3 even":
						return this.$t("pk10._575");
					case "BallNo3 SumBig":
					case "BallNo3 SumSmall":
						return this.$t("pk10._576");
					case "BallNo3 SumOdd":
					case "BallNo3 SumEven":
						return this.$t("pk10._577");
					case "BallNo3 TailBig":
					case "BallNo3 TailSmall":
						return this.$t("pk10._578");
					case "BallNo3 Red":
					case "BallNo3 Blue":
					case "BallNo3 Green":
						return this.$t("pk10._579");
					case "BallNo4 big":
					case "BallNo4 small":
						return this.$t("pk10._580");
					case "BallNo4 odd":
					case "BallNo4 even":
						return this.$t("pk10._581");
					case "BallNo4 SumBig":
					case "BallNo4 SumSmall":
						return this.$t("pk10._582");
					case "BallNo4 SumOdd":
					case "BallNo4 SumEven":
						return this.$t("pk10._583");
					case "BallNo4 TailBig":
					case "BallNo4 TailSmall":
						return this.$t("pk10._584");
					case "BallNo4 Red":
					case "BallNo4 Blue":
					case "BallNo4 Green":
						return this.$t("pk10._585");
					case "BallNo5 big":
					case "BallNo5 small":
						return this.$t("pk10._586");
					case "BallNo5 odd":
					case "BallNo5 even":
						return this.$t("pk10._587");
					case "BallNo5 SumBig":
					case "BallNo5 SumSmall":
						return this.$t("pk10._588");
					case "BallNo5 SumOdd":
					case "BallNo5 SumEven":
						return this.$t("pk10._589");
					case "BallNo5 TailBig":
					case "BallNo5 TailSmall":
						return this.$t("pk10._590");
					case "BallNo5 Red":
					case "BallNo5 Blue":
					case "BallNo5 Green":
						return this.$t("pk10._591");
					case "BallNo6 big":
					case "BallNo6 small":
						return this.$t("pk10._592");
					case "BallNo6 odd":
					case "BallNo6 even":
						return this.$t("pk10._593");
					case "BallNo6 SumBig":
					case "BallNo6 SumSmall":
						return this.$t("pk10._594");
					case "BallNo6 SumOdd":
					case "BallNo6 SumEven":
						return this.$t("pk10._595");
					case "BallNo6 TailBig":
					case "BallNo6 TailSmall":
						return this.$t("pk10._596");
					case "BallNo6 Red":
					case "BallNo6 Blue":
					case "BallNo6 Green":
						return this.$t("pk10._597");
					case "OneZodiac":
						return this.$t("pk10._598");
					case "ColorBalls":
						return this.$t("pk10._599");
					case "Win2/3":
						return this.$t("pk10._600");
					case "Win3":
						return this.$t("pk10._601");
					case "Win2":
						return this.$t("pk10._602");
					case "Win4":
						return this.$t("pk10._603");
					case "ExtraBallZodiac":
						return this.$t("pk10._604");
					case "ZodiacNo":
						return this.$t("pk10._605");
					case "ExtraBallTail":
						return this.$t("pk10._606");
					case "TatalSum TotalBig":
					case "TatalSum TotalSmall":
						return this.$t("pk10._607");
					case "TatalSum TotalOdd":
					case "TatalSum TotalEven":
						return this.$t("pk10._608");
					default:
						return originName;
				}
			},
		},

		destroyed() {
			clearTimeout(this.timeOutDatesBet);
			this.timeOutDatesBet = null;
		},

		beforeRouteLeave(to, form, next) {
			clearTimeout(this.timeOutDatesBet)
			this.timeOutDatesBet = null;
			this.$store.commit("setPageTitle", null);
			sessionStorage.removeItem('baseBet-data')
			sessionStorage.removeItem('special-baseBet-data')
			sessionStorage.removeItem('bet-items')
			sessionStorage.removeItem('isMake')
			sessionStorage.removeItem('activeTab-data')
			sessionStorage.removeItem('betNumber')
			// sessionStorage.removeItem('current_lottery')
			next()
		}
	}
</script>

<style lang="less" scoped>
	#pK10Bet {
		.warps {
			position: absolute;
			top: 38px;
			left: 0;
			right: 0;
			bottom: 95px;
		}

		.van-hairline--bottom {
			border-bottom: 1px solid #eee;
		}

		.money_bet {
			border: solid 1px #d8d8d8;
			padding: 4px !important;
			border-radius: 5px;
			font-size: 14px;
		}

		.quick_bet {
			width: 60px;
			border: solid 1px #d8d8d8;
			padding: 4px !important;
			border-radius: 5px;
			font-size: 14px;
		}

		.footer {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: white;
			box-shadow: 0 0 4px rgb(0 0 0 / 10%);

			.block_number {
				width: 42px;
				height: 34px;
				background-image: url("/images/lottery/money.png");
				background-size: 100% 100%;
				line-height: 34px;
				color: rgb(83, 93, 118);
			}
		}
	}
</style>
