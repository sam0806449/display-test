<template>
    <div class="drag-verify-container">
        <div :style="dragVerifyImgStyle">
            <div :style="{width: `${width}px`, height: `${height}px`}">
                <img
                        ref="checkImg"
                        :src="imgsrc"
                        @load="checkimgLoaded"
                        style="display: none"
                        :style="{width: `${width}px`, height: `${height}px`}"
                        alt=""
                >
                <template v-for="i in 20">
                    <div :id="`bb${Number(i-1)}`" class="cut_bg" :style="getStyle(i-1)" :key="i"></div>
                </template>

            </div>


            <div
                    class="move-bar"
                    :class="{goFirst:isOk, goKeep:isKeep}"
                    :style="movebarStyle"
                    ref="moveBar"
            ></div>
            <div
                    class="clip-bar"
                    ref="clipBar"
            ></div>
            <div
                    class="refresh"
                    v-if="showRefresh && !isPassing"
            >
                <i
                        :class="refreshIcon"
                        @click="refreshimg"
                ></i>
            </div>
            <div
                    class="tips success"
                    v-if="showTips && isPassing"
            >{{successTip}}
            </div>
        </div>
        <div
                ref="dragVerify"
                class="drag_verify"
                :style="dragVerifyStyle"
                @mousemove="dragMoving"
                @mouseup="dragFinish"
                @mouseleave="dragFinish"
                @touchmove="dragMoving"
                @touchend="dragFinish"
        >

            <div
                    class="dv_progress_bar"
                    :class="{goFirst2:isOk}"
                    ref="progressBar"
                    :style="progressBarStyle"
            >
                {{successMessage}}
            </div>
            <div
                    class="dv_text"
                    :style="textStyle"
                    ref="message"
            >
                {{message}}
            </div>

            <div
                    class="dv_handler dv_handler_bg"
                    :class="{goFirst:isOk}"
                    @mousedown="dragStart"
                    @touchstart="dragStart"
                    ref="handler"
                    :style="handlerStyle"
            >
                <i :class="handlerIcon"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	name: "dragVerify",
	props: {
		isPassing: {
			type: Boolean,
			default: false
		},
		width: {
			type: Number,
			default: 250
		},
		height: {
			type: Number,
			default: 40
		},
		text: {
			type: String,
			default: "swiping to the right side"
		},
		successText: {
			type: String,
			default: "success"
		},
		background: {
			type: String,
			default: "#eee"
		},
		progressBarBg: {
			type: String,
			default: "#76c61d"
		},
		completedBg: {
			type: String,
			default: "#76c61d"
		},
		circle: {
			type: Boolean,
			default: false
		},
		radius: {
			type: String,
			default: "4px"
		},
		handlerIcon: {
			type: String
		},
		successIcon: {
			type: String
		},
		handlerBg: {
			type: String,
			default: "#fff"
		},
		textSize: {
			type: String,
			default: "14px"
		},
		textColor: {
			type: String,
			default: "#333"
		},
		imgsrc: {
			type: String
		},
		smallsrc: {
			type: String
		},
		codekey: {
			type: String
		},
		array: {
			type: Array,
			default: () => {
				return []
			}
		},
		topy: {
			type: Number,
			default: 0
		},
		barWidth: {
			type: Number,
			default: 70
		},
		barHeight: {
			type: Number,
			default: 40
		},
		barRadius: {
			type: Number,
			default: 2
		},
		showRefresh: {
			type: Boolean,
			default: false
		},
		refreshIcon: {
			type: String
		},
		showTips: {
			type: Boolean,
			default: true
		},
		successTip: {
			type: String,
			default: ""
		},
		failTip: {
			type: String,
			default: ""
		},
		diffWidth: {
			type: Number,
			default: 20
		}
	},

	mounted: function () {
		const dragEl = this.$refs.dragVerify;
		dragEl.style.setProperty("--textColor", this.textColor);
		dragEl.style.setProperty("--width", Math.floor(this.width / 2) + "px");
		dragEl.style.setProperty("--pwidth", -Math.floor(this.width / 2) + "px");
	},

	computed: {
		handlerStyle: function () {
			return {
				width: "40px",
				height: "40px",
				background: this.handlerBg
			};
		},

		message: function () {
			return this.isPassing ? "" : this.text;
		},

		successMessage: function () {
			return this.isPassing ? this.successText : "";
		},

		dragVerifyStyle: function () {
			return {
				width: this.width + "px",
				height: "40px",
				lineHeight: "40px",
				background: this.background,
				borderRadius: this.circle ? "20px" : this.radius
			};
		},

		dragVerifyImgStyle: function () {
			return {
				width: this.width + "px",
				position: "relative",
				overflow: "hidden"
			};
		},

		progressBarStyle: function () {
			return {
				background: this.progressBarBg,
				height: "40px",
				borderRadius: this.circle
					? "40px 0 0 " + "40px"
					: this.radius
			};
		},

		textStyle: function () {
			return {
				height: "40px",
				width: this.width + "px",
				fontSize: this.textSize
			};
		}
	},

	data() {
		return {
			isMoving: false,
			x: 0,
			isOk: false,
			isKeep: false,
			movebarStyle: {},
			showBar: true,
			clipBarx: 0,
			showErrorTip: false,
			t1: new Date(),
			t2: new Date(),
			arrayDate: [],
			timeout: null,
			currentTime: 0,
            lastTime: 0,
			lastX: 0
		};
	},

	methods: {
		checkimgLoaded: function () {
			//生成图片缺失位置
			this.clipBarx = 0;
			this.movebarStyle = {
				background: `url(${this.smallsrc})`,
				"background-size": `42px`,
				width: "42px",
				height: "42px",
				top: this.topy + "px",
			};
		},

		dragStart: function (e) {
			if (!this.isPassing) {
				this.isMoving = true;
				this.x = (e.pageX || e.touches[0].pageX)
			}
			this.showBar = true;
			this.showErrorTip = false;
			this.$emit("handlerMove");
		},

		dragMoving: function (e) {
			if (this.isMoving && !this.isPassing) {
				this.t1 = new Date();
				var _x = (e.pageX || e.touches[0].pageX) - this.x;
				this.currentTime = new Date().getTime()
				if (this.currentTime - this.lastTime >= 30 && _x !== this.lastX) {
					this.lastTime = this.currentTime
					this.lastX = parseInt(_x)
					this.arrayDate.push([parseInt(_x), new Date().getTime()]);
				}
				var handler = this.$refs.handler;
				handler.style.left = _x + "px";
				this.$refs.progressBar.style.width = _x + "px";
				this.$refs.moveBar.style.left = _x + "px";
			}
		},

		dragFinish: function (e) {
			if (this.isMoving && !this.isPassing) {
				clearTimeout(this.timeout)
				var _x = (e.pageX || e.changedTouches[0].pageX) - this.x;
				this.t2 = new Date();
				let p = {
					point: Math.round(Number(_x)),
					key: this.codekey,
					timespan: this.t2 - this.t1,
					datelist: this.arrayDate.join("|")
				}

				this.$get(`/api/Account/CheckSliderCode`, p)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(() => {
						this.passVerify();
					})
					.catch(error => {
						this.isOk = true;
						var that = this;
						setTimeout(function () {
							that.$refs.handler.style.left = "0";
							that.$refs.progressBar.style.width = "0";
							that.$refs.moveBar.style.left = "0";
							that.isOk = false;
						}, 500);
						this.showErrorTip = true;
						this.arrayDate = []
						this.$emit("passfail");
						this.procError(error)
					})

				this.isMoving = false;
			}
		},

		passVerify: function () {
			this.$emit("update:isPassing", true);
			this.isMoving = false;
			var handler = this.$refs.handler;
			handler.children[0].className = this.successIcon;
			this.$refs.progressBar.style.background = this.completedBg;
			this.$refs.message.style["-webkit-text-fill-color"] = "unset";
			this.$refs.message.style.animation = "slidetounlock2 3s infinite";
			this.$refs.progressBar.style.color = "#fff";
			this.$refs.progressBar.style.fontSize = this.textSize;
			this.isKeep = true;
			setTimeout(() => {
				this.$refs.moveBar.style.left = this.clipBarx + "px";
				setTimeout(() => {
					this.isKeep = false;
				}, 200);
			}, 100);
			this.$emit("passcallback");
		},

		reset: function () {
			this.reImg();
			this.checkimgLoaded();
		},

		reImg: function () {
			this.$emit("update:isPassing", false);
			const oriData = this.$options.data();
			for (const key in oriData) {
				if (Object.prototype.hasOwnProperty.call(oriData, key)) {
					this[key] = oriData[key]
				}
			}
			var handler = this.$refs.handler;
			var message = this.$refs.message;
			handler.style.left = "0";
			this.$refs.progressBar.style.width = "0";
			handler.children[0].className = this.handlerIcon;
			message.style["-webkit-text-fill-color"] = "transparent";
			message.style.animation = "slidetounlock 3s infinite";
			message.style.color = this.background;
		},

		refreshimg: function () {
			this.$emit("refresh");
		},

		getStyle(i) {
			let _cutX = this.width / 10;
			let _cutY = this.height / 2;
			let x = 0, y = 0;
			let num = this.indexOf(this.array, i); //第i张图相对于混淆图片的位置为num
			//还原前偏移
			y = i > 9 ? -_cutY : 0;
			x = i > 9 ? (i - 10) * -_cutX : i * -_cutX;
			//当前y轴偏移量
			if (num > 9 && i < 10) y = y - _cutY;
			if (i > 9 && num < 10) y = y + _cutY;
			//当前x轴偏移量
			x = x + (num - i) * -_cutX;

			return {
				'background-position': x + "px " + y + "px",
				'background-image': "url(" + this.imgsrc + ")",
				'width': this.width / 10 + "px",
				'height': this.height / 2 + "px"
			}
		},

		indexOf(arr, str) {
			if (arr && arr.indexOf) return arr.indexOf(str);
			let len = arr.length;
			for (let i = 0; i < len; i++) {
				if (arr[i] === str) return i;
			}
			return -1;
		},
	},


	watch: {
		imgsrc: {
			immediate: false,
			handler: function () {
				this.reImg();
			}
		}
	}
};
</script>
<style scoped>
.cut_bg {
    float: left;
    margin: 0 !important;
    border: 0;
    padding: 0 !important;
}


