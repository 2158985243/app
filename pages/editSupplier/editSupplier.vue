<template>
	<view class="editSupplier">
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
				<text>启动状态</text>
				<u-switch v-model="checked" @change="changeStatus" active-value="1" inactive-value="0"></u-switch>
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
		<view class="btn">
			<u-button type="error" class="btn_box" @click="del">删除</u-button>
			<u-button type="primary" class="btn_box" @click="save">保存</u-button>
		</view>
	</view>
</template>

<script>
	import {
		supplier,
		supplierEdit,
		supplierDel
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
					status: 1,
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
				id: 0
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
				let res = await supplierEdit(this.id, this.form);
				// console.log(res);
				if (!res.code) {
					uni.navigateBack()
				}
			},
			async del() {
				uni.showModal({
					title: '提示',
					content: '是否删除此供应商？',
					success: async (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							let res = await supplierDel(this.id);
							if (!res.code) {
								uni.navigateBack()
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			async init() {
				let res = await supplier(this.id);
				if (!res.code) {
					this.form = res;
				}
			}
		},
		onLoad(query) {
			this.id = query.id;
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.editSupplier {
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;

		.btn {
			width: 100%;
			position: fixed;
			bottom: 0;
			display: flex;

			.btn_box {
				flex: 1;
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
	}
</style>
