<template>
    <div id="sportsBetting" class="pa-4">
        <scroller>
            <div class="rules-text mt-2 pa-4 background-white text-left">
                <div class="subtitle-3"> 一、转账</div>
                1.充值的资金在中心钱包，如要进行体育或者其他场馆的游戏，请点击【转账】将主账户的资金转账到相应场馆即可。
                <br/>2.【一键转入】快速将主账户金额转入对应的场馆。
                <br/>3.【一键回收】快速将各个场馆的金额转到主账户。
                 
                <div class="subtitle-3 mt-4">二、投注</div>
                在网站首页选择【天游国际体育】进入投注界面。根据比赛时间，投注界面可以分为【滚球】、【今日】、【早盘】三种，可以将不同的赛事组合为串关，以小博大。
                 
                <br/><br/>1.【滚球】
                <br/>投注正在进行的比赛，玩家可以边看比赛边下注。

                <br/><br/>2.【今日】
                <br/>投注今日所有赛事，中午12:00到次日12:00为一个比赛日。

                <br/><br/>3.【早盘】
                <br/>投注未来几天即将开始的赛事。
                 
                <div class="subtitle-3 mt-4">三、天游国际盘口玩法介绍</div>
                1.【独赢】
                <br/>顾名思义，可直接下注比赛的胜负平。
                 
                <br/><br/>2.【让球】
                <br/>在现有比分基础上让球或受让，下注前已获得的进球将不被计算，下注时的比分将视为0-0.如标注有“上半场”字样，则以半场赛果来结算，没有标注则默认为全场，以全场赛果来结算。

                <br/><br/>3.【大小球】
                <br/>投注两队总进球数的大小，总进球数比盘口大即大球，比盘口小即小球，刚好等于盘口退本金。
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
	name: 'SportsBetting',

	data: () => ({}),


	created() {
	},

	methods: {}
}
</script>

<style lang="less" scoped>
#sportsBetting {
    height: 100%;
    color: rgb(102, 102, 102);
}
</style>
