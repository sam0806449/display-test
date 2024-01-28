<template>
    <div id="financialIncome">
        <div class="warp">
            <div class="financialIncome-balance">
                <van-row type="flex" justify="space-around">
                    <van-col span="12">
                        <div class="text van-ellipsis">{{$$t('lastIncome')}}</div>
                        <div class="number">{{currencySymbol}}{{item && item.lastIncome}}{{currencyDenomination}}</div>
                    </van-col>
                    <van-col span="12">
                        <div class="text van-ellipsis">{{$$t('totalIncome')}}</div>
                        <div class="number">{{currencySymbol}}{{item && item.totalIncome}}{{currencyDenomination}}</div>
                    </van-col>
                </van-row>
            </div>

            <div class="financialIncome-list">
                <div class="top">
                    <div class="title">{{$$t('name')}}</div>
                    <div class="desc">{{$$t('totalIncome')}}</div>
                </div>
                <div v-show="item.assets && item.assets.length>0">
                <template v-for="(list, index) in (item && item.assets)">
                    <van-cell :value="currencySymbol+list.currentIncome+currencyDenomination" :key="index" value-class="list-value">
                        <template #title>
                            <span class="custom-title">{{list.financialProductName}}</span>
                            <van-tag color="#109FFF" plain v-show="list.daysToRedemption===0">{{$$t('redemptionDate')}}</van-tag>
                        </template>
                    </van-cell>
                </template>
                </div>
                <van-empty v-show="item.assets && item.assets.length===0" :description="$t('common.noMore')" class="text-center">
                    <template #image>
                        <van-image src="/images/empty/no-more.png" width="280" height="130"/>
                    </template>
                </van-empty>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'FinancialIncome',

	data() {
		return {
			item: {}
        }
	},

	activated() {
		this.onLoad()
	},

	methods: {
		onLoad () {
			this.showProgress()
			this.$get('/api/Financial/GetMemberAssets')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.item = data.data
					this.showProgress(false)
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		$$t(v) {
			return this.$t('financialIncome.' + v)
		}
    }
}
</script>

<style lang="less" scoped>
#financialIncome {
    height: 100%;

    .warp {
        .financialIncome-balance {
            background-color: white;
            height: 110px;
            width: 100%;
            padding-top: 30px;

            .text {
                font-size: 14px;
                color: #999999;
            }

            .number {
                margin-top: 5px;
                font-size: 26px;
                color: #FE5535;
            }

        }

        .financialIncome-list {
            text-align: left;
            .top {
                padding: 12px 16px;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #999999;
            }

            .custom-title {
                margin-right: 4px;
                vertical-align: middle;
            }

            .list-value {
                color: #FE5535;
            }
        }
    }
}
</style>
