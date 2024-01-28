<!--银行转账-->
<template>
    <div id="bank">
        <scroller>
            <van-notice-bar scrollable :text="list && list.remark" left-icon="images/recharge/invalid-name.png"
                            background="#fff" color="#333" v-if="list && list.remark"/>

            <div class="main-text subtitle-1 mt-3">{{$t('transferScanCode.moneyDesc1')}}{{getMoneyText(list &&
                list.minMoneyY)}}，{{$t('transferScanCode.moneyDesc2')}}{{getMoneyText(list && list.maxMoneyY)}}
            </div>

            <div class="recharge">{{$$t('amount')}}</div>
            <h6 class="amount">
                <span>{{currencySymbol}}{{Number(amount)}}{{currencyDenomination}}</span>
            </h6>
            <div class="bank-content">
                <van-cell class="recharge-title" :title="$$t('rechargeTitle')" :border="false">
                    <van-icon name="images/recharge/yh-icon.png" size="16" slot="icon"/>
                </van-cell>
                <div class="bank-list">
                    <van-cell :title="$$t('bank')" :border="false">
                        {{list && list.payChannelName}}
                        <van-icon slot="right-icon" name="images/common/copy.png" size="20"
                                  @click="copyBtnClick(list.payChannelName)"/>
                    </van-cell>
                    <van-cell :title="$$t('payMerchantName')" :border="false">
                        {{list && list.payMerchantName}}
                        <van-icon slot="right-icon" name="images/common/copy.png" size="20"
                                  @click="copyBtnClick(list.payMerchantName)"/>
                    </van-cell>
                    <van-cell :title="$$t('bankAccount')" :border="false">
                        {{list && list.bankAccount}}
                        <van-icon slot="right-icon" name="images/common/copy.png" size="20"
                                  @click="copyBtnClick(list.bankAccount)"/>
                    </van-cell>
                    <van-cell :title="$$t('payChannelName')" :border="false">
                        {{list && list.payChannelName}}
                        <van-icon slot="right-icon" name="images/common/copy.png" size="20"
                                  @click="copyBtnClick(list.payChannelName)"/>
                    </van-cell>
                </div>
                <van-cell class="recharge-title" :title="$$t('transferInfo')" :border="false">
                    <van-icon name="images/recharge/yh-icon.png" size="16" slot="icon"/>
                </van-cell>
                <div class="transfer-information">
                    <van-cell :title="$$t('depositTime')" :border="false" @click="showDate"
                              :value="dateFormat(depositTime)">
                    </van-cell>
                    <van-cell :title="$$t('payBankName')" :border="false" @click="showBank">
                        <span v-if="!payBankName">{{$$t('selectBank')}}</span>{{payBankName}}
                        <van-icon name="arrow" size="16"/>
                    </van-cell>
                    <van-field v-model="depositName" :label="$$t('depositName')"
                               :placeholder="$$t('depositNamePlace')"/>
                </div>
            </div>

            <p class="problem">{{$$t('kfDesc')}}</p>

            <div class="bank-content" style="margin-top: 20px">
                <van-radio-group v-model="requireDiscount">
                    <van-radio :name="true" style="margin-bottom: 10px">
                        <template #icon="props">
                            <div style="display: flex; align-items: center">
                                <img
                                    slot="icon"
                                    style="width: 18px"
                                    :src="props.checked ? 'images/recharge/active-single.png' : 'images/recharge/single.png'"
                                >
                                <span style="margin-left: 5px; font-size: 14px">{{ $t('recharge._1') }}</span>
                            </div>
                        </template>
                    </van-radio>
                    <van-radio :name="false">
                        <template #icon="props">
                            <div style="display: flex; align-items: center">
                                <img
                                    slot="icon"
                                    style="width: 18px"
                                    :src="props.checked ? 'images/recharge/active-single.png' : 'images/recharge/single.png'"
                                >
                                <span style="margin-left: 5px; font-size: 14px">{{ $t('recharge._2') }}</span>
                            </div>
                        </template>
                    </van-radio>
                </van-radio-group>
            </div>

            <div class="payment pb-5">
                <van-button color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))" @click="onSubmit"
                            block>{{$$t('submit')}}
                </van-button>
            </div>
        </scroller>

        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
                    v-model="depositTime"
                    type="datetime"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @cancel="showPicker = false"
                    @confirm="showPicker = false"
                    v-if="isShow == 'time'"
            />
            <van-picker
                    show-toolbar
                    :title="$$t('selectBank')"
                    @change="onChange"
                    :columns="banks"
                    @cancel="showPicker = false"
                    @confirm="showPicker = false"
                    v-else
            />
        </van-popup>
    </div>
