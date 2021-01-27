<template>
	<view class="marketing">
		<view class="header-title">
			<view class="hd-item">
				<text>本月新增</text>
				<text>{{0}}位</text>
			</view>
			<view class="hd-item">
				<text>本月生日</text>
				<text>{{0}}位</text>
			</view>
			<view class="hd-item">
				<text>过期提醒</text>
				<text>{{0}}位</text>
			</view>
		</view>
		<!-- 优惠券 -->
		<view class="box">
			<view class="nav">
				<view class="color1"></view>
				<text>优惠券</text>
			</view>
			<view class="list">
				<view class="li">
					<u-icon name="coupon-fill" color="#0055ff" size="40"></u-icon>
					<text>优惠卡券</text>
				</view>
				<view class="li">
					<u-icon name="coupon-fill" color="#0055ff" size="40"></u-icon>
					<text>定向优惠券</text>
				</view>
				<view class="li last">
					<u-icon name="error-circle" color="#0055ff" size="40"></u-icon>
					<text>过期提醒</text>
				</view>
			</view>
		</view>
		<!-- 营销工具 -->
		<view class="box">
			<view class="nav">
				<view class="color2"></view>
				<text>营销工具</text>
			</view>
			<view class="list">
				<view class="li">
					<u-icon name="heart-fill" color="#ffa322" size="40"></u-icon>
					<text>注册有礼</text>
				</view>
				<view class="li">
					<u-icon name="grid-fill" color="#ffa322" size="40"></u-icon>
					<text>充值赠送</text>
				</view>

				<view class="li last">
					<u-icon name="clock-fill" color="#ffa322" size="40"></u-icon>
					<text>即时特价</text>
				</view>
			</view>
		</view>
		<!-- 微信平台 -->
		<view class="box">
			<view class="nav">
				<view class="color3"></view>
				<text>微信平台</text>
			</view>
			<view class="list">
				<view class="li">
					<u-icon name="file-text-fill" color="#11c8ff" size="40"></u-icon>
					<text>微信会员卡</text>
				</view>

				<view class="li">
					<u-icon name="tags-fill" color="#11c8ff" size="40"></u-icon>
					<text>微信优惠商品</text>
				</view>
				<view class="li last">
					<u-icon name="star-fill" color="#11c8ff" size="40"></u-icon>
					<text>微信活动海报</text>
				</view>
			</view>
		</view>
		<!-- 店铺工具 -->
		<view class="box">
			<view class="nav">
				<view class="color4"></view>
				<text>店铺工具</text>
			</view>
			<view class="list">
				<view class="li">
					<u-icon name="email-fill" color="#ff551d" size="40"></u-icon>
					<text>群发短信</text>
				</view>
				<view class="li">
					<u-icon name="account-fill" color="#ff551d" size="40"></u-icon>
					<text>积分清零</text>
				</view>
				<view class="li last">
					<u-icon name="account-fill" color="#ff551d" size="40"></u-icon>
					<text>意见受理</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body,
	html,
	body {
		height: 100%;
	}

	// 2979ff
	.marketing {
		width: 100%;
		display: flex;
		min-height: 100%;
		background-color: #f2f2f2;
		flex-direction: column;
		.header-title {
			width: 100%;
			height: 140rpx;
			background-color: #2979ff;
			color: #FFFFFF;
			display: flex;
			flex-direction: row;

			.hd-item {
				flex: 1;
				display: flex;
				flex-direction: column;
			}

			text {
				display: flex;
				justify-content: center;
				align-items: center;
				padding-top: 20rpx;
			}
		}

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #FFFFFF;
			margin-bottom: 20rpx;

			.nav {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 10rpx;
				border-bottom: 0.01rem solid #E5E5E5;

				.color1 {
					background-color: #0055ff;
					width: 8rpx;
					height: 20rpx;
					display: flex;
					margin: 0 10rpx;
				}

				.color2 {
					background-color: #ffa322;
					width: 8rpx;
					height: 20rpx;
					display: flex;
					margin: 0 10rpx;
				}

				.color3 {
					background-color: #11c8ff;
					width: 8rpx;
					height: 20rpx;
					display: flex;
					margin: 0 10rpx;
				}

				.color4 {
					background-color: #ff551d;
					width: 8rpx;
					height: 20rpx;
					display: flex;
					margin: 0 10rpx;
				}

			}

			.list {
				width: 100%;
				display: flex;
				flex-direction: row;

				.li {
					flex: 1;
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-right: 0.01rem solid #E5E5E5;
					padding: 20rpx 0;

					text {
						margin-top: 10rpx;
						font-size: 24rpx;
					}
				}

				.last {
					border-right: 0rem solid #E5E5E5;
				}
			}
		}
	}
</style>
