<template>
    <div>
        <keep-alive>
            <router-view/>
        </keep-alive>

        <van-tabbar v-model="active" router active-color="rgb(96, 142, 255)" fixed>
            <van-tabbar-item v-for="(t, index) in tabbars" :name="t.name" :key="index" :to="t.to">
                <span>{{$$t(t.text)}}</span>
                <template #icon="props">
                    <img :src="props.active ? `images/financial/${t.activeIcon}.png` : `images/financial/${t.inactiveIcon}.png`">
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
	name: 'Financial',

	data() {
		return {
			active: 'market',
			tabbars: [
				{activeIcon: 'market-active', inactiveIcon: 'market', text: 'market', name: 'market', to: '/app/financial'},
				{activeIcon: 'hold-active', inactiveIcon: 'hold', text: 'hold', name: 'hold', to: '/app/financial/hold'}
			],
        }
	},

	activated () {
		let t = sessionStorage.getItem('tabbar-financial')
		this.active = t || 'market'
    },

    watch: {
		active (v) {
			this.active = v
			sessionStorage.setItem('tabbar-financial', v)
        }
    },

	methods: {
		$$t(key) {
			if (!key) return ''
			return this.$t('financial.' + key)
		}
    },

	beforeRouteLeave(to, form, next) {
		if (to.name === 'member')sessionStorage.removeItem('tabbar-financial')
		next()
	}
}
</script>

<style lang="less" scoped>

</style>
