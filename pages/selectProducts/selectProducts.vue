<template>
	<view class="selectProducts">
		<u-navbar back-icon-color='#ffffff' title="商品选择" :background="background" title-color="#ffffff">
			<template slot="right">
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
					<u-search class='search' height='60' @change="search" margin='0 20rpx' :show-action="false" :scan="true" shape="square"
					 placeholder="请输入货号/商品名称/条码" v-model="keyword" @Inventory="handelScan"></u-search>
					<view class="search_add" @click="popup">
						<text>筛选</text>
						<u-icon name="arrow-down-fill" color="#ffffff" class="right_icon" size="28"></u-icon>
					</view>
				</view>
			</view>
			<!-- <view class="titles">
				共140种商品，库存数265665454，总成本26564546
			</view> -->
		</view>
		<view class="list">
			<goods-category :dataList='dataList' @leftNav="leftNav" :vs='vs' @rightNav="rightNav" @handlePullDown="handlePullDown"
			 @handleLoadMore="handleLoadMore"></goods-category>
		</view>
		<view class="shopping-cart">
			<view class="goods-quantity">
				<u-icon class="icon-cart" name="shopping-cart" color="#ffffff" size="50"></u-icon>
				<text class="money-cart">&yen;{{1500}}</text>
			</view>
			<view class="selected">
				加入采购单
			</view>
		</view>
		<u-popup v-model="showGoods" mode="bottom" length="60%">
			<view class="specification">
				<u-icon name="close" class='close' @click="hiddengoods" color="#a8a8a8" size="28"></u-icon>
				<view class="goods-of">
					<!-- mode='aspectFit'  -->
					<u-image width="140rpx" height="140rpx" border-radius='20' :src="$cfg.domain+goodsOf.main_image"></u-image>
					<view class="goodsNews">
						<text class="goods-money">&yen;{{goodsOf.retail_price}}</text>
						<text class="goods-name">{{goodsOf.name}}</text>
						<text class="goods-number">{{goodsOf.number}}</text>
					</view>
				</view>
				<u-line color="inof" />
				<view class="goods-color">
					<text>颜色</text>
					<view class="colors">
						<view class="colorMo" v-for="(item,index) in spec" :key="index" @click="clickColor(item,index)" :class="active1==index? 'active':''">
							<text>{{item.name}}</text>
							<text class="pos" v-if="item.quantity>0">{{item.quantity}}</text>
						</view>
					</view>
				</view>
				<!-- <u-line color="inof" /> -->
				<view class="goods-size">
					<text>尺码</text>
					<view class="">
						<view class="" v-for="(item,index) in spec" :key="index">
							<view class="sizes" v-show="index==active1">
								<view class="sizeMo" v-for="(item1,index1) in item.data" :key="index1" @click="clickSize(item1,index1)" :class="active2==index1? 'active':''">
									<text>{{item1.size.name}}</text>
									<text class="pos" v-if="item1.quantity>0">{{item1.quantity}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <u-line color="inof" /> -->
				<view class="number-box">
					<view class="">
						<text>购买数量</text>
						<!-- spec[active1].data[active2].goods_spec_info.stock -->
						<text class="goods-inventory" v-if="spec[active1]">库存: <text v-if="spec[active1].data[active2]">
								{{spec[active1].data[active2].goods_spec_info.stock}}</text></text>
					</view>
					<u-number-box v-model="value" :min="0" @change="valChange"></u-number-box>
				</view>
				<view class="btn">
					<u-button type="primary" class="btn" @tap="save(goodsOf.id)">确定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		goodsList,
		goods
	} from '../../api/goods.js'
	import store from '@/store'
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
				value: 0,
				background: {
					backgroundColor: '#2979ff'
				},
				keyword: '',
				defaultActive: 0,
				categoryList: [],
				dataList: [],
				vs: 1,
				showGoods: false,
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
				goodsOf: {},
				active1: 0,
				active2: 0,
				spec: []
			}
		},
		methods: {
			// 
			valChange(v) {
				this.spec[this.active1].data[this.active2].quantity = v.value;
				this.spec[this.active1].quantity = 0;
				this.spec[this.active1].data.map((v, i) => {
					this.spec[this.active1].quantity += v.quantity;
				})
				this.$set(this.spec, this.active1, this.spec[this.active1])
			},
			// 向下拉
			handlePullDown(stopLoad) {
				this.page = 1;
				this.init();
				stopLoad ? stopLoad() : '';
			},
			// 向上拉
			handleLoadMore(stopLoad) {
				this.page++;
				this.init()
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
			determine() {
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
				// console.log(this.options);
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
					keyword: this.keyword
				});
				this.dataList = [];
				this.dataList.unshift({
					name: "全部",
					id: 0,
					arr: res.data
				})

				let res1 = await goodsCategoryList()
				this.CategoryList = res1;
				// console.log(res,res1);
				res1.map((v, i) => {
					v['arr'] = [];
					this.dataList.push(v)
				})

				// console.log(this.dataList);
			},
			// 点击左侧
			async leftNav(e) {
				// this.dataList
				this.vs = 1;
				for (let i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].arr.length == 0 && e.index == i) {
						let res = await goodsList({
							page: this.page,
							page_size: this.page_size,
							goods_category_id: e.id,
							keyword: this.keyword
						});
						this.dataList[i].arr = res.data;
						this.$set(this.dataList, i, this.dataList[i])
						// console.log(res.data);
						break;
					}
				}
			},
			// 点击右侧
			async rightNav(e) {
				this.active1= 0;
				this.active2= 0;
				let arr = store.state.specificationOfGoods;
				// console.log(arr);
				let num = 1;
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].goodsData[0].goods_id == e.id) {
						this.goodsOf = arr[i].goodsData[0].goodsOf
						this.spec = arr[i].goodsData;
						num = 0;
						break;
					}
				}
				console.log(this.spec);
				if (num) {
					let res = await goods(e.id)
					console.log(res);
					if (!res.code) {
						this.value = 0;
						this.goodsOf = res;
						this.spec = res.color;
						this.spec.map((v1, i1) => {
							v1['goodsOf'] = res;
							v1['goods_category_id'] = res.goods_category_id;
							v1['goods_id'] = e.id;
							v1['data'] = [];
							v1['quantity'] = 0;
							res.goods_spec.map((v, i) => {
								if (v.color_id == v1.id) {
									v1.data.push({
										size: v.size,
										goods_spec_info: v.goods_spec_info,
										quantity: 0
									})
								}
							})
						this.$set(this.spec,i1,this.spec[i1]);
						})
					}
				}
				// this.$forceUpdate()

				this.showGoods = true;
			},
			hiddengoods() {
				this.showGoods = false;
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


				// console.log(res);
				this.brandList.map(v => {
					v['checked'] = false;
				})
				this.CategoryList.map(v => {
					v['checked'] = false;
				})
			},
			clickColor(item, index) {
				this.active1 = index;
				this.value = this.spec[this.active1].data[this.active2].quantity;
			},
			clickSize(item, index) {
				this.active2 = index;
				this.value = this.spec[this.active1].data[this.active2].quantity;
			},
			// 确定选择商品规格
			save() {
				// this.showGoods = false;
				let arr = []
				if (store.state.specificationOfGoods.length > 0) {
					arr = store.state.specificationOfGoods
					let num = 1;
					for (let i = 0; i < arr.length; i++) {
						if (this.spec[0].goods_id == arr[i].goodsData[0].goods_id) {
							arr[i].goodsData = this.spec;
							num = 0
							break;
						}
					}
					if (num) {
						arr.push({
							goodsData: this.spec
						});
					}
				} else {
					arr.push({
						goodsData: this.spec
					})
				}
				// if(store.state.specificationOfGoods)
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: arr
				})
				console.log(store.state.specificationOfGoods);
				this.showGoods = false;
			}

		},
		onLoad(query) {
			this.init()
			this.brand()
		}
	}
