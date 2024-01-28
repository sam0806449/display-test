<template>
    <div id="bulletin">
        <div class="bulletin-warp" v-if="items.length > 0">
            <div class="center" v-for="(item, index) in items" :key="index" @click="goDetails(item)">
                <div class="header px-4 caption">
                    <div>
                        <van-icon name="images/messages/messages.png" size="24" color="#fdf0cc"/>
                        <span class="body-2 van-ellipsis">{{item.title}}</span>
                    </div>
                </div>

                <div class="text">
                    <div v-html="item.summary"></div>
                </div>
                <van-divider/>
                <van-cell :title="item.time" is-link center :value="$$t('view')" title-class="cell-title"
                          value-class="cell-value">
                    <van-icon
                            name="images/messages/date.png"
                            slot="icon"
                            size="16"
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
	name: 'Bulletin',

	props: {
		items: {
			type: Array,
			default: () => {
				return []
			}
		}
	},

	methods: {
		goDetails(item) {
			sessionStorage.setItem('bulletin-data', JSON.stringify(item))
			this.$router.push('messages/bulletinDetails')
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

    .bulletin-warp {
        padding: 12px 16px 0 16px;

        .center {
            width: 100%;
            border-radius: 8px;
            box-shadow: 0 0 2px 0 #e5e5e5;
            background-color: #ffffff;
            margin-bottom: 8px;

            .header {
                min-height: 44px;
                padding-left: 12px;
                padding-top: 10px;

                > div {
                    height: 24px;
                    display: flex;
                }

                .van-icon {
                    background-color: rgb(253, 240, 204);
                    margin-right: 8px;
                }

                span {
                    height: 22px;
                    font-size: 16px;
                    font-weight: 500;
                    color: #333333;
                }
            }

            .text {
                padding: 0 12px 7.5px 12px;
                font-size: 14px;
                text-align: justify;
                color: #333333;
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
}

.cell-title {
    font-size: 12px;
    color: #666666;
    margin-left: 4px;
}

.cell-value {
    font-size: 14px;
    color: #333333;
}
</style>
