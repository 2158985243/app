<template>
	<view class="signIn">
		<view class="sig_nav">
			<text v-for="(item,index) in nav_list" :class="active >= index? 'active':'nav_child'" :key=" index">{{item}}&nbsp;&nbsp;&nbsp;></text>
		</view>
		<view class="sig_form">
			<view class="verify" v-show="active==0">
				<u-form :model="form" ref="uForm">
					<u-form-item label-width="100" label="手机号">
						<u-input type="number" :clearable=false placeholder='请输入手机号码' v-model="form.mobile"></u-input>
					</u-form-item>
					<u-form-item label-width="100" label="密码">
						<u-input type="password" :clearable=false placeholder='请输入密码' v-model="form.password" />
					</u-form-item>
					<u-form-item label-width="100" label="验证码">
						<u-input type='number' :clearable=false placeholder='请输入验证码' v-model="form.code"></u-input>
						<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
						<u-button @tap="getCode">{{tips}}</u-button>
					</u-form-item>
				</u-form>
			</view>
			<view class="information" v-show="active==1">
				<u-form :model="form" ref="uForm">
					<u-form-item label-width="160" label="公司名称">
						<u-input :clearable=false placeholder='请输入公司名称(必填)' v-model="form.name"></u-input>
					</u-form-item>

					<u-form-item label-width="160" label="联系人">
						<u-input :clearable=false placeholder='请输入联系人' v-model="form.contact" />
					</u-form-item>
					<u-form-item label-width="160" label="省市区">
						<uni-list>
							<uni-list-item :title='tit' :showArrow="true">
							</uni-list-item>
							<u-picker mode="region" v-model="show" :default-region='defaultres' @cancel='countermand' @confirm="sele"
							 :params="params"></u-picker>
						</uni-list>
						<view class="posio" @click="clickssq">
							<text>
								{{region}}
							</text>
						</view>

					</u-form-item>

					<u-form-item label-width="160" label="地址">
						<u-input :clearable=false placeholder='请输入详细地址' v-model="form.address"></u-input>
					</u-form-item>
				</u-form>
			</view>
			<view class="succeed" v-show="active==2">
				<text class="tit">注册成功</text>

				<text>恭喜！您已成功注册，请牢记您的登陆信息：</text>
				<view class="cont">
					<text>商家代码：{{this.resaccount.mobile}}</text>
					<text>登录用户：{{this.resaccount.account}}</text>
					<text>登录密码：{{this.resaccount.password}}</text>
				</view>
				<text>更多功能静候您的体验，感谢您的支持！</text>
			</view>
		</view>
		<view class="sig_next">
			<view class="ver_next" v-show="active==0">
				<u-button size="medium" @click="nextInf" class="next" type="primary">下一步</u-button>
				<u-checkbox-group>
					<u-checkbox v-model="checked" shape="square">已经订阅并同意</u-checkbox><text class="sty">《西所用户协议》</text>
				</u-checkbox-group>
			</view>
			<view class="inf_next" v-show="active==1">
				<u-button size="medium" @click="nextInf(0)" class="next" type="primary">下一步</u-button>
			</view>
			<view class="succ_next" v-show="active==2">
				<u-button size="medium" @click="login()" class="next" type="primary">立即登录</u-button>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {
		register
	} from '@/api/login.js';
	export default {

		data() {
			return {
				nav_list: ['手机验证', '信息完善', '注册成功'],
				active: 0,
				form: {
					name: '',
					password: '',
					mobile: '',
					contact: '',
					province: 0,
					city: 0,
					area: 0
				},
				tips: '',
				// refCode: null,
				seconds: 60,
				checked: false,
				params: {
					province: true,
					city: true,
					area: true
				},
				show: false,
				val: {
					area: {
						label: '',
						value: ''
					},
					city: {
						label: '',
						value: ''
					},
					province: {
						label: '',
						value: ''
					}
				},
				tit: '请选择省市区',
				region: '',
				defaultres: ["广东省", "广州市", "番禺区"],
				resaccount: {}
			}
		},
		methods: {
			login() {
				uni.reLaunch({
					url: '/pages/user/login'
				})
			},
			async nextInf(index) {
				if (index == 0) { //信息完善表单
					let res = await register(this.form)
					this.resaccount = res;
					console.log(res);
					if (res.errMsg) {
						this.$refs.uToast.show({
							title: '请检查网络故障!',
							type: 'default',
							position: 'bottom'
						})
					} else if (res.code == 1) {
						if (res.msg == '请输入手机号码' || res.msg == '手机号已注册' || res.msg == '请输入不含中文的长度6-20位的密码' || res.msg == '手机号格式不正确') {
							this.active = 0
						}
					} else {
						this.active++;
						uni.setStorageSync('userLoginInfo', {
							member_mobile: res.mobile,
							password: res.password,
							account: res.account,
							checked: false
						})
					}
				} else { //手机验证表单
					if (this.checked) {
						this.active++;

					} else {
						// this.$u.toast('请先阅读用户协议，同意后勾选并进行注册！')
						this.$refs.uToast.show({
							title: '请先阅读用户协议，同意后勾选并进行注册!',
							type: 'default',
							position: 'bottom'
						})
					}
				}

			},
			/*** 验证码 ***/
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			/*** 验证码 ***/
			clickssq() {
				this.show = true;
				console.log(1);
			},
			// 取消选择
			countermand(res) {
				// console.log(res);

			},
			// 确定选择地区
			sele(res) {
				console.log(res);
				this.val = res;
				this.tit = ''
				this.region = this.val.province.label + '/' + this.val.city.label + '/' + this.val.area.label;
				this.defaultres = [this.val.province.label, this.val.city.label, this.val.area.label];
				this.form.province = res.province.value;
				this.form.city = res.city.value;
				this.form.area = res.area.value
				console.log(this.arr);
			}
		},
		onLoad() {
			// console.log(this.params);

		},

	}
