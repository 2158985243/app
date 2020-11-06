<template>
	<view class="addUnitList">

		<view class="form_item">
			<text>单位名称</text>
			<u-input placeholder='请输入单位名称' v-model="name" type="text" />
		</view>
		<view class="form_item">
			<text>备注</text>
			<u-input placeholder='请输入备注' v-model="remarks" type="text" />
		</view>
		
		<view class="btn">
			<u-button type="primary" class="btn" @tap="save">保存</u-button>
		</view>

	</view>
</template>

<script>
	import {
		unitAdd
	} from '../../api/unit.js'
	export default {
		data() {
			return {
				name: '',
				remarks:''
			}
		},
		methods: {
			async save() {
				let res = await unitAdd({
					name: this.name,
					remarks:this.remarks
				})
				if (!res.code) {
					uni.redirectTo({
						url: `/pages/unitList/unitList`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addUnitList {
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
