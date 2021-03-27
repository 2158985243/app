<template>
	<view class="editStaffsInformation">
		<view class="box">
			<view class="form_item">
				<text>员工姓名</text>
				<u-input placeholder='请输入员工姓名(必填)' v-model="form.name" type="text" />
			</view>
			<view class="form_item">
				<text>员工工号</text>
				<u-input placeholder='请输入员工工号' v-model="form.number" type="text" />
			</view>
			<view class="form_item">
				<text>员工职务</text>
				<u-input placeholder='请填写职务' type='text' v-model="form.job" />
			</view>
			<view class="form_item">
				<text>所属店铺</text>
				<u-input placeholder='请选择店铺' @click="toStore" :disabled='true' type='text' v-model="storeName" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
		</view>

		<view class="box">
			<view class="form_item">
				<text>联系电话</text>
				<u-input placeholder='请输入联系电话' type='number' v-model="form.mobile" />
			</view>
			<view class="form_item">
				<text>员工生日</text>
				<u-input placeholder='请选择生日日期' :disabled='true' @click='showPicker' v-model="form.birthday" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				<u-picker mode="time" v-model="show" @confirm="sele" :params="params"></u-picker>
			</view>
			<view class="form_item">
				<text>员工性别</text>
				<u-radio-group v-model="form.gender">
					<u-radio name="1">男</u-radio>
					<u-radio name="2">女</u-radio>
				</u-radio-group>
			</view>
			<view class="form_item">
				<text>基本工资</text>
				<u-input placeholder='请输入基本工资' v-model="form.salary" type="number" />
			</view>
			<view class="form_item">
				<text>入职日期</text>
				<u-input placeholder='请选择入职日期' :disabled='true' @click='showPicker1' v-model="form.join_time" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				<u-picker mode="time" v-model="show1" @confirm="sele1" :params="params"></u-picker>
			</view>
		</view>

		<view class="box">
			<view class="form_item">
				<text>备注信息</text>
				<u-input placeholder='请输入备注信息' v-model="form.remarks" type="text" />
			</view>
			<view class="form_item">
				<text>在职状态</text>
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
		<view class="btn">
			<u-button type="error" class='btn_box' @click="del">删除</u-button>
			<u-button type="primary" class='btn_box' @click="save">保存</u-button>
		</view>
	</view>
</template>

<script>
	import url from '../../api/configuration.js'
	import {
		staff,
		staffEdit,
		staffDel
	} from '../../api/staff.js'
	import {
		storeList
	} from "../../api/store.js"
	export default {
		data() {
			return {
				show: false,
				show1: false,
				limit: ['png', 'jpg', 'jpeg'],
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				checked: true,
				form: {
					name: '',
					number: "",
					job: "",
					store_id: "",
					mobile: "",
					birthday: "1970-01-01",
					gender: 1,
					salary: 0,
					join_time: "1970-01-01",
					status: 1,
					remarks: "",
					images: ""
				},
				fileList: [],
				action: '',
				header: {
					token: ''
				},
				formData: {
					type: 'staff',
					path: 'staff'
				},
				storeName: '',
				id:0,
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
			// 删除
			async del(){
				uni.showModal({
					title: '提示',
					content: '是否删除此员工？',
					success: async (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							let res = await staffDel(this.id)
							if (!res.code) {
								uni.navigateBack()
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 编辑
			async save(){
				let res = await staffEdit(this.id,this.form)
				if (!res.code) {
					uni.navigateBack()
				}
			},
			showPicker() {
				this.show = true;
			},
			showPicker1() {
				this.show1 = true;
			},
			// 确定选择生日日期
			sele(res) {
				console.log(res);
				this.val = res;
				this.form.birthday = this.val.year + '-' + this.val.month + '-' + this.val.day;
			},
			// 确定选择入职日期
			sele1(res) {
				console.log(res);
				this.val = res;
				this.form.join_time = this.val.year + '-' + this.val.month + '-' + this.val.day;
			},
			changeStatus(v) {
				// console.log(v);
				this.form.status = v;
			},
			toStore() {
				uni.navigateTo({
					url: '/pages/storeManagement/storeManagement?iq=1'
				})
			},
			onSuccess(data, index, lists, name) {
				console.log(data, index, lists, name);
				this.form.images = data.data.url
			},
			onError(res, index, lists, name) {
				console.log(res, index, lists, name);
			},
			async init(id) {
				let res = await staff(id)
				this.form = res;
				this.storeName = res.store.name;
				
			}
		},
		onUnload() {
			uni.$off()
		},
		onLoad(query) {
			this.userMessage = uni.getStorageSync('userMessage');
			this.header.token = "Bearer " + this.userMessage.token
			this.action = url.baseURL;
			this.init(query.id);
			this.id = query.id;
			uni.$on("gloEvent", (res) => {
				if (res) {
					this.storeName = res.name;
					this.form.store_id = res.id;

				}
			});

		}

	}
</script>

<style lang="scss" scoped>
	.editStaffsInformation {
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
