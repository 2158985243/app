<template>
	<view class="businessOverview">
		<u-navbar back-icon-color='#ffffff' title="营业概况" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="arrow-down-fill" @click="showStrore" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<view class="mains">
			<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
			 @clickItem="onClickItem"></tabControl>
			<swiper class="swiper" @change='scollSwiper' :current='current'>
				<swiper-item v-for="(item,index) in list" :key='index'>
					<scroll-view scroll-y="true">
						<!--  -->
						<view class="item-list">

							<view class="item-box" @click="toProcurementStatistics">
								<view class="left">
									<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
									<view class="txt-li">
										<text class="li-dom">采购金额：<text :class="item.purchase.money>0? 'green':'red'">&yen;{{item.purchase.money}}</text></text>
										<text class="gray">单据笔数<text class="black">{{item.purchase.total}}笔</text></text>
									</view>
								</view>
								<view class="right">
									<text class="gray">采购数量 <text class="black">{{item.purchase.quantity}}</text></text>
								</view>
							</view>
							<view class="item-box" @click="toSalesStatistics">
								<view class="left">
									<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
									<view class="txt-li">
										<text class="li-dom">销售金额：<text :class="item.sales.money>0? 'green':'red'">&yen;{{item.sales.money}}</text></text>
										<text class="gray">单据笔数<text class="black">{{item.sales.total}}笔</text></text>
									</view>
								</view>
								<view class="right">
									<text class="gray">销售数量 <text class="black">{{item.sales.quantity}}</text></text>
								</view>
							</view>
							<view class="item-box" @click="toAllotStatistics">
								<view class="left">
									<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
									<view class="txt-li">
										<text class="li-dom">调拨笔数：<text :class="item.allocate.total>0? 'green':'red'">{{item.allocate.total}}</text></text>
										<text class="gray">调出数量<text class="black">{{item.allocate.out_quantity}}</text></text>
									</view>
								</view>
								<view class="right">
									<text class="gray">调入数量<text class="black">{{item.allocate.in_quantity}}</text></text>
								</view>
							</view>
							<view class="item-box" @click="toCheckStatistics">
								<view class="left">
									<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
									<view class="txt-li">
										<text class="li-dom">盘点笔数：<text :class="item.check.total>0? 'green':'red'">{{item.check.total}}笔</text></text>
										<text class="gray">单据笔数<text class="black">&yen;{{item.check.total}}</text></text>
									</view>
								</view>
								<view class="right">
									<text class="gray">盈亏数量 <text class="black">{{item.check.quantity}}</text></text>
								</view>
							</view>
							<view class="item-box" @click="toStockQuantity">
								<view class="left">
									<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
									<view class="txt-li">
										<text class="li-dom">库存数量：<text :class="item.goods.stock>0? 'green':'red'">{{item.goods.stock}}</text></text>
										<text class="gray">库存金额<text class="black">&yen;{{item.goods.cost}}</text></text>
									</view>
								</view>
								<view class="right">
									<text class="gray">库存预警 <text class="black">{{item.goods.warning_count}}</text></text>
								</view>
							</view>
							<view class="item-box">
								<view class="left">
									<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
									<view class="txt-li">
										<text class="li-dom">会员充值：<text :class="item.recharge.money>0? 'green':'red'">&yen;{{item.recharge.money}}</text></text>
										<text class="gray">新增会员<text class="black">{{item.recharge.new_add}}</text></text>
									</view>
								</view>
								<view class="right">
									<text class="gray">会员总数 <text class="black">{{item.recharge.total}}</text></text>
								</view>
							</view>
							<view class="item-box">
								<view class="left">
									<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
									<view class="txt-li">
										<text class="li-dom">积分兑换：<text :class="item.exchange.point>0? 'green':'red'">{{item.exchange.point}}分</text></text>
										<text class="gray">兑换笔数<text class="black">{{item.exchange.total}}笔</text></text>
									</view>
								</view>
								<view class="right">
								</view>
							</view>
							<view class="item-box">
								<view class="left">
									<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
									<view class="txt-li">
										<text class="li-dom">支出金额：<text :class="item.expend.money>0? 'green':'red'">&yen;{{item.expend.money}}</text></text>
										<text class="gray"> 支出笔数<text class="black">{{item.expend.total}}笔</text></text>
									</view>
								</view>
								<view class="right">
								</view>
							</view>
							<view class="item-box">
								<view class="left">
									<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
									<view class="txt-li">
										<text class="li-dom">积分调整：<text :class="item.point_adjust.point>0? 'green':'red'">{{item.point_adjust.point}}分</text></text>
										<text class="gray">调整笔数<text class="black">{{item.point_adjust.total_customer}}</text></text>
									</view>
								</view>
								<view class="right">
									<text class="gray">调整会员 <text class="black">{{item.point_adjust.total_num}}</text></text>
								</view>
							</view>
							<view class="item-box">
								<view class="left">
									<u-icon name="red-packet-fill" color="#0055ff" size="40"></u-icon>
									<view class="txt-li">
										<text class="li-dom">余额调整：<text :class="item.balance_adjust.money>0? 'green':'red'">&yen;{{item.balance_adjust.money}}</text></text>
										<text class="gray">调整笔数：<text class="black">{{item.balance_adjust.total_customer}}</text></text>
									</view>
								</view>
								<view class="right">
									<text class="gray">调整会员 <text class="black">{{item.balance_adjust.total_num}}</text></text>
								</view>
							</view>

						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 开始时间 -->
		<u-picker mode="time" v-model="showtime" @confirm="confirmTime" title="开始时间" :params="params"></u-picker>
		<!-- 结束时间 -->
		<u-picker mode="time" v-model="showtime1" @confirm="confirmTime1" title="结束时间" :params="params"></u-picker>
		<!-- 选择门店 -->
		<u-select v-model="show" mode="single-column" @confirm="confirmStrores" :list="strots"></u-select>
	</view>
