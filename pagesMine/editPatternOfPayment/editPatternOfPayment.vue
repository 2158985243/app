<template>
	<view class="editPatternOfPayment">
		<view class="form_item">
			<text>支付名称</text>
			<u-input placeholder='请输入支付名称' type='text' v-model="name" />
		</view>
		<view class="btn">
			<u-button type="error" class='btn_box' @click="del">删除</u-button>
			<u-button type="primary" class='btn_box' @click="save">保存</u-button>
		</view>
	</view>
</template>

<script>
	import{
		accountEdit,
		accountDel
	} from '../../api/account.js'
	export default {
		data() {
			return {
				name: '',
				id: 0
			}
		},
		methods: {
			// 删除
			async del() {
				uni.showModal({
					title: '提示',
					content: '是否删除此支付方式？',
					success: async (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							let res = await accountDel(this.id)
							if (!res.code) {
								uni.navigateBack()
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 编辑
			async save() {
				let res = await accountEdit(this.id, {name:this.name})
				if (!res.code) {
					uni.navigateBack()
				}
			},
		},
		onLoad(query) {
			// console.log(query);
			this.id = query.id;
			this.name = query.name

		}
	}
</script>

<style lang="scss" scoped>
	.editPatternOfPayment {
		height: 100%;
		background-color: #EEEEEE;
		.form_item {
			padding-right: 20rpx;
			display: flex;
			align-items: center;
			background-color: #FFFFFF;
			margin-bottom: 2rpx;
			height: 85rpx;

			text {
				width: 180rpx;
				// text-align: left;
				padding-left: 20rpx;
			}
		}

		.btn {
			width: 100%;
			position: fixed;
			bottom: 0;

			.btn_box {
				width: 50%;
				float: left;
				border-radius: 0 !important;
			}

			/deep/.u-btn--error {
				background-color: #7e7e7e;
				border-color: #7e7e7e;
			}
		}
	}
</style>
