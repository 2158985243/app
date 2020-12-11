<template>
	<view class="addArticle">
	
			<view class="form_item">
				<text>支出项目</text>
				<u-input placeholder='请输入支出项目' v-model="name" type="text" />
			</view>
		
			<view class="btn">
				<u-button type="primary" class="btn" @tap="save">保存</u-button>
			</view>
	
		</view>
	</template>
	
	<script>
		import {
			expendItemAdd
		} from '../../api/expendItem.js'
		export default {
			data() {
				return {
					name: '',
					
				}
			},
			methods: {
				async save() {
					let res = await expendItemAdd({
						name: this.name
						
					})
					if (!res.code) {
						uni.redirectTo({
							url: `/pages/article/article`
						})
					}
				}
			}
		}
	</script>
	
	<style lang="scss" scoped>
		.addArticle {
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
	