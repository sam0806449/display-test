<template>
    <div id="qrCode">
        <div class="qrCode-content">
            <van-image
                width="180"
                height="180"
                :src="payUrl"
                lazy-load
                @click="showPreview = true"
            />
            <div class="press">点击预览图片保存</div>
            <div class="qrCode-rules">
                <div class="title">扫码步骤</div>
                <div class="text">
                    1.点击预览保存二维码图片到相册，同时在相册打开该图片
                    <br />2.点击更多，识别二维码
                    <br />3.如果已成功充值至账户，请返回网站
                </div>
            </div>

            <p class="problem">
                温馨提醒：如充值未及时到账请联系24小时在线客服。
            </p>
        </div>
        <van-image-preview v-model="showPreview" :images="images" />
    </div>
</template>

<script>
export default {
    name: "QrCode",

    data() {
        return {
            payUrl: "https://www.liantu.com/images/2013/case/5.jpg",
            showPreview: false,
            images: [],
        };
    },

    created() {
        let payUrl = sessionStorage.getItem("payUrl");
        this.payUrl = payUrl;
        this.images.push(payUrl);
    },

    beforeRouteLeave(to, form, next) {
        sessionStorage.removeItem("payUrl");
        next();
    },

    beforeRouteEnter(to, from, next) {
        let e = JSON.parse(sessionStorage.getItem("payUrl"));
        if (!e) next("/dashboard");
        else next();
    },
};
</script>

<style lang="less" scoped>
#qrCode {
    height: 100%;
    text-align: center;

    .press {
        font-size: 14px;
        color: #666666;
    }

    .van-image {
        margin: 12px auto 8px;
    }

    .problem {
        margin-top: 12px;
        color: #e02020;
        text-align: left;
        margin-left: 16px;
    }

    .qrCode-rules {
        text-align: left;
        margin: 10px 10px 0 10px;
        background-color: white;
        padding: 10px 0;

        .title {
            color: #fd8b4c;
            font-size: 14px;
            padding-left: 12px;
        }

        .title::before {
            content: "";
            display: block;
            width: 3px;
            height: 14px;
            background-image: linear-gradient(to left, #e8435b, #f7946d 100%);
            position: absolute;
            left: 12px;
        }

        .text {
            padding: 0 12px;
            font-size: 14px;
        }
    }
}
</style>
