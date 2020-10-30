<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	uni-page-body,
	html,
	body {
		height: 100%;
	}

	.status_bar {
		width: 100%;
		height: var(--status-bar-height);
		background-color: #2979ff;
	}

	.content {
		margin: 0 20rpx;
	}
</style>
