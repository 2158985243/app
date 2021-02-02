<template>
	<view class="patternOfPayment">
		<u-navbar back-icon-color='#ffffff' title="支付方式" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="plus" @click="toAddPatternOfPayment" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<text class="tit">系统内置支付方式</text>
		<block v-for="(item,index) in list1" :key="index">
			<block v-if="ip==1&&item.name!='扫码支付'">
				<view class="box" v-if="(ip==1&&item.name!='欠款') || ip==0" @tap='toEditPatternOfPayment(item)'>
					<text>{{item.name}}</text>
				</view>
			</block>
		</block>
		<text class="tit">用户自定义支付方式</text>
		<view class="box" @tap="toEditPatternOfPayment(item)" v-for="(item,index) in list2" :key="item.id">
			<text>{{item.name}}</text>
			<u-icon class='right' name="arrow-right" color="#cccccc" size="28"></u-icon>
		</view>
	</view>
</template>

<script>
	import {
		accountList
	} from '../../api/account.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				list1: [],
				list2: [],
				iq: 0,
				ip: 0,
			}
		},

		methods: {

			async init() {
				let res = await accountList()
				// console.log(res);
				this.list1 = []
				this.list2 = []
				res.map((v, i) => {
					if (v.system == 1) {
						this.list1.push(v)
					} else {
						this.list2.push(v)
					}
				})
			},
			toAddPatternOfPayment() {
				uni.navigateTo({
					url: `/pages/addPatternOfPayment/addPatternOfPayment`
				})
			},
			toEditPatternOfPayment(item) {
				console.log(item);
				if (!this.iq) {
					if (!item.system) {

						uni.navigateTo({
							url: `/pages/editPatternOfPayment/editPatternOfPayment?id=${item.account_id}&name=${item.name}`
						})
					}
				} else {
					uni.$emit('patternOfPayment', item)
					uni.navigateBack()
				}
			}
		},
		onLoad(query) {
			this.iq = query.iq
			if (query.ip) {
				this.ip = query.ip

			}
		},
		onShow() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.patternOfPayment {
		height: 100%;
		background-color: #eeeeee;

		.right_icon {
			margin-right: 20rpx;
		}

		.right {
			position: absolute;
			right: 20rpx;
			top: 35%;

		}

		.tit {
			display: block;
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			text-indent: 0.5em;
		}

		.box {
			position: relative;
			background-color: #FFFFFF;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 2rpx solid #eeeeee;
			text-indent: 1em;
		}
	}
</style>
