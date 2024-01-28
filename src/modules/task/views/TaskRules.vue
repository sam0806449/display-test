<template>
    <div id="taskRules">
        <scroller>
            <div class="text" v-html="text" v-if="text"/>

            <van-empty v-else :description="$t('common.noMore')" class="text-center">
                <template #image>
                    <van-image src="/images/empty/no-more.png" width="280" height="130"/>
                </template>
            </van-empty>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'TaskRules',

	data() {
		return {
			text: null
		}
	},

	created() {
		this.onLoad()
	},

	methods: {
		onLoad() {
			this.$post('/api/SysResource/GetSysResource?code=TaskRules')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					if (d === '') return
					this.text = data.data
				})
				.catch(error => {
					this.procError(error)
				})
		}
	}
}
</script>

<style lang="less" scoped>
#taskRules {
    height: 100%;
    text-align: left;
    margin-top: 10px;
    padding: 10px 16px 50px 16px;
    font-size: 14px;
    background-color: white;

    .text {
        color: rgb(102, 102, 102);
        white-space: pre-wrap;
    }
}
</style>
