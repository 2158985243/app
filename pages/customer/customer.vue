<template>
	<view class="customer">
		<u-navbar back-icon-color='#ffffff' title="会员详情" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen-fill" @click="toProjectQuery" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="information">
			<view class="header-ifo">
				
			</view>
			<view class="information-dates">
				<view class="integral">
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
		<view class="modulation">
			
		</view>
		<view class="box">
			
		</view>
		<view class="box">
			
		</view>
	</view>
</template>

<script>
	import {
		customer
	} from '../../api/customer.js'
	export default {
		data() {
			return {
				id: 0,
				form: {},
				background: {
					backgroundColor: '#2979ff'
				},
			}
		},
		methods: {
			async init(id) {
				let res = await customer(id);
				console.log(res);
				this.form = res
			}
		},
		onLoad(query) {
			this.id = query.id;
			this.init(query.id);
		}
	}
</script>

<style scoped lang="scss">
	.customer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		.right_icon{
			margin-right: 30rpx;
		}
		.information{
			width: 100%;
			padding: 20rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			.header-ifo{
				width: 100%;
				height: 200rpx;
				background-color: #007AFF;
				border-radius: 20rpx;
			}
			.information-dates{
				width: 100%;
				display: flex;
				flex-direction: row;
				padding-top: 20rpx;
				.integral{
					flex: 1;
					display: flex;
					flex-direction: column;
					border-right: 2rpx solid #C8C7CC;
					justify-content: center;
					align-items: center;
					.hei{
						font-weight: 600;
					}
					.lan{
						color: #007AFF;
					}
				}
				.balance{
					flex: 1;
					display: flex;
					flex-direction: column;
					border-right: 2rpx solid #C8C7CC;
					justify-content: center;
					align-items: center;
					.hei{
						font-weight: 600;
					}
					.lan{
						color: #007AFF;
					}
				}
				.coupon{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.hei{
						font-weight: 600;
					}
					.lan{
						color: #007AFF;
					}
				}
				
			}
		}
	}
</style>
