<template>
	<view class="analyseDetails">
		<u-navbar back-icon-color='#ffffff' title-width="330" :title="'销售详情('+date+')'" :background="background" title-color="#ffffff">
		</u-navbar>
		<!-- nav -->
		<view class="header">
			<view class="btn">
				<view class="box" v-for="(item,index) in nav" :key="index" @click="itemClick(index)" :class="active==index? 'active':''">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 总计 -->
		<view class="sum">
			<view class="sum-item">
				<text class="red-font">{{sales_quantity||0}}</text>
				<text class="gray">销售数</text>
			</view>
			<view class="sum-item">
				<text class="red-font">{{sales_money||0}}</text>
				<text class="gray">销售额</text>
			</view>
			<view class="sum-item">
				<text class="red-font">{{goods_cost||0}}</text>
				<text class="gray">销售毛利</text>
			</view>
		</view>
		<!-- 商品 -->
		<view class="list" >
			<view class="list-item" v-for="(item,index) in list[active]">
				<view class="left">
					<u-image width="100" border-radius='10' height="100" mode='aspectFit' :src="$cfg.domain+item.main_image">
					</u-image>
					<view class="lf-num">
						<text class="black">{{item.name}} <text class="gray">{{item.number}}</text></text>
						<u-line-progress height='10' v-show="active==0" :percent="(Number(item.sales_money)/Number(sales_money))*100" :show-percent='false' :round="true"
						 :active-color="colors[index%4]"></u-line-progress>
						 <u-line-progress height='10' v-show="active==1" :percent="(Number(item.sales_quantity)/Number(sales_quantity))*100" :show-percent='false' :round="true"
						 :active-color="colors[index%4]"></u-line-progress>
					</view>
					
				</view>
				<view class="right">
					<text class="red" v-if="active==0">&yen;{{item.sales_money}}</text>
					<text class="red" v-else>{{item.sales_quantity}}</text>
					<text class="gray" v-if="active==0">数量:{{item.sales_quantity}},毛利&yen;{{item.goods_cost}}</text>
					<text class="gray" v-else>金额:&yen;{{item.sales_money}},毛利&yen;{{item.goods_cost}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		analyseDetails
	} from '../../../api/salesOrder.js'
	export default {
		data() {
			return {
				colors:['#2979ff','#ff9900','#00aa00','#55007f'],
				background: {
					backgroundColor: '#2979ff'
				},
				date: '',
				store_id: 0,
				form: {},
				nav: [{
					name: '金额'
				}, {
					name: '数量'
				}],
				active: 0,
				list: [
					[],
					[]
				],
				sales_quantity: 0, //销售数
				sales_money: 0, //销售额
				goods_cost: 0, //销售毛利

			}
		},
		methods: {
			// 切换模式
			itemClick(index) {
				this.active = index;
			},
			async init() {
				let res = await analyseDetails({
					date: this.date,
					store_id: this.store_id
				})
				console.log(res);
				let datas = this.$u.deepClone(res);
				let newNums = datas.sort(function(a, b) {
					return Number(b.sales_money) - Number(a.sales_money);
				});
				this.list[0] = newNums;
				this.list[1] = res;
				this.sales_quantity = 0;
				this.sales_money = 0;
				this.goods_cost = 0;

				res.map((v) => {
					this.sales_quantity += Number(v.sales_quantity);
					this.goods_cost += Number(v.goods_cost);
					this.sales_money += Number(v.sales_money);

				})
				this.sales_money = this.sales_money.toFixed(2);
				this.goods_cost = this.goods_cost.toFixed(2);
			}
		},
		onLoad(query) {
			this.date = query.date;
			this.store_id = query.store_id;
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.analyseDetails {
		width: 100%;
		min-height: 100%;
		background-color: #EEEEEE;
		display: flex;
		flex-direction: column;
		.list{
			width: 100%;
			min-height: 100%;
			display: flex;
			flex-direction: column;
			.list-item{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #EEEEEE;
				.left{
					flex: 1;
					display: flex;
					flex-direction: row;
					.lf-num{
						width: 100%;
						display: flex;
						flex-direction: column;
						padding-left: 10rpx;
						.black{
							font-size: 26rpx;
							padding-bottom: 30rpx;
							color: #000000;
							.gray{
								margin-left: 20rpx;
								color: #999999;
							}
						}
					}
				}
				.right{
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					.red{
						color: #FF5A5F;
						padding-bottom: 30rpx;
					}
					.gray{
						color: #999999;
						font-size: 24rpx;
					}
				}
			}
		}
		.header {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: calc(88rpx + var(--status-bar-height));

			.btn {
				width: 240rpx;
				height: 60rpx;
				border-radius: 20rpx;
				display: flex;
				flex-direction: row;
				overflow: hidden;
				border: 1rpx #4D8DF0 solid;

				.box {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #4D8DF0;
					background-color: #FFFFFF;
				}

				.active {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #ffffff;
					background-color: #4D8DF0;
				}
			}
		}

		.sum {
			width: 100%;
			display: flex;
			padding: 20rpx;
			background-color: #FFFFFF;
			flex-direction: row;
			margin-top: 80rpx;
			margin-bottom: 20rpx;

			.sum-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.red-font {
					color: #FF5A5F;
				}

				.gray {
					color: #999999;
				}
			}
		}
	}
</style>
