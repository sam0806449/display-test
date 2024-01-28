<template>
    <div id="financialNotes">
        <div class="px-4 flex">
            <van-dropdown-menu active-color="rgb(70 132 255)">
                <van-dropdown-item :title="dropdownTitle" ref="type">
                    <div class="dropdown-warp">
                        <div class="btns">
                            <div class="btn van-ellipsis" :class="{active: recordType === c.value}" v-for="(c, index) in categorys"
                                 :key="index" @click="typeClick(c)">
                                <span>{{c.text}}</span>
                            </div>
                        </div>
                    </div>
                </van-dropdown-item>
            </van-dropdown-menu>
        </div>

        <div class="notes-center">
            <scroll-view
                    :onRefresh="onRefresh"
                    :loadMore="onLoadMore">
                <div class="notes-content" v-show="items.length>0">
                    <template v-for="(item, index) in items">
                        <div class="list" :key="index">
                            <div class="list-left">
                                <div class="list-left-tag van-ellipsis">
                                    <van-tag color="#DE6470" plain>{{getRecordType(item.recordType)}}</van-tag>
                                </div>
                                <div class="list-left-center">
                                    <div class="title">{{item.productName}}</div>
                                    <div class="desc">{{formatDate(item.createTime)}}</div>
                                </div>
                            </div>

                            <div class="list-right">{{currencySymbol}}{{item.money}}{{currencyDenomination}}</div>
                        </div>
                        <van-divider style="margin: 0; padding: 0 16px;background-color: white;" :key="index"
                                     v-show="index< items.length-1"/>
                    </template>
                </div>

                <van-empty v-show="items.length === 0" :description="$t('common.noMore')" class="text-center">
                    <template #image>
                        <van-image src="/images/empty/no-more.png" width="280" height="130"/>
                    </template>
                </van-empty>
            </scroll-view>
        </div>
    </div>
</template>

<script>
export default {
	name: 'FinancialNotes',

	data() {
		return {
			categorys: [
				{text: this.$t('common.all'), value: ''},
				{text: this.$$t('category1'), value: 1},
				{text: this.$$t('category2'), value: 2},
				{text: this.$$t('category3'), value: 3}
			],
			dropdownTitle: '',
			items: [],
			refresh: false,
			recordType: 1,
			pageIndex: 1,
		}
	},

	activated() {
		this.dropdownTitle = this.$t('common.all')
		this.onRefresh()
	},

	methods: {
		onLoad(done) {
			this.showProgress()
			this.$post('/api/Financial/GetMemberFinMoneyRecords', {
				recordType: this.recordType,
				pageIndex: this.pageIndex,
				pageSize: 10
			})
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					let d = data.data
					this.pageIndex = this.pageIndex + 1
					if (this.refresh) {
						this.items = []
						this.items = d.items
						if (done) {
							this.refresh = false
							done()
						}
					} else {
						if (d.items.length > 0) {
							this.items.push(...d.items)
							if (done) done(false)
						} else {
							if (done) done(true)
						}
					}
					this.showProgress(false)
				})
				.catch(error => {
					if (done) done(true)
					this.showProgress(false)
					this.procError(error)
				})
		},


		onLoadMore(done) {
			this.refresh = false
			this.onLoad(done)
		},


		onRefresh(done) {
			this.refresh = true
			this.pageIndex = 1
			this.onLoad(done)
		},

		getRecordType(n) {
			if (n === 1) return this.$$t('category1')
			if (n === 2) return this.$$t('category2')
			if (n === 3) return this.$$t('category3')
		},

		typeClick(e) {
			this.recordType = e.value
			this.dropdownTitle = e.text
            this.onRefresh()
			this.$refs.type.toggle()
		},

		$$t(key) {
			if (!key) return ''
			return this.$t('financialNotes.' + key)
		}
	}
}
</script>

<style lang="less" scoped>
#financialNotes {
    height: 100%;
    background-color: white;

    /deep/ .van-dropdown-menu {
        .van-dropdown-menu__bar {
            height: 32px;
            box-shadow: none;
            background-color: unset;
        }

        .van-dropdown-menu__title {
            text-align: center;
            height: 32px;
            padding: 0 24px;
            line-height: 32px;
            border-radius: 2px;
            background-color: #fff;
        }

        .van-dropdown-item {
            /*top: 144.969px !important;*/
        }

        .van-dropdown-menu__title::after {
            right: 5px;
        }
    }

    .active {
        background-color: rgb(223, 236, 255) !important;

        span {
            color: rgb(82, 149, 253) !important;
        }
    }

    .dropdown-warp {
        padding: 12px 10px 16px 10px;

        .btns {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .btn {
                width: 111px;
                line-height: 32px;
                margin-bottom: 12px;
                border-radius: 5px;
                background-color: #f5f5f9;
                text-align: center;

                span {
                    height: 16px;
                    font-size: 12px;
                    line-height: 16px;
                    text-align: center;
                    color: #333333;
                }
            }
        }
    }

    .notes-center {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 44px;
        border-top: 1px solid rgb(204, 204, 204);

        .notes-content {
            .list {
                text-align: left;
                padding: 16px 16px 0 16px;
                background-color: white;
                height: 70px;
                display: flex;
                justify-content: space-between;

                .list-left {
                    display: flex;

                    .list-left-tag {
                        margin-right: 5px;
                    }

                    .list-left-center {
                        .title {
                            font-size: 14px;
                        }

                        .desc {
                            margin-top: 4px;
                            font-size: 12px;
                            color: #999999;
                        }
                    }
                }

                .list-right {
                    text-align: right;
                    font-size: 14px;
                }
            }
        }
    }


}
</style>
