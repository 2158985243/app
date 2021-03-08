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
				<view class="bg">
				</view>
				<view class="cont">
					
				<view class="day">
					<view @tap="changne(0)" class="today" :class="active==0? '':'active'">
						今日
					</view>
					<view @tap="changne(1)" class="thismonth" :class="active==1? '':'active'">
						本月
					</view>
				</view>
				<text class="num">&yen;{{salesMoney_total[active]}}</text>
				<text>销售额</text>
				</view>
			</view>
			<view class="nav">
				<view class="user" @click="toNewCustomer">
					<text class="padd">{{curtormer_total}}</text>
					<text class="min-size">本月新增会员</text>
				</view>
				<view class="account" @click="toAccountManagement">
					<u-icon class="padd" name="coupon" color="#ffffff" size="50"></u-icon>
					<text class="min-size">账户</text>
				</view>
				<view class="repertory" @click="toStockQuantity">
					<text class="padd">{{goods_number}}</text>
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
				<view class="account" @click="toResaleCashier">
					<uni-icons type="contact-filled" color="#0055ff" size="70"></uni-icons>
					<text>零售收银</text>
				</view>
				<view class="account" @click="toSalesInquiry">
					<uni-icons type="contact-filled" color="#0055ff" size="50"></uni-icons>
					<text>销售查询</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getNewCustomer
	} from '../../api/customer.js'
	import {
		getSalesMoney
	} from '../../api/salesOrder.js'
	import {
		getTotal
	} from '../../api/goods.js'
	import store from '@/store'
	export default {
		data() {
			return {
				keyword: '',
				active: 0,
				curtormer_total:0,
				salesMoney_total:[0,0],
				page:1,
				page_size:10,
				goods_number:0,
			}
		},
		methods: {
			async changne(v) {
				this.active = v;
				if(v==0){
					if(this.$store.state.authority.join(",").indexOf('sales_inquire') != -1){
						let todays = this.$date.today();
						let res2 = await getSalesMoney({
							...todays,
							store_id:store.state.store.store_id,
							page: this.page,
							page_size: this.page_size
						})
						this.salesMoney_total[0] = res2.money;
					}else{
						this.salesMoney_total[0] = '***';
						uni.showToast({
						    title: '您还没有该权限!',
						    duration: 1000,
							icon:"none",
							position:"bottom"
						});
					}
				}else{
					if(this.$store.state.authority.join(",").indexOf('sales_inquire') != -1){
						let dated = this.$date.thisMonth();
						let res2 = await getSalesMoney({
							...dated,
							store_id:store.state.store.store_id,
							page: this.page,
							page_size: this.page_size
						})
						this.salesMoney_total[1] = res2.money;
					}else{
						this.salesMoney_total[1] = '***';
						uni.showToast({
						    title: '您还没有该权限!',
						    duration: 1000,
							icon:"none",
							position:"bottom"
						});
					}
				}
			},
			toAddMembership() {
				if(this.$store.state.authority.join(",").indexOf('customer_management') != -1){
					uni.navigateTo({
						url: `/pages/addMembership/addMembership?`
					});
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
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
			// 库存总数
			toStockQuantity(){
				if(this.$store.state.authority.join(",").indexOf('stock_inquire') != -1){
					uni.navigateTo({
						url: `/pages/stockQuantity/stockQuantity`
					});
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 会员管理
			toMemberManagement(){
				if(this.$store.state.authority.join(",").indexOf('customer_management') != -1){
					uni.navigateTo({
						url: `/pages/memberManagement/memberManagement`
					});
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 账户
			toAccountManagement(){
				if(this.$store.state.authority.join(",").indexOf('account_management') != -1){
					uni.navigateTo({
						url: `/pages/accountManagement/accountManagement`
					});
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 本月新增会员
			toNewCustomer(){
				if(this.$store.state.authority.join(",").indexOf('customer_management') != -1){
					uni.navigateTo({
						url: `/pages/newCustomer/newCustomer`
					});
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 零售收银
			toResaleCashier(){
				if(this.$store.state.authority.join(",").indexOf('retial_cashier') != -1){
					this.$store.commit('commercialSpecification',{
						specificationOfGoods:[]
					})
					this.$store.commit('stateGoodFn',{
						stateGood:false
					})
					uni.navigateTo({
						url: `/pages/resaleCashier/resaleCashier`
					});
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 销售查询
			toSalesInquiry(){
				if(this.$store.state.authority.join(",").indexOf('sales_inquire') != -1){
					uni.navigateTo({
						url: `/pages/salesInquiry/salesInquiry`
					});
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			
			async init(v){
				let res = await getNewCustomer({
					...v,
					page: this.page,
					page_size: this.page_size
				})
				this.curtormer_total = res.total;
				
				let todays = this.$date.today();
				if(this.$store.state.authority.join(",").indexOf('sales_inquire') != -1){
					let res2 = await getSalesMoney({
						...todays,
						store_id:store.state.store.store_id,
						page: this.page,
						page_size: this.page_size
					})
					this.salesMoney_total[0] = res2.money;
				}else{
					this.salesMoney_total[0] = '***';
					// uni.showToast({
					//     title: '您还没有该权限!',
					//     duration: 1000,
					// 	icon:"none",
					// 	position:"bottom"
					// });
				}
				this.$forceUpdate()
			},
			// 商品总数
			async getGoodNumer(){
				let res = await getTotal();
				this.goods_number = res.goods_stock;
			}
			
		},
		onShow() {
			this.keyword ='';
			let dated = this.$date.thisMonth();
			this.init(dated)
			this.getGoodNumer()
			
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
			height: 52%;
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
				height: 75%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				color: #FFFFFF;
				position: relative;
				.bg{
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					margin:auto;
					width: 520rpx;
					height: 520rpx;
					background: url(../../static/image/logo.png) no-repeat center center;
					background-size:100% 100%;
				}
				.cont{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					margin:auto;
				}
				
				.num {
					// display: block;
					padding: 40rpx 0;
					font-size: 36rpx;
				}

				.day {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 180rpx;
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
			height: 48%;
			background-color: #FFFFFF;
			margin-bottom: 2rpx;

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
