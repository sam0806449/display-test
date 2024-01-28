<template>
	<div id="canvasVideo">
		<template v-if="skgCodeKey === 'SGSBO' || skgCodeKey === 'SGMGM'">
			<div class="m-bg" :class="{'SGMGM-bg':skgCodeKey === 'SGMGM'}">
				<div class="view__mask">
					<slot></slot>
				</div>
			</div>
		</template>
		<template v-else-if="skgCodeKey === 'SGMP'">
			<div class="m-bg SGMP-bg">
				<div class="view__mask">
					<slot></slot>
				</div>
			</div>
		</template>
		<template v-else-if="skgCodeKey === 'SGU3'">
			<div class="m-bg SGU3-bg">
				<div class="view__mask">
					<slot></slot>
				</div>
			</div>
		</template>
		<template v-else-if="skgCodeKey === 'SG666'">
			<div class="m-bg SG666-bg">
				<div class="view__mask">
					<slot></slot>
				</div>
			</div>
		</template>
		<div v-else class="container" :class="{ 'container--mobile': isMobile }" :style="containerStyle">
			<div class="view" :style="viewStyle">
				<img v-if="showBg" class="view__bg" src="images/banner/login_bg.png" />
				<video v-if="useVideo" class="view__video" muted loop playsinline autoplay="autoplay" preload="auto"
					mtt-playsinline="true" webkit-playsinline="true" x5-video-player-type="h5-page"
					:poster="source.sources.poster" :class="{ 'mix-blend': showBg }">
					<source type="video/mp4" :src="source.sources.mp4" />
				</video>
				<canvas v-else ref="canvas" class="view__canvas" :style="canvasStyle" :class="{ 'mix-blend': showBg }">
				</canvas>
				<div class="view__mask">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Player from 'silent-film-player';
	import {
		isMobile,
		isIOS,
		isWeiXin,
		isWXMP
	} from '@/common/js/user-agent';

	const SOURCE = {
		water: {
			width: 1920,
			height: 1080,
			sources: {
				mp4: 'https://crane3.im6ge.com/common/img/slots/mp4/mp4/cartoon.mp4',
				ts: 'https://crane3.im6ge.com/common/img/slots/mp4/mp4/cartoon.ts',
				poster: 'images/banner/login_bg.png',
			},
		},
	};

	const urlParams = new URLSearchParams(location.search);
	const sourceName = urlParams.get('source') || 'water';
	const useCanvas = urlParams.get('canvas');
	const showBg = urlParams.get('bg') || 1;

	export default {
		data() {
			return {
				isMobile: isMobile(),
				container: {
					width: window.innerWidth,
					height: window.innerHeight,
				},
				showCanvas: false
			};
		},

		computed: {
			useVideo() {
				if (useCanvas != null) {
					return !Number(useCanvas);
				}

				// PC/iOS 端（非微信环境）使用 video 渲染，其他环境使用 canvas 渲染
				return (
					(!isMobile() || isIOS()) &&
					!isWeiXin() &&
					!isWXMP()
				);
			},

			showBg() {
				return Number(showBg);
			},

			source() {
				return SOURCE[sourceName];
			},

			containerStyle() {
				return {
					width: `100%`,
					height: `100%`,
				};
			},

			viewStyle() {
				return {
					top: '0px',
					left: '0px',
				};
			},

			canvasStyle() {
				const { showCanvas } = this;
				if (showCanvas) {
					return {
						'height': '100%'
					};
				} else {
					return {
						'height': '0'
					};
				}
			}
		},

		methods: {
			init() {
				if (!this.isMobile) {
					this.container = {
						width: this.container.width,
						height: 0,
					};
				}
			},

			initPlayer() {
				if (!this.useVideo) {
					const {
						source: {
							sources
						},
						$refs: {
							canvas
						},
					} = this;
					window.player = new Player(sources.ts, {
						canvas,
						loop: true,
						autoplay: true,
						poster: sources.poster,
						disableWebAssembly: true,
						chunkSize: 1 * 1024 * 1024,
						videoBufferSize: 512 * 1024,
					});
					setTimeout(() => {
						this.showCanvas = true
					}, 2500)
				}
			},
		},

		created() {
			this.init();
		},

		mounted() {
			this.initPlayer();
		},
	};
</script>

<style lang="scss" scoped>
	#canvasVideo {
		width: 100%;
		height: 100vh;
		position: relative;

		.m-bg {
			width: 100%;
			height: 100%;
			background: url('/images/account/m-bg.jpg') no-repeat 50%;
			background-size: 100% 100%;
		}
		.SGMGM-bg {
			background: url('/images/account/SGMGMbg.jpg') no-repeat;
			background-position-y: 80%;
			background-size: 100% 100%;
		}
		.SGMP-bg {
			background: url('/images/account/SGMPbg.png') no-repeat;
			background-position-y: 80%;
			background-size: 100% 100%;
		}
		.SGU3-bg {
			background: url('/images/account/SGU3bg.png') no-repeat;
			background-position-y: 80%;
			background-size: 100% 100%;
		}
		.SG666-bg {
			background: none;

			.view__mask {
				background: #fff;
			}
		}
	}

	.container {
		position: absolute;
		top: 0;
		left: 0;

		&--mobile {
			width: 100%;
			height: 100%;
		}
	}

	.view {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;

		&__bg {
			height: 100%;
			width: 100%;
		}

		&__video,
		&__canvas {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 2;
			height: 100%;

			&.mix-blend {
				mix-blend-mode: screen;
			}
		}

		&__mask {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 3;
			width: 100%;
			height: 100%;
		}
	}
</style>
