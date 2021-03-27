<template>
	<view class="spendItem">
		<view class="num">
			<view class="left">
				<view class="max-size">
					{{form.money}}
				</view>
			</view>
			<view class="right">
				<u-image width="120" error-icon="plus" height="120" mode='aspectFit' :src="$imgFn(form.image)">
				</u-image>
			</view>
		</view>
		<view class="box ">
			<view class="form_item">
				<text>项目</text>
				<u-input placeholder='' :disabled='true' v-model="form.expend_item.name" type="text" />
			</view>
			<view class="form_item">
				<text>账户</text>
				<u-input placeholder='' :disabled='true' v-model="form.account.name" type="text" />
			</view>
		</view>
		<view class="box ">
			<view class="form_item">
				<text>经手人</text>
				<u-input placeholder='' :disabled='true' v-model="form.user.name" type="text" />
			</view>
			<view class="form_item">
				<text>日期</text>
				<u-input placeholder='' :disabled='true' v-model="form.business_time" type="text" />
			</view>
			<view class="form_item">
				<text>备注</text>
				<u-input placeholder='' :disabled='true' v-model="form.remarks" type="text" />
			</view>
		</view>
		<view class="btn" @click="del">
			作废
		</view>
	</view>
</template>

<script>
	import urls from '../../api/configuration.js'
	import {
		expendLog,
		expendLogCancel
	} from '../../api/expendLog.js'
	export default {
		data() {
			return {
				limit: ['png', 'jpg', 'jpeg'],
				fileList: [],
				action: '',
				expend_item: '', //项目
				account: '', //账户
				user: '', //经手人
				showtime: false,
				form: {
					money: 0,
					expend_item: {},
					account: {},
					user: {},
					business_time: '',
					image: '',
					remarks: ''
				},
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				formData: {
					type: '',
					path: ''
				},
				header: {
					token: ''

				},
				// res_number: "0.00",
				str_number: "",
				add: false,
				reduce: false,
				str: '',
				deep_copy: '',
				id: 0,
			}
		},
		computed: {
			res_number() {
				var tmp = this.str_number;
				if (this.str_number.length) {
					var val = this.str_number.charAt(this.str_number.length - 1);
					if (!/^[0-9]$/.test(val)) {
						tmp = tmp + '0';
					}
					return Number(eval(tmp).toFixed(2));
				} else {
					return Number(tmp);
				}
			}

		},
		methods: {
			// 选择时间
			confirmTime(v) {
				this.form.business_time = `${v.year}-${v.month}-${v.day}`;
			},
			hiddenTime() {
				this.showtime = true;
			},
			// 确定
			async ensure() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否作废该单据？',
					success: async function(res) {
						if (res.confirm) {
							let res = await expendLogCancel(_this.id);
							if (!res.code) {
								uni.navigateTo({
									url: '/pages/expenseBook/expenseBook'
								})
							}
						} else if (res.cancel) {
							return true;
						}
					}
				});
			},
			async init(id) {
				let res = await expendLog(id);
				console.log(res);
				this.form = res
			},
			async del() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否作废该单据？',
					success: async function(res) {
						if (res.confirm) {
							let res = await expendLogCancel(_this.id);
							if (!res.code) {
								uni.navigateTo({
									url: '/pages/expenseBook/expenseBook'
								})
							}
						} else if (res.cancel) {
							return true;
						}
					}
				});

			}

		},
		onLoad(query) {
			this.id = query.id
			const userMessage = uni.getStorageSync('userMessage');
			this.header.token = "Bearer " + userMessage.token
			this.action = urls.baseURL;
			this.init(query.id)
		}
	}
</script>

<style scoped lang="scss">
	.spendItem {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		height: 100%;

		.btn {
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #007AFF;
			color: #FFFFFF;
			position: fixed;
			bottom: 0;
		}

		.compute {
			width: 100%;
			height: 40vh;
			display: flex;
			flex-wrap: wrap;
			position: fixed;
			bottom: 0;
			border-top: 0.01rem solid #e3e3e3;
			border-left: 0.01rem solid #e3e3e3;

			.key {
				width: 25%;
				height: 25%;
				font-size: 36rpx;
				font-weight: 600;
				background-color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 0.01rem solid #e3e3e3;
				border-right: 0.01rem solid #e3e3e3;
			}

			.lan {
				background-color: #F8F8F8 !important;
				color: #007AFF;
			}
		}

		.num {
			width: 100%;
			height: 140rpx;
			display: flex;
			flex-direction: row;
			background-color: #FFFFFF;
			border-bottom: 4rpx solid #007AFF;

			.left {
				// width: calc(100%-#{160rpx});
				width: 100%;
				display: flex;
				flex-direction: column;

				.max-size {
					display: flex;
					align-items: center;
					width: 100%;
					height: 100%;
					color: #007AFF;
					font-size: 36rpx;
					padding-left: 20rpx;
				}

			}

			.right {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 20rpx;
			}
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

			.box1 {
				margin-bottom: 20rpx;

				.form_item1 {
					padding-right: 20rpx;
					display: flex;
					align-items: center;
					background-color: #FFFFFF;
					margin-bottom: 2rpx;
					height: 280rpx;

					/deep/.u-add-tips {
						margin-top: 0;
					}

					text {
						width: 180rpx;
						// text-align: left;
						padding-left: 20rpx;
					}

					/deep/.u-delete-icon {
						top: 0;
						right: 0;
						width: 28rpx;
						height: 28rpx;
					}
				}
			}
		}
	}
</style>
