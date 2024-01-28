<!--扫码转账-->
<template>
    <div id="scanCode">
        <scroller>
            <div class="scanCode-content pb-10">
                <van-notice-bar scrollable :text="item && item.remark" left-icon="images/recharge/invalid-name.png"
                                background="#fff" color="#333" v-if="item && item.remark"/>

                <h5>{{$$t('moneyDesc1')}}{{getMoneyText(item &&
                    item.minMoneyY)}}，{{$$t('moneyDesc2')}}{{getMoneyText(item && item.maxMoneyY)}}</h5>

                <div class="recharge">{{$$t('amount')}}</div>
                <h6 class="amount">
                    <span>{{currencySymbol}}{{Number(amount)}}{{currencyDenomination}}</span>
                </h6>

                <van-image class="mt-3" :src="item && item.payUrl" width="120" height="120" @click="previewClick">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>

                <div class="press mt-2">{{$$t('view')}}</div>

                <van-cell class="recharge-title" :title="$$t('transferInfo')" :border="false">
                    <van-icon name="images/recharge/yh-icon.png" size="16" slot="icon"/>
                </van-cell>
                <div class="transfer-information">
                    <van-cell :title="$$t('depositTime')" :border="false" @click="showDate"
                              :value="dateFormat(depositTime)">
                    </van-cell>
                    <van-field v-model="depositName" :label="$$t('depositName')"
                               :placeholder="$$t('depositNamePlace')"/>
                </div>
                <p class="problem">{{$$t('kfDesc')}}</p>

                <div class="transfer-information" style="margin-top: 20px">
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
                    <van-button color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))" block
                                @click="onSubmit">
                        {{$$t('submit')}}
                    </van-button>
                </div>
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
            />
        </van-popup>

        <van-image-preview v-model="showPreview" :images="images"/>
    </div>
</template>

<script>
import {dateFormatMt_8} from '@/common/js/dateUtil'

export default {
	name: 'ScanCode',

	created() {
		this.amount = this.$route.query.amount
		this.item = JSON.parse(sessionStorage.getItem('recharge-item'))
	},

	data() {
		return {
			item: null,
			amount: null,
			minDate: new Date(),
			maxDate: new Date(2025, 10, 1),
			depositTime: new Date(),
			depositName: '',
			showPicker: false,
			isShow: null,
			showPreview: false,
			images: [],
            requireDiscount: true,
		}
	},

	methods: {
		previewClick() {
			this.showPreview = true
			this.images.push(this.item.payUrl)
		},

		showDate() {
			this.showPicker = true
			this.isShow = 'time'
		},

		showBank() {
			this.showPicker = true
			this.isShow = 'bank'
		},

		onSubmit() {
			if (!this.depositName) {
				this.$toast(this.$$t('transferInfo'))
				return
			}
			this.showProgress()
			let url = `/api/Deposit/TransferDeposit?channelId=${this.item.objId}&depositName=${this.depositName}&money=${Number(this.amount)}&depositTime=${this.dateFormat(this.depositTime)}&requireDiscount=${this.requireDiscount}`
			this.$post(url)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.showProgress(false)
					this.$toast(data.data)
					this.$router.back()
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		dateFormat(d) {
			return dateFormatMt_8(new Date(d), 'yyyy-MM-dd hh:mm:ss')
		},


		$$t(v) {
			return this.$t('transferScanCode.' + v)
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
#scanCode {
    height: 100%;
    text-align: center;

    h5 {
        font-size: 14px;
        color: #0091ff;
        font-weight: normal;
        margin-top: 12px;
    }

    .recharge {
        font-size: 14px;
        margin-top: 12px;
    }

    .amount {
        margin-top: 8px;
        font-size: 24px;
        color: #E02020;
    }

    .press {
        font-size: 14px;
        color: #666666;
    }

    .recharge-title {
        text-align: left;
        background-color: unset;
        margin-top: 10px;

        .van-icon {
            margin-top: 3px;
            height: 16px;
            margin-right: 5px;
        }
    }

    .problem {
        margin-top: 12px;
        color: #E02020;
        text-align: left;
        margin-left: 16px;
    }

    .payment {
        margin-top: 100px;
        padding: 0 16px;

        .van-button__text {
            font-size: 16px;
            color: white;
        }
    }

    .transfer-information {
        padding: 0 16px;
        text-align: left;

        /deep/ .van-cell__title {
            margin-right: 16px;
            width: 60px;
        }
    }
}
</style>
