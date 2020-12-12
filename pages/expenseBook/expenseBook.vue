<template>
	<view class="expenseBook">
		<u-navbar back-icon-color='#ffffff' title="支出管理" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="search" @click="toAddShopInformation" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="mains" @touchstart="touchstart">
			<!-- <k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore"> -->
			<view class="list" v-for="(item,index) in list" :key="index">
				<view class="headers">
					<view class="li-date">
						{{item.mouth}}
					</view>
				</view>
				<view class="list-li" v-for="(item_li,index_li) in item.data" :key="index_li">
					<view class="expend-item">
						<text>{{item_li.expend_item.name}}</text>
						<text>{{item_li.money}}</text>
					</view>
					<view class="remark">
						{{item_li.remarks}}
					</view>
					<view class="time">
						<text>{{item_li.business_time}}</text>
						<text>{{item_li.account.name}}</text>
					</view>
				</view>
			</view>
			<!-- </k-scroll-view> -->
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		expendLogList
	} from '../../api/expendLog.js'
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
				height: 0,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				page: 1,
				page_size: 20,
				list: [],
				last_page: 0,
				style_input: {
					'background-color': '#ffffff'
				}
			}
		},
		methods: {
			async init(v) {
				let res = await expendLogList({
					page: this.page,
					page_size: this.page_size,
					...v
				});
				if (!res.code) {
					this.list.push(...res.data)
					this.last_page = res.last_page
				}
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = []
				this.init()
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if (this.page >= this.last_page) {
					this.$refs.uToast.show({
						title: '加载到底了',
						type: 'default',
						position: 'bottom'
					})

				} else {
					this.page++;
					this.init()
				}
			},
			handleGoTop() {
				this.$refs['k-scroll-view'].goTop();
			},
			getElInfo() {
				this.$u.getRect('.user-avatar').then(res => {
					console.log(res);
				})
			},
			//触底加载更多
			onReachBottom(e) {

				console.log('触底加载更多');

			},
			
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.expenseBook {
		width: 100%;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 20rpx;
		}

		.mains {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 80rpx;

			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				background-color: #FFFFFF;
				position: relative;

				.headers {
					width: 100%;
					padding: 20rpx;
					// top: var(--status-bar-height);
					top: calc(84rpx + var(--status-bar-height));
					position: sticky;
					position: -webkit-sticky;
					background-color: #dedede;
					display: flex;
					justify-content: space-between;
				}

				.list-li {
					width: 100%;
					display: flex;
					flex-direction: column;
					border-bottom: 0.01rem solid #e3e3e3;

					.expend-item {
						width: 100%;
						display: flex;
						padding: 10rpx;
						justify-content: space-between;
					}

					.remark {
						width: 100%;
						padding: 10rpx;
						display: flex;
						justify-content: space-between;
					}

					.time {
						width: 100%;
						padding: 10rpx;
						display: flex;
						justify-content: space-between;
					}
				}
			}
		}
	}
</style>
