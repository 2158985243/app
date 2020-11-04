<template>
	<view class="storeManagement">
		<u-navbar back-icon-color='#ffffff' title="店铺管理" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="plus" @click="toAddShopInformation" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="management_list">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<uni-list>
					<uni-list-item :title="item.name" class="listit" v-for="(item,index) in list" :key="index" @click="toShopInformation(item)"
					 :note="'有效日期:'+item.expired_at" :showArrow='true' :clickable='true'>
						<template slot="header">
							<u-image width="80rpx" class="header_image" height="80rpx" :src="url+item.images"></u-image>
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
	import url from '../../api/configuration.js'
	import {
		uploadImage
	} from "../../api/uploadImage.js"
	import {
		storeList
	} from "../../api/store.js"
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
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
				iq: '',
				url:url.domain
			}
		},
		methods: {
			async init() {
				let res = await storeList({
					page: this.page,
					page_size: this.page_size
				})
				console.log(res); 
				this.list.push(...res.data)
				this.last_page = res.last_page
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = []
				this.init()
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
			toShopInformation(item) {
				// let val = JSON.stringify(item)
				if (this.iq == 1) {
					uni.$emit('gloEvent',item)
					uni.navigateBack();
				} else {
					uni.navigateTo({
						url: `/pages/editShopInformation/editShopInformation?id=${item.id}`
					})
				}

			},
			// 前往新增店铺信息
			toAddShopInformation() {
				uni.navigateTo({
					url: `/pages/addShopInformation/addShopInformation`
				})
			}
		},
		onLoad(query) {
			this.init();
			// console.log();
			this.iq = query.iq
		},

	}
</script>

<style lang="scss" scoped>
	.storeManagement {
		width: 100vw;
		height: 100%;

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
