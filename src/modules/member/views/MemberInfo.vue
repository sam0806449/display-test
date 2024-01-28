<template>
    <div id="memberInfo">
        <EasyRefresh :userSelect="false" :bouncing="false">
            <van-cell-group class="memberDetails-top">
                <van-cell :title="$$t('avatar')" size="large" class="avatar" center is-link @click="changeAvatar">
                    <van-image
                            round
                            slot="default"
                            width="46"
                            height="46"
                            :src="getAvatar(Number(memberData && memberData.avatar))"
                    >
                    	<template v-slot:loading>
												<van-loading type="spinner" size="20" />
											</template>
                    </van-image>
                </van-cell>

                <van-cell :title="$$t('memberAccount')" :value="memberInfo && memberInfo.memberAccount" size="large"
                          readonly/>

                <van-cell :title="$$t('level')" :value="memberInfo && memberInfo.vipLevelName" size="large" readonly/>

                <van-cell :title="$$t('nickName')" :value="(memberInfo && memberInfo.nickName) || $t('common.unSet')"
                          size="large" is-link @click="changeUrl('nickName')"/>

                <van-cell :title="$$t('birthday')" :value="(memberInfo && memberInfo.birthday) || $t('common.unSet')"
                          size="large" is-link @click="changeBirthday" readonly/>

                <van-cell :title="$$t('details')" size="large" is-link @click="redirectRouter('details')"/>
            </van-cell-group>

            <van-cell-group class="memberDetails-bt">
                <van-cell :title="$$t('setPwd')" size="large" is-link @click="redirectRouter('/app/setPwd')"/>
            </van-cell-group>

            <van-cell-group class="mt-3">
                <van-cell :title="$$t('Withdrawal')" size="large" is-link @click="redirectRouter('/app/cards')"/>
            </van-cell-group>
        </EasyRefresh>

        <van-dialog v-model="show" :title="title" show-cancel-button @confirm="changeInfo">
            <van-cell-group>
                <van-field v-model="fieldValue" :placeholder="$$t('fieldValueDesc')"/>
            </van-cell-group>
        </van-dialog>

        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @cancel="showPicker = false"
                    @confirm="confirmBirthday"
            />
        </van-popup>


        <van-action-sheet
                v-model="showAvatar"
                :cancel-text="$$t('cancel')"
                close-on-click-action
                :title="$$t('changeAvatar')"
                @cancel="showAvatar=false"
        >
            <div class="content px-7 pb-4 pt-5">
                <van-row gutter="24">
                    <template v-for="i in 8">
                        <van-col span="6" :key="i" class="mb-7" @click="setAvatar(i)">
                            <van-image width="1.6rem"
                                       height="1.6rem"
                                       :src="`/images/member/avatars/${i}.png`"
                                       :class="{'avatar_active': Number(memberInfo && memberInfo.avatar) === i}"/>
                        </van-col>
                    </template>

                </van-row>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
import {dateFormatMt_8} from "@/common/js/dateUtil";

export default {
	name: 'MemberInfo',

	data() {
		return {
			title: '',
			show: false,
			fieldValue: '',
			url: '',
			showPicker: false,
			showAvatar: false,
			minDate: new Date(1975, 0, 1),
			maxDate: new Date(2025, 10, 1)
		}
	},

	methods: {
		changeUrl(f) {
			this.show = true
			if (f === 'nickName') {
				this.url = '/api/Account/ModifiyMemNickName?nickName='
				this.title = this.$$t('nickName')
			}
		},

		changeInfo() {
			if (this.fieldValue === null || this.fieldValue === '') {
				this.$toast(this.$t('common.noNull'))
				return
			}
			this.$post(this.url + this.fieldValue)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$toast(data.data)
					this.fieldValue = null
					this.getMemberInfo()
				})
				.catch(error => {
					this.fieldValue = null
					this.procError(error)
				})
		},

		changeBirthday() {
			this.url = ' /api/Account/ModifiyMemBirthday?birthday='
			this.showPicker = true
		},

		confirmBirthday(v) {
			this.fieldValue = dateFormatMt_8(new Date(v), 'yyyy-MM-dd')
			this.showPicker = false
            this.changeInfo()
		},

		getMemberInfo() {
			this.$post('/api/Account/GetUserInfo')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.$sessionSet('MemberInfo', d)
					this.$store.commit('setMemberInfo', d)
				})
				.catch(error => {
					this.procError(error)
				})
		},

		changeAvatar () {
			this.showAvatar = true
        },


		setAvatar(i) {
			let e = ''
			if (i < 10) e = '0' + i
            else e = i
			this.$post('/api/Account/ModifiyMemAvatar?avatar=' + e)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.getMemberInfo()
					this.$toast(data.data)
                    this.showAvatar = false
                    this.$router.go(0)
				})
				.catch(error => {
					this.procError(error)
				})
		},


		onOversize() {
			this.$toast(this.$t('common.imgSizeDesc'));
		},

		$$t(v) {
			return this.$t('memberInfo.' + v)
		}

	}
}
</script>

<style lang="less" scoped>
#memberInfo {
    height: 100%;
    text-align: left;

    .avatar_active::after {
        position: absolute;
        right: -1px;
        bottom: -1px;
        content: "";
        display: block;
        background: url(/images/member/avatars/active.png) 0 0/100% 100% no-repeat;
        width: 18px;
        height: 18px;
    }

    .memberDetails-top {
        margin-top: 10px;
    }

    .memberDetails-bt {
        margin-top: 10px;
    }

    .avatar {
        .van-cell__value {
            height: 46px;
            line-height: 46px;
        }
    }

    /deep/ .van-dialog__content {
        padding: 16px;

        .van-cell {
            border: 1px #999999 solid;
        }
    }
}
</style>
