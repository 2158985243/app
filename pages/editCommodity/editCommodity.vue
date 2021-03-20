<template>
	<view class="editCommodity">
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
					<text class="upload">上传图片</text>
					<view class="img">
						<view class="list-img" v-for="(item,index) in list_img" :key="index" @longtap='longtap(index)'>
							<text class="main-img" v-if="index==0">主</text>
							<u-icon class="icon" @click="del(index)" name="close-circle-fill" color="#000000" size="32"></u-icon>
							<u-image v-if="list_img.length>0"  @click='previewImg($cfg.domain+item)' width="100rpx"
							 border-radius="14" image-mode='aspectFit' height="100rpx" :src="item|filterImage"></u-image>
						</view>
						<view class="plus" @click="uploadImg" v-if="list_img.length<6">
							<u-icon name="plus" color="#606266" size="36"></u-icon>
						</view>

					</view>
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
			<!-- <view class="form_item">
				<text>初始库存</text>
				<u-input placeholder='' :disabled='true' v-model="form.remarks" type="text" />
				<text class="set">设置</text>
			</view> -->
			<view class="form_item">
				<text>库存预警</text>
				<u-switch v-model="checked1" @change="warning" active-value="1" inactive-value="0"></u-switch>
				<text v-if="checked1" class="bounds">上限:</text>
				<u-input v-if="checked1" placeholder='0' class="bounded" v-model="form.warning_max" type="number" />
				<text v-if="checked1" class="bounds">下限:</text>
				<u-input v-if="checked1" placeholder='0' class="bounded" v-model="form.warning_min" type="number" />

			</view>
		</view>
		<view class="box">
			<view class="form_item">
				<text>显示顺序</text>
				<u-input placeholder='' v-model="form.sort" type="number" />
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
			<u-button class="stbn" @tap="delgoods">删除</u-button>
			<u-button type="primary" class="stbn" @tap="save">保存</u-button>
		</view>
		<cus-previewImg ref="cusPreviewImg" :circular="true" :duration="400" :list="ImgList" />
	</view>
</template>