</template>

<script>
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';

	import store from '@/store'
	import {
		businessOverview
	} from '../../api/manage.js'
	import {
		storeList
	} from '../../api/store.js'
	export default {
		components: {
			tabControl
		},
		data() {
			return {
				show: false,
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
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				background: {
					backgroundColor: '#2979ff'
				},
				store_id: 0,
				start_time: '',
				end_time: '',
				chartData: {
					series: []
				},
				list: [{
						allocate: {},
						check: {},
						exchange: {},
						expend: {},
						goods: {},
						purchase: {},
						recharge: {},
						sales: {},
						balance_adjust: {},
						point_adjust: {}
					}, {
						allocate: {},
						check: {},
						exchange: {},
						expend: {},
						goods: {},
						purchase: {},
						recharge: {},
						sales: {},
						balance_adjust: {},
						point_adjust: {}
					}, {
						allocate: {},
						check: {},
						exchange: {},
						expend: {},
						goods: {},
						purchase: {},
						recharge: {},
						sales: {},
						balance_adjust: {},
						point_adjust: {}
					}, {
						allocate: {},
						check: {},
						exchange: {},
						expend: {},
						goods: {},
						purchase: {},
						recharge: {},
						sales: {},
						balance_adjust: {},
						point_adjust: {}
					}, {
						allocate: {},
						check: {},
						exchange: {},
						expend: {},
						goods: {},
						purchase: {},
						recharge: {},
						sales: {},
						balance_adjust: {},
						point_adjust: {}
					},

				],

				items: [{
					name: '今天',
					status: 0
				}, {
					name: '昨日',
					status: 1
				}, {
					name: '本周',
					status: 2
				}, {
					name: '本月',
					status: 3
				}, {
					name: '其他',
					status: 4
				}],
				current: 0,
				// 下拉
				tip: '下拉刷新',
				total: [0, 0, 0, 0, 0],
				dateAll: {
					today1: { //今天
						statrTime: '',
						endTime: ''
					},
					today2: { //昨天
						statrTime: '',
						endTime: ''
					},
					today3: { //本周
						statrTime: '',
						endTime: ''
					},
					today4: { //本月
						statrTime: '',
						endTime: ''
					},
					today5: { //其他
						statrTime: '',
						endTime: ''
					},

				},
				strots: [], //店铺组
				page_size: 10
			}
		},
		methods: {
			// 
			async confirmStrores(e) {
				this.store_id = e[0].value
				if (this.current == 0) {
					this.init(this.dateAll.today1.statrTime, this.dateAll.today1.endTime)
				} else if (this.current == 1) {
					this.init(this.dateAll.today2.statrTime, this.dateAll.today2.endTime)
				} else if (this.current == 2) {
					this.init(this.dateAll.today3.statrTime, this.dateAll.today3.endTime)
				} else if (this.current == 3) {
					this.init(this.dateAll.today4.statrTime, this.dateAll.today4.endTime)
				} else if (this.current == 4) {
					this.init(this.dateAll.today5.statrTime, this.dateAll.today5.endTime)
				}
			},
			// 显示店铺列表
			showStrore() {
				this.show = true;
			},
			// 店铺数组
			strored() {
				let arr = store.state.store.storesArr;
				if (arr) {
					arr.map((v) => {
						this.strots.push({
							value: v.store_id,
							label: v.name
						})
					})
				}
			},
			// 初始化
			async init(timeStar, timeEnd) {
				this.chartData = {
					series: []
				}
				let res = await businessOverview({
					start_time: timeStar,
					end_time: timeEnd,
					store_id: this.store_id
				})
				console.log(res);
				this.list[this.current] = res
				this.$forceUpdate()

			},

			// 点击日期
			async onClickItem(val) {
				this.current = val.currentIndex;
				if (this.current == 4) {
					this.showtime = true;
				}
			},
			// 移动
			async scollSwiper(e) {
				this.current = e.target.current
				if (this.list[this.current].allocate.total == undefined) {
					if (this.current == 0) {
						let currentdate = this.$date.today()
						this.dateAll.today1.statrTime = currentdate.start_time
						this.dateAll.today1.endTime = currentdate.end_time
						this.init(currentdate.start_time, currentdate.end_time)
					} else if (this.current == 1) {
						let currentdate = this.$date.yesterday()
						this.dateAll.today2.statrTime = currentdate.start_time
						this.dateAll.today2.endTime = currentdate.end_time
						this.init(currentdate.start_time, currentdate.end_time)
					} else if (this.current == 2) {
						let currentdate = this.$date.thisWeek()
						this.dateAll.today3.statrTime = currentdate.start_time
						this.dateAll.today3.endTime = currentdate.end_time
						this.init(currentdate.start_time, currentdate.end_time)
					} else if (this.current == 3) {
						let currentdate = this.$date.thisMonth()
						this.dateAll.today4.statrTime = currentdate.start_time
						this.dateAll.today4.endTime = currentdate.end_time
						// console.log(yearEnd, monthEnd, todayEnd);
						this.init(currentdate.start_time, currentdate.end_time)
					} else if (this.current == 4) {
						this.dateAll.today5.statrTime = this.start_time
						this.dateAll.today5.endTime = this.end_time
						this.init(this.start_time, this.end_time)

					}

				}
			},

			/// 开始时间
			confirmTime(v) {
				this.start_time = `${v.year}-${v.month}-${v.day}`;
				this.showtime1 = true;
			},
			// 结束时间
			async confirmTime1(v) {
				this.end_time = `${v.year}-${v.month}-${v.day}`;
				this.init(this.start_time, this.end_time);
			},
			// 前往采购统计
			toProcurementStatistics() {
				if (this.current == 0) {
					uni.navigateTo({
						url: `/pages/procurementStatistics/procurementStatistics?start_time=${this.dateAll.today1.statrTime}&end_time=${this.dateAll.today1.endTime}&current=${this.current}`
					})
				} else if (this.current == 1) {
					uni.navigateTo({
						url: `/pages/procurementStatistics/procurementStatistics?start_time=${this.dateAll.today2.statrTime}&end_time=${this.dateAll.today2.endTime}&current=${this.current}`
					})
				} else if (this.current == 2) {
					uni.navigateTo({
						url: `/pages/procurementStatistics/procurementStatistics?start_time=${this.dateAll.today3.statrTime}&end_time=${this.dateAll.today3.endTime}&current=4`
					})
				} else if (this.current == 3) {
					uni.navigateTo({
						url: `/pages/procurementStatistics/procurementStatistics?start_time=${this.dateAll.today4.statrTime}&end_time=${this.dateAll.today4.endTime}&current=4`
					})
				} else if (this.current == 4) {
					uni.navigateTo({
						url: `/pages/procurementStatistics/procurementStatistics?start_time=${this.dateAll.today5.statrTime}&end_time=${this.dateAll.today5.endTime}&current=4`
					})
				}

			},
			// 前往销售统计
			toSalesStatistics() {
				if (this.current == 0) {
					uni.navigateTo({
						url: `/pages/salesStatistics/salesStatistics?start_time=${this.dateAll.today1.statrTime}&end_time=${this.dateAll.today1.endTime}&current=${this.current}`
					})
				} else if (this.current == 1) {
					uni.navigateTo({
						url: `/pages/salesStatistics/salesStatistics?start_time=${this.dateAll.today2.statrTime}&end_time=${this.dateAll.today2.endTime}&current=${this.current}`
					})
				} else if (this.current == 2) {
					uni.navigateTo({
						url: `/pages/salesStatistics/salesStatistics?start_time=${this.dateAll.today3.statrTime}&end_time=${this.dateAll.today3.endTime}&current=4`
					})
				} else if (this.current == 3) {
					uni.navigateTo({
						url: `/pages/salesStatistics/salesStatistics?start_time=${this.dateAll.today4.statrTime}&end_time=${this.dateAll.today4.endTime}&current=4`
					})
				} else if (this.current == 4) {
					uni.navigateTo({
						url: `/pages/salesStatistics/salesStatistics?start_time=${this.dateAll.today5.statrTime}&end_time=${this.dateAll.today5.endTime}&current=4`
					})
				}

			},
			// 前往调拨统计
			toAllotStatistics() {
				if (this.current == 0) {
					uni.navigateTo({
						url: `/pages/allotStatistics/allotStatistics?start_time=${this.dateAll.today1.statrTime}&end_time=${this.dateAll.today1.endTime}&current=${this.current}`
					})
				} else if (this.current == 1) {
					uni.navigateTo({
						url: `/pages/allotStatistics/allotStatistics?start_time=${this.dateAll.today2.statrTime}&end_time=${this.dateAll.today2.endTime}&current=${this.current}`
					})
				} else if (this.current == 2) {
					uni.navigateTo({
						url: `/pages/allotStatistics/allotStatistics?start_time=${this.dateAll.today3.statrTime}&end_time=${this.dateAll.today3.endTime}&current=4`
					})
				} else if (this.current == 3) {
					uni.navigateTo({
						url: `/pages/allotStatistics/allotStatistics?start_time=${this.dateAll.today4.statrTime}&end_time=${this.dateAll.today4.endTime}&current=4`
					})
				} else if (this.current == 4) {
					uni.navigateTo({
						url: `/pages/allotStatistics/allotStatistics?start_time=${this.dateAll.today5.statrTime}&end_time=${this.dateAll.today5.endTime}&current=4`
					})
				}

			},
			// 前往盘点统计
			toCheckStatistics() {
				if (this.current == 0) {
					uni.navigateTo({
						url: `/pages/checkStatistics/checkStatistics?start_time=${this.dateAll.today1.statrTime}&end_time=${this.dateAll.today1.endTime}&current=${this.current}`
					})
				} else if (this.current == 1) {
					uni.navigateTo({
						url: `/pages/checkStatistics/checkStatistics?start_time=${this.dateAll.today2.statrTime}&end_time=${this.dateAll.today2.endTime}&current=${this.current}`
					})
				} else if (this.current == 2) {
					uni.navigateTo({
						url: `/pages/checkStatistics/checkStatistics?start_time=${this.dateAll.today3.statrTime}&end_time=${this.dateAll.today3.endTime}&current=4`
					})
				} else if (this.current == 3) {
					uni.navigateTo({
						url: `/pages/checkStatistics/checkStatistics?start_time=${this.dateAll.today4.statrTime}&end_time=${this.dateAll.today4.endTime}&current=4`
					})
				} else if (this.current == 4) {
					uni.navigateTo({
						url: `/pages/procurementStatistics/procurementStatistics?start_time=${this.dateAll.today5.statrTime}&end_time=${this.dateAll.today5.endTime}&current=4`
					})
				}

			},
			// 前往商品库存
			toStockQuantity(){
				uni.navigateTo({
					url: `/pages/stockQuantity/stockQuantity`
				})
			}
		},
		onLoad(query) {
			this.strored()
			if (query.timeStar) {
				this.start_time = query.timeStar;
				this.end_time = query.timeEnd;
				this.dateAll.today5['statrTime'] = query.timeStar;
				this.dateAll.today5['endTime'] = query.timeEnd;
			} else {
				let date = new Date();
				this.start_time = this.$u.timeFormat(date, 'yyyy-mm-dd');
				this.end_time = this.$u.timeFormat(date, 'yyyy-mm-dd');
			}
			if (store.state.store.store_id > 0) {
				this.store_id = store.state.store.store_id;
			}
			if (query.current > 0) {
				this.current = Number(query.current);
			}
			this.init(this.start_time, this.end_time);
		},
		onShow() {

		}
	}
