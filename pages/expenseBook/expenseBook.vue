<template>
	<view class="expenseBook">
		<u-navbar back-icon-color='#ffffff' title="支出管理" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="search" @click="toAddShopInformation" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="mains">
			<!-- <k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore"> -->
			<view class="list" v-for="(item,index) in list" :key="index">
				<view class="headers">
					<view class="li-date">
						{{item.month}}
					</view>
					<view class="statistics">
						<view class="left">
							<text>支出笔数{{item.number}}</text>
							<text>支出金额&yen;{{item.money}}</text>
						</view>
						<view class="right" @click="toStatics(item.month)">
							<text>统计</text>
							<u-icon name="arrow-right" color="#000" size="28"></u-icon>
						</view>
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
		<view class="footers" @click="toadd">
			<u-icon name="plus-circle-fill" color="#ffffff" size="36"></u-icon>
			<text>
				记一笔
			</text>

		</view>
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
				res.data.map(v => {
					v['number'] = v.data.length;
					v['money'] = 0;
					v.data.map(v1 => {
						v.money += Number(v1.money)
					})
					v.money = v.money.toFixed(2)
				})
				if (this.list.length > 0) {
					res.data.map((v1, i1) => {
						this.list.map((v, i) => {
							// console.log(v, v1);
							if (v.month == v1.month) {
								console.log(v1.month);
								v.data.push(...v1.data)
								v.money = (Number(v.money) + Number(v1.money)).toFixed(2)
							} else {
								console.log(v1.month);
								this.list.push(v1)
							}
						})
					})
				} else {
					this.list.push(...res.data)

				}
				this.last_page = res.last_page
				console.log(res, this.list);
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.list = []
				this.page = 1;
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
				this.page++;
				this.init()
				console.log('触底加载更多');

			},
			// add
			toadd() {
				uni.navigateTo({
					url: `/pages/expense/expense`
				})
			},
			// 统计
			toStatics(mouth) {
				let now = new Date(); //当前日期
				let arr = mouth.split('-')
				let nowYear = Number(arr[0]) //当前年 
				let nowMonth = Number(arr[1]) - 1 //当前月 
				//本月的开始时间
				let monthStartDate = new Date(nowYear, nowMonth, 1);
				//本月的结束时间
				let monthEndDate = new Date(nowYear, nowMonth + 1, 0);
				let timeStar = this.$u.timeFormat(Date.parse(monthStartDate) / 1000, 'yyyy-mm-dd'); //s
				let timeEnd = this.$u.timeFormat(Date.parse(monthEndDate) / 1000, 'yyyy-mm-dd'); //s
				uni.navigateTo({
					url: `/pages/statics/statics?timeStar=${timeStar}&timeEnd=${timeEnd}`
				})
			}

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
					background-color: #f5f5f5;
					display: flex;
					flex-direction: column;

					.statistics {
						display: flex;
						justify-content: space-between;

						.left {
							display: flex;
							color: #666666;

							text {
								padding-right: 20rpx;
							}
						}

						.right {
							color: #666666;

							text {
								padding: 0 20rpx;
							}

							border-left: 4rpx solid #666666;
						}
					}
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

		.footers {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			bottom: 0;
			background-color: #007AFF;
			color: #FFFFFF;
			font-size: 30rpx;
		}
	}
</style>
