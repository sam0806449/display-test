<template>
    <div id="rebatesRules" class="pa-4">
        <scroller>
            <div class="rules-text mt-2 pa-4 background-white text-left" v-html="$$t('center')">
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'RebatesRules',

    methods: {
		$$t(v) {
			return this.$t('rebatesRules.' + v)
		}
    }
}
</script>

<style lang="less" scoped>
#rebatesRules {
    height: 100%;
    color: rgb(102, 102, 102);
}
</style>
