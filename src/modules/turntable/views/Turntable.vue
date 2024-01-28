<template>
  <div id="turntable">
    <div class="view-background">
      <div class="view-background-flex">
        <div class="view-background-flex-top"></div>
        <div class="view-background-flex-bottom"></div>
      </div>
    </div>

    <scroller>
      <div class="warps pt-5 px-4 pb-10">
        <div class="title">{{$$t('title')}}</div>
        <div class="number_text caption red-text">{{$$t('dayFreeTimes', {number: dayFreeTimes})}}</div>
        <div class="mt-7">
          <lucky-wheel class="luck-draw"
                       ref="LuckyWheel"
                       width="9.1467rem"
                       height="9.1467rem"
                       :blocks="blocks"
                       :prizes="prizes"
                       :buttons="buttons"
                       :default-style="defaultStyle"
                       :default-config="defaultConfig"
                       @start="onTurntable"
                       @end="endCallBack" />
        </div>

        <div class="rules px-6">
          <div class="rules_title headline">{{$$t('rules')}}</div>
          <div class="mt-6 body-2 text-left text-grey">
            <div v-html="item && item.rule"></div>
          </div>
        </div>
      </div>
    </scroller>

    <van-popup v-model="showPopup" :close-on-click-overlay="false">
      <div class="gift px-5">
        <div class="title pt-4">{{giftType===2? $$t('giftType_2') : $$t('giftType_1')}}</div>

        <div class="gift_img mt-2" v-if="giftType === 0 || giftType === 1">
          <div v-if="giftType === 0">
            <van-image src="/images/turntable/money_bg.png" width="110px" height="110px" class="gift_img_center"/>
            <div class="money_text">{{gift_0 && gift_0.money}}</div>
            <van-image src="/images/turntable/gift_img_b.png" class="gift_img_b"/>
          </div>

          <div v-else-if="giftType === 1">
            <van-image :src="gift_1 && gift_1.giftImg" width="110px" height="110px" class="gift_img_center"/>
            <van-image src="/images/turntable/gift_img_b.png" class="gift_img_b"/>
          </div>
        </div>

        <div style="margin-top: 50px;" v-else>
          <van-image src="/images/turntable/gift_2.png" width="80px" height="80px"/>
        </div>

        <div v-if="giftType === 0">
          <div class="caption-bold mt-2">{{$$t('won')}}<span class="caption red-text">{{gift_0 && gift_0.money}}</span>{{$$t('won_1')}}</div>
          <div class="caption-bold mt-2">{{$$t('won_notes')}}</div>
        </div>

        <div v-else-if="giftType === 1">
          <div class="caption-bold mt-1">{{$$t('won')}} <span class="caption red-text">{{gift_1 && gift_1.giftText}}</span> </div>
          <div class="caption-bold mt-1">{{$$t('codes')}}： <span class="caption red-text">{{gift_1 && gift_1.giftObjId}}</span> <span class="caption ml-3" @click="copyBtnClick(gift_1 && gift_1.giftObjId)">{{$t('common.copy')}}</span> </div>
          <div class="caption-bold mt-1">{{$$t('kf')}}</div>
        </div>

        <div class="caption-bold mt-11" v-else>
          {{$$t('regrets')}}
        </div>

        <div class="gift_btn" v-if="giftType === 1" @click="onReceiveGift">
          <van-button size="small" color="linear-gradient(to bottom, #ffec96, #ffb01b)" class="radius-1">
            {{$$t('btn')}}
          </van-button>
        </div>
      </div>


     <div style="margin-top: 44px;">
       <van-image src="/images/turntable/close.png" width="36px" height="36px" @click="showPopup = false"/>
     </div>

    </van-popup>
  </div>
</template>

<script>
import {LuckyWheel} from 'vue-luck-draw'

