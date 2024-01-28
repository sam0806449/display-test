<template>
    <div id="setWithdrawalPwd" class="background-white">
        <div class="pt-9 text-left">
            <div class="subtitle-3 px-4 mb-1">{{$$t('newPassword')}}</div>
          <van-field v-model="newPassword" :formatter="formatter" maxlength="4" :placeholder="$$t('newPassword_p')" :type="passwordType" @click-right-icon="changeType" ref="password" class="mb-1">
            <van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
                      slot="right-icon"/>
          </van-field>

            <div class="subtitle-3 px-4 mb-1 mt-4">{{$$t('confirmPassword')}}</div>
          <van-field v-model="confirmPassword" :formatter="formatter" maxlength="4" @click-right-icon="changeType" :type="passwordType" :placeholder="$$t('confirmPassword_p')">
            <van-icon :name="passwordType ? 'closed-eye' : 'eye-o'" size="20" color="#333333"
                      slot="right-icon"/>
          </van-field>

            <div class="btn mt-10 px-4 pb-10">
                <van-button color="linear-gradient(to right, rgb(129, 170, 255), rgb(70, 132, 255))" block class="radius-2"
                            @click="onSubmit">
                    {{$$t('submit')}}
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
import {isNullOrUndefinedDesc, validConfirmPwd} from '@/utils/validate'
export default {
	name: 'SetWithdrawalPwd',

	data: () => ({
		newPassword: '',
		confirmPassword: '',
    passwordType: 'password',
	}),

	methods: {
		onSubmit () {
			if (!(isNullOrUndefinedDesc(this.newPassword, this.$$t('newPassword')) && validConfirmPwd(this.newPassword, this.confirmPassword))) {
				return
			}
			this.$post('/api/Account/ModifiyPaymentPassword', {
				newPassword: this.newPassword,
				confirmPassword: this.confirmPassword
            })
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$toast(data.data)
          this.$router.push('withdraw')
				})
				.catch(error => {
					this.procError(error)
				})
    },

    changeType() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    formatter(v) {
      // eslint-disable-next-line no-useless-escape
      return v.replace(/[^\d]/g, '')
    },

    $$t(v) {
      return this.$t('setWithdrawalPwd.' + v)
    }
  }
}
</script>

<style lang="less" scoped>
#setWithdrawalPwd {

}
</style>
