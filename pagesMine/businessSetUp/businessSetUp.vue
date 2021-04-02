<template>
	<view class="businessSetUp">
		<view class="box">
			<uni-list>
				<uni-list-item title="店铺管理" @click="toStoreManagement" :showExtraIcon='true' :extraIcon='extraIcon[0]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="员工管理" @click="toStaffManagement" :showExtraIcon='true' :extraIcon='extraIcon[1]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="用户管理" @click="toUserManagement" :showExtraIcon='true' :extraIcon='extraIcon[2]' :showArrow='true' :clickable='true'></uni-list-item>
			</uni-list>
		</view>
		<view class="box">
			<uni-list>
				<uni-list-item title="会员等级" @click="toCustomerLevel" :showExtraIcon='true' :extraIcon='extraIcon[3]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="会员等级晋升" @click="toAutoPromotion" :showExtraIcon='true' :extraIcon='extraIcon[4]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="积分设置" @click="toPointList" :showExtraIcon='true' :extraIcon='extraIcon[5]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="支付方式" @click="toPatternOfPayment" :showExtraIcon='true' :extraIcon='extraIcon[6]' :showArrow='true' :clickable='true'></uni-list-item>
			</uni-list>
		</view>
		<view class="box">
			<uni-list>
				<uni-list-item title="打印设置" @click="toPrintSetting" :showExtraIcon='true' :extraIcon='extraIcon[7]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="系统重置" @click="toSystemSetting" :showExtraIcon='true' :extraIcon='extraIcon[8]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="参数设置" @click="toParamSetting" :showExtraIcon='true' :extraIcon='extraIcon[9]' :showArrow='true' :clickable='true'></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				extraIcon: [{
					color: '#2979ff',
					size: '22',
					type: 'shop'
				}, {
					color: '#2979ff',
					size: '22',
					type: 'personadd-filled'
				}, {
					color: '#2979ff',
					size: '22',
					type: 'person-filled'
				}, {
					color: '#2979ff',
					size: '22',
					type: 'arrowdown'
				}, {
					color: '#2979ff',
					size: '22',
					type: 'arrowthinup'
				}, {
					color: '#2979ff',
					size: '22',
					type: 'star'
				}, {
					color: '#2979ff',
					size: '22',
					type: 'help-filled'
				}, {
					color: '#2979ff',
					size: '22',
					type: 'compose'
				}, {
					color: '#2979ff',
					size: '22',
					type: 'reload'
				}, {
					color: '#2979ff',
					size: '22',
					type: 'settings'
				}]
			}
		},
		methods: {
			// 店铺管理
			toStoreManagement(){
				if(this.$store.state.authority.join(",").indexOf('store_management') != -1){
					uni.navigateTo({
						url: `/pagesMine/storeManagement/storeManagement`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 员工管理
			toStaffManagement(){
				if(this.$store.state.authority.join(",").indexOf('staff_management') != -1){
					uni.navigateTo({
						url: `/pagesMine/staffManagement/staffManagement`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 用户管理
			toUserManagement(){
				if(this.$store.state.authority.join(",").indexOf('user_management') != -1){
					uni.navigateTo({
						url: `/pagesMine/userManagement/userManagement`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 支付方式
			toPatternOfPayment(){
				if(this.$store.state.authority.join(",").indexOf('pay_type') != -1){
					uni.navigateTo({
						url: `/pagesMine/patternOfPayment/patternOfPayment`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 会员等级
			toCustomerLevel(){
				if(this.$store.state.authority.join(",").indexOf('customer_level') != -1){
					uni.navigateTo({
						url: `/pagesMine/customerLevel/customerLevel`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 会员晋升
			toAutoPromotion(){
				if(this.$store.state.authority.join(",").indexOf('customer_level_promotion') != -1){
					uni.navigateTo({
						url: `/pagesMine/businessSetUp/autoPromotion/autoPromotion`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			
			// 积分设置
			toPointList(){
				if(this.$store.state.authority.join(",").indexOf('point_setting') != -1){
					uni.navigateTo({
						url: `/pagesMine/pointList/pointList`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 打印设置
			toPrintSetting(){
				if(this.$store.state.authority.join(",").indexOf('print_setting') != -1){
					// uni.navigateTo({
					// 	url: `/pages/pointList/pointList`
					// })
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 系统设置
			toSystemSetting(){
				if(this.$store.state.authority.join(",").indexOf('system_setting') != -1){
					// uni.navigateTo({
					// 	url: `/pages/pointList/pointList`
					// })
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			// 参数设置
			toParamSetting(){
				if(this.$store.state.authority.join(",").indexOf('param_setting') != -1){
					uni.navigateTo({
						url: `/pagesMine/businessSetUp/config/config`
					})
				}else{
					uni.showToast({
					    title: '您还没有该权限!',
					    duration: 1000,
						icon:"none",
						position:"bottom"
					});
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.businessSetUp {
		height: 100vh;
		background-color: #F8F8F8;

		.box {
			margin-bottom: 10rpx;

			.slot-box {
				font-size: 28rpx;
			}
		}
	}
</style>
