<template>
    <easyRefresh :id="easyRefreshId"
                 :userSelect="false"
                 :onRefresh="onRefresh"
                 :loadMore="loadMore"
                 ref="easyRefresh"
    >
        <template slot="header">
            <ClassicsHeader
                    bgColor="white"
                    textColor="grey"
                    moreInfoColor="grey"
                    :refreshText="$t('scrollView.pullToRefresh')"
                    :refreshReadyText="$t('scrollView.releaseToRefresh')"
                    :refreshingText="$t('scrollView.refreshing')"
                    :refreshedText="$t('scrollView.refreshFinish')"
                    :moreInfo="$t('scrollView.updateAt')"
                    :showMore="true"/>
        </template>

        <template slot="footer">
            <ClassicsFooter
                    bgColor="white"
                    textColor="grey"
                    moreInfoColor="grey"
                    :loadText="$t('scrollView.pushToLoad')"
                    :loadReadyText="$t('scrollView.releaseToLoad')"
                    :loadingText="$t('scrollView.loading')"
                    :noMoreText="$t('scrollView.noMore')"
                    :loadedText="$t('scrollView.loadFinish')"
                    :moreInfo="$t('scrollView.updateAt')"
                    :showMore="true"/>
        </template>
        <slot/>
    </easyRefresh>
</template>
<script>
export default {
	props: {
		onRefresh: Function,
		loadMore: Function,
		color: {
			type: String,
			default: '#fdc866'
		},
		bgColor: {
			type: String,
			default: '#ffffff'
		}
	},

	data() {
		return {
			easyRefreshId: '1'
		}
	},

	methods: {
		goTop() {
			this.$refs.easyRefresh.scrollTo(0, true)
		}
	},

	created() {
		this.easyRefreshId = 'es_' + Math.round(Math.random() * 10);
	},

	activated() {
		this.$refs.easyRefresh.scrollTo(0)
	},

	beforeDestroy () {
		this.easyRefreshId = null
	}
}
</script>
<style scoped lang="less">
/deep/ .v-easy-refresh {
    height: unset;
}
</style>
