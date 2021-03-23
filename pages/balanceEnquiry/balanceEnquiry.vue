<template>
	<view class="balanceEnquiry">
		<u-navbar back-icon-color='#ffffff' title="会员余额查询" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="arrow-down-fill" @click="showStrore" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<u-select v-model="show" mode="single-column" @confirm="confirmStrores" :list="strots"></u-select>
		<view class="header">
			<u-search margin=" 0 20rpx" height='60' :show-action="false" shape="square" placeholder="请输入会员卡号/手机号/姓名" v-model="keyword"></u-search>
		</view>
		<view class="mains">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :inBottom="pull" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list" v-for="(item,index) in list" :key="index" @click="cilckItem(item.id)">
					<view class="left">
						<u-image width="80rpx" mode='aspectFit' class="header_image" height="80rpx" :src="$cfg.domain+item.image"></u-image>
						<view class="item-li">
							<text>{{item.name}}</text>
							<text class="bottom">余额：<text class="lan">&yen;{{item.balance}}</text></text>
						</view>
					</view>
					<view class="right">
						<u-icon name="arrow-right"  color="#cccccc"  size="36"></u-icon>
					</view>
				</view>
			</k-scroll-view>
			<u-toast ref="uToast" />
		</view>
		<view class="footer">
			<text>共{{total}}位会员,总余额&yen;{{total_balance}}</text>
			<text>总积分{{total_point}}</text>
		</view>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import store from '@/store';
	import {
		balanceList
	} from '../../api/customer.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				show: false,
				strots: [], //店铺组
				page: 1,
				page_size: 10,
				store_id: 0,
				keyword: '',

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
				list: [],
				last_page: 0,
				pull: false,
				total:0,
				total_point:0,
				total_balance:0,
				
			}
		},
		methods: {
			// 显示店铺列表
			showStrore() {
				this.show = true;
			},
			// 店铺数组
			strored() {
				let arr = store.state.store.storesArr;
				if (arr) {
					arr.map((v) => {
						this.strots.push({
							value: v.store_id,
							label: v.name
						})
					})
				}
			},
			// 初始化
			async init() {
				let res = await balanceList({
					page: this.page,
					page_size: this.page_size,
					store_id: this.store_id
				})
				console.log(res);
				this.list = [];
				this.list.push(...res.data)
				this.last_page = res.last_page
				this.total = res.total
				this.total_balance = res.total_balance
				this.total_point = res.total_point
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
			// 
			cilckItem(id){
				uni.navigateTo({
					url:`/pages/customer/customer?id=${id}`
				})
			}
		},
		onLoad() {
			this.strored();
			if (store.state.store.store_id > 0) {
				this.store_id = store.state.store.store_id;
			};
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.balanceEnquiry {
		width: 100%;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 30rpx;
		}

		.header {
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #2979ff;
			position: fixed;
			z-index: 9999;
			top: calc(var(--status-bar-height) + 80rpx);
		}

		.mains {
			margin: 100rpx 0;
			display: flex;
			flex-direction: column;
			.list{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;
				.left{
					width: 60%;
					display: flex;
					flex-direction: row;
					.item-li{
						padding-left:20rpx;
						width: calc(100% - 100rpx);
						display: flex;
						position: relative;
						flex-direction: column;
						.bottom{
							display: flex;
							flex-direction: row;
							color: #C8C7CC;
							font-size: 20rpx;
							position: absolute;
							bottom: 0;
							.lan{
								color: #007AFF;
							}
						}
					}
				}
			}
		}

		/deep/.u-border-bottom:after {
			border-bottom-width: 0;
		}

		.footer {
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: #2979ff;
			position: fixed;
			bottom: 0;
			font-size: 26rpx;
			color: #FFFFFF;
			z-index: 9999;
			text {
				text-indent: 0.5em;
			}
		}
	}
</style>
