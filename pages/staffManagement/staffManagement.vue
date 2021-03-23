<template>
	<view class="staffManagement">
		<u-navbar back-icon-color='#ffffff' title="员工管理" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="plus" @click="toAddShopInformation" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="search">
			<u-search placeholder="请输入员工姓名或手机号" shape='square' @change="changeInput" height='60' :input-style="style_input"
			 :show-action='false' margin='20rpx' v-model="keyword"></u-search>
		</view>
		<view class="management_list">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :inBottom="pull"  :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<uni-list>
					<uni-list-item :title="item.name" class="listit" v-for="(item,index) in list" :key="index" @click="toShopInformation(item.id)"
					 :note="item.mobile" :showArrow='true' :rightText='item.job' :clickable='true'>
						<template slot="header">
							<u-image width="100rpx" mode='aspectFit' class="header_image" height="100rpx" :src="url+item.images"></u-image>
						</template>
					</uni-list-item>
				</uni-list>
				<!-- 数据列表 -->
			</k-scroll-view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		staffList
	} from "../../api/staff.js"
	import url from '../../api/configuration.js'
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
				url: url.domain,
				style_input: {
					'background-color': '#ffffff'
				},
				pull: false,
			}
		},
		methods: {
			changeInput(v) {
				// console.log(v);
				this.init(v)
			},
			async init(v) {
				let res = await staffList({
					page: this.page,
					page_size: this.page_size,
					keyword: v || ''
				})
				console.log(res);
				this.list = [];
				this.list.push(...res.data)
				this.last_page = res.last_page
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = []
				this.pull = false
				this.init()
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {

				if (!this.pull) {
					if (this.page >= this.last_page) {
						this.$refs.uToast.show({
							title: '加载到底了',
							type: 'default',
							position: 'bottom'
						})
						this.pull = true

					} else {
						this.page++;
						this.init()
					}
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
			toAddShopInformation() {
				uni.navigateTo({
					url: `/pages/addStaffsInformation/addStaffsInformation`
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
	.staffManagement {
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

		.right_icon {
			margin-right: 20rpx;
		}
	}
</style>
