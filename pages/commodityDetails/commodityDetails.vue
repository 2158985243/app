<template>
	<view class="commodityDetails">
		<u-navbar back-icon-color='#ffffff' title="商品详情" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen" @click="toEditCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
				<u-icon name="plus" @click="toAddCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="matter">
			<!--  -->
			<cus-previewImg ref="cusPreviewImg" :circular="true" :duration="400" :list="ImgList" />
			<view class="imgs">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
					<u-image width="180rpx" height="180rpx" border-radius="20rpx" @click='previewImg($cfg.domain+item)' class="scroll-view-item_H"
					 :src="$imgFN(item)" v-for="(item,index) in oracle.images"></u-image>
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
					<view class="store-select">
						<view class="title_hd" @click="show = true">
							<text class="tlt">{{title_name}}</text>
							<u-icon name="arrow-down-fill" class="down" color="#2979ff" size="34"></u-icon>
						</view>
					</view>
				</view>
				<!-- 内容 -->
				<view class="goods-conts">
					<view class="sotck-data" v-show="item_active==0">
						<view class="sotck-nav">
							<text>颜色</text>
							<text>尺码</text>
							<text>总销售数</text>
							<text>库存数</text>
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
					<view class="sotck-data" v-show="item_active==1">
						<view class="sotck-nav">
							<view class="sotck-title">
								<text>笔数</text>
								<text>{{total||0}}</text>
							</view>
							<view class="sotck-title">
								<text>数量</text>
								<text>{{number_sum||0}}</text>
							</view>
							<view class="sotck-title">
								<text>进阶</text>
								<text>{{price||0}}</text>
							</view>
							<view class="sotck-title">
								<text>金额</text>
								<text>{{money||0}}</text>
							</view>
						</view>
						<view class="sotck-item">
							<view class="sotck-purchase" @click="toHaveToReturn1(item)" v-for="(item,index) in nav_list[1].data" :key="index">
								<view class="left">
									<text>单号：<text class='gray'>{{item.number}}</text></text>
									<text class="min-size">数量：<text class='gray'>{{item.quantity}}</text></text>
									<text class="min-size">{{item.updated_time}}</text>
								</view>
								<view class="right">
									<view class="rg-data">
										<text>{{item.supplier_name}}</text>
										<text class="min-size">进价：{{item.price}}</text>
										<text class="min-size">金额：<text class="red">{{Number(item.price)*Number(item.quantity)}}</text></text>
									</view>
									<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
								</view>
							</view>
						</view>
					</view>
					<view class="sotck-data" v-show="item_active==2">
						<view class="sotck-nav">
							<view class="sotck-title">
								<text>笔数</text>
								<text>{{total_2||0}}</text>
							</view>
							<view class="sotck-title">
								<text>调出数量</text>
								<text>{{out_number||0}}</text>
							</view>
							<view class="sotck-title">
								<text>调入数量</text>
								<text>{{in_number||0}}</text>
							</view>
						</view>
						<view class="sotck-item">
							<view class="sotck-purchase" @click="toHaveToReturn2(item)" v-for="(item,index) in nav_list[2].data" :key="index">
								<view class="left">
									<text>单号：<text class='gray'>{{item.number}}</text></text>
									<text class="min-size">数量：<text class='gray'>{{item.out_quantity}}</text></text>
									<text class="min-size">{{item.updated_at}}</text>
								</view>
								<view class="right">
									<view class="rg-data">
										<text class="min-size">调出店铺：{{item.from_store.name}}</text>
										<text class="min-size">调入店铺：{{item.to_store.name}}</text>
									</view>
									<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
								</view>
							</view>
						</view>
					</view>
					<view class="sotck-data" v-show="item_active==3">
						<view class="sotck-nav">
							<view class="sotck-title">
								<text>笔数</text>
								<text>{{total_3.total_counts||0}}</text>
							</view>
							<view class="sotck-title">
								<text>数量</text>
								<text>{{total_3.total_quantity||0}}</text>
							</view>
							<view class="sotck-title">
								<text>进价</text>
								<text>{{total_3.total_counts>0? total_3.purchase_price:0}}</text>
							</view>
							<view class="sotck-title">
								<text>售价</text>
								<text>{{total_3.sale_price||0}}</text>
							</view>
							<view class="sotck-title">
								<text>金额</text>
								<text>{{total_3.total_money||0}}</text>
							</view>
							<view class="sotck-title">
								<text>毛利</text>
								<text>{{total_3.total_counts>0?(Number(total_3.purchase_price)-Number(total_3.sale_price)).toFixed(2):0}}</text>
							</view>
						</view>
						<view class="sotck-item">
							<view class="sotck-purchase" @click="toHaveToReturn3(item)" v-for="(item,index) in nav_list[3].data" :key="index">
								<view class="left">
									<text>单号：<text class='gray'>{{item.trade_no}}</text></text>
									<text class="min-size">单价数量：<text class='gray'>&yen;{{item.price}}*{{item.quantity}}</text></text>
									<text class="min-size">{{item.updated_at}}</text>
								</view>
								<view class="right">
									<view class="rg-data">
										<text class="min-size">毛利：&yen;{{((Number(item.price)-Number(item.purchase_price))*Number(item.quantity)).toFixed(2)}}</text>
										<text class="min-size">金额：&yen;{{(Number(item.price)*Number(item.quantity)).toFixed(2)}}</text>
									</view>
									<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
								</view>
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
	import store from '@/store'
	import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
	import {
		goods,
		getStock
	} from '../../api/goods.js'
	import {
		countDetails
	} from '../../api/purchaseStorage.js'
	import {
		countsDetails
	} from '../../api/allocate.js'
	import {
		counts
	} from '../../api/salesOrder.js'
	export default {
		components: {
			cusPreviewImg
		},
		data() {
			return {
				ImgList: [],
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
				background: {
					backgroundColor: '#2979ff'
				},
				oracle: {},
				title_name: '',
				colorName: '',
				sizeName: '',
				id: 0,
				item_active: 0,
				date_active: 0,
				nav_list: [{
						name: '库存',
						data: []
					},
					{
						name: '采购',
						data: []
					},
					{
						name: '调拨',
						data: []
					},
					{
						name: '销售',
						data: []
					}
				],
				date_list: [{
						name: '今天'
					},
					{
						name: '昨天'
					},
					{
						name: '7天'
					},
					{
						name: '30天'
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
				//采购
				money: '',
				number_sum: '',
				price: '',
				total: '',
				// 调拨
				total_2: '',
				out_number: '',
				in_number: '',
				// 销售
				total_3: {},
			}
		},
		methods: {
			previewImg(url) { // 点击预览图片
				this.$refs.cusPreviewImg.open(url) // 传入当前选中的图片地址
			},
			// 点模式
			async itemClick(index) {
				this.item_active = index;
				if (index == 1 && this.nav_list[index].data.length == 0) {
					let res = await countDetails({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,
						page: 1,
						page_size: 20
					})
					this.total = res.total;
					this.money = 0;
					this.number_sum = 0;
					res.data.map((v) => {
						this.money += Number(v.price) * Number(v.quantity)
						this.number_sum += Number(v.quantity)
						this.price = Number(v.price)
					})
					this.nav_list[1].data = res.data
				} else if (index == 2 && this.nav_list[index].data.length == 0) {
					let res = await countsDetails({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,
						page: 1,
						page_size: 20
					})
					this.total_2 = res.total;
					this.out_number = 0;
					this.in_number = 0;
					res.data.map((v) => {
						this.out_number += Number(v.out_quantity)
						this.in_number += Number(v.in_quantity)
					})
					this.nav_list[2].data = res.data
				} else if (index == 3 && this.nav_list[index].data.length == 0) {
					let res = await counts({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,
						page: 1,
						page_size: 20
					})
					this.total_3 = res.total;
					this.nav_list[3].data = res.list.data
				}
			},
			// 点时间
			async dateClick(index) {
				this.date_active = index;
				if (index == 0) {
					let date = this.$date.today()
					this.start_time = date.start_time
					this.end_time = date.end_time
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
						let res = await countDetails({
							...this.form,
							start_time: this.start_time,
							end_time: this.end_time,
							page: 1,
							page_size: 20
						})
						this.total = res.total;
						this.money = 0;
						this.number_sum = 0;
						res.data.map((v) => {
							this.money += Number(v.price) * Number(v.quantity)
							this.number_sum += Number(v.quantity)
							this.price = Number(v.price)
						})
						this.nav_list[1].data = res.data
					} else if (this.item_active == 2) {
						let res = await countsDetails({
							...this.form,
							start_time: this.start_time,
							end_time: this.end_time,
							page: 1,
							page_size: 20
						})
						this.total_2 = res.total;
						this.out_number = 0;
						this.in_number = 0;
						res.data.map((v) => {
							this.out_number += Number(v.out_quantity)
							this.in_number += Number(v.in_quantity)
						})
						this.nav_list[2].data = res.data
					} else if (this.item_active == 3) {
						let res = await counts({
							...this.form,
							start_time: this.start_time,
							end_time: this.end_time,
							page: 1,
							page_size: 20
						})
						this.total_3 = res.total;
						this.nav_list[3].data = res.list.data
					}
				} else if (index == 1) {
					let date = this.$date.yesterday()
					this.start_time = date.start_time
					this.end_time = date.end_time
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
						let res = await countDetails({
							...this.form,
							start_time: this.start_time,
							end_time: this.end_time,
							page: 1,
							page_size: 20
						})
						this.total = res.total;
						this.money = 0;
						this.number_sum = 0;
						res.data.map((v) => {
							this.money += Number(v.price) * Number(v.quantity)
							this.number_sum += Number(v.quantity)
							this.price = Number(v.price)
						})
						this.nav_list[1].data = res.data
					} else if (this.item_active == 2) {
						let res = await countsDetails({
							...this.form,
							start_time: this.start_time,
							end_time: this.end_time,
							page: 1,
							page_size: 20
						})
						this.total_2 = res.total;
						this.out_number = 0;
						this.in_number = 0;
						res.data.map((v) => {
							this.out_number += Number(v.out_quantity)
							this.in_number += Number(v.in_quantity)
						})
						this.nav_list[2].data = res.data
					} else if (this.item_active == 3) {
						let res = await counts({
							...this.form,
							start_time: this.start_time,
							end_time: this.end_time,
							page: 1,
							page_size: 20
						})
						this.total_3 = res.total;
						this.nav_list[3].data = res.list.data
					}
				} else if (index == 2) {
					let date = this.$date.sevenDays()
					this.start_time = date.start_time
					this.end_time = date.end_time
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
						let res = await countDetails({
							...this.form,
							start_time: this.start_time,
							end_time: this.end_time,
							page: 1,
							page_size: 20
						})
						this.total = res.total;
						this.money = 0;
						this.number_sum = 0;
						res.data.map((v) => {
							this.money += Number(v.price) * Number(v.quantity)
							this.number_sum += Number(v.quantity)
							this.price = Number(v.price)
						})
						this.nav_list[1].data = res.data
					} else if (this.item_active == 2) {
						let res = await countsDetails({
							...this.form,
							start_time: this.start_time,
							end_time: this.end_time,
							page: 1,
							page_size: 20
						})
						this.total_2 = res.total;
						this.out_number = 0;
						this.in_number = 0;
						res.data.map((v) => {
							this.out_number += Number(v.out_quantity)
							this.in_number += Number(v.in_quantity)
						})
						this.nav_list[2].data = res.data
					} else if (this.item_active == 3) {
						let res = await counts({
							...this.form,
							start_time: this.start_time,
							end_time: this.end_time,
							page: 1,
							page_size: 20
						})
						this.total_3 = res.total;
						this.nav_list[3].data = res.list.data
					}
				} else if (index == 3) {
					let date = this.$date.thirtyDays()
					this.start_time = date.start_time
					this.end_time = date.end_time
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
						let res = await countDetails({
							...this.form,
							start_time: this.start_time,
							end_time: this.end_time,
							page: 1,
							page_size: 20
						})
						this.total = res.total;
						this.money = 0;
						this.number_sum = 0;
						res.data.map((v) => {
							this.money += Number(v.price) * Number(v.quantity)
							this.number_sum += Number(v.quantity)
							this.price = Number(v.price)
						})
						this.nav_list[1].data = res.data
					} else if (this.item_active == 2) {
						let res = await countsDetails({
							...this.form,
							start_time: this.start_time,
							end_time: this.end_time,
							page: 1,
							page_size: 20
						})
						this.total_2 = res.total;
						this.out_number = 0;
						this.in_number = 0;
						res.data.map((v) => {
							this.out_number += Number(v.out_quantity)
							this.in_number += Number(v.in_quantity)
						})
						this.nav_list[2].data = res.data
					} else if (this.item_active == 3) {
						let res = await counts({
							...this.form,
							start_time: this.start_time,
							end_time: this.end_time,
							page: 1,
							page_size: 20
						})
						this.total_3 = res.total;
						this.nav_list[3].data = res.list.data
					}
				} else if (index == 4) {
					this.showtime = true;
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
					let res = await countDetails({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,
						page: 1,
						page_size: 20
					})
					this.total = res.total;
					this.money = 0;
					this.number_sum = 0;
					res.data.map((v) => {
						this.money += Number(v.price) * Number(v.quantity)
						this.number_sum += Number(v.quantity)
						this.price = Number(v.price)
					})
					this.nav_list[1].data = res.data
				} else if (this.item_active == 2) {
					let res = await countsDetails({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,
						page: 1,
						page_size: 20
					})
					this.total_2 = res.total;
					this.out_number = 0;
					this.in_number = 0;
					res.data.map((v) => {
						this.out_number += Number(v.out_quantity)
						this.in_number += Number(v.in_quantity)
					})
					this.nav_list[2].data = res.data
				} else if (this.item_active == 3) {
					let res = await counts({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,
						page: 1,
						page_size: 20
					})
					this.total_3 = res.total;
					this.nav_list[3].data = res.list.data
				}
			},
			// 滑动
			scroll(e) {
				// console.log(e);
			},
			// 添加商品
			toAddCommodity() {
				this.$store.commit('colorDaAction', {
					colorDa: []
				});
				this.$store.commit('sizerDaAction', {
					sizerDa: []
				});
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
			// 初始化
			async init(v) {
				let res = await goods(v)
				if (!res.code) {
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
				}
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
					let res = await countDetails({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,
						page: 1,
						page_size: 20
					})
					this.total = res.total;
					this.money = 0;
					this.number_sum = 0;
					res.data.map((v) => {
						this.money += Number(v.price) * Number(v.quantity)
						this.number_sum += Number(v.quantity)
						this.price = Number(v.price)
					})
					this.nav_list[1].data = res.data
				} else if (this.item_active == 2) {
					let res = await countsDetails({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,
						page: 1,
						page_size: 20
					})
					this.total_2 = res.total;
					this.out_number = 0;
					this.in_number = 0;
					res.data.map((v) => {
						this.out_number += Number(v.out_quantity)
						this.in_number += Number(v.in_quantity)
					})
					this.nav_list[2].data = res.data
				} else if (this.item_active == 3) {
					let res = await counts({
						...this.form,
						start_time: this.start_time,
						end_time: this.end_time,
						page: 1,
						page_size: 20
					})
					this.total_3 = res.total;
					this.nav_list[3].data = res.list.data
				}
				this.show = false;
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
			// 前往编辑采购退货
			toHaveToReturn2(item) {
				uni.navigateTo({
					url: `/pages/salesOrderDetails/salesOrderDetails?id=${item.id}`
				})
			},
			// 前往编辑采购退货
			toHaveToReturn1(item) {
				if (item.type == 0) {
					uni.navigateTo({
						url: `/pages/storageHistory/storageHistory?id=${item.id}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/haveToReturn/haveToReturn?id=${item.id}`
					})
				}
			},
			// 前往编辑采购退货
			toHaveToReturn3(item) {
				uni.navigateTo({
					url: `/pages/stopAllocate/stopAllocate?id=${item.id}`
				})
			},
		},
		onLoad(query) {
			// console.log(query);
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
	.commodityDetails {
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
						margin-bottom: 10rpx;
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
					top: calc(324rpx + var(--status-bar-height));

					.sotck-data {
						width: 100%;
						display: flex;
						flex-direction: column;

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
