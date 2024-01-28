<template>
  <div>
    <div v-if="current_lottery !== 'sum' && activeTab === 'allBet'" class="text-left">
      <div class="tool-pl mb-1 px-3 caption">
        {{ $t("betDetails.odds") }}:
        <span class="main-text">{{
          playType && playType.lotteryBetContent[0].odds
        }}</span>
      </div>
      <br />

      <div
        class="tool-pl mb-1 px-3 caption text-grey"
        @click="$emit('hadleShowWF')"
      >
        <van-icon name="question-o" size="12" class="mr-1" />{{
          $$t_pk10("wfsm")
        }}
      </div>

      <div v-for="(p, index) in curTypes" :key="index">
        <div class="flex align-items-center space-between">
          <div class="subtitle-3 ball-tle">{{ $$t(p) }}</div>
        </div>

        <div class="mt-3 text-center px-4">
          <van-row gutter="6">
            <template v-for="(bet, i) in btnDisplay[index]">
              <van-col :span="bet.length > 2 ? 8 : 6" :key="i" class="mb-3">
                <div
                  class="ball-num ball-num-k3"
                  :class="{
                    current_active: curSelected[index] && curSelected[index].indexOf(i+1) > -1,
                  }"
                  @click="selectBet(i+1, index)"
                >
                  <div
                    class="flex align-items-center justify-content-center pa-2"
                  >
                    <template v-for="(item, i) in bet.split('')">
                      <van-image
                        :key="i"
                        v-if="!isNaN(item)"
                        :src="`/images/lottery/sicBo/${item}.png`"
                        width="34"
                        height="34"
                      />
                      <h1 v-else class="mx-2" :key="i">{{ item }}</h1>
                    </template>
                  </div>
                </div>
              </van-col>
            </template>
          </van-row>
        </div>
      </div>
    </div>
    <div v-else class="text-left pr-4">
      <div
        class="tool-pl mb-1 px-3 caption text-grey"
        v-if="activeTab === 'allBet' && playType.playType !== 'Sum'"
        @click="$emit('hadleShowWF')"
      >
        <van-icon name="question-o" size="12" class="mr-1" />
        {{$$t_pk10("wfsm")}}
      </div><br/>
      <div class="subtitle-3 ball-tle">{{ playType.playTypeName }}</div>
      <div class="mt-3 text-center pl-4">
        <van-row gutter="6">
          <template v-for="(bet, index) in playType.lotteryBetContent">
            <van-col
              span="6"
              :key="index"
              class="mb-3"
            >
              <div
                class="ball-num ball-num-k3 ball-square"
                :class="{
                  current_active: getActive(bet.betContent, playType.playType),
                }"
                @click="setBetContent(bet.betContent, playType.playType, 'k3')"
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
  </div>
</template>

