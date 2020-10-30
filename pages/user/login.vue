<template>
	<view class="login">
		<view class="status_bar">
		</view>
		<view class="tonten">

			<view class="from_login">
				<view class="login_c">
					<u-form :model="form" ref="uForm">
						<u-form-item left-icon='phone' :left-icon-style='color'>
							<u-input :type="'number'" :custom-style='custom' :clearable=false placeholder='请输入注册手机' v-model="form.member_mobile"></u-input>
						</u-form-item>
						<u-form-item left-icon='account' :left-icon-style='color'>
							<u-input placeholder='请输入用户账号\boss' :custom-style='custom' :clearable=false v-model="form.account"></u-input>
						</u-form-item>
						<u-form-item left-icon='lock' :left-icon-style='color'>
							<u-input :type='"password"' :custom-style='custom' :clearable=false placeholder='请输入密码' v-model="form.password" />
						</u-form-item>
					</u-form>
					<view class="btn">
						<u-button class='btn1' type="primary" @click="register">登录</u-button>
						<u-button class='btn2' @click="enroll">注册试用</u-button>
					</view>
					<view class="password">
						<u-checkbox-group size='25'>
							<u-checkbox label-size="24" v-model="checked" :disabled="false">记住密码</u-checkbox>
						</u-checkbox-group>
						<text class="font_s">忘记密码？</text>
					</view>
				</view>
			</view>
			<view class="footer">
				<view class="demonstration">
					<u-icon name="share" color="#2979ff" size="40"></u-icon>
					<text>功能演示</text>
				</view>
				<view class="service">
					<u-icon name="server-man" color="#2979ff" size="40"></u-icon>
					<text>联系客服</text>
				</view>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {
		login
	} from '@/api/login.js'
	export default {
		data() {
			return {
				checked: false, 
				custom: {
					'font-color': '#58a3ff'
				},
				color: {
					'color': '#58a3ff',
					'width': '70rpx',
					'display': 'flex',
					'justify-content': 'center',
					'align-items': 'center',
					'font-size': '40rpx'
				},
				form: {
					member_mobile: '15766770632',
					password: '123456', 
					account: 'admin',
					store_id:5
				}

			}
		},
		methods: {
			async register() {
				let res = await login(this.form)
				// console.log(res);
				if (res.code == undefined) {
					let datas = this.form;
					datas.checked = this.checked;
					this.$store.commit('loginStatusAction',{token:res.token});
					uni.setStorageSync('userLoginInfo', datas);
					uni.setStorageSync('userMessage', res);
					uni.switchTab({
						url: `/pages/home/home`,
						fail(e) {
							console.log(e);
						}
					}) 

				}
			},
			enroll: function() {
				uni.navigateTo({
					url: `/pages/signIn/signIn?`
				})
			},
			init: function() {
				try {
					const userLoginInfo = uni.getStorageSync('userLoginInfo');
					if (userLoginInfo) {
						this.form = userLoginInfo;
						this.checked = userLoginInfo.checked;
					}
				} catch (e) {
					// error
				}
			}
		},
		onReady() {},
		onLoad() {
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		width: 100%;

		.tonten {
			width: 100%;
		}

		.from_login {
			width: 100vw;
			height: 77vh;
			display: flex;
			justify-content: center;
			align-items: center;

			// background-color:#f2f2f2 ;
			.login_c {
				width: 88vw;
				border-radius: 20rpx;
				box-shadow: 0 0 6rpx #5e5c5c;
				padding: 30rpx;

				.btn {
					display: flex;
					justify-content: space-between;
					// align-items: center;
					margin-top: 10rpx;

					.btn1 {
						width: 33vw;
						height: 4vh;
					}

					.btn2 {
						width: 33vw;
						height: 4vh;
						color: #007AFF;
					}
				}

				.password {
					padding: 15px 10px 5px;
					display: flex;
					justify-content: space-between;

					/deep/.u-checkbox__label {
						color: #007AFF;
					}

					.font_s {
						font-size: 24rpx;
						color: #007AFF;
					}
				}
			}
		}

		.footer {
			position: fixed;
			width: 80%;
			bottom: 40rpx;
			left: 10%;
			right: 10%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.demonstration {
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				font-size: 20rpx;
				color: #007AFF;
			}

			.service {
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				font-size: 20rpx;
				color: #007AFF;
			}
		}
	}
</style>
