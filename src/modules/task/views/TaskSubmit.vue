<template>
    <div id="taskSubmit">
        <scroller>
            <div class="taskSubmit-wap">
                <div class="center">
                    <div class="left">
                        <van-image
                                width="46"
                                height="46"
                                :src="$portrait(task && task.categoryIco)"
                        />
                    </div>
                    <div class="right">
                        <div>
                            <div class="title">{{task && task.title}}</div>
                            <div class="desc">{{$$t('price')}}：{{currencySymbol}}{{task && task.price}}{{currencyDenomination}}</div>
                        </div>
                        <div class="right-r">
                            <van-icon name="images/task/link.png" size="16"/>
                        </div>
                    </div>
                </div>
                <div class="verify">
                    <div class="title">{{$$t('uploadText')}} <span>{{$$t('total')}}</span></div>
                    <div class="update-img">
                        <div class="title">1.{{$$t('upload')}}</div>
                        <van-uploader v-model="fileList" multiple :max-size="2 * 1024 * 1024" @oversize="onOversize"
                                      :after-read="afterRead" :max-count="3"/>
                    </div>
                    <div class="verify-wx">
                        <div class="title">2.{{$$t('weChatNickname')}}</div>
                        <van-field
                                v-model="platformAccount"
                                :placeholder="$$t('wNameP')"
                                @keyup.enter.native="onSubmit"
                        />
                    </div>
                </div>
            </div>
        </scroller>

        <van-tabbar fixed>
            <van-button hairline block color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))" @click="onSubmit">
                {{$$t('submit')}}
            </van-button>
        </van-tabbar>
    </div>
</template>

<script>
export default {
	name: 'TaskSubmit',

	data() {
		return {
			platformAccount: null,
			task: null,
			fileList: [],
			uploadImages: []
		}
	},

	activated() {
		this.task = JSON.parse(sessionStorage.getItem('Note-data'))
	},

	methods: {
		afterRead(file) {
			file.status = 'uploading';
			file.message = this.$$t('uploading');
			setTimeout(() => {
				file.status = null;
				file.message = null;
			}, 1000);

		},

		uploadImage() {
			let _this = this
			if (this.fileList.length < 1) {
				this.$toast(this.$$t('upload') + this.$t('common.noNull'))
				return
			}
			this.fileList.forEach(function (item) {
				_this.imgPreview(item.file)
			})
		},

		onSubmitTask() {
			if (!this.platformAccount) {
				this.$toast(this.$$t('platformAccount') + this.$t('common.noNull'))
				return
			}
			this.showProgress(true)
			this.$post('/api/Task/SubmitCheck?objId=' + (this.task && this.task.category_task_applyId) + '&platformAccount=' + this.platformAccount + '&fileNames=' + this.uploadImages.toString())
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.success === true)
				})
				.then(data => {
					this.$toast(data.data)
					this.$router.push('/app/taskNotes')
					this.$success(this.$t('common.submitSuccess'))
				})
				.catch(error => {
					this.showProgress(false)
					this.procError(error)
				})
		},

		onSubmit() {
			this.$dialog.confirm({
				title: this.$t('common.point'),
				message: this.$$t('isSubmit'),
			})
				.then(() => {
					this.uploadImage()
				})
				.catch(() => {
				})
		},

		// 处理图片
		imgPreview(file) {
			let _this = this
			let files = {
				name: file.name,
				type: file.type
			}

			let Orientation
			if (/^image/.test(file.type)) {
				// 创建一个reader
				let reader = new FileReader()
				// 将图片2将转成 base64 格式
				reader.readAsDataURL(file)
				// 读取成功后的回调
				reader.onloadend = function () {
					let result = this.result
					let img = new Image()
					img.src = result

					//判断图片是否小于500K,是就直接上传，反之压缩图片
					if (this.result.length <= 500 * 1024) {
						// 上传图片
						_this.postImg(this.result, files);
					} else {
						img.onload = function () {
							let data = _this.compress(img, Orientation)
							// 上传图片
							_this.postImg(data, files);
						}
					}
				}
			}
		},

		// 提交图片到后端
		postImg(base64, files) {
			let file = this.dataURLtoFile(base64, files)
			//构造一个 FormData，把后台需要发送的参数添加
			let formData = new FormData()
			formData.append('file', file)
			formData.append('owner', this.siteConfig.codeKey || 'default');
			// 提交图片
			this.$post((this.siteConfig && this.siteConfig.imgPath) + '/upload?', formData)
				.then(resp => {
					return this.checkResp(resp, (r) => r.data.code === 1)
				})
				.then(data => {
					this.uploadImages.push(data.fileUrl)
					if (this.fileList.length === this.uploadImages.length) {
						this.onSubmitTask()
					}
				})
				.catch(error => {
					this.procError(error)
				})
		},

		onOversize() {
			this.$toast(this.$t('common.imgSizeDesc'));
		},

		$$t(v) {
			return this.$t('taskSubmit.' + v)
		}
	}
}
</script>

<style lang="less" scoped>
#taskSubmit {
    text-align: left;
    padding-bottom: 50px;
    height: 100%;

    .taskSubmit-wap {
        background-color: #F5F5F9;
    }

    .center {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #f5f6f7;
        background-color: white;

        .left {
            height: 46px;
            width: 46px;
            margin-left: 16px;
        }

        .right {
            margin-left: 16px;
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: space-between;

            .title {
                font-weight: 600;
                margin-top: 16px;
                line-height: 20px;
                height: 20px;
                font-size: 14px;
            }

            .desc {
                height: 17px;
                line-height: 17px;
                color: #CC332D;
                font-size: 12px;
                margin-top: 6px;
            }

            .right-r {
                text-align: center;
                margin-right: 16px;

                .van-icon {
                    margin-top: 32px;
                }
            }
        }
    }

    .verify {
        margin-top: 10px;
        height: 318px;
        background-color: white;
        padding: 16px 16px 0 16px;

        .title {
            height: 20px;
            font-size: 14px;
            font-weight: 600;

            span {
                color: #FE0000;
            }
        }

        .update-img {
            margin-top: 20px;

            .title {
                font-size: 14px;
            }

            .van-uploader {
                margin-top: 8px;

                .van-uploader__upload {
                    width: 156px;
                    height: 100px;
                }
            }

        }

        .verify-wx {
            margin-top: 36px;

            .title {
                font-size: 14px;
                height: 20px;
            }

            .van-cell {
                margin-top: 12px;
                background-color: #f7f8fa;
                border-radius: 10px;
            }
        }
    }

    .van-button {
        height: 50px;

        .van-button__text {
            font-size: 18px;
        }
    }
}
</style>
