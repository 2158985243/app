<template>
	<view class="addPatternOfPayment">
		<view class="form_item">
			<text>支付名称</text>
			<u-input placeholder='请输入支付名称' type='text' v-model="name"  />
		</view>
		<u-button type="primary" class="btn" @click="save">保存</u-button>
	</view>
</template>

<script>
	import {accountAdd} from '../../api/account.js'
	export default {
		data() {
			return {
				name:''
			}
		},
		methods: {
			async save(){
				let res = await accountAdd({name:this.name})
				if (!res.code) {
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addPatternOfPayment {
		height: 100%;
		background-color: #EEEEEE;
		.form_item {
			padding-right: 20rpx;
			display: flex;
			align-items: center;
			background-color: #FFFFFF;
			margin-bottom: 2rpx;
			height: 85rpx;

			text {
				width: 180rpx;
				// text-align: left;
				padding-left: 20rpx;
			}
		}
		.btn {
			width: 100%;
			position: fixed;
			bottom: 0;
		}
	}
</style>
