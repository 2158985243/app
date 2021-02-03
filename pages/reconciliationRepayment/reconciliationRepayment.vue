<template>
	<view class="reconciliationRepayment">
		<view class="box">
			<view class="box-item">
				<view class="left">
					供应商名称
				</view>
				<view class="right">
					<u-input placeholder='请选择供应商' @tap="toChooseSupplier" :disabled='true' v-model="supplier_name" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>

			<view class="box-item">
				<view class="left">
					应付金额
				</view>
				<view class="right">
					<text>{{balance}}</text>
				</view>
			</view>

			<view class="box-item">
				<view class="left">
					付款账户
				</view>
				<view class="right">
					<u-input placeholder='请选择付款账户' @tap="toPatternOfPayment" :disabled='true' v-model="account_name" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<view class="box-item">
				<view class="left">
					付款金额
				</view>
				<view class="right">
					<u-input placeholder='请输入实付金额' v-model="money" type="number" />
				</view>
			</view>
			

		</view>
		<view class="box">
			<view class="box-item">
				<view class="left">
					业务时间
				</view>
				<view class="right">
					{{business_time}}
				</view>
			</view>
			<view class="box-item last-item">
				<view class="left">
					备注
				</view>
				<view class="right">
					<u-input placeholder='' v-model="remarks" type="text" />
				</view>
			</view>
		</view>
		<view class="btn" @click="sure">
			保存
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		repayment
	} from '../../api/supplier.js'
	export default {
		data() {
			return {
				balance: '',
				supplier_id: 0,
				account_id: 0,
				name: '',
				account_name: '',
				supplier_name: '',
				remarks: '',
				money: '',
				business_time: ''

			}
		},
		methods: {
			async sure() {
				if (this.account_id == 0) {
					this.$refs.uToast.show({
						title: '请选择付款账户',
						type: 'default',
						position: 'bottom'
					})

				} else if (!this.money || this.money == 0) {
					this.$refs.uToast.show({
						title: '请输入实付金额',
						type: 'default',
						position: 'bottom'
					})
				} else {
					let res = await repayment({
						supplier_id: this.supplier_id,
						account_id: this.account_id,
						money: this.money,
						business_time: this.business_time,
						remarks: this.remarks,
					})
					if (!res.code) {
						uni.navigateBack()
					}
				}
			},
			// 付款方式
			toPatternOfPayment() {
				uni.navigateTo({
					url: `/pages/patternOfPayment/patternOfPayment?iq=1&ip=1`
				})
			},
			// 供应商
			toChooseSupplier() {
				uni.navigateTo({
					url: '/pages/chooseSupplier/chooseSupplier'
				})
			},

		},
		onLoad(query) {
			this.name = query.name;
			let date = this.$date.today()
			this.business_time = date.start_time;
			uni.$on('patternOfPayment', res => {
				if (res) {
					this.account_id = res.account_id;
					this.account_name = res.name
				}
			})
			uni.$on("supplierDatum", (res) => {
				if (res) {
					this.supplier_id = res.id;
					this.supplier_name = res.name;
					this.balance = res.balance;
				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.reconciliationRepayment {
		width: 100%;
		display: felx;
		flex-direction: column;
		min-height: 100%;
		background-color: #F5F7F4;

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 20rpx;
			.box-item {
				width: 100%;
				height: 90rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 0 20rpx;
				border-bottom: 0.01rem solid #e1e0e5;
				background-color: #FFFFFF;

				.left {
					color: #999999;
					display: flex;
					align-items: center;
					width: 200rpx;
				}

				.right {
					width: calc(100% - 200rpx);
					display: flex;
					flex-direction: row;
					justify-content: space-between;
				}
			}

			.last-item {
				border-bottom: 0 solid #C8C7CC;
			}
		}

		.btn {
			width: 100%;
			height: 80rpx;
			color: #FFFFFF;
			background-color: #4C8AF2;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			bottom: 0;
		}
	}
</style>
