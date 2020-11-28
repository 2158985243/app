<template>
	<view class="libraryHistory">
		<u-navbar back-icon-color='#ffffff' title="采购入库历史" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen" @click="toEditCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
				<u-icon name="plus" @click="toPurchaseStorage" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="box">
			
		</view>
	</view>
</template>

<script>
	import {
		purchaseStorageList,
		purchaseStorage,
		purchaseStorageDel
	} from '../../api/purchaseStorage.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				list: [],
				QSTabsWxsListHeight: 0,

			}
		},
		methods: {
			// 初始化
			async init() {
				let res = await purchaseStorageList({
					status: 0
				})
				this.list = res.data
			},

			async clickItem(item) {
				console.log(item);
				let res = await purchaseStorageDel(item.id);
				console.log(res);
			},
			// 前往增加采购信息
			toPurchaseStorage() {
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: []
				})
				this.$store.commit('stateGoodFn', {
					stateGood: false
				})
				uni.navigateTo({
					url: `/pages/purchaseStorage/purchaseStorage`
				})
			},
			countQSTabsWxsListHeight() {
				//...
				this.QSTabsWxsListHeight = 30;
			},
			setTabs() {
				//接口获取tabs数组，使用ref调用setTabs方法传入
				//...获取tabs
				this.$refs.QSTabsWxsList.setTabs(tabs);
			}
		},
		onLoad() {
			this.init()
		},
		onReady() {
			//执行计算组件高度方法
			this.countQSTabsWxsListHeight();
		},
	}
</script>

<style scoped lang="scss">
	.libraryHistory {
		width: 100%;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 30rpx;
		}

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;

			.list {
				width: 100%;
				display: flex;
				height: 60rpx;
				line-height: 60rpx;
				background-color: #3F536E;
				margin-bottom: 10rpx;
				// flex-direction: row;
			}
		}
	}
</style>
