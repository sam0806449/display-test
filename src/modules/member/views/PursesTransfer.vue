<template>
    <div id="pursesTransfer">
        <div class="warp-center">
            <scroller>
                <div class="warp py-6 text-left">
                    <div class="background-white">
                        <van-cell size="large" center border>
                            <template #title>
                                <div class="flex align-items-center">
                                    <span class="custom-title mr-1">{{$$t('amount')}}</span>
                                    <van-icon name="/images/member/purses/refresh.png" size="18"
                                              :class="{refresh: refreshIcon}"
                                              @click="refreshBalance"/>
                                </div>
                            </template>

                            <template #default>
                                <div @click="onTransformAll">{{$$t('recycle')}}</div>
                            </template>
                        </van-cell>

                        <van-row class="mt-5 purse-details" type="flex" justify="center">
                            <van-col span="12">
                                <div class="text-center">
                                    <div class="flex justify-content-center align-items-center">
                                        <van-image src="/images/member/purses/purse.png" width="16" height="14"/>
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
                                        <van-image src="/images/member/purses/purse.png" width="16" height="14"/>
                                        <div class="caption text-grey ml-1">{{$$t('gameWallet')}}</div>
                                    </div>
                                    <div class="subtitle-4 main-text mt-1">
                                       {{gameBalance>0 ? currencySymbol + gameBalance + currencyDenomination : '——'}}
                                    </div>
                                </div>
                            </van-col>
                        </van-row>

                        <div class="change mt-4 flex justify-content-center align-items-center">
                            <div class="flex align-items-center">
                                <div class="subtitle-1 mr-1">{{$$t('centralWallet')}}</div>
                                <van-icon name="arrow" color="lightslategray" size="14"/>
                            </div>

                            <van-image :src="`/images/member/purses/${transfer ? 'change_f' : 'change'}.png`" width="20"
                                       height="15"
                                       class="mx-11" @click="changeTransfer"/>

                            <div class="flex align-items-center" @click="showPicker=true">
                                <div class="subtitle-1 mr-1">{{platformName}}</div>
                                <van-icon name="arrow" color="lightslategray" size="14"/>
                            </div>
                        </div>
                        <van-divider class="ma-0 pa-0"/>
                        <div class="money py-2 px-4 background-white">
                            <div class="caption text-grey">{{$$t('walletDesc')}}</div>

                            <van-field
                                    v-model="money"
                                    type="digit"
                                    center
                                    clearable
                                    :placeholder="$$t('moneyDesc')"
                                    class="px-2 mb-1 mt-2"
                                    input-align="left"
                            >
                                <span slot="left-icon" class="body-1">{{currencySymbol}}</span>
                                <div slot="right-icon" v-if="currencyDenomination">{{currencyDenomination}}</div>

                                <template #button>
                                    <van-button size="small" @click="moneyAllClick">{{$$t('moneyAll')}}</van-button>
                                </template>
                            </van-field>
                            <div class="money_desc py-2 pl-3"
                                 v-if="(Number(money) > Number(memberData && memberData.balance)) && (transfer ===false)">
                                {{$$t('balanceDesc')}}
                            </div>
                        </div>

                        <van-divider class="mt-2"/>
                        <van-row type="flex" align="center" class="px-4">
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

        <van-popup v-model="showPicker" round position="bottom">
            <van-picker show-toolbar :title="$$t('picker')" value-key="platformName"
                        :columns="columns" @cancel="showPicker = false"
                        @confirm="onConfirm"
            />
        </van-popup>

        <van-tabbar fixed class="py-2">
            <div class="btn px-4">
                <van-button hairline block color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))"
                            class="radius-2" @click="onTransformByPlatformCode">
                    {{$$t('submit')}}
                </van-button>
            </div>
        </van-tabbar>
    </div>
</template>

<script>
import sessionContext from '@/mixins/sessionContext'

