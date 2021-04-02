<template>
	<view class="storeManagementSelect">
		<u-navbar back-icon-color='#ffffff' title="店铺管理" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="plus" @click="toAddShopInformation" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="management_list">

			<uni-list>
				<uni-list-item :title="item.name" class="listit" v-for="(item,index) in list" :key="index" @click="toShopInformation(item)"
				 :note="'有效日期:'+item.expired_at" :showArrow='true' :clickable='true'>
					<template slot="header">
						<u-image width="80rpx" class="header_image" height="80rpx" :src="$imgFn(item.images)"></u-image>
					</template>
					<template slot="footer">
						<u-checkbox-group>
							<u-checkbox shape="circle" @change="checkboxChange" :name="item.name" v-model="item.checked"></u-checkbox>
						</u-checkbox-group>
					</template>
				</uni-list-item>
			</uni-list>
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
	import url from '../../api/configuration.js'
	import store from '@/store/index.js'
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
				let obj = []
				let ids = []
				this.list.map(v => {
					if (v.checked) {
						obj.push({
							name: v.name,
							id: v.id
						})
						ids.push(v.id)
					}
				})
				// storeSeletFn
				this.$store.commit('storeSeletFn', {
					storeSelet: ids
				});
				uni.$emit('gloEvent', obj)
				uni.navigateBack();
			},
			checkAll() {
				this.list.map(v => {
					v.checked = true;
				})
			},
			async init() {
				let res = await storeList({
					get_all: 1
				})
				res.map(v => {
					v['checked'] = false
				})
				// console.log(store.state.storeSelet);
				if(store.state.storeSelet.length>0){
					res.map(v => {
						store.state.storeSelet.map(v1=>{
							if(v.id==v1){
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
			// 前往新增店铺信息
			toAddShopInformation() {
				uni.navigateTo({
					url: `/pagesMine/addShopInformation/addShopInformation`
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
	.storeManagementSelect {
		width: 100vw;
		height: 100vh;

		.header_image {
			margin-right: 20rpx;
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
			margin-bottom: 120rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			height: calc(100vh - 200rpx);
		}
	}
</style>
