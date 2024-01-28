<template>
    <div id="stationDetails">
        <div class="stationDetails-warp">
            <div class="text">
                <scroller>
                    <div class="text-left">
                        <div v-html="station && station.summary">
                        </div>
                    </div>
                </scroller>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'StationDetails',

	data() {
		return {
			station: {}
		}
	},

	created() {
		this.station = JSON.parse(sessionStorage.getItem('station-data'))
	}
}
</script>

<style lang="less" scoped>
#stationDetails {
    height: 100%;
    background-color: #ffffff;

    .stationDetails-warp {
        padding: 16px 16px 0 16px;

        .text {
            margin-top: 12px;
            font-size: 12px;

            > div {
                padding: 0 16px;
                font-size: 14px;
                text-align: left;
                color: #333333;
            }
        }
    }
}
</style>
