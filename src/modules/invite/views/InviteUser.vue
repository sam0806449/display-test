<template>
    <div id="inviteUser">
        <div class="view-background">
            <div class="view-background-flex">
                <div class="view-background-flex-top"></div>
                <div class="view-background-flex-bottom"></div>
            </div>
        </div>
        <scroller>
            <div class="warp pb-7">
                <div class="top">
                    <div class="top-img" :style="bgStyle">
                        <div class="code text-grey">
                            <div class="caption mb-1 van-ellipsis">{{$$t('title')}}</div>
                            <van-image src="/images/invite/code.png" width="76" height="72"/>
                            <div class="caption mt-1 van-ellipsis">{{$$t('scan')}}</div>
                        </div>
                    </div>

                    <div class="px-7">
                        <van-button size="small" hairline block @click="showShare=true"
                                    color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))">{{$$t('share')}}
                        </van-button>

                        <div class="pt-3 pb-8">
                            <div class="link px-3">
                                <div class="text-grey van-ellipsis">{{intrs && intrs.intrUrl}}</div>
                                <div class="main-text van-ellipsis" @click="copyBtnClick(intrs && intrs.intrUrl)">{{$$t('copyLink')}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="invite-center px-3 pt-3">
                    <div class="warp radius-2 px-9 pt-4">
                        <div class="title subtitle-4 main-text">{{$$t('award')}}</div>
                        <van-row type="flex" justify="space-between" class="pb-8">
                            <van-col span="12" class="mt-3">
                                <div class="main-text subtitle-1" @click="redirectRouter('subordinate')">
                                    <span class="mr-1">{{intrs && intrs.childAmount}} {{$$t('person')}}</span>
                                    <van-icon name="images/member/proceed.png" size="12"/>
                                </div>
                                <div class="caption">{{$$t('register')}}</div>
                            </van-col>

                            <van-col span="12" class="mt-3">
                                <div class="main-text subtitle-1" @click="redirectRouter('subordinate')">
                                    <span class="mr-1">{{intrs && intrs.childAmount}} {{$$t('person')}}</span>
                                    <van-icon name="images/member/proceed.png" size="12"/>
                                    </div>
                                <div class="caption">{{$$t('inviteSuccess')}}</div>
                            </van-col>

                            <van-col span="12" class="mt-3">
                                <div class="main-text subtitle-1">{{currencySymbol}}{{Number(intrs && intrs.invitationBonusReceived)===0 ? intrs && intrs.yesterdayRebate : intrs && intrs.invitationBonusReceived}}{{currencyDenomination}}</div>
                                <div class="caption">{{$$t('winnings')}}</div>
                            </van-col>

                            <van-col span="12" class="mt-3">
                                <div class="main-text subtitle-1">{{currencySymbol}}{{intrs && intrs.yesterdayRebate}}{{currencyDenomination}}</div>
                                <div class="caption">{{$$t('yesterdayRebate')}}</div>
                            </van-col>
                        </van-row>
                    </div>
                </div>

                <div class="invite-center px-3 pt-3">
                    <div class="warp radius-2 px-6 pt-4">
                        <div class="title subtitle-4 main-text">{{$$t('step')}}</div>
                        <van-row type="flex" justify="space-between" align="center" class="mt-5">
                            <van-col span="6" class="mt-3">
                                <van-image src="/images/invite/fx.png" width="44" height="44"/>
                            </van-col>
                            <van-col span="3" class="mt-3">
                                <van-image src="/images/invite/right-icon.png" width="21" height="28"/>
                            </van-col>

                            <van-col span="6" class="mt-3">
                                <van-image src="/images/invite/yq.png" width="44" height="44"/>
                            </van-col>
                            <van-col span="3" class="mt-3">
                                <van-image src="/images/invite/right-icon.png" width="21" height="28"/>
                            </van-col>
                            <van-col span="6" class="mt-3">
                                <van-image src="/images/invite/zc.png" width="44" height="44"/>
                            </van-col>
                        </van-row>

                        <van-row type="flex" justify="space-between" class="mt-1">
                            <van-col span="6">
                                <div class="text ma-auto text-grey caption van-multi-ellipsis--l3">{{$$t('step_1')}}</div>
                            </van-col>
                            <van-col span="6">
                                <div class="text ma-auto  text-grey caption van-multi-ellipsis--l3">{{$$t('step_2')}}</div>
                            </van-col>
                            <van-col span="6">
                                <div class="text ma-auto text-grey caption van-multi-ellipsis--l3">{{$$t('step_3')}}</div>
                            </van-col>
                        </van-row>

                        <van-row type="flex" align="center" class="mt-3">
                            <van-col span="6" class="mt-3">
                                <van-image src="/images/invite/kf.png" width="44" height="44"/>
                            </van-col>
                            <van-col span="3" class="mt-3">
                                <van-image src="/images/invite/right-icon.png" width="21" height="28"/>
                            </van-col>

                            <van-col span="6" class="mt-3">
                                <van-image src="/images/invite/sj.png" width="44" height="44"/>
                            </van-col>
                            <van-col span="3" class="mt-3">
                            </van-col>
                            <van-col span="6" class="mt-3">
                            </van-col>
                        </van-row>

                        <van-row type="flex" justify="space-between" class="pb-11 mt-1">
                            <van-col span="6">
                                <div class="ma-auto text-grey caption van-multi-ellipsis--l3">{{$$t('step_4')}}</div>
                            </van-col>
                            <van-col span="6">
                                <div class="text ma-auto  text-grey caption van-multi-ellipsis--l3">{{$$t('step_5')}}</div>
                            </van-col>
                            <van-col span="6">
                            </van-col>
                        </van-row>
                    </div>
                </div>

                <div class="invite-center px-3 pt-3">
                    <div class="warp radius-2 px-3 pt-4 pb-11">
                        <div class="title subtitle-4 main-text">{{$$t('proxy')}}</div>

                        <div class="flex mt-4">
                            <div class="subtitle-3 mr-6">
                                <div class="mt-4">{{$$t('proxy_0')}}</div>
                                <div class="mt-8">{{$$t('proxy_1')}}</div>
                                <div class="mt-8">{{$$t('proxy_2')}}</div>
                                <div class="mt-8">{{$$t('proxy_3')}}</div>
                            </div>
                            <div>
                                <van-image src="/images/invite/proxy.png" width="6.667rem" height="5.173rem"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </scroller>

        <van-share-sheet
                v-model="showShare"
                :options="options"
                @select="onSelect"
        />
    </div>
</template>

<script>
export default {
	name: 'InviteUser',

	data() {
		return {
			showShare: false,
			intrs: null,
			intrImage: 'images/invite/code.png',
			options: [
				{name: this.$$t('copyLink'), icon: 'link', value: 'copy'},
				{name: this.$$t('download'), icon: 'qrcode', value: 'qrcode'},
			]
		}
	},


	created() {
		this.onLoad()
	},


	computed: {
		bgStyle() {
			return {
				'background-image': `url(/images/invite/banner_${this.culture}.png)`,
				'background-size': '100% 380px',
                height: '380px',
                position: 'relative',
            }
        }
	},



	methods: {
		onLoad() {
			this.$post(`/api/MemberAgent/GetMemberIntr`)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.intrs = d
					this.intrImage = 'data:image/png;base64,' + d.intrImage
				})
				.catch(error => {
					this.procError(error)
				})
		},


		onSelect(option) {
			let intrClipboard = this.intrs.intrClipboard
			if (option.value === 'copy' && intrClipboard) {
				this.copyBtnClick(intrClipboard)
			} else if (option.value === 'qrcode') {
				this.downQrCode()
			}
			this.showShare = false;
		},

		downQrCode() {
			this.downloadFileByBase64(this.intrImage, "code.png");
		},

		dataURLtoBlob(dataurl) {
			var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1]
			var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new Blob([u8arr], {type: mime});
		},

		downloadFileByBase64(base64, name) {
			var myBlob = this.dataURLtoBlob(base64)
			var myUrl = URL.createObjectURL(myBlob)
			this.downloadFile(myUrl, name)
		},

		downloadFile(url, name = 'What\'s the fuvk') {
			var a = document.createElement("a")
			a.setAttribute("href", url)
			a.setAttribute("download", name)
			a.setAttribute("target", "_blank")
			let clickEvent = document.createEvent("MouseEvents");
			clickEvent.initEvent("click", true, true);
			a.dispatchEvent(clickEvent);
		},

		$$t(v) {
			return this.$t('invite.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#inviteUser {
    height: 100%;
    background-color: rgb(248, 250, 250);

    .view-background {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #f9fbfe;
        background-size: 100% 380px;

        .view-background-flex {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;

            .view-background-flex-top {
                flex: 1;
                background: #f9fbfe;
                background-size: 100% 380px;
            }

            .view-background-flex-bottom {
                flex: 1;
                background: transparent;
            }
        }
    }

    .warp {
        height: 100%;

        .top {
            background-color: white;

            .top-img {
                .code {
                    width: 105px;
                    position: absolute;
                    bottom: 28px;
                    right: 35px;
                }
            }

            .van-button {
                height: 34px;
                border-radius: 8px;
            }

            .link {
                height: 26px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: rgb(248, 248, 248);
                border-radius: 8px;
                .main-text {
                    text-align: right;
                    width: 20%;
                }
            }
        }

        .invite-center {
            > .warp {
                background-color: white;

                .title {
                    height: 22px;
                    background: url('/images/invite/title_bg.png') white no-repeat;
                    background-size: 100% 22px;
                }
            }

            .text {
                width: 48px;
            }
        }


    }
}
</style>
