<!--充值中心-->
<template>
	<div id="recharge">

		<div class="my-3 px-3">
			<van-row gutter="16" type="flex" justify="space-between">
				<van-col span="12">
					<van-button
						:color="type==='general' ? 'linear-gradient(to right, rgb(117, 162, 255), rgb(70, 132, 255))' : null"
						block class="radius-1" @click="setType('general')">
						{{$$t('btn_1')}}
					</van-button>
				</van-col>
				<van-col span="12">
					<van-button 
						v-if="skgCode !== skyLotteryCode"
						class="radius-1"
						:color="type==='xnhb' ? 'linear-gradient(to right, rgb(117, 162, 255), rgb(70, 132, 255))' : null"
						block @click="setType('xnhb')">
						{{$$t('btn_2')}}
					</van-button>
				</van-col>
			</van-row>
		</div>

		<div v-show="type==='general'">
			<div class="recharge-t">
				<p>
					<span></span>
					{{$$t('rechargeTitle')}}
				</p>
				<van-field v-model="amount" :placeholder="$$t('amountDesc')" clearable type="number"
					@input="InputValue">
					<div slot="left-icon">{{currencySymbol}}</div>
					<div slot="right-icon" v-if="currencyDenomination">{{currencyDenomination}}</div>
				</van-field>

				<ul style="justify-content: space-between;">
					<li v-for="(item,i) in amountarr" :key="i" :class="{active:index === i && amount === item}"
						@click="index = i,amount = item">{{item}}
					</li>
				</ul>
			</div>
			<div class="recharge-b px-4">
				<p>
					<span></span>
					{{$$t('rechargeType')}}
				</p>
				<div class="recharge-content radius-2">
					<div class="recharge-warps radius-2 ">
						<scroller>
							<div class="px-4">
								<van-cell v-for="(item, index) in recharges" :key="index" center size="large" is-link
									@click="showSheet(item)">
									<template #title>
										<div>{{item.groupName}}</div>
									</template>
								
									<template #icon>
										<van-icon
											v-if="skgCodeKey === 'SGU3' && item.groupType === 'yl'"
											:name="`/images/SGU3/yl.png`"
											size="32"
										/>
										<van-icon v-else :name="`/payImages/group/${item.groupType}.png`" size="32" />
									</template>
								
									<template #default>
										<van-tag :type="getType(item)" slot="default">{{item.tagDesc}}</van-tag>
									</template>
								</van-cell>
							</div>
						</scroller>
					</div>
				</div>
			</div>
		</div>

		<div v-show="type==='xnhb'" class="xnhb">
			<scroller>
				<div class="pb-4">
					<van-notice-bar scrollable :text="remarkText" left-icon="images/recharge/invalid-name.png"
						background="#fff" color="#333" v-if="remarkText" />

					<div class="xnhb-top background-white px-4 pt-3 pb-4">
						<div class="subtitle-3">{{$$t('currency')}}</div>

						<div class="items">
							<template v-for="(item, index) in xnhbCurrencyCodes">
								<div class="px-4 py-2 radius-2 item" :key="index"
									:class="{item_active: item.currencyCode === xnhb}"
									@click="changeXnhb(item)">
									{{item.currencyName}}
								</div>
							</template>
						</div>

						<div v-show="isShowProtocols">
							<div class="subtitle-3 mt-3">{{$$t('protocol')}}</div>

							<div class="items mt-3">
								<template v-for="(item, index) in protocols">
									<div class="px-5 py-2 radius-2 item" :key="index"
										:class="{item_active: item.objId === protocolId}"
										@click="switchProtocols(item.objId)">
										<div>{{item.payChannelName}}
										</div>
									</div>
								</template>
							</div>
						</div>
					</div>

					<div class="xnhb-b background-white px-4 pt-3 pb-4 mt-3">
						<div class="subtitle-3">{{$$t('number')}} <span
								class="caption text-grey">{{$$t('exchangeRate')}}（1≈{{currencySymbol}}{{exchangeRate}}）</span>
						</div>

						<div class="items mt-3">
							<template v-for="(item, index) in asyncNums">
								<div class="radius-2 num-item" :key="index" @click="xnhNumber = item"
									:class="{item_active: Number(xnhNumber) === item}">
									{{item}}
								</div>
							</template>
						</div>

						<van-field v-model="xnhNumber" :placeholder="$$t('number_desc')" clearable type="number">
							<!-- <div slot="left-icon">{{currencySymbol}}</div> -->
							<!-- <div slot="right-icon" v-if="currencyDenomination">{{currencyDenomination}}</div> -->
						</van-field>
					</div>

					<div class="px-10 background-white text-grey pb-7 body-2">{{$$t('pay')}}：<span
							class="main-text">{{getMoney}}</span>（{{$$t('pay_1')}}：1≈{{currencySymbol}}{{exchangeRate}}）{{$$t('pay_2')}}
					</div>

					<div class="px-4 mt-6">
						<van-button color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block
							class="radius-2" @click="goXnhb">
							{{$$t('submit')}}
						</van-button>
					</div>
				</div>
			</scroller>
		</div>

		<van-action-sheet v-model="isShowSheet" :title="title" close-icon>
			<van-notice-bar scrollable :class="{'notice-yh':rechargeType !== 'yhzh'}" :text="remarkText"
				left-icon="images/recharge/invalid-name.png" background="#fff" color="#333" />
			<div class="recharge-aisle">
				<Yh v-show="(rechargeType === 'yhzh')" :items.sync="aisleItems" @activeItem="activeItem" ref="yhzh" />
				<Zfb v-show="rechargeType !== 'yhzh'" :items.sync="aisleItems" @activeItem="activeItem" ref="scan" />
			</div>
			<button @click="nextShowRandomNums">{{$$t('next')}}</button>
		</van-action-sheet>

		<!-- 随机数字弹窗 -->
		<van-action-sheet v-model="isShowRandomNums" :title="title" @closed="closeSheet" close-icon>
			<div class="recharge-t randomNums-pop">
				<h6 v-if="rechargeItem">{{rechargeItem.payChannelName}}</h6>
				<p v-if="rechargeItem" class="van-ellipsis mb-3">
					{{$t('aisleZFB.moneyDesc1')}}{{getMoneyText(rechargeItem.minMoneyY)}}，{{$t('aisleZFB.moneyDesc2')}}{{getMoneyText(rechargeItem.maxMoneyY)}}
				</p>
				<div v-if="!['SGDP'].includes(skgCodeKey)">
					<p>
						<span></span>
						{{$$t('rechargeTitle')}}
					</p>
					<van-field v-model="amount" :placeholder="$$t('amountDesc')" clearable type="number"
						@input="InputValue">
						<div slot="left-icon">{{currencySymbol}}</div>
						<div slot="right-icon" v-if="currencyDenomination">{{currencyDenomination}}</div>
					</van-field>

					<ul>
						<li v-for="(item,i) in asyncNums" :key="i"
							:class="{active: amount === item}"
							@click="amount = item">
							{{currencySymbol}}{{item}}{{currencyDenomination}}
						</li>
					</ul>
				</div>
				<div v-if="!['tranbank', 'transcan'].includes(rechargeItem && rechargeItem.serviceType)" class="transfer-information" style="margin-top: 20px">
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
			</div>
			<button @click="goRecharge">{{$$t('next')}}</button>
		</van-action-sheet>

		<van-dialog v-model="showChangeMoney" :title="$$t('rechargeTitle')" show-cancel-button @confirm="confirmChangeMoney" @cancel="cancelChangeMoney">
			<div class="recharge-t">
				<p class="van-ellipsis">
					{{$t('aisleZFB.moneyDesc1')}}{{getMoneyText(changeMoneyData.minMoneyY)}}，{{$t('aisleZFB.moneyDesc2')}}{{getMoneyText(changeMoneyData.maxMoneyY)}}
				</p>
				<van-field v-model="amount" :placeholder="$$t('amountDesc')" clearable type="number"
						@input="InputValue">
						<div slot="left-icon">{{currencySymbol}}</div>
						<div slot="right-icon" v-if="currencyDenomination">{{currencyDenomination}}</div>
				</van-field>
			</div>	
		</van-dialog>
	</div>
