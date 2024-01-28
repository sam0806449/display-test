<template>
    <div id="memberSearchCountry">
        <van-search
                v-model="searchText"
                show-action
                :placeholder="$t('searchGames.text')"
                @cancel="onCancel"
        />

        <div class="warp text-left">
            <scroller>
                <van-cell-group inset v-if="datas.length > 0">
                    <template v-for="(item, index) in datas">
                        <van-cell :title="culture === 'zh-CN' ? item.chinese_name : item.english_name"
                                  :value="`+${item.phone_code}`" :key="index" @click="cellClick(item)"/>
                    </template>
                </van-cell-group>

                <van-empty v-else :description="$t('common.noMore')" class="text-center">
                    <template #image>
                        <van-image src="/images/empty/no-more.png" width="280" height="130"/>
                    </template>
                </van-empty>
            </scroller>
        </div>
    </div>
</template>

<script>
import countrys from '@/common/js/countryCode'

export default {
	name: 'MemberSearchCountry',

	data: () => ({
		searchText: ''
	}),

	computed: {
		getCountrys() {
			return countrys.countryCodes.length > 0 ? countrys.countryCodes : []
		},

		datas() {
			if (this.culture === 'zh-CN') {
				if (this.searchText) {
					return this.getCountrys.filter(e => {
						return ((e.chinese_name && e.chinese_name.indexOf(this.searchText) > -1))
					})
				} else {
					return this.getCountrys
				}
			} else {
				if (this.searchText) {
					return this.getCountrys.filter(e => {
						return ((e.english_name && e.english_name.indexOf(this.searchText) > -1))
					})
				} else {
					return this.getCountrys
				}
			}

		}
	},

	methods: {
		onCancel() {
			this.redirectRouter('/app/member/details')
		},

        cellClick (item) {
			this.$router.push({
				path: '/app/member/details',
				query: {
					phone_code: item.phone_code,
				}
			})
        },

		$$t(v) {
			return this.$t('searchCountry.' + v)
		}

	}
}
</script>

<style lang="less" scoped>
#memberSearchCountry {
    .warp {
        position: absolute;
        top: 54px;
        right: 0;
        left: 0;
        bottom: 0;
    }
}
</style>
