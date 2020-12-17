<template>
	<view class="expense">
		<view class="num">
			<view class="left">
				<view class="max-size">
					{{res_number==''?"0.00":res_number}}
				</view>
				<view class="min-size">
					{{str_number==''?"0.00":str_number}}
				</view>
			</view>
			<view class="right">
				<u-upload width="120" height='120' upload-text='' :limitType='limit' image-mode='aspectFit' :action="action+'/api/upload'"
				 :header="header" :name="formData.type" :form-data="formData" @on-success="onSuccess" :file-list="fileList"
				 :auto-upload="true" :max-size="5 * 1024 * 1024" max-count="1" :show-progress="false" @on-error='onError'
				 del-bg-color='#000000'>
				</u-upload>
			</view>
		</view>
		<view class="box ">
			<view class="form_item">
				<text>项目</text>
				<u-input placeholder='' :disabled='true' @click="toAddArticle" v-model="expend_item" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>账户</text>
				<u-input placeholder='' :disabled='true'  @tap="toSelectAccount" v-model="account" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>

		</view>
		<view class="box ">
			<view class="form_item">
				<text>经手人</text>
				<u-input placeholder='' :disabled='true' @tap="toSelecSalesperson" v-model="user" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>日期</text>
				<u-input placeholder='请选择时间' @tap="hiddenTime" :disabled='true' v-model="form.business_time" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<u-picker mode="time" v-model="showtime" @confirm="confirmTime" :default-time="form.business_time" :params="params"></u-picker>
			<view class="form_item">
				<text>备注</text>
				<u-input placeholder='' v-model="form.remarks" type="text" />
			</view>
		</view>
		<view class="compute">
			<view class="key" @click="compute('1')">
				1
			</view>
			<view class="key" @click="compute('2')">
				2
			</view>
			<view class="key" @click="compute('3')">
				3
			</view>
			<view class="key lan" @click="back()">
				<u-icon name="backspace" color="#007AFF" size="40"></u-icon>
			</view>
			<view class="key" @click="compute('4')">
				4
			</view>
			<view class="key" @click="compute('5')">
				5
			</view>
			<view class="key" @click="compute('6')">
				6
			</view>
			<view class="key lan" @click="empty">
				C
			</view>
			<view class="key" @click="compute('7')">
				7
			</view>
			<view class="key" @click="compute('8')">
				8
			</view>
			<view class="key" @click="compute('9')">
				9
			</view>
			<view class="key lan" @click="compute('-')">
				一
			</view>
			<view class="key" @click="compute('0')">
				0
			</view>
			<view class="key" @click="compute('.')">
				.
			</view>
			<view class="key lan" @click="compute('+')">
				+
			</view>
			<view class="key lan" @click="ensure">
				确定
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import urls from '../../api/configuration.js'
	import {expendLogAdd} from '../../api/expendLog.js'
	export default {
		data() {
			return {
				limit: ['png', 'jpg', 'jpeg'],
				fileList: [],
				action: '',
				expend_item: '', //项目
				account: '', //账户
				user: '', //经手人
				showtime: false,
				form: {
					money: 0,
					expend_item_id: 0,
					account_id: 0,
					user_id: 0,
					business_time: '',
					image: '',
					remarks: ''
				},
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				formData: {
					type: 'expend',
					path: 'expend'
				},
				header: {
					token: ''

				},
				// res_number: "0.00",
				str_number: "",
				add: false,
				reduce: false,
				str: '',
				deep_copy: ''
			}
		},
		computed: {
			res_number() {
				var tmp = this.str_number;
				if (this.str_number.length) {
					var val = this.str_number.charAt(this.str_number.length - 1);
					if (!/^[0-9]$/.test(val)) {
						tmp = tmp + '0';
					}
					return Number(eval(tmp).toFixed(2));
				} else {
					return Number(tmp);
				}
			}
		},
		methods: {
			// 选择时间
			confirmTime(v) {
				this.form.business_time = `${v.year}-${v.month}-${v.day}`;
			},
			hiddenTime() {
				this.showtime = true;
			},
			onSuccess(data, index, lists, name) {
				console.log(data, index, lists, name);
				this.form.image = data.data.url
			},
			onError(res, index, lists, name) {
				console.log(res, index, lists, name);
			},
			// 计算
			compute(val) {
				// this.str_number =''
				let regex =
					/^(([0-9]+\.?[0-9]{0,2})|(([0-9]+\.?[0-9]{0,2}[\+\-])+)|([0-9]+\.?[0-9]{0,2}([\+\-][0-9]+\.?[0-9]{0,2})+))$/
				if (regex.test(this.str_number + val)) {
					this.str_number += val;

				}

			},
			// 后退一步
			back() {
				this.str_number = this.str_number.slice(0, this.str_number.length - 1)
				console.log(this.str_number);
			},
			// 清空
			empty() {
				this.str_number = ''
			},
			// 确定
			async ensure() {
				this.form.money = this.res_number
				if(this.form.money == 0){
					this.$refs.uToast.show({
						title: '请输入金额'
					})
				}else if(this.form.expend_item_id == 0){
					this.$refs.uToast.show({
						title: '请选择支出项目'
					})
				}else if(this.form.account_id == 0){
					this.$refs.uToast.show({
						title: '请选择账户'
					})
				}else{
					let res = await expendLogAdd(this.form)
					if(!res.code){
						uni.navigateTo({
							url: '/pages/expenseBook/expenseBook'
						})
					}
				}
			},
			toAddArticle() {
				uni.navigateTo({
					url: '/pages/article/article'
				})
			},
			// 前往选择账户
			toSelectAccount() {
				uni.navigateTo({
					url: '/pages/selectAccount/selectAccount'
				})
			},
			// 前往选择经手人
			toSelecSalesperson() {
				uni.navigateTo({
					url: '/pages/selecSalesperson/selecSalesperson'
				})
			},
		},
		onLoad() {
			const userMessage = uni.getStorageSync('userMessage');
			this.header.token = "Bearer " + userMessage.token

			this.action = urls.baseURL;
			let date = new Date();
			this.form.business_time = this.$u.timeFormat(date, 'yyyy-mm-dd');

			uni.$on("addArticleDatum", (res) => {
				if (res) {
					this.expend_item = res.name;
					this.form.expend_item_id = res.id

				}
			});
			uni.$on("selectAccount", (res) => {
				if (res) {
					// console.log(res);
					this.account = res.name;
					this.form.account_id = res.account_id;
				}
			});
			uni.$on("selecSalesperson", (res) => {
				if (res) {
					console.log(res);
					this.user = res.name;
					this.form.user_id = res.id;
				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.expense {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		height: 100%;

		.compute {
			width: 100%;
			height: 40vh;
			display: flex;
			flex-wrap: wrap;
			position: fixed;
			bottom: 0;
			border-top: 0.01rem solid #e3e3e3;
			border-left: 0.01rem solid #e3e3e3;

			.key {
				width: 25%;
				height: 25%;
				font-size: 36rpx;
				font-weight: 600;
				background-color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 0.01rem solid #e3e3e3;
				border-right: 0.01rem solid #e3e3e3;
			}

			.lan {
				background-color: #F8F8F8 !important;
				color: #007AFF;
			}
		}

		.num {
			width: 100%;
			height: 140rpx;
			display: flex;
			flex-direction: row;
			background-color: #FFFFFF;
			border-bottom: 4rpx solid #007AFF;

			.left {
				// width: calc(100%-#{160rpx});
				width: 100%;
				display: flex;
				flex-direction: column;

				.max-size {
					display: flex;
					align-items: center;
					width: 100%;
					height: 60%;
					color: #007AFF;
					font-size: 36rpx;
					padding-left: 20rpx;
				}

				.min-size {
					display: flex;
					align-items: center;
					width: 100%;
					height: 40%;
					color: #007AFF;
					font-size: 26rpx;
					padding-left: 30rpx;
				}
			}

			.right {
				display: flex;
				justify-content: center;
				align-items: center;
				// padding: 20rpx;
			}
		}

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

			.form_item {
				padding-right: 20rpx;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
				margin-bottom: 2rpx;
				height: 85rpx;

				text {
					width: 220rpx;
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
</style>
