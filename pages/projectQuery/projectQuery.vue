<template>
	<view class="projectQuery">
		<u-navbar back-icon-color='#ffffff' title="查询" :background="background" title-color="#ffffff">
			<template slot="right" @click="empty">
				<text class="right_icon">清空</text>
			</template>
		</u-navbar>
		<view class="box ">
			<view class="form_item">
				<text>支出项目</text>
				<u-input placeholder='请选择项目' :disabled='true' @click="toAddArticle" v-model="expend_item" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>支出账户</text>
				<u-input placeholder='请选择支出账户' :disabled='true' @tap="toSelectAccount" v-model="account" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>经手人</text>
				<u-input placeholder='请选择经手人' :disabled='true' @tap="toSelecSalesperson" v-model="user" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
		</view>
		<view class="btn" @click="sure">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				expend_item: '', //项目
				account: '', //账户
				user: '', //经手人
				form: {
					expend_item_id: 0,
					account_id: 0,
					user_id: 0,
				},
			}
		},
		methods: {
			toAddArticle() {
				uni.navigateTo({
					url: '/pages/article/article'
				})
			},
			// 前往选择账户
			toSelectAccount() {
				uni.navigateTo({
					url: '/pages/selectAccount/selectAccount'
				})
			},
			// 前往选择经手人
			toSelecSalesperson() {
				uni.navigateTo({
					url: '/pages/selecSalesperson/selecSalesperson'
				})
			},
			// 确定
			sure() {
				uni.$emit('projectQuery', this.form)
				uni.navigateBack()
			},
			// 清空
			empty() {
				this.expend_item = ''; //项目
				this.account = ''; //账户
				this.user = ''; //经手人
				this.form.expend_item_id = 0;
				this.form.account_id = 0;
				this.form.user_id = 0;
			}
		},
		onLoad() {

			uni.$on("addArticleDatum", (res) => {
				if (res) {
					this.expend_item = res.name;
					this.form.expend_item_id = res.id

				}
			});
			uni.$on("selectAccount", (res) => {
				if (res) {
					// console.log(res);
					this.account = res.name;
					this.form.account_id = res.account_id;
				}
			});
			uni.$on("selecSalesperson", (res) => {
				if (res) {
					console.log(res);
					this.user = res.name;
					this.form.user_id = res.id;
				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.projectQuery {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f8f8f8;
		height: 100%;

		.right_icon {
			margin-right: 30rpx;
			color: #FFFFFF;
		}

		.btn {
			position: fixed;
			bottom: 0;
			height: 80rpx;
			width: 100%;
			background-color: #007AFF;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.box {
			margin-bottom: 20rpx;

			.other-expenses {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
				height: 84rpx;

				.green {
					padding-left: 20rpx;
					flex: 1;

					text {
						background-color: #46c85b;
						border-radius: 8rpx;
						padding: 6rpx 10rpx;
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}

				.green-money {
					padding-left: 20rpx;
					flex: 1;
					color: green;
				}

				.orgin {
					padding-left: 20rpx;
					flex: 1;

					text {
						background-color: #ffaa00;
						border-radius: 8rpx;
						padding: 6rpx 10rpx;
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}

				.orgin-money {
					padding-left: 20rpx;
					flex: 1;
					color: #ffaa00;
				}
			}

			.form_item {
				padding-right: 20rpx;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
				margin-bottom: 2rpx;
				height: 85rpx;

				text {
					width: 220rpx;
					// text-align: left;
					padding-left: 20rpx;
				}

				.min_exchange {
					width: 150rpx;
				}

				.set {
					width: 80rpx;
					color: #2979ff;
				}

				.border_bt {
					border-bottom: 0.01rem solid #e3e3e3;
				}

				.man_r {
					border-left: 0.01rem solid #e3e3e3;
					padding: 28rpx 15rpx 28rpx 30rpx;
					// margin: 0 auto;
				}

			}

			.bottoms {
				margin-bottom: 80rpx;
			}

			.form_item2 {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 20rpx;
				background-color: #FFFFFF;
				height: 85rpx;

				text {
					color: #2979ff;

				}
			}

			.form_item3 {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 2rpx;
				background-color: #FFFFFF;
				height: 85rpx;
				margin-bottom: 70rpx;

				text {
					color: #2979ff;

				}
			}


		}
	}
</style>
