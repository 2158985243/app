<template>
	<view class="addUserManagement">
		<view class="box">
			<view class="item-box">
				<text class="item-title">姓名</text>
				<u-input placeholder='输入用户姓名' v-model="form.name" type="text" />
			</view>
			<view class="item-box">
				<text class="item-title">账号</text>
				<u-input placeholder='输入用户登录账号' v-model="form.name" type="number" />
			</view>
			<view class="item-box">
				<text class="item-title">密码</text>
				<u-input placeholder='输入用户登录密码' v-model="form.name" type="text" />
			</view>
		</view>
		<view class="box">
			<view class="item-box">
				<text class="item-title">用户权限</text>
				<u-input placeholder='请选择用户权限' v-model="form.name" :disabled='true' type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="item-box">
				<text class="item-title">店铺权限</text>
				<u-input placeholder='请选择操作店铺' @click="toStore" v-model="shop" :disabled='true' type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="item-box">
				<text class="item-title">品牌权限</text>
				<u-input placeholder='请选择品牌' @tap="toTrademark" v-model="trademark_name" :disabled='true' type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
		</view>

		<view class="box">
			<view class="item-box">
				<text class="item-title">关联员工</text>
				<u-input placeholder='请选择关联员工' @tap="toSelecSalesperson" v-model="staff" :disabled='true' type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
		</view>

		<view class="box">
			<view class="item-w">
				<text class="item-warning">账号是否启用</text>
				<u-switch v-model="checked" @change="warning" active-value="1" inactive-value="0"></u-switch>
			</view>
			<view class="kb">

			</view>
		</view>
		<view class="btn" @click="sure">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					warning: 0,
					store_ids: [],
					staff_id: '',

				},
				checked: true,
				trademark_name: '', //品牌
				shop: '', //店铺
				staff: '', //关联员工
			}
		},
		methods: {
			// 前往店铺
			toStore() {

				uni.navigateTo({
					url: '/pages/storeManagementSelect/storeManagementSelect'
				})
			},
			// 前往选择经手人
			toSelecSalesperson() {
				uni.navigateTo({
					url: '/pages/selecSalesperson/selecSalesperson'
				})
			},
			// 品牌！！！
			toTrademark() {
				uni.navigateTo({
					url: '/pages/trademark/trademark'
				})
			},
			// 账号是否启用
			warning(v) {
				// console.log(v);
				this.form.warning = Number(v);
			},
			async sure() {

			}
		},
		onLoad() {

			// 店铺
			uni.$on("gloEvent", (res) => {
				if (res) {
					this.form.store_ids = []
					let arr = []
					let ids = []
					res.map(v => {
						arr.push(v.name);
						ids.push(v.id);
					})
					this.form.store_ids = ids
					this.shop = `店铺权限${arr.length}项`
				}
			});
			// 员工
			uni.$on("selecSalesperson", (res) => {
				if (res) {
					this.staff = res.name;
					this.form.staff_id = res.id;

				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.addUserManagement {
		width: 100%;
		display: flex;
		background-color: #E5E5E5;
		height: 100%;
		flex-direction: column;

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 20rpx;

			.item-box {
				width: 100%;
				height: 80rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;
				padding: 0 20rpx;

				.item-title {
					width: 160rpx;
					display: flex;
					// justify-content: center;
					align-items: flex-start;
				}
			}

			.item-w {
				width: 100%;
				height: 80rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;
				padding: 0 20rpx;

				.item-warning {
					width: 180rpx;
					display: flex;
					// justify-content: center;
					align-items: flex-start;
				}
			}

			.kb {
				width: 100%;
				height: calc(100vh - 820rpx);
				background-color: #FFFFFF;
			}
		}

		.btn {
			position: fixed;
			bottom: 0;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #007AFF;
			color: #FFFFFF;
			height: 80rpx;
		}
	}
</style>
