<template>
  <div id="lotteryTrend">
    <van-nav-bar
      left-arrow
      border
      class="navbar"
      @click-left="() => this.$router.back()"
    >
      <template #title>
        <div class="white-text" @click="() => (menu = !menu)">
          <span class="mr-1">{{ currentTitle }}-{{ currentRangeTitle }}</span>
          <van-icon
            :name="menu ? 'arrow-up' : 'arrow-down'"
            size="14"
            color="white"
          />
        </div>
      </template>
    </van-nav-bar>

    <van-popup
      v-model="menu"
      position="top"
      :style="{ height: '100%' }"
      get-container="#lotteryTrend"
      :overlay="false"
      class="menu"
    >
      <div class="lotteries flex flex-wrap">
        <div
          v-for="(item, i) in lotteries"
          :key="i"
          span="8"
          class="lottery-item"
          :class="{ 'lottery-item-active': lottery === item.type }"
          @click="selectLottery(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <van-divider />
      <div class="setting lotteries flex flex-wrap">
        <div
          v-for="(item, i) in settingData"
          :key="i"
          span="8"
          class="lottery-item"
          :class="{ 'lottery-item-active': datesNum === item.key }"
          @click="selectRange(item.key)"
        >
          {{ item.name }}
        </div>
      </div>
    </van-popup>

    <van-tabs
      v-model="active_tabIndex"
      color="rgb(64, 128, 255)"
      title-active-color="#4080ff"
    >
      <van-tab v-for="(t, i) in tabs" :key="i" :title="t" :disabled="loading" />
    </van-tabs>

    <!-- 第一行 -->
    <table>
      <tr class="deep-bg-color">
        <td>{{ $t("lottery.datesNumber") }}</td>
        <td v-for="num in 10" :key="num">{{ num - 1 }}</td>
      </tr>
    </table>

    <div class="table-box">
        <table id="trend-table" :key="trendUpdateKey">
          <tr
            v-for="(item, i) in recentResultsList"
            :key="i"
            :class="[
              {
                'deep-bg-color': i % 2 !== 0,
                'showTotal-bg-color': i > recentResultsList.length - 5,
              },
            ]"
          >
            <!-- 表格第一行共用标题 -->
            <td v-if="item.dates">{{ item.dates }}</td>

            <!-- 数字区 -->
            <template
              v-if="item.calcMaxMissNum && item.calcMaxMissNum[active_tabIndex]"
            >
              <td
                v-for="(num, i2) in item.calcMaxMissNum[active_tabIndex]"
                :key="i2"
              >
                <!-- 显示遗漏 -->
                <span v-if="num !== -1">{{ num }}</span>
                <!-- 中奖号码 -->
                <span v-else :id="item.dates" ref="trend-num-1">
                  <div class="trend-active trend-active-1">{{ i2 }}</div>
                </span>
              </td>
            </template>

            <!-- 统计区 -->
            <template v-if="item.showTotal && item.showTotal[active_tabIndex]">
              <td
                v-for="(num, i3) in item.showTotal[active_tabIndex]"
                :key="i3"
              >
                <span v-if="item.key === 'show'">{{ num }}</span>
                <span v-else-if="item.key === 'average'">
                  {{ num > 0 ? ((datesNum - num) / num).toFixed(0) : 0 }}
                </span>
                <span v-else-if="item.key === 'max'">{{ num }}</span>
                <span v-else>{{ num }}</span>
              </td>
            </template>
          </tr>
        </table>
    </div>

    <van-loading v-if="loading" class="loading" type="spinner" size="22" />
  </div>
</template>

<script>
import lottery from "@/mixins/lottery";

