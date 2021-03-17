<template>
	<view class="salesOrderDetails">
		<u-navbar back-icon-color='#ffffff' title="零售详情" :background="background" title-color="#ffffff">
			<template slot="right">
				<text class="right_icon" @click="del">作废</text>
			</template>
		</u-navbar>
		<view class="hearder">
			<view class="hdr_item" v-for="(item,index) in form.sales_goods" :key="index">
				<view class="left">
					<u-image width="80rpx" mode='aspectFit' class="header_image" height="80rpx" :src="$cfg.domain+item.goods.main_image"></u-image>
					<view class="t_item">
						<text class="borad">{{item.goods.name}}</text>
						<text>{{item.goods.number}}-{{item.color.name}}-{{item.size.name}}</text>
						<text><text class="red">&yen;{{item.real_price}}</text><text class="dels">&yen;{{item.price}}</text>({{(Number(item.discount)*10).toFixed(2)}})折</text>
					</view>
				</view>
				<view class="right">
					<text>x{{item.quantity}}</text>
				</view>
			</view>
			<view class="money">
				<text class="money-sum">&yen;{{sum_money}}</text>
				<text class="money-list" v-if="form.discount_money>0">满减优惠 <text class="red">&yen;{{0}}</text>,优惠金额<text class="red">&yen;{{(Number(form.discount_money)+Number(form.erasure_money)).toFixed(2)}}</text>,优惠券金额<text
					 class="red">&yen;{{0}}</text>,实收金额<text class="red">&yen;{{form.money}}</text></text>
			</view>
		</view>
		<view class="box">
			<view class="nav">
				单据信息
			</view>
			<view class="box-child">
				<view class="list">
					<text>销售单号</text>
					<text>{{form.trade_no}}</text>
				</view>
				<view class="list">
					<text>销售时间</text>
					<text>{{form.business_time}}</text>
				</view>
				<view class="list">
					<text>销售店铺</text>
					<text v-if="form.store">{{form.store.name}}</text>
				</view>
				<view class="list">
					<text>支出方式</text>
					<text>{{sales_payment}}</text>
				</view>
				<view class="list">
					<text>制单人</text>
					<text class="lan" v-if="form.user">{{form.user.name}}</text>
				</view>
				<view class="list">
					<text>销售员</text>
					<text class="lan" v-if="form.staff">{{form.staff.name}}</text>
				</view>
				<view class="list">
					<text>会员姓名</text>
					<text class="lan" v-if="form.customer">{{form.customer.name}}</text>
				</view>
				<view class="list">
					<text>获得积分</text>
					<text class="lan">{{form.reward_point}}</text>
				</view>

				<view class="list">
					<text>销售备注</text>
					<text>{{form.remarks}}</text>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<view class="btn">
			<view class="bod_hui" @click="show = true">
				退/换货
			</view>
			<view class="bod_lan">
				打印小票
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
		salesOrder,
		salesOrderCancel
	} from '../../api/salesOrder.js'
	import {configList} from '../../api/member.js'
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
							url: `/pages/barter/barter?sales_goods=` + encodeURIComponent(JSON.stringify(this.form))
						})
					} else {
						// refund
						uni.navigateTo({
							url: `/pages/refund/refund?sales_goods=` + encodeURIComponent(JSON.stringify(this.form))
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
				let res = await salesOrder(id)
				this.form = res;
				let arr = [];
				this.sum_money = 0
				res.sales_payment.map((v) => {
					if (v.account) {

						arr.push(v.account.name);
					}
				})
				if (res.status == 2) {
					this.active = true
				}
				res.sales_goods.map((v) => {

					this.sum_money += Number(v.real_price) * Number(v.quantity)
				})
				this.sum_money = this.sum_money.toFixed(2)
				this.sales_payment = arr.join(',')
				
			},
			// 作废
			async del() {
				if (!this.active) {
					let bl = await configList()
					let e_time = this.$date.Ndays(Number(bl.can_cancel_bill_max_day.value)).start_time
					// console.log();
					if(Date.now(e_time) >= Date.now(this.form.business_time)){
						this.$refs.uToast.show({
							title: `只能作废${bl.can_cancel_bill_max_day.value}内的单据!`,
							type: 'default',
							position: 'bottom'
						})
					}else{
						let _this = this
						uni.showModal({
							title: '提示',
							content: '是否作废该单据？',
							success: async function(res) {
								if (res.confirm) {
									let res = await salesOrderCancel(_this.id);
									if (!res.code) {
										_this.active = true
									}
								} else if (res.cancel) {
									return true;
								}
							}
						});
					}
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
	.salesOrderDetails {
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
			padding: 10rpx;

			.money {
				width: 100%;
				padding: 20rpx 0;
				display: flex;
				flex-direction: column;

				.red {
					color: #FF5A5F;
				}

				.money-sum {
					width: 100%;
					color: #FF5A5F;
					text-align: right;
					padding: 20rpx 0;
					font-size: 30rpx;
					font-weight: 600;
				}
				.money-list{
					font-size: 26rpx;
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
