<template>
	<!--  我的下级  -->
	<div id="subordinateAgent">
		<van-tabs v-model="active" animated swipeable title-active-color="rgb(64, 128, 255)"
			title-inactive-color="rgb(153, 153, 153)" color="rgb(64, 128, 255)">
			<van-tab :title="$$t('tab_1')" name="agent">
				<div class="agent-warps">
					<scroll-view>
						<div class="text-grey_1 text-left body-2 px-3 py-1 mt-3 flex space-between align-items-center">
							<div>{{$$t('set')}}</div>
							<div class="main-text" @click="showCalculate=true">{{$$t('calculate')}}</div>
						</div>
						<div class="text-left">
							<van-cell :title="$$t('batch')"
								:label="$$t('batchLabel', {stepperNumber: stepperNumber, scope: getScope(platformCommisonRate, stepperNumber) })"
								center>
								<van-stepper v-model="stepperNumber" min="0" :max="platformCommisonRate" step="0.1"
									:decimal-length="1" async-change @change="onChangeRate" />
							</van-cell>
						</div>

						<div class="text-left mt-3">
							<van-collapse accordion v-model="activeNames">
								<van-collapse-item :name="group.type" v-for="group in groupItems" :key="group.type">
									<template #title>
										<div class="flex align-items-center">
											<van-icon :name="getImage(group.icon)" size="18" class="mr-1" />
											<div class="subtitle-1">{{group.name}}</div>
										</div>
									</template>
									<van-cell :title="item.name" v-for="(item, index) in group.lotteries" :key="index"
										:label="$$t('batchLabel', {stepperNumber: item.rebate, scope: getScope(item.maxRebate, item.rebate)})">
										<van-stepper v-model="item.rebate" min="0" :max="item.maxRebate" step="0.1"
											:decimal-length="1" />
									</van-cell>
								</van-collapse-item>
							</van-collapse>
						</div>
					</scroll-view>
				</div>
			</van-tab>

			<van-tab :title="$$t('tab_2')" name="intr">
				<div class="background-white py-2 text-grey_1">
					<van-row type="flex" justify="space-between">
						<van-col span="8"><span>{{$$t('invitationCode')}}</span></van-col>
						<van-col span="8"><span>{{$$t('regNumber')}}</span></van-col>
						<van-col span="8"><span>{{$$t('creationTime')}}</span></van-col>
					</van-row>
				</div>

				<div class="intr-warps">
					<scroll-view>
						<div v-if="intrs.length > 0">
							<van-row type="flex" justify="space-between" v-for="(item, index) in intrs" :key="index"
								class="background-white py-3 hairline_bottom" @click="onShowSheet(item)">
								<van-col span="8"><span class="subtitle-1">{{item.intrId}}</span></van-col>
								<van-col span="6"><span class="subtitle-1">{{item.memberAmount}}</span></van-col>
								<van-col span="10"><span class="subtitle-1">{{item.createTime}}</span>
								</van-col>
							</van-row>
						</div>

						<van-empty v-else :description="$t('common.noMore')" class="text-center">
							<template #image>
								<van-image src="/images/empty/no-more.png" width="280" height="130" />
							</template>
						</van-empty>
					</scroll-view>
				</div>
			</van-tab>
		</van-tabs>

		<div class="nvaBtn px-4 py-2 background-white" v-if="active==='agent'">
			<van-button color="linear-gradient(to right, rgb(117, 162, 255), rgb(70, 132, 255))" class="radius-2" block
				@click="onCreateMemberIntr" :disabled="createDisabled">
				{{$$t('createdCode')}}
			</van-button>
		</div>

		<van-dialog v-model="showCalculate" :title="$$t('calculate')" confirmButtonColor="rgb(117, 162, 255)">
			<div class="text-left calculate px-4 pb-2 mt-3">
				<div class="body-2 mb-1">{{$$t('odds')}}</div>
				<van-field v-model="odds" type="number" />
				<div class="body-2 mt-2 mb-1">{{$$t('rebate')}}</div>
				<van-field v-model="rebate" type="number" />
				<div class="body-2 mt-2 mb-1">{{$$t('lowerOdds')}}</div>
				<van-field :value="lowerOdds" type="number" readonly />
			</div>
		</van-dialog>

		<van-action-sheet v-model="showSheet" :actions="actions" :cancel-text="$$t('cancel')" close-on-click-action
			@select="onSelectSheet" @cancel="onCancelSheet" />

		<van-popup v-model="showCommissions" round position="bottom" closeable class="commissions">
			<div class="subtitle-5 pt-4 py-2 text-center">
				{{$$t('rebateDetails')}}
			</div>
			<div class="background-white py-2 text-grey_1 px-2">
				<van-row type="flex" justify="space-between">
					<van-col span="8" class="van-ellipsis"><span>{{$$t('gamePlatformName')}}</span></van-col>
					<van-col span="8" class="van-ellipsis"><span>{{$$t('lvRebate')}}(%)</span></van-col>
					<van-col span="8" class="van-ellipsis"><span>{{$$t('lowerRebate')}}(%)</span></van-col>
				</van-row>
			</div>

			<div class="commissions-warps">
				<scroll-view>
					<van-row type="flex" justify="space-between" v-for="(item, index) in commissions" :key="index"
						class="background-white py-2 hairline_bottom">
						<van-col span="8"><span class="body-2">{{item.gamePlatformName}}</span></van-col>
						<van-col span="8"><span class="body-2">{{item.rebate}}</span></van-col>
						<van-col span="8"><span class="body-2">0-{{item.maxRebate}}</span></van-col>
					</van-row>
				</scroll-view>
			</div>
		</van-popup>

		<van-dialog v-model="showRemark" :title="$$t('remarks')" show-cancel-button
			confirmButtonColor="rgb(117, 162, 255)" @confirm="onSaveRemark">
			<div class="text-left remark px-4 pb-2 mt-3">
				<van-field v-model="remark" clearable maxlength="10" :placeholder="$$t('inputRemark')"
					show-word-limit />
			</div>
		</van-dialog>
	</div>
