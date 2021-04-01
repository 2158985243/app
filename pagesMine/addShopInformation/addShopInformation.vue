<template>
	<view class="addShopInformation">
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
				<u-input placeholder='请选择地区' :disabled='true'  @click='showPicker' v-model="form.area" type="text" />
				<u-picker mode="region" v-model="show"  :default-region='defaultres' @confirm="sele" :params="params"></u-picker>
			</view>
			<view class="form_item">
				<text>详细地址</text>
				<u-input placeholder='请输入详细地址' v-model="form.address" type="text" />
			</view>
		</view>
		<view class="box">
			<view class="form_item">
				<text>地区信息</text>
				<u-switch v-model="checked" @change="changeStatus" active-value="1" inactive-value="0"></u-switch>
			</view>
		</view>

		<view class="box1">
			<view class="form_item1">
				<text>上传图片</text>
			
				<view class="img" @click="uploadImg">
					<view class="plus" v-if="form.images==''">
						<u-icon name="plus" color="#606266" size="36"></u-icon>
					</view>
					<u-image v-else width="120rpx" image-mode='aspectFit' height="120rpx" :src="$imgFn(form.images)"></u-image>
				</view>
			</view>
		</view>
		<u-button type="primary" class="btn" @click="save">保存</u-button>
	</view>
</template>
<script>
	import url from '../../api/configuration.js'
	import {
		storeAdd
	} from '../../api/store.js'
	export default {
		data() {
			return {
				limit: ['png', 'jpg', 'jpeg'],
				show: false,
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
					mobile: "",
					area: "",
					address: "",
					status: 1,
					images: ""
				},
				fileList: [],
				action: '',
				header: {
					token: ''

				},
				formData: {
					type: 'store',
					path: 'store'
				},
				userMessage:{}
			}
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				// this.avatar = path;
				// 可以在此上传到服务端
				uni.uploadFile({
					url: url.baseURL + '/api/upload', //仅为示例，非真实的接口地址
					filePath: path,
					name: 'user',
					header: {
						token: "Bearer " + this.userMessage.token
					},
					formData: {
						type: 'user',
						path: 'user'
					},
					success: (uploadFileRes) => {
						this.form.images = JSON.parse(uploadFileRes.data).data.url
					}
				});
			})
		},
		methods: {
			// 裁剪
			uploadImg(){
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/pages/avatar/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 300,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			showPicker() {
				this.show = true;
			},
			// 确定选择地区
			sele(res) {
				console.log(res);
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
				let res = await storeAdd(this.form)
				// console.log(res);
				if (!res.code) {
					uni.navigateBack()
				}
			},
			onSuccess(data, index, lists, name) {
				console.log(data, index, lists, name);
				this.form.images = data.data.url
			},
			onError(res, index, lists, name) {
				console.log(res, index, lists, name);
			}
		},
		onLoad() {
			this.userMessage = uni.getStorageSync('userMessage');
			this.header.token = "Bearer " + this.userMessage.token
			this.action = url.baseURL;
			
		}
	}
</script>

<style lang="scss" scoped>
	.addShopInformation {
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;

		.btn {
			width: 100%;
			position: fixed;
			bottom: 0;
		}
		.img{
			width: 120rpx;
			height: 120rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #f4f5f6;
			.plus{
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
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
