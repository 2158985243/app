<template>
	<view class="statics">
		<u-navbar back-icon-color='#ffffff' title="支出分析" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="arrow-down-fill" @click="toAddShopInformation" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<view class="mains">
			<view class="chart">
				<view class="qiun-columns">
					<view class="qiun-charts">
						<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
					</view>
				</view>
			</view>
			<view class="list">

			</view>
		</view>

	</view>
</template>

<script>
	import uCharts from "@/js_sdk/u-charts/u-charts/u-charts.js"
	var _self;
	var canvaRing = null;

	import store from '@/store'
	import {
		expendLogAnalyse
	} from '../../api/expendLog.js'
	export default {
		data() {
			return {
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
				list: []
			}
		},
		methods: {
			async init() {
				let res = await expendLogAnalyse({
					start_time: this.start_time,
					end_time: this.end_time,
					store_id: this.store_id
				})
				console.log(res);
				res.data.map((v) => {
					this.chartData.series.push({
						name: v.expend_item.name,
						data: Number(v.money)
					})
				})

				res.data.map(v => {
					this.list.push({
						...v,
						ratio: ((Number(v.money) / v.total) * 100).toFixed(2) + '%'
					})
				})

				_self.showRing("canvasRing", this.chartData, res.total)
			},
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
		},
		onLoad(query) {
			this.start_time = query.timeStar;
			this.end_time = query.timeEnd;
			if (store.state.store.store_id) {
				this.store_id = store.state.store.store_id;
			}
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.init();
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
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
		}

		.charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
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