</template>

<script>
	import {
		ImagePreview
	} from 'vant';
	export default {
		name: 'SubordinateAgent',

		data() {
			return {
				active: 'agent',
				radio: '1',
				pageIndex: 1,
				membershipLevel: 1,
				stepperNumber: 0,
				platformCommisonRate: 0,
				defaultSets: [],
				intrs: [],
				showCalculate: false,
				createDisabled: false,
				odds: 0,
				rebate: 0,
				showSheet: false,
				intrIrtem: null,
				showCommissions: false,
				commissions: [],
				groupItems: [],
				activeNames: [],
				showRemark: false,
				remark: ''
			}
		},

		created() {
			this.onDefaultMemberIntr()
		},

		computed: {
			lowerOdds() {
				let e = Number(this.odds) - (Number(this.odds) * Number(this.rebate) / 98)
				return e === 0 ? 0 : e.toFixed(4)
			},

			actions() {
				return [{
						name: this.$$t('a_1'),
						code: '1'
					},
					{
						name: this.$$t('a_2'),
						code: '2'
					},
					{
						name: this.$$t('a_3'),
						code: '3'
					},
					{
						name: this.$$t('a_4'),
						code: '4'
					},
					{
						name: this.$$t('a_5'),
						code: '5'
					}
				]
			}
		},

		watch: {
			active(v) {
				if (v === 'intr') this.onGetMemberIntrPage()
				else this.onDefaultMemberIntr()
				this.stepperNumber = 0
			}
		},

		methods: {
			onGetGroup() {
				this.showProgress()
				this.$get('/api/Lottery/GetGroup')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.defaultSets.forEach((set) => {
							d.forEach((e) => {
								e.lotteries.forEach((lott) => {
									if (lott.type === set.gamePlatformCode) {
										lott.maxRebate = set.maxRebate
										lott.rebate = set.rebate
									}
								})
							})
						})

						this.groupItems = d
						this.activeNames = [d[0].type]
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			onCreateMemberIntr() {
				this.createDisabled = true
				let arrs = []
				this.groupItems.forEach(e => {
					arrs.push(...e.lotteries)
				})

				let p = arrs.map(e => {
					return {
						gamePlatformCode: e.type,
						rebate: Number(e.rebate)
					}
				})

				this.showProgress()
				this.$post('/api/MemberAgent/CreateMemberIntr', p)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(() => {
						this.createDisabled = false
						this.active = 'intr'
						this.showProgress(false)
					})
					.catch(error => {
						this.createDisabled = false
						this.showProgress(false)
						this.procError(error)
					})
			},

			onDefaultMemberIntr() {
				this.showProgress()
				this.$post('/api/MemberAgent/GetDefaultMemberIntrCommission')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.defaultSets = d
						this.platformCommisonRate = this.getMaxRebate(d)
						this.onGetGroup()
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			onGetMemberIntrPage() {
				this.showProgress()
				this.$post('/api/MemberAgent/GetMemberIntrPage', {
						pageIndex: this.pageIndex,
						pageSize: 10
					})
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.intrs = d.items
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			onGetIntrCommission() {
				this.showProgress()
				this.$post(`/api/MemberAgent/GetMemberIntrCommission?intrId=${this.intrIrtem.intrId}`)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.commissions = data.data
						this.showCommissions = true
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			onLoadRemark() {
				this.showProgress()
				this.$post(`/api/MemberAgent/GetMemberIntrIRemark?intrId=${this.intrIrtem.intrId}`)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.remark = data.data
						this.showRemark = true
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			onSaveRemark() {
				this.showProgress()
				this.$post('/api/MemberAgent/SaveMemberIntrIRemark', {
						intrId: this.intrIrtem.intrId,
						remark: this.remark
					})
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.showRemark = false
						this.$info(data.data)
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			getScope(r, s) {
				if (Number(s) > Number(r)) return 0
				else return (Number(r) - Number(s)).toFixed(1)
			},

			onChangeRate(e) {
				if ((Number(e) <= Number(this.platformCommisonRate))) {
					this.stepperNumber = e
				}

				this.groupItems.forEach((g) => {
					g.lotteries.forEach(v => {
						if (Number(e) <= Number(v.maxRebate)) v.rebate = Number(e)
						else v.rebate = Number(v.maxRebate)
					})
				})
			},

			onShowSheet(e) {
				this.intrIrtem = e
				this.showSheet = true
			},

			onSelectSheet(e) {
				if (!this.intrIrtem) return
				if (e.code === '1') this.copyBtnClick(this.intrIrtem.intrId)
				else if (e.code === '2') this.copyBtnClick(this.intrIrtem.fullIntrUrl)
				else if (e.code === '3') ImagePreview({
					images: [`/api/MemberAgent/GetMemberIntrImage?intrId=${this.intrIrtem.intrId}`],
					closeable: true
				});
				else if (e.code === '4') this.onGetIntrCommission()
				else if (e.code === '5') this.onLoadRemark()
			},

			onCancelSheet() {
				this.intrIrtem = null
			},

			getMaxRebate(e) {
				let arrs = e.map((v) => {
					return v.maxRebate
				})

				return Math.max(...arrs)
			},

			getImage(icon) {
				return this.siteConfig && this.siteConfig.imgPath + '/common/img/slots/SGLottery/' + icon
			},

			$$t(v, p) {
				return this.$t('subordinateAgent.' + v, p)
			}
		}
	}
</script>

<style lang="less" scoped>
	#subordinateAgent {
		height: 100%;

		/deep/ .van-tabs {
			height: 100%;
		}

		/deep/ .van-tabs__wrap {
			border-bottom: solid 1px #f5f6f7;
		}

		/deep/ .van-tabs__content {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 43px;
		}

		.agent-warps {
			overflow: hidden;
			position: absolute;
			width: 100%;
			bottom: 60px;
			top: 0;
		}

		.intr-warps {
			overflow: hidden;
			position: absolute;
			width: 100%;
			bottom: 60px;
			top: 34px;
		}

		.nvaBtn {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
		}

		.hairline_bottom {
			border-bottom: 0.5px solid #f5f5f9;
		}

		.calculate {
			.van-field {
				height: 44px;
				border-radius: 8px;
				background-color: #f5f5f9;
				width: 100%;
				font-size: 14px;
			}
		}

		.remark {
			.van-field {
				border-radius: 8px;
				background-color: #f5f5f9;
				width: 100%;
				font-size: 14px;
			}
		}

		.commissions {
			height: 60%;

			.commissions-warps {
				overflow: hidden;
				position: absolute;
				width: 100%;
				bottom: 0;
				top: 78px;
			}
		}
	}
</style>
