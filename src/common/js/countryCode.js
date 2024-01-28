export default {
	countryCodes:
		[
			{
				'english_name': 'Chinese',
				'chinese_name': '中国',
				'country_code': 'CN',
				'phone_code': '86'
			},
			{
				'english_name': 'United States',
				'chinese_name': '美国',
				'country_code': 'US',
				'phone_code': '1'
			},
			{
				'english_name': 'Vietnam',
				'chinese_name': '越南',
				'country_code': 'VN',
				'phone_code': '84'
			},
			{
				'english_name': 'Thailand',
				'chinese_name': '泰国',
				'country_code': 'TH',
				'phone_code': '66'
			},
			{
				'english_name': 'Indonesia',
				'chinese_name': '印度尼西亚',
				'country_code': 'ID',
				'phone_code': '62'
			},
			{
				'english_name': 'India',
				'chinese_name': '印度',
				'country_code': 'IN',
				'phone_code': '91'
			},
		],

	getPhoneCode(v) {
		if (!v) return ''
		let e = this.countryCodes.filter(e => e.country_code === v)
		return e.length > 0 ? e[0].phone_code : ''
	},

	getCountryCode (v) {
		if (!v) return ''
		let e = this.countryCodes.filter(e => Number(e.phone_code) === Number(v))
		return e.length > 0 ? e[0].country_code : ''
	}
}
