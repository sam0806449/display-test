<template>
    <div id="joint">
        <scroller>
            <van-swipe :loop="false" @change="onChange" ref="swipes">
                <van-swipe-item>
                    <proxy/>
                </van-swipe-item>

                <van-swipe-item>
                    <digital/>
                </van-swipe-item>

                <van-swipe-item>
                    <mobile/>
                </van-swipe-item>

                <template #indicator>
                    <div class="flex justify-content-center">
                        <template v-for="i in 3">
                            <div :key="i">
                                <van-image src="/images/joint/active.png" width="30" height="6" class="mr-2"
                                           v-show="current === i"/>
                                <van-image src="/images/joint/custom.png" width="16" height="6" class="mr-2"
                                           v-show="current !== i" @click="changeCurrent(i)"/>
                            </div>
                        </template>
                    </div>
                </template>
            </van-swipe>

            <div class="right" @click="changePage('right')" v-show="current<3">
                <van-image src="/images/joint/right.png" width="26" height="26"/>
            </div>

            <div class="left" @click="changePage('left')" v-show="current>1">
                <van-image src="/images/joint/left.png" width="26" height="26"/>
            </div>
        </scroller>
    </div>
</template>

<script>
import Proxy from './Proxy'
import Digital from './Digital'
import Mobile from './Mobile'

export default {
	name: 'Joint',

	components: {
		Proxy,
		Digital,
		Mobile
	},


	data: () => ({
		current: 1,
	}),

	methods: {
		onChange(index) {
			this.current = index + 1;
		},


		changePage(v) {
			if (v === 'right') this.$refs.swipes.next()
			else this.$refs.swipes.prev()
		},

		changeCurrent(v) {
			this.current = v
			this.$refs.swipes.swipeTo(Number(v) - 1)
		}
	}
}
</script>

<style lang="less" scoped>
#joint {
    .right {
        position: fixed;
        top: 256px;
        right: 6px;
    }

    .left {
        position: fixed;
        top: 256px;
        left: 6px;
    }

    /deep/.van-swipe {
        height: 15.2rem;
    }
}
</style>
