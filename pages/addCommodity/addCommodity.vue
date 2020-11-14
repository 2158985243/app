<template>
	<view class="addCommodity">
		<view class="box">
			<view class="form_item">
				<text>名称</text>
				<u-input placeholder='请输入商品名称' v-model="form.name" type="text" />
				<u-icon name="arrow-right" class="man_r" @tap="toProductName" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>货号</text>
				<u-input placeholder='请输入商品货号' v-model="form.number" type="text" />
			</view>
			<view class="form_item">
				<text>颜色</text>
				<u-input placeholder='请选择颜色' @tap="toColors" :disabled='true' type='text' v-model="colors_name" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>尺码</text>
				<u-input placeholder='请选择尺码' @tap="toSizes" :disabled='true' type='text' v-model="size_name" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
		</view>

		<view class="box">
			<view class="form_item">
				<text>采购价</text>
				<u-input placeholder='0.00' v-model="form.purchase_price" type="number" />
			</view>
			<view class="form_item">
				<text>零售价</text>
				<u-input placeholder='0.00' v-model="form.retail_price" type="number" />
			</view>
			<view class="form_item">
				<text>会员价</text>
				<u-input placeholder='0.00' v-model="form.customer_price" type='number' />
			</view>
		</view>

		<view class="box">
			<view class="form_item">
				<text>分类</text>
				<u-input placeholder='请选择商品分类' @tap="toCategory" :disabled='true' v-model="category" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="form_item">
				<text>供应商</text>
				<u-input placeholder='请选择供应商' @tap="toChooseSupplier" :disabled='true' v-model="supplier" type="text" />
				<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
			</view>
			<view class="box1">
				<view class="form_item1">
					<text>上传图片</text>
					<u-upload width="100" height='100' upload-text='' image-mode='aspectFit' :limitType='limit' :action="action+'/api/upload'"
					 :header="header" :name="formData.type" :form-data="formData" @on-success="onSuccess" :file-list="fileList"
					 :auto-upload="true" :max-size="5 * 1024 * 1024" max-count="6" :show-progress="false" @on-error='onError'
					 del-bg-color='#000000'>
					</u-upload>
				</view>
			</view>
		</view>

		<view class="box">
			<view class="form_item">
				<text>商品条码</text>
				<u-input placeholder='扫条形码获取商品信息' v-model="form.barcode" type="text" />
				<u-icon name="scan" color="#2979ff" @tap="toBarcode" size="50"></u-icon>
			</view>
			<view class="form_item">
				<text>单品条码</text>
				<u-input placeholder='' v-model="barcode_tit" :disabled='true' type="text" />
				<text class="set" @click="toBarcodes">设置</text>
				<u-toast ref="uToast" />
			</view>
		</view>
		<view class="box">
			<view class="form_item">
				<text>初始库存</text>
				<u-input placeholder='' :disabled='true' v-model="form.remarks" type="text" />
				<text class="set">设置</text>
			</view>
			<view class="form_item">
				<text>库存预警</text>
				<u-switch v-model="checked1" @change="warning" active-value="1" inactive-value="0"></u-switch>
			</view>
		</view>
		<view class="box">
			<view class="form_item">
				<text>显示顺序</text>
				<text>{{form.sort}}</text>
				<!-- <u-input placeholder='请输入备注信息' v-model="form.remarks" type="text" /> -->
			</view>
			<view class="form_item">
				<text>支持积分兑换</text>
				<u-switch v-model="checked2" @change="exchange" active-value="1" inactive-value="0"></u-switch>
				<text v-if="checked2" class="min_exchange">所需积分:</text>
				<u-input v-if="checked2" placeholder='0' class="border_bt" v-model="form.exchange_value" type="number" />

			</view>
			<view class="form_item">
				<text>商品启用状态</text>
				<u-switch v-model="checked3" @change="changeStatus" active-value="1" inactive-value="0"></u-switch>
			</view>
			<view class="form_item3" @click="hidde" v-if="!his">
				<text>显示更多</text>
				<u-icon name="arrow-down" color="#2979ff" size="34"></u-icon>
			</view>
			<view class="form_item2" @click="hidde" v-else>
				<text>隐藏信息</text>
				<u-icon name="arrow-down" color="#2979ff" size="34"></u-icon>
			</view>
			<view class="box" v-show="his">
				<view class="form_item">
					<text>品牌</text>
					<u-input placeholder='请选择品牌' @tap="toTrademark" :disabled='true' type='text' v-model="trademark_name" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<view class="form_item">
					<text>年份</text>
					<u-input placeholder='请选择年份' @tap="toYear" :disabled='true' type='text' v-model="form.year" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<u-picker mode="time" v-model="showtime" @confirm="confirmTime" :params="params"></u-picker>
				<view class="form_item">
					<text>季节</text>
					<u-input placeholder='请选择季节' @tap="toSeason" :disabled='true' type='text' v-model="form.season" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<u-select v-model="showSeason" @confirm="confirm" :list="list"></u-select>
				<view class="form_item">
					<text>单位</text>
					<u-input placeholder='请选择单位' @tap="toUnitList" :disabled='true' type='text' v-model="unitList_name" />
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>

			<view class="box" v-show="his">
				<view class="form_item">
					<text>材质</text>
					<u-input placeholder='请输入或选择材质' type='text' v-model="form.material" />
					<u-icon name="arrow-right" class="man_r" color="#cccccc" size="28"></u-icon>
				</view>
				<view class="form_item">
					<text>风格</text>
					<u-input placeholder='请输入或选择风格' type='text' v-model="form.style" />
					<u-icon name="arrow-right" class="man_r" color="#cccccc" size="28"></u-icon>
				</view>
				<view class="form_item">
					<text>款式</text>
					<u-input placeholder='请输入或选择款式' type='text' v-model="form.model" />
					<u-icon name="arrow-right" class="man_r" color="#cccccc" size="28"></u-icon>
				</view>
				<view class="form_item">
					<text>产地</text>
					<u-input placeholder='请输入或选择产地' type='text' v-model="form.origin" />
					<u-icon name="arrow-right" class="man_r" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<view class="box bottoms" v-show="his">
				<view class="form_item">
					<text>执行标准</text>
					<u-input placeholder='请输入或选择执行标准' type='text' v-model="form.standard" />
					<u-icon name="arrow-right" class="man_r" color="#cccccc" size="28"></u-icon>
				</view>
				<view class="form_item">
					<text>安全类型</text>
					<u-input placeholder='请输入或选择执行标准' type='text' v-model="form.security" />
					<u-icon name="arrow-right" class="man_r" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
		</view>

		<view class="btn">
			<u-button type="primary" class="btn" @tap="save">保存</u-button>
		</view>
	</view>
