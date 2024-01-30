<template>
	<div id="app">
		<keep-alive v-if="$route.meta.keepAlive" :max="5">
			<router-view></router-view>
		</keep-alive>

		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	import sessionContext from '@/mixins/sessionContext'
	import Meta from '@/mixins/meta'

	export default {
		name: 'App',
		mixins: [sessionContext, Meta],

		created() {
			this.initConfig()
		},

		mounted() {
			this.chackIsMchatApp();
		},

		methods: {
			// 判断内崁美聊APP
			chackIsMchatApp() {
				const UA = window.navigator.userAgent.toLowerCase();
				if ( UA.indexOf('iphone') > -1 && UA.indexOf('safari') === -1 ) {
					const theDom = document.getElementById("app");
					theDom.style.transform = "translateY(90px)";
				}
			}
		}
	}
</script>

<style lang="less">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		position: absolute;
		width: 100%;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: hidden;
	}
</style>