<script>
	import url from '../../api/configuration.js'
	import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
	import store from '@/store'
	import {
		goodsEdit,
		goods,
		goodsDel
	} from '../../api/goods.js'
	export default {
		components: {
			cusPreviewImg
		},
		data() {
			return {
				form: {
					name: '',
					number: '', //
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
					type: 'goods',
					path: 'goods'
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
				exit: false,
				id: 0,
				list_img: [],
				ImgList: [],
			}
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.quit()
			return true;
		},
		filters: {
			filterImage(v) {
				if (!v) {
					return v;
				}
				if (!/^http/.test((v))) {
					return url.domain + v;
				}
				return v;
			}
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				// this.avatar = path;
				// 可以在此上传到服务端
				uni.uploadFile({
					url: url.baseURL + '/api/upload', //仅为示例，非真实的接口地址
					filePath: path,
					name: 'user',
					header: {
						token: "Bearer " + this.userMessage.token
					},
					formData: {
						type: 'user',
						path: 'user'
					},
					success: (uploadFileRes) => {
						this.ImgList.push(url.domain + JSON.parse(uploadFileRes.data).data.url);
						this.list_img.push(JSON.parse(uploadFileRes.data).data.url);

					}
				});
			})
		},
		methods: {
			previewImg(url) { // 点击预览图片
				console.log(url);
				this.$refs.cusPreviewImg.open(url) // 传入当前选中的图片地址
			},
			// 删除图片
			del(index) {
				// console.log(1);
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否删除该图片？',
					success: function(res) {
						if (res.confirm) {
							_this.ImgList.splice(index, 1);
							_this.list_img.splice(index, 1);

						} else if (res.cancel) {
							return true;
						}
					}
				});
			},
			// 裁剪
			uploadImg() {
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/pages/avatar/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 300,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			quit() {
				uni.showModal({
					title: '提示',
					content: '商品还未保存，确认要退出？',
					success: function(res) {
						if (res.confirm) {
							uni.navigateBack()
						} else if (res.cancel) {
							return true;
						}
					}
				});
			},
			// 
			onUploaded(lists, name) {},
			longtap(index) {
				let _this = this
				if(index!=0){
					uni.showModal({
						title: '提示',
						content: '是否将当前图片设置为主图？',
						success: async (res) => {
							if (res.confirm) {
								_this.ImgList.splice(0, 1, ..._this.ImgList.splice(index, 1, _this.ImgList[0]));
								_this.list_img.splice(0, 1, ..._this.list_img.splice(index, 1, _this.list_img[0]));
								_this.$forceUpdate()
							} else {
								// 如果不存在before-remove钩子，
							}
						}
					});
				}
			},
			// 时间返回fn
			confirmTime(v) {
				this.form.year = v.year;
			},
			// 季节返回fn
			confirm(v) {
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
			// 保存
			async save() {
				if (this.list_img.length > 0) {
					this.form.images = []
					this.form.main_image = this.list_img[0]
					this.list_img.map((v, i) => {
						if (i > 0) {
							this.form.images.push(v)
						}
					})
				}
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
					this.barcodeDa.goods_spec.map((v, i) => {
						this.form.barcode_array.map((v1, i1) => {
							if (v.color_id == v1.color_id) {
								v1.data.map((j, k) => {
									if (v.size_id == j.size_id) {
										j.barcode = v.barcode;
										j['id'] = v.id
									}
								})
							}
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
				this.$store.commit('goodsStockFn', {
					goodsStockDa: []
				});
				this.$store.commit('barcodeAction', {
					barcodeDa: {}
				});
				let res = await goodsEdit(this.id, obj);
				if (!res.code) {
					uni.navigateBack()
				}
			},
			// 商品启用状态开关
			changeStatus(v) {
				this.form.status = Number(v);
			},
			// 积分兑换开关
			exchange(v) {
				this.form.exchange = Number(v);
			},
			// 预警开关
			warning(v) {
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
						that.form.barcode = res.result;
					}
				});
			},
			// 初始化数据
			async good() {
				let res = await goods(this.id)
				console.log(res);
				this.form.name = res.name;
				this.form.number = res.number;
				this.form.purchase_price = res.purchase_price;
				this.form.retail_price = res.retail_price;
				this.form.customer_price = res.customer_price;
				if (res.supplier) {
					this.category = res.supplier.name
				}
				this.form.supplier_id = res.supplier_id;
				if (res.goods_category) {
					this.supplier = res.goods_category.name;
				}
				this.form.goods_category_id = res.goods_category_id;
				this.form.main_image = res.main_image;
				this.form.images = res.images;
				this.form.barcode = res.barcode;
				this.form.warning = res.warning;
				this.form.warning_max = res.warning_max;
				this.form.warning_min = res.warning_min;
				this.form.sort = res.sort;
				this.form.exchange = res.exchange;
				this.form.exchange_value = res.exchange_value;
				this.form.status = res.status;
				if (!res.status) {
					this.checked3 = false
				}
				this.form.brand_id = res.goods_info.brand_id;
				if (res.goods_info.brand) {
					this.trademark_name = res.goods_info.brand.name;
				}
				this.form.year = res.goods_info.year;
				this.form.season = res.goods_info.season;
				this.form.unit_id = res.goods_info.unit_id;
				if (res.goods_info.unit_id) {
					this.unitList_name = res.goods_info.unit.name;
				}
				this.form.material = res.goods_info.material;
				this.form.style = res.goods_info.style;
				this.form.model = res.goods_info.model;
				this.form.origin = res.goods_info.origin;
				this.form.standard = res.goods_info.standard;
				this.form.security = res.goods_info.security;

				let arrSize = [];
				let arrColor = [];
				res.color.map((v, i) => {
					this.form.color_id.push(v.id);
					arrColor.push(v.name)
				})
				this.colors_name = arrColor.join(',')
				res.size.map((v, i) => {
					this.form.size_id.push(v.id);
					arrSize.push(v.name)
				})
				this.size_name = arrSize.join(',')
				if(res.main_image){
					this.ImgList.push(this.$cfg.domain + res.main_image)
					this.list_img.push(res.main_image)
				}
				if (res.images) {
					res.images.map((v) => {
						this.ImgList.push(this.$cfg.domain + v)
						this.list_img.push(v)
					})
				}
				this.barcodeDa.colorDa = res.color;
				this.barcodeDa.colorDa.map((v) => {
					v['checked'] = true;
				})
				this.barcodeDa.sizerDa = res.size;
				this.barcodeDa.sizerDa.map((v) => {
					v['choice'] = true;
				});
				this.barcodeDa['goods_spec'] = res.goods_spec;
				this.$store.commit('colorDaAction', {
					colorDa: this.barcodeDa.colorDa
				});
				this.$store.commit('sizerDaAction', {
					sizerDa: this.barcodeDa.sizerDa
				});
			},
			init() {
				this.userMessage = uni.getStorageSync('userMessage');
				this.action = url.baseURL;
				this.header.token = "Bearer " + this.userMessage.token
			},
			// 设置单品条码
			toBarcodes() {
				if (this.barcodeDa.colorDa.length > 0 && this.barcodeDa.sizerDa.length > 0) {
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
						this.barcodeDa.goods_spec.map((v, i) => {
							this.form.barcode_array.map((v1, i1) => {
								if (v.color_id == v1.color_id) {
									v1.data.map((j, k) => {
										if (v.size_id == j.size_id) {
											j.barcode = v.barcode;
											j['id'] = v.id
										}
									})
								}
							})
						})
						this.barcodeDa['barcode_array'] = this.form.barcode_array;
						this.$store.commit('barcodeAction', {
							barcodeDa: this.barcodeDa
						});
					}
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
			async delgoods() {
				uni.showModal({
					title: '提示',
					content: '是否删除此商品？',
					success: async (res) => {
						if (res.confirm) {
							let res = await goodsDel(this.id)
							if (!res.code) {
								uni.navigateBack()
							}
						} else if (res.cancel) {}
					}
				});

			}
		},
		onLoad(query) {
			this.id = query.id
			this.init();
			this.good()
			uni.$on("produtName", (res) => {
				if (res) {
					this.form.name = res;
				}
			});
			uni.$on("colorDatum", (res) => {
				if (res) {
					this.barcodeDa.colorDa = res;
					this.$store.commit('colorDaAction', {
						colorDa: res
					});
					let str = [];
					this.form.color_id = []
					res.map((v, i) => {
						this.form.color_id.push(v.id);
						str.push(v.name);
					})
					this.colors_name = str.join(',');
					// 处理条码和库存
					if (this.barcodeDa.colorDa.length > 0 && this.barcodeDa.sizerDa.length > 0) {
						if (store.state.barcodeDa.barcode_array) {
							let arr = []
							this.form.color_id.map((v, i) => {
								let bl = true
								this.form.barcode_array.map((v1) => {
									if (v == v1.color_id) {
										arr.push(v1)
										bl = false
									}
								})
								// 增加的颜色条码
								if (bl) {
									arr.push({
										color_id: v,
										data: []
									})
									this.form.size_id.map((v1, i1) => {
										arr[i].data.push({
											size_id: v1,
											barcode: ''
										})
									})
								}
							})
							let obj = {
								barcode_array: arr
							}
							this.$store.commit('barcodeAction', {
								barcodeDa: obj
							});
						}
						if (store.state.goodsStockDa.length > 0) {
							let arr = []
							store.state.goodsStockDa.map((v, i) => {
								arr.push({
									store_id: v.store_id,
									data: []
								})
								v.data.map((v1, i1) => {
									let bl = true
									this.form.color_id.map((v2, i2) => {
										if (v1.color_id == v2) {
											bl = false
											arr[i].data[i1].push(v1)
										}
									})
									// 增加的颜色库存
									if (bl) {
										this.form.color_id.map((v2, i2) => {
											v1.push({
												color_id: v2,
												data: []
											})
											this.form.size_id.map((v3, i3) => {
												v1.data.push({
													size_id: v3,
													stock: ''
												})
											})
										})
									}
								})
							})
							this.$store.commit('goodsStockFn', {
								goodsStockDa: arr
							});
						}
					}

				}
			});
			uni.$on("sizeDatum", (res) => {
				if (res) {
					this.$store.commit('sizerDaAction', {
						sizerDa: res
					});
					let str = [];
					this.form.size_id = []
					res.map((v, i) => {
						this.form.size_id.push(v.id);
						str.push(v.name);
						v['barcode'] = ''
					})
					this.barcodeDa.sizerDa = res;
					this.size_name = str.join(',');
					// 处理条码和库存
					if (this.barcodeDa.colorDa.length > 0 && this.barcodeDa.sizerDa.length > 0) {
						if (store.state.barcodeDa.barcode_array) {
							let arr = []
							this.form.size_id.map((v, i) => {
								this.form.barcode_array.map((v1, i1) => {
									let bl = true
									v1.data.map((v2) => {
										if (v == v1.size_id) {
											arr.push(v2)
											bl = false
										}
									})
									if (bl) {
										arr.push({
											color_id: v,
											data: []
										})
										this.form.size_id.map((v3, i3) => {
											arr[i1].data.push({
												size_id: v3,
												barcode: ''
											})
										})
									}
								})

							})
							let obj = {
								barcode_array: arr
							}
							this.$store.commit('barcodeAction', {
								barcodeDa: obj
							});
						}
						if (store.state.goodsStockDa.length > 0) {
							let arr = []
							store.state.goodsStockDa.map((v, i) => {
								arr.push({
									store_id: v.store_id,
									data: []
								})
								v.data.map((v1, i1) => {
									arr[i].data[i1].push({
										color_id: v1.color_id,
										data: []
									})
									v1.data.map((v3, i3) => {
										let bl = true
										this.form.size_id.map((v2, i2) => {
											if (v3.size_id == v2) {
												arr[i].data[i1].data[i3].push(v3)
												bl = false
											}
										})
										// 增加的尺码库存
										if (bl) {
											this.form.size_id.map((v5, i5) => {
												v3.data.push({
													size_id: v5,
													stock: ''
												})
											})
										}
									})

								})
							})
							this.$store.commit('goodsStockFn', {
								goodsStockDa: arr
							});
						}
					}

				}
			});
			uni.$on("categoryDatum", (res) => {
				if (res) {
					this.form.goods_category_id = res.id;
					this.category = res.name;
				}
			});
			uni.$on("supplierDatum", (res) => {
				if (res) {
					this.form.supplier_id = res.id;
					this.supplier = res.name;
				}
			});
			uni.$on("trademarkDatum", (res) => {
				if (res) {
					this.form.brand_id = res.id;
					this.trademark_name = res.name;
				}
			});
			uni.$on("unitListDatum", (res) => {
				if (res) {
					this.form.unit_id = res.id;
					this.unitList_name = res.name;
				}
			});


		}
	}
</script>

<style lang="scss" scoped>
	.editCommodity {
		position: relative;
		width: 100%;
		// height: 100%;
		background-color: #F8F8F8;
		
		.btn {
			width: 100%;
			position: fixed;
			bottom: 0;
			z-index: 99;
			display: flex;

			.stbn {
				border-radius: 0 !important;
				flex: 1;
			}

			uni-button:after {
				border-radius: 0 !important;
			}


		}


		.box {
			margin-bottom: 20rpx;

			.form_item {
				padding-right: 20rpx;
				display: flex;
				flex-direction: row;
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

				.bounds {
					width: 90rpx;
				}

				.bounded {
					width: 120rpx;
					border-bottom: 1rpx solid #cccccc !important;
				}

				.border_bt {
					border-bottom: 1rpx solid #cccccc !important;
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
					padding: 20rpx;
					display: flex;
					flex-direction: column;
					// align-items: center;
					background-color: #FFFFFF;
					margin-bottom: 2rpx;

					/deep/.u-add-tips {
						margin-top: 0;
					}

					.upload {
						width: 100%;
						padding: 10rpx 0;
						// text-align: left;
					}

					/deep/.u-delete-icon {
						top: 0;
						right: 0;
						width: 28rpx;
						height: 28rpx;
					}

					.img {
						width: 100%;
						display: flex;
						flex-direction: row;
						align-items: center;

						.list-img {
							margin-right: 20rpx;
							position: relative;

							.main-img {
								position: absolute;
								left: 0;
								top: 0;
								background-color: #007AFF;
								color: #FFFFFF;
								font-size: 20rpx;
								transform: scale(0.85);
								padding: 4rpx;
								z-index: 99;
							}

							.icon {
								position: absolute;
								right: 0;
								top: -6rpx;
								z-index: 99;
							}
						}

						.plus {
							background-color: #f4f5f6;
							width: 100rpx;
							height: 100rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}
		}
	}
</style>
