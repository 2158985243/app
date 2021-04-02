<template>
	<view class="accountManagement">
		<u-navbar back-icon-color='#ffffff' title="账户管理" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="plus" @click="toAddPatternOfPayment" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="header" @tap="itemCilck({account_id:0})">
			<text>总余额</text>
			<view class="">
				<text class="lan">&yen;{{sum_money}}</text>
				<u-icon class='right' name="arrow-right" color="#cccccc" size="36"></u-icon>
			</view>
		</view>
		<view class="list">
			<view class="box" @tap="itemCilck(item)" v-for="(item,index) in list" :key="item.id">
				<text>{{item.name}}</text>
				<view class="">
					<text>&yen;{{item.sum_money}}</text>
					<u-icon class='right' name="arrow-right" color="#cccccc" size="36"></u-icon>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="boss">
				<view class="hz borde" @click="toMutualTransfer">
					账户互转
				</view>
				<view class="borde" @click="toBaseMoneyAdjust">
					期初调整
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		accountList
	} from '../../api/account.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				list: [],
				sum_money: 0
			}
		},
		methods: {
			async init() {
				let res = await accountList()
				this.sum_money = 0;
				console.log(res);
				this.list = res;
				res.map((v) => {
					v['sum_money'] = (Number(v.base_money) + Number(v.money)).toFixed(2)
					this.sum_money += Number(v.money)
				})
			},
			toAddPatternOfPayment() {
				uni.navigateTo({
					url: `/pagesHome/addPatternOfPayment/addPatternOfPayment`
				})
			},
			itemCilck(e) {
				uni.navigateTo({
					url: '/pagesHome/accountLog/accountLog?obj=' + encodeURIComponent(JSON.stringify(e))
				})
			},
			// 账户互转
			toMutualTransfer() {
				uni.navigateTo({
					url: `/pagesHome/mutualTransfer/mutualTransfer`
				})
			},
			// 账户互转
			toBaseMoneyAdjust() {
				uni.navigateTo({
					url: `/pagesHome/baseMoneyAdjust/baseMoneyAdjust`
				})
			},

		},
		onLoad() {

		},
		onShow() {
			this.init()

		}
	}
</script>

<style lang="scss" scoped>
	.accountManagement {
		width: 100%;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 30rpx;
		}

		.header {
			width: 100%;
			height: 100rpx;
			position: fixed;
			background-color: #FFFFFF;
			top: calc(84rpx + var(--status-bar-height));
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			border-bottom: 0.01rem solid #eeeeee;
			align-items: center;
			padding: 20rpx;
			z-index: 99;

			.right {
				margin-right: 10rpx;
			}

			.lan {
				color: #007AFF;
			}
		}

		.list {
			display: flex;
			flex-direction: column;
			margin: 100rpx 0;

			.box {
				display: flex;
				justify-content: space-between;
				height: 80rpx;
				line-height: 80rpx;
				text-indent: 1em;
				border-radius: 10rpx;
				margin: 10rpx 10rpx 0;
				background-color: #C0C0C0;
				color: #fafafa;

				.right {
					margin-right: 10rpx;
				}
			}
		}

		.footer {
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			z-index: 99;

			.boss {
				width: 90%;
				height: 80rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				border-radius: 15rpx;
				background-color: #269aff;

				.hz {
					border-right: 4rpx solid #FFFFFF;
				}

				.borde {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>
