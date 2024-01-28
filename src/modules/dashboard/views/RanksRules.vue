<template>
    <div id="ranksRules" class="pa-4">
        <scroller>
            <div class="mt-2 pa-4 background-white text-left">
				<div class="subtitle-1">{{$$t('title_1')}}</div>
				<div class="caption mt-1">{{$$t('title_1_text')}}</div>
				
				<div class="subtitle-1 mt-3">{{$$t('title_2')}}</div>
				<div class="caption mt-1">{{$$t('title_2_text')}}</div>
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'RanksRules',

	methods: {
		$$t(v, P) {
			return this.$t('ranksRules.' + v, P)
		}
	}
}
</script>

<style lang="less" scoped>
#ranksRules {
    height: 100%;
    color: rgb(102, 102, 102);
}
</style>
