<template>
<div class="flex">
   <vue-touch-scroll type="horizontal" hide-scrollbar class="flex">
       <div v-for="(item, index) in gameData" :key="index" class="flex s666-game-box">
            <van-image
                :src="
                    getPlatformImg(item)
                "
                :width="hadleImgWidh(item.platformCode, item.categoryCode)"
                fit="contain"
                @click.native.stop="goRouter(item)"
            >
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
            <p class="title ellipsis-1" style="margin-top: 2px">{{item.gameName}}</p>
        </div>
   </vue-touch-scroll>
</div>
</template>

<script>
export default {
    props: {
        gameData: {
            type: Array,
            default: () => {
                return [];
            },
        },
        platformCodeActive: {
            type: String,
            default: "",
        },
        unLoginOfKData: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },

    data: () => ({
        isShowK: {},
    }),

    watch: {
        unLoginOfKData: {
            handler: function (v) {
                if (this.memberData) this.isShowK = this.memberData;
                else this.isShowK = v;
            },
            deep: true,
            immediate: true,
        },
    },

    methods: {
        hadleImgWidh(platformCode, categoryCode){
            switch (categoryCode) {
                case 'cp':
                    if (platformCode !== 'SGLottery'){
                        return '167';
                    }
                break;
                case 'ty':
                case 'sx':
                case 'dj':
                case 'douji':
                   return '200';   
                case 'by':
                   return '130';
                default:
                    return '98';
            }
        },
        getPlatformImg(item) {
            if (!item.hasGameItems)
                return this.getGameImg(item.platformCode, item.imageName, item.categoryCode);
            else
                return `${this.siteConfig.imgPath}/common/img/slots/platform/${item.imageName}_${this.platformCodeActive}.png`;
        },
        goRouter(item) {
            if (item.platformCode === "SGLottery") {
                if (this.isLogin()) {
                    if (item.gameCode !== "SGLottery") {
                        const mapData = JSON.parse(
                            sessionStorage.getItem("gameCategorysLottery")
                        );
                        const curBigType = mapData.find(
                            (t) => t.type === item.gameCode
                        ).bigType;
                        const specialTyps = ["PK10", "K3"];
                        let lotteryPath;
                        sessionStorage.setItem("rules_code", curBigType);
                        sessionStorage.setItem("gameCode_item", item.gameCode);
                        if (specialTyps.indexOf(curBigType) > -1)
                            lotteryPath = "PK10";
                        else if (curBigType === "SSC") lotteryPath = "ssc"
                        else if (curBigType === "VNSouth") lotteryPath = "vnsouth"
                        else if (curBigType === "Mark6") lotteryPath = "mark6"
                        else lotteryPath = "lottery";
                        this.$router.push(lotteryPath);
                    } else {
                        this.redirectRouter("/app/lotteryLobby");
                    }
                }
                return;
            }

            if (item.platformCode === "SGUcs") {
                if (this.isLogin()) {
                    this.redirectRouter("/app/ucs");
                }
                return;
            }

            if (!item.hasGameItems) {
                this.getGameLoginUrl(item.platformCode, item.gameCode);
            } else {
                this.$router.push({
                    path: "gameLists",
                    query: {
                        platformCode: item.platformCode,
                        title: item.platformName,
                        categoryCode: this.platformCodeActive,
                    },
                });
            }
        },
        $$t(v) {
            return this.$t("dashboard." + v);
        },
    },
};
</script>

<style lang="less" scoped>
.s666-game-box {
    margin: 10px;
    height: 120px;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    /deep/ .van-image {
        min-width: 98px;
    }
    .title {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #fff;
    }
}
</style>