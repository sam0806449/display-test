<template>
    <div id="program">
        <scroller>
            <div class="px-4 py-3">
                <div class="background-white pt-4 pb-3 radius-2">
                    <div class="px-9 align-items-center">
                        <div class="title">{{$$t('tab_1')}}</div>
                    </div>

                    <div class="text mt-4 px-4 text-left" v-html="$$t('tab_1_center', {siteTitle: siteConfig && siteConfig.siteTitle, platformCommisonRate: item && item.platformCommisonRate})">
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'Program',

    data: () => ({
        item: {}
    }),

    created () {
        this.onLoad()
    },

    methods: {
        onLoad () {
            this.$post('/api/Agent/GetAgentRebateRateSetting')
                .then(resp => {
                    return this.checkResp(resp, (r) => r.data.success === true)
                })
                .then(data => {
                    this.item = data.data
                })
                .catch(error => {
                    this.procError(error)
                })
        },

		$$t(v, P) {
			return this.$t('helps.' + v, P)
		}
    }
}
</script>

<style lang="less" scoped>
#program {
    height: 100%;

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