.drag_verify {
    position: relative;
    background-color: #e8e8e8;
    text-align: center;
    overflow: hidden;
    margin-top: 30px;
}

.drag_verify .dv_handler {
    position: absolute;
    top: 0px;
    left: 0px;
    cursor: move;
}

.drag_verify .dv_handler i {
    color: #666;
    padding-left: 0;
    font-size: 16px;
}

.drag_verify .dv_handler .el-icon-circle-check {
    color: #6c6;
    margin-top: 9px;
}

.drag_verify .dv_progress_bar {
    position: absolute;
    height: 34px;
    width: 0px;
}

.drag_verify .dv_text {
    position: absolute;
    top: 0px;
    color: transparent;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    background: -webkit-gradient(
            linear,
            left top,
            right top,
            color-stop(0, var(--textColor)),
            color-stop(0.4, var(--textColor)),
            color-stop(0.5, #fff),
            color-stop(0.6, var(--textColor)),
            color-stop(1, var(--textColor))
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-size-adjust: none;
    animation: slidetounlock 3s infinite;
}

.drag_verify .dv_text * {
    -webkit-text-fill-color: var(--textColor);
}

.goFirst {
    left: 0px !important;
    transition: left 0.5s;
}

.goKeep {
    transition: left 0.2s;
}

.goFirst2 {
    width: 0px !important;
    transition: width 0.5s;
}

.drag-verify-container {
    position: relative;
    line-height: 0;
}

.move-bar {
    position: absolute;
    z-index: 100;
}

.clip-bar {
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
}

.refresh {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    font-size: 20px;
    z-index: 200;
}

.tips {
    position: absolute;
    bottom: 0;
    height: 20px;
    line-height: 20px;
    text-align: center;
    width: 100%;
    font-size: 12px;
    z-index: 200;
}

.tips.success {
    background: rgba(255, 255, 255, 0.6);
    color: green;
}

.tips.danger {
    background: rgba(0, 0, 0, 0.6);
    color: yellow;
}
</style>
<style>
@-webkit-keyframes slidetounlock {
    0% {
        background-position: var(--pwidth) 0;
    }
    100% {
        background-position: var(--width) 0;
    }
}

@-webkit-keyframes slidetounlock2 {
    0% {
        background-position: var(--pwidth) 0;
    }
    100% {
        background-position: var(--pwidth) 0;
    }
}
</style>
