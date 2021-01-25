<template>
	<view class="refund">
		<view class="hearder">
			<block v-for="(item,index) in form.sales_goods" :key="index">
				<view class="hdr_item" v-if="item.quantity>=0">
					<view class="left">
						<u-image width="80rpx" mode='aspectFit' class="header_image" height="80rpx" :src="$cfg.domain+item.goods.main_image"></u-image>
						<view class="t_item">
							<text class="borad">{{item.goods.name}}</text>
							<text>{{item.goods.number}}-{{item.color.name}}-{{item.size.name}}</text>
							<text><text class="red">&yen;{{item.real_price}}</text></text>
						</view>
					</view>
					<view class="right">
						<u-number-box :min="0" v-model="item.quantity" :max="item.max"></u-number-box>
					</view>
				</view>
			</block>
			<view class="money">
				&yen;{{sum_money}}
			</view>
		</view>
		<view class="box">
			<view class="form_item">
				<text>退款方式</text>
				<u-input placeholder='请选择退款方式' @tap="toPatternOfPayment" :disabled='true' type='text' v-model="account_name" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<!-- <view class="form_item">
				<text>退款时间</text>
				<u-input placeholder='请选择支付类型' @tap="toPatternOfPayment"  :disabled='true' type='text' v-model="account_name" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view> -->
			<view class="form_item">
				<text>退款原因</text>
				<u-input placeholder='请输入退款原因' type='text' v-model="obj.refund_reason" />
			</view>
			<view class="form_item">
				<text>退返积分</text>
				<u-input placeholder='' :disabled='true' type='text' v-model="obj.reward_point" />
			</view>
			<view class="form_item">
				<text>备注信息</text>
				<u-input placeholder='请输入备注信息' type='text' v-model="obj.remarks" />
			</view>

		</view>
		<view class="btn" @click="sure">
			确认退货
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		refund
	} from '../../api/salesOrder.js'
	export default {
		data() {
			return {
				form: {},
				sum_money: 0,
				account_name: '',
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
		methods: {
			toPatternOfPayment() {
				uni.navigateTo({
					url: `/pages/patternOfPayment/patternOfPayment?iq=1`
				})
			},
			// 确认退货
			async sure() {
				if (this.obj.payment[0].account_id == 0) {
					this.$refs.uToast.show({
						title: '请选择退款方式',
						type: 'default',
						position: 'bottom'
					})
				} else {
					this.obj.goods = []
					this.form.sales_goods.map((v) => {
						this.obj.goods.push({
							goods_id: v.goods_id,
							color_id: v.color_id,
							size_id: v.size_id,
							quantity: -v.quantity,
							price: v.price,
							discount: v.discount,
							real_price: v.real_price
						})
					})
					this.obj.money = -this.sum_money;
					this.obj.reward_point = -this.obj.reward_point
					let res = await refund(this.obj);
					if(!res.code){
						uni.navigateBack({
							delta: 2
						})
					}
				}
			}
		},
		onLoad(option) {
			this.form = JSON.parse(decodeURIComponent(option.sales_goods));
			console.log(this.form);
			if (this.form.sales_goods.length > 0) {
				this.sum_money = 0
				this.form.sales_goods.map((v) => {
					if (v.quantity > 0) {
						this.sum_money += Number(v.real_price) * Number(v.quantity)
					}
					v['max'] = this.$u.deepClone(v.quantity);
				})
				this.sum_money = this.sum_money.toFixed(2);
				this.obj.customer_id = this.form.customer_id;
				this.obj.staff_id = this.form.staff_id;
				this.obj.reward_point = this.form.reward_point;

			}
			uni.$on('patternOfPayment', res => {
				if (res) {
					this.obj.payment[0].account_id = res.account_id;
					this.obj.payment[0].money = -this.sum_money;
					this.account_name = res.name
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	.refund {
		width: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F5F5F5;

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
				color: #FF5A5F;
				text-align: right;
				padding: 20rpx 0;
				font-size: 30rpx;
				font-weight: 600;
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

		.box {
			margin: 0 20rpx 90rpx 20rpx;
			display: flex;
			flex-direction: column;

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

		.btn {
			width: 80%;
			height: 80rpx;
			color: #FFFFFF;
			background-color: #4A8AF1;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10rpx;
			position: fixed;
			bottom: 10rpx;
			left: 10%;
		}
	}
</style>
