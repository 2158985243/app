<template>
	<view class="barcode">
		<view class="nav">
			<text>颜色</text>
			<text>尺码</text>
			<text class="code">条码</text>
			<text>扫码</text>
		</view>
		<view class="box" v-for="(item,index) in list.barcode_array" :key='index'>
			<view class="list" v-for="(item1,index1) in item.data">
				<text class="conts">{{index1==0? list.colorDa[index].name : ''}}</text>
				<text class="conts">{{list.sizerDa[index1].name}}</text>
				<text class="code" @click="hiddes(item1.barcode,list.colorDa[index].name,list.sizerDa[index1].name,index,index1)">{{item1.barcode}}</text>
				<view class="conts" @click="scanFnc(index,index1)">
					<u-icon name="scan" color="#2979ff" size="48"></u-icon>
				</view>
			</view>
		</view>
		<!-- 编辑分类-->
		<u-popup v-model="showedit" mode="center">
			<view class="pop">
				<text class="titl">{{daName.colorName+' '+daName.sizeName }}</text>
				<view class="nav">
					<u-input class='inputs' placeholder="请输入条码" v-model="barcode" type="text" :border="border" />
				</view>
			</view>
			<view class="btn">
				<u-button :hair-line="false" @click="abrogate" class="btnChild">取消</u-button>
				<u-button :hair-line="false" @click='ensure' class="btnChild">确定</u-button>
			</view>
		</u-popup>
		<view class="btn">
			<u-button type="primary" class="btn1" @click="save">保存</u-button>
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	export default {
		data() {
			return {
				list: [],
				barcode: '',
				border: true,
				showedit: false,
				daName: {
					colorName: '',
					sizeName: ''
				},
				ind: 0,
				ind1: 0,
			}
		},
		methods: {
			init() {
				this.list = store.state.barcodeDa;
				// console.log(this.list);
			},
			// 取消
			abrogate() {
				this.showedit = false;
			},
			// 确定
			ensure() {
				this.showedit = false;
				this.list.barcode_array[this.ind].data[this.ind1].barcode = this.barcode;
			},
			hiddes(barcode, colorName, sizeName, index, index1) {
				this.ind = index;
				this.ind1 = index1;
				this.daName = {
					colorName: colorName,
					sizeName: sizeName
				};
				this.barcode = barcode;
				this.showedit = true;
			},
			save() {
				let obj ={barcode_array:{}}
				obj.barcode_array= this.list.barcode_array
				this.$store.commit('barcodeAction', {
					barcodeDa: obj
				});
				uni.navigateBack();
			},
			scanFnc(index, index1) {
				let that = this;
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						that.list.barcode_array[index].data[index1].barcode = res.result;
					}
				});
			}
		},
		onLoad() {
			this.init()
		},
		onShow() {

		}
	}
</script>

<style scoped lang="scss">
	.barcode {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		// background-color: #F8F8F8;

		.nav {
			width: 100%;
			display: flex;
			height: 60rpx;
			line-height: 60rpx;
			// background-color: #ebebeb;

			text {
				width: 20vw;
				text-align: center;
			}

			.code {
				text-align: center;
				width: 40vw;
			}
		}

		.box {
			border-bottom: 4rpx solid #F8F8F8;

			.list {
				width: 100%;
				display: flex;
				height: 60rpx;
				line-height: 60rpx;

				.conts {
					width: 20vw;
					text-align: center;
				}

				.code {
					text-align: center;
					width: 40vw;
				}
			}
		}

		.pop {
			width: 70vw;
			height: 15vh;

			// display: flex;
			// justify-content: center;
			// align-items: center;
			.titl {
				display: block;
				width: 100%;
				font-size: 28rpx;
				padding: 20rpx;
				text-align: center;
			}

			.nav {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 20rpx;

				text {
					padding-right: 10rpx;
				}
			}

			.del {
				display: block;
				width: 100%;
				padding-top: 50rpx;
				text-align: center;
			}

			.inputs {
				width: 80%;
				margin: 20rpx auto;
			}



		}

		.btn {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.btnChild {
			flex: 1;
			border-radius: 0 !important;
		}

		.btn1 {
			width: 100%;
			position: fixed;
			bottom: 0;
			z-index: 99;
			border-radius: 0 !important;

		}
	}
</style>
