<template>
	<view class="accountLog">
		<u-navbar back-icon-color='#ffffff' title-width="300" :title="title_name+'流水明细'" :background="background" title-color="#ffffff">
		</u-navbar>
		<tabControl class="nar_top" :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
		 @clickItem="onClickItem"></tabControl>
		<view class="nav">
			<view class="nav-title">
				<text class="hui">本期收入</text>
				<text class="borad">{{income_money[current]}}</text>
			</view>
			<view class="nav-title">
				<text class="hui">本期支出</text>
				<text class="borad">{{expenses_money[current]}}</text>
			</view>
			<view class="nav-title">
				<text class="hui">账户余额</text>
				<text class="borad">{{total[current]}}</text>
			</view>

		</view>
		<swiper class="swiper" @change='scollSwiper' :current='current'>
			<swiper-item v-for="(item,index) in list" :key='index'>
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="list-data">
						<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
						 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
						 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
							<view class="li" v-for="(itemed,indexed) in item" :key="indexed">
								<view class="left">
									<text class="hei">{{itemed.account.name}}</text>
									<text class="row">{{itemed.declare||itemed.remarks}}</text>
									<text>{{itemed.updated_at}}</text>
								</view>

								<view class="right">
									<text class="red">&yen;{{itemed.money}}</text>
									<text>{{itemed.transaction_type}}</text>
									<text>{{itemed.user.name}}</text>

								</view>
							</view>
						</k-scroll-view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 开始时间 -->
		<u-picker mode="time" v-model="showtime" @confirm="confirmTime" title="开始时间" :params="params"></u-picker>
		<!-- 结束时间 -->
		<u-picker mode="time" v-model="showtime1" @confirm="confirmTime1" title="结束时间" :params="params"></u-picker>
		<u-toast ref="uToast" />
		<view class="footers">
			发短信
		</view>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		accountLog
	} from '../../api/account.js'
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	export default {
		components: {
			tabControl,
			kScrollView
		},
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				title_name: '',
				sumValue: [false, false, false, false, false],
				page: [1, 1, 1, 1, 1],
				page_size: 10,
				keyword: '',
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--到底了--',
				touchHeight: 50,
				height: 0,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				last_page: [0, 0, 0, 0, 0],
				style_input: {
					'background-color': '#ffffff'
				},
				total: [0, 0, 0, 0, 0],
				expenses_money: [0, 0, 0, 0, 0],
				income_money: [0, 0, 0, 0, 0],
				last: false,
				pull: [false, false, false, false, false],
				list: [
					[],
					[],
					[],
					[],
					[]
				],
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				current: 0,
				items: [{
					name: '今天',
					status: 0
				}, {
					name: '昨天',
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
				showtime: false,
				showtime1: false,
				start_time: '',
				end_time: '',
				id: 0,
			}
		},
		computed: {
			selected() {
				let sum = 0
				this.list[this.current].map((v) => {
					if (v.checked) {
						sum++
					}
				})
				return sum
			}
		},
		methods: {
			//选择 
			checkboxGroupChange() {
				// console.log(this.sumValue);
				if (this.sumValue[this.current]) {
					this.list[this.current].map((v) => {
						v.checked = true
					})
				} else {
					this.list[this.current].map((v) => {
						v.checked = false
					})
				}
			},
			// 初始化
			async init(v) {
				let res = await accountLog(this.id, {
					...v,
					page: this.page[this.current],
					page_size: this.page_size
				})
				console.log(res);
				res.log.data.map((v) => {
					if (v.transaction_type == '消费结账') {
						if (v.customer_id > 0) {
							v['declare'] = `说明:${v.customer.name}消费:${v.money}元`;
						} else {
							v['declare'] = `说明:散客消费:${v.money}元`;
						}
					} else if (v.transaction_type == '会员充值') {
						if (v.customer) {

							v['declare'] = `说明:会员:充值${v.customer.name}${v.money}元,赠送${v.reward_money}元`;
						}
					} else if (v.transaction_type == '会员还款') {
						if (v.customer) {

							v['declare'] = `说明:会员${v.customer.name}还款`;
						}
					} else if (v.transaction_type == '账户转出') {
						if (v.transaction_account && v.account) {

							v['declare'] = `说明:从账户[${v.account.name}]转出金额${v.money}元至[${v.transaction_account.name}]`;
						}
					} else if (v.transaction_type == '账户转入') {
						if (v.transaction_account && v.account) {
							v['declare'] = `说明:从账户[${v.account.name}]转出金额${v.money}元至[${v.transaction_account.name}]`;
						}
					}

				})
				this.list[this.current].push(...res.log.data)
				this.last_page[this.curren] = res.log.last_page
				// console.log(res);
				this.total[this.current] = res.balance
				if (res.expenses_money > 0) {
					this.expenses_money[this.current] = res.expenses_money
				}
				if (res.income_money > 0) {
					this.income_money[this.current] = res.income_money
				}
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page[this.current] = 1;
				this.list[this.current] = [];
				this.pull[this.current] = false
				if (this.current == 0) {
					let date = this.$date.today();
					this.init(date)
				} else if (this.current == 1) {
					let date = this.$date.sevenDays();
					this.init(date)
				} else if (this.current == 2) {
					let date = this.$date.thisMonth();
					this.init(date)
				} else if (this.current == 3) {
					let date = this.$date.thirtyDays();
					this.init(date)
				} else if (this.current == 4) {
					// let date = this.$data.today();
					let date = {
						start_time: this.start_time,
						end_time: this.end_time
					}
					this.init(date)
				}
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if (!this.pull[this.current]) {
					if (this.page[this.current] >= this.last_page[this.curren]) {
						this.$refs.uToast.show({
							title: '加载到底了',
							type: 'default',
							position: 'bottom'
						})
						this.pull[this.current] = true

					} else {
						this.page[this.current]++;
						if (this.current == 0) {
							let date = this.$date.today();
							this.init(date)
						} else if (this.current == 1) {
							let date = this.$date.sevenDays();
							this.init(date)
						} else if (this.current == 2) {
							let date = this.$date.thisMonth();
							this.init(date)
						} else if (this.current == 3) {
							let date = this.$date.thirtyDays();
							this.init(date)
						} else if (this.current == 4) {
							// let date = this.$data.today();
							let date = {
								start_time: this.start_time,
								end_time: this.end_time
							}
							this.init(date)
						}
					}
				}
				stopLoad ? stopLoad() : '';
			},
			async onClickItem(val) {
				this.current = val.currentIndex;
				if (this.current == 4) {
					this.showtime = true;
				}
			},
			async scollSwiper(e) {
				this.current = e.target.current
				if (this.list[this.current].length == 0) {
					if (this.current == 0) {
						let date = this.$date.today();
						this.init(date)
					} else if (this.current == 1) {
						let date = this.$date.yesterday();
						this.init(date)
					} else if (this.current == 2) {
						let date = this.$date.thisWeek();
						this.init(date)
					} else if (this.current == 3) {
						let date = this.$date.thisMonth();
						this.init(date)
					} else if (this.current == 4) {
						// let date = this.$data.today();
						// this.init(this.start_time,this.end_time)
					}
				}
				// console.log(this.current);
			},
			/// 开始时间
			confirmTime(v) {
				this.start_time = `${v.year}-${v.month}-${v.day}`;
				this.showtime1 = true;
			},
			// 结束时间
			async confirmTime1(v) {
				this.end_time = `${v.year}-${v.month}-${v.day}`;
				let date = {
					start_time: this.start_time,
					end_time: this.end_time
				}
				this.init(date);
			},

		},
		onLoad(option) {
			this.obj = JSON.parse(decodeURIComponent(option.obj));
			this.id = this.obj.account_id;
			if (this.obj.account_id == 0) {
				this.title_name = '账户';
			} else {
				this.title_name = this.obj.name;
			}
			let date = new Date();
			this.start_time = this.$u.timeFormat(date, 'yyyy-mm-dd');
			this.end_time = this.$u.timeFormat(date, 'yyyy-mm-dd');
			let dated = this.$date.today();
			this.init(dated)
		}
	}
