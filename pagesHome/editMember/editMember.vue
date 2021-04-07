<template>
	<view class="editMember">
		<view class="mains">
			<view class="box ">
				<view class="form_item">
					<view class="left">
					<text>姓名</text>
					<u-input placeholder='请输入会员姓名' v-model="form.name" type="text" />
				</view>
				</view>
				<view class="form_item">
					<view class="left">
					<text>电话</text>
					<u-input placeholder='请输入会员手机号码' maxlength='11' v-model="form.mobile" type="number" />
				</view>
				</view>
				<view class="form_item">
					<view class="left">
					<text>卡号</text>
					<u-input placeholder='可以直接使用手机号码' v-model="form.number" type="number" />
				</view>
				</view>
				<view class="form_item">
					<view class="left">
					<text>等级</text>
					<u-input placeholder='请选择会员等级' :disabled='true' @click="toCustomerLevel" v-model="customer" type="text" />
				</view>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<view class="box ">
				<view class="form_item">
					<view class="left">
					<text>性别</text>
					<u-radio-group v-model="gender_value" @change="radioGroupChange">
						<u-radio v-for="(item, index) in genders" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>

				</view>
				</view>
				<view class="form_item">
					<view class="left">
					<text>生日</text>
					<u-input placeholder='请选择时间' @click="hiddenTime" :disabled='true' v-model="form.birthday" type="text" />
				</view>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<u-picker mode="time" v-model="showtime" @confirm="confirmTime" :params="params"></u-picker>
				<view class="form_item">
					<view class="left">
					<text>密码</text>
					<u-input placeholder='请输入六位数字密码' class="hidden" maxlength='6' :clearable='false' v-model="form.password" type="number" />
					<u-input placeholder='请输入六位数字密码' maxlength='6' :password-icon="false" :clearable='false' v-model="form.password"
					 type="password" />
				</view>
				</view>
				<u-keyboard ref="uKeyboard" mode="number" @change="valChange" @backspace="backspace" v-model="show"></u-keyboard>
				<view class="form_item">
					<view class="left">
					<text>有效期至</text>
					<u-input placeholder='请选择有效时间' @click="hiddenTime1" :disabled='true' v-model="form.expired_at" type="text" />
				</view>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<u-picker mode="time" v-model="showtime1" @confirm="confirmTime1" :params="params"></u-picker>
			</view>
			<view class="box">
				<view class="form_item">
					<view class="left">
					<text>标签</text>
					<u-input placeholder='请输入标签' v-model="form.tag" type="text" />
				</view>
					<u-icon name="arrow-right" class="man_r" color="#cccccc" size="28"></u-icon>
				</view>
				<view class="form_item">
					<view class="left">
					<text>地址</text>
					<u-input placeholder='请输入地址' v-model="form.address" type="text" />
				</view>
				</view>
				<view class="form_item">
					<view class="left">
					<text>备注</text>
					<u-input placeholder='请输入备注' v-model="form.remarks" type="text" />
				</view>
				</view>
				<view class="form_images">
					<text>上传图片</text>
					<view class="img" @click="uploadImg">
						<view class="plus" v-if="form.image==''">
							<u-icon name="plus" color="#606266" size="36"></u-icon>
						</view>
						<u-image v-else width="120rpx" image-mode='aspectFit' height="120rpx" :src="form.image|filterImage"></u-image>
					</view>
				</view>
			</view>

		</view>
		<view class="btn">
			<view class="del" @click="del">
				删除
			</view>
			<view class="bc" @click="sure">
				保存
			</view>

		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		customer,
		customerEdit,
		customerDel
	} from '../../api/customer.js'
	import url from '../../api/configuration.js'
	export default {
		data() {
			return {
				id: 0,
				form: {
					customer_level: {}
				},
				form: {
					name: '',
					mobile: '',
					number: '',
					customer_level_id: '',
					birthday: '',
					gender: 0,
					password: '',
					remarks: '',
					expired_at: '',
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
				gender_value: '',
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
				userMessage:{}
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
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				// this.avatar = path;
				// 可以在此上传到服务端
				uni.uploadFile({
					url: url.baseURL + '/api/upload', //仅为示例，非真实的接口地址
					filePath: path,
					name: 'user',
					header: {
						token: "Bearer " + this.userMessage.token
					},
					formData: {
						type: 'user',
						path: 'user'
					},
					success: (uploadFileRes) => {
						this.form.image = JSON.parse(uploadFileRes.data).data.url
					}
				});
			})
		},
		methods: {
			// 裁剪
			uploadImg(){
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/pages/avatar/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 300,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			async init(id) {
				let res = await customer(id);
				this.form = res;
				if (res.gender) {
					this.gender_value = '女'
				} else {
					this.gender_value = '男'
				}
				this.customer = res.customer_level.name;
				this.fileList = []
				if (res.image) {
					this.fileList.push({
						url: this.$cfg.domain + res.image
					})
				}
			},

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
				this.form.expired_at = `${v.year}-${v.month}-${v.day}`;
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
					url: `/pagesMine/customerLevel/customerLevel?iq=1`
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
					let obj = {
						name:this.form.name,
						mobile:this.form.mobile,
						number:this.form.number,
						customer_level_id:this.form.customer_level_id,
						birthday:this.form.birthday,
						gender:this.form.gender,
						password:this.form.password,
						remarks:this.form.remarks,
						expired_at:this.form.expired_at,
						image:this.form.image,
						tag:this.form.tag,
						address:this.form.address
					}
					if(this.form.expired_at == null){
						delete obj.expired_at
					}
					let res = await customerEdit(this.id, obj)
					if (!res.code) {
						uni.navigateBack()
					}
				}
				// url: `/pages/memberManagement/memberManagement`
			},
			async del() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否删除该会员？',
					success: async (res) => {
						if (res.confirm) {
							let res = await customerDel(this.id)
							if (!res.code) {
								uni.navigateBack()
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		},
		onUnload() {
			uni.$off()
		},
		onLoad(query) {
			this.id = query.id;
			this.userMessage = uni.getStorageSync('userMessage');
			this.header.token = "Bearer " + this.userMessage.token
			this.action = url.baseURL;
			this.init(query.id)
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

<style scoped lang="scss">
	.editMember {
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
			position: fixed;
			bottom: 0;
			height: 80rpx;
			flex-direction: row;

			.bc {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #2979ff;
				color: #FFFFFF;
			}

			.del {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #666666;
				color: #FFFFFF;
			}
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
			margin: 0 0 80rpx 0;

			.box {
				width: 100%;
				margin-bottom: 20rpx;

				.form_images {
					padding-right: 20rpx;
					display: flex;
					height: 140rpx;
					flex-direction: row;
					align-items: center;

					background-color: #FFFFFF;
					margin-bottom: 2rpx;

					text {
						padding: 0 30rpx 0 20rpx;
					}

					.img {
						width: 120rpx;
						height: 120rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #f4f5f6;
						.plus{
							width: 100%;
							height: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
						}
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
					justify-content: space-between;
					.left{
						display: flex;
						flex-direction: row;
						align-items: center;
					}
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
