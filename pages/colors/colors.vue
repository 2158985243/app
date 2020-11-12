<template>
	<view class="colors">
		<!-- <view class="status_bar"></view> -->
		<u-navbar back-icon-color='#ffffff' title="选择颜色" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="edit-pen" @click="edit" color="#ffffff" class="right_icon" size="40"></u-icon>
				<u-icon name="plus" @click="toAddColor" color="#ffffff" class="right_icon" size="40"></u-icon>
			</template>
		</u-navbar>
		<view class="search">
			<u-search placeholder="请输入商品名称" @change='changed' shape='square' :show-action='false' height='60' :input-style="style_input"
			 margin='20rpx 50rpx 20rpx 20rpx' v-model="keyword"></u-search>
		</view>
		<view class="list">
			<uni-indexed-list :options="list" :edit='visible' :showSelect="true" @click="bindClick">
				<!-- <block slot="icon">
					<u-icon name="order" class="icon" color="#cccccc" size="38" @click.native.stop="editColor"></u-icon>
					<u-icon name="trash" class="icon"  color="#cccccc" size="38" @click.native.stop="delColor(idx)"></u-icon>
				</block> -->
			</uni-indexed-list>
		</view>
		<view class="btn">
			<u-button type="primary" class="btn" @tap="save">选择</u-button>
		</view>
	</view>
</template>

<script>
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue"
	import {
		colorList,
		colorDel
	} from '../../api/colors.js'
	import store from '@/store'
	export default {
		components: {
			// uniIndexedList 
		},
		data() {
			return {
				visible: false,
				keyword: '',
				style_input: {
					'background-color': '#ffffff'
				},
				background: {
					backgroundColor: '#2979ff'
				},
				list: [],
				datum: [],
				checkedData: [],

			}
		},
		methods: {
			save() {
				uni.$emit('colorDatum', this.datum);
				uni.navigateBack();
			},
			bindClick(v) {
				console.log(v);

				if (v.obc == false) {
					this.editColor(v);
				} else if (v.obc == true) {
					this.delColor(v);
				} else {
					this.datum = v.select;
				}
			},
			toAddColor() {
				uni.navigateTo({
					url: '/pages/addColor/addColor'
				})
			},
			edit() {
				this.visible = !this.visible;
			},
			async init() {
				let res = await colorList({
					keyword: this.keyword
				})
				// this.list = res;
				for (let i in res) {
					for (let x in res[i].data) {
						let ele = res[i].data[x]
						for (let j in this.checkedData) {
							if (ele.id === this.checkedData[j].id) {
								ele.checked = true;
								break;
							} else {
								ele.checked = false;
							}
						}
					}
				}
				this.list = res;
			},
			changed(v) {
				this.init();
			},
			// 前往colors编辑页面
			editColor(e) {
				// console.log(e);
				let str = {
					id: e.item.id,
					name: e.item.name
				}
				uni.navigateTo({
					url: `/pages/editColor/editColor?id=${str.id}&name=${str.name}`
				})
			},
			// 删除对应的color
			delColor(e) {
				uni.showModal({
					title: '提示',
					content: '确定删除改颜色？',
					success: async function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							let res = await colorDel(e.item.id)
							if (!res.code) {
								this.init();
							}
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},

			bin() {
				this.checkedData = store.state.colorDa;
				this.bindClick(this.checkedData)
			}
		},
		onLoad() {
			this.bin();
			this.init();


		},
		onShow() {
			// this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.colors {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		/deep/.u-content {
			background-color: #FFFFFF !important;
			box-shadow: 0rpx 0rpx 4rpx 2rpx #C0C0C0;
		}

		.btn {
			width: 100%;
			position: fixed;
			bottom: 0;
			z-index: 99;
			border-radius: 0 !important;

		}

		.list {
			// margin-top: 60rpx;
			display: flex;
			flex: auto;
			height: 100px;
			position: relative;
		}

		.icon {
			margin-left: 20rpx;
		}

		.search {
			display: flex;
			align-items: center;
			justify-content: center;
			// height: 100rpx;
		}

		.right_icon {
			margin-right: 40rpx;
		}
	}
</style>