</script>

<style scoped lang="scss">
	.selectProducts {
		width: 100%;
		background-color: #e3e3e3;
		display: flex;
		flex-direction: column;

		.active {
			background-color: #3B4144 !important;
			color: #FFFFFF !important;
		}

		.specification {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;

			.close {
				position: absolute;
				top: 20rpx;
				right: 10rpx;
				display: block;
				width: 40rpx;
				height: 40rpx;
			}

			.goods-of {

				width: 100%;
				display: flex;
				flex-direction: row;
				margin: 20rpx 0;
				padding: 0 20rpx;



				.goodsNews {
					display: flex;
					flex-direction: column;
					padding-left: 20rpx;

					.goods-number {
						color: #C0C0C0;
						font-size: 20rpx;

					}

					.goods-money {
						color: #ff0000;
						font-size: 28rpx;
					}

					.goods-inventory {
						color: #C0C0C0;
						font-size: 20rpx;
					}
				}
			}

			.goods-color {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin: 20rpx 0;
				padding: 0 20rpx;

				.colors {
					width: 100%;
					margin-top: 20rpx;
					display: flex;
					flex-direction: row;

					.colorMo {
						position: relative;
						width: 120rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						border-radius: 10rpx;
						background-color: #dadada;
						color: #000000;
						margin-right: 20rpx;

						.pos {
							position: absolute;
							right: -6rpx;
							top: -20rpx;
							font-size: 20rpx;
							background-color: red;
							height: 40rpx;
							width: 40rpx;
							color: #FFFFFF;
							line-height: 40rpx;
							text-align: center;
							border-radius: 50%;
							font-size: 20rpx;
						}
					}
				}
			}

			.goods-size {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin: 20rpx 0;
				padding: 0 20rpx;

				.sizes {
					width: 100%;
					margin-top: 20rpx;
					display: flex;
					flex-direction: row;

					.sizeMo {
						position: relative;
						width: 80rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						border-radius: 10rpx;
						background-color: #dadada;
						color: #000000;
						margin-right: 20rpx;

						.pos {
							position: absolute;
							right: -6rpx;
							top: -10rpx;
							font-size: 20rpx;
							background-color: red;
							height: 30rpx;
							width: 30rpx;
							color: #FFFFFF;
							line-height: 30rpx;
							text-align: center;
							border-radius: 50%;
							font-size: 20rpx;
						}
					}
				}

			}

			.btn {
				width: 100%;
				position: fixed;
				bottom: 0;
				z-index: 99;
				border-radius: 0 !important;

			}

			.number-box {
				width: 100%;
				display: flex;
				flex-direction: row;
				margin: 20rpx 0;
				padding: 0 20rpx;
				justify-content: space-between;
				align-items: center;

				.goods-inventory {
					color: #C0C0C0;
					font-size: 20rpx;
					padding: 0 20rpx;
				}
			}
		}

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
			margin-bottom: 80rpx;
		}

		.shopping-cart {
			width: 100%;
			display: flex;
			flex-direction: row;
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 80rpx;
			background: #4d4d4d;
			.goods-quantity{
				width: 67%;
				display: flex;
				flex-direction: row;
				.icon-cart{
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.money-cart{
					flex: 1;
					display: flex;
					align-items: center;
					color: #FFFFFF;
					font-size: 26rpx;
				}
			}
			.selected{
				width: 33%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #007AFF;
				color: #FFFFFF;
				font-size: 30rpx;
				
			}
		}

		.right_icon {
			margin-right: 30rpx;
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
					width: 18%;
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
