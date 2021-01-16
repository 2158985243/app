<template>
	<view class="statics">
		<u-navbar back-icon-color='#ffffff' title="支出分析" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="arrow-down-fill" @click="showStrore" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<view class="mains">
			<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
			 @clickItem="onClickItem"></tabControl>
			<swiper class="swiper" @change='scollSwiper' :current='current'>
				<swiper-item v-for="(item,index) in bos" :key='index'>
					<scroll-view scroll-y="true" style="height: 100%;">
						<refresh @interrupt="interrupt" @pushToInterrupt="pushToInterrupt" @finished="finished" @scrolltolower="g">
							<template slot="top">
								<view :style="'position: absolute; bottom: 0px;height: ' + 40 + 'px;line-height:' + 40 + 'px;  width: 100%;text-align: center;'">{{tip}}</view>
							</template>
							<template slot="content">
								<view class="chart">
									<!-- @onPullUp="handleLoadMore" -->
									<view class="qiun-columns">
										<view class="qiun-charts">
											<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
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

			<view class="list">
				<view class="li" v-for="(item,index) in list[current]" :key="index" @click="spendingDetails(item)">
					<text>{{item.expend_item.name}}</text>
					<text>{{item.ratio}}</text>
					<view class="text">
						<text>{{item.money}}</text>
						<u-icon name="arrow-right" color="#bebebe" size="36"></u-icon>
					</view>
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
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import refresh from '@/components/xing-refresh/xing-refresh.vue'
	import uCharts from "@/js_sdk/u-charts/u-charts/u-charts.js"
	var _self;
	var canvaRing = null;

	import store from '@/store'
	import {
		expendLogAnalyse
	} from '../../api/expendLog.js'
	import {
		storeList
	} from '../../api/store.js'
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
				page_size: 10
			}
		},
		methods: {
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
				let res = await expendLogAnalyse({
					start_time: timeStar,
					end_time: timeEnd,
					store_id: this.store_id
				})
				if (res.data.length > 0) {
					res.data.map((v) => {
						this.chartData.series.push({
							name: v.expend_item.name,
							data: Number(v.money)
						})
					})
					this.bos[this.current] = this.chartData
					this.list[this.current] = []
					res.data.map(v => {
						this.list[this.current].push({
							...v,
							ratio: ((Number(v.money) / Number(res.total)) * 100).toFixed(2) + '%'
						})
					})
					this.total[this.current] = res.total;
					// console.log(this.chartData);
					this.showRing("canvasRing", this.bos[this.current], this.total[this.current])
					this.$forceUpdate()
				}
			},
			// 显示canva
			showRing(canvasId, chartData, total) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: true,
					title: {
						name: total.toFixed(2),
						color: '#7cb5ec',
						fontSize: 12 * _self.pixelRatio,
						offsetY: -5 * _self.pixelRatio,
					},
					subtitle: {
						name: '总支出',
						color: '#666666',
						fontSize: 12 * _self.pixelRatio,
						offsetY: 1 * _self.pixelRatio,
					},
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 40 * _self.pixelRatio,
							labelWidth: 15
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
				});
			},
			touchRing(e) {
				canvaRing.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			getServerData() {
				_self.showRing("canvasRing", this.chartData, 100);

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
				let date = new Date();
				let seperator1 = "-";
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let strDate = date.getDate();
				this.current = e.target.current
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				if (this.bos[this.current].length == 0) {
					if (this.current == 0) {
						let currentdate = year + seperator1 + month + seperator1 + strDate;
						this.dateAll.today1.statrTime = currentdate
						this.dateAll.today1.endTime = currentdate
						this.init(currentdate, currentdate)
					} else if (this.current == 1) {
						let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
						let yesterday = new Date(time);
						let month = yesterday.getMonth();
						let day = yesterday.getDate();
						yesterday = yesterday.getFullYear() + "-" + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : "0" + (
							yesterday.getMonth() + 1)) + "-" + (yesterday.getDate() > 9 ? (yesterday.getDate()) : "0" + (yesterday.getDate()));
						this.dateAll.today2.statrTime = yesterday
						this.dateAll.today2.endTime = yesterday
						this.init(yesterday, yesterday)
					} else if (this.current == 2) {
						let Nowdate = new Date();
						let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000); // 本周第一天
						let WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000); // 本周第最后一天
						// 本周第一天
						let yearState = WeekFirstDay.getFullYear()
						let monthState = (WeekFirstDay.getMonth() + 1) < 10 ? "0" + (WeekFirstDay.getMonth() + 1) : (WeekFirstDay.getMonth() +
							1)
						let todayState = (WeekFirstDay.getDate() < 10 ? "0" + WeekFirstDay.getDate() : WeekFirstDay.getDate())
						let statrTime = yearState + seperator1 + monthState + seperator1 + todayState
						// 本周第一天
						let yearEnd = WeekLastDay.getFullYear()
						let monthEnd = (WeekLastDay.getMonth() + 1) < 10 ? "0" + (WeekLastDay.getMonth() + 1) : (WeekLastDay.getMonth() +
							1)
						let todayEnd = (WeekLastDay.getDate() < 10 ? "0" + WeekLastDay.getDate() : WeekLastDay.getDate())
						let endTime = yearEnd + seperator1 + monthEnd + seperator1 + todayEnd
						this.dateAll.today3.statrTime = statrTime
						this.dateAll.today3.endTime = endTime
						this.init(statrTime, endTime)
					} else if (this.current == 3) {
						let Nowdate = new Date();
						let MonthFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth(), 1);
						let MonthNextFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() + 1, 1);
						let MonthLastDay = new Date(MonthNextFirstDay - 86400000);
						// 本月第一天
						let yearState = MonthFirstDay.getFullYear()
						let monthState = (MonthFirstDay.getMonth() + 1) < 10 ? "0" + (MonthFirstDay.getMonth() + 1) : (MonthFirstDay.getMonth() +
							1)
						let todayState = (MonthFirstDay.getDate() < 10 ? "0" + MonthFirstDay.getDate() : MonthFirstDay.getDate())
						let statrTime = yearState + seperator1 + monthState + seperator1 + todayState
						// 本月最后一天
						let yearEnd = MonthLastDay.getFullYear()
						let monthEnd = (MonthLastDay.getMonth() + 1) < 10 ? "0" + (MonthLastDay.getMonth() + 1) : (MonthLastDay.getMonth() +
							1)
						let todayEnd = (MonthLastDay.getDate() < 10 ? "0" + MonthLastDay.getDate() : MonthLastDay.getDate())
						let endTime = yearEnd + seperator1 + monthEnd + seperator1 + todayEnd
						this.dateAll.today4.statrTime = statrTime
						this.dateAll.today4.endTime = endTime
						// console.log(yearEnd, monthEnd, todayEnd);
						this.init(statrTime, endTime)
					} else if (this.current == 4) {
						this.dateAll.today5.statrTime = this.start_time
						this.dateAll.today5.endTime = this.end_time
						this.init(this.start_time, this.end_time)

					}

				} else {
					_self.showRing("canvasRing", this.bos[this.current], this.total[this.current])
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
				this.showtime1 = true;
			},
			// 结束时间
			async confirmTime1(v) {
				this.end_time = `${v.year}-${v.month}-${v.day}`;
				this.init(this.start_time, this.end_time);
			},
			// 前往支出详情
			spendingDetails(val) {
				uni.navigateTo({
					url: `/pages/spendingDetails/spendingDetails?expend_item_id=${val.expend_item_id}&store_id=${this.store_id}&name=${val.expend_item.name}`
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
			}
			if (store.state.store.store_id > 0) {
				this.store_id = store.state.store.store_id;
			}
			if (query.current > 0) {
				this.current = Number(query.current);
			}
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.init(this.start_time, this.end_time);
		},
		onShow() {

		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

	.statics {
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
				// height: calc(100% - #{84rpx});
				height: 500rpx;
			}

			.chart {
				width: 100%;
				height: 500rpx;
			}

			.list {
				margin-top: 40rpx;
				width: 100%;
				display: flex;
				flex-direction: column;

				.li {
					width: 100%;
					display: flex;
					justify-content: space-between;
					padding: 20rpx;
					border-bottom: 0.01rem solid #e3e3e3;
					background-color: #FFFFFF;

					text {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.text {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;

						text {
							display: flex;
							justify-content: flex-end;
						}
					}
				}
			}
		}

		//charts
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
