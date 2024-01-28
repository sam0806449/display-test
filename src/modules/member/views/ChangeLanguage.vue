<template>
    <div id="changeLanguage">
        <template v-for="(culture, index) in cultures">
            <van-cell :title="culture.name" size="large" center is-link :key="index" @click="changeLanguage(culture.code)">
                <template #icon>
                    <van-image :src="`images/common/${culture.code}.png`" width="24" height="24"/>
                </template>
            </van-cell>
        </template>
    </div>
</template>

<script>
import {Locale} from 'vant';
import zhCN from 'vant/es/locale/lang/zh-CN';
import enUS from 'vant/es/locale/lang/en-US';
import thTH from 'vant/es/locale/lang/th-TH'
import viVN from '@/globe/vi-VN';
import idID from '@/globe/id-ID';
import hiIN from '@/globe/hi-IN';
import {setCultureFromCookie} from '@/utils/auth'
import sessionContext from '@/mixins/sessionContext'

export default {
	name: 'ChangeLanguage',
	mixins: [sessionContext],

	computed: {
		cultures() {
			if (['XOSOVN','SGDP', 'SGDG8'].includes(this.skgCodeKey)) {
				return this.siteConfig && this.siteConfig.cultures.filter((item) => item.code === 'vi-VN')
			}
			return this.siteConfig.cultures
		}
	},

	methods: {
		changeLanguage(locale) {
			this.$dialog.confirm({
				title: this.$t('common.point'),
				message: this.$t('common.changeLanguage'),
			})
				.then(() => {
					sessionStorage.clear();
					this.$i18n.locale = locale
					if (locale === "en-US") {
						Locale.use(locale, enUS);
					} else if (locale === 'vi-VN') {
						Locale.use(locale, viVN)
					} else if (locale === 'th-TH') {
						Locale.use(locale, thTH)
					} else if (locale === 'id-ID') {
						Locale.use(locale, idID)
					} else if (locale === 'hi-IN') {
						Locale.use(locale, hiIN)
					} else {
						Locale.use(locale, zhCN);
					}
					setCultureFromCookie(locale);
					this.$store.commit("setCulture", locale);
					this.getSiteConfig();
					this.$router.back();
				})
				.catch(() => {
				})

		},

		$$t(v) {
			return this.$t('changeLanguage.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#changeLanguage {
    text-align: left;

    .van-image {
        margin-right: 4px;
    }
}
</style>
