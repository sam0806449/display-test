<template>
    <div id="hijack" class="pa-4">
        <scroller>
            <div class="rules-text mt-2 px-4 background-white text-left"  v-html="$$t('center')">
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'Hijack',

	methods: {
		$$t(v) {
			return this.$t('hijack.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#hijack {
    height: 100%;
    color: rgb(102, 102, 102);
}
</style>
