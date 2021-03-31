<template>
	<view class="addSupplier">
		<view class="box">
			<view class="form_item">
				<text>供应商名称</text>
				<u-input placeholder='请输入供应商名称' v-model="form.name" type="text" />
			</view>
			<view class="form_item">
				<text>联系人</text>
				<u-input placeholder='请输入联系人' v-model="form.contact" type="text" />
			</view>
			<view class="form_item">
				<text>手机号</text>
				<u-input placeholder='请输入联系电话' type='number' v-model="form.mobile" />
			</view>
		</view>
		<view class="box">
			<view class="form_item">
				<text>初期欠款</text>
				<u-input placeholder='请输入初期欠款' type='number' v-model="form.base_money" />
			</view>
		</view>
		<view class="box">
			<view class="form_item">
				<text>地区信息</text>
				<u-input placeholder='请选择地区' :disabled='true' @click='showPicker' v-model="form.area" type="text" />
				<u-picker mode="region" v-model="show" :default-region='defaultres' @confirm="sele" :params="params"></u-picker>
			</view>
			<view class="form_item">
				<text>详细地址</text>
				<u-input placeholder='请输入详细地址' v-model="form.address" type="text" />
			</view>
		</view>
		<view class="box">
			<view class="form_item">
				<text>电话</text>
				<u-input placeholder='请输入电话' type='text' v-model="form.phone" />
			</view>
			<view class="form_item">
				<text>传真</text>
				<u-input placeholder='请输入传真' v-model="form.fax" type="text" />
			</view>
			<view class="form_item">
				<text>邮箱</text>
				<u-input placeholder='请输入邮箱' v-model="form.email" type="text" />
			</view>
			<view class="form_item">
				<text>银行名称</text>
				<u-input placeholder='请输入银行名称' v-model="form.bank_name" type="text" />
			</view>
			<view class="form_item">
				<text>银行账号</text>
				<u-input placeholder='请输入银行账号' v-model="form.bank_account" type="text" />
			</view>
			<view class="form_item">
				<text>持卡人</text>
				<u-input placeholder='请输入持卡人' v-model="form.card_owner" type="text" />
			</view>
			<view class="form_item">
				<text>备注</text>
				<u-input placeholder='请输入备注' v-model="form.remarks" type="text" />
			</view>
		</view>
		<u-button type="primary" class="btn" @click="save">保存</u-button>
	</view>
</template>

<script>
	import {
		supplierAdd
	} from '../../api/supplier.js'
	export default {
		data() {
			return {
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
					base_money: "",
					area: "",
					address: "",
					phone: "",
					fax: "",
					email: "",
					bank_name: "",
					bank_account: "",
					card_owner: "",
					remarks: ""
				},
				fileList: [],
				action: '',
				header: {
					token: ''

				},
				formData: {
					type: 'supplier',
					path: 'supplier'
				},
				val: ''
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
				let obj = {}
				for (let key in this.form) {
					if (this.form[key]) {
						obj[key] = this.form[key];
					}
				}
				let res = await supplierAdd(obj)
				if (!res.code) {
					// if (this.val) {
						uni.navigateBack()
					// } else {
					// 	uni.navigateTo({
					// 		url: '/pages/supplier/supplier'
					// 	})
					// }
				}
			},
		},
		onLoad(query) {
			this.val = query.val
		}
	}
</script>

<style lang="scss" scoped>
	.addSupplier {
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
	}
</style>