</template>

<script>
	export default {
		name: 'Recharge',

		components: {
			Zfb: () => import('@/modules/recharge/transfer/AisleZFB'),
			Yh: () => import('@/modules/recharge/transfer/AisleYH')
		},

		data: () => ({
			showChangeMoney: false,
			isShowRandomNums: false,
			changeMoneyData: {},
			type: 'general',
			index: 0,
			amount: 100,
			aisleItems: [],
			isShowRechargeAisle: 'scan',
			recharges: [],
			rechargeXnhb: [],
			rechargeXnhbItem: {},
			xnhbCurrencyCodes: [],
			xnhb: '',
			protocolId: '',
			isShowSheet: false,
			title: null,
			remarkText: '',
			rechargeType: null,
			rechargeItem: null,
			amountarr: [100, 500, 1000, 2000, 5000, 10000],
			amountarr_th: [500, 1000, 2000, 5000, 10000, 20000],
			xnhNumber: 100,
			requireDiscount: true,
		}),

		computed: {
			protocols() {
				return this.rechargeXnhb.filter(e => e.currencyCode === this.xnhb) || []
			},

			isShowProtocols() {
				let c = false
				for (let i = 0; i < this.protocols.length; i++) {
					if (this.protocols[i].payChannelName) {
						c = true
						break;
					}
				}

				return c
			},

			exchangeRate() {
				if (this.rechargeXnhb.length === 0) return
				let e = this.rechargeXnhb.filter(e => e.objId === this.protocolId)[0].exchangeRate
				return Number(e)
			},

			payChanneItem() {
				return this.rechargeXnhb.filter(e => e.objId === this.protocolId)[0]
			},

			getMoney() {
				let e = Math.floor(Number(this.xnhNumber * this.exchangeRate) * 100)/100
				if (this.currencyDenomination === 'k') return this.currencySymbol + Math.floor(e / 1000 * 100)/100 + this.currencyDenomination
				else return this.currencySymbol + e
			},

			asyncNums(){
				if (this.rechargeItem) {
					const minMoney = this.rechargeItem.minMoneyY || (this.rechargeItem.maxMoneyY ? 1 : 100);
					let maxMoney = this.rechargeItem.maxMoneyY ? Math.floor(this.rechargeItem.maxMoneyY) : 10000;

					//最小0、最大0
					if (this.rechargeItem.minMoneyY === 0 && this.rechargeItem.maxMoneyY === 0) {
						return [100, 200, 300, 400, 500, 1000, 2000, 3000, 5000, 10000]
					}

					if (`${maxMoney}`.slice(-1) === '9') {
						maxMoney += 1
					}
					let moneyValue = 0;
					let defaultNum = 1;
					let isAdd = false;

					if (Math.floor(maxMoney / 10) > minMoney) {
						if (`${maxMoney}`.startsWith('9')) {
						const maxlen = `${maxMoney}`.length;
						maxMoney = "1";
						for (let index = 0; index < maxlen; index++) {
							maxMoney += 0;
						}
						maxMoney = +maxMoney;
						}
						const len = `${Math.floor(maxMoney / 10)}`.length;
						let denominator = "1";
						for (let i = 1; i < len; i++) {
						denominator += '0';
						}

						moneyValue = Math.floor((maxMoney / 10) / denominator) * denominator;
					} else if (Math.floor((maxMoney / 10) * 2) > minMoney) {
						const len = `${Math.floor(maxMoney / 10)}`.length;
						let denominator = "1";
						for (let i = 1; i < len; i++) {
						denominator += '0';
						}
					
						moneyValue = Math.floor((maxMoney / 10) / denominator) * denominator;
						defaultNum = 2;
					} else {
						const len = `${Math.floor(((maxMoney - minMoney) / 9))}`.length;
						let denominator = "1";
						for (let i = 1; i < len; i++) {
						denominator += '0';
						}

						moneyValue = Math.floor(((maxMoney - minMoney) / 9) / denominator) * denominator;
						isAdd = true;
					}

					const moneyList = [minMoney];
					for (let i = defaultNum; i < 8 + defaultNum; i++) {
						if (isAdd) {
						moneyList.push(Math.floor(minMoney) + moneyValue * i);
						} else {
						moneyList.push(moneyValue * i);
						}
					}
					moneyList.push(this.rechargeItem.maxMoneyY || 10000);
					return [...new Set(moneyList)];
				} else {
					return [100, 200, 300, 400, 500, 1000, 2000, 3000, 5000, 10000]
				}
			},

			xnhbarr() {
				return this.asyncNums;
			}
		},

		watch: {
			protocols(v) {
				this.protocolId = v[0].objId
			},

			type(v) {
				if (v === 'xnhb') this.remarkText = this.rechargeXnhbItem.remark
				else this.remarkText = ''
			}
		},

		mounted() {
			this.onLoadPaymentChannel()
			if (this.memberInfo.currencyCode === 'THB') {
				this.amountarr = this.amountarr_th
				this.amount = 500
			}
		},

		methods: {
			onLoadPaymentChannel() {
				this.$post('/api/Deposit/GetPaymentChannel')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.recharges = d.filter(e => e.groupType !== 'xnhb')
						let xnhb = d.filter(e => e.groupType === 'xnhb')
						if (xnhb.length > 0) {
							this.rechargeXnhbItem = xnhb[0]
							this.rechargeXnhb = xnhb[0].merchantChannels[0].channels
							this.xnhb = this.rechargeXnhb[0].currencyCode
							let x = this.rechargeXnhb.map(e => {
								return {
									currencyCode: e.currencyCode,
									currencyName: e.currencyName,
									payChannelName: e.payChannelName
								}
							})
							this.xnhbCurrencyCodes = this.uniqueCurrencyCode(x)
						}
					})
					.catch(error => {
						this.procError(error)
					})
			},

			onlineDeposit() {
				this.showProgress()
				this.$post(
						`/api/Deposit/OnlineDeposit?payCode=${this.rechargeItem.payCode}&merChannelId=${this.rechargeItem.objId}&money=${this.amount}&requireDiscount=${this.requireDiscount}`
					)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.showProgress(false)
						let d = data.data
						if (d.hrefType === 1 || d.hrefType === 2) {
							sessionStorage.setItem('payUrl', d.payUrl)
							this.$router.push('recharge/transferQrCode')
						} else if (d.hrefType === 3) {
							window.location.href = d.payUrl
						} else {
							sessionStorage.setItem('payUrl', d.payUrl)
							this.$router.push('recharge/hrefForm')
						}
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			showSheet(item) {
				this.isShowSheet = !this.isShowSheet
				this.title = item.groupName
				this.rechargeType = item.groupType
				this.remarkText = item.remark
				this.aisleItems = item.merchantChannels
				this.$nextTick(() => {
					if (item.groupType === 'yhzh') {
						this.$refs.yhzh.radio = 0
					} else {
						this.$refs.scan.radio = 0
					}
				})
			},

			goXnhb() {
				if (Number(this.xnhNumber) < 1) {
					this.$toast(this.$$t('toast_1'))
					return
				}

				let payAmount = Math.floor(Number(this.xnhNumber * this.exchangeRate) * 100)/100
				if (this.currencyDenomination === 'k')  {
					payAmount = Math.floor(payAmount/1000 * 100)/100
				}

				this.$router.push({
					path: 'recharge/virtual',
					query: {
						amount: Number(this.xnhNumber),
						payAmount
					}
				})
				this.$sessionSet('recharge-item', this.payChanneItem)
			},

			confirmChangeMoney() {
				this.clear();
				this.goRecharge();
			},

			cancelChangeMoney() {
				this.amount = 100;
				this.clear();
			},

			clear() {
				this.showChangeMoney = false;
				this.changeMoneyData = {}; 
			},

			nextShowRandomNums() {
				this.isShowSheet = false;
				this.isShowRandomNums = true;
				// this.amount = this.asyncNums[0];
			},

			goRecharge() {
				let item = JSON.parse(sessionStorage.getItem('recharge-item'))
				if (item) {
					if (this.amount < item.minMoneyY) {
						this.$toast(this.$$t('_3'))
						this.showChangeMoney = true
						this.changeMoneyData = item
						return
					}

					if (item.serviceType === 'tranbank') {
						if (this.amount <= 0) {
							this.$toast(this.$$t('toast_2'))
							return
						}
						this.$router.push({
							path: 'recharge/transferBank',
							query: {
								amount: this.amount
							}
						})
					} else if (item.serviceType === 'transcan') {
						this.$router.push({
							path: 'recharge/transferScanCode',
							query: {
								amount: this.amount
							}
						})
					} else {
						this.onMoneyType(item)
					}
				} else {
					this.$toast(this.$$t('toast_3'))
				}
			},

			onMoneyType(item) {
				let m_center = ''
				if (item.moneyType === '2') {
					// 随机小数
					let e = (Math.floor(Math.random() * 90) + 10) / 100
					this.amount += e
					m_center = this.$$t('m_center_1', {
						money: this.amount
					})
				} else if (item.moneyType === '3') {
					// 固定金额
					let v = item.moneyValue.split(',')
					for (let i = 0; i < v.length; i++) {
						if (Number(v[i]) >= Number(this.amount)) {
							this.amount = Number(v[i])
							break
						}
					}

					if (Number(this.amount) > Number(v[v.length - 1])) this.amount = Number(v[v.length - 1])
					m_center = this.$$t('m_center_2', {
						moneyValue: item.moneyValue,
						money: this.amount
					})
				} else if (item.moneyType === '4') {
					// 整数
					if (Math.floor(this.amount) !== Number(this.amount)) {
						this.$info(this.$$t('m_center_3'))
						return
					}

					this.onlineDeposit()
					return
				} else {
					this.onlineDeposit()
					return
				}

				this.$dialog.confirm({
						title: this.$t('common.point'),
						message: m_center,
					})
					.then(() => {
						// on confirm
						this.onlineDeposit()
					})
					.catch(() => {
						// on cancel
						this.amount = 100
					});
			},

			getType(e) {
				if (e.tag === 'hot') return 'danger'
				else return 'warning'
			},

			changeXnhb(item) {
				this.xnhb = item.currencyCode
				const t = this.protocols[0];
				this.rechargeItem = t;
				this.xnhNumber = this.asyncNums[0];
			},

			changePayChanne(item) {
				this.protocolId = item.objId
			},

			activeItem(item) {
				this.rechargeItem = item
				sessionStorage.setItem('recharge-item', JSON.stringify(item))
			},

			closeSheet() {
				sessionStorage.removeItem('recharge-item')
				this.rechargeItem = null
				if (this.rechargeType === 'yhzh') {
					this.$refs.yhzh.radio = null
				} else {
					this.$refs.scan.radio = null
				}
			},

			uniqueCurrencyCode(arr) {
				for (let i = 0; i < arr.length; i++) {
					for (let j = i + 1; j < arr.length; j++) {
						if (arr[i].currencyCode === arr[j].currencyCode) { //第一个等同于第二个，splice方法删除第二个
							arr.splice(j, 1);
							j--;
						}
					}
				}
				return arr;
			},

			InputValue(e) {
				this.amount = Number(e)
				this.amountarr.forEach((item, i) => {
					if (this.amount === item) this.index = i
				})
			},

			setType(t) {
				// xnhb : 数字货币
				if (t === 'xnhb') {
					const t = this.protocols.find(e => e.objId === this.protocolId);
					if (this.xnhbCurrencyCodes.length < 1 || !t) {
						this.$info(this.$$t('notOPen'))
						return
					}
					this.rechargeItem = t;
					this.xnhNumber = this.asyncNums[0];
				}
				this.type = t
			},

			// 数字货币切换协议
			switchProtocols(id) {
				this.protocolId = id;
				const t = this.protocols.find(e => e.objId === id);
				this.rechargeItem = t;
				this.xnhNumber = this.asyncNums[0];
			},

			$$t(v, p) {
				return this.$t('recharge.' + v, p)
			}
		},
	}
