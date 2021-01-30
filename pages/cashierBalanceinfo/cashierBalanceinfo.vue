<template>
	<view class="cashierBalanceinfo">
		<u-navbar back-icon-color='#ffffff' title="收支结余详情" :background="background" title-color="#ffffff">
		</u-navbar>
		<text class="lan">{{form.start_time}}-{{form.end_time}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				form:{}
			}
		},
		methods: {
			
		},
		onLoad(query) {
			this.form = query
			
		}
	}
</script>

<style scoped lang="scss">
.cashierBalanceinfo{
	width: 100%;
	min-height: 100%;
	background-color: #F5F5F5;
	display: flex;
	flex-direction: column;
	.lan{
		width: 100%;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #2979ff;
		color: #FFFFFF;
	}
	/deep/.u-border-bottom:after{
		border-bottom-width:0;
	}
}
</style>
