<template>
    <div id="gameLists">
        <van-tabs v-model="tab" animated ellipsis swipeable title-active-color="rgb(64, 128, 255)"
                  title-inactive-color="black" color="rgb(64, 128, 255)">
            <template v-for="(item, index) in tabs">
                <van-tab :title="item.text" :key="index" :name="item.code" title-class="tab_title"/>
            </template>
        </van-tabs>

        <div class="games">
            <scroll-view ref="game_lists"
                    :onRefresh="onRefresh"
                    :loadMore="onLoadMore">
                <div class="warp">
                    <div v-if="games.length > 0">
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
                                    <span class="van-ellipsis">{{item.gameName}}</span>
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
            </scroll-view>
        </div>
    </div>
</template>

<script>
export default {
	name: 'GameLists',

	data: () => ({
		tab: '',
		categoryCode: null,
		platformCode: null,
		games: [],
		title: '',
		refresh: false,
		pageIndex: 1,
	}),

	computed: {
		tabs() {
			return [
				{text: this.$$t('all'), code: ''},
				{text: this.$$t('hot'), code: 'hot'},
				{text: this.$$t('new'), code: 'new'},
				{text: this.$$t('favor'), code: 'favor'},
			]
		}
	},

    watch: {
		tab () {
			this.$refs.game_lists.goTop()
            this.pageIndex = 1
			this.onRefresh(null, this.categoryCode, this.platformCode)
        }
    },

	activated() {
		this.tab = ''
		this.title = this.$route.query.title
		this.platformCode = this.$route.query.platformCode
		this.categoryCode = this.$route.query.categoryCode
		this.onRefresh(null, this.categoryCode, this.platformCode)
	},

	methods: {
		onLoad(done, categoryCode, platformCode) {
			this.$sessionSet('games-search', {
				categoryCode: categoryCode,
				platformCode: platformCode,
				platformName: this.title
			})
			this.showProgress()
			this.$post(`/api/Game/Games`, {
				categoryCode: categoryCode,
				platformCode: platformCode,
				pageIndex: this.pageIndex,
				pageSize: 20,
                tag: this.tab,
				source: 1
			})
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.pageIndex = this.pageIndex + 1
					if (this.refresh) {
						this.items = []
						this.games = d.items
						if (done) {
							this.refresh = false
							done()
						}
					} else {
						if (d.items.length > 0) {
							this.games.push(...d.items)
							if (done) done(false)
						} else {
							if (done) done(true)
						}
					}
					this.showProgress(false)
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		onLoadMore(done) {
			this.refresh = false
			this.onLoad(done, this.categoryCode, this.platformCode)
		},


		onRefresh(done) {
			this.refresh = true
			this.pageIndex = 1
			this.onLoad(done, this.categoryCode, this.platformCode)
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
					if (s) this.$success(this.$$t('delSuccess'))
					else this.$success(this.$$t('success'))
					this.onRefresh()
					this.showProgress(false)
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		$$t(v) {
			return this.$t('gameLists.' + v)
		}
	},

	beforeRouteLeave(to, form, next) {
		if (to.name === 'dashboard') sessionStorage.removeItem('games-search')
		next()
	},
}
</script>

<style lang="less" scoped>
#gameLists {
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
                    border-radius: 4px 4px 0 0;
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
