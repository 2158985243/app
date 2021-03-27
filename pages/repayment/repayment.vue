<template>
	<view class="repayment">
		<u-navbar back-icon-color='#ffffff' title-color="#ffffff" title='还款' :background="background">

			<template slot="right">
				<text class="right_icon" @click="toDebtLog">还款记录</text>
			</template>
		</u-navbar>
		<view class="membered">
			<view class="left">
				<u-image width="70rpx" mode='aspectFit' border-radius="10" class="header_image" height="70rpx" :src="$imgFn(obj.image)"></u-image>
				<text>{{obj.name}}</text>
			</view>
			<view class="right">
				<text>欠款金额：&yen;{{obj.debt}}</text>
			</view>
		</view>
		<view class="box">
			<view class="box-item">
				<text>还款金额</text>
				<view class="input">
					<u-input v-model="form.money" height="50" placeholder='' type="number" />
				</view>
			</view>
			<view class="box-item">
				<text>备注说明</text>
				<u-input v-model="form.remarks" height="50" placeholder='' type="text" />
			</view>
			<view class="btn" @click="sure">
				确定
			</view>
		</view>
		<!-- 支付列表 -->
		<u-popup mode="bottom" v-model="showPayment" z-index="99" @open="open" height="440rpx">
			<view class="content">
				<view class="fot">
					<view class="left-content">
						<text>收款：</text>
						<text class="red">&yen;{{form.money}}</text>
					</view>
					<view class="right-content" @click="showPayment=false">
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
		repayment
	} from '../../api/customer.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				obj: {},
				form: {
					account_id: 0,
					customer_id: 0,
					money:'',
					remarks:''
				},
				showPayment: false, //支付方式显示
				active: 9999,
				paymentList: [],
				activePay: 999,
				payItem: {}
			}
		},
		methods: {
			// 支付列表
			async accountd() {
				let res = await accountList()
				res.unshift({
					account_id: 0,
					name: '余额支付',

				})
				res.map((v) => {
					v['checked'] = true;
					if (v.name == '欠款' || v.name == "余额支付") {
						v['checked'] = false;
					}
				})
				this.paymentList = res
			},
			// 还款记录
			toDebtLog() {
				uni.navigateTo({
					url: '/pages/debtLog/debtLog?obj=' + encodeURIComponent(JSON.stringify(this.obj))
				})
			},
			// 弹框打开
			open() {
				this.active = 9999;
				this.rebate = '';
			},
			// 选择的支付方式
			paymentItem(item, index) {
				this.activePay = index;
				this.payItem = item;
				this.form.account_id = item.account_id;
				console.log(item);
			},
			// 显示支付列表
			sure() {
				if(this.form.money>0){
					
				this.showPayment = true;
				}else{
					this.$refs.uToast.show({
						title: '请输入还款金额',
						type: 'default',
						position: 'bottom'
					})
					
				}
			},
			async paySure() {
				let res = await repayment(this.form)
				if(!res.code){
					uni.navigateBack()
				}
			}

		},
		onLoad(option) {
			this.obj = JSON.parse(decodeURIComponent(option.obj));
			// console.log(this.obj);
			this.form.customer_id = this.obj.id;
			// this.init()
			this.accountd()
		}
	}
</script>

<style scoped lang="scss">
	.repayment {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F5F5F5;
		min-height: 100%;

		/deep/.u-border-bottom:after {
			border-bottom-width: 0;
		}

		.right_icon {
			margin-right: 30rpx;
			color: #FFFFFF;
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
					color: #DD524D;
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

			// 
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
			// justify-content: center;
			align-items: center;

			.box-item {
				width: 100%;
				display: flex;
				flex-direction: row;
				padding: 20rpx 20rpx 10rpx 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;

				text {
					width: 180rpx;
				}
				.input{
					width: 80%;
					padding-bottom: 10rpx;
					border-bottom: 1rpx solid #007AFF;
				}
			}

			.btn {
				width: 90%;
				height: 80rpx;
				border-radius: 10rpx;
				background-color: #007AFF;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 90rpx;
			}
		}
	}
</style>
