<template>
	<view class="userManagement">
		<u-navbar back-icon-color='#ffffff' title="用户管理" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="plus" @click="toAddUserManagement" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="search">
			<u-search placeholder="请输入用户编号或名称" shape='square' @change="changeInput" height='60' :input-style="style_input"
			 :show-action='false' margin='20rpx' v-model="keyword"></u-search>
		</view>
		<view class="management_list">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :inBottom="pull"  :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list"  v-for="(item,index) in list" :key="index" @click="toShopInformation(item)">
					<view class="left">
						<u-image width="80rpx" mode='aspectFit' class="header_image" height="80rpx" src="@/static/image/hd.jpg"></u-image>
						<view class="left-item">
							<text class="black">{{item.name}} <text class="gray">({{item.account}})</text></text>
							<text class="gray" v-if="item.is_admin">{{"已有全部权限,可操作全部店铺"}}</text>
							<text class="gray" v-else>{{`已有权限${item.authority_count}个,可操作店铺${item.store_count}个`}}</text>
						</view>
					</view>
					<view class="right">
						<text v-if="item.is_admin">管理员</text>
						<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
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
		userList
	} from "../../api/user.js"
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
				let res = await userList({
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
			toShopInformation(item) {
				this.$store.commit('storeSeletFn', {
					storeSelet: []
				});
				this.$store.commit('tademarkFn', {
					tademark: []
				});
				this.$store.commit('purviewFn', {
					purview: []
				});
				uni.navigateTo({
					url: `/pages/userManagement/editUserManagement/editUserManagement?id=${item.id}&is_admin=${item.is_admin}`
				})
			},
			// 前往新增用户信息
			toAddUserManagement() {
				this.$store.commit('storeSeletFn', {
					storeSelet: []
				});
				this.$store.commit('tademarkFn', {
					tademark: []
				});
				this.$store.commit('purviewFn', {
					purview: []
				});
				uni.navigateTo({
					url: `/pages/userManagement/addUserManagement/addUserManagement`
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
	.userManagement {
		width: 100%;
		display: flex;
		flex-direction: column;
		.search {
			display: flex;
			align-items: center;
			justify-content: center;
			// height: 80rpx;
			background-color: #e7e7e7;
		}
		.management_list{
			width: 100%;
			display: flex;
			flex-direction: column;
			.list{
				width: 100%;
				display: flex;
				padding: 20rpx;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 0.01rem solid #F1F1F1;
				background-color: #FFFFFF;
				.left{
					display: flex;
					flex-direction: row;
					.left-item{
						display: flex;
						flex-direction: column;
						.black{
							.gray{
								margin-left: 10rpx;
								color: #999999;
								font-size: 24rpx;
							}
						}
						.gray{
							color: #999999;
							font-size: 24rpx;
							padding-top: 10rpx;
						}
					}
				}
				.right{
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					text{
						color: #007AFF;
					}
				}
			}
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
