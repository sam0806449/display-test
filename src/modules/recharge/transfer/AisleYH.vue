<!-- 银行通道 -->
<template>
    <div id="yh">
        <div class="recharge-options" v-show="items.length>1">
            <span v-for="(item,i) in items" :key="i" :class="{active: isSwitch === i}"
                  @click="isSwitch = i">{{$t('recharge.channel')}}{{i+1}}</span>
        </div>
        <EasyRefresh ref="recharge_yh" :userSelect="false" :bouncing="false">
            <div class="yh-warp" v-if="channels.length > 0">
                <div class="list" v-for="(item,i) in channels" :key="i" @click="activeItem(item, i)">
                    <div class="list-content">
                        <div class="item">
                            <span class="title">{{$$t('bank')}}：</span>
                            <span class="des">{{item.payChannelName}}</span>
                        </div>
                        <div class="item">
                            <span class="title">{{$$t('payMerchantName')}}：</span>
                            <span class="des">{{item.payMerchantName}}</span>
                        </div>
                        <div class="item">
                            <span class="title">{{$$t('bankAccount')}}：</span>
                            <span class="des">{{item.bankAccount}}</span>
                        </div>
                        <div class="item">
                            <span class="title">{{$$t('payChannelName')}}：</span>
                            <span class="des">{{item.payUrl}}</span>
                        </div>
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
                </div>
            </div>

            <van-empty v-else :description="$t('common.noMore')" class="text-center">
                <template #image>
                    <van-image src="/images/empty/no-more.png" width="280" height="130"/>
                </template>
            </van-empty>
        </EasyRefresh>
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
			isSwitch: 0
		}
	},

    watch: {
		items () {
			this.$refs.recharge_yh.scrollTo(0, true)
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
			return this.$t('aisleYH.' + v)
		}
	}

}
</script>

<style lang="less" scoped>
#yh {
    height: 260px;

    .yh-warp {
        height: 100%;
    }

    /deep/ .v-easy-refresh {
        .v-easy-refresh-header, .v-easy-refresh-footer {
            display: none;
        }
    }

    .van-radio {
        img {
            width: 20px;
            height: 20px;
        }
    }

    .list {
        display: flex;
        min-height: 128px;
        border-radius: 8px;
        background-color: #f5f5f9;
        margin-bottom: 8px;
        padding: 8px 16px;
        justify-content: space-between;
        align-items: center;

        .list-content {
            display: flex;
            align-items: center;
            word-wrap: break-word;
            font-size: 14px;
            color: #333;
            flex-wrap: wrap;
            .item {
                width: 280px;
                display: flex;
                justify-content: space-between;
                .title {
                    font-weight: 500;
                    width: 65px;
                    margin-right: 5px;
                }
                .des {
                    width: 210px;
                    font-weight: normal;
                }
            }
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
