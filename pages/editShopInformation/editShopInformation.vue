<template>
	<view class="editShopInformation">
		<view class="box">
			<view class="form_item">
				<text>店铺名称</text>
				<u-input placeholder='请输入店铺名称' v-model="form.name" type="text" />
			</view>
			<view class="form_item">
				<text>联系人</text>
				<u-input placeholder='请输入联系人' v-model="form.contact" type="text" />
			</view>
			<view class="form_item">
				<text>联系电话</text>
				<u-input placeholder='请输入联系电话' type='number' v-model="form.mobile"  />
			</view>
		</view>

		<view class="box">
			<view class="form_item">
				<text>地区信息</text>
				<u-input placeholder='请选择地区' @click='showPicker' :disabled='true' v-model="form.area" type="text" />
				<u-picker mode="region" v-model="show" :disabled='true' :default-region='defaultres' @confirm="sele" :params="params"></u-picker>
			</view>
			<view class="form_item">
				<text>详细地址</text>
				<u-input placeholder='请输入详细地址' v-model="form.address" type="text" />
			</view>
		</view>
		<view class="box">
			<view class="form_item">
				<text>地区信息</text>
				<u-switch v-model="form.status" @change="changeStatus" active-value="1" inactive-value="0"></u-switch>
			</view>
		</view>

		<view class="box1">
			<view class="form_item1">
				<text>上传图片</text>
				<u-upload width="120" height='120' upload-text='' image-mode='aspectFit' :before-upload="beforeUpload" :limitType='limit'
				 :action="action+'/api/upload'" :header="header" :name="formData.type" :form-data="formData" @on-success="onSuccess"
				 :file-list="fileList" :auto-upload="true" :max-size="5 * 1024 * 1024" max-count="1" :show-progress="false"
				 @on-error='onError' del-bg-color='#000000'>
				</u-upload>
			</view>
		</view>
		<view class="btn">
			<u-button type="error" class='btn_box' @click="del">删除</u-button>
			<u-button type="primary" class='btn_box' @click="save">保存</u-button>

		</view>
	</view>
</template>

<script>
	import urls from '../../api/configuration.js'
	import {
		store,
		storeEdit,
		storeDel
	} from '../../api/store.js'
	export default {
		data() {
			return {
				show: false,
				limit: ['png', 'jpg', 'jpeg'],
				defaultres: ["广东省", "广州市", "番禺区"],
				params: {
					province: true,
					city: true,
					area: true
				},
				checked: true,
				form: {
					name: '',
					contact: "",
					area: "",
					address: "",
					status: false,
					images: ""
				},
				fileList: [],
				action: '',
				header: {
					token: ''

				},
				formData: {
					type: '',
					path: ''
				},
				id: 0
			}
		},
		methods: {
			beforeUpload() {
				console.log(1);
				// this.$u.route({
				// 	// 关于此路径，请见下方"注意事项"
				// 	url: 'components/u-avatar-cropper/u-avatar-cropper',
				// 	// 内部已设置以下默认参数值，可不传这些参数
				// 	params: {
				// 		// 输出图片宽度，高等于宽，单位px
				// 		destWidth: 300,
				// 		// 裁剪框宽度，高等于宽，单位px
				// 		rectWidth: 300,
				// 		// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
				// 		fileType: 'jpg',
				// 	}
				// })
			},
			showPicker() {
				this.show = true;
			},
			// 确定选择地区
			sele(res) {
				// console.log(res);
				this.val = res;
				this.form.area = this.val.province.label + '/' + this.val.city.label + '/' + this.val.area.label;
				this.defaultres = [this.val.province.label, this.val.city.label, this.val.area.label];
			},
			changeStatus(v) {
				// console.log(v);
				this.form.status = v;
			},
			// 保存
			async save() {
				let res = await storeEdit(this.id, this.form)
				if (!res.code) {
					uni.navigateBack()
				}
			},
			del() {
				uni.showModal({
					title: '提示',
					content: '是否删除此店铺？',
					success: async (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							let res = await storeDel(this.id)
							if (!res.code) {
								uni.navigateBack()
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			onSuccess(data, index, lists, name) {
				console.log(data, index, lists, name);
				this.form.images = data.data.url
			},
			onError(res, index, lists, name) {
				console.log(res, index, lists, name);
			},
			async init(id) {
				this.id = id;
				let res = await store(id)
				console.log(res);
				this.form = res;
				if (res.images) {
					this.fileList.push({
						url: urls.domain + res.images
					})
				}

			}
		},
		onLoad(query) {
			const userMessage = uni.getStorageSync('userMessage');
			this.action = urls.baseURL;
			this.header.token = "Bearer " + userMessage.token
			this.formData.type = "store";
			this.formData.path = "store";
			this.init(query.id)
		}
	}
</script>

<style lang="scss" scoped>
	.editShopInformation {
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;

		.btn {
			width: 100%;
			position: fixed;
			bottom: 0;

			.btn_box {
				width: 50%;
				float: left;
				border-radius: 0 !important;
			}

			/deep/.u-btn--error {
				background-color: #7e7e7e;
				border-color: #7e7e7e;
			}
		}

		.box {
			margin-bottom: 20rpx;

			.form_item {
				padding-right: 20rpx;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
				margin-bottom: 2rpx;
				height: 85rpx;

				text {
					width: 180rpx;
					// text-align: left;
					padding-left: 20rpx;
				}
			}

		}

		.box1 {
			margin-bottom: 20rpx;

			.form_item1 {
				padding-right: 20rpx;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
				margin-bottom: 2rpx;
				height: 140rpx;

				/deep/.u-add-tips {
					margin-top: 0;
				}

				text {
					width: 180rpx;
					// text-align: left;
					padding-left: 20rpx;
				}

				/deep/.u-delete-icon {
					top: 0;
					right: 0;
					width: 28rpx;
					height: 28rpx;
				}
			}
		}
	}
</style>
