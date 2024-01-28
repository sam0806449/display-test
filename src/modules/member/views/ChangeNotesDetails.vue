<template>
    <div id="changeNotesDetails">
        <div class="title mb-3">{{item.currencySymbol}}{{item.money}}{{currencyDenomination}}</div>

        <div class="center text-left">
            <van-cell :title="$$t('type')" :value="item.recordTypeDesc"/>
            <van-cell :title="$$t('createTime')" :value="item.createTime"/>
            <van-cell :title="$$t('money')" :value="`${item.currencySymbol}${item.money}${currencyDenomination}`"
                      :value-class="Number(item.money) > 0 ? 'profit_win' : ''"/>
            <van-cell :title="$$t('beforeBalance')"
                      :value="`${item.currencySymbol}${item.beforeBalance}${currencyDenomination}`"
                      v-if="item.beforeBalance"/>
            <van-cell :title="$$t('afterBalance')"
                      :value="`${item.currencySymbol}${item.afterBalance}${currencyDenomination}`"
                      v-if="item.afterBalance"/>
            <van-cell :title="$$t('memberRemark')" :value="item.memberRemark || '——'"/>
        </div>
    </div>
</template>

<script>
export default {
	name: 'ChangeNotesDetails',

	data() {
		return {
			item: {}
		}
	},

	activated() {
		this.item = this.$sessionGet('Note-Data')
	},

	methods: {
		$$t(v) {
			return this.$t('changeNotesDetails.' + v)
		}
	},

	beforeRouteLeave(to, form, next) {
		sessionStorage.removeItem('Note-Data')
		next()
	}
}
</script>

<style lang="less" scoped>
#changeNotesDetails {
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
