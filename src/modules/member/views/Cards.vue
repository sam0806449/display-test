<template>
    <div id="cards">
        <van-tabs :border="false" v-model="type" color="rgb(77, 140, 252)">
            <van-tab :title="$$t('bank')" name="bank"></van-tab> 
            <van-tab v-if="skgCode !== skyLotteryCode" :title="$$t('virtual')" name="virtual"></van-tab>
        </van-tabs>

        <div class="warp">
            <scroller>
                <div class="cards-warp pt-3" v-if="datas.length > 0">
                    <template v-for="(item, index) in datas">
                        <div class="card" @click="edit(item)"
                        :class="{'text-left': item.currencyType===1, 'text-right': item.currencyType===0}" :key="index">
                            <div class="title flex space-between align-items-center">
                                <div>
                                    <div class="icon" v-if="item.currencyType===0">
                                        <van-icon name="images/common/yh.png" size="0.533rem" color="#045fb0"/>
                                    </div>
                                    <span>{{item.bankName}}</span>
                                </div>
                            </div>

                            <div class="name">{{item.payeeName}}</div>
                            <div class="number van-ellipsis">{{item.bankCardNumber}}</div>
                            <div v-if="memberInfo.currencyCode === 'INR' && item.bankcode" class="number van-ellipsis">IFSC: {{item.bankcode}}</div>
                        </div>
                    </template>
                    <div class="desc">{{$$t('kf')}}</div>
                </div>

                <van-empty v-else :description="type==='bank' ? $$t('addBankDesc') : $$t('addVirtualDesc')" class="text-center">
                    <template #image>
                        <van-image src="/images/empty/bank.png" width="280" height="130"/>
                    </template>
                </van-empty>

                <div class="px-4 mt-4 pb-4">
                    <van-button hairline block color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))"
                                class="radius-3"
                                @click="$router.push(type==='bank' ? 'bank/add' : 'virtual/add')">
                        {{type==='bank' ? $$t('addBank') : $$t('addVirtual')}}
                    </van-button>
                </div>
            </scroller>
        </div>

    </div>
</template>

<script>
export default {
	name: 'Cards',

	data() {
		return {
			type: 'bank',
			items: [],
			item: {},
			}
	},

	computed: {
		datas() {
			let type = this.type === 'bank' ? 0 : 1
			return this.items.filter(e => e.currencyType === type)
		}
	},

	activated() {
		this.onLoad()
	},

	methods: {
        edit(propsCard) {
            if (this.memberInfo.currencyCode !== 'INR') return
            this.$router.push({ 
                name: 'editBank', // 要事先在 router 那邊命名你的元件
                params: { propsCard } 
            })
        },
		onLoad() {
			this.$post('/api/Account/GetMemberBankCard')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.items = data.data
				})
				.catch(error => {
					this.procError(error)
				})
		},

		$$t(v) {
			return this.$t('cards.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#cards {
    height: 100%;
    text-align: left;

    .warp {
        position: absolute;
        top: 44px;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .cards-warp {
        padding: 0 16px;

        .card {
            margin-bottom: 20px;
            min-height: 120px;
            padding: 12px 16px 0 16px;
            border-radius: 8px;
            color: #ffffff;
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);
            background-image: linear-gradient(to left, #345fbd, #308acd);

            .title {
                > div {
                    height: 32px;
                    display: flex;
                    align-items: center;
                }

                .icon {
                    margin-right: 8px;
                    width: 32px;
                    height: 32px;
                    padding: 6px;
                    border-radius: 20px;
                    background-color: #ffffff;

                    .iconfont-yinhang {
                        line-height: 20px;
                    }
                }

                span {
                    height: 20px;
                    font-size: 14px;
                    font-weight: bold;
                    margin: auto 0;
                }
            }

            .name {
                margin-top: 5px;
                min-height: 17px;
                font-size: 12px;
                font-weight: 500;
                text-align: left;
            }

            .number {
                height: 28px;
                font-size: 20px;
                font-weight: 500;
            }
        }

        .desc {
            height: 17px;
            font-size: 12px;
            text-align: center;
            margin-top: 20px;
            color: #999999;
        }
    }

    /deep/ .van-tabs__wrap {
        display: flex;
        justify-content: center;
        position: relative;
        z-index: 2;
        background-color: white;

        .van-tab {
            -webkit-box-flex: unset;
            -webkit-flex: none;
            flex: none;
            color: #333;
            width: 100px;

            .van-tab__text {
                font-size: 14px;
                font-weight: bold;
                color: #666666;
            }
        }

        /deep/ .van-tab--active {
            .van-tab__text {
                color: #333333;
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
}
</style>
