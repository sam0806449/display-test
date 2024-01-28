<template>
    <div id="preferentialRules" class="pa-4">
        <scroller>
            <div v-if="skgCodeKey === 'SGMP' && culture === 'vi-VN'" class="rules-text mt-2 px-4 background-white text-left"  v-html="$$t('_1')" />
            <div v-else class="rules-text mt-2 px-4 background-white text-left"  v-html="$$t('center')" />
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'PreferentialRules',

	methods: {
		$$t(v) {
			return this.$t('preferentialRules.' + v)
		}
    }
}
</script>

<style lang="less" scoped>
#preferentialRules {
    height: 100%;
    color: rgb(102, 102, 102);
}
</style>
