<template>
    <div id="protocol">
        <scroller>
            <div class="px-4 py-3">
                <div class="background-white pt-4 pb-3 radius-2">
                    <div class="px-9">
                        <div class="title">{{$$t('tab_2')}}</div>
                    </div>

                    <div class="text mt-4 px-4 text-left" v-html="$$t('tab_2_center', {siteTitle: siteConfig && siteConfig.siteTitle})">
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'Protocol',

	methods: {
		$$t(v, p) {
			return this.$t('helps.' + v, p)
		}
	}
}
</script>

<style lang="less" scoped>
#protocol {
    .title {
        font-size: 16px;
        font-weight: 600;
        color: rgb(92, 134, 255);
        background-image: url("/images/joint/title_bg.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position:center;
    }
    .text {
        font-size: 12px;
        color: rgb(102, 102, 102);
    }
}
</style>
