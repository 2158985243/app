<template>
	<view class="allocate">
		<u-navbar back-icon-color='#ffffff' title="库存调拨历史" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="search" @click="toRefer" color="#ffffff" class="right_icon" size="34"></u-icon>
				<u-icon name="plus" @click="toAddAllocate" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="box">
			<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
				@clickItem="onClickItem"></tabControl>
			<swiper class="swiper" @change='scollSwiper' :current='current'>
				<swiper-item v-for="(item,index) in list" :key='index'>
					<scroll-view scroll-y="true">
						<view class="list">
							<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip"
								:loadTip="loadTip" :loadingTip="loadingTip" :emptyTip="emptyTip"
								:touchHeight="touchHeight" :height="height" :bottom="bottom" :autoPullUp="autoPullUp"
								:inBottom="pull[current]" :stopPullDown="stopPullDown" @onPullDown="handlePullDown"
								@onPullUp="handleLoadMore">
								<view class="list-box" v-for="(itemList,indexList) in item"
									@click="toPurchase(itemList)">
									<view class="left">
										<text
											class="supplier-name">{{itemList.from_store.name}}→{{itemList.to_store.name}}</text>
										<text>{{itemList.number}}</text>
										<text>{{itemList.updated_at}}</text>
									</view>
									<view class="right">
										<text class="money">&yen;{{itemList.price}}</text>
										<!-- <text>{{itemList.store.name}}</text> -->
									</view>

								</view>
							</k-scroll-view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		allocateList
	} from '../../api/allocate.js'
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import store from '@/store'
	export default {
		components: {
			tabControl,
			kScrollView
		},
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				list: [
					[],
					[],
					[],
					[]
				],
				current: 0,
				items: [{
					name: '已调拨',
					status: 1
				}, {
					name: '待调入',
					status: 2
				}, {
					name: '草稿单',
					status: 0
				}, {
					name: '已作废',
					status: 3
				}],
				page: [1, 1, 1, 1],
				page_size: 10,

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
				last_page: [0, 0, 0, 0],
				pull: [false, false, false, false],
				refer_data: {}
			}
		},
		methods: {
			// 初始化
			async init() {
				if (this.list[this.current].length == 0) {
					if (this.current == 0) {
						let res = await allocateList({
							status: 1,
							page: this.page[this.current],
							page_size: this.page_size,
							...this.refer_data
						});
						this.$nextTick(() => {
							this.list[this.current].push(...res.data)
							this.last_page[this.current] = res.last_page
						})
					} else if (this.current == 1) {
						let res = await allocateList({
							status: 2,
							page: this.page[this.current],
							page_size: this.page_size,
							...this.refer_data

						});
						this.$nextTick(() => {
							this.list[this.current].push(...res.data)
							this.last_page[this.current] = res.last_page
						})
					} else if (this.current == 2) {
						let res = await allocateList({
							status: 0,
							page: this.page[this.current],
							page_size: this.page_size,
							...this.refer_data

						});
						this.$nextTick(() => {
							this.list[this.current].push(...res.data)
							this.last_page[this.current] = res.last_page
						})
					} else {
						let res = await allocateList({
							status: 3,
							page: this.page[this.current],
							page_size: this.page_size,
							...this.refer_data
						});
						this.$nextTick(() => {
							this.list[this.current].push(...res.data)
							this.last_page[this.current] = res.last_page
						})
					}
					this.$forceUpdate()
				}
			},
			// 增加调拨单
			toAddAllocate() {
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: []
				})
				this.$store.commit('stateGoodFn', {
					stateGood: false
				})
				uni.navigateTo({
					url: `/pagesRepertory/addAllocate/addAllocate`
				})
			},
			// 前往查询页面
			toRefer() {
				uni.navigateTo({
					url: `/pagesRepertory/refer/refer`
				})
			},
			// 
			toPurchase(item) {
				if (item.to_store_id == store.state.store.store_id) {
					uni.navigateTo({
						url: `/pagesRepertory/callIn/callIn?id=${item.id}`
					})
				} else if (item.status == 0) {
					uni.navigateTo({
						url: `/pagesRepertory/draftAllocate/draftAllocate?id=${item.id}`
					})
				} else if (item.status == 1) {
					uni.navigateTo({
						url: `/pagesRepertory/stopAllocate/stopAllocate?id=${item.id}`
					})
				} else if (item.status == 3) {
					uni.navigateTo({
						url: `/pagesRepertory/cancellationAllocate/cancellationAllocate?id=${item.id}`
					})
				}

			},
			async onClickItem(val) {
				this.current = val.currentIndex;
			},
			async scollSwiper(e) {
				// console.log(this.list[this.current].length,this.current);
				this.current = e.target.current
				this.init()
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page[this.current] = 1;
				this.list[this.current] = [];
				this.pull[this.current] = false;
				this.init()
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if (!this.pull[this.current]) {
					if (this.page[this.current] >= this.last_page[this.current]) {
						this.$refs.uToast.show({
							title: '加载到底了',
							type: 'default',
							position: 'bottom'
						})
						this.pull[this.current] = true
					} else {
						this.page[this.current]++;
						this.init()
					}
				}
			},
			handleGoTop() {
				this.$refs['k-scroll-view'].goTop();
			},

		},
		onUnload() {
			uni.$off()
		},
		onLoad() {
			let date = this.$date.thirtyDays()
			this.refer_data.start_time = date.start_time
			this.refer_data.end_time = date.end_time
			this.init()
			uni.$on("refer", async (res) => {
				if (res) {
					if (res.start_time == "" || res.start_time == undefined) {
						delete res.start_time
						delete res.end_time
						for (let key in res) {
							this.refer_data[key] = res[key]
						}
					} else {
						this.refer_data = res
					}
					this.page[this.current] = 1;
					this.list[this.current] = []
					this.init()
				}
			});
			uni.$on('allocate', async (result) => {
				if (result) {
					this.list = [
						[],
						[],
						[],
						[]
					]
					this.init()
				}
			})
		},
		onReady() {
			//执行计算组件高度方法
		},
		onShow() {}
	}
</script>

<style scoped lang="scss">
	.allocate {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f2f1f5;

		.right_icon {
			margin-right: 30rpx;
		}

		.box {
			width: 100%;
			height: 100%;
			// display: flex;
			// flex-direction: column;

			.swiper {
				margin-top: 84rpx;
				height: calc(100% - 84rpx);
			}

			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				height: 100%;

				.list-box {
					width: 100%;
					padding: 20rpx;
					background-color: #FFFFFF;
					border-bottom: 0.01rem solid #C8C7CC;
					display: flex;
					flex-direction: space-between;

					.left {
						flex: 1;
						display: flex;
						flex-direction: column;

						.supplier-name {
							font-weight: 600;
							padding-bottom: 10rpx;
						}

						text {
							font-size: 24rpx;
						}
					}

					.right {
						display: flex;
						flex-direction: column;
						justify-content: flex-end;

						// align-self:flex-end
						text {
							text-align: right;
							font-size: 24rpx;
						}

						.money {
							font-weight: 600;
							color: #DD524D;
						}
					}
				}
			}
		}

	}
</style>
