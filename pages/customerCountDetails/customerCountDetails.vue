<template>
	<view class="customerCountDetails">
		<view class="box">
			<view class="title">
				<text>会员共{{total}}人</text>
				<text class="date">{{date}}</text>
			</view>
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="li-data" v-for="(item,index) in list" @click="toCustomer(item)">
					<view class="left">
						<u-image width="100" border-radius='18' height="100" mode='aspectFit' :src="$cfg.domain+item.image">
						</u-image>
						<view class="li-name">
							<text>{{item.name}}</text>
							<text class="tot">{{item.mobile}}</text>
						</view>
					</view>
					<view class="right">
						<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
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
		countDetails
	} from '../../api/customer.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				list: [],
				page: 1,
				page_size: 10,
				date: '',
				total: 0,
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
				store_id:0
			}
		},
		methods: {
			async init(store_id, date) {
				let res = await countDetails({
					store_id: store_id,
					date: date,
					page: this.page,
					page_size: this.page_size
				})
				console.log(res);
				this.list.push(...res.data);
				this.total = res.total;
				this.last_page = res.last_page
			},
			toCustomer(item) {
				uni.navigateTo({
					url: `/pages/customer/customer?id=${item.id}`
				})
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = []
				this.init( this.store_id,this.date)
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if (this.page >= this.last_page) {
					if (!this.pull) {
						this.$refs.uToast.show({
							title: '加载到底了',
							type: 'default',
							position: 'bottom'
						})
						this.pull = true
					}
			
				} else {
					this.page++;
					this.init(this.store_id,this.date)
				}
			},
		},
		onLoad(query) {
			this.date = query.date;
			this.store_id = query.store_id;
			this.init(query.store_id, query.date);
		}
	}
</script>

<style scoped lang="scss">
	.customerCountDetails {
		width: 100%;
		display: flex;
		flex-direction: column;

		.box {
			position: relative;
			width: 100%;
			display: flex;
			flex-direction: column;

			.title {
				color: #FFFFFF;
				display: flex;
				flex-direction: column;
				background-color: #2979ff;
				padding: 20rpx;
				position: sticky;
				top: 0;
				z-index: 99;

				.date {
					font-size: 20rpx;
					padding-top: 10rpx;
				}
			}

			.li-data {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx;
				border-bottom: 0.01rem solid #F1F1F1;

				.left {
					display: flex;
					flex-direction: row;
					font-size: 20rpx;
					position: relative;

					.li-name {
						display: flex;
						flex-direction: column;
						margin-left: 20rpx;

						.tot {
							position: absolute;
							bottom: 0;
						}
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
