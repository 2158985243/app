<template>
	<view class="barter">
		<view class="hearder">
			<block v-for="(item,index) in form.sales_goods" :key="index">
				<view class="hdr_item" v-if="item.quantity>=0">
					<view class="left">
						<u-image width="80rpx" mode='aspectFit' class="header_image" height="80rpx" :src="$imgFn(item.goods.main_image)"></u-image>
						<view class="t_item">
							<text class="borad">{{item.goods.name}}</text>
							<text>{{item.goods.number}}-{{item.color.name}}-{{item.size.name}}</text>
							<text><text class="red">&yen;{{item.real_price}}</text><text class="dels">&yen;{{item.price}}</text>({{(Number(item.discount)*10).toFixed(2)}})折</text>
						</view>
					</view>
					<view class="right">
						<u-number-box :min="0" v-model="item.quantity" :max="item.max"></u-number-box>
					</view>
				</view>
			</block>
			<view class="money">
				<text class="borad">退款金额</text>
				<text class="red">&yen;{{sum_money}}</text>
			</view>
		</view>
		<view class="btn">
			<text>选择要更换的商品</text>
			<view class="next" @click="next">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				obj: {
					customer_id: 0,
					discount_money: 0,
					staff_id: '',
					money: 0,
					reward_point: 0,
					pay_type: 0,
					payment: [{
						account_id: 0,
						money: 0
					}],
					goods: [],
					refund_reason: '',
					remarks: ''
				}
			}
		},
		computed: {
			sum_money() {
				let money = 0;
				this.form.sales_goods.map((v) => {
					if (v.quantity > 0) {
						money += Number(v.real_price) * Number(v.quantity)
					}
				})
				return money.toFixed(2)
			}
		},
		methods: {
			// 下一步
			next() {
				this.$store.commit('barterFn', {
					barterGoods: this.form
				})
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: []
				})
				uni.navigateTo({
					url: `/pages/warenauswahl/warenauswahl`
				})
			},
		},
		onLoad(option) {
			this.form = JSON.parse(decodeURIComponent(option.sales_goods));
			// console.log(this.form);
			if (this.form.sales_goods.length > 0) {
				// this.sum_money = 0
				this.form.sales_goods.map((v) => {
					// if (v.quantity > 0) {
					// 	this.sum_money += Number(v.real_price) * Number(v.quantity)
					// }
					v['max'] = this.$u.deepClone(v.quantity);
				})
				// this.sum_money = this.sum_money.toFixed(2);
				this.obj.customer_id = this.form.customer_id;
				this.obj.staff_id = this.form.staff_id;
				this.obj.reward_point = this.form.reward_point;

			}
		}
	}
</script>

<style scoped lang="scss">
	.barter {
		width: 100%;
		display: flex;
		min-height: 100%;
		flex-direction: column;
		background-color: #F5F5F5;

		.btn {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: fixed;
			bottom: 10rpx;
			align-items: center;
			justify-content: center;

			text {
				font-size: 30rpx;
			}

			.next {
				width: 80%;
				height: 80rpx;
				color: #FFFFFF;
				background-color: #4A8AF1;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
				margin-top: 10rpx;
			}
		}

		.hearder {
			display: flex;
			border-radius: 10rpx;
			margin: 20rpx;
			flex-direction: column;
			align-items: center;
			background-color: #FFFFFF;
			padding: 10rpx;

			.money {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx;
				font-size: 30rpx;
				font-weight: 600;

				.borad {
					color: #000000;
				}

				.red {
					color: #FF5A5F;
				}

			}

			.hdr_item {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-direction: row;
				padding: 20rpx;
				border-bottom: 0.01rem solid #E5E5E5;

				.left {
					display: flex;
					flex-direction: row;
					align-items: center;

					.t_item {
						display: flex;
						flex-direction: column;
						margin-left: 10rpx;

						.borad {
							color: #000000;
							font-size: 26rpx;
						}

						text {
							color: #838584;
							font-size: 22rpx;
						}

						.red {
							color: #FF5A5F;
							margin-right: 50rpx;
						}
					}

					.dels {
						text-decoration: line-through;
						padding-right: 10rpx;
					}
				}
			}
		}

	}
</style>
