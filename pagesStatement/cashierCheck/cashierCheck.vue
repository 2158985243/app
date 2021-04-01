<template>
	<view class="cashierCheck">
		<u-navbar back-icon-color='#ffffff' title="收银对账" :background="background" title-color="#ffffff">
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
								<view :class="active==index_user? 'active':'hd-info'" @click="itemClick(index_user)" v-for="(item_user,index_user) in item"
								 :key='index_user'>
									<text class="black">{{item_user.user.name}}</text>
									<text class="lan">&yen;{{item_user.total_money}}</text>
								</view>
							</view>
							<view class="cont-list">
								<block v-if="item&&item[active]">
									<block v-for="(item_account,index_account) in item[active].list" :key='index_account'>
										<view class="account-li" @click="accountClick(item_account)" v-if="item_account.account.name != '欠款' && item_account.account.name != '储值卡'">
											<text class="black" v-if="item_account.account">{{item_account.account.name}}</text>
											<view class="right">
												<text class="lan">&yen;{{item_account.money}}</text>
												<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
											</view>
										</view>
									</block>
								</block>
							</view>
							<view class="cont-list">
								<block v-if="item&&item[active]">
									<block v-for="(item_account,index_account) in item[active].list" :key='index_account'>
										<view class="account-li" @click="accountClick(item_account)" v-if="item_account.account.name == '欠款' || item_account.account.name == '储值卡'">
											<text class="black" v-if="item_account.account">{{item_account.account.name}}</text>
											<view class="right">
												<text class="lan">&yen;{{item_account.money}}</text>
												<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
											</view>
										</view>
									</block>
								</block>
							</view>
							<text class="titles"><text class="red">注：</text>储值卡和欠款金额未统计到收银汇总金额中</text>
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
		cashierReconciliation
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
				let res = await cashierReconciliation({
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
						url: `/pages/cashierReconciliationDetails/cashierReconciliationDetails?name=${item.account.name}&store_id=${this.store_id}&user_id=${item.user_id}&account_id=${item.account_id}&start_time=${currentdate.start_time}&end_time=${currentdate.end_time}`
					})
				} else if (this.current == 1) {
					let currentdate = this.$date.yesterday()
					uni.navigateTo({
						url: `/pages/cashierReconciliationDetails/cashierReconciliationDetails?name=${item.account.name}&store_id=${this.store_id}&user_id=${item.user_id}&account_id=${item.account_id}&start_time=${currentdate.start_time}&end_time=${currentdate.end_time}`
					})
				} else if (this.current == 2) {
					let currentdate = this.$date.thisWeek()
					uni.navigateTo({
						url: `/pages/cashierReconciliationDetails/cashierReconciliationDetails?name=${item.account.name}&store_id=${this.store_id}&user_id=${item.user_id}&account_id=${item.account_id}&start_time=${currentdate.start_time}&end_time=${currentdate.end_time}`
					})
				} else if (this.current == 3) {
					let currentdate = this.$date.thisMonth()
					uni.navigateTo({
						url: `/pages/cashierReconciliationDetails/cashierReconciliationDetails?name=${item.account.name}&store_id=${this.store_id}&user_id=${item.user_id}&account_id=${item.account_id}&start_time=${currentdate.start_time}&end_time=${currentdate.end_time}`
					})
				} else if (this.current == 4) {
					uni.navigateTo({
						url: `/pages/cashierReconciliationDetails/cashierReconciliationDetails?name=${item.account.name}&store_id=${this.store_id}&user_id=${item.user_id}&account_id=${item.account_id}&start_time=${this.dateAll.today5.statrTime}&end_time=${this.dateAll.today5.endTime}`
					})
				}

			},
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
	.cashierCheck {
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
			// align-items: center;
			flex: 1;

			.swiper {
				width: 100%;
				margin-top: 84rpx;

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
						height: 190rpx;
						overflow-x: scroll;

						.hd-info {
							width: 200rpx;
							height: 170rpx;
							margin: 10rpx;
							border-radius: 20rpx;
							background-color: #EEF2F5;
							display: flex;
							flex-direction: column;

							.black {
								font-weight: 600;
							}

							text {
								width: 180rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								padding: 20rpx 10rpx;
							}

							.lan {
								color: #729ac7;
							}
						}

						.active {
							width: 200rpx;
							height: 170rpx;
							margin: 10rpx;
							border-radius: 15rpx;
							background-color: #4D8BF3;
							display: flex;
							flex-direction: column;

							.black {
								font-weight: 600;
							}

							text {
								width: 180rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								padding: 20rpx 10rpx;
							}

							.lan {
								color: #FFFFFF;
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

							.black {
								color: #000000;
							}

							.right {
								display: flex;
								flex-direction: row;

								.lan {
									color: #007AFF;
								}
							}
						}
					}

					.titles {
						font-size: 20rpx;
						transform: scale(0.90);
						display: flex;

						.red {
							color: #FF5A5F;
						}
					}
				}

			}


		}

	}
</style>
