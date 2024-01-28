<template>
    <div id="vnsouth">
        <van-nav-bar
            left-arrow
            border
            class="pk10_nav"
            @click-left="goLotteryLobby"
        >
            <template #title>
                <div class="white-text" @click="onShowpays">
                    <span class="mr-1">{{ currentTitle }}</span>
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
                    get-container="#vnsouth"
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
                        <van-count-down :time="time" @finish="onFinish" v-slot="{ days, hours, minutes, seconds }">
                            <div
                                class="flex justify-content-center align-items-center main-text"
                            >
                                <template v-if="lottery !== 'sfync'">
                                  <div class="block">
                                    {{ +(days) === 0 && +(hours) &lt; 10 ? '0'+ hours : hours + days * 24 }}
                                  </div>
                                  <span class="separator">:</span>
                                </template>
                                <div class="block">
                                    <span
                                        v-if="Number(minutes) < 10"
                                        >0</span
                                    >{{ minutes }}
                                </div>
                                <span class="separator">:</span>
                                <div class="block">
                                    <span
                                        v-if="Number(seconds) < 10"
                                        >0</span
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
                                    <template
                                        v-for="(r, i) in getArry(
                                            extremeResult && extremeResult.num
                                        )"
                                    >
                                        <div class="vnsouth-num-box" :key="i">
                                            {{ r }}
                                        </div>
                                    </template>
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
                                <template v-if="['sfync'].includes(lottery)">{{getDataText(resultItem && resultItem.openDate) }}</template>{{
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
                            <template
                                v-for="(r, i) in getArry(
                                    resultItem && resultItem.num
                                )"
                            >
                                <div
                                    :key="i"
                                    class="flex align-items-center justify-content-center flex-wrap"
                                >
                                    <div class="vnsouth-num-box">
                                        {{ $$t("_400") }}<br />{{
                                            r.split("+")[0]
                                        }}
                                    </div>
                                    <div class="vnsouth-num-box">
                                        {{ $$t("_401") }}<br />{{
                                            r.split("+")[1]
                                        }}
                                    </div>
                                    <van-icon
                                        color="#5b7ffb"
                                        name="exchange"
                                        size="30"
                                        @click.stop="
                                            isShowCurResultTable =
                                                !isShowCurResultTable
                                        "
                                    />
                                </div>
                                <div
                                    v-if="isShowCurResultTable"
                                    :key="`res-${i}`"
                                    class="vnsouth-current-wrap"
                                >
                                    <div
                                        v-for="(
                                            item, resultIndex
                                        ) in getVNSouthResult(r)"
                                        :key="`result-${resultIndex}`"
                                        class="flex"
                                    >
                                        <div
                                            class="flex align-items-center justify-content-center vnsouth-current-name"
                                        >
                                            {{ item.awards }}
                                        </div>
                                        <div class="vnsouth-current-result">
                                            {{ item.result }}
                                        </div>
                                    </div>
                                </div>
                            </template>
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
                <div v-if="playType_items.length > 0" :style="isShowCurResultTable ? 'padding-top: 4.5rem' : ''">
                    <template v-for="(item, i) in playType_items">
                        <div :key="`${i}_${item.playType}`">
                            <!-- 按钮名称取自接口 -->
                            <div
                                v-if="
                                    simpleBetNumDataKey.indexOf(curDataKey) > -1
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

                                <div
                                    v-if="playType_items.length === 1"
                                    class="subtitle-3 ball-tle"
                                >
                                    {{ item.playTypeName }}
                                </div>

                                <div
                                    v-if="playType_items.length === 1"
                                    class="pr-3"
                                >
                                    <div class="mt-3 text-center pl-4">
                                        <van-row gutter="6">
                                            <template
                                                v-for="(
                                                    bet, index
                                                ) in item.lotteryBetContent"
                                            >
                                                <van-col
                                                    span="12"
                                                    :key="index"
                                                    class="mb-3"
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
                                </div>
                                <van-collapse
                                    v-model="collapseActiveName"
                                    v-else
                                >
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
                                                            :style="bet.betContentName.length >= 20 ? 'font-size: 12px;' : ''"
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

                            <!-- 有快捷选项的 -->
                            <div v-else class="text-left">
                                <div class="tool-pl mb-1 px-3 caption">
                                    {{ $t("betDetails.odds") }}:
                                    <span class="main-text">{{
                                        item.lotteryBetContent[0].odds
                                    }}</span>
                                    <!-- 赔率多项 -->
                                    <span
                                        v-if="
                                            customOddsText(
                                                item.lotteryBetContent[0].odds
                                            )
                                        "
                                        class="main-text"
                                    >
                                        {{
                                            customOddsText(
                                                item.lotteryBetContent[0].odds
                                            )
                                        }}</span
                                    >
                                </div>
                                <br />

                                <!-- 说明 -->
                                <div
                                    class="tool-pl mb-1 px-3 caption text-grey"
                                    @click="showWF = true"
                                >
                                    <van-icon
                                        name="question-o"
                                        size="12"
                                        class="mr-1"
                                    />{{ $$t("wfsm") }}
                                </div>

                                <div
                                    v-for="(p, index) in curTypeList.ruleList"
                                    :key="index"
                                >
                                    <!-- 控制按钮 -->
                                    <div
                                        class="flex align-items-center space-between"
                                    >
                                        <!-- 旗子 -->
                                        <div class="subtitle-3 ball-tle">
                                            {{
                                                p.name
                                                    ? p.name
                                                    : item.playTypeName
                                            }}
                                        </div>

                                        <div
                                            v-if="!p.special"
                                            class="ball-tool"
                                        >
                                            <span
                                                :style="{
                                                    padding:
                                                        culture === 'zh-CN'
                                                            ? '0 8px'
                                                            : '0 2px',
                                                }"
                                                v-for="(btn, i) in singleBtns"
                                                :key="i"
                                                @click="doOperate(i, index)"
                                                >{{ btn.text }}</span
                                            >
                                        </div>
                                        <div
                                            v-if="p.special === 2"
                                            class="ball-tool"
                                        >
                                            <span
                                                :style="{
                                                    padding:
                                                        culture === 'zh-CN'
                                                            ? '0 8px'
                                                            : '0 2px',
                                                }"
                                                v-for="(btn, i) in singleBtns2"
                                                :key="i"
                                                @click="doOperate2(i, index)"
                                                >{{ btn.text }}</span
                                            >
                                        </div>
                                    </div>

                                    <div class="mt-3 text-center px-4">
                                        <van-row gutter="6">
                                            <template
                                                v-for="(bet, index3) in betList"
                                            >
                                                <van-col
                                                    span="4"
                                                    :key="index3"
                                                    class="mb-3 van-col_20"
                                                >
                                                    <div
                                                        class="ball-num"
                                                        :class="{
                                                            current_active:
                                                                curSelected[
                                                                    index
                                                                ].includes(bet),
                                                        }"
                                                        @click="
                                                            selectBet(
                                                                bet,
                                                                index
                                                            )
                                                        "
                                                    >
                                                        {{ bet }}
                                                    </div>
                                                </van-col>
                                            </template>
                                        </van-row>
                                    </div>
                                </div>
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

        <!-- 路子图对话框 -->
		<van-dialog v-model="showResultsRoadData" :title="$$t('_509')" confirmButtonColor="rgb(91, 127, 251)"
			className="vnsouth-roadData-dialog">
			<div class="subtitle-1 text-center">
					<div v-if="results_road_data.length" class="roadmap mt-2"
					:key="`vnsouth-${roadmapContro}`">
						<div class="title-bar">
							<span v-for="(item,i) in results_roadmap_vnsouth_bar" :key="i">
								<span :class="roadmapstyle(item)">
									{{!Number(item) && Number(item) !== 0 ? $t(`lottery.${item}`) : item }}</span>{{ results_roadmap_vnsouth[item].toString().replace(/\s*/g,"")}}
							</span>
						</div>
						<div class="flex">
							<div class="contro">
								<!-- 點數 -->
								<div @click="roadmapContro = 2" :class="['contro-btn',{'current_active':roadmapContro===2}]">{{ culture === 'vi-VN' ? 'Điểm' : (culture === 'zh-CN' ? '点数' : 'Points') }}</div>
								<!-- 大小 -->
								<div @click="roadmapContro = 3" :class="['contro-btn',{'current_active':roadmapContro===3}]">{{$t('lottery._4')}}</div>
								<!-- 单双 -->
								<div @click="roadmapContro = 4" :class="['contro-btn',{'current_active':roadmapContro===4}]">{{$t('lottery._5')}}</div>
							</div>
							<vue-touch-scroll type="horizontal" hide-scrollbar>
							<div class="balls">
								<div v-for="(big,bi) in results_roadmap_vnsouth.balls" :key="bi" class="flex">
									<div v-if="roadmapContro === 1" class="flex flex-d-column">
										<div v-for="(small,si) in big" :key="si" class="cell">
											<div v-if="small" class="vnsouth-ball">
												{{small}}
											</div>
										</div>
									</div>
									<div v-else class="flex flex-d-column">
										<div v-for="(small,si) in big" :key="si" class="cell">
											<div v-if="small && si === 0" class="length-cell">
												{{big.filter(t => t).length}}
											</div>
											<div v-if="small && roadmapContro === 2" class="ball" :class="[{
												'ball-red': bi % 2 === 0,
												'ball-blue': bi % 2 !== 0
												}]">
												{{transeName(small,roadmapContro)}}
											</div>
											<div v-if="small && roadmapContro === 3" class="ball" :class="[{
												'ball-red': +(small) < 3,
												'ball-blue': +(small) > 2
												}]">
												{{transeName(small,roadmapContro)}}
											</div>
											<div v-if="small && roadmapContro === 4" class="ball" :class="[{
												'ball-red': +(small) % 2 === 0,
												'ball-blue': +(small) % 2 !== 0,
												}]">
												{{transeName(small,roadmapContro)}}
											</div>
										</div>
									</div>
								</div>
							</div>
							</vue-touch-scroll>
						</div>
					</div>
			</div>
		</van-dialog>

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
                        v-if="curDataKey === '番摊'"
                        class="radius-2 mr-2"
                        color="linear-gradient(to right, #4684FF, #81AAFF)"
                        style="height: 32px !important; padding: 0 0.2rem !important; font-size: 0.3rem !important;"
                        @click="showResultsRoadData = true"
                    >
                        {{ $t('lottery._9') }}
                    </van-button>
                    <van-button
                        class="radius-2"
                        color="linear-gradient(to right, #4684FF, #81AAFF)"
                        :disabled="isSeal || isDisabled || !pass"
                        style="height: 32px !important"
                        @click="onBetPk10"
                    >
                    {{$$t_lottery("prebet")}}
                    </van-button>
                </div>
            </div>
        </div>

        <!-- 彩种选单 -->
        <van-popup
            v-model="showpays"
            position="top"
            :style="{ height: '100%' }"
            get-container="#vnsouth"
            :overlay="false"
            class="pays_popup"
        >
            <van-tabs
                v-model="activeTab"
                title-active-color="rgb(64, 128, 255)"
                title-inactive-color="rgb(153, 153, 153)"
                color="rgb(64, 128, 255)"
            >
                <van-tab :title="$$t('tab_allBet')" name="allBet">
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
                                    <!-- empty box -->
                                    <div
                                        style="width: 100px; height: 100px"
                                    ></div>
                                </van-row>
                                <div class="second-nav-black" />
                            </scroller>
                        </div>
                    </div>
                </van-tab>

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
            get-container="#vnsouth"
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
            get-container="#vnsouth"
            :style="{ height: '70%' }"
            @closed="showTableList = []"
        >
            <div class="py-2 subtitle-1">
                {{ $$t("announcement") }}
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
                                >
                                    <template v-for="(ru, i) in getArry(r.num)">
                                        <div
                                            :key="i"
                                            class="flex align-items-center justify-content-center flex-wrap"
                                        >
                                            <div class="vnsouth-num-box">
                                                {{ $$t("_400") }}
                                                {{ ru.split("+")[0] }}
                                            </div>
                                            <div class="vnsouth-num-box">
                                                {{ $$t("_401") }}
                                                {{ ru.split("+")[1] }}
                                            </div>
                                            <van-icon
                                                color="#5b7ffb"
                                                name="exchange"
                                                size="24"
                                                @click.stop="
                                                    showVNSouthTable(r.id)
                                                "
                                            />
                                        </div>
                                        <div
                                            v-if="showTableList.includes(r.id)"
                                            :key="`res-${i}`"
                                            class="vnsouth-current-wrap mt-2"
                                            style="margin: 0"
                                        >
                                            <div
                                                v-for="(
                                                    item, resultIndex
                                                ) in getVNSouthResult(ru)"
                                                :key="`result-${resultIndex}`"
                                                class="flex"
                                            >
                                                <div
                                                    class="flex align-items-center justify-content-center vnsouth-current-name"
                                                >
                                                    {{ item.awards }}
                                                </div>
                                                <div
                                                    class="vnsouth-current-result"
                                                >
                                                    {{ item.result }}
                                                </div>
                                            </div>
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
    name: "VNsouth",

    mixins: [sessionContext],

	components: { AllLotteryPop },

    data() {
        return {
			showAllLotteryPop: false,
            noMoreSignal: false, //近期开奖是否停止滚动加载
            results_road_data: [],
            showResultsRoadData: false,
            roadmapContro: 2,
            results_roadmap_vnsouth_bar: ['_19','_20', '_21', '_22', '_23'],
            isShowCurResultTable: false,
            pass: false, // 是否通过验证
            betItems: "",
            curDataKey: "双面",
            betList: [],
            curSelected: [],
            showTableList: [],
            simpleBetNumDataKey: [
                "双面",
                "定位胆",
                "龙虎和",
                "对位龙虎和",
                "番摊",
                "棋牌",
                "龙虎和",
            ],
            navSecondTitle: {
                包选: "_441",
                串选: "_442",
                一星: "_443",
                二星: "_444",
                三星: "_445",
                四星: "_446",
                自选不中: "_447",
            },
            specialHandleType: ["任选二组选", "任选三组三", "任选三组六"],
            transBetList2: [
                { name: this.$$t("_394"), val: "万" },
                { name: this.$$t("_395"), val: "千" },
                { name: this.$$t("_396"), val: "百" },
                { name: this.$$t("_397"), val: "十" },
                { name: this.$$t("_398"), val: "个" },
            ],
            curSpecialSelected: [],
            useWrap: {
                twoSameNums: [1],
                threeSameNums: [1],
                包选: [0, 4, 6, 8],
                二星: [0, 3],
                三星: [0, 5],
                四星: [0, 2],
            },
            navIndexMap: {
                包选: {
                    0: 0,
                    4: 1,
                    6: 2,
                    8: 3,
                },
                二星: {
                    0: 0,
                    3: 1,
                },
                三星: {
                    0: 0,
                    5: 1,
                },
                四星: {
                    0: 0,
                    2: 1,
                },
            },
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
                包前二直选: {
                    basicMoney: 18,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                    ],
                    playText: this.$$t("_449"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_450")}：12****，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                包后二直选: {
                    basicMoney: 18,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_452"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_450")}：****12，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                包前二直选不定位: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                    ],
                    playText: this.$$t("_453"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_450")}：12****，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                包后二直选不定位: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_454"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_450")}：****12，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                包前三直选: {
                    basicMoney: 17,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                    ],
                    playText: this.$$t("_455"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3</p><p>${this.$$t("_450")}：123***，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                包后三直选: {
                    basicMoney: 17,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_455"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3</p><p>${this.$$t("_450")}：***123，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                包前四直选: {
                    basicMoney: 16,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                    ],
                    playText: this.$$t("_457"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3,4</p><p>${this.$$t("_450")}：1234**，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                包后四直选: {
                    basicMoney: 16,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_458"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3,4</p><p>${this.$$t("_450")}：**1234，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                全包前二直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                    ],
                    playText: this.$$t("_459"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_450")}：12****，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                全包后二直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_460"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_450")}：12****，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特奖定位胆: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 1,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_461"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：-,-,3,-,-,-</p><p>${this.$$t(
                        "_450"
                    )}：**3***，${this.$$t("_451")}。</p>`,
                },
                一奖定位胆: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 1,
                    ruleList: [
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_462"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：-,-,3,-,-/p><p>${this.$$t("_471")}：**3**，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特奖前二直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                    ],
                    playText: this.$$t("_463"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_450")}：12****，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                一奖前二直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                    ],
                    playText: this.$$t("_464"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_471")}：12***，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特八前二直选: {
                    basicMoney: 2,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                    ],
                    playText: this.$$t("_465"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_450")}：12****，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特奖后二直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_466"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_450")}：****12，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                一奖后二直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_467"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_471")}：***12，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特八后二直选: {
                    basicMoney: 2,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_468"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_450")}：****12，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                八奖二星直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_469"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_470")}：12，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特奖前三直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                    ],
                    playText: this.$$t("_472"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3</p><p>${this.$$t("_450")}：123***，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                一奖前三直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                    ],
                    playText: this.$$t("_473"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3</p><p>${this.$$t("_471")}：123**，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特七前三直选: {
                    basicMoney: 2,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                    ],
                    playText: this.$$t("_474"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3</p><p>${this.$$t("_450")}：123***，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特奖前三组选三: {
                    basicMoney: 2,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_476"), minLength: 2 }],
                    playText: this.$$t("_475"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_450")}：121***，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特奖前三组选六: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_477"), minLength: 3 }],
                    playText: this.$$t("_478"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3</p><p>${this.$$t("_450")}：312***，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特奖后三直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_479"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3</p><p>${this.$$t("_450")}：***123，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                一奖后三直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_480"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3</p><p>${this.$$t("_471")}：**123，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特七后三直选: {
                    basicMoney: 2,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_481"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3</p><p>${this.$$t("_450")}：***123，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特奖后三组选三: {
                    basicMoney: 2,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_482"), minLength: 2 }],
                    playText: this.$$t("_483"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2</p><p>${this.$$t("_450")}：***121，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特奖后三组选六: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_484"), minLength: 3 }],
                    playText: this.$$t("_485"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3</p><p>${this.$$t("_450")}：***312，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                七奖三星直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_486"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3</p><p>${this.$$t("_487")}：123，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特奖前四直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                    ],
                    playText: this.$$t("_488"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3,4</p><p>${this.$$t("_450")}：1234**，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                一奖前四直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_448"), minLength: 1 },
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                    ],
                    playText: this.$$t("_489"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3,4</p><p>${this.$$t("_471")}：1234*，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                特奖后四直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_490"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3,4</p><p>${this.$$t("_450")}：**1234，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                一奖后四直选: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_491"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3,4</p><p>${this.$$t("_471")}：*1234，${this.$$t(
                        "_451"
                    )}。</p>`,
                },

                龙虎和: {
                    playText: this.$$t("_492"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_493"
                    )}</p><p>${this.$$t("_450")}：*98***，${this.$$t(
                        "_451"
                    )}。</p>`,
                },

                二串直选: {
                    basicMoney: 1,
                    any: 0,
                    min: 2,
                    ruleList: [{ name: "", minLength: 2, special: 2 }],
                    playText: this.$$t("_494"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：11,23</p><p>${this.$$t(
                        "_495"
                    )}：**23-**11-****，${this.$$t("_451")}。</p>`,
                },
                三串直选: {
                    basicMoney: 1,
                    any: 0,
                    min: 3,
                    ruleList: [{ name: "", minLength: 3, special: 2 }],
                    playText: this.$$t("_496"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：11,12,21</p><p>${this.$$t(
                        "_495"
                    )}：**11-**21-**12，${this.$$t("_451")}。</p>`,
                },
                四串直选: {
                    basicMoney: 1,
                    any: 0,
                    min: 4,
                    ruleList: [{ name: "", minLength: 4, special: 2 }],
                    playText: this.$$t("_497"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：11&12&21&45</p><p>${this.$$t(
                        "_498"
                    )}：*****-***21-***11-*****-***12-*****-***45，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                后二4不中: {
                    basicMoney: 1,
                    any: 0,
                    min: 4,
                    ruleList: [{ name: "", minLength: 4, special: 2 }],
                    playText: this.$$t("_499"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：12,23,34,45</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_500"
                    )}12,23,34,45，${this.$$t("_451")}。</p>`,
                },
                后二6不中: {
                    basicMoney: 1,
                    any: 0,
                    min: 6,
                    ruleList: [{ name: "", minLength: 6, special: 2 }],
                    playText: this.$$t("_501"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：12,23,34,45,56,67</p><p>${this.$$t(
                        "openNumber"
                    )}：${this.$$t("_500")}12,23,34,45,56,67，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                后二8不中: {
                    basicMoney: 1,
                    any: 0,
                    min: 8,
                    ruleList: [{ name: "", minLength: 8, special: 2 }],
                    playText: this.$$t("_502"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：12,23,34,45,56,67,78,89</p><p>${this.$$t(
                        "openNumber"
                    )}：${this.$$t("_500")}12,23,34,45,56,67,78,89，${this.$$t(
                        "_451"
                    )}。</p>`,
                },
                后二10不中: {
                    basicMoney: 1,
                    any: 0,
                    min: 10,
                    ruleList: [{ name: "", minLength: 10, special: 2 }],
                    playText: this.$$t("_503"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：01,12,23,34,45,56,67,78,89,90</p><p>${this.$$t(
                        "openNumber"
                    )}：${this.$$t(
                        "_500"
                    )}01,12,23,34,45,56,67,78,89,90，${this.$$t("_451")}。</p>`,
                },
            },
            betNumber: 0,
            collapseActiveName: [],
            dtItems: ["num1LH", "num2LH", "num3LH", "num4LH", "num5LH"], // pk10 结果显示 龙虎五位
            firstSelecteFromTab: "",
            rulesListsLoading: false,
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
        };
    },

    created() {
        this.onGetLotteryTp();
        this.initCurSelected();
        this.initBetList();
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
        this.initCurSelected();
        this.initBetList();
        this.showPopover = false;
        this.onGetCurrentDates();
        this.onGetRecentResultItem();
        this.initMemberData();
    },

    computed: {
        curTypeList() {
            return this.typeList[this.curDataKey];
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
            if (this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1) {
                return false;
            } else {
                return true;
            }
        },

        // betNumber() {
        //   let e = this.current_lottery;
        //   if (e === "second") {
        //     let len1 = this.betContents.filter((e) => e.code === "second1").length;
        //     let len2 = this.betContents.filter((e) => e.code === "second2").length;
        //     return len1 * len2;
        //   } else if (e === "third") {
        //     let len1 = this.betContents.filter((e) => e.code === "third1").length;
        //     let len2 = this.betContents.filter((e) => e.code === "third2").length;
        //     let len3 = this.betContents.filter((e) => e.code === "third3").length;
        //     return len1 * len2 * len3;
        //   } else if (this.curParentType === "K3" && e !== "sum" && e !== "all") {
        //     return this.betNumber_k3;
        //   } else {
        //     return this.betContents.length;
        //   }
        // },

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

        VNSouthResult() {
            try {
                const result = this.result.num.split("+");
                return [
                    {
                        awards: this.$$t("_402"),
                        result: result[2],
                    },
                    {
                        awards: this.$$t("_403"),
                        result: result[3].replaceAll("|", "-"),
                    },
                    {
                        awards: this.$$t("_404"),
                        result: result[4].replaceAll("|", "-"),
                    },
                    {
                        awards: this.$$t("_405"),
                        result: result[5],
                    },
                    {
                        awards: this.$$t("_406"),
                        result: result[6].replaceAll("|", "-"),
                    },
                    {
                        awards: this.$$t("_407"),
                        result: result[7],
                    },
                    {
                        awards: this.$$t("_408"),
                        result: result[8],
                    },
                ];
            } catch (error) {
                return [];
            }
        },

        results_roadmap_vnsouth() {
            let pre = this.results_road_data
            let balls = pre.map(t => (t.num.split('+')[7].split('').reduce((pre, cur) => +pre + +cur)) % 4 === 0 ? 4 : t.num.split('+')[7].split('').reduce((pre, cur) => +pre + +cur) % 4).reverse()
            const dataLen = balls.length + 1
            let sliceBalls = []
            let curIndex = 0
            // balls 以5分段
            switch (this.roadmapContro) {
                case 3:
                    // 大小
                    for(let i=curIndex; i<balls.length; i++){
                        if (curIndex > 50) return
                        let pre = []
                        // big
                        if (Number(balls[i])>2){
                            for(let i2=curIndex; i2<dataLen; i2++){
                                if (Number(balls[i2])>2) {
                                    pre.push(balls[i2])
                                    curIndex = i2
                                }
                                else {
                                    curIndex = i2
                                    break
                                    }
                            }
                        } else {
                            // small
                            for(let i4=curIndex; i4<dataLen; i4++){
                                if (Number(balls[i4])<3) {
                                    pre.push(balls[i4])
                                    curIndex = i4
                                    }
                                else {
                                    curIndex = i4
                                    break
                                    }
                            }
                        }

                        // if (pre.length && pre.length < 5) {
                        //     for(let i = 0; i < +(8 - pre.length); i++){
                        //         pre.push(null)
                        //     }
                        //     pre = pre.slice(0,5)
                        // }
                        sliceBalls.push(pre)
                    }
                    break;
                case 4:	
                    // 单双
                    for(let i=curIndex; i<balls.length; i++){
                        if (curIndex > 50) return
                        let pre = []
                        if (Number(balls[i])%2 === 0){
                            for(let i2=curIndex; i2<dataLen; i2++){
                                if (Number(balls[i2])%2 === 0) {
                                    pre.push(balls[i2])
                                    curIndex = i2
                                    }
                                else {
                                    curIndex = i2
                                    break
                                    }
                            }
                        } else {
                            for(let i3=curIndex; i3<dataLen; i3++){
                                if (Number(balls[i3])%2 === 1) {
                                    pre.push(balls[i3])
                                    curIndex = i3
                                    }
                                else {
                                    curIndex = i3
                                    break
                                    }
                            }
                        }
                        sliceBalls.push(pre)
                    }
                    break;
                default:
               
                    for(let i=curIndex; i<balls.length; i++){
                        if (curIndex > 50) return
                        let pre = []
                        if (Number(balls[i])%2 === 0){
                            for(let i2=curIndex; i2<dataLen; i2++){
                                if (Number(balls[i2])%2 === 0) {
                                    pre.push(balls[i2])
                                    curIndex = i2
                                    }
                                else {
                                    curIndex = i2
                                    break
                                    }
                            }
                        } else {
                            for(let i3=curIndex; i3<dataLen; i3++){
                                if (Number(balls[i3])%2 === 1) {
                                    pre.push(balls[i3])
                                    curIndex = i3
                                    }
                                else {
                                    curIndex = i3
                                    break
                                    }
                            }
                        }
                        sliceBalls.push(pre)
                    }
                    break;
            }
            let sliceBallsResault = sliceBalls.filter(t => t.length)
            // add empty cell
            const longestLength = this.findLongest(sliceBallsResault)
            for(let i = 0; i < sliceBallsResault.length; i++){
                if (sliceBallsResault[i].length < longestLength){
                    let pre_empty = new Array(longestLength-sliceBallsResault[i].length).fill(null);
                    sliceBallsResault[i] = sliceBallsResault[i].concat(pre_empty)
                }
            }

            const last_empty = new Array(this.roadmapContro === 1 ? longestLength:longestLength+1).fill(null)
            let empty = []

            for (let i =0; i < 3; i++) empty.push(last_empty)
            let map = {
                balls: sliceBallsResault.concat(empty),
                _19: balls.length, // total
                _20: balls.filter(t => Number(t) > 2).length, // big
                _21: balls.filter(t => Number(t) < 3).length, // small
                _22: balls.filter(t => Number(t) %2 !== 0).length, // single
                _23: balls.filter(t => Number(t) %2 === 0).length, // double
            }
            return map
        },
    },

    watch: {
        curDataKey() {
            this.pass = false;
        },

        curTypeList() {
            this.initCurSelected();
            this.initBetList();
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
                this.onGetRecentRoadResults();
            }
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
        initBetList() {
            if (
                [
                    "二串直选",
                    "三串直选",
                    "四串直选",
                    "后二4不中",
                    "后二6不中",
                    "后二8不中",
                    "后二10不中",
                ].includes(this.curDataKey)
            ) {
                const newBetList = [];
                for (let index = 0; index < 100; index++) {
                    newBetList.push(`${index < 10 ? `0${index}` : index}`);
                }
                this.betList = newBetList;
                return;
            }
            this.betList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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
                    // this.$dialog
                    //     .alert({
                    //         title: this.$t("common.point"),
                    //         message: this.$$t("seal_d"),
                    //     })
                    //     .then(() => {
                    //         // on close
                    //     });
                    // this.procError(error)
                });
        },

        onGetRecentResults() {
            if (!this.lottery || this.rulesLists.length === 50 || this.noMoreSignal) {
                this.$refs.results_scroller.finishInfinite(true)
                return
            }
            let nums = this.rulesLists.length
            if (nums < 50) nums += 10
            this.rulesListsLoading = true;
            this.$get(`/api/Lottery/GetRecentResults?type=${this.lottery}&num=${nums}`)
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    this.rulesLists = data.data
                    if (data.data.length < 10) {
                        this.noMoreSignal = true
                        this.$refs.results_scroller.finishInfinite(true)
                        return
                    }
                })
                .catch((error) => {
                    this.procError(error);
                })
               .finally(async() => {
                    this.rulesListsLoading = false;
                    if (this.$refs.results_scroller) {
                        await this.$refs.results_scroller.finishInfinite(true)
                    }
                });
        },

        onGetRecentRoadResults() {
            if (!this.lottery) return;
            this.rulesListsLoading = true;
            this.$get(
                `/api/Lottery/GetRecentResults?type=${this.lottery}&num=50`
            )
                .then((resp) => {
                    return this.checkResp(resp, (r) => r.data.success === true);
                })
                .then((data) => {
                    this.results_road_data = data.data
                })
                .catch((error) => {
                    this.procError(error);
                })
                .finally(() => {
                    this.rulesListsLoading = false;
                    if (this.$refs.results_scroller)
                        this.$refs.results_scroller.finishPullToRefresh();
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
                            this.onGetRecentRoadResults();
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
                    nextLeveTitle: this.nextLevels.length ? this.nextLeveTitle : "",
                    activeTab: this.activeTab,
                });
            } else {
                // 旧的选择
                if (
                    checkLastLevels.activeTab === "allBet"
                ) {
                    this.firstSelecteFromTab = checkLastLevels.nextLeveTitle || checkLastLevels.value;
                    this.nextLeveTitle = checkLastLevels.nextLeveTitle;
                    this.currentTitle = this.nextLeveTitle ? `${title}-${this.nextLeveTitle}-${checkLastLevels.value}` : `${title}-${checkLastLevels.value}`;
                } else {
                    this.firstSelecteFromTab = checkLastLevels.nextLeveTitle || checkLastLevels.value;
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
                    this.showpays = false;
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
                                        this.showpays = false;
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
                                this.showpays = false;
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
                        this.showpays = false;

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
            // this.loading_status = false
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
                    let checkLastLevels = JSON.parse(sessionStorage.getItem(this.curParentType + '_second_title')) || "";
                    if (checkLastLevels) {
                        const curData = this.allBetItems.find((item) => item.value === checkLastLevels.nextLeveTitle)
                        if (curData && curData.dataKey) {
                            this.onChangeGames(curData)
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
                        // 官方玩法：默认为【包选】-【包二】-【包前二直选】
                        e = this.allBetItems.filter(t => t.dataKey === '包选')[0];
                    }
                    if (this.activeTab === 'baseBet') {
                        // 传统玩法：默认为【定位胆】
                        e = this.baseBetItems.filter(t => t.dataKey === '定位胆')[0]
                    }

                    this.firstSelecteFromTab = e.dataKey; // 彩种选单-父选项

                    // 阶层二选单
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
                this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1
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
                              playType: this.playType_items[0].playType,
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
                // 送出前个别处理
                const specialHandleType = [
                    "任选二组选",
                    "任选三组三",
                    "任选三组六",
                ];
                if (specialHandleType.indexOf(b[0].playType) > -1) {
                    // special: 字串替换
                    const prev = this.curSpecialSelected.join();
                    let lastString = b[0].betContent.substr(
                        b[0].betContent.indexOf("|")
                    );
                    p.betContent[0].betContent = prev + lastString;
                }
                this.$sessionSet("js-Date", p);
                this.$sessionSet("current_lottery", typeCode);
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
            this.onGetRecentRoadResults();
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
                }

                this.onClear();
            }
            // }
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
            if (this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1) return;
            let len = this.curTypeList && this.curTypeList.ruleList.length;

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

        selectBet(curValue, betItemIndex, specialVal) {
            // specialVal: 特殊选项
            // api 回传的投注像在此初始化
            if (this.curSelected.length < this.playType_items.length) {
                if (this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1) {
                    let len = this.playType_items.length;
                    const newSelected = [];
                    for (let i = 0; i < len; i++) {
                        newSelected.push([]);
                    }
                    this.curSelected = newSelected;
                }
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

            this.betItems = betItems;
            // 注数
            this.betNumber =
                this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1
                    ? timesNum
                    : timesNum * this.curTypeList.basicMoney;
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

            const transNum = (value) => {
                let newValue = 1;
                for (let i = value; i > 0; --i) {
                    newValue = newValue * i;
                }

                return newValue;
            };

            return Math.round(
                transNum(num) / transNum(num - minLength) / transNum(minLength)
            );
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
                } else if (Number(code) === 2) {
                    this.redirectRouter("betLists");
                } else if (code === "dashboard") {
                    this.redirectRouter("/app/dashboard");
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
                sessionStorage.removeItem(this.curParentType + '_second_title');
                sessionStorage.removeItem("gameCode_item");
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
                sessionStorage.removeItem(this.curParentType + '_second_title');
                sessionStorage.removeItem("rules_code");
                sessionStorage.removeItem("gameCode_item");
                this.activeTab = "allBet";
                this.redirectRouter("/app/dashboard");
            } else if (c.code === "deposit") {
                this.redirectRouter("/app/recharge");
            } else if (Number(c.code) === 3) {
                this.redirectRouter("lottery/rule");
            }
        },

        doOperate(index, betItemIndex) {
            switch (index) {
                case 0:
                    this.$set(this.curSelected, betItemIndex, this.betList);
                    break;
                case 1:
                    this.$set(
                        this.curSelected,
                        betItemIndex,
                        this.betList.filter((num) => num > 4)
                    );
                    break;
                case 2:
                    this.$set(
                        this.curSelected,
                        betItemIndex,
                        this.betList.filter((num) => num < 5)
                    );
                    break;
                case 3:
                    this.$set(
                        this.curSelected,
                        betItemIndex,
                        this.betList.filter((num) => num % 2 !== 0)
                    );
                    break;
                case 4:
                    this.$set(
                        this.curSelected,
                        betItemIndex,
                        this.betList.filter((num) => num % 2 === 0)
                    );
                    break;
                case 5:
                    this.$set(this.curSelected, betItemIndex, []);
                    break;
            }

            if (
                this.curDataKey === "万仟和尾数" ||
                this.curDataKey === "拾个和尾数"
            ) {
                this.setBetContent("", this.curDataKey, this.curSelected[0]);
                return;
            }
            this.handleSent();
        },

        doOperate2(index, betItemIndex) {
            switch (index + 1) {
                case 0:
                    this.$set(this.curSelected, betItemIndex, this.betList);
                    break;
                case 1:
                    this.$set(
                        this.curSelected,
                        betItemIndex,
                        this.betList.filter((num) => +num > 49)
                    );
                    break;
                case 2:
                    this.$set(
                        this.curSelected,
                        betItemIndex,
                        this.betList.filter((num) => +num < 50)
                    );
                    break;
                case 3:
                    this.$set(
                        this.curSelected,
                        betItemIndex,
                        this.betList.filter((num) => num % 2 !== 0)
                    );
                    break;
                case 4:
                    this.$set(
                        this.curSelected,
                        betItemIndex,
                        this.betList.filter((num) => num % 2 === 0)
                    );
                    break;
                case 5:
                    this.$set(this.curSelected, betItemIndex, []);
                    break;
            }

            if (
                this.curDataKey === "万仟和尾数" ||
                this.curDataKey === "拾个和尾数"
            ) {
                this.setBetContent("", this.curDataKey, this.curSelected[0]);
                return;
            }
            this.handleSent();
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
            this.initBetList();
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

        getVNSoutSpecailResult(VNSouthresult) {
            try {
                const result = VNSouthresult.split("+");

                return `${this.$$t("_400")} ${result[0]}${this.$$t("_401")} ${
                    result[1]
                }`;
            } catch (error) {
                return;
            }
        },

        getVNSouthResult(VNSouthresult) {
            try {
                const result = VNSouthresult.split("+");
                return [
                    {
                        awards: this.$$t("_402"),
                        result: result[2],
                    },
                    {
                        awards: this.$$t("_403"),
                        result: result[3].replaceAll("|", "-"),
                    },
                    {
                        awards: this.$$t("_404"),
                        result: result[4].replaceAll("|", "-"),
                    },
                    {
                        awards: this.$$t("_405"),
                        result: result[5],
                    },
                    {
                        awards: this.$$t("_406"),
                        result: result[6].replaceAll("|", "-"),
                    },
                    {
                        awards: this.$$t("_407"),
                        result: result[7],
                    },
                    {
                        awards: this.$$t("_408"),
                        result: result[8],
                    },
                ];
            } catch (error) {
                return [];
            }
        },

        showVNSouthTable(id) {
          if (this.showTableList.includes(id)) {
            this.showTableList = this.showTableList.filter((item) => item !== id);
            return;
          }

          this.showTableList.push(id);
        },

        roadmapstyle(item){
            if (!Number(item) && Number(item) !== 0) return item
            else return 'number-'+item
        },

        transeName(val,type){
            switch (type) {
                case 2:
                    return val
                case 4:
                    // 单双
                    if (val %2 === 0) return this.culture === 'vi-VN' ? 'C' : (this.culture === 'zh-CN' ? '双' : 'E')
                    else return this.culture === 'vi-VN' ? 'L' : (this.culture === 'zh-CN' ? '单' : 'O')
            
                default:
                    if (+(val) > 2 ) {
                        return this.culture === 'vi-VN' ? 'T' : (this.culture === 'zh-CN' ? '大' : 'B')
                    } else return this.culture === 'vi-VN' ? 'X' : (this.culture === 'zh-CN' ? '小' : 'S')

            }
        },

        findLongest(arra){
            let max_length = arra[0].length;
            for (let i = 1; i < arra.length; i++) {
                let maxi = arra[i].length;
                if (maxi > max_length) {
                    max_length = maxi;
                }
            }
            return max_length;
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
#vnsouth {
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

    .vnsouth-current-wrap {
        margin: 0.15rem;
        border-left: 1px solid rgba(117, 162, 251, 0.3);
        border-top: 1px solid rgba(117, 162, 251, 0.3);
    }

    .vnsouth-current-name {
        color: #5b7ffb;
        padding: 0.1rem;
        width: 2.5rem;
        border-right: 1px solid rgba(117, 162, 251, 0.3);
        border-bottom: 1px solid rgba(117, 162, 251, 0.3);
    }

    .vnsouth-current-result {
        color: #5b7ffb;
        padding: 0.1rem;
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(117, 162, 251, 0.3);
        border-bottom: 1px solid rgba(117, 162, 251, 0.3);
    }

    .vnsouth-roadData-dialog {
        min-height: 60vh;
        .van-dialog__footer{
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
            color: #FFD700;
            text-shadow: 0 1px 3px #222;
        }
        ._21,._23 {
            color: #ff0000;
        }
        ._20,._22 {
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
        .number-0,.number-1,.number-2,.number-3,.number-4 {
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
            .cell{
                border-right: 1px solid #999;
                border-left: 1px solid #999;
                border-bottom: 1px solid #999;
                min-width: 22px;
                min-height: 22px;
                // display: flex;
                // align-items: center;
                // justify-content: center;
                letter-spacing: -2px;
                .vnsouth-ball {
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
                    text-indent: -3px
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
    .set-chip {
        background: #4c4c4c;
        padding: 5px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 9px;
        max-width: 70px;
        min-height: 17px;
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
.vnsouth-num-box {
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
