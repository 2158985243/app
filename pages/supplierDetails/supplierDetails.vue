<template>
	<view class="supplierDetails">
		<u-navbar back-icon-color='#ffffff' title="供应商详情" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen" @click="toEditSupplier" color="#ffffff" class="right_icon" size="40"></u-icon>
			</template>
		</u-navbar>
		<view class="box">
			<view class="form_item">
				<text>供应商名称</text>
				<view class="">
					{{form.name}}
				</view>
			</view>
			<view class="form_item">
				<text>联系人</text>
				<view class="">
					{{form.bank_name}}
				</view>
			</view>
			<view class="form_item">
				<text>手机号</text>
				<view class="">
					{{form.mobile}}
				</view>
			</view>
		</view>
		
		<view class="box">
			<view class="form_item">
				<text>初期欠款</text>
				<view class="">
					&yen;{{form.base_money}}
				</view>
			</view>
			<view class="form_item">
				<text>欠供应商商</text>
				<view class="balance">
					&yen;{{form.balance}}
				</view> 
				<u-icon name="arrow-right" color="#9c9c9c" class="ricon" size="40"></u-icon>
			</view>
		</view>
		
		<u-button type="primary" class="btn" @click="save">还款</u-button>
	</view>
</template>

<script>
	import {supplier} from '../../api/supplier.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				form:{},
				id:0,
			}
		},
		methods: {
			async init(id){
				let res = await supplier(id);
				this.form = res;
			},
			// 还款
			async save(){
					
			},
			toEditSupplier(){
				uni.navigateTo({
					url: `/pages/editSupplier/editSupplier?id=${this.id}`
				})
			}
		},
		onLoad(query) {
			console.log(query);
			this.id = query.id;
			this.init(this.id)
		}
	}
</script>

<style lang="scss" scoped>
.supplierDetails{
	width: 100%;
	height: 100%;
	background-color: #F8F8F8;
	.right_icon {
		margin-right: 30rpx;
	}
	.ricon{
		float: right;
	}
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
			.balance{
				width: 70%;
			}
		}
	}
}
</style>
