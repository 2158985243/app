<template>
	<view class="selectProducts">
		<u-navbar back-icon-color='#ffffff' :custom-back="quit" title="商品选择" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="plus" @click="toAddCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="box">
			<u-popup v-model="show" z-index='999' mode="right" width="80%">

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
			<goods-category :dataList='dataList' @leftNav="leftNav" :saveData="saveData" :vs='vs' @rightNav="rightNav"
			 :condition="condition" :inBottom="pull" @handlePullDown="handlePullDown" @handleLoadMore="handleLoadMore"></goods-category>
		</view>
		<view class="shopping-cart">
			<view class="goods-quantity">
				<u-icon class="icon-cart" @click="shoppingCart" name="shopping-cart" color="#ffffff" size="50"></u-icon>
				<text class="money-cart">{{goodsNumber+'件'}} &yen;{{allMoney}}</text>
			</view>
			<view class="selected" @click="selectedFn">
				选好了
			</view>
		</view>
		<u-toast ref="uToast" />
		<!-- 商品规格表单 -->
		<u-popup v-model="showGoods" mode="bottom" z-index='1001' height="70%">
			<view class="specification" v-if="goodsOf">
				<view class="goods-of">
					<!-- mode='aspectFit'  -->
					<u-image width="140rpx" height="140rpx" border-radius='20' :src="$imgFn(goodsOf.main_image)"></u-image>
					<view class="goodsNews">
						<text class="goods-name">{{goodsOf.name}}</text>
						<text class="goods-number">{{goodsOf.number}}</text>
						<text class="goods-money" v-if="!condition">&yen;{{goodsOf.retail_price}}</text>
						<text class="goods-money" v-else>&yen;{{goodsOf.purchase_price}}</text>
					</view>
				</view>
				<u-line color="#e6e6e6" />

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
					<view class="" v-for="(item,index) in spec" :key="index">
						<view class="size-box" v-if="index==active1">
							<view class="size-box-list once">
								<text class="listed">尺码</text>
								<text class="listed">当前库存</text>
								<u-number-box class="listed" v-model="item.valNew" size="24" input-width="60" input-height="40" :min="0" @minus="minusAll"
								 @plus="plusAll" @change="valChangeAll($event,item,index)"></u-number-box>
							</view>
							<view class="size-box-list" v-for="(item1,index1) in item.data" :key="index1" @click="clickSize(item1,index1)">
								<text class="listed">{{item1.size.name}}</text>
								<text class="listed" v-if="item1.goods_spec_info">{{item1.goods_spec_info.stock}}</text>
								<u-number-box class="listed" v-model="item1.quantity" size="24" input-width="60" input-height="40" :min="0"
								 @change="valChange"></u-number-box>
							</view>
						</view>
					</view>
				</view>

				<view class="btn">
					<u-button type="primary" class="btn" @tap="save()">确定</u-button>
				</view>
			</view>
		</u-popup>

		<!-- 购物车表单 -->
		<u-popup v-model="showShoppingCart" mode="bottom" z-index='1001' length="60%">
			<view class="scart">
				<view class="del">
					<u-icon name="close-circle" class='close' @click="showShoppingCart=false" color="#040404" size="40"></u-icon>
				</view>
				<view class="lists-cart">
					<view class="specification" v-for="(item,index) in saveData" :key="index">
						<u-icon name="trash" class='close' @click="hiddengoods(index)" color="#a8a8a8" size="40"></u-icon>
						<view class="goods-of" v-if="item.goodsData[0]">
							<u-image width="140rpx" height="140rpx" border-radius='20' :src="$imgFn(item.goodsData[0].goodsOf.main_image)"></u-image>
							<view class="goodsNews">
								<text class="goods-name">{{item.goodsData[0].goodsOf.name}}</text>
								<text class="goods-number">{{item.goodsData[0].goodsOf.number}}</text>
								<text class="goods-money" v-if="!condition">&yen;{{item.goodsData[0].goodsOf.retail_price}}</text>
								<text class="goods-money" v-else>&yen;{{item.goodsData[0].goodsOf.purchase_price}}</text>
							</view>
						</view>
						<view class="color-size">
							<view class="color-list">
								<view class="color-box" v-for="(itemColor,index1) in item.goodsData" :key="index1">
									<view class="size-list" v-if="itemColor.quantity>0">
										<view class="sizeInof" v-for="(itemSize,indexSize) in itemColor.data">
											<view class="size-medium" v-if="itemSize.hidden">
												<text class="size-nav">{{itemColor.name}}</text>
												<text class="size-nav">{{itemSize.size.name}}</text>
												<u-number-box class="size-nav" v-model="itemSize.quantity" size="24" @change="sizeChange($event,index,index1,indexSize,itemSize)"
												 input-width="100" :min="0"></u-number-box>
												<view class='size-nav'>
													<u-icon name="trash" color="#a8a8a8" size="40" @click="delSize(index,index1,indexSize)"></u-icon>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
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
				// allMoney: 0,
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
				spec: [],
				showShoppingCart: false,
				aIndex: [], //购物车商品数组下标
				aValue: [], //购物车商品尺码数量组
				numAll: 0,
				valAll: [],
				// saveData:[]
				last_page: 0,
				mored: {id:0,index:0,name:'全部'},
				pull: false,
				condition: 0,
				stockLog:0
			}
		},

		computed: {
			// 商品组
			saveData() {
				return store.state.specificationOfGoods;
			},
			// 商品总数量
			goodsNumber() {
				let num = 0;
				let arr = store.state.specificationOfGoods;
				arr.map(v => {
					v.goodsData.map(v1 => {
						num += v1.quantity;
					})
				})
				return num;
			},
			// 商品总价格
			allMoney() {
				let num = 0;
				let arr = store.state.specificationOfGoods;
				arr.map(v => {
					v.goodsData.map(v1 => {
						if (!this.condition) {
							num += v1.quantity * Number(v1.goodsOf.retail_price);
						} else {
							num += v1.quantity * Number(v1.goodsOf.purchase_price);
						}
					})
				})
				return num;
			},
		},
		watch: {
			// newList(newv, oldv) {
			// 	console.log(newv, oldv);
			// 	if (oldv.length !== 0) {
			// 		console.log(1);
			// 		this.spec[this.active1].data.map((v, i) => {
			// 			v.quantity = v.quantity + (newv[this.active1] - oldv[this.active1]);
			// 		});
			// 	}
			// },
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.quit()
			return true;
		},
		methods: {
			quit() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '商品还未保存，确认要退出？',
					success: function(res) {
						if (res.confirm) {
							_this.$store.commit('commercialSpecification', {
								specificationOfGoods: []
							})
							uni.navigateBack()
						} else if (res.cancel) {
							return true;
						}
					}
				});
			},
			// 全部尺码组数组变化
			valChangeAll(val, item, index) {
				item.quantity = 0;
				item.check = true;
				item.data.map((v, i) => {
					v.quantity = v.quantity + (val.value - item.valOld);
					item.quantity += v.quantity
				});
				item.valOld = item.valNew;
				this.$set(this.spec, index, this.spec[index])
			},
			// 全部尺码组数组减小
			minusAll(val) {

			},
			// 全部尺码组数组增加
			plusAll(val) {},
			// 单个尺码数值变化
			valChange() {
				// console.log(1);
				// this.spec[this.active1].data[this.active2].quantity = v.value;
				this.spec[this.active1].quantity = 0;
				this.spec[this.active1].data.map((v, i) => {
					this.spec[this.active1].quantity += v.quantity;
				})
				this.$set(this.spec, this.active1, this.spec[this.active1])
			},
			// 向下拉
			handlePullDown(stopLoad) {
				this.page = 1;
				this.pull = false;
				let index = 0;
				if (this.mored.index) {
					this.index = this.mored.index
				}
				this.dataList[this.mored.index].arr = [];
				this.loadMore();
				stopLoad ? stopLoad() : '';
			},
			// 向上拉
			handleLoadMore(stopLoad) {
				if (!this.pull) {
					if (this.page >= this.dataList[0].last_page) {
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
				this.show = false;
				this.page = 1
				this.pull = false
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
				// console.log(this.options);
				let res = await goodsList({
					page: this.page,
					page_size: this.page_size,
					status: 1,
					goods_category_id: this.mored.id,
					options: this.options,
					keyword: this.keyword
				});
				if (!res.code) {
					this.dataList[this.mored.index].last_page = res.last_page
					if (this.mored.index == undefined) {
						this.dataList[0].arr = res.data;
					} else {
						this.dataList[this.mored.index].arr = res.data;
					}
				}
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
					url: `/pagesRepertory/addCommodity/addCommodity`
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
					status:1,
					keyword: this.keyword
				});
				this.dataList = [];
				this.dataList.unshift({
					name: "全部",
					id: 0,
					arr: res.data
				})
				this.dataList[this.mored.index].last_page = res.last_page
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
				this.mored = e;
				this.vs = 1;
				for (let i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].arr.length == 0 && e.index == i) {
						this.page = 1
						this.pull = false
						let res = await goodsList({
							page: this.page,
							page_size: this.page_size,
							status: 1,
							goods_category_id: e.id,
							keyword: this.keyword
						});
						this.dataList[i].arr = res.data;
						this.dataList[i].last_page = res.last_page
						this.$set(this.dataList, i, this.dataList[i])
						// console.log(res.data);
						break;
					}
				}
			},
			async loadMore() {
				this.$nextTick(async () => {
					let index = 0;
					if (this.mored.index) {
						this.index = this.mored.index
					}
					let res = await goodsList({
						page: this.page,
						page_size: this.page_size,
						status: 1,
						goods_category_id: this.mored.id,
						keyword: this.keyword
					});
					this.dataList[this.mored.index].last_page = res.last_page
					this.dataList[this.mored.index].arr.push(...res.data);
					this.$set(this.dataList, this.mored.index, this.dataList[this.mored.index])
				})
			},
			// 点击右侧
			async rightNav(e) {
				if(this.stockLog == 0){
					this.active1 = 0;
					let arr = this.saveData;
					let num = 1;
					// 修改选过的商品
					for (let i = 0; i < arr.length; i++) {
						if (arr[i].goodsData[0].goods_id == e.id) {
							this.goodsOf = arr[i].goodsData[0].goodsOf;
							this.spec = arr[i].goodsData;
							num = 0;
							this.$forceUpdate()
							break;
						}
					}
					// 新选的商品
					if (num) {
						// let res = await goods(e.id)
						// if (!res.code) {
							this.value = 0;
							this.goodsOf = e;
							this.$forceUpdate()
							this.spec = e.color;
							this.spec.map((v1, i1) => {
								v1['goodsOf'] = {
									id: e.id,
									name: e.name,
									number: e.number,
									retail_price: e.retail_price,
									purchase_price: e.purchase_price,
									main_image: e.main_image,
									images: e.images
								};
								v1['goods_category_id'] = e.goods_category_id;
								v1['goods_id'] = e.id;
								v1['data'] = [];
								v1['quantity'] = 0;
								v1['valOld'] = 0;
								v1['valNew'] = 0;
								v1['check'] = false;
								// this.valAll.push(0);
								e.goods_spec.map((v, i) => {
									if (v.color_id == v1.id) {
										v1.data.push({
											size: v.size,
											goods_spec_info: v.goods_spec_info,
											quantity: 0,
											hidden: true
										})
									}
								})
								this.$set(this.spec, i1, this.spec[i1]);
							})
						// }
					}
					// this.$forceUpdate()

					this.showGoods = true;
				}else{
					let obj = {
						name:e.name,
						number:e.number,
						goods_id:e.id
					}
					uni.$emit('stockLog',obj)
					uni.navigateBack()
				}
			},
			hiddengoods(index) {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确定删除该商品吗？',
					success: function(res) {
						if (res.confirm) {
							_this.saveData.splice(index, 1);
							_this.$store.commit('commercialSpecification', {
								specificationOfGoods: _this.saveData
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			// 输入框输入
			async search(v) {
				this.page = 1;
				this.pull = false;
				this.dataList[this.mored.index].arr = []
				let res = await goodsList({
					page: this.page,
					page_size: this.page_size,
					status: 1,
					goods_category_id: this.mored.id,
					keyword: this.keyword
				});
				this.dataList[this.mored.index].arr = res.data;
				this.dataList[this.mored.index].last_page = res.last_page
				this.$set(this.dataList, this.mored.index, this.dataList[this.mored.index])
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
				// this.value = this.spec[this.active1].data[this.active2].quantity;
			},
			clickSize(item, index) {
				this.active2 = index;
				// this.value = this.spec[this.active1].data[this.active2].quantity;
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
							num = 0;
							this.$set(arr, i, arr[i])
							break;
						}
					}
					if (num) {
						arr.push({
							goodsData: this.spec
						});
						this.$forceUpdate()
					}
				} else {
					arr.push({
						goodsData: this.spec
					})
				}
				console.log(arr);
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: arr
				})

				this.showGoods = false;
			},
			// 点击购物车
			shoppingCart() {
				// console.log(this.saveData);
				let _this = this
				this.$nextTick(function() {
					if (_this.saveData.length > 0) {
						_this.saveData.map((v, i) => {
							v.goodsData.map(v1 => {
								v1.data.map((v2) => {
									if (v2.quantity > 0) {
										v2.hidden = true;
									}
								})
							})
							_this.$set(_this.saveData, i, _this.saveData[i])
						})
						_this.showShoppingCart = true;
					}
				})
				console.log(this.saveData);
			},
			// 删除某一个尺码
			delSize(index, index1, indexSize) {
				this.saveData[index].goodsData[index1].data[indexSize].hidden = false;
				this.saveData[index].goodsData[index1].quantity -= this.saveData[index].goodsData[index1].data[indexSize].quantity;
				this.saveData[index].goodsData[index1].data[indexSize].quantity = 0;

				this.$set(this.saveData, index, this.saveData[index])
			},
			// 每一个尺码的变化
			sizeChange(val, index, index1, indexSize, itemSize) {
				this.saveData.map((v, i) => {
					v.goodsData.map((v1, i1) => {
						v1.quantity = 0;
						v1.data.map((v2, i2) => {
							v1.quantity += v2.quantity;
						})
					})
				})
				this.$set(this.saveData, index, this.saveData[index])
			},
			// 选完跳转
			selectedFn() {
				console.log(this.saveData);
				if (this.saveData.length > 0) {
					this.$store.commit('stateGoodFn', {
						stateGood: true
					});
					uni.navigateBack();
				} else {
					this.$refs.uToast.show({
						title: '请选择商品',
						type: 'default',
						position: 'bottom'
					})
				}
				// console.log(1);
			},


		},
		onLoad(query) {
			this.init()
			this.brand();
			if (query.condition) {
				this.condition = Number(query.condition);
			}
			if (query.stockLog) {
				this.stockLog = Number(query.stockLog);
			}
		}
	}
