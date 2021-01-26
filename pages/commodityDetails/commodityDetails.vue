<template>
	<view class="commodityDetails">
		<u-navbar back-icon-color='#ffffff' title="商品详情" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen" @click="toEditCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
				<u-icon name="plus" @click="toAddCommodity" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="matter">
			<!--  -->
			<view class="imgs">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
					<u-image width="180rpx" height="180rpx" border-radius="20rpx" class="scroll-view-item_H" :src="$cfg.domain+item"
					 v-for="(item,index) in oracle.images"></u-image>
				</scroll-view>
			</view>
			<!--  -->
			<view class="shopp-name" v-if="oracle.number">
				<text class="sp-name">{{oracle.name}}</text>
				<text class="sp-number">{{`(${oracle.number})`}}</text>
			</view>
			<!--  -->
			<view class="shopp-price">
				<view class="price-name">
					零售价
				</view>
				<view class="price-name">
					进货价
				</view>
				<view class="price-name yen">
					&yen;{{oracle.retail_price}}
				</view>
				<view class="price-name yen">
					&yen;{{oracle.purchase_price}}
				</view>
			</view>
			<!--  -->
			<view class="shopp-color">
				<view class="color-name">
					颜色
				</view>
				<view class="color-cont">
					{{colorName}}
				</view>
			</view>
			<!--  -->
			<view class="shopp-color">
				<view class="color-name">
					尺码
				</view>
				<view class="color-cont">
					{{sizeName}}
				</view>
			</view>

			<!--  -->
			<view class="shopp-tconts">
				<view class="tconts">
					品牌：<text v-if="oracle.goods_info"> <text v-if="oracle.goods_info.brand"> {{oracle.goods_info.brand.name}} </text></text>
				</view>
				<view class="tconts">
					分类：<text v-if="oracle.goods_category"> {{oracle.goods_category.name}}</text>
				</view>
				<view class="tconts">
					厂商：<text v-if="oracle.supplier"> {{oracle.supplier.name}}</text>
				</view>
				<view class="tconts">
					季节：<text v-if="oracle.goods_info"> {{oracle.goods_info.year}}{{oracle.goods_info.season}}</text>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		goods
	} from '../../api/goods.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				oracle: {},
				colorName: '',
				sizeName: '',
				id:0
			}
		},
		methods: {
			// 滑动
			scroll(e) {
				// console.log(e);
			},
			// 添加商品
			toAddCommodity() {
				uni.navigateTo({
					url: `/pages/addCommodity/addCommodity`
				})
			},
			// 编辑商品
			toEditCommodity() {
				uni.navigateTo({
					url: `/pages/editCommodity/editCommodity?id=${this.id}`
				})
			},
			async init(v) {
				let res = await goods(v)
				console.log(res);
				this.oracle = res;
				this.oracle.images.unshift(this.oracle.main_image)
				let colorArr = [];
				let sizeArr = [];
				this.oracle.color.map((v, i) => {
					colorArr.push(v.name)
				})
				this.oracle.size.map((v, i) => {
					sizeArr.push(v.name)
				})
				this.colorName = colorArr.join('/')
				this.sizeName = sizeArr.join('/')
			}
		},
		onLoad(query) {
			// console.log(query);
			this.id = query.id;
		},
		onShow() {
			this.init(this.id)
		}
	}
</script>

<style lang="scss" scoped>
	.commodityDetails {
		width: 100%;
		height: 100%;
		background-color: #e7e7e7;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 20rpx;
		}


		.matter {
			display: flex;
			flex-direction: column;
			padding: 10rpx 20rpx;
			width: 100%;
			background-color: #FFFFFF;
			height: 628rpx;
			margin-bottom: 20rpx;

			.imgs {
				width: 100%;
				height: 188rpx;
				display: flex;

				.scroll-view_H {
					white-space: nowrap;
					width: 100%;

					.scroll-view-item_H {
						display: inline-block;
						padding: 0 10rpx;
					}
				}
			}

			.shopp-name {
				display: flex;
				// justify-content: center;
				align-items: center;
				flex-direction: row;
				width: 100%;
				margin: 20rpx 0;

				.sp-name {
					color: #000000;
					font-weight: 600;
					font-size: 30rpx;
					text-indent: 0.5em;
				}

				.sp-number {
					padding: 0 20rpx;
					font-size: 24rpx;
					color: #999999;
				}
			}

			.shopp-price {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: row;
				flex-wrap: wrap;
				margin-bottom: 10rpx;

				.price-name {
					width: 50%;
					text-indent: 0.5em;
					font-size: 24rpx;
					color: #999999;
					padding: 10rpx 0;
				}

				.yen {
					color: #DD524D;
				}
			}

			.shopp-color {
				display: flex;
				flex-direction: row;
				margin-bottom: 20rpx;

				.color-name {
					margin-right: 40rpx;
					border: 2rpx solid #007AFF;
					color: #007AFF;
					border-radius: 10rpx;
					font-size: 20rpx;
					width: 100rpx;
					text-align: center;
					// padding: 4rpx 20rpx;
				}

				.color-cont {}
			}

			.shopp-tconts {
				width: 100%;
				height: 100rpx;
				padding: 0 10rpx;
				background-color: #e7e7e7;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: row;
				flex-wrap: wrap;
				margin-bottom: 10rpx;

				.tconts {
					width: 50%;
					font-size: 24rpx;
					color: #999999;
				}
			}
		}


	}
</style>
