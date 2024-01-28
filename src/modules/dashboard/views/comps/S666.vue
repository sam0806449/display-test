<template>
    <div class="S666">
        <div>
        <van-swipe :autoplay="3000" height="145px" width="100%">
            <van-swipe-item v-for="(item, index) in swipes" :key="index" @click="redirectLinkUrl(item.linkUrl)">
                <van-image :src="$portrait(item.imageUrl)" width="100%" height="100%" lazy-load fit="cover">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
            </van-swipe-item>
        </van-swipe>

        <div class="flex noteice-box">
            <van-notice-bar left-icon="volume-o" color="#e9cfa4" background="#293356">
                <div class="body-2" @click="redirectScrollMsgs">{{notice}}</div>
                <van-icon slot="left-icon" name="volume" size="20" class="mr-1" />
            </van-notice-bar>
            <!-- <div class="fake-people">
                <van-icon slot="left-icon" name="/images/s666/people.png" size="20" class="mr-1" />
                <span>17860</span>
            </div> -->
        </div>   

        <van-tabs class="s666-gameTab" 
            v-model="tabActive"
            title-active-color="#fff"
            title-inactive-color="#90a2dc"
            color="#fff"
            line-width="0"
            background="#1b233d"
            @change="(item, index) => onChangeTab(item, index)">
            <van-tab v-for="(item, index) in gameCategorys" :name="item.name" :key="index">
                <template #title>
                    <van-image
                        width="28"
                        :src="gameCategorys.findIndex(t => t.name === tabActive) === index ?
                        (`/images/s666/dashboard/active/${item.code}.png`) : 
                        `/images/s666/dashboard/${item.code}.png`">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <p class="title ellipsis-1" style="margin-top: 2px">{{item.name}}</p>
                </template> 
			</van-tab>
        </van-tabs>
        </div>

        <lottie-vue-player
        v-if="this.s666_platforms && !this.s666_platforms.length"
        autoplay loop
        :backgroundColor="'#293356'"
        :speed="2"
        :src="`https://assets8.lottiefiles.com/private_files/lf30_9hubvnjh.json`"
        style="width: 100%; height:300px">
        </lottie-vue-player>

        <div class="s666-game">
            <scroller
            ref="s666Games"
            :on-refresh="last"
            :on-infinite="loadMore"
            :refreshText="null"
            refresh-layer-color="#36416d"
            loading-layer-color="#36416d">
                <div v-if="gameCategorys[curIndex] && gameCategorys[curIndex].code === 'hot'">
                    <div v-for="(itemCat,i) in hotData.keys" :key="i">
                        <div class="title">
                            <van-image
                                class="mr-2 mb-1"
                                :src="
                                    `/images/s666/dashboard/active/${itemCat}.png`
                                "
                                :width="20"
                                fit="contain"
                            >
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                            </van-image>
                            {{gameCategorys.find(t => t.code === itemCat).name }}
                        </div>
                        <GameListHorizontal
                            :gameData="hotData[itemCat]"
                            :unLoginOfKData="isShowK"
                            :platformCodeActive="'hot'"
                        />
                    </div>
                    <FooterOFSponsor />
                    <!-- 佔位子让scroll正常运作 -->
                    <div style="`width:100%; height: 20vh;overflow:auto;`" />
                </div>
                <div v-else class="px-9 py-3 s666-game-content">
                    <GameList
                        :gameData="s666_platforms"
                        :unLoginOfKData="isShowK"
                        :platformCodeActive="s666_platformCodeActive"
                    />
                </div>
            </scroller>
            <div class="platforms-overlay" v-if="platformsOverlay"></div>
        </div>

    </div>
</template>
<script>
import GameList from "./GameList"
import GameListHorizontal from "./GameListHorizontal"
import FooterOFSponsor from "./FooterOFSponsor"

