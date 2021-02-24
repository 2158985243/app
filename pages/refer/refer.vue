<template>
	<view class="refer">
		<u-navbar back-icon-color='#ffffff' title="查询" :background="background" title-color="#ffffff">
			<template slot="right">
				<text class="right_icon" @click="delHistory">清空</text>
			</template>
		</u-navbar>
		<view class="box">
			<view class="form_item">
				<text>供应商</text>
				<u-input placeholder='请选择供应商' @tap="toChooseSupplier" :disabled='true' v-model="supplier" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>店铺</text>
				<u-input placeholder='请选择店铺' @click="toStore" :disabled='true' v-model="shop" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>单号</text>
				<u-input placeholder='请输入单号' v-model="form.number" type="text" />
				<!-- <u-icon name="arrow-right" color="#cccccc" size="28"></u-icon> -->
			</view>
		</view>

		<view class="box">
			<view class="form_item">
				<text>开始日期</text>
				<u-input placeholder='请选择时间' @tap="hiddenTime(0)" :disabled='true' v-model="form.start_time" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<u-picker mode="time" v-model="showtime" @confirm="confirmTime" :params="params"></u-picker>
			<view class="form_item">
				<text>结束日期</text>
				<u-input placeholder='请选择时间' @tap="hiddenTime(1)" :disabled='true' v-model="form.end_time" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<u-picker mode="time" v-model="showtime1" @confirm="confirmTime1" :params="params"></u-picker>
		</view>
		<u-button class="btn" @click="affirm" type="primary">确认</u-button>
	</view>
</template>

<script>
	import store from '@/store'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				showtime: false,
				showtime1: false,
				form: {
					supplier_id: '',
					store_id: '',
					number: '',
					start_time: '',
					end_time: ''
				},
				supplier: "",
				shop: "",
			}
		},
		methods: {
			// 确认
			affirm() {
				let obj = {
					supplier:this.supplier,
					shop:this.shop,
					form:this.form
				}
				this.$store.commit('referFn', {
					referDate: obj
				})
				uni.$emit('refer', this.form)
				
				uni.navigateBack()
			},
			// 前往供应商
			toChooseSupplier() {
				uni.navigateTo({
					url: '/pages/chooseSupplier/chooseSupplier'
				})
			},
			// 前往店铺
			toStore() {
				uni.navigateTo({
					url: '/pages/storeManagement/storeManagement?iq=1'
				})
			},
			// 打开选择时间
			hiddenTime(v) {
				if (v) {
					this.showtime1 = true;
				} else {
					this.showtime = true;
				}
			},
			// 选择时间
			confirmTime(v) {
				this.form.start_time = `${v.year}-${v.month}-${v.day}`;
			},
			// 选择时间
			confirmTime1(v) {
				this.form.end_time = `${v.year}-${v.month}-${v.day}`;
			},
			// 清空
			delHistory() {
				this.form.supplier_id = 0;
				this.form.store_id = 0;
				this.form.number = "";
				this.supplier = '';
				this.shop = '';
			}
		},
		onLoad(option) {
			let bl = false 
			for(let key in store.state.referDate){
				bl = true
			}
			if(bl){
				this.supplier = store.state.referDate.supplier;
				this.shop =store.state.referDate.shop;
				this.form = store.state.referDate.form
			}else{
				let date = this.$date.thirtyDays()
				this.form.start_time = date.start_time
				this.form.end_time = date.end_time
			}

			uni.$on("supplierDatum", (res) => {
				if (res) {
					// console.log(res);
					this.form.supplier_id = res.id;
					this.supplier = res.name;
				}
			});
			uni.$on("gloEvent", (res) => {
				if (res) {
					// console.log(res);
					this.shop = res.name;
					this.form.store_id = res.id;
				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.refer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;

		.btn {
			width: 90vw;
		}

		.right_icon {
			margin-right: 30rpx;
			color: #FFFFFF;
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
					border-bottom: 0.01rem solid #C0C0C0;
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
