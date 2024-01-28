<template>
    <div>
        <van-tabs v-model="active" animated ellipsis swipeable title-active-color="rgb(64, 128, 255)"
                  title-inactive-color="rgb(153, 153, 153)" color="rgb(64, 128, 255)">
            <van-tab :title="$$t('tab_1')"> </van-tab>
            <van-tab :title="$$t('tab_2')"></van-tab>
        </van-tabs>


        <div class="warp">
            <program v-show="active===0"/>

            <protocol v-show="active===1"/>
        </div>
    </div>
</template>

<script>
import Program from './Program'
import Protocol from './Protocol'

export default {
	name: 'Helps',

	components: {
		Program,
		Protocol
	},

	data: () => ({
		active: 0
    }),

    methods: {
		$$t(v) {
			return this.$t('helps.' + v)
		}
    }
}
</script>

<style lang="less" scoped>
.warp {
    position: absolute;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 0;
    background-image: url("/images/joint/digital_bg.png");
    background-size: 100%;

}
</style>
