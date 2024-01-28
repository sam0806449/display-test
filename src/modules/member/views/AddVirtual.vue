<template>
    <div id="addVirtual" class="background-white">
        <div class="pt-9">
            <div class="subtitle-3 px-4">{{$$t('payeeName')}}</div>
            <van-field v-model="card.payeeName" :placeholder="$$t('payeeNameDesc')" class="mb-1"/>

            <div class="subtitle-3 px-4 mb-1 mt-4">{{$$t('bankName')}}</div>
            <div class="mt-4 flex virtual_name">
                <template v-for="(item, index) in virtuals">
                    <div class="ml-4 px-5 py-2" :class="{active: card.bankName===item.code}" :key="index" @click="changeVirtual(item)">{{item.name}}</div>
                </template>
            </div>

            <div class="subtitle-3 px-4 mb-1 mt-4">{{$$t('cardNo')}}</div>
            <van-field v-model="card.bankCardNumber" :formatter="formatter" :placeholder="$$t('cardNoDesc')"/>

            <div v-if="protocols && protocols.length > 0">
                <div class="subtitle-3 px-4 mb-1 mt-4">{{$$t('protocol')}}</div>
                <div class="mt-4 flex virtual_name">
                    <template v-for="(item, index) in protocols">
                        <div class="ml-4 px-5 py-2 mb-3" :class="{active: card.address===item}" :key="index" @click="changeProtocol(item)">{{item}}</div>
                    </template>
                </div>
            </div>

            <template v-if="isVerifyBankNumber" >
                <div class="subtitle-3 px-4 mb-1 mt-4">{{$t('addBank.cardNo')}}</div>
                <van-field v-model="card.verifiedBankNumber" type="digit" :placeholder="$$t('bindBankCardNumberDesc')"/>
            </template>

            <div class="mt-9 px-4 text-grey">{{$$t('cardNoT')}}</div>

        </div>

        <div class="btn mt-5">
            <van-button color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block class="radius-2"
                        @click="bindVirtual">
                {{$$t('bindVirtual')}}
            </van-button>
        </div>
    </div>
</template>

<script>
import {isNullOrUndefinedDesc} from '@/utils/validate'

export default {
	name: 'AddVirtual',

	data: () => ({
        card: {
			payeeName: null,
			bankCardNumber: null,
			bankName: null,
			currencyType: 1,
			address: null,
            verifiedBankNumber: '',
        },
		virtuals: [],
		protocols: [],
        isVerifyBankNumber: false,
	}),


	created() {
		this.onLoadCurrency()
        this.getVerifyBankNumber()
	},

	methods: {
        formatter(v) {
            // eslint-disable-next-line no-useless-escape
            return v.replace(/[^\a-\z\A-\Z0-9]/g,'');
        },
        getVerifyBankNumber() {
			this.$get('/api/Account/GetVerifyBankNumber')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.isVerifyBankNumber = data.data
				})
				.catch(error => {
					this.procError(error)
				})
		},

		onLoadCurrency() {
			this.$post('/api/Account/GetVirtualCurrency')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.virtuals = d
                    this.card.bankName = d[0].code
					let protocol = d && d[0].protocol
                    if (protocol) this.protocols = protocol.split(',')
					this.card.address = this.protocols[0]
				})
				.catch(error => {
					this.procError(error)
				})
		},

		bindVirtual() {
			if (!(isNullOrUndefinedDesc(this.card.payeeName, this.$$t('payeeName')) && isNullOrUndefinedDesc(this.card.bankCardNumber, this.$$t('cardNo')) && isNullOrUndefinedDesc(this.card.bankName, this.$$t('bankName')))) {
				return
			}
            const parmas = { ...this.card };

            if (!this.isVerifyBankNumber) {
                delete parmas.verifiedBankNumber
            }
			this.$post('/api/Account/BindMemberBankCard', parmas)
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
		},

		changeVirtual (item) {
			this.card.bankName = item.code
			if (item.protocol) {
				this.protocols = item.protocol.split(',')
				this.card.address = this.protocols[0]
            } else {
				this.protocols = []
				this.card.address = ''
            }
        },

		changeProtocol (code) {
			this.card.address = code
		},

		$$t(v) {
			return this.$t('addVirtual.' + v)
		}

	}
}
</script>

<style lang="less" scoped>
#addVirtual {
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

    .virtual_name {
        flex-wrap: wrap;
        > div {
            height: 36px;
            font-size: 14px;
            color: black;
            border: 1px solid rgb(238, 238, 238);
            border-radius: 6px;

        }

        .active {
            background-image: url("/images/member/virtual/bg.png");
            background-size: 100% 100%;
			background-repeat: no-repeat;
            border: unset;
            color: rgb(63, 128, 252);
        }
    }
}
</style>
