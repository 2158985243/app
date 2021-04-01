<template>
	<view class="editCustomer">
		<view class="box">

			<view class="form_item">
				<text>等级名称</text>
				<u-input placeholder='必填' v-model="form.name" type="text" />
				<!-- <u-input placeholder='请输入备注信息' v-model="form.remarks" type="text" /> -->
			</view>
			<view class="form_item">
				<text>会员折扣</text>
				<u-input placeholder='9折即0.9,不打折即为1' v-model="form.discount" type="number" />
				<!-- <u-input placeholder='请输入备注信息' v-model="form.remarks" type="text" /> -->
			</view>
			<view class="form_item">
				<text>限制有效期</text>
				<u-switch v-model="checked2" @change="exchange" active-value="1" inactive-value="0"></u-switch>
				<text v-if="checked2" class="min_exchange">有效天数:</text>
				<u-input v-if="checked2" placeholder='请输入有效天数' class="border_bt" v-model="form.expired_day" type="number" />
			</view>

		</view>
		<view class="box">
			<view class="form_item">
				<text>备注信息</text>
				<u-input placeholder='请输入备注信息' v-model="form.remarks" type="text" />
			</view>
			<view class="form_item">
				<text>微信会员</text>
				<u-switch v-model="checked3" @change="changeStatus" active-value="1" inactive-value="0"></u-switch>
			</view>
		</view>
		<u-toast ref="uToast" />
		<view class="btn">
			<view class="del" @click="del">
				删除
			</view>
			<view class="edit" @click="sure">
				编辑
			</view>
		</view>
	</view>
</template>

<script>
	import {
		customerLevelEdit,
		customerLevelDel
	} from '../../api/customerLevel.js'
	export default {
		data() {
			return {
				form: {
					name: '',
					expired_day: '',
					limit_expired: 0,
					is_wx: 0,
					discount: '',
					remarks: '',
				},
				checked2: false,
				checked3: false,
				id: 0,
			}
		},
		methods: {
			exchange(v) {
				this.form.limit_expired = Number(v)
			},
			changeStatus(v) {
				this.form.is_wx = Number(v)
			},
			// 保存
			async sure() {
				if (this.form.name == '') {
					this.$refs.uToast.show({
						title: '请输入等级名称'
					})
				} else if (this.form.discount == '') {
					this.$refs.uToast.show({
						title: '请输入会员折扣'
					})
				} else {
					this.form.expired_day = Number(this.form.expired_day)
					this.form.discount = Number(this.form.discount)
					let res = await customerLevelEdit(this.id, this.form);
					if (!res.code) {
						uni.navigateBack()
					}
				}
			},
			// 删除
			async del() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否删除此等级？',
					success: async (res) => {
						if (res.confirm) {
							let res = await customerLevelDel(_this.id)
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
		onLoad(query) {
			this.form = JSON.parse(decodeURIComponent(query.item));
			this.id = this.form.id;
			
			if (this.form.limit_expired) {
				this.checked2 = true

			}
			if (this.form.is_wx) {
				this.checked3 = true
			}
		}
	}
</script>

<style scoped lang="scss">
	.editCustomer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f7f7f7;

		.btn {
			width: 100%;
			height: 80rpx;
			background-color: #007AFF;
			display: flex;
			flex-direction: row;
			position: fixed;
			bottom: 0;

			.del {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #808080;
				color: #FFFFFF;
				font-size: 28rpx;
			}

			.edit {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #007AFF;
				color: #FFFFFF;
				font-size: 28rpx;
			}
		}

		.box {
			margin-bottom: 20rpx;

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
					border-bottom: 0.01rem solid #C0C0C0;
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
		}
	}
</style>
