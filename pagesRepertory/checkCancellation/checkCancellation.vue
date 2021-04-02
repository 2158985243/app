<template>
	<view class="checkCancellation">
		<view class="mains">
			<!-- 中上部分 -->
			<view class="box">
				<view class="form_item">
					<text>盘点单号</text>
					<view class="">{{form.number}}</view>
				</view>

				<view class="form_item">
					<text>业务时间</text>
					<u-input placeholder='' :disabled='true' v-model="scopes_name" type="text" />
				</view>
				<u-action-sheet :list="scopes" @click="scopeItem" v-model="show"></u-action-sheet>
				<view class="form_item">
					<text>店铺</text>
					<u-input placeholder='' :disabled='true' v-model="shop" type="text" />
				</view>
			</view>
			<!-- 中部 -->
			<view class="centers">
				<view class="nav">
					<view class="list1">
						货号&颜色
					</view>
					<view class="list2">
						尺码
					</view>
					<view class="list3">
						盘点前后
					</view>
					<view class="list4">
						盈亏数
					</view>
					<view class="list5">
						盈亏金额
					</view>
				</view>
				<view class="nav1" v-for="(item,index) in bill" :key='index'>
					<view class="left">
						<view class="lf">
							{{item.goods.number}}
						</view>
						<view class="lf">
							{{item.color.name}}
						</view>
					</view>
					<view class="right">
						<view class="rh-list" v-for="(itemSize,indexSize) in item.data" :key="indexSize">
							<view class="rh1">
								{{itemSize.size.name}}
							</view>
							<view class="rh2">
								{{itemSize.before_quantity}}→{{itemSize.quantity}}
							</view>
							<view class="rh3">
								{{Number(itemSize.quantity)-Number(itemSize.before_quantity) }}
							</view>
							<view class="rh4" :class=" Number(itemSize.quantity)-Number(itemSize.before_quantity) >0? 'green':''">
								{{(Number(itemSize.quantity)-Number(itemSize.before_quantity))*Number(itemSize.price)}}
							</view>

						</view>
					</view>
				</view>
				<view class="person">
					<view class="labels">
						制单人
					</view>
					<view class="contc">
						{{userName}}
					</view>
				</view>
				<!-- <view class="person">
						<view class="labels">
							备注
						</view>
						<view class="contc">
							{{userName}}
						</view>
					</view> -->
			</view>
			<!-- 尾部 -->

		</view>
		<view class="foot">
			<text class="txt">盘点合计:{{sum}}</text>
			<text class="txt">盈亏合计:<text class="red-color" :class="lossSum>0?'green':''">{{lossSum}}</text></text>
			<text class="txt">盈亏金额:<text class="red-color" :class="lossMoney>0?'green':''">{{lossMoney}}</text></text>
		</view>
		<view class="logo">
			已作废
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	import {
		checkEdit,
		checkListDel,
		check,
		checkLists,
		checkCancel,
		getCounts
	} from '../../api/check.js'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				shop: '',
				form: {
					status: 0,
					scope: 0,
					store_id: 0,
					check_list_ids: []
				},
				scopes: [{
					text: '全店盘点',
					scope: 1
				}, {
					text: '单品盘点',
					scope: 0
				}],
				scopes_name: '单品盘点',
				numberUnits: 0, //总数
				noInventory: 0, //未盘点总数
				list: ['盘点人', '盘点数量', '备注', '操作'],
				bill: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				userName: '',
				show: false,
				id: 0,
				sum: 0,
				lossSum: 0,
				lossMoney: 0,
			}
		},
		methods: {
			// 点击盘点范围
			inventoryRange() {
				this.show = true;
			},
			// 选择了某个盘点
			scopeItem(v) {
				this.form.scope = this.scopes[v].scope;
				this.scopes_name = this.scopes[v].text;
			},
			// 初始化
			async init() {
				let res = await check(this.id)
				if (res.scope) {
					this.scopes_name = '全店盘点'
				} else {
					this.scopes_name = '单品盘点'
				}
				this.form.status = res.status;
				this.form.scope = res.scope;
				this.form.store_id = res.store_id;
				this.form.number = res.number;
				res.checkList.map(v => {
					this.form.check_list_ids.push(v.id)
				})
				this.shop = res.store.name;
				let res1 = await getCounts({
					check_id:this.id||0,
					ids: this.form.check_list_ids,
					store_id:this.form.store_id
				})
				this.bill = res1
				this.bill.map((v, i) => {
					v.data.map(v1 => {
						this.sum += Number(v1.quantity);
						this.lossSum += Number(v1.quantity) - Number(v1.before_quantity);
						this.lossMoney += (Number(v1.quantity) - Number(v1.before_quantity)) * Number(v1.price)
					})
				})
				let res2 = await checkLists({
					id: this.id
				})
				this.userName = res2[0].user.name;
			},
			// 前往店铺
			toStore() {
				uni.navigateTo({
					url: '/pagesMine/storeManagement/storeManagement?iq=1'
				})
			},
			// 草稿或者盘点汇总
			async save(v) {
				console.log(v);
				if (v) {
					// 汇总
					if (this.form.check_list_ids.length > 0) {
						uni.navigateTo({
							url: '/pagesRepertory/inventoryPreview/inventoryPreview?id=' + this.id + '&obj=' + encodeURIComponent(JSON.stringify(
								this.form))
						})
					} else {
						this.$u.toast(`单据未保存!`);
					}

				} else {
					// 草稿
					this.form.status = 0;
					let res = await checkEdit(this.id, this.form)
					if (!res.code) {
						uni.navigateTo({
							url: '/pagesRepertory/stockTaking/stockTaking?'
						})
					}
				}
			},
			// 盘点
			checkSubmenu(item, index) {
				this.$store.commit('commercialSpecification', {
					specificationOfGoods: []
				})
				uni.navigateTo({
					url: `/pagesRepertory/checkSubmenu/checkSubmenu?index=${index}&id=${item.id}`
				})
			},
			// 删除盘点草稿单
			async delHistory() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确定作废该盘点单？',
					success: async function(res) {
						if (res.confirm) {
							let res = await checkCancel(_this.id);
							if (!res.code) {
								uni.navigateTo({
									url: `/pagesRepertory/stockTaking/stockTaking`
								})
							}
						} else if (res.cancel) {
							console.log("点击了取消");
						}
					}
				});

			},

		},
		onLoad(query) {
			this.id = query.id;
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.checkCancellation {
		width: 100%;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 30rpx;
			color: #FFFFFF;
		}
		
		.logo{
			width: 180rpx;
			height: 60rpx;
			line-height: 60rpx;
			position: fixed;
			margin: auto;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border: 1rpx solid #DD524D;
			color: #DD524D;
			font-size: 26rpx;
			text-align: center;
			transform:rotate(-45deg);
			background-color: rgba(255, 0, 0, 0.1);
		}
		
		.person {
			width: 100%;
			display: flex;
			flex-direction: row;
			background-color: #FFFFFF;
			padding: 20rpx 0;
			border-bottom: 0.01rem solid #e6e6e6;

			.labels {
				width: 220rpx;
				padding-left: 20rpx;
			}

			.contc {
				width: 90%;
			}
		}

		// 主体
		.mains {
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #F8F8F8;
			margin-bottom: 88rpx;
		}

		.lan {
			width: calc(100% - 250rpx);
			color: #007AFF;
		}

		// 中间部分
		.box {
			margin-bottom: 20rpx;

			.other-expenses {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
				height: 84rpx;

				.green {
					padding-left: 20rpx;
					flex: 1;

					text {
						background-color: #46c85b;
						border-radius: 8rpx;
						padding: 6rpx 10rpx;
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}

				.green-money {
					padding-left: 20rpx;
					flex: 1;
					color: green;
				}

				.orgin {
					padding-left: 20rpx;
					flex: 1;

					text {
						background-color: #ffaa00;
						border-radius: 8rpx;
						padding: 6rpx 10rpx;
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}

				.orgin-money {
					padding-left: 20rpx;
					flex: 1;
					color: #ffaa00;
				}
			}

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
					border-bottom: 0.01rem solid #e6e6e6;
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

		width: 100%;
		display: flex;
		flex-direction: column;

		.centers {

			.nav {
				width: 100%;
				display: flex;
				flex-direction: row;
				height: 80rpx;
				padding: 0 10rpx;
				border-bottom: 0.01rem solid #e6e6e6;
				background-color: #FFFFFF;

				.list1 {
					width: 20%;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.list2 {
					width: 12%;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.list3 {
					width: 25%;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.list4 {
					width: 15%;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.list5 {
					width: 28%;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.nav1 {
				width: 100%;
				display: flex;
				flex-direction: row;
				border-bottom: 0.01rem solid #e6e6e6;
				background-color: #FFFFFF;

				.left {
					width: 20%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
				}

				.right {
					width: 80%;
					display: flex;
					flex-direction: column;

					.rh-list {
						width: 100%;
						display: flex;
						flex-direction: row;
						border-bottom: 0.01rem solid #e6e6e6;
						padding: 20rpx 0;

						.rh1 {
							width: 15%;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24rpx;
						}

						.rh2 {
							width: 31.25%;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24rpx;
						}

						.rh3 {
							width: 18.75%;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24rpx;
						}

						.rh4 {
							width: 35%;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #FF5A5F;
							font-size: 24rpx;
						}

						.green {
							color: #4CD964;
						}
					}

					.rh-list:last-of-type {
						border-bottom: none;
					}
				}
			}
		}

		// 尾部
		.foot {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 80rpx;
			background-color: #ebeaef;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.txt {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
			}

			.red-color {
				color: #FF5A5F;
			}

			.green {
				color: #4CD964;
			}
		}
	}
</style>
