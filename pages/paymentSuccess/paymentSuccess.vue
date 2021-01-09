<template>
	<view class="paymentSuccess">
		<u-navbar back-icon-color='#ffffff'  title="支付成功" :background="background" title-color="#ffffff">
			<template slot="right">
				<view class="right_icon">
					打印
				</view>
			</template>
		</u-navbar>
		<view class="box">
			<u-icon name="checkmark-circle-fill" color="#2979ff" size="128"></u-icon>
			<text class="red">&yen;{{money}}</text>
			<text>{{payItem}} 支付成功 </text>
			<view class="shen-lan" @click="toResaleCashier">
				继续销售
			</view>
			<view class="qian-lan" @click="toHome">
				返回首页
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				money:0,
				payItem:''
			}
		},
		methods: {
			// 前往销售
			toResaleCashier(){
				this.$store.commit('commercialSpecification',{
					specificationOfGoods:[]
				})
				this.$store.commit('stateGoodFn',{
					stateGood:false
				})
				uni.navigateBack({
					delta: 2
				})
			},
			// 前往首页
			toHome(){
				uni.switchTab({
					url: `/pages/home/home`,
					fail(e) {
						console.log(e);
					}
				})
			}
		},
		onLoad(query) {
			this.money = query.money;
			this.payItem = query.payItem;
		}
	}
</script>

<style scoped lang="scss">
.paymentSuccess{
	width: 100%;
	height: 100%;
	background-color: #f4f4f4;
	display: flex;
	flex-direction: column;
	.right_icon{
		margin-right: 30rpx;
		color: #FFFFFF;
		display: flex;
	}
	.box{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #FFFFFF;
		padding: 40rpx;
		.red{
			color: #FF5A5F;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 20rpx 0;
		}
		.shen-lan{
			width: 80%;
			height: 80rpx;
			background-color: #2979ff;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
			margin: 20rpx 0;
			border-radius: 14rpx;
		}
		.qian-lan{
			width: 80%;
			height: 80rpx;
			background-color: #0bb6ff;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
			margin-bottom: 20rpx;
			border-radius: 14rpx;
		}
	}
}
</style>