</script>

<style lang="less">
	#recharge {
		text-align: left;

		p {
			font-size: 14px;
			color: #333;
			display: flex;
			align-items: center;
			margin-bottom: 4px;

			span {
				width: 4px;
				height: 12px;
				background-color: #e02020;
				margin-right: 4px;
				display: block;
			}
		}

		.recharge-t {
			border-radius: 0 0 24px 24px;
			background-color: #fff;
			padding: 12px 16px 4px;

			.van-field {
				height: 44px;
				border-radius: 8px;
				background-color: #f5f5f9;
				width: 100%;
				font-size: 16px;
				padding-left: 16px;
			}

			ul {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				margin-top: 16px;

				li {
					width: 109px;
					height: 40px;
					border-radius: 22px;
					border: solid 1px #cccccc;
					font-size: 16px;
					color: #000;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 12px;
				}

				.active {
					background-image: linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255));
					color: #fff;
					border: none;
				}
			}
		}

		.randomNums-pop {
			min-height: 358px;
			padding: 15px;
			ul li {
				font-size: 14px;
				width: 27%;
				min-width: 90px;
				margin: 5px 10px;
			}
		}

		.recharge-b {
			margin-top: 24px;

			.recharge-content {
				position: absolute;
				top: 330px;
				right: 0;
				left: 0;
				bottom: 12px;

				.recharge-warps {
					width: 100%;
					height: 100%;
				}

				.van-cell {
					.van-icon {
						margin-right: 8px;
					}

					.van-icon-arrow {
						margin-right: unset;
					}
				}

				.van-cell:last-child {
					border-bottom: unset;
				}
			}
		}

		.xnhb {
			position: absolute;
			top: 68px;
			right: 0;
			left: 0;
			bottom: 0;
		}

		.xnhb-top,
		.xnhb-b {
			/deep/ .van-field {
				font-size: 16px;
				border-radius: 8px;
				background-color: #f5f5f9;
				width: 100%;
			}

			.van-field {
				border-radius: 0.21333rem;
				background-color: #f5f5f9;
			}

			.items {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				margin: 10px 0;

				.item {
					border: solid 1px rgb(238, 238, 238);
					font-size: 14px;
					margin-right: 8px;
					margin-bottom: 12px;
				}

				.num-item {
					width: 93px;
					text-align: center;
					line-height: 36px;
					border: solid 1px rgb(238, 238, 238);
					font-size: 14px;
					margin: 5px 10px;
				}

				.item_active {
					position: relative;
					color: rgb(63, 128, 252);
					border: solid 2px rgb(63, 128, 252);
				}

				.item_active:after { 
					position: absolute;
					right: -1px;
					bottom: -1px;
					content: '';
					display: block;
					background: url(/images/recharge/active.png) 0 0/100% 100% no-repeat;
					width: 16px;
					height: 16px;
				}
			}
		}

		.van-popup {
			.van-action-sheet__header {
				font-size: 18px;
				font-weight: bold;
				color: #333333;
				height: 44px;
				padding: 9px 0;
				line-height: normal;
			}

			.van-notice-bar__content {
				font-size: 12px;
			}

			.van-action-sheet__content {
				padding-bottom: 36px;
			}

			.van-notice-bar {
				height: 44px;
			}

			.notice-yh {
				padding: 0 32px;
			}

			button {
				height: 44px;
				border-radius: 22px;
				background-image: linear-gradient(to left, rgb(154, 187, 255), rgb(70, 132, 255) 100%);
				width: 343px;
				border: none;
				margin: 20px auto 0;
				display: block;
				font-size: 16px;
				color: #ffffff;
			}

			.recharge-aisle {
				height: 260px;
				overflow: hidden;
				padding: 0 16px;
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
