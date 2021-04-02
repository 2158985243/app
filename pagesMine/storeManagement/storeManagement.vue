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
			 :autoPullUp="autoPullUp" :inBottom="pull"  :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<!-- <uni-list>
					<uni-list-item :title="item.name" class="listit" v-for="(item,index) in list" :key="index" @click="toShopInformation(item)"
					 :note="'有效日期:'+item.expired_at" :showArrow='true' :clickable='true'>
						<template slot="header">
						</template>
					</uni-list-item>
				</uni-list> -->
				<view class="list" v-for="(item,index) in list" :key="index" @click="toShopInformation(item)">
					<view class="left">
						<u-image width="80rpx" class="header_image" height="80rpx" :src="$imgFn(item.images)"></u-image>
						<view class="left-item">
							<text class="black">{{item.name}}</text>
							<text class="gray">有效日期：{{item.expired_at}}</text>
						</view>
					</view>
					<view class="right">
						<u-icon name="arrow-right" class="down" color="#cccccc" size="34"></u-icon>
					</view>
				</view>
				<!-- 数据列表 -->
			</k-scroll-view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		uploadImage
	} from "../../api/uploadImage.js"
	// import url from ''
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
				height: 100,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				page: 1,
				page_size: 10,
				list: [],
				last_page: 0,
				iq: '',
				url:this.$cfg.domain,
				pull:false
			}
		},
		methods: {
			async init() {
				let res = await storeList({
					page: this.page,
					page_size: this.page_size
				})
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
				if(!this.pull){
					
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
			toShopInformation(item) {
				// let val = JSON.stringify(item)
				if (this.iq == 1) {
					uni.$emit('gloEvent',item)
					uni.navigateBack();
				} else {
					uni.navigateTo({
						url: `/pagesMine/editShopInformation/editShopInformation?id=${item.id}`
					})
				}

			},
			// 前往新增店铺信息
			toAddShopInformation() {
				uni.navigateTo({
					url: `/pagesMine/addShopInformation/addShopInformation`
				})
			}
		},
		onLoad(query) {
			
			// console.log();
			this.iq = query.iq
			
		},
		onShow() {
			this.list = []
			this.pull = false
			this.page = 1
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.storeManagement {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		.header_image {
			margin-right: 20rpx;
		}
		.management_list{
			width: 100%;
			display: flex;
			flex-direction: column;
			height: calc(100vh - 80rpx);
			.list{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #F5F5F5;
				.left{
					display: flex;
					flex-direction: row;
					.left-item{
						margin-left: 10rpx;
						display: flex;
						flex-direction: column;
						.black{
							color: #000000;
						}
						.gray{
							color: #C0C0C0;
							font-size: 24rpx;
							margin-top: 10rpx;
						}
					}
				}
			}
		}
		/deep/.u-image__image {
			border-radius: 18rpx !important;

		}

		.right_icon {
			margin-right: 20rpx;
		}
	}
</style>
