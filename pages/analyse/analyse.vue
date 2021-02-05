<template>
	<view class="analyse">
		<u-navbar back-icon-color='#ffffff' title="销售分析" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="arrow-down-fill" @click="showStrore" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<view class="mains">
			<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
			 @clickItem="onClickItem"></tabControl>
			<swiper class="swiper" @change='scollSwiper' :current='current'>
				<swiper-item v-for="(item,index) in bos" :key='index'>
					<scroll-view scroll-y="true">
						<refresh @interrupt="interrupt" @pushToInterrupt="pushToInterrupt" @finished="finished" @scrolltolower="g">
							<template slot="top">
								<view :style="'position: absolute; bottom: 0px;height: ' + 40 + 'px;line-height:' + 40 + 'px;  width: 100%;text-align: center;'">{{tip}}</view>
							</template>
							<template slot="content">
								<view class="chart">
									<!-- @onPullUp="handleLoadMore" -->
									<view class="qiun-columns">
										<view class="qiun-charts">
											<canvas canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll=true @touchstart="touchMix"
											 @touchmove="moveMix" @touchend.stop="touchEndMix"></canvas>
										</view>
									</view>
								</view>
							</template>
							<template slot="bottom">
								<view>
								</view>
							</template>
						</refresh>

					</scroll-view>
				</swiper-item>
			</swiper>
			<view class="nav">
				<view class="nav-item">
					<text class="red">{{sales_amount||0}}</text>
					<text class="hui">销售笔数</text>
				</view>
				<view class="nav-item">
					<text class="red">{{sales_quantity||0}}</text>
					<text class="hui">销售数量</text>
				</view>
				<view class="nav-item">
					<text class="red">{{saleroom||0}}</text>
					<text class="hui">销售额</text>
				</view>
				<view class="nav-item">
					<text class="red">{{goods_cost||0}}</text>
					<text class="hui">毛利润</text>
				</view>

			</view>
			<view class="list" v-if="list[current].length>0">
				<view class="li">
					<text>日期</text>
					<text>销售笔数</text>
					<text>销售数</text>
					<text>销售额</text>
					<text>毛利润</text>
				</view>
				<view class="li" v-for="(item,index) in list[current]" :key="index" @click="toAnalyseDetails(item)">
					<text>{{item.date}}</text>
					<text>{{item.sales_amount}}</text>
					<text>{{item.sales_quantity}}</text>
					<text>{{item.sales_money}}</text>
					<text>{{item.goods_cost}}</text>
					<u-icon name="arrow-right" color="#bebebe" size="30"></u-icon>
				</view>
			</view>
		</view>
		<!-- 开始时间 -->
		<u-picker mode="time" v-model="showtime" @confirm="confirmTime" title="开始时间" :params="params"></u-picker>
		<!-- 结束时间 -->
		<u-picker mode="time" v-model="showtime1" @confirm="confirmTime1" title="结束时间" :params="params"></u-picker>
		<!-- 选择门店 -->
		<u-select v-model="show" mode="single-column" @confirm="confirmStrores" :list="strots"></u-select>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	import refresh from '@/components/xing-refresh/xing-refresh.vue'
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	var _self;
	var canvaMix = null;
	import store from '@/store'
	import {
		analyse
	} from '../../api/salesOrder.js'
	export default {
		components: {
			tabControl,
			refresh
		},
		data() {
			return {
				show: false,
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
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				background: {
					backgroundColor: '#2979ff'
				},
				store_id: 0,
				start_time: '',
				end_time: '',
				chartData: {
					series: []
				},
				list: [
					[],
					[],
					[],
					[],
					[]
				],
				bos: [
					[],
					[],
					[],
					[],
					[]
				],
				items: [{
					name: '今天',
					status: 0
				}, {
					name: '昨日',
					status: 1
				}, {
					name: '本周',
					status: 2
				}, {
					name: '本月',
					status: 3
				}, {
					name: '其他',
					status: 4
				}],
				current: 0,
				// 下拉
				tip: '下拉刷新',
				total: [0, 0, 0, 0, 0],
				dateAll: {
					today1: { //今天
						statrTime: '',
						endTime: ''
					},
					today2: { //昨天
						statrTime: '',
						endTime: ''
					},
					today3: { //本周
						statrTime: '',
						endTime: ''
					},
					today4: { //本月
						statrTime: '',
						endTime: ''
					},
					today5: { //其他
						statrTime: '',
						endTime: ''
					},

				},
				strots: [], //店铺组
				page_size: 10,
				saleroom: 0, //销售额
				sales_amount: 0, //销售笔数
				goods_cost: 0, //毛利润
				sales_quantity: 0, //销售数量
			}
		},
		methods: {
			// getServerData() {

			// },
			showMix(canvasId, chartData) {
				canvaMix = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'area',
					fontSize: 11,
					legend: {
						show: true,
						position: 'top',
						float: 'center'
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					// animation: true,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: true,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
					},
					yAxis: {

						disableGrid: true,
						gridType: 'dash',
						gridColor: '#e6e6e6',
						splitNumber: 5, //Y轴网格数量
						dashLength: 12, //Y轴网格为虚线时，单段虚线长度
						format: (val) => {
							return val.toFixed(0)
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						tooltip: {
							bgColor: '#000000',
							bgOpacity: 0.7,
							gridType: 'straight',
							dashLength: 8,
							gridColor: '#1890ff',
							fontColor: '#FFFFFF',
							horizentalLine: true,
							xAxisLabel: true,
							yAxisLabel: true,
							labelBgColor: '#DFE8FF',
							labelBgOpacity: 0.95,
							labelAlign: 'left',
							labelFontColor: '#666666'
						}
					},
				});
			},
			touchMix(e) {
				canvaMix.scrollStart(e);
			},
			moveMix(e) {
				canvaMix.scroll(e);
			},
			touchEndMix(e) {
				canvaMix.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaMix.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			//
			async confirmStrores(e) {
				this.store_id = e[0].value
				if (this.current == 0) {
					this.init(this.dateAll.today1.statrTime, this.dateAll.today1.endTime)
				} else if (this.current == 1) {
					this.init(this.dateAll.today2.statrTime, this.dateAll.today2.endTime)
				} else if (this.current == 2) {
					this.init(this.dateAll.today3.statrTime, this.dateAll.today3.endTime)
				} else if (this.current == 3) {
					this.init(this.dateAll.today4.statrTime, this.dateAll.today4.endTime)
				} else if (this.current == 4) {
					this.init(this.dateAll.today5.statrTime, this.dateAll.today5.endTime)
				}
			},
			// 显示店铺列表
			showStrore() {
				this.show = true;
			},
			// 店铺数组
			strored() {
				let arr = store.state.store.storesArr;
				if (arr) {
					this.strots.push({
						value: 0,
						laber: '全部门店'
					})
					arr.map((v) => {
						this.strots.push({
							value: v.store_id,
							label: v.name
						})
					})
				}
			},
			// 初始化
			async init(timeStar, timeEnd) {
				this.chartData = {
					series: []
				}
				let res = await analyse({
					start_time: timeStar,
					end_time: timeEnd,
					store_id: this.store_id
				})
				console.log(res);
				let chartData = {
					"categories": [],
					"series": [{
						"name": `销售额:0`,
						"data": [],
						"legendShape ": "triangle",
						"addPoint ": true,
						"pointShape ": "circle",
						"type": "area",
						"color": "#6D34FB"
					}]
				}
				if (res.length > 0) {
					this.list[this.current] = []
					this.list[this.current] = res
					this.saleroom = 0;
					let dates = [];
					let datas = [];
					this.sales_amount = 0;
					this.sales_quantity = 0;

					res.map(v => {
						this.saleroom += Number(v.sales_money)
						this.sales_amount += Number(v.sales_amount)
						this.sales_quantity += Number(v.sales_quantity)
						this.goods_cost += Number(v.goods_cost)
						dates.push(v.date)
						datas.push(v.sales_money)
					})
					this.saleroom = this.saleroom.toFixed(2)
					let chartData = {
						"categories": dates,
						"series": [{
							"name": `销售额:${this.saleroom}`,
							"data": datas,
							"legendShape ": "triangle",
							"addPoint ": true,
							"pointShape ": "circle",
							"type": "area",
							"color": "#6D34FB"
						}]
					}

					this.total[this.current] = chartData;
					// console.log(this.chartData);
					_self.showMix("canvasMix", chartData);
					this.$forceUpdate()
				} else {
					_self.showMix("canvasMix", chartData);

				}
			},
			touchRing(e) {
				canvaRing.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			// 点击日期
			async onClickItem(val) {
				this.current = val.currentIndex;
				if (this.current == 4) {
					this.showtime = true;
				}
			},
			// 移动
			async scollSwiper(e) {
				this.current = e.target.current
				if (this.list[this.current].length == 0) {
					if (this.current == 0) {
						let currentdate = this.$date.today()
						this.dateAll.today1.statrTime = currentdate.start_time
						this.dateAll.today1.endTime = currentdate.end_time
						this.init(currentdate.start_time, currentdate.end_time)
					} else if (this.current == 1) {
						let currentdate = this.$date.yesterday()
						this.dateAll.today2.statrTime = currentdate.start_time
						this.dateAll.today2.endTime = currentdate.end_time
						this.init(currentdate.start_time, currentdate.end_time)
					} else if (this.current == 2) {
						let currentdate = this.$date.thisWeek()
						this.dateAll.today3.statrTime = currentdate.start_time
						this.dateAll.today3.endTime = currentdate.end_time
						this.init(currentdate.start_time, currentdate.end_time)
					} else if (this.current == 3) {
						let currentdate = this.$date.thisMonth()
						this.dateAll.today4.statrTime = currentdate.start_time
						this.dateAll.today4.endTime = currentdate.end_time
						// console.log(yearEnd, monthEnd, todayEnd);
						this.init(currentdate.start_time, currentdate.end_time)
					} else if (this.current == 4) {

						// this.init(this.start_time, this.end_time)

					}

				} else {
					_self.showMix("canvasMix", this.total[this.current]);
				}
			},
			// 下拉刷新
			g(e) {
				console.log(e);
			},
			interrupt(e) {
				this.tip = '刷新中'
				//模拟发送请求
				setTimeout(e, 500);
				this.tip = '刷新成功';
			},
			async pushToInterrupt() {
				_self.showRing("canvasRing", this.bos[this.current], this.total[this.current])
				this.tip = '释放刷新';
			},
			finished() {
				this.tip = '下拉刷新';
			},
			/// 开始时间
			confirmTime(v) {
				this.start_time = `${v.year}-${v.month}-${v.day}`;
				this.dateAll.today5.statrTime = this.start_time
				this.showtime1 = true;
			},
			// 结束时间
			async confirmTime1(v) {
				this.end_time = `${v.year}-${v.month}-${v.day}`;
				this.dateAll.today5.endTime = this.end_time
				this.init(this.start_time, this.end_time);
			},
			// 前往支出详情
			toAnalyseDetails(val) {

				uni.navigateTo({
					url: `/pages/analyse/analyseDetails/analyseDetails?date=${val.date}&store_id=${this.store_id}`
				})
			}
		},
		onLoad(query) {
			this.strored()
			if (query.timeStar) {
				this.start_time = query.timeStar;
				this.end_time = query.timeEnd;
				this.dateAll.today5['statrTime'] = query.timeStar;
				this.dateAll.today5['endTime'] = query.timeEnd;
			} else {
				let date = new Date();
				this.start_time = this.$u.timeFormat(date, 'yyyy-mm-dd');
				this.end_time = this.$u.timeFormat(date, 'yyyy-mm-dd');
				this.dateAll.today1.statrTime = this.start_time
				this.dateAll.today1.endTime = this.end_time
			}
			if (store.state.store.store_id > 0) {
				this.store_id = store.state.store.store_id;
			}
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			// this.getServerData();
			this.init(this.start_time, this.end_time);

		},
	}
</script>

<style scoped lang="scss">
	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

	.analyse {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f5f4f8;

		.right_icon {
			margin-right: 30rpx;
		}

		.mains {
			width: 100%;
			display: flex;
			flex-direction: column;

			.swiper {
				margin-top: 84rpx;
				height: 500rpx;
			}

			.chart {
				width: 100%;
				height: 500rpx;
			}

			.nav {
				width: 100vw;
				height: 100rpx;
				margin: 20rpx 0;
				display: flex;
				flex-direction: row;
				background-color: #FFFFFF;

				.nav-item {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.hui {
						color: #c8c8c8;
						font-size: 26rpx;
					}

					.red {
						color: #DD524D;
						font-size: 24rpx;
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
					flex-direction: row;
					padding: 20rpx;
					border-bottom: 0.01rem solid #e3e3e3;
					background-color: #FFFFFF;

					text {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 20rpx;
					}
				}
			}
		}

		.qiun-padding {
			padding: 2%;
			width: 96%;
		}

		.qiun-wrap {
			display: flex;
			flex-wrap: wrap;
		}

		.qiun-rows {
			display: flex;
			flex-direction: row !important;
		}

		.qiun-columns {
			display: flex;
			flex-direction: column !important;
		}

		.qiun-common-mt {
			margin-top: 10upx;
		}

		.qiun-bg-white {
			background: #FFFFFF;
		}

		.qiun-title-bar {
			width: 96%;
			padding: 10upx 2%;
			flex-wrap: nowrap;
		}

		.qiun-title-dot-light {
			border-left: 10upx solid #0ea391;
			padding-left: 10upx;
			font-size: 32upx;
			color: #000000
		}

		.qiun-charts {
			width: 100%;
			height: 500upx;
			background-color: #FFFFFF;
		}

		.charts {
			width: 100%;
			height: 500upx;
			background-color: #FFFFFF;
		}
	}
</style>
