<template>
	<view class="newCustomer">
		<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
		 @clickItem="onClickItem"></tabControl>
		<view class="nav">
			<view class="nav-title">
				<view class="sum-number">
					会员总数{{total[current]}}位，共筛选{{list[current].length}}，已选{{selected}}
				</view>
				<view class="nav-radio">
					<text>全选</text>
					<u-checkbox-group @change="checkboxGroupChange">
						<u-checkbox v-model="sumValue[current]" shape="square"></u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</view>
		<swiper class="swiper" @change='scollSwiper' :current='current'>
			<swiper-item v-for="(item,index) in list" :key='index'>
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="list-data">
						<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
						 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
						 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
							<view class="li" v-for="(itemed,indexed) in item" :key="indexed" @click="customerOf(itemed)">
								<view class="left">
									<view class="img">
										<u-image width="100" border-radius='18' height="100" mode='aspectFit' :src="$imgFn(itemed.image)">
										</u-image>
									</view>
									<view class="name">
										<text>{{itemed.name}}</text>
										<text class="tob">{{itemed.mobile}}</text>
									</view>
								</view>

								<view class="right">
									<view class="checked">
										<u-checkbox-group>
											<u-checkbox v-model="itemed.checked" shape="circle"></u-checkbox>
										</u-checkbox-group>
									</view>
									<view class="date">
										<text class="t2">{{itemed.created_at}}</text>
									</view>

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
		getNewCustomer
	} from '../../api/customer.js'
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	export default {
		components: {
			tabControl,
			kScrollView
		},
		data() {
			return {
				sumValue: [false,false,false,false,false],
				page: [1,1,1,1,1],
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
				last_page:[ 0,0,0,0,0],
				style_input: {
					'background-color': '#ffffff'
				},
				total: [0,0,0,0,0],
				last: false,
				pull: [false,false,false,false,false],
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
				current: 2,
				items: [{
					name: '今天',
					status: 0
				}, {
					name: '7天',
					status: 1
				}, {
					name: '本月',
					status: 2
				}, {
					name: '30天',
					status: 3
				}, {
					name: '其他',
					status: 4
				}],
				showtime: false,
				showtime1: false,
				start_time: '',
				end_time: ''
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
			// 点击查看详情
			customerOf(item){
				uni.navigateTo({
					url: `/pages/customer/customer?id=${item.id}`
				})
			},
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
				let res = await getNewCustomer({
					...v,
					page: this.page[this.current],
					page_size: this.page_size
				})
				let today = ((new Date()).getTime()) / 1000;
				res.data.map((v) => {
					let e_time = 0;
					v['checked'] = false;
					v.mobile = v.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
					
				})
				this.list[this.current].push(...res.data)
				this.last_page[this.curren] = res.last_page
				// console.log(res);
				this.total[this.current] = res.total
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
					this.init(this.start_time,this.end_time)
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
							let date ={
								start_time:this.start_time,
								end_time:this.end_time
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
						// this.init(this.start_time,this.end_time)
					}
				}
				// console.log(this.current);
			},
			/// 开始时间
			confirmTime(v) {
				this.start_time = `${v.year}-${v.month}-${v.day}`;
				this.showtime1 = true;
				console.log(this.start_time);
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
		onLoad() {
			let date = new Date();
			this.start_time = this.$u.timeFormat(date, 'yyyy-mm-dd');
			this.end_time = this.$u.timeFormat(date, 'yyyy-mm-dd');
			let dated = this.$date.thisMonth();
			this.init(dated)
		}
	}
</script>

<style scoped lang="scss">
	.newCustomer {
		width: 100%;
		display: flex;
		flex-direction: column;
		height: 100%;
		position: absolute;
		.swiper {
			margin-top: 84rpx;
			// height: 100vh;
			height: 100%;
		}
		.nav {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: absolute;
			top: 84rpx;
			z-index: 99;

			.nav-title {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 10rpx 0;
				// height: 50rpx;
				padding-left: 20rpx;
				align-items: center;
				background-color: #f2f1f5;

				.nav-radio {
					display: flex;
					flex-direction: row;
					text {
						margin-right: 10rpx;
					}
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
			margin: 50rpx 0 80rpx 0;
			display: flex;
			flex-direction: column;

			.li {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0 20rpx 20rpx;
				border-bottom: 0.01rem solid #F5F5F5;

				.left {
					flex: 1;
					display: flex;
					flex-direction: row;

					.img {
						margin-right: 20rpx;
					}

					.name {
						display: flex;
						flex-direction: column;
						position: relative;

						.tob {
							position: absolute;
							bottom: 0;
							color: #C8C7CC;
							font-size: 20rpx;
						}
					}
				}

				.center {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.bg {
						padding: 2rpx 4rpx;
						border: 1rpx solid #DD524D;
						color: #DD524D;
						font-size: 20rpx;
						border-radius: 8rpx;
					}
				}

				.right {
					flex: 1;
					display: flex;
					flex-direction: row-reverse;

					// justify-content: center;
					.checked {
						margin-left: 20rpx;
					}

					.date {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						.t1 {
							font-size: 20rpx;
							color: #C8C7CC;
							text-align: right;
						}

						.t2 {
							font-size: 20rpx;
						}
					}
				}
			}
		}
	}
</style>
