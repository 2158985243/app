<template>
	<view class="settleAccounts">
		<view class="member-select">
			<view class="member">
				<text>会员选择</text>
				<u-icon name="arrow-down-fill" color="#ffffff" size="24"></u-icon>
			</view>
		</view>
		<view class="mains">
			<!-- 商品列表 -->
			<view class="goods-data">
				<view class="list" v-for="(item,index) in list" :key="index">
					<view class="goods-list" v-for="(itemGoods,indexGoods) in item.data" :key="indexGoods">
						<view class="goods-left" v-if="itemGoods.quantity>0">
							<u-image width="100rpx" mode='aspectFit' border-radius="10" class="header_image" height="100rpx" :src="$cfg.domain+item.goodsOf.main_image"></u-image>
							<view class="item-left">
								<text class="hei">{{item.goodsOf.name}} <text class="hui">{{item.goodsOf.number}}</text></text>
								<text class="zc">{{item.name}}-{{itemGoods.size.name}}</text>
								<text class="lan">&yen;{{item.goodsOf.retail_price}}</text>
							</view>
						</view>
						<view class="goods-right" v-if="itemGoods.quantity>0">
							x{{itemGoods.quantity}}
						</view>
					</view>
				</view>
				<view class="add-goods">
					<view class="add-left">
						<u-icon name="plus-circle-fill" color="#2979ff" size="30"></u-icon>
						<text>增加商品</text>
					</view>
					<view class="add-right">
						<text>共{{sum_number}}件商品</text>
						<text>合计&yen;{{sum_money}}</text>
					</view>
				</view>
			</view>

			<!-- 其他 -->
			<view class="box">
				<view class="item-li">
					<view class="box-left">
						整单折扣
					</view>
					<view class="box-right">
						<text class="lan">启用</text>
						<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
					</view>
				</view>
				<view class="item-li">
					<view class="box-left">
						优惠券
					</view>
					<view class="box-right">
						<text>0</text>
						<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
					</view>
				</view>
				<view class="item-li">
					<view class="box-left">
						<text>优惠金额</text>
						<u-input v-model="form.discount_money" height="50" placeholder='请输入优惠金额' type="number" />
					</view>
					<view class="box-right">
					</view>
				</view>
			</view>
			<view class="box">
				<view class="item-li">
					<view class="box-left">
						销售员
					</view>
					<view class="box-right">
						<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
					</view>
				</view>
				<view class="item-li">
					<view class="box-left">
						销售日期
					</view>
					<view class="box-right">
						<text>2020-10-10</text>
						<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
					</view>
				</view>
				<view class="item-li">
					<view class="box-left">
						<text>获得积分</text>
						<u-input v-model="form.discount_money" height="50" :disabled="true" placeholder='1元=1积分' type="number" />
					</view>
					<view class="box-right">
						<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
					</view>
				</view>
			</view>
			<view class="box">
				<view class="item-li">
					<view class="box-left">
						<text>备注</text>
						<u-input v-model="form.discount_money" height="50" placeholder='1元=1积分' type="number" />
					</view>
					<view class="box-right">
					</view>
				</view>
				<view class="radios">
					<u-checkbox-group>
						<u-checkbox v-model="item.checked" class="rod" v-for="(item, index) in group" :key="index" :name="item.name">{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>

		</view>
		<view class="footer">
			<view class="footer-left">
				<text>收款</text>
				<text class="lan-se">&yen;{{}}</text>
				<u-icon name="edit-pen-fill" color="#ff557f" size="40"></u-icon>
			</view>
			<view class="footer-right">
				<view class="hei">
					挂单
				</view>
				<view class="lan">
					收款
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	export default {
		data() {
			return {
				list: [],
				sum_number: 0,
				sum_money: 0,
				form: {
					discount_money: ''
				},
				group: [{
					name: '打印小票',
					checked: false,
				}, {
					name: '短信通知',
					checked: false,
				}, ]
			}
		},
		computed: {
			goods() {
				return store.state.specificationOfGoods;
			},
		},
		methods: {
			init() {
				this.goods.map((v, i) => {
					v.goodsData.map((v1, i1) => {
						if (v1.quantity > 0) {
							this.list.push(v1)
						}
						this.sum_number += Number(v1.quantity)
						this.sum_money += Number(v1.quantity) * Number(v1.goodsOf.retail_price)
					})
				})
				console.log(this.list);
			}
		},
		onLoad() {
			this.init()
		},
		onShow() {

		}
	}
</script>

<style scoped lang="scss">
	.settleAccounts {
		width: 100%;
		background-color: #efefef;
		display: flex;
		flex-direction: column;

		.member-select {
			width: 100%;
			height: 80rpx;
			background-color: #2979ff;
			display: flex;
			flex-direction: row;
			color: #FFFFFF;
			position: fixed;
			top: calc(80rpx + var(--status-bar-height));
			z-index: 999;

			.member {
				display: flex;
				width: 100%;
				justify-content: center;
				align-items: center;
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
					flex-direction: row;
					justify-content: space-between;
					padding: 20rpx;
					background-color: #FFFFFF;
					border-bottom: 0.01rem solid #E5E5E5;

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
			z-index: 999;
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
