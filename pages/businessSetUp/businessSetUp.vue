<template>
	<view class="businessSetUp">
		<view class="box">
			<uni-list>
				<uni-list-item title="店铺管理" @click="toStoreManagement" :showExtraIcon='true' :extraIcon='extraIcon[0]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="员工管理" @click="toStaffManagement" :showExtraIcon='true' :extraIcon='extraIcon[1]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="用户管理" :showExtraIcon='true' :extraIcon='extraIcon[2]' :showArrow='true' :clickable='true'></uni-list-item>
			</uni-list>
		</view>
		<view class="box">
			<uni-list>
				<uni-list-item title="会员等级" @click="toCustomerLevel" :showExtraIcon='true' :extraIcon='extraIcon[3]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="会员等级晋升" :showExtraIcon='true' :extraIcon='extraIcon[4]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="积分设置" :showExtraIcon='true' :extraIcon='extraIcon[5]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="支付方式" @click="toPatternOfPayment" :showExtraIcon='true' :extraIcon='extraIcon[6]' :showArrow='true' :clickable='true'></uni-list-item>
			</uni-list>
		</view>
		<view class="box">
			<uni-list>
				<uni-list-item title="打印设置" :showExtraIcon='true' :extraIcon='extraIcon[7]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="系统重置" :showExtraIcon='true' :extraIcon='extraIcon[8]' :showArrow='true' :clickable='true'></uni-list-item>
				<uni-list-item title="参数设置" :showExtraIcon='true' :extraIcon='extraIcon[9]' :showArrow='true' :clickable='true'></uni-list-item>
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
				uni.navigateTo({
					url: `/pages/storeManagement/storeManagement`
				})
			},
			// 员工管理
			toStaffManagement(){
				uni.navigateTo({
					url: `/pages/staffManagement/staffManagement`
				})
			},
			// 支付方式
			toPatternOfPayment(){
				uni.navigateTo({
					url: `/pages/patternOfPayment/patternOfPayment`
				})
			},
			// 会员等级
			toCustomerLevel(){
				uni.navigateTo({
					url: `/pages/customerLevel/customerLevel`
				})
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
