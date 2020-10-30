<template>
	<view class="changePassPword"> 
		<view class="box">
			<view class="form_item">
				<text>当前密码:</text>
				<u-input placeholder='请输入当前密码' v-model="form.old_pwd" type="number" />
			</view>
			<view class="form_item">
				<text>新密码:</text>
				<u-input placeholder='请输入新密码' v-model="form.pwd" type="number" />
			</view>
			<view class="form_item">
				<text>确定新密码:</text>
				<u-input placeholder='请输入新密码' v-model="form.pwd_confirmation" type="number" />
			</view>
			<u-button type="primary" class='btn_box' @click="save">确定修改</u-button>
		</view>
	</view>
</template>

<script>
	import {resetPwd} from '../../api/mine.js'
	export default {
		data() {
			return {
				form:{
					old_pwd:'',
					pwd:'',
					pwd_confirmation:''
				}
			}
		},
		methods: {
			async save(){
				let res = await resetPwd(this.form)
				if(!res.code){
					uni.navigateTo({
						url: `/pages/mine/mine`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.changePassPword{
	background-color: #EEEEEE;
	height: 100%;
	.btn_box{
		margin-top: 60rpx;
		width: 90%;
	}
	.box {
		margin-bottom: 20rpx;
	
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
	
	}
}
</style>