<script>
export default {
  name: "K3Comp1",
  props: ["playType", "current_lottery","betContents", "clearSignal", "activeTab"],
  data(){
    return {
      curSelected: {
        0: [],
        1: []
      },
    }
  },

  watch:{
    betContents(v){
      if (!v.length) this.curSelected = {}
    }
  },

  computed: {
    curTypes() {
      if (this.playType.playType === "twoSameNums_standard") {
        return ["_98", "_99"];
      } else if (this.playType.playType === "twoSameNums_any") {
        return ["_98"];
      } else if (this.playType.playType === "twoDiffNums_danTuo") {
        return ["_108", "_109"];
      } else {
        return ["_100"];
      }
    },
    btnDisplay() {
      const map = {
        twoSameNums_standard: [
          ["11", "22", "33", "44", "55", "66"],
          ["1", "2", "3", "4", "5", "6"],
        ],
        twoSameNums_any: [["11*", "22*", "33*", "44*", "55*", "66*"]],
        threeContinuousNums_any: [["123", "234", "345", "456"]],
        threeSameNums_choose1: [["111", "222", "333", "444", "555", "666"]],
        threeSameNums_any: [["111", "222", "333", "444", "555", "666"]],
        twoDiffNums_danTuo: [["1", "2", "3", "4", "5", "6"],["1", "2", "3", "4", "5", "6"]],
        normal: [["1", "2", "3", "4", "5", "6"]],
      };
      const btnHasSpecial = [
        "twoSameNums_standard",
        "twoSameNums_any",
        "threeContinuousNums_any",
        "threeSameNums_choose1",
        "threeSameNums_any",
        "twoDiffNums_danTuo"
      ];
      let selecter =
        btnHasSpecial.indexOf(this.playType.playType) > -1
          ? this.playType.playType
          : "normal";
      return map[selecter];
    },
  },

  methods: {
    selectBet(v, type){
      if (!Object.keys(this.curSelected).length) {
        this.curSelected = {
          0: [],
          1: []
        }
      }
      let pre_betcontent = ''
      // 特殊玩法处理：三连号 三同号通选
      const needSpecialHandle = ['threeContinuousNums_any','threeSameNums_any']
      const findSpecial = needSpecialHandle.indexOf(this.current_lottery)
      if (findSpecial > -1 ){
        if (findSpecial === 0) this.curSelected[0] = this.curSelected[0].length ? [] : [1,2,3,4]
        if (findSpecial === 1) this.curSelected[0] = this.curSelected[0].length ? [] : [1,2,3,4,5,6]
      } else {
        let pre = this.curSelected[type].indexOf(v)
        if (pre> -1) this.curSelected[type].splice(pre,1)
        if (pre === -1) {
          let pre = this.curSelected
          // 检查别的位置有无相同,相同就删除
          if (type === 0) {
            if (this.current_lottery === 'twoDiffNums_danTuo') pre[0] = []
            const checkIndex = pre[1].indexOf(v)
            if (checkIndex > -1) pre[1].splice(checkIndex,1)
          } else {
            const checkIndex = pre[0].indexOf(v)
            if (checkIndex > -1) pre[0].splice(checkIndex,1)
          }
          // 排序
          pre[type].push(v)
          pre[type].map(Number)
          pre[type].sort((a,b) => a-b)
          this.curSelected = pre
          }
      }
      // betcontent 处理
      if (this.current_lottery === 'threeContinuousNums_any' && this.curSelected[0].length){
        // 三连号通选
        pre_betcontent = '123,234,345,456'
      } else if (this.current_lottery === 'threeSameNums_any' && this.curSelected[0].length){
        // 三同号通选
        pre_betcontent = '111,222,333,444,555,666'
      } else {
        pre_betcontent = this.curSelected[1].length > 0 ? this.curSelected[0].join() + '|' + this.curSelected[1].join() : this.curSelected[0].join()
      }
      this.$emit('setBetContent',pre_betcontent, this.current_lottery, null, true)
      this.handleBetNumber(pre_betcontent)
    },
    handleBetNumber(pre_betcontent){
      let pre_number = this.curSelected[1].length > 0 ? 
        this.curSelected[0].length * this.curSelected[1].length :
        this.curSelected[0].length

      let dataKey = this.current_lottery
      // rules
      // K3 : 二不同号_标准选号
      if (dataKey === 'twoDiffNums_standard'){
        if (pre_betcontent.length < 3) {
          pre_number = 0
        }
      }
      // K3 : 三不同
      if (dataKey === 'threeDiffNums_standard'){
        if (pre_betcontent.length < 4) {
          pre_number = 0
        }
      }
      // K3 : 二不同号_标准选号 二不同号_胆拖选号
      if (dataKey === 'twoSameNums_standard' || dataKey === 'twoDiffNums_danTuo'){
        if (pre_betcontent.indexOf('|') < 0) {
          pre_number = 0
        }
        if (pre_betcontent.split('|').indexOf('') > -1 ) {
          pre_number = 0
        }
      }

      // 计算组合数(注数)
      if (dataKey === 'twoDiffNums_standard') pre_number = this.getCount(pre_betcontent, 'two')
      if (dataKey === 'threeDiffNums_standard') pre_number = this.getCount(pre_betcontent, 'three')
      if (dataKey === 'threeContinuousNums_any') pre_number = pre_number ? 1 : 0
      if (dataKey === 'threeSameNums_any') pre_number = pre_number ? 1 : 0

      this.$emit('handleBetNumber', pre_number)
    },

    getCount(betContent, loopCount){
       let pre = {
        two: 0,
        three: 0
      }
      const array = betContent.split(',').map(Number)
      for (let i = 0 ,len1 = array.length; i < len1; i ++) {
        let a2 = array.concat()
        a2.splice(0, i + 1)
        for(let j = 0 ,len2 = a2.length; j < len2; j ++){
          pre.two += 1
          let a3 = a2.concat()
          a3.splice(0, j + 1)
          for(let k = 0 ,len3 = a3.length; k < len3; k ++){
            pre.three += 1
          }
        }
      }
      // 返回总金额
      return pre[loopCount]
    },

    getActive(item, playType, code) {
      let type = playType
      let e = null
      if (code) e = this.betContents.filter(e => e.playType === type && e.betContent === item && e.code === code)
      else e = this.betContents.filter(e => e.playType === type && e.betContent === item)
      if (e.length > 0) return true
      else return false
    },

    setBetContent(item, playType, code){
      this.$emit('setBetContent',item, playType, code)
    },

    $$t_lottery(v) {
      return this.$t("lottery." + v);
    },

    $$t_pk10(v) {
      return this.$t("pk10." + v);
    },

    $$t(v) {
      return this.$t("k3." + v);
    },
  },
};
</script>

<style lang="scss">
#pk10 .bet_center .ball-num-k3 {
  // display: flex !important;
  // align-items: center;
  // justify-content: center;
  width: 100% !important;
  border-radius: 7px !important;
}
</style>