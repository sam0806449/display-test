<template>
    <div id="setUp" class="text-left">
        <van-cell :title="$$t('setUp_1')" value="20.30M" size="large" is-link center class="mt-3"/>

        <van-cell :title="$$t('setUp_2')" value="当前版本V1.0.0" size="large" is-link center class="mt-3"/>
        <van-cell :title="$$t('setUp_3')" size="large" is-link center @click="redirectRouter('feedback')"/>
    </div>
</template>

<script>
export default {
	name: 'SetUp',

	methods: {
		$$t(v) {
			return this.$t('setUp.' + v)
		}
	},
}
</script>

<style lang="less" scoped>
#setUp {

}
</style>
