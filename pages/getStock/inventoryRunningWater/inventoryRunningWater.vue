<template>
	<view class="inventoryRunningWater">
		<u-navbar back-icon-color='#ffffff' title="库存流水" :background="background" title-color="#ffffff">
			<template slot="right">
				<text class="right_icon">清空</text>
			</template>
		</u-navbar>
		<view class="box">
			<view class="box-item">
				<text class="title">店铺<text class="red">*</text></text>
				<view class="input-w">
					<u-input placeholder='请选择店铺' height='50' @click="toStore" :disabled='true' v-model="store_name"
						type="text" />
				</view>
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="box-item">
				<text class="title">商品<text class="red">*</text></text>
				<view class="input-w">
					<u-input placeholder='请选择商品' @click='selectProducts' height='50' :disabled='true'
						v-model="goods_name" type="text" />
				</view>
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="box-item">
				<text class="title">颜色</text>
				<view class="box-list">
					<view class="box-item" v-for="(item,index) in form.colors" :key="index"
						:class="item.checked? 'active':''" @click="clickColor(item,index)">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="box-item">
				<text class="title">尺码</text>
				<view class="box-list">
					<view class="box-item" v-for="(item,index) in form.sizes" :key="index"
						:class="item.checked? 'active':''" @click="clickSize(item,index)">
						{{item.name}}
					</view>
				</view>
			</view>

		</view>

		<view class="btn" @click="sure">
			确认
		</view>
	</view>
</template>

<script>
	import {
		getStockLog
	} from '../../../api/goods.js'
	export default {
		data() {
			return {
				store_name: '',
				goods_name: '',
				background: {
					backgroundColor: '#2979ff'
				},
				form: {
					
					colors: [],
					sizes: [],
				},
				obj:{
					goods_id: 0,
					store_id: 0,
					color_ids:[],
					size_ids:[]
				}
			}
		},
		methods: {
			// 点击颜色
			clickColor(item, index) {
				item.checked = !item.checked
				this.$forceUpdate()
			},
			// 点击尺码
			clickSize(item, index) {
				item.checked = !item.checked
				this.$forceUpdate()
			},
			// 前往店铺
			toStore() {
				uni.navigateTo({
					url: '/pages/storeManagement/storeManagement?iq=1'
				})
			},
			// 商品
			selectProducts() {
				
				uni.navigateTo({
					url: '/pages/selectProducts/selectProducts?condition=1&stockLog=1'
				})
			},
			// 确认
			sure() {
				this.form.colors.map(v=>{
					if(v.checked){
						this.obj.color_ids.push(v.id)
					}
				})
				this.form.sizes.map(v=>{
					if(v.checked){
						this.obj.size_ids.push(v.id)
					}
				})
				
				let item = {
					obj:this.obj,
					goodsof:{
						name:this.form.name,
						number:this.form.number,
						store_name:this.store_name,
						main_image:this.form.main_image,
						colors:this.form.colors,
						sizes:this.form.sizes
					}
				}
				uni.navigateTo({
					url:`/pages/getStock/inventoryRunningWaterList/inventoryRunningWaterList?item=`+ encodeURIComponent(JSON.stringify(item))
				})
			}
			// async init() {
			// 	let res = await getStockLog(this.form)
			// 	console.log(res);
			// }
		},
		onLoad(option) {
			let query = JSON.parse(decodeURIComponent(option.item));
			console.log(query.colors);
			query.colors.map(v => {
				v['checked'] = false
			})
			query.sizes.map(v => {
				v['checked'] = false
			})
			this.form = query
			this.store_name = this.form.store_name
			this.goods_name = this.form.name + ' ' + this.form.number
			
			this.obj.goods_id = query.goods_id
			this.obj.store_id = query.store_id
			
			uni.$on("gloEvent", (res) => {
				if (res) {
					this.obj.store_id = res.id
					this.store_name = res.name
				}
			})
			uni.$on("stockLog", (res) => {
				if (res) {
					this.goods_name = res.name +' ' +res.number
					 this.form.name = res.name
					 this.form.number = res.number
					this.obj.goods_id = res.goods_id
				}
			})
			// this.init()
		},
		onUnload() {
			uni.$off()
		},
	}
</script>

<style scoped lang="scss">
	.inventoryRunningWater {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 30rpx;
			color: #FFFFFF;
		}

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;

			.box-item {
				width: 100%;
				padding: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				border-bottom: 0.01rem solid #E5E5E5;

				.title {
					width: 180rpx;

					.red {
						color: #FF5A5F;
					}
				}

				.input-w {
					width: calc(100vw - 204rpx);
				}

				.box-list {
					width: calc(100vw - 180rpx);
					display: flex;
					flex-wrap: wrap;

					.box-item {
						width: 120rpx;
						height: 70rpx;
						border: 1rpx solid #C8C7CC;
						color: #C8C7CC;
						border-radius: 10rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 26rpx;
						margin-right: 10rpx;
						margin-bottom: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.active {
						background-color: #007AFF !important;
						color: #FFFFFF !important;
					}
				}
			}
		}

		.btn {
			width: 100%;
			height: 80rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #007AFF;
			color: #FFFFFF;
			position: fixed;
			bottom: 0;
		}

	}
</style>
