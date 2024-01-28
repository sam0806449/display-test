<template>
    <div id="collections">
        <van-tabs
            v-model="categoryCode"
            animated
            ellipsis
            swipeable
            title-active-color="rgb(64, 128, 255)"
            title-inactive-color="black"
            color="rgb(64, 128, 255)"
        >
            <template v-for="(item, index) in gameCategorys">
                <van-tab
                    :title="item.name"
                    :name="item.code"
                    :key="index"
                    title-class="tab_title"
                />
            </template>
        </van-tabs>
        <div class="games">
            <scroller>
                <div style="display: flex; flex-wrap: wrap; padding: 0.256rem">
                    <template v-for="(item, index) in platforms">
                        <div
                            v-if="item.hasGameItems"
                            :key="item.gameCode + index"
                            :style="`width: calc((100% - 0.256rem)/2); margin-right: ${
                                index % 2 === 0 ? '0.256rem' : 0
                            }; margin-bottom: 0.256rem; height: calc(((100vw - 0.768rem) * 8) /18);`"
                        >
                            <van-image
                                class="elevation-1"
                                lazy-load
                                :src="getPlatformImg(item)"
                                width="100%"
                                height="100%"
                                @click.native.stop="goRouter(item)"
                            >
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                            </van-image>
                        </div>

                        <div
                            v-else
                            :key="item.imageName + index"
                            style="
                                margin-bottom: 0.256rem;
                                width: 100%;
                                min-height: 3.384rem;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            "
                        >
                            <van-image
                                v-if="
                                    item.imageName === 'gw.png' &&
                                    culture === 'th-TH'
                                "
                                class="elevation-1"
                                src="/images/dashboard/gw.png"
                                lazy-load
                                @click.native.stop="goRouter(item)"
                            >
                            </van-image>
                            <van-image
                                v-else
                                class="elevation-1"
                                :src="
                                    getGameImg(
                                        item.platformCode,
                                        item.imageName
                                    )
                                "
                                style="width: 100%; display: block"
                                lazy-load
                                @click.native.stop="goRouter(item)"
                            >
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                            </van-image>
                        </div>
                    </template>
                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
export default {
    name: "AllGame",

    data: () => ({
        categoryCode: "",
        gameCategorys: [],
        platforms: [],
    }),

    created() {
        this.getGameCategorys();
    },

    watch: {
        categoryCode() {
            this.getGamePlatform();
        },
    },

    methods: {
        getPlatformImg(item) {
            if (!item.hasGameItems)
                return this.getGameImg(item.platformCode, item.imageName);
            else
                return `${this.siteConfig.imgPath}/common/img/slots/platform/${item.imageName}_${this.categoryCode}.png`;
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

        getGamePlatform() {
            this.platforms = [];
            this.$get(
                `/api/Game/GamePlatforms?categoryCode=${
                    this.categoryCode || "all"
                }&source=1`
            )
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    this.platforms = data.data;
                })
                .catch((error) => {
                    this.procError(error);
                });
        },

        getGameCategorys() {
            this.$get("/api/Game/GameCategorys")
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    let d = data.data;
                    // d.splice(0, 0, {code: '', name: this.$t('common.all')});
                    this.gameCategorys = d;
                    if (!this.categoryCode) {
                        this.categoryCode = this.gameCategorys[0].code;
                    }
                    this.getGamePlatform();
                })
                .catch((error) => {
                    this.procError(error);
                });
        },

        $$t(v) {
            return this.$t("collections." + v);
        },
    },
};
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
