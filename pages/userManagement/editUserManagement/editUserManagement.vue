<template>
	<view class="editUserManagement">
		<view class="box">
			<view class="item-box">
				<text class="item-title">姓名</text>
				<u-input placeholder='输入用户姓名' :disabled='is_admin == 1? true:false' v-model="form.name" type="text" />
			</view>
			<view class="item-box">
				<text class="item-title">账号</text>
				<u-input placeholder='输入用户登录账号' maxlength='15' :disabled='is_admin == 1? true:false' v-model="form.account" type="text" />
			</view>
			<view class="item-box">
				<text class="item-title">密码</text>
				<u-input placeholder='输入用户登录密码' maxlength='11' :disabled='true' :password-icon="false" v-model="form.password" type="password" />
				<text class="reset" @click="reset">重置密码</text>
			</view>
		</view>
		<view class="box">
			<view class="item-box">
				<text class="item-title">用户权限</text>
				<u-input placeholder='请选择用户权限' @click='purviewSetting' v-model="purview_name" :disabled='true' type="text" />
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
				<u-switch v-model="checked" @change="warning" :disabled='is_admin == 1? true:false' active-value="1" inactive-value="0"></u-switch>
			</view>
			<view class="kb">

			</view>
		</view>
		<u-popup v-model="show" mode="center" width="500rpx">
			<view class="pop">
				<view class="title">
					重置密码
				</view>
				<u-input placeholder='' maxlength='11' :clearable='false' class="inout" height='60' :border='true'
				 placeholder-style="background-color:#ffffff;" :password-icon="false" v-model="password" type="password" />
				<view class="aniu">
					<view class="qx" @click="show = false">
						取消
					</view>
					<view class="qd" @click="ensure">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
		<view class="btn">
			<view class="del" @click="del">
				删除
			</view>
			<view class="bc" @click="sure">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	import {
		user,
		userEdit,
		userDel
	} from '../../../api/user.js'
	export default {
		data() {
			return {
				form: {
					name: '',
					account: '',
					password: '******',
					status: 1,
					store: [],
					brand: [],
					authority: [],
					staff_id: '',

				},
				password: '',
				id: 0,
				is_admin: 0,
				checked: true,
				show: false,
				trademark_name: '', //品牌
				purview_name: '', //用户权限
				shop: '', //店铺
				staff: '', //关联员工
			}
		},
		methods: {
			// 打开重置密码
			reset() {
				this.password = ''
				this.show = true
			},
			// 确定重置密码
			ensure() {
				this.form.password = this.password
				this.show = false
			},
			// 前往店铺
			toStore() {
				if (this.is_admin == 0) {
					uni.navigateTo({
						url: '/pages/storeManagementSelect/storeManagementSelect'
					})
				}
			},
			// 前往用户权限
			purviewSetting() {
				if (this.is_admin == 0) {
					uni.navigateTo({
						url: '/pages/userManagement/purviewSetting/purviewSetting'
					})
				}
			},
			// 前往选择经手人
			toSelecSalesperson() {
				uni.navigateTo({
					url: '/pages/selecSalesperson/selecSalesperson'
				})
			},
			// 品牌！！！
			toTrademark() {
				if (this.is_admin == 0) {
					uni.navigateTo({
						url: '/pages/userManagement/tademark/tademark'
					})
				}
			},
			// 账号是否启用
			warning(v) {
				// console.log(v);
				this.form.status = Number(v);
			},
			// 保存
			async sure() {
				if (this.form.name == '') {
					this.$refs.uToast.show({
						title: '请输入姓名',
						type: 'default',
						position: 'bottom'
					})
				} else if (this.form.account == '') {
					this.$refs.uToast.show({
						title: '请输入账号',
						type: 'default',
						position: 'bottom'
					})
				} else if (this.form.password == '') {
					this.$refs.uToast.show({
						title: '请输入密码',
						type: 'default',
						position: 'bottom'
					})
				} else if (this.form.account.length < 4 || this.form.account.length > 15) {
					this.$refs.uToast.show({
						title: '请输入4-15位账号',
						type: 'default',
						position: 'bottom'
					})
				} else {
					this.form.password = ''
					let res = await userEdit(this.id, this.form);
					if (!res.code) {
						uni.navigateBack()
					}
				}
			},
			//删除 
			del() {
				if (this.is_admin == 1) {
					this.$refs.uToast.show({
						title: 'boss账号不能删！',
						type: 'default',
						position: 'bottom'
					})
				} else {
					let _this = this
					uni.showModal({
						title: '提示',
						content: '是否删除该用户？',
						success: async (res) => {
							if (res.confirm) {
								let res = await userDel(_this.id)
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
			async init() {
				let res = await user(this.id)
				if (!res.code) {
					this.form.name = res.name;
					this.form.account = res.account;
					this.form.status = res.status;
					this.form.authority = []
					this.form.brand = []
					this.form.store = []
					this.form.staff_id = res.staff_id;
					if (res.staff) {
						this.staff = res.staff.name
					}
					if (res.status == 1) {
						this.checked = true;
					} else {
						this.checked = false;
					}
					let store = []
					let brand = []
					res.authority.map(v => {
						v.children.map(v1 => {
							if (v1.checked) {
								this.form.authority.push({
									authority_id: v1.id,
									checked: 1
								})
							}
						})
					})
					res.brand.map(v => {
						if (v.checked) {
							this.form.brand.push({
								brand_id: v.id,
								checked: 1
							})
							brand.push(v.id)
						}
					})
					res.store.map(v => {
						if (v.checked) {
							this.form.store.push({
								store_id: v.id,
								checked: 1
							})
							store.push(v.id)
						}
					})
					this.$store.commit('storeSeletFn', {
						storeSelet: store
					});
					this.$store.commit('tademarkFn', {
						tademark: brand
					});
					this.$store.commit('purviewFn', {
						purview: this.form.authority
					});
					this.shop = `店铺权限${this.form.store.length}项`;
					if (this.form.brand.length == res.brand.length) {
						this.trademark_name = `全部品牌`;
					} else {
						this.trademark_name = `品牌权限${this.form.brand.length}项`;
					}
					this.purview_name = `单据权限${this.form.authority.length}项`;

					if (this.is_admin == 1) {
						this.shop = `可操作全部店铺`;
						this.trademark_name = `全部品牌`;
						this.purview_name = `已有全部权限`;
					}
				}
			}
		},
		onLoad(query) {
			this.is_admin = query.is_admin;
			this.id = query.id;
			// 员工
			uni.$on("selecSalesperson", (res) => {
				if (res) {
					this.staff = res.name;
					this.form.staff_id = res.id;

				}
			});
			this.init()
		},
		onShow() {
			// 店铺权限
			if (store.state.storeSelet.length > 0) {
				this.form.store = []
				// this.form.store = store.state.storeSelet
				store.state.storeSelet.map((v) => [
					this.form.store.push({
						store_id: v,
						checked: 1
					})
				])
				this.shop = `店铺权限${this.form.store.length}项`
			}
			// 品牌权限
			if (store.state.tademark.length > 0) {
				this.form.brand = []
				let ids = []
				if (store.state.tademark[store.state.tademark.length - 1] > 0) {
					ids = store.state.tademark
					ids.map(v => {
						this.form.brand.push({
							brand_id: v,
							checked: 1
						})
					})

					this.trademark_name = `品牌权限${ids.length}项`
				} else {
					store.state.tademark.pop()
					ids = store.state.tademark
					ids.map(v => {
						this.form.brand.push({
							brand_id: v,
							checked: 1
						})
					})
					this.trademark_name = `全部品牌`
				}
			}
			// 用户权限
			if (store.state.purview.length > 0) {
				this.purview_name = `单据权限${store.state.purview.length}项`
				this.form.authority = store.state.purview
			}
		}
	}
</script>

<style scoped lang="scss">
	.editUserManagement {
		width: 100%;
		display: flex;
		background-color: #f0f0f0;
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

				.reset {
					color: #007AFF;
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
			flex-direction: row;

			color: #FFFFFF;
			height: 80rpx;

			.del {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #3F536E;
				flex: 1;
			}

			.bc {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #007AFF;
			}
		}

		.pop {
			background-color: #F1F1F1;
			width: 100%;
			display: flex;
			flex-direction: column;
			// justify-content: center;
			align-items: center;

			.title {
				padding: 20rpx;
				color: #000000;
			}

			.inout {
				margin-bottom: 30rpx;
			}

			.aniu {
				width: 100%;
				display: flex;
				flex-direction: row;
				height: 80rpx;
				border-top: 1rpx solid #e5e5e5;

				.qx {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					border-right: 1rpx solid #e5e5e5;
				}

				.qd {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

		}
	}
</style>
