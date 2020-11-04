<template>
	<view class="category">
		<u-navbar back-icon-color='#ffffff' title="选择颜色" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen" @click="edit" color="#ffffff" class="right_icon" size="40"></u-icon>
				<u-icon name="plus" @click="toAddColor" color="#ffffff" class="right_icon" size="40"></u-icon>
			</template>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				visible: false,
				style_input: {
					'background-color': '#ffffff'
				},
				background: {
					backgroundColor: '#2979ff'
				},
			}
		},
		methods: {
			toAddColor() {
				uni.navigateTo({
					url: '/pages/addColor/addColor'
				})
			},
			edit() {
				this.visible = !this.visible;
			},
		}
	}
</script>

<style lang="scss" scoped>
.category{
	.right_icon {
		margin-right: 40rpx;
	}
}
</style>
