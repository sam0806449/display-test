export default {
	// ----------------------------------------------
	// Session 控制
	// ----------------------------------------------
	token: state => {
		return state.session.token
	},

	memberInfo: state => {
		return state.session.memberInfo
	},

	memberData: state => {
		return state.session.memberData
	},

	siteConfig: state => {
		return state.session.siteConfig
	},

	vipInfo: state => {
		return state.session.vipInfo
	},

	isExistBankInfo: state => {
		return state.session.isExistBankInfo
	},

	culture: state => {
		return state.session.culture
	},

	messagesNumber: state => {
		return state.session.messagesNumber
	},
	
	pageTitle: state => {
		return state.session.pageTitle
	},

	topActive: state => {
		return state.preferential.topActive
	},

	showReportPopup: state => {
		return state.member.showReportPopup
	},

	showDraggable: state => {
		return state.member.showDraggable
	},
	
	filtering: state => {
		return state.ucs.filtering
	},
	
	showFilter: state => {
		return state.ucs.showFilter
	},
	
	skgCode: state => {
		return state.skgCode
	}
}
