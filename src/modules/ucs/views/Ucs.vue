<template>
    <div>
        <keep-alive>
            <router-view/>
        </keep-alive>

        <van-tabbar v-model="active" router active-color="rgb(96, 142, 255)" fixed>
            <van-tabbar-item v-for="(t, index) in tabbars" :name="t.name" :key="index" :to="t.to">
                <span>{{$$t(t.text)}}</span>
                <template #icon="props">
                    <van-icon :name="props.active ? `images/ucs/${t.activeIcon}.png` : `images/ucs/${t.inactiveIcon}.png`" size="24"/>
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
	name: 'Ucs',

	data() {
		return {
			active: 'ucs',
			tabbars: [
				{activeIcon: 'tournaments_active', inactiveIcon: 'tournaments', text: 'home', name: 'ucs', to: '/app/ucs'},
				{activeIcon: 'notes_active', inactiveIcon: 'notes', text: 'notes', name: 'ucsNotes', to: '/app/ucsNotes'}
			],
		}
	},
	
	created () {
		let e = this.$route.name
		let t = sessionStorage.getItem('ucs_active')
		this.active = e || t || 'ucs'
	},

	watch: {
		active (v) {
			this.active = v
			sessionStorage.setItem('ucs_active', v)
		},
	},

	methods: {
		$$t(v) {
			return this.$t('ucs.' + v)
		}
	},

	beforeRouteLeave(to, form, next) {
		if (to.name === 'dashboard')sessionStorage.removeItem('ucs_active')
		next()
	}
}
</script>

<style lang="less" scoped>

</style>
