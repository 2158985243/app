<template>
	<view class="stockTaking">
		<u-navbar back-icon-color='#ffffff' title="库存盘点" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="search" @click="toRefer" color="#ffffff" class="right_icon" size="34"></u-icon>
				<u-icon name="plus" @click="toPurchaseStorage" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="box">
			<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
			 @clickItem="onClickItem"></tabControl>
			<swiper class="swiper" @change='scollSwiper' :current='current'>
				<swiper-item v-for="(item,index) in list" :key='index'>
					<scroll-view scroll-y="true" style="height: 100%;">
						<view class="list">
							<view class="list-box" v-for="(itemList,indexList) in item" @click="toPurchase(itemList)">
								<view class="left">
									<text class="supplier-name">{{itemList.number}}</text>
									<text>盘点合计{{itemList.check_amount}}件,盈亏合计{{itemList.differ_amount}}件,盈亏金额&yen;{{itemList.money}}</text>
									<text>{{itemList.updated_at}}</text>
								</view>

							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		checkList
	} from '../../api/check.js'
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';

	export default {
		components: {
			tabControl
		},
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				list: [
					[],
					[],
					[]
				],
				current: 0,
				items: [{
					name: '已盘点',
					status: 1
				}, {
					name: '草稿单',
					status: 0
				}, {
					name: '已作废',
					status: 2
				}],
				page: 1,
				page_size: 10,

			}
		},
		methods: {
			// 初始化
			async init() {
				let res = await checkList({
					status: 1,
					page: this.page,
					page_size: this.page_size

				})
				console.log(res);
				this.list.splice(0, 1, res.data)
			},
			// 前往增加采购信息
			toPurchaseStorage() {
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: []
				})
				this.$store.commit('stateGoodFn', {
					stateGood: false
				})
				uni.navigateTo({
					url: `/pages/addCheck/addCheck`
				})
			},
			// 前往查询页面
			toRefer() {
				uni.navigateTo({
					url: `/pages/refer/refer`
				})
			},
			// 
			toPurchase(item) {
				// console.log(item);
				if (item.status == 0) {
					uni.navigateTo({
						url: `/pages/drafCheck/drafCheck?id=${item.id}`
					})
				} else if (item.status == 1) {
					uni.navigateTo({
						url: `/pages/stopCheck/stopCheck?id=${item.id}`
					})
				} else if (item.status == 2) {
					uni.navigateTo({
						url: `/pages/checkCancellation/checkCancellation?id=${item.id}`
					})
				}

			},
			async onClickItem(val) {
				this.current = val.currentIndex;
			},
			async scollSwiper(e) {
				this.current = e.target.current
				if (this.list[this.current].length == 0) {
					if (this.current == 0) {
						let res = await checkList({
							status: 1,
							page: this.page,
							page_size: this.page_size

						});
						this.list.splice(this.current, 1, res.data);
					} else if (this.current == 1) {
						let res = await checkList({
							status: 0,
							page: this.page,
							page_size: this.page_size

						});
						this.list.splice(this.current, 1, res.data);
					} else {
						let res = await checkList({
							status: 2,
							page: this.page,
							page_size: this.page_size

						});
						this.list.splice(this.current, 1, res.data);
					}
				}
				// console.log(this.current);
			}

		},
		onLoad() {
			// this.init()
			uni.$on("refer", async (result) => {
				this.page = 1;
				if (result) {
					if (this.current == 0) {
						let res = await checkList({
							status: 1,
							page: this.page,
							page_size: this.page_size,
							...result
						});
						this.list.splice(this.current, 1, res.data);
					} else if (this.current == 1) {
						let res = await checkList({
							status: 0,
							page: this.page,
							page_size: this.page_size,
							...result

						});
						this.list.splice(this.current, 1, res.data);
					} else {
						let res = await checkList({
							status: 2,
							page: this.page,
							page_size: this.page_size,
							...result
						});
						this.list.splice(this.current, 1, res.data);
					}
				}
			});
		},
		onReady() {
			//执行计算组件高度方法
		},
		onShow() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.stockTaking {
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
			// margin-top: 88rpx;
			// display: flex;
			// flex-direction: column;

			.swiper {
				height: 100%;
			}

			.list {
				width: 100%;
				display: flex;
				flex-direction: column;

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
