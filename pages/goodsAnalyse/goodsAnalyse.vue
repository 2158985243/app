<template>
	<view class="goodsAnalyse">
		<u-navbar back-icon-color='#ffffff' title="商品分析" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="arrow-down-fill" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<!-- 标题 -->
		<view class="nav">
			<view class="select-left" @click="show = true">
				<text class="select-box">{{sort_name}}</text>
				<u-icon name="arrow-down-fill" color="#cccccc" size="20"></u-icon>
			</view>
			<view class="select-right" @click="sortChanged">
				<text>排序</text>
				<view class="sort">
					<u-icon name="arrow-up-fill" :color="sort_checked==true? '#ffffff':'#cccccc'" size="20"></u-icon>
					<u-icon name="arrow-down-fill" :color="sort_checked==false? '#ffffff':'#cccccc'" size="20"></u-icon>
				</view>
			</view>
		</view>
		<!-- 选择类型 -->
		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" v-for="(item,index) in navs" @tap.stop="navClick(item)">
					<text>{{item.name}}</text>
				</view>
			</view>
		</u-mask>
		<!-- 商品列表 -->
		<view class="goods-list">
			<!-- 商品头部标题 -->
			<view class="nav-header">
				<!-- 时间段 -->
				<view class="time-quantum" v-if="form.type==2||form.type==5||form.type==6||form.type==8">
					<view class="left">
						选择日期
					</view>
					<view class="right">
						<text class="gray" v-for="(item,index) in times" :key="index" @click="timesFn(index)" :class="active==index? 'active':'' ">{{item}}</text>
					</view>
				</view>
				<!-- 天数 -->
				<view class="dates" v-if="form.type==4">
					<view class="left">
						选择日期
					</view>
					<view class="right">
						<text class="gray" v-for="(item,index) in timed" :key="index" @click="timedFn(index)" :class="active==index? 'active':'' ">{{item}}</text>
					</view>
				</view>
				<view class="nav-title">
					<text class="gd" v-if="form.type==8">进货金额</text>
					<text class="gd" v-else>商品</text>
					<view class="tit-data">
						<text v-if="form.type==0||form.type==3">上市天数</text>
						<text v-if="form.type==1">售罄率</text>
						<text v-if="form.type==2">毛利</text>
						<text v-if="form.type==4">滞留天数</text>
						<text v-if="form.type==0||form.type==1||form.type==2||form.type==3||form.type==4">进销存</text>
						<text v-if="form.type==5">销售数量</text>
						<text v-if="form.type==8">进货数量</text>
						<text v-if="form.type==5||form.type==7||form.type==8">库存数量</text>
						<text v-if="form.type==6">销售金额</text>
						<text v-if="form.type==6||form.type==7">库存金额</text>
					</view>
				</view>

			</view>
			<!-- 商品列表 -->
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list" v-if="form.type==8">
					<view class="left">
						<text class="sum">总计:{{total.purchase_money}}</text>
					</view>
					<view class="right">
						<text class="right-day">{{total.purchase}}</text>
						<text class="right-item">{{total.stock}}</text>
					</view>
				</view>
				<view class="list" v-if="form.type==2||form.type==5||form.type==6||form.type==7">
					<view class="left">
						<text class="sum">总计</text>
					</view>
					<view class="right">
						<text class="right-day">{{total.money||total.quantity||total.sales_money}}</text>
						<text class="right-item">{{total.stock||total.stock_money}}</text>
					</view>
				</view>
				<view class="list" v-for="(item,index) in list" :key="index" @click="toDetails(item)">
					<view class="left">
						<u-image width="80rpx" mode='aspectFit' class="header_image" height="80rpx" :src="$cfg.domain+item.main_image"></u-image>
						<view class="left-item">
							<text class="black">{{item.number}}<text class="gray">{{item.name}}</text></text>
							<text class="gy">零售价:&yen;{{item.retail_price}}</text>
							<text class="gy" v-if="form.type==1||form.type==2||form.type==3||form.type==5||form.type==6">实销价:&yen;{{item.real_price}}({{(Number(item.real_price)/Number(item.retail_price)*10).toFixed(2)}}折)</text>
							<text class="gy" v-else>上市天数:{{item.day}}天</text>

						</view>
					</view>
					<view class="right">
						<text class="right-day" v-if="form.type==0||form.type==3">{{item.day}}天</text>
						<text class="right-day" v-if="form.type==4">{{item.no_sales_day}}天</text>
						<text class="right-day" v-if="form.type==1">{{item.percent}}</text>
						<text class="right-day" v-if="form.type==5">{{item.sales}}</text>
						<text class="right-day" v-if="form.type==2">{{item.money}}</text>
						<text class="right-day" v-if="form.type==6">{{item.sales_money}}</text>
						<text class="right-day" v-if="form.type==7">{{item.stock}}</text>
						<text class="right-day" v-if="form.type==8">{{item.quantity}}</text>

						<view class="right-item" v-if="form.type==5||form.type==8">
							{{item.stock}}
						</view>
						<view class="right-item" v-if="form.type==6||form.type==7">
							{{item.stock_money}}
						</view>
						<view class="right-item" v-if="form.type==0||form.type==1||form.type==2||form.type==3||form.type==4">
							<text>进货:{{item.purchase}}</text>
							<text>销售:{{item.sales}}</text>
							<text>库存:{{item.stock}}</text>
						</view>

					</view>
				</view>
			</k-scroll-view>
			<u-toast ref="uToast" />
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
		analyse
	} from '../../api/goods.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				navs: [{
					type: 0,
					name: "最新更新"
				}, {
					type: 1,
					name: "售罄"
				}, {
					type: 2,
					name: "毛利"
				}, {
					type: 3,
					name: "新款追踪"
				}, {
					type: 4,
					name: "滞销排序"
				}, {
					type: 5,
					name: "最好卖(销量)"
				}, {
					type: 6,
					name: "最好卖(金额)"
				}, {
					type: 7,
					name: "库存"
				}, {
					type: 8,
					name: "进货"
				}],
				form: {
					type: 0,
					sort: 1,
					day: '',
					start_time: '',
					end_time: '',
					page: 1,
					page_size: 10,
					options: []
				},
				sort_checked: false,
				show: false,
				sort_name: '最新更新',
				showtime: false,
				showtime1: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},

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
				stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				style_input: {
					'background-color': '#ffffff'
				},
				last_page: 0,
				pull: false,
				total: {},
				active: 0,
				times: ['7天', '15天', '30天', '其他'],
				timed: ['15天', '30天', '60天', '全部'],
			}
		},
		methods: {
			toDetails(item){
				uni.navigateTo({
					url:`/pages/goodsAnalyse/details/details?id=${item.id}`
				})
			},
			// 选择类型
			navClick(item) {
				this.show = false;
				this.sort_name = item.name;
				this.form.type = item.type;
				this.form.page = 1;
				this.active = 0;
				this.pull = false;
				// 需要时间段的类型
				if (this.form.type == 2 || this.form.type == 5 || this.form.type == 6 || this.form.type == 8) {
					let date = this.$date.sevenDays()
					this.form.start_time = date.start_time
					this.form.end_time = date.end_time
				} else {
					this.form.start_time = ''
					this.form.end_time = ''
				};
				// 需要时间点的类型
				if (this.form.type == 4) {
					this.form.day = 15
				} else {
					this.form.day = '';
				}
				this.init()
			},
			// 选择时间段
			timesFn(index) {
				this.active = index
				this.pull = false
				if (index == 0) {
					let date = this.$date.sevenDays()
					this.form.start_time = date.start_time
					this.form.end_time = date.end_time
				} else if (index == 1) {
					let date = this.$date.halfMonth()
					this.form.start_time = date.start_time
					this.form.end_time = date.end_time
				} else if (index == 2) {
					let date = this.$date.thirtyDays()
					this.form.start_time = date.start_time
					this.form.end_time = date.end_time
				} else if (index == 3) {
					this.showtime = true
				};
				this.init()
			},
			// 选择时间点
			timedFn(index) {
				this.active = index;
				this.pull = false
				this.form.page = 1;
				if (index == 0) {
					this.form.day = 15
				} else if (index == 1) {
					this.form.day = 30
				} else if (index == 2) {
					this.form.day = 60
				} else if (index == 3) {
					this.form.day = 0
				}
				this.init()
			},
			// 切换排序顺序
			sortChanged() {
				this.sort_checked = !this.sort_checked;
				if (!this.sort_checked) {
					this.form.sort = 1
				} else {
					this.form.sort = 0
				}
				this.form.page = 1;
				this.init()
			},
			// 初始化
			async init() {
				let res = await analyse(this.form)
				console.log(res);
				if (this.form.page == 1) {
					this.list = []
				}
				this.total = res.total
				if (this.form.type != 4) {

					this.list.push(...res.list.data);
					this.last_page = res.list.last_page
				} else {
					this.list.push(...res.list);
					if (this.list.length == 10) {
						this.last_page = this.form.page + 1
					} else {
						this.last_page = this.form.page
					}
				}
			},

			// 下拉刷新
			handlePullDown(stopLoad) {
				this.form.page = 1;
				this.list = []
				this.pull = false
				this.init()
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if (!this.pull) {
					if (this.form.page >= this.last_page) {
						this.$refs.uToast.show({
							title: '加载到底了',
							type: 'default',
							position: 'bottom'
						})
						this.pull = true
					} else {
						this.form.page++;
						this.init()
					}
				}
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
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.goodsAnalyse {
		width: 100%;
		display: flex;
		flex-direction: column;
		min-height: 100%;

		/deep/.u-border-bottom:after {
			border-bottom-width: 0;
		}

		.right_icon {
			margin-right: 30rpx;
		}

		.warp {
			width: 94%;
			margin: 0 auto;
			background-color: #FFFFFF;
			margin-top: calc(200rpx + var(--status-bar-height));
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			overflow: hidden;

			.rect {
				width: 100%;
				display: flex;
				padding: 20rpx 0;
				justify-content: center;
				align-items: center;
				border-bottom: 0.01rem solid #E5E5E5;
			}
		}

		// 选择部分
		.nav {
			width: 100%;
			height: 120rpx;
			display: flex;
			flex-direction: row;
			background-color: #2979ff;
			justify-content: center;
			align-items: center;
			padding: 20rpx;
			position: fixed;
			top: calc(88rpx + var(--status-bar-height));
			z-index: 99;

			.select-left {
				width: 85%;
				height: 80rpx;
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
				background-color: #FFFFFF;
				padding: 20rpx;
				border-radius: 10rpx;

				.select-box {
					width: 100%;
					text-align: center;
					color: #000000;
				}
			}

			.select-right {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-left: 10rpx;

				text {
					width: 80rpx;
					color: #FFFFFF;
					padding: 0 10rpx;
				}

				.sort {
					display: flex;
					flex-direction: column;
				}
			}
		}

		// 商品列表
		.goods-list {
			width: 100%;
			margin-top: 120rpx;
			position: relative;
			display: flex;
			flex-direction: column;

			.nav-header {
				width: 100%;
				position: sticky;
				top: calc(208rpx + var(--status-bar-height));
				display: flex;
				flex-direction: column;
				z-index: 99;

				.time-quantum {
					width: 100%;
					height: 60rpx;
					display: flex;
					padding: 0 20rpx;
					flex-direction: row;
					justify-content: space-between;
					background-color: #2979ff;
					align-items: center;

					.left {
						color: #e5e5e5;
					}

					.right {
						display: flex;
						flex-direction: row;

						.active {
							color: #FFFFFF !important;
							font-weight: 600;
						}

						.gray {
							padding: 0 10rpx;
							color: #e5e5e5;
						}
					}
				}

				.dates {
					width: 100%;
					height: 60rpx;
					display: flex;
					padding: 0 20rpx;
					flex-direction: row;
					justify-content: space-between;
					background-color: #2979ff;
					align-items: center;

					.left {
						color: #e5e5e5;
					}

					.right {
						display: flex;
						flex-direction: row;

						.gray {
							padding: 0 10rpx;
							color: #e5e5e5;
						}
					}
				}

				.nav-title {
					width: 100%;
					height: 60rpx;
					display: flex;
					padding: 0 20rpx;
					flex-direction: row;
					justify-content: space-between;
					background-color: #F7F6FB;
					align-items: center;
					color: #999999;

					.gd {
						width: 60%;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.tit-data {
						width: 40%;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;

						text {
							flex: 1;
						}
					}
				}

			}

			.list {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;

				.left {
					width: 55%;
					display: flex;
					flex-direction: row;
					align-items: center;

					.sum {
						width: 100%;
						text-align: center;
					}

					.left-item {
						display: flex;
						flex-direction: column;
						width: calc(100% - 100rpx);
						margin-left: 10rpx;

						.black {
							width: 100%;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;

							.gray {
								color: #999999;
							}
						}

						.gy {
							color: #999999;
							font-size: 24rpx;
						}
					}
				}

				.right {
					width: 45%;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					.right-day {
						width: 50%;
						display: flex;
						font-size: 20rpx;
						align-items: center;
						justify-content: center;
						color: #007AFF;
					}

					.right-item {
						width: 50%;
						display: flex;
						font-size: 20rpx;
						flex-direction: column;
						align-items: center;

						text {
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>
