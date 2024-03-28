import {
	dateFormat,
	dateFormatMt_8,
	afterByDay,
	getCurrentMonthFirst,
	getLastMonthFirst,
	getLastMonthLastDay,
	string2date
} from '@/common/js/dateUtil'
import {isArray, isObject, isJson} from '@/utils/validate'
import {getTokenFromCookie, getCultureFromCookie} from '@/utils/auth'

export default {
	computed: {
		siteConfig() {
			return this.$store.getters.siteConfig || this.$sessionGet('SiteConfig')
		},

		culture() {
			return getCultureFromCookie() || this.$store.getters.culture
		},

		memberInfo() {
			return this.$store.getters.memberInfo
		},

		memberData() {
			return this.$store.getters.memberData
		},

		currencySymbol() {
			return this.memberData && this.memberData.currencySymbol
		},

		currencyDenomination() {
			return this.memberData && this.memberData.currencyDenomination
		},

		token() {
			return this.$store.getters.token || getTokenFromCookie()
		},
		
		skgUcsCode () {
			// return 'skgUcs' + '_' + this.siteConfig.codeKey
			return 'skgUcs'
		},

		skyLotteryCode () {
			return 'skyLottery'
		},
		
		skgGameCode () {
			// return 'skgGame' + '_' + this.siteConfig.codeKey
			return 'skgGame'
		},
		
		skgCode () {
			let e = this.$store.getters.skgCode
			return e && e.stencil
		},

		skgCodeKey () {
			let e = this.$store.getters.skgCode
			return e && e.codeKey
		},

		skinCode () {
			let e = this.$store.getters.skgCode
			return e && e.skinCode
		}

	},

	methods: {
		handleLotteryTab(key) {
			// 1官方 2传统 3简洁
			switch (key) {
				case 1:
					return 'allBet';
				default:
					return 'baseBet';
			}
		},
		handleToSecretString(val) {
			const curL = val.length;
			let secret = '*';
			for(let i = 0; i < curL-5; i++) {
				secret += '*';
			} 
			return secret + val.substring(curL-4);
		},
		
		sleep(n) {
			return new Promise(r => {
				setTimeout(r, n);
			});
		},

		handleLangOfNumber(number){
			const pre_number = number + ''
			const special = ['SGMGM', 'SGMP']
			if (this.culture === 'vi-VN' && special.indexOf(this.siteConfig.codeKey) > -1 ) {
				return this.$t('lottery.number') + ' ' + pre_number
			} else return pre_number + ' ' + this.$t('lottery.number') 
		},

		getLotteryImage(icon) {
			return this.siteConfig && this.siteConfig.imgPath + '/common/img/slots/SGLottery/' + icon
		},

		datesMaker(dates, isSeal){
			// isSeal 是否封盘
			if (!dates || isSeal) dates = '———';
			const datesToString = dates.toString();
			if (datesToString.length > 0 && datesToString.length < 4 && datesToString !== '———') {
				dates = this.addZero(dates);
			}
			switch (this.$store.getters.culture) {
				case 'vi-VN':
				case 'th-TH':
					return `${this.$t('lottery.dates')} ${dates}`
				default:
					return `${dates} ${this.$t('lottery.dates')}`;
			}
		},

		addZero(v) {
			let pre = v.toString();
			const gameCode = sessionStorage.getItem("gameCode_item");
			const hasFourNums = ['ffpk10', 'ffssc'];
			
			if (hasFourNums.indexOf(gameCode) > -1 ) {
				// 补足4位
				if (pre.length === 3 ) return ('0' + pre)
				if (pre.length === 2 ) return ('00' + pre)
				if (pre.length === 1 ) return ('000' + pre)
				return pre;
			} else {
				// 补足3位
				if (pre.length === 2 ) return ('0' + pre)
				if (pre.length === 1 ) return ('00' + pre)
				return pre;
			}
		},

		$portrait(photoUrl) {
			if (photoUrl) return (this.siteConfig && this.siteConfig.imgPath) + photoUrl;
			else return null;
		},

		getAvatar(p) {
			if (p) return `/images/member/avatars/${p}.png`
			else return null
		},

		getMoneyText (v, t) {
			if (Number(v) > 0) {
				return this.currencySymbol + v + this.currencyDenomination
			} else {
				if (t) return v
				else return this.$t('recharge.unlimited')
			}
		},

		formatDate(d) {
			if (!d || d === 'undefined' || d === 'null') return
			if (this.isAndroid()) return dateFormat(new Date(d), 'yyyy-MM-dd')
			else return dateFormat(string2date(d), 'yyyy/MM/dd')
		},
		
		formatDate_MT_8(d) {
			if (!d || d === 'undefined' || d === 'null') return
			if (this.isAndroid()) return dateFormatMt_8(new Date(d), 'yyyy-MM-dd')
			else return dateFormatMt_8(string2date(d), 'yyyy/MM/dd')
		},

		formatDateSS(d) {
			if (!d || d === 'undefined' || d === 'null') return
			if (this.isAndroid()) return dateFormat(new Date(d), 'yyyy-MM-dd hh:mm:ss')
			else return dateFormat(string2date(d), 'yyyy/MM/dd hh:mm:ss')
		},

		isEndDate(start, end) {
			let endTime = new Date(end).getTime()
			let present = new Date().getTime()
			if (start == null || end == null) return false
			else return Number(endTime - present) <= 0;
		},

		afterByDayFormat(date, n) {
			let d = afterByDay(new Date(date), n)
			return this.formatDate(dateFormat(d, 'yyyy-MM-dd'))
		},

		isAndroid() {
			if (/android/i.test(navigator.userAgent)) {
				return true
			}

			if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
				return false
			}
		},

		async getGameLoginUrl(platformActive, gameCode) {
			if (!this.isLogin() || this.isDottedGames()) return
			await this.$get(`/api/Game/GetGameLoginUrl?source=1&platformCode=${platformActive}&gameCode=${gameCode}`)
				.then(resp => { 
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					let routeData = ''
					if (d.url.indexOf('myform') > -1) {
						localStorage["asyncHtml"] = d.url;
						routeData = "./asyncPage.html";
					}

					if (this.isAndroid()) {
						if (routeData) window.open(routeData,'_blank')
						else window.open(d.url);
					} else {
						// ios
						const url = routeData ? routeData : d.url
						var linkElement = document.createElement('a');
						linkElement.setAttribute('href', url);
						window.document.body.appendChild(linkElement);
						linkElement.click();
						linkElement.remove();
					}
				})
				.catch(error => {
					this.procError(error)
				})
		},

		getGameImg(platform, img, categoryCode, item) {
			if (item && item.hasGameItems){
				return `${this.siteConfig.imgPath}/common/img/slots/platform/${item.imageName}_qp.png`;
			}
			if (categoryCode === 'by') return this.siteConfig && this.siteConfig.imgPath + '/common/img/slots/' + platform + '/h5/' + img
			else return this.siteConfig && this.siteConfig.imgPath + '/common/img/slots/' + platform + '/' + img
		},


		linkOpen(url) {
			window.open(url, '_blank');
		},

		linkOpenByIframe(url) {
			if (url.indexOf('/t.me/') > -1 ) {
				return this.linkOpen(url);
				// return plus.runtime.openURL(url);
			}
			sessionStorage.setItem('iframeUrl', url);
			this.$router.push('/app/iframePage');
		},

		isLogin() {
			if (!getTokenFromCookie()) {
				this.$error(this.$t('common.unLogin'))
				return false
			} else {
				return true
			}
		},
		
		// 虚线会员
		isVirtualMember () {
			let e = this.memberData && this.memberData.memberType
			if (Number(e) === 2) {
				this.$error(this.$t('common.isDotted'))
				return true
			} else {
				return false
			}
		},

		// 试玩会员
		isDottedMember () {
			let e = this.memberData && this.memberData.memberType
			if (Number(e) === 1) {
				this.$error(this.$t('common.isDotted'))
				return true
			} else {
				return false
			}
		},
		
		isDottedGames () {
			let e = this.memberData && this.memberData.memberType
			if (Number(e) === 1) {
				this.$error(this.$t('common.isDotted'))
				return true
			} else {
				return false
			}
		},

		$sessionGet(key) {
			let e = sessionStorage.getItem(key)
			if (e === 'true') return true
			else if (e === 'false') return false
			else if (isJson(e)) return JSON.parse(e)
			else return e
		},

		$sessionSet(key, value) {
			let e = value
			if (isArray(value) || isObject(value)) e = JSON.stringify(value)
			sessionStorage.setItem(key, e)
		},

		$sessionRemove(key) {
			sessionStorage.removeItem(key)
		},

		// 当前月份第一天
		getCurrentMonthFirst() {
			return getCurrentMonthFirst()
		},

		// 获取上月第一天
		getLastMonthFirst() {
			return getLastMonthFirst()
		},

		// 获取上月最后一天
		getLastMonthLastDay() {
			return getLastMonthLastDay()
		},

		// 数字相加精度问题
		formatNum(f, digit) {
			if (f <= 0) {
				return 0
			} else {
				var m = Math.pow(10, digit);
				return parseInt(f * m, 10) / m;
			}
		},

		copyBtnClick(e) {
			let _this = this;
			this.$copyText(e)
				.then(function () {
					_this.$toast(_this.$t("common.copySuccess"));
				})
				.catch(() => {
					_this.$toast(_this.$t("common.copyFailed"));
				});
		},

		redirectRouter(r) {
			this.$router.push(r)
		},

		// 压缩图片
		compress(img, Orientation) {
			let canvas = document.createElement('canvas')
			let ctx = canvas.getContext('2d')

			//canvas
			let tCanvas = document.createElement('canvas')
			let tctx = tCanvas.getContext('2d')
			let width = img.width
			let height = img.height

			//如果图片大于四百万像素，计算压缩比并将大小压至400万以下
			let ratio
			if ((ratio = (width * height) / 4000000) > 1) {
				ratio = Math.sqrt(ratio)
				width /= ratio
				height /= ratio
			} else {
				ratio = 1
			}
			canvas.width = width
			canvas.height = height
			//    铺底色
			ctx.fillStyle = '#fff'
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			//如果图片像素大于100万则使用瓦片绘制
			let count
			if ((count = (width * height) / 1000000) > 1) {
				count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
				// 计算每块瓦片的宽和高
				let nw = ~~(width / count)
				let nh = ~~(height / count)
				tCanvas.width = nw
				tCanvas.height = nh
				for (let i = 0; i < count; i++) {
					for (let j = 0; j < count; j++) {
						tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
						ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
					}
				}
			} else {
				ctx.drawImage(img, 0, 0, width, height)
			}

			//修复ios上传图片的时候 被旋转的问题
			if (Orientation != '' && Orientation != 1) {
				switch (Orientation) {
					case 6: //需要顺时针（向左）90度旋转
						this.rotateImg(img, 'left', canvas)
						break
					case 8: //需要逆时针（向右）90度旋转
						this.rotateImg(img, 'right', canvas)
						break
					case 3: //需要180度旋转
						this.rotateImg(img, 'right', canvas) //转两次
						this.rotateImg(img, 'right', canvas)
						break
				}
			}
			//进行最小压缩
			let ndata = canvas.toDataURL('image/jpeg', 0.1)
			tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
			return ndata
		},

		// 旋转图片
		rotateImg(img, direction, canvas) {
			//最小与最大旋转方向，图片旋转4次后回到原方向
			const min_step = 0
			const max_step = 3
			if (img == null) return

			//img的高度和宽度不能在img元素隐藏后获取，否则会出错
			let height = img.height
			let width = img.width
			let step = 2
			if (step == null) {
				step = min_step
			}
			if (direction == 'right') {
				step++
				//旋转到原位置，即超过最大值
				step > max_step && (step = min_step)
			} else {
				step--
				step < min_step && (step = max_step)
			}
			//旋转角度以弧度值为参数
			let degree = (step * 90 * Math.PI) / 180
			let ctx = canvas.getContext('2d')
			switch (step) {
				case 0:
					canvas.width = width
					canvas.height = height
					ctx.drawImage(img, 0, 0)
					break
				case 1:
					canvas.width = height
					canvas.height = width
					ctx.rotate(degree)
					ctx.drawImage(img, 0, -height)
					break
				case 2:
					canvas.width = width
					canvas.height = height
					ctx.rotate(degree)
					ctx.drawImage(img, -width, -height)
					break
				case 3:
					canvas.width = height
					canvas.height = width
					ctx.rotate(degree)
					ctx.drawImage(img, -width, 0)
					break
			}
		},

		//将base64转换为文件
		dataURLtoFile(dataUrl, files) {
			let arr = dataUrl.split(','),
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n)
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n)
			}
			return new File([u8arr], files.name, {
				type: files.type
			})
		},

		formatMoney(num){
			if (num >= 1e3 && num < 1e4){
				return parseInt(num / 1e3).toFixed(1) + 'K'
			} else if (num >= 1e4){
				return parseInt(num / 1e4).toFixed(1) + 'W'
			} else {
				return num
			}
		},

	}
};
