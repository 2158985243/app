<template>
	<view class="goodsCategory">
		<view class="left">
			<view class="list-nav" :style="{height:hig+'rpx'}">
				<view class="nav" v-for="(item,index) in dataList" :key='index' @click="change(index,item)" :class="acitve==index? 'acitve':''">
					<text class="nav-ol">
						{{item.name}}
					</text>
					<text class="numberops" v-if="categoryQuantity[item.id]"> {{categoryQuantity[item.id]}}</text>
				</view>
			</view>
		</view>
		<view class="right">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list-arr" v-for="(item,index) in dataList" :key='index'>
					<view class="list-arr-name" :style="{height:hig+'rpx'}" v-show="acitve==index">
						<view class="list-shop" v-for="(item1,index1) in item.arr" @click="rightchange(index1,item1)">
							<view class="img">
								<u-image width="100rpx" height="100rpx" border-radius="20rpx" mode='aspectFit' :src="$cfg.domain+item1.main_image"></u-image>
							</view>
							<view class="cont">
								<text>{{item1.name}}</text>
								<text class="number">{{item1.number}}</text>
								<text class="retail" v-if="!condition">&yen;{{item1.retail_price}}</text>
								<text class="retail" v-else >&yen;{{item1.purchase_price}}</text>
							</view>
							<text class="numberops" v-if="goodsQuantity[item1.id]">{{goodsQuantity[item1.id].quantity}}</text>
						</view>
					</view>
				</view>
			</k-scroll-view>
		</view>
	</view>
</template>

<script>
	// import {domain} from '../../api/configuration.js'
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import store from '@/store'
	export default {
		name: 'goodsCategory',
		props: {
			dataList: {
				type: Array,
				default () {
					return [];
				}
			},
			saveData: {
				type: Array,
				default () {
					return [];
				}
			},
			vs: {
				type: Number,
				default: 0
			},
			condition: {
				type: Number,
				default: 0
			}

		},
		components: {
			kScrollView
		},
		data() {
			return {
				acitve: 0,
				hig: '',
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
			};
		},
		filters: {
			// filterQuantity(v) {
			// 	let quantity = 0;
			// 	let data = this.saveData;
			// 	for (let i in data) {
			// 		for (let j in data[i].goodsData) {
			// 			if (data[i].goodsData[j].goods_id == v) {
			// 				quantity = quantity + data[i].goodsData[j].quantity;

			// 			}
			// 		}
			// 	}
			// 	return quantity;
			// }
		},
		computed: {
			goodsQuantity() {
				let quantity = {};
				let data = this.saveData;
				for (let i in data) {
					for (let j in data[i].goodsData) {
						if (!quantity.hasOwnProperty(data[i].goodsData[j].goods_id)) {
							quantity[data[i].goodsData[j].goods_id] = {
								quantity: 0,
								goods_category_id: data[i].goodsData[j].goods_category_id
							};
						}
						quantity[data[i].goodsData[j].goods_id].quantity += data[i].goodsData[j].quantity;
					}
				}
				return quantity;

			},
			categoryQuantity() {
				let quantity = {};
				for (let i in this.dataList) {
					if (!quantity.hasOwnProperty(this.dataList[i].id)) {
						quantity[this.dataList[i].id] = 0;
					}
					if (this.dataList[i].id == 0) continue;
					for (let j in this.goodsQuantity) {
						if (this.goodsQuantity[j].goods_category_id == this.dataList[i].id) {
							quantity[this.dataList[i].id] += this.goodsQuantity[j].quantity;
						}
					}
				}
				return quantity;
			}
		},
		watch: {
			// saveData:function(newVal,oldVal){
			// 	console.log(newVal,oldVal)
			// 	let quantity ={};
			// 	let data = newVal;
			// 	for(let i in data) {
			// 		for(let j in data[i].goodsData) {
			// 			if(!quantity.hasOwnProperty(data[i].goodsData[j].goods_id)) {
			// 				quantity[data[i].goodsData[j].goods_id] = {
			// 					quantity: 0,
			// 					goods_category_id:data[i].goodsData[j].goods_category_id
			// 				};
			// 			}
			// 			quantity[data[i].goodsData[j].goods_id].quantity += data[i].goodsData[j].quantity;
			// 			console.log(data[i].goodsData[j].quantity);
			// 		}
			// 	}
			// 	this.goodsQuantity =  quantity;
			// 	console.log(quantity);
			// 	 quantity ={};
			// 	for(let i in this.dataList) {
			// 		if(!quantity.hasOwnProperty(this.dataList[i].id)) {
			// 			quantity[this.dataList[i].id] = 0;
			// 		}
			// 		if(this.dataList[i].id == 0) continue;
			// 		for(let j in this.goodsQuantity) {
			// 			if(this.goodsQuantity[j].goods_category_id == this.dataList[i].id) {
			// 				quantity[this.dataList[i].id] += this.goodsQuantity[j].quantity;
			// 			}
			// 		}
			// 	}
			// 	console.log(quantity);
			// 	this.categoryQuantity =  quantity;
			// }
		},
		created() {},
		onReady() {},
		mounted() {
			// console.log(store.state.specificationOfGoods,this.dataList);  
			this.getSystemIngo()
		},
		methods: {
			// filterQuantity(v) {
			// 	let quantity = 0;
			// 	let data = store.state.specificationOfGoods;
			// 	for (let i in data) {
			// 		for (let j in data[i].goodsData) {
			// 			if (data[i].goodsData[j].goods_id == v) {
			// 				quantity = quantity + data[i].goodsData[j].quantity;

			// 			}
			// 		}
			// 	}
			// 	return quantity;
			// },

			handlePullDown(stopLoad) {
				this.$emit('handlePullDown', stopLoad)
				stopLoad ? stopLoad() : '';
			},
			handleLoadMore(stopLoad) {
				this.$emit('handleLoadMore', stopLoad)
			},

			getSystemIngo() {
				let that = this;

				let num = 0;
				uni.getSystemInfo({
					success: function(res) {
						that.$u.getRect('.goodsCategory', true).then(rect => {

							that.hig = (res.screenHeight - rect[0].top - res.statusBarHeight) * 2;
						});
					}
				});

			},
			// 点击左侧
			change(index, item) {
				this.acitve = index;
				item.index = index;
				this.$emit('leftNav', item)
			},
			// 点击右侧
			rightchange(index, item) {
				item.index = index;
				this.$emit('rightNav', item)
			}
		}
	}
