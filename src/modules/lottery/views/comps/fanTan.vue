<template>
    <div class="fanTan">
        <div class="container">
            <div class="left-content">
                <div
                    v-if="jiao && jiao.playTypeName"
                    style="border-radius: 8px 0 0 0"
                    class="btn-1"
                    @click="
                        setBetContent(
                            jiao.lotteryBetContent[0].betContent,
                            jiao.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                jiao.lotteryBetContent[0].betContent,
                                jiao.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text">{{ jiao.playTypeName }}</div>
                    <div class="btn-text">
                        {{ jiao.lotteryBetContent[0].betContentName }}
                    </div>
                    <div class="odds">{{ jiao.lotteryBetContent[0].odds }}</div>
                </div>
                <div
                    v-if="jiao && jiao.playTypeName"
                    class="btn-1"
                    @click="
                        setBetContent(
                            jiao.lotteryBetContent[1].betContent,
                            jiao.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                jiao.lotteryBetContent[1].betContent,
                                jiao.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text">{{ jiao.playTypeName }}</div>
                    <div class="btn-text">
                        {{ jiao.lotteryBetContent[1].betContentName }}
                    </div>
                    <div class="odds">{{ jiao.lotteryBetContent[1].odds }}</div>
                </div>
            </div>

            <div class="center-content">
                <div
                    v-if="fan && fan.playTypeName"
                    class="fan fan-1"
                    @click="
                        setBetContent(
                            fan.lotteryBetContent[0].betContent,
                            fan.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                fan.lotteryBetContent[0].betContent,
                                fan.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text" style="font-size: 14px">
                        {{ fan.lotteryBetContent[0].betContentName
                        }}{{ fan.playTypeName }}
                    </div>
                    <div class="odds">{{ fan.lotteryBetContent[0].odds }}</div>
                </div>
                <div
                    v-if="fan && fan.playTypeName"
                    class="fan fan-2"
                    @click="
                        setBetContent(
                            fan.lotteryBetContent[1].betContent,
                            fan.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                fan.lotteryBetContent[1].betContent,
                                fan.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text" style="font-size: 14px">
                        {{ fan.lotteryBetContent[1].betContentName
                        }}{{ fan.playTypeName }}
                    </div>
                    <div class="odds">{{ fan.lotteryBetContent[1].odds }}</div>
                </div>
                <div
                    v-if="fan && fan.playTypeName"
                    class="fan fan-3"
                    @click="
                        setBetContent(
                            fan.lotteryBetContent[2].betContent,
                            fan.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                fan.lotteryBetContent[2].betContent,
                                fan.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text" style="font-size: 14px">
                        {{ fan.lotteryBetContent[2].betContentName
                        }}{{ fan.playTypeName }}
                    </div>
                    <div class="odds">
                        {{ fan.lotteryBetContent[2].odds }}
                    </div>
                </div>
                <div
                    v-if="fan && fan.playTypeName"
                    class="fan fan-4"
                    @click="
                        setBetContent(
                            fan.lotteryBetContent[3].betContent,
                            fan.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                fan.lotteryBetContent[3].betContent,
                                fan.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text" style="font-size: 14px">
                        {{ fan.lotteryBetContent[3].betContentName
                        }}{{ fan.playTypeName }}
                    </div>
                    <div class="odds">
                        {{ fan.lotteryBetContent[3].odds }}
                    </div>
                </div>

                <div
                    class="dxds-center"
                    v-if="fanTanDxds && fanTanDxds.playTypeName"
                >
                    <div
                        v-for="(item, index) in fanTanDxds.lotteryBetContent"
                        :key="item.playType"
                        class="btn-2"
                        style="background: #16591c"
                        @click="
                            setBetContent(
                                fanTanDxds.lotteryBetContent[index].betContent,
                                fanTanDxds.playType
                            )
                        "
                    >
                        <div
                            v-if="
                                getActive(
                                    fanTanDxds.lotteryBetContent[index]
                                        .betContent,
                                    fanTanDxds.playType
                                )
                            "
                            class="bet-money-block"
                        >
                            <img src="images/lottery/sicBo/bet_money_bg.png" />
                            <div class="money">{{ money }}</div>
                        </div>
                        <div class="btn-text">
                            {{
                                fanTanDxds.lotteryBetContent[index]
                                    .betContentName
                            }}
                        </div>
                        <div class="odds">
                            {{ fanTanDxds.lotteryBetContent[index].odds }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="right-content">
                <div
                    v-if="jiao && jiao.playTypeName"
                    style="border-radius: 0 8px 0 0"
                    class="btn-1"
                    @click="
                        setBetContent(
                            jiao.lotteryBetContent[2].betContent,
                            jiao.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                jiao.lotteryBetContent[2].betContent,
                                jiao.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text">{{ jiao.playTypeName }}</div>
                    <div class="btn-text">
                        {{ jiao.lotteryBetContent[2].betContentName }}
                    </div>
                    <div class="odds">{{ jiao.lotteryBetContent[2].odds }}</div>
                </div>
                <div
                    v-if="jiao && jiao.playTypeName"
                    class="btn-1"
                    @click="
                        setBetContent(
                            jiao.lotteryBetContent[3].betContent,
                            jiao.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                jiao.lotteryBetContent[3].betContent,
                                jiao.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text">{{ jiao.playTypeName }}</div>
                    <div class="btn-text">
                        {{ jiao.lotteryBetContent[3].betContentName }}
                    </div>
                    <div class="odds">{{ jiao.lotteryBetContent[3].odds }}</div>
                </div>
            </div>

            <div class="content-1" v-if="sanmen && sanmen.playTypeName">
                <div
                    v-for="(item, index) in sanmen.lotteryBetContent"
                    :key="item.playType"
                    class="btn-3"
                    style="background: #16591c"
                    @click="
                        setBetContent(
                            sanmen.lotteryBetContent[index].betContent,
                            sanmen.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                sanmen.lotteryBetContent[index].betContent,
                                sanmen.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text">{{ sanmen.playTypeName }}</div>
                    <div class="btn-text">
                        {{ sanmen.lotteryBetContent[index].betContentName }}
                    </div>
                    <div class="odds">
                        {{ sanmen.lotteryBetContent[index].odds }}
                    </div>
                </div>
            </div>

            <div class="content-1" v-if="zheng && zheng.playTypeName">
                <div
                    v-for="(item, index) in zheng.lotteryBetContent"
                    :key="item.playType"
                    class="btn-3"
                    @click="
                        setBetContent(
                            zheng.lotteryBetContent[index].betContent,
                            zheng.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                zheng.lotteryBetContent[index].betContent,
                                zheng.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text">{{ zheng.playTypeName }}</div>
                    <div class="btn-text">
                        {{ zheng.lotteryBetContent[index].betContentName }}
                    </div>
                    <div class="odds">
                        {{ zheng.lotteryBetContent[index].odds }}
                    </div>
                </div>
            </div>

            <div class="content-2" v-if="nian && nian.playTypeName">
                <div
                    v-for="(item, index) in nian.lotteryBetContent"
                    :key="item.playType"
                    class="btn-4"
                    style="background: #16591c"
                    @click="
                        setBetContent(
                            nian.lotteryBetContent[index].betContent,
                            nian.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                nian.lotteryBetContent[index].betContent,
                                nian.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text">{{ nian.playTypeName }}</div>
                    <div class="btn-text">
                        {{ nian.lotteryBetContent[index].betContentName }}
                    </div>
                    <div class="odds">
                        {{ nian.lotteryBetContent[index].odds }}
                    </div>
                </div>
            </div>

            <div class="content-2" v-if="tong1 && tong1.playTypeName">
                <div
                    v-for="(item, index) in tong1.lotteryBetContent"
                    :key="item.playType"
                    class="btn-4"
                    @click="
                        setBetContent(
                            tong1.lotteryBetContent[index].betContent,
                            tong1.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                tong1.lotteryBetContent[index].betContent,
                                tong1.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text">{{ tong1.playTypeName }}</div>
                    <div class="btn-text">
                        {{ tong1.lotteryBetContent[index].betContentName }}
                    </div>
                    <div class="odds">
                        {{ tong1.lotteryBetContent[index].odds }}
                    </div>
                </div>

                <div
                    v-for="(item, index) in tong2.lotteryBetContent"
                    :key="item.playType"
                    class="btn-4"
                    @click="
                        setBetContent(
                            tong2.lotteryBetContent[index].betContent,
                            tong2.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                tong2.lotteryBetContent[index].betContent,
                                tong2.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text">{{ tong2.playTypeName }}</div>
                    <div class="btn-text">
                        {{ tong2.lotteryBetContent[index].betContentName }}
                    </div>
                    <div class="odds">
                        {{ tong2.lotteryBetContent[index].odds }}
                    </div>
                </div>

                <div
                    v-for="(item, index) in tong3.lotteryBetContent"
                    :key="item.playType"
                    :style="index === 0 ? 'border-radius: 0 0 0 8px' : ''"
                    class="btn-4"
                    @click="
                        setBetContent(
                            tong3.lotteryBetContent[index].betContent,
                            tong3.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                tong3.lotteryBetContent[index].betContent,
                                tong3.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text">{{ tong3.playTypeName }}</div>
                    <div class="btn-text">
                        {{ tong3.lotteryBetContent[index].betContentName }}
                    </div>
                    <div class="odds">
                        {{ tong3.lotteryBetContent[index].odds }}
                    </div>
                </div>

                <div
                    v-for="(item, index) in tong4.lotteryBetContent"
                    :key="item.playType"
                    :style="index === 2 ? 'border-radius: 0 0 8px 0' : ''"
                    class="btn-4"
                    @click="
                        setBetContent(
                            tong4.lotteryBetContent[index].betContent,
                            tong4.playType
                        )
                    "
                >
                    <div
                        v-if="
                            getActive(
                                tong4.lotteryBetContent[index].betContent,
                                tong4.playType
                            )
                        "
                        class="bet-money-block"
                    >
                        <img src="images/lottery/sicBo/bet_money_bg.png" />
                        <div class="money">{{ money }}</div>
                    </div>
                    <div class="btn-text">{{ tong4.playTypeName }}</div>
                    <div class="btn-text">
                        {{ tong4.lotteryBetContent[index].betContentName }}
                    </div>
                    <div class="odds">
                        {{ tong4.lotteryBetContent[index].odds }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "fanTan",
    props: {
        playType: {
            type: Array,
            require: true,
        },
        setBetContent: {
            type: Function,
            require: true,
        },
        money: {
            type: String,
            require: true,
        },
        betContents: {
            type: Array,
            require: true,
        },
    },
    computed: {
        fan() {
            return this.playType.find((item) => item.playType === "fan");
        },
        fanTanDxds() {
            return this.playType.find((item) => item.playType === "fanTanDxds");
        },
        nian() {
            return this.playType.find((item) => item.playType === "nian");
        },
        jiao() {
            return this.playType.find((item) => item.playType === "jiao");
        },
        zheng() {
            return this.playType.find((item) => item.playType === "zheng");
        },
        sanmen() {
            return this.playType.find((item) => item.playType === "sanmen");
        },
        tong1() {
            return this.playType.find((item) => item.playType === "1tong");
        },
        tong2() {
            return this.playType.find((item) => item.playType === "2tong");
        },
        tong3() {
            return this.playType.find((item) => item.playType === "3tong");
        },
        tong4() {
            return this.playType.find((item) => item.playType === "4tong");
        },
    },

    methods: {
        getActive(item, playType) {
            return this.betContents.some(
                (e) => e.playType === playType && e.betContent === item
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.fanTan {
    background: #16591c;
    min-height: 700px;
    padding: 15px 5px 10px 5px;

    .container {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        border-radius: 8px;
        background: #267c39;
        border: 1px solid #a99968;
        font-weight: bold;
    }

    .odds {
        color: #ffe79f;
    }

    .btn-text {
        font-size: 13px;
    }

    .left-content,
    .right-content {
        width: calc((100% - 240px) / 2);
    }

    .btn-1 {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 120px;
        border: 1px solid #a99968;
        color: #fff;
    }

    .center-content {
        position: relative;
        border-color: #ffdf30 #dbdbdb #1e8fd5 #eca047;
        border-style: solid solid solid solid;
        border-width: 50px;

        height: 240px;
        width: 240px;
    }

    .fan {
        position: absolute;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .odds {
            color: #000;
        }
    }

    .fan-1 {
        width: 50px;
        height: 140px;
        left: 140px;
        top: 0px;
    }

    .fan-2 {
        width: 140px;
        height: 50px;
        left: 0px;
        top: 140px;
    }

    .fan-3 {
        width: 50px;
        height: 140px;
        left: -50px;
        top: 0px;
    }

    .fan-4 {
        width: 140px;
        height: 50px;
        left: 0px;
        top: -50px;
    }

    .dxds-center {
        display: flex;
        flex-wrap: wrap;
    }

    .btn-2 {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 70px;
        border: 1px solid #a99968;
        color: #fff;
    }

    .btn-3 {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 25%;
        height: 70px;
        border: 1px solid #a99968;
        color: #fff;
    }

    .content-1 {
        display: flex;
        width: 100%;
    }

    .content-2 {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
    }

    .btn-4 {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: calc(100% / 6);
        height: 70px;
        border: 1px solid #a99968;
        color: #fff;
    }

    .bet-money-block {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 50px;

        img {
            display: block;
            max-width: 100%;
        }

        .money {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 12px;
        }
    }
}
</style>