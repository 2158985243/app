<template>
	<view class="expenseCancellation">
		<view class="box">
			<view class="money">
				<text>支出金额</text>
				<text class="lan">&yen;{{form.money}}</text>
			</view>
			<view class="article">
				<text>支出项目</text>
				<text>{{form.expend_item.name}}</text>
			</view>
		</view>
		<view class="box">
			<view class="nav">
				单据信息
			</view>
			<view class="box-child">
				<view class="list">
					<text>支出单号</text>
					<text>{{form.trade_no}}</text>
				</view>
				<view class="list">
					<text>支出时间</text>
					<text>{{form.created_at}}</text>
				</view>
				<view class="list">
					<text>支出店铺</text>
					<text>{{form.store.name}}</text>
				</view>
				<view class="list">
					<text>支出方式</text>
					<text>{{form.account.name}}</text>
				</view>
				<view class="list">
					<text>经办人</text>
					<text class="lan">{{form.user.name}}</text>
				</view>
				<view class="list">
					<text>支出备注</text>
					<text>{{form.remarks}}</text>
				</view>
			</view>
		</view>
		<view class="btn" @click="del">
			作废
		</view>
	</view>
</template>

<script>
	import {
		expendLog,
		expendLogCancel
	} from '../../api/expendLog.js'
	export default {
		data() {
			return {
				id: 0,
				form: {
					money: '',
					expend_item: {},
					account: {},
					store: {},
					user: {}
				}
			}
		},
		methods: {
			async init(id) {
				let res = await expendLog(id)
				console.log(res);
				this.form = res
			},
			async del() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否作废该单据？',
					success:async function(res) {
						if (res.confirm) {
							let res = await expendLogCancel(_this.id);
							if (!res.code) {
								uni.navigateBack()
							}
						} else if (res.cancel) {
							return true;
						}
					}
				});
				
			}
		},
		onLoad(query) {
			this.id = query.id;
			this.init(query.id);
		}
	}
</script>

<style scoped lang="scss">
	.expenseCancellation {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f4f4f4;
		height: 100%;

		.lan {
			color: #007AFF;
		}

		.box {
			display: flex;
			flex-direction: column;
			margin: 0 6rpx 20rpx;

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
			align-items: center;
			justify-content: center;
			background-color: #666666;
			color: #FFFFFF;
			position: fixed;
			bottom: 0;
		}
	}
</style>
