<template>
	<div id="lotteryLobby" class="background-white">
		<div class="pt-1">
			<div class="btn-box">
				<vue-touch-scroll type="horizontal" hide-scrollbar class="flex">
					<div v-for="(categoryItem,i) in items" :key="i"
					@click="changeNav(i)" class="btn"
					:class="[{'btn-active': active === i},{'btn-disabled': loading && active !== i}]">
					{{categoryItem.text}}
					</div>
				</vue-touch-scroll>
			</div>
			<div class="lobby-box">
				<scroller>
					<van-row type="flex">
						<template v-for="(item, index) in lotteries">
							<van-col span="8" :key="index" @click="goLottery(item)" class="game-item">
								<van-image :src="getLotteryImage(item.icon)" width="1.6rem" height="1.6rem">
									<template v-slot:loading>
										<van-loading type="spinner" size="22" />
									</template>
								</van-image>
								<div class="body-2 mt-1">{{item.name}}</div>
								<van-count-down v-if="item.type.indexOf('js') === -1"  
								@finish="$_throttle(onGetGroup)"
								v-slot="{ days, hours, minutes, seconds }"
								:time="Number(item.lotteryTime.secondsRemaining) * 1000">
									<template v-if="days || hours">
										<span class="block"> 
											{{ +(days) === 0 && +(hours) &lt; 10 ? '0'+ hours : hours + days * 24 }}
										</span>
										<span class="colon">:</span>
									</template>
									<span class="block">
										<span v-if="+(minutes) < 10">0</span>{{ minutes }}
									</span>
									<span class="colon">:</span>
									<span class="block">
										<span v-if="+(seconds) < 10">0</span>{{ seconds }}
									</span>
								</van-count-down>
							</van-col>
						</template>
					</van-row>
					<!-- 佔位 -->
					<div style="width: 100%; height: 20vh" />
				</scroller>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "LotteryLobby",

		data: () => ({
			active: 0,
			items: [],
			lotteries: [],
			loading: false
		}),

		created() {
			this.onGetGroup();
		},

		methods: {
			onGetGroup() {
				if (this.loading) return;
				this.showProgress()
				this.loading = true
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
						this.active = Number(sessionStorage.getItem('group_code_index')) || 0;
						this.lotteries = this.items[this.active].lotteries
						this.changeNav(this.active)
						this.showProgress(false)
						this.loading = false
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
						this.loading = false
					})
			},

			changeNav(v) {
				const pre = Number(sessionStorage.getItem('group_code_index'));
				if (this.loading || v === pre ) return;
				this.active = v;
				sessionStorage.setItem('group_code_index', v);
				sessionStorage.setItem('rules_code', this.items[v].type);
				this.onGetGroup();
			},


		goLottery(item) {
			let code
			if (this.skgCode === this.skyLotteryCode && this.active === 0) {
				const mapData = JSON.parse(sessionStorage.getItem('gameCategorysLottery'))
				const curBigType = mapData.find(t => (t.type === item.type) && (t.bigType !== 'hot')).bigType;
				sessionStorage.setItem('rules_code', curBigType)
			} else {
				const mapData = JSON.parse(sessionStorage.getItem('gameCategorysLottery'));
				const curBigType = mapData.find(t => (t.type === item.type) && (t.bigType !== 'hot')).bigType;
				sessionStorage.setItem('rules_code', curBigType);
				code = curBigType;
			}
			const specialTyps = ['PK10','K3', 'SSC', 'VNSouth', 'Mark6']
        
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
		background-color: #ddd;

		.btn-box {
			display: flex;
			align-items: center;
			height: 50px;
			.btn {
				min-width: 100px;
				height: 48px;
				line-height: 48px;
				text-align: center;
				background-image: url("/images/lottery/lotteryLobby/nav_bg.png");
				background-size: 100% 100%;
				background-color: #ddd;
			}
			.btn-active {
				background-image: url("/images/lottery/lotteryLobby/nav_bg_active.png");
				color: white;
				opacity: 1;
			}
			.btn-disabled {
				opacity: 0.4;
			}
		}

		/deep/ .van-tabs {
			.van-tab {
				width: 100px;
				height: 48px;
				text-align: center;
				background-image: url("/images/lottery/lotteryLobby/nav_bg.png");
				background-size: 100% 100%;
				background-color: #ddd;
				margin-bottom: 2px;
			}

			.van-tabs__nav {
				background-color: #ddd;
			}

			.van-tab--active {
				background-image: url("/images/lottery/lotteryLobby/nav_bg_active.png");
				color: white;
			}

			.van-tabs__line {
				display: none;
			}
		}

		.lobby-box {
			position: absolute;
			width: 100%;
			height: calc(100vh - 100px);
			top: 53px;
			padding: 10px;
			background-color: #f5f5f9;
			.game-item {
				border: 1px solid #e9e9e9;
				padding: 15px;
				.colon {
					display: inline-block;
					margin: 0 4px;
					color: #000;
				}
				.block {
					display: inline-block;
					width: 22px;
					color: #fff;
					font-size: 12px;
					text-align: center;
					background-color: #333;
					border-radius: 3px;
					padding-top: 1px;
				}
			}
		}
	}
</style>
