<template>
	<view class="pointAdjust">
		<view class="membered">
			<view class="left">
				<u-image width="70rpx" mode='aspectFit' border-radius="10" class="header_image" height="70rpx" :src="$imgFn(obj.image)"></u-image>
				<text>{{obj.name}}</text>
			</view>
			<view class="right">
				<text>积分：{{obj.point}}</text>
			</view>
		</view>
		<view class="box">
			<view class="list-item">
				<text>当前积分</text>
				<u-input v-model="obj.point" :disabled="true" :clearable="false" placeholder="请输入当前积分" type="number" />
			</view>
			<view class="list-item">
				<text>调整积分</text>
				<u-input v-model="form.point" @input="input" :clearable="false" placeholder="正数为增加积分,负数为减少积分" type="text" />
			</view>
			<view class="list-item">
				<text>调整后积分</text>
				<u-input v-model="moneyed" :clearable="false" :disabled="true" placeholder="请输入调整后金额" type="number" />
			</view>
			<view class="list-item">
				<text>备注说明</text>
				<u-input v-model="form.remarks" :clearable="false" placeholder="请输入补充说明" type="text" />
			</view>
			<view class="radios">
				<u-checkbox-group>
					<u-checkbox @change="checkboxChange" v-model="item.checked" class="rod" v-for="(item, index) in group" :key="index" :name="item.name">{{item.name}}</u-checkbox>
				</u-checkbox-group>
			</view>
		</view>
		<u-toast ref="uToast" />
		<view class="btn" @click="sure">
			保存
		</view>
	</view>
</template>

<script>
	import {
		pointAdjust
	} from '../../api/customer.js'
	export default {
		data() {
			return {
				obj: {},
				form: {
					customer_id: 0,
					point: "",
					remarks: "",
					is_sms: 0,

				},
				group: [{
					name: '短信通知',
					checked: false,
				}, ],
				money_val: ''
			}
		},
		computed: {
			moneyed() {
				return Number(this.obj.point) + Number(this.form.point)
			}
		},
	
		methods: {
			checkboxChange(v){
				if(v.value){
					this.form.is_sms==1
				}else{
					this.form.is_sms==0
					
				}
			},
			input(v) {
				if (v != '') {
					if (!/^((-?([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?))|-)$/.test(v)) {
						this.$nextTick(() => {
							this.form.point = this.money_val
						})
					} else {
						this.money_val = this.$u.deepClone(v);
					}
				}
			},
			async sure() {
				if (this.form.point == 0 || this.form.point == "") {
					this.$refs.uToast.show({
						title: '调整积分不为0',
						type: 'default',
						position: 'center'
					})
				} else {

					let res = await pointAdjust(this.form);
					if (!res.code) {
						uni.navigateBack()
					}
				}
			}
		},
		onLoad(option) {
			this.obj = JSON.parse(decodeURIComponent(option.obj));
			this.form.customer_id = this.obj.id;
		}
	}
</script>

<style scoped lang="scss">
	.pointAdjust {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #ebebeb;

		.btn {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			height: 80rpx;
			background-color: #007AFF;
			align-items: center;
			position: fixed;
			color: #FFFFFF;
			bottom: 0;
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

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 20rpx;

			.radios {
				width: 100%;
				display: flex;
				height: 80rpx;
				padding: 20rpx;
				background-color: #fff;

				.rod {
					padding-left: 30rpx;
				}
			}

			.list-item {

				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 10rpx 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #EEEEEE;

				text {
					width: 160rpx;
				}
			}
		}
	}
</style>
