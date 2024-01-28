<template>
    <div class="pa-4">
        <div v-html="item"></div>
    </div>
</template>

<script>
export default {
    name: "HrefForm",

    data() {
        return {
            item: null,
        };
    },

    created() {
        this.item = sessionStorage.getItem("payUrl");
        this.$nextTick(() => {
            document.getElementById("payform").submit();
        });
    },

    beforeRouteLeave(to, form, next) {
        sessionStorage.removeItem("payUrl");
        next();
    },
};
</script>

<style lang="less" scoped>
</style>
