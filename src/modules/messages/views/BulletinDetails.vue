<template>
    <div id="bulletinDetails">
        <div class="bulletinDetails-warp">
            <div class="title van-ellipsis">
                {{bulletin && bulletin.title}}
            </div>
            <div class="date">
                {{bulletin && bulletin.time}}
            </div>
            <van-divider/>
            <div class="text">
                <scroller>
                    <div class="text-left">
                        <div v-html="bulletin && bulletin.summary">
                        </div>
                    </div>
                </scroller>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'BulletinDetails',

	data() {
		return {
			bulletin: {}
		}
	},

	created() {
		this.bulletin = JSON.parse(sessionStorage.getItem('bulletin-data'))
	},

	methods: {}
}
</script>

<style lang="less" scoped>
#bulletinDetails {
    height: 100%;
    background-color: #ffffff;

    .bulletinDetails-warp {
        padding: 16px 16px 0 16px;

        .title {
            min-height: 44px;
            font-size: 16px;
            font-weight: 500;
            color: #333333;
        }

        .date {
            height: 16px;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 7.5px;
            line-height: 1.33;
            color: #666666;
        }

        .van-divider {
            margin: 0;
            color: #f5f5f9;
        }

        .text {
            position: absolute;
            top: 87.5px;
            left: 0;
            right: 0;
            bottom: 10px;
            overflow: hidden;
            margin-top: 11.5px;
            font-size: 12px;

            > div {
                padding: 0 16px;
                font-size: 14px;
                line-height: 1.43;
                text-align: justify;
                color: #333333;
            }
        }
    }
}
</style>
