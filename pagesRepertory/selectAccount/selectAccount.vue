<template>
	<view class="selectAccount">
		<u-navbar back-icon-color='#ffffff' title="选择账户" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="plus" @click="toAddPatternOfPayment" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="list">
			<view class="box" @tap="navigate(item)" v-for="(item,index) in list" :key="item.id">
				<text>{{item.name}}</text>
				<view class="">
					<text>&yen;{{item.money}}</text>
				<u-icon class='right' name="arrow-right" color="#cccccc" size="36"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		accountList
	} from '../../api/account.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				list: []
			}
		},
		methods: {
			async init() {
				let res = await accountList()
				// console.log(res);
				this.list = res
			},
			toAddPatternOfPayment() {
				uni.navigateTo({
					url: `/pages/addPatternOfPayment/addPatternOfPayment`
				})
			},
			navigate(e){
				uni.$emit('selectAccount',e)
				uni.navigateBack()
			}
		},
		onLoad() {
		},
		onShow() {
			this.init()
			
		}
	}
</script>

<style lang="scss" scoped>
	.selectAccount {
		width: 100%;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 30rpx;
		}

		.list {
			display: flex;
			flex-direction: column;
			margin: 0 20rpx;
			.box {
				display: flex;
				justify-content: space-between;
				width: 100%;
				background-color: #FFFFFF;
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: 2rpx solid #eeeeee;
				text-indent: 1em;
				.right{
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