export default {
	name: 'PursesTransfer',
	mixins: [sessionContext],

	data: () => ({
		checked: true,
		transfer: false,
		money: 1,
		platforms: [],
		balance: {},
		columns: [],
		gameBalance: 0,
		showPicker: false,
		platformName: '',
		platformCode: '',
		refreshIcon: false
	}),

  created() {
    this.onGetOpenPlatforms()
  },

  activated() {
		this.initMemberData()
		this.money = 0
	},

	methods: {
		onLoad() {
            if (this.isVirtualMember() || this.isDottedMember()) return;
			let items = this.platforms
			this.gameBalance = 0
			this.showProgress()
			for (let item in items) {
				this.$get('/api/Game/RefreshBalance?platformCode=' + items[item].platformCode)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.balance[items[item].platformCode] = d
						if (Number(d) > 0) this.gameBalance = this.formatNum(this.gameBalance + d, 2)
						if (Number(item) === Number(items.length - 1)) {
							setTimeout(() => {
								this.showProgress(false)
							}, 1000)
						}
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			}
		},

		refreshBalance() {
			this.refreshIcon = !this.refreshIcon;
			setTimeout(() => {
				this.refreshIcon = !this.refreshIcon;
			}, 1000)

			this.initMemberData()
			this.onLoad()
		},

		onGetOpenPlatforms() {
			this.$get('/api/Game/GetOpenPlatforms')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.platforms = d
					this.columns = d
					this.platformName = d[0] ? d[0].platformName : ''
					this.platformCode = d[0] ? d[0].platformCode : ''
                    this.onLoad()
				})
				.catch(error => {
					this.procError(error)
				})
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
                                title: this.$t('purses._1'),
                                message: this.errorMsg.join() + ', ' + this.$t('purses._2'),
                            })
                            .then(() => {})
                            .catch(() => {})

                        , 0)
                    }
                    this.initMemberData();
                }
            )
        },

		onTransformByPlatformCode() {
			if (this.money <= 0) {
				this.$toast(this.$$t('moneyT'))
				return
			}
			this.$dialog.confirm({
				title: this.$t('common.point'),
				message: this.$$t('pointInfo'),
			})
				.then(() => {
          this.showProgress()
					this.$get(`/api/Game/TransformByPlatformCode?type=${this.transfer ? 1 : 0}&money=${this.money}&platformCode=${this.platformCode}`)
						.then(resp => {
							return this.checkResp(resp, (r) => r.data.success === true)
						})
						.then(() => {
              return this.$get('/api/Game/RefreshBalance?platformCode=' + this.platformCode)
						})
            .then(resp => {
              return this.checkResp(resp, (r) => r.data.success === true)
            })
            .then(data => {
              let d = data.data
              this.gameBalance = this.gameBalance - this.balance[this.platformCode]
              this.balance[this.platformCode] = d
              if (Number(d) > 0) this.gameBalance = this.formatNum(this.gameBalance + d, 2)
              this.initMemberData()
              this.money = 1
              this.showProgress(false)
              this.$success(this.$$t('success'))
            })
						.catch(error => {
              this.showProgress(false)
							this.procError(error)
						})
				})
				.catch(() => {
				})
		},

		changeTransfer() {
			this.transfer = !this.transfer
			this.money = 0
		},

		moneyAllClick() {
			if (!this.transfer) {
				this.money = this.memberData.balance
			} else {
				this.money = this.balance[this.platformCode]
			}
		},

		onConfirm(v) {
			this.platformName = v.platformName;
			this.platformCode = v.platformCode;
			this.showPicker = false;
		},

		$$t(v) {
			return this.$t('pursesTransfer.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#pursesTransfer {
    height: 100%;

    .warp-center {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 65px;
    }

    .warp {
        .refresh {
            transform: rotate(360deg);
            transition: all 1s;
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
            width: 0!important;
        }

        .cell {
            height: 54px;
            line-height: 54px;
        }

        .change {
            height: 50px;
        }

        .money_desc {
            color: rgb(250, 75, 75);
        }

        .money {

            /deep/ .van-field {
                height: 44px;
                border-radius: 8px;
                background-color: #f5f5f9;
                width: 100%;
                font-size: 16px;
                padding-left: 16px;

                .van-field__control {
                    font-size: 16px;
                    font-weight: 500;
                }
            }

        }
    }

    .btn {
        width: 100%;

        /deep/ .van-button {
        }
    }
}
</style>
