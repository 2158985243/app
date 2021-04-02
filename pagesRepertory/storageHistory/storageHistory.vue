<template>
	<view class="storageHistory">
		<u-navbar back-icon-color='#ffffff' title="采购入库" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="tags" color="#ffffff" class="right_icon" size="34"></u-icon>
				<u-icon name="plus" @click="toPurchaseStorage" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="box">
			<view class="form_item">
				<text>入库单号</text>
				<u-input placeholder=' ' :disabled='true' v-model="form.number" type="number" />
			</view>
			<view class="form_item">
				<text>业务时间</text>
				<u-input placeholder=' ' :disabled='true' v-model="form.business_time" type="text" />
			</view>
			<view class="form_item" >
				<text>供应商</text>
				<u-input placeholder=' ' :disabled='true' v-model="form.supplier.name" type='text' />
			</view>
			<view class="form_item" >
				<text>店铺</text>
				<u-input placeholder=' ' :disabled='true' v-model="form.store.name" type='text' />
			</view>
		</view>
		<!--  -->
		<view class="shopping-boxs" v-if="shopping.length>0">
			<view class="select">
				<view class="left">
					<text class="gg">已选货品</text>
					<text>{{numberUnits}}件</text>
				</view>
				<view class="right">
					&yen;{{goodsAmount}}
				</view>
			</view>
			<view class="shopping-cart" v-for="(item,index) in shopping" :key="index">
				<view class="headers" v-if="item.goodsData[0]">
					<u-image width="140rpx" height="140rpx" mode='aspectFit' border-radius='20' :src="$imgFn(item.goodsData[0].goodsOf.main_image)"></u-image>
					<view class="substance">
						<view class="goodsNews">
							<text class="goods-name">{{item.goodsData[0].goodsOf.name}}</text>
							<text class="goods-number">{{item.goodsData[0].goodsOf.number}}</text>
							<text class="goods-money">&yen;{{item.goodsData[0].goodsOf.purchase_price}}</text>
						</view>
					</view>
				</view>
				<view class="" v-for="(itemColor,indexColor) in item.goodsData" :key="indexColor">
					<view class="sp-color-size" v-if="itemColor.quantity>0">
						<view class="shopp-color">
							<text class="color-name">{{itemColor.name}}</text>
							<text class="color-mn" v-if="goodsMoney[index]">&yen;{{goodsMoney[index].moneys[indexColor]}}</text>
							<text class="color-quantity">x{{itemColor.quantity}}</text>
						</view>
						<view class="sp-size-name-quantity">
							<view class="sp-size" v-for="(itemSizeName,indexSizeName) in itemColor.data" :key="indexSizeName">
								<text class="sp-size-name" v-if="itemSizeName.quantity>0">{{itemSizeName.size.name}}</text>
							</view>
						</view>
						<view class="sp-size-name-quantity">
							<view class="sp-size" v-for="(itemSizeQuantity,indexSizeQuantity) in itemColor.data" :key="indexSizeQuantity">
								<text class="sp-size-quantity" v-if="itemSizeQuantity.quantity>0">{{itemSizeQuantity.quantity}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--  -->
		<view class="box">
			<view class="form_item">
				<text>优惠金额</text>
				<u-input placeholder=' ' :disabled='true' v-model="form.discount_amount" type="number" />
			</view>
			<view class="form_item">
				<text>其他金额</text>
				<u-input placeholder=' ' :disabled='true' v-model="form.other_expense" type="number" />
			</view>
			<view class="form_item">
				<text>应付金额</text>
				<u-input placeholder=' ' :disabled='true' v-model="form.goods_amount" type='number' />
			</view>
			<view class="form_item">
				<text>付款账户</text>
				<u-input placeholder=' ' :disabled='true' v-model="form.store_account.name" type="text" />
			</view>
			<view class="form_item">
				<text>实付金额</text>
				<u-input placeholder=' ' :disabled='true' v-model="form.pay_money" type="number" />
			</view>
		</view>
		<view class="box marbottom">
			<view class="form_item">
				<text>制单人</text>
				<u-input placeholder=' ' :disabled='true' v-model="form.user.name" type="text" />
			</view>
			<view class="form_item">
				<text>备注</text>
				<u-input placeholder=' ' :disabled='true' v-model="form.remarks" type="text" />
			</view>
			
		</view>
		
		<view class="btns">
			<view class="cancellation" @click="cancellation">
				作废
			</view>
			<view class="stamp" @click="stamp">
				打印
			</view>
		</view>
	</view>
</template>

<script>
	import {
		purchaseStorageCancel,
		purchaseStorage,
	} from '../../api/purchaseStorage.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				form:{
					number:'',
					business_time:'',
					supplier:{},
					discount_amount:'',
					other_expense:'',
					goods_amount:'',
					store_account:{},
					pay_money:'',
					user:{},
					store:{},
					remarks:'',
				},
				id:0,
				shopping:[],
				goodsMoney:[],
				goodsAmount:0,
				numberUnits:0
				
			}
		},
		methods: {
			// 初始化
			async init(){
				let res = await purchaseStorage(this.id);
				this.form = res;
				console.log(res);
				// this.$forceUpdate()
				let arr = []
				res.goods.map((v, i) => {
					arr.push({
						goodsData: []
					});
					v.color.map((v1, i1) => {
						arr[i].goodsData.push({
							data: [],
							goodsOf: {
								id: v.id,
								images: v.images,
								main_image: v.main_image,
								name: v.name,
								number: v.number,
								purchase_price: v.purchase_price,
								retail_price: v.retail_price
							},
							goods_category_id: v.goods_category_id,
							goods_id: v.id,
							id: v1.id,
							name: v1.name,
							quantity: 0,
							valNew: 0,
							valOld: 0
						})
					})
				
				});
				res.goods.map((v, i) => {
					arr[i].goodsData.map((v1, i1) => {
						v.goods_spec.map((v2, i2) => {
							if (v2.color_id == v1.id) {
								v1.data.push({
									goods_spec_info: v2.goods_spec_info,
									hidden: true,
									quantity: 0,
									size: v2.size,
									id: 0
								})
							}
						})
				
					})
					arr[i].goodsData.map((v1, i1) => {
						res.purchase_goods.map((v2, i2) => {
							if (v1.id == v2.color_id && v1.goods_id == v2.goods_id) {
								v1.data.map((v3, i3) => {
									if (v3.size.id == v2.size_id) {
										v3.quantity = v2.quantity;
										v3.id = v2.id;
										v1.quantity += v3.quantity;
										v3['price'] = v2.price
									}
								})
							}
				
						})
						this.goodsMoney.push({
							moneys: []
						})
						this.goodsMoney[i].moneys.push(v1.data[0].price)
				
					})
				});
				arr.map((v, i) => {
					this.goodsMoney.push({
						moneys: []
					})
					v.goodsData.map((v1, i1) => {
						this.goodsAmount += (Number(v1.goodsOf.purchase_price) * v1.quantity);
						this.goodsMoney[i].moneys.push(v1.goodsOf.purchase_price);
						this.numberUnits += v1.quantity;
					})
				})
				this.shopping = arr;
			},
			// 作废
			 cancellation(){
				 let _this = this
				uni.showModal({
					title: '提示',
					content: '采购入库单是否作废？',
					success:async function(res) {
						if (res.confirm) {
							let res = await purchaseStorageCancel(_this.id);
							if(!res.code){
								// uni.navigateTo({
								// 	url: `/pages/libraryHistory/libraryHistory`
								// })
								uni.$emit('purchaseStorage',true)
								uni.navigateBack()
							}
						} else if (res.cancel) {
							return true;
						}
					}
				});
				
			},
			// 打印
			stamp(){
				console.log('点击了打印');
			},
			// 前往增加采购信息
			toPurchaseStorage() {
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: []
				})
				this.$store.commit('stateGoodFn', {
					stateGood: false
				})
				uni.navigateTo({
					url: `/pagesRepertory/purchaseStorage/purchaseStorage`
				})
			},
		},
		onLoad(query) {
			this.id = query.id;
		},
		onShow() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
