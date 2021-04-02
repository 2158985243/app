<template>
	<view class="reconciliation">
		<u-navbar back-icon-color='#ffffff' title="供应商对账" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="plus" color="#ffffff" @click="toReconciliationRepayment" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<view class="search">
			<u-search placeholder="请输入供应商姓名" style="width: 90%;" shape='square' height='60' @change="changeInput" :input-style="style_input"
			 :show-action='false' margin='20rpx' v-model="keyword"></u-search>

		</view>
		<view class="sc-nav">
			<view class="sc-item">
				<text class="black">全部供应商</text>
				<text class="lan">{{list.length||0}}</text>
			</view>
			<view class="sc-item">
				<text class="black">欠款供应商</text>
				<text class="lan">{{debtNumber||0}}</text>
			</view>
			<view class="sc-item">
				<text class="black">欠款金额</text>
				<text class="lan">{{debtMoney||0}}</text>
			</view>
		</view>
		<view class="management_list">
			<!-- <k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore"> -->
			<view class="list" v-for="(item,index) in list" :key="index" @click="toSupplierDetails(item)">
				<view class="left">
					<text>{{item.name}}</text>
					<text class="weights">欠款：{{item.money}}</text>

				</view>
				<view class="right">
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<!-- </k-scroll-view>
			<u-toast ref="uToast" /> -->
		</view>
	</view>
</template>

<script>
	import {
		reconciliation
	} from '../../api/supplier.js'
	export default {
		data() {
			return {
				style_input: {
					'background-color': '#ffffff'
				},
				background: {
					backgroundColor: '#2979ff'
				},
				keyword: '',
				list: []
			}
		},
		computed: {
			// 欠款供应商
			debtNumber() {
				let num = 0;
				this.list.map((v) => {
					if (v.money > 0) {
						num += Number(v.money)
					}
				})
				return num;
			},
			// 欠款金额
			debtMoney() {
				let money = 0;
				this.list.map((v) => {
					money += Number(v.money)
				})
				return money;
			}
		},
		methods: {
			changeInput(v) {
				this.init(v)
			},
			async init() {
				let res = await reconciliation({
					keyword: this.keyword
				})
				if (!res.code) {
					this.list = res
				}
			},
			toSupplierDetails(item){
				uni.navigateTo({
					url:`/pagesStatement/supplierLog/supplierLog?id=${item.id}&name=${item.name}`
				})
			},
			// 
			toReconciliationRepayment(){
				uni.navigateTo({
					url:`/pagesStatement/reconciliationRepayment/reconciliationRepayment`
				})
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.reconciliation {
		width: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F5F5F5;

		.right_icon {
			margin-right: 30rpx;
		}

		.search {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #e7e7e7;
		}

		.sc-nav {
			width: 100%;
			display: flex;
			flex-direction: row;
			background-color: #e7e7e7;
			margin-bottom: 20rpx;

			.sc-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
				flex: 1;
				padding: 20rpx;

				.lan {
					color: #007AFF;
				}

				.black {
					color: #000000;
					padding-bottom: 20rpx;
				}
			}
		}

		/deep/.u-content {
			background-color: #FFFFFF !important;
		}

		.header_image {
			margin-right: 20rpx;
		}

		/deep/.u-image__image {
			border-radius: 18rpx !important;

		}

		.management_list {
			width: 100%;
			display: flex;
			flex-direction: column;
		}

		.list {
			width: 100%;
			height: 100rpx;
			background-color: #FFFFFF;
			text-indent: 1em;
			padding: 10rpx 0;
			border-bottom: 0.01rem solid #dedede;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.left {
				display: flex;
				flex-direction: column;
				justify-content: center;
			}

			.right {
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-right: 10rpx;
			}
		}

		.right_icon {
			margin-right: 30rpx;
		}

		.weights {
			color: #a8a8a8;
			font-size: 24rpx;
			padding-top: 16rpx;
		}
	}
</style>
