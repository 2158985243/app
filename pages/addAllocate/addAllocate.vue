<template>
	<view class="addAllocate">
		<view class="mains">
			<view class="box">
				<view class="form_item">
					<text>调出店铺</text>
					<u-input placeholder='请选择调出店铺' @click="toStore(0)" :disabled='true' v-model="from_store_name" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<view class="form_item">
					<text>调入店铺</text>
					<u-input placeholder='请选择调入店铺' @click="toStore(1)" :disabled='true' v-model="to_store_name" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>

			<view class="jump">
				<view class="scan">
					扫条码
				</view>
				<view class="select-goods" @click="selectProducts">
					选商品
				</view>
			</view>
			<view class="shopping-boxs" v-if="shopping.length>0">
				<view class="shopping-cart" v-for="(item,index) in shopping" :key="index">
					<view class="headers" v-if="item.goodsData[0]">
						<u-image width="140rpx" height="140rpx" mode='aspectFit' border-radius='20' :src="$cfg.domain+item.goodsData[0].goodsOf.main_image"></u-image>
						<view class="substance" @click="showgd(item,index)">
							<view class="goodsNews">
								<text class="goods-name">{{item.goodsData[0].goodsOf.name}}</text>
								<text class="goods-number">{{item.goodsData[0].goodsOf.number}}</text>
								<text class="goods-money">&yen;{{item.goodsData[0].goodsOf.retail_price}}</text>
							</view>
						</view>
						<u-icon name="trash" class='close' @click="delgoods(index)" color="#a8a8a8" size="40"></u-icon>
					</view>
					<view class="" v-for="(itemColor,indexColor) in item.goodsData" :key="indexColor">
						<view class="sp-color-size" v-if="itemColor.quantity>0">
							<view class="shopp-color">
								<text class="color-name">{{itemColor.name}}</text>
								<text class="color-mn" v-if="goodsMoney[index]">&yen;{{goodsMoney[index].moneys[indexColor]}}</text>
								<!-- <u-icon name="edit-pen-fill" @click="showAmend(index,indexColor)" color="#a8a8a8" size="40"></u-icon> -->
								<text class="color-quantity">x{{itemColor.quantity}}</text>
							</view>
							<view class="sp-size-name-quantity">
								<view class="sp-size" v-for="(itemSizeName,indexSizeName) in itemColor.data" :key="indexSizeName">
									<text class="sp-size-name">{{itemSizeName.size.name}}</text>
								</view>
							</view>
							<view class="sp-size-name-quantity">
								<view class="sp-size" v-for="(itemSizeQuantity,indexSizeQuantity) in itemColor.data" :key="indexSizeQuantity">
									<text class="sp-size-quantity">{{itemSizeQuantity.quantity}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="box ">
				<view class="form_item">
					<text>业务时间</text>
					<u-input placeholder='请选择时间' @tap="hiddenTime" :disabled='true' v-model="form.business_time" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<u-picker mode="time" v-model="showtime" @confirm="confirmTime" :default-time="form.business_time" :params="params"></u-picker>
				<view class="form_item">
					<text>备注</text>
					<u-input v-model="form.remarks" type="text" />
				</view>
			</view>

			<view class="foot">
				<view class="total">
					合计：{{numberUnits}}件<text class="orgin-money"> &yen;{{goodsAmount}}</text>
				</view>
				<view class="sub">
					<view class="btnon1" @click="save(0)">
						草稿
					</view>
					<view class="btnon2" @click="save(1)">
						保存
					</view>
				</view>
			</view>
			<!-- 商品规格 -->
			<u-popup v-model="showGoods" mode="bottom" z-index='996' height="70%">
				<view class="specification">
					<view class="goods-of" v-if="goodsDetails[0]">
						<!-- mode='aspectFit'  -->
						<u-image width="140rpx" height="140rpx" border-radius='20' :src="$cfg.domain+goodsDetails[0].goodsOf.main_image"></u-image>
						<view class="goodsNews">
							<text class="goods-name">{{goodsDetails[0].goodsOf.name}}</text>
							<text class="goods-number">{{goodsDetails[0].goodsOf.number}}</text>
							<text class="goods-money">&yen;{{goodsDetails[0].goodsOf.retail_price}}</text>
						</view>
					</view>
					<u-line color="#e6e6e6" />

					<view class="goods-color">
						<text>颜色</text>
						<view class="colors">
							<view class="colorMo" v-for="(item,index) in goodsDetails" :key="index" @click="clickColor(item,index)" :class="active1==index? 'active':''">
								<text>{{item.name}}</text>
								<text class="pos" v-if="item.quantity>0">{{item.quantity}}</text>
							</view>
						</view>
					</view>
					<!-- <u-line color="inof" /> -->
					<view class="goods-size">
						<view class="" v-for="(item,index) in goodsDetails" :key="index">
							<view class="size-box" v-if="index==active1">
								<view class="size-box-list once">
									<text class="listed">尺码</text>
									<text class="listed">当前库存</text>
									<u-number-box class="listed" v-model="item.valNew" size="24" input-width="60" input-height="40" :min="0"
									 @change="valChangeAll($event,item,index)"></u-number-box>
								</view>
								<view class="size-box-list" v-for="(item1,index1) in item.data" :key="index1">
									<text class="listed">{{item1.size.name}}</text>
									<text class="listed" v-if="item1.goods_spec_info">{{item1.goods_spec_info.stock}}</text>
									<u-number-box class="listed" v-model="item1.quantity" size="24" input-width="60" input-height="40" :min="0"
									 @change="valChange($event,index,index1)"></u-number-box>
								</view>
							</view>
						</view>

					</view>

					<view class="btn">
						<u-button type="primary" class="btn" @tap="sure()">确定</u-button>
					</view>
				</view>
			</u-popup>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	import {
		allocateAdd
	} from '../../api/allocate.js'
	export default {
		data() {
			return {
				showGoods: false,
				showtime: false,
				showGreen: false,
				showOrgin: false,
				showMoney: false,
				indexbox: {
					index: 0,
					indexColor: 0
				},
				greenVal: 0,
				orginVal: 0,
				amendMoney: 0,
				showgdMoney: 0,
				supplier: '',
				shop: '',
				account: '',
				arrears: 0,
				form: {
					status: 0,
					from_store_id: 0,
					to_store_id: 0,
					business_time: 0,
					goods: [],
					remarks: ''
				},
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},

				shopping: [],
				goodsMoney: [],
				goodsAmount: 0,
				numberUnits: 0,
				goodsDetails: {},
				active1: 0,
				listindex: 0,
				from_store_name: '',
				to_store_name: '',
				store_from_to: false
			}
		},
		methods: {

			// 选择时间
			confirmTime(v) {
				this.form.business_time = `${v.year}-${v.month}-${v.day}`;
			},

			hiddenTime() {
				this.showtime = true;
			},
			// 前往店铺
			toStore(v) {
				this.store_from_to = false;
				if (v) {
					this.store_from_to = true;
				}
				uni.navigateTo({
					url: '/pages/storeManagement/storeManagement?iq=1'
				})
			},
			// 前往选择商品
			selectProducts() {
				if (!store.state.stateGood) {
					this.$store.commit('commercialSpecification', {
						specificationOfGoods: []
					})
				}
				uni.navigateTo({
					url: '/pages/selectProducts/selectProducts'
				})
			},
			// 优惠价格确定
			ensure(v) {
				if (!v) {
					this.form.discount_amount = this.greenVal;
					this.showGreen = false;
				} else {
					this.form.other_expense = this.orginVal;
					this.showOrgin = false;
				}
			},
			// 优惠价格取消
			abrogate(v) {
				if (!v) {
					this.showGreen = false;
				} else {
					this.showOrgin = false;
				}
			},
			// 修改价格确定
			ensured() {
				this.goodsMoney[this.indexbox.index].moneys[this.indexbox.indexColor] = this.amendMoney
				this.goodsAmount = 0;
				this.shopping.map((v, i) => {
					v.goodsData.map((v1, i1) => {
						this.goodsAmount += (this.goodsMoney[i].moneys[i1] * v1.quantity);
					})
				})
				this.goodsAmount = this.goodsAmount.toFixed(2)
				this.showMoney = false;
			},
			// 修改价格取消
			abrogated() {
				this.showMoney = false;
			},
			// 显示修改价格弹框
			showAmend(index, indexColor) {
				this.indexbox = {
					index: index,
					indexColor: indexColor
				};
				this.amendMoney = this.goodsMoney[index].moneys[indexColor];
				this.showMoney = true;
			},

			// 初始化商品数量
			selecGooded() {
				let _this = this
				this.$nextTick(function() {
					_this.shopping = store.state.specificationOfGoods;
					_this.goodsMoney = [];
					_this.goodsAmount = 0;
					_this.numberUnits = 0;
					_this.shopping.map((v, i) => {
						_this.goodsMoney.push({
							moneys: []
						})
						v.goodsData.map((v1, i1) => {
							_this.goodsAmount += (Number(v1.goodsOf.retail_price) * v1.quantity);
							_this.goodsMoney[i].moneys.push(v1.goodsOf.retail_price);
							_this.numberUnits += v1.quantity;
						})
						_this.$set(_this.shopping, i, _this.shopping[i])
					})
					// console.log(this.goodsMoney);
					_this.goodsAmount = _this.goodsAmount.toFixed(2)
				})
			},
			// 删除商品
			delgoods(index) {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确定移除该商品吗？',
					success: function(res) {
						if (res.confirm) {
							_this.shopping.splice(index, 1);
							_this.$store.commit('commercialSpecification', {
								specificationOfGoods: _this.shopping
							})
							_this.selecGooded()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 显示商品分类
			async showgd(item, index) {
				this.listindex = index;
				// console.log(item);
				this.goodsDetails = JSON.parse(JSON.stringify(item.goodsData));
				this.showGoods = true;
			},
			// 全部尺码数量变化
			valChangeAll(val, item, index) {
				item.data.map((v, i) => {
					v.quantity = v.quantity + (val.value - item.valOld);
				});
				item.valOld = item.valNew;
				this.$set(this.goodsDetails, index, this.goodsDetails[index])
			},
			// 个别尺码数量变化
			valChange(v, index, index1) {
				let _this = this
				_this.goodsDetails[index].quantity = 0;
				_this.goodsDetails[index].data.map((v, i) => {
					_this.goodsDetails[index].quantity += v.quantity;
				})
				_this.$set(_this.goodsDetails, index, _this.goodsDetails[index])
			},
			// 商品分类确定
			sure() {
				this.shopping[this.listindex].goodsData = this.goodsDetails;
				this.goodsAmount = 0;
				this.numberUnits = 0;
				this.shopping.map((v, i) => {
					v.goodsData.map((v1, i1) => {
						this.goodsAmount += (this.goodsMoney[i].moneys[i1] * v1.quantity);
						this.numberUnits += v1.quantity;
					})
				})
				this.goodsAmount = this.goodsAmount.toFixed(2)
				this.showGoods = false;
			},
			// 点击商品颜色
			clickColor(item, index) {
				this.active1 = index;
			},
			// 保存
			async save(v) {
				if (this.form.from_store_id == 0) {
					this.$refs.uToast.show({
						title: '请选择调出店铺'
					})
				} else if (this.form.to_store_id == 0) {
					this.$refs.uToast.show({
						title: '请选择调入店铺',
					})
				} else if (this.shopping.length == 0) {
					this.$refs.uToast.show({
						title: '请选择商品',
					})
				} else {
					this.form.status = v;
					this.form.goods = []
					this.shopping.map((v, i) => {
						v.goodsData.map((v1, i1) => {
							if (v1.quantity > 0) {
								v1.data.map((v2, i2) => {
									this.form.goods.push({
										goods_id: v1.goodsOf.id,
										color_id: v1.id,
										size_id: v2.size.id,
										quantity: v2.quantity,
										price: this.goodsMoney[i].moneys[i1]
									})
								})
							}
						})
					})
					let res = await allocateAdd(this.form);
					if (!res.code) {
						uni.navigateTo({
							url: `/pages/allocate/allocate`
						})
					}
				}
			},
		},
		onLoad() {
			let date = new Date();
			this.form.business_time = this.$u.timeFormat(date, 'yyyy-mm-dd');
			this.form.from_store_id = store.state.store.store_id;
			this.from_store_name = store.state.store.name

			uni.$on("gloEvent", (res) => {
				if (res) {
					// console.log(res);
					if (this.store_from_to) {
						this.to_store_name = res.name;
						this.form.to_store_id = res.id;
					} else {
						this.from_store_name = res.name;
						this.form.from_store_id = res.id;
					}
				}
			});

		},
		onShow() {
			this.selecGooded();
		}
	}
</script>

<style scoped lang="scss">
	.addAllocate {
		width: 100%;
		// height: 100%;
		display: flex;
		background-color: #FFFFFF;

		.mains {
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #F8F8F8;
			margin-bottom: 60rpx;
		}

		.active {
			background-color: #3B4144 !important;
			color: #FFFFFF !important;
		}

		.orgin-money {
			color: #ffaa00;
		}

		// 商品分类
		.specification {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;

			.close {
				position: absolute;
				top: 20rpx;
				right: 10rpx;
				display: block;
				width: 40rpx;
				height: 40rpx;
			}

			.goods-of {

				width: 100%;
				display: flex;
				flex-direction: row;
				margin: 20rpx 0;
				padding: 10rpx 20rpx;

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

			.goods-color {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin: 20rpx 0;
				padding: 0 20rpx;

				.colors {
					width: 100%;
					margin-top: 20rpx;
					display: flex;
					flex-direction: row;

					.colorMo {
						position: relative;
						width: 120rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						border-radius: 10rpx;
						background-color: #dadada;
						color: #000000;
						margin-right: 20rpx;

						.pos {
							position: absolute;
							right: -6rpx;
							top: -20rpx;
							font-size: 20rpx;
							background-color: red;
							height: 40rpx;
							width: 40rpx;
							color: #FFFFFF;
							line-height: 40rpx;
							text-align: center;
							border-radius: 50%;
							font-size: 20rpx;
						}
					}
				}
			}

			.goods-size {
				width: 100%;
				display: flex;
				flex-direction: column;
				// margin: 20rpx 0;
				margin-top: 20rpx;
				margin-bottom: 80rpx;
				padding: 0 20rpx;

				.size-box {
					width: 100%;
					display: flex;
					flex-direction: column;

					.size-box-list {
						width: 100%;
						height: 90rpx;
						display: flex;
						flex-direction: row;
						border-bottom: 0.01rem solid #e6e6e6;

						.listed {
							flex: 1;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}

					.once {
						border-top: 0.01rem solid #e6e6e6;
					}
				}

				.sizes {
					width: 100%;
					margin-top: 20rpx;
					display: flex;
					flex-direction: row;

					.sizeMo {
						position: relative;
						width: 80rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						border-radius: 10rpx;
						background-color: #dadada;
						color: #000000;
						margin-right: 20rpx;

						.pos {
							position: absolute;
							right: -6rpx;
							top: -10rpx;
							font-size: 20rpx;
							background-color: red;
							height: 30rpx;
							width: 30rpx;
							color: #FFFFFF;
							line-height: 30rpx;
							text-align: center;
							border-radius: 50%;
							font-size: 20rpx;
						}
					}
				}

			}

			.btn {
				width: 100%;
				position: fixed;
				bottom: 0;
				z-index: 99;
				border-radius: 0 !important;

			}

			.number-box {
				width: 100%;
				display: flex;
				flex-direction: row;
				margin: 20rpx 0;
				padding: 0 20rpx;
				justify-content: space-between;
				align-items: center;

				.goods-inventory {
					color: #C0C0C0;
					font-size: 20rpx;
					padding: 0 20rpx;
				}
			}
		}

		// 
		.shopping-boxs {
			width: 100%;
			display: flex;
			flex-direction: column;

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

		.pop {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			text {
				padding: 20rpx 0;
			}

			.btn {
				position: absolute;
				bottom: 0;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.btnChild {
				flex: 1;
				border-radius: 0 !important;
			}
		}

		.bot {
			margin-bottom: 80rpx;
		}

		.foot {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 80rpx;
			background-color: #ebeaef;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.total {
				flex: 1;
				text-indent: 1em;
			}

			.sub {
				flex: 1;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				height: 100%;

				.btnon1 {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #8f8f8f;
					height: 100%;
					color: #FFFFFF;
				}

				.btnon2 {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					// text-align: center;
					background-color: #0093dc;
					height: 100%;
					color: #FFFFFF;
				}
			}
		}

		.box {
			margin-bottom: 20rpx;

			.other-expenses {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
				height: 84rpx;

				.green {
					padding-left: 20rpx;
					flex: 1;

					text {
						background-color: #46c85b;
						border-radius: 8rpx;
						padding: 6rpx 10rpx;
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}

				.green-money {
					padding-left: 20rpx;
					flex: 1;
					color: green;
				}

				.orgin {
					padding-left: 20rpx;
					flex: 1;

					text {
						background-color: #ffaa00;
						border-radius: 8rpx;
						padding: 6rpx 10rpx;
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}

				.orgin-money {
					padding-left: 20rpx;
					flex: 1;
					color: #ffaa00;
				}
			}

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

		.jump {
			width: 100%;
			height: 84rpx;
			background-color: #FFFFFF;
			display: flex;
			// flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-bottom: 20rpx;

			.scan {
				flex: 1;
				text-align: center;
				border-right: 1rpx solid #E5E5E5;
			}

			.select-goods {
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
