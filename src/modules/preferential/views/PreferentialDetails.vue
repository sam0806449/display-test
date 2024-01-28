<template>
    <div id="preferentialDetails">
        <div class="warp" :class="{requirementType: item.requirementType === 4}">
            <div class="warp-center">
                <scroller>
                    <div class="background-white">
                        <van-image :src="$portrait(item.contentImg)" v-if="item.contentImg" class="mb-3">
                            <template v-slot:loading>
                                <van-loading type="spinner" size="20"/>
                            </template>
                        </van-image>
                    </div>

                    <div class="px-3 pb-5 pt-3">
                        <template v-if="item.requirementType === 4">
                            <div v-if="item.participationMethod" class="background-white px-4 text-left py-3 radius-2">
                                <div class="text-center main-text subtitle-4 pb-4">{{item.title}}</div>
                                <div v-html="item.participationMethod"></div>
                            </div>
                        </template>
                        
                        <div v-else>
                            <div v-if="item.participationMethod" class="background-white px-4 text-left py-3 radius-2 mb-3">
                                <div class="text-center main-text subtitle-4 pb-4">{{item.title}}</div>
                                <div v-html="item.participationMethod"></div>
                            </div>
                            <template v-if="item.activityRequirementObj.length">
                                <van-row gutter="8" type="flex" justify="space-between" v-if="Number(item.giftType) === 1">
                                    <template v-for="(obj, index) in item.activityRequirementObj">
                                        <van-col span="12" :key="index" v-if="obj.pic">
                                            <div class="background-white mb-2 pt-4 pb-2 px-4 radius-1">
                                                <van-image :src="$portrait(obj.pic)" width="81"/>
                                                <div class="info">
                                                    <div class="caption-bold mt-2">{{obj.name}}</div>
                                                    <span class="caption text-grey mt-1">{{$$t('type_1')}}{{getTypeText()}}{{$$t('type_2')}}</span>
                                                    <div class="main-text mt-1">
                                                        {{currencySymbol}}{{obj.requirement}}{{currencyDenomination}}
                                                    </div>
                                                </div>
                                                <div class="btn caption mt-1 mb-1">
                                                    <van-button round block type="info" size="mini"
                                                                @click="onActivityReceive(obj)">{{$$t('receive')}}
                                                    </van-button>
                                                </div>
                                            </div>
                                        </van-col>
                                    </template>
                                </van-row>

                                <div class="pa-3 background-white radius-2" v-else>
                                    <table class="table_activity mt-1">
                                        <tr>
                                            <th class="van-toast__text">{{item.activityCalculationCycleDesc}} {{getTypeText()}}</th>
                                            <th class="van-toast__text">{{item.giftTypeDesc}}</th>
                                            <th class="van-toast__text">{{$$t('betMultiple')}}</th>
                                        </tr>
                                        <template v-for="(obj, index) in item.activityRequirementObj">
                                            <tr :class="{tr_bg_color: index%2}" :key="index">
                                                <td>{{item.currencySymbol}}{{obj.requirement}}{{item.currencyDenomination}}</td>
                                                <td>{{item.currencySymbol}}{{obj.bonus}}{{item.currencyDenomination}}</td>
                                                <td :rowspan="Number(item.activityRequirementObj.length)" v-if="index===0">
                                                    {{Number(item.betMultiple) > 0 ? item.betMultiple + $$t('betMultiple_1')
                                                    : $$t('betMultiple_2')}}
                                                </td>
                                            </tr>
                                        </template>
                                    </table>
                                </div>
                            </template>
                        </div>

                        <div v-if="item.ruleDescription" class="background-white px-4 py-5 text-left mt-4 rule-color radius-2">
                            <div class="rule-title text-center mb-5">
                                <span>{{$$t('rules')}}</span>
                            </div>
                            <div v-html="item.ruleDescription"></div>
                        </div>
                    </div>
                </scroller>
            </div>
        </div>

        <van-tabbar fixed class="py-4" v-if="item.requirementType === 4 && !['SGGC'].includes(skgCodeKey)">
            <div class="btn px-4">
                <van-button hairline block color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))"
                            @click="goApply">
                    {{$$t('apply')}}
                </van-button>
            </div>
        </van-tabbar>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)


export default {
	name: 'PreferentialDetails',

	data: () => ({
		item: {},
		bs: null
	}),

	activated() {
		let details_id = this.$route.query.details_id
		this.onGetActivityDetail(details_id)
	},

	beforeDestroy() {
		if (this.bs) this.bs.destroy()
	},

	methods: {
		onGetActivityDetail(objId) {
			this.$get('/api/Activity/GetActivityDetail?objId=' + objId)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.item = data.data
					this.$nextTick(() => {
						let e = document.getElementsByClassName('table')
						if (e.length > 0) this.init()
					});
				})
				.catch(error => {
					this.procError(error)
				})
		},

		onActivityReceive(item) {
			if (Number(item.requirement) > Number(this.item.completedRequirements)) {
				this.$toast(this.$$t('requirementDesc'))
				return
			}
			let r = [
				{fieldName: '', value: item.name}
			]

			this.$post('/api/Activity/ActivityReceive', {
				objId: this.$route.query.details_id,
				activityReceiveParams: r
			})
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$toast(data.data)
				})
				.catch(error => {
					this.procError(error)
				})
		},

		goApply() {
			this.$sessionSet('apply-item', this.item.activityRequirementObj)
			this.$router.push({path: 'apply', query: {objId: this.$route.query.details_id}})
		},

		getTypeText() {
			let type = this.item.requirementType
            return this.item.requirementTypeDesc
			// return type === 0 ? this.$$t('requirementType_1') : (type === 1 ? this.$$t('requirementType_2') : (type === 2 ? this.$$t('requirementType_3') : this.$$t('requirementType_4')))
		},

		init() {
			this.bs = new BScroll('.table', {
				observeDOM: true,
				scrollX: true,
				scrollY: false,
				eventPassthrough: 'vertical'
			})
		},

		$$t(v) {
			return this.$t('preferentialDetails.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#preferentialDetails {
    height: 100%;

    .warp {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .warp-center {
            height: 100%;
        }
    }

    .requirementType {
        bottom: 80px !important;
    }

    .btn {
        /deep/ .van-button {
        }
    }

    .info {
        height: 70px;
    }

    .rule-title {
        background-image: url("/images/preferential/title-banner.png");
        height: 22px;
        line-height: 22px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;

        span {
            font-size: 16px;
            font-weight: 500;
            color: rgb(92, 134, 255);
        }
    }

    .rule-color {
        color: rgb(102, 102, 102);
    }

    .btn {
        width: 100%;
    }

    .table_activity {
        table-layout: fixed !important;
        width: 100% !important;
        border-collapse: collapse;
        border: none;
        font-size: 14px;
        background-color: white;

        th {
            background-color: rgb(92, 134, 255);
            color: white;
            padding-top: 4px;
            padding-bottom: 4px;
            height: 40px;
        }

        td {
            height: 30px;
        }

        .tr_bg_color {
            background-color: #f2f2f2;
        }

        td, th {
            width: 1px;
            white-space: nowrap;
            border: solid darkgray 1px;
            text-align: center;
            white-space: pre-line;
            word-break: break-all !important;
            word-wrap: break-word !important;
            display: table-cell;
            vertical-align: middle !important;
            white-space: normal !important;
            vertical-align: text-top;
            padding: 2px 2px 0 2px;
            display: table-cell;
        }
    }
}
</style>
