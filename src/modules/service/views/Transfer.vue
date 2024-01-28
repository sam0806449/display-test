<template>
    <div id="transfer" class="pa-4">
        <scroller>
            <div class="rules-text mt-2 pa-4 background-white text-left" v-html="$$t('center', {siteTitle: siteConfig && siteConfig.siteTitle})">
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'Transfer',

	methods: {
		$$t(v, p) {
			return this.$t('transfer.' + v, p)
		}
    }
}
</script>

<style lang="less" scoped>
#transfer {
    height: 100%;
    color: rgb(102, 102, 102);
}
</style>
