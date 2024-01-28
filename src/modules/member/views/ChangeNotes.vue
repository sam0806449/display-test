<template>
	<div id="changeNotes">
		<van-dropdown-menu active-color="rgb(70 132 255)">
			<van-dropdown-item :title="dropdownTitle" ref="type">
				<div class="dropdown-warp">
					<div class="title">{{$$t('chooseType')}}</div>
					<div class="btns">
						<div class="btn van-ellipsis" :class="{active: recordType === type.value}"
							v-for="(type, index) in typeOptions" :key="index" @click="typeClick(type)">
							<span>{{type.text}}</span>
						</div>
					</div>
				</div>
			</van-dropdown-item>
			<van-dropdown-item v-model="date" :options="dateOptions" />
		</van-dropdown-menu>

		<div class="changeNotes-content">
			<scroll-view :onRefresh="onRefresh" :loadMore="onLoadMore">
				<div v-if="items.length > 0">
					<template v-for="(item, index) in items">
						<div :key="index">
							<div class="changeNotes-list" @click="goDetails(item)">
								<div class="changeNotes-list-t">
									<div>
										{{item.recordTypeDesc}}
									</div>
									<span
										:class="{profit_win: Number(item.money)>0}">{{item.currencySymbol}}{{item.money}}{{item.currencyDenomination}}</span>
								</div>
								<div class="changeNotes-list-b">
									<span>{{item.createTime}}</span>
									<span>{{$$t('balance')}}：{{item.currencySymbol}}{{item.afterBalance}}{{currencyDenomination}}</span>
								</div>
							</div>
							<van-divider style="margin: 0; padding: 0 16px;background-color: white;" />
						</div>
					</template>
				</div>

				<van-empty v-else :description="$t('common.noMore')" class="text-center">
					<template #image>
						<van-image src="/images/empty/no-more.png" width="280" height="130" />
					</template>
				</van-empty>
			</scroll-view>
		</div>
	</div>
</template>

