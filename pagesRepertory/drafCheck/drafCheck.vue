<template>
	<view class="drafCheck">
		<u-navbar back-icon-color='#ffffff' title="盘点单" :background="background" title-color="#ffffff">
			<template slot="right">
				<text class="right_icon" @click="delHistory">删除</text>
			</template>
		</u-navbar>
		<view class="mains">
			<!-- 中上部分 -->
			<view class="box">
				<view class="form_item">
					<view class="left">
						
					<text>店铺</text>
					<u-input placeholder='请选择店铺' @click="toStore" :disabled='true' v-model="shop" type="text" />
					</view>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<view class="form_item">
					<view class="left">
					<text>盘点范围</text>
					<u-input placeholder='请选择盘点范围' @click="inventoryRange" :disabled='true' v-model="scopes_name" type="text" />
				</view>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
				<u-action-sheet :list="scopes" @click="scopeItem" v-model="show"></u-action-sheet>
				<view class="form_item"  @click="toNoInventory">
					<view class="left">
					<text>未盘点商品</text>
					<view class="lan" @click="toNoInventory">查看未盘点商品</view>
				</view>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
			<!-- 中部 -->
			<view class="centers">
				<view class="list">
					<text class="child" v-for="(item,index) in list" :key="index">{{item}}</text>
				</view>
				<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in bill" :key="index" @click="click" @open="open"
				 :options="options">
					<view class="item u-border-bottom">
						<view class="list title-wrap">
							<text class="itemname"><text class="font">{{userName}}</text> {{'(子单'+(index+1)+')'}}</text>
							<text class="child">{{item.quantity}}</text>
							<text class="child">{{item.remarks}}</text>
							<text class="handle" @click="checkSubmenu(item,index)" v-if="item.id == 0">开始盘点</text>
							<text class="handle" @click="checkSubmenu(item,index)" v-else>继续盘点</text>
						</view>
					</view>
				</u-swipe-action>
			</view>
			<!-- 尾部 -->
			<view class="footers">
				<view class="addsubmenu" @click="addsubmenu">
					<u-icon name="plus-circle-fill" color="#2979ff" size="40"></u-icon>
					<text>增加子单</text>
				</view>
				<view class="">
					可用于多人或多地域盘点
				</view>
			</view>
		</view>
		<view class="foot">
			<view class="total">
				合计：{{numberUnits}}件
			</view>
			<view class="sub">
				<view class="btnon1" @click="save(0)">
					草稿
				</view>
				<view class="btnon2" @click="save(1)">
					盘点汇总
				</view>
			</view>
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
		checkDel
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
				id: 0
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
				let res1 = await checkLists({
					id: this.id
				})
				if (res.scope) {
					this.scopes_name = '全店盘点'
				} else {
					this.scopes_name = '单品盘点'
				}
				this.form.status = res.status;
				this.form.scope = res.scope;
				this.form.store_id = res.store_id;
				res.checkList.map(v => {
					this.form.check_list_ids.push(v.id)
				})
				this.shop = res.store.name;
				this.userName = res1[0].user.name;
				res1.map(v => {
					v['show'] = false;
					this.bill.push(v);
				})
				this.numberUnits = 0;
				this.bill.map((v) => {
					this.numberUnits += Number(v.quantity);
				})
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
							url: '/pagesRepertory/inventoryPreview/inventoryPreview?id='+this.id+'&obj='+encodeURIComponent(JSON.stringify(this.form))
						})
					}else{
						this.$u.toast(`单据未保存!`);
					}

				} else {
					// 草稿
					this.form.status = 0;
					let res = await checkEdit(this.id, this.form)
					if (!res.code) {
						uni.$emit('stockTaking',true)
						uni.navigateBack()
					}
				}
			},
			// 未盘点
			toNoInventory() {
				let item = {
					check_list_id:this.bill[0].id,
					remarks:this.bill[0].remarks,
					quantity:this.bill[0].quantity,
					check_list_ids:this.form.check_list_ids,
					store_id:this.form.store_id
				}
				uni.navigateTo({
					url: '/pagesRepertory/addCheck/noInventory/noInventory?item='+ encodeURIComponent(JSON.stringify(item))
				})
			},
			// 点击了某一项
			async click(index, index1) {
				let id = this.bill[index].id;
				let res = await checkListDel(id);
				this.bill.splice(index, 1);
				this.$u.toast(`子单删除成功`);
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.bill[index].show = true;
				this.bill.map((val, idx) => {
					if (index != idx) this.bill[idx].show = false;
				})
			},
			// 增加子单
			addsubmenu() {
				this.bill.push({
					id: 0,
					number: 0,
					show: false,
					remarks: ''
				})
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
			async delHistory(){
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确定删除该盘点单？',
					success: async function(res) {
						if (res.confirm) {
							let res = await checkDel(this.id);
							if(!res.code){
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
		onUnload() {
			uni.$off()
		},
		onLoad(query) {
			this.id = query.id;
			this.init()
			uni.$on("gloEvent", (res) => {
				if (res) {
					// console.log(res);
					this.shop = res.name;
					this.form.store_id = res.id;
				}
			});
			uni.$on("check", (res) => {
				if (res) {
					// console.log(res);
					this.form.check_list_ids.push(res.id);
					this.bill[res.checkIndex] = {
						id: res.id,
						quantity: res.number,
						show: false,
						remarks: res.remarks
					}
					this.$set(this.bill, res.checkIndex, this.bill[res.checkIndex]);
					// console.log(this.bill);
					this.numberUnits = 0;
					this.bill.map((v) => {
						this.numberUnits += v.quantity;
					})
				}
			});
			uni.$on("noInventory", (res) => {
				if (res) {
					this.bill[0] = {
						quantity: res.number
					}
					this.$set(this.bill, 0, this.bill[0]);
					this.bill.map((v) => {
						this.numberUnits += v.quantity;
					})
				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.drafCheck {
		width: 100%;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 30rpx;
			color: #FFFFFF;
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
			width: 100%;
			display: flex;
			flex-direction: column;
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
				width: 100%;
				justify-content: space-between;
				text {
					width: 220rpx;
					// text-align: left;
					padding-left: 20rpx;
				}
				.left{
					display: flex;
					flex-direction: row;
					align-items: center;
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

		.centers {
			// padding: 0 20rpx;
			width: 100%;
			display: flex;
			flex-direction: column;

			.list {
				width: 100%;
				height: 84rpx;
				display: flex;
				flex-direction: row;
				padding-right: 10rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #e3e3e3;

				.child {
					flex: 1;
					line-height: 84rpx;
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.itemname {
					flex: 1;
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

					.font {
						display: block;
					}
				}

				.handle {
					flex: 1;
					display: block;
					margin: 20rpx 0;
					text-align: center;
					color: #FFFFFF;
					background-color: #007AFF;
					border-radius: 8rpx;
				}
			}
		}

		.footers {
			width: 100%;
			padding-top: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #FFFFFF;

			.addsubmenu {
				color: #2979ff;
				padding: 28rpx 0;
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

			.total {
				flex: 1;
				text-indent: 1em;
			}

			.sub {
				flex: 1;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				height: 100%;

				.btnon1 {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #8f8f8f;
					height: 100%;
					color: #FFFFFF;
				}

				.btnon2 {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					// text-align: center;
					background-color: #0093dc;
					height: 100%;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
