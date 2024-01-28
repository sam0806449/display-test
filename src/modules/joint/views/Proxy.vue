<template>
    <div id="proxy">
        <van-image :src="`/images/joint/proxy_${culture}.png`" height="9.25rem" lazy-load>
            <template v-slot:loading>
                <van-loading type="spinner" size="28"/>
            </template>
        </van-image>

        <div class="items">
            <scroller>
                <div class="px-9">
                    <template v-for="(e, index) in items">
                        <div class="item flex align-items-center background-white radius-2 px-4 space-between mb-3"
                             :key="index" v-show="item[e.code]">
                            <div class="flex align-items-center" @click.stop="goOpenLink(e.code)">
                                <van-icon :name="`/images/joint/${e.code}.png`" size="28" class="my-4 mr-4"/>
                                <div class="divider"></div>
                                <div class="text-left ml-2">
                                    <div class="caption text-grey">{{$$t('joint')}}</div>
                                    <div class="subtitle-1 mt-1">{{e.text}}：{{item[e.code]}}</div>
                                </div>
                            </div>
                            <van-button size="small" class="radius-2" color="rgb(70, 132,255)"
                                        @click="copyBtnClick(item[e.code])">{{$t('proxy.copy')}}
                            </van-button>
                        </div>
                    </template>
                </div>
            </scroller>
        </div>

        <div class="px-4 mt-5 btn">
            <van-button color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block
                        class="radius-2"
                        @click="redirectRouter('joint/register')">
                {{$$t('btn')}}
            </van-button>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Proxy',

	data: () => ({
		items: [
			{text: 'qq', code: 'qq'},
			{text: 'email', code: 'email'},
			{text: 'facebook', code: 'facebook'},
			{text: 'whatsapp', code: 'whatsapp'},
		],
		item: {}
	}),


	created() {
		this.onLoad()
	},

	methods: {
		onLoad() {
			this.$post('/api/Agent/GetSystemAgentSetting')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.item = data.data
				})
				.catch(error => {
					this.procError(error)
				})
		},

		goRegister() {
			if (!this.token) this.$toast('请先登录')
			else this.redirectRouter('joint/register')
		},

    goOpenLink (e) {
      let d = ''
      if (e === 'qq') {
       d = `http://wpa.qq.com/msgrd?v=3&uin=${this.item[e]}&site=qq&menu=yes`
      } else if (e === 'whatsapp') {
        d = `https://wa.me/${this.item[e]}`
      } else if (e === 'telegram') {
        d = `https://t.me/${this.item[e]}`
      } else {
        return
      }

      window.open(d);
    },

		$$t(v) {
			return this.$t('proxy.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#proxy {
    height: 100%;

    .items {
        height: 145px;
        position: absolute;
        top: 347px;
        right: 0;
        left: 0;
    }

    .btn {
        position: absolute;
        top: 492px;
        right: 0;
        left: 0;
    }

    .item {
        .divider {
            height: 36px;
            width: 1px;
            background-color: rgb(204, 204, 204);
        }
    }
}
</style>
