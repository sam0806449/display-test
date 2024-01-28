<template>
    <div id="collections">
        <van-tabs v-model="categoryCode" animated ellipsis swipeable title-active-color="rgb(64, 128, 255)"
                  title-inactive-color="black" color="rgb(64, 128, 255)">
            <template v-for="(item, index) in gameCategorys">
                <van-tab :title="item.name" :name="item.code" :key="index" title-class="tab_title"/>
            </template>
        </van-tabs>
        <div class="games">
            <scroller>
                <div class="warp">
                    <div v-if="games.length>0">
                        <van-row :gutter="15" justify="space-between">
                            <van-col span="12" v-for="(item, index) in games" :key="index">
                                <div class="top" @click="getGameLoginUrl(item.platformCode, item.gameCode)">
                                    <van-image height="164" lazy-load
                                               :src="getGameImg(item.platformCode, item.imageName, item.categoryCode)">
                                        <template v-slot:loading>
                                            <van-loading type="spinner" size="24"/>
                                        </template>
                                    </van-image>
                                </div>
                                <div class="bottom">
                                    <span>{{item.gameName}}</span>
                                    <van-icon
                                            :name="`/images/games/${item.isFavorites ? 'favorite-active' : 'favorite'}.png`"
                                            size="18" @click="changeFavorite(item)"/>
                                </div>
                            </van-col>
                        </van-row>
                    </div>


                    <van-empty v-else :description="$t('common.noMore')" class="text-center">
                        <template #image>
                            <van-image src="/images/empty/no-more.png" width="280" height="130"/>
                        </template>
                    </van-empty>
                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Collections',

	data: () => ({
		categoryCode: '',
		gameCategorys: [],
		games: []
	}),

	activated() {
		this.getGameCategorys()
	},

	watch: {
		categoryCode(v) {
			this.onLoad(v)
		}
	},

	methods: {
		onLoad(categoryCode) {
			this.$post(`/api/Game/Games`, {
				categoryCode: categoryCode,
				platformCode: '',
				pageIndex: 1,
				pageSize: 1000,
				source: 1,
				tag: 'favor'
			})
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.games = d.items
				})
				.catch(error => {
					this.procError(error)
				})
		},

		getGameCategorys() {
			this.$get('/api/Game/GameCategorys')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					d.splice(0, 0, {code: '', name: this.$t('common.all')});
					this.gameCategorys = d
					this.onLoad(this.categoryCode)
				})
				.catch(error => {
					this.procError(error)
				})
		},

		changeFavorite(item) {
			let u = ''
			let s = item.isFavorites
			if (!s) u = '/api/Game/AddGameFavorites'
			else u = '/api/Game/RemoveGameFavorites'
			this.$get(u + '?platformCode=' + item.platformCode + '&gameCode=' + item.gameCode)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(() => {
					if (s) this.$success(this.$$t('delSuccess'))
					else this.$success(this.$$t('success'))
					this.onLoad(this.categoryCode)
				})
				.catch(error => {
					this.procError(error)
				})
		},

		$$t(v) {
			return this.$t('collections.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#collections {
    .games {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 44px;

        .warp {
            height: 100%;
            width: 100%;
            padding: 10px 16px 0 16px;

            .van-col {
                .top {
                    background-color: white;
                    border-radius: 4px 4px 0 0;

                    /deep/ .van-image__img {
                        border-radius: 4px 4px 0 0;
                    }
                }

                .bottom {
                    height: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: white;
                    padding: 0 12px;
                    border-radius: 0 0 4px 4px;

                    span {
                        font-size: 14px;
                        color: black;
                    }
                }

                margin-bottom: 10px;
            }
        }
    }
}
</style>
