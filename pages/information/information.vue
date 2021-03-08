<template>
	<view class="information">
		<view class="status_bar">
		</view>
		<view class="box">
			<view class="box-item">
				<view class="left">
					<text>商家头像</text>
				</view>
				<view class="right">
				<!-- $cfg.domain + -->
					<u-image width="80rpx" height="80rpx" :src="form.headimg|filterImage"></u-image>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<view class="box-item" @click="clickItem(0)">
				<view class="left">
					<text>商家名称</text>
				</view>
				<view class="right">
					<text>{{form.name}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<view class="box-item" @click="clickItem(1)">
				<view class="left">
					<text>所属行业</text>
				</view>
				<view class="right">
					<text>{{form.industry}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>

		</view>

		<view class="box">
			<view class="box-item" @click="clickItem(2)">
				<view class="left">
					<text>联系人</text>
				</view>
				<view class="right">
					<text>{{form.contact}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<view class="box-item" @click="clickItem(3)">
				<view class="left">
					<text>联系电话</text>
				</view>
				<view class="right">
					<text>{{form.contact_mobile}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<view class="box-item" @click="clickItem(4)">
				<view class="left">
					<text>联系地址</text>
				</view>
				<view class="right">
					<text>{{form.address}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
		</view>

		<view class="box">
			<view class="box-item">
				<view class="left">
					<text>登录店铺</text>
				</view>
				<view class="right">
					<text>{{store_name}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<view class="box-item">
				<view class="left">
					<text>有效日期</text>
				</view>
				<view class="right">
					<text>{{form.e_time}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-item">
				<view class="left">
					<text>短信签名</text>
				</view>
				<view class="right">
					<text>{{form.name}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<view class="box-item">
				<view class="left">
					<text>剩余短信</text>
				</view>
				<view class="right">
					<text>{{0}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="center" width="500rpx" height="300rpx" border-radius="14">
			<view class="pop-item">
				<text class="header-title">{{title_name}}</text>
				<view class="center">
					<u-input placeholder='' input-align='center' :clearable='false' height="60" :border="true" v-model="value" type="text" />
				</view>
				<view class="footer">
					<view class="qx" @click="show = false">
						取消
					</view>
					<view class="qd" @click="sure">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		<view class="btn" @click="submit">
			保存
		</view>
	</view>
</template>

<script>
	import url from '../../api/configuration.js'
	import {
		getInfo,
		editUser
	} from '../../api/user.js'
	export default {
		data() {
			return {
				src: '',
				member_name: '',
				store_name: '',
				limit: ['png', 'jpg', 'jpeg'],
				formData: {
					type: 'user',
					path: 'user'
				},
				fileList: [],
				action: '',
				header: {
					token: ''
				},
				form: {},
				show: false,
				title_name: '',
				value: '',
				index_a: 0
			}
		},
		filters: {
			filterImage(v) {
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
			clickItem(index) {
				this.index_a = index
				this.show = true
				if (index == 0) {
					this.value = this.$u.deepClone(this.form.name)
					this.title_name = '商家名称'
				} else if (index == 1) {
					this.value = this.$u.deepClone(this.form.industry)
					this.title_name = '所属行业'

				} else if (index == 2) {
					this.value = this.$u.deepClone(this.form.contact)
					this.title_name = '联系人'
				} else if (index == 3) {
					this.value = this.$u.deepClone(this.form.contact_mobile)
					this.title_name = '联系电话'
				} else if (index == 4) {
					this.value = this.$u.deepClone(this.form.address)
					this.title_name = '联系地址'
				}
			},
			sure() {
				this.show = false
				if (this.index_a == 0) {
					this.form.name = this.value
				} else if (this.index_a == 1) {
					this.form.industry = this.value
				} else if (this.index_a == 2) {
					this.form.contact = this.value
				} else if (this.index_a == 3) {
					this.form.contact_mobile = this.value
				} else if (this.index_a == 4) {
					this.form.address = this.value
				}
			},
			headerImg() {
				const userMessage = uni.getStorageSync('userMessage');
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: url.baseURL + '/api/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'user',
							header: {
								token: "Bearer " + userMessage.token
							},
							formData: {
								type: 'user',
								path: 'user'
							},
							success: (uploadFileRes) => {
								this.form.headimg = JSON.parse(uploadFileRes.data).data.url
							}
						});
					}
				});
			},
			async init() {
				let res = await getInfo()
				// console.log(res);
				if (!res.code) {
					this.form = res
					this.form.e_time = this.$u.timeFormat(res.expired_at, 'yyyy-mm-dd');
				}
				// try {
				// 	const userLoginInfo = uni.getStorageSync('userLoginInfo');
				// 	if (userLoginInfo) {

				// 	}

				// 	if (userMessage) {
				// 		this.src = userMessage.member_headimg
				// 		this.member_name = userMessage.member_name
				// 		this.store_name = userMessage.store_name
				// 	}
				// } catch (e) {
				// 	// error
				// }
			},
			async submit() {
				let res = await editUser({
					headimg: this.form.headimg,
					name: this.form.name,
					industry: this.form.industry,
					contact: this.form.contact,
					contact_mobile: this.form.contact_mobile,
					address: this.form.address
				})
				if(!res.code){
					uni.navigateBack()
				}
			}
		},
		onLoad() {
			this.init()
			const userMessage = uni.getStorageSync('userMessage');
			this.store_name = userMessage.store_name
		}
	}
</script>

<style lang="scss" scoped>
	.information {
		width: 100%;
		display: flex;
		flex-direction: column;
		min-height: 100%;
		background-color: #F8F8F8;
		align-items: center;

		.pop-item {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.header-title {
				padding: 10rpx 0;
			}

			.center {
				padding: 20rpx 0;

			}

			.footer {
				padding: 10rpx 0;
				width: 80%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.qx {
					width: 160rpx;
					height: 60rpx;
					border: 1rpx solid #E5E5E5;
					border-radius: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.qd {
					width: 160rpx;
					height: 60rpx;
					border: 1rpx solid #E5E5E5;
					border-radius: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #007AFF;
					color: #FFFFFF;
				}
			}
		}

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
			width: 100%;
			margin-bottom: 10rpx;
			display: flex;
			flex-direction: column;

			.box-item {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				background-color: #FFFFFF;
				padding: 20rpx;
				border-bottom: 0.01rem solid #F5F5F5;

				.left {
					display: flex;
					justify-content: center;
					align-items: center;

				}

				.right {
					display: flex;
					flex-direction: row;

				}
			}
		}

		.btn {
			width: 80%;
			background-color: #007AFF;
			color: #FFFFFF;
			border-radius: 12rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 40rpx;
			height: 80rpx;
		}
	}
</style>