</template>

<script>
	import urls from '../../api/configuration.js'
	import store from '@/store'
	import {
		goodsAdd
	} from '../../api/goods.js'
	export default {
		data() {
			return {
				form: {
					name: '',
					number: '',
					color_id: [],
					size_id: [],
					purchase_price: '',
					retail_price: '',
					customer_price: '',
					goods_category_id: '',
					supplier_id: '',
					main_image: '',
					images: [],
					barcode: '',
					warning: 0,
					warning_max: 0,
					warning_min: 0,
					sort: 100,
					exchange: 0,
					exchange_value: 0,
					status: 0,
					barcode_array: [],
					brand_id: 0,
					year: '',
					season: '',
					unit_id: 0,
					material: '',
					style: '',
					model: '',
					origin: '',
					standard: '',
					security: ''
				},
				showSeason: false,
				showtime: false,
				storeName: '',
				limit: ['png', 'jpg', 'jpeg'],
				formData: {
					type: '',
					path: ''
				},
				fileList: [],
				action: '',
				header: {
					token: ''
				},
				checked1: true,
				checked2: false,
				checked3: true,
				color: '',
				size: '',
				category: '',
				supplier: '',
				barcode_tit: '', //单品条码提示
				colors_name: '',
				size_name: '',
				trademark_name: '',
				unitList_name: '',
				list: [{
						value: '1',
						label: '春'
					},
					{
						value: '2',
						label: '夏'
					},
					{
						value: '3',
						label: '秋'
					},
					{
						value: '4',
						label: '冬'
					}
				],
				his: false,
				params: {
					year: true,
					month: false,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				barcodeDa: {
					colorDa: [],
					sizerDa: []
				},
				exit: false
			}
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.quit()
			return true;
		},
		methods: {
			quit() {
				uni.showModal({
					title: '提示',
					content: '商品还未保存，确认要退出？',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/commodityManagement/commodityManagement'
							})
						} else if (res.cancel) {
							return true;
						}
					}
				});
			},
			// 时间返回fn
			confirmTime(v) {
				// console.log(v);
				this.form.year = v.year;
			},
			// 季节返回fn
			confirm(v) {
				console.log(v);
				this.form.season = v[0].label;
			},
			// 点击选择年份
			toYear() {
				this.showtime = true;
			},
			// 点击选择季节
			toSeason() {
				this.showSeason = true;
			},
			hidde() {
				this.his = !this.his;
			},
			// 
			async save() {
				if (!store.state.barcodeDa.barcode_array) {
					this.form.barcode_array = []
					this.form.color_id.map((v, i) => {
						this.form.barcode_array.push({
							color_id: v,
							data: []
						})
						this.form.size_id.map((v1, i1) => {
							this.form.barcode_array[i].data.push({
								size_id: v1,
								barcode: ''
							})
						})
					})
				} else {
					this.form.barcode_array = store.state.barcodeDa.barcode_array;
				}
				let obj = {}
				for (let key in this.form) {
					if (this.form[key] || this.form[key] === 0) {
						obj[key] = this.form[key];
					}
				}
				this.$store.commit('colorDaAction', {
					colorDa: ''
				});
				this.$store.commit('sizerDaAction', {
					sizerDa: ''
				});
				let res = await goodsAdd(obj);
				if (!res.code) {
					uni.navigateTo({
						url: '/pages/commodityManagement/commodityManagement'
					})
				}
				// console.log(res);
			},
			// 上传图片成功fnc
			onSuccess(data, index, lists, name) {
				console.log(data, index, lists, name);
				this.form.images = []
				lists.map((v, i) => {
					if (i == 0) {
						this.form.main_image = v.response.data.url;
					} else {
						this.form.images.push(v.response.data.url)
					}
				})
			},
			// 上传图片失败fnc
			onError(res, index, lists, name) {
				console.log(res, index, lists, name);
			},
			// 商品启用状态开关
			changeStatus(v) {
				// console.log(v);
				this.form.status = Number(v);
			},
			// 积分兑换开关
			exchange(v) {
				// console.log(v);
				this.form.exchange = Number(v);
			},
			// 预警开关
			warning(v) {
				// console.log(v);
				this.form.warning = Number(v);
			},
			toChooseSupplier() {
				uni.navigateTo({
					url: '/pages/chooseSupplier/chooseSupplier'
				})
			},
			// 前往商品库页面
			toProductName() {
				uni.navigateTo({
					url: '/pages/productName/productName'
				})
			},
			// 前往尺码页面
			toSizes() {
				uni.navigateTo({
					url: '/pages/sizes/sizes'
				})
			},
			// 前往颜色页面
			toColors() {
				uni.navigateTo({
					url: '/pages/colors/colors'
				})
			},
			// 前往商品管理页面
			toCategory() {
				uni.navigateTo({
					url: '/pages/category/category'
				})
			},
			toTrademark() {
				uni.navigateTo({
					url: '/pages/trademark/trademark'
				})
			},
			toUnitList() {
				uni.navigateTo({
					url: '/pages/unitList/unitList'
				})
			},
			// 商品条码扫码
			toBarcode() {
				let that = this;
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						that.form.barcode = res.result;
					}
				});
			},
			init() {
				const userMessage = uni.getStorageSync('userMessage');
				this.action = urls.baseURL;
				this.header.token = "Bearer " + userMessage.token
				this.formData.type = "store";
				this.formData.path = "store";

			},
			toBarcodes() {
				if (this.barcodeDa.colorDa.length > 0 && this.barcodeDa.sizerDa.length > 0) {

					this.form.barcode_array = []
					this.form.color_id.map((v, i) => {
						this.form.barcode_array.push({
							color_id: v,
							data: []
						})
						this.form.size_id.map((v1, i1) => {
							this.form.barcode_array[i].data.push({
								size_id: v1,
								barcode: ''
							})
						})
					})
					this.barcodeDa['barcode_array'] = this.form.barcode_array;
					this.$store.commit('barcodeAction', {
						barcodes: this.barcodeDa
					});
					uni.navigateTo({
						url: '/pages/barcode/barcode'
					})

				} else {
					this.$refs.uToast.show({
						title: '请选择颜色和尺码后再操作！',
						type: 'defaul'
					})
				}
			},
		},
		onLoad() {
			this.init();
			uni.$on("produtName", (res) => {
				if (res) {
					// this.storeName  = res.name;
					this.form.name = res;
				}
			});
			uni.$on("colorDatum", (res) => {
				if (res) {
					// console.log(res);
					this.barcodeDa.colorDa = res;
					// uni.setStorageSync('colorDa', res);
					this.$store.commit('colorDaAction', {
						colorDa: res
					});
					let str = [];
					res.map((v, i) => {
						this.form.color_id.push(v.id);
						str.push(v.name);
					})
					this.colors_name = str.join(',');
				}
			});
			uni.$on("sizeDatum", (res) => {
				if (res) {
					// console.log(res);
					this.$store.commit('sizerDaAction', {
						sizerDa: res
					});
					let str = [];
					res.map((v, i) => {
						this.form.size_id.push(v.id);
						str.push(v.name);
						v['barcode'] = ''
					})
					this.barcodeDa.sizerDa = res;
					this.size_name = str.join(',');
				}
			});
			uni.$on("categoryDatum", (res) => {
				if (res) {
					console.log(res);
					// let str = [];
					// res.map((v, i) => {
					this.form.goods_category_id = res.id;
					// str.push(v.name);
					this.category = res.name;
					// })
					// this.size_name = str.join(',');
				}
			});
			uni.$on("supplierDatum", (res) => {
				if (res) {
					// let str = [];
					// res.map((v, i) => {
					this.form.supplier_id = res.id;
					// str.push(v.name);
					this.supplier = res.name;
					// })
					// this.size_name = str.join(',');
				}
			});
			uni.$on("trademarkDatum", (res) => {
				if (res) {
					// let str = [];
					// res.map((v, i) => {
					this.form.brand_id = res.id;
					// str.push(v.name);
					this.trademark_name = res.name;
					// })
					// this.size_name = str.join(',');
				}
			});
			uni.$on("unitListDatum", (res) => {
				if (res) {
					console.log(res);
					// let str = [];
					// res.map((v, i) => {
					this.form.unit_id = res.id;
					// str.push(v.name);
					this.unitList_name = res.name;
					// })
					// this.size_name = str.join(',');
				}
			});


		}
	}
