<template>
	<view class="grabble">
		<u-navbar back-icon-color='#ffffff' title="查询" :background="background" title-color="#ffffff">
			<template slot="right">
				<text class="icon_right" @click="clear">清空</text>
			</template>
		</u-navbar>
		<view class="box">
			<view class="form_item">
				<text>商品</text>
				<u-input placeholder='请输入货号/商品名称/条码' v-model="form.keyword" type="text" />
				<u-icon name="scan" @tap='handelScan' color="#2979ff" size="38"></u-icon>
			</view>
			<view class="form_item">
				<text>店铺</text>
				<u-input placeholder='请选择店铺' @click="toStore" :disabled='true' v-model="shop" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>分类</text>
				<u-input placeholder='请选择商品分类' @tap="toCategory" :disabled='true' v-model="category" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
		</view>
		<view class="box">
			<view class="form_item">
				<text>品牌</text>
				<u-input placeholder='请选择品牌' @tap="toTrademark" :disabled='true' type='text' v-model="trademark_name" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>年份</text>
				<u-input placeholder='请选择年份' @tap="toYear" :disabled='true' v-model="form.year" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<u-picker mode="time" v-model="showtime" @confirm="confirmTime" :params="params"></u-picker>
			<view class="form_item">
				<text>季节</text>
				<u-input placeholder='请选择季节' @tap="toSeason" :disabled='true' v-model="form.season" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<u-select v-model="showSeason" @confirm="confirm" :list="list"></u-select>
		</view>
		<view class="box">
			<view class="form_item">
				<text>显示零库存</text>
				<u-switch v-model="checked1" @change="warning" active-value="1" inactive-value="0"></u-switch>
			</view>
			<view class="form_item">
				<text>显示停用商品</text>
				<u-switch v-model="checked2" @change="warning1" active-value="1" inactive-value="0"></u-switch>
			</view>
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
				list: [{
						value: '1',
						label: '春'
					},
					{
						value: '2',
						label: '夏'
					},
					{
						value: '3',
						label: '秋'
					},
					{
						value: '4',
						label: '冬'
					}
				],
				params: {
					year: true,
					month: false,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				form: {
					keyword: '',
					year: '',
					supplier_id: '',
					store_id: 0,
					brand_id: '',
					goods_category_id: '',
					season: '',
					zero_stock: 0,
					show_ban_goods: 0,

				},
				supplier: '',
				shop: '',
				trademark_name: '',
				category: '',
				showSeason: false,
				showtime: false,
				checked1: false,
				checked2: false,
			}
		},
		methods: {
			// 点击选择年份
			toYear() {
				this.showtime = true;
			},
			// 点击选择季节
			toSeason() {
				this.showSeason = true;
			},
			// 时间返回fn
			confirmTime(v) {
				// console.log(v);
				this.form.year = v.year;
			},
			// 季节返回fn
			confirm(v) {
				this.form.season = v[0].label;
			},
			// 前往店铺
			toStore() {
				uni.navigateTo({
					url: '/pages/storeManagement/storeManagement?iq=1'
				})
			},
			// 品牌
			toTrademark() {
				uni.navigateTo({
					url: '/pages/trademark/trademark'
				})
			},
			// 前往商品管理页面
			toCategory() {
				uni.navigateTo({
					url: '/pages/category/category'
				})
			},
			// 是否显示零库存
			warning(v) {
				// console.log(v);
				this.form.zero_stock = Number(v);
			},
			// 是否显示停用商品
			warning1(v) {
				// console.log(v);
				this.form.show_ban_goods = Number(v);
			},
			// 清空
			clear() {
				this.form = {
					keyword: '',
					year: '',
					supplier_id: '',
					store_id: 0,
					brand_id: '',
					goods_category_id: '',
					season: '',
					zero_stock: 0,
					show_ban_goods: 0,
				}
				this.shop = ''
				this.supplier = ''
				this.trademark_name = ''
				this.category = ''
				this.checked1 = false
				this.checked2 = false
			},
			// 确认
			sure(){
				let obj = {
					form:this.form,
					shop:this.shop,
					supplier:this.supplier,
					trademark_name:this.trademark_name ,
					category:this.category 
				}
				this.$store.commit('stockFn', {
					stockDate: obj
				})
				uni.$emit('grabble',obj)
				uni.navigateBack()
			}
		},
		onLoad() {
			if (store.state.store.store_id > 0) {
				this.form.store_is = store.state.store.store_id;
				this.shop = store.state.store.name
			}
			let bl = false
			for(let key in store.state.stockDate){
				if(key == 'form' && store.state.stockDate[key] != undefined){
					bl = true
				}
			}
			if(bl){
				this.$nextTick(function(){
				this.trademark_name = store.state.stockDate.trademark_name;
				this.category = store.state.stockDate.category;
				this.supplier = store.state.stockDate.supplier;
				this.shop =store.state.stockDate.shop;
				this.form = store.state.stockDate.form;
				if(this.form.zero_stock == 1){
					this.checked1 = true
				}
				if(this.form.show_ban_goods == 1){
					this.checked2 = true
				}
				})
			}
			
			// 店铺
			uni.$on("gloEvent", (res) => {
				if (res) {
					
					this.form.store_id = res.id
					this.shop = res.name
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
		}
	}
</script>

<style scoped lang="scss">
	.grabble {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		align-items: center;

		.icon_right {
			margin-right: 30rpx;
			color: #FFFFFF;
		}

		.btn {
			width: 90%;
			height: 80rpx;
			background-color: #007AFF;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10rpx;
		}

		.box {
			margin-bottom: 20rpx;
			width: 100%;

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

	}
</style>
