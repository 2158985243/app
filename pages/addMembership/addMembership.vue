<template>
	<view class="addMembership">
		<view class="nav">
			<view class="list">
				<view class="nav-list" v-for="(item,index) in list" :key="index" @click="itemClick(index)" :class="index==active? 'active':''">
					{{item}}
				</view>
			</view>
		</view>
		<view class="mains" v-show="active==0">
			<view class="box ">
				<view class="form_item">
					<text>姓名</text>
					<u-input placeholder='请输入会员姓名' v-model="form.name" type="text" />
				</view>
				<view class="form_item">
					<text>电话</text>
					<u-input placeholder='请输入会员手机号码' maxlength='11' v-model="form.mobile" type="number" />
				</view>
				<view class="form_item">
					<text>卡号</text>
					<u-input placeholder='可以直接使用手机号码' v-model="form.number" type="number" />
				</view>
				<view class="form_item">
					<text>等级</text>
					<u-input placeholder='请选择会员等级' :disabled='true' @tap="toCustomerLevel" v-model="customer" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<view class="box ">
				<view class="form_item">
					<text>性别</text>
					<u-radio-group v-model="gender_value" @change="radioGroupChange">
						<u-radio v-for="(item, index) in genders" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>

				</view>
				<view class="form_item">
					<text>日期</text>
					<u-input placeholder='请选择时间' @tap="hiddenTime" :disabled='true' v-model="form.birthday" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<u-picker mode="time" v-model="showtime" @confirm="confirmTime" :params="params"></u-picker>
				<view class="form_item">
					<text>密码</text>
					<u-input placeholder='请输入六位数字密码' class="hidden" maxlength='6' :clearable='false' v-model="form.password" type="number" />
					<u-input placeholder='请输入六位数字密码' maxlength='6' :password-icon="false" :clearable='false' v-model="form.password"
					 type="password" />
				</view>
				<u-keyboard ref="uKeyboard" mode="number" @change="valChange" @backspace="backspace" v-model="show"></u-keyboard>
				<view class="form_item">
					<text>有效期至</text>
					<u-input placeholder='请选择有效时间' @tap="hiddenTime1" :disabled='true' v-model="form.expire_at" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<u-picker mode="time" v-model="showtime1" @confirm="confirmTime1" :params="params"></u-picker>
			</view>
			<view class="box">
				<view class="form_item">
					<text>标签</text>
					<u-input placeholder='请输入标签' v-model="form.tag" type="text" />
					<u-icon name="arrow-right" class="man_r" color="#cccccc" size="28"></u-icon>
				</view>
				<view class="form_item">
					<text>地址</text>
					<u-input placeholder='请输入地址' v-model="form.address" type="text" />
				</view>
				<view class="form_item">
					<text>备注</text>
					<u-input placeholder='请输入备注' v-model="form.remarks" type="text" />
				</view>
				<view class="form_images">
					<text>上传图片</text>
					<view class="img">
						<u-upload width="120" height='120' upload-text='' :limitType='limit' image-mode='aspectFit' :action="action+'/api/upload'"
						 :header="header" :name="formData.type" :form-data="formData" @on-success="onSuccess" :file-list="fileList"
						 :auto-upload="true" :max-size="5 * 1024 * 1024" max-count="1" :show-progress="false" @on-error='onError'
						 del-bg-color='#000000'>
						</u-upload>
					</view>
				</view>
			</view>

		</view>
		<view class="btn" @click="sure" v-show="active==0">
			保存
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		customerAdd
	} from '../../api/customer.js'
	import urls from '../../api/configuration.js'
	export default {
		data() {
			return {
				list: ['手工添加', '微信会员'],
				form: {
					name: '',
					mobile: '',
					number: '',
					customer_level_id: '',
					birthday: '',
					gender: 0,
					password: '',
					remarks: '',
					expire_at: '',
					tag: '',
					address: '',
					image: ''
				},
				active: 0,
				customer: '',
				limit: ['png', 'jpg', 'jpeg'],
				fileList: [],
				action: '',
				genders: [{
					name: '男'
				}, {
					name: '女'
				}],
				gender_value: '男',
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				formData: {
					type: 'customer',
					path: 'customer'
				},
				header: {
					token: ''

				},
				show: false,
				showtime: false,
				showtime1: false,

			}
		},
		methods: {
			// 上传图片成功fnc
			onSuccess(data, index, lists, name) {
				console.log(data, index, lists, name);
				this.form.image = data.data.url
			},
			// 上传图片失败fnc
			onError(res, index, lists, name) {
				console.log(res, index, lists, name);
			},
			itemClick(index) {
				this.active = index;
			},
			hiddenTime() {
				this.showtime = true;
			},
			hiddenTime1() {
				this.showtime1 = true;
			},
			// 选择时间(生日)
			confirmTime(v) {
				this.form.birthday = `${v.year}-${v.month}-${v.day}`;
			},
			// 选择时间(到期)
			confirmTime1(v) {
				this.form.expire_at = `${v.year}-${v.month}-${v.day}`;
			},
			// 选择性别
			radioGroupChange(e) {
				console.log(e);
				if (e == '男') {
					this.form.gender = 0;
				} else {
					this.form.gender = 1;
				}
			},
			// 前往会员等级
			toCustomerLevel() {
				uni.navigateTo({
					url: `/pages/customerLevel/customerLevel?iq=1`
				})
			},
			// 提交
			async sure() {

				if (this.form.name == '') {
					this.$refs.uToast.show({
						title: '请输入姓名'
					})
				} else if (this.form.mobile == '') {
					this.$refs.uToast.show({
						title: '请输入手机号码'
					})
				} else if (!(/^[1]([3-9])[0-9]{9}$/.test(this.form.mobile))) {
					this.$refs.uToast.show({
						title: '请输入正确的手机号码'
					})
				} else if (this.password) {
					if (!(/^\d+$/.test(this.password))) {
						this.$refs.uToast.show({
							title: '请输入数字类型的密码'
						})
					}
				} else {
					let res = await customerAdd(this.form)
					if (!res.code) {
						uni.navigateTo({
							url: `/pages/memberManagement/memberManagement`
						})
					}
				}

			}

		},
		onLoad() {
			const userMessage = uni.getStorageSync('userMessage');
			this.header.token = "Bearer " + userMessage.token

			this.action = urls.baseURL;
			uni.$on('customerLevel', (res) => {
				if (res) {
					this.customer = res.name;
					this.form.customer_level_id = res.id;
					// console.log(res);
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.addMembership {
		width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: #F1F1F1;

		.active {
			color: #FFFFFF;
			background-color: #80b4ff;
		}

		.btn {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
			background-color: #2979ff;
			position: fixed;
			bottom: 0;
			height: 80rpx;
		}

		.nav {
			width: 100%;
			display: flex;
			align-items: center;
			height: 100rpx;
			position: fixed;
			top: 0;
			background-color: #2979ff;
			z-index: 99;

			.list {
				width: 100%;
				display: flex;
				flex-direction: row;
				height: 60rpx;
				border-radius: 14rpx;
				border: 2rpx solid #80b4ff;
				margin: 0 20rpx;
				overflow: hidden;

				.nav-list {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #FFFFFF;
					padding: 20rpx 0;
					color: #e7e7e7;
				}
			}
		}

		.mains {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin: 100rpx 0 80rpx 0;

			.box {
				width: 100%;
				margin-bottom: 20rpx;

				.form_images {
					padding-right: 20rpx;
					display: flex;
					flex-direction: row;
					align-items: center;

					background-color: #FFFFFF;
					margin-bottom: 2rpx;

					text {
						padding: 0 30rpx 0 20rpx;
					}

					.img {
						display: flex;
						align-items: center;
					}
				}

				.form_item {
					display: flex;
					flex-direction: row;
					align-items: center;
					background-color: #FFFFFF;
					padding-right: 20rpx;
					margin-bottom: 2rpx;
					width: 100%;
					height: 85rpx;
					position: relative;

					// justify-content: space-between;
					.demo {
						display: flex;
						justify-content: row;
					}

					.right {
						position: absolute;
						right: 0;
						text-align: right;
					}

					.hidden {
						width: 100%;
						position: absolute;
						left: 180rpx;
						z-index: 99;
						opacity: 0;
					}

					text {
						width: 180rpx;
						// text-align: left;
						padding-left: 20rpx;
					}


					.min_exchange {
						width: 150rpx;
					}

					.set {
						width: 80rpx;
						color: #2979ff;
					}

					.border_bt {
						border-bottom: 0.01rem solid #e3e3e3;
					}

					.man_r {
						border-left: 0.01rem solid #e3e3e3;
						padding: 28rpx 15rpx 28rpx 30rpx;
						// margin: 0 auto;
					}

				}

				.bottoms {
					margin-bottom: 80rpx;
				}

				.form_item2 {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 20rpx;
					background-color: #FFFFFF;
					height: 85rpx;

					text {
						color: #2979ff;

					}
				}

				.form_item3 {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 2rpx;
					background-color: #FFFFFF;
					height: 85rpx;
					margin-bottom: 70rpx;

					text {
						color: #2979ff;

					}
				}

				.box1 {
					margin-bottom: 20rpx;

					.form_item1 {
						padding-right: 20rpx;
						display: flex;
						align-items: center;
						background-color: #FFFFFF;
						margin-bottom: 2rpx;
						height: 280rpx;

						/deep/.u-add-tips {
							margin-top: 0;
						}

						text {
							width: 180rpx;
							// text-align: left;
							padding-left: 20rpx;
						}

						/deep/.u-delete-icon {
							top: 0;
							right: 0;
							width: 28rpx;
							height: 28rpx;
						}
					}
				}
			}
		}
	}
</style>
