<template>
    <div id="feedback" class="text-left">
        <div class="title">问题类型</div>
        <van-cell :title="type" size="large" title-class="text-grey" is-link center @click="showType"/>
        <div class="title">问题内容</div>
        <van-field
                v-model="text"
                rows="6"
                autosize
                type="textarea"
                maxlength="200"
                placeholder="请详细描述您遇到的问题呢，填写内容不少于20字。"
                show-word-limit
        />

        <div class="upload_img pt-3 pl-3">
            <van-uploader v-model="fileList" multiple :max-size="2 * 1024 * 1024" @oversize="onOversize"
                          :after-read="afterRead" :max-count="3" upload-icon="/images/member/upload_icon.png"/>
            <div class="caption text-grey pb-5">文件格式为png、jpg、jpeg、且不超过5MB</div>
        </div>


        <div class="upload_btn px-4 pt-4 pb-9">
            <van-button hairline block class="radius-2"
                        color="linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255))" @click="onSubmit">
                提交
            </van-button>
        </div>


        <van-popup v-model="showPicker" round position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
export default {
	name: 'Feedback',

	data: () => ({
		text: '',
		fileList: [],
		uploadImages: [],
		type: '请选择问题类型',
		showPicker: false,
		columns: ['存款问题', '提款问题', '游戏问题', '优惠问题', '网站/APP登录', '修改资料', '流水问题', '其他'],
	}),


	created() {
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

		onSubmitFeedback() {

		},

		showType () {
			this.showPicker = true
        },

		onConfirm(value) {
			this.type = value;
			this.showPicker = false;
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
						//
						this.onSubmitFeedback()
					}
				})
				.catch(error => {
					this.procError(error)
				})
		},

		onOversize() {
			this.$toast(this.$t('common.imgSizeDesc'));
		},
	}
}
</script>

<style lang="less" scoped>
#feedback {
    .title {
        font-size: 14px;
        font-weight: 500;
        padding: 10px 16px 10px 16px;
    }

    .upload_img {
        height: 100%;
        background-color: white;
    }
}
</style>
