<template>
	<view class="addTrademark">
		<view class="form_item">
			<text>品牌名称</text>
			<u-input placeholder='请输入品牌名称' v-model="name" type="text" />
		</view>
		<view class="btn">
			<u-button type="primary" class="btn" @tap="save">保存</u-button>
		</view>
	</view>
</template>

<script>
	import {
		brandAdd
	} from '../../api/brand.js'
	export default {
		data() {
			return {
				name: '',
			}
		},
		methods: {
			async save() {
				let res = await brandAdd({
					name: this.name
				})
				if (!res.code) {
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.addTrademark {
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;

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
		}

		.btn {
			width: 100%;
			position: fixed;
			bottom: 0;
			z-index: 99;
			border-radius: 0 !important;

		}
	}
</style>
