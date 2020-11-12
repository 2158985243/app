<template>
	<view class="commodityManagement">
		<u-navbar back-icon-color='#ffffff' title="商品管理" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen" @click="toAddCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
				<u-icon name="plus" @click="toAddCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="box">
			<u-popup v-model="show" mode="right" width="80%">
				<view class="popup-right">
					<view class="pop-title">
						<u-icon name="arrow-left" color="#000000" size="40"></u-icon>
						<view class="sx">筛选</view>
					</view>
					<view class="pop-list">
						<view class="nav-box">
							<view class="nav-tit">
								<text class="ht">品牌</text>

							</view>
							<view class="nav-list">
								<view class="lak" v-for="(item,index) in brandList" :key="index">
									<view class="nav-name" v-if="index<5">
										<view class="nav-kk">
											{{item.name}}
										</view>
									</view>
									<view class="nav-name" v-if="index==5">
										<view class="nav-kk">
											全部品牌
										</view>
									</view>
								</view>
							</view>
						</view>

						
						<view class="nav-box">
							<view class="nav-tit">
								<text class="ht">类别</text>
						
							</view>
							<view class="nav-list">
								<view class="lak" v-for="(item,index) in CategoryList" :key="index">
									<view class="nav-name" v-if="index<5">
										<view class="nav-kk">
											{{item.name}}
										</view>
									</view>
									<view class="nav-name" v-if="index==5">
										<view class="nav-kk">
											全部类别
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
			<view class="nav">
				<view class="slot-wrap">
					<u-search class='search' height='60' @change="search" margin='0 30rpx' :show-action="false" :scan="true" shape="square"
					 placeholder="请输入货号/商品名称/条码" v-model="keyword" @Inventory="handelScan"></u-search>
					<view class="search_add" @click="popup">
						<text>筛选</text>
						<u-icon name="arrow-down-fill" color="#ffffff" class="right_icon" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="titles">
				共140种商品，库存数265665454，总成本26564546
			</view>
		</view>
		<view class="list">
			<goods-category :dataList='dataList' @leftNav="leftNav" :vs='vs' @rightNav="rightNav"></goods-category>
		</view>

	</view>
</template>

<script>
	import {
		goodsList
	} from '../../api/goods.js'
	import {
		brandList
	} from '../../api/brand.js'
	import goodsCategory from '@/components/goods-category/goods-category.vue'
	import {
		goodsCategoryList
	} from '../../api/goods_category.js'
	export default {
		components: {
			goodsCategory
		},
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				keyword: '',
				defaultActive: 0,
				categoryList: [{
					name: 'xx',
					subCategoryList: []
				}, {
					name: 'xx',
					subCategoryList: []
				}],
				dataList: [],
				vs: 1,
				show: false,
				brandList: [],
				CategoryList: [],
			}
		},
		methods: {
			popup() {
				this.show = true;
			},
			toAddCommodity() {
				uni.navigateTo({
					url: `/pages/addCommodity/addCommodity`
				})
			},
			handelScan: function() {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						// console.log('条码内容：' + res.result);
						this.keyword = res.result;
					}
				});
			},
			async init() {
				let res = await goodsList({
					keyword: this.keyword
				});
				let res1 = await goodsCategoryList()
				// console.log(res,res1);
				this.dataList = [];
				res1.map((v, i) => {
					let arr = []
					v['arr'] = arr
					this.dataList.push(v)
				})
				this.dataList.unshift({
					name: "全部",
					id: 0,
					arr: res.data
				})
				// this.dataList = res.data
				// console.log(this.dataList);
			},
			// 点击左侧
			async leftNav(e) {
				console.log(e);
				// this.dataList
				this.vs = 1;
				for (let i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].arr.length == 0 && e.index == i) {
						let res = await goodsList({
							goods_category_id: e.id,
							keyword: this.keyword
						});
						this.dataList[i].arr = res.data;
						break;
					}
				}
			},
			// 点击右侧
			rightNav(e) {
				console.log(e);
			},
			search(v) {
				this.init()
				if (!v) {
					this.vs = 0;
				} else {
					this.vs = 1;
				}

			},
			async brand() {
				let res = await brandList();
				this.brandList = res;
				let res1 = await goodsCategoryList()
				this.CategoryList = res1;
				// console.log(res);
			}

		},
		onLoad() {
			this.init()
			this.brand()

		}
	}
</script>

<style lang="scss" scoped>
	.commodityManagement {
		width: 100%;
		// height: 100vh;
		background-color: #e3e3e3;
		// overflow: hidden;
		display: flex;
		flex-direction: column;

		// .box{
		// 	width: 100%;
		// 	position: fixed;
		// 	top: 80rpx;
		// }
		.list {
			width: 100%;
			// max-height: 70%;
			display: flex;
			flex: auto;
		}

		.right_icon {
			margin-right: 20rpx;
		}

		/deep/.u-border-bottom:after {
			border-bottom-width: 0rpx;
		}

		.nav {
			width: 100%;
			background-color: rgb(41, 121, 255);
			height: 80rpx;

			.slot-wrap {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 80rpx;

				.search_add {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FFFFFF;
					width: 15%;
				}
			}
		}

		.titles {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			text-indent: 1em;
			background-color: #e3e3e3;
		}

		.popup-right {
			display: flex;
			flex-direction: column;

			.pop-title {
				display: flex;
				padding: 10rpx 0;
				border-bottom: 10rpx solid #e2e2e2;

				.sx {
					width: 90%;
					text-align: center;
				}
			}

			.pop-list {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 20rpx;

				.nav-box {
					width: 100%;
					display: flex;
					flex-direction: column;

					.nav-tit {
						display: flex;

						.ht {
							font-size: 28rpx;
							color: #000000;
							font-weight: 600;
							padding: 10rpx;
						}
					}

					.nav-list {
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;

						.lak {
							width: 33%;
						}

						.nav-name {
							width: 100%;
							text-align: center;
							// padding: 10rpx 0;
							margin: 10rpx 0;

							.nav-kk {
								width: 90%;
								padding: 6rpx 10rpx;
								// text-align: center;
								border-radius: 35rpx;
								background-color: #f0f0f0;
								overflow: hidden; //将超出的部分隐藏
								text-overflow: ellipsis; //超出部分用省略号显示
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
							}
						}
					}
				}
			}
		}
	}
</style>
