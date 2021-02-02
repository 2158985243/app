<template>
	<view class="rechargeList">
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
						<text>充值金额</text>
						<text>{{total_recharge_money}}</text>
					</view>
					<view class="nav-money">
						<text>赠送金额</text>
						<text>{{total_reward_money}}</text>
					</view>
					<view class="nav-money">
						<text>笔数</text>
						<text>{{total}}</text>
					</view>

				</view>
			</view>
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list">
					<view class="li" v-for="(item,index) in list" :key="index">
						<view class="li-nav">
							<text>{{item.date}} {{item.week}}</text>
							<text>合计&yen;{{item.money}}</text>
						</view>
						<view class="li-list" v-for="(item_gd,index_gd) in item.list" :key="index_gd" @click="toStoredDetails(item_gd)">
							<view class="left">
								<view class="left-it">
									<text class="item-name">{{item_gd.customer.name}}</text>
									<view class="item-time">
										<text class="lan">{{item_gd.time}}|{{item_gd.account?item_gd.account.name:' '}}</text>
										<!-- <text>x{{item_gd.quantity}}</text> -->
									</view>
								</view>
							</view>
							<view class="right">
								<view class="rg-item">

									<text :class="item_gd.money>0? 'lan':'red'">&yen;{{item_gd.money}}</text>
									<text class="right-name">赠送&yen;{{item_gd.reward_money}}</text>
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
		rechargeList
	} from '../../api/customer.js'
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
					store_id: 0,
					user_id: 0,
					account_id: 0,
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
				keys: 0,
				total_reward_money: 0,
				total_recharge_money: 0,

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

			async init() {
				delete this.form.current
				console.log(this.form);
				let res = await rechargeList({
					...this.form,
					page: this.page,
					page_size: this.page_size
				})
				console.log(res);
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
				this.total = res.total_num;
				this.total_recharge_money = res.total_recharge_money;
				this.total_reward_money = res.total_reward_money;
				this.last_page = res.list.last_page
				this.list.map((v2) => {
					v2.list.map((v) => {
						let arr = [];
						let sales = [];

					})
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
					this.form.start_time = currentdate.start_time;
					this.form.end_time = currentdate.end_time;
					this.init()
				} else if (index == 1) {
					let currentdate = this.$date.yesterday()
					this.form.start_time = currentdate.start_time;
					this.form.end_time = currentdate.end_time;
					this.init()
				} else if (index == 2) {
					let currentdate = this.$date.thisWeek()
					this.form.start_time = currentdate.start_time;
					this.form.end_time = currentdate.end_time;
					this.init()
				} else if (index == 3) {
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
				this.init();
			},
			// 搜索
			showStrore() {
				uni.navigateTo({
					url: `/pages/screen/screen`
				})
			},
			// 详情
			toStoredDetails(item){
				uni.navigateTo({
					url:`/pages/storedDetails/storedDetails?id=${item.id}&title_name=会员充值详情`
				})
			}
		},
		onLoad(query) {
			this.form = query;
			this.name = query.name;
			if (query.keys) {
				this.keys = query.keys
			}
			this.list = []
			this.init();
			uni.$on('screen', res => {
				if (res) {
					console.log(res);
					this.form = res
					this.page = 1;
					this.list = []
					this.init();
				}
			})
		},
		onShow() {

		}
	}
</script>

<style scoped lang="scss">
	.rechargeList {
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
