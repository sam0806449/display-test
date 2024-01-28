<template>
    <div>
        <keep-alive>
            <router-view/>
        </keep-alive>

        <van-tabbar v-model="active" router active-color="rgb(96, 142, 255)" fixed>
            <van-tabbar-item v-for="(t, index) in tabbars" :name="t.name" :key="index" :to="t.to">
                <span>{{$$t(t.text)}}</span>
                <template #icon="props">
                    <img :src="props.active ? `images/task/${t.activeIcon}.png` : `images/task/${t.inactiveIcon}.png`">
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
	name: 'Index',

	data() {
		return {
			active: 'task',
			tabbars: [
				{activeIcon: 'task-active', inactiveIcon: 'task', text: 'task', name: 'task', to: '/app/task'},
				{activeIcon: 'notes-active', inactiveIcon: 'notes', text: 'notes', name: 'notes', to: '/app/taskNotes'}
			],
		}
	},

	activated () {
		let t = sessionStorage.getItem('tabbar-task')
		this.active = t || 'task'
	},

	watch: {
		active (v) {
			this.active = v
			sessionStorage.setItem('tabbar-task', v)
		}
	},

	methods: {
		$$t(v) {
			return this.$t('task.' + v)
		}
	},

	beforeRouteLeave(to, form, next) {
		if (to.name === 'member')sessionStorage.removeItem('tabbar-task')
		next()
	}
}
</script>

<style lang="less" scoped>

</style>
