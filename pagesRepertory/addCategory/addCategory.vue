<template>
	<view class="addCategory">

		<view class="form_item">
			<text>分类名称</text>
			<u-input placeholder='请输入商品名称' v-model="name" type="text" />
		</view>
		<view class="form_item">
			<text>显示排序</text>
			<u-input placeholder='请输入排序' v-model="sort" type="text" />
		</view>
		<view class="btn">
			<u-button type="primary" class="btn" @click="save">保存</u-button>
		</view>

	</view>
</template>

<script>
	import {
		goodsCategoryAdd
	} from '../../api/goods_category.js'
	export default {
		data() {
			return {
				name: '',
				sort: 100
			}
		},
		methods: {
			async save() {
				let res = await goodsCategoryAdd({
					name: this.name,
					sort: this.sort
				})
				if (!res.code) {
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addCategory {
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
