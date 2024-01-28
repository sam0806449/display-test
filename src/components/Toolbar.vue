<template>
	<div id="page-toolbar">
		<van-nav-bar class="preferential" fixed safe-area-inset-top
			v-if="active==='preferential'">
			<template #title>
				<div class="radius-5 background-white preferential-title flex align-items-center">
					<div class="preferential-btn van-ellipsis" :class="{active: topActive==='preferential'}"
						@click="setTopActive('preferential')">
						{{$$t('preferential')}}
					</div>
					<div v-if="skgCode !== skyLotteryCode" class="preferential-btn van-ellipsis" :class="{active: topActive==='task'}" @click="setTopActive('task')">
						{{$$t('task')}}
					</div>
					<div class="preferential-btn van-ellipsis"  @click="redirectRouter('preferential/reviews')">
						{{$$t('progress')}}
					</div>
				</div>
			</template>

			<!-- <template #right>
				<span class="van-ellipsis" style="max-width: 50px;">{{$$t('progress')}}</span>
			</template> -->
		</van-nav-bar>

		<van-nav-bar class="member" fixed safe-area-inset-top :title="title" :border="false" @click-right="showReport"
			v-else-if="active==='member'">
			<template #right>
				<div class="report flex py-1" v-if="memberInfo && memberInfo.isOpenCheckIn">
					<div>
						<van-icon name="/images/toolbar/report.png" size="22" />
					</div>
					<div class="ml-2 caption white-text">{{$$t('reports')}}</div>
				</div>
			</template>
		</van-nav-bar>
		
		<van-nav-bar fixed safe-area-inset-top :title="title" :border="false"
			v-else-if="active==='ucs' || active === 'tournaments'">
			<template #right>
				<van-icon name="filter-o" size="22" @click="ucsRightClick" v-if="showFilter"/>
			</template>
			
			<template #left>
				<van-icon name="arrow-left" size="22" @click="leftClick" v-if="active === 'ucs'"/>
			</template>
		</van-nav-bar>

		<!-- XOSOVN	 -->
		<div class="XOSOVN"
			v-else-if="skgCodeKey && skgCodeKey === 'XOSOVN' && active==='dashboard'">
				<van-image :src="$portrait(siteConfig && siteConfig.logo && siteConfig.logo.homeLogo84)" height="28"
					width="106" v-if="active==='dashboard'">
					<template v-slot:loading>
						<van-loading type="spinner" size="20" />
					</template>
				</van-image>
			<div class="flex align-items-center">
				<van-button v-if="!memberData" type="info" color="#44d7b6" class="radius-2 mr-3" size="small" block @click="redirectRouter('/login')">
					{{$t('register.login')}}
				</van-button>
				<van-button v-if="!memberData" type="info" color="#32c5ff" class="radius-2 mr-3" size="small" block @click="redirectRouter('/register')">
					{{$t('agentRegister.btn')}}
				</van-button>
				<van-icon :name="meta && meta.leftIcon" size="22" @click="leftClick"
					:badge="messagesNumber" />
			</div>
		</div>

		<!-- S666 -->
		<div class="XOSOVN S666"
			v-else-if="skinCode && skinCode === 'S666' && active==='dashboard'">
			<div class="flex left-logo">
				<van-image fit="contain" :src="$portrait(siteConfig && siteConfig.logo && siteConfig.logo.homeLogo84)" height="28"
					width="100%" v-if="active==='dashboard'">
					<template v-slot:loading>
						<van-loading type="spinner" size="20" />
					</template>
				</van-image>
			</div>
			<div class="flex align-items-center">
				<div v-if="!memberData" class="flex align-items-center">
					<div class="mx-2" @click="redirectRouter('/login')">
						{{$t('register.login')}}
					</div>
					|
					<div class="mx-2" @click="redirectRouter('/register')">
						{{$t('agentRegister.btn')}}
					</div>
					|
				</div>
				<div v-else class="flex">
					<div class="memberName mr-2 ellipsis-1" @click="redirectRouter('/app/member')">
						{{memberData && memberData.memberAccount}}
					</div>
					|
				</div>
				<div class="lang" @click="redirectRouter('/app/changeLanguage')">
					<span class="ml-3 van-ellipsis">{{$$t('changeLanguage')}}</span>
				</div>
			</div>
		</div>

		<!-- SGYF -->
		<div class="XOSOVN SGYF"
			v-else-if="skgCodeKey && skinCode === 'SGYF' && active==='dashboard'">
				<div class="flex left-logo">
					<van-image fit="contain" :src="$portrait(siteConfig && siteConfig.logo && siteConfig.logo.homeLogo84)" height="28"
						width="100%" v-if="active==='dashboard'">
						<template v-slot:loading>
							<van-loading type="spinner" size="20" />
						</template>
					</van-image>
				</div>
			<div class="flex align-items-center">
				<van-icon class="SGYF-right-icon" name="more" color="#1989fa" size="22" @click="leftClick" />
			</div>
		</div>

		<van-nav-bar v-else :title="title" :border="false" fixed safe-area-inset-top
			@click-right="redirectRouter(meta.routerRight)" :class="meta.class">
			<template #title>
				<van-image :src="$portrait(siteConfig && siteConfig.logo && siteConfig.logo.homeLogo84)" height="28"
					width="106" class="mt-2" v-if="skgCodeKey && skgCodeKey !== 'XOSOVN' && active==='dashboard'" fit="contain">
					<template v-slot:loading>
						<van-loading type="spinner" size="20" />
					</template>
				</van-image>
			</template>

			<template #left>
				<van-icon v-if="childPage" name="arrow-left" size="22" @click="leftClick" />
				<van-icon v-else-if="active === 'dashboard'" :name="meta && meta.leftIcon" size="22" @click="leftClick"
					:badge="messagesNumber" />
				<van-icon v-else :name="meta && meta.leftIcon" size="22" @click="leftClick" />
			</template>
			<template #right>
				<div v-if="skgCodeKey">
					<div>
						<div v-if="(active === 'recharge' && skgCodeKey !== 'SGMP') || active !== 'recharge'">
							<van-icon :name="meta && meta.rightIcon" size="22"/>
							<span class="main-text ml-1 van-ellipsis" v-if="meta.rightText">{{$$t(meta.rightText)}}</span>
						</div>
					</div>
				</div>
			</template>
		</van-nav-bar>
	</div>
