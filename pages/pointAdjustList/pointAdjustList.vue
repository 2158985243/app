<template>
	<view class="pointAdjustList">
		<u-navbar back-icon-color='#ffffff' title="积分调整" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="arrow-down-fill" @click="showStrore" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<view class="mains">
			<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
			 @clickItem="onClickItem"></tabControl>
			<swiper class="swiper" @change='scollSwiper' :current='current'>
				<swiper-item v-for="(item,index) in bos" :key='index'>
					<scroll-view scroll-y="true" style="height: 100%;">
						<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
						 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
						 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
							<view class="cen">
								<view class="list" v-for="(item,index) in list[current]" :key="index" @click="toProcurementStatisticsDetails(item)">
									<view class="left">
										<view class="img">
											<u-image width="100" border-radius='10' height="100" mode='aspectFit' :src="$cfg.domain+item.customer.image">
											</u-image>
										</view>
										<view class="li-item">
											<text class="balck">{{item.customer.name}}</text>
											<text class="time">{{item.ctime}}</text>
											<text class="hui-se">{{item.user.name}}</text>
										</view>
									</view>
									<view class="right">
										<view class="money">
											<text :class="item.point>0? 'red':'green'">{{item.point}}</text>
											<text class="hui center">调整后积分：{{item.after_point}}</text>
											<text class="hui">{{item.store.name}}</text>
										</view>
									</view>
								</view>
							</view>
						</k-scroll-view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

						<u-toast ref="uToast" />
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
	import refresh from '@/components/xing-refresh/xing-refresh.vue'
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import store from '@/store'
	import {
		pointAdjustList
	} from '../../api/customer.js'
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
				list: [
					[],
					[],
					[],
					[],
					[]
				],
				bos: [
					[],
					[],
					[],
					[],
					[]
				],
				items: [{
					name: '今天',
					status: 0
				}, {
					name: '昨日',
					status: 1
				}, {
					name: '7天',
					status: 2
				}, {
					name: '30天',
					status: 3
				}, {
					name: '其它',
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
				page: [1, 1, 1, 1],
				page_size: 10,
				start_time: '',
				end_time: '',
				out_quantity: [0, 0, 0, 0, 0],
				in_quantity: [0, 0, 0, 0, 0],
				count: [0, 0, 0, 0, 0],
				store_id: [],
				store_ids: [],

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
				last_page: [0, 0, 0, 0],
				pull: [false, false, false, false]
			}
		},
		computed: {

		},
		methods: {
			// 
			async confirmStrores(e) {
				this.store_ids[0] = e[0].value
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
			// 
			showStrore() {
				uni.navigateTo({
					url: `/pages/pointAdjustList/pointQuery/pointQuery`
				})
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
			async init(timeStar, timeEnd, keyword, store_ids, brand_id, goods_category_id) {
				// 当天

				let currentdate = this.$date.today();
				let res = await pointAdjustList({
					start_time: timeStar || currentdate.start_time,
					end_time: timeEnd || currentdate.end_time,
					store_ids: store_ids || this.store_ids,
					keyword: keyword,
					page: this.page[this.current],
					page_size: this.page_size
				})
				console.log(res);
				if(this.page[this.current]==1){
					this.list[this.current] = []
				}
				if (!res.code) {
					this.list[this.current].push(...res.data)
					this.last_page[this.current] = res.last_page
				}

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
				// 移动到哪个
				if (this.bos[this.current].length == 0) {
					if (this.current == 0) {
						let res = this.$date.today()
						this.dateAll.today1.statrTime = res.start_time
						this.dateAll.today1.endTime = res.end_time
						this.init(res.start_time, res.end_time)
					} else if (this.current == 1) {
						let res = this.$date.yesterday()
						this.dateAll.today2.statrTime = res.start_time
						this.dateAll.today2.endTime = res.end_time
						this.init(res.start_time, res.end_time)
					} else if (this.current == 2) {
						let res = this.$date.sevenDays()
						this.dateAll.today3.statrTime = res.start_time
						this.dateAll.today3.endTime = res.end_time
						this.init(res.start_time, res.end_time)
					} else if (this.current == 3) {
						let res = this.$date.thirtyDays()
						this.dateAll.today4.statrTime = res.start_time
						this.dateAll.today4.endTime = res.end_time
						// console.log(yearEnd, monthEnd, todayEnd);
						this.init(res.start_time, res.end_time)
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
			// 
			toProcurementStatisticsDetails(item) {
				let start_time = ''
				let end_time = ''
				if (this.current == 0) {
					let date = this.$date.today()
					start_time = date.start_time;
					end_time = date.end_time;
				} else if (this.current == 1) {
					start_time = this.dateAll.today2.statrTime;
					end_time = this.dateAll.today2.endTime
				} else if (this.current == 2) {
					start_time = this.dateAll.today3.statrTime;
					end_time = this.dateAll.today3.endTime
				} else if (this.current == 3) {
					start_time = this.dateAll.today4.statrTime;
					end_time = this.dateAll.today4.endTime
				} else if (this.current == 4) {
					start_time = this.dateAll.today5.statrTime;
					end_time = this.dateAll.today5.endTime
				}
				let ids = this.store_ids
				// if (ids.length == 0) {
				// 	ids = this.store_id
				// }
				// uni.navigateTo({
				// 	url: `/pages/allotDetails/allotDetails?store_ids=${ids}&goods_id=${item.goods_id}&start_time=${start_time}&end_time=${end_time}&title_name=${item.name}`
				// })
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page[this.current] = 1;
				this.list[this.current] = [];
				this.pull[this.current] = false;
				this.init()
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if (!this.pull[this.current]) {
					if (this.page[this.current] >= this.last_page[this.current]) {
						this.$refs.uToast.show({
							title: '加载到底了',
							type: 'default',
							position: 'bottom'
						})
						this.pull[this.current] = true
					} else {
						this.page[this.current]++;
						this.init()
					}
				}
			},
		},
		onLoad(query) {
			// 获取店铺id
			this.strored()
			if (store.state.store.store_id > 0) {
				this.store_ids = []
				this.store_ids.push(store.state.store.store_id)
			}
			if (query.start_time) {
				this.store_ids = []
				this.start_time = query.start_time;
				this.end_time = query.end_time;
				this.current = Number(query.current);
				if(query.store_id>0){
					this.store_ids.push(Number(query.store_id))
				}
			}
			// 初始化
			this.init(this.start_time, this.end_time);
			uni.$on('allotQuery', (res) => {
				if (res) {
					this.store_ids = res.store_ids
					this.page[this.current] = 1
					this.init(res.start_time, res.end_time, res.keyword, res.store_ids, res.brand_id, res.goods_category_id)
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	.pointAdjustList {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f5f4f8;

		.right_icon {
			margin-right: 30rpx;
		}

		.mains {
			width: 100%;
			display: flex;
			flex-direction: column;
			height: 100%;

			.swiper {
				margin-top: 84rpx;
				height: calc(100% - 84rpx);
			}

			.cen {
				width: 100%;
				display: flex;
				flex-direction: column;
				height: 100%;
				background-color: #FFFFFF;
				.list {
					width: 100%;
					padding: 20rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					background-color: #FFFFFF;
					border-bottom: 0.01rem solid #EEEEEE;

					.left {
						flex: 1;
						display: flex;
						flex-direction: row;

						.img {
							margin-right: 20rpx;
						}

						.li-item {
							display: flex;
							flex-direction: column;

							text {
								font-size: 20rpx;
								color: #666666;
							}
							.time{
								padding: 10rpx 0;
							}
							.balck {
								font-size: 28rpx;
								color: #000000;
							}

							.hui-se {
								display: flex;
								flex-direction: row;

								.li-number {
									color: #FF5A5F;
									padding-left: 8rpx;
								}
							}
						}
					}

					.right {
						flex: 1;
						display: flex;
						flex-direction: row;
						justify-content: flex-end;
						align-items: center;
						
						text {
							font-size: 20rpx;
						}

						.money {
							display: flex;
							flex-direction: column;
							justify-content: center;
							.red{
								color: #FF5A5F;
							}
							.green{
								color: #009D37;
							}
							.center{
								padding: 10rpx 0;
							}
							.hui{
								color: #666666;
							}
							text{
								text-align: right;
							}
						}
					}

					.red {
						color: #FF5A5F;
					}
				}
			}
		}

	}
</style>
