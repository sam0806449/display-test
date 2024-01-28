export default {
  computed: {},

  methods: {
    // 彩票：近期开奖
    getRecentResults(lottery, nums) {
      return this.$get(
        `/api/Lottery/GetRecentResults?type=${lottery}&num=${nums}`
      )
        .then((resp) => {
          this.checkResp(resp, (r) => r.data.success === true);
          return resp.data.data;
        })
        .catch((error) => {
          this.procError(error);
        });
    },
    // 取当前 期数/倒数时间
    // isOpen: 是否封盘  false:封盘
    // isEnabled: 是否启用  false:禁用
    getCurrentDatesData(lotteryCode) {
      return this.$get("/api/Lottery/GetCurrentDates?type=" + lotteryCode).then(
        (resp) => {
          this.checkResp(resp, (r) => r.data.success === true);
          const { data } = resp.data;
          if (data.secondsRemaining === 0) {
            setTimeout(() => {
              this.getCurrentDatesData();
            }, 1000);
          } else {
            return resp.data.data;
          }
        }
      ).catch((error) => {
        this.procError(error);
      });
    },
    // 两面长龙
    getCalcResult(lotteryCode) {
      return this.$get(`api/Lottery/GetlmclResult?lotteryType=${lotteryCode}`)
      .then((resp) => {
          this.checkResp(resp, (r) => r.data.success === true);
          return resp.data.data;
        })
        .catch((error) => {
          this.procError(error);
        })
    }
  },
};
