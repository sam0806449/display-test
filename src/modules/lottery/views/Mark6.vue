<template>
    <div id="mark6">
        <van-nav-bar
            left-arrow
            border
            class="pk10_nav"
            @click-left="goLotteryLobby"
        >
            <template #title>
                <div class="white-text" @click="onShowpays">
                    <span class="mr-1"
                        >{{ currentTitle
                        }}{{
                            subKey
                                ? `-${
                                      curPlayType[0] &&
                                      curPlayType[0].groupTypeName
                                  }`
                                : ""
                        }}</span
                    >
                    <van-icon
                        :name="showpays ? 'arrow-up' : 'arrow-down'"
                        size="14"
                        color="white"
                    />
                </div>
            </template>

            <template #right>
                <van-popover
                    v-model="showPopover"
                    trigger="click"
                    placement="bottom-end"
                    :actions="actions"
                    class="text-left right-menu"
                    get-container="#mark6"
                    :offset="[10, 5]"
                    @select="onSelect"
                >
                    <template #reference>
                        <van-icon name="setting-o" size="22" color="white" />
                    </template>
                </van-popover>
                <span class="ml-2" @click="showAllLotteryPop = true">
                    <van-icon name="wap-nav" size="22" color="white" />
                </span>
            </template>
        </van-nav-bar>

        <div
            class="dateInfo background-white py-2"
            style="
                position: relative;
                z-index: 2;
                box-shadow: 0 0 0.08rem rgba(0, 0, 0, 0.1);
            "
        >
            <van-row type="flex" justify="space-between" align="center">
                <van-col
                    span="7"
                    class="divider_col"
                    v-if="lottery && lottery.slice(0, 2) === 'js'"
                >
                    <div>
                        <span>{{ $$t_lottery("grandTotal") }}：</span><br />
                        <span class="red-text caption-bold"
                            >{{ currencySymbol
                            }}{{ parseFloat(extremeMoney.toFixed(4))
                            }}{{ currencyDenomination }}</span
                        >
                    </div>
                    <div class="mt-1">
                        <span>{{ $$t_lottery("win") }}：</span><br />
                        <span class="red-text caption-bold"
                            >{{ currencySymbol
                            }}{{ parseFloat(currentWin.toFixed(4))
                            }}{{ currencyDenomination }}</span
                        >
                    </div>
                </van-col>

                <van-col span="8" class="divider_col" v-else>
                    <div class="caption text-grey_1 px-1">
                        {{
                            datesMaker(
                                currentDates && currentDates.dates,
                                isSeal
                            )
                        }}
                        <br /><span v-if="isSeal">{{ $$t("seal_t") }}</span>
                    </div>

                    <div class="mt-2">
                        <van-count-down
                            :time="time"
                            @finish="onFinish"
                            v-slot="{ days, hours, minutes, seconds }"
                        >
                            <div
                                class="flex justify-content-center align-items-center main-text"
                            >
                                <template
                                    v-if="
                                        !['fflhc', 'sflhc', 'wflhc'].includes(
                                            lottery
                                        )
                                    "
                                >
                                    <div class="block">
                                        {{ +(days) === 0 && +(hours) &lt; 10 ? '0'+ hours : hours + days * 24 }}
                                    </div>
                                    <span class="separator">:</span>
                                </template>
                                <div class="block">
                                    <span v-if="Number(minutes) < 10">0</span
                                    >{{ minutes }}
                                </div>
                                <span class="separator">:</span>
                                <div class="block">
                                    <span v-if="Number(seconds) < 10">0</span
                                    >{{ seconds }}
                                </div>
                            </div>
                        </van-count-down>
                    </div>
                </van-col>

                <van-col span="16" @click="showResults = true">
                    <div v-if="lottery && lottery.slice(0, 2) === 'js'">
                        <van-row
                            type="flex"
                            justify="space-between"
                            align="center"
                        >
                            <van-col span="24">
                                <div>
                                    {{ $$t_lottery("remaining") }}
                                    <span class="main-text caption-bold">{{
                                        betTotal
                                    }}</span>
                                    {{ $$t_lottery("time") }}
                                </div>

                                <div
                                    class="result-ball flex align-items-center justify-content-center mt-2 pl-1"
                                    v-if="isOpen || !isDisabled"
                                >
                                    <div
                                        v-for="(num, i) in getArry(
                                            extremeResult && extremeResult.num
                                        )"
                                        :key="i"
                                        style="display: flex"
                                    >
                                        <div
                                            v-if="i === 6"
                                            :class="['mark6-num-small']"
                                            style="
                                                font-size: 18px;
                                                line-height: 24px;
                                                align-items: flex-start;
                                            "
                                        >
                                            +
                                        </div>
                                        <div
                                            :class="['mr-1']"
                                            style="
                                                display: flex;
                                                flex-direction: column;
                                            "
                                        >
                                            <div
                                                :class="['mark6-num-small']"
                                                :style="`background-image: url(/images/lottery/${getMark6Color(
                                                    num
                                                )}_.png);`"
                                            >
                                                {{ num }}
                                            </div>
                                            <div
                                                style="
                                                    color: #444;
                                                    font-size: 12px;
                                                    font-weight: bold;
                                                    text-align: center;
                                                    margin-bottom: -4px;
                                                "
                                            >
                                                {{
                                                    getCurZodiac(
                                                        extremeResult.sx &&
                                                            extremeResult.sx.split(
                                                                ","
                                                            )[i]
                                                    )
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-2 caption-bold" v-else>
                                    {{ $$t_lottery("progress") }}
                                </div>
                            </van-col>
                            <van-col span="24" v-show="isShowStop">
                                <van-button
                                    type="danger"
                                    size="mini"
                                    class="radius-1 mt-2"
                                    @click.stop="isStop = true"
                                >
                                    {{ $$t_lottery("stop") }}
                                </van-button>
                            </van-col>
                        </van-row>
                    </div>

                    <!-- 一般開獎結果 -->
                    <div v-else>
                        <div class="caption text-grey_1">
                            <span class="mr-1">{{
                                resultItem && resultItem.lotteryName
                            }}</span>
                            <span>
                                <template
                                    v-if="
                                        ['fflhc', 'sflhc', 'wflhc'].includes(
                                            lottery
                                        )
                                    "
                                    >{{
                                        getDataText(
                                            resultItem && resultItem.openDate
                                        )
                                    }}</template
                                >{{
                                    oldOpen.isOPen
                                        ? (resultItem && resultItem.dates) || ""
                                        : oldOpen && oldOpen.dates
                                }}
                            </span>
                        </div>

                        <div
                            class="result-ball flex align-items-center justify-content-center mt-2 flex-wrap"
                            v-if="oldOpen.isOPen"
                        >
                            <div
                                v-for="(num, i) in getArry(
                                    resultItem && resultItem.num
                                )"
                                :key="i"
                                style="display: flex"
                            >
                                <div
                                    v-if="i === 6"
                                    :class="['mark6-num-small']"
                                    style="
                                        font-size: 18px;
                                        line-height: 24px;
                                        align-items: flex-start;
                                    "
                                >
                                    +
                                </div>
                                <div
                                    :class="['mr-1']"
                                    style="
                                        display: flex;
                                        flex-direction: column;
                                    "
                                >
                                    <div
                                        :class="['mark6-num-small']"
                                        :style="`background-image: url(/images/lottery/${getMark6Color(
                                            num
                                        )}_.png);`"
                                    >
                                        {{ num }}
                                    </div>
                                    <div
                                        style="
                                            color: #444;
                                            font-size: 12px;
                                            font-weight: bold;
                                            text-align: center;
                                            margin-bottom: -4px;
                                        "
                                    >
                                        {{
                                            getCurZodiac(
                                                resultItem.sx &&
                                                    resultItem.sx.split(",")[i]
                                            )
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            class="flex align-items-center justify-content-center mt-2 oldOpen"
                            v-else
                        >
                            <div class="body-2 mr-2">
                                {{ datesMaker(oldOpen && oldOpen.dates) }}
                            </div>
                            <div class="flex align-items-center">
                                <div class="caption-bold mr-2 van-ellipsis">
                                    {{ $$t_lottery("waiting") }}
                                </div>

                                <van-count-down
                                    :time="oldOpen.time"
                                    @finish="onGetOldOpen"
                                    v-show="Number(oldOpen.time) > 0"
                                >
                                    <template #default="timeData">
                                        <div
                                            class="flex space-between align-items-center main-text"
                                        >
                                            <div class="block">
                                                0{{ timeData.minutes }}
                                            </div>
                                            <div class="block">:</div>
                                            <div class="block">
                                                <span
                                                    v-if="
                                                        Number(
                                                            timeData.seconds
                                                        ) < 10
                                                    "
                                                    >0</span
                                                >{{ timeData.seconds }}
                                            </div>
                                        </div>
                                    </template>
                                </van-count-down>
                            </div>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <!-- 下注按钮区 -->
        <div class="bet_center">
            <scroller>
                <div
                    v-if="curPlayType.length"
                    :style="isShowCurResultTable ? 'padding-top: 4.5rem' : ''"
                >
                    <template v-for="(item, i) in curPlayType">
                        <div :key="`${i}_${item.playType}`">
                            <div
                                v-if="
                                    [
                                        'ExtraNo',
                                        'PickBallNo',
                                        'FixedPlace1',
                                        'FixedPlace2',
                                        'FixedPlace3',
                                        'FixedPlace4',
                                        'FixedPlace5',
                                        'FixedPlace6',
                                    ].includes(subKey)
                                "
                                :class="['text-left', { 'pt-3': i > 0 }]"
                            >
                                <van-collapse v-model="collapseActiveName">
                                    <van-collapse-item :name="i">
                                        <template #title>
                                            <div class="subtitle-3 ball-tle">
                                                {{ item.playTypeName }}
                                            </div>
                                        </template>
                                        <div
                                            class="text-center flex"
                                            style="flex-wrap: wrap"
                                        >
                                            <van-row gutter="6">
                                                <template
                                                    v-for="(
                                                        bet, index
                                                    ) in item.lotteryBetContent"
                                                >
                                                    <van-col
                                                        span="4"
                                                        :key="index"
                                                        class="mb-1"
                                                    >
                                                        <div
                                                            class="ball-num ball-square ball-color-num"
                                                            :class="{
                                                                current_active:
                                                                    getActive(
                                                                        bet.betContent,
                                                                        item.playType
                                                                    ),
                                                            }"
                                                            @click="
                                                                setBetContent(
                                                                    bet.betContent,
                                                                    item.playType
                                                                )
                                                            "
                                                            :style="
                                                                bet
                                                                    .betContentName
                                                                    .length >=
                                                                20
                                                                    ? 'font-size: 12px;'
                                                                    : ''
                                                            "
                                                        >
                                                            <span
                                                                class="color-num-btn"
                                                                :style="
                                                                    getColor(
                                                                        bet.betContent
                                                                    )
                                                                        ? `background-image: url(/images/lottery/${getColor(
                                                                              bet.betContent
                                                                          )}_.png)`
                                                                        : ''
                                                                "
                                                                >{{
                                                                    bet.betContentName
                                                                }}</span
                                                            >
                                                        </div>
                                                        <div
                                                            class="caption-bold mt-1 mb-1 main-text"
                                                        >
                                                            {{ bet.odds }}
                                                        </div>
                                                    </van-col>
                                                </template>
                                            </van-row>
                                        </div>
                                    </van-collapse-item>
                                </van-collapse>
                            </div>

                            <div
                                v-else-if="subKey === 'AllColor'"
                                :class="['text-left', { 'pt-3': i > 0 }]"
                            >
                                <div
                                    v-if="playType_items.length === 1"
                                    class="subtitle-3 ball-tle"
                                >
                                    {{ item.playTypeName }}
                                </div>
                                <van-collapse v-model="collapseActiveName">
                                    <van-collapse-item :name="i">
                                        <template #title>
                                            <div class="subtitle-3 ball-tle">
                                                {{ item.playTypeName }}
                                            </div>
                                        </template>
                                        <div class="text-center">
                                            <van-row gutter="6">
                                                <template
                                                    v-for="(
                                                        bet, index
                                                    ) in item.lotteryBetContent"
                                                >
                                                    <van-col
                                                        :span="
                                                            item.playType ===
                                                            'ExtraNoColor'
                                                                ? 24
                                                                : 12
                                                        "
                                                        :key="index"
                                                        class="mb-1"
                                                    >
                                                        <div
                                                            class="ball-num ball-square"
                                                            :class="{
                                                                current_active:
                                                                    getActive(
                                                                        bet.betContent,
                                                                        item.playType
                                                                    ),
                                                                'ball-oneline':
                                                                    item.playType ===
                                                                    'ExtraNoColor',
                                                            }"
                                                            @click="
                                                                setBetContent(
                                                                    bet.betContent,
                                                                    item.playType
                                                                )
                                                            "
                                                            :style="
                                                                bet
                                                                    .betContentName
                                                                    .length >=
                                                                20
                                                                    ? 'font-size: 12px;'
                                                                    : ''
                                                            "
                                                        >
                                                            <span>{{
                                                                bet.betContentName
                                                            }}</span>
                                                            <span
                                                                v-if="
                                                                    item.playType ===
                                                                    'ExtraNoColor'
                                                                "
                                                                class="flex ml-2"
                                                                style="
                                                                    flex-wrap: wrap;
                                                                "
                                                            >
                                                                <div
                                                                    class="allcolor-betNum"
                                                                    v-for="n in Array.from(
                                                                        {
                                                                            length: 49,
                                                                        },
                                                                        (
                                                                            _,
                                                                            index
                                                                        ) =>
                                                                            (
                                                                                index +
                                                                                1
                                                                            )
                                                                                .toString()
                                                                                .padStart(
                                                                                    2,
                                                                                    '0'
                                                                                )
                                                                    )"
                                                                    :key="n"
                                                                    :style="
                                                                        getForAllColorColor(
                                                                            n
                                                                        ) ===
                                                                        bet.betContent
                                                                            ? `background-image: url(/images/lottery/${getColor(
                                                                                  n
                                                                              )}_.png)`
                                                                            : 'display: none'
                                                                    "
                                                                >
                                                                    {{ n }}
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div
                                                            class="caption-bold mt-1 mb-1 main-text"
                                                        >
                                                            {{ bet.odds }}
                                                        </div>
                                                    </van-col>
                                                </template>
                                            </van-row>
                                        </div>
                                    </van-collapse-item>
                                </van-collapse>
                            </div>

                            <div
                                v-else-if="
                                    [
                                        'SpecialZodiacHeadTail',
                                        'OneZodiacColorBalls',
                                    ].includes(subKey) ||
                                    curDataKey === 'ZodiacTail'
                                "
                                :class="['text-left', { 'pt-3': i > 0 }]"
                            >
                                <van-collapse v-model="collapseActiveName">
                                    <van-collapse-item :name="i">
                                        <template #title>
                                            <div class="subtitle-3 ball-tle">
                                                {{ item.playTypeName }}
                                            </div>
                                        </template>
                                        <div class="text-center">
                                            <van-row gutter="6">
                                                <template
                                                    v-for="(
                                                        bet, index
                                                    ) in item.lotteryBetContent"
                                                >
                                                    <van-col
                                                        :span="12"
                                                        :key="index"
                                                        class="mb-1"
                                                    >
                                                        <div
                                                            class="ball-num ball-square ball-color-two-column"
                                                            :class="{
                                                                current_active:
                                                                    getActive(
                                                                        bet.betContent,
                                                                        item.playType
                                                                    ),
                                                            }"
                                                            @click="
                                                                setBetContent(
                                                                    bet.betContent,
                                                                    item.playType
                                                                )
                                                            "
                                                            :style="
                                                                ![
                                                                    'SpecialZodiac',
                                                                    'OneZodiac',
                                                                    'ExtraBallZodiac',
                                                                ].includes(
                                                                    item.playType
                                                                )
                                                                    ? 'padding-bottom: 0'
                                                                    : ''
                                                            "
                                                        >
                                                            <span>{{
                                                                bet.betContentName
                                                            }}</span>
                                                            <span
                                                                v-if="
                                                                    [
                                                                        'SpecialZodiac',
                                                                        'OneZodiac',
                                                                        'ExtraBallZodiac',
                                                                    ].includes(
                                                                        item.playType
                                                                    )
                                                                "
                                                                class="flex"
                                                                style="
                                                                    flex-wrap: wrap;
                                                                    justify-content: center;
                                                                    margin-left: 5px;
                                                                "
                                                            >
                                                                <div
                                                                    class="allcolor-betNum allcolor-samll"
                                                                    v-for="n in zodiacList
                                                                        .find(
                                                                            (
                                                                                zodiac
                                                                            ) =>
                                                                                zodiac.zodiac ===
                                                                                bet.betContent
                                                                        )
                                                                        .num.split(
                                                                            ','
                                                                        )"
                                                                    :key="n"
                                                                    :style="`background-image: url(/images/lottery/${getColor(
                                                                        n
                                                                    )}_.png)`"
                                                                >
                                                                    {{ n }}
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div
                                                            class="caption-bold mt-1 mb-1 main-text"
                                                        >
                                                            {{ bet.odds }}
                                                        </div>
                                                    </van-col>
                                                </template>
                                            </van-row>
                                        </div>
                                    </van-collapse-item>
                                </van-collapse>
                            </div>

                            <div
                                v-else-if="subKey === 'ComboZodiac'"
                                :class="['text-left', { 'pt-3': i > 0 }]"
                            >
                                <div
                                    class="flex mb-2"
                                    style="align-items: center"
                                >
                                    <div class="tool-pl px-3 caption text-grey">
                                        <van-icon
                                            name="question-o"
                                            size="12"
                                            class="mr-1"
                                        />{{ $$t("wfsm") }}
                                    </div>
                                    <div class="caption ml-2">
                                        {{ $$t("_522") }},
                                        {{ $t("betDetails.odds") }}:
                                    </div>
                                    <div class="caption ml-1 mr-1 main-text">
                                        {{ item.lotteryBetContent[0].odds }}
                                    </div>
                                    <div class="caption">
                                        {{ $$t("multiple") }}
                                    </div>
                                </div>
                                <van-collapse v-model="collapseActiveName">
                                    <van-collapse-item :name="i">
                                        <template #title>
                                            <div class="subtitle-3 ball-tle">
                                                {{ item.playTypeName }}
                                            </div>
                                        </template>
                                        <div class="text-center">
                                            <van-row gutter="6">
                                                <template
                                                    v-for="(
                                                        zodiacItem, index
                                                    ) in zodiacList"
                                                >
                                                    <van-col
                                                        :span="12"
                                                        :key="index"
                                                        class="mb-2"
                                                    >
                                                        <div
                                                            class="ball-num ball-square ball-color-two-column"
                                                            :class="{
                                                                current_active:
                                                                    curSelected[0] &&
                                                                    curSelected[0].indexOf(
                                                                        zodiacItem.zodiac
                                                                    ) > -1,
                                                            }"
                                                            @click="
                                                                selectBet(
                                                                    zodiacItem.zodiac,
                                                                    0
                                                                )
                                                            "
                                                        >
                                                            <span>{{
                                                                zodiacItem.zodiacName
                                                            }}</span>
                                                            <span
                                                                class="flex"
                                                                style="
                                                                    flex-wrap: wrap;
                                                                    justify-content: center;
                                                                    margin-left: 5px;
                                                                "
                                                            >
                                                                <div
                                                                    class="allcolor-betNum allcolor-samll"
                                                                    v-for="n in zodiacItem.num
                                                                        .split(
                                                                            ','
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            4
                                                                        )"
                                                                    :key="n"
                                                                    :style="`background-image: url(/images/lottery/${getColor(
                                                                        n
                                                                    )}_.png)`"
                                                                >
                                                                    {{ n }}
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </van-col>
                                                </template>
                                            </van-row>
                                        </div>
                                    </van-collapse-item>
                                </van-collapse>
                            </div>

                            <div
                                v-else-if="subKey === '5Elements'"
                                :class="['text-left', { 'pt-3': i > 0 }]"
                            >
                                <!-- <div
                                    v-if="playType_items.length === 1"
                                    class="subtitle-3 ball-tle"
                                >
                                    {{ item.playTypeName }}
                                </div> -->
                                <van-collapse v-model="collapseActiveName">
                                    <van-collapse-item :name="i">
                                        <template #title>
                                            <div class="subtitle-3 ball-tle">
                                                {{ item.playTypeName }}
                                            </div>
                                        </template>
                                        <div class="text-center">
                                            <van-row gutter="6">
                                                <template
                                                    v-for="(
                                                        bet, index
                                                    ) in item.lotteryBetContent"
                                                >
                                                    <van-col
                                                        :span="24"
                                                        :key="index"
                                                        class="mb-1"
                                                    >
                                                        <div
                                                            class="ball-num ball-square ball-single-line"
                                                            :class="{
                                                                current_active:
                                                                    getActive(
                                                                        bet.betContent,
                                                                        item.playType
                                                                    ),
                                                            }"
                                                            @click="
                                                                setBetContent(
                                                                    bet.betContent,
                                                                    item.playType
                                                                )
                                                            "
                                                        >
                                                            <span
                                                                style="
                                                                    flex: 0 0
                                                                        100%;
                                                                    width: 100%;
                                                                    display: block;
                                                                "
                                                                >{{
                                                                    bet.betContentName
                                                                }}</span
                                                            >
                                                            <span
                                                                class="flex"
                                                                style="
                                                                    flex-wrap: wrap;
                                                                    justify-content: center;
                                                                "
                                                            >
                                                                <div
                                                                    class="allcolor-betNum allcolor-samll"
                                                                    v-for="n in fiveElementList
                                                                        .find(
                                                                            (
                                                                                ele
                                                                            ) =>
                                                                                ele.code ===
                                                                                bet.betContent
                                                                        )
                                                                        .num.split(
                                                                            ','
                                                                        )"
                                                                    :key="n"
                                                                    :style="`background-image: url(/images/lottery/${getColor(
                                                                        n
                                                                    )}_.png); margin-bottom: 0;`"
                                                                >
                                                                    {{ n }}
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div
                                                            class="caption-bold mt-1 mb-1 main-text"
                                                        >
                                                            {{ bet.odds }}
                                                        </div>
                                                    </van-col>
                                                </template>
                                            </van-row>
                                        </div>
                                    </van-collapse-item>
                                </van-collapse>
                            </div>

                            <div
                                v-else-if="
                                    [
                                        'RowZodiac2',
                                        'RowZodiac3',
                                        'RowZodiac4',
                                        'RowZodiac5',
                                    ].includes(subKey)
                                "
                                :class="['text-left', { 'pt-3': i > 0 }]"
                            >
                                <div
                                    class="flex mb-2"
                                    style="align-items: center"
                                >
                                    <div class="tool-pl px-3 caption text-grey">
                                        <van-icon
                                            name="question-o"
                                            size="12"
                                            class="mr-1"
                                        />{{ $$t("wfsm") }}
                                    </div>
                                    <div class="caption ml-2">
                                        {{ curTypeList.playText }},
                                        {{ $t("betDetails.odds") }}:
                                    </div>
                                    <div class="caption ml-1 mr-1 main-text">
                                        {{
                                            item.lotteryBetContent[0].odds &&
                                            item.lotteryBetContent[0].odds.replaceAll(
                                                ",",
                                                ", "
                                            )
                                        }}
                                    </div>
                                    <div class="caption">
                                        {{ $$t("multiple") }}
                                    </div>
                                </div>
                                <van-collapse v-model="collapseActiveName">
                                    <van-collapse-item :name="i">
                                        <template #title>
                                            <div class="subtitle-3 ball-tle">
                                                {{ item.playTypeName }}
                                            </div>
                                        </template>
                                        <div class="text-center">
                                            <van-row gutter="6">
                                                <template
                                                    v-for="(
                                                        zodiacItem, index
                                                    ) in zodiacList"
                                                >
                                                    <van-col
                                                        :span="12"
                                                        :key="index"
                                                        class="mb-2"
                                                    >
                                                        <div
                                                            class="ball-num ball-square ball-color-two-column"
                                                            :class="{
                                                                current_active:
                                                                    curSelected[0] &&
                                                                    curSelected[0].indexOf(
                                                                        zodiacItem.zodiac
                                                                    ) > -1,
                                                            }"
                                                            @click="
                                                                selectBet(
                                                                    zodiacItem.zodiac,
                                                                    0
                                                                )
                                                            "
                                                        >
                                                            <span>{{
                                                                zodiacItem.zodiacName
                                                            }}</span>
                                                            <span
                                                                class="flex"
                                                                style="
                                                                    flex-wrap: wrap;
                                                                    justify-content: center;
                                                                    margin-left: 5px;
                                                                "
                                                            >
                                                                <div
                                                                    class="allcolor-betNum allcolor-samll"
                                                                    v-for="n in zodiacItem.num.split(
                                                                        ','
                                                                    )"
                                                                    :key="n"
                                                                    :style="`background-image: url(/images/lottery/${getColor(
                                                                        n
                                                                    )}_.png)`"
                                                                >
                                                                    {{ n }}
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div
                                                            class="caption-bold mt-1 mb-1 main-text"
                                                        >
                                                            {{
                                                                zodiacItem.isCur
                                                                    ? item.lotteryBetContent[0].odds.split(
                                                                          ","
                                                                      )[1]
                                                                    : item.lotteryBetContent[0].odds.split(
                                                                          ","
                                                                      )[0]
                                                            }}
                                                        </div>
                                                    </van-col>
                                                </template>
                                            </van-row>
                                        </div>
                                    </van-collapse-item>
                                </van-collapse>
                            </div>

                            <div
                                v-else-if="
                                    [
                                        'Rowtail2',
                                        'Rowtail3',
                                        'Rowtail4',
                                        'Rowtail5',
                                    ].includes(subKey)
                                "
                                :class="['text-left', { 'pt-3': i > 0 }]"
                            >
                                <div
                                    class="flex mb-2"
                                    style="align-items: center"
                                >
                                    <div class="tool-pl px-3 caption text-grey">
                                        <van-icon
                                            name="question-o"
                                            size="12"
                                            class="mr-1"
                                        />{{ $$t("wfsm") }}
                                    </div>
                                    <div class="caption ml-2">
                                        {{ curTypeList.playText }},
                                        {{ $t("betDetails.odds") }}:
                                    </div>
                                    <div class="caption ml-1 mr-1 main-text">
                                        {{
                                            item.lotteryBetContent[0].odds &&
                                            item.lotteryBetContent[0].odds.replaceAll(
                                                ",",
                                                ", "
                                            )
                                        }}
                                    </div>
                                    <div class="caption">
                                        {{ $$t("multiple") }}
                                    </div>
                                </div>
                                <van-collapse v-model="collapseActiveName">
                                    <van-collapse-item :name="i">
                                        <template #title>
                                            <div class="subtitle-3 ball-tle">
                                                {{ item.playTypeName }}
                                            </div>
                                        </template>
                                        <div class="text-center">
                                            <van-row gutter="6">
                                                <template
                                                    v-for="(
                                                        bet, index
                                                    ) in item.lotteryBetContent"
                                                >
                                                    <van-col
                                                        :span="12"
                                                        :key="index"
                                                        class="mb-2"
                                                    >
                                                        <div
                                                            class="ball-num ball-square ball-color-two-column"
                                                            :class="{
                                                                current_active:
                                                                    curSelected[0] &&
                                                                    curSelected[0].indexOf(
                                                                        bet.betContent
                                                                    ) > -1,
                                                            }"
                                                            @click="
                                                                selectBet(
                                                                    bet.betContent,
                                                                    0
                                                                )
                                                            "
                                                            style="
                                                                padding-bottom: 0;
                                                            "
                                                        >
                                                            <span>{{
                                                                bet.betContentName
                                                            }}</span>
                                                        </div>
                                                        <div
                                                            class="caption-bold mt-1 mb-1 main-text"
                                                        >
                                                            {{ bet.odds }}
                                                        </div>
                                                    </van-col>
                                                </template>
                                            </van-row>
                                        </div>
                                    </van-collapse-item>
                                </van-collapse>
                            </div>

                            <div
                                v-else-if="
                                    [
                                        'Win2/3',
                                        'Win3',
                                        'Win2',
                                        'WinExtra2',
                                        'WinExtraNo',
                                        'Win4',
                                    ].includes(subKey) ||
                                    curDataKey === 'Mismatch'
                                "
                                :class="['text-left', { 'pt-3': i > 0 }]"
                            >
                                <div
                                    class="flex mb-2"
                                    style="align-items: center"
                                >
                                    <div class="tool-pl px-3 caption text-grey">
                                        <van-icon
                                            name="question-o"
                                            size="12"
                                            class="mr-1"
                                        />{{ $$t("wfsm") }}
                                    </div>
                                    <div class="caption ml-2">
                                        {{ curTypeList.playText }}
                                    </div>
                                </div>
                                <div
                                    class="flex mb-3"
                                    style="align-items: center"
                                >
                                    <div class="caption ml-2">
                                        {{ $t("betDetails.odds") }}:
                                    </div>
                                    <div class="caption ml-1 mr-1 main-text">
                                        {{
                                            item.lotteryBetContent[0].odds &&
                                            item.lotteryBetContent[0].odds.replaceAll(
                                                ",",
                                                ", "
                                            )
                                        }}
                                    </div>
                                    <div class="caption">
                                        {{ $$t("multiple") }}
                                    </div>
                                </div>
                                <van-collapse v-model="collapseActiveName">
                                    <van-collapse-item :name="i">
                                        <template #title>
                                            <div class="subtitle-3 ball-tle">
                                                {{ item.playTypeName }}
                                            </div>
                                        </template>
                                        <div class="text-center">
                                            <van-row gutter="6">
                                                <template
                                                    v-for="(
                                                        bet, index
                                                    ) in Array.from(
                                                        { length: 49 },
                                                        (_, index) =>
                                                            (index + 1)
                                                                .toString()
                                                                .padStart(
                                                                    2,
                                                                    '0'
                                                                )
                                                    )"
                                                >
                                                    <van-col
                                                        :span="4"
                                                        :key="index"
                                                        class="mb-2"
                                                    >
                                                        <div
                                                            class="ball-num ball-square ball-color-num"
                                                            :class="{
                                                                current_active:
                                                                    curSelected[0] &&
                                                                    curSelected[0].indexOf(
                                                                        bet
                                                                    ) > -1,
                                                            }"
                                                            @click="
                                                                selectBet(
                                                                    bet,
                                                                    0
                                                                )
                                                            "
                                                        >
                                                            <span
                                                                class="color-num-btn"
                                                                :style="
                                                                    getColor(
                                                                        bet
                                                                    )
                                                                        ? `background-image: url(/images/lottery/${getColor(
                                                                              bet
                                                                          )}_.png)`
                                                                        : ''
                                                                "
                                                                >{{ bet }}</span
                                                            >
                                                        </div>
                                                    </van-col>
                                                </template>
                                            </van-row>
                                        </div>
                                    </van-collapse-item>
                                </van-collapse>
                            </div>

                            <!-- 按钮名称取自接口 -->
                            <div
                                v-else-if="
                                    simpleBetNumDataKey.indexOf(curDataKey) >
                                        -1 ||
                                    simpleBetNumDataKey.indexOf(subKey) > -1
                                "
                                :class="['text-left', { 'pt-3': i > 0 }]"
                            >
                                <!-- 说明 -->
                                <div
                                    class="tool-pl mb-1 px-3 caption text-grey"
                                    @click="showWF = true"
                                    v-if="activeTab === 'allBet' && i === 0"
                                >
                                    <van-icon
                                        name="question-o"
                                        size="12"
                                        class="mr-1"
                                    />{{ $$t("wfsm") }}
                                </div>
                                <br />

                                <van-collapse v-model="collapseActiveName">
                                    <van-collapse-item :name="i">
                                        <template #title>
                                            <div
                                                v-if="
                                                    curTypeList &&
                                                    curTypeList.transDes
                                                "
                                                class="subtitle-3 ball-tle"
                                            >
                                                {{ curTypeList.transDes[i] }}
                                            </div>
                                            <div
                                                v-else
                                                class="subtitle-3 ball-tle"
                                            >
                                                {{ item.playTypeName }}
                                            </div>
                                        </template>
                                        <div class="text-center">
                                            <van-row gutter="6">
                                                <template
                                                    v-for="(
                                                        bet, index
                                                    ) in item.lotteryBetContent"
                                                >
                                                    <van-col
                                                        :span="
                                                            hadleSpan(
                                                                curDataKey
                                                            )
                                                        "
                                                        :key="index"
                                                        class="mb-1"
                                                    >
                                                        <div
                                                            class="ball-num ball-square"
                                                            :class="{
                                                                current_active:
                                                                    getActive(
                                                                        bet.betContent,
                                                                        item.playType
                                                                    ),
                                                            }"
                                                            @click="
                                                                setBetContent(
                                                                    bet.betContent,
                                                                    item.playType
                                                                )
                                                            "
                                                            :style="
                                                                bet
                                                                    .betContentName
                                                                    .length >=
                                                                20
                                                                    ? 'font-size: 12px;'
                                                                    : ''
                                                            "
                                                        >
                                                            <span>{{
                                                                bet.betContentName
                                                            }}</span>
                                                        </div>
                                                        <div
                                                            class="caption-bold mt-1 mb-1 main-text"
                                                        >
                                                            {{ bet.odds }}
                                                        </div>
                                                    </van-col>
                                                </template>
                                            </van-row>
                                        </div>
                                    </van-collapse-item>
                                </van-collapse>
                            </div>
                        </div>
                    </template>
                </div>

                <div v-else>
                    <van-empty
                        :description="$$t('description_play')"
                        class="text-center"
                    >
                        <template #image>
                            <van-image
                                src="/images/empty/no-more.png"
                                width="280"
                                height="130"
                            />
                        </template>
                    </van-empty>
                </div>
            </scroller>
        </div>

        <div class="footer-toolbar pt-3">
            <div
                class="msg_info radius-3 white-text mb-1 py-1"
                v-if="Number(money) && betNumber && pass"
            >
                <div class="body-2">
                    {{ handleLangOfNumber(betNumber) }}，{{ currencySymbol
                    }}{{ betMoney }}{{ currencyDenomination }}
                </div>
            </div>

            <div class="px-2 flex align-items-center space-between nav-btn">
                <div class="flex align-items-center">
                    <van-icon
                        name="delete"
                        size="24"
                        color="#1989fa"
                        class="mr-1"
                        @click="onClear"
                    />
                    <div
                        class="text-left pl-2"
                        style="border-left: 0.5px solid #d8d8d8"
                    >
                        <div class="caption">{{ $$t_lottery("balance") }}</div>
                        <div class="main-text caption-bold">
                            {{ currencySymbol
                            }}{{ memberData && memberData.balance
                            }}{{ currencyDenomination }}
                        </div>
                    </div>
                </div>

                <div class="footer-right flex align-items-center">
                    <div class="mr-2 flex align-items-center">
                        <div class="mr-1 subtitle-1">{{ currencySymbol }}</div>
                        <van-field
                            v-model="money"
                            type="digit"
                            maxlength="9"
                            :disabled="isSeal || isDisabled"
                            center
                            class="money_bet mr-1"
                        />
                        <div class="subtitle-1">{{ currencyDenomination }}</div>
                    </div>
                    <van-button
                        class="radius-2"
                        color="linear-gradient(to right, #4684FF, #81AAFF)"
                        :disabled="isSeal || isDisabled || !pass"
                        style="height: 32px !important"
                        @click="onBetPk10"
                    >
                        {{ $$t_lottery("prebet") }}
                    </van-button>
                </div>
            </div>
        </div>

        <!-- 彩种选单 -->
        <van-popup
            v-model="showpays"
            position="top"
            :style="{ height: '100%' }"
            get-container="#mark6"
            :overlay="false"
            class="pays_popup"
        >
            <van-tabs
                v-model="activeTab"
                title-active-color="rgb(64, 128, 255)"
                title-inactive-color="rgb(153, 153, 153)"
                color="rgb(64, 128, 255)"
            >
                <!-- <van-tab :title="$$t('tab_allBet')" name="allBet">
                    <div class="px-2 mt-3">
                        <van-row gutter="4">
                            <van-col
                                span="8"
                                v-for="(item, index) in allBetItems"
                                :key="index"
                                @click="onChangeGames(item)"
                            >
                                <div
                                    class="game_block"
                                    :class="{
                                        tab_active:
                                            firstSelecteFromTab ===
                                            item.dataKey,
                                    }"
                                >
                                    <p class="van-ellipsis">{{ item.value }}</p>
                                </div>
                            </van-col>
                        </van-row>
                    </div>

                    <div class="px-3" v-if="nextLevels.length > 0">
                        <van-divider />
                        <div class="second-nav">
                            <scroller>
                                <van-row gutter="4" class="mt-2">
                                    <div
                                        v-for="(next, index) in nextLevels"
                                        :key="index"
                                    >
                                        <div
                                            v-if="
                                                useWrap[firstSelecteFromTab] &&
                                                useWrap[
                                                    firstSelecteFromTab
                                                ].includes(index)
                                            "
                                            :key="`wrap-${index}`"
                                            style="width: 100%"
                                            class="flex mb-2 ml-3"
                                        >
                                            <div class="subtitle-1 text-left">
                                                {{
                                                    $$t(
                                                        navSecondTitle[
                                                            firstSelecteFromTab
                                                        ]
                                                    )[
                                                        navIndexMap[
                                                            firstSelecteFromTab
                                                        ][index]
                                                    ]
                                                }}
                                            </div>
                                        </div>

                                        <van-col
                                            span="12"
                                            @click="onGetPlayType(next, true)"
                                        >
                                            <div
                                                class="game_block"
                                                :class="{
                                                    tab_active:
                                                        activeTab ===
                                                            'allBet' &&
                                                        current_lottery ===
                                                            next.dataKey,
                                                }"
                                            >
                                                <p class="van-ellipsis">
                                                    {{ next.value }}
                                                </p>
                                            </div>
                                        </van-col>
                                    </div>

                                    <div
                                        style="width: 100px; height: 100px"
                                    ></div>
                                </van-row>
                                <div class="second-nav-black" />
                            </scroller>
                        </div>
                    </div>
                </van-tab> -->

                <van-tab :title="$$t('tab_baseBet')" name="baseBet">
                    <div class="px-3 mt-3">
                        <van-row gutter="8">
                            <van-col
                                span="8"
                                v-for="(item, index) in baseBetItems"
                                :key="index"
                                @click="onChangeGames(item)"
                            >
                                <div
                                    class="game_block"
                                    :class="{
                                        tab_active:
                                            activeTab === 'baseBet' &&
                                            current_lottery === item.dataKey,
                                    }"
                                >
                                    <p class="van-ellipsis">{{ item.value }}</p>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                    <div
                        v-if="playSubType.length > 1"
                        class="mx-3 mt-5"
                        style="height: 1px; background: #ccc; opacity: 0.5"
                    ></div>
                    <div v-if="playSubType.length > 1" class="px-3 mt-5">
                        <van-row gutter="8">
                            <van-col
                                span="8"
                                v-for="(item, index) in playSubType"
                                :key="item.groupType"
                                @click="setSubTab(index)"
                            >
                                <div
                                    class="game_block"
                                    :class="{
                                        tab_active: index === +subTab,
                                    }"
                                >
                                    <p class="van-ellipsis">
                                        {{ item.groupTypeName }}
                                    </p>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                </van-tab>
            </van-tabs>
        </van-popup>

        <van-dialog
            v-model="showDialog"
            :title="$$t_lottery('betTitle')"
            show-cancel-button
            confirmButtonColor="rgb(91, 127, 251)"
            @confirm="betDialogConfirm"
            @cancel="betDialogCancel"
        >
            <div class="px-4 py-3">
                <div class="text-left caption text-grey">
                    {{ $$t_lottery("consecutive") }}：
                </div>
                <van-field
                    v-model="betTotal"
                    :placeholder="$$t_lottery('consecutive_p')"
                    clearable
                    readonly
                    type="digit"
                    class="mt-3"
                />
                <ul>
                    <li
                        v-for="(item, i) in betTotals"
                        :key="i"
                        :class="{ active: Number(betTotal) === item }"
                        @click="betTotal = item"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>
        </van-dialog>

        <van-dialog
            v-model="showConsecutive"
            :title="$t('common.point')"
            confirmButtonColor="rgb(91, 127, 251)"
            @confirm="onTotalConfirm"
        >
            <div class="subtitle-1 text-center pa-4">
                <div>
                    {{ $$t_lottery("betTitle") }}:
                    <span class="main-text caption-bold">{{
                        consecutiveNumber
                    }}</span>
                    {{ $$t_lottery("time") }}
                </div>
                <div class="mt-2">
                    {{ $$t_lottery("grandTotal") }}:
                    <span class="main-text caption-bold"
                        >{{ currencySymbol
                        }}{{ parseFloat(extremeMoney.toFixed(4))
                        }}{{ currencyDenomination }}</span
                    >
                </div>
            </div>
        </van-dialog>

        <van-popup
            v-model="showPopup"
            round
            :close-on-popstate="true"
            position="bottom"
            get-container="#mark6"
            :style="{ height: '70%' }"
        >
            <div class="py-2 px-4">
                <van-row type="flex" align="center">
                    <van-col span="4" class="text-left">
                        <van-icon
                            name="cross"
                            size="18"
                            @click="showPopup = false"
                        />
                    </van-col>
                    <van-col span="16">
                        <van-tabs
                            v-model="tab"
                            animated
                            ellipsis
                            swipeable
                            title-active-color="rgb(64, 128, 255)"
                            title-inactive-color="rgb(153, 153, 153)"
                            color="rgb(64, 128, 255)"
                        >
                            <van-tab
                                :title="$$t_lottery('tab_1')"
                                name="0"
                            ></van-tab>
                            <van-tab
                                :title="$$t_lottery('tab_2')"
                                name="3"
                            ></van-tab>
                        </van-tabs>
                    </van-col>
                    <van-col span="4" class="text-right">
                        <div
                            class="caption main-text van-ellipsis"
                            @click="goBetLists"
                        >
                            {{ $$t_lottery("betNotes") }}
                        </div>
                    </van-col>
                </van-row>
            </div>

            <div class="betLists">
                <scroller
                    :onRefresh="onGetDropBillRecord"
                    :refreshText="null"
                    ref="betLists_scroller"
                >
                    <div class="px-4 pb-4" v-if="betLists.length > 0">
                        <div
                            class="betList van-hairline--surround px-3 mb-2"
                            v-for="(item, index) in betLists"
                            :key="index"
                            @click="goDetails(item)"
                        >
                            <div
                                class="top flex space-between align-items-center van-hairline--top-bottom"
                            >
                                <div class="caption">{{ item.createTime }}</div>
                                <div class="caption text-grey">
                                    {{ datesMaker(item.dates) }}
                                </div>
                            </div>

                            <div class="py-2 radius-1">
                                <van-row
                                    type="flex"
                                    justify="space-between"
                                    align="center"
                                >
                                    <van-col span="22">
                                        <van-row
                                            type="flex"
                                            justify="space-between"
                                        >
                                            <van-col
                                                span="12"
                                                class="text-left caption-bold"
                                                >{{ item.lotteryName }}
                                            </van-col>
                                            <van-col span="12">
                                                <div
                                                    class="caption-bold text-right"
                                                    :class="{
                                                        status_0:
                                                            Number(
                                                                item.status
                                                            ) === 0,
                                                        status_1:
                                                            Number(
                                                                item.status
                                                            ) === 1,
                                                    }"
                                                >
                                                    {{ item.statusDesc }}
                                                </div>
                                            </van-col>
                                        </van-row>

                                        <van-row
                                            type="flex"
                                            justify="space-between"
                                        >
                                            <van-col span="20">
                                                <div
                                                    class="van-ellipsis text-left"
                                                >
                                                    {{ item.betContentName }}[{{
                                                        item.playTypeName
                                                    }}]
                                                </div>
                                            </van-col>
                                            <van-col span="4"> </van-col>
                                        </van-row>

                                        <van-row
                                            type="flex"
                                            justify="space-between"
                                        >
                                            <van-col
                                                span="12"
                                                class="text-left"
                                            >
                                                <div
                                                    class="caption bet_money mt-2"
                                                >
                                                    {{
                                                        $t("lottery.betMoney")
                                                    }}：{{ item.currencySymbol
                                                    }}{{ item.money
                                                    }}{{
                                                        item.currencyDenomination
                                                    }}
                                                </div>
                                            </van-col>

                                            <van-col span="12">
                                                <div
                                                    class="caption-bold mt-2 text-right"
                                                    :class="{
                                                        status_1:
                                                            Number(
                                                                item.status
                                                            ) === 1,
                                                    }"
                                                    v-if="
                                                        Number(item.status) ===
                                                        1
                                                    "
                                                >
                                                    {{
                                                        item.currencySymbol +
                                                        item.winMoney +
                                                        item.currencyDenomination
                                                    }}
                                                </div>
                                                <div
                                                    class="mt-2 text-right"
                                                    v-else
                                                >
                                                    - -
                                                </div>
                                            </van-col>
                                        </van-row>
                                    </van-col>

                                    <van-col span="2">
                                        <div class="ml-1">
                                            <van-icon name="arrow" size="16" />
                                        </div>
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </div>

                    <van-empty
                        v-else
                        :description="$t('common.noMore')"
                        class="text-center background-white"
                    >
                        <template #image>
                            <van-image
                                src="/images/empty/no-more.png"
                                width="280"
                                height="130"
                            />
                        </template>
                    </van-empty>
                </scroller>
            </div>
        </van-popup>

        <!-- 近10个开奖 -->
        <van-popup
            v-model="showResults"
            round
            :close-on-popstate="true"
            position="bottom"
            get-container="#mark6"
            :style="{ height: '70%' }"
            @closed="showTableList = []"
        >
            <div
                class="subtitle-1"
                style="flex; padding-top: 0.2rem; padding-bottom: 0.2rem;"
            >
                <van-button
                    class="radius-2 mr-4"
                    :color="`${
                        mark6ResultTab === 0
                            ? 'linear-gradient(to right, #4684FF, #81AAFF)'
                            : ''
                    }`"
                    style="font-size: 12px !important; height: 26px !important"
                    @click="mark6ResultTab = 0"
                >
                    {{ $$t("_526") }}
                </van-button>
                <van-button
                    class="radius-2 mr-4"
                    :color="`${
                        mark6ResultTab === 1
                            ? 'linear-gradient(to right, #4684FF, #81AAFF)'
                            : ''
                    }`"
                    style="font-size: 12px !important; height: 26px !important"
                    @click="mark6ResultTab = 1"
                >
                    {{ $$t("_527") }}
                </van-button>
                <van-button
                    class="radius-2"
                    :color="`${
                        mark6ResultTab === 2
                            ? 'linear-gradient(to right, #4684FF, #81AAFF)'
                            : ''
                    }`"
                    style="font-size: 12px !important; height: 26px !important"
                    @click="mark6ResultTab = 2"
                >
                    {{ $$t("_528") }}
                </van-button>
            </div>
            <div class="rulesLists">
                <scroller
                    :on-infinite="$_throttle(onGetRecentResults)"
                    :refreshText="null"
                    :noDataText="null"
                    ref="results_scroller"
                >
                    <div>
                        <template v-for="(r, index) in rulesLists">
                            <div
                                class="text-left py-3 px-4"
                                :class="{ striped: index % 2 }"
                                :key="index"
                            >
                                <div
                                    class="flex align-items-center space-between"
                                >
                                    <div class="subtitle-1">
                                        {{ datesMaker(r.dates) }}
                                    </div>
                                    <div class="caption text-grey_1">
                                        {{ r.createTime }}
                                    </div>
                                </div>
                                <div
                                    class="result-ball flex align-items-center mt-1 flex-wrap"
                                    style="font-size: 14px"
                                >
                                    <template v-if="mark6ResultTab === 0">
                                        <div
                                            v-for="(num, i) in getArry(r.num)"
                                            :key="i"
                                            style="display: flex"
                                        >
                                            <div
                                                v-if="i === 6"
                                                :class="['mark6-num-small']"
                                                style="
                                                    font-size: 18px;
                                                    line-height: 24px;
                                                    align-items: flex-start;
                                                "
                                            >
                                                +
                                            </div>
                                            <div
                                                :class="['mr-1']"
                                                style="
                                                    display: flex;
                                                    flex-direction: column;
                                                "
                                            >
                                                <div
                                                    :class="['mark6-num-small']"
                                                    :style="`background-image: url(/images/lottery/${getMark6Color(
                                                        num
                                                    )}_.png);`"
                                                >
                                                    {{ num }}
                                                </div>
                                                <div
                                                    style="
                                                        color: #444;
                                                        font-size: 12px;
                                                        font-weight: bold;
                                                        text-align: center;
                                                        margin-bottom: -4px;
                                                    "
                                                >
                                                    {{
                                                        getCurZodiac(
                                                            r.sx &&
                                                                r.sx.split(",")[
                                                                    i
                                                                ]
                                                        )
                                                    }}
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="mark6ResultTab === 1">
                                        <div
                                            class="mr-2"
                                            style="
                                                width: 30px;
                                                text-align: center;
                                                color: red;
                                            "
                                        >
                                            {{ r.sum }}
                                        </div>
                                        <div
                                            class="mr-2"
                                            :style="`min-width: 25px; padding: 0 2px; height: 25px; line-height: 25px; color: #fff; text-align: center; background: ${
                                                r.sumDs === 'odd'
                                                    ? '#ff9726'
                                                    : '#5691d7'
                                            }`"
                                        >
                                            {{ r.sumDsDesc }}
                                        </div>
                                        <div
                                            class="mr-5"
                                            :style="`min-width: 25px; padding: 0 2px; height: 25px; line-height: 25px; text-align: center; color: #fff; background: ${
                                                r.sumDx === 'big'
                                                    ? '#ff9726'
                                                    : '#5691d7'
                                            }`"
                                        >
                                            {{ r.sumDxDesc }}
                                        </div>
                                        <div
                                            :style="`padding: 0 5px; height: 25px; line-height: 25px; text-align: center; color: #fff; background: rgba(${
                                                r.colorBalls === 'Red' ? 255 : 0
                                            }, ${
                                                r.colorBalls === 'Green'
                                                    ? 200
                                                    : 0
                                            }, ${
                                                r.colorBalls === 'Blue'
                                                    ? 255
                                                    : 0
                                            }, 0.9)`"
                                        >
                                            {{ r.colorBallsDesc }}
                                        </div>
                                    </template>
                                    <template v-if="mark6ResultTab === 2">
                                        <div
                                            class="mr-3"
                                            style="
                                                display: flex;
                                                flex-direction: column;
                                            "
                                        >
                                            <div
                                                :class="['mark6-num-small']"
                                                :style="`background-image: url(/images/lottery/${getMark6Color(
                                                    r.extraNo
                                                )}_.png); margin-bottom: 0px`"
                                            >
                                                {{ r.extraNo }}
                                            </div>
                                            <div
                                                style="
                                                    color: #444;
                                                    font-size: 12px;
                                                    font-weight: bold;
                                                    text-align: center;
                                                    margin-bottom: -4px;
                                                "
                                            >
                                                {{ r.extraNoSxDesc }}
                                            </div>
                                        </div>
                                        <div
                                            class="mr-2"
                                            :style="`min-width: 25px; padding: 0 2px; height: 25px; line-height: 25px; color: #fff; text-align: center; background: ${
                                                r.extraNoDs === 'odd'
                                                    ? '#ff9726'
                                                    : '#5691d7'
                                            }`"
                                        >
                                            {{ r.extraNoDsDesc }}
                                        </div>
                                        <div
                                            class="mr-2"
                                            :style="`min-width: 25px; padding: 0 2px; height: 25px; line-height: 25px; text-align: center; color: #fff; background: ${
                                                r.extraNoDx === 'big'
                                                    ? '#ff9726'
                                                    : '#5691d7'
                                            }`"
                                        >
                                            {{ r.extraNoDxDesc }}
                                        </div>
                                        <div
                                            class="mr-2"
                                            :style="`padding: 0 2px; height: 25px; line-height: 25px; color: #fff; text-align: center; background: ${
                                                r.extraNoSumDs === 'SumOdd'
                                                    ? '#ff9726'
                                                    : '#5691d7'
                                            }`"
                                        >
                                            {{ r.extraNoSumDsDesc }}
                                        </div>
                                        <div
                                            class="mr-2"
                                            :style="`padding: 0 2px; height: 25px; line-height: 25px; text-align: center; color: #fff; background: ${
                                                r.extraNoSumDx === 'SumBig'
                                                    ? '#ff9726'
                                                    : '#5691d7'
                                            }`"
                                        >
                                            {{ r.extraNoSumDxDesc }}
                                        </div>

                                        <div
                                            :style="`padding: 0 2px; height: 25px; line-height: 25px; text-align: center; color: #fff; background: ${
                                                r.extraNoTailDx === 'TailBig'
                                                    ? '#ff9726'
                                                    : '#5691d7'
                                            }`"
                                        >
                                            {{ r.extraNoTailDxDesc }}
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                </scroller>
            </div>
        </van-popup>

        <van-dialog v-model="showWF" :title="$$t('wfsm')">
            <div class="px-3 text-left" v-if="activeTab === 'allBet'">
                <div class="caption py-2 van-hairline--bottom">
                    <div class="subtitle-1">{{ $$t("ts_title") }}</div>
                    <div class="caption pl-3">
                        {{ curTypeList && curTypeList.playText }}
                    </div>
                </div>

                <div class="caption py-2 van-hairline--bottom">
                    <div class="subtitle-1">{{ $$t("fl_title") }}</div>
                    <div
                        class="caption pl-3"
                        v-html="curTypeList && curTypeList.example"
                    ></div>
                </div>
            </div>
        </van-dialog>

        <AllLotteryPop 
					:showAllLotteryPop="showAllLotteryPop" 
					@closeAllLotteryPop="showAllLotteryPop = false"
        />
    </div>
</template>

<script>
import sessionContext from "@/mixins/sessionContext";
import AllLotteryPop from "./comps/AllLotteryPop";

export default {
    name: "mark6",

    mixins: [sessionContext],

	components: { AllLotteryPop },

    data() {
        return {
			showAllLotteryPop: false,
            noMoreSignal: false, //近期开奖是否停止滚动加载
            isShowCurResultTable: false,
            pass: false, // 是否通过验证
            betItems: "",
            curDataKey: "ExtraNo",
            subTab: JSON.parse(sessionStorage.getItem("current_sub")) || 1,  // 传统玩法：默认为【特码】-【号码】
            betList: [],
            curSelected: [],
            showTableList: [],
            simpleBetNumDataKey: [
                "ExtraNo2Sides",
                "ExtraNo",
                "BallNo",
                "FixedPlace",
                "ZodiacTail",
                "TatalSum",
            ],
            specialKeyList: ["ComboZodiac"],
            hasSubList: [
                "ExtraNo",
                "BallNo",
                "FixedPlace",
                "RowZodiacRowTail",
                "RowNo",
            ],
            mark6: {
                ExtraNo2Sides: "T11",
                ExtraNo: "T12",
                AllColor: "T13",
                SpecialZodiacHeadTail: "T14",
                ComboZodiac: "OfficialSpecial",
                "5Elements": "T15",
                PickBallNo: "T12",
                "BallNo1~6": "T16",
                OneZodiacColorBalls: "T14",
                FixedPlace1: "T12",
                FixedPlace2: "T12",
                FixedPlace3: "T12",
                FixedPlace4: "T12",
                FixedPlace5: "T12",
                FixedPlace6: "T12",
                RowZodiac2: "OfficialSpecial",
                RowZodiac3: "OfficialSpecial",
                RowZodiac4: "OfficialSpecial",
                RowZodiac5: "OfficialSpecial",
                Rowtail2: "OfficialSpecial",
                Rowtail3: "OfficialSpecial",
                Rowtail4: "OfficialSpecial",
                Rowtail5: "OfficialSpecial",
                "Win2/3": "OfficialSpecial",
                Win3: "OfficialSpecial",
                Win2: "OfficialSpecial",
                WinExtra2: "OfficialSpecial",
                WinExtraNo: "OfficialSpecial",
                Win4: "OfficialSpecial",
                ZodiacTail: "T14",
                TatalSum: "T11",
                Mismatch: "OfficialSpecial",
            },
            curSpecialSelected: [],
            /**
             * typeList
             * @param this.curDataKey 五星直选复式
             * @param {number} basicMoney 金額基本倍數
             * @param {boolean} checkRepeat 檢查重複
             * @param {number} any 任選數量，0 為不使用
             * @param {Array} ruleList 玩法內容 @type {{ name: string, minLength: number }} name 標題，minLength 最少選幾個(最少為0)
             * 可選 @param {boolean} isCustomOddText 是否為客製賠率文字
             * @param {string} playText 玩法提示文字
             * @param {string} example 範例hover文字
             */
            typeList: {
                ComboZodiac: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 2 }],
                    playText: this.$$t("_522"),
                    example: "",
                },
                RowZodiac2: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 2 }],
                    playText: this.$$t("_522"),
                    example: "",
                },
                RowZodiac3: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 3 }],
                    playText: this.$$t("_523"),
                    example: "",
                },
                RowZodiac4: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 4 }],
                    playText: this.$$t("_524"),
                    example: "",
                },
                RowZodiac5: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 5 }],
                    playText: this.$$t("_525"),
                    example: "",
                },
                Rowtail2: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 2 }],
                    playText: this.$$t("_522"),
                    example: "",
                },
                Rowtail3: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 3 }],
                    playText: this.$$t("_523"),
                    example: "",
                },
                Rowtail4: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 4 }],
                    playText: this.$$t("_524"),
                    example: "",
                },
                Rowtail5: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 5 }],
                    playText: this.$$t("_525"),
                    example: "",
                },
                "Win2/3": {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 3 }],
                    playText: `${this.$$t("_523")}, ${this.$$t("_610")}`,
                    example: "",
                },
                Win3: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 3 }],
                    playText: `${this.$$t("_523")}, ${this.$$t("_610")}`,
                    example: "",
                },
                Win2: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 2 }],
                    playText: `${this.$$t("_522")}, ${this.$$t("_609")}`,
                    example: "",
                },
                WinExtra2: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 2 }],
                    playText: `${this.$$t("_522")}, ${this.$$t("_609")}`,
                    example: "",
                },
                WinExtraNo: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 2 }],
                    playText: `${this.$$t("_522")}, ${this.$$t("_609")}`,
                    example: "",
                },
                Win4: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ minLength: 4 }],
                    playText: `${this.$$t("_524")}, ${this.$$t("_610")}`,
                    example: "",
                },
                Mismatch: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    isSingle: true,
                    ruleList: [{ minLength: 5 }],
                    playText: this.$$t("_539"),
                    example: "",
                },
            },
            betNumber: 0,
            collapseActiveName: [],
            firstSelecteFromTab: "",
            showPopover: false,
            showPopup: false,
            showResults: false,
            time: 0,
            showLotteryLists: false,
            currentTitle: "",
            currentDates: {},
            current_lottery: null,
            oldOpen: {
                isOPen: true,
                dates: 0,
                time: 0,
            },
            isOpen: false,
            extremeResult: {},
            betTotal: 0,
            extremeMoney: 0,
            extremeInterval: null,
            showDialog: false,
            isStop: true,
            isShowStop: false,
            betTotals: [1, 20, 50, 100],
            consecutiveNumber: 0,
            currentWin: 0,
            showConsecutive: false,
            isDisabled: false, // true 为正在极速下注状态
            lotterys: [],
            results: {},
            resultItem: {},
            playType_items: [],
            allBetItems: [],
            betLists: [],
            rulesLists: [],
            showpays: false,
            activeTab: JSON.parse(sessionStorage.getItem(this.curParentType + '_second_title'))
                ? JSON.parse(sessionStorage.getItem(this.curParentType + '_second_title')).activeTab
                : "baseBet",
            nextLevels: [],
            isAllBet: false,
            money: 3,
            tab: "0",
            nextLeveTitle: "",
            timeOutDates: null,
            betContents: [],
            showWF: false,
            baseBetItems: [],
            isSeal: false,
            isEnabled: true,
            get curParentType() {
                return sessionStorage.getItem("rules_code") || "";
            },
            get lottery() {
                return sessionStorage.getItem("gameCode_item") || "";
            },
            zodiacList: [],
            mark6ResultTab: 0,
            fiveElementList: [],
        };
    },

    created() {
        this.onGetLotteryTp();
        this.getZodiacData();
        this.getFiveElement();
    },

    activated() {
        this.resultItem = {};
        this.betTotal = 0;
        this.extremeMoney = 0;
        this.currentWin = 0;
        this.consecutiveNumber = 0;
        this.isShowStop = false;
        this.isOpen = false;
        this.isDisabled = false;
        this.isSeal = false; // true: 封盘
        this.isEnabled = true; // false: 禁用
        this.onClear();
        this.showpays = false;
        this.lottery = sessionStorage.getItem("gameCode_item");
        this.onGetLotteryTp();
        // this.initCurSelected();
        this.getZodiacData();
        this.getFiveElement();
        this.showPopover = false;
        this.onGetCurrentDates();
        this.onGetRecentResultItem();
        this.initMemberData();
    },

    computed: {
        curTypeList() {
            return (
                this.typeList[this.curDataKey] ||
                (this.subKey ? this.typeList[this.subKey] : { ruleList: [] })
            );
        },
        actions() {
            return [
                {
                    text: this.$$t_lottery("dashboard"),
                    icon: "wap-home-o",
                    code: "dashboard",
                },
                {
                    text: this.$$t_lottery("deposit"),
                    icon: "cash-back-record",
                    code: "deposit",
                },
                {
                    text: this.$$t_lottery("lotteryRecord"),
                    icon: "notes-o",
                    code: "record",
                },
                {
                    text: this.$$t_lottery("a_1"),
                    icon: "description",
                    code: "1",
                },
                {
                    text: this.$$t_lottery("a_2"),
                    icon: "balance-list-o",
                    code: "2",
                },
                {
                    text: this.$$t_lottery("a_3"),
                    icon: "question-o",
                    code: "3",
                },
            ];
        },

        singleBtns() {
            return [
                {
                    text: this.$$t_lottery("btn_1"),
                    code: "1",
                },
                {
                    text: this.$$t_lottery("btn_2"),
                    code: "2",
                },
                {
                    text: this.$$t_lottery("btn_3"),
                    code: "3",
                },
                {
                    text: this.$$t_lottery("btn_4"),
                    code: "4",
                },
                {
                    text: this.$$t_lottery("btn_5"),
                    code: "5",
                },
                {
                    text: this.$$t_lottery("btn_6"),
                    code: "6",
                },
            ];
        },

        singleBtns2() {
            return [
                {
                    text: this.$$t_lottery("btn_2"),
                    code: "2",
                },
                {
                    text: this.$$t_lottery("btn_3"),
                    code: "3",
                },
                {
                    text: this.$$t_lottery("btn_4"),
                    code: "4",
                },
                {
                    text: this.$$t_lottery("btn_5"),
                    code: "5",
                },
                {
                    text: this.$$t_lottery("btn_6"),
                    code: "6",
                },
            ];
        },

        // 注单金额是否合并
        isMake() {
            if (
                this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1 ||
                this.simpleBetNumDataKey.indexOf(this.subKey) > -1
            ) {
                return false;
            } else {
                return true;
            }
        },

        betMoney() {
            return this.betNumber * Number(this.money);
        },

        fiveElements() {
            return [
                {
                    betContent: "gold",
                    betContentName: this.$$t("gold"),
                },
                {
                    betContent: "wood",
                    betContentName: this.$$t("wood"),
                },
                {
                    betContent: "water",
                    betContentName: this.$$t("water"),
                },
                {
                    betContent: "fire",
                    betContentName: this.$$t("fire"),
                },
                {
                    betContent: "earth",
                    betContentName: this.$$t("earth"),
                },
            ];
        },

        subKey() {
            return (
                this.playSubType[this.subTab] &&
                this.playSubType[this.subTab].groupType
            );
        },

        playSubType() {
            if (
                !["ZodiacTail", "TatalSum", "Mismatch"].includes(
                    this.curDataKey
                )
            ) {
                const list = [];
                this.playType_items.forEach((item) => {
                    if (
                        list.findIndex((t) => t.groupType === item.groupType) >
                        0
                    ) {
                        return;
                    }

                    list.push({
                        groupType: item.groupType,
                        groupTypeName: item.groupTypeName,
                    });
                });
                return list;
            }

            return [];
        },

        curPlayType() {
            if (
                !["ZodiacTail", "TatalSum", "Mismatch"].includes(
                    this.curDataKey
                )
            ) {
                return this.playType_items.filter(
                    (item) =>
                        item.groupType ===
                        (this.playSubType[this.subTab] &&
                            this.playSubType[this.subTab].groupType)
                );
            }

            return this.playType_items;
        },
    },

    watch: {
        curDataKey() {
            this.pass = false;
        },

        curTypeList() {
            this.initCurSelected();
        },

        tab() {
            this.onGetDropBillRecord();
        },

        showPopup(v) {
            if (v) this.onGetDropBillRecord();
        },

        showResults(v) {
            if (v) {
                this.onGetRecentResults();
            }
        },

        playType_items() {
            this.initCurSelected();
        },
    },

    methods: {
        hadleSpan(_curDataKey) {
            switch (_curDataKey) {
                case "龙虎":
                    return "8";
                default:
                    return "12";
            }
        },
        customOddsText(odd) {
            const odd_des = {
                五星组合: `,${odd * 10},${Math.floor(odd * 100)},${Math.floor(
                    odd * 1000
                )},${Math.floor(odd * 10000)}
              `,
                后四组合: `,${odd * 10},${Math.floor(odd * 100)},${Math.floor(
                    odd * 1000
                )}`,
                前四组合: `,${odd * 10},${Math.floor(odd * 100)},${Math.floor(
                    odd * 1000
                )}`,
            };
            if (odd_des[this.curDataKey]) return odd_des[this.curDataKey];
            else return false;
        },
        onGetCurrentDates() {
            if (!this.lottery) return;
            this.$get("/api/Lottery/GetCurrentDates?type=" + this.lottery)
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    let d = data.data;
                    if (d.secondsRemaining < 0 || !d.isOpen) {
                        throw new Error();
                    }
                    this.isSeal = !d.isOpen;
                    this.isEnabled = !d.isEnabled;
                    this.currentDates = d;
                    this.time = Number(d.secondsRemaining) * 1000;
                    if (d.secondsRemaining === 0) {
                        setTimeout(() => {
                            this.onGetCurrentDates();
                        }, 1000);
                    } else {
                        this.oldOpen.dates = d.lastNo;
                    }
                })
                .catch(() => {
                    this.time = 0;
                    this.isSeal = true;
                    this.currentDates = null;
                    this.oldOpen = {
                        isOPen: true,
                        dates: 0,
                        time: 0,
                    };
                });
        },

        onGetRecentResults() {
            if (
                !this.lottery ||
                this.rulesLists.length === 50 ||
                this.noMoreSignal
            ) {
                this.$refs.results_scroller.finishInfinite(true);
                return;
            }
            let nums = this.rulesLists.length;
            if (nums < 50) nums += 10;
            this.$get(
                `/api/Lottery/GetRecentResults?type=${this.lottery}&num=${nums}`
            )
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    this.rulesLists = data.data;
                    if (data.data.length < 10) {
                        this.noMoreSignal = true;
                        this.$refs.results_scroller.finishInfinite(true);
                        return;
                    }
                })
                .catch((error) => {
                    this.procError(error);
                })
                .finally(async () => {
                    if (this.$refs.results_scroller) {
                        await this.$refs.results_scroller.finishInfinite(true);
                    }
                });
        },

        onGetRecentResultItem(b) {
            let gameCode = sessionStorage.getItem("gameCode_item");
            if (!gameCode) return;
            this.$get(`/api/Lottery/GetRecentResults?type=${gameCode}&num=1`)
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    let d = data.data;
                    let r = d[0];
                    if (b) {
                        if (
                            !this.oldOpen.dates ||
                            r.dates === this.oldOpen.dates
                        ) {
                            this.resultItem = r;
                            this.oldOpen.isOPen = true;
                            this.oldOpen.time = 10000;
                            this.onGetDropBillRecord();
                        } else {
                            this.timeOutDates = setTimeout(() => {
                                this.oldOpen.isOPen = false;
                                this.onGetCurrentDates();
                                this.onGetRecentResultItem(true);
                            }, 3000);
                        }
                    } else {
                        this.oldOpen.isOPen = true;
                        this.resultItem = r;
                    }
                })
                .catch((error) => {
                    this.procError(error);
                });
        },

        onGetOldOpen() {
            this.onGetRecentResultItem(true);
        },

        onGetPlayType(e, newSelect) {
            this.betNumber_k3 = 0;
            let u = "";
            let t = e.dataKey || e;

            let checkLastLevels =
                JSON.parse(sessionStorage.getItem(this.curParentType + '_second_title')) || "";

            let title =
                this.activeTab === "allBet"
                    ? this.$$t("tab_allBet")
                    : this.$$t("tab_baseBet");

            if (newSelect) {
                // 新选择
                if (this.nextLevels.length) {
                    this.currentTitle = `${title}-${this.nextLeveTitle}-${e.value}`;
                } else {
                    this.currentTitle = `${title}-${e.value}`;
                    sessionStorage.removeItem(this.curParentType + '_second_title');
                }
                this.curDataKey = e.dataKey;
                this.$sessionSet("nextLevels_length", this.nextLevels.length);
                this.$sessionSet(this.curParentType + '_second_title', {
                    value: e.value,
                    dataKey: e.dataKey,
                    nextLeveTitle: this.nextLevels.length
                        ? this.nextLeveTitle
                        : "",
                    activeTab: this.activeTab,
                });
            } else {
                // 旧的选择
                if (checkLastLevels.activeTab === "allBet") {
                    this.firstSelecteFromTab =
                        checkLastLevels.nextLeveTitle || checkLastLevels.value;
                    this.nextLeveTitle = checkLastLevels.nextLeveTitle;
                    this.currentTitle = this.nextLeveTitle
                        ? `${title}-${this.nextLeveTitle}-${checkLastLevels.value}`
                        : `${title}-${checkLastLevels.value}`;
                } else {
                    this.firstSelecteFromTab =
                        checkLastLevels.nextLeveTitle || checkLastLevels.value;
                    this.currentTitle = `${title}-${checkLastLevels.value}`;
                }
                this.curDataKey = checkLastLevels.dataKey;
            }

            let gameCode = sessionStorage.getItem("gameCode_item");
            if (this.activeTab === "allBet")
                u = `/api/Lottery/GetPlayType?type=${gameCode}&allBet=${t}`;
            else u = `/api/Lottery/GetPlayType?type=${gameCode}&baseBet=${t}`;

            if (this.lottery && this.lottery.slice(0, 2) === "js") {
                if (
                    t === this.current_lottery &&
                    Object.keys(this.extremeResult).length !== 0
                ) {
                    if (!this.hasSubList.includes(this.curDataKey)) {
                        this.showpays = false;
                    }
                } else {
                    if (this.isDisabled || !this.isStop) {
                        this.$dialog
                            .confirm({
                                title: this.$t("common.point"),
                                message: this.$$t_lottery("stop_t"),
                            })
                            .then(() => {
                                // on confirm
                                this.stopInterval();

                                this.$get(u)
                                    .then((resp) => {
                                        return this.checkResp(
                                            resp,
                                            (r) => r.data.success === true
                                        );
                                    })
                                    .then((data) => {
                                        let d = data.data;
                                        this.current_lottery = t;
                                        this.playType_items = d;
                                        this.onGetCurrentDates();
                                        if (
                                            !this.hasSubList.includes(
                                                this.curDataKey
                                            )
                                        ) {
                                            this.showpays = false;
                                        }
                                        if (
                                            this.lottery &&
                                            this.lottery.slice(0, 2) === "js"
                                        ) {
                                            this.onGetExtremeDropBillRecord();
                                        } else {
                                            this.onGetRecentResultItem(false);
                                        }
                                    })
                                    .catch((error) => {
                                        this.procError(error);
                                    });
                            })
                            .catch(() => {
                                // on cancel
                            });
                    } else {
                        this.$get(u)
                            .then((resp) => {
                                return this.checkResp(
                                    resp,
                                    (r) => r.data.success === true
                                );
                            })
                            .then((data) => {
                                let d = data.data;
                                this.current_lottery = t;
                                this.playType_items = d;
                                this.onGetCurrentDates();
                                if (
                                    !this.hasSubList.includes(this.curDataKey)
                                ) {
                                    this.showpays = false;
                                }
                                if (
                                    this.lottery &&
                                    this.lottery.slice(0, 2) === "js"
                                ) {
                                    this.onGetExtremeDropBillRecord();
                                } else {
                                    this.onGetRecentResultItem(false);
                                }

                                this.collapseActiveName =
                                    this.playType_items.map((e, i) => i);
                            })
                            .catch((error) => {
                                this.procError(error);
                            });
                    }
                }
            } else {
                this.$get(u)
                    .then((resp) => {
                        return this.checkResp(
                            resp,
                            (r) => r.data.success === true
                        );
                    })
                    .then((data) => {
                        let d = data.data;
                        this.current_lottery = t;
                        this.playType_items = d;
                        if (!this.hasSubList.includes(this.curDataKey)) {
                            this.showpays = false;
                        }

                        if (this.lottery && this.lottery.slice(0, 2) === "js") {
                            this.onGetExtremeDropBillRecord();
                        } else {
                            this.onGetRecentResultItem(false);
                        }

                        this.collapseActiveName = this.playType_items.map(
                            (e, i) => i
                        );
                    })
                    .catch((error) => {
                        this.procError(error);
                    });
            }

            this.showProgress(false);
            this.onClear();
        },

        onGetLotteryTp() {
            this.showProgress();
            this.$get(`/api/Lottery/GetLotteryTp?lotteryType=${this.curParentType}&type=${this.lottery}`)
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    let d = data.data;
                    this.activeTab = this.handleLotteryTab(d[0].defaultTab);
                    this.allBetItems = d.filter((e) => e.tpType === 1);
                    let checkLastLevels = JSON.parse(sessionStorage.getItem(this.curParentType + '_second_title')) || '';
                    if (checkLastLevels) {
                        const curData = this.allBetItems.find(
                            (item) =>
                                item.value === checkLastLevels.nextLeveTitle
                        );
                        if (curData && curData.dataKey) {
                            this.onChangeGames(curData);
                        }
                    }
                    this.baseBetItems = d.filter((e) => e.tpType === 2);

                    // 之前有选过，重新返回页面使用
                    let last_key = sessionStorage.getItem(this.curParentType + '_second_title');
                    if (last_key) {
                        const data = JSON.parse(last_key);
                        this.activeTab = data.activeTab;
                        this.onGetPlayType(data);
                        return;
                    }

                    let e
                    if (this.activeTab === 'allBet') {
                        // 暂无
                        }
                    if (this.activeTab === 'baseBet') {
                        // 传统玩法：默认为【特码】-【号码】
                        e = d[0];
                    }


                    this.firstSelecteFromTab = e.dataKey; // 彩种选单-父选项

                    if (e.nextLevel.length > 0) {
                        let n =
                            e.nextLevel.find(
                                (item) => item.dataKey === this.current_lottery
                            ) || e.nextLevel[0];
                        this.nextLevels = e.nextLevel;
                        this.nextLeveTitle = e.value;
                        this.onGetPlayType(n, true);
                    } else {
                        this.nextLevels = [];
                        this.nextLeveTitle = "";
                        this.currentTitle = e.value;
                        this.onGetPlayType(e, true);
                    }
                    this.curDataKey = e.dataKey;
                    this.showProgress(false);
                })
                .catch((error) => {
                    this.showProgress(false);
                    this.procError(error);
                });
        },

        onBetPk10() {
            if (Number(this.money) <= 0) {
                this.$error(this.$$t_lottery("money_t"));
                return;
            }

            if (Number(this.money) > this.memberData.balance) {
                this.$error(this.$$t_lottery("balance_t"));
                return;
            }

            if (this.betNumber < 1) {
                this.$error(this.$$t("repeat"));
                return;
            }

            let typeCode = this.current_lottery;

            let b =
                (this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1 ||
                    this.simpleBetNumDataKey.indexOf(this.subKey) > -1) &&
                !this.specialKeyList.includes(this.subKey)
                    ? // 多注单分开
                      this.betContents.map((e) => {
                          return {
                              betContent: e.betContent,
                              money: this.money,
                              playType: e.playType,
                              singMoney: this.money,
                          };
                      })
                    : // 多注单合并
                      [
                          {
                              betContent: this.betItems,
                              money: this.betMoney,
                              playType: this.curPlayType[0].playType,
                          },
                      ];

            let p = {
                lotteryType: this.lottery,
                dates: this.currentDates.dates,
                betContent: b,
            };

            let lottery =
                this.lottery || sessionStorage.getItem("gameCode_item");

            if (lottery.slice(0, 2) === "js") {
                if (this.isShowStop && this.isStop && this.betTotal > 0) {
                    this.$info(this.$$t_lottery("betting"));
                    return;
                }

                this.isOpen = false;
                this.betTotal = 1;
                this.extremeMoney = 0;
                this.consecutiveNumber = 0;
                this.showDialog = true;
                this.$sessionSet("js-Date", p);
                this.$sessionSet("current_lottery", typeCode);
                this.$sessionSet("current_sub", this.subTab);
            } else {
                this.$store.commit("setPageTitle", this.resultItem.lotteryName);
                sessionStorage.setItem("isMake", this.isMake);
                sessionStorage.setItem("betNumber", this.betNumber);
                this.$sessionSet("bet-items", this.playType_items);
                this.$sessionSet("baseBet-data", p);
                this.$sessionSet(
                    "special-baseBet-data",
                    this.curSpecialSelected
                );
                this.$sessionSet("current_lottery", typeCode);
                this.$sessionSet("current_sub", this.subTab);
                this.$sessionSet("activeTab-data", this.activeTab);
                this.redirectRouter("pk10/bet");
            }
        },

        // 极速时时彩
        onBetExtreme(p) {
            this.isDisabled = true;
            this.$post("/api/Lottery/Bet", p)
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    let d = JSON.parse(data.data);
                    this.isOpen = true;
                    this.betTotal -= 1;
                    this.consecutiveNumber += 1;
                    this.currentWin = d.win;
                    this.extremeMoney = this.formatNum(
                        this.extremeMoney + d.win,
                        2
                    );
                    this.onClear();
                    this.initMemberData();
                    this.onGetExtremeDropBillRecord();

                    if (this.betTotal > 0 && !this.isStop) {
                        let _this = this;
                        setTimeout(function () {
                            _this.onBetExtreme(p);
                        }, 100);
                    } else {
                        this.stopInterval();
                    }
                })
                .catch((error) => {
                    this.betTotal = 0;
                    this.extremeMoney = 0;
                    this.currentWin = 0;
                    this.consecutiveNumber = 0;
                    this.isShowStop = false;
                    this.isOpen = true;
                    this.isDisabled = false;
                    this.isStop = true;
                    this.procError(error);
                });
        },

        onGetExtremeDropBillRecord() {
            let gameCode = sessionStorage.getItem("gameCode_item");
            if (!gameCode) return;
            this.$get(`/api/Lottery/GetRecentResults?type=${gameCode}&num=1`)
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    let d = data.data;
                    if (d.length > 0) {
                        this.isOpen = true;
                        this.extremeResult = d[0];
                    } else {
                        this.isOpen = false;
                    }
                })
                .catch((error) => {
                    this.procError(error);
                });
        },

        onGetDropBillRecord() {
            this.$get(
                `/api/Lottery/GetDropBillRecord?lotteryType=${this.lottery}&status=${this.tab}&pageIndex=1&pageSize=10`
            )
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    this.betLists = data.data.items;
                    if (this.$refs.betLists_scroller)
                        this.$refs.betLists_scroller.finishPullToRefresh();
                })
                .catch((error) => {
                    this.procError(error);
                    if (this.$refs.betLists_scroller)
                        this.$refs.betLists_scroller.finishPullToRefresh();
                });
        },

        stopInterval() {
            this.isStop = true;
            this.isShowStop = false;
            this.showConsecutive = true;
            this.isDisabled = false;
            this.curSpecialSelected = [];
        },

        betDialogConfirm() {
            if (this.betTotal < 1) {
                this.$info(this.$$t_lottery("bet_t"));
                return;
            }
            let p = this.$sessionGet("js-Date");
            this.isShowStop = true;
            this.isStop = false;
            this.onBetExtreme(p);
        },

        betDialogCancel() {
            this.betTotal = 0;
            this.isOpen = true;
            this.isStop = true;
        },

        onChangeGames(e) {
            this.firstSelecteFromTab = e.dataKey;

            if (this.isDisabled || !this.isStop) {
                this.$dialog
                    .confirm({
                        title: this.$t("common.point"),
                        message: this.$$t_lottery("stop_t"),
                    })
                    .then(() => {
                        // on confirm
                        this.stopInterval();

                        if (e && e.nextLevel.length > 0) {
                            this.current_lottery = e.nextLevel[0].dataKey;
                            this.nextLeveTitle = e.value;
                            this.nextLevels = e.nextLevel;
                        } else {
                            this.nextLevels = [];
                            this.onGetPlayType(e, true);
                        }

                        this.onClear();
                    })
                    .catch(() => {
                        // on cancel
                    });
            } else {
                if (e && e.nextLevel.length > 0) {
                    this.nextLeveTitle = e.value;
                    this.nextLevels = e.nextLevel;
                } else {
                    this.nextLevels = [];
                    this.onGetPlayType(e, true);
                    this.subTab = 0;
                }

                this.onClear();
            }
        },

        getActive(item, playType, code) {
            let type = playType;
            let e = null;
            if (code)
                e = this.betContents.filter(
                    (e) =>
                        e.playType === type &&
                        e.betContent === item &&
                        e.code === code
                );
            else
                e = this.betContents.filter(
                    (e) => e.playType === type && e.betContent === item
                );
            if (e.length > 0) return true;
            else return false;
        },

        initCurSelected() {
            if (
                (this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1 ||
                    this.simpleBetNumDataKey.indexOf(this.subKey) > -1) &&
                !this.specialKeyList.includes(this.subKey)
            )
                return;
            let len = this.curTypeList && this.curTypeList.ruleList.length;

            if (!len) {
                this.curSelected = [];
                return;
            }

            if (
                this.specialKeyList.includes(this.subKey) ||
                this.specialKeyList.includes(this.curDataKey)
            ) {
                this.curSelected = [[]];
                return;
            }

            const newSelected = [];
            for (let i = 0; i < len; i++) {
                newSelected.push([]);
            }
            this.curSelected = newSelected;
        },

        selectBet(curValue, betItemIndex, specialVal) {
            if (
                this.curDataKey === "Mismatch" &&
                this.curSelected[0].length >= 11 &&
                !this.curSelected[0].includes(curValue)
            ) {
                return;
            }

            if (
                ["Win2", "WinExtra2", "WinExtraNo"].includes(this.subKey) &&
                this.curSelected[0].length >= 7 &&
                !this.curSelected[0].includes(curValue)
            ) {
                return;
            }

            if (
                ["Win2/3", "Win3", "Win4"].includes(this.subKey) &&
                this.curSelected[0].length >= 10 &&
                !this.curSelected[0].includes(curValue)
            ) {
                return;
            }

            const valueIndex = this.curSelected[betItemIndex].indexOf(curValue);
            if (valueIndex === -1) {
                this.$set(
                    this.curSelected,
                    betItemIndex,
                    [...this.curSelected[betItemIndex], curValue].sort(
                        (a, b) => a - b
                    )
                );
                if (specialVal) {
                    this.curSpecialSelected.push(specialVal);
                }
            } else {
                const cloneList = [...this.curSelected[betItemIndex]];
                cloneList.splice(valueIndex, 1);
                this.$set(this.curSelected, betItemIndex, cloneList);
                if (specialVal) {
                    this.curSpecialSelected.splice(valueIndex, 1);
                }
            }
            this.handleSent();
        },

        handleSent() {
            let minCheckPass = false;
            let repeatCheckPass = !this.curTypeList.checkRepeat;
            // const curPlayType = this.playType[0];

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
                    } else if (this.curTypeList.isSingle) {
                        timesNum = 1;
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

            this.betItems = betItems;
            // 注数
            this.betNumber = timesNum;
            // 是否通过验证
            this.pass = minCheckPass && repeatCheckPass;
        },

        getCompose(num, minLength) {
            if (num <= minLength) {
                return 1;
            }

            if (minLength <= 1) {
                return num;
            }

            const denominator = (value) => {
                let newValue = 1;
                for (let i = value; i > 0; --i) {
                    newValue = newValue * i;
                }

                return newValue;
            };

            const molecular = (value, min) => {
                let newValue = 1;
                for (let i = value; i > value - min; --i) {
                    newValue = newValue * i;
                }

                return newValue;
            };

            return molecular(num, minLength) / denominator(minLength);
        },

        setBetContent(item, playType, fastSelectArray) {
            if (this.isSeal || this.isDisabled) return;
            // if (noFilter) this.betContents = [];
            let t = playType;
            let e = null;

            if (fastSelectArray) {
                this.betContents = [];
                if (fastSelectArray.length > 0) {
                    for (let item2 of fastSelectArray) {
                        this.betContents.push({
                            playType: t,
                            betContent: item2 + "",
                        });
                    }
                }
            } else {
                e = this.betContents.findIndex(
                    (e) => e.playType === t && e.betContent === item
                );

                if (e >= 0) {
                    this.betContents.splice(e, 1);
                } else {
                    if (
                        ["ExtraNo2Sides", "AllColor", "BallNo1~6"].includes(
                            this.subKey
                        ) ||
                        ["TatalSum"].includes(this.curDataKey)
                    ) {
                        // console.log("TatalSum");
                        let deleteBetContent = [];
                        let deletIndex = -1;
                        switch (`${t} ${item}`) {
                            case "ExtraNo2Sides big":
                                deleteBetContent.push("ExtraNo2Sides small");
                                break;
                            case "ExtraNo2Sides small":
                                deleteBetContent.push("ExtraNo2Sides big");
                                break;
                            case "ExtraNo2Sides odd":
                                deleteBetContent.push("ExtraNo2Sides even");
                                break;
                            case "ExtraNo2Sides even":
                                deleteBetContent.push("ExtraNo2Sides odd");
                                break;
                            case "ExtraNo2Sides SumBig":
                                deleteBetContent.push("ExtraNo2Sides SumSmall");
                                break;
                            case "ExtraNo2Sides SumSmall":
                                deleteBetContent.push("ExtraNo2Sides SumBig");
                                break;
                            case "ExtraNo2Sides SumOdd":
                                deleteBetContent.push("ExtraNo2Sides SumEven");
                                break;
                            case "ExtraNo2Sides SumEven":
                                deleteBetContent.push("ExtraNo2Sides SumOdd");
                                break;
                            case "ExtraNo2Sides SkyZodiac":
                                deleteBetContent.push(
                                    "ExtraNo2Sides GroundZodiac"
                                );
                                break;
                            case "ExtraNo2Sides GroundZodiac":
                                deleteBetContent.push(
                                    "ExtraNo2Sides SkyZodiac"
                                );
                                break;
                            case "ExtraNo2Sides FirstZodiac":
                                deleteBetContent.push(
                                    "ExtraNo2Sides LastZodiac"
                                );
                                break;
                            case "ExtraNo2Sides LastZodiac":
                                deleteBetContent.push(
                                    "ExtraNo2Sides FirstZodiac"
                                );
                                break;
                            case "ExtraNo2Sides PoultryZodiac":
                                deleteBetContent.push(
                                    "ExtraNo2Sides BeastZodiac"
                                );
                                break;
                            case "ExtraNo2Sides BeastZodiac":
                                deleteBetContent.push(
                                    "ExtraNo2Sides PoultryZodiac"
                                );
                                break;
                            case "ExtraNo2Sides ExtraTailBig":
                                deleteBetContent.push(
                                    "ExtraNo2Sides ExtraTailSmall"
                                );
                                break;
                            case "ExtraNo2Sides ExtraTailSmall":
                                deleteBetContent.push(
                                    "ExtraNo2Sides ExtraTailBig"
                                );
                                break;
                            case "TatalSum TotalBig":
                                deleteBetContent.push("TatalSum TotalSmall");
                                break;
                            case "TatalSum TotalSmall":
                                deleteBetContent.push("TatalSum TotalBig");
                                break;
                            case "TatalSum TotalOdd":
                                deleteBetContent.push("TatalSum TotalEven");
                                break;
                            case "TatalSum TotalEven":
                                deleteBetContent.push("TatalSum TotalOdd");
                                break;
                            case "ExtraNoColor RedColor":
                                if (
                                    this.betContents.some(
                                        (item) =>
                                            `${item.playType} ${item.betContent}` ===
                                            "ExtraNoColor BlueColor"
                                    )
                                ) {
                                    deleteBetContent.push(
                                        "ExtraNoColor BlueColor"
                                    );
                                }

                                if (
                                    this.betContents.some(
                                        (item) =>
                                            `${item.playType} ${item.betContent}` ===
                                            "ExtraNoColor GreenColor"
                                    )
                                ) {
                                    deleteBetContent.push(
                                        "ExtraNoColor GreenColor"
                                    );
                                }
                                break;
                            case "ExtraNoColor BlueColor":
                                if (
                                    this.betContents.some(
                                        (item) =>
                                            `${item.playType} ${item.betContent}` ===
                                            "ExtraNoColor RedColor"
                                    )
                                ) {
                                    deleteBetContent.push(
                                        "ExtraNoColor RedColor"
                                    );
                                }
                                if (
                                    this.betContents.some(
                                        (item) =>
                                            `${item.playType} ${item.betContent}` ===
                                            "ExtraNoColor GreenColor"
                                    )
                                ) {
                                    deleteBetContent.push(
                                        "ExtraNoColor GreenColor"
                                    );
                                }
                                break;
                            case "ExtraNoColor GreenColor":
                                if (
                                    this.betContents.some(
                                        (item) =>
                                            `${item.playType} ${item.betContent}` ===
                                            "ExtraNoColor RedColor"
                                    )
                                ) {
                                    deleteBetContent.push(
                                        "ExtraNoColor RedColor"
                                    );
                                }
                                if (
                                    this.betContents.some(
                                        (item) =>
                                            `${item.playType} ${item.betContent}` ===
                                            "ExtraNoColor BlueColor"
                                    )
                                ) {
                                    deleteBetContent.push(
                                        "ExtraNoColor BlueColor"
                                    );
                                }
                                break;

                            case "BallNo1 big":
                                deleteBetContent.push("BallNo1 small");
                                break;
                            case "BallNo1 small":
                                deleteBetContent.push("BallNo1 big");
                                break;
                            case "BallNo1 odd":
                                deleteBetContent.push("BallNo1 even");
                                break;
                            case "BallNo1 even":
                                deleteBetContent.push("BallNo1 odd");
                                break;
                            case "BallNo1 SumBig":
                                deleteBetContent.push("BallNo1 SumSmall");
                                break;
                            case "BallNo1 SumSmall":
                                deleteBetContent.push("BallNo1 SumBig");
                                break;
                            case "BallNo1 SumOdd":
                                deleteBetContent.push("BallNo1 SumEven");
                                break;
                            case "BallNo1 SumEven":
                                deleteBetContent.push("BallNo1 SumOdd");
                                break;
                            case "BallNo1 TailBig":
                                deleteBetContent.push("BallNo1 TailSmall");
                                break;
                            case "BallNo1 TailSmall":
                                deleteBetContent.push("BallNo1 TailBig");
                                break;

                            case "BallNo2 big":
                                deleteBetContent.push("BallNo2 small");
                                break;
                            case "BallNo2 small":
                                deleteBetContent.push("BallNo2 big");
                                break;
                            case "BallNo2 odd":
                                deleteBetContent.push("BallNo2 even");
                                break;
                            case "BallNo2 even":
                                deleteBetContent.push("BallNo2 odd");
                                break;
                            case "BallNo2 SumBig":
                                deleteBetContent.push("BallNo2 SumSmall");
                                break;
                            case "BallNo2 SumSmall":
                                deleteBetContent.push("BallNo2 SumBig");
                                break;
                            case "BallNo2 SumOdd":
                                deleteBetContent.push("BallNo2 SumEven");
                                break;
                            case "BallNo2 SumEven":
                                deleteBetContent.push("BallNo2 SumOdd");
                                break;
                            case "BallNo2 TailBig":
                                deleteBetContent.push("BallNo2 TailSmall");
                                break;
                            case "BallNo2 TailSmall":
                                deleteBetContent.push("BallNo2 TailBig");
                                break;

                            case "BallNo3 big":
                                deleteBetContent.push("BallNo3 small");
                                break;
                            case "BallNo3 small":
                                deleteBetContent.push("BallNo3 big");
                                break;
                            case "BallNo3 odd":
                                deleteBetContent.push("BallNo3 even");
                                break;
                            case "BallNo3 even":
                                deleteBetContent.push("BallNo3 odd");
                                break;
                            case "BallNo3 SumBig":
                                deleteBetContent.push("BallNo3 SumSmall");
                                break;
                            case "BallNo3 SumSmall":
                                deleteBetContent.push("BallNo3 SumBig");
                                break;
                            case "BallNo3 SumOdd":
                                deleteBetContent.push("BallNo3 SumEven");
                                break;
                            case "BallNo3 SumEven":
                                deleteBetContent.push("BallNo3 SumOdd");
                                break;
                            case "BallNo3 TailBig":
                                deleteBetContent.push("BallNo3 TailSmall");
                                break;
                            case "BallNo3 TailSmall":
                                deleteBetContent.push("BallNo3 TailBig");
                                break;

                            case "BallNo4 big":
                                deleteBetContent.push("BallNo4 small");
                                break;
                            case "BallNo4 small":
                                deleteBetContent.push("BallNo4 big");
                                break;
                            case "BallNo4 odd":
                                deleteBetContent.push("BallNo4 even");
                                break;
                            case "BallNo4 even":
                                deleteBetContent.push("BallNo4 odd");
                                break;
                            case "BallNo4 SumBig":
                                deleteBetContent.push("BallNo4 SumSmall");
                                break;
                            case "BallNo4 SumSmall":
                                deleteBetContent.push("BallNo4 SumBig");
                                break;
                            case "BallNo4 SumOdd":
                                deleteBetContent.push("BallNo4 SumEven");
                                break;
                            case "BallNo4 SumEven":
                                deleteBetContent.push("BallNo4 SumOdd");
                                break;
                            case "BallNo4 TailBig":
                                deleteBetContent.push("BallNo4 TailSmall");
                                break;
                            case "BallNo4 TailSmall":
                                deleteBetContent.push("BallNo4 TailBig");
                                break;

                            case "BallNo5 big":
                                deleteBetContent.push("BallNo5 small");
                                break;
                            case "BallNo5 small":
                                deleteBetContent.push("BallNo5 big");
                                break;
                            case "BallNo5 odd":
                                deleteBetContent.push("BallNo5 even");
                                break;
                            case "BallNo5 even":
                                deleteBetContent.push("BallNo5 odd");
                                break;
                            case "BallNo5 SumBig":
                                deleteBetContent.push("BallNo5 SumSmall");
                                break;
                            case "BallNo5 SumSmall":
                                deleteBetContent.push("BallNo5 SumBig");
                                break;
                            case "BallNo5 SumOdd":
                                deleteBetContent.push("BallNo5 SumEven");
                                break;
                            case "BallNo5 SumEven":
                                deleteBetContent.push("BallNo5 SumOdd");
                                break;
                            case "BallNo5 TailBig":
                                deleteBetContent.push("BallNo5 TailSmall");
                                break;
                            case "BallNo5 TailSmall":
                                deleteBetContent.push("BallNo5 TailBig");
                                break;

                            case "BallNo6 big":
                                deleteBetContent.push("BallNo6 small");
                                break;
                            case "BallNo6 small":
                                deleteBetContent.push("BallNo6 big");
                                break;
                            case "BallNo6 odd":
                                deleteBetContent.push("BallNo6 even");
                                break;
                            case "BallNo6 even":
                                deleteBetContent.push("BallNo6 odd");
                                break;
                            case "BallNo6 SumBig":
                                deleteBetContent.push("BallNo6 SumSmall");
                                break;
                            case "BallNo6 SumSmall":
                                deleteBetContent.push("BallNo6 SumBig");
                                break;
                            case "BallNo6 SumOdd":
                                deleteBetContent.push("BallNo6 SumEven");
                                break;
                            case "BallNo6 SumEven":
                                deleteBetContent.push("BallNo6 SumOdd");
                                break;
                            case "BallNo6 TailBig":
                                deleteBetContent.push("BallNo6 TailSmall");
                                break;
                            case "BallNo6 TailSmall":
                                deleteBetContent.push("BallNo6 TailBig");
                                break;
                            default:
                                deletIndex = -1;
                        }

                        this.betContents.forEach((item) => {
                            if (deletIndex !== -1) {
                                return;
                            }
                            deletIndex = deleteBetContent.includes(
                                `${item.playType} ${item.betContent}`
                            )
                                ? 0
                                : -1;
                        });

                        if (deletIndex !== -1) {
                            deleteBetContent.forEach((del) => {
                                this.setBetContent(del.split(" ")[1], t);
                                console.log("t", t);
                            });
                        }
                    }

                    this.betContents.push({
                        playType: t,
                        betContent: item,
                    });
                }
            }

            this.betNumber = this.betContents.length;
            if (this.betNumber > 0) this.pass = true;
            else this.pass = false;
        },

        onTotalConfirm() {
            this.showConsecutive = false;
            if (this.betTotal < 1) return;
            this.showProgress();
            setTimeout(() => {
                this.showProgress(false);
                let code = sessionStorage.getItem("select-code");
                let b = sessionStorage.getItem("goBetLists");
                let l = sessionStorage.getItem("goLotteryLobby");
                if (b === "goBetLists") {
                    this.showPopup = false;
                    this.redirectRouter("betLists");
                } else if (this.showPopup) {
                    this.showPopup = false;
                    this.$router.push("betLists/details");
                } else if (l === "goLotteryLobby") {
                    this.firstSelecteFromTab = "";
                    this.activeTab = "allBet";
                    this.redirectRouter("/app/lotteryLobby");
                    sessionStorage.removeItem("current_sub");
                } else if (Number(code) === 2) {
                    this.redirectRouter("betLists");
                } else if (code === "dashboard") {
                    this.redirectRouter("/app/dashboard");
                    this.onChangeGames(this.baseBetItems[0]);
                    this.subTab = 0;
                    this.activeTab = "baseBet";
                    this.curDataKey = "ExtraNo";
                    sessionStorage.removeItem("current_sub");
                } else if (code === "deposit") {
                    this.redirectRouter("/app/recharge");
                } else if (Number(code) === 3) {
                    this.redirectRouter("lottery/rule");
                }

                sessionStorage.removeItem("select-code");
                sessionStorage.removeItem("goBetLists");
                sessionStorage.removeItem("goLotteryLobby");
            }, 500);
        },

        goBetLists() {
            if (this.isDisabled || !this.isStop) {
                this.$dialog
                    .confirm({
                        title: this.$t("common.point"),
                        message: this.$$t_lottery("stop_t"),
                    })
                    .then(() => {
                        // on confirm
                        sessionStorage.setItem("goBetLists", "goBetLists");
                        this.stopInterval();
                    })
                    .catch(() => {
                        // on cancel
                    });
            } else {
                this.redirectRouter("betLists");
            }
        },

        getArry(a) {
            if (a) return a.split(",");
            else return [];
        },

        getBetText(e, type) {
            return [
                {
                    betContent: e,
                    money: this.betMoney,
                    playType: type,
                },
            ];
        },

        goLotteryLobby() {
            if (this.isDisabled || !this.isStop) {
                if (this.lottery.slice(0, 2) === "js" && this.betTotal > 0) {
                    this.$dialog
                        .confirm({
                            title: this.$t("common.point"),
                            message: this.$$t_lottery("stop_t"),
                        })
                        .then(() => {
                            // on confirm
                            sessionStorage.removeItem(this.curParentType + '_second_title');
                            sessionStorage.setItem(
                                "goLotteryLobby",
                                "goLotteryLobby"
                            );
                            this.stopInterval();
                        })
                        .catch(() => {
                            // on cancel
                        });
                }
            } else {
                this.firstSelecteFromTab = "";
                this.activeTab = "allBet";
                this.redirectRouter("/app/lotteryLobby");
                sessionStorage.removeItem("gameCode_item");
                sessionStorage.removeItem("current_sub");
                sessionStorage.removeItem(this.curParentType + '_second_title');
            }
        },

        onShowpays() {
            this.showpays = !this.showpays;
        },

        onSelect(c) {
            this.showPopover = false;
            if (Number(c.code) === 1) {
                this.showPopup = true;
                return;
            }

            if (c.code === "record") {
                this.showResults = true;
                return;
            }

            if (this.isDisabled || !this.isStop) {
                this.$dialog
                    .confirm({
                        title: this.$t("common.point"),
                        message: this.$$t_lottery("stop_t"),
                    })
                    .then(() => {
                        // on confirm
                        sessionStorage.setItem("select-code", c.code);
                        this.stopInterval();
                    })
                    .catch(() => {
                        // on cancel
                    });
                return;
            }

            if (Number(c.code) === 2) {
                this.redirectRouter("betLists");
            } else if (c.code === "dashboard") {
                sessionStorage.removeItem("current_lottery");
                sessionStorage.removeItem("current_sub");
                sessionStorage.removeItem(this.curParentType + '_second_title');
                sessionStorage.removeItem("rules_code");
                // this.activeTab = "allBet";
                this.onChangeGames(this.baseBetItems[0]);
                this.subTab = 0;
                this.activeTab = "baseBet";
                this.curDataKey = "ExtraNo";
                sessionStorage.removeItem("gameCode_item");
                this.redirectRouter("/app/dashboard");
            } else if (c.code === "deposit") {
                this.redirectRouter("/app/recharge");
            } else if (Number(c.code) === 3) {
                this.redirectRouter("lottery/rule");
            }
        },

        singleBtnClick(bet, type, code) {
            if (this.isSeal) return;
            let n = Number(bet.code);
            let b = [];
            let items = [];
            if (code) {
                for (let i = 1; i < 11; i++) {
                    items.push({
                        betContent: i,
                        playType: type,
                        code: code,
                    });
                }
            } else {
                for (let i = 1; i < 11; i++) {
                    items.push({
                        betContent: i,
                        playType: type,
                    });
                }
            }

            if (n === 1) {
                b = items;
            } else if (n === 2) {
                b = items.filter(
                    (e) => Number(e.betContent) > 5 && e.playType === type
                );
            } else if (n === 3) {
                b = items.filter(
                    (e) => Number(e.betContent) < 6 && e.playType === type
                );
            } else if (n === 4) {
                b = items.filter(
                    (e) => Number(e.betContent) % 2 !== 0 && e.playType === type
                );
            } else if (n === 5) {
                b = items.filter(
                    (e) => Number(e.betContent) % 2 === 0 && e.playType === type
                );
            } else {
                b = [];
            }

            if (code) {
                if (n === 6) {
                    for (var i = this.betContents.length - 1; i >= 0; i--) {
                        if (this.betContents[i].code === code) {
                            this.betContents.splice(i, 1);
                        }
                    }
                } else {
                    b.forEach((e) => {
                        this.betContents.forEach((bb, index) => {
                            if (e.code === bb.code)
                                this.betContents.splice(index, 1);
                        });
                    });
                }

                this.betContents.push(...b);
            } else {
                this.betContents = b;
            }
        },

        goDetails(item) {
            if (this.isDisabled || !this.isStop) {
                this.$dialog
                    .confirm({
                        title: this.$t("common.point"),
                        message: this.$$t_lottery("stop_t"),
                    })
                    .then(() => {
                        // on confirm
                        sessionStorage.setItem(
                            "betLists-Data",
                            JSON.stringify(item)
                        );
                        this.stopInterval();
                    })
                    .catch(() => {
                        // on cancel
                    });
            } else {
                sessionStorage.setItem("betLists-Data", JSON.stringify(item));
                this.$router.push("betLists/details");
            }
        },

        onFinish() {
            let t = this.lottery;
            if (!t) return;
            this.oldOpen.isOPen = false;
            this.isShowCurResultTable = false;
            setTimeout(() => {
                this.onGetCurrentDates();
            }, 100);
        },

        onClear() {
            this.initCurSelected();
            this.betNumber = 0;
            this.betContents = [];
            this.money = 3;
        },

        getDataText(e) {
            if (!e) return;
            let d = this.formatDate_MT_8(e);
            let v = "";

            if (this.resultItem.lotteryType === "azxy5") {
                v = "";
            } else if (this.isAndroid()) {
                v = d.replace(/-/g, "") + "-";
            } else {
                v = d.replace(/[/]/g, "") + "-";
            }

            return v;
        },

        $$t_lottery(v) {
            return this.$t("lottery." + v);
        },

        $$t(v, p) {
            return this.$t("pk10." + v, p);
        },

        $$t_k3(v) {
            return this.$t("k3." + v);
        },

        setSubTab(sub) {
            this.subTab = sub;
            this.$sessionSet("current_sub", this.subTab);
            this.showpays = false;
            this.onClear();
        },

        getZodiacData() {
            this.$get("/api/Lottery/GetZodiac")
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    this.zodiacList = data.data;
                    this.$sessionSet("zodiacList", this.zodiacList);
                })
                .catch((error) => {
                    this.procError(error);
                });
        },

        getFiveElement() {
            this.$get("/api/Lottery/GetFiveElement")
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    this.fiveElementList = data.data;
                })
                .catch((error) => {
                    this.procError(error);
                });
        },

        getMark6Color(content) {
            switch (+content) {
                case 1:
                case 2:
                case 7:
                case 8:
                case 12:
                case 13:
                case 18:
                case 19:
                case 23:
                case 24:
                case 29:
                case 30:
                case 34:
                case 35:
                case 40:
                case 45:
                case 46:
                    return "red";
                case 3:
                case 4:
                case 9:
                case 10:
                case 14:
                case 15:
                case 20:
                case 25:
                case 26:
                case 31:
                case 36:
                case 37:
                case 41:
                case 42:
                case 47:
                case 48:
                    return "blue";
                case 5:
                case 6:
                case 11:
                case 16:
                case 17:
                case 21:
                case 22:
                case 27:
                case 28:
                case 32:
                case 33:
                case 38:
                case 39:
                case 43:
                case 44:
                case 49:
                    return "green";
                default:
                    return "";
            }
        },

        getCurZodiac(content) {
            try {
                return (
                    this.zodiacList.find((item) => item.zodiac === content)
                        ?.zodiacName || "null"
                );
            } catch {
                return "null";
            }
        },

        transCurZodiacName(curPlayType, content) {
            if (
                [
                    "ComboZodiac",
                    "RowZodiac2",
                    "RowZodiac3",
                    "RowZodiac4",
                    "RowZodiac5",
                ].includes(curPlayType)
            ) {
                const list = content.split(",");

                return list
                    .map((item) =>
                        this.zodiacList.find((t) => t.zodiac === item)
                            ? this.zodiacList.find((t) => t.zodiac === item)
                                  .zodiacName
                            : item
                    )
                    .join(",");
            }

            if (
                ["Rowtail2", "Rowtail3", "Rowtail4", "Rowtail5"].includes(
                    curPlayType
                )
            ) {
                const list = content.split(",");
                return list
                    .map((item) => {
                        switch (item) {
                            case "0Tail":
                                return this.$$t("_529");
                            case "1Tail":
                                return this.$$t("_530");
                            case "2Tail":
                                return this.$$t("_531");
                            case "3Tail":
                                return this.$$t("_532");
                            case "4Tail":
                                return this.$$t("_533");
                            case "5Tail":
                                return this.$$t("_534");
                            case "6Tail":
                                return this.$$t("_535");
                            case "7Tail":
                                return this.$$t("_536");
                            case "8Tail":
                                return this.$$t("_537");
                            case "9Tail":
                                return this.$$t("_538");
                            default:
                                return item;
                        }
                    })
                    .join(",");
            }
            return content;
        },

        getColor(content) {
            switch (+content) {
                case 1:
                case 2:
                case 7:
                case 8:
                case 12:
                case 13:
                case 18:
                case 19:
                case 23:
                case 24:
                case 29:
                case 30:
                case 34:
                case 35:
                case 40:
                case 45:
                case 46:
                    return "red";
                case 3:
                case 4:
                case 9:
                case 10:
                case 14:
                case 15:
                case 20:
                case 25:
                case 26:
                case 31:
                case 36:
                case 37:
                case 41:
                case 42:
                case 47:
                case 48:
                    return "blue";
                case 5:
                case 6:
                case 11:
                case 16:
                case 17:
                case 21:
                case 22:
                case 27:
                case 28:
                case 32:
                case 33:
                case 38:
                case 39:
                case 43:
                case 44:
                case 49:
                    return "green";
                default:
                    return "";
            }
        },

        getForAllColorColor(content) {
            switch (+content) {
                case 1:
                case 2:
                case 7:
                case 8:
                case 12:
                case 13:
                case 18:
                case 19:
                case 23:
                case 24:
                case 29:
                case 30:
                case 34:
                case 35:
                case 40:
                case 45:
                case 46:
                    return "RedColor";
                case 3:
                case 4:
                case 9:
                case 10:
                case 14:
                case 15:
                case 20:
                case 25:
                case 26:
                case 31:
                case 36:
                case 37:
                case 41:
                case 42:
                case 47:
                case 48:
                    return "BlueColor";
                case 5:
                case 6:
                case 11:
                case 16:
                case 17:
                case 21:
                case 22:
                case 27:
                case 28:
                case 32:
                case 33:
                case 38:
                case 39:
                case 43:
                case 44:
                case 49:
                    return "GreenColor";
                default:
                    return "";
            }
        },
    },

    destroyed() {
        window.removeEventListener("scroll", this.scroller);
        sessionStorage.removeItem("new_pull");
    },

    beforeRouteLeave(to, form, next) {
        if (this.timeOutDates) clearTimeout(this.timeOutDates);
        sessionStorage.removeItem("js-Date");
        sessionStorage.removeItem("new_pull");
        if (!this.oldOpen.isOPen) sessionStorage.setItem("isOpen", false);
        next();
    },
};
</script>

<style lang="less">
#mark6 {
    ::-webkit-scrollbar {
        display: none;
    }

    /deep/ .van-popover {
        text-align: left;
    }

    .pays_popup {
        top: 46px !important;

        .game_block {
            // width: fit-content;
            min-height: 1.22667rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.13333rem;
            background-color: #f5f5f9;
            padding: 0.16rem;
            margin: 0 0.32rem 0.32rem;
        }
    }

    .tab_active {
        background-color: rgb(223, 236, 255) !important;
        color: rgb(82, 149, 253) !important;
    }

    .bet_center {
        position: absolute;
        // top: 160px;
        top: 4.5rem;
        left: 0;
        right: 0;
        bottom: 90px;
        width: 100%;

        /deep/ .van-row {
            .van-col_20 {
                width: 20% !important;
            }
        }

        .ball-tle {
            line-height: 28px;
            background: #e5e5e5;
            display: inline-block;
            padding: 0 10px 0 12px;
            color: #888;
            position: relative;
            margin-top: 4px;
        }

        .ball-tle:after {
            content: "";
            width: 0;
            height: 0;
            border-width: 14px 0 14px 10px;
            border-style: solid;
            border-color: transparent transparent transparent #e5e5e5;
            position: absolute;
            right: -10px;
            top: 50%;
            margin-top: -14px;
        }

        .ball-num {
            box-sizing: content-box;
            display: block;
            margin: 0 auto;
            width: 42px;
            line-height: 42px;
            border-radius: 100%;
            -webkit-border-radius: 100%;
            background: #fff;
            border: solid 1px #ddd;
            box-shadow: 0 0 3px rgb(0 0 0 / 10%);
            color: #747164;
            font-size: 16px;
            font-weight: 800;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            text-align: center;
            white-space: nowrap;
            // overflow: hidden;
            // text-overflow: ellipsis;
        }

        .ball-square {
            width: auto;
            padding: 0 3px;
            margin: 0 3px;
            min-height: 44px;
            border-radius: 5px;
            text-align: center;
        }

        .ball-color-num {
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
        }

        .ball-oneline {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
            padding-bottom: 6px;
        }

        .ball-color-two-column {
            padding-bottom: 6px;
            padding-left: 0;
            padding-right: 0;
        }

        .ball-single-line {
            padding-bottom: 10px;
            padding-left: 0;
            padding-right: 0;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
        }

        .b-pk10-btn {
            width: 30px;
            line-height: 30px;
            font-size: 18px;
            box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
                0 6px 10px 0 rgba(0, 0, 0, 0.14),
                0 1px 18px 0 rgba(0, 0, 0, 0.12);
        }

        .ball-tool {
            float: right;
            line-height: 26px;
            font-size: 14px;

            > span {
                display: block;
                float: left;
                height: 100%;
                min-width: 20px;
                text-align: center;
                // padding: 0 2px;
                position: relative;
                background: #fff;
                color: #747164;
                margin-left: -1px;
                border: solid 1px #d1d1d1;
            }

            > span:first-child {
                border-radius: 15px 0 0 15px;
                padding-left: 8px;
            }
        }
    }

    .footer-toolbar {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        box-shadow: 0 0 4px rgb(0 0 0 / 10%);

        .msg_info {
            margin: auto;
            min-width: 160px;
            max-width: 260px;
            background-color: rgb(255, 100, 100);
        }

        .nav-btn {
            height: 50px;
        }

        .money_bet {
            border: solid 1px #d8d8d8;
            padding: 4px !important;
            width: 60px;
            border-radius: 5px;
            font-size: 14px;
        }
    }

    .pk10_nav {
        background-image: url(/images/banner/lotteryLobby.png);
        background-size: 100% 100%;
        color: white !important;

        .van-icon {
            color: white !important;
        }

        .van-icon-arrow-left {
            font-size: 22px;
        }
    }

    .right-menu {
        .van-popover__action-icon {
            color: black !important;
        }
    }

    .dateInfo {
        min-height: 102px;
        display: flex;
        align-items: center;
        .van-row {
            width: 100%;
        }
        .divider_col {
            border-right: 0.5px solid rgb(83, 93, 118);
        }

        .van-count-down {
            .block {
                font-size: 28px;
                font-family: "numberfont" !important;
            }

            .separator {
                font-size: 28px;
                font-family: "numberfont" !important;
            }
        }
    }

    .betLists {
        position: absolute;
        top: 60px;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: white;

        .betList {
            color: rgb(51, 51, 51);

            .top {
                height: 30px;
                line-height: 30px;
            }

            .bet_money {
                color: rgb(70, 132, 255);
            }

            .status_0 {
                color: rgb(68, 187, 0);
            }

            .status_1 {
                color: rgb(224, 32, 32);
            }
        }
    }

    .current_active {
        color: white !important;
        background-color: #5b7ffb !important;
        background: linear-gradient(
            to left,
            rgba(66, 101, 241, 0.7),
            rgba(100, 150, 251, 0.7)
        ) !important;

        .subtitle-4 {
            color: white !important;
        }

        .caption {
            color: white !important;
        }
    }

    .rulesLists {
        background-color: white;
        position: absolute;
        top: 35px;
        left: 0;
        right: 0;
        bottom: 0;

        .striped {
            background-color: rgb(248, 248, 248);
        }
    }

    .oldOpen {
        .van-count-down {
            .block {
                font-size: 20px;
                font-weight: 500;
                background-image: unset;
            }
        }
    }

    .tool-pl {
        display: inline-block;
        line-height: 24px;
        background: #fff;
        border-radius: 0 8px 10px 0;
        box-shadow: 1px 1px 6px rgb(0 0 0 / 10%);
    }

    .van-dialog {
        .van-field {
            height: 44px;
            border-radius: 8px;
            background-color: #f5f5f9;
            width: 100%;
            font-size: 16px;
            padding-left: 16px;
        }

        ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 16px;

            li {
                width: 65px;
                height: 40px;
                border-radius: 22px;
                border: solid 1px #cccccc;
                font-size: 16px;
                color: #000;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 12px;
            }

            .active {
                background-image: linear-gradient(
                    to right,
                    rgb(154, 187, 255),
                    rgb(70, 132, 255)
                );
                color: #fff;
                border: none;
            }
        }
    }

    .tag-blue,
    .tag-white,
    .tag-red,
    .tag-yellow {
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        display: inline-block;
        color: #fff;
        border-radius: 5px;
        background-color: #ff9726;
    }

    .tag-blue {
        background-color: #5691d7;
    }

    .tag-white {
        background-color: #fff;
        color: #222;
        border: 1px solid #222;
    }

    .tag-red {
        border-radius: 50%;
        background-color: #ff0000;
    }

    .van-collapse {
        .van-collapse-item__content {
            padding-bottom: 0 !important;
        }
    }

    .mark6-current-wrap {
        margin: 0.15rem;
        border-left: 1px solid rgba(117, 162, 251, 0.3);
        border-top: 1px solid rgba(117, 162, 251, 0.3);
    }

    .mark6-current-name {
        color: #5b7ffb;
        padding: 0.1rem;
        width: 2.5rem;
        border-right: 1px solid rgba(117, 162, 251, 0.3);
        border-bottom: 1px solid rgba(117, 162, 251, 0.3);
    }

    .mark6-current-result {
        color: #5b7ffb;
        padding: 0.1rem;
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(117, 162, 251, 0.3);
        border-bottom: 1px solid rgba(117, 162, 251, 0.3);
    }

    .mark6-roadData-dialog {
        min-height: 60vh;
        .van-dialog__footer {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
        }
    }

    .roadmap {
        color: #000;
        font-size: 14px;
        font-weight: 600;
        .title-bar {
            width: 100%;
            display: inline-flex;
            justify-content: space-between;
            padding: 5px;
            background: #e9e5e5;
            ._19 {
                color: #ffd700;
                text-shadow: 0 1px 3px #222;
            }
            ._21,
            ._23 {
                color: #ff0000;
            }
            ._20,
            ._22 {
                color: #409eff;
            }
            ._1 {
                color: #32b972;
            }
            ._11 {
                color: #32b972;
            }
            .number-0 {
                background: #000;
            }
            .number-1 {
                background: #005bc8;
            }
            .number-2 {
                background: #027338;
            }
            .number-3 {
                background: #e67613;
            }
            .number-4 {
                background: #e9202c;
            }
            .number-0,
            .number-1,
            .number-2,
            .number-3,
            .number-4 {
                width: 15px;
                height: 15px;
                line-height: 15px;
                text-align: center;
                display: inline-block;
                color: #fff;
                border-radius: 5px;
            }
        }
        .contro {
            display: flex;
            flex-direction: column;
            min-width: 20vw;
            position: relative;
            z-index: 3;
            background: #f9fbff;
            .contro-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 28px;
                border: 1px solid #e9e5e5;
                background: #f9fbff;
            }
        }
        .balls {
            display: flex;
            margin-right: 20vw;
            border-top: 1px solid #999;
            .cell {
                border-right: 1px solid #999;
                border-left: 1px solid #999;
                border-bottom: 1px solid #999;
                min-width: 22px;
                min-height: 22px;
                // display: flex;
                // align-items: center;
                // justify-content: center;
                letter-spacing: -2px;
                .mark6-ball {
                    padding: 0 3px;
                    background-color: #f9b54f;
                    border-radius: 10%;
                    margin: 2px 5px;
                }
                .ball {
                    width: 17px;
                    height: 17px;
                    line-height: 17px;
                    text-align: center;
                    display: inline-block;
                    color: #fff;
                    border-radius: 50%;
                    margin: 2px;
                    text-indent: -3px;
                }
                .ball-red {
                    border: 1px red solid;
                    color: red;
                }
                .ball-blue {
                    color: blue;
                    border: 1px blue solid;
                }
                .ball-green {
                    color: green;
                    border: 1px green solid;
                }
                .length-cell {
                    color: #fff;
                    background: #7f7f7f;
                    min-width: 22px;
                    min-height: 22px;
                    line-height: 22px;
                }
            }
        }
        .map {
            width: 60%;
            background: hotpink;
        }
    }

    .mark6-num {
        border-radius: 50%;
        color: #444;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: initial;
        white-space: normal;
        font-weight: bold;
        background-size: contain;
    }
    .mark6-num-small {
        border-radius: 50%;
        color: #444;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: initial;
        white-space: normal;
        font-weight: bold;
        background-size: contain;
        font-size: 12px;
    }

    .color-num-btn {
        height: 36px;
        width: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: none;
        white-space: normal;
        background-size: contain;
        color: #747164 !important;
    }

    .allcolor-betNum {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        margin-bottom: 5px;
        background-size: contain;
        color: #444;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .allcolor-samll {
        width: 25px;
        height: 25px;
        margin-right: 4px;
        margin-bottom: 4px;
        font-size: 13px;
    }
}
.second-nav {
    position: absolute;
    top: 8.6rem;
    left: 0;
    right: 0;
    width: 100%;
    height: 240px;
    .second-nav-black {
        width: 100vw;
        height: 40px;
    }
}
.mark6-num-box {
    padding: 6px;
    color: #fff;
    text-align: center !important;
    font-size: 15px;
    font-weight: 700;
    border-radius: 5px;
    line-height: 15px;
    margin-right: 4px !important;
    background: linear-gradient(
        to left,
        rgba(66, 101, 241, 0.7),
        rgba(100, 150, 251, 0.7)
    ) !important;
}
.loading-box {
    background: #6666663d;
    height: 100%;
    position: absolute;
    z-index: 9999999;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-loading {
        color: #5b7ffb;
    }
}
.van-nav-bar__title {
    max-width: 75%;
}
</style>
