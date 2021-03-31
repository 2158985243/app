<template>
	<view class="inventoryPreview">
		<view class="nav">
			<view class="list1">
				货号&颜色
			</view>
			<view class="list2">
				尺码
			</view>
			<view class="list3">
				盘点前后
			</view>
			<view class="list4">
				盈亏数
			</view>
			<view class="list5">
				盈亏金额
			</view>
		</view>
		<view class="mains">
			<!-- <view class="box">
			</view> -->
			<view class="nav1" v-for="(item,index) in list" :key='index'>
				<view class="left">
					<view class="lf">
						{{item.goods.number}}
					</view>
					<view class="lf">
						{{item.color.name}}
					</view>
				</view>
				<view class="right">
					<view class="rh-list" v-for="(itemSize,indexSize) in item.data" :key="indexSize">
						<view class="rh1">
							{{itemSize.size.name}}
						</view>
						<view class="rh2">
							{{itemSize.before_quantity}}→{{itemSize.quantity}}
						</view>
						<view class="rh3">
							{{Number(itemSize.quantity)-Number(itemSize.before_quantity) }}
						</view>
						<view class="rh4" :class=" Number(itemSize.quantity)-Number(itemSize.before_quantity) >0? 'green':''">
							{{(Number(itemSize.quantity)-Number(itemSize.before_quantity))*Number(itemSize.price)}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footers">
			<text class="txt1">盘点合计:{{sum}}</text>
			<text class="txt2">盈亏合计:<text class="red-color" :class="lossSum>0?'green':''">{{lossSum}}</text></text>
			<text class="txt3">盈亏金额:<text class="red-color" :class="lossMoney>0?'green':''">{{lossMoney}}</text></text>
			<view class="btn" @click="achieve">
				完成盘点
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCounts,
		checkEdit,
		checkAdd
	} from '../../api/check.js'
	export default {
		data() {
			return {
				list: {},
				ids: [],
				form: {},
				sum: 0,
				lossSum: 0,
				lossMoney: 0,
				id: 0
			}
		},
		methods: {
			async init() {
				let res = await getCounts({
					check_id: this.id || 0,
					store_id: this.form.store_id,
					ids: this.ids
				})
				// console.log(res);
				this.list = res;
				this.sum = 0;
				this.lossSum = 0;
				this.lossMoney = 0;
				this.list.map((v, i) => {
					v.data.map(v1 => {
						this.sum += Number(v1.quantity);
						this.lossSum += Number(v1.quantity) - Number(v1.before_quantity);
						this.lossMoney += (Number(v1.quantity) - Number(v1.before_quantity)) * Number(v1.price)
					})
				})
			},
			async achieve() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确定将此盘点结果调整为商品库存数量？',
					success: async function(res) {
						if (res.confirm) {
							_this.form.status = 1;
							if (_this.id) {

								let res = await checkEdit(_this.id, _this.form)
								if (!res.code) {
									uni.switchTab({
										url: `/pages/stockTaking/stockTaking`,
										fail(e) {
											console.log(e);
										}
									})
								}
							} else {

								let res = await checkAdd(_this.form)
								if (!res.code) {
									uni.switchTab({
										url: `/pages/stockTaking/stockTaking`,
										fail(e) {
											console.log(e);
										}
									})
								}

							}
						} else if (res.cancel) {
							console.log("点击了取消");
						}
					}
				});

			}
		},
		onLoad(query) {
			const editItem = JSON.parse(decodeURIComponent(query.obj));
			this.id = query.id
			// console.log(editItem);
			this.ids = editItem.check_list_ids;
			this.form = editItem;
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.inventoryPreview {
		width: 100%;
		display: flex;
		flex-direction: column;

		.nav {
			position: fixed;
			top: 0;
			width: 100%;
			display: flex;
			flex-direction: row;
			height: 80rpx;
			padding: 0 10rpx;
			border-bottom: 0.01rem solid #e6e6e6;
			background-color: #FFFFFF;

			.list1 {
				width: 20%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.list2 {
				width: 12%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.list3 {
				width: 25%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.list4 {
				width: 15%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.list5 {
				width: 28%;
				display: flex;
				justify-content: center;
				align-items: center;
			}


		}

		.mains {
			width: 100%;
			display: flex;
			flex-direction: column;
			// margin-top: 88rpx;
			margin-bottom: 80rpx;

			.nav {
				// position: fixed;
				// top: 88rpx;
				width: 100%;
				display: flex;
				flex-direction: row;
				height: 80rpx;
				padding: 0 10rpx;
				border-bottom: 0.01rem solid #e6e6e6;
				background-color: #FFFFFF;

				.list1 {
					width: 20%;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.list2 {
					width: 12%;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.list3 {
					width: 25%;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.list4 {
					width: 15%;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.list5 {
					width: 28%;
					display: flex;
					justify-content: center;
					align-items: center;
				}


			}

			.box {
				width: 100%;
				height: 88rpx;
			}

			.nav1 {
				width: 100%;
				display: flex;
				flex-direction: row;
				border-bottom: 0.01rem solid #e6e6e6;

				.left {
					width: 20%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
				}

				.right {
					width: 80%;
					display: flex;
					flex-direction: column;

					.rh-list {
						width: 100%;
						display: flex;
						flex-direction: row;
						border-bottom: 0.01rem solid #e6e6e6;
						padding: 20rpx 0;

						.rh1 {
							width: 15%;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24rpx;
						}

						.rh2 {
							width: 31.25%;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24rpx;
						}

						.rh3 {
							width: 18.75%;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24rpx;
						}

						.rh4 {
							width: 35%;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #FF5A5F;
							font-size: 24rpx;
						}

						.green {
							color: #4CD964;
						}
					}

					.rh-list:last-of-type {
						border-bottom: none;
					}
				}
			}

		}

		.footers {
			width: 100%;
			height: 80rpx;
			background-color: #e6e5ea;
			display: flex;
			flex-direction: row;
			position: fixed;
			bottom: 0;

			.red-color {
				color: #DD524D;
			}

			.txt1 {

				width: 25%;
				display: flex;
				font-size: 20rpx;
				justify-content: center;
				align-items: center;
			}

			.txt2 {
				width: 25%;
				display: flex;
				font-size: 20rpx;
				// justify-content: center;
				align-items: center;
			}

			.txt3 {
				width: 32%;
				display: flex;
				font-size: 20rpx;
				// justify-content: center;
				align-items: center;
			}

			.btn {
				width: 18%;
				height: 100%;
				background-color: #007AFF;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.green {
				color: #4CD964;
			}
		}
	}
</style>
