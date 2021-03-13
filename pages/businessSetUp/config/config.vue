<template>
	<view class="config">
		<view class="main">

			<view class="box">
				<view class="box-item">
					<view class="left">
						货号自动生成
					</view>
					<view class="right">
						<u-switch v-model="checked1" @change="change1" size='40' active-value="1" inactive-value="0"></u-switch>
					</view>
				</view>
				<view class="box-list" v-if="checked1">
					<view class="list-row">
						<text>货号前缀</text>
						<view class="ip-bottom">
							<u-input v-model="form.goods_number_prefix.value"  placeholder='' height="40" :clearable='false' type="text" />
						</view>
					</view>
					<view class="list-row">
						<text>数字长度</text>
						<view class="ip-bottom">
							<u-input v-model="form.goods_number_length.value" maxlength='2' placeholder='' height="40" :clearable='false' type="number" />
						</view>
					</view>

				</view>
				<view class="box-item">
					<view class="left">
						会员卡号自动生成
					</view>
					<view class="right">
						<u-switch v-model="checked2" @change="change2" size='40' active-value="1" inactive-value="0"></u-switch>
					</view>
				</view>

				<view class="box-item">
					<view class="left">
						自动发送短信
					</view>
					<view class="right">
						<u-switch v-model="checked3" @change="change3" size='40' active-value="1" inactive-value="0"></u-switch>
					</view>
				</view>
				<view class="box-list" v-if="checked3">
					<view class="list-item">
						<text>充值短信</text>
						<u-switch v-model="checked9" @change="change9" size='40' active-value="1" inactive-value="0"></u-switch>
					</view>
					<view class="list-item">
						<text>消费短信</text>
						<u-switch v-model="checked10" @change="change10" size='40' active-value="1" inactive-value="0"></u-switch>
					</view>
					<view class="list-item">
						<text>调整短信</text>
						<u-switch v-model="checked11" @change="change11" size='40' active-value="1" inactive-value="0"></u-switch>
					</view>

				</view>
				<view class="box-item">
					<view class="left">
						销售员必选
					</view>
					<view class="right">
						<u-switch v-model="checked4" @change="change4" size='40' active-value="1" inactive-value="0"></u-switch>
					</view>
				</view>
				<view class="box-item">
					<view class="left">
						消费结账允许选择销售日期
					</view>
					<view class="right">
						<u-switch v-model="checked5" @change="change5" size='40' active-value="1" inactive-value="0"></u-switch>
					</view>
				</view>
				<view class="box-item">
					<view class="left">
						负库存销售
					</view>
					<view class="right">
						<u-switch v-model="checked6" @change="change6" size='40' active-value="1" inactive-value="0"></u-switch>
					</view>
				</view>
			</view>
			<view class="box">
				<view class="box-item">
					<view class="left">
						可作废单据天数
					</view>
					<view class="right">
						<view class="ipt">
							<u-input v-model="form.can_cancel_bill_max_day.value" placeholder='' height="40" :clearable='false' input-align='center'
							 type="number" />
						</view>
						<text>天</text>
					</view>
				</view>
				<view class="box-item" @click="toIntegralList">
					<view class="left">
						默认积分赔率
					</view>
					<view class="right">
						<text class="lan">{{form.default_point_magnification.value.money}}元={{form.default_point_magnification.value.point}}积分</text>
						<text class="lan">赔率:{{(Number(form.default_point_magnification.value.money)/Number(form.default_point_magnification.value.point)).toFixed(2)}}</text>
						<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
					</view>
				</view>
				<view class="box-item">
					<view class="left">
						积分抵现设置
					</view>
					<view class="right">
						<u-switch v-model="checked7" @change="change7" size='40' active-value="1" inactive-value="0"></u-switch>
					</view>
				</view>
				<view class="box-list" v-if="checked7">
					<view class="list-test">
						<view class="left">
							<view class="ipt">
								<u-input v-model="form.point_exchange_money.value" placeholder='' height="40" :clearable='false' input-align='center'
								 type="number" />
							</view>
							<text>积分=1元</text>
						</view>
					</view>

				</view>
			</view>
			<view class="box">
				<view class="box-item">
					<view class="left">
						销售抹零设置
					</view>
					<view class="right" @click="show = true">
						<text class="lan">{{name}}</text>
						<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="box">
				<view class="box-item">
					<view class="left">
						开单用户关联员工
					</view>
					<view class="right">
						<u-switch v-model="checked8" @change="change8" size='40' active-value="1" inactive-value="0"></u-switch>
					</view>
				</view>
			</view>

		</view>
		<u-select v-model="show" @confirm='confirm1' :list="list"></u-select>
		<view class="btn" @click="sure">
			保存
		</view>
	</view>
