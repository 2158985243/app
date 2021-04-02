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
				<view class="li" @click="toCashierCheck">
					<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
					<text>收银对账</text>
				</view>
				<view class="li" @click="toCashierBalance">
					<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
					<text>收支结余</text>
				</view>
				<view class="li last" @click="toReconciliation">
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
				<view class="li" @click="toAnalyse">
					<u-icon name="calendar-fill" color="#ffa322" size="40"></u-icon>
					<text>销售分析</text>
				</view>
				<view class="li" @click="toGoodsAnalyse">
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
				<view class="li" @click="tokk">
					<u-icon name="account-fill"  color="#ff551d" size="40"></u-icon>
					<text>调整统计</text>
				</view>
				<view class="li last" @click="toStaffAchievement">
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
			toStatics() {
				if(this.$store.state.authority.join(",").indexOf('expend_analysis') != -1){
					uni.navigateTo({
						url: `/pagesStatement/statics/statics`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往注册统计
			toMemberRegistrationStatistics() {
				if(this.$store.state.authority.join(",").indexOf('register_statistics') != -1){
					uni.navigateTo({
						url: `/pagesStatement/memberRegistrationStatistics/memberRegistrationStatistics`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往调整统计
			tokk() {
				if(this.$store.state.authority.join(",").indexOf('adjust_statistics') != -1){
					// uni.navigateTo({
					// 	url: `/pages/memberRegistrationStatistics/memberRegistrationStatistics`
					// })
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往业绩统计
			toStaffAchievement() {
				if(this.$store.state.authority.join(",").indexOf('achievement_statistics') != -1){
					uni.navigateTo({
						url: `/pagesStatement/staffAchievement/staffAchievement`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往销售分析
			toAnalyse() {
				if(this.$store.state.authority.join(",").indexOf('sales_analysis') != -1){
					uni.navigateTo({
						url: `/pagesStatement/analyse/analyse`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往销售分析
			toGoodsAnalyse() {
				if(this.$store.state.authority.join(",").indexOf('goods_analysis') != -1){
					uni.navigateTo({
						url: `/pagesStatement/goodsAnalyse/goodsAnalyse`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往会员分析
			toMemberAnalysis() {
				if(this.$store.state.authority.join(",").indexOf('customer_analysis') != -1){
					uni.navigateTo({
						url: `/pagesStatement/memberAnalysis/memberAnalysis`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往采购统计
			toProcurementStatistics() {
				if(this.$store.state.authority.join(",").indexOf('purchase_statistics') != -1){
					uni.navigateTo({
						url: `/pagesStatement/procurementStatistics/procurementStatistics`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			
			// 前往销售统计
			toSalesStatistics() {
				if(this.$store.state.authority.join(",").indexOf('sales_statistics') != -1){
					uni.navigateTo({
						url: `/pagesStatement/salesStatistics/salesStatistics`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往调拨统计
			toAllotStatistics() {
				if(this.$store.state.authority.join(",").indexOf('allocate_statistics') != -1){
					uni.navigateTo({
						url: `/pagesStatement/allotStatistics/allotStatistics`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往盘点统计
			toCheckStatistics() {
				if(this.$store.state.authority.join(",").indexOf('check_statistics') != -1){
					uni.navigateTo({
						url: `/pagesStatement/checkStatistics/checkStatistics`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往余额查询
			toBalanceEnquiry() {
				if(this.$store.state.authority.join(",").indexOf('balance_inquire') != -1){
					uni.navigateTo({
						url: `/pagesStatement/balanceEnquiry/balanceEnquiry`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往营业概况
			toBusinessOverview() {
				if(this.$store.state.authority.join(",").indexOf('business_status') != -1){
					uni.navigateTo({
						url: `/pagesStatement/businessOverview/businessOverview`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往收银对账概况
			toCashierCheck() {
				if(this.$store.state.authority.join(",").indexOf('cashier_balance') != -1){
					uni.navigateTo({
						url: `/pagesStatement/cashierCheck/cashierCheck`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往收支结余
			toCashierBalance() {
				if(this.$store.state.authority.join(",").indexOf('cashier_balance') != -1){
					uni.navigateTo({
						url: `/pagesStatement/cashierBalance/cashierBalance`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 前往供应商对账
			toReconciliation() {
				if(this.$store.state.authority.join(",").indexOf('supplier_reconciliation') != -1){
					uni.navigateTo({
						url: `/pagesStatement/reconciliation/reconciliation`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
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
