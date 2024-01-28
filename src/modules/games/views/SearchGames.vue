<template>
    <div id="searchGames">
        <van-search
                v-model="searchText"
                show-action
                :placeholder="$$t('text')"
                @cancel="onCancel"
                @search="getGames"
        />

        <div class="games">
            <scroller>
                <div class="warp pt-2">
                    <div v-if="items.length > 0">
                        <van-row :gutter="15" justify="space-between">
                            <van-col span="12" v-for="(item, index) in items" :key="index">
                                <div class="top" @click="getGameLoginUrl(platformCode, item.gameCode)">
                                    <van-image height="164" lazy-load
                                               :src="getGameImg(platformCode, item.imageName, item.categoryCode)">
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
	name: 'SearchGames',

	data: () => ({
		searchText: '',
		platformCode: '',
		items: [],
		game: {}
	}),

	created() {
		let d = this.$sessionGet('games-search')
		this.game = d
		this.platformCode = d.platformCode
	},

	methods: {
		getGames() {
			this.showProgress()
			this.$post(`/api/Game/Games`, {
				categoryCode: this.game.categoryCode,
				platformCode: this.game.platformCode,
				pageIndex: 1,
				pageSize: 100,
				gameName: this.searchText,
				source: 1             
			})
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.items = d.items
					this.showProgress(false)
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		onCancel() {
			this.$router.push({
				path: 'gameLists',
				query: {
					platformCode: this.game.platformCode,
					title: this.game.platformName,
					categoryCode: this.game.categoryCode
				}
			})
		},

		changeFavorite(item) {
			let u = ''
			let s = item.isFavorites
			if (!this.isLogin()) return
			if (!s) u = '/api/Game/AddGameFavorites'
			else u = '/api/Game/RemoveGameFavorites'
			this.showProgress()
			this.$get(u + '?platformCode=' + item.platformCode + '&gameCode=' + item.gameCode)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(() => {
					if (s) this.$success(this.$t('gameLists.delSuccess'))
					else this.$success(this.$t('gameLists.success'))
					this.getGames(item.categoryCode, item.platformCode)
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		$$t(v) {
			return this.$t('searchGames.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#searchGames {
    height: 100%;
    position: relative;

    .games {
        position: absolute;
        top: 54px;
        right: 0;
        left: 0;
        bottom: 0;

        .warp {
            height: 100%;
            width: 100%;
            padding: 10px 16px 0 16px;

            .van-col {
                .top {
                    background-color: white;

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
