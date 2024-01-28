<!--免费试玩-->
<template>
	<div id="example"> 
		<van-nav-bar :border="false" :title="$$t('title')" @click-left="onClickLeft" @click-right="onClickRight">
			<van-icon name="arrow-left" size="22" color="#333333" slot="left" />
			<van-icon name="images/recharge/kf.png" size="22" color="#333333" slot="right" />
		</van-nav-bar>

		<div class="example-wrapper text-left">
			<h3 class="decoration">
				<span>{{$$t('title')}}</span>
			</h3>
			<div class="example-desc">{{$$t('example_desc')}}</div>

			<div class="pt-9">
				<div class="subtitle-3">{{$$t('memberAccount')}}</div>
				<van-field v-model="example.memberAccount" readonly
					:placeholder="`${$t('register.pLeft')}${$$t('memberAccount')}`" class="mt-2 radius-2" />

				<div class="subtitle-3 mt-4">{{$$t('chooseCurrency')}}</div>
				<van-field readonly center right-icon="arrow" class="mt-2 radius-2" @click="showCurrency = true">
					<div slot="input" class="flex align-items-center">
						<van-image :src="`/images/common/${cultureCode}.png`" width="18" height="18" class="mr-1" />
						{{currency}}
					</div>
				</van-field>

				<div class="subtitle-3 mt-4">{{$$t('verifyCode')}}</div>
				<div class="verification mt-2">
					<van-field v-model="example.verifyCode" maxlength="4" type="digit" :border="false"
						@focus.once="getVerification" @keyup.enter.native="handleLoginClick" clearable
						:placeholder="$t('login.verifyCodePlaceholder')" class="radius-2">
					</van-field>
					<img :src="verifyCodeImg" class="verification-img" @click="getVerification">
				</div>
			</div>

			<div class="btn mt-15">
				<van-button color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block
					class="radius-2" @click="handleLoginClick">
					<span class="subtitle-3">{{$$t('btn')}}</span>
				</van-button>
			</div>
		</div>

		<van-popup v-model="showCurrency" round position="bottom">
			<van-picker show-toolbar value-key="name" :columns="currencys" @cancel="showCurrency = false"
				@confirm="onConfirm">
				<template #option="item">
					<div class="flex align-items-center text-center space-between" style="min-width: 80px">
						<van-image :src="`images/common/${item.cultureCode}.png`" width="24" height="24" class="mr-1" />
						<div>{{item.name}}</div>
					</div>
				</template>
			</van-picker>
		</van-popup>
	</div>
</template>

<script>
	import {
		validLoginUserName,
		validVerifyCode
	} from '@/utils/validate'
	import {
		setTokenFromCookie
	} from '@/utils/auth'
	import sessionContext from '@/mixins/sessionContext'

	export default {
		name: 'Example',

		mixins: [sessionContext],

		data() {
			return {
				example: {
					memberAccount: null,
					verifyCode: null,
					verifyCodeKey: null,
					currencyCode: null,
					currencySymbol: null,
				},
				verifyCodeImg: 'images/account/vcode.png',
				currencys: [],
				currency: '',
				showCurrency: false,
				cultureCode: '',
			}
		},

		created() {
			this.initMemberAccount()
			this.getCurrency()
		},

		methods: {
			initMemberAccount() {
				this.$post('/api/Account/GetFreeMemberAccount')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.example.memberAccount = data.data
					})
					.catch(error => {
						this.procError(error)
					})
			},

			getVerification() {
				this.$post('/api/Account/GetVerifyImg')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.verifyCodeImg = 'data:image/png;base64,' + d.img
						this.example.verifyCodeKey = d.key
					})
					.catch(error => {
						this.procError(error)
					})
			},

			handleLoginClick() {
				if (validLoginUserName(this.example.memberAccount) && validVerifyCode(this.example.verifyCode)) this
					.onRegisterFreeMember()
			},

			onRegisterFreeMember() {
				this.showProgress()
				this.$post('/api/Account/RegisterFreeMember', this.example)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						setTokenFromCookie(d.token)
						this.$store.commit("setToken", d.token);
						this.initSystem()
						this.$sessionSet('tabbar', 'dashboard')
						this.$sessionSet('Home-Popup', false)
						this.$router.push('/app/dashboard')
						this.$success(this.$t('login.success'))

					})
					.catch(error => {
						this.showProgress(false)
						this.example.verifyCode = null
						this.getVerification()
						this.procError(error)
					})
			},

			getCurrency() {
				this.$post('/api/Account/GetCurrency')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.currencys = d
						let v = d.filter(e => e.isDefault === true)
						let c = v[0]
						this.cultureCode = v[0] && v[0].cultureCode
						this.currency = c.name
						this.example.currencyCode = c.code;
						this.example.currencySymbol = c.symbol
					})
					.catch(error => {
						this.procError(error)
					})
			},

			onConfirm(v) {
				this.example.currencyCode = v.code;
				this.example.currencySymbol = v.symbol
				this.cultureCode = v.cultureCode
				this.currency = v.name
				this.showCurrency = false;
			},

			onClickLeft() {
				this.$router.push('/login')
			},

			onClickRight() {
				this.$router.push('/app/service')
			},

			$$t(v) {
				return this.$t('example.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#example {
		width: 100%;
		height: 100%;
		background: url(/images/joint/digital_bg.png) no-repeat;
		background-size: 100% 100%;

		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;

		/deep/.van-nav-bar {
			background-color: transparent;
		}

		.example-wrapper {
			padding-left: 32px;
			padding-right: 32px;
			margin-top: 24px;
			height: 100%;

			.decoration {
				height: 30px;
				font-size: 24px;
				font-weight: bold;
				line-height: 1.25;
				color: #333333;

				&::before {
					right: 0;
					left: 45px;
				}
			}

			.example-desc {
				margin-top: 4px;
				font-size: 12px;
				font-weight: 500;
				line-height: 1.33;
				color: #666666;
			}
		}


		.verification {
			position: relative;

			.verification-img {
				position: absolute;
				top: 8px;
				right: 20px;
				width: 60px;
				height: 28px;
			}
		}
	}
</style>
