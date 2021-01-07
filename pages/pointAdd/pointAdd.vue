<template>
	<view class="pointAdd">
		<view class="box">
			<view class="item-list">
				<text>消费</text>
				<u-input v-model="money" class="borders" placeholder="" :clearable="false" type="number" />
				<text>元，获得</text>
				<u-input v-model="point" class="borders" placeholder="" :clearable="false" type="number" />
				<text>积分</text>
			</view>
			<view class="item-checked">
				<text class="borde">设置默认</text>
				<u-switch v-model="checked" size="40" active-value="1" inactive-value="0" @change="changed"></u-switch>
			</view>
		</view>
		<view class="btn" @click="btnClick">
			保存
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		pointAdd
	} from '../../api/point.js'
	export default {
		data() {
			return {
				money: '',
				point: '',
				default: 0,
				checked: false,
			}
		},
		methods: {
			changed(v) {
				this.default = v
			},
			async btnClick() {
				if (this.money == '') {
					this.$refs.uToast.show({
						title: '请输入消费金额',
						type: 'default',
						position: 'bottom'
					})
				}else if(this.point == ""){
					this.$refs.uToast.show({
						title: '请输入获得积分',
						type: 'default',
						position: 'bottom'
					})
				}else{
					let res = await pointAdd({
						money:this.money,
						point:this.point,
						default:this.default
					})
					if(!res.code){
						uni.navigateBack()
					}
				}
			}
		},
		onLoad() {

		}
	}
</script>

<style scoped lang="scss">
	.pointAdd {
		width: 100%;
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #efefef;

		.btn {
			width: 100%;
			display: flex;
			height: 80rpx;
			justify-content: center;
			align-items: center;
			background-color: #007AFF;
			color: #FFFFFF;
			position: fixed;
			bottom: 0;
		}

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;

			.item-list {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				background-color: #FFFFFF;
				padding: 20rpx;
				padding-right: 35%;
				border-bottom: 0.01rpx solid #EEEEEE;

				// /deep/.u-input__input{
				// 	width: 100rpx !important;
				// 	border-bottom: 1rpx solid #007AFF;
				// }
				/deep/.uni-input-input {
					// width: 100rpx !important;
					border-bottom: 1rpx solid #007AFF;
					text-indent: 0.5em;
				}
			}

			.item-checked {
				display: flex;
				flex-direction: row;
				align-items: center;
				// justify-content: center;
				background-color: #FFFFFF;
				padding: 20rpx;

				.borde {
					font-weight: 600;
					padding-right: 20rpx;
				}
			}
		}
	}
</style>
