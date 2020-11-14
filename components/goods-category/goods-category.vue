<template>
	<view class="goodsCategory">
		<view class="left">
			<view class="list-nav" :style="{height:hig+'rpx'}">
				<view class="nav" v-for="(item,index) in dataList" :key='index' @click="change(index,item)" :class="acitve==index? 'acitve':''">
					<text class="nav-ol">
						{{item.name}}
					</text>
				</view>
			</view>
		</view>
		<view class="right">
			<view class="list-arr" v-for="(item,index) in dataList" :key='index'>
				<view class="list-arr-name" :style="{height:hig+'rpx'}" v-show="acitve==index">
					<view class="list-shop" v-for="(item1,index1) in item.arr" @click="rightchange(index1,item1)">
						<view class="img">
							<u-image width="100rpx" height="100rpx" border-radius="20rpx" mode='aspectFit' :src="$cfg.domain+item1.main_image"></u-image>

						</view>
						<view class="cont">
							<text>{{item1.name}}</text>
							<text class="number">{{item1.number}}</text>
							<text class="retail">&yen;{{item1.retail_price}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import {domain} from '../../api/configuration.js'
	export default {
		name: 'goodsCategory',
		props: {
			dataList: {
				type: Array,
				default () {
					return [];
				}
			},
			vs: {
				type: Number,
				default: 0
			}

		},
		data() {
			return {
				acitve: 0,
				hig: '',
			};
		},
		computed: {},
		created() {},
		onReady() {},
		mounted() {
			this.getSystemIngo()
		},
		methods: {
			getSystemIngo() {
				let that = this;

				let num = 0;
				uni.getSystemInfo({
					success: function(res) {
						// console.log(res);
						// console.log(res.pixelRatio);
						// console.log(res.windowWidth);
						// console.log(res.windowHeight);
						// console.log(res.language);
						// console.log(res.version);
						// console.log(res.platform);
						// num = res.windowHeight;
						that.$u.getRect('.goodsCategory', true).then(rect => {
							that.hig = (res.screenHeight - rect[0].top - res.statusBarHeight) * 2;
							// console.log(that.hig);
							// that.hig = 
						});
						// that.hig = res.windowHeight*2
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
				background-color: #C8C7CC;
				overflow-y: scroll;

				.nav {
					width: 100%;
					height: 90rpx;
					text-align: center;
					line-height: 90rpx;

					// display: flex;
					// justify-content: center;
					// align-items: center;
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
