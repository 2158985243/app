<template>
	<view class="cashierBalance">
		<u-navbar back-icon-color='#ffffff' title="收支结余" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="arrow-down-fill" @click="showStrore" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<view class="mains">
			<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
			 @clickItem="onClickItem"></tabControl>
			<swiper class="swiper" :style="{height:height_mains + 'rpx'}" @change='scollSwiper' :current='current'>
				<swiper-item v-for="(item,index) in list" :key='index'>
					<scroll-view class="scroll" :style="{height:height_mains + 'rpx'}" :scroll-y="true">
						<!--  -->
						<view class="item-list">
							<view class="header-item">
								<!-- <text>{{item}}</text> -->
								<view class="hd-box">
									<view class="left">
										<view class="lf-item" @click="tocashierBalanceinfo('turnover',0)">
											<text>营业额</text>
											<text class="lan">&yen;{{item.turnover}}</text>
										</view>
										<view class="lf-item" @click="tocashierBalanceinfo('recharge',1)">
											<text>充值</text>
											<text class="lan">&yen;{{item.recharge}}</text>
										</view>
										<view class="lf-item" @click="tocashierBalanceinfo('repayment',2)">
											<text>还款</text>
											<text class="lan">&yen;{{item.repayment}}</text>
										</view>

									</view>
									<view class="centont">
										<text class="black">&yen;{{item.payments_money||0}}</text>
										<text>收支结余</text>
									</view>
									<view class="right">
										<view class="rg-item" @click="tocashierBalanceinfo('consume',3)">
											<text>会员消费</text>
											<text class="lan">&yen;{{item.consume}}</text>
										</view>
										<view class="rg-item" @click="tocashierBalanceinfo('expend',4)">
											<text>支出</text>
											<text class="lan">&yen;{{item.expend}}</text>
										</view>
										<view class="rg-item" @click="tocashierBalanceinfo('debt',5)">
											<text>欠款</text>
											<text class="lan">&yen;{{item.debt}}</text>
										</view>
									</view>
								</view>
								<text class="hui">收支结余=营业额-会员消费+充值-支出+还款-欠款</text>
							</view>
							<view class="cont-list">
								<view class="account-li" @click="accountClick(item_accounts)" v-for="(item_accounts,index_accounts) in item.accounts"
								 :key="index_accounts">
									<view class="left">
										<text class="black" v-if="item_accounts.account">{{item_accounts.account.name}}</text>
										<u-line-progress height='10' :percent="(Number(item_accounts.money)/item.payments)*100" :show-percent='false'
										 :round="true" active-color="#ff9900"></u-line-progress>
									</view>
									<view class="right">
										<text class="lan">&yen;{{item_accounts.money}}</text>
										<text class="hui">共{{item_accounts.total_num}}笔，占比{{((Number(item_accounts.money)/item.payments)*100).toFixed(2)}}%</text>
									</view>
									<u-icon name="arrow-right" color="#cccccc" size="32"></u-icon>
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
		cashierBalance
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
				list: [
					[],
					[],
					[],
					[],
					[],
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
				page_size: 10,
				height_home: 0,
				height_mains: 0,
				active: 0,
				type: [],

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
				let res = await cashierBalance({
					start_time: timeStar,
					end_time: timeEnd,
					store_id: this.store_id
				})
				console.log(res);
				this.type = []
				this.type.push({
					money: res.turnover
				});
				this.type.push({
					money: res.recharge
				});
				this.type.push({
					money: res.repayment
				});
				this.type.push({
					money: res.consume
				});
				this.type.push({
					money: res.expend
				});
				this.type.push({
					money: res.debt
				});
				console.log(this.type);
				this.list[this.current] = res;
				this.list[this.current]['payments'] = 0;
				this.list[this.current]['payments_money'] = (Number(res.turnover) - Number(res.consume) + Number(res.recharge) -
					Number(res.expend) + Number(res.repayment) - Number(res.debt)).toFixed(2);
				res.accounts.map((v) => {
					this.list[this.current].payments += Number(v.money)
				})
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
				if (this.list[this.current].length == 0) {
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
				this.dateAll.today5.statrTime = this.start_time
				this.showtime1 = true;
			},
			// 结束时间
			async confirmTime1(v) {
				this.end_time = `${v.year}-${v.month}-${v.day}`;
				this.dateAll.today5.endTime = this.end_time
				this.init(this.start_time, this.end_time);
			},
			// 获取手机信息
			getSystems() {
				uni.getSystemInfo({
					success: (res) => {
						this.height_home = res.windowHeight * 2;
						let info = uni.createSelectorQuery().select('.mains');
						info.boundingClientRect(data => {
							if (data == null) {
								setTimeout(() => {
									this.getSystems()
								}, 100)
							} else {
								this.height_mains = data.height * 2
							}
						}).exec();
					}
				})
			},
			// 获取对应账户下标
			itemClick(index) {
				this.active = index
			},
			// 查看详情
			accountClick(item) {
				if (this.current == 0) {
					let currentdate = this.$date.today()
					uni.navigateTo({
						url: `/pages/cashierReconciliationDetails/cashierReconciliationDetails?name=${item.account.name}&store_id=${this.store_id}&account_id=${item.account_id}&start_time=${currentdate.start_time}&end_time=${currentdate.end_time}&keys=1`
					})
				} else if (this.current == 1) {
					let currentdate = this.$date.yesterday()
					uni.navigateTo({
						url: `/pages/cashierReconciliationDetails/cashierReconciliationDetails?name=${item.account.name}&store_id=${this.store_id}&account_id=${item.account_id}&start_time=${currentdate.start_time}&end_time=${currentdate.end_time}&keys=1`
					})
				} else if (this.current == 2) {
					let currentdate = this.$date.thisWeek()
					uni.navigateTo({
						url: `/pages/cashierReconciliationDetails/cashierReconciliationDetails?name=${item.account.name}&store_id=${this.store_id}&account_id=${item.account_id}&start_time=${currentdate.start_time}&end_time=${currentdate.end_time}&keys=1`
					})
				} else if (this.current == 3) {
					let currentdate = this.$date.thisMonth()
					uni.navigateTo({
						url: `/pages/cashierReconciliationDetails/cashierReconciliationDetails?name=${item.account.name}&store_id=${this.store_id}&account_id=${item.account_id}&start_time=${currentdate.start_time}&end_time=${currentdate.end_time}&keys=1`
					})
				} else if (this.current == 4) {
					uni.navigateTo({
						url: `/pages/cashierReconciliationDetails/cashierReconciliationDetails?name=${item.account.name}&store_id=${this.store_id}&account_id=${item.account_id}&start_time=${this.dateAll.today5.statrTime}&end_time=${this.dateAll.today5.endTime}&keys=1`
					})
				}

			},
			// 前往收支结余详情
			tocashierBalanceinfo(types, index) {
				// this.type
				let obj = {}
				if (this.current == 0) {
					let currentdate = this.$date.today()
					obj = {
						type: this.type,
						form: {
							store_id: this.store_id,
							start_time: currentdate.start_time,
							end_time: currentdate.end_time,
							type: types
						},
						index: index
					}
				} else if (this.current == 1) {
					let currentdate = this.$date.yesterday()
					obj = {
						type: this.type,
						form: {
							store_id: this.store_id,
							start_time: currentdate.start_time,
							end_time: currentdate.end_time,
							type: types
						},
						index: index
					}
				} else if (this.current == 2) {
					let currentdate = this.$date.thisWeek()
					obj = {
						type: this.type,
						form: {
							store_id: this.store_id,
							start_time: currentdate.start_time,
							end_time: currentdate.end_time,
							type: types
						},
						index: index
					}
				} else if (this.current == 3) {
					let currentdate = this.$date.thisMonth()
					obj = {
						type: this.type,
						form: {
							store_id: this.store_id,
							start_time: currentdate.start_time,
							end_time: currentdate.end_time,
							type: types
						},
						index: index
					}
				} else if (this.current == 4) {

					obj = {
						type: this.type,
						form: {
							store_id: this.store_id,
							start_time: this.dateAll.today5.statrTime,
							end_time: this.dateAll.today5.endTime,
							type: types
						},
						index: index
					}
				};
				uni.navigateTo({
					url: '/pages/cashierBalanceinfo/cashierBalanceinfo?item=' + encodeURIComponent(JSON.stringify(obj))
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
			this.getSystems()
		}
	}
</script>

<style scoped lang="scss">
	.cashierBalance {
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
			flex: 1;

			.swiper {
				width: 100%;
				margin-top: 84rpx;
				background-color: #FFFFFF;

				.scroll {}

				.item-list {
					display: flex;
					flex-direction: column;
					align-items: center;
					height: 100%;
					width: 100%;

					// overflow-y: scroll;
					.header-item {
						width: 100%;
						height: 500rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						background-color: #FFFFFF;
						border-bottom: 20rpx solid #F5F5F5;

						.hui {
							color: #999999;
							font-size: 24rpx;
						}

						.hd-box {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							width: 100%;
							height: 430rpx;

							.left {
								width: 25%;
								height: 100%;
								display: flex;
								flex-direction: column;

								.lf-item {
									flex: 1;
									display: flex;
									flex-direction: column;
									align-items: center;
									justify-content: center;
									font-size: 28rpx;

									text {
										color: #999999;
									}

									.lan {
										color: #007AFF;
									}
								}
							}

							.centont {
								width: 50%;
								height: 100%;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								font-size: 28rpx;

								text {
									color: #999999;
									padding: 10rpx 0;
								}

								.black {
									color: #000000;
								}
							}

							.right {
								width: 25%;
								height: 100%;
								display: flex;
								flex-direction: column;

								.rg-item {
									flex: 1;
									display: flex;
									flex-direction: column;
									align-items: center;
									justify-content: center;
									font-size: 28rpx;

									text {
										color: #999999;
									}

									.lan {
										color: #007AFF;
									}
								}
							}
						}

					}

					.cont-list {
						width: 100%;
						display: flex;
						flex-direction: column;
						margin-bottom: 20rpx;

						.account-li {
							width: 100%;
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							padding: 20rpx;
							background-color: #FFFFFF;
							border-bottom: 0.01rem solid #EEEEEE;

							.left {
								width: 60%;
								display: flex;
								flex-direction: column;

								.black {
									color: #000000;
									padding-bottom: 20rpx;
								}
							}

							.right {
								width: 40%;
								display: flex;
								flex-direction: column;

								text {
									text-align: right;
									font-size: 26rpx;
								}

								.lan {
									color: #007AFF;
									padding-bottom: 20rpx;
								}

								.hui {
									font-size: 20rpx;
								}
							}

						}
					}

				}

			}


		}

	}
</style>
