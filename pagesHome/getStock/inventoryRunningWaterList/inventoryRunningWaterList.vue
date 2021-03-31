<template>
	<view class="inventoryRunningWaterList">
		<u-navbar back-icon-color='#ffffff' :title="title_name" :background="background" title-color="#ffffff">

		</u-navbar>
		<view class="header-item">
			<u-image width="140rpx" mode='aspectFit' class="header_image" height="140rpx"
				:src="$imgFn(form.goodsof.main_image)"></u-image>
			<view class="right">
				<text class="black">{{form.goodsof.name}} <text class="gray"> {{form.goodsof.number}}</text></text>
				<view class="colors">
					<text class="gray" v-for="(item,index) in form.goodsof.colors">{{item.name}}</text>
				</view>
				<view class="colors">
					<text class="gray" v-for="(item,index) in form.goodsof.sizes">{{item.name}}</text>
				</view>

			</view>
		</view>

		<view class="box">
			<view class="box-nav">
				<view class="nav">
					<text class="gray">期初</text>
					<text class="black">{{nav_list.base||0}}</text>
				</view>
				<view class="nav">
					<text class="gray">采购</text>
					<text class="black">{{nav_list.purchase||0}}</text>
				</view>
				<view class="nav">
					<text class="gray">调拨</text>
					<text class="black">{{nav_list.allocate||0}}</text>
				</view>
				<view class="nav">
					<text class="gray">零售</text>
					<text class="black">{{nav_list.sales||0}}</text>
				</view>
				<view class="nav">
					<text class="gray">盘点</text>
					<text class="black">{{nav_list.check||0}}</text>
				</view>
				<view class="nav">
					<text class="gray">结余</text>
					<text class="black">{{nav_list.stock||0}}</text>
				</view>

			</view>
		</view>
		<view class="list">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
				:loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height"
				:bottom="bottom" :autoPullUp="autoPullUp" :inBottom="pull" :stopPullDown="stopPullDown"
				@onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="box-list" v-for="(item,index) in list" :key='index'>
					<view class="left">
						<text class="black">{{item.type_name}}</text>
						<view class="gray">
							{{item.color.name}} - {{item.size.name}}
						</view>
						<text class="gray">{{item.created_at}}</text>
					</view>
					<view class="right">
						<text class="black">{{item.change_quantity}}</text>
						<text class="gray">剩余数量:{{item.after_quantity}}</text>
					</view>
				</view>
			</k-scroll-view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		getStockLog
	} from '../../../api/goods.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				title_name: '',
				form: {
					goodsof: {},
					obj: {}
				},
				list: [],
				nav_list: {},

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
				style_input: {
					'background-color': '#ffffff'
				},
				last_page: 0,
				pull: false,
				page: 1,
				page_size: 20,
			}
		},
		methods: {
			async init() {
				let res = await getStockLog({
					...this.form.obj,
					page: this.page,
					page_size: this.page_size,
				})
				console.log(res);
				this.nav_list = res.total;
				this.list.push(...res.list.data)
				this.last_page = res.list.last_page
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = []
				this.init()
				this.pull = false
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if (!this.pull) {

					if (this.page >= this.last_page) {
						this.$refs.uToast.show({
							title: '加载到底了',
							type: 'default',
							position: 'bottom'
						})
						this.pull = true
					} else {
						this.page++;
						this.init()
					}
				}
			},
		},
		onLoad(option) {
			let query = JSON.parse(decodeURIComponent(option.item));
			this.form = query
			this.title_name = query.goodsof.store_name
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.inventoryRunningWaterList {
		width: 100%;
		height: 100vh;
		background-color: #EEEEEE;
		display: flex;
		flex-direction: column;

		.header-item {
			width: 100%;
			display: flex;
			flex-direction: row;
			padding: 30rpx 20rpx;
			background-color: #FFFFFF;
			position: fixed;
			z-index: 999;
			top: calc(80rpx + var(--status-bar-height));

			.right {
				display: flex;
				flex-direction: column;
				justify-content: center;
				height: 100%;

				.black {
					color: #000000;

					.gray {
						color: #aaaaaa !important;
						margin-left: 10rpx;
					}
				}

				.gray {
					color: #9f9f9f;
					margin-right: 10rpx;
				}

				.colors {
					margin-top: 10rpx;
					display: flex;
					flex-direction: row;
				}
			}
		}

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #FFFFFF;
			position: fixed;
			z-index: 999;
			top: calc(300rpx + var(--status-bar-height));

			.box-nav {
				width: 100%;
				display: flex;
				flex-direction: row;
				height: 140rpx;
				align-items: center;
				background-color: #FFFFFF;


				.nav {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.gray {
						color: #aaaaaa;
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
					}

					.black {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						color: #000000;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

				}
			}
		}

		.list {
			width: 100%;
			display: flex;
			flex-direction: column;
			height: calc(100vh - 260rpx);
			margin-top: 350rpx;
			background-color: #FFFFFF;
			overflow: hidden;
			overflow-y: scroll;

			.box-list {
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				border-bottom: 0.01rem solid #E5E5E5;

				.left {
					flex: auto;
					display: flex;
					flex-direction: column;

					.black {
						color: #000000;
					}

					.gray {
						margin-top: 6rpx;
						font-size: 24rpx;
						color: #C0C0C0;
					}
				}

				.right {
					flex: auto;
					display: flex;
					flex-direction: column;
					position: relative;
					justify-content: flex-end;

					.black {
						position: absolute;
						top: 0;
						right: 0;
						color: #000000;
					}

					.gray {
						position: absolute;
						right: 0;
						bottom: 0;
						color: #C0C0C0;
					}
				}
			}
		}
	}
</style>
