<template>
	<view class="addUserManagement">
		<view class="box">
			<view class="item-box">
				<text class="item-title">姓名</text>
				<u-input placeholder='输入用户姓名' v-model="form.name" type="text" />
			</view>
			<view class="item-box">
				<text class="item-title">账号</text>
				<u-input placeholder='输入用户登录账号' maxlength='15' v-model="form.account" type="text" />
			</view>
			<view class="item-box">
				<text class="item-title">密码</text>
				<u-input placeholder='输入用户登录密码' maxlength='11' v-model="form.password" type="password" />
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
				<u-switch v-model="checked" @change="warning" active-value="1" inactive-value="0"></u-switch>
			</view>
			<view class="kb">

			</view>
		</view>
		<u-toast ref="uToast" />
		<view class="btn" @click="sure">
			保存
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	import {userAdd} from '../../../api/user.js'
	export default {
		data() {
			return {
				form: {
					name: '',
					account: '',
					password: '',
					status:1,
					store: [],
					brand: [],
					authority: [],
					staff_id: '',

				},
				checked: true,
				trademark_name: '', //品牌
				purview_name: '', //用户权限
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
			// 前往用户权限
			purviewSetting() {

				uni.navigateTo({
					url: '/pages/userManagement/purviewSetting/purviewSetting'
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
					url: '/pages/userManagement/tademark/tademark'
				})
			},
			// 账号是否启用
			warning(v) {
				// console.log(v);
				this.form.status = Number(v);
			},
			async sure() {
				if(this.form.name==''){
					this.$refs.uToast.show({
						title: '请输入姓名',
						type: 'default',
						position: 'bottom'
					})
				}else if(this.form.account==''){
					this.$refs.uToast.show({
						title: '请输入账号',
						type: 'default',
						position: 'bottom'
					})
				}else if(this.form.password==''){
					this.$refs.uToast.show({
						title: '请输入密码',
						type: 'default',
						position: 'bottom'
					})
				}else if(this.form.account.length<6 || this.form.account.length>15){
					this.$refs.uToast.show({
						title: '请输入6-15位账号',
						type: 'default',
						position: 'bottom'
					})
				}else{
					
					let res = await userAdd(this.form);
					if(!res.code){
						uni.navigateBack()
					}
				}
			}
		},
		onLoad() {
			// 员工
			uni.$on("selecSalesperson", (res) => {
				if (res) {
					this.staff = res.name;
					this.form.staff_id = res.id;

				}
			});
		},
		onShow() {
			// 店铺权限
			if(store.state.storeSelet.length>0){
				this.form.store = []
				// this.form.store = store.state.storeSelet
				store.state.storeSelet.map((v)=>[
					this.form.store.push({store_id:v,checked:1})
				])
				this.shop = `店铺权限${this.form.store.length}项`
			}
			// 品牌权限
			if (store.state.tademark.length > 0){
				this.form.brand = []
				let ids = []
				if(store.state.tademark[store.state.tademark.length-1] > 0){
					ids = store.state.tademark
					ids.map(v=>{
						this.form.brand.push({brand_id:v,checked:1})
					})
					
					this.trademark_name = `品牌权限${ids.length}项`
				}else{
					store.state.tademark.pop()
					ids = store.state.tademark
					ids.map(v=>{
						this.form.brand.push({brand_id:v,checked:1})
					})
					this.trademark_name = `全部品牌`
				}
			}
			// 用户权限
			if(store.state.purview.length>0){
				this.purview_name = `单据权限${store.state.purview.length}项`
				this.form.authority = store.state.purview
			}
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
