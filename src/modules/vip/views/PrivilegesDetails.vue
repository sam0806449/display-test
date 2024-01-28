<template>
    <div id="privilegesDetails">
        <van-tabs :border="false" v-model="type" title-active-color="rgb(89, 126, 247)" color="rgb(77, 140, 252)"
                  class="mt-3" v-if="skgCode === skgGameCode && siteConfig.codeKey !== 'SGDP'">
            <van-tab :title="$$t('tab_1')"></van-tab>
            <van-tab :title="$$t('tab_2')"></van-tab>
        </van-tabs>

        <div class="warp" :style="warpStyle">
            <div class="warp-center">
                <scroller>
                    <div class="title text-center flex align-items-center justify-content-center">
                        <van-image src="/images/vip/details/vip.png" width="20"/>
                        <span class="subtitle-1 ml-1">{{type===0 ? $$t('tab_1') : $$t('tab_2')}}</span>
                    </div>


                    <div class="scroll-wrapper" ref="scroll" v-show="type===0">
                        <div class="scroll-content">
                            <table class="table caption">
                                <tr class="caption">
                                    <template v-for="(item, index) in ratesTh">
                                        <th :key="index">{{item.platformName}}</th>
                                    </template>
                                </tr>

                                <tr v-for="(d, i) in tableData" :key="i">
                                    <template v-for="(item, index) in ratesTh">
                                        <td :key="index">{{d[item.platformCode]}}</td>
                                    </template>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <table class="table caption" v-show="type===1">
                        <tr class="caption">
                            <th>{{$$t('level')}}</th>
                            <th>{{$$t('dayWithdrawalNumMax')}}</th>
                            <th>{{$$t('dayWithdrawalMax')}}</th>
                        </tr>
                        <template v-for="(item, index) in items">
                            <tr :key="index">
                                <td>VIP{{item.level}}</td>
                                <td>{{item.withdrawalTimesLimit}}</td>
                                <td>{{currencySymbol}}{{item.dayWithdrawalMax}}{{currencyDenomination}}</td>
                            </tr>
                        </template>
                    </table>

                    <div class="px-4 py-3 background-white">
                        <div class="main-text text-left" @click="redirectRouter('/app/rebates/rules')" v-if="skgCode === skgGameCode && siteConfig.codeKey !== 'SGDP'">
                            {{$$t('details')}}
                        </div>
                        <div class="gift pt-4 pb-5 mt-4">
                            <div class="text_color">{{$$t('birthdayBonus')}}：<span
                                    class="main-text">{{birthdayBonus}}</span></div>
                            <div class="caption text-grey mt-2" v-if="memberInfo && memberInfo.birthday">
                                {{$$t('birthday_info')}}
                            </div>
                            <div class="info mt-2" v-else>
                                <div class="text-grey">{{$$t('set_info')}}</div>
                                <div class="btn main-text" @click="redirectRouter('/app/member/info')">{{$$t('set')}}
                                </div>
                            </div>
                        </div>


                        <div class="subtitle-5 main-text mt-6">{{$$t('rules')}}</div>
                        <van-divider/>
                        <div class="text-left">
                            <div class="subtitle-3 flex">
                                <div class="support-circle mr-3"><span class="support-num">1</span></div>
                                {{$$t('support_1_title')}}
                            </div>
                            <div class="pl-6 mt-1 text-grey">{{$$t('support_1_1')}}</div>
                        </div>

                        <div v-if="setItem.openRelegation">
                            <div class="text-left mt-6">
                                <div class="subtitle-3 flex">
                                    <div class="support-circle mr-3"><span class="support-num">2</span></div>
                                    {{$$t('support_2_title')}}
                                </div>

                                <div class="pl-6 mt-1 text-grey">
                                    {{$$t('support_2_1', {day: setItem.relegationPeriod})}}
                                </div>
                            </div>

                            <div class="text-left mt-6">
                                <div class="subtitle-3 flex">
                                    <div class="support-circle mr-3"><span class="support-num">3</span></div>
                                    {{$$t('support_3_title')}}
                                </div>
                                <div class="pl-6 mt-1 text-grey">
                                    {{$$t('support_3_1', {dayDesc:setItem.relegationPeriodDesc, day: setItem.relegationPeriod})}}
                                </div>
                            </div>
                        </div>

                        <div class="text-left mt-6">
                            <div class="subtitle-3 flex">
                                <div class="support-circle mr-3"><span class="support-num">4</span></div>
                                {{$$t('support_4_title')}}
                            </div>
                            <div class="pl-6 mt-1 text-grey">
                                {{$$t('support_4_1')}}
                            </div>
                        </div>

                        <div class="text-left mt-6">
                            <div class="subtitle-3 flex">
                                <div class="support-circle mr-3"><span class="support-num">5</span></div>
                                {{$$t('support_5_title')}}
                            </div>
                            <div class="pl-6 mt-1 text-grey">
                                {{$$t('support_5_1')}}
                            </div>
                        </div>

                        <div class="text-left mt-6">
                            <div class="subtitle-3 flex">
                                <div class="support-circle mr-3"><span class="support-num">6</span></div>
                                {{$$t('support_6_title')}}
                            </div>
                            <div class="pl-6 mt-1 text-grey">
                                {{$$t('support_6_1',{siteTitle: siteConfig && siteConfig.siteTitle})}}
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
        </div>

    </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)

