<template>
	<view class="pointLog">
		<view class="membered">
			<view class="left">
				<u-image width="70rpx" mode='aspectFit' border-radius="10" class="header_image" height="70rpx" :src="$cfg.domain+obj.image"></u-image>
				<text>{{obj.name}}</text>
			</view>
			<view class="right">
				<text>积分：{{obj.point}}</text>
			</view>
		</view>
		<view class="box">

			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :inBottom="pull" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list" v-for="(item,index) in list" :key="index">
					<view class="left">
						<text class="max_se">{{item.name}}</text>
						<text class="hui_se do">{{item.remarks}}</text>
						<text class="hui_se">{{item.created_at}}</text>
					</view>
					<view class="right">
						<text :class="item.point>0?'red':'green'">{{item.point}}</text>
						<text class="tb" v-if="item.type != 3">增加后：{{item.after_point}}</text>
						<text class="tb" v-else>减少后：{{item.after_point}}</text>
					</view>
				</view>
			</k-scroll-view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		getPointLog
	} from '../../api/customer.js'
	export default {
		data() {
			return {
				components: {
					kScrollView
				},
				obj: {},
				form: {
					customer_id: 0,
					page: 1,
					page_size: 10
				},
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
				stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				last_page: 0,
				total: 0,
				last: false,
				pull: false,
			}
		},
		methods: {
			async init() {
				let res = await getPointLog(this.form);
				res.data.map((v) => {
					if (v.type == 0) {
						v['name'] = "消费结账"
					} else if (v.type == 1) {
						v['name'] = "积分调整"
					} else if (v.type == 2) {
						v['name'] = "充值付款"
					} else if (v.type == 3) {
						v['name'] = "积分兑换"
					}
				})
				this.list.push(...res.data)
				this.last_page = res.last_page
				// console.log(res);
				this.total = res.total
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.form.page = 1;
				this.list = [];
				this.pull = false
				this.init()
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			handleLoadMore(stopLoad) {
				if (!this.pull) {
					if (this.form.page >= this.last_page) {
						this.$refs.uToast.show({
							title: '加载到底了',
							type: 'default',
							position: 'bottom'
						})
						this.pull = true

					} else {
						this.form.page++;
						this.init()
					}
				}
				stopLoad ? stopLoad() : '';
			},
		},
		onLoad(option) {
			this.obj = JSON.parse(decodeURIComponent(option.obj));
			this.form.customer_id = this.obj.id;
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.pointLog {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F5F5F5;

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;

			.list {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 0.01rem solid #EEEEEE;
				padding: 20rpx;
				background-color: #FFFFFF;

				.left {
					display: flex;
					flex-direction: column;

					.max_se {
						font-size: 30rpx;
						font-weight: 600;
					}

					.do {
						height: 40rpx;
					}

					.hui_se {
						font-size: 22rpx;
						color: #C0C0C0;
					}
				}

				.right {
					width: 40%;
					display: flex;
					flex-direction: column;
					position: relative;

					// align-items: center;
					text {
						text-align: right;
					}

					.tb {
						position: absolute;
						bottom: 0;
						right: 0;
					}

					.red {
						color: #DD524D;
						font-size: 30rpx;
					}

					.green {
						font-size: 30rpx;
						color: #4CD964;
					}

					.hui {
						font-size: 20rpx;
						color: #C0C0C0;
					}
				}
			}
		}

		.membered {
			width: 100%;
			display: flex;
			justify-content: space-between;
			height: 90rpx;
			background-color: #2979ff;
			flex-direction: row;

			.left {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				padding-left: 20rpx;

				text {
					color: #FFFFFF;
					margin: 0 20rpx;
				}
			}

			.right {
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				padding-right: 20rpx;
			}

		}
	}
</style>
