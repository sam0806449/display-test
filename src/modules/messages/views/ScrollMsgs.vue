<template>
    <div id="scrollMsgs">
        <easyRefresh :userSelect="false">
            <van-collapse v-model="activeNames" v-if="notices.length>0">
                <template v-for="(n, index) in notices">
                    <van-collapse-item :title="n.title" :name="n.id" :key="index"><div v-html="n.content" class="text"></div></van-collapse-item>
                </template>
            </van-collapse>

            <van-empty v-else :description="$t('common.noMore')" image="/images/empty/message.png"/>
        </easyRefresh>
    </div>
</template>

<script>
export default {
	name: 'ScrollMsgs',

	data() {
		return {
			activeNames: [],
			notices: []
		}
	},

	activated() {
		this.onLoad()
	},

	methods: {
		onLoad() {
			this.$post('/api/Home/GetAllNotice')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
          if (d.scrollMsgs.length < 1) return
					this.activeNames.push(d.scrollMsgs[0].id)
					this.notices = d.scrollMsgs
				})
				.catch(error => {
					this.procError(error)
				})
		}
	}
}
</script>

<style lang="less" scoped>
#scrollMsgs {
    height: 100%;
    text-align: left;
    .text {
        white-space: pre-wrap;
    }
}
</style>
