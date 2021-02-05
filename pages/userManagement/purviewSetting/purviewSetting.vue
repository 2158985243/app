<template>
	<view class="purviewSetting">
		<view class="box">
			<view class="left">
				<view class="left-item" v-for="(item,index) in list" :key="index" @click="leftClick(index)" :class="acitve==index? 'acitve':'' ">
					<text>{{item.name}}</text>
					<text class="tit" v-show="item.number>0">{{item,index | countQuantity}}</text>

				</view>
			</view>
			<view class="right" v-if="list[acitve]">
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="right-box">

						<view class="right-item" v-for="(item,index) in list[acitve].children" @click="rightClick(item,index)">
							<view class="icons">
								<u-icon name="checkmark-circle-fill" v-if="item.checked" class="to-log" color="#ff5500" size="30"></u-icon>
								<u-icon name="file-text" color="#aa5500" size="50"></u-icon>
							</view>
							<text>{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<!--  -->
		<view class="btn">
			<view class="li">
				<view class="left" @click="checkAll">
					全选
				</view>
				<view class="r" @click="sure">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		authorityList
	} from '../../../api/user.js'
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				acitve: 0,
				list: [],

			}
		},
		filters: {
			countQuantity(arr, index) {
				let num = 0;
				arr.children.map((v) => {
					if (v.checked) {
						num++
					}
				})
				arr.number = num
				return num
			}
		},
		methods: {
			async init() {
				let res = await authorityList()
				res.map(v => {
					v['number'] = 0;
					v.children.map(v1 => {
						v1['checked'] = false
					})
				});
				if (store.state.purview.length > 0) {
					res.map(v => {
						v.children.map((v2) => {
							store.state.purview.map(v1 => {
								if (v2.id == v1.authority_id) {
									v2.checked = true;
								}
							})
						})

					})
				}
				if (!res.code) {
					this.list = res
				}
			},
			//点击左边
			leftClick(index) {
				this.acitve = index;
			},
			// 点击右边
			rightClick(item, index) {
				this.list[this.acitve].children[index].checked = !this.list[this.acitve].children[index].checked;
			},
			// 当前全选
			checkAll() {
				this.list[this.acitve].children.map(v => {
					v.checked = true;
				})
			},
			// 确定
			sure() {
				let authority = []
				this.list.map((v) => {
					v.children.map(v1 => {
						if (v1.checked) {
							authority.push({
								authority_id: v1.id,
								checked: 1
							})
						}
					})
				})
				this.$store.commit('purviewFn', {
					purview: authority
				});
				uni.navigateBack()
			}
		},
		onLoad() {
			this.init()
		},
		onShow() {

		}

	}
</script>

<style scoped lang="scss">
	.purviewSetting {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.box {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: row;
			margin-bottom: 120rpx;

			.left {
				width: 25%;
				height: 100%;
				background-color: #ecebf0;
				display: flex;
				flex-direction: column;

				.left-item {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 20rpx;
					position: relative;

					.tit {
						border-radius: 50%;
						width: 40rpx;
						height: 40rpx;
						background-color: #FF5A5F;
						font-size: 20rpx;
						color: #FFFFFF;
						position: absolute;
						top: 0;
						right: 0;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}

				.acitve {
					background-color: #FFFFFF;
				}
			}

			.right {
				width: 75%;
				height: 100%;
				background-color: #FFFFFF;
				display: flex;
				flex-direction: column;

				.scroll-Y {
					width: 100%;
					height: 100%;
					display: flex;
				}

				.right-box {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
				}

				.right-item {
					width: 33.3%;
					height: 140rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.icons {
						margin-bottom: 10rpx;
						position: relative;
						.to-log{
							position: absolute;
							top: -10rpx;
							right: -20rpx;
						}
					}

					text {
						font-size: 24rpx;
					}
				}
			}
		}



		.btn {
			width: 100%;
			height: 120rpx;
			border-top: 0.01rem solid #E5E5E5;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			bottom: 0;
			background-color: #FFFFFF;
			z-index: 999;

			.li {
				width: 80%;
				height: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: row;
				border-radius: 30rpx;
				background-color: #007AFF;
				color: #FFFFFF;

				.left {
					flex: 1;
					height: 80%;
					border-right: 1rpx solid #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.r {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>