</script>

<style scoped lang="scss">
	.accountLog {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 30rpx;
		}

		.swiper {
			margin-top: 84rpx;
			// height: 100vh;
			height: calc(100% - #{84rpx});
		}

		.nar_top {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: fixed;
			top: calc(84rpx + var(--status-bar-height));
			z-index: 99;
		}

		.nav {
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			position: fixed;
			top: calc(167rpx + var(--status-bar-height));
			z-index: 99;
			background-color: #FFFFFF;

			.nav-title {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-bottom: 0.01rem solid #ececec;

				.borad {
					font-weight: 600;
					margin-top: 5rpx;
				}

				.hui {
					color: #bababa;
				}
			}
		}

		.footers {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #007AFF;
			color: #FFFFFF;
			position: fixed;
			bottom: 0;
			z-index: 999;
		}

		.list-data {
			width: 100%;
			margin: 100rpx 0 80rpx 0;
			display: flex;
			flex-direction: column;

			.li {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx;
				border-bottom: 0.01rem solid #F5F5F5;

				.left {
					display: flex;
					flex-direction: column;

					text {
						color: #808080;
						font-size: 24rpx;
						margin-bottom: 10rpx;
					}

					.row {
						height: 40rpx;
					}

					.hei {
						font-size: 28rpx;
						color: #000000;
					}
				}

				.right {
					display: flex;
					flex-direction: column;
					justify-content: flex-end;

					text {
						text-align: right;
						color: #808080;
						font-size: 24rpx;
						margin-bottom: 10rpx;
					}

					.red {
						font-size: 28rpx;
						color: #DD524D;
					}
				}
			}
		}
	}
</style>
