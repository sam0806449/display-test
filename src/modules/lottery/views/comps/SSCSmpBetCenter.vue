<template>
    <div v-if="!overlay" id="sscsimple" :class="{ step2: step === 2 }" :key="step">
        <div v-if="step === 2" class="play-bg">
            <div v-if="curPlay === '号码快投'" style="background: #f6f6f6">
                <div>
                    <div class="title-text">位置:</div>
                </div>
                <div
                    v-for="item in posList"
                    :key="item"
                    class="round-btn"
                    :class="{
                        active:
                            selectedPos.findIndex((t) => t === item) > -1 ||
                            item === curPos,
                    }"
                    @click="fastClickPos(item)"
                >
                    {{ item }}
                </div>
                <div>
                    <div class="title-text">号码({{ numberOdd }}倍)</div>
                </div>
                <div
                    v-for="item in betList"
                    :key="item"
                    class="round-btn"
                    :class="{
                        active:
                            selectedContent.findIndex((t) => t === item) > -1,
                    }"
                    @click="singleClickContent(item)"
                >
                    {{ item }}
                </div>
                <div>
                    <div class="title-text">形态:</div>
                </div>
                <div
                    v-for="item in typeList"
                    :key="item"
                    class="round-btn"
                    :class="{
                        active: curType === item,
                    }"
                    @click="clickContent(item)"
                >
                    {{ item }}
                </div>
            </div>

            <div v-if="curPlay === '号码'" style="background: #f6f6f6">
                <div>
                    <div class="title-text">
                        {{ posList[curNum - 1] }}位倍率{{ numberOdd }}
                    </div>
                </div>
                <div
                    v-for="item in betList"
                    :key="item"
                    class="round-btn"
                    :class="{
                        active:
                            selectedContent.findIndex((t) => t === item) > -1,
                    }"
                    @click="singleClickContent(item)"
                >
                    {{ item }}
                </div>
                <div>
                    <div class="title-text">{{ posList[curNum - 1] }}位</div>
                </div>
                <div
                    v-for="item in typeList"
                    :key="item"
                    class="round-btn"
                    :class="{
                        active: curType === item,
                    }"
                    @click="clickContent(item)"
                >
                    {{ item }}
                </div>
            </div>

            <div v-if="curPlay === '单双'" style="background: #f6f6f6">
                <div>
                    <div class="title-text">第{{ curNum }}球</div>
                </div>
                <div
                    v-for="item in evenOdd"
                    :key="item"
                    class="round-btn"
                    :class="{
                        active:
                            selectedContent.findIndex((t) => t === item) > -1,
                    }"
                    @click="onlySingleClickContent(item)"
                >
                    {{ item }}
                </div>
            </div>

            <div v-if="curPlay === '大小'" style="background: #f6f6f6">
                <div>
                    <div class="title-text">第{{ curNum }}球</div>
                </div>
                <div
                    v-for="item in bigSmall"
                    :key="item"
                    class="round-btn"
                    :class="{
                        active:
                            selectedContent.findIndex((t) => t === item) > -1,
                    }"
                    @click="onlySingleClickContent(item)"
                >
                    {{ item }}
                </div>
            </div>

            <div v-if="curPlay === '总和单双'" style="background: #f6f6f6">
                <div>
                    <div class="title-text">总和:</div>
                </div>
                <div
                    v-for="item in evenOdd"
                    :key="item"
                    class="round-btn"
                    :class="{
                        active:
                            selectedContent.findIndex((t) => t === item) > -1,
                    }"
                    @click="onlySingleClickContent(item)"
                >
                    {{ item }}
                </div>
            </div>
            <div v-if="curPlay === '总和大小'" style="background: #f6f6f6">
                <div>
                    <div class="title-text">总和:</div>
                </div>
                <div
                    v-for="item in bigSmall"
                    :key="item"
                    class="round-btn"
                    :class="{
                        active:
                            selectedContent.findIndex((t) => t === item) > -1,
                    }"
                    @click="onlySingleClickContent(item)"
                >
                    {{ item }}
                </div>
            </div>

            <div v-if="curPlay === '龙虎和'" style="background: #f6f6f6">
                <div>
                    <div class="title-text">下注类型:</div>
                </div>
                <div
                    v-for="item in dragonTiger"
                    :key="item"
                    class="round-btn"
                    :class="{
                        active:
                            selectedContent.findIndex((t) => t === item) > -1,
                    }"
                    @click="onlySingleClickContent(item)"
                >
                    {{ item }}
                </div>
            </div>

            <div
                v-if="['前三', '中三', '后三'].includes(curPlay)"
                style="background: #f6f6f6; padding-bottom: 10px"
            >
                <div>
                    <div class="title-text">{{ curPlay }}形态:</div>
                </div>
                <div
                    v-for="item in frontMidBackData"
                    :key="item.betContent"
                    class="full-btn-margin"
                    :class="{
                        active:
                            selectedContent.findIndex(
                                (t) => t === item.betContent
                            ) > -1,
                    }"
                    @click="crownSingleClickContent(item.betContent, item.odds)"
                >
                    {{ item.betContent }}(X{{ item.odds }}倍)
                </div>
            </div>

            <div
                v-if="['牛牛双面', '牛牛玩法'].includes(curPlay)"
                style="background: #f6f6f6; padding-bottom: 10px"
            >
                <div>
                    <div class="title-text">请选择</div>
                </div>
                <div
                    v-for="item in cowData"
                    :key="item.betContent"
                    class="full-btn-margin"
                    :class="{
                        active:
                            selectedContent.findIndex(
                                (t) => t === item.betContent
                            ) > -1,
                    }"
                    @click="crownSingleClickContent(item.betContent, item.odds)"
                >
                    {{ item.betContentName }}({{ item.odds }}倍)
                </div>
            </div>

            <div
                v-if="['梭哈玩法'].includes(curPlay)"
                style="background: #f6f6f6; padding-bottom: 10px"
            >
                <div>
                    <div class="title-text">请选择</div>
                </div>
                <div
                    v-for="item in (studList[0].lotteryBetContent || []).filter(
                        (item) => item.betContent !== '五条'
                    )"
                    :key="item.betContent"
                    class="full-btn-margin"
                    :class="{
                        active:
                            selectedContent.findIndex(
                                (t) => t === item.betContent
                            ) > -1,
                    }"
                    @click="crownSingleClickContent(item.betContent, item.odds)"
                >
                    {{ item.betContent }}({{ item.odds }}倍)
                </div>
            </div>

            <div
                v-if="
                    [
                        '连码后二',
                        '连码后三',
                        '连码后四',
                        '五星直选',
                        '五星通选',
                    ].includes(this.curPlay)
                "
                style="background: #f6f6f6"
            >
                <div
                    v-for="(tpyeItem, index) in playList[curPlay].ruleList"
                    :key="`tpyeItem${index}`"
                >
                    <div>
                        <div class="title-text">{{ tpyeItem.name }}:</div>
                    </div>
                    <div
                        v-for="item in betList"
                        :key="`十位:${item}`"
                        class="round-btn"
                        :class="{
                            active:
                                curSelected[index] &&
                                curSelected[index].indexOf(item) > -1,
                        }"
                        @click="selectBet(item, index)"
                    >
                        {{ item }}
                    </div>
                </div>

                <div
                    v-for="(tpyeItem, index) in playList[curPlay].ruleList"
                    :key="`operate${index}`"
                >
                    <div>
                        <div class="title-text">{{ tpyeItem.name }}</div>
                    </div>
                    <div
                        v-for="item in typeAllList"
                        :key="`${tpyeItem.name}${item}`"
                        class="round-btn"
                        style="position: relative;"
                        :class="{
                            'operate-active': curPosSelected[index] === item,
                        }"
                        @click="doOperate(item, index)"
                    >
                        <div class="operate-btn"> {{ item }}</div>
                    </div>
                    <van-field
                        :value="curSelected && curSelected[index].join(',')"
                        disabled
                        class="bet-num-input"
                        style="font-size: 18px"
                    />
                    <div style="background: #fff; padding: 4px 0">
                        <div class="clear-btn" @click="doOperate('清', index)">
                            清
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div v-if="step === 3" class="step3-wrap">
            <div
                v-if="
                    ![
                        '连码后二',
                        '连码后三',
                        '连码后四',
                        '五星直选',
                        '五星通选',
                    ].includes(curPlay)
                "
            >
                {{ curNum !== 0 ? `第${curNum}个球:` : totalBetPlayName }}
                {{ totalBetContentName }}
            </div>
            <div
                v-if="
                    ![
                        '连码后二',
                        '连码后三',
                        '连码后四',
                        '五星直选',
                        '五星通选',
                    ].includes(curPlay)
                "
            >
                下注金币: {{ +curChip }}元
                {{
                    [
                        "单双",
                        "大小",
                        "总和单双",
                        "总和大小",
                        "龙虎和",
                        "前三",
                        "中三",
                        "后三",
                        "牛牛双面",
                        "牛牛玩法",
                        "梭哈玩法",
                    ].includes(curPlay)
                        ? `,需要金币 ¥
                    ${finalBetItmes.length * curChip}
                元`
                        : "(单注)"
                }}
            </div>
            <div
                v-if="
                    ![
                        '单双',
                        '大小',
                        '总和单双',
                        '总和大小',
                        '龙虎和',
                        '前三',
                        '中三',
                        '后三',
                        '牛牛双面',
                        '牛牛玩法',
                        '梭哈玩法',
                        '连码后二',
                        '连码后三',
                        '连码后四',
                        '五星直选',
                        '五星通选',
                    ].includes(curPlay)
                "
            >
                共 {{ finalBetItmes.length }} 个注单,需要金币 ¥{{
                    finalBetItmes.length * curChip
                }}元
            </div>
            <template
                v-if="
                    [
                        '连码后二',
                        '连码后三',
                        '连码后四',
                        '五星直选',
                        '五星通选',
                    ].includes(curPlay)
                "
            >
                <div v-html="officeBetContent"></div>
                <div v-if="['五星直选', '五星通选'].includes(curPlay)">
                    共{{ timesNum * curTypeList.basicMoney }}注,需要金币{{
                        timesNum * curChip * curTypeList.basicMoney
                    }}元({{ +curChip }}倍)
                </div>
                <div v-else>
                    共{{ timesNum }}注,需要金币{{ timesNum * curChip }}元(单注{{
                        +curChip
                    }})
                </div>
            </template>

            <div>预计奖金: {{ totalBonus }}元</div>
        </div>

        <div style="width:100%; height: 50px;" />
    </div>
