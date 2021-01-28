<template>
	<view class="statement">
		<!-- 经营 -->
		<view class="box">
			<view class="nav">
				<view class="color1"></view>
				<text>经营</text>
			</view>
			<view class="list">
				<view class="li" @click="toBusinessOverview">
					<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
					<text>营业概况</text>
				</view>
				<view class="li">
					<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
					<text>收银对账</text>
				</view>
				<view class="li">
					<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
					<text>收支结余</text>
				</view>
				<view class="li last">
					<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
					<text>供应商对账</text>
				</view>
			</view>
		</view>
		<!-- 分析 -->
		<view class="box">
			<view class="nav">
				<view class="color2"></view>
				<text>分析</text>
			</view>
			<view class="list">
				<view class="li">
					<u-icon name="calendar-fill" color="#ffa322" size="40"></u-icon>
					<text>销售分析</text>
				</view>
				<view class="li">
					<u-icon name="calendar-fill" color="#ffa322" size="40"></u-icon>
					<text>商品分析</text>
				</view>
				<view class="li" @click="toMemberAnalysis">
					<u-icon name="calendar-fill" color="#ffa322" size="40"></u-icon>
					<text>会员分析</text>
				</view>
				<view class="li last" @click="toStatics">
					<u-icon name="calendar-fill" color="#ffa322" size="40"></u-icon>
					<text>支出分析</text>
				</view>
			</view>
		</view>
		<!-- 统计 -->
		<view class="box">
			<view class="nav">
				<view class="color3"></view>
				<text>统计</text>
			</view>
			<view class="list">
				<view class="li" @click="toProcurementStatistics">
					<u-icon name="file-text-fill" color="#11c8ff" size="40"></u-icon>
					<text>采购统计</text>
				</view>
				<view class="li" @click="toSalesStatistics">
					<u-icon name="file-text-fill" color="#11c8ff" size="40"></u-icon>
					<text>销售统计</text>
				</view>
				<view class="li" @click="toAllotStatistics">
					<u-icon name="file-text-fill" color="#11c8ff" size="40"></u-icon>
					<text>调拨统计</text>
				</view>
				<view class="li last" @click="toCheckStatistics">
					<u-icon name="file-text-fill" color="#11c8ff" size="40"></u-icon>
					<text>盘点统计</text>
				</view>
			</view>
		</view>
		<!-- 会员&员工 -->
		<view class="box">
			<view class="nav">
				<view class="color4"></view>
				<text>会员&员工</text>
			</view>
			<view class="list">
				<view class="li" @click="toBalanceEnquiry">
					<u-icon name="account-fill" color="#ff551d" size="40"></u-icon>
					<text>余额查询</text>
				</view>
				<view class="li" @click="toMemberRegistrationStatistics">
					<u-icon name="account-fill" color="#ff551d" size="40"></u-icon>
					<text>注册统计</text>
				</view>
				<view class="li">
					<u-icon name="account-fill" color="#ff551d" size="40"></u-icon>
					<text>调整统计</text>
				</view>
				<view class="li last">
					<u-icon name="account-fill" color="#ff551d" size="40"></u-icon>
					<text>业绩统计</text>
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
			// 前往支出分析
			toStatics(){
				uni.navigateTo({
					url: `/pages/statics/statics`
				})
			},
			// 前往注册统计
			toMemberRegistrationStatistics(){
				uni.navigateTo({
					url: `/pages/memberRegistrationStatistics/memberRegistrationStatistics`
				})
			},
			// 前往会员分析
			toMemberAnalysis(){
				uni.navigateTo({
					url: `/pages/memberAnalysis/memberAnalysis`
				})
			},
			// 前往采购统计
			toProcurementStatistics(){
				uni.navigateTo({
					url: `/pages/procurementStatistics/procurementStatistics`
				})
			},
			// 前往销售统计
			toSalesStatistics(){
				uni.navigateTo({
					url: `/pages/salesStatistics/salesStatistics`
				})
			},
			// 前往调拨统计
			toAllotStatistics(){
				uni.navigateTo({
					url: `/pages/allotStatistics/allotStatistics`
				})
			},
			// 前往盘点统计
			toCheckStatistics(){
				uni.navigateTo({
					url: `/pages/checkStatistics/checkStatistics`
				})
			},
			// 前往余额查询
			toBalanceEnquiry(){
				uni.navigateTo({
					url: `/pages/balanceEnquiry/balanceEnquiry`
				})
			},
			// 前往营业概况
			toBusinessOverview(){
				uni.navigateTo({
					url: `/pages/businessOverview/businessOverview`
				})
			},
			
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body,
	html,
	body {
		height: 100%;
	}

	.statement {
		width: 100%;
		height: 100%;
		background-color: #f2f2f2;
		display: flex;
		flex-direction: column;
		.box{
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			.nav{
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 10rpx;
				border-bottom: 0.01rem solid #E5E5E5;
				.color1{
					background-color: #0055ff;
					width: 8rpx;
					height: 20rpx;
					display: flex;
					margin: 0 10rpx;
				}
				.color2{
					background-color: #ffa322;
					width: 8rpx;
					height: 20rpx;
					display: flex;
					margin: 0 10rpx;
				}
				.color3{
					background-color: #11c8ff;
					width: 8rpx;
					height: 20rpx;
					display: flex;
					margin: 0 10rpx;
				}
				.color4{
					background-color: #ff551d;
					width: 8rpx;
					height: 20rpx;
					display: flex;
					margin: 0 10rpx;
				}
				
			}
			.list{
				width: 100%;
				display: flex;
				flex-direction: row;
				.li{
					flex: 1;
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-right: 0.01rem solid #E5E5E5;
					padding: 20rpx 0;
					text{
						margin-top: 10rpx;
						font-size: 24rpx;
					}
				}
				.last{
					border-right: 0rem solid #E5E5E5;
				}
			}
		}
	}
</style>
