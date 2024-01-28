<!--提现明细-->
<template>
    <div id="withdrawCards">
    </div>
</template>

<script>

export default {
	name: 'WithdrawCards',
	data() {
		return {}
	},

	created() {
		this.item = JSON.parse(sessionStorage.getItem('Note-Data'))
	},

	beforeRouteLeave(to, form, next) {
		sessionStorage.removeItem('Note-Data')
		next()
	}
}
</script>

<style lang="less" scoped>
#withdrawCards {
    height: 100%;
}
</style>
