<template>
	<view class="memberManagement">
		<u-navbar back-icon-color='#ffffff' :background="background">
			<view class="slot-wrap">
				<u-search class='search' height='60' @change="search" :show-action="false" :scan="true" shape="square" placeholder="请输入会员卡号、手机号或姓名"
				 v-model="keyword" @Inventory="handelScan"></u-search>
			</view>
			<template slot="right">
				<u-icon name="plus" @click="toAddMember" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="nav">
			<view class="nav-li">
				<view class="li-name">
					<view class="list" v-for="(item,index) in cus_list" :key="index" @click="cilckNav(index)">
						{{item}}
					</view>
				</view>
				<view class="shaixuan">
					<text>筛选</text>

				</view>
			</view>
			<view class="nav-title">
				<view class="sum-number">
					会员总数{{total}}位，共筛选{{list.length}}，已选{{selected}}
				</view>
				<view class="nav-radio">
					<text>全选</text>
					<u-checkbox-group @change="checkboxGroupChange">
						<u-checkbox v-model="sumValue" shape="square"></u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</view>

		<view class="list-data">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="li" v-for="(item,index) in list" :key="index" @click="customerOf(item)">
					<view class="left">
						<view class="img">
							<u-image width="100" border-radius='18' height="100" mode='aspectFit' :src="$cfg.domain+item.image">
							</u-image>
						</view>
						<view class="name">
							<text>{{item.name}}</text>
							<text class="tob">{{item.mobile}}</text>
						</view>
					</view>
					<view class="center">
						<view class="bg" v-if="item.debt>0">
							欠款
						</view>
						<view class="bg" v-if="item.expired">
							过期
						</view>
					</view>
					<view class="right">
						<view class="checked">
							<u-checkbox-group>
								<u-checkbox v-model="item.checked" shape="circle"></u-checkbox>
							</u-checkbox-group>
						</view>
						<view class="date">
							<text class="t2">{{item.c_time}}</text>
							<text class="t1">已注册{{item.days}}天</text>
						</view>

					</view>
				</view>
			</k-scroll-view>
			<u-toast ref="uToast" />
		</view>

		<view class="footers">
			发短信
		</view>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		customerList
	} from '../../api/customer.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				keyword: '',
				sumValue: false,
				cus_list: ['近30天生日', "优质会员", "余额>0", "欠款会员"],
				list: [],
				page: 1,
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
				last_page: 0,
				style_input: {
					'background-color': '#ffffff'
				},
				total: 0,
				last: false,
				pull: false,
			}
		},
		onLoad(option) {
			console.log(option)
			this.keyword = option.val;
		},
		computed: {
			selected() {
				let sum = 0
				this.list.map((v) => {
					if (v.checked) {
						sum++
					}
				})
				return sum
			}
		},
		methods: {
			checkboxGroupChange() {
				// console.log(this.sumValue);
				if (this.sumValue) {
					this.list.map((v) => {
						v.checked = true
					})
				} else {
					this.list.map((v) => {
						v.checked = false
					})
				}
			},
			search: function(value) {
				this.init({
					keyword: value
				})
			},
			handelScan: function() {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						// console.log('条码内容：' + res.result);
						this.keyword = res.result;
					}
				});
			},
			// 增加会员
			toAddMember() {
				uni.navigateTo({
					url: `/pages/addMembership/addMembership`
				})
			},
			// 初始化
			async init(v) {
				let res = await customerList({
					...v,
					page: this.page,
					page_size: this.page_size
				})
				if(this.page==1){
					this.list = []
				}
				let today = ((new Date()).getTime()) / 1000;
				res.data.map((v) => {
					let e_time = 0;
					v['checked'] = false;
					v.mobile = v.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
					v.c_time = this.$u.timeFormat(v.created_at, 'yyyy-mm-dd');
					e_time = today - Number(v.created_at)
					v.days = Math.floor(e_time / (3600 * 24))
				})
				this.list.push(...res.data)
				this.last_page = res.last_page
				// console.log(res);
				this.total = res.total
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = [];
				this.pull = false
				this.init()
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if (!this.pull) {
					if (this.page >= this.last_page) {
						this.$refs.uToast.show({
							title: '加载到底了',
							type: 'default',
							position: 'bottom'
						})
						this.pull = true

					} else {
						this.page++;
						this.init()
					}
				}
				stopLoad ? stopLoad() : '';
			},
			// 点击nav
			cilckNav(index) {
				console.log(index);
			},
			// 详情
			customerOf(item) {
				// console.log(item);
				uni.navigateTo({
					url: `/pages/customer/customer?id=${item.id}`
				})
			}
		},
		onLoad() {
		},
		onShow() {
			this.init();
		}
	}
</script>

<style scoped lang="scss">
	.memberManagement {
		width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;

		.right_icon {
			margin-right: 30rpx;
		}

		.slot-wrap {
			display: flex;
			align-items: center;
			width: 90%;

			.search {}

			/* 如果您想让slot内容占满整个导航栏的宽度 */
			/* flex: 1; */
			/* 如果您想让slot内容与导航栏左右有空隙 */
			/* padding: 0 30rpx; */
		}

		/deep/.u-border-bottom:after {
			border-bottom-width: 0;
		}

		.list-data {
			width: 100%;
			margin: 110rpx 0 80rpx 0;
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
					flex-direction: row;
					justify-content: center;
					align-items: center;

					.bg {
						padding: 2rpx 4rpx;
						border: 1rpx solid #DD524D;
						color: #DD524D;
						font-size: 20rpx;
						border-radius: 8rpx;
						margin: 0 5rpx;
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

		.nav {
			width: 100%;
			display: flex;
			flex-direction: column;
			height: 110rpx;
			position: fixed;
			top: calc(84rpx + var(--status-bar-height));
			z-index: 99;

			.nav-li {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				height: 60rpx;
				background-color: #2979ff;

				.li-name {
					display: flex;
					flex-direction: row;

					.list {
						height: 40rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 4rpx;
						border: 2rpx solid #dadada;
						color: #dadada;
						border-radius: 8rpx;
						margin-left: 20rpx;
						font-size: 20rpx;
					}
				}

				.shaixuan {
					color: #FFFFFF;
					margin-right: 20rpx;
				}
			}

			.nav-title {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				// padding: 20rpx;
				height: 50rpx;
				padding-left: 20rpx;
				align-items: center;
				background-color: #edecf1;

				.nav-radio {
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
	}
</style>
