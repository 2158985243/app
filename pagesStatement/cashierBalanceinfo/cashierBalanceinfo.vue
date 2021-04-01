<template>
	<view class="cashierBalanceinfo">
		<u-navbar back-icon-color='#ffffff' title="收支结余详情" :background="background" title-color="#ffffff">
		</u-navbar>
		<text class="lan">{{form.start_time}}-{{form.end_time}}</text>
		<view class="header-nav">

			<view class="nav right-border" :class="acitve==index? 'acitve':''" v-for="(item,index) in list_title" @click="itemClick(item,index)">
				<text class="hui">{{item.name}}</text>
				<text class="org">{{type[index].money}}</text>
			</view>
		</view>
		<view class="list-item">
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="li-data" v-for="(item,index) in list" @click="toCustomer(item)">
					<view class="left">
						<text>{{item.customer? item.customer.name:'散客'}}</text>
						<text class="lan">{{item.account_name}}</text>
					</view>
					<view class="right">
						<view class="rg-item">
							<view class="rg-top">
								<text class="tlt-name">{{item.title_name? item.title_name:''}}</text>
								<text class="ft-lan">&yen;{{item.money}}</text>
							</view>
							<view class="rg-bottom">
								<text>{{item.remarks? item.remarks:''}}</text>
							</view>
						</view>
						<u-icon name="arrow-right" v-show='form.type !="debt"' color="#cccccc" size="28"></u-icon>
					</view>
				</view>
			</k-scroll-view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {
		balanceDetails
	} from '../../api/manage.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				form: {},
				acitve: 0,
				list_title: [{
						name: '营业额',
						type: 'turnover'
					},
					{
						name: '充值',
						type: 'recharge'
					},
					{
						name: '还款',
						type: 'repayment'
					},
					{
						name: '会员消费',
						type: 'consume'
					},
					{
						name: '支出',
						type: 'expend'
					},
					{
						name: '欠款',
						type: 'debt'
					},
				],
				page: 1,
				page_size: 10,
				list: [],
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--到底了--',
				touchHeight: 50,
				height: 0,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true,
				last_page: 0,
				pull: false,
			}
		},
		methods: {

			// 初始化
			async init() {
				let res = await balanceDetails({
					...this.form,
					page: this.page,
					page_size: this.page_size
				});
				console.log(res);
				if (this.page == 1) {
					this.list = []
				}
				res.data.map((v) => {
					let name = [];
					if (v.sales_payment) {
						v.sales_payment.map((v1) => {
							if (v1.account_id > 0) {

								name.push(v1.account.name)

							} else {
								name.push('储值卡')
							}
						})
					} else {
						if (v.account_id > 0) {
							if (this.form.type == 'repayment') {

								name.push(`${v.time} | ${v.account.name}`)
							} else {

								name.push(v.account.name)
							}
						} else {
							if (v.debt_type >= 0) {
								name.push(v.time + ' | 欠款')
							} else {

								name.push('储值卡')
							}
						}
					}
					v['account_name'] = name.join(' | ');
					if (v.reward_point == 0) {
						v['title_name'] = '储值卡充值'
					} else if (v.reward_point == 1) {
						v['title_name'] = '欠款充值'
					} else if (v.debt_type == 0) {
						v['title_name'] = '消费欠款'
					} else if (v.debt_type == 1) {
						v['title_name'] = '充值欠款'
					} else if (this.form.type == 'turnover' || this.form.type == 'consume') {
						v['title_name'] = '普通消费'
					}
					if (this.form.type == 'recharge') {
						v['remarks'] = `充值金额:${(Number(v.money)-Number(v.reward_money)).toFixed(2)}元,赠送:${v.reward_money}元`
					}
				})
				this.list.push(...res.data);
				this.last_page = res.last_page
			},
			// 点击某个type
			itemClick(item, index) {
				this.acitve = index;
				console.log(item.type);
				this.form.type = item.type;
				this.page = 1;
				this.list = [];
				this.init()
			},
			//详情 
			toCustomer(item) {
				console.log(item);
				if (this.form.type == 'turnover' || this.form.type == 'consume') {
					uni.navigateTo({
						url: `/pages/warenverbrauch/warenverbrauch?id=${item.id}`
					})
				} else if (this.form.type == 'recharge') {
					uni.navigateTo({
						url: `/pages/storedDetails/storedDetails?id=${item.id}`
					})
				} else if (this.form.type == 'expend') {
					uni.navigateTo({
						url: `/pages/expenseCancellation/expenseCancellation?id=${item.id}`
					})
				} else if (this.form.type == 'repayment') {
					uni.navigateTo({
						url: `/pages/repaymentDetails/repaymentDetails?id=${item.id}`
					})
				}
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = []
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
			},
		},
		onLoad(query) {
			const item = JSON.parse(decodeURIComponent(query.item));
			this.acitve = item.index
			this.form = item.form;
			this.type = item.type
		},
		onShow() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.cashierBalanceinfo {
		width: 100%;
		min-height: 100%;
		background-color: #F5F5F5;
		display: flex;
		flex-direction: column;

		.lan {
			width: 100%;
			height: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #2979ff;
			color: #FFFFFF;
		}

		/deep/.u-border-bottom:after {
			border-bottom-width: 0;
		}

		.header-nav {
			width: 100%;
			height: 300rpx;
			display: flex;
			flex-wrap: wrap;
			background-color: #FFFFFF;
			position: fixed;
			top: calc(var(--status-bar-height) + 84rpx);
			z-index: 99;

			.acitve {
				background-color: #2979ff;

				text {
					color: #FFFFFF !important;
				}
			}

			.nav {
				width: 33.3%;
				height: 148rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-bottom: 1rpx solid #E5E5E5;

				.hui {
					color: #999999;
					padding-bottom: 10rpx;
				}

				.org {
					color: #F0AD4E;
				}

			}

			.right-border {
				border-right: 1rpx solid #E5E5E5;
			}
		}

		.list-item {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-top: 240rpx;

			.li-data {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx;
				border-bottom: 0.01rem solid #EEEEEE;
				background-color: #FFFFFF;

				.left {
					display: flex;
					flex-direction: column;

					.lan {
						background-color: #007AFF;
						color: #FFFFFF;
						border-radius: 6rpx;
						height: 40rpx;
						font-size: 24rpx;
						margin-top: 10rpx;
						transform: scale(0.9);
						padding: 0 6rpx;
					}
				}

				.right {
					display: flex;
					flex-direction: row;

					.rg-item {
						display: flex;
						flex-direction: column;
						align-items: center;

						.rg-top {
							flex: 1;
							display: flex;
							justify-content: flex-end;
							align-items: center;

							.ft-lan {
								color: #007AFF;
								font-size: 20rpx;
							}

							.tlt-name {
								padding: 6rpx;
								font-size: 20rpx;
								border-radius: 8rpx;
								color: #C6AA6C;
								background-color: #FEF6E5;
								margin-right: 25rpx;
								transform: scale(0.90);
							}
						}

						.rg-bottom {
							flex: 1;
							padding-top: 10rpx;
							text-align: right;

							text {
								font-size: 20rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
