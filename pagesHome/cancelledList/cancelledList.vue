<template>
	<view class="cancelledList">
		<text class="title">挂单数据只保留30天，请及时处理</text>
		<view class="box">

			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list" v-for="(item,index) in list" :key='index' @click="clickItem(item)">
					<view class="left">
						<text class="max">{{item.trade_no}}</text>
						<text class="hei">{{item.goods_name}}</text>
						<text class="hei">{{item.updated_at}}</text>
					</view>
					<view class="right">
						<text>{{item.customer|name}}</text>
					</view>
				</view>
			</k-scroll-view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		unsalesList
	} from '../../api/salesOrder.js'
	export default {
		data() {
			return {
				page: 1,
				page_size: 10,
				list: [],
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--到底了--',
				touchHeight: 50,
				height: 100,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true,
				list: [],
				last_page: 0,
				pull: false,
				total: 0,
			}
		},
		filters: {
			name(v) {
				let customer_name = '散客'
				if (v) {
					customer_name = v.name
				}
				return customer_name;
			}
		},
		methods: {
			// 初始化
			async init() {
				let res = await unsalesList({
					page: this.page,
					page_size: this.page_size,
				})
				this.list = [];
				this.list.push(...res.data)
				this.last_page = res.last_page
				this.total = res.total
				this.list.map((v) => {
					let arr = []
					v.sales_goods.map((v1) => {
						arr.push(`${v1.goods_name}x${v1.quantity}`)
					})
					v['goods_name'] = arr.join(',')
				})
			},
			// 点击某个挂单
			clickItem(item) {
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: []
				})
				uni.navigateTo({
					url: `/pages/editSettleAccounts/editSettleAccounts?id=${item.id}`
				})
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
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.cancelledList {
		width: 100%;
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #F5F5F5;

		.title {
			padding: 20rpx;
		}
		.box{
			width: 100%;
			display: flex;
			flex-direction: column;
		}
		.list {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			// align-items: center;
			background-color: #FFFFFF;
			border-bottom: 0.01rem solid #F1F1F1;
			padding: 20rpx;

			.left {
				display: flex;
				flex-direction: column;

				.max {
					color: #000000;
					padding-bottom: 10rpx;
				}

				.hei {
					color: #cccccc;
					font-size: 22rpx;
					padding-bottom: 10rpx;
				}
			}

			.right {
				width: 120rpx;
				display: flex;
				flex-direction: column;
				// justify-content: center;
				// align-items: center;
				color: #000000;
				font-size: 30rpx;
				text{
					text-align: right;
				}
			}
		}
	}
</style>
