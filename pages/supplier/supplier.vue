<template>
	<view class="supplier">
		<u-navbar back-icon-color='#ffffff' title="供应商管理" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="plus" @click="toAddSupplier" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="search">
			<u-search placeholder="请输入供应商姓名" shape='square' height='60' @change="changeInput" :input-style="style_input"
			 :show-action='false' margin='20rpx' v-model="keyword"></u-search>
		</view>
		<view class="management_list">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list" v-for="(item,index) in list" :key="index" @click="toSupplierDetails(item.id)">
					<view>
						{{item.name}}
					</view>
					<view class="weights">
						应付：{{item.balance}}
					</view>
				</view>
			</k-scroll-view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		supplierList
	} from '../../api/supplier.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				keyword: '',
				background: {
					backgroundColor: '#2979ff'
				},
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--到底了--',
				touchHeight: 50,
				height: 0,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				page: 1,
				page_size: 10,
				list: [],
				last_page: 0,
				style_input: {
					'background-color': '#ffffff'
				}
			}
		},
		methods: {
			toSupplierDetails(v) {
				uni.navigateTo({
					url: `/pages/supplierDetails/supplierDetails?id=${v}`
				})
			},
			changeInput(v) {
				this.init(v)
			},
			async init(v) {
				let res = await supplierList({
					page: this.page,
					page_size: this.page_size,
					keyword: v || ''
				})
				// console.log(res);
				this.list = [];
				this.list.push(...res.data);
				this.last_page = res.last_page;
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = [];
				this.init();
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if (this.page >= this.last_page) {
					this.$refs.uToast.show({
						title: '加载到底了',
						type: 'default',
						position: 'bottom'
					})

				} else {
					this.page++;
					this.init()
				}
			},
			handleGoTop() {
				this.$refs['k-scroll-view'].goTop();
			},
			// 前往编辑店铺信息
			toShopInformation(id) {
				uni.navigateTo({
					url: `/pages/editStaffsInformation/editStaffsInformation?id=${id}`
				})
			},
			// 前往新增店铺信息
			toAddSupplier() {
				uni.navigateTo({
					url: `/pages/addSupplier/addSupplier`
				})
			}
		},
		onLoad() {
			

		},
		onShow() {
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.supplier {
		width: 100vw;

		.search {
			display: flex;
			align-items: center;
			justify-content: center;
			// height: 80rpx;
			background-color: #e7e7e7;
		}

		/deep/.u-content {
			background-color: #FFFFFF !important;
		}

		.header_image {
			margin-right: 20rpx;
		}

		/deep/.u-image__image {
			border-radius: 18rpx !important;

		}

		.list {
			width: 100%;
			height: 100rpx;
			text-indent: 1em;
			padding: 10rpx 0;
			border-bottom: 0.01rem solid #999999;
		}

		.right_icon {
			margin-right: 30rpx;
		}

		.weights {
			color: #C0C0C0;
			font-size: 24rpx;
			padding-top: 16rpx;
		}
	}
</style>
