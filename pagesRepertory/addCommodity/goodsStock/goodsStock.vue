<template>
	<view class="goodsStock">
		<u-navbar back-icon-color='#ffffff' title="初始库存设置" :background="background" title-color="#ffffff">
			<template slot="right">
				<text class="right_icon" @click="sure">确认</text>
			</template>
		</u-navbar>
		<view class="box">
			<view class="left">
				<block v-for="(item,index) in list" :key="index">
					<view class="l-box">
						<view class="l-item" @click="itemClick(index)" :class="active==index? 'active':''">{{item.name}}</view>
						<text class="sot" v-show="item.checked">{{item|sumStock}}</text>
					</view>
				</block>
			</view>
			<view class="right" v-if="list[active]">
				<block v-for="(item,index) in list[active].data" :key='index'>
					<view class="r-item" v-for="(itemSize,indexSize) in item.data" :key="indexSize">
						<text v-if="indexSize==0">{{item.name}}</text>
						<text v-else></text>
						<text>{{itemSize.name}}</text>
						<u-input placeholder='' class="bounded" :border="true" :clearable='false' height="50" v-model="itemSize.stock"
						 type="number" />
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				list: [],
				active: 0,
			}
		},
		filters: {
			sumStock(item) {
				let number = 0;
				item.data.map(v => {
					v.data.map((v1) => {
						number += Number(v1.stock)
					})
				})
				if (number > 0) {
					item['checked'] = true
				} else {
					item['checked'] = false

				}
				return number.toFixed()
			}
		},
		methods: {
			itemClick(index) {
				this.active = index;
			},
			init() {
				this.list = this.$u.deepClone(store.state.goodsStockDa);
				let a1 = store.state.store.storesArr
				let a2 = store.state.colorDa
				let a3 = store.state.sizerDa
				this.list.map((v, i) => {
					v['checked'] = false
					a1.map((v1, i1) => {
						if (v1.store_id == v.store_id) {
							v['name'] = v1.name
							v.data.map((v2, i2) => {
								a2.map((v3, i3) => {
									if (v2.color_id == v3.id) {
										v2['name'] = v3.name
										v2.data.map((v4, i4) => {
											if(v4.stock>0&&!v.checked){
												v['checked'] = true
											}
											a3.map((v5, i5) => {
												if (v4.size_id == v5.id) {
													v4['name'] = v5.name	
												}
											})
										})
									}
								})
							})
						}
					})
				this.$set(this.list,i,this.list[i])
				})
			},
			// 确认
			sure() {
				let obj = this.$u.deepClone(this.list);
				obj.map((v)=>{
					delete v.name;
					delete v.checked;
					v.data.map((v1)=>{
						delete v1.name
						v1.data.map((v2)=>{
							delete v2.name
						})
					})
				})
				this.$store.commit('goodsStockFn', {
					goodsStockDa: obj
				});
				uni.navigateBack()
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style scoped lang="scss">
	.goodsStock {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.right_icon {
			color: #FFFFFF;
			margin-right: 30rpx;
		}

		.box {
			width: 100vw;
			height: 100%;
			display: flex;
			flex-direction: row;

			.active {
				background-color: #FFFFFF;
			}

			.left {
				width: 30vw;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				background-color: #EEEEF8;
				overflow: hidden;
				overflow-y: scroll;

				.l-box {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					position: relative;
				}

				.l-item {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 30rpx 0;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.sot {
					min-width: 45rpx;
					height: 45rpx;
					position: absolute;
					right: 0;
					top: 0;
					background-color: #FF5A5F;
					color: #FFFFFF;
					border-radius: 50%;
					padding: 10rpx;
					font-size: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.right {
				width: 70vw;
				height: 100%;
				display: flex;
				flex-direction: column;
				background-color: #FFFFFF;
				overflow: hidden;
				overflow-y: scroll;

				.r-item {
					border-bottom: 0.01rem solid #E5E5E5;
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					text {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 20rpx 0;
					}

					.bounded {
						margin: 10rpx 10rpx 10rpx 0;
						// border-bottom: 1rpx solid #007AFF !important;

					}
				}
			}
		}
	}
</style>
