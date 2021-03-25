<template>
	<view class="memberManagement">
		<u-navbar back-icon-color='#ffffff' :background="background">
			<view class="slot-wrap">
				<u-search class='search' height='60' @change="search" :show-action="false" :scan="true" shape="square" placeholder="请输入会员卡号、手机号或姓名"
				 v-model="keyword" @Inventory="handelScan"></u-search>
			</view>
			<template slot="right">
				<u-icon name="plus" @click="toAddMember" color="#ffffff" class="right_icon" size="34"></u-icon>
			</template>
		</u-navbar>
		<!-- 选择类型 -->
		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" v-for="(item,index) in navs" @tap.stop="navClick(item)">
					<text>{{item.name}}</text>
				</view>
			</view>
		</u-mask>


		<view class="list-data">
			<view class="nav">
				<view class="nav-li">
					<view class="select-left" @click="show = true">
						<text class="select-box">{{sort_name}}</text>
						<u-icon name="arrow-down-fill" color="#cccccc" size="20"></u-icon>
					</view>
					<view class="select-right" @click="sortChanged">
						<text>排序</text>
						<view class="sort">
							<u-icon name="arrow-up-fill" :color="sort_checked==true? '#ffffff':'#cccccc'" size="20"></u-icon>
							<u-icon name="arrow-down-fill" :color="sort_checked==false? '#ffffff':'#cccccc'" size="20"></u-icon>
						</view>
					</view>
					<view class="select-sx" @click="screen_checked = !screen_checked">
						<text>筛选</text>
						<u-icon name="arrow-down-fill" color="#ffffff" size="20"></u-icon>
					</view>
				</view>

				<!-- 筛选日期 -->
				<view class="select-data" v-if="form.type==2">
					<view class="left">
						选择日期
					</view>
					<view class="right">
						<view class="date-list" v-for="(item,index) in date_list" :key="index" @click="clickDate(index)">
							<text :class="active_date==index? 'active_date':''">{{item}}</text>
						</view>
					</view>
				</view>
				<!-- 筛选日期 -->
				<view class="select-data" v-if="form.type==8">
					<view class="left">
						选择日期
					</view>
					<view class="right">
						<view class="date-list" v-for="(item,index) in birthday_list" :key="index" @click="clickBirthday(index)">
							<text :class="birthday_list_date==index? 'active_date':''">{{item}}</text>
						</view>
					</view>
				</view>

				<view class="nav-title"  v-if="!screen_checked">
					<view class="sum-number">
						会员总数{{total}}位，共筛选{{list.length}}，已选{{selected}}
					</view>
					<view class="nav-radio">
						<text>全选</text>
						<u-checkbox-group @change="checkboxGroupChange">
							<u-checkbox v-model="sumValue" shape="square"></u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
				<view class="screen" v-if="(form.type==2||form.type==8)&&screen_checked">
					<view class="screen-item">
						<text class="tit">会员等级</text>
						<view class="screen-box">
							<view class="screen-list" :class="item.checked? 'lan':''" v-for="(item,index) in leve_list" :key="index" @click="leveItem(item)">
								<text>{{item.name}}</text>
							</view>
						</view>
					</view>
					<view class="screen-item">
						<text class="tit">标签</text>
						<view class="screen-box">
							<view class="screen-list" :class="item.checked? 'lan':''" v-for="(item,index) in tag_list" :key="index"  @click="tagItem(item)">
								<text>{{item.tag}}</text>
							</view>
						</view>
					</view>
					<view class="screen-btn">
						<view class="left">
							<view class="qk"  @click="clear">
								清空
							</view>
						</view>
						<view class="right">
							<view class="qx" @click="screen_checked = false">
								取消
							</view>
							<view class="qd" @click="sure">
								确定
							</view>
						</view>
					</view>
				</view>
				<view class="screen-l" v-if="form.type!=2&&form.type!=8&&screen_checked">
					<view class="screen-item">
						<text class="tit">会员等级</text>
						<view class="screen-box">
							<view class="screen-list" :class="item.checked? 'lan':''" v-for="(item,index) in leve_list" :key="index" @click="leveItem(item)">
								<text >{{item.name}}</text>
							</view>
						</view>
						
					</view>
					<view class="screen-item">
						<text class="tit">标签</text>
						<view class="screen-box">
							<view class="screen-list" :class="item.checked? 'lan':''" v-for="(item,index) in tag_list" :key="index" @click="tagItem(item)">
								<text>{{item.tag}}</text>
							</view>
						</view>
					</view>
					<view class="screen-btn">
						<view class="left">
							<view class="qk" @click="clear">
								清空
							</view>
						</view>
						<view class="right">
							<view class="qx"  @click="screen_checked = false">
								取消
							</view>
							<view class="qd"  @click="sure">
								确定
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list">

				<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
				 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
				 :autoPullUp="autoPullUp" :inBottom="pull" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
					<view class="li" v-for="(item,index) in list" :key="index" @click="customerOf(item)">
						<view class="left">
							<view class="img">
								<u-image width="100" border-radius='18' height="100" mode='aspectFit' :src="$cfg.domain+item.image">
								</u-image>
							</view>
							<view class="name">
								<view class="left-ta">
									<text>{{item.name}}</text>
									<view class="bg" v-if="item.debt>0">
										欠款
									</view>
									<view class="bg" v-if="item.expired">
										过期
									</view>
									<view class="bg" v-if="item.status==0">
										挂失
									</view>
								</view>
								<text class="tob">{{item.customer_level.name}}</text>
							</view>

						</view>
						<view class="right">
							<view class="checked">
								<u-checkbox-group>
									<u-checkbox v-model="item.checked" shape="circle"></u-checkbox>
								</u-checkbox-group>
							</view>
							<view class="date">
								<text class="t2" v-if="form.type==0||form.type==1||form.type==2">{{item.c_time}}</text>
								<text class="t2" v-if="form.type==3">欠款金额</text>
								<text class="t2" v-if="form.type==4">累计消费: <text class="red">{{item.resume}}</text></text>
								<text class="t2" v-if="form.type==6">当前余额: <text class="red">{{item.balance}}</text></text>
								<text class="t2" v-if="form.type==7">当前积分: <text class="red">{{item.point}}</text></text>
								<text class="t1 red" v-if="form.type==3">{{item.debt}}</text>
								<text class="t2 red" v-if="form.type==8">{{item.briDate}}</text>
								<text class="t2" v-if="form.type==5">累计次数:<text class="red">{{item.resume_times}}</text></text>
								<text class="t1" v-if="form.type==4">消费次数:<text class="red">{{item.resume_times}}</text></text>
								<text class="t1" v-if="form.type==0">已注册{{item.days}}天</text>
								<text class="t1" v-if="form.type==6">累计充值:{{item.recharge}}</text>
								<text class="t1" v-if="form.type==7">累计积分:{{item.cumulative_point}}</text>
								<text class="t1" v-if="form.type==8">距今{{item.oldTime}}天</text>
								<text class="t1" v-if="(form.type==1||form.type==2||form.type==5)&&item.resume_times==0">从未消费</text>
								<text class="t1" v-if="(form.type==1||form.type==2||form.type==5)&&item.resume_times>0">{{item.time_resume}}天未消费</text>

							</view>

						</view>
					</view>
				</k-scroll-view>
			</view>
			<u-toast ref="uToast" />
		</view>

		<view class="footers">
			发短信
		</view>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		customerList,
		getTag,
	} from '../../api/customer.js'
	import {
		customerLevelList
	} from '../../api/customerLevel.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				background: {
					backgroundColor: '#2979ff'
				},
				keyword: '',
				sumValue: false,
				cus_list: ['近30天生日', "优质会员", "余额>0", "欠款会员"],
				list: [],
				page: 1,
				page_size: 20,
				keyword: '',
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--到底了--',
				touchHeight: 50,
				height: 0,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				last_page: 0,
				style_input: {
					'background-color': '#ffffff'
				},
				total: 0,
				last: false,
				pull: false,
				form: {
					type: 0
				},
				sort_checked: false,
				show: false,
				sort_name: '最新会员',
				navs: [{
						type: 0,
						name: "最新会员"
					}, {
						type: 1,
						name: "最近到店"
					}, {
						type: 2,
						name: "流失会员"
					}, {
						type: 3,
						name: "欠款会员"
					}, {
						type: 4,
						name: "消费金额"
					}, {
						type: 5,
						name: "消费次数"
					}, {
						type: 6,
						name: "会员余额"
					}, {
						type: 7,
						name: "会员积分"
					}, {
						type: 8,
						name: "近期生日"
					}
					// , {
					// 	type: 9,
					// 	name: "客单价"
					// }, {
					// 	type: 10,
					// 	name: "用券金额"
					// },
				],
				date_list: [
					'近30天',
					'近3个月',
					'近6个月',
					'近1年'
				],
				birthday_list: [
					'今天',
					'明天',
					'近7天',
					'近30天'
				],
				active: 0,
				active_date: 0,
				birthday_list_date: 0,
				tag_list: [],
				leve_list: [],
				screen_checked:false,
			}
		},

		computed: {
			selected() {
				let sum = 0
				this.list.map((v) => {
					if (v.checked) {
						sum++
					}
				})
				return sum
			}
		},
		methods: {
			// 确定
			sure(){
				this.screen_checked = false
				this.form.customer_level_ids = []
				this.form.tags = []
				this.leve_list.map(v=>{
					if(v.checked){
						// console.log(v);
						this.form.customer_level_ids.push(v.id)
					}
				})
				this.tag_list.map(v=>{
					if(v.checked){
						// console.log(v);
						this.form.tags.push(v.tag)
					}
				})
				// if(this.form.customer_level_ids.length>0||this.form.tags.length>0){
					this.init()
				// }
			},
			// 清空
			clear(){
				this.tag_list.map(v=>{
					v.checked = false
				})
				this.leve_list.map(v=>{
					v.checked = false
				})
			},
			// 会员等级
			leveItem(item){
				item.checked = !item.checked
				this.$forceUpdate()
			},
			// 标签
			tagItem(item){
				item.checked = !item.checked
				this.$forceUpdate()
			},
			async tags() {
				let res = await getTag()
				console.log(res);
				if (!res.code) {
					res.map(v=>{
						v['checked'] = false
						this.tag_list.push(v)
					})
					
				}
			},
			async leves() {
				let res = await customerLevelList()
				if (!res.code) {
					res.map(v=>{
						v['checked'] = false
						this.leve_list.push(v)
					})
				}
			},
			// 选流失日期
			clickDate(index) {
				this.active_date = index
				this.form.last_resume = index + 1
				this.init()
			},
			// 选生日日期
			clickBirthday(index) {
				this.birthday_list_date = index
				this.form.birthday = index + 1
				this.init()
			},

			checkboxGroupChange() {
				// console.log(this.sumValue);
				if (this.sumValue) {
					this.list.map((v) => {
						v.checked = true
					})
				} else {
					this.list.map((v) => {
						v.checked = false
					})
				}
			},
			search: function(value) {
				this.form.keyword = value
				this.init()
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
			// 增加会员
			toAddMember() {
				uni.navigateTo({
					url: `/pages/addMembership/addMembership`
				})
			},
			// 初始化
			async init(v) {
				let res = await customerList({
					...this.form,
					page: this.page,
					page_size: this.page_size
				})
				if (this.page == 1) {
					this.list = []
				}
				let today = Math.floor(((new Date()).getTime()) / 1000);
				res.data.map((v) => {
					let e_time = 0;
					v['checked'] = false;
					v.mobile = v.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
					v.c_time = this.$u.timeFormat(v.created_at, 'yyyy-mm-dd');
					v['oldTime'] = Math.abs(Math.floor((today - new Date(v.birthday).getTime() / 1000) / (3600 * 24)))
					v['briDate'] = `${v.birthday.slice(5,7)}月${v.birthday.slice(8,10)}日`;
					let time_last = today - Number(v.last_resume_at)
					e_time = today - Number(v.created_at)
					v['days'] = Math.floor(e_time / (3600 * 24))
					v['time_resume'] = Math.floor(time_last / (3600 * 24))
				})
				this.list.push(...res.data)
				this.last_page = res.last_page
				// console.log(res);
				this.total = res.total
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.page = 1;
				this.list = [];
				this.pull = false
				this.init()
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if (!this.pull) {
					if (this.page >= this.last_page) {
						this.$refs.uToast.show({
							title: '加载到底了',
							type: 'default',
							position: 'bottom'
						})
						this.pull = true

					} else {
						this.page++;
						this.init()
					}
				}
				stopLoad ? stopLoad() : '';
			},
			// 切换排序顺序
			sortChanged() {
				this.sort_checked = !this.sort_checked;
				if (!this.sort_checked) {
					this.form.sort = 1
				} else {
					this.form.sort = 0
				}
				this.page = 1;
				this.init()
			},
			// 选择类型
			navClick(item) {
				this.show = false;
				this.sort_name = item.name;
				this.form.type = item.type;
				this.page = 1;
				this.active = 0;
				this.pull = false;
				// 需要时间段的类型
				if (this.form.type == 2 || this.form.type == 8) {
					if (this.form.type == 2) {
						this.form.last_resume = 1
						this.form.birthday = ''
						this.init()
					}
					if (this.form.type == 8) {
						this.form.birthday = 1
						this.form.last_resume = ''
						this.init()
					}
				} else {
					this.form.birthday = ''
					this.form.last_resume = ''
					this.init()
				};
			},
			// 详情
			customerOf(item) {
				// console.log(item);
				uni.navigateTo({
					url: `/pages/customer/customer?id=${item.id}`
				})
			}
		},
		onShow() {
			this.init();
		},
		onLoad(option) {
			// console.log(option)
			this.keyword = option.val;
			this.tags()
			this.leves()
		},
	}