export default {
  name: "LotteryTrend",
  mixins: [lottery],
  data: () => ({
    bigType: "SSC",
    loading: false,
    menu: false,
    lottery: "", // 彩种code代号
    datesNum: "20", // 选择的期数
    lotteries: [],
    recentResultsList: [],
    trendUpdateKey: 0,
    isShowGraph: true,
    isShowNum: true,
    trendLotteryList: [],
    activeTrend: "all",
    activeTrendLottery: "",
    active_tabIndex: 0,
    curDates: 0, // 当前期数 || 准备开讲期数
    timer_getRecentResults: null,
    timer_getCurrentDatesData: null,
  }),

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.custom_clearTimeout();
  },

  computed: {
    tabs() {
      return [
        this.$$t("_139"),
        this.$$t("_140"),
        this.$$t("_141"),
        this.$$t("_142"),
        this.$$t("_143"),
      ];
    },
    settingData() {
      return [
        { name: this.$$t("_612"), key: "20" },
        { name: this.$$t("_613"), key: "30" },
        { name: this.$$t("_614"), key: "50" },
      ];
    },
    currentTitle() {
      const target = this.lotteries.find((t) => t.type === this.lottery);
      return (target && target.name) || "";
    },
    currentRangeTitle() {
      const target = this.settingData.find((t) => t.key === this.datesNum);
      return (target && target.name) || "";
    },
  },

  watch: {
    recentResultsList() {
      this.trendUpdateKey += 1;
      this.showGraph();
    },
    active_tabIndex() {
      this.trendUpdateKey += 1;
      this.showGraph();
    },
  },

  methods: {
    async init() {
      this.loading = true;
      this.lottery = sessionStorage.getItem("gameCode_item");
      if (!this.lotteries.length) {
        await this.getLotteryitems();
      }
      await this.getRecentResults(this.lottery, this.datesNum).then((data) => {
        if (
          this.trendUpdateKey !== 0 &&
          Number(data[0].dates) !== this.curDates
        ) {
          this.timer_getRecentResults = setTimeout(() => {
            this.init();
          }, 3000);
        } else {
          this.maker(data);
          this.loading = false;
          this.showGraph();
          this.handleLotteryRefresh();
        }
      });
    },
    // 定时刷新
    handleLotteryRefresh() {
      this.getCurrentDatesData(this.lottery).then((data) => {
        const { secondsRemaining } = data;
        this.timer_getCurrentDatesData = setTimeout(() => {
          this.getCurrentDatesData(this.lottery).then((data) => {
            const { lastNo } = data;
            this.curDates = Number(lastNo);
            this.init();
          });
        }, Number(secondsRemaining) * 1000 + 10000);
      });
    },
    getLotteryitems() {
      const data = JSON.parse(
        sessionStorage.getItem("gameCategoryLotteryGroup")
      );
      this.lotteries = data.find((t) => t.type === this.bigType).lotteries;
    },
    selectLottery(data) {
      this.custom_clearTimeout();
      sessionStorage.setItem("gameCode_item", data.type);
      this.init();
      this.menu = false;
    },
    selectRange(datesNum) {
      this.custom_clearTimeout();
      this.datesNum = datesNum;
      this.init();
      this.menu = false;
    },
    custom_clearTimeout() {
      clearTimeout(this.timer_getRecentResults);
      clearTimeout(this.timer_getCurrentDatesData);
      this.timer_getRecentResults = null;
      this.timer_getCurrentDatesData = null;
      this.trendUpdateKey = 0;
    },
    maker(data) {
      const showTotal = [];
      let prePosList = [];
      const maxLinkTotal = [];
      const stashMaxLinkTotal = [];
      const maxMissTotal = [];
      const stashMaxMissTotal = [];

      const calcMaxMissNum = [];

      for (let i = 0; i < 5; i += 1) {
        showTotal.push([]);
        maxLinkTotal.push([]);
        stashMaxLinkTotal.push([]);
        maxMissTotal.push([]);
        stashMaxMissTotal.push([]);
        for (let j = 0; j < 10; j += 1) {
          showTotal[i].push(0);
          maxLinkTotal[i].push(0);
          stashMaxLinkTotal[i].push(0);
          maxMissTotal[i].push(0);
          stashMaxMissTotal[i].push(0);
        }
      }

      for (let i = 0; i < data.length; i += 1) {
        calcMaxMissNum.push([]);
        for (let j = 0; j < 5; j += 1) {
          calcMaxMissNum[i].push([]);
          for (let k = 0; k < 10; k += 1) {
            calcMaxMissNum[i][j].push(0);
          }
        }
      }

      const newData = data.map((item, i) => {
        const numResult = item.num.split(",");
        if (i === 0) {
          prePosList = numResult;
        }
        numResult.forEach((r, index) => {
          showTotal[index][r] += 1;

          if (r === prePosList[index]) {
            stashMaxLinkTotal[index][r] += 1;

            if (stashMaxLinkTotal[index][r] > maxLinkTotal[index][r]) {
              maxLinkTotal[index][r] = stashMaxLinkTotal[index][r];
            }
          } else {
            maxLinkTotal[index][r] =
              maxLinkTotal[index][r] > 1 ? maxLinkTotal[index][r] : 1;
            stashMaxLinkTotal[index][r] = 1;
          }

          stashMaxMissTotal[index].forEach((maxMiss, missIndex) => {
            if (+r === missIndex) {
              stashMaxMissTotal[index][missIndex] = 0;
              return;
            }

            stashMaxMissTotal[index][missIndex] += 1;

            if (
              stashMaxMissTotal[index][missIndex] >
              maxMissTotal[index][missIndex]
            ) {
              maxMissTotal[index][missIndex] =
                stashMaxMissTotal[index][missIndex];
            }
          });

          calcMaxMissNum[i][index].forEach((maxMiss, missIndex) => {
            if (+r === missIndex) {
              calcMaxMissNum[i][index][missIndex] = -1;
              return;
            }

            if (i === 0) {
              calcMaxMissNum[i][index][missIndex] = 1;
              return;
            }

            if (calcMaxMissNum[i - 1][index][missIndex] === -1) {
              calcMaxMissNum[i][index][missIndex] = 1;
              return;
            }
            calcMaxMissNum[i][index][missIndex] =
              calcMaxMissNum[i - 1][index][missIndex] + 1;
          });
        });

        prePosList = numResult;

        return {
          ...item,
          calcMaxMissNum: calcMaxMissNum[i],
        };
      });
      this.recentResultsList = [
        ...newData,
        { dates: this.$$t("_621"), key: "show", showTotal },
        { dates: this.$$t("_622"), key: "average", showTotal },
        { dates: this.$$t("_623"), key: "max", showTotal: [...maxMissTotal] },
        { dates: this.$$t("_624"), key: "link", showTotal: [...maxLinkTotal] },
      ];
    },

    showGraph() {
      if (!this.isShowGraph) {
        this.trendUpdateKey += 1;
        return;
      }

      this.$nextTick(() => {
        const allActiveList1 = this.$refs["trend-num-1"];

        for (let i = 0; i < allActiveList1.length - 1; i += 1) {
          allActiveList1[i].innerHTML = this.drawLine(
            allActiveList1[i],
            allActiveList1[i + 1],
            allActiveList1[i].textContent,
            1
          );
        }
      });
    },

    drawLine(startObj, endObj, text, type) {
      // console.log(startObj, endObj, text, type);
      const container = document.getElementById("trend-table");

      const y_start =
        Number(startObj.getBoundingClientRect().top) -
        Number(container.getBoundingClientRect().top) +
        startObj.getBoundingClientRect().height / 2;
      const x_start =
        Number(startObj.getBoundingClientRect().left) -
        Number(container.getBoundingClientRect().left) +
        startObj.getBoundingClientRect().width / 2;

      const y_end =
        Number(endObj.getBoundingClientRect().top) -
        Number(container.getBoundingClientRect().top) +
        endObj.getBoundingClientRect().height / 2;
      const x_end =
        Number(endObj.getBoundingClientRect().left) -
        Number(container.getBoundingClientRect().left) +
        endObj.getBoundingClientRect().width / 2;

      const lx = x_end - x_start;
      const ly = y_end - y_start;
      const length = Math.sqrt(lx * lx + ly * ly);
      const c = (360 * Math.atan2(ly, lx)) / (2 * Math.PI);

      const top = 0;
      const midX = (x_end + x_start) / 2 - 5;
      const midY = (y_end + y_start) / 2 - top;
      const deg = c <= -90 ? 360 + c : c;

      let color = "";
      switch (type) {
        case 1:
          color = "#ac2330";
          break;
        case 2:
          color = "#207fab";
          break;
        case 3:
          color = "#ff6e0e";
          break;
        case 4:
          color = "#8a0f9c";
          break;
        case 5:
          color = "#0f9c33";
          break;
        default:
          break;
      }

      return `<div class="trend-active trend-active-${type}">${text}</div><div style='position:absolute; background: ${color}; height:1px; z-index: 1; top:${midY}px;left:${midX -
        length / 2}px;width:${length}px;transform:rotate(${deg}deg);'></div>`;
    },

    $$t(v, p) {
      return this.$t("pk10." + v, p);
    },
  },
};
</script>

