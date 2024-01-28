<template>
  <div id="sscsimpleTab">
      <scroller>
          <div class="title-wrap">
              <span class="sscsimple-title">球数玩法</span>
          </div>
          <div class="play-wrap">
              <div class="play-item">
                  <div class="play-title">更快更便捷→</div>
                  <div class="play-btn" @click="entryPlay('号码快投')">
                      号码快投
                  </div> 
              </div>
              <div
                  v-for="(item, index) in list"
                  :key="item.key1 + item.key2"
                  class="play-item"
              >
                  <div class="play-title">{{ item.name }}</div>
                  <div class="play-btn" @click="entryPlay('号码', index + 1)">
                      号码
                  </div>
                  <div class="play-btn" @click="entryPlay('单双', index + 1)">
                      单双
                  </div>
                  <div class="play-btn" @click="entryPlay('大小', index + 1)">
                      大小
                  </div>
              </div>
          </div>
          <div class="title-wrap">
              <span class="sscsimple-title">总和玩法</span>
          </div>
          <div class="play-wrap">
              <div class="play-item">
                  <div class="play-btn" @click="entryPlay('总和单双')">
                      总和单双
                  </div>
                  <div style="color: #585858; margin: 0 5px">|</div>
                  <div class="play-btn" @click="entryPlay('总和大小')">
                      总和大小
                  </div>
                  <div style="color: #585858; margin: 0 5px">|</div>
                  <div class="play-btn" @click="entryPlay('龙虎和')">
                      龙虎和
                  </div>
              </div>
          </div>
          <div class="title-wrap">
              <span class="sscsimple-title">特殊玩法</span>
          </div>
          <div class="play-wrap">
              <div class="play-item">
                  <div class="play-btn" @click="entryPlay('前三')">前三</div>
                  <div style="color: #585858; margin: 0 5px">|</div>
                  <div class="play-btn" @click="entryPlay('中三')">中三</div>
                  <div style="color: #585858; margin: 0 5px">|</div>
                  <div class="play-btn" @click="entryPlay('后三')">后三</div>
              </div>
          </div>
          <div class="title-wrap">
              <span class="sscsimple-title">连码投注</span>
          </div>
          <div class="play-wrap">
              <div class="play-item">
                  <div class="play-btn" @click="entryPlay('连码后二')">
                      连码后二
                  </div>
                  <div style="color: #585858; margin: 0 5px">|</div>
                  <div class="play-btn" @click="entryPlay('连码后三')">
                      连码后三
                  </div>
                  <div style="color: #585858; margin: 0 5px">|</div>
                  <div class="play-btn" @click="entryPlay('连码后四')">
                      连码后四
                  </div>
              </div>
          </div>
          <div class="title-wrap">
              <span class="sscsimple-title">牛牛与梭哈</span>
          </div>
          <div class="play-wrap">
              <div class="play-item">
                  <div class="play-btn" @click="entryPlay('牛牛双面')">
                      牛牛双面
                  </div>
                  <div style="color: #585858; margin: 0 5px">|</div>
                  <div class="play-btn" @click="entryPlay('牛牛玩法')">
                      牛牛玩法
                  </div>
                  <div style="color: #585858; margin: 0 5px">|</div>
                  <div class="play-btn" @click="entryPlay('梭哈玩法')">
                      梭哈玩法
                  </div>
              </div>
          </div>
          <div class="title-wrap">
              <span class="sscsimple-title">五星玩法</span>
          </div>
          <div class="play-wrap">
              <div class="play-item">
                  <div class="play-btn" @click="entryPlay('五星直选')">
                      五星直选
                  </div>
                  <div style="color: #585858; margin: 0 5px">|</div>
                  <div class="play-btn" @click="entryPlay('五星通选')">
                      五星通选
                  </div>
              </div>
          </div>
          <div style="height: 88px; width: 100%;"></div>
    </scroller>
  </div>
</template>

<script>
export default {
  name: "SSCsimpleBetTabContent",
  data() {
      return {
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

  methods: {
      entryPlay(type, num) {
          // document.getElementById("pk10-wrap").scrollTop = 0;
        //   this.curPlay = type;
        //   this.curNum = num || 0;
        //   this.step = 2;
        //   this.initCurSelected();
          const name =  num ? `第${num}球-${type}` : type
          this.$emit('hidePopGameMenu', name)
          this.$router.push({
            path: 'sscSimple',
            query: {
                name,
                type,
                num
            }
        })
      }
  }
};
</script>

<style lang="scss">
#sscsimpleTab {
    position: absolute;
    top: 44px;
    width: 100%;
    height: calc(100vh - 95px);

  .title-wrap {
      text-align: center;
      position: relative;
      height: 35px;
      margin: 12px 0 10px 0;

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

  .sscsimple-title {
      padding: 5px 20px;
      border-radius: 19px 88px 19px 88px;
      background: #5a9ae7;
      color: #ffffff;
      font-size: 18px;
      font-weight: 700;
      position: relative;
      z-index: 2;
  }

  .play-wrap {
      padding: 0 10px;
  }

  .play-item {
      display: flex;
      align-items: center;
      font-size: 18px;
      margin: 3px 0;
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
      padding: 0 3px;
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
      border-radius: 4px;
      background: #fff;
  }
}
</style>