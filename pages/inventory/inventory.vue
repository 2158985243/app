<template>
	<view class="inventory">
		<!-- <view class="status_bar">
		</view> -->
		<u-navbar back-icon-color='#ffffff' :background="background">
			<view class="slot-wrap">
				<u-search class='search' height='60' @change="search" :show-action="false" :focus='true' :scan="true" shape="square" placeholder="请输入款号或条码快速检索库存"
				 v-model="keyword" @Inventory="handelScan"></u-search>
			</view>
			<template slot="right">
				<u-icon name="arrow-down-fill" @click="showStrore" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
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
		onLoad(option) {
			// console.log(option)
			this.keyword = option.val; 
		},
		methods: {
			search: function(value) {
				console.log(value)
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
	.inventory {
		width: 100%;
		display: flex;
		flex-direction: column;
		.right_icon{
			margin-right: 30rpx;
		}
		.slot-wrap {
			display: flex;
			align-items: center;
			width: 90%;

			.search {}
			
			/* 如果您想让slot内容占满整个导航栏的宽度 */
			/* flex: 1; */
			/* 如果您想让slot内容与导航栏左右有空隙 */
			/* padding: 0 30rpx; */
		}
	}
</style>
