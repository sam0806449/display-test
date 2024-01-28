<!-- 游戏注单详情 -->
<template>
    <div id="details" class="text-left" v-if="item">
        <scroller>
            <div class="details-t">
                <van-image :src="getImg" width="40" lazy-load class="ml-4 mr-3">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20"/>
                    </template>
                </van-image>
                <div class="flex flex-d-column">
                    <p>{{item && item.gameName}}</p>
                    <div class="caption text-grey">{{datesMaker(item && item.gameNo)}}</div>
                </div>
            </div>

            <div class="details-content">
                <div v-if="sportDetail">
                    <div v-if="sportDetail && sportDetail.sportDetailItem.length > 1">
                        <van-collapse v-model="activeNames">
                            <van-collapse-item :title="$$t('betTeam')" name="1">
                                <template #value>
                                    {{getBetTeamText()}}
                                </template>

                                <div v-for="(s, index) in sportDetail && sportDetail.sportDetailItem" :key="index">
                                    <div>{{$$t('league')}}：{{s.league}}</div>
                                    <div>{{s.homeTeamName}} VS {{s.awayTeamName}}</div>
                                    <div>{{$$t('score')}}：{{s.homeScore}} : {{s.awayScore}}</div>
                                    <div>{{$$t('betTeam')}}：{{s.betTeam}}</div>
                                    <div>{{$$t('hk_odds')}}：{{s.odds}}</div>
                                    <van-divider class="my-3" v-if="sportDetail && sportDetail.sportDetailItem.length -1 > index"/>
                                </div>
                            </van-collapse-item>
                        </van-collapse>
                    </div>

                    <div v-else>
                        <van-cell :title="$$t('league')" :value="getLeague()"/>
                        <van-cell :title="$$t('score')">
                            <template #default>
                                <div class="text-center" v-html="getScore()"></div>
                            </template>
                        </van-cell>
                        <van-cell :title="$$t('type')" :value="getType()"/>
                        <van-cell :title="$$t('betTeam')" value-class="betTeam">
                            <template #default>
                                <div v-html="getBetTeam()"></div>
                            </template>
                        </van-cell>
                        <van-cell :title="$$t('hk_odds')" :value="getOdds()"/>
                        <van-cell :title="$$t('status')" :value="item.statusDesc"/>
                    </div>
                </div>

                <div v-else>
                    <van-cell :title="$$t('gameName')" :value="item && item.gameName"/>
                    <van-cell :title="$$t('platformName')" :value="item && item.platformName" :border="!!(item && item.playType)"/>
                    <van-cell :title="$t('betDetails.betContent')" :border="false" v-if="item && item.playType && item.platformCode !== 'pm'">
						<div v-if="['ffPK10', 'sfPK10', 'wfPK10', 'jsPK10', 'azxy10', 'xyft'].includes(item && item.gameCode)" class="text-left">
							{{item && item.playType}}
						</div>
						<div v-else>
							{{item && item.playType}}
						</div>
                    </van-cell>
                    <van-divider class="ma-0 px-4"/>
                </div>

                <van-cell :title="$$t('orderId')" :value="item && item.orderId" value-class="van-ellipsis">
                    <van-icon name="/images/gamebet/copy.png" class="ml-2" size="20" slot="right-icon"
                              @click="copyBtnClick(item && item.orderId)"/>
                </van-cell>
                <van-cell :title="$$t('orderTime')" :value="item && item.orderTime"/>
                <van-cell :title="$$t('betMoneyY')"
                          :value="`${item && item.currencySymbol}${item && item.betMoneyY}${currencyDenomination}`"/>
                <van-cell :title="$$t('realBetMoneyY')"
                          :value="`${item && item.currencySymbol}${item && item.realBetMoneyY}${currencyDenomination}`"/>
                <!-- 开奖结果 -->
                <van-cell :title="$t('lottery.result_text')" v-if="item && item.gameResult" :class="item.tableCode">
                <div slot="default" class="text-center" style="display: flex;justify-content: end;">
                    <div class="flex" v-if="item.tableCode === 'Lucky3'">
                        <div class="betContent white-text " v-if="isNumber(item.gameResult)">{{item.gameResult}}</div>
                        <van-image :src="`/images/lottery/${item.gameResult}.png`" width="28" height="24" v-else />
                    </div>

                    <div class="flex align-items-center" v-else-if="item.tableCode === 'Rps'">
                        <template v-for="(img, index) in getRps(item.gameResult)">
                            <van-image :src="`/images/lottery/rps/${img}.png`" width="24" height="24" class="mr-1"
                                :key="index" />
                        </template>
                    </div>

                    <div class="flex align-items-center" v-else-if="item.tableCode === 'SeDie'">
                        <template v-for="(r, index) in item && item.gameResult && item.gameResult.split(',')">
                            <van-image :src="`/images/lottery/guess/${r}.png`" width="24" height="24" :key="index"
                                class="mr-2" />
                        </template>
                    </div>

                    <div class="flex align-items-center" v-else-if="item.tableCode === 'SicBo' || item.tableCode === 'K3'">
                        <template v-for="(r, index) in getArry(item && item.gameResult)">
                            <van-image :src="`/images/lottery/sicBo/${r}.png`" width="24" height="24" :key="index"
                                class="mr-2" />
                        </template>
                    </div>

                    <div v-else-if="item.tableCode === 'PK10'" class="text-left" style="width: 75%;">
                        <template v-for="(r, i) in getArry(item && item.gameResult)">
                            <div :class="`b-pk10-${r}`" :key="i">{{r}}</div>
                        </template>
                    </div>

                    <div v-else-if="item.tableCode === 'SSC'" class="text-left flex" style="width: 75%;">
                        <template v-for="(r, i) in getArry(item && item.gameResult)">
                            <div class="ssc-num-box" :key="i">{{r}}</div>
                        </template>
                    </div>

                    <div v-else-if="item.tableCode === 'Yxx'" class="text-left flex" style="width: 75%;">
                        <template v-for="(r, index) in getArry(item && item.gameResult)">
                             <van-image :src="`/images/lottery/${transYxx(r)}.png`" width="28" height="24" :key="index"
                                class="mr-1" />
                        </template>
                    </div>

                    <div v-else-if="item.tableCode === 'VNSouth'" class="text-left flex" style="width: 100%;">
                        <div class="vnsouth-current-wrap">
                            <div
                                v-for="(
                                    item, resultIndex
                                ) in getVNSouthResult(item && item.gameResult)"
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

                    <div v-else-if="item.tableCode === 'Mark6'" class="flex align-items-center" style="width: 100%; justify-content: end;">
                        <div 
                            v-for="(num, i) in getArry(item && item.gameResult)"
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
                                <div style="color: #444; font-size: 12px;font-weight: bold; text-align: center;">{{ getCurZodiac(item.gameResultSx && item.gameResultSx.split(',')[i]) }}</div>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <div v-if="item.platformCode === 'SGLottery'">
                            <template v-for="(r, index) in getArry(item && item.gameResult)">
                                <van-image :src="`/images/lottery/${r}.png`" width="28" height="24" :key="index"
                                    class="mr-1" />    
                            </template>
                        </div>
                        <div v-else>{{item.gameResult}}</div>
                    </div>
                </div>
                </van-cell>

                <van-cell :title="$$t('winMoneyY')" value-class="red-text subtitle-3"
                          :value="`${item && item.currencySymbol}${item && item.winMoneyY}${currencyDenomination}`"/>
                <van-cell :title="$$t('returnMoneyY')"
                          :value="`${item && item.currencySymbol}${item && item.returnMoneyY}${currencyDenomination}`"/>
                <van-cell :title="$$t('profitMoneyY')"
                          :value="`${item && item.currencySymbol}${item && item.profitMoneyY}${currencyDenomination}`"/>
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'GameBetDetails',

	data() {
		return {
			item: null,
			sportDetail: null,
			activeNames: ['1'],
            zodiacList: [],
		}
	},

	computed: {
		getImg() {
			let item = this.item
			let platform = item.platformCode
			let gameImageName = item.gameImageName
			return this.siteConfig && this.siteConfig.imgPath + '/common/img/slots/' + platform + '/' + gameImageName
		},
	},

    activated() {
        this.getZodiacData();
		this.item = this.$sessionGet('game-item')
		this.sportDetail = this.item.sportDetail
	},

	methods: {
        transYxx(key){
            const map = {
                1: 'Deer',
                2: 'Gourd',
                3: 'Chicken',
                4: 'Fish',
                5: 'Crab',
                6: 'Shrimp'
            }
            return map[key]
        },
        isNumber(val) {
            val = Number(val)
            if (parseFloat(val).toString() == "NaN") {
                return false;
            } else {
                return true;
            }
        },
        getArry(a) {
            if (a) return a.split(",")
            else return []
        },
        getRpsBankerLists(e) {
            let c = e.betContent.split("_")
            let arr = []
            arr.push('Banker_' + c[0])
            arr.push('Player_' + c[1])
            if (e.playType === 'Rps_Banker_Player') return arr
            else return e.betContent.split(",")
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
		getLeague() {
			let v = this.sportDetail.sportDetailItem
			return v[0].league
		},

		getType() {
			let v = this.sportDetail.sportDetailItem
			return v[0].betType
		},

		getBetTeam() {
			let v = this.sportDetail.sportDetailItem
			return v[0].betTeam
		},

		getBetTeamText() {
			let v = this.sportDetail.sportDetailItem
			return `${v.length + this.$$t('type_d') + '1'},${this.$$t('hk_odds')}@${this.sportDetail.odds}`
		},

		getOdds() {
			let v = this.sportDetail.sportDetailItem
			return v[0].odds
		},

		getScore() {
			let v = this.sportDetail.sportDetailItem
			return `${v[0].homeTeamName} VS ${v[0].awayTeamName}<br/>${v[0].homeScore}:${v[0].awayScore}`
		},

		$$t(v) {
			return this.$t('gameBetDetails.' + v)
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

	beforeRouteLeave(to, form, next) {
		sessionStorage.removeItem('game-item')
		next()
	}

}
</script>

<style lang="less">
#details {
    background-color: #ffffff;
    height: 100%;

    .betTeam {
        flex: unset !important;
        width: 70%;
    }

    .details-t {
        height: 72px;
        font-size: 18px;
        color: #333333;
        display: flex;
        align-items: center;
        background-color: #f5f5f9;
        padding-bottom: 17px;
        box-sizing: content-box;
    }

    .details-content {
        border-radius: 20px 20px 0 0;
        margin-top: -17px;
        background-color: #fff;

        .van-cell {
            background-color: transparent;
            font-size: 14px;
            color: #333;
        }

        .van-cell__value {
            color: #666;
        }
    }

    .betContent {
        width: 0.74667rem;
        height: 0.74667rem;
        line-height: .74667rem;
        text-align: center;
        background-image: url(/images/lottery/list_number.png);
        background-size: 100%;
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
