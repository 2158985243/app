<template>
	<view class="login">
		<view class="status_bar">
		</view>
		<view class="tonten">

			<view class="from_login">
				<view class="login_c">
					<u-form :model="form" ref="uForm">
						<u-form-item left-icon='phone' :left-icon-style='color'>
							<u-input :type="'number'" :custom-style='custom' :clearable=false placeholder='请输入注册手机'
								v-model="form.member_mobile"></u-input>
						</u-form-item>
						<u-form-item left-icon='account' :left-icon-style='color'>
							<u-input placeholder='请输入用户账号\boss' :custom-style='custom' :clearable=false
								v-model="form.account"></u-input>
						</u-form-item>
						<u-form-item left-icon='lock' :left-icon-style='color'>
							<u-input :type='"password"' :custom-style='custom' maxlength='11' :clearable=false
								placeholder='请输入密码' v-model="form.password" />
						</u-form-item>
					</u-form>
					<view class="btn">
						<u-button class='btn1' type="primary" @click="register">登录</u-button>
						<view class='btn2' @click="enroll">注册试用</view>
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
			<!-- 编辑分类-->
			<u-popup v-model="showedit" class="pop" mode="center" width="80%">
				<text class="tit">选择门店</text>
				<view class="box">
					<scroll-view scroll-y="true" class="scroll-Y">
						<u-radio-group v-model="value" :wrap="true">
							<u-radio shape="square" @change="radioGroupChange($event,item)"
								v-for="(item, index) in stores" :key="index" :name="item.name">
								<view class="scroll-radio-z">

									<text>{{item.name}}</text>
									<!--  -->
									<text class="stale" v-if="item.is_valid==0">已过期</text>
								</view>
							</u-radio>
						</u-radio-group>
					</scroll-view>
				</view>
				<view class="btds">
					<view class="btn" @click="abrogate" >
						取消
					</view>
					<view class="btn btn-border-left" @click='ensure'>
						确定
					</view>
				</view>
			</u-popup>
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
				showedit: false,
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
					member_mobile: '',
					password: '',
					account: 'admin'
				},
				stores: [],
				value: '',
				is_valid: 0,
				storedata: {}
			}
		},
		methods: {
			radioGroupChange(v, item) {
				this.form.store_id = item.store_id;
				this.is_valid = item.is_valid;
				this.storedata = item;
				// console.log(this.form.store_id);
			},
			// 取消
			abrogate() {
				this.showedit = false;
			},
			// 确定
			async ensure() {
				// if (!this.is_valid) {
				// 	this.$refs.uToast.show({
				// 		title: '选择门店已过期'
				// 	})
				// } else {
				let res = await login(this.form)
				if (!res.code) {
					let datas = this.form;
					datas.checked = this.checked;
					this.storedata = res
					this.storedata['name'] = res.store_name
					// this.storedata['store_id'] = res.store_id
					this.storedata['storesArr'] = this.stores
					this.$store.commit('loginStatusAction', {
						token: res.token
					});
					this.$store.commit('storeFn', {
						store: this.storedata
					});
					this.$store.commit('authorityFn', {
						authority: res.authority
					});

					uni.setStorageSync('userLoginInfo', datas);
					uni.setStorageSync('userMessage', res);
					uni.switchTab({
						url: `/pages/home/home`,
						fail(e) {
							console.log(e);
						}
					})
				}
				// }
				this.showedit = false;
			},
			// 登陆
			async register() {
				if(this.form.member_mobile == ""){
					this.$refs.uToast.show({
						title: '请输入注册手机号码',
						type: 'default',
						position: 'bottom'
					})
				}else if(this.form.account == ""){
					this.$refs.uToast.show({
						title: '请输入用户账号或admin',
						type: 'default',
						position: 'bottom'
					})
				}else if(this.form.password == ""){
					this.$refs.uToast.show({
						title: '请输入密码',
						type: 'default',
						position: 'bottom'
					})
				}else{
					
					this.form.store_id = ''
					let res = await login(this.form)
					if (res.code == 2) {
						this.stores = res.data.store;
						this.form.store_id = res.data.store[0].store_id;
						this.is_valid = res.data.store[0].is_valid;
						this.value = res.data.store[0].name
						this.showedit = true;
					}
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
						this.checked = userLoginInfo.checked;
						if (this.checked) {
							this.form = userLoginInfo;
							this.register()
						}
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

		/deep/.uni-scroll-view-content {
			height: 800rpx;
		}


		.pop {
			display: flex;
			flex-direction: column;

			.tit {
				display: block;
				font-size: 30rpx;
				height: 80rpx;
				line-height: 80rpx;
				padding-left: 40rpx;
			}

			.btds {
				width: 100%;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-top: 1rpx solid #808080;
				.btn{
					flex: 1;
					height: 80rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.btn-border-left{
					border-left: 1rpx solid #808080;
				}
			}

			.box {
				width: 100%;
				padding: 0 40rpx;
				height: 640rpx;
				display: flex;
				// overflow: hidden;
				overflow-y: scroll;
				/deep/.u-radio-group {
					width: 100%;
				}
				.scroll-radio-z{
					width: 450rpx;
					display: flex;
					justify-content: space-between;
				}
				/deep/.u-radio {
					width: 100%;
					height: 80rpx;
					border-bottom: 0.01rem solid #C8C7CC !important;
					justify-content: space-between;
					/deep/.u-radio__label {
						width: 100%;
						color: #0064cf;
					}
				}



				.stale {
					// float: right;
					color: #DD524D;
				}
			}
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
						height: 80rpx;
					}

					.btn2 {
						width: 33vw;
						height: 80rpx;
						color: #007AFF;
						border: 1rpx solid #2979ff;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 16rpx;
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
