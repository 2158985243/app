<template>
	<view class="analyseDetails">
		<view class="header">
			<u-image width="70rpx" mode='aspectFit' border-radius="10" class="header_image" height="70rpx" :src="$cfg.domain+form.customer.image"></u-image>
			<view class="cur-item">
				<text>{{form.customer.name}}</text>
				<text>{{form.customer.mobile}}</text>
			</view>
		</view>
		<view class="box">
			<view class="box-item">
				<text class="tit">用户总览</text>
				<view class="box-list">
					<view class="item">
						<text>&yen;{{form.customer.balance}}</text>
						<text>余额</text>
					</view>
					<view class="item">
						<text>{{form.customer.point}}</text>
						<text>积分</text>
					</view>
					<view class="item">
						<text>{{form.customer.resume_times}}</text>
						<text>总次数</text>
					</view>
					<view class="item">
						<text>&yen;{{form.customer.resume}}</text>
						<text>总消费</text>
					</view>
				</view>
			</view>
			<view class="box-item">
				<text class="tit">消费统计</text>
				<view class="box-list-item">
					<view class="box-inf">
						<text>最近一次消费</text>
						<text class="red">{{form.counts.last_resume_time}}</text>
					</view>
					<view class="box-inf">
						<text>单次最高消费</text>
						<text class="red">&yen;{{form.counts.max_money}}</text>
					</view>
					<view class="box-inf">
						<text>单次平均消费</text>
						<text class="red">&yen;{{form.counts.avg_money}}</text>
					</view>
					
				</view>
			</view>
			<view class="box-item">
				<text class="tit">消费最多</text>
				<view class="box-list-item">
					<view class="list" v-for="(item,index) in form.resume_goods">
						<u-image width="70rpx" mode='aspectFit' border-radius="10" class="header_image" height="70rpx" :src="$cfg.domain+item.goods.main_image"></u-image>
						<view class="list-item">
							<text>{{item.goods.name}}</text>
							<text class="orgin">{{item.times}}次</text>
						</view>
					</view>
				
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {curAnalyseDetails} from '../../../api/customer.js'
	export default {
		data() {
			return {
				id:0,
				form:{
					counts:{},
					customer:{},
					resume_goods:{}
					
				}
			}
		},
		methods: {
			async init(){
				let res = await curAnalyseDetails({
					customer_id:this.id
				})
				console.log(res);
				if(!res.code){
					this.form = res
				}
			}
		},
		onLoad(query) {
			this.id = query.id
			this.init()
		}
	}
</script>

<style scoped lang="scss">
.analyseDetails{
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #F5F5F5;
	.header{
		background-color: #2979ff;
		width: 100%;
		padding: 20rpx;
		display: flex;
		flex-direction: row;
		.cur-item{
			display: flex;
			flex-direction: column;
			color: #FFFFFF;
			margin-left: 10rpx;
		}
	}
	.box{
		width: 100%;
		display: flex;
		flex-direction: column;
		
		.box-item{
			width: 100%;
			display: flex;
			flex-direction: column;
			.tit{
				color: #000000;
				font-weight: 600;
				padding:10rpx 20rpx;
			}
			.box-list{
				width: 100%;
				display: flex;
				flex-direction: row;
				background-color: #FFFFFF;
				padding: 20rpx 10rpx;
				.item{
					width: 20%;
					height: 100rpx;
					margin: 0 2.5%;
					display: flex;
					flex-direction: column;
					background-color: #2979ff;
					justify-content: center;
					align-items: center;
					border-radius: 10rpx;
					text{
						width: 100%;
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
						color: #FFFFFF;
						text-align: center;
						font-size: 24rpx;
					}
				}
			}
		}
		.box-list-item{
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #FFFFFF;
			.box-inf{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding:20rpx ;
				border-bottom: 0.01rem solid #E5E5E5;
				.red{
					color: #FF5A5F;
				}
			}
			.list{
				width: 100%;
				display: flex;
				flex-direction: row;
				padding: 20rpx;
				border-bottom: 0.01rem solid #E5E5E5;
				.list-item{
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;
					.orgin{
						color: #F0AD4E;
					}
				}
			}
		}
	}
}
</style>
