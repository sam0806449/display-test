<template>
    <div id="mobile">
        <scroller>
        <div class="warp pt-4 px-5">
            <div class="title">{{$$t('title_1')}}</div>
            <div class="desc">{{$$t('title_2')}}</div>

            <van-image :src="`/images/joint/mobile_top_${culture}.png`" width="316" height="46" lazy-load class="mt-3"/>

            <div class="mt-3">
                <div class="flex align-items-center background-white radius-2 py-2 pl-4 pr-3 mb-2">
                    <div class="mr-4">
                        <van-image src="/images/joint/mobile_1.png" width="33" height="33"/>
                    </div>
                    <div class="info text-left">
                        <div class="info_title">{{$$t('info_title_1')}}</div>
                        <div class="caption" v-if="skgCode === skgGameCode">{{$$t('info_title_1_desc')}}</div>
						<div class="caption" v-else>{{$$t('info_title_1_desc_ucs')}}</div>
                    </div>
                </div>

                <div class="flex align-items-center background-white radius-2 py-2 pl-4 pr-3 mb-2">
                    <div class="mr-4">
                        <van-image src="/images/joint/mobile_2.png" width="30" height="34"/>
                    </div>
                    <div class="info text-left">
                        <div class="info_title">{{$$t('info_title_2')}}</div>
                        <div class="caption">{{$$t('info_title_2_desc')}}</div>
                    </div>
                </div>


                <div class="flex align-items-center background-white radius-2 py-2 pl-4 pr-3 mb-2">
                    <div class="mr-4">
                        <van-image src="/images/joint/mobile_3.png" width="34" height="40"/>
                    </div>
                    <div class="info text-left">
                        <div class="info_title">{{$$t('info_title_3')}}</div>
                        <div class="caption">{{$$t('info_title_3_desc')}}</div>
                    </div>
                </div>


                <div class="flex align-items-center background-white radius-2 py-2 pl-4 pr-3">
                    <div class="mr-4">
                        <van-image src="/images/joint/mobile_4.png" width="34" height="34"/>
                    </div>
                    <div class="info text-left">
                        <div class="info_title">{{$$t('info_title_4')}}</div>
                        <div class="caption">{{$$t('info_title_4_desc')}}</div>
                    </div>
                </div>
            </div>
        </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'Mobile',

	methods: {
		$$t(v) {
			return this.$t('mobile_j.' + v)
		}
    }
}
</script>

<style lang="less" scoped>
#mobile {
    height: 100%;
    .warp {
        height: 100%;
        width: 100%;
        background-image: url("/images/joint/digital_bg.png");
        background-size: 100%;

        .title {
            font-size: 22px;
            font-weight: 600;
            color: rgb(72, 133, 255);
        }

        .desc {
            font-size: 14px;
            font-weight: 500;
            color: rgb(102 , 102 , 102 );
        }

        .info {
            color: rgb(102 , 102 , 102 );
            .info_title {
                font-size: 14px;
                font-weight: 600;
                color: rgb(72, 133, 255);
            }
        }

    }
}
</style>
