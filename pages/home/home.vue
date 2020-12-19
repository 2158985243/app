<template>
	<view class="home">
		<view class="status_bar">
		</view>
		<view class="main">
			<view class="search">
				<u-icon name="grid" color="#ffffff" @tap='toAddMembership' size="50"></u-icon>
				<u-search margin=" 0 20rpx" height='60' @change="search" :show-action="false" shape="square" placeholder="请输入款号或条码快速检索库存"
				 v-model="keyword"></u-search>
				<u-icon name="scan" color="#ffffff" @tap='handelScan' size="50"></u-icon>
			</view>
			<view class="sale">
				<view class="day">
					<view @tap="changne(0)" class="today" :class="active==0? 'active':''">
						今日
					</view>
					<view @tap="changne(1)" class="thismonth" :class="active==1? 'active':''">
						本月
					</view>
				</view>
				<text class="num">￥{{money}}</text>
				<text>销售额</text>
			</view>
			<view class="nav">
				<view class="user">
					<text class="padd">0</text>
					<text class="min-size">本月新增会员</text>
				</view>
				<view class="account">
					<u-icon class="padd" name="coupon" color="#ffffff" size="50"></u-icon>
					<text class="min-size">账户</text>
				</view>
				<view class="repertory">
					<text class="padd">0</text>
					<text class="min-size">库存总数</text>
				</view>
			</view>
		</view>
		<view class="fot">
			<view class="aa">

				<view class="account" @click="toMemberManagement">
					<uni-icons type="contact-filled" color="#0055ff" size="50"></uni-icons>
					<text>会员管理</text>
				</view>
				<view class="account">
					<uni-icons type="contact-filled" color="#0055ff" size="70"></uni-icons>
					<text>零售收银</text>
				</view>
				<view class="account">
					<uni-icons type="contact-filled" color="#0055ff" size="50"></uni-icons>
					<text>销售查询</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				money: 12145,
				active: 0,
			}
		},
		methods: {
			changne(v) {
				this.active = v;
				this.money = 2120;
				if (v == 0) {
					this.money = 12145;
				}
			},
			toAddMembership() {
				uni.navigateTo({
					url: `/pages/addMembership/addMembership?`
				});
			},
			handelScan() {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						// console.log('条码内容：' + res.result);
						// this.keyword = res.result;
						uni.navigateTo({
							url: `/pages/inventory/inventory?val=${res.result}`
						})
					}
				});
			},
			search(res) {
				if (res) {
					uni.navigateTo({
						url: `/pages/inventory/inventory?val=${res}`
					})
				}
			},
			// 会员管理
			toMemberManagement(){
				uni.navigateTo({
					url: `/pages/memberManagement/memberManagement`
				});
			}
		},
		onShow() {
			this.keyword =''
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		width: 100%;
		height: 100%;
		background-color: #C8C7CC;
		display: flex;
		flex-direction: column;
		justify-content: center;

		// align-items: center;
		.main {
			width: 100%;
			height: 50%;
			background-color: #2979ff;
			display: flex;
			flex-direction: column;

			.search {
				width: 100%;
				height: 15%;
				display: flex;
				padding: 20rpx;
			}

			.sale {
				width: 100%;
				height: 70%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				color: #FFFFFF;

				.num {
					// display: block;
					padding: 40rpx 0;
					font-size: 36rpx;
				}

				.day {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 200rpx;
					height: 50rpx;
					line-height: 50rpx;
					background-color: #FFFFFF;
					border-radius: 20rpx;

					.active {
						background-color: #007AFF !important;
						color: #FFFFFF !important;
					}

					.today {
						color: #007AFF;
						border-radius: 20rpx 0 0 20rpx;
						width: 49%;
						height: 46rpx;
						text-align: center;
					}

					.thismonth {
						color: #007AFF;
						width: 49%;
						height: 46rpx;
						border-radius: 0 20rpx 20rpx 0;
						text-align: center;
					}

				}
			}

			.nav {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 180rpx;
				background-color: #2169d5;
				color: #FFFFFF;

				.padd {
					padding: 10rpx;
				}

				.user {
					width: 35%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
				}
				.min-size{
					font-size: 24rpx;
				}
				.account {
					width: 25%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					border-left: 2rpx solid rgba($color: #ffffff, $alpha: 0.2);
					border-right: 2rpx solid rgba($color: #ffffff, $alpha: 0.2);
				}

				.repertory {
					width: 35%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
				}
			}
		}

		.fot {
			width: 100%;
			height: 50%;
			background-color: #FFFFFF;
			margin-bottom: 4rpx;

			// display: flex;
			// justify-content: center;
			// align-items: flex-end;
			.aa {
				height: 60%;
				display: flex;
				align-items: flex-end;

				.account {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}

		}
	}
</style>
