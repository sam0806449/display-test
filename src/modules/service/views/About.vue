<template>
	<div class="text-left mt-3">
		<template v-for="(item, index) in items">
			<van-cell :title="$$t(item.text)" size="large" is-link center :key="index"
				@click="redirectRouter(item.link)" />
		</template>
	</div>
</template>

<script>
	export default {
		name: 'About',

		computed: {
			items() {
				if (this.skgCode === this.skgGameCode) {
					return [{
							text: 'a_1',
							link: 'about/responsibility'
						},
						{
							text: 'a_2',
							link: 'about/index'
						},
						{
							text: 'a_3',
							link: 'about/privacy'
						},
					]
				} else {
					return [{
						text: 'a_3',
						link: 'about/privacy'
					}, ]
				}
			}
		},


		methods: {
			$$t(v) {
				return this.$t('s_about.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>

</style>
