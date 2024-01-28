<template>
    <div id="aboutUs" class="pa-4">
        <scroller>
            <div class="rules-text mt-2 px-4 background-white text-left"
                 v-html="$$t('center', {siteTitle: siteConfig && siteConfig.siteTitle})">
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'AboutUs',

	methods: {
		$$t(v, P) {
			return this.$t('aboutUs.' + v, P)
		}
	}
}
</script>

<style lang="less" scoped>
#aboutUs {
    height: 100%;
    color: rgb(102, 102, 102);
}
</style>
