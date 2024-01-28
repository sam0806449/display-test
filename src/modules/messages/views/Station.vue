<template>
    <div id="bulletin">
        <div class="bulletin-warp" v-if="items.length > 0">
            <div class="center" v-for="(item, index) in items" :key="index" @click="goDetails(item)">
                <div class="text van-ellipsis">
                    <van-icon dot v-if="item.status === 0"/>
                    <div v-html="item.summary"></div>
                </div>
                <van-divider/>
                <van-cell :title="item.time" center title-class="cell-title" icon="delete">
                    <van-icon
                            name="images/messages/date.png"
                            slot="icon"
                            size="16"
                    />
                    <van-icon
                            slot="right-icon"
                            name="delete"
                            style="line-height: inherit;"
                            color="#e02020"
                            size="16"
                            @click.stop="onDeleteMessage(item.id)"
                    />
                </van-cell>
            </div>
        </div>
        <van-empty v-else :description="$$t('noMore')" class="text-center">
            <template #image>
                <van-image src="/images/empty/message.png" width="280" height="130"/>
            </template>
        </van-empty>
    </div>
</template>

<script>
export default {
	name: 'Station',

	props: {
		items: {
			type: Array,
			default: () => {
				return []
			}
		}
	},

	methods: {
		onDeleteMessage(id) {
			if (!this.isLogin()) return
			this.showProgress()
			this.$post('/api/Account/DeleteMessage?id=' + id)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(() => {
					this.items.splice(this.items.findIndex(item => item.id === id), 1)
					this.showProgress(false)
                    this.$success(this.$$t('success'))
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		onReadMessage(item) {
			if (item.status === 1) return
			this.$post('/api/Account/ReadMessage?id=' + item.id)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(() => {
				})
				.catch(error => {
					this.procError(error)
				})
		},

		goDetails(item) {
			if (!this.isLogin()) return
			sessionStorage.setItem('station-data', JSON.stringify(item))
			this.onReadMessage(item)
			this.$router.push('messages/stationDetails')
		},

		$$t(v) {
			return this.$t('messages.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#bulletin {
    height: 100%;
    text-align: left;

    .bulletin-warp {
        padding: 12px 16px 0 16px;

        .center {
            width: 100%;
            border-radius: 8px;
            box-shadow: 0 0 2px 0 #e5e5e5;
            background-color: #ffffff;
            margin-bottom: 8px;

            .text {
                padding: 10px 12px 7.5px 12px;
                font-size: 14px;
                line-height: 1.43;
                text-align: justify;
                color: #333333;

                .van-icon {
                    position: relative;
                    bottom: 4px;
                }
            }

            .van-divider {
                margin: 0;
                padding: 0 12px;
                color: #f5f5f9;
            }

            .van-cell {
                height: 31.5px;
                padding: 7.5px 12px 8px 12px;
                border-radius: 8px;
            }
        }
    }

    .cell-title {
        font-size: 12px;
        color: #666666;
        margin-left: 4px;
        padding-top: 2px;
    }

    .cell-value {
        font-size: 14px;
        color: #333333;
    }
}
</style>
