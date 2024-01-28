<!--银行转账-->
<template>
    <div id="virtual">
        <scroller>
            <van-notice-bar scrollable :text="list && list.remark" left-icon="images/recharge/invalid-name.png"
                            background="#fff" color="#333" v-if="list && list.remark"/>

            <div class="warp pb-4 pt-3">
                <div class="main-text subtitle-1 mb-1">{{$t('transferScanCode.moneyDesc1')}}{{getVirtualText(list && list.minMoneyY)}}，{{$t('transferScanCode.moneyDesc2')}}{{getVirtualText(list && list.maxMoneyY)}}</div>

                <div class="recharge">{{$$t('number')}}</div>
                <h6 class="amount">
                    <span>{{Number(amount)}}</span>
                </h6>

                <van-image class="mt-3" :src="`data:image/png;base64,${list && list.payUrl}`"
                           width="120px" height="120px"
                           @click="previewClick"/>

                <div class="body-2 mt-2">{{$$t('view')}}</div>

                <div class="virtual-content">
                    <van-cell class="recharge-title" :title="$$t('title_1', {currency: list.currencyName})"
                              :border="false">
                        <van-icon name="images/recharge/yh-icon.png" size="16" slot="icon"/>
                    </van-cell>
                    <div class="virtual-list">
                        <van-cell :title="$$t('exchangeRate')" :border="false">
                            1≈{{list && list.exchangeRate}}
                        </van-cell>

                        <van-cell :title="$$t('payChannelName')" :border="false" v-if="payChannelName">
                            {{payChannelName}}
                        </van-cell>

                        <van-cell :title="$$t('bankAccount')" :border="false" value-class="van-ellipsis">
                            {{list && list.bankAccount}}
                            <van-icon slot="right-icon" name="images/common/copy.png" size="20"
                                      @click="copyBtnClick(list.bankAccount)"/>
                        </van-cell>
                    </div>


                    <van-cell class="recharge-title" :title="$$t('title_2')" :border="false">
                        <van-icon name="images/recharge/yh-icon.png" size="16" slot="icon"/>
                    </van-cell>
                    <div class="transfer-information">
                        <van-field
                                :label="$$t('depositTime')"
                                readonly
                                clickable
                                :value="dateFormat(depositTime)"
                                right-icon="arrow"
                                :border="false"
                                @click="showDatePicker = true"
                        />

                        <van-field v-model="depositName" :label="$$t('depositName')"
                                   :placeholder="$$t('depositNamePlace')"/>
                    </div>
                </div>
                <p class="problem">{{$$t('kfDesc')}}</p>

                <div class="virtual-content" style="margin-top: 20px">
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

                <div class="payment">
                    <van-button color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))"
                                @click="onSubmit"
                                block class="radius-2">{{$$t('submit')}}
                    </van-button>
                </div>
            </div>
        </scroller>

        <van-popup v-model="showDatePicker" position="bottom">
            <van-datetime-picker
                    v-model="depositTime"
                    type="datetime"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @cancel="showDatePicker = false"
                    @confirm="showDatePicker = false"
            />
        </van-popup>

        <van-image-preview v-model="showPreview" :images="images"/>
    </div>
</template>

<script>
import {isNullOrUndefinedDesc} from '@/utils/validate'
import {dateFormat} from "@/common/js/dateUtil";

export default {
	name: 'Virtual',

	created() {
		this.amount = this.$route.query.amount
		this.payChannelName = this.$route.query.payChannelName
		this.list = JSON.parse(sessionStorage.getItem('recharge-item'))
	},

	data() {
		return {
			amount: null,
			list: [],
			depositName: '',
			minDate: new Date(),
			maxDate: new Date(2025, 10, 1),
			depositTime: new Date(),
			payBankName: null,
			showDatePicker: false,
			showPreview: false,
			images: [],
			payChannelName: null,
            requireDiscount: true,
		}
	},

	methods: {
		previewClick() {
			this.showPreview = true
			this.images.push('data:image/png;base64,' + this.list.payUrl)
		},

		onSubmit() {
			if (!(isNullOrUndefinedDesc(this.depositName, this.$$t('depositName')))) return
            const { payAmount } = this.$route.query
			let url = `/api/Deposit/TransferDeposit?channelId=${this.list.objId}&money=${payAmount}&depositName=${this.depositName}&depositTime=${this.dateFormat(this.depositTime)}&requireDiscount=${this.requireDiscount}`

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
			return dateFormat(new Date(d), 'yyyy-MM-dd hh:mm:ss')
		},

		getVirtualText (v) {
			return Number(v) > 0 ? v : this.$t('recharge.unlimited')
		},

		$$t(v, p) {
			return this.$t('virtual.' + v, p)
		}

	},

	beforeRouteLeave(to, form, next) {
		sessionStorage.removeItem('recharge-item')
		next()
	},
}
</script>

<style lang="less" scoped>
#virtual {

    .recharge {
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

    .virtual-content {
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

    .virtual-list {
        padding: 0 16px;
        margin-top: 4px;
        background-color: #fff;
        border-radius: 4px;

        .van-cell {
            height: 44px;
            padding: 0;

            .van-cell__title {
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
