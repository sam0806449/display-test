import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import zhCN from '@/globe/lang/zh-CN' // 简体中文
import zhHK from '@/globe/lang/zh-HK' // 繁体中文
import enUS from '@/globe/lang/en-US' // 英文
import viVN from '@/globe/lang/vi-VN' // 越南
import thTH from '@/globe/lang/th-TH' // 泰国
import idID from '@/globe/lang/id-ID' // 印尼
import hiIN from '@/globe/lang/hi-IN' // 印度

Vue.use(VueI18n)

// prev lang setting
const prevLang =  Cookies.get('Culture')

const i18n = new VueI18n({
    locale: prevLang || 'zh-CN',
    fallbackLocale: prevLang || 'zh-CN',
    messages: {
        'zh-CN': zhCN,
        'zh-HK': zhHK,
        'en-US': enUS,
        'vi-VN': viVN,
        'th-TH': thTH,
        'id-ID': idID,
        'hi-IN': hiIN
    }
})
export default i18n
