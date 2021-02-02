<template>
	<view class="supplierLog">
		<u-navbar back-icon-color='#ffffff' :title="name" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="arrow-down-fill" @click="selectTime" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<view class="header">
			<text class="ft">{{form.start_time}}至{{form.end_time}}</text>
			<view class="box-list">
				<view class="box-item">
					<text>期初结存</text>
					<text class="lan">{{sum_money || 0}}</text>
				</view>
				<view class="box-item">
					<text>增加应付款</text>
					<text class="lan">{{total_need_pay || 0}}</text>
				</view>
				<view class="box-item">
					<text>支付合计</text>
					<text class="lan">{{total_paid || 0}}</text>
				</view>
				<view class="box-item">
					<text>期末欠款</text>
					<text class="lan">{{final_balance || 0}}</text>
				</view>
				
			</view>
		</view>
		<view class="list">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list-item" v-for="(item,index) in list" :key="index" @click="tosupplierLogDetails(item)">
					<view class="left">
						<text class="black">{{item.no}}</text>
						<text class="hui">{{item.type_name}}</text>
						<text class="hui">期末欠款<text class="red">&yen;{{item.balance}}</text></text>
					</view>
					<view class="right">
						<view class="rg-info">							
							<text class="hui">{{item.business_time}}</text>
							<text class="hui">增加 <text class="black">&yen;{{item.need_pay}}</text></text>
							<text class="hui">实付 <text class="black">&yen;{{item.paid}}</text></text>
						</view>
						<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
					</view>
				</view>
			 </k-scroll-view>
			 <u-toast ref="uToast" />
		</view>
		<!-- 开始时间 -->
		<u-picker mode="time" v-model="showtime" @confirm="confirmTime" title="开始时间" :params="params"></u-picker>
		<!-- 结束时间 -->
		<u-picker mode="time" v-model="showtime1" @confirm="confirmTime1" title="结束时间" :params="params"></u-picker>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		accountLog
	} from '../../api/supplier.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				showtime: false,
				showtime1: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				form: {
					supplier_id: 0,
					start_time: '',
					end_time: '',
				},
				page: 1,
				page_size: 10,
				
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
				list: [],
				pull:false,
				total_need_pay:0,
				total_paid:0,
				final_balance:0,
			}
		},
		computed:{
			sum_money(){
				let money = 0;
				money = (Number(this.final_balance)-Number(this.total_need_pay)+Number(this.total_paid)).toFixed(2);
				return money
			}
		},
		methods: {
			// 选择时间
			selectTime() {
				this.showtime = true
			},
			/// 开始时间
			confirmTime(v) {
				this.form.start_time = `${v.year}-${v.month}-${v.day}`;
				this.showtime1 = true;
			},
			// 结束时间
			async confirmTime1(v) {
				this.form.end_time = `${v.year}-${v.month}-${v.day}`;
				this.init();
			},
			async init() {
				let res = await accountLog({
					...this.form,
					page: this.page,
					page_size: this.page_size
				})
				console.log(res);
				if(this.page == 1&&res.data.length>0){
					this.final_balance = res.data[0].balance
				}
				this.total_need_pay = res.total_need_pay;
				this.total_paid = res.total_paid;
				this.list.push(...res.data);
				this.last_page = res.last_page
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = [];
				this.pull = false;
				this.init()
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
				}}
			},
			// 
			tosupplierLogDetails(item){
				item['name'] = this.name 
				uni.navigateTo({
					url:'/pages/supplierLogDetails/supplierLogDetails?item='+ encodeURIComponent(JSON.stringify(item))
				})
			}
		},
		onLoad(query) {
			this.form.supplier_id = query.id;
			this.name = query.name;
			let date = this.$date.sevenDays(); //最近7天
			this.form.start_time = date.start_time;
			this.form.end_time = date.end_time;
		},
		onShow() {
			this.list = []
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.supplierLog {
		width: 100%;
		display: flex;
		flex-direction: column;
		min-height: 100%;
		background-color: #EEEEEE;

		.right_icon {
			margin-right: 30rpx;
		}
		.header{
			width: 100%;
			height: 180rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			position: fixed;
			top: calc(88rpx + var(--status-bar-height));
			.ft{
				text-align: center;
			}
			.box-list{
				width: 100%;
				display: flex;
				flex-direction: row;
				background-color: #FFFFFF;
				.box-item{
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 20rpx;
					.lan{
						padding-top: 20rpx;
						color: #007AFF;
					}
				}
			}
		}
		.list{
			margin-top: 180rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			.list-item{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 10rpx 20rpx 20rpx 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;
				.hui{
					font-size: 20rpx;
					color: #999999;
					
				}
				.black{
					font-size: 20rpx;
					color: #000000;
				}
				.red{
					color: #FF5A5F;
					font-size: 20rpx;
					margin-left: 10rpx;
				}
				.left{
					display: flex;
					flex-direction: column;
					text{
						padding-top: 10rpx;
					}
				}
				.right{
					display: flex;
					flex-direction: row;
					.rg-info{
						display: flex;
						flex-direction: column;
						text{
							padding-top: 10rpx;
						}
					}
					.black{
						margin-left: 10rpx;
					}
				}
			}
		}
	}
</style>
