<template>
    <div id="reviewsDetails">
        <div class="warp text-left">
            <scroller>
                <div class="pt-5 pb-3">
                    <template v-for="(item, index) in items">
                        <van-cell :title="$$t(item.title)" center size="large" :value="getStatus(obj[item.code])"
                                  :class="{'mt-4': item.m}" :value-class="item.code === 'receiveStatus' ? 'redText' : ''" :key="index" v-if="item.v==='receiveStatus'"/>

                        <van-cell :title="$$t(item.title)" center size="large"
                                  :value="`VIP${obj[item.code]}${$$t('lowestVipDesc')}`" :class="{'mt-4': item.m}"
                                  :key="index" v-else-if="item.v==='lowestVip'"/>

                        <van-cell :title="$$t(item.title)" center size="large" :value="obj[item.code]"
                                  :class="{'mt-4': item.m}" :key="index" v-else/>
                    </template>

                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
export default {
	name: 'ReviewsDetails',

	data: () => ({
		items: [
			{title: 'reviewsTitle', code: 'title'},
			{title: 'groupName', code: 'groupName'},
			{title: 'receiveParam', code: 'receiveParam'},
			{title: 'receiveStatus', code: 'receiveStatus', v: 'receiveStatus'},
			{title: 'createTime', code: 'createTime'},
			{title: 'lowestVip', code: 'lowestVip', m: true, v: 'lowestVip'},
			{title: 'giftType', code: 'giftTypeDesc'},
			{title: 'gameCategoryName', code: 'gameCategoryName'},
			{title: 'platformName', code: 'platformName'},
			{title: 'requirementType', code: 'requirementTypeDesc'},
			{title: 'receiveWay', code: 'receiveWayDesc'},

		],
		obj: {}
	}),


	activated() {
		let objId = this.$route.query.id
		this.onGetActivityDetail(objId)

	},

	methods: {
		onGetActivityDetail(objId) {
			this.$get('/api/Activity/GetActivityReceiveRecord?objId=' + objId)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.obj = data.data
				})
				.catch(error => {
					this.procError(error)
				})
		},

		getStatus(v) {
			if (v === 0) return this.$$t('status_0')
			if (v === 1) return this.$$t('status_1')
			if (v === 2) return this.$$t('status_2')
			if (v === -1) return this.$$t('status_3')
		},


		$$t(v) {
			return this.$t('reviewsDetails.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#reviewsDetails {
    .redText {
        color: rgb(242, 85, 53);
    }
    .warp {
        height: 100%;
    }
}
</style>
