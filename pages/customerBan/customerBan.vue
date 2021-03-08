<template>
	<view class="customerBan">
		<view class="information">
			<view class="header-ifo">
				<view class="header-img">
					<view class="left">
						<view class="img">
							<u-image width="100" border-radius='18' height="100" mode='aspectFit' :src="$cfg.domain+form.image">
							</u-image>
						</view>
						<view class="name">
							<text>{{form.name}}</text>
							<view class="car">
								<text>{{form.customer_level.name}}</text>
								<text class="mobile">{{form.mobile}}</text>
							</view>
						</view>
					</view>
					<view class="right">
						<text>消费{{form.resume_times}}次</text>
					</view>
				</view>
				<view class="number">
					<text>No.{{form.number}}</text>
					<u-icon name="phone-fill" color="#ffffff" size="34"></u-icon>
				</view>
			</view>
			<view class="information-dates">
				<view class="integral" >
					<text class="hei">积分</text>
					<text class="lan">{{form.point}}</text>
				</view>
				<view class="balance">
					<text class="hei">余额(&yen;)</text>
					<text class="lan">{{form.balance}}</text>
				</view>
				<view class="coupon">
					<text class="hei">优惠券</text>
					<text class="lan">{{0}}</text>
				</view>
		
			</view>
		</view>
		<view class="box">
			<view class="box-title">备注说明</view>
			<view class="box-cont">
				<u-input v-model="remarks" placeholder="请输入挂失的原因" type="textarea" height="150" :border="true" :clearable="false" />
			</view>
		</view>
		<view class="btn" @click="sure">
			确认挂失
		</view>
	</view>
</template>

<script>
	import {customerBan} from '../../api/customer.js'
	export default {
		data() {
			return {
				form:{},
				remarks:''
			}
		},
		methods: {
			async sure(){
				let res = await customerBan(this.form.id,{
					remarks:this.remarks
				})
				if(!res.code){
					uni.navigateBack()
				}
			}
		},
		onLoad(query) {
			this.form = JSON.parse(decodeURIComponent(query.obj));
		}
	}
</script>

<style scoped lang="scss">
.customerBan{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #F8F8F8;
	align-items: center;
	.information {
		width: 100%;
		padding: 20rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
	
		.header-ifo {
			width: 100%;
			height: 190rpx;
			background-color: #74ABFD;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			color: #FFFFFF;
			font-size: 20rpx;
			padding: 20rpx;
	
			.header-img {
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding-bottom: 20rpx;
	
				.left {
					display: flex;
					flex-direction: row;
	
					.name {
						display: flex;
						margin-left: 20rpx;
						flex-direction: column;
	
						.car {
							width: 100%;
							display: flex;
							flex-direction: row;
							margin-top: 30rpx;
	
							.mobile {
								margin-left: 20rpx;
							}
						}
					}
				}
	
				.right {
					display: flex;
					align-items: center;
				}
			}
	
			.number {
				width: 100%;
				display: flex;
				justify-content: space-between;
			}
		}
	
		.information-dates {
			width: 100%;
			display: flex;
			flex-direction: row;
			padding-top: 20rpx;
	
			.integral {
				flex: 1;
				display: flex;
				flex-direction: column;
				border-right: 2rpx solid #C8C7CC;
				justify-content: center;
				align-items: center;
	
				.hei {
					font-weight: 600;
				}
	
				.lan {
					color: #007AFF;
				}
			}
	
			.balance {
				flex: 1;
				display: flex;
				flex-direction: column;
				border-right: 2rpx solid #C8C7CC;
				justify-content: center;
				align-items: center;
	
				.hei {
					font-weight: 600;
				}
	
				.lan {
					color: #007AFF;
					width: 100%;
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
					text-align: center;
				}
			}
	
			.coupon {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
	
				.hei {
					font-weight: 600;
				}
	
				.lan {
					color: #007AFF;
				}
			}
	
		}
	}
	.box{
		width: 100%;
		padding: 20rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		.box-cont{
			margin-top: 10rpx;
		}
	}
	.btn{
		width: 100%;
		background-color: #4B8CF0;
		height: 80rpx;
		color: #FFFFFF;
		position: fixed;
		bottom: 0;
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
