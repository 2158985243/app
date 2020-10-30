<template>
	<view class="colors">
		<u-navbar back-icon-color='#ffffff' title="选择颜色" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen" @click="toEditColor" color="#ffffff" class="right_icon" size="40"></u-icon>
				<u-icon name="plus" @click="toAddColor" color="#ffffff" class="right_icon" size="40"></u-icon>
			</template>
		</u-navbar>
		<view class="search">
			<u-search placeholder="请输入商品名称" @change='changed' shape='square' :show-action='false' height='60' :input-style="style_input" margin='20rpx 50rpx 20rpx 20rpx'
			 v-model="keyword"></u-search>
		</view>
		<view class="list">
			<uni-indexed-list :options="list" :showSelect="true" @click="bindClick"></uni-indexed-list>
		</view>
		<view class="btn">
			<u-button type="primary" class="btn" @tap="save">选择</u-button>
		</view>
	</view>
</template>

<script>
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue"
	import {colorList} from '../../api/colors.js' 
	export default {
		components: {
			// uniIndexedList
		},
		data() {
			return {
				keyword: '',
				style_input: {
					'background-color': '#ffffff'
				},
				background: {
					backgroundColor: '#2979ff'
				},
				list: [{
					"letter": "A",
					"data": [
						"阿克苏机场",
						"阿拉山口机场",
						"阿勒泰机场",
						"阿里昆莎机场",
						"安庆天柱山机场",
						"澳门国际机场"
					]
				}, {
					"letter": "B",
					"data": [
						"保山机场",
						"包头机场",
						"北海福成机场",
						"北京南苑机场",
						"北京首都国际机场"
					]
				}, {
					"letter": "C",
					"data": [
						"保山机场",
						"包头机场",
						"北海福成机场",
						"北京南苑机场",
						"北京首都国际机场"
					]
				}, {
					"letter": "D",
					"data": [
						"保山机场",
						"包头机场",
						"北海福成机场",
						"北京南苑机场",
						"北京首都国际机场"
					]
				}]
			}
		},
		methods: {
			bindClick(v) {
				console.log(v);
			},
			toAddColor() {
				uni.navigateTo({
					url: '/pages/addColor/addColor'
				})
			},
			toEditColor() {
				uni.navigateTo({
					url: '/pages/editColor/editColor'
				})
			},
			async init(){
				let res = await colorList({keyword:this.keyword})
				console.log(res);
			},
			changed(v){
				this.init();
			}
		},
		onLoad() {
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.colors {
		width: 100%;

		/deep/.u-content {
			background-color: #FFFFFF !important;
			box-shadow: 0rpx 0rpx 4rpx 2rpx #C0C0C0;
		}

		.btn {
			width: 100%;
			position: fixed;
			bottom: 0;
			z-index: 99;
			border-radius: 0 !important;

		}

		.list {
			// margin-top: 60rpx;
		}

		.search {
			display: flex;
			align-items: center;
			justify-content: center;
			// height: 80rpx;
		}

		.right_icon {
			margin-right: 40rpx;
		}
	}
</style>
