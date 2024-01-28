<template>
    <div id="responsibility " class="pa-4">
        <scroller>
            <div class="rules-text mt-2 px-4 background-white text-left"
                 v-html="$$t('center', {siteTitle: siteConfig && siteConfig.siteTitle})">
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'Responsibility',

	methods: {
		$$t(v, p) {
			return this.$t('responsibility.' + v, p)
		}
	}
}
</script>

<style lang="less" scoped>
.pa-4 {
    height: 100%;
    color: rgb(102, 102, 102);
}
</style>