</template>

<script>
export default {
    name: "SSCSmpBetCenter",
    props: [
        "lottery",
        "clearSignal",
        "finalBetItmes",
        "activeName",
    ],
    data() {
        return {
            betList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            curChip: 3,
            overlay: false,
            step: 2,
            curPlay: "",
            curNum: 0,
            sumList: [],
            typeList: ["大", "小", "单", "双"],
            typeAllList: ["大", "小", "单", "双", "全"],
            evenOddBigSmallMix: [
                { key: "smallOdd", name: "小单" },
                { key: "smallEven", name: "小双" },
                { key: "bigOdd", name: "大单" },
                { key: "bigEven", name: "大双" },
            ],
            evenOdd: ["单", "双"],
            bigSmall: ["大", "小"],
            dragonTiger: ["龙", "虎", "和"],
            posList: ["万", "千", "百", "十", "个", "全"],
            numList: [
                "一",
                "二",
                "三",
                "四",
                "五",
                "六",
                "七",
                "八",
                "九",
                "十",
            ],
            list: [
                {
                    name: "第一球,万位→",
                    key1: "第一球",
                    key2: "第一球大小单双",
                },
                {
                    name: "第二球,千位→",
                    key1: "第二球",
                    key2: "第二球大小单双",
                },
                {
                    name: "第三球,百位→",
                    key1: "第三球",
                    key2: "第三球大小单双",
                },
                {
                    name: "第四球,十位→",
                    key1: "第四球",
                    key2: "第四球大小单双",
                },
                {
                    name: "第五球,个位→",
                    key1: "第五球",
                    key2: "第五球大小单双",
                },
            ],
            doubleSideList: [],
            singleBallList: [],
            frontMidBackList: [],
            cowList: [],
            studList: [],
            key3Data: [],
            numberOdd: "",
            curPos: "",
            curType: "",
            selectedPos: [],
            selectedContent: [],
            singleOdd: "",
            curSelected: [],
            curPosSelected: [],
            playList: {
                连码后二: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: "十位", minLength: 1 },
                        { name: "个位", minLength: 1 },
                    ],
                },
                连码后三: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: "百位", minLength: 1 },
                        { name: "十位", minLength: 1 },
                        { name: "个位", minLength: 1 },
                    ],
                },
                连码后四: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: "千位", minLength: 1 },
                        { name: "百位", minLength: 1 },
                        { name: "十位", minLength: 1 },
                        { name: "个位", minLength: 1 },
                    ],
                },
                五星直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: "万位", minLength: 1 },
                        { name: "千位", minLength: 1 },
                        { name: "百位", minLength: 1 },
                        { name: "十位", minLength: 1 },
                        { name: "个位", minLength: 1 },
                    ],
                },
                五星通选: {
                    basicMoney: 5,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: "万位", minLength: 1 },
                        { name: "千位", minLength: 1 },
                        { name: "百位", minLength: 1 },
                        { name: "十位", minLength: 1 },
                        { name: "个位", minLength: 1 },
                    ],
                },
            },
            officePlayTypeList: {},
            timesNum: 0,
        };
    },

    computed: {
        totalBetPlayName() {
            if (["总和单双", "总和大小"].includes(this.curPlay)) {
                return "总和:";
            }
            if (
                [
                    "龙虎和",
                    "前三",
                    "中三",
                    "后三",
                    "牛牛双面",
                    "牛牛玩法",
                    "梭哈玩法",
                ].includes(this.curPlay)
            ) {
                return "下注类型:";
            }
            return `${this.selectedPos.join(",")}位号码:`;
        },
        totalBetContentName() {
            if (
                [
                    "单双",
                    "总和单双",
                    "大小",
                    "总和大小",
                    "龙虎和",
                    "前三",
                    "中三",
                    "后三",
                    "牛牛双面",
                    "牛牛玩法",
                    "梭哈玩法",
                ].includes(this.curPlay)
            ) {
                if (
                    ["niuPrime", "niuComposite"].includes(
                        this.selectedContent[0]
                    )
                ) {
                    return this.selectedContent[0] === "niuPrime"
                        ? "牛质"
                        : "牛合";
                }

                return this.selectedContent.join(",");
            }

            return this.selectedContent
                .map((item) => item)
                .sort((a, b) => a - b)
                .join(",");
        },

        totalBonus() {
            if (this.curPlay === "五星通选") {
                return `${(
                    (this.officePlayType.lotteryBetContent &&
                        this.officePlayType.lotteryBetContent[0].odds) *
                    this.curChip
                ).toFixed(1)} ~ ${
                    (this.officePlayType.lotteryBetContent &&
                        this.officePlayType.lotteryBetContent[0].odds) *
                    this.curChip *
                    10000
                }`;
            }
            if (
                ["连码后二", "连码后三", "连码后四", "五星直选"].includes(
                    this.curPlay
                )
            ) {
                return (
                    (this.officePlayType.lotteryBetContent &&
                        this.officePlayType.lotteryBetContent[0].odds) *
                    this.curChip
                );
            }

            if (this.curPlay === "号码快投") {
                return `${(this.curChip * this.numberOdd).toFixed(1)} ~ ${(
                    this.curChip *
                    this.numberOdd *
                    5
                ).toFixed(2)}`;
            }
            if (this.curPlay === "单双") {
                const curKey = this.list[this.curNum - 1].key2;
                const odds = this.doubleSideList
                    .find((item) => item.playType === curKey)
                    .lotteryBetContent.find(
                        (item) => item.betContent === "单"
                    ).odds;
                return (this.curChip * odds).toFixed(2);
            }
            if (this.curPlay === "大小") {
                const curKey = this.list[this.curNum - 1].key2;
                const odds = this.doubleSideList
                    .find((item) => item.playType === curKey)
                    .lotteryBetContent.find(
                        (item) => item.betContent === "大"
                    ).odds;
                return (this.curChip * odds).toFixed(2);
            }
            if (this.curPlay === "总和单双") {
                const odds = this.doubleSideList
                    .find((item) => item.playType === "总和")
                    .lotteryBetContent.find(
                        (item) => item.betContent === "单"
                    ).odds;
                return (this.curChip * odds).toFixed(2);
            }
            if (this.curPlay === "总和大小") {
                const odds = this.doubleSideList
                    .find((item) => item.playType === "总和")
                    .lotteryBetContent.find(
                        (item) => item.betContent === "大"
                    ).odds;
                return (this.curChip * odds).toFixed(2);
            }
            if (this.curPlay === "龙虎和") {
                const odds = this.doubleSideList
                    .find((item) => item.playType === "龙虎")
                    .lotteryBetContent.find(
                        (item) => item.betContent === this.selectedContent[0]
                    ).odds;
                return (this.curChip * odds).toFixed(2);
            }

            if (
                [
                    "前三",
                    "中三",
                    "后三",
                    "牛牛双面",
                    "牛牛玩法",
                    "梭哈玩法",
                ].includes(this.curPlay)
            ) {
                return (this.curChip * this.singleOdd).toFixed(2);
            }
            return (this.curChip * this.numberOdd).toFixed(1);
        },

        otherOdds() {
            if (this.curPlay === "单双") {
                const curKey = this.list[this.curNum - 1].key2;
                return this.doubleSideList
                    .find((item) => item.playType === curKey)
                    .lotteryBetContent.find(
                        (item) => item.betContent === "even"
                    ).odds;
            }
            if (this.curPlay === "大小") {
                const curKey = this.list[this.curNum - 1].key2;
                return this.doubleSideList
                    .find((item) => item.playType === curKey)
                    .lotteryBetContent.find((item) => item.betContent === "big")
                    .odds;
            }
            if (this.curPlay === "龙虎") {
                const curKey = this.list[this.curNum - 1].key2;
                return this.doubleSideList
                    .find((item) => item.playType === curKey)
                    .lotteryBetContent.find(
                        (item) => item.betContent === "dragon"
                    ).odds;
            }
            return 0;
        },

        frontMidBackData() {
            const list = this.frontMidBackList.find(
                (item) => item.playType === `${this.curPlay}特殊号`
            );
            return (list && list.lotteryBetContent) || [];
        },

        cowData() {
            if (this.curPlay === "牛牛双面") {
                const part1 = this.cowList.find(
                    (item) => item.playType === "斗牛大小单双"
                );
                const part2 = this.cowList.find(
                    (item) => item.playType === "Bull2sides"
                );
                return [
                    ...(part1.lotteryBetContent || []),
                    ...(part2.lotteryBetContent || []),
                ];
            }

            return (
                this.cowList.find((item) => item.playType === "斗牛")
                    .lotteryBetContent || []
            );
        },

        curTypeList() {
            return this.playList[this.curPlay];
        },

        officePlayType() {
            if (
                ![
                    "连码后二",
                    "连码后三",
                    "连码后四",
                    "五星直选",
                    "五星通选",
                ].includes(this.curPlay)
            ) {
                return {};
            }
            return this.officePlayTypeList[this.curPlay][0]
        },

        officeBetContent() {
            try {
                return this.curTypeList.ruleList
                    .map((item, index) => {
                        return `<div>${item.name}: ${this.curSelected[
                            index
                        ].join(",")}</div>`;
                    })
                    .join("");
            } catch {
                return "";
            }
        },
    },

    watch: {
        '$route'() {
          this.entryPlay();
          this.curPos = "";
          this.curType = "";
          this.selectedPos = [];
          this.selectedContent = [];
          this.curChip = 3;
        },
        clearSignal(v) {
            if (v) {
                this.curPos = "";
                this.curType = "";
                this.selectedPos = [];
                this.selectedContent = [];
                this.curChip = 3;
            }
        },
        activeName() {
            this.curPos = "";
            this.curType = "";
            this.selectedPos = [];
            this.selectedContent = [];
            this.curChip = 3;
            this.step = 2;
            this.curPlay = "";
            this.curNum = 0;
        },
    },

    created() {
        this.entryPlay()
        const saveData = JSON.parse(sessionStorage.getItem('sscSmpData'));
        if (!saveData) {
            this.fetchPlayTypes();
        } else {
            const { doubleSideList, singleBallList, frontMidBackList, cowList, studList, numberOdd, officePlayTypeList } = saveData;
            this.doubleSideList = doubleSideList;
            this.singleBallList = singleBallList;
            this.frontMidBackList = frontMidBackList;
            this.cowList = cowList;
            this.studList = studList;
            this.numberOdd = numberOdd;
            this.officePlayTypeList = officePlayTypeList;
        }
    },

    methods: {
        fetchPlayTypes() {
            this.showProgress(true);
            Promise.all([
                this.$get(
                    `/api/Lottery/GetPlayType?type=${this.lottery}&baseBet=两面盘`
                ),
                this.$get(
                    `/api/Lottery/GetPlayType?type=${this.lottery}&baseBet=单球1-5`
                ),
                this.$get(
                    `/api/Lottery/GetPlayType?type=${this.lottery}&baseBet=前中后`
                ),
                this.$get(
                    `/api/Lottery/GetPlayType?type=${this.lottery}&baseBet=斗牛`
                ),
                this.$get(
                    `/api/Lottery/GetPlayType?type=${this.lottery}&baseBet=梭哈`
                ),
                this.$get(
                    `/api/Lottery/GetPlayType?type=${this.lottery}&allBet=后二直选复式`
                ),
                this.$get(
                    `/api/Lottery/GetPlayType?type=${this.lottery}&allBet=后三直选复式`
                ),
                this.$get(
                    `/api/Lottery/GetPlayType?type=${this.lottery}&allBet=后四直选复式`
                ),
                this.$get(
                    `/api/Lottery/GetPlayType?type=${this.lottery}&allBet=五星直选复式`
                ),
                this.$get(
                    `/api/Lottery/GetPlayType?type=${this.lottery}&allBet=五星组合`
                ),
            ])
                .then((resp) => {
                    if (resp[0].data.success && resp[1].data.success) {
                        return resp;
                    }

                    throw { message: "Error" };
                })
                .then(
                    ([
                        doubleSide,
                        singleBall,
                        frontMidBack,
                        cow,
                        stud,
                        back2,
                        back3,
                        back4,
                        fiveStar,
                        fiveStarAll,
                    ]) => {
                        this.doubleSideList = doubleSide.data.data;
                        this.singleBallList = singleBall.data.data;
                        this.frontMidBackList = frontMidBack.data.data;
                        this.cowList = cow.data.data;
                        this.studList = stud.data.data;
                        this.numberOdd =
                            this.singleBallList[0].lotteryBetContent[0].odds;
                        this.officePlayTypeList = {
                            连码后二: back2.data.data,
                            连码后三: back3.data.data,
                            连码后四: back4.data.data,
                            五星直选: fiveStar.data.data,
                            五星通选: fiveStarAll.data.data,
                        };
                        this.showProgress(false)
                        this.$sessionSet("sscSmpData", {
                            doubleSideList: this.doubleSideList,
                            singleBallList: this.singleBallList,
                            frontMidBackList: this.frontMidBackList,
                            cowList: this.cowList,
                            studList: this.studList,
                            numberOdd: this.numberOdd,
                            officePlayTypeList: this.officePlayTypeList
                        })
                    }
                )
                .catch((error) => {
                    this.showProgress(false)
                    this.procError(error);
                });
        },

        hadleBet({
            playType,
            betContent,
            playTypeName,
            betContentName,
            odds,
            money,
            typing,
        }) {
            this.$emit("sentBetPayload", {
                playType,
                betContent,
                playTypeName,
                betContentName,
                odds,
                money,
                typing,
            });
        },

        entryPlay() {
            const { type, num } = this.$route.query
            this.curPlay = type;
            this.curNum = num || 0;
            this.step = 2;
            this.initCurSelected();
            this.$emit("resetBetItems");
        },

        goStep3() {
            this.step = 3;
        },
        step2Reset() {
            this.curPos = "";
            this.curType = "";
            this.selectedPos = [];
            this.selectedContent = [];
            this.curChip = 3;
            this.step = 2;
            this.initCurSelected();
            this.timesNum = 0;
            this.curPosSelected = [];
        },

        resetAll() {
            this.initCurSelected();
            this.timesNum = 0;
            this.curPosSelected = [];
            this.curPos = "";
            this.curType = "";
            this.selectedPos = [];
            this.selectedContent = [];
            this.curChip = 3;
            this.step = 2;
            (this.curPlay = ""), (this.curNum = 0);
        },

        setAllBet() {
            if (["总和单双", "总和大小"].includes(this.curPlay)) {
                this.$emit("resetBetItems");
                const curData = this.doubleSideList.find(
                    (item) => item.playType === "总和"
                );
                this.selectedContent.forEach((content) => {
                    const curConetent = curData.lotteryBetContent.find(
                        (item) => item.betContent === `${content}`
                    );
                    this.hadleBet({
                        playType: curData.playType,
                        betContent: curConetent.betContent,
                        playTypeName: curData.playTypeName,
                        betContentName: curConetent.betContentName,
                        odds: curConetent.odds,
                        money: +this.curChip,
                    });
                });
                return;
            }

            if (["龙虎和"].includes(this.curPlay)) {
                this.$emit("resetBetItems");
                const curData = this.doubleSideList.find(
                    (item) => item.playType === "龙虎"
                );
                this.selectedContent.forEach((content) => {
                    const curConetent = curData.lotteryBetContent.find(
                        (item) => item.betContent === `${content}`
                    );
                    this.hadleBet({
                        playType: curData.playType,
                        betContent: curConetent.betContent,
                        playTypeName: curData.playTypeName,
                        betContentName: curConetent.betContentName,
                        odds: curConetent.odds,
                        money: +this.curChip,
                    });
                });
                return;
            }

            if (["牛牛双面"].includes(this.curPlay)) {
                this.$emit("resetBetItems");
                const curData = this.cowList.find(
                    (item) =>
                        item.playType ===
                        (["niuPrime", "niuComposite"].includes(
                            this.selectedContent[0]
                        )
                            ? "Bull2sides"
                            : "斗牛大小单双")
                );
                this.selectedContent.forEach((content) => {
                    const curConetent = curData.lotteryBetContent.find(
                        (item) => item.betContent === `${content}`
                    );
                    this.hadleBet({
                        playType: curData.playType,
                        betContent: curConetent.betContent,
                        playTypeName: curData.playTypeName,
                        betContentName: curConetent.betContentName,
                        odds: curConetent.odds,
                        money: +this.curChip,
                    });
                });
                return;
            }
            if (["牛牛玩法"].includes(this.curPlay)) {
                this.$emit("resetBetItems");
                const curData = this.cowList.find(
                    (item) => item.playType === "斗牛"
                );
                this.selectedContent.forEach((content) => {
                    const curConetent = curData.lotteryBetContent.find(
                        (item) => item.betContent === `${content}`
                    );
                    this.hadleBet({
                        playType: curData.playType,
                        betContent: curConetent.betContent,
                        playTypeName: curData.playTypeName,
                        betContentName: curConetent.betContentName,
                        odds: curConetent.odds,
                        money: +this.curChip,
                    });
                });
                return;
            }

            if (["梭哈玩法"].includes(this.curPlay)) {
                this.$emit("resetBetItems");
                const curData = this.studList.find(
                    (item) => item.playType === "梭哈"
                );
                this.selectedContent.forEach((content) => {
                    const curConetent = curData.lotteryBetContent.find(
                        (item) => item.betContent === `${content}`
                    );
                    this.hadleBet({
                        playType: curData.playType,
                        betContent: curConetent.betContent,
                        playTypeName: curData.playTypeName,
                        betContentName: curConetent.betContentName,
                        odds: curConetent.odds,
                        money: +this.curChip,
                    });
                });
                return;
            }

            if (["前三", "中三", "后三"].includes(this.curPlay)) {
                this.$emit("resetBetItems");
                const curData = this.frontMidBackList.find(
                    (item) => item.playType === `${this.curPlay}特殊号`
                );
                this.selectedContent.forEach((content) => {
                    const curConetent = curData.lotteryBetContent.find(
                        (item) => item.betContent === `${content}`
                    );
                    this.hadleBet({
                        playType: curData.playType,
                        betContent: curConetent.betContent,
                        playTypeName: curData.playTypeName,
                        betContentName: curConetent.betContentName,
                        odds: curConetent.odds,
                        money: +this.curChip,
                    });
                });
                return;
            }

            if (
                this.curNum === 0 &&
                (!this.selectedPos.length || !this.selectedContent.length)
            ) {
                this.$emit("resetBetItems");
                return;
            }
            this.$emit("resetBetItems");
            if (this.curNum === 0) {
                this.selectedPos.forEach((playType) => {
                    const tranType = {
                        万: "第一球",
                        千: "第二球",
                        百: "第三球",
                        十: "第四球",
                        个: "第五球",
                    };
                    const curData = this.singleBallList.find(
                        (item) => item.playType === tranType[playType]
                    );

                    this.selectedContent.forEach((content) => {
                        const curConetent = curData.lotteryBetContent.find(
                            (item) => item.betContent === `${content}`
                        );
                        this.hadleBet({
                            playType: curData.playType,
                            betContent: curConetent.betContent,
                            playTypeName: curData.playTypeName,
                            betContentName: curConetent.betContentName,
                            odds: curConetent.odds,
                            money: +this.curChip,
                        });
                    });
                });
                return;
            }

            let curData = {};
            if (this.curPlay === "号码") {
              curData = this.singleBallList[this.curNum - 1];
            }
            if (["单双", "大小"].includes(this.curPlay)) {
                const curKey = this.list[this.curNum - 1].key2;
                curData = this.doubleSideList.find(
                    (item) => item.playType === curKey
                );
            }

            this.$emit("resetBetItems");
            this.selectedContent.forEach((content) => {
                const curConetent = curData.lotteryBetContent.find(
                    (item) => item.betContent === `${content}`
                );
                this.hadleBet({
                    playType: curData.playType,
                    betContent: curConetent.betContent,
                    playTypeName: curData.playTypeName,
                    betContentName: curConetent.betContentName,
                    odds: curConetent.odds,
                    money: +this.curChip,
                });
            });
        },

        fastClickPos(pos) {
            if (pos === "全") {
                this.curPos = "全";
                this.selectedPos = ["万", "千", "百", "十", "个"];
                this.setAllBet();
                return;
            }

            this.singleClickPos(pos);
        },

        singleClickPos(pos) {
            this.curPos = "";
            if (this.selectedPos.includes(pos)) {
                this.selectedPos.splice(
                    this.selectedPos.findIndex((item) => item === pos),
                    1
                );
                this.setAllBet();
                return;
            }

            this.selectedPos.push(pos);
            this.setAllBet();
        },

        onlySingleClickContent(content) {
            this.curType = "";
            if (this.selectedContent.includes(content)) {
                this.selectedContent.splice(
                    this.selectedContent.findIndex((item) => item === content),
                    1
                );
                this.setAllBet();
                return;
            }

            this.selectedContent = [content];
            this.setAllBet();
        },

        singleClickContent(content) {
            this.curType = "";
            if (this.selectedContent.includes(content)) {
                this.selectedContent.splice(
                    this.selectedContent.findIndex((item) => item === content),
                    1
                );
                this.setAllBet();
                return;
            }

            this.selectedContent.push(content);
            this.setAllBet();
        },

        crownSingleClickContent(content, odd) {
            if (this.selectedContent.includes(content)) {
                this.selectedContent.splice(
                    this.selectedContent.findIndex((item) => item === content),
                    1
                );
                this.setAllBet();
                return;
            }

            this.selectedContent = [content];
            this.singleOdd = odd;
            this.setAllBet();
        },

        clickContent(tpye) {
            if (this.curType === tpye) {
                return;
            }

            this.curType = tpye;
            switch (tpye) {
                case "大":
                    this.selectedContent = [5, 6, 7, 8, 9];
                    break;
                case "小":
                    this.selectedContent = [0, 1, 2, 3, 4];
                    break;
                case "单":
                    this.selectedContent = [1, 3, 5, 7, 9];
                    break;
                default:
                    this.selectedContent = [0, 2, 4, 6, 8];
                    break;
            }

            this.setAllBet();
        },

        selectChip(chip) {
            this.curChip = chip;
        },

        initCurSelected() {
            if (
                ![
                    "连码后二",
                    "连码后三",
                    "连码后四",
                    "五星直选",
                    "五星通选",
                ].includes(this.curPlay)
            ) {
                return;
            }
            const len = this.playList[this.curPlay].ruleList.length;
            if (!len) {
                this.curSelected = [];
                return;
            }

            const newSelected = [];
            for (let i = 0; i < len; i++) {
                newSelected.push([]);
            }
            this.curSelected = newSelected;
        },

        selectBet(curValue, betItemIndex) {
            this.curPosSelected[betItemIndex] = "";
            const valueIndex = this.curSelected[betItemIndex].indexOf(curValue);
            if (valueIndex === -1) {
                this.$set(
                    this.curSelected,
                    betItemIndex,
                    [...this.curSelected[betItemIndex], curValue].sort(
                        (a, b) => a - b
                    )
                );
            } else {
                const cloneList = [...this.curSelected[betItemIndex]];
                cloneList.splice(valueIndex, 1);
                this.$set(this.curSelected, betItemIndex, cloneList);
            }
            this.handleSent();
        },

        doOperate(index, betItemIndex) {
            this.curPosSelected[betItemIndex] = index;
            switch (index) {
                case "全":
                    this.$set(this.curSelected, betItemIndex, this.betList);
                    break;
                case "大":
                    this.$set(
                        this.curSelected,
                        betItemIndex,
                        this.betList.filter((num) => num > 4)
                    );
                    break;
                case "小":
                    this.$set(
                        this.curSelected,
                        betItemIndex,
                        this.betList.filter((num) => num < 5)
                    );
                    break;
                case "单":
                    this.$set(
                        this.curSelected,
                        betItemIndex,
                        this.betList.filter((num) => num % 2 !== 0)
                    );
                    break;
                case "双":
                    this.$set(
                        this.curSelected,
                        betItemIndex,
                        this.betList.filter((num) => num % 2 === 0)
                    );
                    break;
                case "清":
                    this.$set(this.curSelected, betItemIndex, []);
                    break;
            }

            this.handleSent();
        },

        handleSent() {
            const curPlayType = this.officePlayType;
            let minCheckPass = false;
            let repeatCheckPass = !this.curTypeList.checkRepeat;

            if (this.curTypeList.any) {
                const valueCount = this.curSelected.reduce((init, current) => {
                    if (current.length > 0) {
                        return init + 1;
                    }
                    return init;
                }, 0);
                minCheckPass = valueCount >= this.curTypeList.any;
            } else {
                minCheckPass = this.curSelected.every(
                    (item, index) =>
                        item.length >=
                        this.curTypeList.ruleList[index].minLength
                );
            }

            if (this.curTypeList.checkRepeat) {
                const totalData = this.curSelected.flat();
                const filterData = totalData.filter(
                    (item, index, arr) => arr.indexOf(item) === index
                );
                repeatCheckPass = totalData.length === filterData.length;
            }

            let timesNum =
                this.curTypeList.customMoney ||
                this.curTypeList.calcAdd ||
                this.curTypeList.anyCompose
                    ? 0
                    : 1;
            const betItems = this.curSelected
                .reduce((init, current, index) => {
                    if (this.curTypeList.customMoney) {
                        for (let i = 0; i < current.length; i += 1) {
                            timesNum +=
                                this.curTypeList.customMoney[current[i]];
                        }
                    } else if (this.curTypeList.calcAdd) {
                        timesNum += current.length;
                    } else if (this.curTypeList.anyCompose) {
                        if (
                            index === this.curSelected.length - 1 &&
                            minCheckPass
                        ) {
                            if (this.curTypeList.any === 2) {
                                for (
                                    let i = 0;
                                    i < this.curSelected.length;
                                    i++
                                ) {
                                    for (
                                        let j = i + 1;
                                        j < this.curSelected.length;
                                        j++
                                    ) {
                                        timesNum +=
                                            this.curSelected[i].length *
                                            this.curSelected[j].length;
                                    }
                                }
                            }

                            if (this.curTypeList.any === 3) {
                                for (
                                    let i = 0;
                                    i < this.curSelected.length;
                                    i++
                                ) {
                                    for (
                                        let j = i + 1;
                                        j < this.curSelected.length;
                                        j++
                                    ) {
                                        for (
                                            let k = j + 1;
                                            k < this.curSelected.length;
                                            k++
                                        ) {
                                            timesNum +=
                                                this.curSelected[i].length *
                                                this.curSelected[j].length *
                                                this.curSelected[k].length;
                                        }
                                    }
                                }
                            }

                            if (this.curTypeList.any === 4) {
                                for (
                                    let i = 0;
                                    i < this.curSelected.length;
                                    i++
                                ) {
                                    for (
                                        let j = i + 1;
                                        j < this.curSelected.length;
                                        j++
                                    ) {
                                        for (
                                            let k = j + 1;
                                            k < this.curSelected.length;
                                            k++
                                        ) {
                                            for (
                                                let l = k + 1;
                                                l < this.curSelected.length;
                                                l++
                                            ) {
                                                timesNum +=
                                                    this.curSelected[i].length *
                                                    this.curSelected[j].length *
                                                    this.curSelected[k].length *
                                                    this.curSelected[l].length;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        timesNum *= this.getCompose(
                            current.length,
                            this.curTypeList.ruleList[index].minLength
                        );
                    }
                    init.push(current.join(",") || "_");
                    return init;
                }, [])
                .join("|");

            this.timesNum = minCheckPass && repeatCheckPass ? timesNum : 0;
            this.$emit("sentBetPayloadNoFilter", {
                betNums: this.timesNum,
                officePlayType: this.officePlayType,
                betItems: betItems,
                playType: curPlayType.playType,
                playTypeName: curPlayType.playTypeName,
                odds: curPlayType.lotteryBetContent[0].odds,
                timesNum: timesNum * this.curTypeList.basicMoney,
                pass: minCheckPass && repeatCheckPass,
                moneyCalcType: "commonType1",
                chip: +this.curChip
            });
        },

        getCompose(num, minLength) {
            if (num <= minLength) {
                return 1;
            }

            if (minLength <= 1) {
                return num;
            }

            const transNum = (value) => {
                let newValue = 1;
                for (let i = value; i > 0; --i) {
                    newValue = newValue * i;
                }

                return newValue;
            };

            return (
                transNum(num) / transNum(num - minLength) / transNum(minLength)
            );
        },
    },
};
</script>

<style lang="scss">
#sscsimple {
    &.step2 {
        // background: #f6f6f6;
        margin-top: -15px;
        margin-bottom: -15px;
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .title-wrap {
        text-align: center;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -1px;
            width: 100%;
            height: 2px;
            background: #c4c4c4;
            z-index: 1;
        }
    }

    .play-wrap {
        padding: 0 10px;
    }

    .play-item {
        display: flex;
        align-items: center;
        font-size: 18px;
    }

    .play-title {
        color: #585858;
    }

    .play-btn {
        text-align: center;
        height: 27px;
        line-height: 23px;
        margin: 3px 6px;
        border: 2px solid #eee;
        border-radius: 5px;
        color: #004299;
        cursor: pointer;
    }

    .title-text {
        font-size: 12px;
        line-height: 20px;
        color: #0894ec;
        text-align: center;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        background: 0 0;
        border: 1px solid #0894ec;
        border-radius: 22px;
        width: 90%;
        margin: 0 auto;
    }

    .round-btn {
        display: inline-block;
        background: #fff;
        border: 1px solid #efefef;
        border-radius: 100%;
        width: 44px;
        height: 44px;
        line-height: 44px;
        font-size: 22px;
        text-align: center;
        color: #4481fa;
        margin: 10px;
        position: relative;
        cursor: pointer;

        &.active {
            color: #fff;
            background: #4481fa;
        }

        &.operate-active {
            .operate-btn {
                color: #fff;
                background: #4481fa;
                border: 1px solid #4481fa;
            }
        }

        &.big {
            width: 46px;
            height: 46px;
            line-height: 46px;
            margin: 8px 13px 26px;
        }
    }

    // .round-bg {
    //     background: #fff;
    //     border: 1px solid #efefef;
    //     border-radius: 100%;
    //     width: 44px;
    //     height: 44px;
    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     z-index: -1;
    // }

    .operate-btn {
        list-style: none;
        width: 32px;
        height: 48px;
        line-height: 38px;
        background: #fff;
        border: 1px solid #aaa;
        border-radius: 5px;
        text-align: center;
        color: #4481fa;
        margin-left: 5px;
        padding: 3px 4px;
        margin-top: 5px;
    }

    .chips {
        background: #f6f6f6;
    }

    .fastInput-box {
        font-size: 18px;
        background: #fff;
        margin-bottom: 15px;
    }

    .chip-title,
    .odd-text {
        color: #228b22;
        font-size: 18px;
        line-height: 28px;
    }

    .odd-text {
        margin-top: 30px;
    }

    .chip-btn {
        display: inline-block;
        text-align: center;
        background: #fff;
        width: auto;
        height: 37px;
        margin: 3px 6px;
        border: 2px solid #eee;
        border-radius: 5px;
        color: #ca1a1a;
        min-width: 20px;
        padding: 3px 4px;
        line-height: 27px;
        font-size: 18px;
        cursor: pointer;

        &.chip-active {
            background-color: #4481fa;
            color: #fff;
        }
    }

    .step3-wrap {
        padding-left: 10px;
        color: #000;
        font-size: 18px;
    }

    .full-btn,
    .full-btn-margin {
        display: block;
        height: 37px;
        border: 1px #ccc solid;
        border-radius: 8px;
        text-align: center;
        line-height: 37px;
        cursor: pointer;
        font-size: 16px;
        color: #4481fa;
        margin-top: 10px;

        &.active {
            color: #fff;
            background: #4481fa;
            border: 1px solid #4481fa;
        }
    }

    .full-btn-margin {
        margin-left: 10px;
        margin-right: 10px;
    }

    .sum-odd {
        font-size: 12px;
        position: absolute;
        bottom: -35px;
        width: 100%;
        left: 50%;
        white-space: nowrap;
        transform: translateX(-50%);
        color: #4481fa !important;
    }

    .bet-num-input {
        input {
            background-color: #fff !important;
            color: #606266 !important;
        }

        &.black {
            input {
                color: #000 !important;
            }
        }

        .van-field__control:disabled {
            -webkit-text-fill-color: #000;
        }
    }

    .clear-btn {
        width: 30px;
        height: 36px;
        background: #fff;
        border: 1px solid #aaa;
        border-radius: 5px;
        text-align: center;
        color: #4481fa;
        font-size: 18px;
        line-height: 34px;
        cursor: pointer;
    }
}
</style>