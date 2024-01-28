<template>
	<div>
    <van-popup v-model="isShow"
		round 
		position="bottom" 
		class="allLotteryPop">
			<scroller>
				<div class="px-4 mt-5 pb-8">
					<template v-for="(item, index) in groupItems">
						<div :key="index">
							<div class="flex align-items-center mt-4">
								<van-icon :name="getLotteryImage(item.icon)" size="20" />
								<div class="subtitle-1 ml-2 name_before">{{item.name}}</div>
							</div>

							<van-row gutter="12" class="mt-3">
								<template v-for="(l, i) in item.lotteries">
									<van-col span="8" :key="i" class="mb-2"
										@click="changeLottery(l.type, item.type)">
										<div class="Lottery_items" :class="{active_lottery: l.type === lottery}">
											<span class="caption-bold" style="color: #777;">{{l.name}}</span>
										</div>
									</van-col>
								</template>
							</van-row>
						</div>
					</template>
				</div>
			</scroller>
		</van-popup>
	</div>
</template>

<script>
export default {
  name: "AllLotteryPop",

	props: {
		showAllLotteryPop: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			lottery: '',
			groupItems: [],
		}
	},

	computed: {
		isShow: {
			get() {
				this.groupItemsMaker();
				return this.showAllLotteryPop;
			},
			set(val) {
				if (!val) {
					this.$emit('closeAllLotteryPop');
				}
			}
		}
	},

	methods: {
		groupItemsMaker() {
			this.lottery = sessionStorage.getItem('gameCode_item');
			const rules_code = sessionStorage.getItem('rules_code');
			let data = JSON.parse(sessionStorage.getItem('gameCategoryLotteryGroup'))
			.filter(t => t.type !== 'hot');
			// 当前彩种排第一个
			this.groupItems = data.sort(function(a,b) {
				if (a.type === rules_code) return -1;
				if (b.type === rules_code) return 1;
				else return 0;
			});
		},
		changeLottery(v) {
			// 检查当前页面
			if (v === this.lottery) {
				return
			}
			const old_rules_code = sessionStorage.getItem('rules_code')
			const old_gameCode_item = sessionStorage.getItem('gameCode_item')
			const tabbar = sessionStorage.getItem('tabbar')
			const mapData = JSON.parse(sessionStorage.getItem("gameCategorysLottery"));
			const curBigType = mapData.find(t => (t.type === v) && (t.bigType !== 'hot')).bigType;
			sessionStorage.setItem('rules_code', curBigType)
			sessionStorage.setItem('gameCode_item', v)

			if (sessionStorage.getItem('second_title')) {
				sessionStorage.removeItem('second_title');
			}
			if (sessionStorage.getItem(old_rules_code + '_second_title')) {
				sessionStorage.removeItem(old_rules_code + '_second_title');
			}
			
			if (old_rules_code === curBigType && old_gameCode_item !== v) {
				return window.location.reload();
			}
			if (['K3','PK10'].indexOf(old_rules_code) > -1 && ['K3','PK10'].indexOf(curBigType) > -1) {
				return window.location.reload();
			}
			if (curBigType === 'PK10' || v === 'xyft' || curBigType === 'K3') {
				return this.$router.push('PK10');
			}
			if (curBigType === 'SSC') {
				return this.$router.push('ssc');
			}
			if (curBigType === 'VNSouth') {
				return this.$router.push('vnsouth');
			}
			if (curBigType === 'Mark6') {
				return this.$router.push('mark6');
			}
			// 如果已经在 lottery 页面，刷新就行
			if (tabbar === 'lottery') {
				return window.location.reload();
			}
			this.$router.push({name: 'lottery'})
		}
	}
}
</script>

<style lang="less">
.allLotteryPop {
		height: 60%;

		.name_before {
			color: #666;
		}

		.active_lottery {
			background-color: rgb(91, 127, 251) !important;

			span {
				color: white !important;
			}
		}

		.Lottery_items {
			height: 32px;
			border: solid 1px #f2f2f2;
			border-radius: 15px;
			text-align: center;
			line-height: 32px;
		}
	}
</style>