.storageHistory{
	width: 100%;
	// height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #f2f1f5;
	.right_icon {
		margin-right: 30rpx;
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
	.marbottom{
		margin-bottom: 80rpx;
	}
	.btns{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		color: #FFFFFF;
		.cancellation{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #808080;
		}
		.stamp{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #0389ff;
		}
	}
	.shopping-boxs {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		.select{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content:space-between;
			height: 85rpx;
			align-items: center;
			background-color: #FFFFFF;
			border-bottom: 0.01rem solid #C0C0C0;
			.left{
				display: flex;
				flex-direction: row;
				.gg{
					display: block;
					width: 220rpx;
					color: #007AFF;
					padding-left: 20rpx;
				}
			}
			.right{
					padding-right: 20rpx;
				color: #DD524D;
			}
		}
		.shopping-cart {
			width: 100%;
			display: flex;
			flex-direction: column;
	
			.sp-color-size {
				width: 100%;
				display: flex;
				flex-direction: column;
	
				.shopp-color {
					position: relative;
					width: 100%;
					display: flex;
					flex-direction: row;
					background-color: #FFFFFF;
					border-bottom: 0.01rem solid #e6e6e6;
	
					.color-name {
						display: block;
						text-align: center;
						padding: 16rpx 20rpx;
						font-weight: 600;
					}
	
					.color-mn {
						display: block;
						text-align: center;
						padding: 16rpx 20rpx;
						color: #DD524D;
					}
	
					.color-quantity {
						position: absolute;
						right: 20rpx;
						top: 16rpx;
						font-weight: 600;
					}
				}
	
				.sp-size-name-quantity {
					width: 100%;
					display: flex;
					background-color: #FFFFFF;
					border-bottom: 0.01rem solid #e6e6e6;
				}
	
				.sp-size {
					display: flex;
					flex-direction: row;
	
					.sp-size-name {
						display: block;
						text-align: center;
						padding: 16rpx 0;
						width: 80rpx;
					}
	
					.sp-size-quantity {
						display: block;
						text-align: center;
						padding: 16rpx 0;
						width: 80rpx;
					}
				}
			}
	
			.headers {
				width: 100%;
				display: flex;
				flex-direction: row;
				background-color: #FFFFFF;
				padding: 10rpx;
				border-bottom: 0.01rem solid #e6e6e6;
	
				.close {
					width: 40rpx;
					height: 40rpx;
					padding: 10rpx 20rpx 0 0;
				}
	
				.substance {
					width: 100%;
					display: flex;
					flex-direction: row;
	
					.goodsNews {
						display: flex;
						flex-direction: column;
						padding-left: 20rpx;
	
						.goods-number {
							color: #C0C0C0;
							font-size: 20rpx;
							margin-top: 10rpx;
						}
	
						.goods-money {
							color: #ff0000;
							font-size: 28rpx;
							margin-top: 10rpx;
						}
	
						.goods-inventory {
							color: #C0C0C0;
							font-size: 20rpx;
							margin-top: 10rpx;
						}
					}
				}
			}
	
		}
	}
}
</style>