<style lang="less">
#lotteryTrend {
  .navbar {
    background: #4582fa;
    color: white !important;
    .van-icon {
      color: white !important;
    }
    .van-icon-arrow-left {
      font-size: 22px;
    }
  }
  .van-tabs {
    height: 31px;
    .van-tabs__nav,
    .van-tabs__wrap {
      height: 31px;
    }
  }
}
</style>
<style lang="less" scoped>
#lotteryTrend {
  .menu {
    top: 46px !important;
    .lotteries {
      padding: 10px;
      .lottery-item {
        width: 110px;
        height: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.15rem;
        // padding: 0.16rem;
        margin: 4px;
        background-color: #f5f5f9;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &-active {
          background-color: rgb(223, 236, 255) !important;
          color: rgb(82, 149, 253) !important;
        }
      }
    }
  }

  .table-box {
    position: absolute;
    top: 108px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
  }

  table {
    color: #666;
    font-weight: 500;
    background-color: white;
    table-layout: fixed !important;
    width: 100% !important;
    border-collapse: collapse;
    border: none;
    font-size: 12px;
    background-color: white;

    .deep-bg-color {
      background-color: #efece5;
    }

    .showTotal-bg-color {
      background-color: #f0fff1;
    }

    th {
      padding-top: 4px;
      padding-bottom: 4px;
      height: 40px;
    }

    td {
      height: 31px;
      padding: 14px 12px;
    }

    td,
    th {
      white-space: nowrap;
      border: solid rgb(238, 238, 238) 1px;
      text-align: center;
      white-space: pre-line;
      word-break: break-word !important;
      word-wrap: break-word !important;
      display: table-cell;
      vertical-align: middle !important;
      white-space: normal !important;
      vertical-align: text-top;
      padding: 2px 2px 0 2px;
      display: table-cell;
    }
    /deep/.trend-active {
      border-radius: 50%;
      color: #fff;
      position: relative;
      width: 18px;
      height: 18px;
      line-height: 18px;
      // margin: 0 auto;
      z-index: 2;
    }

    /deep/.trend-active-1 {
      background: #ac2330;
    }
    /deep/.trend-active-2 {
      background: #207fab;
    }
    /deep/.trend-active-3 {
      background: #ff6e0e;
    }
    /deep/.trend-active-4 {
      background: #8a0f9c;
    }
    /deep/.trend-active-5 {
      background: #0f9c33;
    }
  }
  .loading {
    position: absolute;
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