</template>

<script>
import {getTokenFromCookie} from "@/utils/auth";
	export default {
		name: 'Toolbar',

		computed: {
			title() {
				return this.pageTitle || this.$t(this.$route.meta && this.$route.meta.title)
			},
			
			pageTitle () {
				return this.$store.getters.pageTitle
			},

			meta() {
				return this.$route.meta
			},

			messagesNumber() {
				let e = this.$store.getters.messagesNumber
				return e > 0 ? e : ''
			},
			
			childPage() {
				return (this.$route.meta && this.$route.meta.childPage)
			},

			active() {
				let r = this.$route.name
				if (!r) return 'dashboard'
				else return this.$route.name
			},

			topActive() {
				return this.$store.getters.topActive
			},
			
			showFilter () {
				return this.$store.getters.showFilter
			}
		},

		methods: {
			showReport() {
				if (!this.memberInfo.isOpenCheckIn) return
				this.$store.commit("setShowReportPopup", true);
			},

			goBack() {
				if (window.history.length <= 1) this.$router.push('/app/dashboard')
				else this.$router.back()
			},

			leftClick() {
				if (this.meta.routerLeft) {
					if (this.skinCode === 'SG888' && this.$route.path === '/app/gameLists') {
						this.redirectRouter('allGame');
						return;
					}
					return this.redirectRouter(this.meta.routerLeft)
				}
				// lottery
				const type = sessionStorage.getItem("rules_code")
				if (type === 'SSC') this.redirectRouter('/app/ssc')
				else if (type === 'VNSouth') this.redirectRouter('/app/vnsouth')
				else if (type === 'Mark6') this.redirectRouter('/app/mark6')
				else if (type === 'PK10' || type === 'K3') this.redirectRouter('/app/PK10')
				else if (type) this.redirectRouter('/app/lottery')
				else this.goBack()
			},
			
			ucsRightClick () {
				this.$store.commit("setFiltering", true);
			},

			redirectRouter(r) {
				if(this.active === 'recharge' && this.skgCodeKey === 'SGMP') return
				this.$router.push(r)
			},

			setTopActive(d) {
				if ((!this.isLogin()) && d === 'task') {
					this.$store.commit("setTopActive", 'preferential');
				} else {
					this.$store.commit("setTopActive", d);
				}
			},

			$$t(v) {
				if (v === '' || !v) return
				return this.$t('toolbar.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#page-toolbar {
		height: 46px;
		// position: fixed;
		// top: 0;
		// left: 0;
		// right: 0;
		// background: #fff;

		/deep/ .van-nav-bar {
			height: 46px;

			.van-nav-bar__title {
				font-size: 16px;
				font-weight: 600;
				color: black;
			}
		}

		.service {
			background-image: url("/images/banner/service_toolbar.png");
			background-size: 100% 100%;

			/deep/ .van-nav-bar__title {
				color: #FFF;
			}
		}

		.member {
			background-image: url("/images/banner/member_toolbar.png");
			background-size: 100% 100%;

			/deep/ .van-nav-bar__title {
				color: #FFF;
			}

			/deep/.van-nav-bar__right {
				padding: 0;
			}

			.report {
				height: 30px;
				padding-right: 16px;
				padding-left: 22px;
				border-top-left-radius: 50px;
				border-bottom-left-radius: 50px;
			}
		}

		.privileges {
			background-image: url("/images/banner/privileges_toolbar.png");
			background-size: 100% 100%;
		}

		.financial {
			background-image: url("/images/financial/toolbar.png");
			background-size: 100% 100%;

			/deep/ .van-nav-bar__title {
				color: #FFF;
			}

			/deep/ .van-icon {
				color: #FFF !important;
			}
		}

		.invite {
			/deep/ .van-nav-bar__right {
				>span {
					color: black !important;
				}
			}
		}

		.preferential {
			/deep/ .van-nav-bar__text {
				color: black;
			}

			.preferential-title {
				height: 30px;
				border: 1px solid rgb(77, 140, 252);
				font-size: 14px;
				font-weight: 400;
				color: rgb(77, 140, 252);
				line-height: 30px;

				.preferential-btn {
					min-width: 60px;
					padding: 0 5px;
				}

				.active {
					color: white;
					background-image: url("/images/promotions/active.png");
					background-size: 100% 30px;
				}
			}
		}

		.lotteryLobby {
			background-image: url("/images/banner/lotteryLobby.png");
			background-size: 100% 100%;

			/deep/ .van-nav-bar__title {
				color: #FFF;
			}

			/deep/ .van-icon-arrow-left {
				color: #FFF !important;
			}

			/deep/.van-nav-bar__right {
				padding: 0;
			}
		}

		.turntable {
			background-image: url("/images/turntable/nav_bar_bg.png");
			background-size: 100% 100%;

			/deep/ .van-nav-bar__title {
				color: #FFF;
			}

			/deep/ .van-icon-arrow-left {
				color: #FFF !important;
			}

			/deep/ .van-nav-bar__right {
				.main-text {
					color: #FFF !important;
				}
			}
		}

		.XOSOVN {
			display: flex;
			justify-content: space-between;
			align-items: center;
			min-height: 46px;
			padding: 0 20px 0 23px;
			.SGYF-right-icon {
				transform: rotate(90deg);
			}
		}
		.SGYF {
			justify-content: space-between;
			.left-logo {
				max-width: 52px;
			}
		}
		.S666 {
			background-color: #293356;
			justify-content: space-between;
			font-size: 13px;
			font-weight: 600;
			color: #c5d5ff;
			.left-logo {
				max-width: 136px;
			}
			.memberName {
				font-size: 14px;
			}
			.lang {
				color: #e9cfa4;
			}
		}
	}
</style>
