<!--提现明细-->
<template>
    <div id="details">
        <div class="title">{{item.currencySymbol}}{{item.moneyY}}{{currencyDenomination}}</div>

        <div class="mb-3" v-if="Number(item.status)===0">
            <div class="desc" style="margin-bottom: 14px;">{{$$t('status_0')}}</div>
            <div class="btn" v-if="item.recordType===2"><span @click="cancelWithdraw(item.orderId)">{{$$t('cancel')}}</span></div>
        </div>
        <div class="status-1 desc mb-3" v-else-if="Number(item.status)===1">{{$$t('status_1')}}</div>
        <div class="status-1 desc mb-3" v-else-if="Number(item.status)===2">{{$$t('status_2')}}</div>
        <div class="status-1 desc mb-3" v-else>{{$$t('status_3')}}</div>

        <div class="center text-left">
            <van-cell :title="$$t('type')" :value="getRecordType(item.recordType)"/>
            <van-cell :title="$$t('orderId')" :value="item.orderId" v-if="(item && item.orderId)">
                <van-icon slot="right-icon" name="images/common/copy.png" size="20" @click="copyBtnClick(item.orderId)"
                          class="van-icon-copy"/>
            </van-cell>
            <van-cell :title="$$t('createTime')" :value="item.orderTime"/>
            <van-cell :title="$$t('money')" :value="`${item.currencySymbol}${item.moneyY}${currencyDenomination}`"/>
            <van-cell :title="$$t('otherMoney')" :value="`${item.currencySymbol}${item.otherMoneyY}${currencyDenomination}`"/>
            <van-cell :title="$$t('beforeBalance')" :value="`${item.currencySymbol}${item.beforeBalanceY}${currencyDenomination}`" v-if="item.beforeBalanceY"/>
            <van-cell :title="$$t('afterBalance')" :value="`${item.currencySymbol}${item.afterBalanceY}${currencyDenomination}`" v-if="item.afterBalanceY"/>
            <van-cell :title="$$t('remark')" :value="item.remark || '——'"/>
        </div>
    </div>
</template>

<script>
export default {
	name: 'RechargeNotesDetails',

	data() {
		return {
			item: {},
			isShowBtn: false
		}
	},

	activated() {
		this.item = this.$sessionGet('Note-Data')
	},

	methods: {
		getRecordType (r) {
			if (r === 1) return this.$$t('recharge')
			else if (r === 2) return this.$$t('withdraw')
			else if (r === 3) return this.$$t('transfer')
			else if (r === 4) return this.$$t('rakeback')
      else if (r === 15) return  this.$$t('deduction')
		},

		cancelWithdraw(orderId) {
			this.$dialog.confirm({
				title: this.$t('common.point'),
				message: this.$$t('cancelDesc'),
			})
				.then(() => {
					this.$post('/api/Withdraw/CancelWithdraw?orderId=' + orderId)
						.then(resp => {
							return this.checkResp(resp, (r) => r.data.success === true)
						})
						.then(data => {
							this.$router.push('rechargeNotes')
							this.$toast(data.data)
						})
						.catch(error => {
							this.procError(error)
						})
				})
				.catch(() => {

				})
		},

		$$t(v) {
			return this.$t('rechargeNotesDetails.' + v)
		}
	},


	beforeRouteLeave(to, form, next) {
		sessionStorage.removeItem('Note-Data')
		next()
	}
}
</script>

<style lang="less" scoped>
#details {
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
    }

    .van-icon-copy {
        margin-left: 8px;
    }
}
</style>
