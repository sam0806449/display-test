<template>
    <div id="apply">
        <div class="px-3 pt-3">
            <div class="background-white px-6 pt-4 pb-7 text-left">
                <template v-for="(item, index) in items">
                    <div class="mb-3" :key="index">
                        <div class="caption-bold mb-1">{{item.fieldName}}：</div>
                        <van-field
                                v-model="applyFrom[item.fieldName]"
                                :type="getType(item.fieldType)"
                                :placeholder="item.fieldName"
                        />
                    </div>
                </template>

                <van-button hairline block color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))"
                            class="radius-2" @click="onActivityReceive">
                    {{$$t('submit')}}
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'PreferentialApply',

	data: () => ({
		applyFrom: {},
		items: []
	}),

	mounted() {
		this.items = this.$sessionGet('apply-item')
		let that = this
		this.items.forEach(function (e) {
			that.applyFrom[`'${e.fieldName}'`] = null
		})
	},

	methods: {
		onActivityReceive() {
			let that = this
			let objId = this.$route.query.objId
			let r = []
			this.items.forEach(function (e) {
				r.push({fieldName: e.fieldName, value: that.applyFrom[e.fieldName]})
			})
			this.$post('/api/Activity/ActivityReceive', {
				objId: objId,
				activityReceiveParams: r
			})
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$toast(data.data)
				})
				.catch(error => {
					this.procError(error)
				})
		},

		getType(v) {
			if (v === 'int') {
				return 'number'
			} else if (v === 'email') {
                return 'email'
			} else if (v === 'phone') {
				return 'tel'
			} else {
				return 'text'
			}
		},

		$$t(v) {
			return this.$t('preferentialApply.' + v)
		}
	},

	beforeRouteLeave(to, form, next) {
		sessionStorage.removeItem('apply-item')
		next()
	},
}
</script>

<style lang="less" scoped>
#apply {
    height: 100%;

    .van-field {
        background-color: rgb(242, 242, 242);
        border-radius: 4px;
    }

    .van-button {
        margin-top: 96px;
    }
}
</style>
