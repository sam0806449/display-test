<template>
    <div class="text-left mt-3">
        <template v-for="(item, index) in items">
            <van-cell :title="$$t(item.text)" size="large" is-link center :key="index" @click="redirectRouter(item.link)"/>
        </template>
    </div>
</template>

<script>
export default {
	name: 'Games',

	data: () => ({
		items: [
			// {text: 'g_1', link: 'games/lottery'},
			{text: 'g_2', link: 'games/gaming'},
			{text: 'g_3', link: 'games/realbet'},
			// {text: 'g_4', link: 'games/sport'},
			{text: 'g_5', link: 'games/others'},
		]
	}),


	methods: {
		$$t(v) {
			return this.$t('s_games.' + v)
		}
	}
}
</script>

<style lang="less" scoped>

</style>
