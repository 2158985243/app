<template>
	<view class="stockEnquiries">
		<u-navbar back-icon-color='#ffffff' title="采购查询" :background="background" title-color="#ffffff">
			<template slot="right">
				<text class="right_icon" @click="clear">清空</text>
			</template>
		</u-navbar>
		<view class="box">
			<view class="form_item">
				<text>商品</text>
				<u-input placeholder='请输入货号/商品名称/条码' v-model="form.keyword" type="text" />
				<u-icon name="scan" @click='handelScan' color="#2979ff" size="38"></u-icon>
			</view>
			<view class="form_item">
				<text>供应商</text>
				<u-input placeholder='请选择供应商' @click="toChooseSupplier" :disabled='true' v-model="supplier" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>店铺</text>
				<u-input placeholder='请选择店铺' @click="toStore" :disabled='true' v-model="shop" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>品牌</text>
				<u-input placeholder='请选择品牌' @click="toTrademark" :disabled='true' type='text' v-model="trademark_name" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>分类</text>
				<u-input placeholder='请选择商品分类' @click="toCategory" :disabled='true' v-model="category" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>单据类型</text>
				<u-input placeholder='' @click="show = true" :disabled='true' v-model="itemType" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
		</view>
		<u-popup v-model="show" mode="center" width="60%">
			<view class="list">
				<view v-for="(item,index) in types" :key="index" class="li" @click="clickLi(item)">
					{{item.name}}
				</view>
			</view>
		</u-popup>
		<view class="box">
			<view class="form_item">
				<text>开始日期</text>
				<u-input placeholder='请选择时间' @click="hiddenTime(0)" :disabled='true' v-model="form.start_time" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<u-picker mode="time" v-model="showtime" @confirm="confirmTime" :params="params"></u-picker>
			<view class="form_item">
				<text>结束日期</text>
				<u-input placeholder='请选择时间' @click="hiddenTime(1)" :disabled='true' v-model="form.end_time" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<u-picker mode="time" v-model="showtime1" @confirm="confirmTime1" :params="params"></u-picker>
		</view>
		<view class="btn" @click="sure">
			确认
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				form: {
					keyword: '',
					start_time: '',
					supplier_id: '',
					store_ids: [],
					brand_id: '',
					goods_category_id: '',
					type: 0,

				},
				supplier: '',
				shop: '',
				trademark_name: '',
				category: '',
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				showtime: false,
				showtime1: false,
				show: false,
				itemType: '全部',
				types: [{
						name: '全部',
						type: 2
					},
					{
						name: '采购入库',
						type: 0
					},
					{
						name: '采购退货',
						type: 1
					},
				]
			}
		},
		methods: {
			// 清空
			clear() {
				this.form.keyword = ''
				this.form.supplier_id = ''
				this.form.store_ids = []
				this.form.brand_id = ''
				this.form.goods_category_id = ''
				this.supplier = ''
				this.shop = ''
				this.trademark_name = ''
				this.category = ''
			},
			// 
			clickLi(item) {
				this.form.type = item.type;
				this.itemType = item.name;
				this.show = false
			},
			sure() {
				uni.$emit('stockEnquiries', this.form)
				uni.navigateBack()
			},
			handelScan() {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						// console.log('条码内容：' + res.result);
						// this.keyword = res.result;
						this.form.keyword = res.result
					}
				});
			},
			// 打开选择时间
			hiddenTime(v) {
				if (v) {
					this.showtime1 = true;
				} else {
					this.showtime = true;
				}
			},
			// 选择时间
			confirmTime(v) {
				this.form.start_time = `${v.year}-${v.month}-${v.day}`;
			},
			// 选择时间
			confirmTime1(v) {
				this.form.end_time = `${v.year}-${v.month}-${v.day}`;
			},
			// 前往店铺
			toStore() {
				uni.navigateTo({
					url: '/pagesMine/storeManagementSelect/storeManagementSelect'
				})
			},
			// 品牌
			toTrademark() {
				uni.navigateTo({
					url: '/pagesRepertory/trademark/trademark'
				})
			},
			// 前往商品管理页面
			toCategory() {
				uni.navigateTo({
					url: '/pagesRepertory/category/category'
				})
			},
			// 供应商
			toChooseSupplier() {
				uni.navigateTo({
					url: '/pagesRepertory/chooseSupplier/chooseSupplier'
				})
			},
		},
		
		onLoad() {
			let date = this.$date.thirtyDays()
			this.form.start_time = date.start_time;
			this.form.end_time = date.end_time;
			if (store.state.store.store_id > 0) {
				this.store_id = store.state.store.store_id;
				this.shop = store.state.store.name
			}
			// 供应商
			uni.$on("supplierDatum", (res) => {
				if (res) {
					this.form.supplier_id = res.id;
					this.supplier = res.name;
				}
			});
			// 店铺
			uni.$on("gloEvent", (res) => {
				if (res) {
					this.form.store_ids = []
					let arr = []
					let ids = []
					res.map(v => {
						arr.push(v.name);
						ids.push(v.id);
					})
					this.form.store_ids = ids
					this.shop = arr.join(',')
				}
			});
			// 品牌
			uni.$on("trademarkDatum", (res) => {
				if (res) {
					this.form.brand_id = res.id;
					this.trademark_name = res.name;
				}
			});
			// 分类
			uni.$on("categoryDatum", (res) => {
				if (res) {
					console.log(res);
					this.form.goods_category_id = res.id;
					this.category = res.name;
				}
			});
		},
		onUnload() {
			uni.$off("supplierDatum")
			uni.$off("gloEvent")
			uni.$off("trademarkDatum")
			uni.$off("categoryDatum")
		},
	}
