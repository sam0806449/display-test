<template>
    <div id="RebateRecordDetails">
        <div class="title mb-3">{{item.currencySymbol}}{{item.moneyY}}{{currencyDenomination}}</div>

        <div class="center text-left">
            <van-cell :title="$$t('_1')" :value="item.memberAccount"/>
            <van-cell :title="$$t('_2')" :value="item.gameCategoryName"/>
            <van-cell :title="$$t('_3')" :value="item.gamePlatformName"/>
            <van-cell :title="$$t('_4')" :value="`${item.currencySymbol}${item.betMoneyY}${item.currencyDenomination}`"/>
            <van-cell :title="$$t('_5')" :value="`${item.currencySymbol}${item.moneyY}${item.currencyDenomination}`"/>
            <van-cell :title="$$t('_6')" :value="item.createTime"/>
        </div>
    </div>
</template>

<script>
export default {
	name: 'RebateRecordDetails',

	data() {
		return {
			item: {}
		}
	},

    mounted(){
        this.item = this.$route.query.item
    },

	methods: {
		$$t(v) {
			return this.$t('rebateRecord.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#RebateRecordDetails {
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

    .btn {
        width: 88px;
        height: 28px;
        border-radius: 16px;
        padding-top: 1px;
        text-align: center;
        border: solid 1px #0091ff;
        background-color: #ffffff;
        margin-left: 38.1%;
        margin-top: 12px;
        margin-bottom: 14px;

        span {
            height: 22px;
            font-size: 16px;
            font-weight: 500;
            color: #0091ff;
        }
    }

    .center {
        /deep/ .van-cell::after {
            right: 16px;
        }

        .profit_win {
            color: red;
        }
    }

    .van-icon-copy {
        margin-left: 8px;
    }
}
</style>
