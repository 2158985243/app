<template>
	<view class="toProcurementStatisticsDetails">
		<u-navbar back-icon-color='#ffffff' :title="title_name" :background="background" title-color="#ffffff">
		</u-navbar>
	</view>
</template>

<script>
	import {countDetails} from '../../api/purchaseStorage.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				page:0,
				page_size:0,
				goods_id:0,
				start_time:'',
				end_time:'',
				title_name:'',
			}
		},
		methods: {
			async init(){
				let res = await countDetails({
					goods_id:this.goods_id,
					start_time:this.start_time,
					end_time:this.end_time
				})
				console.log(res);
			}
		},
		onLoad(query) {
			this.goods_id = query.goods_id;
			this.start_time = query.start_time;
			this.end_time = query.end_time;
			this.title_name = query.title_name;
			this.init()
		}
	}
</script>

<style scoped lang="scss">
.toProcurementStatisticsDetails{
	width: 100%;
	display: flex;
	flex-direction: column;
}
</style>
