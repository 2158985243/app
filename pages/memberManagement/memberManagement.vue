<template>
	<view class="memberManagement">
		<u-navbar back-icon-color='#ffffff' :background="background">
			<view class="slot-wrap">
				<u-search class='search' height='60' @change="search" :show-action="false" :focus='true' :scan="true" shape="square"
				 placeholder="请输入会员卡号、手机号或姓名" v-model="keyword" @Inventory="handelScan"></u-search>
			</view>
			<template slot="right">
				<u-icon name="plus" @click="toAddMember" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<view class="nav">
			<view class="nav-li">
				<view class="li-name">
					<view class="list" v-for="(item,index) in cus_list" :key="index">
						{{item}}
					</view>
				</view>
				<view class="shaixuan">
					<text>筛选</text>
					
				</view>
			</view>
			<view class="nav-title">
				<view class="sum-number">
					会员总数80位，共筛选16，已选1
				</view>
				<view class="nav-radio">
					<text>全选</text>
					<u-checkbox-group>
						<u-checkbox v-model="sumValue" shape="square"></u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</view>
		<view class="list">
			
		</view>
		<view class="footers">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				keyword: '',
				sumValue:false,
				cus_list:['近30天生日',"优质会员","余额>0","欠款会员"]
			}
		},
		onLoad(option) {
			console.log(option)
			this.keyword = option.val;
		},
		methods: {
			search: function(value) {
				console.log(value)
			},
			handelScan: function() {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						// console.log('条码内容：' + res.result);
						this.keyword = res.result;
					}
				});
			},
			toAddMember(){
				uni.navigateTo({
					url: `/pages/addMembership/addMembership`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.memberManagement {
		width: 100%;
		display: flex;
		flex-direction: column;

		.right_icon {
			margin-right: 30rpx;
		}

		.slot-wrap {
			display: flex;
			align-items: center;
			width: 90%;

			.search {}

			/* 如果您想让slot内容占满整个导航栏的宽度 */
			/* flex: 1; */
			/* 如果您想让slot内容与导航栏左右有空隙 */
			/* padding: 0 30rpx; */
		}
		/deep/.u-border-bottom:after{
			border-bottom-width:0;
		}
		.nav{
			width: 100%;
			display: flex;
			flex-direction: column;
			height: 110rpx;
			.nav-li{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				height: 60rpx;
				background-color: #2979ff;
				.li-name{
					display: flex;
					flex-direction: row;
					
					.list{
						height: 40rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 4rpx;
						border: 2rpx solid #dadada;
						color: #dadada;
						border-radius: 8rpx;
						margin-left: 20rpx;
						font-size: 20rpx;
					}
				}
				.shaixuan{
					color: #FFFFFF;
					margin-right: 20rpx;
				}
			}
			.nav-title{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				// padding: 20rpx;
				height: 50rpx;
				padding-left: 20rpx;
				align-items: center;
				background-color: #edecf1;
				.nav-radio{
					text{
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>
