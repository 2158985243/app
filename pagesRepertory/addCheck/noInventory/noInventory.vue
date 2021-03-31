<template>
	<view class="noInventory">
		<view class="header">
			<u-search class='search' height='60' @change="search"  :show-action="false" :scan="true" shape="square"
				placeholder="请输入商品名称/编码" v-model="keyword" @Inventory="handelScan"></u-search>
		</view>
		<view class="list">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
				:loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height"
				:bottom="bottom" :autoPullUp="autoPullUp" :inBottom="pull" :stopPullDown="stopPullDown"
				@onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list-item" v-for="(item,index) in list" :key="index" @click="clickItem(item,index)">
					<view class="left">
						<view class="img">
							<u-image width="100" border-radius='18' height="100" mode='aspectFit'
								:src="$imgFn(item.goods.main_image)">
							</u-image>

						</view>
						<view class="left-item">
							<text class="black">{{item.goods.name}}</text>
							<text class="gray">{{item.goods.number}}</text>
							<text class="gray">{{item.color.name}} - {{item.size.name}}</text>
						</view>
					</view>
					<view class="right">
						<text class="gray">库存：{{item.stock}}</text>
					</view>
				</view>
			</k-scroll-view>
			<u-toast ref="uToast" />
		</view>
		<u-popup v-model="show" mode="center" border-radius='16' width="80%"  height="300rpx">
			<view class="pop_center">
				<text
					class="tit">{{itemObj.goods.number}}-{{itemObj.color.name}}-{{itemObj.size.name}}(库存:{{itemObj.stock}})</text>
				<view class="ipt">
					<u-input placeholder=' ' :focus='true'  style='background-color: #FFFFFF;border-radius: 20rpx;width: 80%;' :border="true" v-model="size_number" type="number" />
				</view>
				<view class="btn">
					<view class="qx" @click="show = false">
						取消
					</view>
					<view class="qd" @click="sure">
						确定
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		checkListAdd,
		singleAdd,
		getUncheckGoods
	} from '../../../api/check.js'
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				list_index:0,
				size_number: '', //输入框数量
				show: false,
				page: 1,
				page_size: 20,
				numberUnits: 0,
				keyword: '',
				pull: false,
				list: [],
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--到底了--',
				touchHeight: 100,
				height: 0,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				last_page: 0,
				style_input: {
					'background-color': '#ffffff'
				},
				itemObj: {
					color: {},
					size: {},
					goods: {}
				}
			}
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
				let obj = {}
				obj['remarks'] = this.form.remarks;
				obj['id'] = this.form.check_list_id;
				obj['checkIndex'] = 0;
				obj['number'] = this.numberUnits;
				uni.$emit('noInventory', obj);
				uni.navigateBack();
			},
			async init() {
				let res = await getUncheckGoods({
					...this.form,
					keyword:this.keyword,
					page: this.page,
					page_size: this.page_size,

				})
				if (res.length < this.page_size) {
					this.pull = true
				}
				this.list.push(...res)
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
			search: function(value) {
				this.form.keyword = value
				this.page = 1
				this.list = []
				this.pull = false
				this.init()
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = [];
				this.pull = false
				this.init()
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if (this.pull) {
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
				stopLoad ? stopLoad() : '';
			},
			// 点击某一个商品
			clickItem(item,index) {
				this.show = true;
				this.list_index = index;
				this.itemObj = this.$u.deepClone(item)
			},
			// 确定
			async sure(){
				if(this.size_number==''){
					this.$refs.uToast.show({
						title: '请输入盘点的数量！',
						type: 'default',
						position: 'bottom'
					})
				}else{
					this.show = false;
					
					if(this.form.check_list_id>0){
						let res = await singleAdd({
							check_list_id:this.form.check_list_id,
							remarks:this.form.remarks,
							goods:[{goods_id:this.itemObj.goods_id,color_id:this.itemObj.color.id,price: this.itemObj.goods.retail_price,size_id:this.itemObj.size.id,quantity:this.size_number,before_quantity:this.itemObj.stock}]
						})
						if(!res.code){
							this.numberUnits += Number(this.size_number) 
							this.list.splice(this.list_index,1)
							this.$forceUpdate()
						}
					}else{
						let res = await checkListAdd({
							remarks:this.form.remarks,
							goods:[{goods_id:this.itemObj.goods_id,color_id:this.itemObj.color.id,price: this.itemObj.goods.retail_price,size_id:this.itemObj.size.id,quantity:this.size_number,before_quantity:this.itemObj.stock}]
						})
						if(!res.code){
							this.form.check_list_id = res.check_list_id
							this.numberUnits += Number(this.size_number) 
							this.list.splice(this.list_index,1)
							this.$forceUpdate()
						}
					}
					this.size_number = ''
					
				}
			}
		},
		onLoad(query) {
			let item = JSON.parse(decodeURIComponent(query.item));
			console.log(item);
			this.form = item;
			this.numberUnits  = this.form.quantity
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.noInventory {
		width: 100%;
		height: 100vh;
		background-color: #E5E5E5;
		display: flex;
		flex-direction: column;

		.pop_center {
			background-color: #F3F6F4;
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: column;

			.tit {
				color: #000000;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 30rpx;
			}

			.ipt {
				width: 88%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.btn {
				width: 100%;
				display: flex;
				flex-direction: row;
				margin-top: 20rpx;
				border-top: 0.1rem solid #dad9de;
				height: 80rpx;
				.qx {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #007AFF;
					border-right: 1rpx solid #dad9de;
				}

				.qd {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #007AFF;
				}
			}
		}

		.header {
			width: 100%;
			padding: 20rpx;
			background-color: #E5E5E5;
			border-bottom: 0.01rem solid #C0C0C0;
			position: fixed;
			top: calc(80rpx + var(--status-bar-height));
			z-index: 99;
		}

		.list {
			width: 100%;
			height: calc(100vh - 102rpx);
			display: flex;
			flex-direction: column;
			margin: 100rpx 0 0 0;

			.list-item {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx;
				border-bottom: 0.01rem solid #E5E5E5;
				background-color: #FFFFFF;
				align-items: center;

				.left {
					display: flex;
					flex-direction: row;
					align-items: center;

					.left-item {
						margin-left: 10rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;

						.black {
							color: #000000;
						}

						.gray {
							font-size: 24rpx;
							color: #C0C0C0;
						}
					}
				}

				.right {
					.gray {
						color: #C0C0C0;
					}
				}
			}
		}


	}
</style>
