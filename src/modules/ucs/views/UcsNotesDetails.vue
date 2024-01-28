<template>
	<div id="ucsNotesDetails" class="text-left mt-3">
		<scroller>
			<div class="px-3 pt-4 pb-5">
				<div class="top background-white pb-1 radius-1">
					<div class="top_img">
						<van-image :src="`/images/ucs/${getstatusImg}.png`"
							width="44" class="status_img"></van-image>
					</div>

					<div class="mt-4 text-center subtitle-5">{{currencySymbol}}{{item && item.money}}{{currencyDenomination}}</div>

					<div class="px-4 mt-5">
						<div class="match_info py-4 text-center radius-1">
							<div class="subtitle-1">{{item && item.leagueName}}</div>
							<div class="mt-4 flex align-items-center justify-content-center caption">
								<div class="text_color mr-3">{{item && item.homeTeamName}}</div>
								<div class="mr-3">
									<van-image src="/images/ucs/vs.png" width="14" height="10"></van-image>
								</div>
								<div class="text_color">{{item && item.awayTeamName}}</div>
							</div>
						</div>
					</div>

					<div class="mt-6">
						<van-cell title-class="text_cell" value-class="text_cell" :title="$$t('dropScore')"
							:value="`${item && item.isFirstHalf ? $$t('half') : $$t('full')} ${item && item.dropScore}`" />
						<van-cell title-class="text_cell" value-class="text_cell" :title="$$t('odds')"
							:value="`${item && item.odds}%`" />
						<van-cell title-class="text_cell" value-class="text_cell" :title="$$t('startTime')"
							:value="item && item.startTime" />
						<van-cell title-class="text_cell" value-class="text_cell" :title="$$t('fullTimeScore')"
							:value="`${item && item.isFirstHalf ? item && item.halfTimeScore || '——' : item && item.fullTimeScore  || '——'}`" />
					</div>
				</div>

				<div class="mt-3 radius-1">
					<van-cell title-class="text_cell" value-class="text_cell" :title="$$t('money')"
						:value="`${currencySymbol}${item && item.money}${currencyDenomination}`" />
					<van-cell title-class="text_cell" value-class="text_cell" :title="$$t('handlingFee')" :value="`${currencySymbol}${item && item.handlingFee}${currencyDenomination}`" />
					<van-cell title-class="text_cell" value-class="text_cell" :title="$$t('createTime')"
						:value="item && item.createTime" />
					<van-cell title-class="text_cell" value-class="text_cell" :title="$$t('orderId')"
						:value="item && item.orderId">
						<van-icon name="/images/gamebet/copy.png" class="ml-2" size="20" slot="right-icon"
							@click="copyBtnClick(item && item.orderId)" />
					</van-cell>
				</div>

				<div class="mt-6" v-if="Number(item.status) === 0">
					<van-button color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block round
						@click="onRevoke">
						<span class="subtitle-5">{{$$t('revoke')}}</span>
					</van-button>
				</div>
			</div>
		</scroller>
	</div>
</template>

<script>
	export default {
		name: 'UcsNotesDetails',

		data: () => ({
			item: {}
		}),


		created() {
			this.item = this.$sessionGet('uscDetails-data')
		},
		
		computed: {
			getstatusImg () {
				let e = ''
				let status = Number(this.item && this.item.status)
				if (status === 0) e = 'confirm'
				else if (status === 1) e = 'win'
				else if (status === 2) e = 'lose'
				else e = 'revoke'
				return e
			}
		},


		methods: {
			onRevoke() {
				this.$dialog.confirm({
						title: this.$t('common.point'),
						message: this.$$t('revoke_t'),
					})
					.then(() => {
						// on confirm
						this.showProgress()
						this.$get(`/api/Match/Revoke?orderId=${this.item.orderId}`)
							.then(resp => {
								return this.checkResp(resp, (r) => r.data.success === true)
							})
							.then(data => {
								this.showProgress(false)
								this.$success(data.data)
								setTimeout(()=> {
									this.$router.back()
								}, 1000);
							})
							.catch(error => {
								this.showProgress(false)
								this.procError(error)
							})
					})
					.catch(() => {
						// on cancel
					});

			},

			$$t(v) {
				return this.$t('ucsNotesDetails.' + v)
			}
		},

		beforeRouteLeave(to, form, next) {
			sessionStorage.removeItem('uscDetails-data')
			next()
		},
	}
</script>

<style lang="less" scoped>
	#ucsNotesDetails {

		.text_color {
			color: #4d526b;
		}

		.text_cell {
			color: #4d526b;
			font-size: 14px;
			font-weight: 500;
		}

		.top {
			position: relative;
			height: 100%;

			.top_img {
				display: flex;
				justify-content: center;

				.status_img {
					margin-top: -10px;
					background-color: white;
					border-radius: 50%;

					/deep/ .van-image__img {
						margin-top: 2px !important;
					}
				}
			}

			.match_info {
				background-color: #f6f6f6;
			}

		}


	}
</style>
