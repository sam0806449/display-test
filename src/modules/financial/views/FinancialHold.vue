<template>
    <div id="financialHold">
        <div class="view-background">
            <div class="view-background-flex">
                <div class="view-background-flex-top"></div>
                <div class="view-background-flex-bottom"></div>
            </div>
        </div>
        <scroller>
            <div class="financialHold-warp">
                <div class="financialHold-banner-title">{{$$t('total')}}</div>
                <div class="financialHold-banner">{{currencySymbol}}{{item && item.total}}{{currencyDenomination}}</div>

                <van-row type="flex" justify="space-between" class="financialHold-income">
                    <van-col span="12">
                        <div class="text van-ellipsis">{{$$t('lastIncome')}}</div>
                        <div class="number">{{currencySymbol}}{{item && item.lastIncome}}{{currencyDenomination}}</div>
                    </van-col>
                    <van-col span="12">
                        <div class="text van-ellipsis">{{$$t('totalIncome')}}</div>
                        <div class="number">{{currencySymbol}}{{item && item.totalIncome}}{{currencyDenomination}}</div>
                    </van-col>
                </van-row>

                <van-row type="flex" justify="space-around" gutter="5" class="financialHold-nav">
                    <van-col span="12" v-for="(n, index) in nvas" :key="index" @click="redirectPath(n.url)">
                        <van-image
                                width="20"
                                height="20"
                                :src='n.img'
                                lazy-load
                        >
                            <template slot="loading">
                                <van-loading type="spinner" size="20"/>
                            </template>
                        </van-image>
                        <div class="title van-ellipsis">{{$$t(n.title)}}</div>
                    </van-col>
                </van-row>

                <div class="financialHold-lists" v-if="assetsItems.length>0">
                    <template v-for="(list, index) in (item && item.assets)">
                        <div class="financialHold-list" :key="index" @click="redirectDetails(list)">
                            <div class="financialHold-list-title">{{list.financialProductName}}</div>
                            <van-row type="flex" gutter="10" justify="space-between" class="financialHold-list-desc">
                                <van-col span="8">
                                    <div class="text van-ellipsis">{{$$t('credit')}}</div>
                                    <div class="number">{{currencySymbol}}{{list.credit}}{{currencyDenomination}}</div>
                                </van-col>
                                <van-col span="8">
                                    <div class="text van-ellipsis">{{$$t('totalIncome')}}</div>
                                    <div class="number additive">{{currencySymbol}}{{list.totalIncome}}{{currencyDenomination}}</div>
                                </van-col>
                                <van-col span="8">
                                    <div v-if="Number(list.daysToRedemption) <= 0">
                                        <div class="text van-ellipsis">{{$$t('redeemable')}}</div>
                                    </div>
                                    <div v-else>
                                        <div class="text van-ellipsis">{{$$t('daysToRedemption')}}</div>
                                        <div class="number">{{list.daysToRedemption}}{{$$t('day')}}</div>
                                    </div>
                                </van-col>
                            </van-row>
                        </div>
                    </template>
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
	name: 'FinancialHold',

	data() {
		return {
			nvas: [
				{img: 'images/financial/incomeBreakdown.png', title: 'incomeBreakdown', url: '/app/financial/income'},
				{img: 'images/financial/transactionRecord.png', title: 'transactionRecord', url: '/app/financial/notes'},
			],
			item: {},
			assetsItems: [{}]
		}
	},

	activated() {
		this.onLoad()
	},

	methods: {
		onLoad() {
			this.$get('/api/Financial/GetMemberAssets')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.item = data.data
                    this.assetsItems = d.assets
				})
				.catch(error => {
					this.procError(error)
				})
		},

		redirectDetails(item) {
			sessionStorage.setItem('productId', item.objId)
			this.$router.push({path: '/app/financialHold/details', query: {productId: item.objId}})
		},

		redirectPath(r) {
			this.$router.push(r)
		},

		$$t(key) {
			if (!key) return ''
			return this.$t('financialHold.' + key)
		}
	}
}
</script>

<style lang="less" scoped>
#financialHold {
    height: 100%;

    .view-background {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('/images/financial/hold-banner.png') no-repeat top right;
        background-size: 100% 250px;

        .view-background-flex {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;

            .view-background-flex-top {
                flex: 1;
                background: url('/images/financial/hold-banner.png') no-repeat top right;
                background-size: 100% 250px;
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

    .financialHold-warp {
        color: #EEEEEE;
        background: url('/images/financial/hold-banner.png') #f5f5f5 no-repeat top right;
        background-size: 100% 230px;
        padding: 18px 16px 0 16px;

        .financialHold-banner-title {
            font-size: 14px;
        }

        .financialHold-banner {
            margin-top: 8px;
            font-size: 24px;
        }

        .financialHold-income {
            margin-top: 24px;

            .text {
                font-size: 14px;
            }

            .number {
                font-size: 16px;
                margin-top: 8px;
            }
        }

        .financialHold-nav {
            height: 80px;
            margin-top: 20px;
            background-color: white;
            border-radius: 5px;
            color: #666666;

            .van-col {
                text-align: center;
                height: 80px;

                .van-image {
                    margin-top: 20px;
                }

                .title {
                    margin-top: 5px;
                    height: 16px;
                    line-height: 16px;
                    font-size: 12px;
                }
            }
        }


        .financialHold-lists {
            padding-top: 6px;

            .financialHold-list {
                margin-top: 10px;
                background-color: white;
                padding: 16px 16px 0 16px;
                height: 102px;
                color: black;
                border-radius: 5px;

                .financialHold-list-title {
                    text-align: left;
                    font-size: 16px;
                    font-weight: 500;
                }

                .financialHold-list-desc {
                    margin-top: 6px;

                    .text {
                        color: #999999;
                        font-size: 14px;
                    }

                    .number {
                        margin-top: 5px;
                        font-size: 16px;
                    }

                    .additive {
                        color: #FE5535;
                    }

                    .van-col:first-child {
                        text-align: left;
                    }

                    .van-col:last-child {
                        text-align: right;
                    }
                }
            }
        }
    }
}
</style>