export default {
	name: 'PrivilegesDetails',

	data: () => ({
		type: 0,
		items: [],
		setItem: {},
		tableTh: [],
		tableData: [],
		ratesTh: [],
		birthdayBonus: 0,
		bs: null
	}),
	
	computed: {
		warpStyle() {
			if (this.skgCode === this.skgGameCode && this.siteConfig.codeKey !== 'SGDP') {
				return {
					top: '56px'
				}
			} else {
				return {
					top: '0'
				}
			}
		}
	},

	mounted() {
		this.init()
	},

	activated() {
		if (this.skgCode === this.skgUcsCode || this.siteConfig.codeKey === 'SGDP') {
            this.type = 1;
        }
		this.onGetVipLevel()
		this.onGetVipSetting()
	},

	beforeDestroy() {
		this.bs.destroy()
	},

	methods: {
		onGetVipLevel() {
			this.$post(`/api/VipLevel/GetVipLevel`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.items = d.vipLevelRebateRates
					let b = d.vipLevelRebateRates.filter(e => e.level === (Number(this.$sessionGet('vipLevel_data')) || (this.memberInfo && this.memberInfo.vipLevel)))

					this.birthdayBonus = b && b[0].birthdayBonus

					let c = d.vipLevelRebateRates[0].vipLevelRebateRates.map(e => {
						return {
							platformCode: e.platformCode,
							platformName: e.platformName
						}
					})
					c.splice(0, 0, {platformCode: 'lv', platformName: this.$$t('level')});
					this.ratesTh = c

                    this.tableData = []
					d.vipLevelRebateRates.forEach(e => {
						let v = {}
						e.vipLevelRebateRates.forEach(r => {
							v.lv = 'VIP' + e.level
							v[r.platformCode] = r.rate + '%'
						})
						this.tableData.push(v)
					})

				})
				.catch(error => {
					this.procError(error)
				})
		},

		onGetVipSetting() {
			this.$post(`/api/VipLevel/GetVipSetting`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.setItem = data.data
				})
				.catch(error => {
					this.procError(error)
				})
		},

		init() {
			this.bs = new BScroll(this.$refs.scroll, {
				observeDOM: true,
				scrollX: true,
				scrollY: false,
				eventPassthrough: 'vertical'
			})
		},

		$$t(v, p) {
			return this.$t('privilegesDetails.' + v, p)
		}
	}
}
</script>

<style lang="less" scoped>
#privilegesDetails {
    height: 100%;

    .warp {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;

        .warp-center {
            height: 100%;

            .scroll-wrapper {
                white-space: nowrap;
                overflow: hidden;

                .scroll-content {
                    display: inline-block;
                }

            }
        }

        .title {
            height: 47px;
            background-image: linear-gradient(to right, rgb(216, 235, 255), rgb(175, 211, 255));
        }

        .text_color {
            color: rgb(102, 102, 102);
        }

        .table {
            color: rgb(153, 153, 153);
            background-color: white;
            table-layout: fixed !important;
            width: 100% !important;
            border-collapse: collapse;
            border: none;
            font-size: 12px;
            background-color: white;

            tr {
                th {
                    width: 100px;
                }
            }

            th {
                padding-top: 4px;
                padding-bottom: 4px;
                height: 40px;
            }

            td {
                height: 40px;
                padding: 14px 12px;
            }

            td, th {
                white-space: nowrap;
                border: solid rgb(238, 238, 238) 1px;
                text-align: center;
                white-space: pre-line;
                word-break: break-all !important;
                word-wrap: break-word !important;
                display: table-cell;
                vertical-align: middle !important;
                white-space: normal !important;
                vertical-align: text-top;
                padding: 2px 2px 0 2px;
                display: table-cell;
            }
        }

        .gift {
            background-color: rgb(249, 252, 254);

            .info {
                height: 26px;
                display: flex;
                justify-content: center;
                justify-items: center;

                .btn {
                    border-radius: 12px;
                    border: 1px solid rgb(89, 126, 247);
                    padding: 4px 12px;
                }

                .text-grey {
                    line-height: 26px;
                    padding-right: 12px;
                }
            }

        }

        .support-num {
            font-size: 12px;
            height: 16px;
            line-height: 16px;
            display: block;
            color: white;
            text-align: center;
            background-color: rgb(89, 126, 247);
            border-radius: 25px;
        }

        .support-circle {
            width: 16px;
            height: 16px;
        }
    }
}
</style>
