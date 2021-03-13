<template>
	<view class="getStock">
		<u-navbar back-icon-color='#ffffff' title="库存详情" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen" @click="toEditCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="matter">
			<!--  -->
			<view class="imgs">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
					<u-image width="180rpx" height="180rpx" border-radius="20rpx" class="scroll-view-item_H" :src="$cfg.domain+item"
					 v-for="(item,index) in oracle.images"></u-image>
				</scroll-view>
			</view>
			<!--  -->
			<view class="shopp-name" v-if="oracle.number">
				<text class="sp-name">{{oracle.name}}</text>
				<text class="sp-number">{{`(${oracle.number})`}}</text>
			</view>
			<!--  -->
			<view class="shopp-price">
				<view class="price-name">
					零售价
				</view>
				<view class="price-name">
					进货价
				</view>
				<view class="price-name yen">
					&yen;{{oracle.retail_price}}
				</view>
				<view class="price-name yen">
					&yen;{{oracle.purchase_price}}
				</view>
			</view>
			<!--  -->
			<view class="shopp-color">
				<view class="color-name">
					颜色
				</view>
				<view class="color-cont">
					{{colorName}}
				</view>
			</view>
			<!--  -->
			<view class="shopp-color">
				<view class="color-name">
					尺码
				</view>
				<view class="color-cont">
					{{sizeName}}
				</view>
			</view>

			<!--  -->
			<view class="shopp-tconts">
				<view class="tconts">
					品牌：<text v-if="oracle.goods_info"> <text v-if="oracle.goods_info.brand"> {{oracle.goods_info.brand.name}} </text></text>
				</view>
				<view class="tconts">
					分类：<text v-if="oracle.goods_category"> {{oracle.goods_category.name}}</text>
				</view>
				<view class="tconts">
					厂商：<text v-if="oracle.supplier"> {{oracle.supplier.name}}</text>
				</view>
				<view class="tconts">
					季节：<text v-if="oracle.goods_info"> {{oracle.goods_info.year}}{{oracle.goods_info.season}}</text>
				</view>
			</view>
		</view>
		<view class="goods-data">
			<view class="goods-main">
				<!-- 头部选项 -->
				<view class="nav">
					<view class="nav-item">
						<view class="item" v-for='(item,index) in nav_list' @click="itemClick(index)" :class="item_active==index? 'active':''">
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="nav-date" v-show="item_active != 0">
						<view class="date" v-for='(item,index) in date_list' @click="dateClick(index)" :class="date_active==index? 'active':''">
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="store-select" v-show="item_active != 0">
						<view class="title_hd" @click="show = true">
							<text class="tlt">{{title_name}}</text>
							<u-icon name="arrow-down-fill" class="down" color="#2979ff" size="34"></u-icon>
						</view>
					</view>
					<view class="box" v-show="item_active == 0">
						<view class="box-item">
							<view class="left">
								合并库存
							</view>
							<view class="right">
								<u-switch v-model="checked1" size='40' @change="change1" active-value="1" inactive-value="0"></u-switch>
							</view>
						</view>
						<view class="box-item">
							<view class="left">
								尺码横向排列
							</view>
							<view class="right">
								<u-switch v-model="checked2" size='40' @change="change2" active-value="1" inactive-value="0"></u-switch>
							</view>
						</view>

					</view>
				</view>
				<view class="goods-conts">
					<view class="sotck-data" v-show="item_active==0">
						<view class="goods-item">
							<block v-for="(item,index) in nav_list[0].data[sum_number] ">
								<view class="goods-title" v-if="item.quantity != 0">
									<view class="left">
										<text>{{item.name}}(合计: <text>{{item.quantity}}</text> )</text>
									</view>
									<view class="right">
										<text>库存流水</text>
										<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
									</view>
								</view>
								<view class="goods-color" v-if="item.quantity != 0">
									<view class="gd-row" v-if="row_changed==0" v-for="(itemColor,indexColor) in item.data" :key="indexColor">
										<view class="gd-size" v-for="(itemSize,indexSize) in itemColor.data" :key='indexSize'>
											<text class="gd-l" v-if="indexSize==0">{{itemColor.name}}(小计:{{itemColor.quantity}})</text>
											<text v-else></text>
											<text class="gd-center">{{itemSize.name||itemSize.size.name}}</text>
											<text class="gd-r">{{itemSize.quantity}}</text>
										</view>
									</view>
									<view class="gd-column" v-if="row_changed==1" v-for="(itemColor,indexColor) in item.data" :key="indexColor">
										<view class="column-color">
											<text>{{itemColor.name}}</text>
											<text><text class="hui">x </text> {{itemColor.quantity}}</text>
										</view>
										<view class="gd-size">
											<view class="column-size" v-for="(itemSize,indexSize) in itemColor.data" :key='indexSize'>
												<text>{{itemSize.name||itemSize.size.name}}</text>
												<text>{{itemSize.quantity}}</text>
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
					<view class="sotck-data" v-show="item_active==1">
						<view class="chart">
							<view class="qiun-charts">
								<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
							</view>
						</view>
						<view class="sales-nav">
							<view class="sales-item">
								<text class="sales-td">总销量</text>
								<text>{{totalQuantity}}件</text>
							</view>
							<view class="sales-item">
								<text class="sales-td">总销售额</text>
								<text>{{totalMoney}}元</text>
							</view>
							<view class="sales-item">
								<text class="sales-td">日均销量</text>
								<text>{{Math.floor(totalQuantity/sum_date)}}件</text>
							</view>
							<view class="sales-item">
								<text class="sales-td">日均销售额</text>
								<text>{{(totalMoney/sum_date).toFixed(2)}}元</text>
							</view>

						</view>
						<view class="sales-list">
							<view class="sales-title">
								商品统计
							</view>
							<view class="list sales-t">
								<text>颜色</text>
								<text>尺码</text>
								<text>销量</text>
								<text>销量额</text>
							</view>
							<!-- nav_list[1].data[0] -->
							<block  v-for="(item,index) in oracle.color" :key="index">
								<view class="list"v-for="(itemSize,indexSize) in oracle.size" :key="indexSize">
										<text v-if="indexSize==0">{{item.name}}</text>
										<text v-else></text>
										<text>{{itemSize.name}}</text>
										<block v-if="nav_list[1].data[0].length>0">
											<text>{{nav_list[1].data[0][indexSize].quantity!=0?nav_list[1].data[0][indexSize].quantity: 0}}</text>
											<text>{{nav_list[1].data[0][indexSize].sales_money!=0?nav_list[1].data[0][indexSize].sales_money: 0}}</text>
										</block>
										<block v-else>
											<text>0</text>
											<text>0</text>
										</block>
								</view>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>

		<u-popup v-model="show" mode="center" width="500rpx" height="560rpx">
			<view class="pop">
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="pop-item" v-for="(item,index) in strots" :key="index" @click="strotsItem(item)">
						<text>{{item.label}}</text>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<!-- 开始时间 -->
		<u-picker mode="time" v-model="showtime" @confirm="confirmTime" title="开始时间" :params="params"></u-picker>
		<!-- 结束时间 -->
		<u-picker mode="time" v-model="showtime1" @confirm="confirmTime1" title="结束时间" :params="params"></u-picker>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	import store from '@/store'
	var _self;
	var canvaColumn = null;
	import {
		goods,
		getStock,
		getSalesStatus
	} from '../../api/goods.js'
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
				checked1: false,
				checked2: false,
				oracle: {},
				colorName: '',
				sizeName: '',
				id: 0,
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
				item_active: 0,
				date_active: 0,
				nav_list: [{
						name: '总库存',
						data: [
							[],
							[],
						]
					},
					{
						name: '销售情况',
						data: [
							[],
							[],
						]
					}

				],
				date_list: [{
						name: '今天'
					},
					{
						name: '昨天'
					},
					{
						name: '本月'
					},
					{
						name: '上月'
					},
					{
						name: '其他'
					}
				],
				strots: [], //店铺组
				show: false, //显示隐藏店铺列表
				form: {
					store_id: '',
					goods_id: '',

				},
				stock_sum: 0,
				sales_sum: 0,
				start_time: '',
				end_time: '',
				title_name: '',
				sum: 0,
				sum_number: 0,
				row_changed: 0,
				totalQuantity: 0,
				totalMoney: 0,
				sum_date: 0
			}
		},
		computed: {

		},
		methods: {
			change1(v) {
				this.sum_number = v
			},
			change2(v) {
				this.row_changed = v
			},
			dateDiff(date1, date2) {
				let time1 = Date.parse(date1)
				let time2 = Date.parse(date2)
				return ((time2 - time1) / (1000*60 * 60 * 24)+1); //结果是秒
			},
			// 点模式
			async itemClick(index) {
				this.item_active = index;
				if (index == 1 && this.nav_list[index].data[0].length == 0) {
					let res = await getSalesStatus({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time
					})
					this.sum_date = this.dateDiff(this.start_time, this.end_time)
					
					if (!res.code) {
						this.nav_list[1].data[0] = res.count
						this.nav_list[1].data[1] = res.list
						this.getServerData()
						this.totalQuantity = 0
						this.totalMoney = 0
						this.nav_list[1].data[0].map((v, i) => {
							this.totalQuantity += Number(v.quantity)
							this.totalMoney += Number(v.sales_money)
						})
						this.totalQuantity = this.totalQuantity.toFixed()
						this.totalMoney = this.totalMoney.toFixed(2)
						this.$forceUpdate()
					}
				}
			},
			// 点时间
			async dateClick(index) {
				this.date_active = index;
				if (index == 0) {
					let date = this.$date.today()
					this.start_time = date.start_time
					this.end_time = date.end_time

					let res = await getSalesStatus({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time
					})
					this.sum_date = this.dateDiff(this.start_time, this.end_time)
					
					if (!res.code) {
						this.nav_list[1].data[0] = res.count
						this.nav_list[1].data[1] = res.list
						this.getServerData()
						this.totalQuantity = 0
						this.totalMoney = 0
						this.nav_list[1].data[0].map((v, i) => {
							this.totalQuantity += Number(v.quantity)
							this.totalMoney += Number(v.sales_money)
						})
						this.totalQuantity = this.totalQuantity.toFixed()
						this.totalMoney = this.totalMoney.toFixed(2)
						this.$forceUpdate()
					}
				} else if (index == 1) {
					let date = this.$date.yesterday()
					this.start_time = date.start_time
					this.end_time = date.end_time
					let res = await getSalesStatus({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time
					})
					this.sum_date = this.dateDiff(this.start_time, this.end_time)
					
					if (!res.code) {
						this.nav_list[1].data[0] = res.count
						this.nav_list[1].data[1] = res.list
						this.getServerData()
						this.totalQuantity = 0
						this.totalMoney = 0
						this.nav_list[1].data[0].map((v, i) => {
							this.totalQuantity += Number(v.quantity)
							this.totalMoney += Number(v.sales_money)
						})
						this.totalQuantity = this.totalQuantity.toFixed()
						this.totalMoney = this.totalMoney.toFixed(2)
						this.$forceUpdate()
					}
				} else if (index == 2) {
					let date = this.$date.thisMonth()
					this.start_time = date.start_time
					this.end_time = date.end_time
					let res = await getSalesStatus({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time
					})
					this.sum_date = this.dateDiff(this.start_time, this.end_time)
					
					if (!res.code) {
						this.nav_list[1].data[0] = res.count
						this.nav_list[1].data[1] = res.list
						this.getServerData()
						this.totalQuantity = 0
						this.totalMoney = 0
						this.nav_list[1].data[0].map((v, i) => {
							this.totalQuantity += Number(v.quantity)
							this.totalMoney += Number(v.sales_money)
						})
						this.totalQuantity = this.totalQuantity.toFixed()
						this.totalMoney = this.totalMoney.toFixed(2)
						this.$forceUpdate()
					}
				} else if (index == 3) {
					let date = this.$date.lastMonth()
					this.start_time = date.start_time
					this.end_time = date.end_time
					let res = await getSalesStatus({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time
					})
					this.sum_date = this.dateDiff(this.start_time, this.end_time)
					
					if (!res.code) {
						this.nav_list[1].data[0] = res.count
						this.nav_list[1].data[1] = res.list
						this.getServerData()
						this.totalQuantity = 0
						this.totalMoney = 0
						this.nav_list[1].data[0].map((v, i) => {
							this.totalQuantity += Number(v.quantity)
							this.totalMoney += Number(v.sales_money)
						})
						this.totalQuantity = this.totalQuantity.toFixed()
						this.totalMoney = this.totalMoney.toFixed(2)
						this.$forceUpdate()
					}
				} else if (index == 4) {
					this.showtime = true
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
				let res = await getSalesStatus({
					...this.form,
					start_time: this.start_time,
					end_time: this.end_time
				})
				this.sum_date = this.dateDiff(this.start_time, this.end_time)
				
				if (!res.code) {
					this.nav_list[1].data[0] = res.count
					this.nav_list[1].data[1] = res.list
					this.getServerData()
					this.totalQuantity = 0
					this.totalMoney = 0
					this.nav_list[1].data[0].map((v, i) => {
						this.totalQuantity += Number(v.quantity)
						this.totalMoney += Number(v.sales_money)
					})
					this.totalQuantity = this.totalQuantity.toFixed()
					this.totalMoney = this.totalMoney.toFixed(2)
					this.$forceUpdate()
				}
			},

			// 滑动
			scroll(e) {
				// console.log(e);
			},
			// 添加商品
			toAddCommodity() {
				uni.navigateTo({
					url: `/pages/addCommodity/addCommodity`
				})
			},
			// 编辑商品
			toEditCommodity() {
				uni.navigateTo({
					url: `/pages/editCommodity/editCommodity?id=${this.id}`
				})
			},
			async init(v) {
				let res = await goods(v)
				this.oracle = res;
				this.oracle.images.unshift(this.oracle.main_image)
				let colorArr = [];
				let sizeArr = [];
				this.oracle.color.map((v, i) => {
					colorArr.push(v.name)
				})
				this.oracle.size.map((v, i) => {
					sizeArr.push(v.name)
				})
				this.colorName = colorArr.join('/')
				this.sizeName = sizeArr.join('/')
			}, // 店铺数组
			strored() {
				let arr = store.state.store.storesArr;
				this.title_name = store.state.store.name;
				this.form.store_id = store.state.store.store_id;
				this.form.goods_id = this.id
				if (arr) {
					this.strots.push({
						value: 0,
						label: '全部'
					})
					arr.map((v) => {
						this.strots.push({
							value: v.store_id,
							label: v.name
						})
					})
				}
				// console.log(this.strots);
			},
			// 选择店铺
			async strotsItem(item) {
				this.show = false
				this.title_name = item.label;
				this.form.store_id = item.value;
				
			},
			// 库存
			async stockInit() {
				let res = await getStock({
					goods_id: this.id
				});
				// console.log(res);
				if (!res.code && res.length > 0) {
					let color_data = []
					let stocks = []
					res.map(v => {
						color_data.push(v.color_id);
					})
					let color_ids = [...new Set(color_data)]
					color_ids.map(v => {
						stocks.push({
							color_id: v,
							quantity: 0,
							data: []
						})
					})
					res.map((v) => {
						v['quantity'] = 0
						stocks.map(v1 => {
							v1['quantity'] = 0
							if (v.color_id == v1.color_id) {
								v1['name'] = v.color.name
								v1.data.push(v)
							}
						})
					})
					stocks.map((v) => {
						v.data.map(v1 => {
							v1.goods_spec_info.map(v2 => {
								v1.quantity += Number(v2.stock)
								v.quantity += Number(v2.stock)
							})

						})
					})
					let goods_spec_info = res[0].goods_spec_info;
					let unincorporated = []
					goods_spec_info.map((v, i) => {
						if (v.store) {
							unincorporated.push({
								name: v.store.name,
								quantity: 0,
								data: []
							})
							stocks.map((v1, i1) => {
								unincorporated[i].data.push({
									name: v1.name,
									color_id: v1.color_id,
									quantity: 0,
									data: []
								})
								v1.data.map((v2, i2) => {
									v2.goods_spec_info.map((v3, i3) => {
										if (v.store_id == v3.store_id && v2.color_id == unincorporated[i].data[i1].color_id) {
											unincorporated[i].data[i1].data.push({
												quantity: v3.stock,
												name: v2.size.name
											})
											unincorporated[i].data[i1].quantity += Number(v3.stock)
											unincorporated[i].quantity += Number(v3.stock)
										}
									})
								})
							})
						}
					})
					stocks.map(v => {
						this.sum += v.quantity

					})
					this.nav_list[0].data[0] = unincorporated
					this.nav_list[0].data[1].push({
						name: '总库存',
						quantity: this.sum,
						data: stocks
					})
					this.nav_list[0].name = `总库存(${this.sum})`
				}
			},
			getServerData() {
				let Column = {
					"categories": [],
					"series": [{
						"name": "销售统计",
						"color": "#6094E8",
						"data": []
					}]
				}
				this.nav_list[1].data[1].map(v => {
					Column.categories.push(v.business_time)
					Column.series[0].data.push(Number(v.quantity).toFixed())
				})
				if(Column.categories.length==0){
					Column.categories.push(this.start_time)
				}
				_self.showColumn("canvasColumn", Column);
			},
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: {
						show: true
					},
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});

			},
			touchColumn(e) {
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
					}
				});
			},
		},
		onLoad(query) {
			// console.log(query);
			let date = this.$date.today()
			this.start_time = date.start_time
			this.end_time = date.end_time
			this.id = query.id;
			this.init(query.id)
			this.strored()
			this.stockInit()
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F2F2F2;
		overflow-x: hidden;
	}

	.getStock {
		width: 100%;
		height: 100%;
		background-color: #e7e7e7;
		display: flex;
		flex-direction: column;

		.qiun-charts {
			width: 750upx;
			height: 550upx;
			background-color: #FFFFFF;
		}

		.charts {
			width: 750upx;
			height: 550upx;
			background-color: #FFFFFF;
		}

		.right_icon {
			margin-right: 30rpx;
		}

		// 店铺弹框
		.pop {
			width: 100%;
			height: 100%;
			display: flex;
			// overflow-y: scroll;
			flex-direction: column;

			.pop-item {
				padding: 20rpx;
				border-bottom: 0.01rem solid #C0C0C0;
			}
		}

		.matter {
			display: flex;
			flex-direction: column;
			padding: 10rpx 20rpx;
			width: 100%;
			background-color: #FFFFFF;
			height: 628rpx;
			margin-bottom: 20rpx;

			.imgs {
				width: 100%;
				height: 188rpx;
				display: flex;

				.scroll-view_H {
					white-space: nowrap;
					width: 100%;

					.scroll-view-item_H {
						display: inline-block;
						padding: 0 10rpx;
					}
				}
			}

			.shopp-name {
				display: flex;
				// justify-content: center;
				align-items: center;
				flex-direction: row;
				width: 100%;
				margin: 20rpx 0;

				.sp-name {
					color: #000000;
					font-weight: 600;
					font-size: 30rpx;
					text-indent: 0.5em;
				}

				.sp-number {
					padding: 0 20rpx;
					font-size: 24rpx;
					color: #999999;
				}
			}

			.shopp-price {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: row;
				flex-wrap: wrap;
				margin-bottom: 10rpx;

				.price-name {
					width: 50%;
					text-indent: 0.5em;
					font-size: 24rpx;
					color: #999999;
					padding: 10rpx 0;
				}

				.yen {
					color: #DD524D;
				}
			}

			.shopp-color {
				display: flex;
				flex-direction: row;
				margin-bottom: 20rpx;

				.color-name {
					margin-right: 40rpx;
					border: 2rpx solid #007AFF;
					color: #007AFF;
					border-radius: 10rpx;
					font-size: 20rpx;
					width: 100rpx;
					text-align: center;
					// padding: 4rpx 20rpx;
				}

				.color-cont {}
			}

			.shopp-tconts {
				width: 100%;
				height: 100rpx;
				padding: 0 10rpx;
				background-color: #e7e7e7;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: row;
				flex-wrap: wrap;
				margin-bottom: 10rpx;

				.tconts {
					width: 50%;
					font-size: 24rpx;
					color: #999999;
				}
			}
		}

		.goods-data {
			width: 100%;
			height: 100vh;
			display: flex;
			flex-direction: column;
			background-color: #FFFFFF;

			.goods-main {
				position: relative;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;

				.nav {
					position: sticky;
					top: calc(84rpx + var(--status-bar-height));
					width: 100%;
					display: flex;
					flex-direction: column;
					z-index: 99;

					.active {
						color: #007AFF !important;
						border-bottom: 2rpx solid #007AFF !important;
					}

					.nav-item {
						width: 100%;
						display: flex;
						flex-direction: row;
						height: 80rpx;
						background-color: #FFFFFF;
						box-shadow: 1rpx 1rpx 4rpx #999999;

						.item {
							flex: 1;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}

					.nav-date {
						width: 100%;
						display: flex;
						flex-direction: row;
						height: 80rpx;
						background-color: #FFFFFF;

						.date {
							flex: 1;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}

					.box {
						width: 100%;
						display: flex;
						flex-direction: column;

						.box-item {
							width: 100%;
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;
							padding: 10rpx 20rpx;
							background-color: #FFFFFF;
							border-bottom: 0.01rem solid #E5E5E5;

							.left {
								color: #989898;
							}
						}
					}

					.store-select {
						width: 100%;
						height: 80%;
						padding: 20rpx 0;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #FFFFFF;

						.title_hd {
							display: flex;
							flex-direction: row;

							.tlt {
								padding: 0 10rpx;
								font-size: 30rpx;
								font-weight: 600;
							}
						}
					}
				}

				.goods-conts {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					position: sticky;
					top: calc(324rpx + var(--status-bar-height));

					.sotck-data {
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;

						.goods-item {
							width: 100%;
							display: flex;
							flex-direction: column;

							.goods-title {
								display: flex;
								width: 100%;
								flex-direction: row;
								justify-content: space-between;
								border-bottom: 0.01rem solid #E5E5E5;
								padding: 20rpx;

								.left {
									font-weight: 600;
								}

								.right {
									color: #007AFF;
								}
							}

							.goods-color {
								width: 100%;
								display: flex;
								flex-direction: column;

								.gd-row {
									display: flex;
									flex-direction: column;
									width: 100%;
									padding: 10rpx 20rpx;
									background-color: #FFFFFF;
									border-bottom: 0.01rem solid #E5E5E5;

									.gd-size {
										width: 100%;
										display: flex;
										flex-direction: row;
										justify-content: space-between;

										text {
											flex: 1;
										}

										.gd-l {
											text-align: left;
										}

										.gd-r {
											text-align: right;
										}

										.gd-center {
											text-align: center;
										}
									}
								}

								.gd-column {
									width: 100%;
									display: flex;
									flex-direction: column;
									border-bottom: 0.01rem solid #E5E5E5;

									.column-color {
										width: 100%;
										display: flex;
										flex-direction: row;
										justify-content: space-between;
										padding: 10rpx 20rpx;
										border-bottom: 0.01rem solid #E5E5E5;

										text {
											font-weight: 600;

											.hui {
												font-weight: 500 !important;
												margin-right: 10rpx;
												font-size: 24rpx;
											}
										}

									}

									.gd-size {
										width: 100%;
										display: flex;
										flex-direction: row;

										.column-size {
											width: 80rpx;
											display: flex;
											flex-direction: column;
											justify-content: center;
											align-items: center;

											text {
												padding: 6rpx 0;
											}
										}
									}
								}
							}
						}

						.sotck-nav {
							width: 100%;
							display: flex;
							background-color: #F1F2F7;
							flex-direction: row;
							padding: 10rpx 0;

							text {
								flex: 1;
								display: flex;
								justify-content: center;
								align-items: center;
							}

							.sotck-title {
								flex: 1;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;

								text {
									flex: 1;
									display: flex;
									justify-content: center;
									align-items: center;
									padding: 10rpx 0;
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
								}
							}
						}

						.sotck-sum {
							width: 100%;
							display: flex;
							flex-direction: row;
							padding: 20rpx 0;
							border-bottom: 0.01rem solid #E5E5E5;

							text {
								flex: 1;
								display: flex;
								justify-content: center;
								align-items: center;
							}

						}

						.sotck-item {
							width: 100%;
							display: flex;
							flex-direction: column;
							border-bottom: 0.01rem solid #E5E5E5;

							.sotck-size {
								width: 100%;
								display: flex;
								flex-direction: row;
								padding: 20rpx 0;

								text {
									flex: 1;
									display: flex;
									justify-content: center;
									align-items: center;
									font-weight: 600;
								}


							}

							.sotck-purchase {
								width: 100%;
								display: flex;
								flex-direction: row;
								justify-content: space-between;
								padding: 20rpx 20rpx 0 20rpx;
								background-color: #FFFFFF;
								border-bottom: 0.01rem solid #F1F1F1;

								.left {
									display: flex;
									flex-direction: column;

									text {
										color: #666666;
										padding-bottom: 10rpx;
										font-size: 24rpx;
									}

									.gray {
										color: #000000;
									}

								}

								.right {
									display: flex;
									flex-direction: row;
									color: #666666;

									.rg-data {
										display: flex;
										flex-direction: column;

										text {
											padding-bottom: 10rpx;
											font-size: 24rpx;
										}
									}
								}
							}
						}

						.chart {
							width: 100%;
							height: 550rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}

						.sales-nav {
							width: 100%;
							display: flex;
							flex-direction: row;
							padding: 20rpx;
							background-color: #F6F6F6;

							.sales-item {
								display: flex;
								flex-direction: column;
								flex: 1;
								
								text {
									flex: 1;
									display: flex;
									justify-content: center;
									align-items: center;
									white-space:nowrap;
									overflow:hidden;
									text-overflow:ellipsis;
									font-weight: 600;
									font-size: 26rpx;
								}
								.sales-td{
									font-size: 20rpx;
									padding-bottom: 10rpx;
									font-weight: 500;
								}
							}
						}

						.sales-list {
							display: flex;
							flex-direction: column;
							width: 100%;

							.sales-title {
								text-align: left;
								font-size: 30rpx;
								font-weight: 600;
								padding: 20rpx;
							}

							.list {
								width: 100%;
								display: flex;
								flex-direction: row;
								background-color: #FFFFFF;
								padding: 10rpx 0;

								text {
									flex: 1;
									display: flex;
									justify-content: center;
									align-items: center;
								}
							}

							.sales-t {
								background-color: #F6F6F6;
							}
						}
					}


				}
			}
		}
	}
</style>
