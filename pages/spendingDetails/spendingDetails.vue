<template>
	<view class="spendingDetails">
		<u-navbar back-icon-color='#ffffff' :title="'支出详情('+name+')'" :background="background" title-color="#ffffff">
		</u-navbar>
		<view class="mains">

			<view class="nav">
				<view class="nav-date">
					<view class="date">
						<text>{{start_time}}</text>
						<text>{{end_time}}</text>
					</view>
					<u-icon name="arrow-down-fill" class="" color="#ffffff" size="34"></u-icon>
					<view class="down-fill-right">

					</view>
				</view>
				<view class="nav-money">
					<text>支出金额</text>
					<text>{{sumMoney}}</text>
				</view>
				<view class="nav-money">
					<text>笔数</text>
					<text>{{list.length}}</text>
				</view>
			</view>
			<view class="list">
				<view class="li" v-for="(item,index) in list" :key="index" @click="expenseCancellation(item)">
					<view class="left">
						<text>{{item.expend_item.name}}</text>
						<view class="li-date">
							{{item.time}}|{{item.account.name}}
						</view>
					</view>
					<view class="right">
						<text class="fonts">{{item.money}}</text>
						<u-icon name="arrow-right" color="#ccc" size="34"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		expendLoganalyseDetails
	} from '../../api/expendLog.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				store_id: 0,
				expend_item_id: 0,
				name: '',
				start_time: '',
				end_time: '',
				page: 1,
				page_size: 10,
				list: [],
				sumMoney: 0,
			}
		},
		methods: {
			async init() {
				let res = await expendLoganalyseDetails({
					expend_item_id: this.expend_item_id,
					store_id: this.store_id,
					start_time: this.start_time,
					end_time: this.end_time,
					page: this.page,
					page_size: this.page_size
				})
				console.log(res);
				this.list = res.data;
				this.sumMoney = res.total_money
			},
			// 获取当前月份
			monthDate() {
				let seperator1 = "-";
				let Nowdate = new Date();
				let MonthFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth(), 1);
				let MonthNextFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() + 1, 1);
				let MonthLastDay = new Date(MonthNextFirstDay - 86400000);
				// 本月第一天
				let yearState = MonthFirstDay.getFullYear()
				let monthState = (MonthFirstDay.getMonth() + 1) < 10 ? "0" + (MonthFirstDay.getMonth() + 1) : (MonthFirstDay.getMonth() +
					1)
				let todayState = (MonthFirstDay.getDate() < 10 ? "0" + MonthFirstDay.getDate() : MonthFirstDay.getDate())
				let statrTime = yearState + seperator1 + monthState + seperator1 + todayState
				// 本月最后一天
				let yearEnd = MonthLastDay.getFullYear()
				let monthEnd = (MonthLastDay.getMonth() + 1) < 10 ? "0" + (MonthLastDay.getMonth() + 1) : (MonthLastDay.getMonth() +
					1)
				let todayEnd = (MonthLastDay.getDate() < 10 ? "0" + MonthLastDay.getDate() : MonthLastDay.getDate())
				let endTime = yearEnd + seperator1 + monthEnd + seperator1 + todayEnd
				this.start_time = statrTime;
				this.end_time = endTime;
			},
			// 
			expenseCancellation(item){
				console.log(item);
				uni.navigateTo({
					url: `/pages/expenseCancellation/expenseCancellation?id=${item.id}`
				})
			},
		},
		onLoad(query) {
			this.store_id = query.store_id;
			this.expend_item_id = query.expend_item_id;
			this.name = query.name;
		},
		onShow() {
			this.monthDate();
			this.init();
		}
	}
</script>

<style scoped lang="scss">
	.spendingDetails {
		width: 100%;
		display: flex;
		flex-direction: column;

		/deep/.u-border-bottom:after {
			border: none;
		}

		.nav {
			width: 100%;
			height: 140rpx;
			display: flex;
			flex-direction: row;
			background-color: #2979ff;
			color: #FFFFFF;



			.nav-date {
				flex: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				.down-fill-right {
					width: 2rpx;
					height: 50%;
					background-color: #FFFFFF;
					display: flex;
					margin-left: 20rpx;
				}

				.date {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

				}
			}

			.nav-money {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}

		.list {
			width: 100%;
			display: flex;
			flex-direction: column;

			.li {
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				border-bottom: 0.01rem solid #E5E5E5;
				background-color: #FFFFFF;

				.left {
					display: flex;
					flex-direction: column;

					.li-date {
						margin-top: 10rpx;
						padding: 6rpx;
						background-color: #007AFF;
						border-radius: 6rpx;
						font-size: 20rpx;
						color: #FFFFFF;
					}
				}

				.right {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					.fonts {
						color: #007AFF;
					}
				}
			}
		}
	}
</style>
