<template>
	<view class="details">

		<view class="matter">
			<!--  -->
			<cus-previewImg ref="cusPreviewImg" :circular="true" :duration="400" :list="ImgList" />
			<view class="imgs">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
					<u-image width="180rpx" height="180rpx" border-radius="20rpx" @click='previewImg($cfg.domain+item)' class="scroll-view-item_H"
					 :src="$imgFn(item)" v-for="(item,index) in oracle.images"></u-image>
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
					<view class="store-select">
						<view class="title_hd" @click="show = true">
							<text class="tlt">{{title_name}}</text>
							<u-icon name="arrow-down-fill" class="down" color="#2979ff" size="34"></u-icon>
						</view>
					</view>
					<view class="nav-date" v-if="item_active == 1">
						<view class="date" v-for='(item,index) in date_list' @click="dateClick(index)" :class="date_active==index? 'active':''">
							<text>{{item.name}}</text>
						</view>
					</view>

				</view>
				<!-- 内容 -->
				<view class="goods-conts">
					<view class="sotck-data" v-if="item_active==0">
						<view class="sotck-nav">
							<text>颜色</text>
							<text>尺码</text>
							<text>销售数量</text>
							<text>库存数量</text>
						</view>
						<view class="sotck-sum">
							<text>合计</text>
							<text></text>
							<text>{{sales_sum}}</text>
							<text>{{stock_sum}}</text>
						</view>
						<view class="sotck-item" v-for="(item,index) in nav_list[0].data" :key="index">
							<view class="sotck-size" v-for="(itemColor,indexColor) in item.data" :key="indexColor">
								<text v-if="indexColor==0">{{itemColor.color.name}}</text>
								<text v-else></text>
								<text>{{itemColor.size.name}}</text>
								<text>{{itemColor.sales}}</text>
								<text>{{itemColor.stock}}</text>
							</view>
							</block>
						</view>
					</view>
					<view class="sotck-data" v-if="item_active==1">
						<view class="sotck-nav">
							<text>颜色</text>
							<text>尺码</text>
							<text>销售数量</text>
							<text>进货数量</text>
						</view>
						<view class="sotck-sum">
							<text>合计</text>
							<text></text>
							<text>{{in_number}}</text>
							<text>{{out_number}}</text>
						</view>
						<view class="sotck-item" v-for="(item,index) in nav_list[1].data" :key="index">
							<view class="sotck-size" v-for="(itemColor,indexColor) in item.data" :key="indexColor">
								<text v-if="indexColor==0">{{itemColor.color.name}}</text>
								<text v-else></text>
								<text>{{itemColor.size.name}}</text>
								<text>{{itemColor.sales}}</text>
								<text>{{itemColor.purchase}}</text>
							</view>
							</block>
						</view>
					</view>
					<view class="sotck-data" v-if="item_active==2">
						<view class="related-nav">
							<text>关联商品</text>
							<text>搭配次数</text>
						</view>
						<view class="related" v-for="(item,index) in nav_list[2].data" :key="index">
							<view class="left">
								<u-image width="100rpx" height="100rpx" border-radius="14rpx" class="" :src="$imgFn(item.goods.main_image)"></u-image>
								<view class="lf-item">
									<text>{{item.goods.name}}</text>
									<text>{{item.goods.number}}</text>
								</view>
							</view>
							<view class="right">
								<text>{{item.times}}</text>
							</view>
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
	import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
	import {
		goods,
		getStock,
		getRadio,
		getRelatedGoods
	} from '../../../api/goods.js'

	import {
		countsDetails
	} from '../../../api/allocate.js'
	import {
		counts
	} from '../../../api/salesOrder.js'
	import store from '@/store'
	export default {
		components: {
			cusPreviewImg
		},
		data() {
			return {
				ImgList: [],
				background: {
					backgroundColor: '#2979ff'
				},
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
				nav_list: [{
						name: '库销比',
						data: []
					},
					{
						name: '进销比',
						data: []
					},
					{
						name: '关联款',
						data: []
					}
				],
				date_list: [{
						name: '7天'
					},
					{
						name: '15天'
					},
					{
						name: '30天'
					},
					{
						name: '全部'
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
				//采购
				money: '',
				number_sum: '',
				price: '',
				total: '',
				// 调拨
				total_2: '',
				out_number: 0,
				in_number: 0,
				// 销售
				total_3: {},

				item_active: 0,
				date_active: 0,
				title_name: '',
			}
		},
		methods: {
			previewImg(url) { // 点击预览图片
				this.$refs.cusPreviewImg.open(url) // 传入当前选中的图片地址
			},
			// 点模式
			async itemClick(index) {
				this.item_active = index;
				if (index == 1 ) {
					let res = await getRadio({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,
					})
					let color_data = []
					let stocks = []
					this.out_number=0;
					this.in_number=0;
					res.map(v => {
						color_data.push(v.color_id);
						this.out_number += Number(v.purchase)
						this.in_number += Number(v.sales)
					})
					this.out_number.toFixed()
					this.in_number.toFixed()
					let color_ids = [...new Set(color_data)]
					color_ids.map(v => {
						stocks.push({
							color_id: v,
							data: []
						})
					})
					res.map((v) => {
						stocks.map(v1 => {
							if (v.color_id == v1.color_id) {
								v1['name'] = v.color.name
								v1.data.push(v)
							}
						})
					})
					this.nav_list[index].data = stocks
				} else if (index == 2) {
					let res = await getRelatedGoods({
						...this.form,
					})
					this.nav_list[index].data = res
				}
			},
			// 点时间
			async dateClick(index) {
				this.date_active = index;
				if (index == 0) {
					let date = this.$date.sevenDays()
					this.start_time = date.start_time
					this.end_time = date.end_time
					let res = await getRadio({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,

					})
					this.out_number=0;
					this.in_number=0;
					let color_data = []
					let stocks = []
					res.map(v => {
						color_data.push(v.color_id);
						this.out_number += Number(v.purchase)
						this.in_number += Number(v.sales)
					})
					this.out_number.toFixed()
					this.in_number.toFixed()
					let color_ids = [...new Set(color_data)]
					color_ids.map(v => {
						stocks.push({
							color_id: v,
							data: []
						})
					})
					res.map((v) => {
						stocks.map(v1 => {
							if (v.color_id == v1.color_id) {
								v1['name'] = v.color.name
								v1.data.push(v)
							}
						})
					})
					this.nav_list[index].data = stocks
				} else if (index == 1) {
					let date = this.$date.halfMonth()
					this.start_time = date.start_time
					this.end_time = date.end_time
					let res = await getRadio({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,

					})
					this.out_number=0;
					this.in_number=0;
					let color_data = []
					let stocks = []
					res.map(v => {
						color_data.push(v.color_id);
						this.out_number += Number(v.purchase)
						this.in_number += Number(v.sales)
					})
					this.out_number.toFixed()
					this.in_number.toFixed()
					let color_ids = [...new Set(color_data)]
					color_ids.map(v => {
						stocks.push({
							color_id: v,
							data: []
						})
					})
					res.map((v) => {
						stocks.map(v1 => {
							if (v.color_id == v1.color_id) {
								v1['name'] = v.color.name
								v1.data.push(v)
							}
						})
					})
					this.nav_list[index].data = stocks

				} else if (index == 2) {
					let date = this.$date.thirtyDays()
					this.start_time = date.start_time
					this.end_time = date.end_time
					let res = await getRadio({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,

					})
					this.out_number=0;
					this.in_number=0;
					let color_data = []
					let stocks = []
					res.map(v => {
						color_data.push(v.color_id);
						this.out_number += Number(v.purchase)
						this.in_number += Number(v.sales)
					})
					this.out_number.toFixed()
					this.in_number.toFixed()
					let color_ids = [...new Set(color_data)]
					color_ids.map(v => {
						stocks.push({
							color_id: v,
							data: []
						})
					})
					res.map((v) => {
						stocks.map(v1 => {
							if (v.color_id == v1.color_id) {
								v1['name'] = v.color.name
								v1.data.push(v)
							}
						})
					})
					this.nav_list[index].data = stocks

				} else if (index == 3) {
					let res = await getRadio({
						...this.form,
					})
					let color_data = []
					let stocks = []
					res.map(v => {
						color_data.push(v.color_id);
						this.out_number += Number(v.purchase)
						this.in_number += Number(v.sales)
					})
					this.out_number=0;
					this.in_number=0;
					this.out_number.toFixed()
					this.in_number.toFixed()
					let color_ids = [...new Set(color_data)]
					color_ids.map(v => {
						stocks.push({
							color_id: v,
							data: []
						})
					})
					res.map((v) => {
						stocks.map(v1 => {
							if (v.color_id == v1.color_id) {
								v1['name'] = v.color.name
								v1.data.push(v)
							}
						})
					})
					this.nav_list[index].data = stocks
				}
			},

			// 滑动
			scroll(e) {
				// console.log(e);
			},
			// 添加商品
			toAddCommodity() {
				uni.navigateTo({
					url: `/pagesRepertory/addCommodity/addCommodity`
				})
			},
			// 编辑商品
			toEditCommodity() {
				uni.navigateTo({
					url: `/pagesRepertory/editCommodity/editCommodity?id=${this.id}`
				})
			},
			async init(v) {
				let res = await goods(v)
				this.oracle = res;
				this.oracle.images.unshift(this.oracle.main_image)
				let colorArr = [];
				let sizeArr = [];
				this.ImgList = []
				this.oracle.color.map((v, i) => {
					colorArr.push(v.name)
				})
				this.oracle.size.map((v, i) => {
					sizeArr.push(v.name)
				})
				this.oracle.images.map(v => {
					this.ImgList.push(this.$cfg.domain + v)
				})
				this.colorName = colorArr.join('/')
				this.sizeName = sizeArr.join('/')
			},
			// 店铺数组
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
				this.show = false;
				this.title_name = item.label;
				this.form.store_id = item.value;
				if (this.item_active == 0) {
					let res = await getStock(this.form);
					let color_data = []
					let stocks = []
					res.map(v => {
						color_data.push(v.color_id);
						this.stock_sum += Number(v.stock)
						this.sales_sum += Number(v.sales)
					})
					this.stock_sum.toFixed()
					this.sales_sum.toFixed()
					let color_ids = [...new Set(color_data)]
					color_ids.map(v => {
						stocks.push({
							color_id: v,
							data: []
						})
					})
					res.map((v) => {
						stocks.map(v1 => {
							if (v.color_id == v1.color_id) {
								v1['name'] = v.color.name
								v1.data.push(v)
							}
						})
					})
					this.nav_list[0].data = stocks
				} else if (this.item_active == 1) {
					let res = await getRadio({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,
					})
					this.out_number=0;
					this.in_number=0;
					let color_data = []
					let stocks = []
					res.map(v => {
						color_data.push(v.color_id);
						this.out_number += Number(v.purchase)
						this.in_number += Number(v.sales)
					})
					this.out_number.toFixed()
					this.in_number.toFixed()
					let color_ids = [...new Set(color_data)]
					color_ids.map(v => {
						stocks.push({
							color_id: v,
							data: []
						})
					})
					res.map((v) => {
						stocks.map(v1 => {
							if (v.color_id == v1.color_id) {
								v1['name'] = v.color.name
								v1.data.push(v)
							}
						})
					})
					this.nav_list[1].data = stocks
				} else if (this.item_active == 2) {
					let res = await getRelatedGoods({
						...this.form,
					})
					this.nav_list[2].data = res
				}
			},
			// 库存
			async stockInit() {
				let res = await getStock(this.form);
				let color_data = []
				let stocks = []
				res.map(v => {
					color_data.push(v.color_id);
					this.stock_sum += Number(v.stock)
					this.sales_sum += Number(v.sales)
				})
				this.stock_sum.toFixed()
				this.sales_sum.toFixed()
				let color_ids = [...new Set(color_data)]
				color_ids.map(v => {
					stocks.push({
						color_id: v,
						data: []
					})
				})
				
				res.map((v) => {
					stocks.map(v1 => {
						if (v.color_id == v1.color_id) {
							v1['name'] = v.color.name
							v1.data.push(v)
						}
					})
				})
				this.nav_list[0].data = stocks
			},
		},
		onLoad(query) {
			let date = this.$date.today()
			this.start_time = date.start_time
			this.end_time = date.end_time
			this.id = query.id;
			this.strored()
			this.stockInit()
		},
		onShow() {
			this.init(this.id)
		}
	}
</script>

<style lang="scss" scoped>
	.details {
		width: 100%;
		height: 100vh;
		background-color: #e7e7e7;
		display: flex;
		flex-direction: column;

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

		.right_icon {
			margin-right: 20rpx;
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
					top: 0;
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
						// margin-bottom: 10rpx;
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
						background-color: #F4F7FF;

						.date {
							flex: 1;
							display: flex;
							justify-content: center;
							align-items: center;
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
					display: flex;
					flex-direction: column;
					position: sticky;
					top: calc(164rpx + var(--status-bar-height));
					.sotck-data {
						width: 100%;
						display: flex;
						flex-direction: column;

						.related-nav {
							width: 100%;
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							padding: 20rpx;
							font-weight: 600;
							border-top: 0.01rem solid #E5E5E5;
						}

						.related {
							display: flex;
							flex-direction: row;
							width: 100%;
							justify-content: space-between;
							padding: 10rpx 20rpx;
							border-bottom: 0.01rem solid #E5E5E5;

							.left {
								display: flex;
								flex-direction: row;
								// justify-content: center;
								align-items: center;

								.lf-item {
									display: flex;
									flex-direction: column;
									margin-left: 20rpx;

									text {
										padding: 10rpx 0;
									}
								}
							}

							.right {
								display: flex;
								flex-direction: row;
								align-items: center;
								margin-right: 20rpx;
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

					}


				}
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
				background-color: #F6F6F6;
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
					color: #8f8f8f;
				}
			}
		}


	}
</style>
