<template>
  <div id="pk10">
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
          class="text-left"
          get-container="#pk10"
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

    <div class="dateInfo background-white py-2">
      <van-row type="flex" justify="space-between" align="center">
        <van-col span="7" class="divider_col" v-if="lottery && lottery.slice(0,2) === 'js'">
          <div>
            <span>{{ $$t_lottery("grandTotal") }}：</span><br/>
            <span class="red-text caption-bold"
              >{{ currencySymbol }}{{ parseFloat(extremeMoney.toFixed(4))
              }}{{ currencyDenomination }}</span
            >
          </div>
          <div class="mt-1">
            <span>{{ $$t_lottery("win") }}：</span><br/>
            <span class="red-text caption-bold"
              >{{ currencySymbol }}{{ parseFloat(currentWin.toFixed(4))
              }}{{ currencyDenomination }}</span
            >
          </div>
        </van-col>

        <van-col span="7" class="divider_col" v-else>
          <div class="caption text-grey_1 px-1">
            {{ datesMaker(currentDates && currentDates.dates, isSeal) }}
            <br/><span v-if="isSeal">{{ $$t("seal_t") }}</span>
          </div>

          <div class="mt-2">
            <van-count-down :time="time" @finish="onFinish">
              <template #default="timeData">
                <div
                  class="
                    flex
                    justify-content-center
                    align-items-center
                    main-text
                  "
                >
                  <div class="block">0{{ timeData.minutes }}</div>
                  <span class="separator">:</span>
                  <div class="block">
                    <span v-if="Number(timeData.seconds) < 10">0</span
                    >{{ timeData.seconds }}
                  </div>
                </div>
              </template>
            </van-count-down>
          </div>
        </van-col>

        <van-col span="17" @click="showResults = true">
          <div v-if="lottery && lottery.slice(0,2) === 'js'">
            <van-row type="flex" justify="space-between" align="center">
              <van-col span="24">
                <div>
                  {{ $$t_lottery("remaining") }}
                  <span class="main-text caption-bold">{{ betTotal }}</span>
                  {{ $$t_lottery("time") }}
                </div>

                <div
                  class="
                    result-ball
                    flex
                    align-items-center
                    justify-content-center
                    mt-2
                    pl-1
                  "
                  v-if="isOpen"
                >
                  <template
                    v-for="(r, i) in getArry(
                      extremeResult && extremeResult.num
                    )"
                  >
                    <div v-if="curParentType === 'PK10'"
                     :class="`b-pk10-${r}`" 
                     :key="i">{{ r }}
                     </div>
                    <van-image
                      v-if="curParentType === 'K3'"
                      :key="i"
                      :src="`/images/lottery/sicBo/${r}.png`"
                      width="24"
                      height="24"
                      class="mr-2"
                    />
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

          <div v-else>
            <div class="caption text-grey_1">
              <span class="mr-1">{{
                resultItem && resultItem.lotteryName
              }}</span>
              <span
                >{{ getDataText(resultItem && resultItem.openDate) }}{{
                  (oldOpen.isOPen)
                    ? ((resultItem && resultItem.dates) || '')
                    : oldOpen && oldOpen.dates
                }}</span
              >
            </div>

            <div
              class="
                result-ball
                flex
                align-items-center
                justify-content-center
                mt-2
              "
              v-if="oldOpen.isOPen"
            >
              <template v-for="(r, i) in getArry(resultItem && resultItem.num)">
                <div
                  v-if="curParentType === 'PK10'"
                  :class="`b-pk10-${r}`"
                  :key="i"
                >
                  {{ r }}
                </div>
                <van-image
                  v-if="curParentType === 'K3'"
                  :key="i"
                  :src="`/images/lottery/sicBo/${r}.png`"
                  width="24"
                  height="24"
                  class="mr-2"
                />
              </template>
            </div>

            <div
              class="
                flex
                align-items-center
                justify-content-center
                mt-2
                oldOpen
              "
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
                      <div class="block">0{{ timeData.minutes }}</div>
                      <div class="block">:</div>
                      <div class="block">
                        <span v-if="Number(timeData.seconds) < 10">0</span
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
    <div class="bet_center">
      <scroller>
        <div v-if="playType_items.length && current_lottery !== 'fanTan'">
          <template v-for="(item,i) in playType_items">
            <div :key="`${i}_${item.playType}`">
              <div
                class="text-left pr-4"
                v-if="item.playType === '1stAnd2ndSum' || item.playType === '1stAnd2ndSumDxds'"
              >
                <!-- 玩法说明 -->
                <div
                  class="tool-pl mb-1 px-3 caption text-grey"
                  @click="showWF = true"
                  v-if="activeTab === 'allBet' && item.playType !== '1stAnd2ndSumDxds'"
                >
                  <van-icon name="question-o" size="12" class="mr-1" />{{
                    $$t("wfsm")
                  }}
                </div>
                <br />

                <div class="subtitle-3 pl-4 ball-tle">
                  {{ item.playTypeName }}
                </div>
                <div class="mt-3 text-center pl-4">
                  <van-row gutter="6">
                    <template v-for="(bet, index) in item.lotteryBetContent">
                      <div :key="index">
                        <van-col span="4" class="mb-3">
                          <div
                            class="ball-num"
                            :class="{
                              current_active: getActive(
                                bet.betContent,
                                item.playType
                              ),
                            }"
                            @click="setBetContent(bet.betContent, item.playType)"
                          >
                            {{ bet.betContentName }}
                          </div>
                          <div class="caption-bold mt-1 mb-1 main-text">
                            {{ bet.odds }}
                          </div>
                        </van-col>
                        <!-- 换行 -->
                        <div v-if="item.playType === '1stAnd2ndSumDxds' && index === 3" 
                        style="float: right; width: 100%;" />
                      </div>
                    </template>
                  </van-row>
                </div>
              </div>

              <div v-else-if="item.playType === 'first'" class="text-left">
                <div class="tool-pl mb-1 px-3 caption">
                  {{ $t("betDetails.odds") }}:
                  <span class="main-text">{{
                    item.lotteryBetContent[0].odds
                  }}</span>
                </div>
                <br />

                <div
                  class="tool-pl mb-1 px-3 caption text-grey"
                  @click="showWF = true"
                >
                  <van-icon name="question-o" size="12" class="mr-1" />{{
                    $$t("wfsm")
                  }}
                </div>

                <div class="flex align-items-center space-between">
                  <div class="subtitle-3 ball-tle">{{ $$t(`n_1`) }}</div>
                  <div class="ball-tool">
                    <span
                      :style="{
                        padding: culture === 'zh-CN' ? '0 8px' : '0 2px',
                      }"
                      v-for="btn in singleBtns"
                      :key="btn.code"
                      @click="singleBtnClick(btn, item.playType, 'first')"
                      >{{ btn.text }}</span
                    >
                  </div>
                </div>

                <div class="mt-3 text-center px-4">
                  <van-row gutter="6">
                    <template v-for="(bet, index) in 10">
                      <van-col span="4" :key="index" class="mb-3 van-col_20">
                        <div
                          class="ball-num"
                          :class="{
                            current_active: getActive(
                              bet,
                              item.playType,
                              'first'
                            ),
                          }"
                          @click="setBetContent(bet, item.playType, 'first')"
                        >
                          {{ Number(bet) }}
                        </div>
                      </van-col>
                    </template>
                  </van-row>
                </div>
              </div>

              <div
                v-else-if="item.playType === 'second'"
                class="text-left"
              >
                <div class="tool-pl mb-1 px-3 caption">
                  {{ $t("betDetails.odds") }}:
                  <span class="main-text">{{
                    item.lotteryBetContent[0].odds
                  }}</span>
                </div>
                <br />

                <div
                  class="tool-pl mb-1 px-3 caption text-grey"
                  @click="showWF = true"
                >
                  <van-icon name="question-o" size="12" class="mr-1" />{{
                    $$t("wfsm")
                  }}
                </div>

                <div v-for="(p, index) in seconds" :key="index">
                  <div class="flex align-items-center space-between">
                    <div class="subtitle-3 ball-tle">
                      {{ $$t(`n_${index + 1}`) }}
                    </div>
                    <div class="ball-tool">
                      <span
                        :style="{
                          padding: culture === 'zh-CN' ? '0 8px' : '0 2px',
                        }"
                        v-for="btn in singleBtns"
                        :key="btn.code"
                        @click="singleBtnClick(btn, item.playType, p.code)"
                        >{{ btn.text }}</span
                      >
                    </div>
                  </div>

                  <div class="mt-3 text-center px-4">
                    <van-row gutter="6">
                      <template v-for="(bet, index) in 10">
                        <van-col span="4" :key="index" class="mb-3 van-col_20">
                          <div
                            class="ball-num"
                            :class="{
                              current_active: getActive(
                                bet,
                                item.playType,
                                p.code
                              ),
                            }"
                            @click="setBetContent(bet, item.playType, p.code)"
                          >
                            {{ bet }}
                          </div>
                        </van-col>
                      </template>
                    </van-row>
                  </div>
                </div>
              </div>

              <div v-else-if="item.playType === 'third'" class="text-left">
                <div class="tool-pl mb-1 px-3 caption">
                  {{ $t("betDetails.odds") }}:
                  <span class="main-text">{{
                    item.lotteryBetContent[0].odds
                  }}</span>
                </div>
                <br />

                <div
                  class="tool-pl mb-1 px-3 caption text-grey"
                  @click="showWF = true"
                >
                  <van-icon name="question-o" size="12" class="mr-1" />{{
                    $$t("wfsm")
                  }}
                </div>

                <div v-for="(p, index) in thirds" :key="index">
                  <div class="flex align-items-center space-between">
                    <div class="subtitle-3 ball-tle">
                      {{ $$t(`n_${index + 1}`) }}
                    </div>
                    <div class="ball-tool">
                      <span
                        :style="{
                          padding: culture === 'zh-CN' ? '0 8px' : '0 2px',
                        }"
                        v-for="btn in singleBtns"
                        :key="btn.code"
                        @click="singleBtnClick(btn, item.playType, p.code)"
                        >{{ btn.text }}</span
                      >
                    </div>
                  </div>

                  <div class="mt-3 text-center px-4">
                    <van-row gutter="6">
                      <template v-for="(bet, index) in 10">
                        <van-col span="4" :key="index" class="mb-3 van-col_20">
                          <div
                            class="ball-num"
                            :class="{
                              current_active: getActive(
                                bet,
                                item.playType,
                                p.code
                              ),
                            }"
                            @click="setBetContent(bet, item.playType, p.code)"
                          >
                            {{ Number(bet) }}
                          </div>
                        </van-col>
                      </template>
                    </van-row>
                  </div>
                </div>
              </div>

              <div
                v-else-if="item.playType === 'position1to5'"
                class="text-left"
              >
                <div class="tool-pl mb-1 px-3 caption">
                  {{ $t("betDetails.odds") }}:
                  <span class="main-text">{{
                    item.lotteryBetContent[0].odds
                  }}</span>
                </div>
                <br />

                <div
                  class="tool-pl mb-1 px-3 caption text-grey"
                  @click="showWF = true"
                >
                  <van-icon name="question-o" size="12" class="mr-1" />{{
                    $$t("wfsm")
                  }}
                </div>

                <div v-for="(p, index) in position1to5s" :key="index">
                  <div class="flex align-items-center space-between">
                    <div class="subtitle-3 ball-tle">
                      {{ $$t(`n_${index + 1}`) }}
                    </div>
                    <div class="ball-tool">
                      <span
                        :style="{
                          padding: culture === 'zh-CN' ? '0 8px' : '0 2px',
                        }"
                        v-for="btn in singleBtns"
                        :key="btn.code"
                        @click="singleBtnClick(btn, item.playType, p.code)"
                        >{{ btn.text }}</span
                      >
                    </div>
                  </div>

                  <div class="mt-3 text-center px-4">
                    <van-row gutter="6">
                      <template v-for="(bet, index) in 10">
                        <van-col span="4" :key="index" class="mb-3 van-col_20">
                          <div
                            class="ball-num"
                            :class="{
                              current_active: getActive(
                                bet,
                                item.playType,
                                p.code
                              ),
                            }"
                            @click="setBetContent(bet, item.playType, p.code)"
                          >
                            {{ Number(bet) }}
                          </div>
                        </van-col>
                      </template>
                    </van-row>
                  </div>
                </div>
              </div>

              <div
                v-else-if="item.playType === 'position6to10'"
                class="text-left"
              >
                <div class="tool-pl mb-1 px-3 caption">
                  {{ $t("betDetails.odds") }}:
                  <span class="main-text">{{
                    item.lotteryBetContent[0].odds
                  }}</span>
                </div>
                <br />

                <div
                  class="tool-pl mb-1 px-3 caption text-grey"
                  @click="showWF = true"
                >
                  <van-icon name="question-o" size="12" class="mr-1" />{{
                    $$t("wfsm")
                  }}
                </div>

                <div v-for="(p, index) in position6to10s" :key="index">
                  <div class="flex align-items-center space-between">
                    <div class="subtitle-3 ball-tle">
                      {{ $$t(`n_${index + 6}`) }}
                    </div>
                    <div class="ball-tool">
                      <span
                        :style="{
                          padding: culture === 'zh-CN' ? '0 8px' : '0 2px',
                        }"
                        v-for="btn in singleBtns"
                        :key="btn.code"
                        @click="singleBtnClick(btn, item.playType, p.code)"
                        >{{ btn.text }}</span
                      >
                    </div>
                  </div>

                  <div class="mt-3 text-center px-4">
                    <van-row gutter="6">
                      <template v-for="(bet, index) in 10">
                        <van-col span="4" :key="index" class="mb-3 van-col_20">
                          <div
                            class="ball-num"
                            :class="{
                              current_active: getActive(
                                bet,
                                item.playType,
                                p.code
                              ),
                            }"
                            @click="setBetContent(bet, item.playType, p.code)"
                          >
                            {{ Number(bet) }}
                          </div>
                        </van-col>
                      </template>
                    </van-row>
                  </div>
                </div>
              </div>

              <div
                v-else-if="item.playType === 'position1to10'"
                class="text-left"
              >
                <div class="tool-pl mb-1 px-3 caption">
                  {{ $t("betDetails.odds") }}:
                  <span class="main-text">{{
                    item.lotteryBetContent[0].odds
                  }}</span>
                </div>
                <br />

                <div
                  class="tool-pl mb-1 px-3 caption text-grey"
                  @click="showWF = true"
                >
                  <van-icon name="question-o" size="12" class="mr-1" />{{
                    $$t("wfsm")
                  }}
                </div>

                <div v-for="(p, index) in position1to10s" :key="index">
                  <div class="flex align-items-center space-between">
                    <div class="subtitle-3 ball-tle">
                      {{ $$t(`n_${index + 1}`) }}
                    </div>
                    <div class="ball-tool">
                      <span
                        :style="{
                          padding: culture === 'zh-CN' ? '0 8px' : '0 2px',
                        }"
                        v-for="btn in singleBtns"
                        :key="btn.code"
                        @click="singleBtnClick(btn, item.playType, p.code)"
                        >{{ btn.text }}</span
                      >
                    </div>
                  </div>

                  <div class="mt-3 text-center px-4">
                    <van-row gutter="6">
                      <template v-for="(bet, index) in 10">
                        <van-col span="4" :key="index" class="mb-3 van-col_20">
                          <div
                            class="ball-num"
                            :class="{
                              current_active: getActive(
                                bet,
                                item.playType,
                                p.code
                              ),
                            }"
                            @click="setBetContent(bet, item.playType, p.code)"
                          >
                            {{ Number(bet) }}
                          </div>
                        </van-col>
                      </template>
                    </van-row>
                  </div>
                </div>
              </div>

              <div
                v-else-if="
                  item.playType === 'fiveElement1st' ||
                  item.playType === 'fiveElement2nd' ||
                  item.playType === 'fiveElement3rd'
                "
                class="text-left pr-4"
              >
                <div class="tool-pl mb-1 px-3 caption">
                  {{ $t("betDetails.odds") }}:
                  <span class="main-text">{{
                    item.lotteryBetContent[0].odds
                  }}</span>
                </div>
                <br />

                <div
                  class="tool-pl mb-1 px-3 caption text-grey"
                  @click="showWF = true"
                >
                  <van-icon name="question-o" size="12" class="mr-1" />{{
                    $$t("wfsm")
                  }}
                </div>
                <br />

                <div class="subtitle-3 ball-tle">{{ item.playTypeName }}</div>
                <div class="mt-3 text-center pl-4">
                  <van-row gutter="6">
                    <template v-for="(bet, index) in fiveElements">
                      <van-col span="6" :key="index" class="mb-3 van-col_20">
                        <div
                          class="ball-num"
                          :class="{
                            current_active: getActive(
                              bet.betContent,
                              item.playType,
                              item.playType
                            ),
                          }"
                          @click="
                            setBetContent(
                              bet.betContent,
                              item.playType,
                              item.playType
                            )
                          "
                        >
                          {{ bet.betContentName }}
                        </div>
                      </van-col>
                    </template>
                  </van-row>
                </div>
              </div>

              <div
                v-else-if="
                  ['niuniu'].includes(
                    current_lottery
                  )
                "
                class="text-left pr-4"
              >
                <div
                  class="tool-pl mb-1 px-3 caption text-grey"
                  @click="showWF = true"
                  v-if="
                    [
                      'position1stDxdslh',
                      'position6thDxds',
                      'niuniuEquales',
                    ].includes(item.playType)
                  "
                >
                  <van-icon name="question-o" size="12" class="mr-1" />{{
                    $$t("wfsm")
                  }}
                </div>
                <br />

                <div class="subtitle-3 ball-tle">{{ item.playTypeName }}</div>
                <div class="mt-3 text-center pl-4">
                  <van-row gutter="6">
                    <template v-for="(bet, index) in item.lotteryBetContent">
                      <van-col span="6" :key="index" class="mb-3 van-col_20">
                        <div
                          class="ball-num ball-square"
                          :class="{
                            current_active: getActive(
                              bet.betContent,
                              item.playType,
                              item.playType
                            ),
                          }"
                          @click="
                            setBetContent(
                              bet.betContent,
                              item.playType,
                              item.playType
                            )
                          "
                        >
                          {{ bet.betContentName }}
                        </div>
                        <div class="caption-bold mt-1 mb-1 main-text">
                          {{ bet.odds }}
                        </div>
                      </van-col>
                    </template>
                  </van-row>
                </div>
              </div>

              <K3Comp1
                v-else-if="curParentType === 'K3' && activeTab === 'allBet'"
                :playType="item"
                :betContents="betContents"
                :current_lottery="current_lottery"
                :activeTab="activeTab"
                @handleBetNumber="
                  ($event) => {
                    betNumber_k3 = $event;
                  }
                "
                @setBetContent="setBetContent"
                @hadleShowWF="showWF = true"
              />

              <div v-else :class="['text-left', {'pt-3' : i > 0}]">
                <div
                  class="tool-pl mb-1 px-3 caption text-grey"
                  @click="showWF = true"
                  v-if="activeTab === 'allBet' && i === 0"
                >
                  <van-icon name="question-o" size="12" class="mr-1" />{{
                    $$t("wfsm")
                  }}
                </div>
                <div v-if="playType_items.length === 1" class="pr-3">
                  <div class="subtitle-3 ball-tle">{{ item.playTypeName }}</div>
                  <div class="mt-3 text-center pl-4">
                      <van-row gutter="6">
                        <template v-for="(bet, index) in item.lotteryBetContent">
                          <van-col
                            span="6"
                            :key="index"
                            class="mb-3"
                            :class="{ 'van-col_20': current_lottery === 'pickNum' }"
                          >
                            <div
                              class="ball-num ball-square"
                              :class="{
                                current_active: getActive(
                                  bet.betContent,
                                  item.playType
                                ),
                              }"
                              @click="setBetContent(bet.betContent, item.playType)"
                            >
                              <span
                                :class="`b-pk10-${bet.betContent}`"
                                class="b-pk10-btn"
                                v-if="current_lottery === 'pickNum'"
                                >{{ bet.betContentName }}</span
                              >
                              <span v-else>{{ bet.betContentName }}</span>
                            </div>
                            <div class="caption-bold mt-1 mb-1 main-text">
                              {{ bet.odds }}
                            </div>
                          </van-col>
                        </template>
                      </van-row>
                    </div>
                </div>
                <van-collapse v-model="collapseActiveName" v-else>
                  <van-collapse-item :name="i">
                    <template #title>
                      <div class="subtitle-3 ball-tle">{{ item.playTypeName }}</div>
                    </template>
                    <div class="text-center pl-4">
                      <van-row gutter="6">
                        <template v-for="(bet, index) in item.lotteryBetContent">
                          <van-col
                            span="6"
                            :key="index"
                            class="mb-1"
                            :class="{ 'van-col_20': current_lottery === 'pickNum' }"
                          >
                            <div
                              class="ball-num ball-square"
                              :class="{
                                current_active: getActive(
                                  bet.betContent,
                                  item.playType
                                ),
                              }"
                              @click="setBetContent(bet.betContent, item.playType)"
                            >
                              <span
                                :class="`b-pk10-${bet.betContent}`"
                                class="b-pk10-btn"
                                v-if="current_lottery === 'pickNum'"
                                >{{ bet.betContentName }}</span
                              >
                              <span v-else>{{ bet.betContentName }}</span>
                            </div>
                            <div class="caption-bold mt-1 mb-1 main-text">
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

        <FanTan 
          v-else-if="playType_items.length && current_lottery == 'fanTan'"
          :playType="playType_items"
          :setBetContent="setBetContent"
          :money="`${money}`"
          :betContents="betContents"
        />

        <div v-else>
          <van-empty :description="$$t('description_play')" class="text-center">
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
        v-if="Number(money) && betNumber"
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
          <div class="text-left pl-2" style="border-left: 0.5px solid #d8d8d8">
            <div class="caption">{{ $$t_lottery("balance") }}</div>
            <div class="main-text caption-bold">
              {{ currencySymbol }}{{ memberData && memberData.balance
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
            :disabled="isSeal || isDisabled"
            style="height: 32px !important"
            @click="onBetPk10"
          >
            {{$$t_lottery("prebet")}}
          </van-button>
        </div>
      </div>
    </div>

    <!-- 彩種選單	 -->
    <van-popup
      v-model="showpays"
      position="top"
      :style="{ height: '100%' }"
      get-container="#pk10"
      :overlay="false"
      class="pays_popup"
    >
      <van-tabs
        v-model="activeTab"
        title-active-color="rgb(64, 128, 255)"
        title-inactive-color="rgb(153, 153, 153)"
        color="rgb(64, 128, 255)"
      >
      <!-- 官方玩法 -->
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
                  :class="{ tab_active: firstSelecteFromTab === item.dataKey }"
                >
                  <p class="van-ellipsis">{{ item.value }}</p>
                </div>
              </van-col>
            </van-row>
          </div>

          <div class="px-3 mt-3" v-if="nextLevels.length > 0">
            <div class="subtitle-1 text-left">
              {{ nextLeveTitle }}
            </div>

            <van-row gutter="4" class="mt-2">
              <van-col
                span="8"
                v-for="(next, index) in nextLevels"
                :key="index"
                @click="pre_onGetPlayType(next)"
              >
                <div
                  class="game_block"
                  :class="{
                    tab_active:
                      activeTab === 'allBet' &&
                      current_lottery === next.dataKey,
                  }"
                >
                  <p class="van-ellipsis">{{ next.value }}</p>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-tab>

        <!-- 传统玩法 -->
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

        <van-tab v-if="curParentType === 'PK10' && culture === 'zh-CN' && memberInfo.currencyCode === 'CNY'" 
        :title="'简洁玩法'" name="simpleBet">
          <div class="px-3 mt-3 simpleBet-style">
            <div class="simple-title">
              <div class="text">球数玩法</div>
            </div>
            <van-row gutter="8">
              <van-col span="24" style="text-align: left;" class="mb-1">
                更快更便捷→
                <div class="btn" @click="simpleBetChangeGame(null,null,'号码快投')">号码快投</div>
              </van-col>
              <van-col
                span="24"
                v-for="(item, index) in simpleBallsData"
                :key="index"
              >
                <div class="flex">  
                  <p>第{{item}}球玩法></p>
                  <div class="btn" @click="simpleBetChangeGame(item,index,'号码')">号码</div>
                  <div class="btn" @click="simpleBetChangeGame(item,index,'单双')">单双</div>
                  <div class="btn" @click="simpleBetChangeGame(item,index,'大小')">大小</div>
                  <div v-if="index < 5"
                    class="btn" @click="simpleBetChangeGame(item,index,'龙虎')">
                    龙虎
                  </div>
                </div>
              </van-col>
            </van-row>
            <div class="simple-title mt-3">
              <div class="text">冠亚军玩法</div>
            </div>
            <van-row gutter="8">
              <van-col span="12" @click="simpleBetChangeGame(null, null, '冠亚单双')"><div class="btn ma-1">冠亚单双</div></van-col>
              <van-col span="12" @click="simpleBetChangeGame(null, null, '冠亚大小')"><div class="btn ma-1">冠亚大小</div></van-col>
              <van-col span="12" @click="simpleBetChangeGame(null, null, '冠亚和值')"><div class="btn ma-1">冠亚和值</div></van-col>
              <van-col span="12" @click="simpleBetChangeGame(null, null, '冠亚形态')"><div class="btn ma-1">冠亚形态</div></van-col>
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
          <span class="main-text caption-bold">{{ consecutiveNumber }}</span>
          {{ $$t_lottery("time") }}
        </div>
        <div class="mt-2">
          {{ $$t_lottery("grandTotal") }}:
          <span class="main-text caption-bold"
            >{{ currencySymbol }}{{ parseFloat(extremeMoney.toFixed(4))
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
      get-container="#pk10"
      :style="{ height: '70%' }"
    >
      <div class="py-2 px-4">
        <van-row type="flex" align="center">
          <van-col span="4" class="text-left">
            <van-icon name="cross" size="18" @click="showPopup = false" />
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
              <van-tab :title="$$t_lottery('tab_1')" name="0"></van-tab>
              <van-tab :title="$$t_lottery('tab_2')" name="3"></van-tab>
            </van-tabs>
          </van-col>
          <van-col span="4" class="text-right">
            <div class="caption main-text van-ellipsis" @click="goBetLists">
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
                class="
                  top
                  flex
                  space-between
                  align-items-center
                  van-hairline--top-bottom
                "
              >
                <div class="caption">{{ item.createTime }}</div>
                <div class="caption text-grey">
                  {{ datesMaker(item.dates) }}
                </div>
              </div>

              <div class="py-2 radius-1">
                <van-row type="flex" justify="space-between" align="center">
                  <van-col span="22">
                    <van-row type="flex" justify="space-between">
                      <van-col span="12" class="text-left caption-bold"
                        >{{ item.lotteryName }}
                      </van-col>
                      <van-col span="12">
                        <div
                          class="caption-bold text-right"
                          :class="{
                            status_0: Number(item.status) === 0,
                            status_1: Number(item.status) === 1,
                          }"
                        >
                          {{ item.statusDesc }}
                        </div>
                      </van-col>
                    </van-row>

                    <van-row type="flex" justify="space-between">
                      <van-col span="20">
                        <div class="van-ellipsis text-left">
                          {{ item.betContentName }}[{{ item.playTypeName }}]
                        </div>
                      </van-col>
                      <van-col span="4"> </van-col>
                    </van-row>

                    <van-row type="flex" justify="space-between">
                      <van-col span="12" class="text-left">
                        <div class="caption bet_money mt-2">
                          {{ $t("lottery.betMoney") }}：{{ item.currencySymbol
                          }}{{ item.money }}{{ item.currencyDenomination }}
                        </div>
                      </van-col>

                      <van-col span="12">
                        <div
                          class="caption-bold mt-2 text-right"
                          :class="{ status_1: Number(item.status) === 1 }"
                          v-if="Number(item.status) === 1"
                        >
                          {{
                            item.currencySymbol +
                            item.winMoney +
                            item.currencyDenomination
                          }}
                        </div>
                        <div class="mt-2 text-right" v-else>- -</div>
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
      get-container="#pk10"
      :style="{ height: '70%' }"
    >
      <div class="py-2 subtitle-1">
        {{ $$t("announcement") }}
      </div>
      <div class="rulesLists">
        <scroller
          :on-infinite="() => $_throttle(onGetRecentResults())"
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
                <div class="flex align-items-center space-between">
                  <div class="subtitle-1">
                    {{ datesMaker(r.dates) }}
                  </div>
                  <div class="caption text-grey_1">
                    {{ r.createTime }}
                  </div>
                </div>
                <div class="result-ball flex align-items-center mt-1">
                  <template v-for="(ru, i) in getArry(r.num)">
                    <div
                      v-if="curParentType === 'PK10'"
                      :class="`b-pk10-${ru}`"
                      :key="i"
                    >
                      {{ ru }}
                    </div>
                    <van-image
                      v-if="curParentType === 'K3'"
                      :key="i"
                      :src="`/images/lottery/sicBo/${ru}.png`"
                      width="24"
                      height="24"
                      class="mr-1"
                    />
                  </template>
                </div>
                <div
                  v-if="curParentType === 'PK10'"
                  class="flex align-items-center mt-1 caption text-grey_1"
                >
                  <div class="mr-1">
                    <span class="tag-white">{{ r.gySum }}</span>
                  </div>  
                  <div class="mr-1">
                    <span class="tag-blue" v-if="r.gySum <= 11">{{
                      r.gydx
                    }}</span>
                    <span class="tag-yellow" v-else>{{ r.gydx }}</span>
                  </div>
                  <div class="mr-1">
                    <span class="tag-blue" v-if="r.gySum % 2 === 0">{{
                      r.gyds
                    }}</span>
                    <span class="tag-yellow" v-else>{{ r.gyds }}</span>
                  </div>
                  <!-- PK10 龙虎显示五个 -->
                  <div style="display: flex;">
                    <div v-for="(item,i) in dtItems" :key="i"
                    class="tag-blue mr-1"
                    :style="{'background-color': handle_dt_color(r.num, i)}">
                      {{ r[item] }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="curParentType === 'K3'"
                  class="flex align-items-center mt-1 caption text-grey_1"
                >
                  <div class="mr-1">
                    <span class="tag-white">{{ r.gySum }}</span>
                  </div>
                  <div class="mr-1">
                    <span class="tag-blue" v-if="r.gySum < 11">{{
                      r.numDx
                    }}</span>
                    <span class="tag-yellow" v-else>{{ r.numDx }}</span>
                  </div>
                  <div>
                    <span class="tag-blue" v-if="r.gySum % 2 === 0">{{
                      r.numDs
                    }}</span>
                    <span class="tag-yellow" v-else>{{ r.numDs }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </scroller>
      </div>
    </van-popup>

    <van-dialog v-model="showWF" :title="$$t('wfsm')">
      <div class="px-3 text-left">
        <div class="caption py-2 van-hairline--bottom">
          <div class="subtitle-1">{{ $$t("ts_title") }}</div>
          <div class="caption pl-3" v-if="current_lottery === '1stAnd2ndSum'">
            {{ $$t("ts_1") }}。
          </div>
          <div class="caption pl-3" v-else-if="current_lottery === 'first'">
            {{ $$t("ts_2") }}
          </div>
          <div class="caption pl-3" v-else-if="current_lottery === 'second'">
            {{ $$t("ts_3") }}
          </div>
          <div class="caption pl-3" v-else-if="current_lottery === 'third'">
            {{ $$t("ts_4") }}
          </div>
          <div
            class="caption pl-3"
            v-else-if="
              ['position1to10', 'position1to5', 'position6to10'].includes(
                current_lottery
              )
            "
          >
            {{ $$t("ts_5") }}
          </div>
          <div
            class="caption pl-3"
            v-else-if="
              ['champion', 'firstRunnerUp', 'secondRunnerUp'].includes(
                current_lottery
              )
            "
          >
            {{ $$t("ts_6") }}
          </div>

          <div
            class="caption pl-3"
            v-else-if="['dxds1to5', 'dxds6to10'].includes(current_lottery)"
          >
            {{ $$t("ts_7") }}
          </div>

          <div
            class="caption pl-3"
            v-else-if="['dragontiger1to5','dragontigerPK'].includes(current_lottery)"
          >
            {{ $$t("ts_8") }}
          </div>

          <div
            class="caption pl-3"
            v-else-if="['niuniu'].includes(current_lottery)"
          >
            {{ $$t("ts_9") }}
          </div>

          <div
            class="caption pl-3"
            v-else-if="curParentType === 'K3'"
            v-html="$$t_k3(k3sm[0])"
          />
        </div>

        <div class="caption py-2 van-hairline--bottom">
          <div class="subtitle-1">{{ $$t("sm_title") }}</div>
          <div class="caption pl-3" v-if="current_lottery === '1stAnd2ndSum'">
            {{ $$t("sm_1") }}。
          </div>
          <div class="caption pl-3" v-else-if="current_lottery === 'first'">
            {{ $$t("sm_2") }}
          </div>
          <div class="caption pl-3" v-else-if="current_lottery === 'second'">
            {{ $$t("sm_3") }}
          </div>
          <div class="caption pl-3" v-else-if="current_lottery === 'third'">
            {{ $$t("sm_4") }}
          </div>
          <div
            class="caption pl-3"
            v-else-if="
              ['position1to10', 'position1to5', 'position6to10'].includes(
                current_lottery
              )
            "
          >
            {{ $$t("sm_5") }}
          </div>
          <div
            class="caption pl-3"
            v-else-if="
              ['champion', 'firstRunnerUp', 'secondRunnerUp'].includes(
                current_lottery
              )
            "
          >
            {{ $$t("sm_6") }}
          </div>

          <div
            class="caption pl-3"
            v-else-if="['dxds1to5', 'dxds6to10'].includes(current_lottery)"
          >
            {{ $$t("sm_7") }}
          </div>

          <div
            class="caption pl-3"
            v-else-if="['dragontiger1to5','dragontigerPK'].includes(current_lottery)"
          >
            {{ $$t("sm_8") }}
          </div>

          <div
            class="caption pl-3"
            v-else-if="['niuniu'].includes(current_lottery)"
            v-html="$$t('sm_9')"
          ></div>

          <div
            class="caption pl-3"
            v-else-if="curParentType === 'K3'"
            v-html="$$t_k3(k3sm[1])"
          />
        </div>

        <div class="caption py-2 van-hairline--bottom">
          <div class="subtitle-1">{{ $$t("fl_title") }}</div>
          <div
            class="caption pl-3"
            v-if="current_lottery === '1stAnd2ndSum'"
            v-html="$$t('fl_1')"
          ></div>
          <div
            class="caption pl-3"
            v-else-if="current_lottery === 'first'"
            v-html="$$t('fl_2')"
          ></div>
          <div
            class="caption pl-3"
            v-else-if="current_lottery === 'second'"
            v-html="$$t('fl_3')"
          ></div>
          <div
            class="caption pl-3"
            v-else-if="current_lottery === 'third'"
            v-html="$$t('fl_4')"
          ></div>
          <div
            class="caption pl-3"
            v-else-if="
              ['position1to10', 'position1to5', 'position6to10'].includes(
                current_lottery
              )
            "
          >
            {{ $$t("fl_5") }}
          </div>
          <div
            class="caption pl-3"
            v-else-if="
              ['champion', 'firstRunnerUp', 'secondRunnerUp'].includes(
                current_lottery
              )
            "
          >
            {{ $$t("fl_6") }}
          </div>

          <div
            class="caption pl-3"
            v-else-if="['dxds1to5', 'dxds6to10'].includes(current_lottery)"
          >
            {{ $$t("fl_7") }}
          </div>

          <div
            class="caption pl-3"
            v-else-if="['dragontiger1to5','dragontigerPK'].includes(current_lottery)"
          >
            {{ $$t("fl_8") }}
          </div>

          <div
            class="caption pl-3"
            v-else-if="['niuniu'].includes(current_lottery)"
          >
            {{ $$t("fl_9") }}
          </div>

          <div
            class="caption pl-3"
            v-else-if="curParentType === 'K3'"
            v-html="$$t_k3(k3sm[2])"
          />
        </div>
      </div>
    </van-dialog>

    <!-- 极速下注中 -->
		<div v-show="isShowStop">
			<div class="van-toast van-toast--middle van-toast--success" style="z-index: 6;">
				<i class="van-icon van-icon-success van-toast__icon" />
				<div class="van-toast__text">{{$t('lottery._14')}}</div>
			</div>
		</div>

    <AllLotteryPop 
      :showAllLotteryPop="showAllLotteryPop" 
      @closeAllLotteryPop="showAllLotteryPop = false"
    />
  </div>
</template>

<script>
import sessionContext from "@/mixins/sessionContext";
import K3Comp1 from "./comps/K3Comp1";
import FanTan from "./comps/fanTan";
import AllLotteryPop from "./comps/AllLotteryPop";

export default {
  name: "PK10",

  mixins: [sessionContext],

  components: { K3Comp1, FanTan, AllLotteryPop },

  data() {
    return {
      showAllLotteryPop: false,
      collapseActiveName: [],
      dtItems: ['num1LH', 'num2LH', 'num3LH', 'num4LH', 'num5LH'], // pk10 结果显示 龙虎五位
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
      activeTab: JSON.parse(sessionStorage.getItem(this.curParentType + '_second_title')) ? JSON.parse(sessionStorage.getItem(this.curParentType + '_second_title')).activeTab : "allBet",
      nextLevels: [],
      isAllBet: false,
      money: 3,
      tab: "0",
      seconds: [
        {
          text: "一",
          code: "second1",
        },
        {
          text: "二",
          code: "second2",
        },
      ],
      thirds: [
        {
          text: "一",
          code: "third1",
        },
        {
          text: "二",
          code: "third2",
        },
        {
          text: "三",
          code: "third3",
        },
      ],
      position1to10s: [
        {
          text: "一",
          code: "position1",
        },
        {
          text: "二",
          code: "position2",
        },
        {
          text: "三",
          code: "position3",
        },
        {
          text: "四",
          code: "position4",
        },
        {
          text: "五",
          code: "position5",
        },
        {
          text: "六",
          code: "position6",
        },
        {
          text: "七",
          code: "position7",
        },
        {
          text: "八",
          code: "position8",
        },
        {
          text: "九",
          code: "position9",
        },
        {
          text: "十",
          code: "position10",
        },
      ],
      position1to5s: [
        {
          text: "一",
          code: "position1",
        },
        {
          text: "二",
          code: "position2",
        },
        {
          text: "三",
          code: "position3",
        },
        {
          text: "四",
          code: "position4",
        },
        {
          text: "五",
          code: "position5",
        },
      ],
      position6to10s: [
        {
          text: "六",
          code: "position6",
        },
        {
          text: "七",
          code: "position7",
        },
        {
          text: "八",
          code: "position8",
        },
        {
          text: "九",
          code: "position9",
        },
        {
          text: "十",
          code: "position10",
        },
      ],
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
      get lottery(){
        return sessionStorage.getItem("gameCode_item") || "";
      },
      betNumber_k3: 0,
      simpleBallsData: ['一','二','三','四','五','六','七','八','九','十']
    };
  },

  created() {
    this.onGetLotteryTp();
  },

  activated() {
    this.showPopup = false;
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
    this.showPopover = false;
    this.onGetCurrentDates();
    this.onGetRecentResultItem();
    this.initMemberData();
  },

  watch: {
    // activeTab(v) {
    // let d = []
    // let dataKey = 'position'
    // if (v === 'allBet') {
    // 	dataKey = 'position'
    // 	d = this.allBetItems
    // } else {
    // 	dataKey = 'doubleSide'
    // 	d = this.baseBetItems
    // }

    // let e = d.filter(e => e.dataKey === dataKey)[0]
    // let title = this.activeTab === 'allBet' ? this.$$t('tab_allBet') : this.$$t('tab_baseBet')
    // if (e.nextLevel.length > 0) {
    // 	let n = e.nextLevel[0]
    // 	this.nextLevels = e.nextLevel
    // 	this.nextLeveTitle = e.value
    // 	this.current_lottery = n.dataKey
    // 	this.currentTitle = `${title}-${e.value}-${n.value}`
    // 	if (this.isStop) this.tabGetType(e.nextLevel[0])
    // 	this.isReq = true
    // } else {
    // 	this.currentTitle = title + '-' + e.value
    // 	this.current_lottery = e.dataKey
    // 	if (this.isStop) this.tabGetType(e)
    // 	this.isReq = true
    // }
    // },

    tab() {
      this.onGetDropBillRecord();
    },

    showPopup(v) {
      if (v) this.onGetDropBillRecord();
    },

    showResults(v) {
      if (v) this.onGetRecentResults();
    },
  },

  computed: {
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

    isMake() {
      let e = this.current_lottery;
      if (
        [
          "first",
          "second",
          "third",
          "position1to5",
          "position6to10",
          "position1to10",
          "champion",
          "firstRunnerUp",
          "secondRunnerUp",
        ].includes(e)
      ) {
        return true;
      } else if (this.curParentType === "K3" && e !== "sum") {
        return true;
      } else {
        return false;
      }
    },

    betNumber() {
      let e = this.current_lottery;
      if (e === "second") {
        let len1 = this.betContents.filter((e) => e.code === "second1").length;
        let len2 = this.betContents.filter((e) => e.code === "second2").length;
        return len1 * len2;
      } else if (e === "third") {
        let len1 = this.betContents.filter((e) => e.code === "third1").length;
        let len2 = this.betContents.filter((e) => e.code === "third2").length;
        let len3 = this.betContents.filter((e) => e.code === "third3").length;
        return len1 * len2 * len3;
      } else if (this.curParentType === "K3" && e !== "sum" && e !== "all") {
        return this.betNumber_k3;
      } else {
        return this.betContents.length;
      }
    },

    betMoney() {
      let e = this.current_lottery;
      if (e === "niuniu") {
        let niuniuDouble = this.betContents.filter(
          (e) => e.playType === "niuniuDouble"
        ).length;
        let niuniuEquales = this.betContents.filter(
          (e) => e.playType === "niuniuEquales"
        ).length;
        return (
          niuniuEquales * Number(this.money) +
          niuniuDouble * 5 * Number(this.money)
        );
      } else {
        return this.betNumber * Number(this.money);
      }
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

    k3sm() {
      let pre;
      switch (this.current_lottery) {
        case "twoSameNums_standard":
          pre = ["_4", "_5", "_6"];
          break;
        case "twoSameNums_any":
          pre = ["_7", "_8", "_9"];
          break;
        case "twoDiffNums_standard":
          pre = ["_10", "_11", "_12"];
          break;
        case "twoDiffNums_danTuo":
          pre = ["_13", "_14", "_15"];
          break;
        case "threeContinuousNums_any":
          pre = ["_16", "_17", "_18"];
          break;
        case "threeSameNums_choose1":
          pre = ["_19", "_20", "_21"];
          break;
        case "threeSameNums_any":
          pre = ["_22", "_23", "_24"];
          break;
        case "threeDiffNums_standard":
          pre = ["_25", "_26", "_27"];
          break;
        default:
          pre = ["_1", "_2", "_3"];
          break;
      }
      return pre;
    },
  },

  methods: {
    handle_dt_color(nums, index){
      // '#5691d7' 藍
      // '#ff9726' 橘
      let pre = []
      const a1 = nums.split(',').map(Number)
      const a2 = nums.split(',').map(Number).reverse()
      for (let i = 0 ; i < 5 ; i ++){
        if (a1[i] > a2[i]) pre.push('#ff9726')
        if (a1[i] < a2[i]) pre.push('#5691d7')
      }
      return pre[index]
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
        .catch((error) => {
          this.time = 0;
          this.isSeal = true;
          this.currentDates = null;
          this.oldOpen = {
            isOPen: true,
            dates: 0,
            time: 0,
          };
          // this.$dialog
          //   .alert({
          //     title: this.$t("common.point"),
          //     message: this.$$t("seal_d"),
          //   })
          //   .then(() => {
          //     // on close
          //   });
          // this.procError(error)
        });
    },

    onGetRecentResults() {
      if (!this.lottery || this.rulesLists.length === 50) {
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
        })
        .catch((error) => {
          this.procError(error);
        })
        .finally(async() => {
          this.rulesListsLoading = false;
          if (this.$refs.results_scroller)
            await this.$refs.results_scroller.finishInfinite(false)
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
            if (!this.oldOpen.dates || Number(r.dates) === Number(this.oldOpen.dates)) {
              this.resultItem = r;
              this.oldOpen.isOPen = true;
              this.oldOpen.time = 10000;
              this.onGetDropBillRecord();
            } else {
              this.timeOutDates = setTimeout(() => {
                this.oldOpen.isOPen = false;
                this.onGetCurrentDates()
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

    // 在官方或传统玩法内切换模式专用
    pre_onGetPlayType(next) {
      sessionStorage.removeItem('changeGameFromSimple');
      this.onGetPlayType(next, true);
    },

    onGetPlayType(e, newSelect) {
      const dataFromSimple = this.$sessionGet("changeGameFromSimple");
      if (dataFromSimple) {
        this.activeTab = dataFromSimple.activeTab
        e = dataFromSimple
      }
      
      this.betNumber_k3 = 0;
      let u = "";
      let t = e.dataKey || e;

      let checkLastLevels = JSON.parse(sessionStorage.getItem(this.curParentType + '_second_title')) || '';
      let checkLastNextLevelsLength = JSON.parse(sessionStorage.getItem("nextLevels_length")) || '';

      let title =
        this.activeTab === "allBet"
          ? this.$$t("tab_allBet")
          : this.$$t("tab_baseBet");

      if (this.culture === 'zh-CN') {
        title = title.substring(0,1);
      }

      if (newSelect){
        // 新选择
          if (this.nextLevels.length){
            this.currentTitle = `${title}-${this.nextLeveTitle}-${e.value}`
          } else {
            this.currentTitle = `${title}-${e.value}`
            sessionStorage.removeItem(this.curParentType + '_second_title');
          }
          this.curDataKey = e.dataKey
          this.$sessionSet("nextLevels_length", this.nextLevels.length);
          this.$sessionSet(this.curParentType + '_second_title', {
              value: e.value,
              dataKey: e.dataKey,
              nextLeveTitle: this.nextLeveTitle,
              activeTab: this.activeTab
          });
      } else {
        // 旧的选择
        if (checkLastLevels && checkLastNextLevelsLength && checkLastLevels.activeTab === 'allBet'){
          this.nextLeveTitle = checkLastLevels.nextLeveTitle
          this.currentTitle = `${title}-${this.nextLeveTitle}-${checkLastLevels.value}`
        } else {
          this.currentTitle = `${title}-${checkLastLevels.value}`
        }
        this.curDataKey = checkLastLevels.dataKey
      }
      
      let gameCode = sessionStorage.getItem("gameCode_item");
      if (this.activeTab === "allBet")
        u = `/api/Lottery/GetPlayType?type=${gameCode}&allBet=${t}`;
      else u = `/api/Lottery/GetPlayType?type=${gameCode}&baseBet=${t}`;

      if (this.lottery && this.lottery.slice(0,2) === 'js') {
        if (t === this.current_lottery && Object.keys(this.extremeResult).length !== 0) {
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
                    return this.checkResp(resp, (r) => r.data.success === true);
                  })
                  .then((data) => {
                    let d = data.data;
                    this.current_lottery = t;
                    this.playType_items = d;
                    this.onGetCurrentDates();
                    this.showpays = false;
                    if (this.lottery && this.lottery.slice(0,2) === 'js') {
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
                return this.checkResp(resp, (r) => r.data.success === true);
              })
              .then((data) => {
                let d = data.data;
                this.current_lottery = t;
                this.playType_items = d;
                this.onGetCurrentDates();
                this.showpays = false;
                if (this.lottery && this.lottery.slice(0,2) === 'js') {
                  this.onGetExtremeDropBillRecord();
                } else {
                  this.onGetRecentResultItem(false);
                }

                this.collapseActiveName = this.playType_items.map((e,i) => i)
                
              })
              .catch((error) => {
                this.procError(error);
              });
          }
        }
      } else {
        this.$get(u)
          .then((resp) => {
            return this.checkResp(resp, (r) => r.data.success === true);
          })
          .then((data) => {
            let d = data.data;
            this.current_lottery = t;
            this.playType_items = d;
            this.showpays = false;

            if (this.lottery && this.lottery.slice(0,2) === 'js') {
              this.onGetExtremeDropBillRecord();
            } else {
              this.onGetRecentResultItem(false);
            }

            this.collapseActiveName = this.playType_items.map((e,i) => i)
            
          })
          .catch((error) => {
            this.procError(error);
          });
      }
      this.showProgress(false);
      this.onClear();
    },

    onGetLotteryTp() {
      this.showProgress()
      this.$get(`/api/Lottery/GetLotteryTp?lotteryType=${this.curParentType}&type=${this.lottery}`)
        .then((resp) => {
          return this.checkResp(resp, (r) => r.data.success === true);
        })
        .then((data) => {
          let d = data.data;
          this.activeTab = this.handleLotteryTab(d[0].defaultTab);
          this.allBetItems = d.filter((e) => e.tpType === 1);
          this.baseBetItems = d.filter((e) => e.tpType === 2);
          
          // 之前有选过，重新返回页面使用
          let last_key = sessionStorage.getItem(this.curParentType + '_second_title');
          if (last_key) {
              const data = JSON.parse(last_key);
              this.activeTab = data.activeTab;
              this.onGetPlayType(data);
              return;
          }

          this.activeTab = this.handleLotteryTab(d[0].defaultTab);
          let e
          if (this.curParentType === "PK10") {
            console.log('this.activeTab:',this.activeTab);
            if (this.activeTab === 'allBet') {
              // 官方玩法：默认为【定位胆】-【定位胆】
              const key = last_key || 'position';
              e = this.allBetItems.filter(t => t.dataKey === key)[0]
            }
            if (this.activeTab === 'baseBet') {
              // 传统玩法：默认为【两面盘】
              const key = last_key || 'doubleSide';
              e = this.baseBetItems.filter(t => t.dataKey === key)[0]
            }
          } else if (this.curParentType === "K3") {
            if (this.activeTab === 'allBet') {
              // 官方玩法：默认为【和值】
              e = this.allBetItems.filter(t => t.dataKey === 'sum')[0]
            }
            if (this.activeTab === 'baseBet') {
              // 传统玩法：默认为【整合】
              e = this.baseBetItems.filter(t => t.dataKey === 'all')[0]
            }
          } else {
            e = d.filter((e) => e.dataKey === this.firstSelecteFromTab)[0] || d[0]
          }

          this.firstSelecteFromTab = e.dataKey // 彩种选单-父选项

          if (e.nextLevel.length > 0) {
            let n = e.nextLevel.find(item => item.dataKey === this.current_lottery) || e.nextLevel[0];
            this.nextLevels = e.nextLevel;
            this.nextLeveTitle = e.value;
            this.onGetPlayType(n, true);
          } else {
            this.nextLevels = [];
            this.nextLeveTitle = "";
            this.currentTitle = e.value;
            this.onGetPlayType(e, true);
          }
          this.showProgress(false)
        })
        .catch((error) => {
          this.showProgress(false)
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

      if (this.betContents.length === 0) {
        this.$error(this.$$t_lottery("type_t"));
        return;
      }

      let typeCode = this.current_lottery;

      // PK10 : 检查有无满足前二前三
      if (typeCode === "second" || typeCode === "third") {
        let arr = this.betContents.map((e) => e.betContent);
        if (new Set(arr).size !== arr.length) {
          this.$info(this.$$t("repeat"));
          return;
        }
      }

      // PK10 : 检查有无满足前二前三
      let current_arrys = [];
      if (typeCode === "second" || typeCode === "third") {
        if (typeCode === "second") current_arrys = this.seconds;
        else current_arrys = this.thirds;
        let isBreak = false;
        for (var i = 0; i < current_arrys.length; i++) {
          let code = current_arrys[i].code;
          let cc = this.betContents.filter((b) => b.code === code);
          if (cc.length < 1) {
            isBreak = true;
            break;
          }
        }

        if (isBreak) {
          this.$info(this.$$t("repeat"));
          return;
        }
      }

      if (!this.betNumber) {
        this.$info(this.$$t("repeat"));
        return;
      }

      let b = null;
      let betCon = "";
      let arrays = [];

      if (this.isMake && this.curParentType === "PK10") {
        if (typeCode === "first") {
          arrays = [
            {
              code: "first",
            },
          ];
        } else if (typeCode === "second") {
          arrays = this.seconds;
        } else if (typeCode === "third") {
          arrays = this.thirds;
        } else if (typeCode === "position1to10") {
          arrays = this.position1to10s;
        } else if (typeCode === "position6to10") {
          arrays = this.position6to10s;
        } else if (typeCode === "position1to5") {
          arrays = this.position1to5s;
        } else if (
          ["champion", "firstRunnerUp", "secondRunnerUp", "niuniu"].includes(
            typeCode
          )
        ) {
          arrays = this.playType_items.map((e) => {
            return {
              code: e.playType,
            };
          });
          typeCode = this.playType_items[0].playType;
        } else {
          arrays = [];
        }

        arrays.forEach((e, index) => {
          let cc = this.betContents.filter((b) => b.code === e.code);
          let a = [];
          if (
            ["fiveElement1st", "fiveElement2nd", "fiveElement3rd"].includes(
              typeCode
            )
          ) {
            a = cc.map((c) => c.betContent).toString();
          } else {
            a = cc
              .map((c) => c.betContent)
              .sort(function (a, b) {
                return a > b ? 1 : -1;
              })
              .toString();
          }
          if (!a || a.length < 1) a += "_";
          if (index < arrays.length - 1) a += "|";
          betCon += a;
        });
        b = this.getBetText(betCon, typeCode);
      } else if (
        this.curParentType === "K3" &&
        this.current_lottery !== "sum" &&
        this.current_lottery !== "all"
      ) {
        b = this.getBetText(
          this.betContents[0].betContent,
          this.betContents[0].playType
        );
      } else {
        b = this.betContents.map((e) => {
          return {
            money:
              e.playType === "niuniuDouble"
                ? Number(this.money) * 5
                : this.money,
            playType: e.playType,
            singMoney: this.money,
            betContent: e.betContent,
          };
        });
      }

      let p = {
        lotteryType: this.lottery,
        dates: this.currentDates.dates,
        betContent: b,
      };

      let lottery = this.lottery || sessionStorage.getItem("gameCode_item");

      if (lottery.slice(0,2) === 'js') {
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
      } else {
        this.$store.commit("setPageTitle", this.resultItem.lotteryName);
        sessionStorage.setItem("isMake", this.isMake);
        sessionStorage.setItem("betNumber", this.betNumber);
        this.$sessionSet("bet-items", this.playType_items);
        this.$sessionSet("baseBet-data", p);
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
          this.extremeMoney = this.formatNum(this.extremeMoney + d.win, 2);
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
      sessionStorage.removeItem('changeGameFromSimple');
      this.firstSelecteFromTab = e.dataKey;
      let cu = "";
      if (e.nextLeve && e.nextLeve.length > 0) {
        cu = e.nextLevel[0].dataKey;
      } else {
        cu = e.dataKey;
      }

      if (cu === this.current_lottery) {
        this.nextLevels = [];
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
      }
    },

    simpleBetChangeGame(item = null, index = null, name) {
      sessionStorage.removeItem('changeGameFromSimple');
      this.$router.push({
					path: 'pk10simple',
					query: {
						name: item ? `第${item}球-${name}` : name,
            type: name,
            index: index
					}
				})
    },

    getActive(item, playType, code) {
      let type = playType;
      let e = null;
      if (code)
        e = this.betContents.filter(
          (e) => e.playType === type && e.betContent === item && e.code === code
        );
      else
        e = this.betContents.filter(
          (e) => e.playType === type && e.betContent === item
        );
      if (e.length > 0) return true;
      else return false;
    },

    setBetContent(item, playType, code, noFilter) {
      if (this.isSeal || this.isDisabled) return;
      if (noFilter) this.betContents = [];
      let t = playType;
      let e = null;
      if (code)
        e = this.betContents.findIndex(
          (e) => e.playType === t && e.betContent === item && e.code === code
        );
      else
        e = this.betContents.findIndex(
          (e) => e.playType === t && e.betContent === item
        );

      if (e >= 0 && !noFilter) {
        this.betContents.splice(e, 1);
      } else {
        if (code) {
          this.betContents.push({
            playType: t,
            betContent: item,
            code: code,
          });
        } else {
          this.betContents.push({
            playType: t,
            betContent: item,
          });
        }
      }
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
          this.firstSelecteFromTab = '';
          this.activeTab = 'allBet';
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
        if (this.lottery.slice(0,2) === 'js' && this.betTotal > 0) {
          this.$dialog
            .confirm({
              title: this.$t("common.point"),
              message: this.$$t_lottery("stop_t"),
            })
            .then(() => {
              // on confirm
              sessionStorage.removeItem(this.curParentType + '_second_title');
              sessionStorage.setItem("goLotteryLobby", "goLotteryLobby");
              this.stopInterval();
            })
            .catch(() => {
              // on cancel
            });
        }
      } else {
        this.firstSelecteFromTab = '';
        this.activeTab = 'allBet';
        this.redirectRouter("/app/lotteryLobby");
        sessionStorage.removeItem("gameCode_item");
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
        sessionStorage.removeItem('current_lottery')
        sessionStorage.removeItem(this.curParentType + '_second_title')
        sessionStorage.removeItem("rules_code")
        sessionStorage.removeItem("gameCode_item")
        this.redirectRouter("/app/dashboard");
      } else if (c.code === "deposit") {
        this.redirectRouter("/app/recharge");
      } else if (Number(c.code) === 3) {
        this.redirectRouter("lottery/rule");
      }
    },

    singleBtnClick(bet, type, code) {
      if (this.isSeal) return
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
              if (e.code === bb.code) this.betContents.splice(index, 1);
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
            sessionStorage.setItem("betLists-Data", JSON.stringify(item));
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
      setTimeout(() => {
        this.onGetCurrentDates();
      }, 100);
    },

    onClear() {
      this.betNumber_k3 = 0;
      this.betContents = [];
      this.money = 3;
    },

    getDataText(e) {
      if (!e) return;
      let d = this.formatDate_MT_8(e);
      let v = "";

      if (this.resultItem.lotteryType === 'azxy10') {
        v = ''
      } else if (this.isAndroid()){
        v = d.replace(/-/g, "") + '-'
      } else {
        v = d.replace(/[/]/g, "") + '-'
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
#pk10 {
  ::-webkit-scrollbar {
    display: none;
  }

  /deep/ .van-popover {
    text-align: left;
  }

  .pays_popup {
    top: 46px !important;

    .game_block {
      width: 100px;
      min-height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background-color: #f5f5f9;
      padding: 6px;
      margin-bottom: 12px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .tab_active {
    background-color: rgb(223, 236, 255) !important;
    color: rgb(82, 149, 253) !important;
  }

  .bet_center {
    position: absolute;
    top: 130px;
    left: 0;
    right: 0;
    bottom: 90px;
    width: 100%;

    .van-row {
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
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ball-square {
      width: 80%;
      min-height: 44px;
      border-radius: 5px;
      text-align: center;
    }

    .b-pk10-btn {
      width: 30px;
      line-height: 30px;
      font-size: 18px;
      box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
    }

    .ball-tool {
      float: right;
      line-height: 26px;
      font-size: 14px;

      > span {
        display: block;
        float: left;
        height: 100%;
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

  .dateInfo {
    z-index: 1;
    position: sticky;
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

  .simpleBet-style {
    font-size: 18px;
    line-height: 28px;
    .btn {
      display: inline-block;
      text-align: center;
      width: auto;
      height: 27px;
      margin: 3px 6px;
      padding: 0 3px;
      border: 2px solid #eee;
      -webkit-border-radius: 5px;
      color: #004299;
    }
    .simple-title {
      margin: 3px 0;
      color: #fff;
      .text {
        position: relative;
        z-index: 2;
        width: fit-content;
        border-radius: 10px 50px 10px 50px;
        padding: 5px 20px;
        margin: 0 auto;
        background: #5a9ae7;
      }
      &::after{
        content: "";
        display: block;
        position: relative;
        width: 100%;
        top: -19px;
        left: 0;
        border: 2px solid #74747455;
      }
    }
  }
}

</style>
