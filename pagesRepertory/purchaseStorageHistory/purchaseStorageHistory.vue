<template>
	<view class="purchaseStorageHistory">
		<u-navbar back-icon-color='#ffffff' title="采购入库" :background="background" title-color="#ffffff">
			<template slot="right">
				<text class="right_icon" @click="delHistory">删除</text>
			</template>
		</u-navbar>
		<view class="mains">
			<view class="box">
				<view class="form_item">
					<text>供应商</text>
					<u-input placeholder='请选择供应商' @tap="toChooseSupplier" :disabled='true' v-model="supplier" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<view class="form_item">
					<text>店铺</text>
					<u-input placeholder='请选择店铺' @click="toStore" :disabled='true' v-model="shop" type="text" />
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
						<u-image width="140rpx" height="140rpx" mode='aspectFit' border-radius='20' :src="$imgFn(item.goodsData[0].goodsOf.main_image)"></u-image>
						<view class="substance" @click="showgd(item,index)">
							<view class="goodsNews">
								<text class="goods-name">{{item.goodsData[0].goodsOf.name}}</text>
								<text class="goods-number">{{item.goodsData[0].goodsOf.number}}</text>
								<text class="goods-money">&yen;{{item.goodsData[0].goodsOf.purchase_price}}</text>
							</view>
						</view>
						<u-icon name="trash" class='close' @click="delgoods(index)" color="#a8a8a8" size="40"></u-icon>
					</view>
					<view class="" v-for="(itemColor,indexColor) in item.goodsData" :key="indexColor">
						<view class="sp-color-size" v-if="itemColor.quantity>0">
							<view class="shopp-color">
								<text class="color-name">{{itemColor.name}}</text>
								<text class="color-mn" v-if="goodsMoney[index]">&yen;{{goodsMoney[index].moneys[indexColor]}}</text>
								<u-icon name="edit-pen-fill" @click="showAmend(index,indexColor)" color="#a8a8a8" size="40"></u-icon>
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
			<view class="box">
				<view class="form_item">
					<text>商品金额</text>
					<text>{{goodsAmount}}</text>
				</view>
				<view class="other-expenses">
					<view class="green"><text>优惠金额</text></view>
					<text class="green-money" @click="tapDiscount">-{{form.discount_amount}}</text>
					<view class="orgin"><text>其他费用</text></view>
					<text class="orgin-money" @click="tapOther">+{{form.other_expense}}</text>
				</view>
			</view>
			<u-popup v-model="showGreen" mode="center" border-radius="14" width="50%" height="280rpx">
				<view class="pop">
					<text>优惠金额</text>
					<u-input placeholder='请输入优惠金额' height="60" :border='true' v-model="greenVal" type="number" />
					<view class="btn">
						<u-button :hair-line="false" @click="abrogate(0)" class="btnChild">取消</u-button>
						<u-button :hair-line="false" @click='ensure(0)' class="btnChild">确定</u-button>
					</view>
				</view>
			</u-popup>
			<u-popup v-model="showOrgin" mode="center" border-radius="14" width="50%" height="280rpx">
				<view class="pop">
					<text>其他金额</text>
					<u-input placeholder='请输入其他金额' height="60" :border='true' v-model="orginVal" type="number" />
					<view class="btn">
						<u-button :hair-line="false" @click="abrogate(1)" class="btnChild">取消</u-button>
						<u-button :hair-line="false" @click='ensure(1)' class="btnChild">确定</u-button>
					</view>
				</view>
			</u-popup>
			<u-popup v-model="showMoney" mode="center" border-radius="14" width="50%" height="280rpx">
				<view class="pop">
					<text>修改价格</text>
					<u-input placeholder='请输入修改价格' height="60" :border='true' v-model="amendMoney" type="number" />
					<view class="btn">
						<u-button :hair-line="false" @click="abrogated()" class="btnChild">取消</u-button>
						<u-button :hair-line="false" @click='ensured()' class="btnChild">确定</u-button>
					</view>
				</view>
			</u-popup>
			<view class="box">
				<view class="form_item">
					<text>付款账户</text>
					<u-input placeholder='请选择付款账户' @tap="toSelectAccount" :disabled='true' v-model="account" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<view class="form_item">
					<text>付款金额</text>
					<u-input v-model="form.pay_money" placeholder='请输入付款金额' type="text" />
				</view>
				<view class="form_item">
					<text>欠供应商款</text>
					<u-input v-model="arrears" :disabled='true' type="text" />
				</view>
			</view>

			<view class="box ">
				<view class="form_item">
					<text>业务时间</text>
					<u-input placeholder='请选择时间' @tap="hiddenTime" :disabled='true' v-model="form.business_time" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<u-picker mode="time" v-model="showtime" @confirm="confirmTime" :params="params"></u-picker>
				<view class="form_item">
					<text>备注</text>
					<u-input v-model="form.remarks" type="text" />
				</view>
			</view>
			<view class="foot">
				<view class="total">
					合计：{{numberUnits}}件<text class="orgin-money"> &yen;{{goodsAmount-Number(form.discount_amount)+Number(form.other_expense)}}</text>
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
						<u-image width="140rpx" height="140rpx" border-radius='20' :src="$imgFn(goodsDetails[0].goodsOf.main_image)"></u-image>
						<view class="goodsNews">
							<text class="goods-name">{{goodsDetails[0].goodsOf.name}}</text>
							<text class="goods-number">{{goodsDetails[0].goodsOf.number}}</text>
							<text class="goods-money">&yen;{{goodsDetails[0].goodsOf.purchase_price}}</text>
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
								<view class="size-box-list" v-for="(item1,index1) in item.data" :key="index1" >
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
		purchaseStorageEdit,
		purchaseStorage,
		purchaseStorageDel
	} from '../../api/purchaseStorage.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
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
					supplier_id: 0,
					store_id: 0,
					discount_amount: 0.00,
					other_expense: 0.00,
					account_id: 0,
					pay_money: 0,
					business_time: '2020-01-01',
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
				id: 0
			}
		},
		methods: {
			// 选择时间
			confirmTime(v) {
				this.form.business_time = `${v.year}-${v.month}-${v.day}`;
			},
			// 点击优惠金额
			tapDiscount() {
				this.showGreen = true;
				this.greenVal = this.form.discount_amount;
			},
			// 
			tapOther() {
				this.showOrgin = true;
				this.orginVal = this.form.other_expense;
			},
			// 前往供应商
			toChooseSupplier() {
				uni.navigateTo({
					url: '/pages/chooseSupplier/chooseSupplier'
				})
			},
			hiddenTime() {
				this.showtime = true;
			},
			// 前往店铺
			toStore() {
				uni.navigateTo({
					url: '/pages/storeManagement/storeManagement?iq=1'
				})
			},
			// 前往选择账户
			toSelectAccount() {
				uni.navigateTo({
					url: '/pages/selectAccount/selectAccount'
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
				this.goodsMoney[this.indexbox.index].moneys[this.indexbox.indexColor] = this.amendMoney;
				this.goodsAmount = 0;
				this.shopping.map((v, i) => {
					v.goodsData.map((v1, i1) => {
						this.goodsAmount += (this.goodsMoney[i].moneys[i1] * v1.quantity);
					});
				});
				this.goodsAmount = this.goodsAmount.toFixed(2);
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
							_this.goodsAmount += (Number(v1.goodsOf.purchase_price) * v1.quantity);
							_this.goodsMoney[i].moneys.push(v1.goodsOf.purchase_price);
							_this.numberUnits += v1.quantity;
						})
						_this.$set(_this.shopping, i, _this.shopping[i])
					})
					_this.goodsAmount = _this.goodsAmount.toFixed(2)
				})
			},
			// 删除商品
			delgoods(index) {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确定删除该商品吗？',
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
				if (this.form.supplier_id == 0) {
					this.$refs.uToast.show({
						title: '请选择供应商'
					})
				} else if (this.form.store_id == 0) {
					this.$refs.uToast.show({
						title: '请选择店铺',
					})
				} else if (this.form.account_id == 0) {
					this.$refs.uToast.show({
						title: '请选择付款账户',
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
										id:v2.id,
										price: this.goodsMoney[i].moneys[i1]
									})
								})
							}
						})
					})
					let res = await purchaseStorageEdit(this.id, this.form);
					if (!res.code) {
						uni.$emit('purchaseStorage',true)
						uni.navigateBack()
					}
				}
			},
			// 删除该采购
			delHistory() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确定删除该入库单？',
					success: async function(res) {
						if (res.confirm) {
							let res = await purchaseStorageDel(_this.id);
							if (!res.code) {
								uni.navigateBack()
							}
						} else if (res.cancel) {
							console.log("点击了取消");
						}
					}
				});
			},
			//初始化
			async init(id) {
				let res = await purchaseStorage(id);
				console.log(res);
				// 供应商
				this.form.supplier_id = res.supplier_id;
				this.supplier = res.supplier.name;
				this.arrears = Number(res.supplier.balance) + Number(res.supplier.base_money);
				// 店铺
				this.shop = res.store.name;
				this.form.store_id = res.store_id;
				// 付款账户
				this.account = res.supplier.name;
				this.form.account_id = res.account_id;

				this.form.business_time = res.business_time;
				this.form.pay_money = res.pay_money;
				this.goodsAmount = Number(res.goods_amount);
				this.form.discount_amount = res.discount_amount;
				this.form.other_expense = res.other_expense;
				this.form.status = res.status;
				this.form.remarks = res.remarks;
				// this.form.goods = []
				// this.shopping = []
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
								retail_price: v.retail_price,
								purchase_price: v.purchase_price
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
				// console.log(this.goodsMoney);

				// console.log(arr);
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: arr
				})
				this.$store.commit('stateGoodFn', {
					stateGood: true
				})
				this.selecGooded();
			},

		},
		onUnload() {
			uni.$off()
		},
		onLoad(query) {
			this.id = query.id;
			this.init(query.id);
			uni.$on("supplierDatum", (res) => {
				if (res) {
					// console.log(res);

					this.form.supplier_id = res.id;
					this.supplier = res.name;
					this.arrears = res.balance;
				}
			});
			uni.$on("gloEvent", (res) => {
				if (res) {
					// console.log(res);
					this.shop = res.name;
					this.form.store_id = res.id;
				}
			});
			uni.$on("selectAccount", (res) => {
				if (res) {
					// console.log(res);
					this.account = res.name;
					this.form.account_id = res.account_id;
				}
			});
		},
		onShow() {
			this.selecGooded();
		}
	}
</script>

<style scoped lang="scss">
	.purchaseStorageHistory {
		width: 100%;
		display: flex;
		background-color: #F8F8F8;
		flex-direction: column;
		.right_icon {
			margin-right: 30rpx;
			color: #FFFFFF;
		}

		.mains {
			width: 100%;
			// height: 100%;
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
