<template>
    <div>
    <van-row gutter="10">
        <template v-for="(item, index) in gameData">
            <div :key="index">
                <van-col
                    span="24"
                    class="mb-3"
                    v-if="
                        !item.hasGameItems &&
                        (platformCodeActive === 'sx' ||
                            platformCodeActive === 'ty' ||
                            platformCodeActive === 'cp' ||
                            platformCodeActive === 'dj' ||
                            platformCodeActive === 'douji' ||
                            platformCodeActive === 'ucs')
                    "
                >
                    <van-image
                        v-if="
                            item.imageName === 'gw.png' && culture === 'th-TH'
                        "
                        class="elevation-1"
                        src="/images/dashboard/gw.png"
                        height="2.773rem"
                        width="100%"
                        lazy-load
                        @click.native.stop="goRouter(item)"
                    >
                    </van-image>
                    <van-image
                        v-else
                        class="elevation-1"
                        :src="getGameImg(item.platformCode, item.imageName)"
                        height="2.773rem"
                        width="100%"
                        lazy-load
                        @click.native.stop="goRouter(item)"
                    >
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                </van-col>

                <div v-else-if="platformCodeActive === 'hot'">
                    <van-col
                        span="24"
                        class="mb-3"
                        v-if="item.platformCode === 'SGUcs'"
                    >
                        <van-image
                            class="elevation-1"
                            :src="
                                getGameImg(
                                    item.platformCode,
                                    item.imageName,
                                    item.categoryCode
                                )
                            "
                            height="2.773rem"
                            width="100%"
                            lazy-load
                            @click.native.stop="goRouter(item)"
                        >
                            <template v-slot:loading>
                                <van-loading type="spinner" size="20" />
                            </template>
                        </van-image>
                    </van-col>

                    <div
                        v-else-if="item.platformCode === 'SGLottery'"
                        class="mb-3"
                        style="
                            float: left;
                            width: calc((100% - 10px) / 2);
                            margin-right: 4.9px;
                            box-sizing: border-box;
                            min-height: 0.02667rem;
                        "
                    >
                        <div class="background-white elevation-1 radius-1 pa-2">
                            <van-image
                                :src="
                                    getGameImg(
                                        item.platformCode,
                                        item.imageName,
                                        item.categoryCode
                                    )
                                "
                                height="3.2rem"
                                width="100%"
                                lazy-load
                                @click.native.stop="goRouter(item)"
                            >
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                            </van-image>

                            <div
                                class="text-left pt-1"
                                style="color: #535867; font-weight: bold"
                            >
                                <p class="van-ellipsis" style="height: 17px">{{ item.gameName }}</p>
                            </div>
                        </div>
                    </div>

                    <van-col
                        span="24"
                        class="mb-3"
                        v-else-if="
                            !item.hasGameItems &&
                            (item.categoryCode === 'sx' ||
                                item.categoryCode === 'ty' ||
                                item.categoryCode === 'dj' ||
                                item.categoryCode === 'douji' ||
                                item.categoryCode === 'cp')
                        "
                    >
                        <van-image
                            class="elevation-1"
                            :src="getGameImg(item.platformCode, item.imageName)"
                            height="2.773rem"
                            width="100%"
                            lazy-load
                            @click.native.stop="goRouter(item)"
                        >
                            <template v-slot:loading>
                                <van-loading type="spinner" size="20" />
                            </template>
                        </van-image>
                    </van-col>

                    <div
                        v-else
                        class="mb-3"
                        style="
                            float: left;
                            width: calc((100% - 10px) / 2);
                            margin-right: 4.9px;
                            box-sizing: border-box;
                            min-height: 0.02667rem;
                        "
                    >
                        <div class="background-white elevation-1 radius-1">
                            <van-image
                                :src="
                                    item.hasGameItems
                                        ? getPlatformImg(item)
                                        : getGameImg(
                                              item.platformCode,
                                              item.imageName,
                                              item.categoryCode
                                          )
                                "
                                width="100%"
                                height="3.2rem"
                                lazy-load
                                @click.native.stop="goRouter(item)"
                            >
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>  
                            </van-image>

                            <div
                                class="text-left pt-1 pb-2 px-2"
                                style="color: #535867; font-weight: bold"
                            >
                                <p class="van-ellipsis" style="height: 17px">{{ item.gameName }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else-if="platformCodeActive === 'skyLottery'">
                    <van-col span="8" class="px-3 my-3">
                        <div
                            class="flex flex-d-column justify-content-center align-items-center"
                        >
                            <van-image
                                class="skyLottery-game-pic"
                                :src="getLotteryImage(item.icon)"
                                height="90px"
                                width="90px"
                                lazy-load
                                @click.native.stop="goLotteryRouter(item)"
                            >
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                            </van-image>
                            <span class="mt-2">{{ item.name }}</span>
                        </div>
                    </van-col>

                    <van-col
                        v-if="
                            skgCode === 'skyLottery' &&
                            index === gameData.length - 1
                        "
                        span="24"
                        class="px-3 my-3"
                    >
                        <!-- 中奖清单 -->
                        <van-cell center class="text-left">
                            <template #title>
                                <span class="title-left-border">{{
                                    $$t("_1")
                                }}</span>
                            </template>
                        </van-cell>

                        <div class="notice-box">
                            <van-swipe
                                vertical
                                style="height: 100px"
                                :autoplay="3000"
                                :duration="3000"
                                :touchable="false"
                                :show-indicators="false"
                            >
                                <van-swipe-item
                                    v-for="(itemlist, i) in 10"
                                    :key="i"
                                    style="padding: 5px"
                                >
                                    <ol>
                                        <li
                                            v-for="(
                                                item, index
                                            ) in makeFakeOwnData(itemlist)"
                                            :key="index"
                                            style="
                                                font-size: 13px;
                                                width: 100%;
                                                display: inline-flex;
                                            "
                                        >
                                            <span
                                                style="
                                                    text-align: left;
                                                    width: 33%;
                                                "
                                                >{{
                                                    hidenText(item.name, 2, 2)
                                                }}</span
                                            >
                                            <span
                                                style="
                                                    text-align: left;
                                                    width: 44%;
                                                    overflow: hidden;
                                                    white-space: nowrap;
                                                    text-overflow: ellipsis;
                                                "
                                                >{{ item.game }}</span
                                            >
                                            <span
                                                style="
                                                    text-align: left;
                                                    width: 22%;
                                                    color: red;
                                                    font-weight: bolder;
                                                "
                                                >{{
                                                    isShowK.currencySymbol ||
                                                    isShowK.symbol
                                                }}
                                                {{ item.price }}
                                                {{
                                                    isShowK.currencyDenomination ||
                                                    isShowK.denomination
                                                }}</span
                                            >
                                        </li>
                                    </ol>
                                </van-swipe-item>
                            </van-swipe>
                        </div>
                    </van-col>
                </div>

                <van-col span="12" class="mb-3" v-else>
                    <van-image
                        class="elevation-1"
                        lazy-load
                        :src="getPlatformImg(item)"
                        width="100%"
                        height="3.6rem"
                        @click.native.stop="goRouter(item)"
                    >
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                </van-col>
            </div>
        </template>
    </van-row>
        <!-- 佔位 -->
    <div v-if="skinCode !== '9393' && gameData.length" style="width: 100%; height: 10vh" />
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
        hidenText(str, frontLen, endLen) {
            //str：要进行隐藏的变量  frontLen: 前面需要保留几位   endLen: 后面需要保留几位
            var len = str.length - frontLen - endLen;
            var xing = "";
            for (var i = 0; i < len; i++) {
                xing += "*";
            }
            return (
                str.substring(0, frontLen) +
                xing +
                str.substring(str.length - endLen)
            );
        },
        makeFakeOwnData() {
            const mapGames = JSON.parse(
                sessionStorage.getItem("gameCategorysLottery")
            )
                .filter((t) => t.name !== null)
                .map((t) => t.name);
            const maxNum = mapGames.length - 1;
            const randomKey = (min, max) =>
                Math.floor(Math.random() * (max - min + 1)) + min;
            const randArrayFun = (len, min, max) =>
                Array(len)
                    .fill(1)
                    .map(() => Math.floor(Math.random() * (max - min)) + min);
            const randArray = randArrayFun(6, 100000, 50);

            return [
                {
                    name: this.handleRandomAccount(),
                    game: mapGames[randomKey(0, maxNum)],
                    price: randArray[0],
                },
                {
                    name: this.handleRandomAccount(),
                    game: mapGames[randomKey(0, maxNum)],
                    price: randArray[1],
                },
                {
                    name: this.handleRandomAccount(),
                    game: mapGames[randomKey(0, maxNum)],
                    price: randArray[2],
                },
                {
                    name: this.handleRandomAccount(),
                    game: mapGames[randomKey(0, maxNum)],
                    price: randArray[3],
                },
                {
                    name: this.handleRandomAccount(),
                    game: mapGames[randomKey(0, maxNum)],
                    price: randArray[4],
                },
            ];
        },
        handleRandomAccount() {
            const upperChars = [];
            const lowerChars = [];
            // A ~ Z 的編碼是 65 ~ 90
            for (let i = 65; i < 91; i++) {
                let char = String.fromCharCode(i);
                upperChars.push(char);
                lowerChars.push(char.toLowerCase());
            }
            const nums = [];
            for (let i = 0; i <= 9; i++) {
                nums.push(i);
            }
            // 合併大小寫字母與數字
            const arr = upperChars.concat(lowerChars, nums);
            const sixCodes = [];

            for (let i = 1; i <= 6; i++) {
                let randomCode = arr[Math.floor(Math.random() * 62)];
                sixCodes.push(randomCode);
            }
            return sixCodes.join("");
        },
        getPlatformImg(item) {
            if (!item.hasGameItems)
                return this.getGameImg(item.platformCode, item.imageName);
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
                            (t) => (t.type === item.gameCode) && (t.bigType !== 'hot')
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