<template>
	<view class="addStaffsInformation">
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
				<u-upload width="120" height='120' upload-text='' image-mode='aspectFit' :limitType='limit' :action="action+'/api/upload'"
				 :header="header" :name="formData.type" :form-data="formData" @on-success="onSuccess" :file-list="fileList"
				 :auto-upload="true" :max-size="5 * 1024 * 1024" max-count="1" :show-progress="false" @on-error='onError'
				 del-bg-color='#000000'>
				</u-upload>
			</view>
		</view>
		<u-button type="primary" class="btn" @click="save">保存</u-button>
	</view>
</template>

<script>
	import urls from '../../api/configuration.js'
	import {
		staffAdd
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
				storeName: ''
			}
		},
		methods: {
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
			// 保存
			async save() {
				this.form.salary = Number(this.form.salary)
				let res = await staffAdd(this.form)
				// console.log(res);
				if (!res.code) {
					uni.navigateBack()
				}
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
			async init(){
				let res = await storeList()
				console.log(res);
				this.storeName  = res.data[0].name;
				this.form.store_id = res.data[0].id;
			}
		},
		onLoad(query) {
			const userMessage = uni.getStorageSync('userMessage');
			this.action = urls.baseURL;
			this.header.token = "Bearer " + userMessage.token
			this.formData.type = "store";
			this.formData.path = "store";
			// this.init()
			uni.$on("gloEvent", (res) => {
				if(res){
					this.storeName  = res.name;
					this.form.store_id = res.id;
				}
			});
			
			
		}

	}
</script>

<style lang="scss" scoped>
	.addStaffsInformation {
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
