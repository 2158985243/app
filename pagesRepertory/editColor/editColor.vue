<template>
	<view class="editColor">
		<view class="form_item">
			<text>颜色名称</text>
			<u-input placeholder='请输入商品名称' v-model="name" type="text" />
		</view>
		<view class="btn">
			<u-button type="primary" class="btn" @click="save">保存</u-button>
		</view>
	</view>
</template>

<script>
	import {colorEdit} from '../../api/colors.js' 
	export default {
		data() {
			return {
				name: '',
				id:0
		
			}
		},
		methods: {
			async save(){
				let res = await colorEdit(this.id,{name:this.name})
				if(!res.code){
					uni.navigateBack()
				}
			}
		},
		onLoad(query) {
			// console.log(query);
			this.id = query.id;
			this.name = query.name;
			
		}
	}
</script>

<style lang="scss" scoped>
.editColor{
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
