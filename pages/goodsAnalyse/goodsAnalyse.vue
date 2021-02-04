<template>
	<view class="goodsAnalyse">
		<u-navbar back-icon-color='#ffffff' title="商品分析" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="arrow-down-fill" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				navs:['']
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.goodsAnalyse{
	width: 100%;
	display: flex;
	flex-direction: column;
	min-height: 100%;
}
</style>
