<template>
    <div id="rebates" class="text-left">
        <scroller>
            <div class="warp mt-4 background-white py-3">
                <div class="title-before subtitle-4 pl-4">{{$$t('title_1')}}</div>

                <div class="step mx-auto mt-4">
                    <van-image src="/images/member/rebates/step.png" width="146"/>
                    <div class="flex space-between mt-1">
                        <div class="subtitle-1">{{$$t('info_1')}}</div>
                        <div class="subtitle-1">{{$$t('info_2')}}</div>
                    </div>
                </div>

                <div class="mt-7 subtitle-1 pl-12">{{$$t('date_desc')}}</div>
                <div class="dataTime px-9 mt-2">
                    <van-field
                            v-model="dataTime" readonly
                    />
                </div>
                <div class="btn px-9 mt-5">
                    <van-button color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))"
                                block @click="onBtnClick">
                        {{btnTrial?$$t('info_1'):$$t('info_2')}}
                    </van-button>
                </div>

                <div class="infos mt-5 px-3">
                    <van-cell :title="$$t('date')" center :value="item.date" size="large"/>
                    <van-cell :title="$$t('interval')" center :value="`${item.startTime}—${item.endTime}`" size="large"/>
                    <van-cell :title="$$t('bet')" center :value="`${item.currencySymbol}${item.betMoney}`" size="large"/>
                    <van-cell :title="$$t('amount')" center :value="`${item.currencySymbol}${item.money}`" size="large"/>
                    <van-cell :title="$$t('operating')" center :value="$$t('info_1')" size="large"/>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import {beforeByDay, dateFormat} from '@/common/js/dateUtil'
export default {
	name: 'Rebates',

	data: () => ({
        dataTime: dateFormat(beforeByDay(new Date(), 1), 'yyyy-MM-dd'),
		item: {
			betMoney: 0,
			currencySymbol: '',
			date: '—',
			endTime: '',
			money: 0,
			startTime: ''
        },
		btnTrial: true
	}),


	activated() {
	},

	methods: {
		onBtnClick () {
			if (this.btnTrial) this.onTrialCalculation()
            else this.onReceive()
        },

		onTrialCalculation() {
			this.showProgress()
			this.$get('/api/Premium/TrialCalculation')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.item = data.data
                    this.btnTrial = false
					this.showProgress(false)

				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		onReceive() {
			this.showProgress()
			this.$get('/api/Premium/Receive')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(() => {
					this.btnTrial = true
					this.showProgress(false)
					this.$success(this.$$t('operatingSuccess'))

				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		$$t(v) {
			return this.$t('rebates.' + v)
		}

	}
}
</script>

<style lang="less" scoped>
#rebates {
    height: 100%;

    .step {
        width: 146px;
        text-align: center;
        color: rgb(102, 102, 102);
    }

    .dataTime {
        height: 46px;

        .van-field {
            background-color: rgb(248, 248, 248);
        }
    }

    .btn {
        .van-button {
            border-radius: 6px;
        }
    }

    .desc {
        text-align: center;
        padding: 0 80px;
        color: rgb(249, 77, 96);
    }

}
</style>
