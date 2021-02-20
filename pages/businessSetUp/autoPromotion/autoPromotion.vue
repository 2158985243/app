<template>
	<view class="autoPromotion">
		<u-navbar back-icon-color='#ffffff' title="会员等级晋升" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen-fill" color="#ffffff" @click="toEdit" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<view class="box">
			<view class="top-nav">
				<view class="item-box">
					<view class="left">
						启用会员等级自动晋升
					</view>
					<view class="right lan" >
						{{checked}}
					</view>
				</view>
				<view class="item-box">
					<view class="left">
						晋升方式
					</view>
					<view class="right">
						{{type}}
					</view>
				</view>
				
			</view>
			
			<view class="main">
				<u-steps :list="numList" direction='column' :current='0' un-active-color="#2979ff" mode="dot"></u-steps>
			</view>
		</view>
	</view>
</template>

<script>
	import {getAutoPromotion} from '../../../api/customerLevel.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				checked:'已启用',
				type:'按累积积分提升',
				numList:[]
			}
		},
		methods: {
			// 前往编辑
			toEdit(){
				uni.navigateTo({
					url: `/pages/businessSetUp/editAutoPromotion/editAutoPromotion`
				})
			},
			// 初始化
			async init(){
				let res = await getAutoPromotion()
				console.log(res);
				if(!res.code){
					if(res.promotion_switch == 0){
						this.checked = '未启用'
					}else{
						this.checked = '已启用'
					}
					if(res.promotion_type == 1){
						this.type = '按累积积分提升'
					}else{
						this.type = '按当前积分晋升'
					}
					this.numList= res.customer_level
				}
			}
		},
		onLoad() {
		},
		onShow() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
.autoPromotion{
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #E5E5E5;
	min-height: 100%;
	.right_icon{
		margin-right: 30rpx;
	}
	.box{
		width: 100%;
		display: flex;
		flex-direction: column;
		.top-nav{
			width: 100%;
			display: flex;
			flex-direction: column;
			.item-box{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;
				.lan{
					color: #007AFF;
				}
			}
		}
		.main{
			width: 100%;
			display: flex;
			background-color: #FFFFFF;
			margin-top: 30rpx;
			padding: 20rpx 50rpx;
		}
	}
}
</style>