export default {
  name: "Turntable",

  components: {
    LuckyWheel
  },

  data: () => ({
    showPopup: false,
    giftType: 0,
    gift_1: {
      giftImg: '',
      giftText: '',
      giftObjId: '',
    },
    gift_0: {
      money: 0
    },
    receiveId: '',
    item: null,
    prizes: [],
    buttons: [{
      radius: '40px',
      imgs: [{
        src: '/images/turntable/lottery_btn.png',
        padding: '30px',
        width: '100%',
        top: '-124%'
      }]
    }],

    blocks: [{
      padding: '38px',
      imgs: [{
        src: '/images/turntable/lottery_bg.png',
        width: '100%',
        rotate: false
      }]
    }, ],

    defaultStyle: {
      fontSize: '12px',
      fontWeight: '500',
      fontColor: 'rgb(176, 121, 0)',
    },

    defaultConfig: {
      gutter: '1px',
    },

    dayFreeTimes: 0
  }),

  activated() {
    this.onGetTurntableInfo()
  },

  methods: {
    onGetTurntableInfo(isRefresh) {
      this.$post('/api/Turntable/GetTurntableInfo')
          .then(resp => {
            return this.checkResp(resp, (r) => r.data.success === true)
          })
          .then(data => {
            let d = data.data
            if (isRefresh) {
              this.dayFreeTimes = d.dayFreeTimes
              return
            }
            this.dayFreeTimes = d.dayFreeTimes
            const prizes = []
            this.item = d
            let e = d.turntableGift.map(e => {
              return {
                name: e.giftType === 1 ? e.name : e.giftType === 2 ? e.giftTypeDesc : e.bonus + e.giftTypeDesc,
                img: this.getImg(e),
                giftType: e.giftType,
                bonus: e.bonus
              }
            })

            e.forEach((item, index) => {
              prizes.push({
                name: item.name,
                background: index % 2 === 0 ? 'white' : 'rgb(255, 219, 84)',
                fonts: [{
                  text: item.name,
                  top: '10%'
                }],
                imgs: [{
                  src: item.img,
                  width: this.getWidth(e),
                  top: '32%'
                }],
                giftType: item.giftType,
                bonus: item.bonus
              })
            })
            this.prizes = prizes
          })
          .catch(error => {
            this.procError(error)
          })
    },

    onTurntable() {
      if (this.item.dayFreeTimes < 1) {
        this.$info(this.$$t('dayFreeTimes_t'))
        return
      }
      this.showProgress()
      this.$post('/api/Turntable/Turntable')
          .then(resp => {
            return this.checkResp(resp, (r) => r.data.success === true)
          })
          .then(data => {
              this.showProgress(false)
              let d = data.data
              this.gift_1.giftObjId = d.recordObjId
              this.receiveId = d.giftObjId
              let index = this.item.turntableGift.findIndex(e => e.objId === d.giftObjId);
              this.startCallBack(Number(index))
          })
          .catch(error => {
            this.showProgress(false)
            this.procError(error)
          })
    },

    onReceiveGift() {
      if (this.giftType !== 1) {
        this.$info(this.$$t('failed'))
        return
      }

      this.$info(this.$$t('kf'))
    },

    getImg (e) {
      if (e.giftType === 0) {
        return '/images/turntable/money.png'
      } else if(e.giftType === 1) {
        return this.$portrait(e.pic)
      } else {
        return '/images/turntable/ThanksForJoin.png'
      }
    },

    getWidth (e) {
      if (e.giftType === 0) {
        return '40px'
      } else if(e.giftType === 1) {
        return '48px'
      } else {
        return '35px'
      }
    },

    startCallBack(index) {
      this.$refs.LuckyWheel.play()
      setTimeout(() => {
        this.$refs.LuckyWheel.stop(index)
      }, 3000)
    },

    endCallBack(prize) {
      this.giftType = prize.giftType
      if (prize.giftType === 1) {
        this.gift_1.giftImg = prize.imgs[0].src
        this.gift_1.giftText = prize.name
      } else if (prize.giftType === 0) {
        this.gift_0.money = prize.bonus
      }

      this.showPopup = true
      this.onGetTurntableInfo(true)
    },

    $$t(v, p) {
      return this.$t('turntable.' + v, p)
    }
  }
}
</script>

<style lang="less" scoped>
#turntable {
  height: 100%;

  .view-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('/images/turntable/banner.png') no-repeat top right;
    background-size: 100% 667px;

    .view-background-flex {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;

      .view-background-flex-top {
        flex: 1;
        background: url('/images/turntable/banner.png') no-repeat top right;
        background-size: 100% 667px;
      }

      .view-background-flex-bottom {
        flex: 1;
        background: transparent;
      }
    }
  }

  .warps {
    height: 100%;
    background-image: url("/images/turntable/banner.png");
    background-size: 100% 100%;

    .luck-draw {
      margin: auto;
    }

    .title {
      font-size: 44px;
      color: white;
      font-weight: bold;
      font-family: 'turntable' !important;
    }

    .number_text {
      width: 160px;
      height: 30px;
      line-height: 30px;
      background-image: url("/images/turntable/number_bg.png");
      background-size: 100% 100%;
      text-align: center;
      margin: 25px auto auto auto;
    }

    .rules {
      width: 100%;
      height: 425px;
      margin-top: 42px;
      padding-top: 28px;
      background-image: url("/images/turntable/rules_bg.png");
      background-size: 100% 100%;

      .rules_title {
        position: relative;
      }

      .rules_title:before, .rules_title:after {
        border-top: 2px solid rgb(94, 140, 255);
        content: '';
        display: table-cell;
        position: absolute;
        top: 12px;
        width: 30%;
      }

      .rules_title:before {
        left: 2%;
      }

      .rules_title:after {
        right: 2%;
      }
    }
  }

  .van-popup {
    background-color: unset;
    .gift {
      width: 328px;
      height: 383px;
      background-image: url("/images/turntable/gift_bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-color: unset;
      .title {
        font-size: 22px;
        color: white;
        font-weight: 500;
      }

      .gift_img {
        width: 154px;
        height: 154px;
        background-image: url("/images/turntable/gift_img_bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin: auto;
        position: relative;

        .gift_img_center {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 16px;
          z-index: 2;
          margin: auto;
        }

        .money_text {
          position: absolute;
          top: 53px;
          left: 0;
          right: 0;
          color: rgb(247, 52, 4);
          font-size: 22px;
          font-weight: 500;
          z-index: 4;
        }

        .gift_img_b {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 11px;
          z-index: 3;
        }
      }

      .gift_btn {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 104px;
        /deep/.van-button {
          color: rgb(217, 35, 0) !important;
          padding: 12px 36px;
        }
      }
    }
  }
}
</style>