</script>

<style lang="scss" scoped>
	.signIn {
		width: 100vw;
		height: 100vh;
		background-color: #f2f2f2;

		// 尾部
		.sig_next {
			padding: 0 20rpx;
			margin-top: 140rpx;

			.ver_next {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				.next {
					width: 400rpx;
					margin-bottom: 20rpx;
				}

				/deep/.u-checkbox__label {
					margin-right: 0px;
				}

				.sty {
					color: #007AFF;
					line-height: 54rpx;
				}
			}

			.inf_next {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				.next {
					width: 400rpx;
					margin-bottom: 20rpx;
				}
			}

			.succ_next {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				.next {
					width: 400rpx;
					margin-bottom: 20rpx;
				}
			}
		}

		// 中部
		.sig_form {
			padding: 0 40rpx;
			background-color: #FFFFFF;

			.verify {
				/deep/.u-btn--default {
					color: #FFFFFF;
					background-color: #1c7ed2;
				}
			}

			.information {
				/deep/.uni-list--border-top {
					background-color: #FFFFFF !important;
				}

				/deep/.uni-list--border-bottom {
					background-color: #FFFFFF !important;
				}

				/deep/.uni-list {
					width: 100%;
				}

				/deep/.uni-list-item__container {
					padding: 0;
				}

				/deep/.uni-list-item__content-title {
					span {
						color: rgb(192, 196, 204);
					}
				}

				.posio {
					position: absolute;
					width: 100%;
					height: 100%;
					line-height: 90rpx;
					background-color: rgba(192, 196, 204, 0);
				}
			}

			.succeed {
				width: 100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				padding: 40rpx 0;

				text {
					margin-bottom: 20rpx;
				}

				.cont {
					width: 100%;
					display: flex;
					justify-content: center;
					flex-direction: column;
					text-indent: 1em;
					;
				}

				.tit {
					text-align: center;
					font-size: 40rpx;
					color: #007AFF;
					padding-bottom: 40rpx;
				}
			}
		}

		// 头部nav
		.sig_nav {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 20rpx;
			background-color: #FFFFFF;

			.nav_child {
				flex: 1;
				text-align: center;
				margin: 10rpx 0;
				font-size: 28rpx;
				color: #666666;
			}

			.active {
				flex: 1;
				text-align: center;
				margin: 10rpx 0;
				font-size: 28rpx;
				color: #2979ff;
			}

		}
	}
</style>
