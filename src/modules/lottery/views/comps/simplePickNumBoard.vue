<template>
    <div class="simplePickNumBoard">
      <div class="px-4">
          <!-- 位置 -->
            <div class="title">
              <span>位置</span>
            </div>  
            <van-row>
              <van-col v-for="(positionWay,index) in ['前','后','奇','偶']" :key="index"
              span="5" class="mb-3" style="width: 20%;">
                <div
                  class="ball-num"
                  :class="{
                    current_active: selectedPositon_way === positionWay,
                  }"
                  @click="hadlePositionWay(positionWay)"
                >
                  {{ positionWay }}
                </div>
              </van-col>
            </van-row>

          <!-- 位置細象 -->
            <div class="title">
              <span>位置</span>
            </div>  
            <van-row>
              <van-col v-for="(position,index) in ['一','二','三','四','五','六','七','八','九','十']" :key="index"
              span="5" class="mb-3" style="width: 20%;">
                <div
                  class="ball-num"
                  :class="{
                    current_active: selectedPositons.findIndex(t => t === index) > -1,
                  }"
                  @click="hadlePosition(index)"
                >
                  {{ position }}
                </div>
              </van-col>
            </van-row>
            
            <!-- 数字 -->
            <div class="title">
              <span>号码({{ playTypeData[0].lotteryBetContent[0].odds }}倍)</span>
            </div>
            <van-row>
              <van-col v-for="(bet,index) in 10" :key="index"
              span="5" class="mb-3" style="width: 20%;">
                <div
                  class="ball-num"
                  :class="{
                    current_active: selectedNumbers.findIndex(t => t === bet) > -1,
                  }"
                  @click="hadleNumbers(bet)"
                >
                  {{ bet }}
                </div>
              </van-col>
            </van-row>

            <!-- 形态 -->
            <div class="title">
              <span>形态</span>
            </div>  
            <van-row style="height: 150px;">
              <van-col v-for="(numberWay,index) in ['大','小','单','双']" :key="index"
              span="5" class="mb-3" style="width: 20%;">
                <div
                  class="ball-num"
                  :class="{
                    current_active: selectedNumber_way === numberWay,
                  }"
                  @click="hadleNumberWay(numberWay)"
                >
                  {{ numberWay }}
                </div>
              </van-col>
            </van-row>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SimplePickNumBoard",
    props: ["playTypeData", "clear"],
    data(){
      return {
        selectedPositon_way: '',
        selectedPositons: [],
        selectedNumbers:[],
        selectedNumber_way: '',
        cur_betContent: [], 
      }
    },
  
    watch:{
      clear(v){
        if (v) {
          this.selectedPositon_way = '',
          this.selectedPositons = [],
          this.selectedNumbers =[],
          this.selectedNumber_way = '',
          this.cur_betContent = []
        }
      }
    },
  
    methods: {
      hadlePositionWay(type) {
        this.selectedPositon_way = type;
        switch (type) {
          case '前':
            this.selectedPositons = [0, 1, 2, 3, 4];
            break;
          case '後':
            this.selectedPositons = [5, 6, 7, 8, 9];
            break;
          case '奇':
            this.selectedPositons = [0, 2, 4, 6, 8];
            break;
          default:
            this.selectedPositons = [1, 3, 5, 7, 9];
            break;
        }
        this.sentToParent();
      },
      hadlePosition(positionIndex) {
        const checkIndex = this.selectedPositons.findIndex(t => t === positionIndex);
        if ( checkIndex > -1) {
          this.selectedPositons.splice(checkIndex, 1);
        } else {
          this.selectedPositons.push(positionIndex);
        }
        this.selectedPositon_way = '';
        this.sentToParent();
      },
      hadleNumbers(num) {
        const checkIndex = this.selectedNumbers.findIndex(t => t === num);
        if ( checkIndex > -1) {
          this.selectedNumbers.splice(checkIndex, 1);
        } else {
          this.selectedNumbers.push(num);
        }
        this.selectedNumber_way = '';
        this.sentToParent();
      },
      hadleNumberWay(type) {
        this.selectedNumber_way = type;
        switch (type) {
          case '大':
            this.selectedNumbers = [6, 7, 8, 9, 10];
            break;
            case '小':
            this.selectedNumbers = [1, 2, 3, 4, 5];
            break;
          case '单':
            this.selectedNumbers = [1, 3, 5, 7, 9];
            break;
            default:
            this.selectedNumbers = [2, 4, 6, 8, 10];
            break;
        }
        this.sentToParent();
      },
      sentToParent() {
        this.$emit('handleFastPicNumContent', {
          positions_data: this.selectedPositons,
          nums_data: this.selectedNumbers,
        })
      }
    },
  };
  </script>
  
  <style lang="scss">
  .simplePickNumBoard {
    
  }
  </style>