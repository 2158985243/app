<template>
	<view class="IntegralList">
		<view class="list" v-for="(item,index) in list" :key="index" @click="itemClick(item)">
			<view class="left">
				<text>{{item.money}}元 = {{item.point}}积分</text>
			</view>
			<view class="right">
				<text class="lan">倍率 = {{(Number(item.point)/Number(item.money)).toFixed(2)}}</text>
				<u-icon name="arrow-right" color="#cccccc" size="36"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		pointList
	} from '../../api/point.js'
	export default {
		data() {
			return {
				list: [],
			}
		},
		methods: {
			async init() {
				let res = await pointList()
				// console.log(res);
				this.list = []
				this.list.push(...res.system);
				this.list.push(...res.user);
			},
			itemClick(item){
				uni.$emit('IntegralList',item)
				uni.navigateBack();
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
.IntegralList{
	width: 100%;
	display: flex;
	flex-direction: column;
	
	.list{
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 30rpx 20rpx;
		border-bottom: 0.01rem solid #EEEEEE;
		.left{
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.right{
			display: flex;
			flex-direction: row;
			.lan{
				color: #add;
			}
		}
	}
}
</style>
