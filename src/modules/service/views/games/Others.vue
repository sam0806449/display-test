<template>
    <div id="others" class="pa-4">
        <scroller>
            <div class="rules-text mt-2 px-4 background-white text-left"
                 v-html="$$t('center', {siteTitle: siteConfig && siteConfig.siteTitle})">
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'Others',

	methods: {
		$$t(v, p) {
			return this.$t('others.' + v, p)
		}
	}
}
</script>

<style lang="less" scoped>
#others {
    height: 100%;
    color: rgb(102, 102, 102);
}
</style>
