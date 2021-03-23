<template>
	<view class="screen">
		<u-navbar back-icon-color='#ffffff' title="筛选" :background="background" title-color="#ffffff">
			<template slot="right">
				<text class="right_icon" @click="clear">清空</text>
			</template>
		</u-navbar>
		<view class="box">
			<view class="form_item">
				<text>商品信息</text>
				<u-input placeholder='请输入货号/商品名称' v-model="form.kw_goods" type="text" />
			</view>
			<view class="form_item">
				<text>会员信息</text>
				<u-input placeholder='请输入会员卡号、手机号或姓名' v-model="form.kw_customer" type="text" />
			</view>
			<view class="form_item">
				<text>支付类型</text>
				<u-input placeholder='请选择支付类型' @tap="toPatternOfPayment"  :disabled='true' type='text' v-model="account_name" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>单据状态</text>
				<u-input placeholder='请选择单据状态'@tap="show = true"  :disabled='true' v-model="status_name" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>销售单号</text>
				<u-input placeholder='请输入销售单号' v-model="form.trade_no" type="number" />
			</view>

		</view>
		<view class="box">
			<view class="form_item">
				<text>开始日期</text>
				<u-input placeholder='请选择开始日期' @tap="hiddenTime(0)" :disabled='true' v-model="form.start_time" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<u-picker mode="time" v-model="showtime" @confirm="confirmTime" :params="params"></u-picker>
			<view class="form_item">
				<text>结束日期</text>
				<u-input placeholder='请选择结束日期' @tap="hiddenTime(1)" :disabled='true' v-model="form.end_time" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<u-picker mode="time" v-model="showtime1" @confirm="confirmTime1" :params="params"></u-picker>
		</view>
		<u-select v-model="show" @confirm="confirm" mode="single-column" :list="list"></u-select>
		<view class="btn" @click="sure">
			确认
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				form: {
					kw_goods: '',
					kw_customer: '',
					account_id:'',
					status:0,
					trade_no:'',
					start_time: '',
					end_time: '',
				},
				status_name: '',
				account_name: '',
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				showtime: false,
				showtime1: false,
				show: false,
				list:[
					{
						value:'0',
						label:'全部'
					},
					{
						value:'1',
						label:'正常'
					},
					{
						value:'2',
						label:'作废'
					},
					{
						value:'3',
						label:'退货'
					},
					
				]
				
			}
		},
		methods: {
			// 清空
			clear() {
				this.form={
					kw_goods: '',
					kw_customer: '',
					account_id:'',
					status:0,
					trade_no:'',
					start_time: '',
					end_time: '',
				}
				this.status_name = ''
				this.account_name = ''
			},
			// 
			clickLi(item) {
				this.form.type = item.type;
				this.itemType = item.name;
				this.show = false
			},
			sure() {
				// console.log(this.form);
				
				let obj = {
					status_name:this.status_name,
					account_name:this.account_name,
					form:this.form
				}
				this.$store.commit('screenFn', {
					screenDate: obj
				})
				uni.$emit('screened', this.form)
				uni.navigateBack()
			},
			handelScan() {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						// console.log('条码内容：' + res.result);
						// this.kw_goods = res.result;
						this.form.kw_goods = res.result
					}
				});
			},
			// 打开选择时间
			hiddenTime(v) {
				if (v) {
					this.showtime1 = true;
				} else {
					this.showtime = true;
				}
			},
			// 选择时间
			confirmTime(v) {
				this.form.start_time = `${v.year}-${v.month}-${v.day}`;
			},
			// 选择时间
			confirmTime1(v) {
				this.form.end_time = `${v.year}-${v.month}-${v.day}`;
			},
			// 单据类型
			confirm(v){
				this.form.status = v[0].value;
				this.status_name = v[0].label;
			},
			// 选择支付类型
			toPatternOfPayment(){
				uni.navigateTo({
					url:`/pages/patternOfPayment/patternOfPayment?iq=1`
				})
			}
		},
		onLoad() {
			let bl = false
			for(let key in store.state.screenDate){
				bl = true
			}
			if(bl){
				this.status_name = store.state.screenDate.status_name;
				this.account_name =store.state.screenDate.account_name;
				this.form = store.state.screenDate.form
				if(this.form.start_time == undefined){
					let date = this.$date.thirtyDays()
					this.form.start_time = date.start_time;
					this.form.end_time = date.end_time;
				}
			}else{
				let date = this.$date.thirtyDays()
				this.form.start_time = date.start_time;
				this.form.end_time = date.end_time;
			}
			uni.$on('patternOfPayment',res=>{
				if(res){
					this.form.account_id = res.account_id;
					this.account_name = res.name
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	.screen {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;

		.right_icon {
			margin-right: 30rpx;
			color: #FFFFFF;
		}

		.list {
			display: flex;
			width: 100%;
			flex-direction: column;

			.li {
				padding: 20rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 0.01rem solid #E5E5E5;
			}
		}

		.box {
			margin-bottom: 20rpx;

			.form_item {
				padding-right: 20rpx;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
				margin-bottom: 2rpx;
				height: 85rpx;

				text {
					width: 220rpx;
					// text-align: left;
					padding-left: 20rpx;
				}

				.min_exchange {
					width: 150rpx;
				}

				.set {
					width: 80rpx;
					color: #2979ff;
				}

				.border_bt {
					border-bottom: 0.01rem solid #C0C0C0;
				}

				.man_r {
					border-left: 0.01rem solid #e3e3e3;
					padding: 28rpx 15rpx 28rpx 30rpx;
					// margin: 0 auto;
				}

			}

			.bottoms {
				margin-bottom: 80rpx;
			}

			.form_item2 {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 20rpx;
				background-color: #FFFFFF;
				height: 85rpx;

				text {
					color: #2979ff;

				}
			}

			.form_item3 {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 2rpx;
				background-color: #FFFFFF;
				height: 85rpx;
				margin-bottom: 70rpx;

				text {
					color: #2979ff;

				}
			}

			.box1 {
				margin-bottom: 20rpx;

				.form_item1 {
					padding-right: 20rpx;
					display: flex;
					align-items: center;
					background-color: #FFFFFF;
					margin-bottom: 2rpx;
					height: 280rpx;

					/deep/.u-add-tips {
						margin-top: 0;
					}

					text {
						width: 180rpx;
						// text-align: left;
						padding-left: 20rpx;
					}

					/deep/.u-delete-icon {
						top: 0;
						right: 0;
						width: 28rpx;
						height: 28rpx;
					}
				}
			}
		}

		.btn {
			width: 80%;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80rpx;
			color: #FFFFFF;
			background-color: #007AFF;
			margin: 0 auto;
			margin-top: 20rpx;
			border-radius: 10rpx;
		}
	}
</style>
