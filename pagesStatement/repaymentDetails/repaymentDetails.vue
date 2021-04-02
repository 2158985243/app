<template>
	<view class="repaymentDetails">
		<view class="hearder">
			<view class="hdr_item">
				<view class="left">
					<text>还款金额</text>
				</view>
				<view class="right">
					<text>&yen;{{form.money}}</text>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="nav">
				单据信息
			</view>
			<view class="box-child">
				<view class="list">
					<text>还款单号</text>
					<text>{{form.trade_no}}</text>
				</view>
				<view class="list">
					<text>还款时间</text>
					<text>{{form.created_at}}</text>
				</view>
				<view class="list">
					<text>还款店铺</text>
					<text v-if="form.store">{{form.store.name}}</text>
				</view>
				<view class="list">
					<text>支出方式</text>
					<text v-if="form.account">{{form.account.name}}</text>
				</view>
				<view class="list">
					<text>会员姓名</text>
					<text class="lan" v-if="form.customer">{{form.customer.name}}</text>
				</view>
				<view class="list">
					<text>还款备注</text>
					<text>{{form.remarks}}</text>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<view class="btn">
			<view class="bod_hui" @click="del">
				作废
			</view>
		</view>
		<u-select v-model="show" @confirm="confirm" mode="single-column" :list="list"></u-select>
		<view class="pop" v-if="active">
			已作废
		</view>
	</view>
</template>

<script>
	import {
		repaymentDetails,
		repaymentCancel
	} from '../../api/customer.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				form: {

					store: {},
					customer: {},
					staff: {},
					user: {},
				},
				list: [{
						value: '0',
						label: '退货'
					},
					{
						value: '1',
						label: '换货'
					}
				],
				id: 0,
				sales_payment: '',
				sum_money: 0,
				show: false,
				active: false,
			}
		},
		methods: {
			// 
			confirm(v) {
				console.log(v[0]);
				let bl = false;
				this.form.sales_goods.map(v => {
					if (v.quantity > 0) {
						bl = true
					}
				})
				if (bl) {
					if (v[0].value == 1) {
						uni.navigateTo({
							url: `/pagesHome/barter/barter?sales_goods=` + encodeURIComponent(JSON.stringify(this.form))
						})
					} else {
						// refund
						uni.navigateTo({
							url: `/pagesHome/refund/refund?sales_goods=` + encodeURIComponent(JSON.stringify(this.form))
						})
					}
				} else {
					this.$refs.uToast.show({
						title: '消费单没有商品可退换',
						type: 'default',
						position: 'bottom'
					})
				}
			},
			// 初始化
			async init(id) {
				let res = await repaymentDetails(id)
				console.log(res);
				this.form = res;
				let arr = [];

			},
			// 作废
			async del() {
				if (!this.active) {

					let _this = this
					uni.showModal({
						title: '提示',
						content: '是否作废该单据？',
						success: async function(res) {
							if (res.confirm) {
								let res = await repaymentCancel(_this.id);
								if (!res.code) {
									_this.active = true;
									uni.navigateBack()
								}
							} else if (res.cancel) {
								return true;
							}
						}
					});
				} else {
					this.$refs.uToast.show({
						title: '消费单号已不存在或作废',
						type: 'default',
						position: 'bottom'
					})
				}

			}
		},
		onLoad(query) {
			this.id = query.id;
			this.init(query.id);
		}
	}
</script>

<style scoped lang="scss">
	.repaymentDetails {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f4f4f4;
		min-height: 100%;

		.pop {
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
			transform: rotate(-45deg);
			background-color: rgba(255, 0, 0, 0.1);
		}

		.hearder {
			display: flex;
			border-radius: 10rpx;
			margin: 20rpx;
			flex-direction: column;
			align-items: center;
			background-color: #FFFFFF;
			padding: 10rpx 10rpx 0 10rpx;

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

				}
			}
		}

		.right_icon {
			margin-right: 30rpx;
			color: #FFFFFF;
		}

		.lan {
			color: #007AFF;
		}

		.box {
			display: flex;
			flex-direction: column;
			margin: 20rpx 20rpx 100rpx;
			border-radius: 10rpx;

			.money {
				display: flex;
				padding: 20rpx;
				background-color: #FFFFFF;
				justify-content: space-between;
				border-bottom: 0.01rem solid #E5E5E5;
			}

			.article {
				display: flex;
				padding: 20rpx;
				background-color: #FFFFFF;
				justify-content: space-between;
			}

			.nav {
				display: flex;
				padding: 20rpx;
				background-color: #FFFFFF;
				justify-content: space-between;
				border-bottom: 0.01rem solid #E5E5E5;
				font-size: 30rpx;
				font-weight: 800;
			}

			.box-child {
				display: flex;
				flex-direction: column;
				padding: 20rpx 20rpx;
				background-color: #FFFFFF;
			}

			.list {
				display: flex;
				padding: 6rpx 0;
				justify-content: space-between;

				text {
					font-size: 20rpx;
				}
			}
		}

		.btn {
			width: 100%;
			height: 80rpx;
			display: flex;
			flex-direction: row;
			color: #FFFFFF;
			position: fixed;
			bottom: 0;

			.bod_hui {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #666666;
			}

			.bod_lan {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #4B8BF4;
			}
		}
	}
</style>