</script>

<style lang="scss" scoped>
	.addCommodity {
		position: relative;
		width: 100%;
		// height: 100%;
		background-color: #F8F8F8;

		.btn {
			width: 100%;
			position: fixed;
			bottom: 0;
			z-index: 99;
			border-radius: 0 !important;

		}

		.box {
			margin-bottom: 20rpx;

			.form_item {
				padding-right: 20rpx;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
				margin-bottom: 2rpx;
				height: 85rpx;

				text {
					width: 220rpx;
					// text-align: left;
					padding-left: 20rpx;
				}

				.min_exchange {
					width: 150rpx;
				}

				.set {
					width: 80rpx;
					color: #2979ff;
				}

				.border_bt {
					border-bottom: 0.01rem solid #C0C0C0;
				}

				.man_r {
					border-left: 0.01rem solid #e3e3e3;
					padding: 28rpx 15rpx 28rpx 30rpx;
					// margin: 0 auto;
				}

			}

			.bottoms {
				margin-bottom: 80rpx;
			}

			.form_item2 {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 20rpx;
				background-color: #FFFFFF;
				height: 85rpx;

				text {
					color: #2979ff;

				}
			}

			.form_item3 {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 2rpx;
				background-color: #FFFFFF;
				height: 85rpx;
				margin-bottom: 70rpx;

				text {
					color: #2979ff;

				}
			}

			.box1 {
				margin-bottom: 20rpx;

				.form_item1 {
					padding-right: 20rpx;
					display: flex;
					align-items: center;
					background-color: #FFFFFF;
					margin-bottom: 2rpx;
					height: 280rpx;

					/deep/.u-add-tips {
						margin-top: 0;
					}

					text {
						width: 180rpx;
						// text-align: left;
						padding-left: 20rpx;
					}

					/deep/.u-delete-icon {
						top: 0;
						right: 0;
						width: 28rpx;
						height: 28rpx;
					}
				}
			}
		}
	}
</style>
