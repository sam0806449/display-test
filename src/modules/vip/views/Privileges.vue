<template>
    <div id="privileges">
        <div class="view-background">
            <div class="view-background-flex">
                <div class="view-background-flex-top"></div>
                <div class="view-background-flex-bottom"></div>
            </div>
        </div>

        <scroller>
            <div class="warp">
                <div class="memberInfo px-4 pt-3 text-left text-black">
                    <div class="memberInfo-warp">
                        <div>
                            <van-image
                                    round
                                    lazy-load
                                    width="60"
                                    height="60"
                                    :src="getAvatar(Number(memberData && memberData.avatar)) || '/images/service/avatar.png'"
                            />
                        </div>
                        <div class="info">
                            <div class="body-2 ml-3 mr-1">ID：{{memberData && memberData.memberAccount}}</div>
                            <van-image
                                    lazy-load
                                    width="40"
                                    height="14"
                                    src="/images/member/vipLv.png"
                                    class="mr-3"
                            >
                                <div class="vip-lv_position text-white">{{memberData && memberData.vipLevel}}</div>
                            </van-image>
                        </div>

                        <div class="vip_b">
                            <van-image
                                    lazy-load
                                    width="70"
                                    height="90"
                                    :src="`/images/vip/level/${memberData && memberData.vipLevel}.png`"
                            />
                        </div>

                    </div>
                    <div class="vip-progress mt-2">
                        <van-image
                                lazy-load
                                width="40"
                                height="14"
                                src="/images/member/vipLv.png"
                                class="mr-3"
                        >
                            <div class="vip-lv_position text-white">{{memberData && memberData.vipLevel}}</div>
                        </van-image>

                        <van-progress :percentage="getPercentage" track-color="rgb(175, 211, 255)" stroke-width="10"/>

                        <van-image
                                lazy-load
                                width="40"
                                height="14"
                                src="/images/member/vipLv-1.png"
                                class="ml-3"
                        >
                            <div class="vip-lv_position text-white">{{Number(memberData && memberData.vipLevel) + 1}}
                            </div>
                        </van-image>
                    </div>

                    <div class="mt-4 pl-4 text-left desc">
                        <div class="caption">{{$$t('depositTotal')}}: <span
                                class="text-black body-2">{{item && item.depositTotal}}{{currencyDenomination}}</span>（{{item
                            && item.depositTotal}}{{currencyDenomination}}/{{promotion && promotion.depositRequire}}{{currencyDenomination}})
                        </div>
                        <div class="caption">{{$$t('dmlMoneyTotal')}}: <span
                                class="text-black body-2">{{item && item.dmlMoneyTotal}}{{currencyDenomination}}</span>（{{item
                            && item.dmlMoneyTotal}}{{currencyDenomination}}/{{promotion && promotion.dmlRequire}}{{currencyDenomination}})
                        </div>
                    </div>

                    <div v-if="skgCodeKey !== 'SGMP'" class="vip_info_btn mt-6 mx-auto" @click="redirectRouter('privileges/details')">
                        <div class="text-center white-text">{{$t('privilegesDetails.title')}}</div>
                    </div>

                    <div class="currGrade mt-6">
                        <swiper class="swiper" :options="swiperOption">
                            <swiper-slide v-for="(item, index) in vipLevel && vipLevel.length" :key="index">
                                <div class="vipL" :class="{active: swiperLevel === item}"
                                     @click="changeSwiperLevel(item)">vip{{item}}
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>


                    <van-swipe :loop="false" :width="300" :height="183" class="mt-4" @change="onChange"
                               ref="swipeLevel">
                        <van-swipe-item v-for="(v, index) in vipLevel" :key="index">
                            <van-image src="/images/vip/vip_info.png" width="300" height="138"
                                       class="pr-2 pl-3 vip_img">
                                <div class="vip_level">{{v.level}}</div>
                                <div class="vip_right">
                                    <van-image
                                            lazy-load
                                            width="44"
                                            height="62"
                                            :src="`/images/vip/level/${v.level}.png`"
                                    />
                                </div>
                                <div class="vip_info white-text flex">
                                    <div>
                                        <div class="body-1">{{v.depositRequire}}{{currencyDenomination}}</div>
                                        <div class="caption">{{$$t('depositRequire')}}</div>
                                    </div>
                                    <div>
                                        <div class="body-1">{{v.dmlRequire}}{{currencyDenomination}}</div>
                                        <div class="caption">{{$$t('dmlRequire')}}</div>
                                    </div>
                                </div>
                            </van-image>
                        </van-swipe-item>
                        <template #indicator>
                            <div class="custom-indicator">{{ current + 1 }}/{{vipLevel && vipLevel.length}}</div>
                        </template>
                    </van-swipe>
                </div>

                <div class="exclusive mt-3 text-left px-4 pt-3 pb-5">
                    <div class="title title-before pl-3">VIP{{vipInfo && vipInfo.level}}{{$$t('exclusive')}}</div>
                    <van-row type="flex" gutter="10" class="px-2">
                        <template v-for="(e, index) in exclusivesList">
                            <van-col span="12" class="mt-5" :key="index">
                                <div class="item">
                                    <div class="item_icon">
                                        <van-image :src="`/images/vip/${e.img}.png`" width="32" height="32"/>
                                    </div>
                                    <div class="item_text ml-1">
                                        <div class="title">{{vipInfo && vipInfo[e.code]}}{{ e.noUseUnit ? '' : currencyDenomination}}</div>
										<div class="desc caption" v-if="e.code === 'withdrawalCycle'">{{vipInfo && vipInfo.withdrawalCycleDesc}}</div>
                                        <div class="desc caption" v-else>{{$$t(e.code)}}</div>
                                    </div>
                                </div>
                            </van-col>
                        </template>
                    </van-row>
                </div>


                <div class="promotion mt-3 text-center px-4 pt-3 pb-5" v-if="skgCode === skgGameCode && siteConfig.codeKey !== 'SGDP'">
                    <div class="title text-left title-before pl-3">{{$$t('rebateInfo')}}</div>
                    <van-row type="flex" gutter="10" align="center" class="mt-1">
                        <template v-for="(p, index) in promotions">
                            <van-col span="8" :key="index" class="pt-2">
                                <div class="number">{{vipInfo && vipInfo[p.code]}}%</div>
                                <div class="text">{{$$t(p.text)}}</div>
                            </van-col>
                        </template>

                        <template v-for="v in vipInfo && vipInfo.vipLevelRebateRates">
                            <van-col span="8" :key="v.platformCode" class="pt-2">
                                <div class="number">{{v.rate}}%</div>
                                <div class="text">{{v.platformName}}</div>
                            </van-col>
                        </template>
                    </van-row>
                    <div class="details mt-5" @click="redirectRouter('privileges/details')">
                        {{$$t('details')}}
                        <van-icon name="/images/common/details.png" size="10"/>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
	name: 'Privileges',

	components: {
		Swiper,
		SwiperSlide
	},

	data: () => ({
		swiperOption: {
			slidesPerView: 5,
			spaceBetween: 40,
			// centeredSlides: true,
		},
		current: 0,
		item: {},
		vipLevel: [],
		vipInfo: null,
		swiperLevel: 1,
		promotions: [
			{text: 'firstReferrerRebateRatio', code: 'firstReferrerRebateRatio'},
			{text: 'secondReferrerRebateRatio', code: 'secondReferrerRebateRatio'},
			{text: 'thirdReferrerRebateRatio', code: 'thirdReferrerRebateRatio'},
		],
		promotion: null
	}),

	computed: {
		getPercentage() {
			let b = 0
			let c = null
			if (Number(this.memberData && this.memberData.currentTotalDml) === 0 || Number(this.memberData && this.memberData.dmlRequire) === 0) return 0
			let v = Number(this.memberData && this.memberData.currentTotalDml) / Number(this.memberData && this.memberData.dmlRequire)
			let p = Number(this.memberData && this.memberData.currentTotalDeposit) / Number(this.memberData && this.memberData.depositRequire)
			if (v > 1) v = 1
			if (p > 1) p = 1
			b = (p * 0.5 + v * 0.5) * 100
			if (b <= 0) b = 0
			c = b.toString().split(".")[1]
			if (c && c.length > 1) b = b.toFixed(2).toString()
			return b
		},
        exclusivesList() {
            const list = [
                {img: 'tk', title: '5', code: 'withdrawalTimesLimit', noUseUnit: true,},
                {img: 'ed', title: '200.000', code: 'dayWithdrawalMax'},
                {img: 'sj', title: '8', code: 'upLevelBonus'},
                {img: 'hb', title: '10', code: 'monthlyBonus'},
                {img: 'sr', title: '1', code: 'birthdayBonus'},
                {img: 'rq', title: '1', code: 'weeklyBonus'},
            ];

            if (this.skgCode === this.skyLotteryCode) {
                list.splice(0, 1);
            }

            return list
        }
	},


	activated() {
		this.onGetVipLevel()
	},

	methods: {
		onGetVipLevel() {
			this.$post(`/api/VipLevel/GetVipLevel`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let v = Number(this.$sessionGet('vipLevel_data')) || (this.memberInfo && this.memberInfo.vipLevel)
					let d = data.data
					this.item = d
					this.vipLevel = d.vipLevelRebateRates
					if (d.vipLevelRebateRates.length > 0) this.vipInfo = d.vipLevelRebateRates.filter(e => e.level === v)[0]
					this.promotion = d.vipLevelRebateRates.filter(e => e.level === Number(v + 1))[0]
				})
				.catch(error => {
					this.procError(error)
				})
		},

		changeSwiperLevel(item) {
			this.swiperLevel = item
			this.$refs.swipeLevel.swipeTo(Number(item) - 1)
		},

		onChange(index) {
			this.current = index;
			this.swiperLevel = index + 1
			this.vipInfo = this.vipLevel[index]
		},

		$$t(v) {
			return this.$t('privileges.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#privileges {
    height: 100%;
    background-color: rgb(248, 250, 250);

    .view-background {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('/images/banner/privileges_bg.png') no-repeat top right;
        background-size: 100% 300px;

        .view-background-flex {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;

            .view-background-flex-top {
                flex: 1;
                background: url('/images/banner/privileges_bg.png') no-repeat top right;
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
        background-color: rgb(248, 250, 250);

        .memberInfo {
            background: url('/images/banner/privileges_bg.png') white no-repeat top right;
            background-size: 100% 223px;
        }

        .memberInfo-warp {
            display: flex;
            align-items: center;
            height: 90px;

            .info {
                display: flex;
                align-items: center;
            }

            .vip_b {
                position: absolute;
                top: 12px;
                right: 30px;

                /deep/ .van-image {
                    position: relative;

                    .vip_b_level {
                        position: absolute;
                        top: 48px;
                        right: 24px;
                        color: rgb(115, 63, 35);
                        font-size: 18px;
                    }
                }
            }
        }

        .vip-progress {
            display: flex;
            justify-content: center;
            align-items: center;

            .van-progress {
                width: 220px;
            }
        }

        .vip_img {
            position: relative;

            /deep/ .vip_level {
                position: absolute;
                top: 20px;
                font-size: 26px;
                color: white;
                left: 91px;
            }

            /deep/ .vip_right {
                position: absolute;
                top: -5px;
                font-size: 16px;
                right: 41px;
            }

            /deep/ .vip_info {
                position: absolute;
                bottom: 22px;
                justify-content: space-around;
                left: 0;
                right: 0;
                text-align: center;
            }
        }

        .desc {
            color: rgb(130, 144, 185);
        }

        .vip_info_btn {
            width: 160px;
            height: 36px;
            line-height: 36px;
            background: url('/images/vip/btn.png') no-repeat top right;
            background-size: 100% 36px;
        }

        .currGrade {
            position: relative;

            /deep/ .swiper-wrapper {
                align-items: center;
            }

            .vipL {
                width: 34px;
                height: 16px;
                background-color: rgba(211, 213, 224);
                border-radius: 18px;
                z-index: 1;
                color: white;
                font-size: 12px;
                text-align: center;
                display: inline-block;
                position: relative;
            }

            .vipL::before {
                content: '';
                position: absolute;
                border-bottom: 2px solid #8590a6;
                min-width: 50px;
                height: 1px;
                top: 6px;
                left: 34px;
            }

            .active {
                width: 46px;
                height: 22px;
                line-height: 22px;
                background-image: url(/images/vip/vip_bg.png);
                background-position: 0 0;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                text-align: center;
                display: inline-block;
            }

            .active::before {
                content: '';
                position: absolute;
                border-bottom: 2px solid #8590a6;
                min-width: 32px;
                height: 1px;
                top: 9px;
                left: 45px;
            }
        }

        .custom-indicator {
            position: absolute;
            right: 30px;
            bottom: 12px;
            padding: 2px 5px;
            font-size: 12px;
            color: rgb(161, 170, 198);
        }

        .exclusive {
            background-color: white;

            .title {
                font-size: 16px;
                font-weight: 600;
            }

            .item {
                display: flex;
                align-items: center;

                .item_text {
                    > .desc {
                        width: 90px;
                    }
                }
            }
        }

        .promotion {
            background-color: white;

            .title {
                font-size: 16px;
                font-weight: 600;
            }

            .van-row {
                align-items: center;
            }

            .van-col {
                margin-top: 2px;
                height: 60px;

                .number {
                    color: rgb(82, 149, 253);
                    font-size: 16px;
                }

                span {
                    font-size: 14px;
                }
            }

            .details {
                font-size: 14px;
                color: rgb(109, 127, 143);
            }
        }
    }
}
</style>
