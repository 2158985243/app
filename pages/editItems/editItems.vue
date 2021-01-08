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
			<view class="list-item" >
				<view class="label-name">
					尺码
				</view>
				<u-input v-model="item.size.name" @click="show = !show" :disabled="true" :clearable="false" height="50" placeholder='' type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
			</view>
		</view>
		<view class="box">
			<view class="list-item">
				<view class="label-name">
					本次售价
				</view>
				<u-input v-model="item.retail_price" :clearable="false" height="50" placeholder='' type="number" />
			</view>
			<view class="list-item">
				<view class="label-name">
					本次打折
				</view>
				<u-input v-model="item.discount" :clearable="false" height="50" placeholder='' type="number" />
			</view>
			<view class="number-box">
				<view class="label-name">
					销售数量
				</view>
				<u-number-box :min="1" v-model="item.quantity"></u-number-box>
			</view>
		</view>
		<u-popup mode="center" v-model="show" border-radius="20" width="70%" >
			<view class="popup-box">

				<view class="popup-header">
					请选择尺码
				</view>
				<view class="popup-center">
					<u-radio-group v-model="value" :wrap='true' >
						<u-radio @change="radioChange($event,index)"  v-for="(item, index) in form.item.data" :key="index" :name="item.size.name" >
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
				value:''
			}
		},
		methods: {
			itemClick() {
				console.log(this.item);
			},
			sure(){
				this.item.size.name = this.value
			},
			radioChange(v,index){
				console.log(v,index);
			}
		},
		onLoad(option) {
			this.form = JSON.parse(decodeURIComponent(option.obj));
			this.item = this.form.item.data[this.form.indexGoods]
			console.log(this.form, this.item);
			this.value = this.item.size.name
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
			.popup-center{
				margin-left:40rpx;
				padding-bottom: 20rpx;
			}
			.btn-dolue{
				width: 100%;
				height: 80rpx;
				display: flex;
				flex-direction: row;
				border-top:1rpx solid #cccccc ;
				.qx{
					display: flex;
					justify-content: center;
					align-items: center;
					flex: 1;
					border-right: 1rpx solid #cccccc;
				}
				.qd{
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
