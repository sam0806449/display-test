<template>
  <div class="footer-sponsor">
    <div class="line"></div>
    <div class="flex flex-wrap logo-box">
      <vue-touch-scroll type="horizontal" hide-scrollbar class="flex">
        <div class="logo-block">
          <van-image
            v-for="(item, i) in footer_logs"
            :key="i"
            class="mx-3 my-2"
            :src="`/images/footer/color_logo/${item}.png`"
            width="60"
            fit="contain"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
      </vue-touch-scroll>
    </div>

    <div class="line"></div>
    <div class="flex my-4">
      <vue-touch-scroll type="horizontal" hide-scrollbar class="flex">
        <div v-for="(item, i2) in footer_logs_2" :key="i2" 
        class="logo2-box flex">
          <van-image
            class="mx-3 my-2 img-box"
            :src="`/images/footer/${item}.png`"
            fit="contain"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <p>{{ $$t(`info_${i2 + 1}`) }}</p>
        </div>
      </vue-touch-scroll>
    </div>

    <div class="copyright">
      <div class="spec">
        <p>{{ siteConfig && siteConfig.siteTitle }}{{ $$t("title") }}</p>
      </div>
      <p class="des mt-3">
        {{ $$t("copyright_1") }} {{ siteConfig && siteConfig.siteTitle }}
        {{ $$t("copyright_2") }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterOFSponsor",

  data: () => ({
    footer_logs: [
      "ag",
      "ae",
      "bti",
      "cq9",
      "fg",
      "ae-lottery",
      "jdb",
      "joker",
      "ky",
      "gw",
      "ly",
      "ae-sexy",
      "saba",
      "digmaan",
      "wm",
      "mw",
      "sbobet",
      "pt",
      "dg",
      "leb",
      "v8",
    ],
    footer_logs_2: ["footer_logo1", "footer_logo2", "footer_logo3"]
  }),

  methods: {
    $$t(v) {
      return this.$t("appFooter." + v);
    },
  },
};
</script>

<style lang="less" scoped>
.footer-sponsor {
  color: #90a2dc;
  .logo-box {
    margin: 10px 0;
    .logo-block {
      width: 600px;
    }
  }
  .line {
    margin: auto;
    height: 1px;
    opacity: 0.5;
    background: rgba(144, 162, 220, 0.15);
  }
  .logo2-box {
    flex-direction: column;
    justify-content: center;
    .img-box {
      height: 43px;
      min-width: 130px;
    }
  }
  .copyright {
    padding: 0 20px;
    .des {
      color: rgba(144, 162, 220, 0.3);
    }
  }
}
</style>