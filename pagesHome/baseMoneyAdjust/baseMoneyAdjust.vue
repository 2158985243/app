<template>
	<view class="baseMoneyAdjust">
		<view class="box">
			<view class="item-li">
				<text>账户名称</text>
				<u-input v-model="from_name" @click="toSelectAccount()" :disabled="true" :clearable="false" placeholder="请选择账户"
				 type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
			</view>
			<view class="item-li">
				<text>原期初金额</text>
				<u-input v-model="base_money" :disabled="true" :clearable="false" placeholder="" type="text" />
			</view>
			<view class="item-li">
				<text>期初金额</text>
				<u-input v-model="form.money" :clearable="false" placeholder="请输入现期初金额" type="number" />
			</view>
		</view>
		<view class="btn" @click="sure">
			提交
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		baseMoneyAdjust
	} from '../../api/account.js'
	export default {
		data() {
			return {
				from_name: '',
				base_money: 0,
				form: {
					account_id: 0,
					money: ''
				},
				index: 0
			}
		},
		methods: {
			// 前往选择账户
			toSelectAccount(e) {
				this.index = e
				uni.navigateTo({
					url: '/pages/selectAccount/selectAccount'
				})
			},
			async sure() {
				if (this.form.account_id == 0) {
					this.$refs.uToast.show({
						title: '请选择账户!',
						type: 'default',
						position: 'bottom',
					})
				} else if (this.form.money == 0 || this.form.money == '') {
					this.$refs.uToast.show({
						title: '请输入金额!',
						type: 'default',
						position: 'bottom',
					})
				} else {
					let res = await baseMoneyAdjust(this.form);
					if (!res.code) {
						uni.navigateBack()
					}
				}
			}
		},
		onUnload() {
			uni.$off()
		},
		onLoad() {
			uni.$on("selectAccount", (res) => {
				if (res) {
					this.from_name = res.name;
					this.base_money = res.base_money;
					this.form.account_id = res.account_id;
				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.baseMoneyAdjust {
		width: 100%;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;
		height: 100%;
		background-color: #F6F6F6;

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;

			.item-li {
				padding: 15rpx;
				width: 100%;
				display: flex;
				flex-direction: row;
				background-color: #FFFFFF;
				justify-content: center;
				align-items: center;
				border-bottom: 0.01rem solid #F1F1F1;

				text {
					width: 160rpx;
					display: flex;
					align-items: center;
				}
			}
		}

		.btn {
			margin-top: 80rpx;
			width: 90%;
			height: 90rpx;
			border-radius: 15rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
			background-color: #4C8AEE;
		}
	}
</style>
