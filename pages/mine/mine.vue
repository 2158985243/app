<template>
	<view class="mine">
		<view class="status_bar">
		</view>
		<view class="text-area">
			<text class="title">boss</text>
			<view class="photo" @click="toInformation">
				<u-avatar class='left1' :src="src|filterImage" mode="square"></u-avatar>
				<view class="context">
					<text>{{member_name}}</text>
					<text>{{store_name}}</text>
				</view>
				<view class="rit">
					<u-icon name="arrow-right" color="#ffffff" size="36"></u-icon>
				</view>
			</view>
			<view class="product">
				<u-swiper height='226' :list="list"></u-swiper>
				<view class="presentation">
					<u-icon name="question-circle" class='icon_q' color="#000000" size="40"></u-icon>
					<text>产品介绍</text>
				</view>
			</view>
			<view class="product">
				<view class="presentation" @click="toBusinessSetUp">
					<u-icon name="setting" class='icon_q'   color="#000000" size="40"></u-icon>
					<text>营业设置</text>
				</view>
				<view class="presentation" @click="toChangePassPword">
					<u-icon name="lock" class='icon_q' color="#000000" size="40"></u-icon>
					<text>修改密码</text>
				</view>
			</view>
			<view class="product">
				<view class="presentation">
					<u-icon name="email" class='icon_q' color="#000000" size="40"></u-icon>
					<text>意见反馈</text>
				</view>
				<view class="presentation">
					<u-icon name="info" class='icon_q' color="#000000" size="40"></u-icon>
					<text>关于我们</text>
				</view>
			</view>
			<view class="product">
				<view class="presentation" @click="logout">
					<u-icon name="minus-circle" class='icon_q' color="#000000" size="40"></u-icon>
					<text>退出登录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getInfo,
		editUser
	} from '../../api/user.js'
	import url from '../../api/configuration.js'
	import {logout} from '../../api/mine.js'
	export default {
		data() {
			return {
				src: '',
				member_name: '',
				store_name: '',
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		filters: {
			filterImage(v) {
				console.log(url.domain +v);
				if (!v) {
					return v;
				}
				if (!/^http/.test((v))) {
					return url.domain + v;
				}
				return v;
			}
		},
		methods: {
			// 退出登录
			async logout(){
				uni.showModal({
					title: '提示',
					content: '是否清空登录信息？',
					success: async (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							let res = await logout()
							if (!res.code) {
								uni.navigateTo({
									url: '/pages/user/login'
								})
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 前往账户信息
			toInformation(){
				uni.navigateTo({
					url: `/pages/information/information`
				})
			},
			// 前往营业设置
			toBusinessSetUp(){
				uni.navigateTo({
					url: `/pages/businessSetUp/businessSetUp`
				})
			},
			// 前往修改密码
			toChangePassPword(){
				uni.navigateTo({
					url: `/pages/changePassPword/changePassPword`
				})
			},
			async init() {
				let res = await getInfo()
				this.src = res.headimg
				this.member_name = res.name
				const userMessage = uni.getStorageSync('userMessage');
				this.store_name = userMessage.store_name
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.mine {
		height: 100%;
		background-color: #f2f2f2;

		.text-area {
			.title {
				display: block;
				width: 100vw;
				height: 60rpx;
				line-height: 60rpx;
				color: #FFFFFF;
				background-color: #2979ff;
				text-align: center;
			}

			.product {
				margin-bottom: 20rpx;

				.presentation {
					background-color: #FFFFFF;
					height: 90rpx;
					line-height: 90rpx;
					margin-bottom: 2rpx;
					padding: 0 10rpx;

					.icon_q {
						padding: 0 10rpx;
					}
				}
			}

			.photo {
				padding: 0 20rpx;
				height: 140rpx;
				// line-height: 140rpx;
				background-color: #2979ff;

				.left1 {
					// line-height: 120rpx;
					margin-top: 20rpx;
					float: left;
				}

				.context {
					float: left;
					margin-top: 20rpx;
					margin-left: 10rpx;
					display: flex;
					flex-direction: column;
					color: #FFFFFF;
				}

				.rit {
					float: right;
					line-height: 120rpx;
					font-size: 40rpx;
					color: #FFFFFF;
				}

			}

		}
	}
</style>
