<template>
	<div id="lotteryLobby" class="background-white">
		<div class="px-3 pt-5">
			<van-tree-select :items="items" :main-active-index.sync="active" @click-nav="changeNav">
				<template #content>
					<!-- 两端对齐 -->
					<div class="lobby-box">
						<scroller>
							<van-row type="flex">
								<template v-for="(item, index) in lotteries">
									<van-col span="8" :key="index" @click="goLottery(item)" class="mb-6">
										<van-image :src="getLotteryImage(item.icon)" width="1.6rem" height="1.6rem">
											<template v-slot:loading>
												<van-loading type="spinner" size="22" />
											</template>
										</van-image>
										<div class="body-2 mt-1">{{item.name}}</div>
									</van-col>
								</template>
							</van-row>
						</scroller>
					</div>
				</template>
			</van-tree-select>
		</div>
	</div>
</template>

<script>
	export default {
		name: "LotteryLobby",

		data: () => ({
			active: 0,
			items: [],
			lotteries: []
		}),

		created() {
			let codeIndex = sessionStorage.getItem('group_code_index')
			this.onGetGroup(codeIndex)
		},

		methods: {
			onGetGroup(codeIndex) {
				this.showProgress()
				this.$get('/api/Lottery/GetGroup')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.items = d.map(e => {
							return {
								text: e.name ,
								lotteries: e.lotteries,
								type: e.type
							}
						})

						if (this.skgCode === this.skyLotteryCode){
							this.items.splice(0,0,{
								text: this.$t('dashboard.hot') + this.$t('lottery.title'),
								lotteries: this.$sessionGet('gamePlatformsLottery'),
								type: 'hot'
							})
						}

						this.active = codeIndex || 0
						if (sessionStorage.getItem('rules_code')) {
							this.active = this.items.findIndex((item) => item.type === sessionStorage.getItem('rules_code'))
							this.active = this.active === -1 ? 0 : this.active;
						}
						this.lotteries = this.items[this.active].lotteries
						this.changeNav(this.active)
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			changeNav(v) {
				sessionStorage.setItem('group_code_index', v)
				sessionStorage.setItem('rules_code', this.items[v].type)
				this.lotteries = this.items[v].lotteries
			},


		goLottery(item) {
			let code
			if (this.skgCode === this.skyLotteryCode && this.active === 0) {
				const mapData = JSON.parse(sessionStorage.getItem('gameCategorysLottery'))
				const curBigType = mapData.find(t => t.type === item.type).bigType
				sessionStorage.setItem('rules_code', curBigType)
			} else {
				code = sessionStorage.getItem('rules_code')
				if (!code) sessionStorage.setItem('rules_code', this.items[0].type)
			}

			const specialTyps = ['PK10','K3', 'SSC', 'Mark6']
        
				if (specialTyps.indexOf(code) > -1) {
					sessionStorage.removeItem('current_lottery')
					sessionStorage.removeItem("second_title");
					sessionStorage.setItem('gameCode_item', item.type)
					if (code === 'SSC') this.$router.push('ssc')
					else if (code === 'VNSouth') this.$router.push('vnsouth')
					else if (code === 'Mark6') this.$router.push('mark6')
					else this.$router.push('PK10')
					return
				}
				sessionStorage.setItem('gameCode_item', item.type)
				this.$router.push('lottery')
			}
		},

		beforeRouteLeave(to, form, next) {
			if (to.name === 'dashboard') {
				sessionStorage.removeItem('group_code_index')
				sessionStorage.removeItem('rules_code')
			}
			next()
		}
	}
</script>

<style lang="less" scoped>
	#lotteryLobby {
		height: 100%;

		.lobby-box {
			position: absolute;
			left: 30vw;
			right: 0;
			height: 80vh;
			width: 70%;
		}

		/deep/ .van-tree-select {
			height: unset !important;
			min-height: 300px !important;

			.van-tree-select__nav {
				background-color: white !important;
			}

			.van-sidebar-item {
				width: 100px;
				height: 48px;
				text-align: center;
				background-image: url("/images/lottery/lotteryLobby/nav_bg.png");
				background-size: 100% 100%;
				background-color: white;
				margin-bottom: 12px;
			}

			.van-sidebar-item--select {
				background-image: url("/images/lottery/lotteryLobby/nav_bg_active.png");
				color: white;
			}

			.van-sidebar-item--select::before {
				width: 0 !important;
				height: 0 !important;
			}

			//修改左侧宽度
			.van-tree-select__content {
				flex: 2 !important;
			}

			.van-sidebar-item__text {
				width: 80px;
				height: 20px;
				word-wrap: break-word;
				word-break: keep-all;
				white-space: initial;
				line-height: 20px;
				text-overflow: unset;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>
