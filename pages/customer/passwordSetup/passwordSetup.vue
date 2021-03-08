<template>
	<view class="passwordSetup">
		<view class="hint">
			<text>温馨提示:</text>
			<text>1、会员<text>开启密码</text>后到店消费，需要向收银员提供会员密码才能结账</text>
			<text>2、员工可对会员密码进行开启、关闭、修改(请勿随意开关和修改会员密码)</text>
		</view>
		<view class="center">
			<view class="item-box">
				<view class="left">
					会员卡密码
				</view>
				<view class="right">
					<u-input placeholder='请输入6位数数字' input-align='center' :password-icon='false' maxlength='6' :clearable='false' height="50"  v-model="password" type="password" />
					<u-icon name="arrow-right" color="#cccccc" size="24"></u-icon>
				</view>
			</view>
			<view class="item-box">
				<view class="left">
					密码使用
				</view>
				<view class="right">
					<u-switch v-model="checked" @change="change" active-value="1" inactive-value="0"></u-switch>
				</view>
			</view>
			
		</view>
		<view class="btn" @click="sure">
			保存
		</view>
	</view>
</template>

<script>
	import {customerEdit} from '../../../api/customer.js'
	export default {
		data() {
			return {
				id:0,
				password:'',
				checked:false
			}
		},
		methods: {
			async sure(){
				if(this.password.length<6){
					uni.showToast({
						title: '请输入6位数数字密码!',
						duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}else if(this.password=='******'){
					uni.navigateBack()
				}else{
					let res = await customerEdit(this.id,{
						password:this.password
					})
					if(!res.code){
						uni.navigateBack()
					}
				}
			},
			change(v){
					if(this.password.length<6){
						this.checked=false
						uni.showToast({
							title: '请输入6位数数字密码!',
							duration: 1000,
							icon:"none",
							position:"bottom"
						});
					}
					if(v==0){
						this.password = ''
					}
			}
		},
		onLoad(query) {
			this.id = query.id
			this.password = query.password
			if(this.password.length>0){
				this.checked = true
			}
		}
	}
</script>

<style scoped lang="scss">
.passwordSetup{
	width: 100%;
	display: flex;
	flex-direction: column;
	min-height: 100%;
	background-color: #E5E5E5;
	.center{
		width: 100%;
		display: flex;
		flex-direction: column;
		.item-box{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			background-color: #FFFFFF;
			padding: 20rpx;
			border-bottom: 0.01rem solid #F7F7F7;
			.right{
				display: flex;
				flex-direction: row;
			}
		}
	}
	.btn{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80rpx;
		background-color: #007AFF;
		color: #FFFFFF;
		position: fixed;
		bottom: 0;
	}
	.hint{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		// align-items: center;
		padding: 20rpx;
		text{
			padding: 10rpx;
		}
	}
}
</style>
