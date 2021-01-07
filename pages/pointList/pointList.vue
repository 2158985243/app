<template>
	<view class="pointList">
		<u-navbar back-icon-color='#ffffff' title="积分设置" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="plus" @click="toPointAdd" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<view class="list">
			<view class="box">

				<text class="title">系统内置积分设置</text>
				<view class="item-list" v-for="(itemDefult,indexDefult) in default_list" :key="indexDefult" @click="toPointEdit(itemDefult)">
					<view class="left">
						<u-icon name="red-packet" color="#00aaff" class="right_icon" size="46"></u-icon>
						<view class="bod">
							<text class="heise">{{itemDefult.money}}元 = {{itemDefult.point}}积分</text>
							<text>赔率 = {{itemDefult.point}}</text>
						</view>
						<view class="moren" v-if="itemDefult.default==1">
							默认倍率
						</view>
					</view>
					<view class="right">
						<u-icon name="arrow-right" color="#cccccc" size="36"></u-icon>
					</view>
				</view>
			</view>
			<view class="box">
				<text class="title">用户自定义积分设置</text>
				<view class="item-list" v-for="(itemCustom,indexCustom) in custom_list" :key="indexCustom" @click="toPointEdit(itemCustom)">
					<view class="left">
						<u-icon name="red-packet" color="#00aaff" class="right_icon" size="46"></u-icon>
						<view class="bod">
							<text class="heise">{{itemCustom.money}}元 = {{itemCustom.point}}积分</text>
							<text>赔率 = {{itemCustom.point}}</text>
						</view>
						<view class="moren" v-if="itemCustom.default==1">
							默认倍率
						</view>
					</view>
					<view class="right">
						<u-icon name="arrow-right" color="#cccccc" size="36"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		pointList
	} from '../../api/point.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				default_list: [],
				custom_list: []
			}
		},
		methods: {
			async init() {
				let res = await pointList()
				this.default_list = res.system;
				this.custom_list = res.user;
			},
			// 前往新增积分
			toPointAdd() {
				uni.navigateTo({
					url: '/pages/pointAdd/pointAdd'
				})
			},
			toPointEdit(item) {
				uni.navigateTo({
					url: '/pages/pointEdit/pointEdit?item=' + encodeURIComponent(JSON.stringify(item))
				})
			}
		},
		onLoad() {

		},
		onShow() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.pointList {
		width: 100%;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 30rpx;
		}

		.list {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.title {
				padding: 20rpx;
				border-bottom: 0.01rem solid #E5E5E5;
			}

			.box {
				width: 100%;
				display: flex;
				flex-direction: column;
			}

			.item-list {
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;
				.left {
					display: flex;
					flex-direction: row;

					.moren {
						display: flex;
						align-items: center;
						padding: 10rpx;
						height: 40rpx;
						background-color: #007AFF;
						color: #FFFFFF;
						border-radius: 6rpx;
						font-size: 20rpx;
						margin-left: 20rpx;
					}

					.bod {
						display: flex;
						flex-direction: column;

						text {
							font-size: 24rpx;
							color: #C8C7CC;
						}

						.heise {
							// font-weight: 600;
							color: #000000;
							padding-bottom: 6rpx;
						}

					}
				}

				.right {
					display: flex;
					justify-content: center;
				}
			}
		}
	}
</style>
