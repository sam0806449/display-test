<template>
	<div id="service">
		<div class="view-background">
			<div class="view-background-flex">
				<div class="view-background-flex-top"></div>
				<div class="view-background-flex-bottom"></div>
			</div>
		</div>
		<scroller>
			<div class="warp">
				<div class="card-top text-left">
					<div class="card-top-warp pt-4 pl-4">
						<div class="icon mr-3">
							<van-image round lazy-load width="60" height="60" src="/images/service/avatar.png" />
						</div>
						<div>
							<div class="headline">{{$$t('welcome')}}</div>
							<div class="caption text-grey">{{$$t('welcome_1')}}</div>
						</div>
					</div>
				</div>

				<div class="kf">
					<van-row gutter="16" type="flex" justify="space-between">
						<van-col span="12">
							<van-button v-if="siteConfig && siteConfig.kfUrl"
								icon="/images/service/btn_icon.png"
								color="linear-gradient(to right, rgb(117, 162, 255), rgb(70, 132, 255))" block
								class="elevation-2" @click="linkOpen(siteConfig && siteConfig.kfUrl)">
								{{$$t('kf_1')}}
							</van-button>
						</van-col>
						<van-col span="12">
							<van-button v-if="siteConfig && siteConfig.kfqqUrl"
								class="main-text elevation-2" block
								@click="linkOpen(siteConfig && siteConfig.kfqqUrl)">
								{{$$t('kf_2')}}
							</van-button>
						</van-col>
					</van-row>

				</div>

				<div class="problem">
					<div class="title">
						{{$$t('s_title')}}
					</div>
					<van-collapse v-model="activeName" accordion :border="false">
						<van-collapse-item :title="$$t('g_title')" name="1" size="large" v-if="skgCode === skgGameCode && skgCodeKey !== 'SG666'">
							<van-cell :title="$$t('g_1')" is-link @click="redirectRouter('service/games/realbet')" />
							<van-cell :title="$$t('g_2')" is-link @click="redirectRouter('service/games/gaming')" />
							<div class="more main-text text-center mt-3" @click="redirectRouter('service/games')">
								{{$$t('g_more')}}
							</div>
							<template #icon>
								<van-icon name="/images/service/game.png" size="32" class="mr-2" />
							</template>
						</van-collapse-item>

						<van-collapse-item :title="$$t('a_title')" name="2" size="large">
							<van-cell :title="$$t('a_1')" is-link @click="redirectRouter('service/about/index')"
								v-if="skgCode === skgGameCode" />
							<van-cell :title="$$t('a_2')" is-link @click="redirectRouter('service/about/privacy')" />
							<div class="more main-text text-center mt-3" @click="redirectRouter('service/about')">
								{{$$t('g_more')}}
							</div>
							<template #icon>
								<van-icon name="/images/service/about.png" size="32" class="mr-2" />
							</template>
						</van-collapse-item>
					</van-collapse>
				</div>

				<div class="course">
					<div class="title">
						{{$$t('c_title')}}
					</div>
					<template v-for="(item, index) in courses">
						<van-cell :title="$$t(item.title)" center size="large" is-link :key="index"
							@click="redirectRouter(item.link)" />
					</template>
				</div>
			</div>
		</scroller>
	</div>

</template>

<script>
	import {
		getTokenFromCookie
	} from "@/utils/auth"
	export default {
		name: 'Service',

		data: () => ({
			activeName: '1'
		}),

		computed: {
			courses() {
				if (this.skgCode === this.skgGameCode) {
					return [{
							title: 'c_1',
							link: 'service/accounts'
						},
						{
							title: 'c_2',
							link: 'service/transfer'
						},
						{
							title: 'c_3',
							link: 'service/preferentialRules'
						},
						{
							title: 'c_4',
							link: 'service/browser'
						},
						{
							title: 'c_6',
							link: 'service/hijack'
						},
					]
				} else {
					return [{
							title: 'c_1',
							link: 'service/accounts'
						},
						{
							title: 'c_ucs',
							link: 'service/ucsRebate'
						},
						{
							title: 'c_3',
							link: 'service/preferentialRules'
						},
						{
							title: 'c_4',
							link: 'service/browser'
						},
						{
							title: 'c_6',
							link: 'service/hijack'
						},
					]
				}
			}
		},

		methods: {
			$$t(v) {
				return this.$t('service.' + v)
			}
		},

		beforeRouteEnter(to, from, next) {
			let siteConfig = JSON.parse(sessionStorage.getItem('SiteConfig'))
			if (siteConfig.codeKey === 'SGYABO') {
				if (getTokenFromCookie()) {
					next()
				} else {
					next('/login')
				}
			} else {
				next()
			}
		},
	}
</script>

<style lang="less" scoped>
	#service {
		height: 100%;

		.view-background {
			position: absolute;
			width: 100%;
			height: 100%;
			background: url('/images/banner/service_bg.png') no-repeat top right;
			background-size: 100% 300px;

			.view-background-flex {
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100%;

				.view-background-flex-top {
					flex: 1;
					background: url('/images/banner/service_bg.png') no-repeat top right;
					background-size: 100% 300px;
				}

				.view-background-flex-bottom {
					flex: 1;
					background: transparent;
				}
			}
		}

		.warp {
			height: 100%;
			background: url('/images/banner/service_bg.png') rgb(248, 250, 250) no-repeat top right;
			background-size: 100% 112px;
			padding: 10px 16px 0 16px;

			.card-top {
				border-radius: 8px;
				height: 120px;
				background: url('/images/banner/server-top.png') white no-repeat top right;
				background-size: 100% 120px;

				.card-top-warp {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
			}

			.kf {
				margin-top: 15px;
				margin-bottom: 15px;

				.van-button {
					border-radius: 6px;
				}
			}

			.problem {
				border-radius: 8px;
				background-color: white;
				text-align: left;

				/deep/ .van-cell--large .van-cell__title {
					line-height: 32px;
				}

				.title {
					padding: 10px 16px 16px 16px;
					font-size: 14px;
					font-weight: 600;
				}
			}

			.course {
				margin-top: 10px;
				background-color: white;
				text-align: left;
				border-radius: 8px;

				.title {
					padding: 10px 16px 16px 16px;
					font-size: 14px;
					font-weight: 600;
				}
			}
		}
	}
</style>
