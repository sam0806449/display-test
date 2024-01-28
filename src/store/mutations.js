export default {
	// ----------------------------------------------
	// session 控制
	// ----------------------------------------------

	setToken(state, token) {
		state.session.token = token
	},

	removeToken(state) {
		state.session.token = null
	},

	setMemberInfo(state, memberInfo) {
		state.session.memberInfo = memberInfo
	},

	removeMemberInfo(state) {
		state.session.memberInfo = null
	},

	setMemberData(state, memberData) {
		state.session.memberData = memberData
	},

	removeMemberData(state) {
		state.session.memberData = null
	},

	setSiteConfig(state, siteConfig) {
		state.session.siteConfig = siteConfig
	},

	removeSiteConfig(state) {
		state.session.siteConfig = null
	},

	setSiteVipInfo(state, vipInfo) {
		state.session.vipInfo = vipInfo
	},

	removeVipInfo(state) {
		state.session.vipInfo = null
	},

	setIsExistBankInfo(state, isExistBankInfo) {
		state.session.isExistBankInfo = isExistBankInfo
	},

	setMessagesNumber(state, messagesNumber) {
		state.session.messagesNumber = messagesNumber
	},

	removeMessagesNumber(state) {
		state.session.messagesNumber = 0
	},

	setCulture(state, culture) {
		state.session.culture = culture
	},

	setPageTitle(state, pageTitle) {
		state.session.pageTitle = pageTitle
	},
	
	setTopActive(state, topActive) {
		state.preferential.topActive = topActive
	},

	setShowReportPopup(state, showReportPopup) {
		state.member.showReportPopup = showReportPopup
	},

	setShowDraggable(state, showDraggable) {
		state.member.showDraggable = showDraggable
	},

	setFiltering(state, filtering) {
		state.ucs.filtering = filtering
	},

	setShowFilter(state, showFilter) {
		state.ucs.showFilter = showFilter
	},
	
	setSkgCode(state, skgCode) {
		state.skgCode = skgCode
	},
	
}
