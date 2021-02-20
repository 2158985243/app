<template>
	<view class="commodityManagement">
		<u-navbar back-icon-color='#ffffff' title="商品管理" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen" @click="toEditCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
				<u-icon name="plus" @click="toAddCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="box">
			<u-popup v-model="show" mode="right" width="80%">

				<view class="popup-right">
					<view class="pop-title">
						<u-icon name="arrow-left" color="#000000" @click='show=false' size="40"></u-icon>
						<view class="sx">筛选</view>
					</view>
					<view class="pop-list">
						<view class="nav-box">
							<view class="nav-tit">
								<text class="ht">品牌</text>

							</view>
							<view class="nav-list">
								<view class="lak" v-for="(item,index) in brandList" :key="index">
									<view class="nav-name">
										<view class="nav-kk" @click.stop="clickBrand(item,index)" :class="item.checked? 'actives':''" v-if="index<5">
											{{item.name}}
										</view>
									</view>
									<view class="nav-name" v-if="index==5">
										<view class="nav-kk" @click.stop="barndArr">
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
									<view class="nav-name">
										<view class="nav-kk" @click.stop="clickCate(item,index)" :class="item.checked? 'actives':''" v-if="index<5">
											{{item.name}}
										</view>
									</view>
									<view class="nav-name" v-if="index==5">
										<view class="nav-kk" @click.stop="categoryArr">
											全部类别
										</view>
									</view>
								</view>
							</view>
						</view>

						<view class="nav-box">
							<view class="nav-tit">
								<text class="ht">状态</text>

							</view>
							<view class="nav-list">
								<view class="lak" v-for="(item,index) in status" :key="index">
									<view class="nav-name">
										<view class="nav-kk" @click.stop="clickStatus(item,index)" :class="item.checked? 'actives':''">
											{{item.name}}
										</view>
									</view>
								</view>
							</view>
						</view>

						<view class="nav-box">
							<view class="nav-tit">
								<text class="ht">价格</text>

							</view>
							<view class="nav-list">
								<view class="lak" v-for="(item,index) in price" :key="index">
									<view class="nav-name">
										<view class="nav-kk" @click.stop="clickPrice(item,index)" :class="item.checked? 'actives':''">
											{{item.name}}
										</view>
									</view>
								</view>
							</view>
						</view>


					</view>
					<view class="btn">
						<u-button class="open" @click='reset'>重置</u-button>
						<u-button class="open" type="primary" @click='determine'>确定</u-button>
					</view>
				</view>
			</u-popup>
			<u-popup v-model="show1" mode="right" z-index='10077' width="80%">
				<view class="popup-right">
					<view class="pop-title">
						<u-icon name="arrow-left" color="#000000" @click='show1=false' size="40"></u-icon>
						<view class="sx">品牌</view>
					</view>
					<view class="pop-listt">
						<u-checkbox-group :wrap='true'>
							<u-checkbox shape="circle" @change="barlistChecked($event,index)" v-model="item.checked" v-for="(item, index) in brandList"
							 :key="index" :name="item.id">{{item.name}}</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
			</u-popup>
			<u-popup v-model="show2" mode="right" z-index='10077' width="80%">
				<view class="popup-right">
					<view class="pop-title">
						<u-icon name="arrow-left" color="#000000" @click='show2=false' size="40"></u-icon>
						<view class="sx">类别</view>
					</view>
					<view class="pop-listt">
						<u-checkbox-group :wrap='true'>
							<u-checkbox shape="circle" @change="cartesChecked($event,index)" v-model="item.checked" v-for="(item, index) in CategoryList"
							 :key="index" :name="item.id">{{item.name}}</u-checkbox>
						</u-checkbox-group>
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
				共{{totalVal.goods_count}}种商品，库存数{{totalVal.goods_stock}}，总成本&yen;{{totalVal.goods_cost}}
			</view>
		</view>
		<view class="list">
			<goods-category :dataList='dataList' @leftNav="leftNav" :vs='vs' @rightNav="rightNav" @handlePullDown="handlePullDown"
			 @handleLoadMore="handleLoadMore"></goods-category>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		goodsList,
		goods,
		getTotal
	} from '../../api/goods.js'
	import {
		brandList
	} from '../../api/brand.js'
	import {
		goodsCategoryList
	} from '../../api/goods_category.js'
	import goodsCategory from '@/components/goods-category/goods-category.vue'
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
				categoryList: [],
				dataList: [],
				vs: 1,
				show: false,
				show1: false,
				show2: false,
				brandList: [],
				CategoryList: [],
				status: [{
					name: '启用',
					id: 1,
					checked: false
				}, {
					name: '未启用',
					id: 0,
					checked: false
				}],
				price: [{
					name: '缺少零售价',
					id: "purchase_price",
					checked: false
				}, {
					name: '缺少采购价',
					id: 'retail_price',
					checked: false
				}, {
					name: '缺少会员价',
					id: 'customer_price',
					checked: false
				}],
				options: {
					goods_category_id: [], //类别
					status: [], //状态
					price: [], //价格
				},
				page: 1,
				page_size: 10,
				totalVal: {},
				last_page: 0,
				mored: {},
				pull: false
			}
		},
		methods: {
			// 向下拉
			handlePullDown(stopLoad) {
				this.page = 1;
				let index = 0;
				if (this.mored.index) {
					this.index = this.mored.index
				}
				this.dataList[index].arr = [];
				this.loadMore();
				stopLoad ? stopLoad() : '';
			},
			// 向上拉
			handleLoadMore(stopLoad) {
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
						this.loadMore()
					}
				}
			},
			// 
			barlistChecked(e, index) {
				this.$set(this.brandList, index, this.brandList[index])
			},
			cartesChecked(e, index) {
				this.$set(this.CategoryList, index, this.CategoryList[index])
			},
			// 点击全部品牌
			barndArr() {
				this.show1 = true;
			},
			// 点击全部类别
			categoryArr() {
				this.show2 = true;
			},
			// 点击重置
			reset() {
				this.options = {
					goods_category_id: [], //类别
					status: [], //状态
					price: []
				}
				this.brandList.map(v => {
					v['checked'] = false;
				})
				this.CategoryList.map(v => {
					v['checked'] = false;
				})
				this.price.map(v => {
					v['checked'] = false;
				})
				this.status.map(v => {
					v['checked'] = false;
				})

			},
			// 点击确定
			async determine() {
				this.options = {
					goods_category_id: [], //类别
					status: [], //状态
					price: []
				}
				this.CategoryList.map((v, i) => {
					if (v.checked) {
						this.options.goods_category_id.push(v.id)
					}
				})
				
				this.status.map((v, i) => {
					if (v.checked) {
						this.options.status.push(v.id)
					}
				})
				this.price.map((v, i) => {
					if (v.checked) {
						this.options.price.push(v.id)
					}
				})
				this.show = false;
				console.log(this.options);
				let res = await goodsList({
					page: this.page,
					page_size: this.page_size,
					goods_category_id: this.mored.id,
					options: this.options,
					keyword: this.keyword
				});
				console.log(res);
				if (this.mored.index == undefined) {
					this.dataList[0].arr = res.data;
				} else {

					this.dataList[this.mored.index].arr = res.data;
				}
			},
			// 点击品牌
			clickBrand(item, index) {
				// this.actives1 = index;
				this.$set(this.brandList, index, this.brandList[index]);
				this.brandList[index].checked = !item.checked;
			},
			// 点击类别
			clickCate(item, index) {
				// this.actives2 = index;
				this.$set(this.CategoryList, index, this.CategoryList[index]);
				this.CategoryList[index].checked = !item.checked;
			},
			// 点击状态
			clickStatus(item, index) {
				// this.actives3 = index;
				this.$set(this.status, index, this.status[index]);
				this.status[index].checked = !item.checked;
			},
			// 点击价格
			clickPrice(item, index) {
				// this.actives4 = index;
				this.$set(this.price, index, this.price[index]);
				this.price[index].checked = !item.checked;
			},
			popup() {
				this.show = true;
			},
			toAddCommodity() {
				this.$store.commit('colorDaAction', {
					colorDa: []
				});
				this.$store.commit('sizerDaAction', {
					sizerDa: []
				});
				uni.navigateTo({
					url: `/pages/addCommodity/addCommodity`
				})
			},
			toEditCommodity() {

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
					page: this.page,
					page_size: this.page_size,
					keyword: this.keyword,

				});
				this.dataList = [];
				this.dataList.unshift({
					name: "全部",
					id: 0,
					arr: res.data
				})

				let res1 = await goodsCategoryList()
				// console.log(res,res1);
				res1.map((v, i) => {
					let arr = []
					v['arr'] = arr
					this.dataList.push(v)
				})

				// this.dataList = res.data
				// console.log(this.dataList);
			},
			// 点击左侧
			async leftNav(e) {
				// this.dataList
				console.log(e);
				this.mored = e;
				this.vs = 1;
				this.page = 1
				for (let i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].arr.length == 0 && e.index == i) {
						let res = await goodsList({
							page: this.page,
							page_size: this.page_size,
							goods_category_id: e.id,
							keyword: this.keyword
						});
						this.dataList[i].arr = res.data;
						break;
					}
				}
			},
			async loadMore() {
				let index = 0;
				if (this.mored.index) {
					this.index = this.mored.index
				}
				let res = await goodsList({
					page: this.page,
					page_size: this.page_size,
					goods_category_id: this.mored.id,
					keyword: this.keyword
				});
				this.dataList[index].arr.push(...res.data);
				this.$set(this.dataList, index, this.dataList[index])
			},
			// 点击右侧
			rightNav(e) {
				// console.log(e);
				uni.navigateTo({
					url: `/pages/commodityDetails/commodityDetails?id=${e.id}`
				})
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
				this.brandList.map(v => {
					v['checked'] = false;
				})
				this.CategoryList.map(v => {
					v['checked'] = false;
				})
			},
			async Total() {
				let res = await getTotal();
				console.log(res);
				if (!res.code) {
					this.totalVal = res;
				}
			}

		},
		onLoad(query) {

		},
		onShow() {
			this.init()
			this.brand()
			this.Total()
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

		.actives {
			background-color: #000000 !important;
			color: #FFFFFF !important;
		}

		.popup-right {
			display: flex;
			flex-direction: column;

			.pop-title {
				position: fixed;
				top: 0;
				display: flex;
				width: 100%;
				background-color: #FFFFFF;
				padding: 10rpx 0;
				border-bottom: 10rpx solid #e2e2e2;

				.sx {
					width: 90%;
					text-align: center;
				}

				.logs {
					width: 80%;
					text-align: center;
				}

				.userd {
					text-align: center;
					color: #007AFF;
				}
			}

			.pop-listt {
				margin-top: 60rpx;
				padding: 20rpx;

				.u-checkbox {
					height: 80rpx;
				}
			}

			.btn {
				width: 100%;
				position: fixed;
				bottom: 0;
				display: flex;
				flex-direction: row;

				.open {
					flex: 1;
					border-radius: 0;
					// width: 50%;
				}
			}

			/deep/uni-button:after {
				border-radius: 0;
			}

			.pop-list {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 20rpx 10rpx;
				margin-top: 60rpx;

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
						// justify-content: center;
						align-items: center;
						flex-wrap: wrap;

						.lak {
							width: 33.3%;
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
