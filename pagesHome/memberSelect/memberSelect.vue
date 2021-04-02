<template>
	<view class="memberSelect">
		<view class="member-select">
			<u-navbar back-icon-color='#ffffff' title="会员选择" :background="background" title-color="#ffffff">
				<template slot="right">
					<u-icon name="plus" @click="toAddMember" color="#ffffff" class="right_icon" size="36"></u-icon>
				</template>
			</u-navbar>
		</view>
		<view class="nav">
			<u-search class='search' height='60' margin="20rpx" bg-color="#ffffff" @change="search" :show-action="false" :scan="true"
			 shape="square" placeholder="请输入会员卡号、手机号或姓名" v-model="keyword" @Inventory="handelScan"></u-search>
		</view>
		<view class="list-data">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="li" v-for="(item,index) in list" :key="index" @click="customerOf(item)">
					<view class="left">
						<view class="img">
							<u-image width="100" border-radius='18' height="100" mode='aspectFit' :src="$imgFn(item.image)">
							</u-image>
						</view>
						<view class="name">
							<text>{{item.name}}</text>
							<text class="tob">{{item.mobile}}</text>
						</view>
					</view>

					<view class="right">
						<text>余额：{{item.balance}}</text>
						<text>积分：{{item.point}}</text>

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
		customerList
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
				keyword: '',
				list: [],
				page: 1,
				page_size: 10,
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
				stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				last_page: 0,
				pull: false,
			}
		},
		methods: {
			customerOf(item){
				uni.$emit('memberSelect',item);
				uni.navigateBack()
			},
			// 增加会员
			toAddMember() {
				uni.navigateTo({
					url: `/pagesHome/addMembership/addMembership`
				})
			},
			search: function(value) {
				this.init({
					keyword: value
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
			},
			// 初始化
			async init(v) {
				let res = await customerList({
					...v,
					page: this.page,
					page_size: this.page_size
				})
				res.data.map((v) => {
					v['checked'] = false,
						v.mobile = v.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
				})
				this.list.push(...res.data)
				this.last_page = res.last_page
				console.log(res);
				// this.total = res.total
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
						if (!this.last) {
							this.last = true
							this.$refs.uToast.show({
								title: '加载到底了',
								type: 'default',
								position: 'bottom'
							})
						}

					} else {
						this.page++;
						this.init()
					}
				}
				stopLoad ? stopLoad() : '';
			},

		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.memberSelect {
		width: 100%;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 30rpx;
		}

		.nav {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 80rpx;
			position: fixed;
			top: calc(84rpx + var(--status-bar-height));
			z-index: 99;
			background-color: #F5F5F5;
		}

		.list-data {
			width: 100%;
			margin-top: 80rpx;
			display: flex;
			flex-direction: column;

			.li {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0 20rpx 20rpx;
				border-bottom: 0.01rem solid #F5F5F5;

				.left {
					display: flex;
					flex-direction: row;

					.img {
						margin-right: 20rpx;
					}

					.name {
						display: flex;
						flex-direction: column;
						position: relative;

						.tob {
							position: absolute;
							bottom: 0;
							color: #C8C7CC;
							font-size: 20rpx;
						}
					}
				}

				.center {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.bg {
						padding: 2rpx 4rpx;
						border: 1rpx solid #DD524D;
						color: #DD524D;
						font-size: 20rpx;
						border-radius: 8rpx;
					}
				}

				.right {
					display: flex;
					flex-direction: column;
					// align-items: center;
					color: #cccccc;
					padding-right:20rpx ;
					// justify-content: center;
					font-size: 20rpx;

					.checked {
						margin-left: 20rpx;
					}

					.date {
						display: flex;
						flex-direction: column;

						.t1 {
							font-size: 20rpx;
							color: #C8C7CC;
							text-align: right;
						}

						.t2 {}
					}
				}
			}
		}
	}
</style>
