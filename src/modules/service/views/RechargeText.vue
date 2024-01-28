<template>
	<div id="rechargeText" class="text-left">
		<van-tabs v-model="tabActive" ellipsis title-active-color="rgb(64, 128, 255)"
			title-inactive-color="rgb(153, 153, 153)" color="rgb(64, 128, 255)">
			<template v-for="(item, index) in activitys">
				<van-tab :title="$$t(item.title)" :name="item.name" :key="index" />
			</template>
		</van-tabs>

		<div class="warps background-white">
			<scroller>
				<div class="rules-text caption mt-2 px-3">
					<div v-if="tabActive==='binance'">
						<div>{{$$t('binance_1')}}</div>
						<van-image src="/images/service/binance/1.png" width="100%" height="100%" class="mt-2">
							<template v-slot:loading>
								<van-loading type="spinner" size="24" />
							</template>
						</van-image>

						<div class="mt-3">{{$$t('binance_2')}}</div>
						<van-image src="/images/service/binance/2.png" width="100%" height="100%" class="mt-2">
							<template v-slot:loading>
								<van-loading type="spinner" size="24" />
							</template>
						</van-image>

						<div class="mt-3">{{$$t('binance_3')}}</div>
						<van-image src="/images/service/binance/3.png" width="100%" height="100%" class="mt-2">
							<template v-slot:loading>
								<van-loading type="spinner" size="24" />
							</template>
						</van-image>

						<div class="mt-3">{{$$t('binance_4')}}</div>
						<div class="mt-1">{{$$t('binance_5')}}</div>
						<van-image src="/images/service/binance/4.png" width="100%" height="100%" class="mt-2">
							<template v-slot:loading>
								<van-loading type="spinner" size="24" />
							</template>
						</van-image>
					</div>

					<div v-else>
						<div>{{$$t('coinbase_1')}}</div>
						<van-image src="/images/service/coinbase/1.png" width="100%" height="100%" class="mt-2">
							<template v-slot:loading>
								<van-loading type="spinner" size="24" />
							</template>
						</van-image>

						<div class="mt-3">{{$$t('coinbase_2')}}</div>
						<van-image src="/images/service/coinbase/2.png" width="100%" height="100%" class="mt-2">
							<template v-slot:loading>
								<van-loading type="spinner" size="24" />
							</template>
						</van-image>

						<div class="mt-3">{{$$t('coinbase_3')}}</div>
						<van-image src="/images/service/coinbase/3.png" width="100%" height="100%" class="mt-2">
							<template v-slot:loading>
								<van-loading type="spinner" size="24" />
							</template>
						</van-image>

						<div class="mt-3">{{$$t('coinbase_4')}}</div>
						<div class="mt-1">{{$$t('coinbase_5')}}</div>
						<div class="mt-1">{{$$t('coinbase_6')}}</div>
						<van-image src="/images/service/coinbase/4.png" width="100%" height="100%" class="mt-2">
							<template v-slot:loading>
								<van-loading type="spinner" size="24" />
							</template>
						</van-image>

						<div class="mt-3">{{$$t('coinbase_7')}}</div>
						<van-image src="/images/service/coinbase/5.png" width="100%" height="100%" class="mt-2">
							<template v-slot:loading>
								<van-loading type="spinner" size="24" />
							</template>
						</van-image>

						<div class="mt-3">{{$$t('coinbase_8')}}</div>
						<div class="mt-1">{{$$t('coinbase_9')}}</div>
						<van-image src="/images/service/coinbase/6.png" width="100%" height="100%" class="mt-2">
							<template v-slot:loading>
								<van-loading type="spinner" size="24" />
							</template>
						</van-image>
					</div>
				</div>
			</scroller>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'RechargeText',

		data() {
			return {
				tabActive: 'binance',
				activitys: [{
						title: 'tab_1',
						name: 'binance'
					},
					{
						title: 'tab_2',
						name: 'coinbase'
					}
				]
			}
		},

		methods: {
			$$t(v) {
				return this.$t('rechargeText.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#rechargeText {
		height: 100%;

		.warps {
			position: absolute;
			top: 44px;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>
