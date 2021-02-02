<template>
	<view class="supplierLogDetails">
		
		<view class="box">
			<view class="box-item">
				<text class="left">还款单号</text>
				<text class="black">{{form.no}}</text>
			</view>
			<view class="box-item">
				<text class="left">业务日期</text>
				<text class="black">{{form.business_time}}</text>
			</view>
			<view class="box-item">
				<text class="left">供应商</text>
				<text class="black">{{form.name}}</text>
			</view>
			<view class="box-item">
				<text class="left">付款账户</text>
				<text class="black">{{form.account.name}}</text>
			</view>
			<view class="box-item">
				<text class="left">实付金额</text>
				<text class="black">{{form.paid}}</text>
			</view>
		</view>
		<view class="box">
			<view class="box-item">
				<text class="left">制单人</text>
				<text class="black">{{form.user.name}}</text>
			</view>
			<view class="box-item">
				<text class="left">备注</text>
				<text class="black">{{form.remarks}}</text>
			</view>
		</view>
		<view class="btn" @click="sure">
			作废
		</view>
	</view>
</template>

<script>
	import {repaymentCancel} from '../../api/supplier.js'
	import {purchaseStorageCancel} from '../../api/purchaseStorage.js'
	import {purchaseRefundCancel} from '../../api/purchaseRefund.js'
	export default {
		data() {
			return {
				form:{}
			}
		},
		methods: {
			sure(){
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否作废该单据？',
					success: async function(res) {
						if (res.confirm) {
							if(_this.form.type==2){
								let res = await repaymentCancel(_this.form.id);
								if (!res.code) {
									_this.active = true;
									uni.navigateBack()
								}
							}else if(_this.form.type==1){
								let res = await purchaseRefundCancel(_this.form.id);
								if (!res.code) {
									_this.active = true;
									uni.navigateBack()
								}
							}else if(_this.form.type==0){
								let res = await purchaseStorageCancel(_this.form.id);
								if (!res.code) {
									_this.active = true;
									uni.navigateBack()
								}
							}
						} else if (res.cancel) {
							return true;
						}
					}
				});
			}
		},
		onLoad(option) {
			 let item = JSON.parse(decodeURIComponent(option.item));
			 this.form = item;
			 console.log(item);
		}
	}
</script>

<style scoped lang="scss">
.supplierLogDetails{
	width: 100%;
	display: flex;
	flex-direction: column;
	min-height: 100%;
	background-color: #EEEEEE;
	.btn{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		background-color: #007AFF;
		color: #FFFFFF;
		position: fixed;
		bottom: 0;
	}
	.box{
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		.box-item{
			width: 100%;
			display: flex;
			flex-direction: row;
			padding: 20rpx;
			background-color: #FFFFFF;
			border-bottom: 0.01rem solid #EEEEEE;
			.left{
				width: 220rpx;
				color: #999999;
				display: flex;
				align-content: center;
			}
			.black{
				display: flex;
				align-content: center;
			}
		}
	}
}
</style>
