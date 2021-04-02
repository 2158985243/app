<template>
	<view class="pointEdit">
		<view class="box">
			<view class="item-list">
				<text>消费</text>
				<u-input v-model="form.money" class="borders" placeholder=" " :disabled="form.disabled" :clearable="false" type="number" />
				<text>元，获得</text>
				<u-input v-model="form.point" class="borders" placeholder=" " :disabled="form.disabled" :clearable="false" type="number" />
				<text>积分</text>
			</view>
			<view class="item-checked">
				<text class="borde">设置默认</text>
				<u-switch v-model="checked" size="40" active-value="1" inactive-value="0" @change="changed"></u-switch>
			</view>
		</view>
		<view class="btn" >
			
			<view class="sc" v-if="!form.system" @click="del">
				删除
			</view>
			<view class="bc" @click="btnClick">
				保存
			</view>
			
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		pointEdit,
		pointDel
	} from '../../api/point.js'
	export default {
		data() {
			return {
				checked: false,
				form:{
					money: '',
					point: '',
					default: 0,
					disabled:false
				}
			}
		},
		methods: {
			changed(v) {
				this.form.default = v
			},
			async btnClick() {
				if (this.money == '') {
					this.$refs.uToast.show({
						title: '请输入消费金额',
						type: 'default',
						position: 'bottom'
					})
				} else if (this.point == "") {
					this.$refs.uToast.show({
						title: '请输入获得积分',
						type: 'default',
						position: 'bottom'
					})
				} else {
					let res = await pointEdit(this.form.id,{
						money: this.form.money,
						point: this.form.point,
						default: this.form.default
					})
					if (!res.code) {
						uni.navigateBack()
					}
				}
			},
			del(){
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '是否删除此积分倍率？',
					success: async (res) => {
						if (res.confirm) {
							let res = await pointDel(_this.form.id);
							if (!res.code) {
								uni.navigateBack()
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		},
		onLoad(option) {
			this.form = JSON.parse(decodeURIComponent(option.item));
			if(this.form.default){
				this.checked = true
			}
			if(this.form.system){
				this.form.disabled = true;
			}
		}
	}
</script>

<style scoped lang="scss">
	.pointEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #efefef;

		.btn {
			width: 100%;
			display: flex;
			flex-direction: row;
			height: 80rpx;
			position: fixed;
			bottom: 0;
			.bc{
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #007AFF;
				color: #FFFFFF;
			}
			.sc{
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #b5b5b5;
				color: #FFFFFF;
			}
		}

		.box {
			width: 100vw;
			display: flex;
			flex-direction: column;

			.item-list {
				width: 100vw;
				display: flex;
				flex-direction: row;
				align-items: center;
				background-color: #FFFFFF;
				padding: 20rpx;
				padding-right: 35%;
				border-bottom: 0.01rpx solid #EEEEEE;

				/deep/.u-input__input{
					width: 100rpx !important;
					border-bottom: 1rpx solid #007AFF;
				}
				/deep/.uni-input-input {
					// width: 100rpx !important;
					border-bottom: 1rpx solid #007AFF;
					text-indent: 0.5em;
				}
			}

			.item-checked {
				display: flex;
				flex-direction: row;
				align-items: center;
				// justify-content: center;
				background-color: #FFFFFF;
				padding: 20rpx;

				.borde {
					font-weight: 600;
					padding-right: 20rpx;
				}
			}
		}
	}
</style>
