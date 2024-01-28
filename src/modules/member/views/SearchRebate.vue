<template>
    <div id="searchRebate">
        <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @cancel="onCancel"
        />

        <div class="rebateRecord-warp">
            <scroller>
                <div class="pb-3">
                    <div class="rebateRecords">
                        <div>
                            <template v-for="(list, index) in 3">
                                <div class="item py-3 px-3" :key="index">
                                    <div class="left">
                                        <van-image
                                                round
                                                fit="cover"
                                                width="40"
                                                height="40"
                                                src="/images/account/user.png"
                                        />
                                    </div>
                                    <div class="right">
                                        <div class="right-t">
                                            <div class="body-2">用户72093</div>
                                            <div class="body-2">下注：200000.00</div>
                                        </div>
                                        <div class="right-b mt-3">
                                            <div class="body-2">返佣：200000.00</div>
                                            <div class="body-2">1级返佣，比例10%</div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <!--                        <van-empty v-else :description="$t('common.noMore')" class="text-center">-->
                        <!--                            <template #image>-->
                        <!--                                <van-image src="/images/empty/no-more.png" width="280" height="130"/>-->
                        <!--                            </template>-->
                        <!--                        </van-empty>-->
                    </div>
                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
export default {
	name: 'SearchRebate',

	data: () => ({
		searchText: '',
		platformCode: '',
        items: [],
        game: {}
	}),

	computed: {
		datas() {
			if (this.searchText) {
				return this.items.filter(e => {
					return ((e.gameName && e.gameName.indexOf(this.searchText) > -1))
				})
			} else {
				return this.items
			}
		}
	},


	created() {
	},

	methods: {
		onCancel() {
		},
	}
}
</script>

<style lang="less" scoped>
#searchRebate {
    height: 100%;
    position: relative;
    .item {
        background-color: white;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: solid 1px #f5f6f7;


        .left {
            height: 40px;
            width: 40px;
        }

        .right {
            width: 100%;
            margin-left: 12px;
            color: rgb(51, 51, 51);

            .right-t, .right-b {
                text-align: left;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
</style>
