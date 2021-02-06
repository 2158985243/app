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
						<text class="gray">7天</text>
						<text class="gray">15天</text>
						<text class="gray">30天</text>
						<text class="gray">其他</text>
					</view>
				</view>
				<!-- 天数 -->
				<view class="dates" v-if="form.type==4">
					<view class="left">
						选择日期
					</view>
					<view class="right">
						<text class="gray">15天</text>
						<text class="gray">30天</text>
						<text class="gray">60天</text>
						<text class="gray">全部</text>
					</view>
				</view>
				<view class="nav-title">
					<text class="gd">商品</text>
					<view class="tit-data">
						<text v-if="form.type==0">上市天数</text>
						<text v-if="form.type==1">售罄率</text>
						<text>进销存</text>
					</view>
				</view>
			</view>
			<!-- 商品列表 -->
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list" v-for="(item,index) in list" :key="index">
					<view class="left">
						<u-image width="80rpx" mode='aspectFit' class="header_image" height="80rpx" :src="$cfg.domain+item.main_image"></u-image>
						<view class="left-item">
							<text class="black">{{item.number}}<text class="gray">{{item.name}}</text></text>
							<text class="gy">零售价:&yen;{{item.retail_price}}</text>
							<text class="gy">实销价:&yen;{{item.real_price}}({{(Number(item.real_price)/Number(item.retail_price)*10).toFixed(2)}}折)</text>
						</view>
					</view>
					<view class="right">
						<text class="right-day" v-if="form.type==0">{{item.day}}天</text>
						<text class="right-day" v-if="form.type==1">{{Number(item.stock)!=0? (Number(item.sales)/Number(item.stock)*100).toFixed(1):(Number(item.sales)*100).toFixed()}}%</text>
						<view class="right-item">
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
					start_time: '2020-02-01',
					end_time: '2021-02-01',
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
				pull: false
			}
		},
		methods: {
			// 选择类型
			navClick(item) {
				this.show = false;
				this.sort_name = item.name;
				this.form.type = item.type;
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
				this.init()
			},
			// 初始化
			async init() {
				let res = await analyse(this.form)
				console.log(res);
				if(this.form.page==1){
					this.list = []
				}
				this.list.push(...res.list.data);
				this.last_page = res.list.last_page
			},

			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = []
				this.pull = false
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
				top:calc(208rpx + var(--status-bar-height));
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
					align-items: center;
					.left-item{
						display: flex;
						flex-direction: column;
						width: calc(100% - 100rpx);
						margin-left: 10rpx;
						.black{
							width: 100%;
							white-space:nowrap;
							overflow:hidden;
							text-overflow:ellipsis;
							.gray{
								color: #999999;
							}
						}
						.gy{
							color: #999999;
							font-size: 24rpx;
						}
					}
				}
				.right{
					width: 40%;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					.right-day{
						width: 50%;
						display: flex;
						font-size: 20rpx;
						align-items: center;
						justify-content: center;
					}
					.right-item{
						width: 50%;
						display: flex;
						font-size: 20rpx;
						flex-direction: column;
						align-items: center;
						text{
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>
