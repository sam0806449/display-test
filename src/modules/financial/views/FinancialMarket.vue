<template>
    <div id="financial">
        <div class="view-background">
            <div class="view-background-flex">
                <div class="view-background-flex-top"></div>
                <div class="view-background-flex-bottom"></div>
            </div>
        </div>
        <scroller class="background-whitesmoke">
            <div class="financial-warp">
                <div class="financial-top" v-if="hotItem && hotItem.id" @click.stop="redirectDetails(hotItem)">
                    <div class="financial-top-details">
                        <van-image src="/images/financial/top-banner.png" height="0.906rem" width="3.547rem"/>
                        <div class="hot van-ellipsis">{{$$t('hot')}}</div>
                        <div class="text">{{$$t('details')}}</div>
                    </div>
                    <div class="financial-top-title">
                        {{hotItem && hotItem.name}}
                    </div>
                    <div class="financial-top-desc">
                        {{hotItem && hotItem.minimumPurchaseAmount}}{{$$t('desc1')}}|{{$$t('desc2')}}|{{$$t('desc3')}}
                    </div>

                    <van-row type="flex" justify="space-between" class="financial-bottom">
                        <van-col span="12" class="financial-bottom-left">
                            <div class="number">{{hotItem && hotItem.annualizedIncomeBenchmark}}%</div>
                            <div class="text van-ellipsis">{{$$t('annualized')}}</div>
                        </van-col>
                        <van-col span="12" class="financial-bottom-right">
                            <div class="number">{{getDayFormat(hotItem && hotItem.cycleType, hotItem &&
                                hotItem.cycle)}}
                            </div>
                            <div class="text van-ellipsis">{{$$t('period')}}</div>
                        </van-col>
                    </van-row>

                    <div class="financial-btn">
                        <van-button hairline block color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))"
                                    @click.stop="redirectBuy">
                            {{$$t('go')}}
                        </van-button>
                    </div>
                </div>

                <div class="financial-lists" v-if="items.length>0">
                    <div class="financial-list" v-for="(item, index) in items" @click="redirectDetails(item)" :key="index">
                        <div class="financial-list-center">
                            <div class="title">{{item.name}}</div>
                            <van-row type="flex" gutter="20" justify="space-between" class="financial-list-desc">
                                <van-col span="12" class="financial-list-left">
                                    <div class="number van-ellipsis">{{item.annualizedIncomeBenchmark}}%</div>
                                    <div class="text van-ellipsis">{{$$t('annualized')}}</div>
                                </van-col>
                                <van-col span="12" class="financial-list-right">
                                    <div class="number van-ellipsis">{{getDayFormat(item.cycleType, item.cycle)}}</div>
                                    <div class="text van-ellipsis">
                                        {{item.currencySymbol}}{{item.minimumPurchaseAmount}}{{currencyDenomination}}{{$$t('desc1')}}
                                    </div>
                                </van-col>
                            </van-row>
                        </div>
                        <div class="financial-list-icon">
                            <van-icon name="images/financial/list-right.png" size="18"/>
                        </div>
                    </div>
                </div>

                <van-empty v-else :description="$t('common.noMore')" class="text-center">
                    <template #image>
                        <van-image src="/images/empty/no-more.png" width="280" height="130"/>
                    </template>
                </van-empty>
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'FinancialMarket',

	data() {
		return {
			items: [{}],
			hotItem: {},
			pageIndex: 1,
		}
	},

	activated() {
		this.onLoad()
	},

	computed: {
		getDayRules() {
			return Number(this.item && this.item.cycleType) === 0 && Number(this.item && this.item.cycle) < 2;
		},
	},


	methods: {
		onLoad() {
			this.$post('/api/Financial/GetProductList', {pageIndex: this.pageIndex, pageSize: 10})
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.items = d.items.filter(e => e.isHot === false)
					this.hotItem = d.items.filter(e => e.isHot === true)[0]
				})
				.catch(error => {
					this.procError(error)
				})
		},

		getDayFormat(type, n) {
			if (type === 1) {
				return n * 30 + this.$$t('day')
			} else if (type === 2) {
				return n * 30 * 12 + this.$$t('day')
			} else {
				if (n < 2) return this.$$t('unLimited')
				else return n + this.$$t('day')
			}
		},

		redirectDetails(item) {
			sessionStorage.setItem('productId', item.objId)
			this.$router.push({path: 'financialMarket/details', query: {productId: item.objId}})
		},

		redirectBuy() {
			sessionStorage.setItem('productId', this.hotItem.objId)
			this.$router.push({
				path: 'financial/buy',
				query: {
					productId: this.hotItem.id,
					title: this.hotItem.name,
					isShow: this.getDayRules ? 1 : 2,
					isHot: true,
					minimumPurchaseAmount: this.hotItem.minimumPurchaseAmount
				}
			})
		},

		$$t(key) {
			if (!key) return ''
			return this.$t('financial.' + key)
		}
	}
}
</script>