</template>

<script>
	import {
		configList,
		configEdit
	} from '../../../api/member.js'
	export default {
		data() {
			return {
				unit: 1,
				integral: 0,
				placeholder: '',
				name: '',
				list: [{
						value: '0',
						label: '不抹零'
					},
					{
						value: '1',
						label: '尾数抹零到元'
					},
					{
						value: '2',
						label: '尾数抹零到角'
					},
					{
						value: '3',
						label: '四舍五入到元'
					},
					{
						value: '4',
						label: '四舍五入到角'
					}
				],
				show: false,
				checked1: false, // 货号自动生成
				checked2: false, // 会员卡号自动生成
				checked3: false, // 自动发送短信
				checked4: false, // 销售员必选
				checked5: false, // 消费结账允许选择销售日期
				checked6: false, // 负库存销售
				checked7: false, // 积分抵现设置
				checked8: false, // 开单用户关联员工
				checked9: false, // 开单用户关联员工
				checked10: false, // 开单用户关联员工
				checked11: false, // 开单用户关联员工
				form: {
					auto_generate_customer_number: {},
					auto_generate_goods_number: {},
					auto_promotion_switch: {},
					auto_promotion_type: {},
					auto_send_adjust_msg: {},
					auto_send_consume_msg: {},
					auto_send_msg: {},
					auto_send_recharge_msg: {},
					barcode_generate_rule: {},
					can_cancel_bill_max_day: {},
					default_point_magnification: {value:{}},
					goods_number_length: {},
					goods_number_prefix: {},
					minus_stock_can_sales: {},
					point_exchange_money: {},
					point_exchange_money_switch: {},
					sales_can_choose_date: {},
					sales_not_count_small_change: {},
					sales_staff_required: {},
					sales_user_relate_staff: {}
				}
			}
		},
		methods: {
			confirm1(e) {
				this.name = e[0].label
				this.form.sales_not_count_small_change.value = e[0].value
			},
			async init() {
				let res = await configList()
				if (!res.code) {
					this.form = res
					if (res.auto_generate_goods_number.value == 1) {
						this.checked1 = true
					} else {
						this.checked1 = false
					}
					if (res.auto_generate_customer_number.value == 1) {
						this.checked2 = true
					} else {
						this.checked2 = false
					}
					if (res.auto_send_msg.value == 1) {
						this.checked3 = true
					} else {
						this.checked3 = false
					}
					if (res.sales_staff_required.value == 1) {
						this.checked4 = true
					} else {
						this.checked4 = false
					}
					if (res.sales_can_choose_date.value == 1) {
						this.checked5 = true
					} else {
						this.checked5 = false
					}
					if (res.minus_stock_can_sales.value == 1) {
						this.checked6 = true
					} else {
						this.checked6 = false
					}
					if (res.point_exchange_money_switch.value == 1) {
						this.checked7 = true
					} else {
						this.checked7 = false
					}
					if (res.sales_user_relate_staff.value == 1) {
						this.checked8 = true
					} else {
						this.checked8 = false
					}
					if (res.auto_send_recharge_msg.value == 1) {
						this.checked9 = true
					} else {
						this.checked9 = false
					}
					if (res.auto_send_consume_msg.value == 1) {
						this.checked10 = true
					} else {
						this.checked10 = false
					}
					if (res.auto_send_adjust_msg.value == 1) {
						this.checked11 = true
					} else {
						this.checked11 = false
					}
					if (res.sales_not_count_small_change.value == 0) {
						this.name = '不抹零'
					} else if (res.sales_not_count_small_change.value == 1) {
						this.name = '尾数抹零到元'
					} else if (res.sales_not_count_small_change.value == 2) {
						this.name = '尾数抹零到角'
					} else if (res.sales_not_count_small_change.value == 3) {
						this.name = '四舍五入到元'
					} else if (res.sales_not_count_small_change.value == 4) {
						this.name = '四舍五入到角'
					}
				}
			},
			// 货号自动生成
			change1(v) {
				this.form.auto_generate_goods_number.value = v
			},
			// 会员卡号自动生成
			change2(v) {
				this.form.auto_generate_customer_number.value = v
			},

			// 自动发送短信
			change3(v) {
				this.form.auto_send_msg.value = v
			},

			// 销售员必选
			change4(v) {
				this.form.sales_staff_required.value = v
			},

			// 消费结账允许选择销售日期
			change5(v) {
				this.form.sales_can_choose_date.value = v
			},

			// 负库存销售
			change6(v) {
				this.form.minus_stock_can_sales.value = v
			},

			// 积分抵现设置
			change7(v) {
				this.form.point_exchange_money_switch.value = v
			},

			// 开单用户关联员工
			change8(v) {
				this.form.sales_user_relate_staff.value = v
			},
			// 充值短信
			change9(v) {
				this.form.auto_send_recharge_msg.value = v
			},

			// 消费短信
			change10(v) {
				this.form.auto_send_consume_msg.value = v
			},

			// 调整短信
			change11(v) {
				this.form.auto_send_adjust_msg.value = v
			},

			//积分
			toIntegralList() {
				uni.navigateTo({
					url: '/pages/IntegralList/IntegralList'
				})
			},

			// 保存
			async sure() {
				let obj = {}
				for (let key in this.form) {
					obj[key] = {
						id: this.form[key].id,
						value: this.form[key].value,
						name: this.form[key].name
					}
				}
				let res = await configEdit({
					...obj
				})
				if(!res.code){
					uni.navigateBack()
				}
			}
		},
		onLoad() {
			this.init()
			// 选择积分
			uni.$on("IntegralList", (res) => {
				if (res) {
					this.form.default_point_magnification.value.money = res.money;
					this.form.default_point_magnification.value.point = res.point;
					this.form.default_point_magnification.value.id = res.id;
				
				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.config {
		width: 100%;
		display: flex;
		flex-direction: column;
		min-height: 100%;
		background-color: #E5E5E5;

		.main {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 60rpx;

			.box {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-bottom: 20rpx;

				.box-list {
					width: 100%;
					display: flex;
					flex-direction: column;
					background-color: #FFFFFF;

					.list-test {
						width: 100%;
						padding: 20rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						border-bottom: 0.1rem solid #F1F1F1;

						.left {

							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;

							.ipt {
								width: 140rpx;
								border-bottom: 1rpx solid #C0C0C0;
							}
						}
					}

					.list-item {
						width: 100%;
						padding: 20rpx 80rpx;
						border-bottom: 0.1rem solid #F1F1F1;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;

						text {
							width: 160rpx;
							font-weight: 600;
						}
					}

					.list-row {
						width: 100%;
						padding: 0 80rpx;
						border-bottom: 0.1rem solid #F1F1F1;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;

						text {
							width: 160rpx;
							font-weight: 600;
						}

						.ip-bottom {
							width: 100%;
							padding: 20rpx 0;
							border-bottom: 1rpx solid #F1F1F1;
						}
					}
				}

				.box-item {
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					padding: 20rpx;
					background-color: #FFFFFF;
					border-bottom: 0.01rem solid #F5F5F5;

					.left {
						font-weight: 600;
						display: flex;
						justify-content: center;
						align-items: center;

					}

					.right {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;

						.ipt {
							width: 140rpx;
							border-bottom: 1rpx solid #C0C0C0;
						}

						.lan {
							color: #557EA2;
							margin-right: 10rpx;
						}
					}
				}

			}
		}

		.btn {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			background-color: #2979ff;
			position: fixed;
			bottom: 0;
			color: #FFFFFF;
			font-size: 30rpx;
			z-index: 9;
		}
	}
</style>
