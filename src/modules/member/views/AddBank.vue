<template>
    <div id="addBank" class="background-white">
        <div class="pt-9">
            <div class="subtitle-3 px-4 mb-1">{{$$t('payeeName')}}</div>
            <van-field v-model="card.payeeName" :readonly="readonly" :placeholder="$$t('payeeNameDesc')" class="mb-1"/>
            <div class="user_desc caption px-4">{{$$t('bindTitle')}}</div>

            <div class="subtitle-3 px-4 mb-1 mt-4">{{$$t('cardNo')}}</div>
            <van-field v-model="card.bankCardNumber" type="digit" :placeholder="$$t('cardNoDesc')" :readonly="readonly"/>

            <div class="subtitle-3 px-4 mb-1 mt-4">{{$$t('bankName')}}</div>
            <van-field v-model="card.bankName"
                       :readonly="readonly"
                       clickable
                       right-icon="arrow"
                       :placeholder="$$t('bankNameDesc')"
                       @click="() => { if(!readonly) showBankName=true }"/>

			<div v-if="memberInfo.currencyCode === 'INR'" class="subtitle-3 px-4 mb-1 mt-4">IFSC</div>
            <van-field v-if="memberInfo.currencyCode === 'INR'" v-model="card.bankcode" :placeholder="$$t('_1')"/>
			<div v-if="memberInfo.currencyCode === 'INR'" class="caption user_desc px-4">{{$$t('_3')}}</div>
        </div>


        <van-popup v-model="showBankName" safe-area-inset-bottom position="bottom">
            <van-picker
                    show-toolbar
                    :columns="bankNames"
                    @cancel="showBankName = false"
                    @confirm="onConfirm"
            />
        </van-popup>

        <div class="btn mt-10">
            <van-button color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block class="radius-2"
                        @click="bindBank">
                {{$$t('bindBank')}}
            </van-button>
        </div>
    </div>
</template>

<script>
import {Toast} from "vant";
import {isNullOrUndefinedDesc, validCardNo} from '@/utils/validate'
import areaList from '@/common/js/area.js'

export default {
	name: 'AddBank',
	props: {
    	propsCard: {
      		type: Object,
    	},
  	},
	data() {
		return {
			card: {
				payeeName: null,
				bankCardNumber: null,
				bankName: null,
				currencyType: 0,
				bankcode: '', // 印度卢比 IFSC
            },
			readonly: false,
			area: null,
			showBankName: false,
			bankNames: [],
			areaList: {}
		}
	},

	mounted() {
		this.areaList = areaList
		this.card.payeeName = this.$store.getters.memberInfo.memberName
	},

	created() {		
        if(this.propsCard &&  Object.keys(this.propsCard).length && this.memberInfo.currencyCode === 'INR') {
        	this.readonly = true
			this.card = this.propsCard
        }
		this.onLoadBanks()
	},

	methods: {
		onConfirm(value) {
			if (this.showBankName) {
				this.card.bankName = value
				this.showBankName = false
			}

		},

		onLoadBanks() {
			this.$post('/api/Withdraw/GetAllCustomBank')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					if (d.length <= 0) return
					this.bankNames = d.map(e => {
						return e.bankName
					})
                    this.card.bankName = this.bankNames[0]
				})
				.catch(error => {
					this.procError(error)
				})
		},

		bindBank() {
			let memberCurrency = this.$store.getters.memberData.currencyCode
			if (!(isNullOrUndefinedDesc(this.card.payeeName, this.$$t('payeeName')) && validCardNo(this.card.bankCardNumber,memberCurrency) && isNullOrUndefinedDesc(this.card.bankName, this.$$t('bankName')))) {
				return
			}

			if (this.memberInfo.currencyCode === 'CNY') {
				if (this.card.payeeName.length<2 || this.card.payeeName.length > 15){
					this.$toast(`${this.$$t('payeeName')}${this.$t('validate.incorrectLength')}(2-15)`)
					return
				}
			} else if (this.memberInfo.currencyCode === 'THB') {
				if (this.card.payeeName.length<2 || this.card.payeeName.length > 50){
					this.$toast(`${this.$$t('payeeName')}${this.$t('validate.incorrectLength')}(2-100)`)
					return
				}
			} else {
				if (this.card.payeeName.length<4 || this.card.payeeName.length > 30){
					this.$toast(`${this.$$t('payeeName')}${this.$t('validate.incorrectLength')}(4-30)`)
					return
				}
			}

			if (this.card.payeeName[0] === ' ' || this.card.payeeName.slice(-1) === ' ') {
					this.$toast(this.$t("validate.spaceMoreOne"));
					return
				}

			if (this.memberInfo.currencyCode === 'INR') {
				if (!this.card.bankcode) {
					// 请输入IFSC
					this.$toast(this.$$t('_1'))
					return
				}
				if (this.card.bankcode.length !== 11 || this.card.bankcode[4] !== '0'){
					this.$toast(this.$$t('_2'))
					return
				}
			}

			if (!this.readonly){
			this.$post('/api/Account/BindMemberBankCard', this.card)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$success(data.data)
					this.$router.back()
				})
				.catch(error => {
					this.procError(error)
				})
			} else {
				this.$post(`/api/Account/UpdBankIFSC?bankIFSC=${this.card.bankcode}&objId=${this.card.objId}`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$success(data.data)
					this.$router.back();
				})
				.catch(error => {
					this.procError(error)
				})
			}	
		},

		$$t(v) {
			return this.$t('addBank.' + v)
		}
	},

	beforeRouteLeave(to, form, next) {
		sessionStorage.removeItem('card-item')
		next()
	}
}
</script>

<style lang="less" scoped>
#addBank {
	height: calc(100vh - 60px);
    text-align: left;
    overflow: scroll;

    .btn {
        padding: 0 16px 0 16px;

        .van-button__text {
            height: 22px;
            font-size: 16px;
            font-weight: bold;
            line-height: 1.38;
            color: #ffffff;
        }
    }

    .user_desc {
        height: 52px;
        background-color: rgb(245, 245, 249);
        color: rgb(153, 153, 153);
        display: table-cell;
        vertical-align: middle;
    }
}
</style>
