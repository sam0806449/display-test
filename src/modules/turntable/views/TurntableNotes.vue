<template>
  <div id="turntableNotes">
    <van-dropdown-menu active-color="rgb(70 132 255)">
      <van-dropdown-item :title="dropdownTitle" ref="type">
        <div class="dropdown-warp">
          <div class="btns">
            <div class="btn van-ellipsis" :class="{active: recordType === type.value}"
                 v-for="(type, index) in typeOptions" :key="index" @click="typeClick(type)">
              <span>{{type.text}}</span>
            </div>
          </div>
        </div>
      </van-dropdown-item>

      <van-dropdown-item :title="dateDropdownTitle" ref="date">
        <div class="dropdown-warp">
          <div class="btns">
            <div class="btn van-ellipsis" :class="{active: date === time.value}"
                 v-for="(time, index) in dateOptions" :key="index" @click="timeClick(time)">
              <span>{{time.text}}</span>
            </div>
          </div>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>

    <div class="turntableNotes_lists">
      <scroll-view
          :onRefresh="onRefresh"
          :loadMore="onLoadMore">
        <div class="mt-3" v-if="items.length > 0">
          <div class="note_List background-white van-hairline--bottom" v-for="(item, index) in items" :key="index">
              <div class="py-6 px-3 body-2">
                <van-row type="flex" justify="space-between" align="center">
                  <van-col span="6" class="text-left">{{item.name || item.giftTypeDesc}}</van-col>
                  <van-col span="6">{{item.createTime}}</van-col>
                  <van-col span="6" class="text-right">
                    <div v-if="Number(item.status) === 0 && Number(item.giftType) === 1"><van-button class="px-5 red-text" color="linear-gradient(to right, rgb(255, 236, 150), rgb(255, 176, 27))" size="mini" @click="onReceiveGift(item)">领取</van-button></div>
                    <div :class="{'red-text': Number(item.status) === 3}" v-else>{{getStatus(item.status)}}</div>
                  </van-col>
                  <van-col span="6">
                    <van-image :src="`https://crane3.im6ge.com/${item.pic}`" width="60" height="60"/>
                  </van-col>
                </van-row>
              </div>
          </div>
        </div>

        <van-empty v-else :description="$t('common.noMore')" class="text-center">
          <template #image>
            <van-image src="/images/empty/no-more.png" width="280" height="130"/>
          </template>
        </van-empty>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import {beforeByDay, dateFormat, beforeByMonth} from "@/common/js/dateUtil";
export default {
  name: "TurntableNotes",

  data: () => ({
    recordType: '',
    dropdownTitle: '',
    dateDropdownTitle: '',
    date: 0,
    refresh: false,
    pageIndex: 1,
    items: []
  }),

  activated() {
    this.dropdownTitle = this.typeOptions[0].text
    this.dateDropdownTitle = this.dateOptions[0].text
    this.onRefresh()
  },

  computed: {
    startDate() {
      // beforeByDay
      if (this.date === 30) return dateFormat(beforeByMonth(new Date(), 1), 'yyyy-MM-dd')
      else return dateFormat(beforeByDay(new Date(), this.date), 'yyyy-MM-dd')
    },

    dateOptions() {
      return [
        {text: this.$$t('today'), value: 0},
        {text: this.$$t('yesterday'), value: 1},
        {text: this.$$t('nearlyTwoDays'), value: 2},
        {text: this.$$t('nearlySevenDays'), value: 7},
        {text: this.$$t('nearlyAMonth'), value: 30},
      ]
    },

    typeOptions() {
      return [
        {text: this.$t('common.all'), value: ''},
        {text: this.$$t('status_0'), value: '0'},
        {text: this.$$t('status_1'), value: '1'},
        {text: this.$$t('status_2'), value: '2'},
        {text: this.$$t('status_3'), value: '-1'},
      ]
    },

    endDate() {
      let d = Number(this.date)
      if (d === 30 || d === 7 || d === 0) return dateFormat(new Date(), 'yyyy-MM-dd')
      else return dateFormat(beforeByDay(new Date(), Number(d)), 'yyyy-MM-dd')
    }
  },

  methods: {
    onLoad(done) {
      this.showProgress()
      this.$get(`/api/Turntable/GetReceiveRecordList?status=${this.recordType}&pageIndex=${this.pageIndex}&pageSize=20&startDate=${this.startDate}&endDate=${this.endDate}`)
          .then(resp => {
            return this.checkResp(resp, (r) => r.data.success === true)
          })
          .then(data => {
            let d = data.data
            this.pageIndex = this.pageIndex + 1
            if (this.refresh) {
              this.items = []
              this.items = d.items
              if (done) {
                this.refresh = false
                done()
              }
            } else {
              if (d.items.length > 0) {
                this.items.push(...d.items)
                if (done) done(false)
              } else {
                if (done) done(true)
              }
            }
            this.showProgress(false)
          })
          .catch(error => {
            if (done) done(true)
            this.showProgress(false)
            this.procError(error)
          })
    },

    onLoadMore (done) {
      this.refresh = false
      this.onLoad(done)
    },


    onRefresh(done) {
      this.refresh = true
      this.pageIndex = 1
      this.onLoad(done)
    },

    timeClick (e) {
      this.dateDropdownTitle = e.text
      this.date = e.value
      this.pageIndex = 1
      this.items = []
      this.onRefresh()
      this.$refs.date.toggle()
    },

    typeClick (e) {
      this.dropdownTitle = e.text
      this.recordType = e.value
      this.pageIndex = 1
      this.items = []
      this.onRefresh()
      this.$refs.type.toggle()
    },

    onReceiveGift(item) {
      if (item.giftType !== 1) {
        this.$info(this.$$t('failed'))
        return
      }
      this.$get(`/api/Turntable/ReceiveGift?objId=${item.objId}`)
          .then(resp => {
            return this.checkResp(resp, (r) => r.data.success === true)
          })
          .then(data => {
            this.$info(data.data)
          })
          .catch(error => {
            this.procError(error)
          })
    },

    getStatus (v) {
      v = Number(v)
      if (v === 0) return this.$$t('status_0')
      else if (v === 1) return this.$$t('status_1')
      else if (v === 2) return this.$$t('status_2')
      else return this.$$t('status_3')
    },

    $$t(v) {
      return this.$t('turntableNotes.' + v)
    }
  }
}
</script>

<style lang="less" scoped>
#turntableNotes {
  .dropdown-warp {
    padding: 12px 12px 0 12px;

    .active {
      background: url("/images/task/dropdown-menu.png") no-repeat;
      background-size: 100% 32px;

      span {
        color: white !important;
      }
    }

    .btns {
      margin-top: 12px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .btn {
        width: 115px;
        height: 32px;
        margin-bottom: 12px;
        border-radius: 16px;
        background-color: #f5f5f9;
        text-align: center;
        padding: 8px 0;

        span {
          height: 16px;
          font-size: 12px;
          line-height: 16px;
          text-align: center;
          color: #333333;
        }
      }
    }

    .btns:after {
      display: block;
      content: "";
      width: 30%;
      height: 0px;
    }
  }

  .turntableNotes_lists {
    overflow: hidden;
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 44px;

    .note_List {

    }
  }
}
</style>