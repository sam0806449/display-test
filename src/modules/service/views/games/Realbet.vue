<template>
    <div id="realbet" class="pa-4">
        <scroller>
            <div class="rules-text mt-2 px-4 background-white text-left"  v-html="$$t('center')">
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'Realbet',

	methods: {
		$$t(v) {
			return this.$t('realbet.' + v)
		}
    }
}
</script>

<style lang="less" scoped>
#realbet {
    height: 100%;
    color: rgb(102, 102, 102);
}
</style>
