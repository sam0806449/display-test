import {
	getCultureFromCookie,
	setCultureFromCookie,
	getTokenFromCookie,
	removeTokenFromCookie
} from "@/utils/auth";
import i18n from "@/globe/i18n";
import {
	Locale
} from 'vant'
import enUS from 'vant/es/locale/lang/en-US'
import zhCN from 'vant/es/locale/lang/zh-CN'
import thTH from 'vant/es/locale/lang/th-TH'
import viVN from '@/globe/vi-VN';
import idID from '@/globe/id-ID';
import hiIN from '@/globe/hi-IN';
import viVNSGMGM from '@/modules/lottery/lang/vi-VN-SGMGM'
import SGMGMVI from '@/globe/SGMGM/vi-VN';
import SG666CN from '@/globe/SG666/zh-CN';
import SG666VI from '@/globe/SG666/vi-VN';

export default {
	methods: {
		initSystem() {
			let site = this.$sessionGet('SiteConfig')
			let token = getTokenFromCookie()
			if (this.isNullOrUndefined(site)) this.getSiteConfig()
			else this.initLang(site)
			if (!token || token === 'undefined') return;
			this.checkLogin()
		},

		initConfig() {
			const data = {
				"codeKey": "DEVGJ",
				"stencil": "skgGame",
				"skinCode": "SGGJ"
			}
			this.$store.commit("setSkgCode", data)
			if (['XOSOVN','SGDP', 'SGDG8'].includes(data.codeKey)) {
				Locale.use('vi-VN', viVN)
				setCultureFromCookie('vi-VN');
				this.$store.commit("setCulture", 'vi-VN');
				this.$i18n.locale = 'vi-VN';
			}
			if (data.codeKey === 'SGMGM' || data.codeKey === 'SGMP'){
				// 客制翻译修改
				// 覆盖相同key
				Object.keys(SGMGMVI).forEach((key) => {
					this.$i18n._vm.messages['vi-VN'][key] = {
						...this.$i18n._vm.messages['vi-VN'][key],
						...SGMGMVI[key]
					}
				});

				// 新增key
				i18n._vm.messages['vi-VN'].lottery = viVNSGMGM.lottery
				i18n._vm.messages['vi-VN'].betLists = viVNSGMGM.betLists
				i18n._vm.messages['vi-VN'].betDetails = viVNSGMGM.betDetails
				i18n._vm.messages['vi-VN'].pK10Bet = viVNSGMGM.pK10Bet
			}
			if (data.codeKey === 'SG666'){
				// 客制翻译修改
				// 覆盖相同key
				Object.keys(SG666CN).forEach((key) => {
					this.$i18n._vm.messages['zh-CN'][key] = {
						...this.$i18n._vm.messages['zh-CN'][key],
						...SG666CN[key]
					}
				});
				Object.keys(SG666VI).forEach((key) => {
					this.$i18n._vm.messages['vi-VN'][key] = {
						...this.$i18n._vm.messages['vi-VN'][key],
						...SG666VI[key]
					}
				});
			}
			this.initSystem()
		},

		initMemberInfo() {
			this.$post("/api/Account/GetUserInfo")
				.then(resp => {
					return this.checkResp(resp, r => r.data.success === true);
				})
				.then(data => {
					let d = data.data;
					this.$store.commit("setMemberInfo", d);
					this.$store.commit("setShowDraggable", d.isOpenTurntable);
				}) 
				.catch(error => {
					this.procError(error);
				});
		},

		initMemberData() {
			this.$post("/api/Account/GetMemberData")
				.then(resp => {
					return this.checkResp(resp, r => r.data.success === true);
				})
				.then(data => {
					let d = data.data;
					let vipLevel = this.$sessionGet('vipLevel_data')
					if (Number(vipLevel) !== d.vipLevel || !vipLevel) this.$sessionSet('vipLevel_data', d.vipLevel)
					this.$store.commit("setMemberData", d);
				})
				.catch(error => {
					this.procError(error);
				});
		},

		refreshMemberData() {
			this.showProgress()
			this.$post("/api/Account/GetMemberData")
				.then(resp => {
					return this.checkResp(resp, r => r.data.success === true);
				})
				.then(data => {
					let d = data.data;
					this.$store.commit("setMemberData", d);
					this.showProgress(false)
					this.$success(this.$t('common.refreshSuccess'))
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error);
				});
		},

		getSiteConfig() {
			this.showProgress()
			this.$post("/api/Home/GetSiteConfig")
				.then(resp => {
					return this.checkResp(resp, r => r.data.success === true);
				})
				.then(data => {
					let d = data.data;
					this.$store.commit("setSiteConfig", d);
					this.$sessionSet('SiteConfig', d)
					this.initLang(d)
					this.showProgress(false)
				})
				.catch(error => {
					this.procError(error);
					this.showProgress(false)
				})
				.finally(() => this.showProgress(false))
		},

		initVipInfo() {
			this.$post("/api/VipLevel/GetVipInfo")
				.then(resp => {
					return this.checkResp(resp, r => r.data.success === true);
				})
				.then(data => {
					let d = data.data;
					this.$store.commit("setVipInfo", d);
					this.$sessionSet('VipInfo', d)
				})
				.catch(error => {
					this.procError(error);
				});
		},

		onGetUnreadMessagesNumber() {
			this.$post('/api/Account/UnreadMessagesNumber')
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$store.commit("setMessagesNumber", data.data);
				})
				.catch(error => {
					this.procError(error)
				})
		},

		checkLogin() {
			this.$post("/api/Account/CheckLogin")
				.then(resp => {
					return this.checkResp(resp, r => r.data.success === true);
				})
				.then(() => {
					this.initMemberData()
					this.initMemberInfo();
				})
				.catch(error => {
					this.removeSession()
					this.procError(error);
				});
		},

		initLang(site) {
			if (['XOSOVN','SGDP', 'SGDG8'].includes(this.skgCodeKey)) return
			var lang = navigator.language || navigator.userLanguage;
			let preDefault = site && site.cultures.find(e => e.isDefault === true)
			let siteDefaultLang = preDefault ? preDefault.code : site.cultures[0].code

			let c = ''

			if (getCultureFromCookie()) {
				c = getCultureFromCookie()
			} else if (siteDefaultLang) {
				c = siteDefaultLang
			} else {
				c = lang
			}	

			this.initLocale(c);
		},

		initLocale(locale) {
			console.log('initLocale:',locale);
			let l = locale.substring(0, 2)
			let v = ''
			if (l === "en") {
				v = 'en-US'
				Locale.use('en-US', enUS);
			} else if (l === 'vi') {
				v = 'vi-VN'
				Locale.use('vi-VN', viVN)
			} else if (l === 'th') {
				v = 'th-TH'
				Locale.use('th-TH', thTH)
			} else if (l === 'id') {
				v = 'id-ID'
				Locale.use('id-ID', idID)
			} else if (l === 'hi') {
				v = 'hi-IN'
				Locale.use('hi-IN', hiIN)
			} else {
				v = 'zh-CN'
				Locale.use('zh-CN', zhCN);
			}

			setCultureFromCookie(v);
			this.$store.commit("setCulture", v);
			this.$i18n.locale = v;
		},

		removeSession() {
			removeTokenFromCookie()
			this.$store.commit('removeToken')
			this.$store.commit('removeMemberInfo')
			this.$store.commit('removeMemberData')
			this.$store.commit('removeSiteConfig')
			this.$store.commit('removeVipInfo')
			this.$store.commit('setCulture', null)
			sessionStorage.clear()
			this.getSiteConfig()
		},

		isNullOrUndefined(value) {
			return value === null || value === undefined || value === "";
		},

		$_throttle(func, delay = 1000) {
			let prev = Date.now();
			return function() {
				let context = this;
				let args = arguments;
				let now = Date.now();
				if (now - prev >= delay) {
					func.apply(context, args);
					prev = Date.now();
				}
			}
		}
	}
};
