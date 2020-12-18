<template>
	<view class="customerLevel">
		<u-navbar back-icon-color='#ffffff' title="会员等级" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="plus" @click="toAddCustomerLevel" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="list">
			<!-- <k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="li" >

				</view>
			</k-scroll-view> -->
			<view class="li" v-for="(item,index) in list" :key="index" @click="toEditCustomer(item)">
				<view class="left">
					<view class="left-li">
						<text>{{item.name}}</text>
						<text class="lan" v-if="item.is_wx">微信会员</text>
					</view>
					<text class="hui">会员折扣{{item.discount}}</text>
				</view>
				<view class="right">
					<u-icon name="arrow-right" color="#595959" class="right_icon" size="28"></u-icon>
				</view>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {
		customerLevelList
	} from '../../api/customerLevel.js'
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--到底了--',
				touchHeight: 50,
				height: 100,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				page: 1,
				page_size: 10,
				list: [],
				last_page: 0,
				style_input: {
					'background-color': '#ffffff'
				}
			}
		},
		methods: {
			// 前往新增会员等级
			async toAddCustomerLevel() {
				uni.navigateTo({
					url: `/pages/addCustomerLevel/addCustomerLevel`
				})
			},
			// 初始化
			async init() {
				let res = await customerLevelList();
				this.list = res
			},
			// 编辑
			toEditCustomer(item) {
				uni.navigateTo({
					url: '/pages/editCustomer/editCustomer?item='+ encodeURIComponent(JSON.stringify(item))

				})
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.customerLevel {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f7f7f7;

		.right_icon {
			margin-right: 30rpx;
		}

		.list {
			width: 100%;
			display: flex;
			flex-direction: column;

			.li {
				width: 100%;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #F5F5F5;
				display: flex;
				justify-content: space-between;
				padding: 20rpx;

				.left {
					display: flex;
					flex-direction: column;

					.left-li {
						display: flex;
						flex-direction: row;
						padding-bottom: 10rpx;

						.lan {
							margin-left: 20rpx;
							padding: 4rpx;
							background-color: #007AFF;
							border-radius: 6rpx;
							font-size: 20rpx;
							color: #FFFFFF;
						}
					}

					.hui {
						color: #C0C0C0;
					}
				}

				.right {
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>
