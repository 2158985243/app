<template>
	<view class="information">
		<view class="status_bar">
		</view>
		<view class="box">
			<uni-list>
				<uni-list-item showArrow='true' :clickable='true'>
					<!-- 自定义 header -->
					<view slot="header" class="slot-box">
						商家头像
					</view>
					<template slot="footer">
						<u-image width="80rpx" height="80rpx" :src="src|filterImage"></u-image>
					</template>
				</uni-list-item>
				<uni-list-item title="商家名称" :showArrow='true' :clickable='true' rightText='熊出没'></uni-list-item>
				<uni-list-item title="所属行业" :showArrow='true' :clickable='true' rightText='服装行业'></uni-list-item>
			</uni-list>
		</view>
		
		<view class="box">
			<uni-list>
				<uni-list-item title="联系人" :showArrow='true' :clickable='true' rightText='小陈'></uni-list-item>
				<uni-list-item title="联系电话" :showArrow='true' :clickable='true' rightText='15776670632'></uni-list-item>
				<uni-list-item title="联系地址" :showArrow='true' :clickable='true' rightText='广州'></uni-list-item>
			</uni-list>
		</view>
		
		<view class="box">
			<uni-list>
				<uni-list-item title="登录店铺" :showArrow='true' :clickable='true' rightText='总店'></uni-list-item>
				<uni-list-item title="有效日期" :showArrow='true' :clickable='true' rightText='2020-10-10'></uni-list-item>
			</uni-list>
		</view>
		<view class="box">
			<uni-list>
				<uni-list-item title="短信签名" :showArrow='true' :clickable='true' rightText='小陈啊'></uni-list-item>
				<uni-list-item title="剩余短信" :showArrow='true' :clickable='true' rightText='50'></uni-list-item>
			</uni-list>
		</view>

	</view>
</template>

<script>
	import url from '../../api/configuration.js'
	export default {
		data() {
			return {
				src: '',
				member_name: '',
				store_name: ''
			}
		},
		filters: {
			filterImage(v) {
				console.log(v);
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
			init() {
				try {
					const userLoginInfo = uni.getStorageSync('userLoginInfo');
					const userMessage = uni.getStorageSync('userMessage');
					if (userLoginInfo) {

					}
					if (userMessage) {
						this.src = userMessage.member_headimg
						this.member_name = userMessage.member_name
						this.store_name = userMessage.store_name
					}
					console.log(this.src);
				} catch (e) {
					// error
				}
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.information {
		background-color: #F8F8F8;

		/deep/.uni-list-item__container {
			display: flex;

			.slot-box {
				flex: 1;
				display: flex;
				font-size: 28rpx;
				// justify-content: center;
				align-items: center;
			}
		}

		.box {
			margin-bottom: 10rpx;
		}
	}
</style>
