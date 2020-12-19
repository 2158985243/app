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
					<u-input placeholder='请输入会员手机号码' v-model="form.mobile" type="number" />
				</view>
				<view class="form_item">
					<text>卡号</text>
					<u-input placeholder='可以直接使用手机号码' v-model="form.number" type="number" />
				</view>
				<view class="form_item">
					<text>等级</text>
					<u-input placeholder='请选择会员等级' :disabled='true' @tap="toSelectAccount" v-model="customer" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<view class="box ">
				<view class="form_item">
					<text>性别</text>
					<u-input placeholder='请输入会员姓名' v-model="form.name" type="text" />
				</view>
				<view class="form_item">
					<text>生日</text>
					<u-input placeholder='选择日期' v-model="form.mobile" type="number" />
				</view>
				<view class="form_item">
					<text>密码</text>
					<u-input placeholder='请输入六位数字密码' v-model="form.password" type="number" />
				</view>
				<view class="form_item">
					<text>有效期至</text>
					<u-input placeholder='请选择有效日期' :disabled='true' @tap="toSelectAccount" v-model="customer" type="text" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<view class="box ">
				<view class="form_item">
					<text>标签</text>
					<u-input placeholder='请输入标签' v-model="form.tag" type="text" />
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
					<u-upload width="120" height='120' upload-text='' :limitType='limit' image-mode='aspectFit' :action="action+'/api/upload'"
					 :header="header" :name="formData.type" :form-data="formData" @on-success="onSuccess" :file-list="fileList"
					 :auto-upload="true" :max-size="5 * 1024 * 1024" max-count="1" :show-progress="false" @on-error='onError'
					 del-bg-color='#000000'>
					</u-upload>
				</view>
			</view>
			
		</view>
		<view class="btn" v-show="active==0">
			保存
		</view>
	</view>
</template>

<script>
	import urls from '../../api/configuration.js'
	export default {
		data() {
			return {
				list: ['手工添加', '微信会员'],
				form: {
					name:'',
					mobile:'',
					number:'',
					customer_level_id:'',
					birthday:'',
					gender:'',
					password:'',
					remarks:'',
					expire_at:'',
					tag:'',
					address:'',
				},
				active: 0,
				customer:'',
				limit: ['png', 'jpg', 'jpeg'],
				fileList: [],
				action: '',
				
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
			}
		},
		methods: {
			itemClick(index) {
				this.active = index;
			}
		},
		onLoad() {
			const userMessage = uni.getStorageSync('userMessage');
			this.header.token = "Bearer " + userMessage.token
			
			this.action = urls.baseURL;
		}
	}
</script>

<style lang="scss">
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
			top: calc(88rpx + var(--status-bar-height));
			background-color: #2979ff;

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
			margin: 100rpx 0 80rpx 0 ;
			.box {
				margin-bottom: 20rpx;

				.other-expenses {
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					background-color: #FFFFFF;
					height: 84rpx;

					.green {
						padding-left: 20rpx;
						flex: 1;

						text {
							background-color: #46c85b;
							border-radius: 8rpx;
							padding: 6rpx 10rpx;
							font-size: 24rpx;
							color: #FFFFFF;
						}
					}

					.green-money {
						padding-left: 20rpx;
						flex: 1;
						color: green;
					}

					.orgin {
						padding-left: 20rpx;
						flex: 1;

						text {
							background-color: #ffaa00;
							border-radius: 8rpx;
							padding: 6rpx 10rpx;
							font-size: 24rpx;
							color: #FFFFFF;
						}
					}

					.orgin-money {
						padding-left: 20rpx;
						flex: 1;
						color: #ffaa00;
					}
				}
				.form_images{
					padding-right: 20rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					background-color: #FFFFFF;
					margin-bottom: 2rpx;
					
					text {
						width: 180rpx;
						// text-align: left;
						padding-left: 20rpx;
					}
				}
				.form_item {
					padding-right: 20rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					background-color: #FFFFFF;
					margin-bottom: 2rpx;
					height: 85rpx;

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
