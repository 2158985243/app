<template>
	<view class="combination">
		<text class="title">支持两种支付方式组合</text>
		<view class="box">
			<view class="list">
				<view class="left">
					<text>收款金额</text>
				</view>
				<view class="right">
					<text class="red">&yen;{{form.money}}</text>
				</view>
			</view>
			<view class="list" v-for="(item,index) in list" :key="index" @click="clickItem(item,index)">
				<view class="left">
					<text>{{item.name}}</text>
				</view>
				<view class="right">
					<text v-if="item.int_money!=0">&yen; <text v-if="form.money<0">-</text>{{item.int_money}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
				</view>
			</view>
		</view>
		<view class="btn">
			<view class="qd" @click="sure">
				确定
			</view>
		</view>
		<!-- 支付 -->
		<u-popup mode="center" v-model="showed" border-radius="20" width="70%" height="340rpx">
			<view class="discounted">
				<view class="discounted-title">
					<text>请输入</text>
					<text class="red">{{value}}</text>
					<text>收款金额</text>
				</view>
				<view class="input">
					<u-input v-model="money" :clearable="false" placeholder="请输入金额" input-align="center" type="number" :border="true" />
				</view>
				<view class="discounted-footer">
					<view class="qx" @click="abrogate">
						取消
					</view>
					<view class="qd" @click="ensure">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 输入密码 -->
		<u-popup mode="center" v-model="show_psd" border-radius="20" width="70%" height="340rpx">
			<view class="discounted">
				<view class="discounted-title">
					请输入会员密码
				</view>
				<view class="input">
					<u-input v-model="password" :clearable="false" placeholder="请输入六位数字密码" input-align="center" type="password"
					 :border="true" />
				</view>
				<view class="discounted-footer">
					<view class="qx" @click="abrogated">
						取消
					</view>
					<view class="qd" @click="ensured">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		salesOrderAdd,
		salesOrderEdit,
		refund
	} from '../../api/salesOrder.js'
	export default {
		data() {
			return {
				form: {},
				obj: {},
				list: [],
				showed: false,
				money: '',
				index: 999,
				value: '',
				id: 0,
				show_psd: false,
				is_refund: false, //判断是否为换货页面进入
				password: '',
				oob: {},
				has_password: 0
			}
		},
		methods: {
			async sure() {
				this.form.pay_type = 1;
				this.form.payment = [];
				let name = []
				let name_str = '';
				let sum_money = 0;
				this.list.map((v) => {
					if (v.int_money > 0) {
						this.form.payment.push({
							account_id: v.account_id,
							money: this.form.money > 0 ? v.int_money : -v.int_money
						})
						name.push(v.name);
						if (this.form.money > 0) {
							sum_money += Number(v.int_money)
						} else {
							sum_money += Number(-v.int_money)

						}
					}
				});
				name_str = name.join(',')
				if (this.form.money <= sum_money) {
					if (this.id > 0) {
						let res = await salesOrderEdit(this.id, this.form)
						if (!res.code) {
							uni.navigateTo({
								url: `/pagesHome/paymentSuccess/paymentSuccess?payItem=${name_str}&money=${this.form.money}&combina=1`
							})
						}
					} else {
						if (this.is_refund) {
							let res = await refund(this.form);
							if (!res.code) {
								uni.navigateTo({
									url: `/pagesHome/paymentSuccess/paymentSuccess?payItem=${name_str}&money=${this.form.money}&combina=1&page=6`
								})
							}
						} else {

							let res = await salesOrderAdd(this.form);
							if (!res.code) {
								uni.navigateTo({
									url: `/pagesHome/paymentSuccess/paymentSuccess?payItem=${name_str}&money=${this.form.money}&combina=1`
								})
							}
						}
					}
				} else {
					this.$refs.uToast.show({
						title: '支付金额小于收款金额',
						type: 'default',
						position: 'center'
					})
				}
			},
			// 取消
			abrogate() {
				this.showed = false;
			},
			// 确定
			ensure() {
				// if (this.oob) {
				if (this.money <= Math.abs(this.form.money)) {
					let bl = 0;
					this.list.map((v) => {
						if (v.int_money > 0) {
							++bl;
							if (bl == 2) {
								v.int_money = '';
							} else {
								v.int_money = (Number(Math.abs(this.form.money)) - Number(this.money)).toFixed(2)
							}

						}

					})
					this.list[this.index].int_money = this.money
				} else {
					this.list[this.index].int_money = Math.abs(this.form.money)
					this.$refs.uToast.show({
						title: '输入的金额超出收款金额',
						type: 'default',
						position: 'center'
					})
				}
				this.money = ''
				this.showed = false;
				// }
			},
			// 点击某个支付方式
			clickItem(item, index) {
				this.value = item.name
				this.oob = item
				this.index = index;
				let arr = 0;
				this.list.map((v) => {
					arr += Number(v.int_money)
				})
				console.log(arr);
				if (item.int_money > 0) {
					this.money = item.int_money
					console.log('a');
				} else if (arr > 0 && Number(Math.abs(this.form.money)) - arr > 0) {
					this.money = Number(Math.abs(this.form.money)) - arr
				}
				this.showed = true;
			},
			// 取消输入密码
			abrogated() {
				this.password = ''
				this.show_psd = false;

			},
			// 确定输入密码
			async ensured() {
				this.form.pay_type = 1;
				this.form.payment = [];
				let name = []
				let name_str = '';
				let sum_money = 0;
				this.list.map((v) => {
					if (v.int_money > 0) {
						this.form.payment.push({
							account_id: v.account_id,
							money: v.int_money
						})
						name += v.name;
						sum_money += Number(v.int_money)
					}
				});
				name_str = name.slice(',')
				this.form.password = this.password;
				if (Math.abs(this.form.money) <= sum_money) {
					if (this.id > 0) {
						let res = await salesOrderEdit(this.id, this.form)
						if (!res.code) {
							uni.navigateTo({
								url: `/pagesHome/paymentSuccess/paymentSuccess?payItem=${name_str}&money=${this.form.money}&combina=1`
							})
						}
					} else {
						let res = await salesOrderAdd(this.form);
						if (!res.code) {
							uni.navigateTo({
								url: `/pagesHome/paymentSuccess/paymentSuccess?payItem=${name_str}&money=${this.form.money}&combina=1`
							})
						}
					}
				} else {
					this.$refs.uToast.show({
						title: '支付金额小于收款金额',
						type: 'default',
						position: 'center'
					})
				}
			}
		},
		onLoad(option) {
			this.obj = JSON.parse(decodeURIComponent(option.obj));
			console.log(this.obj);
			this.list = this.obj.paymentList;
			this.is_refund = this.obj.is_refund;
			this.list.map((v) => {
				v['int_money'] = '';
			})
			this.form = this.obj.form;
			this.has_password = this.obj.has_password;
			this.id = this.obj.id;
		}
	}
</script>

<style scoped lang="scss">
	.combination {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F1F1F1;

		.title {
			padding: 20rpx;
		}

		.btn {
			width: 100%;
			height: 100rpx;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #FFFFFF;

			.qd {
				width: 80%;
				height: 80rpx;
				background-color: #007AFF;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 14rpx;
			}
		}

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 100rpx;

			.list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #EEEEEE;

				.left {
					display: flex;
					flex-direction: row;
					align-items: center;
				}

				.right {
					display: flex;
					flex-direction: row;
					align-items: center;

					.red {
						color: #DD524D;
					}
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

				.red {
					color: #FF5A5F;
				}
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
	}
</style>
