<template>
	<div id="subordinateDetails">
		<scroller>
			<div class="pb-3">
				<div class="px-4 flex space-between align-items-center pt-4 pb-3">
					<div class="flex align-items-center">
						<van-image round fit="cover" width="42" height="42" src="/images/account/user.png" />
						<div class="subtitle-1 ml-3">{{subordinate && subordinate.memberAccount}}</div>
					</div>
					<div class="text-grey caption">{{formatDateSS(subordinate && subordinate.lastLoginTime)}}</div>
				</div>

				<div class="center">
					<div class="mt-3">
						<template v-for="(item, index) in infos">
							<van-cell :title="$$t(item.text)"
								:value="`${item.currency === false ? '' : currencySymbol}${teamReport && teamReport[item.code]}${currencyDenomination}`"
								:key="index" >
								<template>
									<div v-if="item.code === 'isUseable'" :style="{color: teamReport && teamReport[item.code] ? '#4ba1f9' : 'red'}">
										{{ teamReport && teamReport[item.code] ? $$t('enable') : $$t('disable') }}
									</div>
									<div v-else>{{item.currency === false ? '' : currencySymbol}}{{teamReport && teamReport[item.code]}}{{currencyDenomination}}</div>
								</template>
								</van-cell>
						</template>
					</div>
				</div>
			</div>
		</scroller>
	</div>
</template>

<script>
	export default {
		name: 'SubordinateDetails',

		data: () => ({
			infos: [
				{
					text: 'isUseable',
					code: 'isUseable',
					currency: false
				},
				{
					text: 'parent',
					code: 'parent',
					currency: false
				},
				{
					text: 'betBillAmount',
					code: 'betBillAmount',
					currency: false
				},
				{
					text: 'betBillMoney',
					code: 'betBillMoney'
				},
				{
					text: 'rechargeAmount',
					code: 'rechargeAmount',
					currency: false
				},
				{
					text: 'rechargeMoney',
					code: 'rechargeMoney'
				},
				{
					text: 'withdrawAmount',
					code: 'withdrawAmount',
					currency: false
				},
				{
					text: 'withdrawMoney',
					code: 'withdrawMoney'
				},
				{
					text: 'balance',
					code: 'balance'
				},
				{
					text: 'totalWin',
					code: 'totalWin'
				},
				{
					text: 'totalLoss',
					code: 'totalLoss'
				},
				{
					text: 'totalProfit',
					code: 'totalProfit'
				}
			],
			subordinate: null,
			teamReport: {}
		}),

		activated() {
			this.subordinate = this.$sessionGet('subordinate-item')
			let startDate = sessionStorage.getItem('startDate')
			let endDate = sessionStorage.getItem('endDate')
			let p = {
				memberAccount: this.subordinate.memberAccount,
				startDate: startDate,
				endDate: endDate
			}
			this.onLoad(p)
		},

		methods: {
			onLoad(p) {
				this.showProgress()
				this.$post(
						`/api/MemberAgent/GetMemberAgentDetails?memberAccount=${p.memberAccount}&startDate=${p.startDate}&endDate=${p.endDate}`
					)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.teamReport = data.data
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			$$t(v) {
				return this.$t('subordinateDetails.' + v)
			}
		},

		beforeRouteLeave(to, form, next) {
			sessionStorage.removeItem('subordinate-item')
			next()
		}
	}
</script>

<style lang="less" scoped>
	#subordinateDetails {
		text-align: left;

		.center {
			>.van-cell:first-child {
				border-top-right-radius: 20px;
				border-top-left-radius: 20px;
			}
		}
	}
</style>
