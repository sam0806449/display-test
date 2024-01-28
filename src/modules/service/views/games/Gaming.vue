<template>
    <div id="gaming" class="pa-4">
        <scroller>
            <div class="rules-text mt-2 px-4 background-white text-left"  v-html="$$t('center')">
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'Gaming',

	methods: {
		$$t(v) {
			return this.$t('gaming.' + v)
		}
    }
}
</script>

<style lang="less" scoped>
#gaming {
    height: 100%;
    color: rgb(102, 102, 102);
}
</style>
