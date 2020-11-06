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
				<u-upload width="120" height='120' upload-text='' :limitType='limit' image-mode='aspectFit' :action="action+'/api/upload'" :header="header" :name="formData.type"
				 :form-data="formData" @on-success="onSuccess" :file-list="fileList" :auto-upload="true" :max-size="5 * 1024 * 1024"
				 max-count="1" :show-progress="false" @on-error='onError' del-bg-color='#000000'>
				</u-upload>
			</view>
		</view>
		<u-button type="primary" class="btn" @click="save">保存</u-button>
	</view>
</template>

<script>
	import urls from '../../api/configuration.js'
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
					type: '',
					path: ''
				}
			}
		},
		methods: {
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
					uni.navigateTo({
						url: '/pages/storeManagement/storeManagement'
					})
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
			const userMessage = uni.getStorageSync('userMessage');
			this.action = urls.baseURL;
			this.header.token = "Bearer " + userMessage.token
			this.formData.type = "store";
			this.formData.path = "store";
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
