<template>
	<view class="commodityManagement">
		<u-navbar back-icon-color='#ffffff' title="商品管理" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen" @click="toAddCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
				<u-icon name="plus" @click="toAddCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="nav">
			<view class="slot-wrap">
				<u-search class='search' height='60' @change="search" margin='0 30rpx' :show-action="false" :focus='true' :scan="true"
				 shape="square" placeholder="请输入货号/商品名称/条码" v-model="keyword" @Inventory="handelScan"></u-search>
				<view class="search_add">
					<text>筛选</text>
					<u-icon name="arrow-down-fill" color="#ffffff" class="right_icon" size="28"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				keyword: ''
			}
		},
		methods: {
			toAddCommodity() {
				uni.navigateTo({
					url: `/pages/addCommodity/addCommodity`
				})
			},
			handelScan: function() {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						// console.log('条码内容：' + res.result);
						this.keyword = res.result;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.commodityManagement {
		width: 100%;
		height: 100%;
		background-color: #e3e3e3;
		overflow: hidden;

		.right_icon {
			margin-right: 20rpx;
		}

		/deep/.u-border-bottom:after {
			border-bottom-width: 0rpx;
		}

		.nav {
			width: 100%;
			background-color: rgb(41, 121, 255);
			height: 80rpx;

			.slot-wrap {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;

				.search_add {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FFFFFF;
					width: 15%;
				}
			}
		}
	}
</style>
