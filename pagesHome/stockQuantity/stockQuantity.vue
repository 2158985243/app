<template>
	<view class="stockQuantity">
		<u-navbar back-icon-color='#ffffff' title=" " :background="background" title-color="#ffffff">
			<template slot="right">
				<view class="hd_main">
					<view class="title_hd" @click="showPop">
						<text class="tlt">{{title_name}}</text>
						<u-icon name="arrow-down-fill" class="down" color="#ffffff" size="34"></u-icon>
					</view>
					<view class="icon_right" @click="toCondition">
						<u-icon name="search" class="icon_right" color="#ffffff" size="34"></u-icon>
					</view>
				</view>
			</template>
		</u-navbar>
		<view class="hearder-search" :style="'top:'+ statusBarHeight + 'rpx'">
			<u-search class='search'  bg-color="#ffffff" style="width: 70%;" height='50' @change="search" :show-action="false" :focus='false'
			 :scan="true" shape="square" placeholder="请输入商品名称/编码" v-model="form.keyword" @Inventory="handelScan"></u-search>
			<view class="arr" @click="goodsCateShow = !goodsCateShow">
				全部类别
			</view>
		</view>
		<view class="box">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :inBottom="pull" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="box-hd">
					<view class="box-item">
						<text class="hui">库存总数</text>
						<text class="red">{{total.stock}}</text>
						<text>默认</text>
					</view>
					<view class="box-item">
						<text class="hui">库存成本</text>
						<text class="red">{{total.cost}}</text>
						<text>货号</text>
					</view>
					<view class="box-item">
						<text class="hui">商品数</text>
						<text class="red">{{total.goods_count}}</text>
						<text>名称</text>
					</view>
					<view class="box-item">
						<text class="hui">库存预警</text>
						<text class="red">{{total.warning_count}}</text>
						<text>库存数</text>
					</view>
				</view>
				<view class="list" v-for="(item,index) in list" @click="itemClick(item)">
					<view class="left">
						<u-image width="80rpx" mode='aspectFit' class="header_image" height="80rpx" :src="$imgFn(item.main_image)"></u-image>
						<view class="t_item">
							<text class="borad">{{item.name}}<text class="hui">{{item.number}}</text> </text>
							<text class="bdk">库存:{{item.stock}}</text>
							<text>进货价:&yen;{{item.purchase_price}}</text>
						</view>
					</view>
					<view class="right">
						<text class="red">&yen;{{item.retail_price}}</text>
						<text>库存成本:&yen;{{(Number(item.purchase_price)*Number(item.stock))}}</text>
					</view>
				</view>
			</k-scroll-view>
			<u-toast ref="uToast" />
		</view>
		<view class="classify" v-if="goodsCateShow">
			<!-- <scroll-view scroll-y="true" class="scroll-Y"> -->
			<view class="fy-li">
				<view class="classify-list" v-for="(item,index) in classify_list" :key="index" @click="goodsCa(item)">
					<text>{{item.name}}</text>
				</view>
			</view>
			<!-- </scroll-view> -->
		</view>
		<u-popup v-model="show" mode="center" width="500rpx" height="560rpx">
			<view class="pop">
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="pop-item" v-for="(item,index) in strots" :key="index" @click="strotsItem(item)">
						<text>{{item.label}}</text>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		stockList
	} from '../../api/goods.js'
	import {
		goodsCategoryList
	} from '../../api/goods_category.js'
	import store from '@/store'
	import url from '../../api/configuration.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				classify_list: [], //商品分类
				goodsCateShow: false, //显示隐藏分类列表
				show: false, //显示隐藏店铺列表
				background: {
					backgroundColor: '#2979ff'
				},
				strots: [],
				title_name: '',
				form: {
					store_id:0,
					keyword: '',
					goods_category_id:''
				},
				page: 1,
				page_size: 10,
				list: [],
				total: {},
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--到底了--',
				touchHeight: 50,
				height: 0,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true,
				last_page: 0,
				pull: false,
				store_ids: [],
				statusBarHeight:0
			}
		},
	
		methods: {
			// 选择类型
			goodsCa(item){
				this.form.goods_category_id = item.id;
				this.goodsCateShow = false;
				this.page = 1;
				this.list = [];
				this.init()
			},
			// 显示店铺
			showPop() {
				this.show = true;
			},
			// 前往搜索条件
			toCondition() {
				uni.navigateTo({
					url:`/pagesHome/grabble/grabble`
				})
			},
			// 初始化
			async init(v) {
				let res = await stockList({
					...this.form,
					page: this.page,
					page_size: this.page_size
				})
				this.list.push(...res.data.data);
				this.last_page = res.data.last_page
				this.total = res.total;
			},
			search: function(value) {
				this.page = 1;
				this.list = []
				this.init()
			},
			handelScan: function() {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						// console.log('条码内容：' + res.result);
						this.form.keyword = res.result;
					}
				});
			},
			// 进入商品详情
			itemClick(item) {
				uni.navigateTo({
					url: `/pagesHome/getStock/getStock?id=${item.id}`
				})
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = []
				this.init()
				this.pull = false
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
			// 店铺数组
			strored() {
				let arr = store.state.store.storesArr;
				this.title_name = store.state.store.name;
				this.form.store_id = store.state.store.store_id;
				if (arr) {
					this.strots.push({
						value: 0,
						label: '全部'
					})
					arr.map((v) => {
						this.strots.push({
							value: v.store_id,
							label: v.name
						})
					})
				}
				// console.log(this.strots);
			},
			// 选择店铺
			strotsItem(item) {
				this.title_name = item.label;
				this.form.store_id = item.value;
				this.list = []
				this.init()
				this.show = false;
			},
			// 商品分类列表
			async goodsCates() {
				let res = await goodsCategoryList();
				this.classify_list = res
				this.classify_list.unshift({
					id:0,
					name: "全部"
				})
			},
		},
		onUnload() {
			uni.$off()
			
		},
		onLoad() {
			this.init()
			this.strored()
			this.goodsCates()
			uni.$on('grabble',(res)=>{
				if(res){
					this.form = res.form;
					this.title_name = res.shop;
					this.page = 1;
					this.pull = false
					this.init()
				}
			})
			let _this = this
			uni.getSystemInfo({
				success(res) {
					_this.$nextTick(()=>{
						_this.statusBarHeight = Number(res.statusBarHeight)*2 + 96
					})
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	.stockQuantity {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		.classify {
			position: fixed;
			top: calc(164rpx + var(--status-bar-height));
			right: 0;
			width: 20vw;
			height: calc(100% - 84rpx);
			z-index: 990;
			display: flex;
			background-color: #E5E5E5;

			.fy-li {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				overflow-y: scroll;
				background-color: #FFFFFF;
			}

			.classify-list {
				display: flex;
				width: 100%;
				justify-content: center;
				align-items: center;
				padding: 20rpx 10rpx;
				border-bottom: 1rpx solid #C8C7CC;

				text {
					width: 20vw;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					text-align: center;
				}
			}
		}

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-top: 80rpx;
			position: relative;
			.box-hd {
				width: 100%;
				display: flex;
				flex-direction: row;
				padding: 20rpx;
				border-bottom: 0.01rem solid #EEEEEE;
				position: sticky;
				top: 0;
			}

			.box-item {
				width: 100%;
				display: flex;
				flex-direction: column;

				text {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 10rpx;
				}

				.hui {
					color: #999999;
				}

				.red {
					color: #DD524D;
				}
			}

			.list {
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-direction: row;
				align-items: flex-end;
				padding: 20rpx;
				border-bottom: 0.01rem solid #E5E5E5;

				.left {
					display: flex;
					flex-direction: row;
					align-items: center;

					.t_item {
						display: flex;
						flex-direction: column;
						margin-left: 10rpx;

						.borad {
							color: #000000;
							font-size: 26rpx;
						}

						.bdk {
							color: #000000;
							font-size: 22rpx;
							padding: 10rpx 0;
						}

						text {
							color: #838584;
							font-size: 22rpx;
						}

						.hui {
							padding-left: 20rpx;

						}

						.red {
							color: #FF5A5F;
							margin-right: 50rpx;
						}
					}

					.dels {
						text-decoration: line-through;
						padding-right: 10rpx;
					}
				}

				.right {
					display: flex;
					flex-direction: column;
					font-size: 20rpx;

					text {
						text-align: right;
						color: #C0C0C0;
					}

					.red {
						color: #FF5A5F;
						padding: 10rpx 0;
					}
				}
			}
		}

		.hearder-search {
			width: 100%;
			height: 80rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			background-color: #F4F6F4;
			justify-content: space-between;
			position: fixed;
			// top: 0;
			// top: calc(88rpx + var(--status-bar-height));
			z-index: 99;
			.search{
				padding: 20rpx;
			}
			.arr {
				color: #007AFF;
				background-color: #FFFFFF;
				padding: 0 20rpx;
				height: 60rpx;
				margin: 15rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
				font-size: 24rpx;
			}
		}

		.hd_main {
			width: 64vw;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			.icon_right {
				// margin-right: 30rpx;
				text-align: right;
			}

			.title_hd {
				// margin-right: 28vw;

				display: flex;
				// justify-content: center;
				// align-items: center;
				color: #FFFFFF;

				.tlt {
					// width: 150rpx;
					// white-space: nowrap;
					// overflow: hidden;
					// text-overflow: ellipsis;
					text-align: left;
				}
			}

			.down {
				padding-left: 10rpx;
			}
		}

		.pop {
			width: 100%;
			height: 100%;
			display: flex;
			// overflow-y: scroll;
			flex-direction: column;

			.pop-item {
				padding: 20rpx;
				border-bottom: 0.01rem solid #C0C0C0;
			}
		}
	}
</style>
