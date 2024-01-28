<template>
  <div id="appHome">
    <toolbar v-if="!isShowToolbar" />
    <div
      class="page-content"
      :class="[
        isShowTabbar ? 'hideTabbar' : '',
        isShowToolbar ? 'hideToolbar' : '',
        `page-content-${skinCode}`,
      ]"
    >
      <keep-alive v-if="$route.meta.keepAlive" :max="5">
        <router-view></router-view>
      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <tabbar />
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Tabbar from "@/components/Tabbar";
import sessionContext from "@/mixins/sessionContext";
import Meta from "@/mixins/meta";

export default {
  name: "AppHome",
  mixins: [sessionContext, Meta],
  components: {
    Toolbar,
    Tabbar,
  },

  computed: {
    isShowTabbar() {
      return this.$route.meta && this.$route.meta.childPage;
    },

    isShowToolbar() {
      let r = this.$route.name;
      return (
        r === "searchGames" ||
        r === "lottery" ||
        r === "jointSearchCountry" ||
        r === "bets" ||
        r === "pk10" ||
        r === "pk10simple" ||
        r === "sscSimple" ||
        r === "ssc" ||
        r === "vnsouth" ||
        r === "mark6" ||
        r === "lotteryTrend"
      );
    },
  },
};
</script>

<style lang="less">
#appHome {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .page-content {
    position: absolute;
    z-index: 1;
    width: 100vw;
    left: 0;
    right: 0;
    top: 46px;
    bottom: calc(50px + constant(safe-area-inset-bottom));
    bottom: calc(50px + env(safe-area-inset-bottom));
    overflow: hidden;
    background-color: #f5f5f9;
  }
  .page-content-SGYF {
    background-color: #fff;
  }
}

.hideTabbar {
  bottom: 0 !important;
}

.hideToolbar {
  top: 0 !important;
}
</style>