<script>
	import {
		dateFormat,
		beforeByMonth,
		beforeByDay
	} from '@/common/js/dateUtil'

	export default {
		name: 'ChangeNotes',

		data() {
			return {
				date: 1,
				dropdownTitle: this.$t('common.all'),
				items: [],
				refresh: false,
				pageIndex: 1,
				recordType: ''
			}
		},

		computed: {
			startDate() {
				// beforeByDay
				if (this.date === 30) return dateFormat(beforeByMonth(new Date(), 1), 'yyyy-MM-dd')
				else if (this.date === 7) return dateFormat(beforeByDay(new Date(), 7), 'yyyy-MM-dd')
				else if (this.date === 3) return dateFormat(beforeByDay(new Date(), 2), 'yyyy-MM-dd')
				else if (this.date === 2) return dateFormat(beforeByDay(new Date(), 1), 'yyyy-MM-dd')
				else return dateFormat(beforeByDay(new Date(), 0), 'yyyy-MM-dd')
			},

			typeOptions() {
				if (this.skgCode === this.skgGameCode) {
					return [{
							text: this.$t('common.all'),
							value: ''
						},
						{
							text: this.$$t('type_1'),
							value: 1
						},
						{
							text: this.$$t('type_2'),
							value: 2
						},
						{
							text: this.$$t('type_3'),
							value: 3
						},
						{
							text: this.$$t('type_4'),
							value: 4
						},
						{
							text: this.$$t('type_5'),
							value: 5
						},
						{
							text: this.$$t('type_6'),
							value: 6
						},
						{
							text: this.$$t('type_7'),
							value: 7
						},
						{
							text: this.$$t('type_8'),
							value: 8
						}
					]
				} else {
					return [{
							text: this.$t('common.all'),
							value: ''
						},
						{
							text: this.$$t('type_1'),
							value: 1
						},
						{
							text: this.$$t('type_2'),
							value: 2
						},
						{
							text: this.$$t('type_3'),
							value: 3
						},
						{
							text: this.$$t('type_4'),
							value: 4
						},
						{
							text: this.$$t('type_6'),
							value: 6
						},
						{
							text: this.$$t('type_7'),
							value: 7
						},
						{
							text: this.$$t('type_8'),
							value: 8
						}
					]
				}
			},

			dateOptions() {
				return [{
						text: this.$$t('nearlyAMonth'),
						value: 30
					},
					{
						text: this.$$t('nearlySevenDays'),
						value: 7
					},
					{
						text: this.$$t('nearlyTwoDays'),
						value: 3
					},
					{
						text: this.$$t('yesterday'),
						value: 2
					},
					{
						text: this.$$t('today'),
						value: 1
					}
				]
			},

			endDate() {
				let d = Number(this.date)
				if (d === 7 || d === 1 || d === 30) return dateFormat(new Date(), 'yyyy-MM-dd')
				else return dateFormat(beforeByDay(new Date(), Number(d - 1)), 'yyyy-MM-dd')
			}
		},

		watch: {
			date() {
				this.items = []
				this.pageIndex = 1
				this.onRefresh()
			}
		},

		activated() {
			this.dropdownTitle = this.typeOptions.filter(e => e.value === this.recordType)[0].text
			this.onRefresh()
		},

		methods: {
			onLoad(done) {
				let url =
					`/api/Account/GetMoneyRecord?recordType=${this.recordType}&pageSize=10&pageIndex=${this.pageIndex}&startDate=${this.startDate}&endDate=${this.endDate}`
				this.showProgress()
				this.$post(url)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.pageIndex = this.pageIndex + 1
						if (this.refresh) {
							this.items = []
							this.items = d.items
							if (done) {
								this.refresh = false
								done()
							}
						} else {
							if (d.items.length > 0) {
								this.items.push(...d.items)
								if (done) done(false)
							} else {
								if (done) done(true)
							}
						}
						this.showProgress(false)
					})
					.catch(error => {
						if (done) done(true)
						this.showProgress(false)
						this.procError(error)
					})
			},

			onLoadMore(done) {
				this.refresh = false
				this.onLoad(done)
			},

			onRefresh(done) {
				this.refresh = true
				this.pageIndex = 1
				this.onLoad(done)
			},

			typeClick(e) {
				this.dropdownTitle = e.text
				this.recordType = e.value
				this.pageIndex = 1
				this.items = []
				this.onRefresh()
				this.$refs.type.toggle()
			},

			goDetails(item) {
				sessionStorage.setItem('Note-Data', JSON.stringify(item))
				this.$router.push('changeNotes/details')
			},

			$$t(v) {
				return this.$t('changeNotes.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#changeNotes {
		text-align: left;

		.dropdown-warp {
			padding: 12px 12px 0 12px;

			.active {
				background: url("/images/task/dropdown-menu.png") no-repeat;
				background-size: 100% 32px;

				span {
					color: white !important;
				}
			}

			.title {
				height: 20px;
				line-height: 20px;
				font-size: 14px;
				font-weight: 500;
				text-align: left;
				color: #333333;
			}

			.btns {
				margin-top: 12px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.btn {
					width: 115px;
					height: 32px;
					margin-bottom: 12px;
					border-radius: 16px;
					background-color: #f5f5f9;
					text-align: center;
					padding: 8px 0;

					span {
						height: 16px;
						font-size: 12px;
						line-height: 16px;
						text-align: center;
						color: #333333;
					}
				}
			}

			.btns:after {
				display: block;
				content: "";
				width: 30%;
				height: 0px;
			}
		}

		.changeNotes-content {
			overflow: hidden;
			position: absolute;
			width: 100%;
			bottom: 0;
			top: 44px;
			padding-top: 12px;

			.changeNotes-list {
				padding: 12px 16px;
				height: 64px;
				background-color: #ffffff;
				flex-direction: column;
				display: flex;
				justify-content: space-between;

				span {
					display: block;
				}

				div {
					display: flex;
				}

				.changeNotes-list-t {
					height: 20px;
					justify-content: space-between;
					align-items: center;

					.profit_win {
						color: red;
					}

					span {
						height: 20px;
						font-size: 14px;
						font-weight: bold;
						text-align: right;
						color: #333333;
					}

					div {
						height: 20px;
						font-size: 14px;
						font-weight: 500;
						color: #333333;
					}
				}

				.changeNotes-list-b {
					margin-top: 4px;
					justify-content: space-between;
					align-items: center;

					span {
						height: 16px;
						font-size: 12px;
						line-height: 1.33;
						color: #666666;
					}
				}
			}
		}
	}
</style>
