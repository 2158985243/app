<template>
	<view class="expenseBook">
		<u-navbar back-icon-color='#ffffff' title="支出管理" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="search" @click="toProjectQuery" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="mains">
			<!-- <k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore"> -->
			<view class="list" v-for="(item,key,index) of list" :key="index">
				<view class="headers">
					<view class="li-date" @click="showDate">
						<text>{{key}}</text>
						<u-icon name="arrow-down" color="#000" size="28"></u-icon>
					</view>
					<view class="statistics">
						<view class="left">
							<text>支出笔数{{item.length}}</text>
							<text>支出金额&yen;{{item|sumMoney}}</text>
						</view>
						<view class="right" @click="toStatics(key)">
							<text>统计</text>
							<u-icon name="arrow-right" color="#000" size="28"></u-icon>
						</view>
					</view>
				</view>
				<view class="list-li" v-for="(item_li,index_li) in item" :key="index_li" @click="toSpendItem(item_li)">
					<view class="expend-item">
						<view class="boo">
							<text>{{item_li.expend_item.name}}</text>
							<view class="discard" v-if="item_li.status==0">
								已作废
							</view>
						</view>
						<text class="red-money">{{item_li.money}}</text>
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
		<u-picker mode="time" v-model="showtime" @confirm="confirmTime" :params="params"></u-picker>
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
				list: {},
				last_page: 0,
				style_input: {
					'background-color': '#ffffff'
				},
				showtime: false,
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				load: false,
				start_timeL: '',
			}
		},
		filters: {
			sumMoney(item) {
				let val = 0;
				item.map((v) => {
					val += Number(v.money)
				})
				return val.toFixed(2)
			},

		},
		methods: {
			async init(v) {
				let res = await expendLogList({
					page: this.page,
					page_size: this.page_size,
					...v
				});
				for (let key in res.data) {
					if (this.list[key]) {
						this.list[key].push(...res.data[key])
					} else {
						this.list[key] = res.data[key]
					}
				}
				this.last_page = res.last_page
				this.$forceUpdate()
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.list = {}
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
				if (!this.load) {
					this.page++;
					this.init()
					// console.log('触底加载更多1');
				} else {
					this.page++;
					this.init({
						date: this.start_time
					})
					// console.log('触底加载更多2');
				}

			},
			// add
			toadd() {
				uni.navigateTo({
					url: `/pages/expense/expense`
				})
			},
			// 详情
			toSpendItem(item) {
				uni.navigateTo({
					url: `/pages/spendItem/spendItem?id=${item.id}`
				})
			},
			// 查询
			toProjectQuery() {
				uni.navigateTo({
					url: `/pages/projectQuery/projectQuery`
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
					url: `/pages/statics/statics?start_time=${timeStar}&end_time=${timeEnd}&current=${4}`
				})
			},
			// 选择日期
			showDate() {
				this.showtime = true
			},
			// 选择的时间
			confirmTime(v) {
				this.start_time = `${v.year}-${v.month}`;
				this.list = {};
				this.page = 1;
				this.page_size = 20;
				this.load = true;
				this.init({
					date: this.start_time
				})
			},
		},
		onUnload() {
			uni.$off()
		},
		onLoad() {
			uni.$on("projectQuery", (res) => {
				if (res) {
					this.list = {}
					this.page = 1;
					this.page_size = 20;
					this.init(res)
				}
			});
		},
		onShow() {
			this.list = {}
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

					.li-date {
						display: flex;
						flex-direction: row;

						text {
							padding-right: 10rpx;
						}
					}

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

						.boo {
							width: 100%;
							display: flex;
							flex-direction: row;

							.discard {
								margin-left: 20rpx;
								color: #DD524D;
								border: 1rpx solid #DD524D;
								font-size: 20rpx;
								border-radius: 6rpx;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
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

		.red-money {
			color: #DD524D;
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