export default {
    name: 'S666',

    components: {
		GameList, GameListHorizontal, FooterOFSponsor
	},

    props:{
        gameCategorys: {
            type: Array,
            default: () => {
                return [];
            },
        },
        swipes: {
            type: Array,
            default: () => {
                return [];
            },
        },
        isShowK: {
            type: Object,
            default: () => {
                return {};
            },
        },
        totalGameData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        notice: String,
        scrollBasicHeight: Number,
        allGameGotStatus: Boolean
    },
    
    data: () => ({
        // tabbar Index
        curIndex: 0,
        curItem: {},
        s666_platforms: [],
        s666_platformCodeActive: '',
        platformsOverlay: false
    }),

    watch:{
        // 第一次初始化
        allGameGotStatus(){
            this.curItem = this.gameCategorys[0]
            this.onChangeTab()
        },
        totalGameData: {
            handler: function(){
                this.curItem = this.gameCategorys[0]
                this.onChangeTab()
            },
            deep: true,
            immediate: false
        }
    },

    computed:{
        tabActive:{
            get(){
                return (this.gameCategorys.length &&  this.gameCategorys[this.curIndex].name) || ''
            },
            set(val){
                this.curIndex = this.gameCategorys.findIndex(t => t.name === val)
                return val
            }
        },
        hotData(){
            if (Object.keys(this.totalGameData).length && this.totalGameData.hot){
                let pre = this.totalGameData.hot.games
                const keysData = pre.map(t => t.categoryCode)
                // 去重
                const keys = [...new Set(keysData)]
                let filterData = { keys }
                for(const key of keys){
                    filterData[key] = pre.filter(t => t.categoryCode === key)
                }
                return filterData
            } else {
                return []
            }
        }
    },

    methods:{
        async onChangeTab(){
            this.curItem = await this.gameCategorys.find(t => t.name === this.tabActive)
            if (this.curItem?.code){
                this.s666_platforms = this.curItem.code === 'hot'
                    ? this.totalGameData[this.curItem.code]?.games
                    : this.totalGameData[this.curItem.code]?.games.data.data
                this.s666_platformCodeActive = this.curItem.code
                if(this.$refs.s666Games) this.$refs.s666Games.scrollTo(0,0,false)
            }
        },
        redirectLinkUrl(v) {
			if (v !== 'null' && v) this.linkOpen(v)
		},
        redirectScrollMsgs() {
			this.$router.push('scrollMsgs');
		},
        async last(){
           await this.$refs.s666Games.finishPullToRefresh();
           this.curIndex -= 1
           this.onChangeTab()
        },
        async loadMore(done){
            console.log('loadMore');
            if (this.curIndex === this.gameCategorys.length-1 ) {
                await this.$refs.s666Games.finishInfinite(true)
                await this.$refs.s666Games.scrollTo(0,0,false)
                return done()
            }
			this.platformsOverlay = true
            this.curIndex += 1
            await this.onChangeTab()
            await this.$refs.s666Games.scrollTo(0,0,false)
            await this.sleep(300)
            await this.$refs.s666Games.finishInfinite(true)
            this.platformsOverlay = false
            done()
        }
    }
}
</script>
<style lang="less" scoped>
.S666 {
    background: #293356;
    .van-swipe {
        height: 148px;
        img {
            height: 148px;
            width: 100%;
            border-radius: 10px;
        }
    }
    .noteice-box {
        background: #293356;
        .van-notice-bar {
            height: 28px;
            width: 80vw;
        }
        .fake-people {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            min-width: 68px;
            height: 22px;
            margin: 3px 0;
            border: 1px solid #ffffff4d;
            border-radius: 10px;
        }
    }        
    .s666-gameTab {
        /deep/ .van-tabs__wrap {
            height: 66px;
        }
        /deep/ img {
            height: 28px;
            background: #1b233d;
        }
        /deep/ .van-tab {
            background: #1b233d;
        }
    }
    .platforms-overlay {
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: transparent;
        position: absolute;
    }
    .s666-game {
        position: relative;
        height: calc(100vh - 338px);
        width: 100%;
        margin: 0 auto;
        background: #293356;
        .title {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            line-height: 32px;
            width: 100%;
            background: url('/images/s666/title-bg.png') no-repeat;
            background-size: 100% 100%;
            font-size: 4.266667vw;
            color: #f9f9f9;
            text-shadow: 0 0 1.066667vw hsla(0,0%,100%,.5);
            font-weight: 500;
        }
        .s666-game-content {
            min-height: calc(100vh - 338px);
            background: #36416d;
            /deep/ .text-left {
                color: #fff !important;
            }
            /deep/ .background-white {
                background: #2d375b;
            }
        }
    }
}
</style>