</script>

<style scoped lang="scss">
	.businessOverview {
		width: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F5F5F5;

		.right_icon {
			margin-right: 30rpx;
		}

		.mains {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.swiper {
				width: 100%;
				margin-top: 84rpx;
				height: 1500rpx;
			}

			.item-list {
				display: flex;
				flex-direction: column;
				height: 100%;
				overflow: hidden;
			}

			.item-box {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				background-color: #FFFFFF;
				margin: 20rpx 20rpx 0 20rpx;
				padding: 20rpx;
				border-radius: 10rpx;

				// height: 140rpx;
				.gray {
					display: flex;

					color: #999999;
					font-size: 20rpx;

					.black {
						padding-left: 10rpx;
						color: #000000;
						font-size: 20rpx;
					}
				}

				.left {
					flex: 1;
					display: flex;
					flex-direction: row;
					height: 100%;

					.txt-li {
						padding-left: 10rpx;
						display: flex;
						flex-direction: column;
						align-self: flex-end;

						.li-dom {
							display: flex;
							margin-bottom: 20rpx;

							.green {
								font-size: 22rpx;
								color: #009D37;
							}

							.red {
								font-size: 22rpx;
								color: #DD524D;
							}
						}
					}
				}

				.right {
					display: flex;
					flex-direction: row;
					align-self: flex-end;
				}
			}
		}

	}
</style>
