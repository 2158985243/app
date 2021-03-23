<template>
	<view class="salesInquiry">
		<u-navbar back-icon-color='#ffffff' :background="background">
			<view class="slot-wrap">
				<u-search class='search' height='60' @change="search" :show-action="false" :scan="true" shape="square" placeholder="请输入商品信息、会员信息或销售单号"
				 v-model="keyword" @Inventory="handelScan"></u-search>
			</view>
			<template slot="right">
				<u-icon name="arrow-down-fill" @click="showStrore" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<view class="mains">
			<view class="nav">
				<view class="nav-date" @click="selectTime">
					<view class="date">
						<text>{{form.start_time}}</text>
						<text>{{form.end_time}}</text>
					</view>
					<u-icon name="arrow-down-fill" class="" color="#ffffff" size="34"></u-icon>
					<view class="down-fill-right">
					</view>
				</view>
				<view class="nav-item">
					<view class="nav-money">
						<text>销售额</text>
						<text>{{sumMoney}}</text>
					</view>
					<view class="nav-money">
						<text>笔数</text>
						<text>{{total}}</text>
					</view>
					<view class="nav-money">
						<text>数量</text>
						<text>{{total_quantity}}</text>
					</view>
				</view>
			</view>
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :inBottom="pull" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list">
					<view class="li" v-for="(item,index) in list" :key="index">
						<view class="li-nav">
							<text>{{item.business_time}}</text>
							<text>共{{item.counts}}笔，数量{{item.quantity}},金额&yen;{{item.money}}</text>
						</view>
						<view class="li-list" v-for="(item_gd,index_gd) in item.list" :key="index_gd" @click="expenseCancellation(item_gd)">
							<view class="left">
								<view class="left-it">
									<text class="item-name">{{item_gd.name}}</text>
									<view class="item-time">
										<text class="lan">{{item_gd.time}}|{{item_gd.customer?item_gd.customer.name:'散客'}}</text>
										<text>x{{item_gd.quantity}}</text>
									</view>
								</view>
							</view>
							<view class="right">
								<text :class="item_gd.money>0? 'lan':'red'">&yen;{{item_gd.money}}</text>
								<text class="right-name">{{item_gd.sales}}</text>
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
		salesOrderList
	} from '../../api/salesOrder.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {

				keyword: '',
				dates: ['今天', '昨天', '本周', '本月', '其他'],
				showtime: false,
				showtime1: false,
				background: {
					backgroundColor: '#2979ff'
				},
				store_id: 0,
				expend_item_id: 0,
				name: '',

				page: 1,
				page_size: 10,
				list: [],
				sumMoney: 0,
				total: 0,
				total_quantity: 0,
				show_time: false,
				active: 4,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				form: {
					start_time: '',
					end_time: '',
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
				pull: false
			}
		},
		methods: {
			search: function(value) {
				console.log(value)
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

			async init() {
				let res = await salesOrderList({
					...this.form,
					page: this.page,
					page_size: this.page_size
				})
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
				this.list.map((v2) => {
					v2.list.map((v) => {
						let arr = [];
						let sales = [];
						let num = 0;
						v.goods.map((v1) => {
							arr.push(`${v1.goods.name} x${v1.quantity}`)
							num += Number(v1.quantity)
						});
						v.sales_payment.map((v1) => {
							if (v1.account) {
								sales.push(v1.account.name)
							}
						})
						v['name'] = arr.join(',');
						v['sales'] = sales.join(',');
						v['quantity'] = num.toFixed()
					})
				})
				this.total = res.total_amount;
				this.total_quantity = res.total_quantity;
				this.sumMoney = res.total_money
				this.last_page = res.list.last_page
			},
			// 获取当前月份
			monthDate() {
				let currentdate = this.$date.thisMonth()
				this.form.start_time = currentdate.start_time;
				this.form.end_time = currentdate.end_time;
			},
			// 前往项目详情
			expenseCancellation(item) {
				uni.navigateTo({
					url: `/pages/salesOrderDetails/salesOrderDetails?id=${item.id}`
				})
			},
			// 选择时间
			selectTime() {
				this.show_time = !this.show_time
			},
			// 点击某一个时间段
			async clickDate(index) {
				this.active = index;
				this.page = 1;
				this.page_size = 10;

				if (index == 0) {
					let currentdate = this.$date.today()
					this.list = []
					this.page = 1;
					this.pull = false
					this.form.start_time = currentdate.start_time;
					this.form.end_time = currentdate.end_time;
					this.init()
				} else if (index == 1) {
					this.list = []
					this.page = 1;
					this.pull = false
					let currentdate = this.$date.yesterday()
					this.form.start_time = currentdate.start_time;
					this.form.end_time = currentdate.end_time;
					this.init()
				} else if (index == 2) {
					this.list = []
					this.page = 1;
					this.pull = false
					let currentdate = this.$date.thisWeek()
					this.form.start_time = currentdate.start_time;
					this.form.end_time = currentdate.end_time;
					this.init()
				} else if (index == 3) {
					this.list = []
					this.page = 1;
					this.pull = false
					let currentdate = this.$date.thisMonth()
					this.form.start_time = currentdate.start_time;
					this.form.end_time = currentdate.end_time;
					this.init()
				} else if (index == 4) {
					this.showtime = true;
				}

				this.show_time = false;
			},
			/// 开始时间
			confirmTime(v) {
				this.form.start_time = `${v.year}-${v.month}-${v.day}`;
				this.showtime1 = true;
			},
			// 结束时间
			async confirmTime1(v) {
				this.form.end_time = `${v.year}-${v.month}-${v.day}`;
				this.list = []
				this.page = 1;
				this.pull = false
				this.init();
			},
			// 搜索
			showStrore() {
				uni.navigateTo({
					url: `/pages/screen/screen`
				})
			}
		},
		onLoad(query) {
			this.monthDate();
			this.store_id = query.store_id;
			this.expend_item_id = query.expend_item_id;
			this.name = query.name;
			this.list = []
			this.page = 1;
			this.pull = false
			this.init();
			uni.$on('screened', res => {
				if (res) {
					if(res.start_time == ""|| res.start_time == undefined){
						delete res.start_time
						delete res.end_time
						for(let key in res){
							this.form[key] = res[key]
						}
					}else{
						this.form = res
					}
					this.page = 1;
					this.list = []
					this.pull = false
					this.init();
				}
			})
		},
		onUnload() {
			uni.$off('screened')
		},
		onShow() {
			
		}
	}
</script>

<style scoped lang="scss">
	.salesInquiry {
		width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		min-height: 100%;

		.right_icon {
			margin-right: 30rpx;
		}

		.slot-wrap {
			display: flex;
			align-items: center;
			width: 95%;

			.search {}

			/* 如果您想让slot内容占满整个导航栏的宽度 */
			/* flex: 1; */
			/* 如果您想让slot内容与导航栏左右有空隙 */
			/* padding: 0 30rpx; */
		}

		/deep/.u-border-bottom:after {
			border: none;
		}

		.active {
			color: #007AFF;
		}

		//日期选择
		.dates-time {
			width: 100%;
			height: calc(100% - 200rpx - var(--status-bar-height));
			background-color: rgba($color: #000000, $alpha: 0.3);
			position: absolute;
			top: calc(230rpx + var(--status-bar-height));
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
				width: 240rpx;
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

			.nav-item {
				width: calc(100% - 260rpx);
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				.nav-money {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
				}
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
						flex-direction: column;
						position: relative;

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
							font-size: 22rpx;
						}
					}
				}

			}
		}
	}
</style>
