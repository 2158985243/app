<template>
	<view class="repertory">
		<view class="text-area">
			<view class="block">
				<view class="box">
					<view class="left" @click="toLibraryHistory">
						<u-icon class="logo" name="order" color="#ffaa00" size="40"></u-icon>
						<text>采购入库</text>
					</view>
					<u-icon name="plus" class='add' @click='toPurchaseStorage' color="#cccccc" size="40"></u-icon>
				</view>
				<view class="box">
					<view class="left" @click="toSalesReturnHistory">
						<u-icon class="logo" name="order" color="#2979ff" size="40"></u-icon>
						<text>采购退货</text>
					</view>
					<u-icon name="plus" class='add' @click='toAddReturn' color="#cccccc" size="40"></u-icon>
				</view>
			</view>

			<view class="block">
				<view class="box">
					<view class="left" @click="toAllocate">
						<u-icon class="logo" name="order" color="#ffe201" size="40"></u-icon>
						<text>库存调拨</text>
					</view>
					<u-icon name="plus" class='add' @click="toAddAllocate" color="#cccccc" size="40"></u-icon>
				</view>
				<view class="box" >
					<view class="left" @click="toStockTaking">
						<u-icon class="logo" name="order" color="#2979ff" size="40"></u-icon>
						<text>库存盘点</text>
					</view>
					<u-icon name="plus" class='add' color="#cccccc" @click="toAddCheck" size="40"></u-icon>
				</view>
			</view>

			<view class="block">
				<view class="box">
					<view class="left" @click="toCommodityManagement">
						<u-icon class="logo" name="bag-fill" color="#2979ff" size="40"></u-icon>
						<text>商品管理</text>
					</view>
					<u-icon name="plus" @click='toAddCommodity' class='add' color="#cccccc" size="40"></u-icon>
				</view>
				<view class="box">
					<view class="left"  @click='toSupplier' >
						<u-icon class="logo"name="account-fill" color="#2979ff" size="40"></u-icon>
						<text>供应商管理</text>
					</view>
					<u-icon name="plus" @click='toAddSupplier'  class='add' color="#cccccc" size="40"></u-icon>
				</view>
			</view>

			<view class="block">
				<view class="box">
					<view class="left" @click="toExpenseBook">
						<u-icon class="logo" name="order" color="#2979ff" size="40"></u-icon>
						<text>支出管理</text>
					</view>
					<u-icon name="plus" class='add' color="#cccccc" @click="toExpense"  size="40"></u-icon>
				</view>
				<view class="box">
					<view class="left">
						<u-icon class="logo" name="order" color="#ff460e" size="40"></u-icon>
						<text>库存查询</text>
					</view>
					<u-icon name="plus" class='add' color="#cccccc"  size="40"></u-icon>
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
			// 增加商品
			toAddCommodity(){
				uni.navigateTo({
					url: `/pages/addCommodity/addCommodity`
				})
			},
			// 商品分类
			toCommodityManagement(){
				uni.navigateTo({
					url: `/pages/commodityManagement/commodityManagement`
				})
			},
			// 供应商管理
			toSupplier(){
				uni.navigateTo({
					url: `/pages/supplier/supplier`
				})
			},
			// 增加供应商
			toAddSupplier(){
				uni.navigateTo({
					url: `/pages/addSupplier/addSupplier`
				})
			},
			// 增加入库单
			toPurchaseStorage(){
				this.$store.commit('commercialSpecification',{
					specificationOfGoods:[]
				})
				this.$store.commit('stateGoodFn',{
					stateGood:false
				})
				uni.navigateTo({
					url: `/pages/purchaseStorage/purchaseStorage`
				})
			},
			// 入库历史
			toLibraryHistory(){
				uni.navigateTo({
					url: `/pages/libraryHistory/libraryHistory`
				})
			},
			// 采购退货
			toSalesReturnHistory(){
				uni.navigateTo({
					url: `/pages/salesReturnHistory/salesReturnHistory`
				})
			},
			// 增加退货单
			toAddReturn(){
				this.$store.commit('commercialSpecification',{
					specificationOfGoods:[]
				})
				this.$store.commit('stateGoodFn',{
					stateGood:false
				})
				uni.navigateTo({
					url: `/pages/addReturn/addReturn`
				})
			},
			// 增加调拨单
			toAddAllocate(){
				this.$store.commit('commercialSpecification',{
					specificationOfGoods:[]
				})
				this.$store.commit('stateGoodFn',{
					stateGood:false
				})
				uni.navigateTo({
					url: `/pages/addAllocate/addAllocate`
				})
			},
			// 调拔
			toAllocate(){
				uni.navigateTo({
					url: `/pages/allocate/allocate`
				})
			},
			// 增加盘点单
			toAddCheck(){
				uni.navigateTo({
					url: `/pages/addCheck/addCheck`
				})
			},
			// 
			toStockTaking(){
				uni.navigateTo({
					url: `/pages/stockTaking/stockTaking`
				})
			},
			// 
			toExpense(){
				uni.navigateTo({
					url: `/pages/expense/expense`
				})
			},
			// 支出管理
			toExpenseBook(){
				uni.navigateTo({
					url: `/pages/expenseBook/expenseBook`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body,
	html,
	body {
		height: 100%;
	}

	.repertory {
		height: 100%;
		background-color: #f2f2f2;

		.block {
			margin-bottom: 10rpx;
		}

		.box {

			margin-bottom: 2rpx;
			display: flex;
			// justify-content: center;
			align-items: center;
			height: 80rpx;

			.left {
				width: 90%;
				height: 80rpx;
				line-height: 80rpx;
				background-color: #FFFFFF;
				margin-right: 2rpx;
			}

			.logo {
				padding: 0 10rpx;
			}

			.add {
				width: 10%;
				height: 80rpx;
				line-height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
			}
		}
	}
</style>
