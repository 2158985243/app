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
				<view class="box" @click="toStockQuantity">
					<view class="left">
						<u-icon class="logo" name="order" color="#ff460e" size="40"></u-icon>
						<text>库存查询</text>
					</view>
					<u-icon name="arrow-right" class='add' color="#cccccc"  size="40"></u-icon>
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
		onLoad() {
			this.$store.commit('referFn', {
				referDate: {}
			})
		},
		methods: {
			// 增加商品
			toAddCommodity(){
				if(this.$store.state.authority.join(",").indexOf('goods_management') != -1){
					this.$store.commit('colorDaAction', {
						colorDa: []
					});
					this.$store.commit('sizerDaAction', {
						sizerDa: []
					});
					uni.navigateTo({
						url: `/pagesRepertory/addCommodity/addCommodity`
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
			// 商品分类
			toCommodityManagement(){
				if(this.$store.state.authority.join(",").indexOf('goods_management') != -1){
					uni.navigateTo({
						url: `/pagesRepertory/commodityManagement/commodityManagement`
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
			// 供应商管理
			toSupplier(){
				if(this.$store.state.authority.join(",").indexOf('supplier_management') != -1){
					uni.navigateTo({
						url: `/pagesRepertory/supplier/supplier`
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
			// 增加供应商
			toAddSupplier(){
				if(this.$store.state.authority.join(",").indexOf('supplier_management') != -1){
					uni.navigateTo({
						url: `/pagesRepertory/addSupplier/addSupplier`
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
			// 增加入库单
			toPurchaseStorage(){
				if(this.$store.state.authority.join(",").indexOf('purchase_storage') != -1){
					this.$store.commit('commercialSpecification',{
						specificationOfGoods:[]
					})
					this.$store.commit('stateGoodFn',{
						stateGood:false
					})
					uni.navigateTo({
						url: `/pagesRepertory/purchaseStorage/purchaseStorage`
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
			// 入库历史
			toLibraryHistory(){
				if(this.$store.state.authority.join(",").indexOf('purchase_storage') != -1){
					let obj = {}
					this.$store.commit('referFn', {
						referDate: obj
					})
					uni.navigateTo({
						url: `/pagesRepertory/libraryHistory/libraryHistory`
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
			// 采购退货
			toSalesReturnHistory(){
				if(this.$store.state.authority.join(",").indexOf('purchase_storage') != -1){
					let obj = {}
					this.$store.commit('referFn', {
						referDate: obj
					})
					uni.navigateTo({
						url: `/pagesRepertory/salesReturnHistory/salesReturnHistory`
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
			// 增加退货单
			toAddReturn(){
				if(this.$store.state.authority.join(",").indexOf('purchase_storage') != -1){
					this.$store.commit('commercialSpecification',{
						specificationOfGoods:[]
					})
					this.$store.commit('stateGoodFn',{
						stateGood:false
					})
					uni.navigateTo({
						url: `/pagesRepertory/addReturn/addReturn`
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
			// 增加调拨单
			toAddAllocate(){
				if(this.$store.state.authority.join(",").indexOf('stock_allocate') != -1){
					this.$store.commit('commercialSpecification',{
						specificationOfGoods:[]
					})
					this.$store.commit('stateGoodFn',{
						stateGood:false
					})
					uni.navigateTo({
						url: `/pagesRepertory/addAllocate/addAllocate`
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
			// 调拔
			toAllocate(){
				if(this.$store.state.authority.join(",").indexOf('stock_allocate') != -1){
					let obj = {}
					this.$store.commit('referFn', {
						referDate: obj
					})
					uni.navigateTo({
						url: `/pagesRepertory/allocate/allocate`
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
			// 增加盘点单
			toAddCheck(){
				if(this.$store.state.authority.join(",").indexOf('stock_check') != -1){
					uni.navigateTo({
						url: `/pagesRepertory/addCheck/addCheck`
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
			// 盘点
			toStockTaking(){
				if(this.$store.state.authority.join(",").indexOf('stock_check') != -1){
					let obj = {}
					this.$store.commit('referFn', {
						referDate: obj
					})
					uni.navigateTo({
						url: `/pagesRepertory/stockTaking/stockTaking`
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
			// 
			toExpense(){
				if(this.$store.state.authority.join(",").indexOf('expend_management') != -1){
					uni.navigateTo({
						url: `/pagesRepertory/expense/expense`
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
			// 支出管理
			toExpenseBook(){
				if(this.$store.state.authority.join(",").indexOf('expend_management') != -1){
					uni.navigateTo({
						url: `/pagesRepertory/expenseBook/expenseBook`
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
			// 库存查询
			toStockQuantity(){
				if(this.$store.state.authority.join(",").indexOf('stock_inquire') != -1){
					uni.navigateTo({
						url: `/pagesHome/stockQuantity/stockQuantity`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
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
