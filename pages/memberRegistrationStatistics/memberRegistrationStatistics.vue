<template>
	<view class="memberRegistrationStatistics">
		<u-navbar back-icon-color='#ffffff' title="会员注册统计" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="arrow-down-fill" @click="showStrore" color="#ffffff" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<u-select v-model="show" mode="single-column" @confirm="confirmStrores" :list="strots"></u-select>
		<view class="date">
			<view class="box-nav">
				<view class="li" v-for="(item,index) in dates" :key="index" :class="active==index? 'active':''" @click="changeItem(index)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="box">
			<view class="list" v-for="(item,index) in list[active]" :key="index" @click="clickItem(item)">
				<view class="left">
					<text>{{item.day||item.mouth}}</text>
					<u-line-progress height='10' :percent="(item.num/sums[active])*100" :show-percent='false' :round="true"
					 active-color="#ff9900"></u-line-progress>
				</view>
				<view class="right">
					<text class="red">{{item.num}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store';
	import {
		registerCount
	} from '../../api/customer.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				show: false,
				strots: [], //店铺组
				page: 1,
				page_size: 10,
				store_id: 0,
				dates: ['日报', '月报'],
				active: 0,
				list: [0, 0],
				sums: [0, 0]
			}
		},
		methods: {
			// 初始化
			async init() {
				let res = await registerCount({
					store_id: this.store_id
				});
				this.list[0] = res.day;
				res.day.map((v) => {
					this.sums[0] += v.num
				})
				res.mouth.map((v) => {
					this.sums[1] += v.num
				})
				this.list[1] = res.mouth;
				console.log(this.list);
				this.$forceUpdate()
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
			async confirmStrores(e) {
				this.store_id = e[0].value
			},
			// nav
			changeItem(index) {
				this.active = index;
			},
			// 前往详情页面
			clickItem(item) {
				let date = ''
				console.log(item.day);
				if (item.day) {
					date = item.day
				}
				if (item.month) {
					date = item.month
				}
				uni.navigateTo({
					url: `/pages/customerCountDetails/customerCountDetails?store_id=${this.store_id}&date=${date}`
				})
			},
		},
		onLoad() {
			this.strored();
			if (store.state.store.store_id > 0) {
				this.store_id = store.state.store.store_id;
			};
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.memberRegistrationStatistics {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f3f2f4;

		.right_icon {
			margin-right: 30rpx;
		}

		.active {
			color: #FFFFFF;
			background-color: #55aaff;
		}

		.date {
			width: 100%;
			height: 80rpx;
			// background-color: #dbdadf;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: calc(84rpx + var(--status-bar-height));
			z-index: 99;

			.box-nav {
				width: 240rpx;
				display: flex;
				flex-direction: row;
				border: 2rpx solid #55aaff;
				color: #55aaff;
				border-radius: 18rpx;
				overflow: hidden;

				.li {
					padding: 5rpx 10rpx;
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-top: 80rpx;

			.list {
				width: 100%;
				padding: 20rpx;
				display: flex;
				flex-direction: row;
				background-color: #FFFFFF;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.left {
					width: 70%;
					display: flex;
					flex-direction: column;

					text {
						padding-bottom: 10rpx;
					}
				}

				.right {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					.red {
						color: #DD524D;
					}
				}
			}
		}

	}
</style>
