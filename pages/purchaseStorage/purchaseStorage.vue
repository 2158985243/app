<template>
	<view class="purchaseStorage">
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

		<view class="box">
			<view class="form_item">
				<text>商品金额</text>
				<text>0</text>
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

		<view class="box bot">
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
				合计：<text class="orgin-money"> &yen;{{form.pay_money-form.discount_amount+form.other_expense}}</text>
			</view>
			<view class="sub">
				<view class="btnon1">
					草稿
				</view>
				<view class="btnon2" @click="save">
					保存
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showtime: false,
				showGreen: false,
				showOrgin: false,
				greenVal: 0,
				orginVal: 0,
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
			// 前往选择账户
			selectProducts() {
				uni.navigateTo({
					url: '/pages/selectProducts/selectProducts'
				})
			},
			// 优惠价格确定
			ensure(v) {
				if (!v) {
					this.showGreen = false;
					this.form.discount_amount = this.greenVal;
				} else {
					this.showOrgin = false;
					this.form.other_expense = this.orginVal;
				}
			},
			// 优惠价格取消
			abrogate(v) {
				if (v) {
					this.showGreen = false;
				} else {
					this.showOrgin = false;
				}
			},
			// 保存
			save() {
				
			}

		},
		onLoad() {
			uni.$on("supplierDatum", (res) => {
				if (res) {
					console.log(res);
					this.form.supplier_id = res.id;
					this.supplier = res.name;
					this.arrears = res.balance;
				}
			});
			uni.$on("gloEvent", (res) => {
				if (res) {
					console.log(res);
					this.shop = res.name;
					this.form.store_id = res.id;
				}
			});
			uni.$on("selectAccount", (res) => {
				if (res) {
					console.log(res);
					this.account = res.name;
					this.form.account_id = res.id;
				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.purchaseStorage {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;

		.orgin-money {
			color: #ffaa00;
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
