import sessionContext from '@/mixins/sessionContext'
import {getTokenFromCookie, getCultureFromCookie} from "@/utils/auth";
import { GetGroup, GetUserInfo, Logout ,GetMemberData, GetSiteConfig, Login, CheckLogin, GetActivityList, GameCategorys, GetSlide, GetAllNotice, GetActivityGroups, GetCurrency, Games } from '@/utils/fake'

export default {
	mixins: [sessionContext],

	methods: {
		$get(url, params) {
			console.log(url);
			let _this = this;
			return new Promise((resolve, reject) => {
					if (url === '/api/Lottery/GetGroup'){
						resolve({ data: GetGroup});
					} else if (url === '/api/Game/GameCategorys'){
						resolve({ data: GameCategorys});
					} else if (url === '/api/Activity/GetActivityGroups') {
						resolve({ data: GetActivityGroups});
					} else if (url === '/api/Activity/GetActivityList?groupId=&pageSize=10&pageIndex=1') {
						resolve({ data: GetActivityList});
					} 
					
					
				else {
					_this.$http.get(url, {
							params: params,
							headers: {token: getTokenFromCookie(), Culture: getCultureFromCookie(), clientType: 2}
						})
						.then(resp => {
							resolve(resp);
						})
						.catch(error => {
							//玩彩票途中的异常处理
							const type = sessionStorage.getItem("rules_code")
							if(type) {setTimeout(() => {
								_this.$router.push('/app/lotteryLobby')
							}, 1000)}
							reject(error);
						});
				}
			});
		},

		$post(url, params, headerConfig = {}) {
			let _this = this;
			_this.$http.defaults.timeout = 5000;
			return new Promise((resolve, reject) => {
				if (url === '/api/Home/GetSlide'){
					console.log('GetSlide:', GetSlide);
					resolve({ data: GetSlide});
				} else if (url === '/api/Home/GetAllNotice'){
					resolve({ data: GetAllNotice});
				} else if (url === '/api/Account/GetCurrency'){
					resolve({ data: GetCurrency } );
				} else if (url === '/api/Home/GetSiteConfig'){
					resolve({ data: GetSiteConfig});
				} else if (url === '/api/Game/Games'){
					resolve({ data: Games});
				} else if (url === '/api/Account/Login'){
					resolve({ data: Login});
				} else if ( url === '/api/Account/CheckLogin') {
					resolve({ data: CheckLogin});
				} else if (url === '/api/Account/GetMemberData') {
					resolve({ data: GetMemberData});
				} else if (url === '/api/Account/GetUserInfo') {
					resolve({ data: GetUserInfo});
				} else if (url === '/api/Account/Logout') {
					resolve({ data: Logout});
				}
				
				else {
				_this.$http.post(url, params, {
						headers: {token: getTokenFromCookie(), Culture: getCultureFromCookie(), clientType: 2, ...headerConfig}
					})
					.then(resp => {
						if (resp.data && resp.data.errorCode === "NotLogin") {
							_this.removeSession()
							_this.$router.push({name: 'login'})
						}
						resolve(resp);
					})
					.catch(error => {
						//玩彩票途中的异常处理
						const type = sessionStorage.getItem("rules_code")
						if(type) {setTimeout(() => {
						_this.$router.push('/app/lotteryLobby')
						}, 1000)}
						reject(error);
					});
				}	
			});
		},

		$hasRespError(resp) {
			return (resp.data && resp.data.success !== null && resp.data.success !== undefined && resp.data.success === false);
		},

		checkResp(resp, fn) {
			return new Promise((resolve, reject) => {
				if (fn && fn(resp)) {
					resolve(resp.data);
				} else {
					reject(resp.data);
				}
			});
		},

		procError(error, errAction) {
			if (error.errorCode === "NotLogin") {
				this.removeSession()
				this.$router.push('/login')
				this.$error(error.message);
				return true;
			} else if (error && error.message === 'Network Error') {
				this.$error(this.$t('common.noNetwork'));
				return true;
			} else if (error && error.response && error.response.status === 504) {
				this.$error(this.$t('common.error504'));
				return true;
			} else if (error && error.response && error.response.status === 401) {
				this.$error(this.$t('common.error401'));
				return true;
			} else if (error && error.response && error.response.status === 500) {
				this.$error(this.$t('common.error500'));
				return true;
			} else if (error && error.response && error.response.status === 404) {
				this.$error(this.$t('common.error404'));
				return true;
			} else if (this.$hasRespError(error)) {
				this.$error(error.message);
				return true;
			} else if (errAction) {
				this.$error(errAction);
				return true;
			} else if (error && error.message) {
				this.$error(error.message);
				return true;
			}
			return false;
		},

		$success(message) {
			if (message) this.$toast.success(message);
			else this.$toast.success(this.$t('common.success'));
		},

		$info(message) {
			this.$toast(message);
		},

		$error(message) {
			this.$toast.fail(message);
		},

		showProgress(show, duration=1000) {
			if (show || show === null || show === undefined) {
				this.$toast.loading({
					message: this.$t('common.loading'),
					forbidClick: true,
					duration
				});
			} else {
				this.$toast.clear();
			}
		}
	}
};
