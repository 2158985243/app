<template>
	<view class="editItems">
		<view class="header">
			<u-image width="100rpx" mode='aspectFit' border-radius="10" class="header_image" height="100rpx" :src="$cfg.domain+form.item.goodsOf.main_image"></u-image>
			<view class="header-data">
				<text class="borad">{{form.item.goodsOf.name}}</text>
				<text class="huise">{{form.item.goodsOf.number}}</text>
				<text class="red">&yen;{{form.item.goodsOf.retail_price}}</text>
			</view>
		</view>
		<view class="box">
			<view class="list-item">
				<view class="label-name">
					颜色
				</view>
				<u-input v-model="form.item.name" :disabled="true" :clearable="false" height="50" placeholder='' type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
			</view>
			<view class="list-item">
				<view class="label-name">
					尺码
				</view>
				<u-input v-model="item.size.name" @click="show = !show" :disabled="true" :clearable="false" height="50" placeholder=''
				 type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
			</view>
		</view>
		<view class="box">
			<view class="list-item">
				<view class="label-name">
					本次售价
				</view>
				<u-input v-model="item.retail_price" @input="inputPrice" :clearable="false" height="50" placeholder='' type="number" />
			</view>
			<view class="list-item">
				<view class="label-name">
					本次打折
				</view>
				<u-input v-model="item.discount" @input="inputDiscount" :clearable="false" height="50" placeholder='' type="number" />
			</view>
			<view class="number-box">
				<view class="label-name">
					销售数量
				</view>
				<u-number-box :min="0" v-model="item.quantity"></u-number-box>
			</view>
		</view>
		<u-popup mode="center" v-model="show" border-radius="20" width="70%">
			<view class="popup-box">

				<view class="popup-header">
					请选择尺码
				</view>
				<view class="popup-center">
					<u-radio-group v-model="value" :wrap='true'>
						<u-radio @change="radioChange($event,index)" v-for="(item, index) in form.item.data" :key="index" :name="item.size.name">
							{{item.size.name}}
						</u-radio>
					</u-radio-group>
				</view>
				<view class="btn-dolue">
					<view class="qx" @click="show = false">
						取消
					</view>
					<view class="qd" @click="sure">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
		<view class="btn" @click="itemClick">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				item: {},
				show: false,
				value: '',
				index_before: 0,
				index_later: 0
			}
		},
		methods: {
			// 销售价
			inputPrice(v){
				this.item.discount = (Number(v)/Number(this.form.item.goodsOf.retail_price)).toFixed(2)
			},
			// 打折
			inputDiscount(v){
				this.item.retail_price = (Number(this.form.item.goodsOf.retail_price)*Number(v)).toFixed(2)
			},
			itemClick() {
				let bl = true;
				this.form.item.data.map((v) => {
					if (v.size.name == this.item.size.name && v.size.id != this.item.size.id && v.quantity > 0) {
						this.$refs.uToast.show({
							title: '单据中已存在此尺码的商品',
							type: 'default',
							position: 'bottom'
						})
						bl = false;
						this.item.size.name = JSON.parse(JSON.stringify(this.form.item.data[this.form.indexGoods].size.name));
					}
				})
				if (bl) {
					let obj = {
						item: this.item,
						index: this.form.index,
						index_later: this.index_later,
						indexGoods: this.form.indexGoods
					}
					uni.$emit('editItems', obj)
					uni.navigateBack()
				}

			},
			sure() {
				this.item.size.name = this.value;
				this.index_later = this.index_before;
				this.show = false;

			},
			radioChange(v, index) {
				this.index_before = index;
			}
		},
		onLoad(option) {
			this.form = JSON.parse(decodeURIComponent(option.obj));
			this.item = JSON.parse(JSON.stringify(this.form.item.data[this.form.indexGoods]));
			this.value = this.item.size.name;
			this.index_later = this.form.indexGoods;
		}
	}
</script>

<style scoped lang="scss">
	.editItems {
		width: 100%;
		height: 100%;
		background-color: #EEEEEE;
		display: flex;
		flex-direction: column;

		.popup-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.popup-header {
				padding: 20rpx;
			}

			.popup-center {
				margin-left: 40rpx;
				padding-bottom: 20rpx;
			}

			.btn-dolue {
				width: 100%;
				height: 80rpx;
				display: flex;
				flex-direction: row;
				border-top: 1rpx solid #cccccc;

				.qx {
					display: flex;
					justify-content: center;
					align-items: center;
					flex: 1;
					border-right: 1rpx solid #cccccc;
				}

				.qd {
					display: flex;
					justify-content: center;
					align-items: center;
					flex: 1;
				}
			}
		}

		.btn {
			width: 100%;
			display: flex;
			height: 80rpx;
			color: #FFFFFF;
			background-color: #007AFF;
			position: fixed;
			bottom: 0;
			justify-content: center;
			align-items: center;
		}

		.header {
			display: flex;
			flex-direction: row;
			padding: 20rpx;
			background-color: #FFFFFF;
			margin-bottom: 20rpx;

			.header_image {
				margin-right: 20rpx;
			}

			.header-data {
				display: flex;
				flex-direction: column;

				.borad {}

				.huise {
					color: #E5E5E5;
					font-size: 20rpx;
				}

				.red {
					color: #DD524D;
					font-size: 24rpx;
				}
			}
		}

		.box {
			display: flex;
			flex-direction: column;
			margin-bottom: 20rpx;

			.list-item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				align-items: center;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;

				.label-name {
					width: 180rpx;
					color: #a5a5a5;
				}
			}

			.number-box {
				display: flex;
				flex-direction: row;
				padding: 20rpx;
				align-items: center;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;

				.label-name {
					width: 180rpx;
					color: #a5a5a5;
				}
			}
		}
	}
</style>
