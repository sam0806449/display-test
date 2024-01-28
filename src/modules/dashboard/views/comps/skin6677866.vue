<template>
    <div class="skin6677866">
        <scroller>
            <div class="dashboard-top">
                <van-swipe
                    :autoplay="3000"
                    height="3.947rem"
                    width="100%"
                    class="pt-2"
                >
                    <van-swipe-item
                        v-for="(item, index) in swipes"
                        :key="index"
                        @click="redirectLinkUrl(item.linkUrl)"
                    >
                        <van-image
                            :src="$portrait(item.imageUrl)"
                            width="100%"
                            height="100%"
                            lazy-load
                            fit="cover"
                        >
                            <template v-slot:loading>
                                <van-loading type="spinner" size="20" />
                            </template>
                        </van-image>
                    </van-swipe-item>
                </van-swipe>

                <van-notice-bar
                    left-icon="volume-o"
                    color="rgb(152, 167, 181)"
                    background="rgb(247, 248, 249)"
                >
                    <div class="body-2" @click="redirectScrollMsgs">
                        {{ notice }}
                    </div>

                    <van-icon
                        slot="left-icon"
                        name="/images/dashboard/notice.png"
                        size="20"
                        class="mr-1"
                    />
                </van-notice-bar>
            </div>

            <div class="nav-items background-white px-2">
                <div
                    class="item-left text-left"
                    v-if="memberData && Object.keys(memberData).length"
                >
                    <div>
                        <div class="memberName mr-1 ellipsis-1">
                            {{ memberData && memberData.memberAccount }}
                        </div>
                        <div class="vip mr-1" v-if="skgCodeKey !== 'SGMGM'">
                            <van-image
                                width="40"
                                height="14"
                                src="/images/dashboard/vip.png"
                            >
                                <div class="vip-lv_position text-white caption">
                                    {{ memberData && memberData.vipLevel }}
                                </div>
                            </van-image>
                        </div>
                        <div @click="refreshBalance">
                            <van-icon
                                name="/images/dashboard/refresh.png"
                                :class="{ refresh: refreshIcon }"
                                size="20"
                            />
                        </div>
                    </div>
                    <div class="money">
                        {{ memberData && memberData.currencySymbol
                        }}{{ memberData && memberData.balance
                        }}{{ memberData && memberData.currencyDenomination }}
                    </div>
                </div>

                <div v-if="!memberData" class="item-left text-left">
                    <div
                        @click="redirectRouter('/login')"
                        class="loginBtnHasBorder"
                    >
                        {{ $t("login.title") }}
                    </div>
                    <div
                        @click="redirectRouter('/register')"
                        class="loginBtnHasBorder loginBtnHasBorder-2"
                    >
                        {{ $t("register.title") }}
                    </div>
                </div>

                <div class="item-right ml-1">
                    <van-row type="flex" justify="space-around">
                        <van-col
                            span="6"
                            v-for="(n, index) in navItems"
                            :key="index"
                            @click="redirectWithdraw(n.link)"
                            class="flex flex-d-column justify-content-start align-items-center"
                        >
                            <van-image
                                width="0.96rem"
                                height="0.96rem"
                                :src="n.img"
                            />
                            <div class="title">
                                {{ $t(`dashboard.${n.title}`) }}
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>

            <div class="game-btn-wrap">
                <div
                    v-for="item in filterGameCategorys"
                    :key="item.code"
                    class="game-btn"
                    :class="{ active: item.code === platformCode }"
                    @click="setGamePlatforms(item.code)"
                >
                    <svg
                        v-if="item.code === 'by'"
                        style="
                            width: 0.64rem;
                            height: 0.64rem;
                            margin-bottom: 0.25rem;
                        "
                        xmlns="http://www.w3.org/2000/svg"
                        width="24.135"
                        height="23.68"
                        viewBox="0 0 24.135 23.68"
                    >
                        <g
                            id="_6"
                            data-name="6"
                            transform="translate(0 -0.001)"
                        >
                            <path
                                id="路径_144"
                                data-name="路径 144"
                                d="M19.291,2.456C16.819-.414,3.566.78.6,1.078c-.4,0-.6.3-.6.7A7.969,7.969,0,0,0,1.293,6.036a.952.952,0,0,0,.682.4H5.682a1.421,1.421,0,0,1,.7.2c.881.5.5.994,0,1.179a1.875,1.875,0,0,1-.8.2,7.3,7.3,0,0,0-2.472.1.241.241,0,0,0-.1.4,11.08,11.08,0,0,0,7.1,2.173.54.54,0,0,1,.5.3c.469,1.776,3.04,2.557,3.04,2.557,2.074.8,2.173-2.415,2.173-2.415,3.367,5.341-2.273,5.242-2.273,5.242a4.162,4.162,0,0,0-4.943-2.529c-.2,0-.2.2-.1.3,2.671,2.841.7,7.515.1,8.708-.1.2,0,.4.2.4,2.671,1.08,4.844-2.571,4.844-2.571,6.733-.3,8.31-4.063,8.31-4.063C28.1,8,19.291,2.456,19.291,2.456ZM6.506,5.027a.625.625,0,0,1-.6-.582.639.639,0,0,1,.6-.6.625.625,0,0,1,.582.6.6.6,0,0,1-.653.582Zm4.347.8L9.944,7.215a.814.814,0,1,1-1.421-.8l.682-.98-.5-.881a.8.8,0,0,1,.3-1.094.781.781,0,0,1,1.08.3l.6.994a.341.341,0,0,1,.1.284,1.094,1.094,0,0,1,0,.781Zm2.77.2-.838,1.392a.8.8,0,0,1-1.08.284.781.781,0,0,1-.341-1.08l.6-.994-.5-.781a.8.8,0,0,1,.3-1.094.781.781,0,0,1,1.094.27l.6.98a.369.369,0,0,1,.1.3.483.483,0,0,1,0,.724Z"
                                transform="translate(0 0.243)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_145"
                                data-name="路径 145"
                                d="M13.322.724c.8-.3,3.367-1.278,5.043-.3,0,0,.1.1,0,.1a4.9,4.9,0,0,0-1.421,3.068.1.1,0,0,1-.1.1c-.554-.6-2.429-2.571-3.523-2.77C13.223.824,13.223.724,13.322.724Z"
                                transform="translate(5.571 0)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                        </g>
                    </svg>

                    <svg
                        v-if="item.code === 'cp'"
                        style="
                            width: 0.64rem;
                            height: 0.64rem;
                            margin-bottom: 0.25rem;
                        "
                        xmlns="http://www.w3.org/2000/svg"
                        width="24.066"
                        height="23.978"
                        viewBox="0 0 24.066 23.978"
                    >
                        <g id="cp" transform="translate(0.011 0.001)">
                            <path
                                id="路径_208"
                                data-name="路径 208"
                                d="M21.81,5A11.74,11.74,0,0,0,14.21.2,16.35,16.35,0,0,0,12,0,11.8,11.8,0,0,0,3.7,3.3,12.69,12.69,0,0,0,0,11.4a12.14,12.14,0,0,0,2.9,8.4,13,13,0,0,0,8,4.1,11,11,0,0,0,8.5-2.6,12,12,0,0,0,4.5-7.8A11,11,0,0,0,21.81,5ZM8.41,17.9c-2.9,0-5.2-2.7-5.2-5.9s2.3-5.9,5.2-5.9,5.2,2.7,5.2,5.9S11.31,17.9,8.41,17.9Z"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_209"
                                data-name="路径 209"
                                d="M8.41,7.1a2.3,2.3,0,1,0,2.3,2.3,2.4,2.4,0,0,0-2.3-2.3Zm0,3.1a.9.9,0,1,1,.9-.9A.9.9,0,0,1,8.41,10.2Z"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_210"
                                data-name="路径 210"
                                d="M8.31,10.6a3,3,0,1,0,3,3,3,3,0,0,0-3-3Zm0,4.4a1.5,1.5,0,1,1,1.5-1.5A1.37,1.37,0,0,1,8.31,15Z"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                        </g>
                    </svg>

                    <svg
                        v-if="item.code === 'douji'"
                        style="
                            width: 0.64rem;
                            height: 0.64rem;
                            margin-bottom: 0.25rem;
                        "
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="23.757"
                        height="28.557"
                        viewBox="0 0 23.757 28.557"
                    >
                        <defs>
                            <clipPath id="clip-path">
                                <rect
                                    id="矩形_1840"
                                    data-name="矩形 1840"
                                    width="23.757"
                                    height="28.557"
                                    fill="none"
                                />
                            </clipPath>
                        </defs>
                        <g id="_8" data-name="8" clip-path="url(#clip-path)">
                            <path
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                                id="路径_153"
                                data-name="路径 153"
                                d="M1.556,12.057a1.737,1.737,0,0,0,1.206.109C1.086,11.852-.349,8.837.073,8.041a2.05,2.05,0,0,0,.543.4A2.75,2.75,0,0,1,.145,6.22a1.206,1.206,0,0,1,.941,0,1.64,1.64,0,0,1,.121-1.64,1.507,1.507,0,0,1,1.206.446c-.326-.7,0-2.412.941-1.857a1.845,1.845,0,0,1,.8.784C4.426,4.484,5.7,7.872,7.224,8.7c1.821-.326,5.7.941,7.236,0a4.824,4.824,0,0,0,1.206-2.81A5.041,5.041,0,0,1,18.222,2.18a6.03,6.03,0,0,0,.8-.386L19.3,1.71A3.015,3.015,0,0,1,19.2.5c.1-.639.712-.241.82-.362.277-.314.639,0,.76.265s.072.289.157,0c.133-.434.675,0,.627.3s0,.422.109.205.157-.169.289-.157.579.084.482.446c-.169.6.181.145.41.374s.639,1.459,0,1.6a1.134,1.134,0,0,1,.892,1.025,2.291,2.291,0,0,0-1.206,0,.736.736,0,0,1-.157.627c-.229.229-.314.989-.9.868a1.1,1.1,0,0,1-.712-.338,44.427,44.427,0,0,0,.989,6.03c.531,2.967.434,4.824-2.014,6.886a9.455,9.455,0,0,1-2.967,1.7,3.919,3.919,0,0,0-1.99,2.653c-.229,1.206-.663,1.049-1.314.941a12.947,12.947,0,0,0,.145,1.375,4.956,4.956,0,0,0,.35,1.58c.241,0,1-.229,1.4-.277a2.786,2.786,0,0,1,.555-.06.868.868,0,0,1,.591.157.567.567,0,0,1,.109.145.687.687,0,0,0-.314,0,.7.7,0,0,1-.338.145,6.343,6.343,0,0,0-1.073.072,4.932,4.932,0,0,0,1.206,0,1.664,1.664,0,0,1,.47-.109,2.122,2.122,0,0,1,1.1.121.543.543,0,0,1,.265.651.567.567,0,0,0-.519-.277,4.257,4.257,0,0,1-.772.193,9.359,9.359,0,0,0-1.423,0,4.161,4.161,0,0,0-.772,0,.724.724,0,0,1,.615.506,1.447,1.447,0,0,1-.169.591,1.363,1.363,0,0,0-.314-.374c-.326-.265-1.327-.084-1.459-.326a1.3,1.3,0,0,1-.229-.784,1.869,1.869,0,0,0-.724.712.217.217,0,0,1-.145-.109.181.181,0,0,1,0-.157,1.206,1.206,0,0,1,.362-.555,1.447,1.447,0,0,0,.47-.917c0-.289-.217-.35-.217-.6a3.341,3.341,0,0,0,0-.6c0-.084-.1-.7-.133-1.146a.712.712,0,0,1-.579-.531,4.993,4.993,0,0,0-.519-1.206c-.446-.072-1.109-.072-1.749-.145-.181.446-.555,1.327-.724,1.761a4.968,4.968,0,0,0-.494,1.773c.217.06.953.072,1.327.121a3.268,3.268,0,0,1,.494.109.615.615,0,0,1,.446.338v.181a.941.941,0,0,0-.241-.133.76.76,0,0,1-.362,0,4.45,4.45,0,0,0-.953-.253,3.232,3.232,0,0,0,1,.374,1.508,1.508,0,0,1,.458,0,1.544,1.544,0,0,1,.844.434.627.627,0,0,1-.133.724.422.422,0,0,0-.289-.422,4.148,4.148,0,0,1-.772,0,10.335,10.335,0,0,0-1.206-.362,4.607,4.607,0,0,0-.675-.169.579.579,0,0,1,.241.687,1.532,1.532,0,0,1-.458.506,1.471,1.471,0,0,0,0-.458c-.145-.374-1.1-.482-1.085-.736a1.8,1.8,0,0,1,.157-.8,2.834,2.834,0,0,0-1.013.494.217.217,0,0,1,0-.3,1.93,1.93,0,0,1,.615-.422,2.1,2.1,0,0,0,.892-.76c.145-.289,0-.41.145-.651s.241-.386.35-.591.289-.844.47-1.314L8.575,21.7C8,21.548,2.931,19.389,3.534,15.1c-1.206-.434-2.412-2.279-1.978-2.979Zm0,0"
                                transform="translate(0 0.002)"
                            />
                        </g>
                    </svg>

                    <svg
                        v-if="item.code === 'dz'"
                        style="
                            width: 0.64rem;
                            height: 0.64rem;
                            margin-bottom: 0.25rem;
                        "
                        xmlns="http://www.w3.org/2000/svg"
                        width="27.79"
                        height="21.845"
                        viewBox="0 0 27.79 21.845"
                    >
                        <g id="_7" data-name="7" transform="translate(0.001 0)">
                            <path
                                id="路径_146"
                                data-name="路径 146"
                                d="M18.4,0H4.724A3.523,3.523,0,0,0,1.23,3.494V17.4a1.057,1.057,0,0,0,1.057,1.057H20.842a1.072,1.072,0,0,0,1.072-1.057V3.494A3.464,3.464,0,0,0,18.4,0ZM9.186,2.936A.675.675,0,0,1,9.817,2.3h3.817a.675.675,0,0,1,.631.631V7.927a.661.661,0,0,1-.631.631H9.817a.661.661,0,0,1-.631-.631Zm3.919,8.808a1.38,1.38,0,1,1-1.38-1.468A1.468,1.468,0,0,1,13.106,11.744ZM3.241,2.936a.69.69,0,0,1,.587-.6H7.7a.69.69,0,0,1,.631.6V7.927a.675.675,0,0,1-.631.631H3.828A.675.675,0,0,1,3.2,7.927Zm4.565,8.617a.954.954,0,1,1-.954-.954A.954.954,0,0,1,7.806,11.553Zm11.553,4.888H3.99a.734.734,0,0,1-.749-.749.719.719,0,0,1,.749-.734H19.359a.719.719,0,0,1,.749.734.734.734,0,0,1-.749.749ZM15.44,11.553a.954.954,0,1,1,.274.684A.954.954,0,0,1,15.44,11.553Zm4.668-3.494a.675.675,0,0,1-.646.631H15.645a.675.675,0,0,1-.631-.631V2.936a.69.69,0,0,1,.631-.631h3.817a.69.69,0,0,1,.646.631Z"
                                transform="translate(0.576 0)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_147"
                                data-name="路径 147"
                                d="M23.12,15.554H1.057A1,1,0,0,1,0,14.5H0a1,1,0,0,1,1.057-1.057H23.076A1,1,0,0,1,24.133,14.5h0a1.057,1.057,0,0,1-1.013,1.057Z"
                                transform="translate(0 6.288)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_148"
                                data-name="路径 148"
                                d="M18.627,11.658H15.544a.954.954,0,0,1-.954-.954h0a.954.954,0,0,1,.954-.954h3.083a.954.954,0,0,1,.954.954h0a.954.954,0,0,1-.954.954Z"
                                transform="translate(6.828 4.562)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_149"
                                data-name="路径 149"
                                d="M17.644,14.466h0a.954.954,0,0,1-.954-.954V4.7a.954.954,0,0,1,.954-.954h0A.954.954,0,0,1,18.6,4.7v8.808a.954.954,0,0,1-.954.954Z"
                                transform="translate(7.81 1.755)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <circle
                                id="椭圆_11"
                                data-name="椭圆 11"
                                cx="2.334"
                                cy="2.334"
                                r="2.334"
                                transform="translate(23.12 2.231)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_150"
                                data-name="路径 150"
                                d="M5.056,6.908H4A6.694,6.694,0,0,1,5.584,3.091H3.25V2.24H6.758v.749a6.415,6.415,0,0,0-1.7,3.919Z"
                                transform="translate(1.521 1.048)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_151"
                                data-name="路径 151"
                                d="M9.026,6.908H7.969A6.694,6.694,0,0,1,9.554,3.091H7.22V2.24h3.508v.749a6.591,6.591,0,0,0-1.7,3.919Z"
                                transform="translate(3.379 1.048)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_152"
                                data-name="路径 152"
                                d="M13.006,6.908H11.934a6.826,6.826,0,0,1,1.6-3.817H11.2V2.24h3.494v.749a7.149,7.149,0,0,0-1.688,3.919Z"
                                transform="translate(5.241 1.048)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                        </g>
                    </svg>

                    <svg
                        v-if="item.code === 'hot'"
                        style="
                            width: 0.64rem;
                            height: 0.64rem;
                            margin-bottom: 0.25rem;
                        "
                        xmlns="http://www.w3.org/2000/svg"
                        width="19.749"
                        height="24.737"
                        viewBox="0 0 19.749 24.737"
                    >
                        <path
                            id="_1"
                            data-name="1"
                            d="M7.317,24.737S-3.633,22.3,1.264,10.313c0,0,1.1,1.324,1,1.991A12.6,12.6,0,0,1,4.977,7.486C6.59,5.973,8.252,1.573,6.709,0c0,0,7.5,1.573,8.332,9.457,0,0,1-2.509,2.927-2.757a5.365,5.365,0,0,0,0,3.444s6.192,10.631-4.489,14.215c0,0,3.215-3.633-3.594-9.885A33.318,33.318,0,0,1,7.317,19S4.639,22,7.317,24.737Z"
                            transform="translate(-0.003)"
                            :fill="item.code === platformCode ? '#FFF' : '#333'"
                        />
                    </svg>

                    <svg
                        v-if="item.code === 'qp'"
                        style="
                            width: 0.64rem;
                            height: 0.64rem;
                            margin-bottom: 0.25rem;
                        "
                        xmlns="http://www.w3.org/2000/svg"
                        width="26.922"
                        height="20.196"
                        viewBox="0 0 26.922 20.196"
                    >
                        <g id="_3" data-name="3" transform="translate(-0.008)">
                            <path
                                id="路径_129"
                                data-name="路径 129"
                                d="M6.017,5a1.991,1.991,0,0,0-1.373.6,1.812,1.812,0,0,0-.6,1.373,1.922,1.922,0,0,0,.6,1.373,2.155,2.155,0,0,0,1.373.6,1.977,1.977,0,0,0,1.373-.6,2.087,2.087,0,0,0,.6-1.373A1.922,1.922,0,0,0,7.39,5.6,2.155,2.155,0,0,0,6.017,5Z"
                                transform="translate(1.503 1.864)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_130"
                                data-name="路径 130"
                                d="M26.782,12.932C25.9,5.4,24.365,0,19.437,0c-2.485,0-3.775,2.54-6,2.746C11.158,2.54,9.936,0,7.452,0,2.523,0,.972,5.4.175,12.864c-.481,4,0,7.331,2.416,7.331,3.5,0,3.638-3.13,6.137-4.6a15.1,15.1,0,0,1,4.778-.728A15.1,15.1,0,0,1,18.3,15.6c2.485,1.469,2.622,4.6,6.137,4.6C26.85,20.263,27.193,16.927,26.782,12.932ZM7.561,12.26h0a3.473,3.473,0,1,1,0-6.864,3.473,3.473,0,1,1,0,6.933ZM23.253,9.514H20.508V12.26H19.135V9.514H16.389V8.141h2.746V5.491h1.373V8.127h2.746Z"
                                transform="translate(0)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                        </g>
                    </svg>

                    <svg
                        v-if="item.code === 'sx'"
                        style="
                            width: 0.64rem;
                            height: 0.64rem;
                            margin-bottom: 0.25rem;
                        "
                        xmlns="http://www.w3.org/2000/svg"
                        width="31.812"
                        height="24.068"
                        viewBox="0 0 31.812 24.068"
                    >
                        <g
                            id="_2"
                            data-name="2"
                            transform="translate(0.018 -0.001)"
                        >
                            <path
                                id="路径_126"
                                data-name="路径 126"
                                d="M8.859,21.946a2.443,2.443,0,0,1-2.41-2.41V1.28L1.5,2.931A2.113,2.113,0,0,0,.144,5.77L5.657,21.814a2.129,2.129,0,0,0,2.707,1.3l3.4-1.2H8.859Z"
                                transform="translate(0 0.832)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_127"
                                data-name="路径 127"
                                d="M6.69,20.227a.941.941,0,0,1-.611-1.2L11.856.568c0-.1.1-.1.1-.2H7A2.113,2.113,0,0,0,4.94,2.483V19.435a2.1,2.1,0,0,0,2.1,2.1h4.209Z"
                                transform="translate(3.226 0.24)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_128"
                                data-name="路径 128"
                                d="M25.789,3.515,14.763.115a2.179,2.179,0,0,0-2.773,1.4L7.038,17.76a2.179,2.179,0,0,0,1.4,2.707l11.043,3.417a2.2,2.2,0,0,0,2.707-1.4L27.142,6.239a2.113,2.113,0,0,0-1.354-2.724Zm-3.4,8.435a2.476,2.476,0,0,1-1.007,1.4c-.908.594-3.2,1.8-4.622,2.509a1.486,1.486,0,0,1-2-.611c-.809-1.5-1.9-3.7-2.41-4.7a2.542,2.542,0,0,1,0-1.651,2.856,2.856,0,0,1,3.615-1.8,3.07,3.07,0,0,1,1.9,1.8,3.021,3.021,0,0,1,2.608-.4A2.839,2.839,0,0,1,22.389,11.95Z"
                                transform="translate(4.529 0)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                        </g>
                    </svg>

                    <svg
                        v-if="item.code === 'ty'"
                        style="
                            width: 0.64rem;
                            height: 0.64rem;
                            margin-bottom: 0.25rem;
                        "
                        xmlns="http://www.w3.org/2000/svg"
                        width="23.881"
                        height="24.374"
                        viewBox="0 0 23.881 24.374"
                    >
                        <g id="_5" data-name="5" transform="translate(0.008 0)">
                            <path
                                id="路径_133"
                                data-name="路径 133"
                                d="M17.51,7.735l2.327,1.617A9.566,9.566,0,0,0,18.429,5.2Z"
                                transform="translate(3.938 1.169)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_134"
                                data-name="路径 134"
                                d="M10.49,3.374V7.049L14.03,9.78,17.7,8.555l1.409-4.042a8.317,8.317,0,0,0-.931-1A11.587,11.587,0,0,0,14.238.851a.563.563,0,0,0-.4-.11Z"
                                transform="translate(2.36 0.166)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_135"
                                data-name="路径 135"
                                d="M14.814,16.956l4.14.2a11.734,11.734,0,0,0,2.119-6.565L17.533,8.26,13.859,9.485,12.45,13.931Z"
                                transform="translate(2.801 1.857)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_136"
                                data-name="路径 136"
                                d="M12.365,13.505l1.323-4.14L10.442,6.94,7.11,9.365l1.311,4.14Z"
                                transform="translate(1.6 1.56)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_137"
                                data-name="路径 137"
                                d="M10.257,2.119,12.584.306A8.868,8.868,0,0,0,10.257,0,16.756,16.756,0,0,0,7.93.208Z"
                                transform="translate(1.785 0)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_138"
                                data-name="路径 138"
                                d="M14.9,16.658,12.679,13.62H8.527L6.2,16.756,7.315,20.81a11.562,11.562,0,0,0,3.136.5,11.709,11.709,0,0,0,3.136-.5Z"
                                transform="translate(1.396 3.062)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_139"
                                data-name="路径 139"
                                d="M14.59,16.68l-.71,2.633a11.954,11.954,0,0,0,3.442-2.45l.1-.1Z"
                                transform="translate(3.122 3.75)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_140"
                                data-name="路径 140"
                                d="M5.649,16.6l-2.829.1.2.2a13.963,13.963,0,0,0,3.442,2.45Z"
                                transform="translate(0.636 3.732)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_141"
                                data-name="路径 141"
                                d="M3.7,8.144l3.54,1.421,3.43-2.633V3.391L7.343.66h0c-.208.1-.306.1-.4.208A11.587,11.587,0,0,0,2.994,3.526c-.208.208-.306.4-.514.612Z"
                                transform="translate(0.559 0.148)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_142"
                                data-name="路径 142"
                                d="M2.705,7.462,1.9,4.62A12.248,12.248,0,0,0,.17,8.968Z"
                                transform="translate(0.04 1.039)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                            <path
                                id="路径_143"
                                data-name="路径 143"
                                d="M6.383,16.932l2.192-3.038L7.191,9.339,3.676,7.93,0,10.049a11.771,11.771,0,0,0,2.021,7.08Z"
                                transform="translate(0 1.783)"
                                :fill="
                                    item.code === platformCode ? '#FFF' : '#333'
                                "
                            />
                        </g>
                    </svg>

                    {{ item.name }}
                </div>
            </div>

            <div class="game-list-wrap">
                <van-row gutter="10">
                    <template v-for="(item, index) in platforms">
                        <div :key="index">
                            <van-col
                                span="24"
                                class="mb-3"
                                v-if="
                                    !item.hasGameItems &&
                                    (platformCode === 'sx' ||
                                        platformCode === 'ty' ||
                                        platformCode === 'cp' ||
                                        platformCode === 'dj' ||
                                        platformCode === 'douji' ||
                                        platformCode === 'ucs')
                                "
                            >
                                <van-image
                                    v-if="
                                        item.imageName === 'gw.png' &&
                                        culture === 'th-TH'
                                    "
                                    class="elevation-1"
                                    src="/images/dashboard/gw.png"
                                    width="100%"
                                    height="calc(((100vw - 0.5rem) * 103) / 280)"
                                    lazy-load
                                    @click.native.stop="goRouter(item)"
                                >
                                </van-image>
                                <van-image
                                    v-else
                                    class="elevation-1"
                                    :src="
                                        getGameImg(
                                            item.platformCode,
                                            item.imageName
                                        )
                                    "
                                    width="100%"
                                    height="calc(((100vw - 0.5rem) * 103) / 280)"
                                    lazy-load
                                    @click.native.stop="goRouter(item)"
                                >
                                    <template v-slot:loading>
                                        <van-loading type="spinner" size="20" />
                                    </template>
                                </van-image>
                            </van-col>

                            <div v-else-if="platformCode === 'hot'">
                                <div
                                    class="mb-3"
                                    v-if="item.platformCode === 'SGUcs'"
                                    style="
                                        float: left;
                                        width: calc((100% - 0.21rem));
                                        margin-right: 0.1rem;
                                        margin-left: 0.1rem;
                                        box-sizing: border-box;
                                    "
                                >
                                    <van-image
                                        class="elevation-1"
                                        :src="
                                            getGameImg(
                                                item.platformCode,
                                                item.imageName,
                                                item.categoryCode
                                            )
                                        "
                                        height="2.773rem"
                                        width="100%"
                                        lazy-load
                                        @click.native.stop="goRouter(item)"
                                    >
                                        <template v-slot:loading>
                                            <van-loading
                                                type="spinner"
                                                size="20"
                                            />
                                        </template>
                                    </van-image>
                                </div>

                                <div
                                    class="mb-3"
                                    style="
                                        float: left;
                                        width: calc((100% - 0.61rem) / 3);
                                        margin-right: 0.1rem;
                                        margin-left: 0.1rem;
                                        box-sizing: border-box;
                                        min-height: 0.02667rem;
                                    "
                                    v-else-if="
                                        item.platformCode === 'SGLottery'
                                    "
                                >
                                    <div
                                        class="background-white elevation-1 radius-1"
                                        style="padding: 0.2rem;"
                                    >
                                        <van-image
                                            :src="
                                                getGameImg(
                                                    item.platformCode,
                                                    item.imageName,
                                                    item.categoryCode
                                                )
                                            "
                                            height="2.5rem"
                                            width="100%"
                                            lazy-load
                                            @click.native.stop="goRouter(item)"
                                        >
                                            <template v-slot:loading>
                                                <van-loading
                                                    type="spinner"
                                                    size="20"
                                                />
                                            </template>
                                        </van-image>

                                        <div
                                            class="text-left pt-1"
                                            style="
                                                color: #535867;
                                                font-weight: bold;
                                            "
                                        >
                                            <p
                                                class="van-ellipsis"
                                                style="
                                                    text-align: center;
                                                    height: 17px;
                                                "
                                            >
                                                {{ item.gameName }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    class="mb-3"
                                    v-else-if="
                                        !item.hasGameItems &&
                                        (item.categoryCode === 'sx' ||
                                            item.categoryCode === 'ty' ||
                                            item.categoryCode === 'dj' ||
                                            item.categoryCode === 'douji' ||
                                            item.categoryCode === 'cp')
                                    "
                                    style="
                                        float: left;
                                        width: calc((100% - 0.21rem));
                                        margin-right: 0.1rem;
                                        margin-left: 0.1rem;
                                        box-sizing: border-box;
                                    "
                                >
                                    <van-image
                                        class="elevation-1"
                                        :src="
                                            getGameImg(
                                                item.platformCode,
                                                item.imageName
                                            )
                                        "
                                        width="100%"
                                        lazy-load
                                        @click.native.stop="goRouter(item)"
                                        style="min-height: 3.384rem"
                                    >
                                        <template v-slot:loading>
                                            <van-loading
                                                type="spinner"
                                                size="20"
                                            />
                                        </template>
                                    </van-image>
                                </div>

                                <div
                                    v-else
                                    class="mb-3"
                                    style="
                                        float: left;
                                        width: calc((100% - 0.61rem) / 3);
                                        margin-right: 0.1rem;
                                        margin-left: 0.1rem;
                                        box-sizing: border-box;
                                        min-height: 0.02667rem;
                                    "
                                >
                                    <div
                                        class="background-white elevation-1 radius-1"
                                    >
                                        <van-image
                                            :src="
                                                item.hasGameItems
                                                    ? getPlatformImg(item)
                                                    : getGameImg(
                                                          item.platformCode,
                                                          item.imageName,
                                                          item.categoryCode
                                                      )
                                            "
                                            width="100%"
                                            height="2.9rem"
                                            lazy-load
                                            @click.native.stop="goRouter(item)"
                                        >
                                            <template v-slot:loading>
                                                <van-loading
                                                    type="spinner"
                                                    size="20"
                                                />
                                            </template>
                                        </van-image>

                                        <div
                                            class="text-left pt-1"
                                            style="
                                                color: #535867;
                                                font-weight: bold;
                                            "
                                        >
                                            <p
                                                class="van-ellipsis"
                                                style="
                                                    text-align: center;
                                                    height: 17px;
                                                "
                                            >
                                                {{ item.gameName }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-else-if="platformCode === 'skyLottery'">
                                <van-col span="8" class="my-3">
                                    <div
                                        class="flex flex-d-column justify-content-center align-items-center"
                                    >
                                        <van-image
                                            class="skyLottery-game-pic"
                                            :src="getLotteryImage(item.icon)"
                                            height="90px"
                                            width="90px"
                                            lazy-load
                                            @click.native.stop="
                                                goLotteryRouter(item)
                                            "
                                        >
                                            <template v-slot:loading>
                                                <van-loading
                                                    type="spinner"
                                                    size="20"
                                                />
                                            </template>
                                        </van-image>
                                        <span class="mt-2">{{
                                            item.name
                                        }}</span>
                                    </div>
                                </van-col>
                            </div>

                            <van-col span="12" class="mb-3" v-else>
                                <van-image
                                    class="elevation-1"
                                    lazy-load
                                    :src="getPlatformImg(item)"
                                    width="100%"
                                    height="3.6rem"
                                    @click.native.stop="goRouter(item)"
                                >
                                    <template v-slot:loading>
                                        <van-loading type="spinner" size="20" />
                                    </template>
                                </van-image>
                            </van-col>
                        </div>
                    </template>
                </van-row>
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
    name: "skin6677866",

    props: {
        gameCategorys: {
            type: Array,
            default: () => {
                return [];
            },
        },
        swipes: {
            type: Array,
            default: () => {
                return [];
            },
        },
        notice: {
            type: String,
            default: "",
        },
        redirectScrollMsgs: {
            type: Function,
            default: null,
        },
        redirectLinkUrl: {
            type: Function,
            default: null,
        },
        redirectWithdraw: {
            type: Function,
            default: null,
        },
        navItems: {
            type: Array,
            default: () => {
                return [];
            },
        },
        refreshBalance: {
            type: Function,
            default: null,
        },
        refreshIcon: {
            type: Boolean,
            default: false,
        },
        allGameGotStatus: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        platformCode: "hot",
        platforms: [],
        get totalGameData() {
            return JSON.parse(sessionStorage.getItem("totalGameData")) || {};
        },
    }),

    watch: {
        allGameGotStatus() {
            this.setGamePlatforms(this.platformCode);
        },
    },

    computed: {
        filterGameCategorys() {
            return this.gameCategorys.filter((item) => item.code !== "dj");
        },
    },

    mounted() {
        if (Object.keys(this.totalGameData).length) {
            this.setGamePlatforms(this.platformCode);
        }
    },

    methods: {
        setGamePlatforms(categoryCode) {
            this.platformCode = categoryCode;
            if (
                !Object.keys(this.totalGameData).length ||
                !this.totalGameData[this.platformCode]
            ) {
                this.platforms = [];
                return;
            }
            if (this.platformCode === "hot") {
                this.platforms = this.totalGameData[this.platformCode].games;
                return;
            }
            this.platforms =
                this.totalGameData[this.platformCode].games.data.data;
        },

        getPlatformImg(item) {
            if (!item.hasGameItems)
                return this.getGameImg(item.platformCode, item.imageName);
            else
                return `${this.siteConfig.imgPath}/common/img/slots/platform/${item.imageName}_${this.platformCode}.png`;
        },

        goRouter(item) {
            if (item.platformCode === "SGLottery") {
                if (this.isLogin()) {
                    if (item.gameCode !== "SGLottery") {
                        const mapData = JSON.parse(
                            sessionStorage.getItem("gameCategorysLottery")
                        );
                        const curBigType = mapData.find(
                            (t) => t.type === item.gameCode
                        ).bigType;
                        const specialTyps = ["PK10", "K3"];
                        let lotteryPath;
                        sessionStorage.setItem("rules_code", curBigType);
                        sessionStorage.setItem("gameCode_item", item.gameCode);
                        if (specialTyps.indexOf(curBigType) > -1)
                            lotteryPath = "PK10";
                        else if (curBigType === "SSC") lotteryPath = "ssc";
                        else if (curBigType === "Mark6") lotteryPath = "mark6";
                        else if (curBigType === "VNSouth")
                            lotteryPath = "vnsouth";
                        else lotteryPath = "lottery";
                        this.$router.push(lotteryPath);
                    } else {
                        this.redirectRouter("/app/lotteryLobby");
                    }
                }
                return;
            }

            if (item.platformCode === "SGUcs") {
                if (this.isLogin()) {
                    this.redirectRouter("/app/ucs");
                }
                return;
            }

            if (!item.hasGameItems) {
                this.getGameLoginUrl(item.platformCode, item.gameCode);
            } else {
                this.$router.push({
                    path: "gameLists",
                    query: {
                        platformCode: item.platformCode,
                        title: item.platformName,
                        categoryCode: this.platformCode,
                    },
                });
            }
        },
    },
};
</script>
<style lang="less" scoped>
.skin6677866 {
    color: #000;

    .dashboard-top {
        padding: 0 14px;
    }

    .van-swipe {
        height: 148px;
        border-radius: 10px;

        img {
            height: 148px;
            width: 100%;
            border-radius: 10px;
        }
    }

    .van-notice-bar {
        margin-top: 4px;
        height: 30px;
        padding: 0;
        font-size: 12px;

        /deep/ .hot_text {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 14px;
            right: 0;
            color: white;
            line-height: 20px;
            height: 20px;
            font-size: 12px;
        }
    }

    .nav-items {
        margin-top: 4px;
        padding: 0 6px;
        height: 68px;
        display: flex;
        align-items: center;

        .item-left {
            width: 40%;
            padding: 0 1px;
            display: flex;
            flex-direction: column;

            .loginBtnHasBorder {
                background: #399fda;
                border-radius: 5px;
                padding: 0 10px;
                margin: 2px 10px;
                color: #fff;
                min-width: 82px;
                white-space: nowrap;
                display: flex;
                justify-content: center;
            }
            .loginBtnHasBorder-2 {
                background: #ffa84d;
            }

            > div {
                display: flex;
                justify-content: space-between;
                height: 20px;
                align-items: center;
                line-height: 12px;
            }

            .refresh {
                transform: rotate(360deg);
                transition: all 1s;
            }

            .memberName {
                width: 80px;
                font-size: 14px;
            }

            .money {
                margin-top: 9px;
                font-size: 20px;
                font-weight: 600;
            }
        }

        .item-right {
            width: 60%;
            color: #535867;
            font-weight: bold;
        }
    }

    .game-btn-wrap {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
    }

    .game-btn {
        flex: 0 0 25%;
        color: #333;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        font-size: 0.3rem;
        background: #fff;

        &:nth-child(n + 5) {
            border-bottom: 1px solid #ccc;
        }

        &.active {
            background: #5b7ffb;
            color: #fff;
        }
    }

    .game-list-wrap {
        margin-top: 0.25rem;
        padding: 0 0.25rem 1.1rem;
    }
}
</style>