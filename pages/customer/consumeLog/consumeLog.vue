<template>
	<view class="consumeLog">
		<view class="membered">
			<view class="left">
				<u-image width="80rpx" mode='aspectFit' border-radius="10" class="header_image" height="80rpx" :src="$cfg.domain+obj.image"></u-image>
				<view class="l-item">
					<text>{{obj.name}}</text>
					<text>{{obj.number}}</text>
				</view>
			</view>
			<view class="right">
				<text class="nong">&yen;{{obj.resume}}</text>
				<text>累计消费金额</text>
			</view>
		</view>
		<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
		 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
		 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
			<view class="list" v-for="(item,index) in list" :key="index" @click="clickItem(item)">
				<view class="left">
					<u-image width="80rpx" mode='aspectFit' border-radius="10" class="header_image" height="80rpx" :src="$cfg.domain+item.goods.main_image"></u-image>
					<view class="list-item">
						<text>{{item.goods.name}}</text>
						<view class="left-num">
							<text>x{{item.quantity}}</text>
							<text class="zf">{{item.sales_name}}</text>
						</view>
					</view>
				</view>
				<view class="right">
					<text class="red">{{item.real_price}}</text>
					<text class="gray">{{item.sales_order.updated_at}}</text>
				</view>
			</view>
		</k-scroll-view>
		<u-toast ref="uToast" />
		</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {getConsumeLog} from '../../../api/customer.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				obj:{},
				form:{},
				page:1,
				page_size:10,
				list:[],
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--到底了--',
				touchHeight: 50,
				height: 100,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				style_input: {
					'background-color': '#ffffff'
				},
				last_page: 0,
				pull:false
			}
		},
		methods: {
			clickItem(item){
				uni.navigateTo({
					url:`/pages/salesOrderDetails/salesOrderDetails?id=${this.form.customer_id}`
				})
			},
			async init(){
				let res = await getConsumeLog({
					customer_id:this.form.customer_id,
					page:this.page,
					page_size:this.page_size
				})
				console.log(res);
				res.data.map(v=>{
					let arr = []
					v.sales_order.sales_payment.map(v1=>{
						// console.log(v1);
						if(v1.account){
							arr.push(v1.account.name)
						}
					})
					v['sales_name'] = arr.join('|')
				})
				this.list.push(...res.data)
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = [];
				this.pull = false;
				this.init();
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if(!this.pull){
					if (this.page >= this.last_page) {
						this.$refs.uToast.show({
							title: '加载到底了',
							type: 'default',
							position: 'bottom'
						})
						this.pull = true;
					} else {
						this.page++;
						this.init()
					}
				}
			},
		},
		onLoad(option) {
			this.obj = JSON.parse(decodeURIComponent(option.obj));
			// console.log(this.obj);
			this.form.customer_id = this.obj.id;
			this.init()
		}
	}
</script>

<style scoped lang="scss">
.consumeLog{
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #F5F5F5;
	min-height: 100%;
	.membered {
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		background-color: #2979ff;
		flex-direction: row;
	
		.left {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			padding-left: 20rpx;
	
			text {
				color: #F1F1F1;
				margin: 0 20rpx;
			}
			.l-item{
				display: flex;
				flex-direction: column;
			}
		}
	
		.right {
			display: flex;
			justify-content: center;
			align-items: center;
			padding-right: 20rpx;
			flex-direction: column;
			text{
				color: #F1F1F1;
			}
			.nong{
				font-weight: 600;
				color: #FFFFFF;
			}
		}
	
	}
	.list{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: #FFFFFF;
		padding: 10rpx;
		border-bottom: 0.01rem dashed #E5E5E5;
		.left{
			display: flex;
			flex-direction: row;
			.list-item{
				display: flex;
				flex-direction: column;
				margin-left: 10rpx;
				text{
					color: #000000;
					font-size: 24rpx;
				}
				.left-num{
					display: flex;
					flex-direction: row;
					margin-top: 10rpx;
					.zf{
						background-color: #a5a5a5;
						color: #FFFFFF;
						border-radius: 10rpx;
						padding: 4rpx 10rpx;
						font-size: 20rpx;
						transform: scale(0.9);
						margin-left: 10rpx;
					}
				}
			}
		}
		.right{
			display: flex;
			flex-direction: column;
			.red{
				font-size: 20rpx;
				color: #FF5A5F;
				text-align: right;
			}
			.gray{
				font-size: 20rpx;
				color: #d8d8d8;
				margin-top: 10rpx;
			}
		}
	
	}
}
</style>