</script>

<style scoped lang="scss">
	.memberManagement {
		width: 100%;
		// height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;

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

		/deep/.u-border-bottom:after {
			border-bottom-width: 0;
		}

		.warp {
			width: 94%;
			margin: 0 auto;
			background-color: #FFFFFF;
			margin-top: calc(200rpx + var(--status-bar-height));
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			overflow: hidden;

			.rect {
				width: 100%;
				display: flex;
				padding: 20rpx 0;
				justify-content: center;
				align-items: center;
				border-bottom: 0.01rem solid #E5E5E5;
			}
		}

		.list-data {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;

			.list {
				width: 100%;
				margin-bottom: 80rpx;
				display: flex;
				flex-direction: column;
			}

			.li {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0 20rpx 20rpx;
				border-bottom: 0.01rem solid #F5F5F5;

				.left {
					flex: 1;
					display: flex;
					flex-direction: row;

					.img {
						margin-right: 20rpx;
					}

					.name {
						width: 100%;
						display: flex;
						flex-direction: column;
						position: relative;

						.left-ta {
							display: flex;
							flex-direction: row;

							.bg {
								padding: 0 4rpx;
								border: 1rpx solid #DD524D;
								color: #DD524D;
								font-size: 20rpx;
								border-radius: 8rpx;
								text-align: center;
								margin: 0 10rpx;
							}
						}

						.tob {
							width: 100%;
							position: absolute;
							bottom: 0;
							color: #979699;
							font-size: 20rpx;
						}
					}
				}

				.right {
					flex: 1;
					display: flex;
					flex-direction: row-reverse;
					align-items: center;

					// justify-content: center;
					.checked {
						margin-left: 20rpx;
					}

					.date {
						display: flex;
						flex-direction: column;

						.t1 {
							font-size: 20rpx;
							text-align: right;
							padding-top: 15rpx;
						}

						.red {
							color: #FF5A5F !important;
						}

						.t2 {
							padding-bottom: 15rpx;
							font-size: 20rpx;
						}
					}
				}
			}

		}

		.nav {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: sticky;
			top: calc(80rpx + var(--status-bar-height));
			z-index: 99;

			.nav-li {
				width: 100%;
				height: 100rpx;
				display: flex;
				flex-direction: row;
				background-color: #2979ff;
				justify-content: center;
				align-items: center;
				padding: 20rpx;

				.select-left {
					width: 70%;
					height: 60rpx;
					display: flex;
					align-items: center;
					flex-direction: row;
					justify-content: space-between;
					background-color: #FFFFFF;
					padding: 20rpx;
					border-radius: 10rpx;

					.select-box {
						width: 100%;
						text-align: center;
						color: #000000;
					}
				}

				.select-right {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-left: 10rpx;

					text {
						width: 80rpx;
						color: #FFFFFF;
						padding: 0 10rpx;
					}

					.sort {
						display: flex;
						flex-direction: column;
					}
				}

				.select-sx {
					width: 15%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					color: #FFFFFF;
				}
			}

			.select-data {
				width: 100%;
				height: 60rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				background-color: #2979ff;
				padding: 0 20rpx;

				.left {
					color: #FFFFFF;
					font-size: 26rpx;
				}

				.right {
					display: flex;
					flex-direction: row;

					.date-list {
						padding: 0 10rpx;

						text {
							color: #E5E5E5;
						}

						font-size: 26rpx;
					}

					.active_date {
						color: #FFFFFF !important;
					}
				}
			}

			.nav-title {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				// padding: 20rpx;
				height: 50rpx;
				padding-left: 20rpx;
				align-items: center;
				background-color: #edecf1;

				.nav-radio {
					text {
						margin-right: 10rpx;
					}
				}
			}

			.screen {
				width: 100%;
				height: calc(100vh - (234rpx + var(--status-bar-height)));
				background-color: #E5E5E5;
				display: flex;
				flex-direction: column;
				position: relative;
				.screen-item {
					width: 100%;
					display: flex;
					flex-direction: column;

					.tit {
						padding: 20rpx;
						background-color: #F6F6F6;
					}

					.screen-box {
						background-color: #FFFFFF;
						width: 100%;
						padding: 0 2.5%;
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;

						.screen-list {
							width: 20%;
							margin: 10rpx 2.5%;
							padding: 20rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 10rpx;
							border: 1rpx solid #E5E5E5;
							font-size: 24rpx;

						}
						.lan{
							background-color: #007AFF;
							color: #FFFFFF;
						}
					}
				}
				.screen-btn{
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					position: absolute;
					bottom: 0;
					padding: 10rpx 20rpx;
					.left{
						display: flex;
						justify-content: center;
						align-items: center;
						.qk{
							width: 140rpx;
							height: 60rpx;
							background-color: #C8C7CC;
							color: #FFFFFF;
							border-radius: 10rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
					.right{
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: row;
						.qx{
							width: 140rpx;
							height: 60rpx;
							background-color: #C8C7CC;
							color: #000000;
							border-radius: 10rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							margin-right: 20rpx;
						}
						.qd{
							width: 140rpx;
							height: 60rpx;
							background-color: #4988EF;
							color: #FFFFFF;
							border-radius: 10rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}

			.screen-l {
				width: 100%;
				height: calc(100vh - (184rpx + var(--status-bar-height)));
				background-color: #E5E5E5;
				display: flex;
				flex-direction: column;
				position: relative;
				.screen-item {
					width: 100%;
					display: flex;
					flex-direction: column;

					.tit {
						padding: 20rpx;
						background-color: #F6F6F6;
					}

					.screen-box {
						background-color: #FFFFFF;
						width: 100%;
						padding: 0 2.5%;
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;

						.screen-list {
							width: 20%;
							margin: 10rpx 2.5%;
							padding: 20rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 10rpx;
							border: 1rpx solid #E5E5E5;
							font-size: 24rpx;

						}
						.lan{
							background-color: #007AFF;
							color: #FFFFFF;
						}
					}
					
					
				}
				.screen-btn{
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					position: absolute;
					bottom: 0;
					padding: 10rpx 20rpx;
					.left{
						display: flex;
						justify-content: center;
						align-items: center;
						.qk{
							width: 140rpx;
							height: 60rpx;
							background-color: #C8C7CC;
							color: #FFFFFF;
							border-radius: 10rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
					.right{
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: row;
						.qx{
							width: 140rpx;
							height: 60rpx;
							background-color: #C8C7CC;
							color: #000000;
							border-radius: 10rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							margin-right: 20rpx;
						}
						.qd{
							width: 140rpx;
							height: 60rpx;
							background-color: #4988EF;
							color: #FFFFFF;
							border-radius: 10rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}

		}

		.footers {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #007AFF;
			color: #FFFFFF;
			position: fixed;
			bottom: 0;
			z-index: 9;
		}
	}
</style>