<style lang="less" scoped>
#financial {
    height: 100%;

    .view-background {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('/images/financial/banner.png') no-repeat top right;
        background-size: 100% 300px;

        .view-background-flex {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;

            .view-background-flex-top {
                flex: 1;
                background: url('/images/financial/banner.png') no-repeat top right;
                background-size: 100% 300px;
            }

            .view-background-flex-bottom {
                flex: 1;
                background: transparent;
            }
        }
    }

    .v-easy-refresh {
        height: calc(100vh - 100px);
    }

    .financial-warp {
        height: 100%;
        background: url('/images/financial/banner.png') #f5f5f5 no-repeat top right;
        background-size: 100% 130px;
        padding: 20px 16px 0 16px;

        .financial-top {
            width: 100%;
            height: 240px;
            background-color: white;
            border-radius: 5px;
            padding: 0 16px;

            .financial-top-details {
                height: 35px;

                .van-image {
                    position: absolute;
                    top: 13px;
                    right: 115px;
                }

                .hot {
                    font-size: 16px;
                    color: rgb(77, 140, 252);
                    position: absolute;
                    top: 16px;
                    right: 115px;
                    width: 133px;
                    text-align: center;
                }

                .text {
                    padding-top: 12px;
                    text-align: right;
                    height: 100%;
                    font-size: 14px;
                    color: #999999;
                }
            }

            .financial-top-title {
                margin-top: 10px;
                font-size: 20px;
                font-weight: 600;
            }

            .financial-top-desc {
                margin-top: 6px;
                font-size: 14px;
                color: #999999;
            }

            .financial-bottom {
                margin-top: 10px;

                .financial-bottom-left {
                    .number {
                        font-size: 28px;
                        color: #FE5535;
                        font-weight: 600;
                    }
                }

                .financial-bottom-right {
                    .number {
                        font-size: 24px;
                        font-weight: 600;
                    }
                }

                .text {
                    margin-top: 6px;
                    font-size: 14px;
                    color: #999999;
                }
            }


            .financial-btn {
                margin-top: 10px;

                .van-button {
                    border-radius: 5px;
                }
            }
        }

        .financial-lists {
            margin-top: 12px;
            /*padding-bottom: 50px;*/

            .financial-list {
                width: 100%;
                height: 110px;
                display: flex;
                justify-content: space-between;
                background-color: white;
                padding-right: 16px;
                border-bottom: 1px #CCCCCC solid;

                .financial-list-center {
                    width: 236px;
                    padding-top: 15px;
                    padding-left: 12px;
                    text-align: left;

                    .title {
                        font-size: 14px;
                        font-weight: 600;
                    }

                    .financial-list-desc {
                        margin-top: 5px;

                        .number {
                            height: 28px;
                        }

                        .financial-list-left {
                            .number {
                                font-size: 24px;
                                color: #FE5535;
                                font-weight: 600;
                            }
                        }

                        .financial-list-right {
                            .number {
                                font-size: 18px;
                                font-weight: 600;
                            }
                        }

                        .text {
                            margin-top: 3px;
                            font-size: 14px;
                            color: #999999;
                        }
                    }
                }

                .financial-list-icon {
                    height: 110px;

                    .van-icon {
                        margin-top: 47px;
                    }
                }
            }

            .financial-list:last-child {
                border-bottom: unset;
            }
        }

        .financial-list:first-child {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        .financial-list:last-child {
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }
    }
}
</style>
