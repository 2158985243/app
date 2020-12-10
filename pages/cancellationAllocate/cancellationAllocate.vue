<template>
	<view class="cancellationAllocate">
		<u-navbar back-icon-color='#ffffff' title="库存调拨" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="tags" color="#ffffff" class="right_icon" size="34"></u-icon>
				<u-icon name="plus" @click="toallocate" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<!-- <view class="mains"> -->

		<view class="box">
			<view class="form_item">
				<text>调拨单号</text>
				<u-input placeholder='' :disabled='true' v-model="form.number" type="number" />
			</view>
			<view class="form_item">
				<text>业务时间</text>
				<u-input placeholder='' :disabled='true' v-model="form.business_time" type="text" />
			</view>
			<view class="form_item">
				<text>调出店铺</text>
				<u-input placeholder='' :disabled='true' v-model="form.from_store.name" type='text' />
			</view>
			<view class="form_item">
				<text>调入店铺</text>
				<u-input placeholder='' :disabled='true' v-model="form.to_store.name" type='text' />
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
					<u-image width="140rpx" height="140rpx" mode='aspectFit' border-radius='20' :src="$cfg.domain+item.goodsData[0].goodsOf.main_image"></u-image>
					<view class="substance">
						<view class="goodsNews">
							<text class="goods-name">{{item.goodsData[0].goodsOf.name}}</text>
							<text class="goods-number">{{item.goodsData[0].goodsOf.number}}</text>
							<text class="goods-money">&yen;{{item.goodsData[0].goodsOf.retail_price}}</text>
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
			<!-- </view> -->
			<!--  -->
			<view class="box marbottom">
				<view class="form_item">
					<text>制单人</text>
					<u-input placeholder='' :disabled='true' v-model="form.user.name" type="text" />
				</view>
				<view class="form_item">
					<text>备注</text>
					<u-input placeholder='' :disabled='true' v-model="form.remarks" type="text" />
				</view>

			</view>
		</view>
		<view class="btns">
			<view class="stamp" @click="stamp">
				打印
			</view>
		</view>
		<view class="logo">
			已作废
		</view>
	</view>
</template>

<script>
	import {
		allocateCancel,
		allocate,
	} from '../../api/allocate.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				form: {
					number: '',
					business_time: '',
					from_store: {},
					to_store: {},
					user: {},
					remarks: '',
				},
				id: 0,
				shopping: [],
				goodsMoney: [],
				goodsAmount: 0,
				numberUnits: 0

			}
		},
		methods: {
			// 初始化
			async init() {
				let res = await allocate(this.id);
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
						res.allocate_goods.map((v2, i2) => {
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
						this.goodsAmount += (Number(v1.goodsOf.retail_price) * v1.quantity);
						this.goodsMoney[i].moneys.push(v1.goodsOf.retail_price);
						this.numberUnits += v1.quantity;
					})
				})
				this.shopping = arr;
			},
			// 作废
			cancellation() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '采购入库单是否作废？',
					success: async function(res) {
						if (res.confirm) {
							let res = await allocateCancel(_this.id);
							if (!res.code) {
								uni.navigateTo({
									url: `/pages/allocate/allocate`
								})
							}
						} else if (res.cancel) {
							return true;
						}
					}
				});

			},
			// 打印
			stamp() {
				console.log('点击了打印');
			},
			// 前往增加采购信息
			toallocate() {
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: []
				})
				this.$store.commit('stateGoodFn', {
					stateGood: false
				})
				uni.navigateTo({
					url: `/pages/addAllocate/addAllocate`
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
	.cancellationAllocate {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f2f1f5;
		
		.logo{
			width: 180rpx;
			height: 60rpx;
			line-height: 60rpx;
			position: fixed;
			margin: auto;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border: 1rpx solid #DD524D;
			color: #DD524D;
			font-size: 26rpx;
			text-align: center;
			transform:rotate(-45deg);
			background-color: rgba(255, 0, 0, 0.1);
		}
		// .mains{
		// 	width: 100%;
		// 	display: flex;
		// 	flex-direction: column;
		// }
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

		.marbottom {
			margin-bottom: 80rpx;
		}

		.btns {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 80rpx;
			display: flex;
			flex-direction: row;
			color: #FFFFFF;

			.cancellation {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #808080;
			}

			.stamp {
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

			.select {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				height: 85rpx;
				align-items: center;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #C0C0C0;

				.left {
					display: flex;
					flex-direction: row;

					.gg {
						display: block;
						width: 220rpx;
						color: #007AFF;
						padding-left: 20rpx;
					}
				}

				.right {
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
