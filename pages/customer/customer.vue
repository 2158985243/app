<template>
	<view class="customer">
		<u-navbar back-icon-color='#ffffff' title="会员详情" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen-fill" @click="toEditCustomer" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="information">
			<view class="header-ifo">
				<view class="header-img">
					<view class="left">
						<view class="img">
							<u-image width="100" border-radius='18' height="100" mode='aspectFit' :src="$cfg.domain+form.image">
							</u-image>
						</view>
						<view class="name">
							<text>{{form.name}}</text>
							<view class="car">
								<text>{{form.customer_level.name}}</text>
								<text class="mobile">{{form.mobile}}</text>
							</view>
						</view>
					</view>
					<view class="right">
						<text>消费{{form.resume_times}}次</text>
					</view>
				</view>
				<view class="number">
					<text>No.{{form.number}}</text>
					<u-icon name="phone-fill" color="#ffffff" size="34"></u-icon>
				</view>
			</view>
			<view class="information-dates">
				<view class="integral" @click="toPointLog">
					<text class="hei">积分</text>
					<text class="lan">{{form.point}}</text>
				</view>
				<view class="balance" @click="toBalanceLog">
					<text class="hei">余额(&yen;)</text>
					<text class="lan">{{form.balance}}</text>
				</view>
				<view class="coupon">
					<text class="hei">优惠券</text>
					<text class="lan">{{0}}</text>
				</view>

			</view>
		</view>
		<view class="modulation">
			<view class="dole" @click="toBalanceAdjust">
				<u-icon name="rmb-circle-fill" color="#55aaff" size="60"></u-icon>
				<text>余额调整</text>
			</view>
			<view class="dole" @click="toPointAdjust">
				<u-icon name="rmb-circle-fill" color="#55aaff" size="60"></u-icon>
				<text>积分调整</text>
			</view>
			<view class="dole">
				<u-icon name="rmb-circle-fill" color="#55aaff" size="60"></u-icon>
				<text>积分兑换</text>
			</view>
			<view class="dole">
				<u-icon name="rmb-circle-fill" color="#55aaff" size="60"></u-icon>
				<text>会员挂失</text>
			</view>

		</view>
		<view class="box">
			<view class="box-item" @click="toDebtLog" v-if="form.debt>0">
				<text class="box-left hui">欠款</text>
				<view class="box-right">
					<text>{{form.debt}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="34"></u-icon>
				</view>
			</view>
			<view class="box-item">
				<text class="box-left hui">总消费</text>
				<view class="box-right">
					<text>{{form.resume}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="34"></u-icon>
				</view>
			</view>

		</view>
		<view class="box">
			<view class="box-item">
				<view class="box-left">
					<text class="sett">消费密码</text>
					<text class="hui">(未开启)</text>
				</view>
				<view class="box-right">
					<text class="lan">设置</text>
					<u-icon name="arrow-right" color="#cccccc" size="34"></u-icon>
				</view>
			</view>
			<view class="box-item">
				<view class="box-left">
					<text class="sett">微信会员</text>
					<text class="hui">(未绑定)</text>
				</view>
				<view class="box-right">
					<text class="lan">绑定</text>
					<u-icon name="arrow-right" color="#cccccc" size="34"></u-icon>
				</view>
			</view>
		</view>
		<view class="btn" @click="toRecharge">
			会员充值
		</view>
	</view>
</template>

<script>
	import {
		customer
	} from '../../api/customer.js'
	export default {
		data() {
			return {
				id: 0,
				form: {
					customer_level: {}
				},
				background: {
					backgroundColor: '#2979ff'
				},
			}
		},
		methods: {
			async init(id) {
				let res = await customer(id);
				console.log(res);
				this.form = res;
				this.form.mobile = this.form.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
			},
			// 前往编辑
			toEditCustomer() {
				uni.navigateTo({
					url: `/pages/editMember/editMember?id=${this.id}`
				})
			},

			// 前往会员充值
			toRecharge() {
				uni.navigateTo({
					url: '/pages/recharge/recharge?obj=' + encodeURIComponent(JSON.stringify(this.form))
				})
			},
			// 前往余额调整
			toBalanceAdjust() {
				uni.navigateTo({
					url: '/pages/balanceAdjust/balanceAdjust?obj=' + encodeURIComponent(JSON.stringify(this.form))
				})
			},
			// 前往积分调整
			toPointAdjust() {
				uni.navigateTo({
					url: '/pages/pointAdjust/pointAdjust?obj=' + encodeURIComponent(JSON.stringify(this.form))
				})
			},
			// 前往积分
			toPointLog() {
				uni.navigateTo({
					url: '/pages/pointLog/pointLog?obj=' + encodeURIComponent(JSON.stringify(this.form))
				})
			},
			// 前往欠款记录
			toDebtLog() {
				uni.navigateTo({
					url: '/pages/repayment/repayment?obj=' + encodeURIComponent(JSON.stringify(this.form))
				})
				
			},
			// 前往余额
			toBalanceLog() {

				uni.navigateTo({
					url: '/pages/balanceLog/balanceLog?obj=' + encodeURIComponent(JSON.stringify(this.form))
				})
			},

		},
		onLoad(query) {
			this.id = query.id;
		},
		onShow() {
			this.init(this.id);
		}
	}
</script>

<style scoped lang="scss">
	.customer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		align-items: center;

		.right_icon {
			margin-right: 30rpx;
		}

		.information {
			width: 100%;
			padding: 20rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;

			.header-ifo {
				width: 100%;
				height: 190rpx;
				background-color: #007AFF;
				border-radius: 10rpx;
				display: flex;
				flex-direction: column;
				color: #FFFFFF;
				font-size: 20rpx;
				padding: 20rpx;

				.header-img {
					width: 100%;
					display: flex;
					justify-content: space-between;
					padding-bottom: 20rpx;

					.left {
						display: flex;
						flex-direction: row;

						.name {
							display: flex;
							margin-left: 20rpx;
							flex-direction: column;

							.car {
								width: 100%;
								display: flex;
								flex-direction: row;
								margin-top: 30rpx;

								.mobile {
									margin-left: 20rpx;
								}
							}
						}
					}

					.right {
						display: flex;
						align-items: center;
					}
				}

				.number {
					width: 100%;
					display: flex;
					justify-content: space-between;
				}
			}

			.information-dates {
				width: 100%;
				display: flex;
				flex-direction: row;
				padding-top: 20rpx;

				.integral {
					flex: 1;
					display: flex;
					flex-direction: column;
					border-right: 2rpx solid #C8C7CC;
					justify-content: center;
					align-items: center;

					.hei {
						font-weight: 600;
					}

					.lan {
						color: #007AFF;
					}
				}

				.balance {
					flex: 1;
					display: flex;
					flex-direction: column;
					border-right: 2rpx solid #C8C7CC;
					justify-content: center;
					align-items: center;

					.hei {
						font-weight: 600;
					}

					.lan {
						color: #007AFF;
					}
				}

				.coupon {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.hei {
						font-weight: 600;
					}

					.lan {
						color: #007AFF;
					}
				}

			}
		}

		.modulation {
			width: 100%;
			padding: 40rpx 20rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;

			.dole {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 20rpx;
			}
		}

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 20rpx;

			.box-item {
				width: 100%;
				padding: 20rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: 0.01rem solid #E5E5E5;
				background-color: #FFFFFF;

				.box-left {
					display: flex;
					flex-direction: row;
				}

				.hui {
					color: #666666;
				}

				.lan {
					color: #007AFF;
				}

				.sett {
					margin-right: 20rpx;
				}

				.box-right {
					display: flex;
					flex-direction: row;
				}
			}
		}

		.btn {
			width: 80%;
			height: 80rpx;
			border-radius: 10rpx;
			background-color: #007AFF;
			color: #FFFFFF;
			display: flex;
			// flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
</style>
