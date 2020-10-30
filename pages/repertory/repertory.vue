<template>
	<view class="repertory">
		<view class="text-area">
			<view class="block">
				<view class="box">
					<view class="left">
						<u-icon class="logo" name="order" color="#ffaa00" size="40"></u-icon>
						<text>采购入库</text>
					</view>
					<u-icon name="plus" class='add' color="#cccccc" size="40"></u-icon>
				</view>
				<view class="box">
					<view class="left">
						<u-icon class="logo" name="order" color="#2979ff" size="40"></u-icon>
						<text>采购退货</text>
					</view>
					<u-icon name="plus" class='add' color="#cccccc" size="40"></u-icon>
				</view>
			</view>

			<view class="block">
				<view class="box">
					<view class="left">
						<u-icon class="logo" name="order" color="#ffe201" size="40"></u-icon>
						<text>库存调拨</text>
					</view>
					<u-icon name="plus" class='add' color="#cccccc" size="40"></u-icon>
				</view>
				<view class="box">
					<view class="left">
						<u-icon class="logo" name="order" color="#2979ff" size="40"></u-icon>
						<text>库存盘点</text>
					</view>
					<u-icon name="plus" class='add' color="#cccccc" size="40"></u-icon>
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
					<view class="left">
						<u-icon class="logo" name="account-fill" color="#2979ff" size="40"></u-icon>
						<text>供应商管理</text>
					</view>
					<u-icon name="plus" class='add' color="#cccccc" size="40"></u-icon>
				</view>
			</view>

			<view class="block">
				<view class="box">
					<view class="left">
						<u-icon class="logo" name="order" color="#2979ff" size="40"></u-icon>
						<text>支出管理</text>
					</view>
					<u-icon name="plus" class='add' color="#cccccc" size="40"></u-icon>
				</view>
				<view class="box">
					<view class="left">
						<u-icon class="logo" name="order" color="#ff460e" size="40"></u-icon>
						<text>库存查询</text>
					</view>
					<u-icon name="plus" class='add' color="#cccccc" size="40"></u-icon>
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
			toAddCommodity(){
				uni.navigateTo({
					url: `/pages/addCommodity/addCommodity`
				})
			},
			toCommodityManagement(){
				uni.navigateTo({
					url: `/pages/commodityManagement/commodityManagement`
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
