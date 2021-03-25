<template>
	<view class="determineCash">
		<view class="member-select">
			<view class="member" @click="toMemberSelect" v-if="!members.name">
				<text>会员选择</text>
				<u-icon name="arrow-down-fill" color="#ffffff" size="24"></u-icon>
			</view>
			<view class="membered" v-else>
				<view class="left">
					<u-image width="70rpx" mode='aspectFit' border-radius="10" class="header_image" height="70rpx" :src="$cfg.domain+members.image"></u-image>
					<text>{{members.name}}</text>
					<u-icon name="close-circle-fill" color="#ffffff" @click="clear" size="30"></u-icon>
				</view>
				<view class="right">
					<text>积分：{{members.point}}</text>
				</view>
			</view>
		</view>
		<view class="mains">
			<!-- 商品列表 -->
			<view class="goods-data">
				<view class="list" v-for="(item,index) in list" :key="index">
					<view class="goods-list" v-for="(itemGoods,indexGoods) in item.data" :key="indexGoods">
						<view class="dole" v-if="itemGoods.quantity>0" @click="togoodsOf(item,index,indexGoods)">
							<view class="goods-left">
								<u-image width="100rpx" mode='aspectFit' border-radius="10" class="header_image" height="100rpx" :src="$cfg.domain+item.goodsOf.main_image"></u-image>
								<view class="item-left">
									<text class="hei">{{item.goodsOf.name}} <text class="hui">{{item.goodsOf.number}}</text></text>
									<text class="zc">{{item.name}}-{{itemGoods.size.name}}</text>
									<text class="lan">{{itemGoods.retail_price}}积分 <text class="underline" v-if="itemGoods.discount != 1">{{item.goodsOf.retail_price}}积分</text><text
										 v-if="itemGoods.discount !=1">(会员折扣{{(itemGoods.discount*10).toFixed(2)}}折)</text>
									</text>
								</view>
							</view>
							<view class="goods-right">
								x{{itemGoods.quantity}}
							</view>
						</view>
					</view>
				</view>

				<view class="add-goods">
					<view class="add-left" @click="toResale">
						<u-icon name="plus-circle-fill" color="#2979ff" size="30"></u-icon>
						<text>增加商品</text>
					</view>
					<view class="add-right">
						<text>共{{sum_number}}件商品</text>
						<text>合计{{sum_money}}积分</text>
					</view>
				</view>
			</view>
			<view class="box">
				<view class="item-li" @tap="toSelecSalesperson">
					<view class="box-left">
						<text>销售员</text>
					</view>
					<view class="box-right">
						<text>{{staff}}</text>
						<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
					</view>
				</view>
				<view class="item-li">
					<view class="box-left">
						<text>备注</text>
						<u-input v-model="form.remarks" :clearable="false" height="50" placeholder='请输入备注' type="number" />
					</view>
					<view class="box-right">
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="footer-left">
				<text>应扣积分</text>
				<text class="lan-se">{{sum_money}}</text>
			</view>
			<view class="footer-right">
				<view class="lan" @click="sure()">
					兑换
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import store from '@/store'
	import {
		pointExchange
	} from '../../../api/customer.js'
	export default {
		data() {
			return {
				list: [],
				sum_number: 0,
				form: {},
				members: {
					name: ''
				},
				staff: '', //销售员
				option_data: {}
			}
		},
		computed: {

			goods() {
				return store.state.specificationOfGoods;
			},
		},
		methods: {
			// 初始化
			init() {
				this.list = [];
				this.sum_number = 0;
				this.sum_money = 0;
				this.goods.map((v, i) => {
					v.goodsData.map((v1, i1) => {
						v1.data.map((v2, i2) => {
							v2['retail_price'] = Number(v1.goodsOf.retail_price)
						})
						if (v1.quantity > 0) {
							this.list.push(v1)
						}
					})
				})
				this.list.map((v, i) => {
					this.sum_number += Number(v.quantity)
					v.data.map((v1, i1) => {
						if (v1.quantity > 0) {
							if (!v1.discount) {
								v1['discount'] = 1;
							}
							v1['retail_price'] = (Number(v1.retail_price) * Number(v1.discount)).toFixed()
							this.sum_money += Number(v1.quantity) * Number(v1.retail_price)
						}
					})
				})
				this.sum_money = this.sum_money.toFixed()
				this.form.money = this.toMoney
			},
			// 前往选择会员
			toMemberSelect() {
				uni.navigateTo({
					url: '/pages/memberSelect/memberSelect'
				})
			},
			// 前往选择经手人
			toSelecSalesperson() {
				uni.navigateTo({
					url: '/pages/selecSalesperson/selecSalesperson'
				})
			},
			// 清空会员
			clear() {
				this.sum_money = 0;
				this.members = {
					name: ''
				}
				this.form.customer_id = 0
				this.form.reward_point = 0

				// this.list.map(v => {
				// 	v.data.map(v1 => {
				// 		if (v1.quantity > 0) {
				// 			v1.discount = 1;
				// 			v1.retail_price = v.goodsOf.retail_price
				// 			this.sum_money += Number(v1.quantity) * Number(v1.retail_price)
				// 		}
				// 	})
				// })
				// this.sum_money = this.sum_money.toFixed(2)
				// this.form.money = (this.sum_money - this.form.discount_money).toFixed(2)
			},

			// 增加商品
			toResale() {
				this.list.map((k, j) => {
					k.data.map((k1, j1) => {
						this.goods.map((v, i) => {
							v.goodsData.map((v1, i1) => {
								v1.data.map((v2, i2) => {
									if (v1.quantity > 0 && k.goods_id == v1.goods_id && k1.size.id == v2.size.id) {
										v1.quantity = k.quantity;
										v2.quantity = k1.quantity;
									}
								})
							})
						})
					})
				})
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: this.goods
				})
				this.option_data.account = true
				uni.navigateTo({
					url: '/pages/customer/pointExchange/pointExchange?obj=' + encodeURIComponent(JSON.stringify(this.option_data))
				})
			},
			// 前往编辑商品
			togoodsOf(item, index, indexGoods) {
				let obj = {
					item: item,
					index: index,
					indexGoods: indexGoods,
					bl: true
				}
				uni.navigateTo({
					url: '/pages/editItems/editItems?obj=' + encodeURIComponent(JSON.stringify(obj))
				})
			},
			// 兑换
			async sure() {
				if (this.members.point > this.sum_money) {
					if (this.form.staff_id > 0) {
						let arr = []
						this.list.map((v) => {
							v.data.map((v1) => {
								if (v1.quantity != 0) {
									arr.push({
										goods_id: v.goods_id,
										color_id: v.id,
										size_id: v1.size.id,
										quantity: v1.quantity,
										point: v1.retail_price
									})
								}
							})
						})
						if (this.form.discount_money == "") {
							this.form.discount_money = 0;
						}
						this.form.goods = arr
						let res = await pointExchange({
							customer_id: this.form.customer_id,
							staff_id: this.form.staff_id,
							point: this.sum_money,
							goods: this.form.goods,
							remarks: this.form.remarks
						})
						console.log(res);
						this.$store.commit('commercialSpecification', {
							specificationOfGoods: []
						})
						if (!res.code) {
							uni.navigateTo({
								url: `/pages/customer/forSuccessful/forSuccessful`
							})
						}
					} else {
						this.$refs.uToast.show({
							title: '请选择销售员',
							type: 'default',
							position: 'bottom'
						})
					}
				} else {
					this.$refs.uToast.show({
						title: '会员积分不足!',
						type: 'default',
						position: 'bottom'
					})
				}

			},
		},
		onUnload() {
			uni.$off()
		},
		onLoad(query) {
			this.option_data = JSON.parse(decodeURIComponent(query.obj));
			this.members = this.option_data
			this.form.customer_id = this.option_data.id
			this.init()
			// 选择销售员
			uni.$on("selecSalesperson", (res) => {
				if (res) {
					this.staff = res.name;
					this.form.staff_id = res.id;
				}
			});
			// 选择会员
			uni.$on("memberSelect", (res) => {
				if (res) {
					// console.log(res);
					this.members = res
					this.form.customer_id = res.id;
				}
			});
			// 编辑商品
			uni.$on("editItems", (res) => {
				if (res) {
					this.list[res.index].data[res.indexGoods].quantity = 0
					this.list[res.index].data[res.index_later].quantity = res.item.quantity;
					this.list[res.index].data[res.index_later].discount = res.item.discount;
					this.list[res.index].data[res.index_later].retail_price = res.item.retail_price;
					this.list[res.index].quantity = 0;
					this.list[res.index].data.map((v) => {
						this.list[res.index].quantity += v.quantity;
					})
					// 初始化商品数量和合计
					this.sum_number = 0
					this.sum_money = 0
					this.list.map((v, i) => {
						this.sum_number += Number(v.quantity)
						v.data.map((v1, i1) => {
							if (v1.quantity > 0) {
								if (!v1.discount) {
									v1['discount'] = 1;
								}
								v1['retail_price'] = (Number(v1.retail_price) * Number(v1.discount))
								this.sum_money += Number(v1.quantity) * Number(v1.retail_price)
							}
						})
					})
					this.form.money = this.toMoney
				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.determineCash {
		width: 100%;
		background-color: #efefef;
		display: flex;
		flex-direction: column;
		min-height: 100%;

		.active {
			background-color: #007AFF !important;
			color: #FFFFFF !important;
		}

		.member-select {
			width: 100%;
			height: 80rpx;
			background-color: #2979ff;
			display: flex;
			flex-direction: row;
			color: #FFFFFF;
			position: fixed;
			top: calc(80rpx+var(--status-bar-height));
			z-index: 9;

			.member {
				display: flex;
				width: 100%;
				justify-content: center;
				align-items: center;
			}

			.membered {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.left {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					padding-left: 20rpx;

					text {
						color: #FFFFFF;
						margin: 0 20rpx;
					}
				}

				.right {
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
					padding-right: 20rpx;
				}

			}

		}

		// 增加折扣
		.discounted {
			width: 100%;
			height: 300rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.discounted-title {
				width: 100%;
				height: 120rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.input {
				width: 100%;
				height: 100rpx;
				padding: 0 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.discounted-footer {
				width: 100%;
				height: 100rpx;
				padding: 0 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.qx {
					width: 180rpx;
					height: 60rpx;
					border-radius: 10rpx;
					border: 1rpx solid #C8C7CC;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26rpx;
				}

				.qd {
					width: 180rpx;
					height: 60rpx;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					font-size: 26rpx;
					justify-content: center;
					background-color: #007AFF;
					color: #FFFFFF;
				}
			}
		}

		// 折扣列表
		.content {
			display: flex;
			flex-direction: column;
			position: relative;

			.fot {
				display: flex;
				justify-content: space-between;
				height: 80rpx;
				align-items: center;
				border-bottom: 0.01rem solid #C8C7CC;

				.left-content {
					display: flex;
					flex-direction: row;

					.red {
						color: #DD524D;
					}
				}

				.right-content {
					display: flex;
					color: #add;
				}

				.edt {
					color: #007AFF;
				}

				.title {
					font-weight: 500;
				}

				.qx {
					color: #C0C0C0;
				}
			}

			.bods {
				width: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;

				.pay {
					width: 25%;
					height: 140rpx;
					display: flex;
					position: relative;
					justify-content: center;
					align-items: center;

					.pay-box {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 100%;
					}

					.name {
						width: 70%;
						font-size: 20rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						text-align: center;
					}

					.top-right {
						position: absolute;
						right: 28%;
						top: 8%;
					}
				}

				.hezi {
					margin: 10rpx 2.5%;
					width: 20%;
					height: 60rpx;
					border: 1rpx solid #C0C0C0;
					color: #C0C0C0;
					border-radius: 8rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;

					.red-del {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
						border-radius: 50%;
					}
				}
			}

			.confrim-btn {
				width: 100%;
				display: flex;
				height: 80rpx;
				justify-content: center;
				align-items: center;
				position: fixed;
				bottom: 0;

				.btn {
					width: 80%;
					height: 60rpx;
					color: #FFFFFF;
					background-color: #007AFF;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 10rpx;
				}
			}
		}

		.mains {
			width: 100%;
			margin: 80rpx 0;
			display: flex;
			flex-direction: column;

			.goods-data {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-bottom: 20rpx;

				.list {
					width: 100%;
					display: flex;
					flex-direction: column;
				}

				.goods-list {
					width: 100%;
					display: flex;

					.dole {
						width: 100%;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						padding: 20rpx;
						background-color: #FFFFFF;
						border-bottom: 0.01rem solid #E5E5E5;
					}

					.goods-left {
						display: flex;
						flex-direction: row;
						align-items: center;

						.item-left {
							padding-left: 20rpx;
							display: flex;
							flex-direction: column;

							.zc {
								font-size: 20rpx;
								color: #828282;
							}

							.hei {
								font-size: 28rpx;
								color: #000000;
								padding-top: 10rpx;

								.hui {
									padding-left: 10rpx;
									font-size: 24rpx;
									color: #828282;
								}
							}

							.lan {
								padding-top: 10rpx;
								font-size: 20rpx;
								color: #007AFF;
								display: flex;
								flex-direction: row;

								.underline {
									text-decoration: line-through;
								}

								text {
									color: #808080;
									padding-left: 10rpx;
								}
							}
						}
					}

					.goods-right {
						display: flex;
						justify-content: center;
						align-items: center;

					}
				}

				.add-goods {
					width: 100%;
					height: 80rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx;
					background-color: #FFFFFF;

					.add-left {
						display: flex;
						flex-direction: row;
						font-size: 20rpx;
					}

					.add-right {
						display: flex;
						flex-direction: row;
						color: #2979ff;
						font-size: 20rpx;

						text {
							padding-left: 20rpx;
						}
					}
				}
			}

			.box {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-bottom: 20rpx;

				.radios {
					width: 100%;
					display: flex;
					height: 80rpx;
					padding: 20rpx;
					background-color: #FFFFFF;

					.rod {
						padding-left: 30rpx;
					}
				}

				.item-li {
					width: 100%;
					padding: 20rpx;
					display: flex;
					background-color: #FFFFFF;
					flex-direction: row;
					justify-content: space-between;
					border-bottom: 0.01rem solid #E5E5E5;



					.box-left {
						display: flex;
						flex-direction: row;
						align-items: center;

						text {
							width: 160rpx;
							padding-right: 20rpx;
						}

					}

					.box-right {
						display: flex;
						flex-direction: row;
						align-items: center;

						.lan {
							color: #007AFF;
						}
					}
				}
			}
		}

		.footer {
			width: 100%;
			height: 80rpx;
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			z-index: 9;
			display: flex;
			justify-content: space-between;

			.footer-left {
				display: flex;
				flex-direction: row;
				align-items: center;

				text {
					padding: 0 10rpx;
				}

				.lan-se {
					color: #2979ff;
				}
			}

			.footer-right {
				display: flex;
				flex-direction: row;
				height: 100%;

				.hei {
					width: 140rpx;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #666666;
					color: #FFFFFF;
				}

				.lan {
					width: 160rpx;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #2979ff;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
