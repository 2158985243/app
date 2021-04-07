<template>
	<view class="productName">
		<view class="search">
			<u-search placeholder="请输入商品名称" shape='square' :show-action='false' height='60' :input-style="style_input" margin='20rpx' v-model="keyword"></u-search>
		</view>
		<view class="box">
			<view class="list" @click="toaddCommodity(item)" v-for="(item,index) in list" :key="index">
				<text>
					{{item.name}}
				</text>
			</view>
			 
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				style_input:{
					'background-color':'#ffffff'
				},
				list:[
					{name:'24寸拉杆箱'},
					{name:'Y型黑天鹅项链'},
					{name:'T恤'},
					{name:'T恤上衣男小童'},
					{name:'爱心系带休闲鞋'},
					{name:'Y型黑天鹅项链'},
					{name:'白色短袖勒死衬'},
					{name:'24寸拉杆箱'},
					{name:'T恤上衣男小童'},
					{name:'白色短袖勒死衬'},
					{name:'爱心系带休闲鞋'},
					{name:'24寸拉杆箱'},
					{name:'T恤'},
					{name:'Y型黑天鹅项链'},
					{name:'T恤上衣男小童'},
					{name:'爱心系带休闲鞋'},
					{name:'Y型黑天鹅项链'},
					{name:'白色短袖勒死衬'},
					{name:'24寸拉杆箱'},
					{name:'爱心系带休闲鞋'},
					{name:'T恤'},
					{name:'白色短袖勒死衬'},
					{name:'T恤上衣男小童'},
				]
			}
		},
		methods: {
			toaddCommodity(item){
				uni.$emit('produtName',item.name)
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.productName {
		width: 100%;
		background-color: #e7e7e7;
		.search {
			display: flex;
			align-items: center;
			justify-content: center;
			// height: 80rpx;
		}
		/deep/.u-content{
			background-color: #FFFFFF !important;
		}
		.list {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-indent: 1em;
			background-color: #FFFFFF;
			margin-bottom: 2rpx;
			text{
				display: block;
				width: 70%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			

		}

	}
</style>
