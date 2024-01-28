<template>
    <div id="rebateNotesDetails">
        <div class="title">{{item.currencySymbol}}{{item.money}}{{currencyDenomination}}</div>

        <div class="center text-left mt-3">
            <van-cell :title="$$t('betMoney')" :value="`${item.currencySymbol}${item.betMoney}${currencyDenomination}`"/>
            <van-cell :title="$$t('premiumRatio')" :value="`${item.premiumRatio}%`"/>
            <van-cell :title="$$t('date')" :value="item.date"/>
            <van-cell :title="$$t('platformName')" :value="item.platformName"/>
            <van-cell :title="$$t('createTime')" :value="item.createTime"/>
        </div>
    </div>
</template>

<script>
export default {
	name: 'RebateNotesDetails',

	data: () => ({
		item: {}
    }),


	activated() {
		this.item = this.$sessionGet('Note-Data')
	},

	methods: {
		$$t(v) {
			return this.$t('rebateNotesDetails.' + v)
		}
    },

	beforeRouteLeave(to, form, next) {
		sessionStorage.removeItem('Note-Data')
		next()
	}
}
</script>

<style lang="less" scoped>
#rebateNotesDetails {
    .title {
        height: 28px;
        font-size: 20px;
        margin-top: 14px;
        font-weight: bold;
        text-align: center;
        color: #333333;
    }

    .desc {
        height: 20px;
        font-size: 14px;
        margin-top: 4px;
        font-weight: 500;
        text-align: center;
        color: #666666;
    }

    .center {
        /deep/ .van-cell::after {
            right: 16px;
        }
    }

    .van-icon-copy {
        margin-left: 8px;
    }
}
</style>
