<template>
    <div id="messages">
        <van-tabs :border="false" v-model="type" color="rgb(77, 140, 252)">
            <van-tab :title="$$t('bulletins')">
                <scroll-view
                        :onRefresh="onRefresh"
                        :loadMore="onLoad">
                    <bulletin :items="items"/>
                </scroll-view>
            </van-tab>
            <van-tab :title="$$t('stations')">
                <scroll-view
                        :onRefresh="onRefresh"
                        :loadMore="onLoad">
                    <station :items="items"/>
                </scroll-view>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Bulletin from './Bulletin'
import Station from './Station'

export default {
	name: 'Messages',

	components: {
		Bulletin,
		Station
	},

	created() {
		this.onLoad()
	},

	watch: {
		type() {
			this.items = []
			this.pageIndex = 1
			this.onLoad()
		}
	},

	data() {
		return {
			type: 1,
			items: [],
			pageIndex: 1,
			refresh: false
		}
	},

	methods: {
		onLoad(done) {
			this.$post(`/api/Account/GetMessageRecord?type=${this.type}&pageSize=10&pageIndex=${this.pageIndex}`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.pageIndex = this.pageIndex + 1
					if (this.refresh) {
						this.items = []
						this.items = d.items
						if (done) {
							this.refresh = false
							done()
						}
					} else {
						if (d.items.length > 0) {
							this.items.push(...d.items)
							if (done) done(false)
						} else {
							if (done) done(true)
						}
					}
				})
				.catch(error => {
					this.procError(error)
				})
		},

		onRefresh(done) {
			this.refresh = true
			this.pageIndex = 1
			this.onLoad(done)
		},

		$$t(v) {
			return this.$t('messages.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#messages {
    height: 100%;
    position: relative;
    text-align: left;

    /deep/ .van-tabs__wrap {
        display: flex;
        justify-content: center;
        position: relative;
        z-index: 2;
        background-color: white;

        .van-tab {
            -webkit-box-flex: unset;
            -webkit-flex: none;
            flex: none;
            color: #333;
            width: 100px;

            .van-tab__text {
                font-size: 14px;
                font-weight: bold;
                color: #666666;
            }
        }

        /deep/ .van-tab--active {
            .van-tab__text {
                color: #333333;
                font-size: 16px;
                font-weight: bold;
            }
        }
    }

    .van-tabs, .van-tab__pane, .page {
        height: 100%;
    }

    /deep/ .van-tabs__content {
        background-color: #f5f5f9;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 44px;
    }
}
</style>
