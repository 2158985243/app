<template>
	<view class="editAutoPromotion">
		<view class="box">
			<view class="item-box">
				<view class="left">
					启用会员等级自动晋升
				</view>
				<view class="right">
					<u-switch v-model="checked" @change="changed" active-value="1" inactive-value="0"></u-switch>
				</view>
			</view>
			<view class="item-box">
				<view class="left">
					晋升方式
				</view>
				<view class="right" @click="show = true">
					<text>{{type}}</text>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="item-box" v-for="(item,index) in list" :key="index">
				<view class="left">
					{{item.name}}
				</view>
				<view class="right">
					<text>需要</text>
					<u-input class="min" placeholder='' input-align='center' :clearable='false'  v-model="item.promotion_point" height='50' type="number" />
					<text>积分晋升</text>
				</view>
			</view>
		</view>
		<view class="bottom-nav">
			<text>注:如果会员等级不参与晋升，可将所需积分设置成比较大的数值</text>
			<view class="btn" @click="sure">
				保存
			</view>
		</view>
		<u-select v-model="show" mode="single-column"  :list="selet_list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	import {
		setAutoPromotion,
		getAutoPromotion
	} from '../../../api/customerLevel.js'
	export default {
		data() {
			return {
				type: '按累积积分提升',
				form: {
					promotion_switch: 0,
					promotion_type: 1,
					customer_level: []
				},
				selet_list: [{
					value: '1',
					label: '按累积积分提升'
				}, {
					value: '2',
					label: '按当前积分晋升'
				}, ],
				list: [],
				checked: false,
				show: false,
			}
		},
		methods: {
			async init() {
				let res = await getAutoPromotion()
				if (!res.code) {
					this.list = res.customer_level
					this.form.promotion_switch = res.promotion_switch
					this.form.promotion_type = res.promotion_type
					if(res.promotion_type == 1){
						this.type = '按累积积分提升'
					}else{
						this.type = '按当前积分晋升'
					}
					if(res.promotion_switch==0){
						this.checked = false
					}else{
						this.checked = true
					}
				}
			},
			changed(v) {
				this.form.promotion_switch = Number(v)
			},
			// 保存
			async sure() {
				this.list.map((v)=>{
					this.form.customer_level.push({id:v.id,promotion_point:v.promotion_point})
				})
				let res = await setAutoPromotion(this.form)
				if(!res.code){
					uni.navigateBack()
				}
			},
			confirm(v) {
				this.type = v[0].label;
				this.form.promotion_type = Number(v[0].value);
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.editAutoPromotion {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #E5E5E5;
		min-height: 100%;

		.bottom-nav {
			width: 100%;
			position: fixed;
			bottom: 0;
			display: flex;
			flex-direction: column;

			text {
				flex: 1;
				text-align: center;
				font-size: 20rpx;
				padding: 20rpx 0;
			}

			.btn {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 80rpx;
				background-color: #007AFF;
				color: #FFFFFF;
			}
		}

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 20rpx;

			.item-box {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;

				.right {
					display: flex;
					flex-direction: row;

					.min {
						width: 140rpx;
						border-bottom: 2rpx solid #007AFF !important;
					}
				}
			}
		}
	}
</style>
