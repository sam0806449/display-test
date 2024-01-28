<template>
  <div id="ssc">
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
          get-container="#ssc"
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
                  v-if="isOpen || !isDisabled"
                >
                  <template
                    v-for="(r, i) in getArry(
                      extremeResult && extremeResult.num
                    )"
                  >
                    <div
                     class="ssc-num-box" 
                     :key="i">{{ r }}
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
                  class="ssc-num-box"
                  :key="i"
                >
                  {{ r }}
                </div>
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

    <!-- 下注按钮区 -->
    <div class="bet_center">
      <scroller>
        <div v-if="playType_items.length > 0">
          <template v-for="(item,i) in playType_items">
            <div :key="`${i}_${item.playType}`">

          <!-- 没有快捷选项的 -->
              <div v-if="curDataKey === '前三直选和值' || curDataKey === '中三直选和值' || curDataKey === '后三直选和值' || curDataKey === '后二直选和值' || curDataKey === '前二直选和值'"
               :class="['text-left', {'pt-3' : i > 0}]">

                <div class="tool-pl mb-1 px-3 caption">
                  {{ $t("betDetails.odds") }}:
                  <span class="main-text">{{
                    item.lotteryBetContent[0].odds
                  }}</span>
                </div>
                <br />
               <!-- 说明 -->
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
                        <template v-for="(bet, index) in betList">
                          <van-col
                            span="4"
                            :key="index"
                            class="mb-3"
                          >
                            <div
                              class="ball-num"
                              :class="{
                                current_active: curSelected[0].indexOf(bet+'') > -1,
                              }"
                              @click="selectBet((bet+''), 0)"
                            >
                             {{ bet }}
                            </div>
                            <!-- <div class="caption-bold mt-1 mb-1 main-text">
                              {{ bet.odds }}
                            </div> -->
                          </van-col>
                        </template>
                      </van-row>
                    </div>
                </div>
              </div>

              <!-- 按钮名称取自接口 -->
              <div v-else-if="simpleBetNumDataKey.indexOf(curDataKey) > -1"
               :class="['text-left', {'pt-3' : i > 0}]">

               <!-- 说明 -->
                <div
                  class="tool-pl mb-1 px-3 caption text-grey"
                  @click="showWF = true"
                  v-if="activeTab === 'allBet' && i === 0"
                >
                  <van-icon name="question-o" size="12" class="mr-1" />{{
                    $$t("wfsm")
                  }}
                </div><br/>

                <div v-if="playType_items.length === 1" class="subtitle-3 ball-tle">{{ item.playTypeName }}</div>
                  <div v-if="curDataKey === '万仟和尾数' || curDataKey === '拾个和尾数'" class="ball-tool">
                    <span
                      :style="{
                        padding: culture === 'zh-CN' ? '0 8px' : '0 2px',
                      }"
                      v-for="(btn,i) in singleBtns"
                      :key="i"
                      @click="doOperate(i, 0)"
                      >{{ btn.text }}</span
                    >
                  </div>

                <div v-if="playType_items.length === 1" class="pr-3">
                  <div class="mt-3 text-center pl-4">
                      <van-row gutter="6">
                        <template v-for="(bet, index) in item.lotteryBetContent">
                          <van-col
                            span="12"
                            :key="index"
                            class="mb-3"
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
                              <span>{{ bet.betContentName }}</span>
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
                      <div v-if="curTypeList && curTypeList.transDes" class="subtitle-3 ball-tle">{{ curTypeList.transDes[i] }}</div>
                      <div v-else class="subtitle-3 ball-tle">{{ item.playTypeName }}</div>
                    </template>
                    <div class="text-center">
                      <van-row gutter="6">
                        <template v-for="(bet, index) in item.lotteryBetContent">
                          <van-col
                            :span="hadleSpan(curDataKey)"
                            :key="index"
                            class="mb-1"
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
                              <span>{{ bet.betContentName }}</span>
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

          <!-- 有快捷选项的 -->
              <div
                v-else class="text-left"
              >
                <div class="tool-pl mb-1 px-3 caption">
                  {{ $t("betDetails.odds") }}:
                  <span class="main-text">{{item.lotteryBetContent[0].odds}}</span>
                  <!-- 赔率多项 -->
                  <span v-if="customOddsText(item.lotteryBetContent[0].odds)" class="main-text">
                    {{customOddsText(item.lotteryBetContent[0].odds)}}</span>
                </div>
                <br />

                <!-- 说明 -->
                <div
                  class="tool-pl mb-1 px-3 caption text-grey"
                  @click="showWF = true"
                >
                  <van-icon name="question-o" size="12" class="mr-1" />{{
                    $$t("wfsm")
                  }}
                </div>

                <div v-for="(p, index) in curTypeList.ruleList" :key="index">

                  <!-- 控制按钮 -->
                  <div class="flex align-items-center space-between">
                    <!-- 旗子 -->
                    <div class="subtitle-3 ball-tle">
                      {{ p.name ? p.name : item.playTypeName }}
                    </div>

                    <div v-if="!p.special" class="ball-tool">
                      <span
                        :style="{
                          padding: culture === 'zh-CN' ? '0 8px' : '0 2px',
                        }"
                        v-for="(btn,i) in singleBtns"
                        :key="i"
                        @click="doOperate(i, index)"
                        >{{ btn.text }}</span
                      >
                    </div>
                  </div>

                  <div class="mt-3 text-center px-4">
                    
                    <van-row v-if="p.special">
                      <template v-for="(bet, index2) in transBetList2">
                        <van-col span="6" :key="index2" class="mb-3 van-col_20">
                          <div
                            class="ball-num ball-square"
                            :class="{
                              current_active: curSelected[index].indexOf(bet.name) > -1,
                            }"
                            @click="selectBet(bet.name, index, bet.val)"
                          >
                            {{ bet.name }}
                          </div>
                        </van-col>
                      </template>
                    </van-row>
                    
                    <van-row v-else>
                      <template v-for="(bet, index3) in 10">
                        <van-col span="4" :key="index3" class="mb-3 van-col_20">
                          <div
                            class="ball-num"
                            :class="{
                              current_active: curSelected[index].indexOf(index3) > -1,
                            }"
                            @click="selectBet(index3, index)"
                          >
                            {{ Number(index3) }}
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
        v-if="Number(money) && betNumber && pass"
      >
        <div class="body-2">
          {{ handleLangOfNumber(betNumber)}}，{{ currencySymbol
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
      get-container="#ssc"
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
                  :class="{ tab_active: firstSelecteFromTab === item.dataKey }"
                >
                   <p class="van-ellipsis">{{ item.value }}</p>
                </div>
              </van-col>
            </van-row>
          </div>

          <div class="px-3" v-if="nextLevels.length > 0">
            <van-divider/>
            <div class="second-nav">
            <scroller>
            <van-row gutter="4" class="mt-2">
              <div v-for="(next, index) in nextLevels" :key="index">
                <div
                  v-if="useWrap[firstSelecteFromTab] && useWrap[firstSelecteFromTab].includes(index)"
                  :key="`wrap-${index}`"
                  style="width:100%;"
                  class="flex mb-2 ml-3"
                  >
                  <div class="subtitle-1 text-left">
                  {{ $$t(navSecondTitle[firstSelecteFromTab])[navIndexMap[firstSelecteFromTab][index]]}}
                  </div>
                </div>

                <van-col
                  span="12"
                  @click="onGetPlayType(next, true)"
                >
                  <!-- <div class="subtitle-1 text-left">
                    {{ nextLeveTitle }}
                  </div> -->

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
              </div>
              <!-- empty box -->
              <div style="width:100px; height: 100px;"></div> 
            </van-row>
            <div class="second-nav-black"/>
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

        <van-tab v-if="curParentType === 'SSC' && culture === 'zh-CN' && memberInfo.currencyCode === 'CNY'" 
        :title="'简洁玩法'" name="simpleBet">
          <SSCSimpleBetTabContent />
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
      get-container="#ssc"
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
          <div class="px-4 py-4" v-if="betLists.length > 0">
            <div
              class="betList px-3 mb-2"
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
      get-container="#ssc"
      :style="{ height: '70%' }"
    >
      <div class="resultsTab flex">
        <div v-for="(t,i) in 2" :key="i" 
        class="btn" 
        :class="{'active': activeResults === t}"
        @click="activeResults = t">
          <p>{{ i === 0 ? $$t("announcement") : $$t("_625") }}</p>
        </div>
      </div>
      <div class="rulesLists">
        <scroller
          :on-infinite="() => $_throttle(onGetRecentResults())"
          :refreshText="null"
          :noDataText="null"
          ref="results_scroller"
        >
          <div v-show="activeResults === 1">
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
                      class="ssc-num-box"
                      :key="i"
                    >
                      {{ ru }}
                    </div>
                  </template>
                </div>
                <div
                  class="flex align-items-center mt-1 caption text-grey_1"
                >
                  <div class="mr-1">
                    <span class="tag-blue" v-if="r.gySum < 23">{{
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

                  <div>
                    <span class="tag-yellow" v-if="+r.num.split(',')[0] > +r.num.split(',')[4]">{{
                      r.numDx
                    }}</span>
                    <span class="tag-blue" v-else>{{ r.numDx }}</span>
                  </div>

                </div>
              </div>
            </template>
          </div>
          <div v-show="activeResults === 2">
            <div class="rank-content">
              <div
                v-for="(item,i) in calcResultList"
                :key="item.playsname + item.clname"
                :class="['rank-item', {'rank-item-d-bg': i % 2 !== 0 }]"
              >
                <div class="text">
                  <div class="item-name">
                    <div>{{ item.playsname }}</div>
                    <div class="item-type">@{{ item.clname }}</div>
                  </div>
                  <div class="item-date">{{ item.clqs }}{{ $t('lottery.dates') }}</div>
                </div>  
              </div>
            </div>
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
          <div class="subtitle-1">{{ $$t("sm_title") }}</div>
          <div class="caption pl-3">
            {{ curTypeList && curTypeList.playText2 }}
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
import SSCSimpleBetTabContent from "./comps/SSCsimpleBetTabContent.vue";
import AllLotteryPop from "./comps/AllLotteryPop";
import lottery from "@/mixins/lottery";

export default {
  name: "SSC",

  mixins: [sessionContext, lottery],

  components: { SSCSimpleBetTabContent, AllLotteryPop },

  data() {
    return {
      showAllLotteryPop: false,
      activeResults: 1, // 近10开奖popup内 组件显示类别
      calcResultList: [],
      pass: false, // 是否通过验证
      betItems: '',
      curDataKey: '两面盘',
      betList: [],
      curSelected: [],
      simpleBetNumDataKey: ['龙虎', '大小单双', '斗牛', '后三特殊号', '中三特殊号', '前三特殊号', '单球1-5', '两面盘', '前中后', '梭哈','后三特殊号', '拾个和尾数', '万仟和尾数'],
      navSecondTitle: {
        '五星': '_131',
        '四星': '_132',
        '三星': '_133',
        '二星': '_134',
        '不定位': '_135',
        '趣味': '_136',
        '特殊号': '_137',
        '任选': '_138',
      },
      specialHandleType: ['任选二组选', '任选三组三', '任选三组六'],
      transBetList2: [{name: this.$$t("_394"),val: '万'}, {name: this.$$t("_395"),val: '千'}, {name: this.$$t("_396"),val: '百'}, {name: this.$$t("_397"),val: '十'}, {name: this.$$t("_398"),val: '个'}],
      curSpecialSelected: [],
      useWrap: {
        twoSameNums: [1],
        threeSameNums: [1],
        '五星': [0, 2],
        '四星': [0, 2, 6, 8],
        '三星': [0, 4, 6, 10, 12, 16],
        '二星': [0, 4, 5, 9],
        '不定位': [0, 6, 12],
        '任选': [0, 2, 5]
      },
      navIndexMap:{
        '五星':{
          0: 0,
          2: 1,
        },
        '四星':{
          0: 0,
          2: 1,
          6: 2,
          8: 3
        },
        '三星':{
          0: 0,
          4: 1,
          6: 2,
          10: 3,
          12: 4,
          16: 5
        },
        '二星':{
          0: 0,
          4: 1,
          5: 2,
          9: 3
        },
        '不定位':{
          0: 0,
          6: 1,
          12: 2,
        },
        '任选':{
          0: 0,
          2: 1,
          5: 2,
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
          拾个和尾数: {
                    playText: this.$$t("_263"),
                    playText2: this.$$t("_263_2"),
                    example: `<p>${this.$$t("_41")}：${this.$$t("_264")}</p>`,
                },
          万仟和尾数: {
              playText: this.$$t("_276"),
              playText2: this.$$t("_276_2"),
              example: `<p>${this.$$t("_41")}：${this.$$t("_277")}</p>`,
          },      
          龙虎: {
              transDes: [
                  this.$$t("_333"),
                  this.$$t("_334"),
                  this.$$t("_335"),
                  this.$$t("_336"),
                  this.$$t("_337"),
                  this.$$t("_338"),
                  this.$$t("_339"),
                  this.$$t("_340"),
                  this.$$t("_341"),
                  this.$$t("_342"),
              ],
              playText: this.$$t("_330"),
              playText2: this.$$t("_330_2"),
              example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                  "_331"
              )}</p><p>${this.$t("lottery.openNumber")}：${this.$$t(
                  "_332"
              )}</p>`,
          },
          大小单双: {
              transDes: [
                  this.$$t("_139"),
                  this.$$t("_140"),
                  this.$$t("_141"),
                  this.$$t("_142"),
                  this.$$t("_143"),
                  this.$$t("_343"),
              ],
              playText: this.$$t("_344"),
              playText2: this.$$t("_344_2"),
              example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                  "_345"
              )}</p><p>${this.$t("lottery.openNumber")}：${this.$$t(
                  "_332"
              )}</p>`,
          },
          斗牛: {
              playText: this.$$t("_346"),
              playText2: this.$$t("_346_2"),
              transDes1: [this.$$t("_41")],
              example: `<p class="mb-2">${this.$$t("_144")}：${this.$$t(
                  "_399"
              )}</p><p>${this.$t("lottery.openNumber")}：${this.$$t(
                  "_347"
              )}</p>`,
              example1: `<p>${this.$$t("_349")}</p>`,
          },
          后三特殊号: {
              transDes: [this.$$t("_351")],
              playText: this.$$t("_350"),
              playText2: this.$$t("_350_2"),
              example: `<p class="mb-2">${this.$$t("_352")}：${this.$$t(
                  "_353"
              )}</p><p>${this.$t("lottery.openNumber")}：${this.$$t(
                  "_354"
              )}</p>`,
          },
          中三特殊号: {
              transDes: [this.$$t("_351")],
              playText: this.$$t("_355"),
              playText2: this.$$t("_355_2"),
              example: `<p class="mb-2">${this.$$t("_352")}：${this.$$t(
                  "_356"
              )}</p><p>${this.$t("lottery.openNumber")}：${this.$$t(
                  "_354"
              )}</p>`,
          },
          前三特殊号: {
              transDes: [this.$$t("_351")],
              playText: this.$$t("_357"),
              playText2: this.$$t("_357_2"),
              example: `<p class="mb-2">${this.$$t("_352")}：${this.$$t(
                  "_358"
              )}</p><p>${this.$t("lottery.openNumber")}：${this.$$t(
                  "_354"
              )}</p>`,
          },
           五星直选复式: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_149"),
                    playText2: this.$$t("_149_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：88693，${this.$$t("openNumber")}：${this.$$t(
                        "_150"
                    )}</p>`,
                },
                五星组合: {
                    basicMoney: 5,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_151"),
                    playText2: this.$$t("_151_2"),
                    isCustomOddText: true,
                    example: `<p class="mb-2">${this.$$t(
                        "_144"
                    )}：65186</p><p class="mb-2">${this.$$t(
                        "openNumber"
                    )}：${this.$$t("_153")}</p><p class="mb-2">${this.$$t(
                        "_144"
                    )}：65186</p><p class="mb-2">${this.$$t(
                        "openNumber"
                    )}：${this.$$t("_154")}</p><p class="mb-2">${this.$$t(
                        "_144"
                    )}：65182</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_155"
                    )}</p>`,
                },
                五星组选120: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_144"), minLength: 5 }],
                    playText: this.$$t("_156"),
                    playText2: this.$$t("_156_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：50719</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_157"
                    )}</p>`,
                },
                五星组选60: {
                    basicMoney: 1,
                    checkRepeat: true,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_145"), minLength: 1 },
                        { name: this.$$t("_146"), minLength: 3 },
                    ],
                    playText: this.$$t("_158"),
                    playText2: this.$$t("_158_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_159"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_160"
                    )}</p>`,
                },
                五星组选30: {
                    basicMoney: 1,
                    checkRepeat: true,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_145"), minLength: 2 },
                        { name: this.$$t("_146"), minLength: 1 },
                    ],
                    playText: this.$$t("_161"),
                    playText2: this.$$t("_161_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_162"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_163"
                    )}</p>`,
                },
                五星组选20: {
                    basicMoney: 1,
                    checkRepeat: true,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_147"), minLength: 1 },
                        { name: this.$$t("_146"), minLength: 2 },
                    ],
                    playText: this.$$t("_164"),
                    playText2: this.$$t("_164_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_165"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_166"
                    )}</p>`,
                },
                五星组选10: {
                    basicMoney: 1,
                    checkRepeat: true,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_147"), minLength: 1 },
                        { name: this.$$t("_145"), minLength: 1 },
                    ],
                    playText: this.$$t("_167"),
                    playText2: this.$$t("_167_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_168"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_169"
                    )}</p>`,
                },
                五星组选5: {
                    basicMoney: 1,
                    checkRepeat: true,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_148"), minLength: 1 },
                        { name: this.$$t("_146"), minLength: 1 },
                    ],
                    playText: this.$$t("_170"),
                    playText2: this.$$t("_170_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_171"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_172"
                    )}</p>`,
                },
                后四直选复式: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_173"),
                    playText2: this.$$t("_173_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：8869</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_174"
                    )}</p>`,
                },
                后四组合: {
                    basicMoney: 4,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_175"),
                    playText2: this.$$t("_175_2"),
                    isCustomOddText: true,
                    example: `<p class="mb-2">${this.$$t(
                        "_144"
                    )}：5186</p><p class="mb-2">${this.$$t(
                        "openNumber"
                    )}：${this.$$t("_177")}</p><p class="mb-2">${this.$$t(
                        "_144"
                    )}：5186</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_178"
                    )}</p>`,
                },
                后四组选24: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_144"), minLength: 4 }],
                    playText: this.$$t("_179"),
                    playText2: this.$$t("_179_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：7631</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_180"
                    )}</p>`,
                },
                后四组选12: {
                    basicMoney: 1,
                    checkRepeat: true,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_145"), minLength: 1 },
                        { name: this.$$t("_146"), minLength: 2 },
                    ],
                    playText: this.$$t("_181"),
                    playText2: this.$$t("_181_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_182"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_183"
                    )}</p>`,
                },
                后四组选6: {
                    basicMoney: 1,
                    checkRepeat: true,
                    any: 0,
                    ruleList: [{ name: this.$$t("_145"), minLength: 2 }],
                    playText: this.$$t("_184"),
                    playText2: this.$$t("_184_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_185"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_186"
                    )}</p>`,
                },
                后四组选4: {
                    basicMoney: 1,
                    checkRepeat: true,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_147"), minLength: 1 },
                        { name: this.$$t("_146"), minLength: 1 },
                    ],
                    playText: this.$$t("_187"),
                    playText2: this.$$t("_187_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_188"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_189"
                    )}</p>`,
                },
                前四直选复式: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                    ],
                    playText: this.$$t("_190"),
                    playText2: this.$$t("_190_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：6697</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_191"
                    )}</p>`,
                },
                前四组合: {
                    basicMoney: 4,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                    ],
                    playText: this.$$t("_192"),
                    playText2: this.$$t("_192_2"),
                    isCustomOddText: true,
                    example: `<p class="mb-2">${this.$$t(
                        "_144"
                    )}：5186</p><p class="mb-2">${this.$$t(
                        "openNumber"
                    )}：${this.$$t("_193")}</p><p class="mb-2">${this.$$t(
                        "_144"
                    )}：5186</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_194"
                    )}</p>`,
                },
                前四组选24: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_144"), minLength: 4 }],
                    playText: this.$$t("_387"),
                    playText2: this.$$t("_387_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：5231</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_195"
                    )}</p>`,
                },
                前四组选12: {
                    basicMoney: 1,
                    checkRepeat: true,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_145"), minLength: 1 },
                        { name: this.$$t("_146"), minLength: 2 },
                    ],
                    playText: this.$$t("_388"),
                    playText2: this.$$t("_388_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_196"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_197"
                    )}</p>`,
                },
                前四组选6: {
                    basicMoney: 1,
                    checkRepeat: true,
                    any: 0,
                    ruleList: [{ name: this.$$t("_145"), minLength: 2 }],
                    playText: this.$$t("_389"),
                    playText2: this.$$t("_389_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_198"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_199"
                    )}</p>`,
                },
                前四组选4: {
                    basicMoney: 1,
                    checkRepeat: true,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_147"), minLength: 1 },
                        { name: this.$$t("_146"), minLength: 1 },
                    ],
                    playText: this.$$t("_390"),
                    playText2: this.$$t("_390_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_200"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_201"
                    )}</p>`,
                },
                后三直选复式: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_202"),
                    playText2: this.$$t("_202_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_203"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_204"
                    )}</p>`,
                },
                后三直选和值: {
                    basicMoney: 1,
                    customMoney: {
                        0: 1,
                        1: 3,
                        2: 6,
                        3: 10,
                        4: 15,
                        5: 21,
                        6: 28,
                        7: 36,
                        8: 45,
                        9: 55,
                        10: 63,
                        11: 69,
                        12: 73,
                        13: 75,
                        14: 75,
                        15: 73,
                        16: 69,
                        17: 63,
                        18: 55,
                        19: 45,
                        20: 36,
                        21: 28,
                        22: 21,
                        23: 15,
                        24: 10,
                        25: 6,
                        26: 3,
                        27: 1,
                    },
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_208"), minLength: 1 }],
                    playText: this.$$t("_205"),
                    playText2: this.$$t("_205_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_206"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_207"
                    )}</p>`,
                },
                后三直选跨度: {
                    basicMoney: 1,
                    customMoney: {
                        0: 10,
                        1: 54,
                        2: 96,
                        3: 126,
                        4: 144,
                        5: 150,
                        6: 144,
                        7: 126,
                        8: 96,
                        9: 54,
                    },
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_9"), minLength: 1 }],
                    playText: this.$$t("_209"),
                    playText2: this.$$t("_209_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_210"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_211"
                    )}</p>`,
                },
                后三和值尾数: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_9"), minLength: 1 }],
                    playText: this.$$t("_212"),
                    playText2: this.$$t("_212_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_213"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_214"
                    )}</p>`,
                },
                后三组三: {
                    basicMoney: 2,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_215"), minLength: 2 }],
                    playText: this.$$t("_216"),
                    playText2: this.$$t("_216_2"),
                    example: `<p class="mb-2">${this.$$t("_217")}：${this.$$t(
                        "_218"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_219"
                    )}</p>`,
                },
                后三组六: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_220"), minLength: 3 }],
                    playText: this.$$t("_221"),
                    playText2: this.$$t("_221_2"),
                    example: `<p class="mb-2">${this.$$t("_217")}：${this.$$t(
                        "_222"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_223"
                    )}</p>`,
                },
                中三直选复式: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                        { name: this.$$t("_142"), minLength: 1 },
                    ],
                    playText: this.$$t("_224"),
                    playText2: this.$$t("_224_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_225"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_226"
                    )}</p>`,
                },
                中三直选和值: {
                    basicMoney: 1,
                    customMoney: {
                        0: 1,
                        1: 3,
                        2: 6,
                        3: 10,
                        4: 15,
                        5: 21,
                        6: 28,
                        7: 36,
                        8: 45,
                        9: 55,
                        10: 63,
                        11: 69,
                        12: 73,
                        13: 75,
                        14: 75,
                        15: 73,
                        16: 69,
                        17: 63,
                        18: 55,
                        19: 45,
                        20: 36,
                        21: 28,
                        22: 21,
                        23: 15,
                        24: 10,
                        25: 6,
                        26: 3,
                        27: 1,
                    },
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_208"), minLength: 1 }],
                    playText: this.$$t("_227"),
                    playText2: this.$$t("_227_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_206"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_228"
                    )}</p>`,
                },
                中三直选跨度: {
                    basicMoney: 1,
                    customMoney: {
                        0: 10,
                        1: 54,
                        2: 96,
                        3: 126,
                        4: 144,
                        5: 150,
                        6: 144,
                        7: 126,
                        8: 96,
                        9: 54,
                    },
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_9"), minLength: 1 }],
                    playText: this.$$t("_229"),
                    playText2: this.$$t("_229_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_230"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_211"
                    )}</p>`,
                },
                中三和值尾数: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_9"), minLength: 1 }],
                    playText: this.$$t("_231"),
                    playText2: this.$$t("_231_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_213"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_232"
                    )}</p>`,
                },
                中三组三: {
                    basicMoney: 2,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_233"), minLength: 2 }],
                    playText: this.$$t("_216"),
                    playText2: this.$$t("_216_2"),
                    example: `<p class="mb-2">${this.$$t("_217")}：${this.$$t(
                        "_234"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_235"
                    )}</p>`,
                },
                中三组六: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_236"), minLength: 3 }],
                    playText: this.$$t("_221"),
                    playText2: this.$$t("_221_2"),
                    example: `<p class="mb-2">${this.$$t("_217")}：${this.$$t(
                        "_237"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_238"
                    )}</p>`,
                },
                前三直选复式: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                        { name: this.$$t("_141"), minLength: 1 },
                    ],
                    playText: this.$$t("_239"),
                    playText2: this.$$t("_239_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_240"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_241"
                    )}</p>`,
                },
                前三直选和值: {
                    basicMoney: 1,
                    customMoney: {
                        0: 1,
                        1: 3,
                        2: 6,
                        3: 10,
                        4: 15,
                        5: 21,
                        6: 28,
                        7: 36,
                        8: 45,
                        9: 55,
                        10: 63,
                        11: 69,
                        12: 73,
                        13: 75,
                        14: 75,
                        15: 73,
                        16: 69,
                        17: 63,
                        18: 55,
                        19: 45,
                        20: 36,
                        21: 28,
                        22: 21,
                        23: 15,
                        24: 10,
                        25: 6,
                        26: 3,
                        27: 1,
                    },
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_208"), minLength: 1 }],
                    playText: this.$$t("_242"),
                    playText2: this.$$t("_242_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_206"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_243"
                    )}</p>`,
                },
                前三直选跨度: {
                    basicMoney: 1,
                    customMoney: {
                        0: 10,
                        1: 54,
                        2: 96,
                        3: 126,
                        4: 144,
                        5: 150,
                        6: 144,
                        7: 126,
                        8: 96,
                        9: 54,
                    },
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_9"), minLength: 1 }],
                    playText: this.$$t("_244"),
                    playText2: this.$$t("_244_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_245"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_246"
                    )}</p>`,
                },
                前三和值尾数: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_9"), minLength: 1 }],
                    playText: this.$$t("_247"),
                    playText2: this.$$t("_247_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_213"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_248"
                    )}</p>`,
                },
                前三组三: {
                    basicMoney: 2,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_249"), minLength: 2 }],
                    playText: this.$$t("_216"),
                    playText2: this.$$t("_216_2"),
                    example: `<p class="mb-2">${this.$$t("_217")}：${this.$$t(
                        "_250"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_251"
                    )}</p>`,
                },
                前三组六: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_252"), minLength: 3 }],
                    playText: this.$$t("_221"),
                    playText2: this.$$t("_221_2"),
                    example: `<p class="mb-2">${this.$$t("_217")}：${this.$$t(
                        "_253"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_254"
                    )}</p>`,
                },
                后二直选复式: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_142"), minLength: 1 },
                        { name: this.$$t("_143"), minLength: 1 },
                    ],
                    playText: this.$$t("_255"),
                    playText2: this.$$t("_255_2"),
                    example: `<p>${this.$$t("_41")}：${this.$$t("_256")}</p>`,
                },
                后二直选和值: {
                    basicMoney: 1,
                    customMoney: {
                        0: 1,
                        1: 2,
                        2: 3,
                        3: 4,
                        4: 5,
                        5: 6,
                        6: 7,
                        7: 8,
                        8: 9,
                        9: 10,
                        10: 9,
                        11: 8,
                        12: 7,
                        13: 6,
                        14: 5,
                        15: 4,
                        16: 3,
                        17: 2,
                        18: 1,
                    },
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_258"), minLength: 1 }],
                    playText: this.$$t("_257"),
                    playText2: this.$$t("_257_2"),
                    example: `<p>${this.$$t("_41")}：${this.$$t("_259")}</p>`,
                },
                后二直选跨度: {
                    basicMoney: 1,
                    customMoney: {
                        0: 10,
                        1: 18,
                        2: 16,
                        3: 14,
                        4: 12,
                        5: 10,
                        6: 8,
                        7: 6,
                        8: 4,
                        9: 2,
                    },
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_261"), minLength: 1 }],
                    playText: this.$$t("_260"),
                    playText2: this.$$t("_260_2"),
                    example: `<p>${this.$$t("_41")}：${this.$$t("_262")}</p>`,
                },
                后二组选复式: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_266"), minLength: 2 }],
                    playText: this.$$t("_265"),
                    playText2: this.$$t("_265_2"),
                    example: `<p>${this.$$t("_41")}：${this.$$t("_267")}</p>`,
                },
                前二直选复式: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_139"), minLength: 1 },
                        { name: this.$$t("_140"), minLength: 1 },
                    ],
                    playText: this.$$t("_268"),
                    playText2: this.$$t("_268_2"),
                    example: `<p>${this.$$t("_41")}：${this.$$t("_269")}</p>`,
                },
                前二直选和值: {
                    basicMoney: 1,
                    customMoney: {
                        0: 1,
                        1: 2,
                        2: 3,
                        3: 4,
                        4: 5,
                        5: 6,
                        6: 7,
                        7: 8,
                        8: 9,
                        9: 10,
                        10: 9,
                        11: 8,
                        12: 7,
                        13: 6,
                        14: 5,
                        15: 4,
                        16: 3,
                        17: 2,
                        18: 1,
                    },
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_271"), minLength: 1 }],
                    playText: this.$$t("_270"),
                    playText2: this.$$t("_270_2"),
                    example: `<p>${this.$$t("_41")}：${this.$$t("_272")}</p>`,
                },
                前二直选跨度: {
                    basicMoney: 1,
                    customMoney: {
                        0: 10,
                        1: 18,
                        2: 16,
                        3: 14,
                        4: 12,
                        5: 10,
                        6: 8,
                        7: 6,
                        8: 4,
                        9: 2,
                    },
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_274"), minLength: 1 }],
                    playText: this.$$t("_273"),
                    playText2: this.$$t("_273_2"),
                    example: `<p>${this.$$t("_41")}：${this.$$t("_275")}</p>`,
                },
                前二组选复式: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_280"), minLength: 2 }],
                    playText: this.$$t("_278"),
                    playText2: this.$$t("_278_2"),
                    example: `<p>${this.$$t("_41")}：${this.$$t("_279")}</p>`,
                },
                定位胆: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 1,
                    ruleList: [
                        { name: this.$$t("_139"), minLength: 0 },
                        { name: this.$$t("_140"), minLength: 0 },
                        { name: this.$$t("_141"), minLength: 0 },
                        { name: this.$$t("_142"), minLength: 0 },
                        { name: this.$$t("_143"), minLength: 0 },
                    ],
                    playText: this.$$t("_281"),
                    playText2: this.$$t("_281_2"),
                    example: `<p>${this.$$t("_41")}：${this.$$t("_282")}，${this.$$t("openNumber")}：${this.$$t("_283")}</p>`,
                },
                后三一码: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 1 }],
                    playText: this.$$t("_284"),
                    playText2: this.$$t("_284_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_286"
                    )}</p>`,
                },
                中三一码: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 1 }],
                    playText: this.$$t("_287"),
                    playText2: this.$$t("_287_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_288"
                    )}</p>`,
                },
                前三一码: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 1 }],
                    playText: this.$$t("_289"),
                    playText2: this.$$t("_289_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_290"
                    )}</p>`,
                },
                后三二码: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 2 }],
                    playText: this.$$t("_291"),
                    playText2: this.$$t("_291_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：2,5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_292"
                    )}</p>`,
                },
                中三二码: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 2 }],
                    playText: this.$$t("_293"),
                    playText2: this.$$t("_293_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：2,5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_294"
                    )}</p>`,
                },
                前三二码: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 2 }],
                    playText: this.$$t("_295"),
                    playText2: this.$$t("_295_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：2,5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_296"
                    )}</p>`,
                },
                后四一码: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 1 }],
                    playText: this.$$t("_297"),
                    playText2: this.$$t("_297_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_298"
                    )}</p>`,
                },
                前四一码: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 1 }],
                    playText: this.$$t("_299"),
                    playText2: this.$$t("_299_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_300"
                    )}</p>`,
                },
                后四二码: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 2 }],
                    playText: this.$$t("_301"),
                    playText2: this.$$t("_301_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：2,5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_302"
                    )}</p>`,
                },
                前四二码: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 2 }],
                    playText: this.$$t("_303"),
                    playText2: this.$$t("_303_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：2,5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_304"
                    )}</p>`,
                },
                后四三码: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 3 }],
                    playText: this.$$t("_305"),
                    playText2: this.$$t("_305_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：2,3,5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_306"
                    )}</p>`,
                },
                前四三码: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 3 }],
                    playText: this.$$t("_307"),
                    playText2: this.$$t("_307_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：2,3,5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_308"
                    )}</p>`,
                },
                五星一码: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 1 }],
                    playText: this.$$t("_309"),
                    playText2: this.$$t("_309_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_310"
                    )}</p>`,
                },
                五星二码: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 2 }],
                    playText: this.$$t("_311"),
                    playText2: this.$$t("_311_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：2,5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_310"
                    )}</p>`,
                },
                五星三码: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 3 }],
                    playText: this.$$t("_312"),
                    playText2: this.$$t("_312_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_310"
                    )}</p>`,
                },
                五星四码: {
                    basicMoney: 1,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: '', minLength: 4 }],
                    playText: this.$$t("_313"),
                    playText2: this.$$t("_313_2"),
                    example: `<p class="mb-2">${this.$$t(
                        "_41"
                    )}：1,2,3,5</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_310"
                    )}</p>`,
                },
                一帆风顺: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_315"), minLength: 1 }],
                    playText: this.$$t("_314"),
                    playText2: this.$$t("_314_2"),
                    example: `<p>${this.$$t("_86")}：${this.$$t("_316")}</p>`,
                },
                好事成双: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_318"), minLength: 1 }],
                    playText: this.$$t("_317"),
                    playText2: this.$$t("_317_2"),
                    example: `<p>${this.$$t("_145")}：${this.$$t("_319")}</p>`,
                },
                三星报喜: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_321"), minLength: 1 }],
                    playText: this.$$t("_320"),
                    playText2: this.$$t("_320_2"),
                    example: `<p>${this.$$t("_147")}：${this.$$t("_322")}</p>`,
                },
                四季发财: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_324"), minLength: 1 }],
                    playText: this.$$t("_323"),
                    playText2: this.$$t("_323_2"),
                    example: `<p>${this.$$t("_148")}：${this.$$t("_325")}</p>`,
                },
                五谷丰登: {
                    basicMoney: 1,
                    calcAdd: true,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [{ name: this.$$t("_327"), minLength: 1 }],
                    playText: this.$$t("_326"),
                    playText2: this.$$t("_326_2"),
                    example: `<p>${this.$$t("_328")}：${this.$$t("_329")}</p>`,
                },
                任选二复式: {
                    basicMoney: 1,
                    anyCompose: true,
                    checkRepeat: false,
                    any: 2,
                    ruleList: [
                        { name: this.$$t("_139"), minLength: 0 },
                        { name: this.$$t("_140"), minLength: 0 },
                        { name: this.$$t("_141"), minLength: 0 },
                        { name: this.$$t("_142"), minLength: 0 },
                        { name: this.$$t("_143"), minLength: 0 },
                    ],
                    playText: this.$$t("_359"),
                    playText2: this.$$t("_359_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_360"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_361"
                    )}</p>`,
                },
                任选三复式: {
                    basicMoney: 1,
                    anyCompose: true,
                    checkRepeat: false,
                    any: 3,
                    ruleList: [
                        { name: this.$$t("_139"), minLength: 0 },
                        { name: this.$$t("_140"), minLength: 0 },
                        { name: this.$$t("_141"), minLength: 0 },
                        { name: this.$$t("_142"), minLength: 0 },
                        { name: this.$$t("_143"), minLength: 0 },
                    ],
                    playText: this.$$t("_362"),
                    playText2: this.$$t("_362_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_363"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_364"
                    )}</p>`,
                },
                任选四复式: {
                    basicMoney: 1,
                    anyCompose: true,
                    checkRepeat: false,
                    any: 4,
                    ruleList: [
                        { name: this.$$t("_139"), minLength: 0 },
                        { name: this.$$t("_140"), minLength: 0 },
                        { name: this.$$t("_141"), minLength: 0 },
                        { name: this.$$t("_142"), minLength: 0 },
                        { name: this.$$t("_143"), minLength: 0 },
                    ],
                    playText: this.$$t("_365"),
                    playText2: this.$$t("_365_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_366"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_367"
                    )}</p>`,
                },
                任选二组选: {
                    basicMoney: 1,
                    useBetList2Index: 0,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_371"), minLength: 2, special: 1 },
                        { name: this.$$t("_100"), minLength: 2, special: 0 },
                    ],
                    playText: this.$$t("_368"),
                    playText2: this.$$t("_368_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_369"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_370"
                    )}</p>`,
                },
                任选三组三: {
                    basicMoney: 2,
                    useBetList2Index: 0,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_371"), minLength: 3, special: 1 },
                        { name: this.$$t("_100"), minLength: 2, special: 0 },
                    ],
                    playText: this.$$t("_372"),
                    playText2: this.$$t("_372_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_373"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_374"
                    )}</p>`,
                },
                任选三组六: {
                    basicMoney: 1,
                    useBetList2Index: 0,
                    checkRepeat: false,
                    any: 0,
                    ruleList: [
                        { name: this.$$t("_371"), minLength: 3, special: 1 },
                        { name: this.$$t("_100"), minLength: 3, special: 0 },
                    ],
                    playText: this.$$t("_375"),
                    playText2: this.$$t("_375_2"),
                    example: `<p class="mb-2">${this.$$t("_41")}：${this.$$t(
                        "_376"
                    )}</p><p>${this.$$t("openNumber")}：${this.$$t(
                        "_377"
                    )}</p>`,
                },
      },
      betNumber: 0,
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
          text: this.$$t("_611"),
          icon: "chart-trending-o",
          code: "chart",
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

    // 注单金额是否合并
    isMake() {
      if (this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1 ) {
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
  },
  
  watch: {
    curDataKey(){
      this.pass = false
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
      if (v) this.onGetRecentResults();
    },
  },

  methods: {
    hadleSpan(_curDataKey){
      switch (_curDataKey) {
        case '龙虎':
          return '8'
        default:
          return '12'
      }
    },
    customOddsText(odd) {
      const odd_des = {
          五星组合: `,${odd * 10},${Math.floor(
              odd * 100
          )},${Math.floor(odd * 1000)},${Math.floor(odd * 10000)}
              `,
          后四组合: `,${odd * 10},${Math.floor(
              odd * 100
          )},${Math.floor(odd * 1000)}`,
          前四组合: `,${odd * 10},${Math.floor(
              odd * 100
          )},${Math.floor(odd * 1000)}`,
      };
      if (odd_des[this.curDataKey]) return odd_des[this.curDataKey]
      else return false
    },
    initBetList() {
    if (
        [
            "后三直选和值",
            "中三直选和值",
            "前三直选和值",
            "后二直选和值",
            "前二直选和值",
        ].includes(this.curDataKey)
    ) {
        const totalNum = Object.keys(
            this.curTypeList.customMoney
        ).length;
        const newBetList = [];
        for (let i = 0; i < totalNum; i += 1) {
            newBetList.push(i);
        }
        this.betList = newBetList;
        return;
    }
    this.betList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    },
    // handle_dt_color(nums, index){
    //   // '#5691d7' 藍
    //   // '#ff9726' 橘
    //   let pre = []
    //   const a1 = nums.split(',').map(Number)
    //   const a2 = nums.split(',').map(Number).reverse()
    //   for (let i = 0 ; i < 5 ; i ++){
    //     if (a1[i] > a2[i]) pre.push('#ff9726')
    //     if (a1[i] < a2[i]) pre.push('#5691d7')
    //   }
    //   return pre[index]
    // },
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

    onGetRecentResults(forceRefreshOnece) {
      if (!this.lottery || (this.rulesLists.length === 50 && !forceRefreshOnece)) {
        this.$refs.results_scroller.finishInfinite(true)
        return
      }
      let nums = this.rulesLists.length
      if (nums < 50) nums += 10
      this.rulesListsLoading = true;
      this.getCalcResult(this.lottery).then(data => this.calcResultList = data);
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
      if (this.loading) return;
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
              if (this.showResults){ this.onGetRecentResults(true); }
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

    onGetPlayType(e, newSelect) {
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
      // this.loading_status = false
      this.showProgress(false)
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
          if (this.activeTab === 'allBet') {
              // 官方玩法：默认为【定位胆】
              e = this.allBetItems.filter(t => t.dataKey === '定位胆')[0]
            }
          if (this.activeTab === 'baseBet') {
            // 传统玩法：默认为【两面盘】
            e = this.baseBetItems.filter(t => t.dataKey === '两面盘')[0]
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
          this.curDataKey = e.dataKey;
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

      if (this.betNumber < 1) {
        this.$error(this.$$t("repeat"));
        return;
      }

      let typeCode = this.current_lottery;

      // if (!this.betNumber) {
      //   this.$info(this.$$t("repeat"));
      //   return;
      // }

        let b = this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1 ? 
        // 多注单分开
        this.betContents.map((e) => {
          return {
            betContent: e.betContent,
            money:this.money,
            playType: e.playType,
            singMoney: this.money,
          };
        })
        :
        // 多注单合并
        [{
          betContent: this.betItems,
          money: this.betMoney,
          playType: this.playType_items[0].playType
        }]

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
        // 送出前个别处理
				const specialHandleType = ['任选二组选', '任选三组三', '任选三组六']
        if (specialHandleType.indexOf(b[0].playType)>-1){
						// special: 字串替换
						const prev = this.curSpecialSelected.join()
						let lastString = b[0].betContent.substr(b[0].betContent.indexOf('|'))
						p.betContent[0].betContent = prev + lastString
					}
        this.$sessionSet("js-Date", p);
        this.$sessionSet("current_lottery", typeCode);
      } else {
        this.$store.commit("setPageTitle", this.resultItem.lotteryName);
        sessionStorage.setItem("isMake", this.isMake);
        sessionStorage.setItem("betNumber", this.betNumber);
        this.$sessionSet("bet-items", this.playType_items);
        this.$sessionSet("baseBet-data", p);
        this.$sessionSet("special-baseBet-data", this.curSpecialSelected);
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

    initCurSelected() {
        if (this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1) return
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
        if (this.curSelected.length < this.playType_items.length){
          if (this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1 ){
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
            )
            if (specialVal){
              this.curSpecialSelected.push(specialVal)
            }
        } else {
            const cloneList = [...this.curSelected[betItemIndex]];
            cloneList.splice(valueIndex, 1);
            this.$set(this.curSelected, betItemIndex, cloneList);
            if (specialVal){
              this.curSpecialSelected.splice(valueIndex, 1);
            }
        }
        this.handleSent();
    },

        handleSent() {
          const curPlayType = this.playType_items[0];
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
          
          this.betItems = betItems
          // 注数
          this.betNumber = this.simpleBetNumDataKey.indexOf(this.curDataKey) > -1 ? timesNum : timesNum * this.curTypeList.basicMoney
          // 是否通过验证
          this.pass = minCheckPass && repeatCheckPass
          
          // this.$emit("sentBetPayloadNoFilter", {
          //     betItems: betItems,
          //     playType: curPlayType.playType,
          //     playTypeName: curPlayType.playTypeName,
          //     odds: curPlayType.lotteryBetContent[0].odds,
          //     timesNum: timesNum * this.curTypeList.basicMoney,
          //     pass: minCheckPass && repeatCheckPass,
          //     moneyCalcType: "commonType1",
          // });
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

    setBetContent(item, playType, fastSelectArray) {
      if (this.isSeal || this.isDisabled) return;
      // if (noFilter) this.betContents = [];
      let t = playType;
      let e = null;

      if (fastSelectArray){
        this.betContents = []
        if (fastSelectArray.length > 0) {
          for (let item2 of fastSelectArray) {
            this.betContents.push({
                playType: t,
                betContent: item2 + '',
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

      this.betNumber = this.betContents.length
      if (this.betNumber >0) this.pass = true
      else this.pass = false
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
      if (!this.allBetItems.length) return;
      this.showpays = !this.showpays;
    },

    onSelect(c) {
      this.showPopover = false;

      if (c.code === 'chart') {
        return this.$router.push('LotteryTrend');
      }

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
        this.activeTab = 'allBet'
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

    if (this.curDataKey === '万仟和尾数'|| this.curDataKey === '拾个和尾数') {
      this.setBetContent('',this.curDataKey, this.curSelected[0])
      return
    }
    this.handleSent();
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

      if (this.resultItem.lotteryType === 'azxy5') {
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
#ssc {
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
    top: 58px;
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
.ssc-num-box {
  padding-top: 1px;
  color: #fff;
  text-align: center !important;
  font-size: 20px;
  font-weight: 700;
  border-radius: 50%;
  line-height: 24px;
  min-width: 24px;
  max-height: 24px;
  margin-right: 4px !important;
  background: linear-gradient(to left, rgba(66, 101, 241, 0.7), rgba(100, 150, 251, 0.7)) !important;
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
  .resultsTab {
    height: 60px;
    align-items: center;
    justify-content: space-around;
    .btn {
      min-width: 158px;
      font-size: 14px;
      color: #666;
      padding: 3px 14px;
      border-radius: 20px;
      border: 1px solid #999;
      background: #f1f1f1;
    }
    .active {
      color: #fff;
      background: #749cf8;
    }
  }
  .rank-content {
    padding: 5px;
    font-size: 14px;
    .rank-item {
      border-bottom: solid 1px #efefef;
      min-height: 32px;
      .text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 80%;
        margin: 0 auto;
      }
    }

    .rank-item-d-bg {
      background-color: #f8f8f8;
    }

    .item-name {
      display: flex;
      align-items: center;
      padding: 5px 0;
    }

    .item-type {
      color: #e5233f;
      white-space: nowrap;
      padding: 0 5px;
      display: flex;
      align-items: center;
    }

    .item-date {
      white-space: nowrap;
    }
  }
</style>
