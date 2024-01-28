<!-- 支付宝通道 -->
<template>
    <div id="zfb">
        <div class="recharge-options" v-show="items.length>1">
            <span v-for="(item,i) in items" :key="i" :class="{active: isSwitch === i}"
                  @click="isSwitch = i">{{$t('recharge.channel')}}{{i+1}}</span>
        </div>
        <div class="zfb-warp" :style="items.length >1 ? '' : 'height: 100%'">
            <EasyRefresh ref="recharge_zfb" :userSelect="false" :bouncing="false">
                <div v-if="channels.length >0 ">
                    <van-cell v-for="(channel,i) in channels" :key="i" @click="activeItem(channel, i)">
                        <van-icon :name='`/payImages/channel/${channel.icon}.png`' slot="icon" size="40"/>
                        <div>
                            <h6>{{channel.payChannelName}}
                                <van-image v-if="(channel.tag && channel.tag !=='none')"
                                           :src="'/images/common/zfb-' + channel.tag + '.png'"
                                           slot="default" width="28" height="14" style="margin-left: 5px;"/>
                            </h6>
                            <p class="van-ellipsis">
                                {{$$t('moneyDesc1')}}{{getMoneyText(channel.minMoneyY)}}，{{$$t('moneyDesc2')}}{{getMoneyText(channel.maxMoneyY)}}</p>
                        </div>
                        <van-radio-group v-model="radio">
                            <van-radio :name="i">
                                <img
                                        slot="icon"
                                        slot-scope="props"
                                        :src="props.checked ? activeIcon : inactiveIcon"
                                >
                            </van-radio>
                        </van-radio-group>
                    </van-cell>
                </div>

                <van-empty v-else :description="$t('common.noMore')" class="text-center">
                    <template #image>
                        <van-image src="/images/empty/no-more.png" width="280" height="130"/>
                    </template>
                </van-empty>
            </EasyRefresh>
        </div>
    </div>
</template>

<script>
export default {
	props: {
		items: {
			type: Array
		}
	},

	data() {
		return {
			radio: null,
			activeIcon: 'images/recharge/active-single.png',
			inactiveIcon: 'images/recharge/single.png',
			isSwitch: 0,
		}
	},

	watch: {
		items () {
			this.$refs.recharge_zfb.scrollTo(0, true)
		}
	},

	computed: {
		channels() {
            if (this.items[this.isSwitch].channels.length > 0) {
                this.$emit('activeItem', this.items[this.isSwitch].channels[0])
            }
			return this.items[this.isSwitch].channels
		}
	},

	methods: {
		activeItem(item, i) {
			this.radio = i
			this.$emit('activeItem', item)
		},

		$$t(v) {
			return this.$t('aisleZFB.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#zfb {
    padding: 0 16px;
    height: 100%;

    .zfb-warp {
        height: 223px;
    }

    /deep/ .v-easy-refresh {
        .v-easy-refresh-header, .v-easy-refresh-footer {
            display: none;
        }
    }

    .van-cell, .van-cell__value {
        align-items: center;
        display: flex;
    }

    .van-radio {
        img {
            width: 20px;
            height: 20px;
        }
    }

    .van-cell {
        border-bottom: 1px #f5f5f9 solid;
        height: 64px;
        padding: 0;

        .van-icon {
            margin-right: 8px;
            display: block;
        }

        h6 {
            font-size: 14px;
            color: #333;
        }

        p {
            width: 220px;
        }

        .van-cell__value {
            justify-content: space-between;
        }
    }


    .recharge-options {
        display: flex;
        height: 36px;
        border-radius: 4px;
        overflow: hidden;

        span {
            width: 100%;
            display: block;
            text-align: center;
            font-size: 14px;
            color: #333;
            line-height: 36px;
            background-color: #ffeacc;
        }

        .active {
            background-color: #ff9900;
            color: #fff
        }
    }

    /deep/.van-empty__image {
        margin-top: 10px !important;
    }
}
</style>
