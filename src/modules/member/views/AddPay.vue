<template>
    <div id="addPay">
       <div class="pa-3">
           <van-row gutter="16" type="flex" justify="space-between">
               <van-col span="12">
                   <van-button
                           :color="type==='bank' ? 'linear-gradient(to right, rgb(117, 162, 255), rgb(70, 132, 255))' : null"
                           block
                           class="radius-1" @click="type = 'bank'">
                       {{$$t('btn_1')}}
                   </van-button>
               </van-col>
               <van-col span="12">
                   <van-button 
                        v-if="skgCode !== skyLotteryCode"
                        class="radius-1"
                        :color="type==='virtual' ? 'linear-gradient(to right, rgb(117, 162, 255), rgb(70, 132, 255))' : null"
                        block
                        @click="type = 'virtual'">
                       {{$$t('btn_2')}}
                   </van-button>
               </van-col>
           </van-row>
       </div>
	   
	   <add-bank v-if="type==='bank'"/>
	   
	    <add-virtual v-else/>
    </div>
</template>

<script>

import AddBank from '@/modules/member/views/AddBank'
import AddVirtual from '@/modules/member/views/AddVirtual'
export default {
	name: 'AddPay',
	
	components: {
		AddBank,
		AddVirtual
	},

	data() {
		return {
			type: 'bank'
		}
	},

	methods: {
		$$t(v) {
			return this.$t('addPay.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#addPay {
    height: 100%;
    text-align: left;
}
</style>
