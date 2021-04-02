<template>
	<view class="mutualTransfer">
		<view class="box">
			<view class="item-li">
				<text>转出账户</text>
				<u-input v-model="from_name" @click="toSelectAccount(0)" :disabled="true" :clearable="false" placeholder="请选择转出账户"
				 type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
			</view>
			<view class="item-li">
				<text>转入账户</text>
				<u-input v-model="to_name" @click="toSelectAccount(1)" :disabled="true" :clearable="false" placeholder="请选择转入账户"
				 type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
			</view>
			<view class="item-li">
				<text>转出账户</text>
				<u-input v-model="form.money" :clearable="false" placeholder="请输入金额" type="number" />
			</view>
		</view>
		<view class="btn" @click="sure">
			确认转账
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		mutualTransfer
	} from '../../api/account.js'
	export default {
		data() {
			return {
				from_name: '',
				to_name: '',
				form: {
					from_id: 0,
					to_id: 0,
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
					url: '/pagesRepertory/selectAccount/selectAccount'
				})
			},
			async sure() {
				if (this.form.from_id == 0) {
					this.$refs.uToast.show({
						title: '请选择转出账户!',
						type: 'default',
						position: 'bottom',
					})
				} else if (this.form.to_id == 0) {
					this.$refs.uToast.show({
						title: '请选择转入账户!',
						type: 'default',
						position: 'bottom',
					})
				} else if (this.form.from_id == this.form.to_id) {
					this.$refs.uToast.show({
						title: '转出和转入账户相同,请重新选择!',
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
					let res = await mutualTransfer(this.form);
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
					// console.log(res);
					if (!this.index) {
						this.from_name = res.name;
						this.form.from_id = res.account_id;
					} else {
						this.to_name = res.name;
						this.form.to_id = res.account_id;
					}
				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.mutualTransfer {
		width: 100%;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;
		height: 100%;
		background-color: #E5E5E5;

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
