<template>
	<view class="tademark">
		<view class="management_list">
			<text class="title"><text class="red">*</text>选择全部品牌，当前以及之后新增的品牌都拥有权限</text>
			<view class="list" v-for="(item,idnex) in list">
				<text class="black">{{item.name}}</text>
				 <u-checkbox-group>
				 	<u-checkbox shape="circle" @change="checkboxChange" :name="item.name" v-model="item.checked"></u-checkbox>
				 </u-checkbox-group>
			</view>
			<!-- 数据列表 -->
			<u-toast ref="uToast" />
		</view>
		<view class="btn">
			<view class="li">
				<view class="left" @click="checkAll">
					全选
				</view>
				<view class="r" @click="sure">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import url from '../../../api/configuration.js'
	import store from '@/store/index.js'
	import {
		brandList
	} from "../../../api/brand.js"
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
				url: url.domain,
				pull: false,
				store_ids: []
			}
		},
		methods: {
			checkboxChange(e) {
				console.log(e);
			},
			sure() {
				let ids = []
				this.list.map(v => {
					if (v.checked) {
						
						ids.push(v.id)
					}
				})
				// storeSeletFn
				this.$store.commit('tademarkFn', {
					tademark: ids
				});
				uni.navigateBack();
			},
			checkAll() {
				this.list.map(v => {
					v.checked = true;
				})
				let ids = []
				this.list.map(v => {
					if (v.checked) {
						ids.push(v.id)
					}
				})
				ids.push(0)
				// storeSeletFn
				this.$store.commit('tademarkFn', {
					tademark: ids
				});
				uni.navigateBack();
			},
			async init() {
				let res = await brandList()
				res.map(v => {
					v['checked'] = false
				})
				// console.log(store.state.storeSelet);
				if (store.state.tademark.length > 0) {
					res.map(v => {
						store.state.tademark.map(v1 => {
							if (v.id == v1) {
								v.checked = true;
							}
						})

					})
				}
				this.list = res;
			},

			handleGoTop() {
				this.$refs['k-scroll-view'].goTop();
			},
			// 前往编辑店铺信息
			toShopInformation(item) {
				// let val = JSON.stringify(item)

				// item.checked = !item.checked
			},
			
		},
		onLoad(query) {
			this.init();
			// console.log();
			this.iq = query.iq
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.tademark {
		width: 100vw;
		height: 100%;

		.header_image {
			margin-right: 20rpx;
		}
		.title{
			font-size: 20rpx;
			padding: 10rpx 0;
			background-color: #dedde2;
			.red{
				margin: 0 10rpx;
				color: #FF5A5F;
			}
		}
		.btn {
			width: 100%;
			height: 120rpx;
			border-top: 0.01rem solid #E5E5E5;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			bottom: 0;
			background-color: #FFFFFF;
			z-index: 999;

			.li {
				width: 80%;
				height: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: row;
				border-radius: 30rpx;
				background-color: #007AFF;
				color: #FFFFFF;

				.left {
					flex: 1;
					height: 80%;
					border-right: 1rpx solid #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.r {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}

		/deep/.u-image__image {
			border-radius: 18rpx !important;

		}

		.right_icon {
			margin-right: 20rpx;
		}

		.management_list {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 120rpx;
			.list{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx;
				border: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;
			}
		}
	}
</style>