</script>

<style scoped lang="scss">
	.goodsCategory {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;

		.acitve {
			background-color: #FFFFFF;
		}

		.left {
			display: flex;
			width: 25vw;
			// overflow-y: scroll;
			height: 100%;

			.list-nav {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				// align-items: center;
				background-color: #e6e5ea;
				overflow-y: scroll;

				.nav {
					width: 100%;
					height: 90rpx;
					text-align: center;
					line-height: 90rpx;
					position: relative;
					border-bottom: 0.01rem solid #f8f8f8;

					// display: flex;
					// justify-content: center;
					// align-items: center;
					.numberops {
						display: block;
						position: absolute;
						right: 10rpx;
						top: 6rpx;
						min-width: 40rpx;
						min-height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background-color: red;
						border-radius: 50%;
						color: #FFFFFF;
						font-size: 20rpx;
					}

					.nav-ol {
						display: block;
						width: 100%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

				}
			}
		}

		.right {
			width: 75vw;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;
			background-color: #FFFFFF;

			.list-arr {
				width: 100%;
				height: 100%;
				overflow: hidden;

				.list-arr-name {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					// align-items: center;
					// background-color: #C8C7CC;
					overflow-y: scroll;

					.list-shop {
						width: 100%;
						// height: 90rpx;
						// line-height: 90rpx;
						padding: 10rpx;
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						background-color: #FFFFFF;
						align-items: center;
						border-bottom: 0.01rem solid #C0C0C0;
						position: relative;

						.numberops {
							position: absolute;
							right: 20rpx;
							top: 10rpx;
							display: block;
							min-width: 40rpx;
							min-height: 40rpx;
							line-height: 40rpx;
							background-color: red;
							font-size: 20rpx;
							color: #FFFFFF;
							border-radius: 50%;
							text-align: center;
						}

						.img {
							margin: 0 20rpx;
						}

						.cont {
							display: flex;
							flex-direction: column;
							justify-content: space-around;

							.number {
								color: #999999;
								font-size: 24rpx;
							}

							.retail {
								color: #DD524D;
								font-size: 24rpx;
							}

						}
					}
				}
			}
		}
	}
</style>
