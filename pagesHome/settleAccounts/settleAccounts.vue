<template>
	<view class="settleAccounts">
		<view class="member-select">
			<view class="member" @click="toMemberSelect" v-if="!members.name">
				<text>会员选择</text>
				<u-icon name="arrow-down-fill" color="#ffffff" size="24"></u-icon>
			</view>
			<view class="membered" v-else>
				<view class="left">
					<u-image width="70rpx" mode='aspectFit' border-radius="10" class="header_image" height="70rpx"
						:src="$imgFn(members.image)"></u-image>
					<text>{{members.name}}</text>
					<u-icon name="close-circle-fill" color="#ffffff" @click="clear" size="30"></u-icon>
				</view>
				<view class="right">
					<text>余额：{{members.balance}}</text>
				</view>

			</view>
		</view>
		<view class="mains">
			<!-- 商品列表 -->
			<view class="goods-data">
				<view class="list" v-for="(item,index) in list" :key="index">
					<view class="goods-list" v-for="(itemGoods,indexGoods) in item.data" :key="indexGoods">
						<view class="dole" v-if="itemGoods.quantity>0" @click="togoodsOf(item,index,indexGoods)">
							<view class="goods-left">
								<u-image width="100rpx" mode='aspectFit' border-radius="10" class="header_image"
									height="100rpx" :src="$imgFn(item.goodsOf.main_image)"></u-image>
								<view class="item-left">
									<text class="hei">{{item.goodsOf.name}} <text
											class="hui">{{item.goodsOf.number}}</text></text>
									<text class="zc">{{item.name}}-{{itemGoods.size.name}}</text>
									<text class="lan"
										v-if="itemGoods.discount == 1&&discount == 1">&yen;{{itemGoods.retail_price}}<text
											class="underline">&yen;{{item.goodsOf.retail_price}}</text></text>
									<text class="lan" v-else>&yen;{{itemGoods.retail_price}} <text class="underline"
											v-if="itemGoods.discount != 1">&yen;{{item.goodsOf.retail_price}}</text><text
											v-if="itemGoods.discount !=1">(会员折扣{{(itemGoods.discount*10).toFixed(2)}}折)</text>
									</text>
								</view>
							</view>
							<view class="goods-right">
								x{{itemGoods.quantity}}
							</view>
						</view>
					</view>
				</view>

				<view class="add-goods">
					<view class="add-left" @click="toResale">
						<u-icon name="plus-circle-fill" color="#2979ff" size="30"></u-icon>
						<text>增加商品</text>
					</view>
					<view class="add-right">
						<text>共{{sum_number}}件商品</text>
						<text>合计&yen;{{sum_money.toFixed(2)}}</text>
					</view>
				</view>
			</view>

			<!-- 其他 -->
			<view class="box">
				<view class="item-li" @click="show = !show">
					<view class="box-left">

						<text>整单折扣</text>
					</view>
					<view class="box-right">
						<text class="lan" v-if="!discounts">{{"启用"}}</text>
						<text class="lan" v-else>{{(Number(discounts)*10).toFixed(2)+'折' }}</text>
						<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
					</view>
				</view>
				<view class="item-li">
					<view class="box-left">
						<text>优惠券</text>

					</view>
					<view class="box-right">
						<text>0</text>
						<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
					</view>
				</view>
				<view class="item-li">
					<view class="box-left">
						<text>优惠金额</text>
						<u-input v-model="form.discount_money" @input="inputValue" :clearable="false" height="50"
							placeholder='请输入优惠金额' type="number" />
					</view>
					<view class="box-right">
					</view>
				</view>
			</view>
			<view class="box">
				<view class="item-li" @click="toSelecSalesperson">
					<view class="box-left">
						<text>销售员</text>
					</view>
					<view class="box-right">
						<text>{{staff}}</text>
						<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
					</view>
				</view>
				<view class="item-li" @click="hiddenTime" v-if="message_list.sales_can_choose_date.value==1">
					<view class="box-left">
						<text>销售日期</text>
					</view>
					<view class="box-right">
						<text>{{form.business_time}}</text>
						<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
					</view>
				</view>
				<u-picker mode="time" v-model="showtime" @confirm="confirmTime" :default-time="form.business_time"
					:params="params"></u-picker>
				<view class="item-li">
					<view class="box-left">
						<text>获得积分</text>
						<u-input v-model="test" @click="toIntegralList" height="50" :disabled="true"
							:placeholder='placeholder' type="number" />
					</view>
					<view class="box-right">
						<text class="lan" v-if="form.reward_point>0">{{form.reward_point}}</text>
						<u-icon name="arrow-right" color="#cccccc" size="30"></u-icon>
					</view>
				</view>
			</view>
			<view class="box">
				<view class="item-li">
					<view class="box-left">
						<text>备注</text>
						<u-input v-model="form.remarks" :clearable="false" height="50" placeholder='请输入备注'
							type="number" />
					</view>
					<view class="box-right">
					</view>
				</view>
				<view class="radios">
					<u-checkbox-group>
						<u-checkbox v-model="item.checked" class="rod" v-for="(item, index) in group" :key="index"
							:name="item.name">{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
			<!-- 折扣列表 -->
			<u-popup mode="bottom" v-model="show" z-index="99" @open="open" height="600rpx">
				<view class="contents">
					<view class="fot">
						<view class="left-content">
							<view class="edt" @click="edt">
								<text v-if="!set_del">编辑</text>
								<text v-else>完成</text>
							</view>
						</view>

						<view class="title">
							整单折扣
						</view>
						<view class="qx" @click="abolish">
							取消
						</view>


					</view>
					<scroll-view scroll-y="true" style="height: 440rpx;">
						<view class="bods">
							<view class="hezi" v-for="(item,index) in discount_list" :key="index"
								@click="itemClick(item,index)" :class="active==index? 'active':''">
								{{(Number(item.discount)*10).toFixed(2)}}折
								<view class="red-del" v-if="set_del" @click="discountedDel(item,index)">
									<u-icon name="close-circle-fill" color="red" size="40"></u-icon>
								</view>
							</view>
							<view class="hezi" @click="addDiscount">
								+增加
							</view>
						</view>
					</scroll-view>
					<view class="confrim-btn">
						<view class="btn" @click="notarize">
							确认
						</view>
					</view>
				</view>
			</u-popup>

		</view>
		<!-- 增加折扣 -->
		<u-popup mode="center" v-model="showed" border-radius="20" width="70%" height="340rpx">
			<view class="discounted">
				<view class="discounted-title">
					输入折扣
				</view>
				<view class="input">
					<u-input v-model="value" :clearable="false" placeholder="9折即0.9,无折扣即1" input-align="center"
						type="number" :border="true" />
				</view>
				<view class="discounted-footer">
					<view class="qx" @click="abrogate">
						取消
					</view>
					<view class="qd" @click="ensure">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 输入密码 -->
		<u-popup mode="center" v-model="show_psd" border-radius="20" width="70%" height="340rpx">
			<view class="discounted">
				<view class="discounted-title">
					请输入会员密码
				</view>
				<view class="input">
					<u-input v-model="password" :clearable="false" placeholder="请输入六位数字密码" input-align="center"
						type="password" :border="true" />
				</view>
				<view class="discounted-footer">
					<view class="qx" @click="abrogated">
						取消
					</view>
					<view class="qd" @click="ensured">
						确定
					</view>
				</view>
			</view>
		</u-popup>


		<!-- 编辑收款 -->
		<u-popup mode="center" v-model="show_edit" border-radius="20" width="70%" height="340rpx">
			<view class="discounted">
				<view class="discounted-title">
					修改收款金额
				</view>
				<view class="input">
					<u-input v-model="money_edit" :clearable="false" placeholder="请输入金额" input-align="center"
						type="number" :border="true" />
				</view>
				<view class="discounted-footer">
					<view class="qx" @click="show_edit = false">
						取消
					</view>
					<view class="qd" @click="ensureEdit">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 积分抵现 -->
		<u-popup mode="center" v-model="user_point" border-radius="20" width="80%" height="360rpx">
			<view class="discounted">
				<view class="discounted-title">
					总积分:{{members.point}}
				</view>
				<view class="input">
					<text>使用积分</text>
					<u-input v-model="used_point" @input='inputChange' :clearable="false" placeholder="请输入本次使用积分"
						height='50' type="number" :border="true" />
				</view>
				<view class="input">
					<text>抵扣现金</text>
					<u-input v-model="point_used_as_money" :clearable="false" placeholder="可抵扣现金" :disabled='true'
						height='50' type="number" :border="true" />
				</view>
				<view class="discounted-footer">
					<view class="qx" @click="user_point = false">
						取消
					</view>
					<view class="qd" @click="enpoint">
						确定
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 支付列表 -->
		<u-popup mode="bottom" v-model="showPayment" z-index="99" @open="open">
			<!-- -->
			<view class="used-point" v-if="form.customer_id>0 && message_list.point_exchange_money_switch.value==1">
				<text class="left-point">可使用{{form.used_point}}积分抵{{form.point_used_as_money}}元</text>
				<view class="right-point">
					<text>-&yen;{{form.point_used_as_money}}</text>
					<u-checkbox-group>
						<u-checkbox @change="checkboxChange" v-model="checked"></u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
			<view class="contents">
				<view class="fot">
					<view class="left-content">
						<text>收款：</text>
						<text class="red">&yen;{{form.money}}</text>
					</view>
					<view class="right-content" @click="combination">
						组合支付
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 300rpx;">
					<view class="bods">
						<block v-for="(item,index) in paymentList" :key="index">
							<view class="pay" v-if="item.checked" @click="paymentItem(item,index)">
								<view class="pay-box">
									<u-icon name="rmb-circle" color="#aaaa7f" size="60"></u-icon>
									<text class="name">{{item.name}}</text>
									<u-icon name="checkmark-circle-fill" class="top-right" v-if="activePay==index"
										color="#ff9a26" size="32"></u-icon>
								</view>
							</view>
						</block>
					</view>
				</scroll-view>
				<view class="confrim-btn">
					<view class="btn" @click="paySure">
						确定
					</view>
				</view>
			</view>
		</u-popup>

		<view class="footer">
			<view class="footer-left">
				<view class="sk">
					<view class="max">
						<text>收款</text>
						<text class="lan-se">&yen;{{form.money}}</text>
					</view>
					<view class="min" v-if="form.erasure_money!=0">
						<text>已抹零</text>
						<text>&yen;{{form.erasure_money}}</text>
					</view>
				</view>
				<u-icon name="edit-pen-fill" @click="showEditMoney" color="#ff557f" size="40"></u-icon>
			</view>
			<view class="footer-right">
				<view class="hei" @click="sure(0)">
					挂单
				</view>
				<view class="lan" @click="sure(1)">
					收款
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		configList
	} from '../../api/member.js'
	import store from '@/store'
	import {
		accountList
	} from '../../api/account.js'
	import {
		salesOrderAdd
	} from '../../api/salesOrder.js'
	import {
		pointGetDefault
	} from '../../api/point.js'
	import {
		discountAdd,
		discountList,
		discountDel
	} from '../../api/discount.js'
	export default {
		data() {
			return {
				point_used_as_money: '',
				used_point: '',
				user_point: false,
				checked: false,
				rebate: 0,
				list: [],
				sum_number: 0,
				sum_money: 0,
				message_list: {
					sales_can_choose_date: {},
					sales_staff_required: {},
				},
				form: {
					customer_id: 0,
					discount_money: '',
					staff_id: 0,
					money: 0,
					reward_point: 0,
					pay_type: 0,
					point_used_as_money: 0,
					used_point: 0,
					payment: [],
					status: 0,
					erasure_money: 0,
					goods: [],
					remarks: '',

				},
				group: [{
					name: '打印小票',
					checked: false,
				}, {
					name: '短信通知',
					checked: false,
				}, ],
				show: false,
				showed: false,
				showtime: false,
				showPayment: false, //支付方式显示
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				staff: '', //销售员
				discounts: '', //打折
				unit: 1, //积分换算
				integral: 1,
				placeholder: '',
				test: '',
				// members: {
				// 	name: ''
				// },
				discount: 0,
				discount_list: [],
				value: '',
				active: 9999,
				set_del: false,
				paymentList: [], //支付方式列表
				activePay: 9999, //支付方式下标
				payItem: {}, //支付方式
				show_edit: false, //启动修改金额
				money_edit: '', //修改金额
				show_psd: false,
				password: '',
				members_data: {
					name: ''
				}
			}
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.quit()
			return true;
		},
		computed: {
			members() {
				let obj = {}
				if (store.state.customerObj.name != "") {
					obj = store.state.customerObj
					this.members_data = obj
					this.discount = Number(obj.customer_level.discount)
					this.$forceUpdate()
				} else {
					obj = this.members_data
				}
				return obj
			},
			goods() {
				return store.state.specificationOfGoods;
			},
			toMoney() {
				let money = 0;
				if (this.discounts) {
					money = (Number(this.sum_money) * Number(this.discounts)).toFixed(2)
					this.form.discount_money = (Number(this.sum_money) - money).toFixed(2)
				} else {
					money = Number(this.sum_money) - Number(this.form.discount_money)
				}

				return money.toFixed(2)
			}
		},
		methods: {
			// 点击了返回键
			quit() {
				this.$store.commit('customerFn', {
					customerObj: this.members_data
				})
				uni.navigateBack()
			},
			inputChange() {
				if (this.used_point > this.members.point) {
					this.used_point = this.members.point
					this.point_used_as_money = (this.used_point / this.message_list.point_exchange_money.value).toFixed(2)
					this.$refs.uToast.show({
						title: `最多可以兑换${this.members.point}抵现${this.point_used_as_money}元`,
						type: 'default',
						position: 'bottom'
					})
				} else {
					this.point_used_as_money = (this.used_point / this.message_list.point_exchange_money.value).toFixed(2)
				}
			},
			// 确定积分抵现
			enpoint() {
				this.user_point = false
				if (this.checked) {
					this.form.used_point = this.$u.deepClone(this.used_point)
					this.form.point_used_as_money = this.$u.deepClone(this.point_used_as_money)
					this.form.money = (this.form.money - Number(this.form.point_used_as_money)).toFixed(2)
					this.used_point = ''
					this.point_used_as_money = ''
				}
			},
			// 打开积分抵现
			checkboxChange(e) {
				console.log(e);
				if (e.value) {
					this.user_point = true;
				}
				this.form.money = Number(this.form.money) + Number(this.form.point_used_as_money)
				this.form.used_point = 0
				this.form.point_used_as_money = 0
			},
			// 优惠金额
			inputValue(v) {
				this.form.discount_money = v
				let er_money = this.$u.deepClone(Number(this.sum_money) - Number(this.form.discount_money))
				if (this.message_list.sales_not_count_small_change.value == 1) {
					this.form.money = Math.floor(er_money)
					this.form.erasure_money = er_money - Math.floor(er_money)
				} else if (this.message_list.sales_not_count_small_change.value == 2) {
					this.form.money = Math.floor(er_money * 10) / 10
					this.form.erasure_money = er_money - Math.floor(er_money * 10) / 10
				} else if (this.message_list.sales_not_count_small_change.value == 3) {
					this.form.money = Math.round(er_money)
					this.form.erasure_money = er_money - Math.round(er_money)
				} else if (this.message_list.sales_not_count_small_change.value == 4) {
					this.form.money = Math.round(er_money * 10) / 10
					this.form.erasure_money = er_money - Math.round(er_money * 10) / 10
				} else {
					this.form.money = er_money
				}
				this.form.erasure_money = this.form.erasure_money.toFixed(2)
				if (this.form.customer_id > 0) {
					this.form.reward_point = Math.floor((this.integral / Number(this.unit)) * this.toMoney);
				}
				this.$forceUpdate()
			},
			// 初始化
			init() {
				// this.$
				this.list = [];
				this.sum_number = 0;
				this.sum_money = 0;
				this.goods.map((v, i) => {
					v.goodsData.map((v1, i1) => {
						v1.data.map((v2, i2) => {
							v2['retail_price'] = Number(v1.goodsOf.retail_price)
							if (v1.goodsOf.customer_price == 0) {
								v2['customer_price'] = Number(v1.goodsOf.retail_price)
							} else {

								v2['customer_price'] = Number(v1.goodsOf.customer_price)
							}
						})
						if (v1.quantity > 0) {
							this.list.push(v1)
						}
					})
				})
				// console.log(this.list);
				this.list.map((v, i) => {
					this.sum_number += Number(v.quantity)
					v.data.map((v1, i1) => {
						if (v1.quantity > 0) {
							// 没折扣的商品进入打折
							if (!v1.discount) {
								if (this.discount != 0) {
									v1['discount'] = this.discount;
								} else {
									v1['discount'] = 1;
								}
							}
							// 重新赋值
							v1['retail_price'] = (Number(v1.retail_price) * Number(v1.discount)).toFixed(2)
							this.sum_money += Number(v1.quantity) * Number(v1.retail_price)
						}
					})
				})
				this.form.money = this.toMoney

			},
			hiddenTime() {
				this.showtime = true;
			},
			// 选择时间
			confirmTime(v) {
				this.form.business_time = `${v.year}-${v.month}-${v.day}`;
			},
			// 前往选择经手人
			toSelecSalesperson() {
				uni.navigateTo({
					url: '/pagesHome/selecSalesperson/selecSalesperson'
				})
			},
			// 前往选择会员
			toMemberSelect() {
				uni.navigateTo({
					url: '/pagesHome/memberSelect/memberSelect'
				})
			},
			// 增加商品
			toResale() {
				this.list.map((k, j) => {
					k.data.map((k1, j1) => {
						this.goods.map((v, i) => {
							v.goodsData.map((v1, i1) => {
								v1.data.map((v2, i2) => {
									if (v1.quantity > 0 && k.goods_id == v1
										.goods_id && k1.size.id == v2.size.id) {
										v1.quantity = k.quantity;
										v2.quantity = k1.quantity;
									}
								})
							})
						})
					})
				})
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: this.goods
				})
				uni.navigateTo({
					url: '/pagesHome/resaleCashier/resaleCashier?account=true'
				})
			},
			// 
			toIntegralList() {
				uni.navigateTo({
					url: '/pagesHome/IntegralList/IntegralList'
				})
			},
			// 挂单或者收款
			async sure(e) {
				if (this.message_list.sales_staff_required.value == 1 && this.form.staff_id == 0) {
					this.$refs.uToast.show({
						title: '请选择销售员',
						type: 'default',
						position: 'bottom'
					})
				} else if (this.list.length > 0) {
					let arr = []
					let bl = false
					this.list.map((v) => {
						v.data.map((v1) => {
							if (v1.quantity != 0) {
								arr.push({
									goods_id: v.goods_id,
									color_id: v.id,
									size_id: v1.size.id,
									price: v.goodsOf.retail_price,
									quantity: v1.quantity,
									discount: Number(v1.discount),
									real_price: v1.retail_price
								})
								if (v1.goods_spec_info.stock < 0 && this.message_list
									.minus_stock_can_sales.value == 0) {
									bl = true
								}

							}
						})
					})
					if (!bl) {
						if (this.form.discount_money == "") {
							this.form.discount_money = 0;
						}
						this.form.goods = arr
						if (!e) {
							this.form.status = 0;
							delete this.form.payment
							let res = await salesOrderAdd(this.form)
							// console.log(res);
							this.$store.commit('commercialSpecification', {
								specificationOfGoods: []
							})
							if (!res.code) {
								uni.navigateTo({
									url: `/pagesHome/resaleCashier/resaleCashier`
								})
							}
						} else {
							this.form.status = 1;
							this.activePay = 9999;
							this.showPayment = true;
							this.payItem = {};
						}
					} else {
						this.$refs.uToast.show({
							title: '库存不足不允许出货！',
							type: 'default',
							position: 'bottom'
						})
					}
				} else {
					this.$refs.uToast.show({
						title: '请选择商品',
						type: 'default',
						position: 'bottom'
					})
				}
			},
			// 清空会员
			clear() {
				this.sum_money = 0;
				this.members_data = {
					name: ''
				}
				this.$store.commit('customerFn', {
					customerObj: this.members_data
				})
				this.form.money = Number(this.form.money) + Number(this.form.point_used_as_money)
				this.form.customer_id = 0
				this.form.reward_point = 0
				this.checked = false
				// 取消商品会员折扣
				this.list.map(v => {
					v.data.map(v1 => {
						if (v1.quantity > 0) {
							v1.discount = 1;
							v1.retail_price = v.goodsOf.retail_price
							this.sum_money += Number(v1.quantity) * Number(v1.retail_price)
						}
					})
				})
				// 取消两个会员支付方式
				this.paymentList.map((v) => {
					if (v.name == '欠款' || v.name == "余额支付") {
						v.checked = false;
					}
				})
				this.discount = 0
				// this.sum_money = this.sum_money.toFixed(2)
				this.form.money = (this.sum_money - this.form.discount_money).toFixed(2)
			},
			// 初始化折扣
			async discountFn() {
				let res = await discountList()
				// console.log(res);
				this.discount_list = []
				res.map((v, i) => {
					this.discount_list.push(v);
					this.$set(this.discount_list, i, this.discount_list[i])
				})
			},
			// 显示增加折扣
			addDiscount() {
				this.showed = true;
			},
			// 确定增加折扣
			async ensure() {
				let res = discountAdd({
					discount: this.value
				});
				if (!res.code) {
					setTimeout(() => {
						this.discountFn()
						this.showed = false;
					}, 500)
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'default',
						position: 'center'
					})
				}
				this.value = ''
			},
			// 取消增加折扣
			abrogate() {
				this.value = ''
				this.showed = false;
			},
			//显示折扣编辑 
			edt() {
				this.active = 9999;
				this.rebate = '';
				this.set_del = !this.set_del;
			},
			// 取消选择折扣
			abolish() {
				this.show = false;
				this.active = 9999;
				this.rebate = '';
				this.set_del = false;
			},
			// 点击某个折扣
			itemClick(item, index) {
				if (!this.set_del) {
					this.active = index;
					this.rebate = item.discount
				}
			},
			// 确认折扣
			notarize(item) {
				if (this.rebate) {
					this.discounts = this.rebate;
					// 待继续
					this.form.money = this.toMoney;
					if (this.message_list.sales_not_count_small_change.value == 0) {} else if (this.message_list
						.sales_not_count_small_change
						.value == 1) {
						this.form.money = Math.floor(this.form.money)
						this.form.erasure_money = this.toMoney - this.form.money
					} else if (this.message_list.sales_not_count_small_change.value == 2) {
						this.form.money = Math.floor(this.form.money * 10) / 10
						this.form.erasure_money = this.toMoney - this.form.money
					} else if (this.message_list.sales_not_count_small_change.value == 3) {
						this.form.money = Math.round(this.form.money)
						this.form.erasure_money = this.toMoney - this.form.money
					} else if (this.message_list.sales_not_count_small_change.value == 4) {
						this.form.money = Math.round(this.form.money * 10) / 10
						this.form.erasure_money = this.toMoney - this.form.money
					}
					this.form.erasure_money = this.form.erasure_money.toFixed(2)
					if (this.form.customer_id > 0) {

						this.form.reward_point = Math.floor((this.integral / Number(this.unit)) * this.toMoney);
					}
					this.rebate = '';
					this.show = false;
				} else {
					if (this.set_del) {
						this.$refs.uToast.show({
							title: '请完成编辑',
							type: 'default',
							position: 'center'
						})
					} else {
						this.$refs.uToast.show({
							title: '请选择折扣',
							type: 'default',
							position: 'center'
						})
					}
				}
			},
			// 删除折扣
			discountedDel(item) {
				let _this = this
				uni.showModal({
					title: '折扣编辑',
					content: '是否删除此折扣？',
					success: async (res) => {
						if (res.confirm) {
							let res = await discountDel(item.id)
							if (!res.code) {
								setTimeout(() => {
									_this.discountFn()
								}, 500)
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 弹框打开
			open() {
				this.active = 9999;
				this.rebate = '';
				this.set_del = false;
			},
			// 积分计算
			async pointGetDe() {
				let res = await pointGetDefault()
				// console.log(res);
				this.unit = res.money;
				this.integral = res.point;
				this.placeholder = res.money + '元' + '=' + res.point + '积分';
				if (this.form.customer_id > 0) {
					this.form.reward_point = Math.floor((this.integral / Number(this.unit)) * this.toMoney);
				}
			},
			// 前往编辑商品
			togoodsOf(item, index, indexGoods) {
				let obj = {
					item: item,
					index: index,

					indexGoods: indexGoods
				}
				uni.navigateTo({
					url: '/pagesHome/editItems/editItems?obj=' + encodeURIComponent(JSON.stringify(obj))
				})
			},
			// 支付列表
			async accountd() {
				let res = await accountList()
				res.unshift({
					account_id: 0,
					name: '余额支付',

				})
				res.map((v) => {
					v['checked'] = true;
					if (v.name == '欠款' || v.name == "余额支付") {
						v['checked'] = false;
					}
				})
				this.paymentList = res
			},
			// 选择的支付方式
			paymentItem(item, index) {
				this.activePay = index;
				this.payItem = item;
				// console.log(item);
			},
			// 确定支付方式
			async paySure() {
				this.form.payment = [];
				this.form.payment.push({
					account_id: this.payItem.account_id,
					money: this.form.money
				})
				if (this.payItem.account_id == undefined) {
					this.$refs.uToast.show({
						title: '请选择支付方式',
						type: 'default',
						position: 'bottom'
					})
				} else if (this.payItem.account_id == 0 && this.members.has_password == 1) {
					this.show_psd = true;
				} else {
					let res = await salesOrderAdd(this.form)
					if (!res.code) {
						this.showPayment = false;
						uni.redirectTo({
							url: `/pages/paymentSuccess/paymentSuccess?payItem=${this.payItem.name}&money=${this.form.money}`
						})
					}
				}
			},
			// 前往组合支付
			combination() {
				let obj = {
					form: this.form,
					paymentList: this.paymentList,
					has_password: this.members.has_password
				}
				uni.navigateTo({
					url: '/pagesHome/combination/combination?obj=' + encodeURIComponent(JSON.stringify(obj))
				})
			},
			// 显示修改金额弹框
			showEditMoney() {
				this.money_edit = '';
				this.show_edit = true;
			},
			// 确定修改金额
			ensureEdit() {
				if (this.money_edit != "") {
					this.form.money = this.money_edit;
					if (this.form.customer_id > 0) {

						this.form.reward_point = Math.floor((this.integral / Number(this.unit)) * this.toMoney);
					}
					this.form.discount_money = (this.sum_money - this.form.money).toFixed(2)
					this.show_edit = false;
				} else {
					this.$refs.uToast.show({
						title: '请输入修改金额',
						type: 'default',
						position: 'bottom'
					})
				}
			},
			// 取消输入密码
			abrogated() {
				this.password = ''
				this.show_psd = false;

			},
			// 确定输入密码
			async ensured() {
				this.form.password = this.password;
				let res = await salesOrderAdd(this.form)
				if (!res.code) {
					this.show_psd = false;
					this.showPayment = false;
					uni.navigateTo({
						url: `/pagesHome/paymentSuccess/paymentSuccess?payItem=${this.payItem.name}&money=${this.form.money}`
					})
				}
			},
			async config() {
				let res = await configList()
				if (!res.code) {
					this.message_list = res
					if (this.message_list.sales_can_choose_date.value == 1) {
						let date = new Date();
						this.form.business_time = this.$u.timeFormat(date, 'yyyy-mm-dd');

						if (this.message_list.sales_not_count_small_change.value == 1) {
							this.form.money = Math.floor(this.form.money)
							this.form.erasure_money = this.toMoney - this.form.money
						} else if (this.message_list.sales_not_count_small_change.value == 2) {
							this.form.money = Math.floor(this.form.money * 10) / 10
							this.form.erasure_money = this.toMoney - this.form.money
						} else if (this.message_list.sales_not_count_small_change.value == 3) {
							this.form.money = Math.round(this.form.money)
							this.form.erasure_money = this.toMoney - this.form.money
						} else if (this.message_list.sales_not_count_small_change.value == 4) {
							this.form.money = Math.round(this.form.money * 10) / 10
							this.form.erasure_money = this.toMoney - this.form.money
						}
						this.form.erasure_money = this.form.erasure_money.toFixed(2)
					}
				}
			}

		},
		onUnload() {
			uni.$off()
		},
		onLoad(query) {
			this.pointGetDe()
			this.accountd()
			this.config()
			this.init();
			// 选择销售员
			uni.$on("selecSalesperson", (res) => {
				if (res) {
					this.staff = res.name;
					this.form.staff_id = res.id;

				}
			});
			// 选择会员
			uni.$on("memberSelect", (res) => {
				if (res) {
					// console.log(res);
					this.sum_money = 0
					this.members_data = res
					this.form.customer_id = res.id;
					this.discount = Number(res.customer_level.discount)
					this.list.map((v) => {
						v.data.map((v1) => {
							v1['discount'] = res.customer_level.discount;
							if (this.discount == 1) {
								if (v1.customer_price == 0) {
									v1.customer_price = Number(v.goodsOf.retail_price);
									v1.discount = (Number(v.goodsOf.retail_price) / Number(v
										.goodsOf.retail_price)).toFixed(2)
									v1.retail_price = Number(v.goodsOf.retail_price).toFixed(2)
								} else {
									v1.discount = (Number(v1.customer_price) / Number(v.goodsOf
										.retail_price)).toFixed(2)
								}
								v1.retail_price = Number(v1.customer_price).toFixed(2)
								this.sum_money += Number(v1.quantity) * Number(v1.customer_price)
							} else {
								v1.retail_price = (Number(v.goodsOf.retail_price) * Number(v1
									.discount)).toFixed(2)
								this.sum_money += Number(v1.quantity) * Number(v1.retail_price)
							}
						})

					})
					this.paymentList.map((v) => {
						if (v.name == '欠款' || v.name == "余额支付") {
							v.checked = true;
						}
					})
					this.form.money = this.toMoney
					if (this.message_list.sales_not_count_small_change.value == 1) {
						this.form.money = Math.floor(this.form.money)
						this.form.erasure_money = this.toMoney - this.form.money
					} else if (this.message_list.sales_not_count_small_change.value == 2) {
						this.form.money = Math.floor(this.form.money * 10) / 10
						this.form.erasure_money = this.toMoney - this.form.money
					} else if (this.message_list.sales_not_count_small_change.value == 3) {
						this.form.money = Math.round(this.form.money)
						this.form.erasure_money = this.toMoney - this.form.money
					} else if (this.message_list.sales_not_count_small_change.value == 4) {
						this.form.money = Math.round(this.form.money * 10) / 10
						this.form.erasure_money = this.toMoney - this.form.money
					}
					this.form.erasure_money = this.form.erasure_money.toFixed(2)
					this.form.reward_point = Math.floor((this.integral / Number(this.unit)) * this.toMoney);
				}
			});
			// 选择积分
			uni.$on("IntegralList", (res) => {
				if (res) {
					this.unit = res.money;
					this.integral = res.point;
					this.placeholder = res.money + '元' + '=' + res.point + '积分';
					if (this.form.customer_id > 0) {
						this.form.reward_point = Math.floor((this.integral / Number(this.unit)) * this.toMoney);
					}
				}
			});
			// 编辑商品
			uni.$on("editItems", (res) => {
				if (res) {
					this.list[res.index].data[res.indexGoods].quantity = 0
					this.list[res.index].data[res.index_later].quantity = res.item.quantity;
					this.list[res.index].data[res.index_later].discount = res.item.discount;
					this.list[res.index].data[res.index_later].retail_price = res.item.retail_price;
					this.list[res.index].quantity = 0;
					this.list[res.index].data.map((v) => {
						this.list[res.index].quantity += v.quantity;
					})
					// 初始化商品数量和合计
					this.sum_number = 0
					this.sum_money = 0
					this.list.map((v, i) => {
						this.sum_number += Number(v.quantity)
						v.data.map((v1, i1) => {
							if (v1.quantity > 0) {
								if (!v1.discount) {
									v1['discount'] = 1;
								}
								// v1['retail_price'] = (Number(v1.retail_price) * Number(v1.discount))
								if (v1.discount == 1 && this.discount == 1) {
									if(v1.customer_price==0){
										this.sum_money += Number(v1.quantity) * Number(v.goodsOf.retail_price)
									}else{
										this.sum_money += Number(v1.quantity) * Number(v1.customer_price)
									}
								} else {
									this.sum_money += Number(v1.quantity) * Number(v1.retail_price)
								}
							}
						})
					})

					this.form.money = this.toMoney
					if (this.message_list.sales_not_count_small_change.value == 1) {
						this.form.money = Math.floor(this.form.money)
						this.form.erasure_money = (this.toMoney - this.form.money).toFixed(2)
					} else if (this.message_list.sales_not_count_small_change.value == 2) {
						this.form.money = Math.floor(this.form.money * 10) / 10
						this.form.erasure_money = (this.toMoney - this.form.money).toFixed(2)
					} else if (this.message_list.sales_not_count_small_change.value == 3) {
						this.form.money = Math.round(this.form.money)
						this.form.erasure_money = (this.toMoney - this.form.money).toFixed(2)
					} else if (this.message_list.sales_not_count_small_change.value == 4) {
						this.form.money = Math.round(this.form.money * 10) / 10
						this.form.erasure_money = (this.toMoney - this.form.money).toFixed(2)
					}

				}
			});
			// 增加 减少商品
			uni.$on('editGood', (res) => {
				if (res) {
					this.init();
				}
			})
		},
		onShow() {
			this.discountFn()
		}
	}
</script>

<style scoped lang="scss">
	.settleAccounts {
		width: 100%;
		background-color: #efefef;
		display: flex;
		flex-direction: column;

		.active {
			background-color: #007AFF !important;
			color: #FFFFFF !important;
		}

		.member-select {
			width: 100%;
			height: 80rpx;
			background-color: #2979ff;
			display: flex;
			flex-direction: row;
			color: #FFFFFF;
			position: fixed;
			top: calc(80rpx+var(--status-bar-height));
			z-index: 9;

			.member {
				display: flex;
				width: 100%;
				justify-content: center;
				align-items: center;
			}

			.membered {
				width: 100%;
				display: flex;
				justify-content: space-between;

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

		// 增加折扣
		.discounted {
			width: 100%;
			height: 300rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.discounted-title {
				width: 100%;
				height: 120rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.input {
				width: 100%;
				height: 100rpx;
				padding: 0 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: row;
				margin-bottom: 20rpx;

				text {
					font-weight: 600;
					padding: 10rpx;
				}
			}

			.discounted-footer {
				width: 100%;
				height: 100rpx;
				padding: 0 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;

				.qx {
					width: 180rpx;
					height: 60rpx;
					border-radius: 10rpx;
					border: 1rpx solid #C8C7CC;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26rpx;
				}

				.qd {
					width: 180rpx;
					height: 60rpx;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					font-size: 26rpx;
					justify-content: center;
					background-color: #007AFF;
					color: #FFFFFF;
				}
			}
		}

		// 折扣列表
		.used-point {
			width: 100%;
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			align-items: center;
			background-color: #E5E5E5;
			padding: 0 20rpx;

			.right-point {
				display: flex;
				flex-direction: row;

				.u-checkbox-group {
					margin-left: 10rpx;
					width: 38rpx;
					display: flex;
					flex-direction: row;
				}
			}
		}

		.contents {
			display: flex;
			flex-direction: column;
			position: relative;
			height: 490rpx;

			.fot {
				display: flex;
				justify-content: space-between;
				height: 80rpx !important;
				align-items: center;
				border-bottom: 0.01rem solid #C8C7CC;
				padding: 0 20rpx;

				.left-content {
					display: flex;
					flex-direction: row;

					.red {
						color: #DD524D;
					}
				}

				.right-content {
					display: flex;
					color: #add;
				}

				.edt {
					color: #007AFF;
				}

				.title {
					font-weight: 500;
				}

				.qx {
					color: #C0C0C0;
				}
			}

			.bods {
				width: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;

				.pay {
					width: 25%;
					height: 140rpx;
					display: flex;
					position: relative;
					justify-content: center;
					align-items: center;

					.pay-box {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 100%;
					}

					.name {
						width: 70%;
						font-size: 20rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						text-align: center;
					}

					.top-right {
						position: absolute;
						right: 28%;
						top: 8%;
					}
				}

				.hezi {
					margin: 10rpx 2.5%;
					width: 20%;
					height: 60rpx;
					border: 1rpx solid #C0C0C0;
					color: #C0C0C0;
					border-radius: 8rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;

					.red-del {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
						border-radius: 50%;
					}
				}
			}

			.confrim-btn {
				width: 100%;
				display: flex;
				height: 60rpx;
				justify-content: center;
				align-items: center;
				position: fixed;
				bottom: 10rpx;

				.btn {
					width: 80%;
					height: 60rpx;
					color: #FFFFFF;
					background-color: #007AFF;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 10rpx;
				}
			}
		}

		.mains {
			width: 100%;
			margin: 80rpx 0;
			display: flex;
			flex-direction: column;

			.goods-data {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-bottom: 20rpx;

				.list {
					width: 100%;
					display: flex;
					flex-direction: column;
				}

				.goods-list {
					width: 100%;
					display: flex;

					.dole {
						width: 100%;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						padding: 20rpx;
						background-color: #FFFFFF;
						border-bottom: 0.01rem solid #E5E5E5;
					}

					.goods-left {
						display: flex;
						flex-direction: row;
						align-items: center;

						.item-left {
							padding-left: 20rpx;
							display: flex;
							flex-direction: column;

							.zc {
								font-size: 20rpx;
								color: #828282;
							}

							.hei {
								font-size: 28rpx;
								color: #000000;
								padding-top: 10rpx;

								.hui {
									padding-left: 10rpx;
									font-size: 24rpx;
									color: #828282;
								}
							}

							.lan {
								padding-top: 10rpx;
								font-size: 20rpx;
								color: #007AFF;
								display: flex;
								flex-direction: row;

								.underline {
									text-decoration: line-through;
								}

								text {
									color: #808080;
									padding-left: 10rpx;
								}
							}
						}
					}

					.goods-right {
						display: flex;
						justify-content: center;
						align-items: center;

					}
				}

				.add-goods {
					width: 100%;
					height: 80rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx;
					background-color: #FFFFFF;

					.add-left {
						display: flex;
						flex-direction: row;
						font-size: 20rpx;
					}

					.add-right {
						display: flex;
						flex-direction: row;
						color: #2979ff;
						font-size: 20rpx;

						text {
							padding-left: 20rpx;
						}
					}
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
					background-color: #FFFFFF;

					.rod {
						padding-left: 30rpx;
					}
				}

				.item-li {
					width: 100%;
					padding: 20rpx;
					display: flex;
					background-color: #FFFFFF;
					flex-direction: row;
					justify-content: space-between;
					border-bottom: 0.01rem solid #E5E5E5;



					.box-left {
						display: flex;
						flex-direction: row;
						align-items: center;

						text {
							width: 160rpx;
							padding-right: 20rpx;
						}

					}

					.box-right {
						display: flex;
						flex-direction: row;
						align-items: center;

						.lan {
							color: #007AFF;
						}
					}
				}
			}
		}

		.footer {
			width: 100%;
			height: 80rpx;
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			z-index: 9;
			display: flex;
			justify-content: space-between;

			.footer-left {
				display: flex;
				flex-direction: row;
				align-items: center;

				.sk {
					display: flex;
					flex-direction: column;
					margin-right: 10rpx;

					.min {
						font-size: 22rpx;
						color: #cccccc;
					}
				}

				text {
					padding: 0 10rpx;
				}

				.lan-se {
					color: #2979ff;
				}
			}

			.footer-right {
				display: flex;
				flex-direction: row;
				height: 100%;

				.hei {
					width: 140rpx;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #666666;
					color: #FFFFFF;
				}

				.lan {
					width: 160rpx;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #2979ff;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
