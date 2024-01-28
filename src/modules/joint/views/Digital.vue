<template>
    <div id="digital">
        <div class="warp pt-4 px-5">
            <div class="title">{{$$t('title_1')}}</div>
            <div class="desc">{{$$t('title_2')}}</div>

           <div class="mt-6">
               <van-row gutter="12" type="flex" justify="space-between">
                   <template v-for="(item, index) in 4">
                       <van-col span="12" :key="index">
                           <van-image :src="`/images/joint/digital_${item}_${culture}.png`" lazy-load width="160" height="172" class="mb-3">
                               <template v-slot:loading>
                                   <van-loading type="spinner" size="28" />
                               </template>
                           </van-image>
                       </van-col>
                   </template>
               </van-row>
           </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Digital',

    methods:{
		$$t(v) {
			return this.$t('digital.' + v)
		}
    }
}
</script>

<style lang="less" scoped>
#digital {
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
    }
}
</style>
