<template>
	<view class="unitList">
		<u-navbar back-icon-color='#ffffff' title="商品单位列表" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen" @click="edit" color="#ffffff" class="right_icon" size="40"></u-icon>
				<u-icon name="plus" @click="toAddCategory" color="#ffffff" class="right_icon" size="40"></u-icon>
			</template>
		</u-navbar>
		<view class="list">
			<view class="lisr" v-for="(item,index) in list" :key="index" @click="toAddCommodity(item)">
				<text>{{item.name}}</text>
				<view class="logo" v-show="visible">
					<u-icon name="order" class="icon" color="#cccccc" size="38" @click.native.stop="editct(item)"></u-icon>
					<u-icon name="trash" class="icon" color="#cccccc" size="38" @click.native.stop="delct(item)"></u-icon>
				</view>
			</view>
		</view>

		<!-- 编辑分类-->
		<u-popup v-model="showedit" mode="center">
			<view class="pop">
				<text class="titl">修改分类</text>
				<view class="nav">
					<text>单位:</text>
					<u-input class='inputs' placeholder="请输入单位名称" v-model="name" type="text" :border="border" />
				</view>
				<view class="nav">
					<text>备注:</text>
					<u-input class='inputs' placeholder="请输入备注" v-model="remarks" type="text" :border="border" />
				</view>

			</view>
			<view class="btn">
				<u-button :hair-line="false" @click="abrogate" class="btnChild">取消</u-button>
				<u-button :hair-line="false" @click='ensure' class="btnChild">确定</u-button>
			</view>
		</u-popup>
		<!-- 删除分类 -->
		<u-popup v-model="showdel" mode="center">
			<view class="pop">
				<text class="del">是否删除{{name}}单位？</text>
			</view>
			<view class="btn">
				<u-button :hair-line="false" @click="abolish" class="btnChild">取消</u-button>
				<u-button :hair-line="false" @click='ascertain' class="btnChild">确定</u-button>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import {
		unitList,
		unitEdit,
		unitDel
	} from '../../api/unit.js'
	export default {
		data() {
			return {
				visible: false,
				showedit: false,
				showdel: false,
				style_input: {
					'background-color': '#ffffff'
				},
				background: {
					backgroundColor: '#2979ff'
				},
				list: [],
				name: "",
				sort: 100,
				id: 0,
				border: true,
				remarks: ''
			}
		},
		methods: {
			toAddCommodity(item) {
				uni.$emit('unitListDatum', item)
				uni.navigateBack();
			},
			// 前往添加分类
			toAddCategory() {
				uni.navigateTo({
					url: '/pagesRepertory/addUnitList/addUnitList'
				})
			},
			// 显示隐藏修改按钮
			edit() {
				this.visible = !this.visible;
			},
			// 初始化
			async init() {
				let res = await unitList()
				this.list = res;
			},
			// 点击编辑按钮
			editct(v) {
				this.name = v.name;
				this.remarks = v.remarks;
				this.showedit = true;
				this.id = v.id
			},
			// 点击删除按钮
			delct(v) {
				this.showdel = true;
				this.name = v.name;
				this.remarks = v.remarks;
				this.id = v.id
			},
			// 编辑取消按钮
			abrogate() {
				this.showedit = false;
			},
			// 编辑确定按钮
			async ensure() {
				let res = await unitEdit(this.id, {
					name: this.name,
					remarks: this.remarks
				})
				this.showedit = false;
				if (!res.code) {
					this.init()
				}
			},
			// 删除取消按钮
			abolish() {
				this.showdel = false;
			},
			// 删除确定按钮
			async ascertain() {
				let res = await unitDel(this.id)
				if (!res.code) {
					this.init()
				}
				this.showdel = false;
			},
		},
		onLoad() {},
		onShow() {
			this.init()

		}
	}
</script>

<style lang="scss" scoped>
	.unitList {
		width: 100%;
		height: 100%;
		background-color: #f8f8f8;

		.right_icon {
			margin-right: 20rpx;
		}

		.pop {
			width: 70vw;
			height: 20vh;

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

		.list {
			width: 100%;

			.lisr {
				width: 100%;
				display: flex;
				justify-content: center;
				// align-items: center;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #dadada;

				text {
					display: block;
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					text-indent: 1em;
				}

				.logo {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.icon {
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