</template>

<script>
import {dateFormatMt_8} from '@/common/js/dateUtil'

export default {
	name: 'Bank',

	created() {
		this.amount = this.$route.query.amount
		this.list = JSON.parse(sessionStorage.getItem('recharge-item'))
		this.onLoadBanks()
	},

	data() {
		return {
			amount: null,
			list: [],
			depositName: null,
			minDate: new Date(),
			maxDate: new Date(2025, 10, 1),
			depositTime: new Date(),
			showPicker: false,
			showDatePicker: false,
			banks: [],
			payBankName: null,
			isShow: null,
            requireDiscount: true,
		}
	},

	methods: {
		onChange(picker, value) {
			this.payBankName = value
		},

		showDate() {
			this.showPicker = true
			this.isShow = 'time'
		},

		showBank() {
			this.showPicker = true
			this.isShow = 'bank'
		},

		onLoadBanks() {
			this.$post('/api/Withdraw/GetAllCustomBank')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					if (d.length <= 0) return
					this.banks = d.map(e => {
						return e.bankName
					})
					this.payBankName = this.banks[0]
				})
				.catch(error => {
					this.procError(error)
				})
		},

		onSubmit() {
			if (!this.depositName || !this.payBankName) {
				this.$toast(this.$t('transferScanCode.transferInfo'))
				return
			}
			let url = `/api/Deposit/TransferDeposit?channelId=${this.list.objId}&money=${this.amount}&depositName=${this.depositName}&depositTime=${this.dateFormat(this.depositTime)}&payBankName=${this.payBankName}&requireDiscount=${this.requireDiscount}`
			this.$post(url)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$toast(data.data)
					this.$router.back()
				})
				.catch(error => {
					this.procError(error)
				})
		},

		dateFormat(d) {
			return dateFormatMt_8(new Date(d), 'yyyy-MM-dd hh:mm:ss')
		},

		$$t(v) {
			return this.$t('transferBank.' + v)
		}

	},

	beforeRouteLeave(to, form, next) {
		sessionStorage.removeItem('recharge-item')
		next()
	},

	beforeRouteEnter(to, from, next) {
		let e = JSON.parse(sessionStorage.getItem('recharge-item'))
		if (!e) next('/app/dashboard')
		else next()
	}
}
</script>

<style lang="less" scoped>
#bank {

    .recharge {
        margin-top: 12px;
        font-size: 14px;
    }

    .amount {
        margin-top: 8px;
        font-size: 24px;
        color: #E02020;
    }

    .problem {
        margin-top: 12px;
        color: #E02020;
        text-align: left;
        margin-left: 16px;
    }

    .payment {
        margin-top: 29px;
        padding: 0 16px;

        .van-button__text {
            font-size: 16px;
            color: white;
        }
    }

    .bank-content {
        padding: 0 16px;

        .recharge-title {
            text-align: left;
            background-color: unset;
            margin-top: 10px;
            padding: 0;

            .van-icon {
                margin-top: 3px;
                height: 16px;
                margin-right: 5px;
            }
        }

        .transfer-information {
            text-align: left;
            height: 100%;
            margin-top: 4px;

            .van-cell {
                height: 44px;
            }
        }
    }

    /deep/ .van-cell {
        align-items: center;

        .van-cell__title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .bank-list {
        height: 176px;
        padding: 0 16px;
        margin-top: 4px;
        background-color: #fff;
        border-radius: 4px;

        .van-cell {
            height: 44px;
            padding: 0;

            .van-cell__title {
                /*width: 45px;*/
                text-align-last: justify;
                flex: inherit;
                font-size: 14px;
                color: #333333;
            }

            .van-cell__value {
                padding-left: 24px;
                font-size: 14px;
                color: #333333;
                align-items: center;
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>
