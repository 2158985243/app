<template>
	<view class="stockQuantity">
		<u-navbar back-icon-color='#ffffff' title="" :background="background" title-color="#ffffff">

			<template slot="right">
				<view class="hd_main" >
					<view class="title_hd" @click="showPop">
						<text class="tlt">{{title_name}}</text>
						<u-icon name="arrow-down-fill" class="down" color="#ffffff" size="34"></u-icon>
					</view>
					<view class="icon_right" @click="toCondition">
						<u-icon name="search"  class="icon_right" color="#ffffff" size="34"></u-icon>
					</view>
				</view>
			</template>

		</u-navbar>
	</view>
</template>

<script>
	import {stockList} from '../../api/goods.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				title_name: '总店总店总店',
				form:{
					
				}
			}
		},
		methods: {
			// 显示店铺
			showPop(){
				
			},
			// 前往搜索条件
			toCondition(){
				
			},
			// 初始化
			async init(){
				let res = await stockList()
				console.log(res);
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.stockQuantity {
		width: 100%;
		display: flex;
		flex-direction: column;

		.hd_main {
			width: 64vw;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.icon_right {
				margin-right: 30rpx;
			}

			.title_hd {
				// margin-right: 28vw;
				
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				.tlt{
					width: 180rpx;
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
				}
			}
			.down{
				padding-left: 10rpx;
			}
		}
	}
</style>
