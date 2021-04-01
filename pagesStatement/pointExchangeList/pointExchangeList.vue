<template>
	<view class="pointExchangeList">
		<view class="mains">

			<view class="nav">
				<view class="nav-date" @click="selectTime">
					<view class="date">
						<text>{{start_time}}</text>
						<text>{{end_time}}</text>
					</view>
					<u-icon name="arrow-down-fill" class="" color="#ffffff" size="34"></u-icon>
					<view class="down-fill-right">
					</view>
				</view>
				<view class="nav-money">
					<text>积分合计</text>
					<text>{{sumMoney}}</text>
				</view>
				<view class="nav-money">
					<text>笔数</text>
					<text>{{total}}</text>
				</view>
			</view>
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :inBottom="pull" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list">
					<view class="li" v-for="(item,index) in list" :key="index">
						<view class="li-nav">
							<text>{{item.date}}</text>
							<text>合计:{{item.point}}积分</text>
						</view>
						<view class="li-list" v-for="(item_gd,index_gd) in item.list" :key="index_gd" @click="toStoredDetails(item_gd)">
							<view class="left">
								<view class="left-it">
									<text class="item-name">{{item_gd.customer.name}}</text>
									<view class="item-time">
										<text class="lan">{{item_gd.time}}</text>
										<!-- <text>x{{item_gd.quantity}}</text> -->
									</view>
								</view>
							</view>
							<view class="right">
								<view class="rg-item">
				
									<text :class="item_gd.money>0? 'lan':'red'">{{item_gd.point}}积分</text>
									<text class="right-name">{{item_gd.goods_name}}x{{item_gd.quantity}}</text>
								</view>
								<u-icon name="arrow-right"color="#cccccc"  size="30"></u-icon>
							</view>
						</view>
						<!-- <view class="left">
									<text>{{item.expend_item.name}}</text>
									<view class="li-date">
										{{item.time}} | {{item.account.name}}
									</view>
								</view>
								<view class="right">
									<text class="fonts">{{item.money}}</text>
									<u-icon name="arrow-right" color="#ccc" size="34"></u-icon>
								</view> -->
					</view>
				</view>
				<!-- 数据列表 -->
			</k-scroll-view>
			<u-toast ref="uToast" />
			<view class="dates-time" v-if="show_time">
				<view class="time-list" v-for="(item,index) in dates" :key="index" @click="clickDate(index)" :class="index == active? 'active':''">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 开始时间 -->
		<u-picker mode="time" v-model="showtime" @confirm="confirmTime" title="开始时间" :params="params"></u-picker>
		<!-- 结束时间 -->
		<u-picker mode="time" v-model="showtime1" @confirm="confirmTime1" title="结束时间" :params="params"></u-picker>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		pointExchangeList
	} from '../../api/customer.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				showtime: false,
				showtime1: false,
				store_id: 0,
				expend_item_id: 0,
				name: '',
				start_time: '',
				end_time: '',
				page: 1,
				page_size: 10,
				list: [],
				sumMoney: 0,
				total: 0,
				show_time: false,
				dates: ['今天', '昨天', '本周', '本月', '其他'],
				active: 4,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
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
				style_input: {
					'background-color': '#ffffff'
				},
				last_page: 0,
				pull:false
			}
		},
		methods: {
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
				if(!this.pull){
					
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

			async init() {
				let res = await pointExchangeList({
					store_id: this.store_id,
					start_time: this.start_time,
					end_time: this.end_time,
					page: this.page,
					page_size: this.page_size
				})
				this.total = res.total_num;
				this.sumMoney = res.total_point
				if (this.list.length > 0) {
					res.list.data.map((v) => {
						if (this.list[this.list.length - 1].business_time == v.business_time) {
							this.list[this.list.length - 1].list.push(...v.list)
						} else {
							this.list.push(v)
						}
					})
				} else {
					this.list.push(...res.list.data);
				}
				this.last_page = res.list.last_page
				this.list.map((v2) => {
					v2.list.map((v) => {
						v['quantity'] = 0
						v['goods_name'] = ''
						let arr = [];
						v.goods.map(v1=>{
							arr.push(v1.goods.name)
							v.quantity += Number(v1.quantity)
						})
						v.goods_name = arr.join(',')
						
					})
				})
			},

			// 前往项目详情
			expenseCancellation(item) {

				uni.navigateTo({
					url: `/pages/expenseCancellation/expenseCancellation?id=${item.id}`
				})
			},
			toStoredDetails(item){
				uni.navigateTo({
					url: `/pages/pointDetails/pointDetails?id=${item.id}`
				})
				
			},
			// 选择时间
			selectTime() {
				this.show_time = !this.show_time
			},
			// 点击某一个时间段
			async clickDate(index) {
				this.active = index;
				this.list = []
				this.page = 1;
				this.page_size = 10;

				if (index == 0) {
					let currentdate = this.$date.today()
					this.start_time = currentdate.start_time;
					this.end_time = currentdate.end_time;
					this.init()
				} else if (index == 1) {
					let currentdate = this.$date.yesterday()
					this.start_time = currentdate.start_time;
					this.end_time = currentdate.end_time;
					this.init()
				} else if (index == 2) {
					let currentdate = this.$date.thisWeek()
					this.start_time = currentdate.start_time;
					this.end_time = currentdate.end_time;
					this.init()
				} else if (index == 3) {
					let currentdate = this.$date.thisMonth()
					this.start_time = currentdate.start_time;
					this.end_time = currentdate.end_time;
					this.init()
				} else if (index == 4) {
					this.showtime = true;
				}

				this.show_time = false;
			},
			/// 开始时间
			confirmTime(v) {
				this.start_time = `${v.year}-${v.month}-${v.day}`;
				this.showtime1 = true;
			},
			// 结束时间
			async confirmTime1(v) {
				this.end_time = `${v.year}-${v.month}-${v.day}`;
				this.init();
			},
		},
		onLoad(query) {
			this.store_id = query.store_id;
			this.start_time = query.start_time;
			this.end_time = query.end_time;
		},
		onShow() {
			this.list = []
			this.init();
		}
	}