</script>

<style scoped lang="scss">
	.stockEnquiries {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;

		.right_icon {
			margin-right: 30rpx;
			color: #FFFFFF;
		}

		.list {
			display: flex;
			width: 100%;
			flex-direction: column;

			.li {
				padding: 20rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 0.01rem solid #E5E5E5;
			}
		}

		.box {
			margin-bottom: 20rpx;

			.form_item {
				padding-right: 20rpx;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
				margin-bottom: 2rpx;
				height: 85rpx;

				text {
					width: 220rpx;
					// text-align: left;
					padding-left: 20rpx;
				}

				.min_exchange {
					width: 150rpx;
				}

				.set {
					width: 80rpx;
					color: #2979ff;
				}

				.border_bt {
					border-bottom: 0.01rem solid #C0C0C0;
				}

				.man_r {
					border-left: 0.01rem solid #e3e3e3;
					padding: 28rpx 15rpx 28rpx 30rpx;
					// margin: 0 auto;
				}

			}

			.bottoms {
				margin-bottom: 80rpx;
			}

			.form_item2 {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 20rpx;
				background-color: #FFFFFF;
				height: 85rpx;

				text {
					color: #2979ff;

				}
			}

			.form_item3 {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 2rpx;
				background-color: #FFFFFF;
				height: 85rpx;
				margin-bottom: 70rpx;

				text {
					color: #2979ff;

				}
			}

			.box1 {
				margin-bottom: 20rpx;

				.form_item1 {
					padding-right: 20rpx;
					display: flex;
					align-items: center;
					background-color: #FFFFFF;
					margin-bottom: 2rpx;
					height: 280rpx;

					/deep/.u-add-tips {
						margin-top: 0;
					}

					text {
						width: 180rpx;
						// text-align: left;
						padding-left: 20rpx;
					}

					/deep/.u-delete-icon {
						top: 0;
						right: 0;
						width: 28rpx;
						height: 28rpx;
					}
				}
			}
		}

		.btn {
			width: 80%;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80rpx;
			color: #FFFFFF;
			background-color: #007AFF;
			margin: 0 auto;
			margin-top: 20rpx;
			border-radius: 10rpx;
		}
	}
</style>