</script>

<style scoped lang="scss">
	.selectProducts {
		width: 100%;
		background-color: #e3e3e3;
		display: flex;
		flex-direction: column;
		height: 100vh;
		.active {
			background-color: #3B4144 !important;
			color: #FFFFFF !important;
		}

		.scart {
			position: relative;
			width: 100%;
			display: flex;

			.del {
				position: fixed;
				top: 0;
				background-color: #FFFFFF;
				width: 100%;
				overflow: hidden;
				height: 70rpx;
				z-index: 666;

				.close {
					display: block;
					width: 40rpx;
					height: 40rpx;
					float: right;
					margin: 20rpx;
				}
			}

			.lists-cart {
				width: 100%;
				display: flex;
				margin-top: 70rpx;
				flex-direction: column;

				.color-size {
					width: 100%;
					display: flex;

					.color-list {
						width: 100%;
						display: flex;
						flex-direction: column;
						border-top: 0.01rem solid #e6e6e6;


						.color-box {
							width: 100%;
							display: flex;
						}

						.size-list {
							width: 100%;
							display: flex;
							flex-direction: column;

							.sizeInof {
								width: 100%;
								display: flex;
								// flex-direction: row;
								flex-direction: column;

								.size-medium {
									width: 100%;
									display: flex;
									flex-direction: row;
									padding: 15rpx 0;
									border-bottom: 0.01rem solid #e6e6e6;
								}

								.size-nav {
									flex: 1;
									display: flex;
									justify-content: center;
									align-items: center;
								}
							}

							// .sizeInof:first-child{
							// }

						}
					}
				}
			}


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
				padding: 10rpx 20rpx;

				.goodsNews {
					display: flex;
					flex-direction: column;
					padding-left: 20rpx;

					.goods-number {
						color: #C0C0C0;
						font-size: 20rpx;
						margin-top: 10rpx;
					}

					.goods-money {
						color: #ff0000;
						font-size: 28rpx;
						margin-top: 10rpx;
					}

					.goods-inventory {
						color: #C0C0C0;
						font-size: 20rpx;
						margin-top: 10rpx;
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
				// margin: 20rpx 0;
				margin-top: 20rpx;
				margin-bottom: 80rpx;
				padding: 0 20rpx;

				.size-box {
					width: 100%;
					display: flex;
					flex-direction: column;

					.size-box-list {
						width: 100%;
						height: 90rpx;
						display: flex;
						flex-direction: row;
						border-bottom: 0.01rem solid #e6e6e6;

						.listed {
							flex: 1;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}

					.once {
						border-top: 0.01rem solid #e6e6e6;
					}
				}

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

		.box{
			width: 100%;
			position: fixed;
			top: calc(80rpx + var(--status-bar-height)) ;
			z-index: 999;
		}
		.list {
			width: 100%;
			// max-height: 70%;
			height: calc(100% - 240rpx);
			display: flex;
			margin: 78rpx 0 80rpx 0;
			overflow: hidden;
		}

		.shopping-cart {
			width: 100%;
			display: flex;
			flex-direction: row;
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 80rpx;
			z-index: 10;
			background: #4d4d4d;

			.goods-quantity {
				width: 67%;
				display: flex;
				flex-direction: row;

				.icon-cart {
					display: flex;
					// justify-content: center;
					align-items: center;
					padding-left: 10rpx;
				}

				.money-cart {
					padding-left: 60rpx;
					display: flex;
					align-items: center;
					color: #FFFFFF;
					font-size: 26rpx;
				}
			}

			.selected {
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
				z-index: 10;
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
