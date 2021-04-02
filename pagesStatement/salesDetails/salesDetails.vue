<template>
	<view class="salesDetails">
		<u-navbar back-icon-color='#ffffff' :title="title_name" :background="background" title-color="#ffffff">
		</u-navbar>
		<view class="mains">
			<view class="dates">
				{{start_time}}至{{end_time}}
			</view>
			<view class="li-data">
				<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
				 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
				 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
					<view class="li-nav">
						<view class="nav-item">
							<text>{{total.total_counts}}</text>
							<text>笔数</text>
						</view>
						<view class="nav-item">
							<text>{{total.total_quantity}}</text>
							<text>数量</text>
						</view>
						<view class="nav-item">
							<text>{{total.total_counts>0? total.purchase_price:0}}</text>
							<text>进价</text>
						</view>
						<view class="nav-item">
							<text>{{total.sale_price}}</text>
							<text>售价</text>
						</view>
						<view class="nav-item">
							<text>{{total.total_money}}</text>
							<text>金额</text>
						</view>
						<view class="nav-item">
							<text>{{total.total_counts>0?(Number(total.purchase_price)-Number(total.sale_price)).toFixed(2):0}}</text>
							<text>毛利</text>
						</view>
					</view>

					<view class="list" v-for="(item,index) in list" :key="index" @click="toHaveToReturn(item)">
						<view class="left">
							<text>单号：<text class='gray'>{{item.trade_no}}</text></text>
							<text class="min-size">单价数量：<text class='gray'>&yen;{{item.price}}*{{item.quantity}}</text></text>
							<text class="min-size">{{item.updated_at}}</text>
						</view>
						<view class="right">
							<view class="rg-data">
								<text class="min-size">毛利：&yen;{{((Number(item.price)-Number(item.purchase_price))*Number(item.quantity)).toFixed(2)}}</text>
								<text class="min-size">金额：&yen;{{(Number(item.price)*Number(item.quantity)).toFixed(2)}}</text>
							</view>
							<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
						</view>
					</view>
				</k-scroll-view>
				<u-toast ref="uToast" />
			</view>
		</view>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		countDetails
	} from '../../api/salesOrder.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				page: 1,
				page_size: 10,
				goods_id: 0,
				staff_id: 0,
				start_time: '',
				end_time: '',
				title_name: '',
				list: [],
				out_number: 0,
				in_number: 0,
				price: 0,
				money: 0,

				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--到底了--',
				touchHeight: 50,
				height: 0,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true,
				last_page: 0,
				pull: false,
				store_ids: [],
				total: {}
			}
		},
		methods: {
			async init() {
				let obj = {
					store_ids: this.store_ids,
					goods_id: this.goods_id,
					staff_id: this.staff_id,
					start_time: this.start_time,
					end_time: this.end_time,
					page: this.page,
					page_size: this.page_size
				}
				if (obj.staff_id == 0) {
					delete obj.staff_id
				}
				let res = await countDetails(obj)
				this.list.push(...res.list.data);
				this.total = res.total;
				this.last_page = res.list.last_page
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
			// 前往编辑采购退货
			toHaveToReturn(item) {
				uni.navigateTo({
					url: `/pagesHome/salesOrderDetails/salesOrderDetails?id=${item.id}`
				})
			},
		},
		onLoad(query) {
			this.goods_id = query.goods_id;
			this.staff_id = query.staff_id;
			this.start_time = query.start_time;
			this.end_time = query.end_time;
			this.title_name = query.title_name;
			if (query.store_ids) {
				this.store_ids = query.store_ids.split(',');
			}
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.salesDetails {
		width: 100%;
		display: flex;
		flex-direction: column;

		/deep/.u-border-bottom:after {
			border-bottom-width: 0rpx;
		}

		.mains {
			width: 100%;
			display: flex;
			flex-direction: column;

			.dates {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				background-color: #2979ff;
				font-size: 24rpx;
			}

			.li-data {
				width: 100%;
				display: flex;
				flex-direction: column;

				.li-nav {
					width: 100%;
					display: flex;
					flex-direction: row;
					padding: 20rpx;
					background-color: #2979ff;

					.nav-item {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						color: #FFFFFF;
					}
				}

				.list {
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					padding: 20rpx 20rpx 0 20rpx;
					background-color: #FFFFFF;
					border-bottom: 0.01rem solid #F1F1F1;

					.left {
						width: 60%;
						display: flex;
						flex-direction: column;

						text {
							color: #666666;
							padding-bottom: 20rpx;
						}

						.gray {
							color: #000000;
						}

					}

					.right {
						width: 40%;
						display: flex;
						flex-direction: row;
						color: #666666;
						justify-content: space-between;

						.rg-data {
							display: flex;
							flex-direction: column-reverse;

							text {
								padding-bottom: 20rpx;
							}
						}
					}
				}

				.min-size {
					font-size: 20rpx;
				}
			}
		}
	}
</style>
