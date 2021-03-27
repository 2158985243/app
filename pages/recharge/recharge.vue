<template>
	<view class="recharge">
		<view class="membered">
			<view class="left">
				<u-image width="70rpx" mode='aspectFit' border-radius="10" class="header_image" height="70rpx" :src="$imgFn(obj.image)"></u-image>
				<text>{{obj.name}}</text>
			</view>
			<view class="right">
				<text>余额：{{obj.balance}}</text>
			</view>
		</view>
		<view class="box">
			<view class="list-item">
				<text>支付金额</text>
				<u-input v-model="form.recharge_money" :clearable="false" placeholder="请输入支付金额" type="number" />
			</view>
			<view class="list-item">
				<text>赠送金额</text>
				<u-input v-model="form.reward_money" :clearable="false" placeholder="请输入赠送金额" type="number" />
			</view>
			<view class="list-item">
				<text>合计金额</text>
				<u-input v-model="sum_money" :clearable="false" :disabled="true" placeholder="请输入合计金额" type="number" />
			</view>
		</view>
		<view class="box">
			<view class="list-item">
				<text>销售员</text>
				<u-input v-model="user_name" @click="toSelecSalesperson" :clearable="false" :disabled="true" placeholder="请选择销售员"
				 type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
			</view>
			<view class="list-item">
				<text>备注</text>
				<u-input v-model="form.remarks" :clearable="false" placeholder="请输入备注" type="text" />
			</view>
			<view class="radios">
				<u-checkbox-group>
					<u-checkbox v-model="item.checked" class="rod" v-for="(item, index) in group" :key="index" :name="item.name">{{item.name}}</u-checkbox>
				</u-checkbox-group>
			</view>
		</view>
		<view class="footer">
			<view class="left">
				<text>收款</text>
				<text class="lan_se">&yen;{{form.recharge_money||0}}</text>
			</view>
			<view class="right" @click="showTag">
				收款
			</view>
		</view>
		<!-- 支付列表 -->
		<u-popup mode="bottom" v-model="showPayment" z-index="99" @open="open" height="440rpx">
			<view class="content">
				<view class="fot">
					<view class="left-content">
						<text>收款：</text>
						<text class="red">&yen;{{form.recharge_money}}</text>
					</view>
					<view class="right-content" @click="showPayment != false">
						取消
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 280rpx;">
					<view class="bods">
						<block v-for="(item,index) in paymentList" :key="index">
							<view class="pay" v-if="item.checked" @click="paymentItem(item,index)">
								<view class="pay-box">
									<u-icon name="rmb-circle" color="#aaaa7f" size="60"></u-icon>
									<text class="name">{{item.name}}</text>
									<u-icon name="checkmark-circle-fill" class="top-right" v-if="activePay==index" color="#ff9a26" size="32"></u-icon>
								</view>
							</view>
						</block>
					</view>
				</scroll-view>
				<view class="confrim-btn">
					<view class="btn" @click="paySure">
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
		accountList
	} from '../../api/account.js'
	import {
		recharge
	} from '../../api/customer.js'
	export default {
		data() {
			return {
				obj: {},
				form: {
					customer_id: 0,
					staff_id: 0,
					account_id: 0,
					recharge_money: '',
					reward_money: '',
					remarks: '',
				},
				showPayment: false,
				activePay: 9999, //支付方式下标
				payItem: {}, //支付方式
				styled: {

				},
				paymentList: [],
				user_name: '',
				group: [{
					name: '打印小票',
					checked: false,
				}, {
					name: '短信通知',
					checked: false,
				}, ],
			}
		},
		computed: {
			sum_money() {
				return Number(this.form.recharge_money) + Number(this.form.reward_money)
			}
		},
		methods: {
			// 弹起收款
			showTag() {
				if (this.form.recharge_money <= 0 && this.form.reward_money <= 0) {
					this.$refs.uToast.show({
						title: '请输入支付金额',
						type: 'default',
						position: 'center'
					})
				} else if (this.form.staff_id == 0) {
					this.$refs.uToast.show({
						title: '请选择销售员',
						type: 'default',
						position: 'center'
					})
				} else {
					this.showPayment = true;
				}

			},
			// 弹框打开
			open() {
				this.active = 9999;
				this.payItem = {};
				this.set_del = false;
			},
			// 选择的支付方式
			paymentItem(item, index) {
				this.activePay = index;
				this.payItem = item;
				// console.log(item);
			},
			// 支付列表
			async accountd() {
				let res = await accountList()
				res.map((v) => {
					v['checked'] = true;
				})
				this.paymentList = res;
				// console.log(res);
			},
			// 前往选择经手人
			toSelecSalesperson() {
				uni.navigateTo({
					url: '/pages/selecSalesperson/selecSalesperson'
				})
			},
			// 确定支付
			async paySure() {
				this.form.account_id = this.payItem.account_id;
				if (this.form.reward_money == '') {
					this.form.reward_money = 0
				}
				let res = await recharge(this.form)
				if (!res.code) {
					this.showPayment = false;
					uni.redirectTo({
						url: `/pages/paymentSuccess/paymentSuccess?payItem=${this.payItem.name}&money=${this.form.recharge_money}&recharge=1`
					})
				}
			}
		},
		onUnload() {
			uni.$off()
		},
		onLoad(option) {
			this.accountd()
			this.obj = JSON.parse(decodeURIComponent(option.obj));
			this.form.customer_id = this.obj.id;
			// 选择销售员
			uni.$on("selecSalesperson", (res) => {
				if (res) {
					this.user_name = res.name;
					this.form.staff_id = res.id;

				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.recharge {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #dedede;

		.footer {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			height: 80rpx;
			background-color: #FFFFFF;
			align-items: center;
			position: fixed;
			bottom: 0;

			.left {
				padding: 0 20rpx;

				.lan_se {
					margin-left: 20rpx;
					color: #007AFF;
				}
			}

			.right {
				width: 220rpx;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #007AFF;
				color: #FFFFFF;
			}
		}

		.membered {
			width: 100%;
			display: flex;
			justify-content: space-between;
			height: 90rpx;
			background-color: #2979ff;
			flex-direction: row;

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
				background-color: #EEEEEE;

				.rod {
					padding-left: 30rpx;
				}
			}

			.list-item {

				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 10rpx 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #EEEEEE;

				text {
					width: 160rpx;
				}
			}
		}
	}
</style>