</script>

<style scoped lang="scss">
	.pointExchangeList {
		width: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;

		/deep/.u-border-bottom:after {
			border: none;
		}

		.active {
			color: #007AFF;
		}

		//日期选择
		.dates-time {
			width: 100%;
			height: calc(100% - var(--status-bar-height));
			background-color: rgba($color: #000000, $alpha: 0.3);
			position: absolute;
			top: 140rpx;
			display: flex;
			flex-direction: row;

			.time-list {
				flex: 1;
				display: flex;
				height: 60rpx;
				background-color: #FFFFFF;
				justify-content: center;
				align-items: center;
			}
		}

		// 
		.nav {
			width: 100%;
			height: 140rpx;
			display: flex;
			flex-direction: row;
			background-color: #2979ff;
			color: #FFFFFF;



			.nav-date {
				flex: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				.down-fill-right {
					width: 2rpx;
					height: 50%;
					background-color: #FFFFFF;
					display: flex;
					margin-left: 20rpx;
				}

				.date {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

				}
			}

			.nav-money {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}

		.list {
			width: 100%;
			display: flex;
			flex-direction: column;
		
			.li {
				width: 100%;
				display: flex;
				flex-direction: column;
				background-color: #FFFFFF;
		
				.li-nav {
					width: 100%;
					display: flex;
					justify-content: space-between;
					padding: 10rpx;
					background-color: #E6E4E5;
				}
		
				.li-list {
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					border-bottom: 0.01rem solid #E5E5E5;
					padding: 20rpx;
					background-color: #FFFFFF;
		
					.left {
						display: flex;
						flex-direction: row;
		
						.left-it {
							display: flex;
							flex-direction: column;
							padding-left: 10rpx;
		
							.item-name {
								padding-bottom: 20rpx;
								// font-weight: 600;
								color: #151515;
							}
		
							.item-time {
								display: flex;
								flex-direction: row;
		
								.lan {
									background-color: #007AFF;
									color: #FFFFFF;
									font-size: 20rpx;
									border-radius: 10rpx;
									padding: 5rpx;
									margin-right: 10rpx;
								}
							}
						}
					}
		
					.right {
						display: flex;
						flex-direction: row;
		
						.rg-item {
							display: flex;
							flex-direction: column;
							position: relative;
						}
		
						text {
							text-align: right;
						}
		
						.lan {
							color: #007AFF;
		
						}
		
						.red {
							color: #FF5A5F;
						}
		
						.right-name {
							position: absolute;
							bottom: 0;
							right: 0;
							width: 200rpx;
							font-size: 20rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
		
			}
		}
	}
</style>
