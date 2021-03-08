<template>
	<view class="goodsAnalyse">
		<u-navbar back-icon-color='#ffffff' title="商品分析" :background="background" title-color="#ffffff">
			<template slot="right">
				<u-icon name="arrow-down-fill" color="#ffffff" @click="popup" class="right_icon" size="36"></u-icon>
			</template>
		</u-navbar>
		<!-- 标题 -->
		<view class="nav">
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
		</view>
		<!-- 选择类型 -->
		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" v-for="(item,index) in navs" @tap.stop="navClick(item)">
					<text>{{item.name}}</text>
				</view>
			</view>
		</u-mask>
		<!-- 商品列表 -->
		<view class="goods-list">
			<!-- 商品头部标题 -->
			<view class="nav-header">
				<!-- 时间段 -->
				<view class="time-quantum" v-if="form.type==2||form.type==5||form.type==6||form.type==8">
					<view class="left">
						选择日期
					</view>
					<view class="right">
						<text class="gray" v-for="(item,index) in times" :key="index" @click="timesFn(index)" :class="active==index? 'active':'' ">{{item}}</text>
					</view>
				</view>
				<!-- 天数 -->
				<view class="dates" v-if="form.type==4">
					<view class="left">
						选择日期
					</view>
					<view class="right">
						<text class="gray" v-for="(item,index) in timed" :key="index" @click="timedFn(index)" :class="active==index? 'active':'' ">{{item}}</text>
					</view>
				</view>
				<view class="nav-title">
					<text class="gd" v-if="form.type==8">进货金额</text>
					<text class="gd" v-else>商品</text>
					<view class="tit-data">
						<text v-if="form.type==0||form.type==3">上市天数</text>
						<text v-if="form.type==1">售罄率</text>
						<text v-if="form.type==2">毛利</text>
						<text v-if="form.type==4">滞留天数</text>
						<text v-if="form.type==0||form.type==1||form.type==2||form.type==3||form.type==4">进销存</text>
						<text v-if="form.type==5">销售数量</text>
						<text v-if="form.type==8">进货数量</text>
						<text v-if="form.type==5||form.type==7||form.type==8">库存数量</text>
						<text v-if="form.type==6">销售金额</text>
						<text v-if="form.type==6||form.type==7">库存金额</text>
					</view>
				</view>

			</view>
			<!-- 商品列表 -->
			<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
			 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
			 :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
				<view class="list" v-if="form.type==8">
					<view class="left">
						<text class="sum">总计:{{total.purchase_money}}</text>
					</view>
					<view class="right">
						<text class="right-day">{{total.purchase}}</text>
						<text class="right-item">{{total.stock}}</text>
					</view>
				</view>
				<view class="list" v-if="form.type==2||form.type==5||form.type==6||form.type==7">
					<view class="left">
						<text class="sum">总计</text>
					</view>
					<view class="right">
						<text class="right-day">{{total.money||total.quantity||total.sales_money}}</text>
						<text class="right-item">{{total.stock||total.stock_money}}</text>
					</view>
				</view>
				<view class="list" v-for="(item,index) in list" :key="index" @click="toDetails(item)">
					<view class="left">
						<u-image width="80rpx" mode='aspectFit' class="header_image" height="80rpx" :src="$cfg.domain+item.main_image"></u-image>
						<view class="left-item">
							<text class="black">{{item.number}}<text class="gray">{{item.name}}</text></text>
							<text class="gy">零售价:&yen;{{item.retail_price}}</text>
							<text class="gy" v-if="form.type==1||form.type==2||form.type==3||form.type==5||form.type==6">实销价:&yen;{{item.real_price}}({{(Number(item.real_price)/Number(item.retail_price)*10).toFixed(2)}}折)</text>
							<text class="gy" v-else>上市天数:{{item.day}}天</text>

						</view>
					</view>
					<view class="right">
						<text class="right-day" v-if="form.type==0||form.type==3">{{item.day}}天</text>
						<text class="right-day" v-if="form.type==4">{{item.no_sales_day}}天</text>
						<text class="right-day" v-if="form.type==1">{{item.percent}}</text>
						<text class="right-day" v-if="form.type==5">{{item.sales}}</text>
						<text class="right-day" v-if="form.type==2">{{item.money}}</text>
						<text class="right-day" v-if="form.type==6">{{item.sales_money}}</text>
						<text class="right-day" v-if="form.type==7">{{item.stock}}</text>
						<text class="right-day" v-if="form.type==8">{{item.quantity}}</text>

						<view class="right-item" v-if="form.type==5||form.type==8">
							{{item.stock}}
						</view>
						<view class="right-item" v-if="form.type==6||form.type==7">
							{{item.stock_money}}
						</view>
						<view class="right-item" v-if="form.type==0||form.type==1||form.type==2||form.type==3||form.type==4">
							<text>进货:{{item.purchase}}</text>
							<text>销售:{{item.sales}}</text>
							<text>库存:{{item.stock}}</text>
						</view>

					</view>
				</view>
			</k-scroll-view>
			<u-toast ref="uToast" />
		</view>

		<!-- 筛选 -->
		<u-popup v-model="showed" mode="right" width="80%">

			<view class="popup-right">
				<view class="pop-title">
					<u-icon name="arrow-left" color="#000000" @click='showed=false' size="40"></u-icon>
					<view class="sx">筛选</view>
					<view class="qd">

					</view>
				</view>
				<view class="pop-list">

					<view class="nav-box">
						<view class="nav-tit" @click="str_down_up = !str_down_up">
							<text class="ht">店铺</text>
							<view class="right">
								<text class="conts">{{infos.stores|filtersFn}}</text>
								<u-icon name="arrow-down" v-if="!str_down_up" color="#cccccc" size="28"></u-icon>
								<u-icon name="arrow-up" v-else color="#cccccc" size="28"></u-icon>
							</view>
						</view>
						<view class="nav-list" v-if="str_down_up">
							<view class="lak" v-for="(item,index) in infos.stores" :key="index">
								<view class="nav-name" v-if="index<8">
									<view class="nav-kk" @click.stop="clickStores(item,index)" :class="item.checked? 'actives':''">
										{{item.name}}
									</view>
								</view>
								<view class="nav-name gd" v-if="index==8">
									<view class="nav-kk " @click.stop="barndArr">
										更多店铺
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav-tit" @click="lb_down_up = !lb_down_up">
							<text class="ht">类别</text>
							<view class="right">
								<text class="conts">{{CategoryList|filtersFn}}</text>
								<u-icon name="arrow-down" v-if="!lb_down_up" color="#cccccc" size="28"></u-icon>
								<u-icon name="arrow-up" v-else color="#cccccc" size="28"></u-icon>
							</view>
						</view>
						<view class="nav-list" v-if="lb_down_up">
							<view class="lak" v-for="(item,index) in CategoryList" :key="index">
								<view class="nav-name" v-if="index<8">
									<view class="nav-kk" @click.stop="clickCate(item,index)" :class="item.checked? 'actives':''">
										{{item.name}}
									</view>
								</view>
								<view class="nav-name gd" v-if="index==8">
									<view class="nav-kk" @click.stop="categoryArr">
										更多类别
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav-tit" @click="gd_down_up = !gd_down_up">
							<text class="ht">商品</text>
							<view class="right">
								<text class="conts"></text>
								<u-icon name="arrow-down" v-if="!gd_down_up" color="#cccccc" size="28"></u-icon>
								<u-icon name="arrow-up" v-else color="#cccccc" size="28"></u-icon>
							</view>
						</view>
						<view class="nav-list" v-if="gd_down_up">
							<view class="goods-item">
								<view class="goods-name">
									<view class="goods-kk">
										<u-input placeholder='请输入商品货号/商品名称' input-align='center' height="60" v-model="keyword" type="text" />
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav-tit" @click="jg_down_up = !jg_down_up">
							<text class="ht">价格区间</text>
							<view class="right">
								<text class="conts"></text>
								<u-icon name="arrow-down" v-if="!jg_down_up" color="#cccccc" size="28"></u-icon>
								<u-icon name="arrow-up" v-else color="#cccccc" size="28"></u-icon>
							</view>
						</view>
						<view class="nav-list" v-if="jg_down_up">
							<view class="goods-item">
								<view class="goods-name">
									<view class="goods-kk">
										<u-input placeholder='最低价' input-align='center' height="60" v-model="min" type="number" />
									</view>
									一
									<view class="goods-kk">
										<u-input placeholder='最高价' input-align='center' height="60" v-model="max" type="number" />
									</view>

								</view>
							</view>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav-tit" @click="year_down_up = !year_down_up">
							<text class="ht">年份</text>
							<view class="right">
								<text class="conts">{{infos.year|filtersFn}}</text>
								<u-icon name="arrow-down" v-if="!year_down_up" color="#cccccc" size="28"></u-icon>
								<u-icon name="arrow-up" v-else color="#cccccc" size="28"></u-icon>
							</view>
						</view>
						<view class="nav-list" v-if="year_down_up">
							<view class="lak" v-for="(item,index) in infos.year" :key="index">
								<view class="nav-name" v-if="index<8">
									<view class="nav-kk" @click.stop="clickYears(item,index)" :class="item.checked? 'actives':''">
										{{item.name}}
									</view>
								</view>
								<view class="nav-name gd" v-if="index==8">
									<view class="nav-kk " @click.stop="barndArr">
										更多年份
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav-tit" @click="season_down_up = !season_down_up">
							<text class="ht">季节</text>
							<view class="right">
								<text class="conts">{{infos.season|filtersFn}}</text>
								<u-icon name="arrow-down" v-if="!season_down_up" color="#cccccc" size="28"></u-icon>
								<u-icon name="arrow-up" v-else color="#cccccc" size="28"></u-icon>
							</view>
						</view>
						<view class="nav-list" v-if="season_down_up">
							<view class="lak" v-for="(item,index) in infos.season" :key="index">
								<view class="nav-name" v-if="index<8">
									<view class="nav-kk" @click.stop="clickSeason(item,index)" :class="item.checked? 'actives':''">
										{{item.name}}
									</view>
								</view>
								<view class="nav-name gd" v-if="index==8">
									<view class="nav-kk " @click.stop="barndArr">
										更多季节
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav-tit" @click="pp_down_up = !pp_down_up">
							<text class="ht">品牌</text>
							<view class="right">
								<text class="conts">{{brandList|filtersFn}}</text>
								<u-icon name="arrow-down" v-if="!pp_down_up" color="#cccccc" size="28"></u-icon>
								<u-icon name="arrow-up" v-else color="#cccccc" size="28"></u-icon>
							</view>
						</view>
						<view class="nav-list" v-if="pp_down_up">
							<view class="lak" v-for="(item,index) in brandList" :key="index">
								<view class="nav-name" v-if="index<8">
									<view class="nav-kk" @click.stop="clickBrand(item,index)" :class="item.checked? 'actives':''">
										{{item.name}}
									</view>
								</view>
								<view class="nav-name gd" v-if="index==8">
									<view class="nav-kk " @click.stop="barndArr">
										更多品牌
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav-tit" @click="fg_down_up = !fg_down_up">
							<text class="ht">风格</text>
							<view class="right">
								<text class="conts">{{infos.model|filtersFn}}</text>
								<u-icon name="arrow-down" v-if="!fg_down_up" color="#cccccc" size="28"></u-icon>
								<u-icon name="arrow-up" v-else color="#cccccc" size="28"></u-icon>
							</view>
						</view>
						<view class="nav-list" v-if="fg_down_up">
							<view class="lak" v-for="(item,index) in infos.model" :key="index">
								<view class="nav-name" v-if="index<8">
									<view class="nav-kk" @click.stop="clickModel(item,index)" :class="item.checked? 'actives':''">
										{{item.name}}
									</view>
								</view>
								<view class="nav-name gd " v-if="index==8">
									<view class="nav-kk " @click.stop="barndArr">
										更多风格
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav-tit" @click="ks_down_up = !ks_down_up">
							<text class="ht">款式</text>
							<view class="right">
								<text class="conts">{{infos.style|filtersFn}}</text>
								<u-icon name="arrow-down" v-if="!ks_down_up" color="#cccccc" size="28"></u-icon>
								<u-icon name="arrow-up" v-else color="#cccccc" size="28"></u-icon>
							</view>
						</view>
						<view class="nav-list" v-if="ks_down_up">
							<view class="lak" v-for="(item,index) in infos.style" :key="index">
								<view class="nav-name" v-if="index<8">
									<view class="nav-kk" @click.stop="clickStyle(item,index)" :class="item.checked? 'actives':''">
										{{item.name}}
									</view>
								</view>
								<view class="nav-name gd" v-if="index==8">
									<view class="nav-kk " @click.stop="barndArr">
										更多款式
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav-tit" @click="gys_down_up = !gys_down_up">
							<text class="ht">供应商</text>
							<view class="right">
								<text class="conts">{{infos.suppliers|filtersFn}}</text>
								<u-icon name="arrow-down" v-if="!gys_down_up" color="#cccccc" size="28"></u-icon>
								<u-icon name="arrow-up" v-else color="#cccccc" size="28"></u-icon>
							</view>
						</view>
						<view class="nav-list" v-if="gys_down_up">
							<view class="lak" v-for="(item,index) in infos.suppliers" :key="index">
								<view class="nav-name" v-if="index<8">
									<view class="nav-kk" @click.stop="clickSuppliers(item,index)" :class="item.checked? 'actives':''">
										{{item.name}}
									</view>
								</view>
								<view class="nav-name gd" v-if="index==8">
									<view class="nav-kk " @click.stop="barndArr">
										更多供应商
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav-tit" @click="st_down_up = !st_down_up">
							<text class="ht">状态</text>
							<view class="right">
								<text class="conts">{{status|filtersFn}}</text>
								<u-icon name="arrow-down" v-if="!st_down_up" color="#cccccc" size="28"></u-icon>
								<u-icon name="arrow-up" v-else color="#cccccc" size="28"></u-icon>
							</view>
						</view>
						<view class="nav-list" v-if="st_down_up">
							<view class="lak" v-for="(item,index) in status" :key="index">
								<view class="nav-name">
									<view class="nav-kk" @click.stop="clickStatus(item,index)" :class="item.checked? 'actives':''">
										{{item.name}}
									</view>
								</view>
							</view>
						</view>
					</view>


				</view>
				<view class="btn">

					<u-button class="open" @click='reset'>重置</u-button>
					<u-button class="open" type="primary" @click='determine'>确定</u-button>
				</view>
			</view>
		</u-popup>
		<!-- 店铺 -->
		<u-popup v-model="show3" mode="right" z-index='10077' width="80%">
			<view class="popup-right">
				<view class="pop-title">
					<u-icon name="arrow-left" color="#000000" @click='show3=false' size="40"></u-icon>
					<view class="sx">店铺</view>
					<view class="qd" @click="show3=false">
						确定
					</view>
				</view>
				<view class="pop-listt">
					<u-checkbox-group :wrap='true'>
						<u-checkbox shape="circle" @change="barlistChecked($event,index)" v-model="item.checked" v-for="(item, index) in infos.stores"
						 :key="index" :name="item.id">{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</u-popup>
		<!-- 风格 -->
		<u-popup v-model="show4" mode="right" z-index='10077' width="80%">
			<view class="popup-right">
				<view class="pop-title">
					<u-icon name="arrow-left" color="#000000" @click='show4=false' size="40"></u-icon>
					<view class="sx">风格</view>
					<view class="qd" @click="show4=false">
						确定
					</view>
				</view>
				<view class="pop-listt">
					<u-checkbox-group :wrap='true'>
						<u-checkbox shape="circle" @change="barlistChecked($event,index)" v-model="item.checked" v-for="(item, index) in infos.model"
						 :key="index" :name="item.id">{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</u-popup>
		<!-- 款式 -->
		<u-popup v-model="show5" mode="right" z-index='10077' width="80%">
			<view class="popup-right">
				<view class="pop-title">
					<u-icon name="arrow-left" color="#000000" @click='show5=false' size="40"></u-icon>
					<view class="sx">款式</view>
					<view class="qd" @click="show5=false">
						确定
					</view>
				</view>
				<view class="pop-listt">
					<u-checkbox-group :wrap='true'>
						<u-checkbox shape="circle" @change="barlistChecked($event,index)" v-model="item.checked" v-for="(item, index) in infos.style"
						 :key="index" :name="item.id">{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</u-popup>
		<!-- 供应商 -->
		<u-popup v-model="show6" mode="right" z-index='10077' width="80%">
			<view class="popup-right">
				<view class="pop-title">
					<u-icon name="arrow-left" color="#000000" @click='show6=false' size="40"></u-icon>
					<view class="sx">供应商</view>
					<view class="qd" @click="show6=false">
						确定
					</view>
				</view>
				<view class="pop-listt">
					<u-checkbox-group :wrap='true'>
						<u-checkbox shape="circle" @change="barlistChecked($event,index)" v-model="item.checked" v-for="(item, index) in infos.suppliers"
						 :key="index" :name="item.id">{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</u-popup>
		<!-- 品牌 -->
		<u-popup v-model="show1" mode="right" z-index='10077' width="80%">
			<view class="popup-right">
				<view class="pop-title">
					<u-icon name="arrow-left" color="#000000" @click='show1=false' size="40"></u-icon>
					<view class="sx">品牌</view>
					<view class="qd" @click="show1=false">
						确定
					</view>
				</view>
				<view class="pop-listt">
					<u-checkbox-group :wrap='true'>
						<u-checkbox shape="circle" @change="barlistChecked($event,index)" v-model="item.checked" v-for="(item, index) in brandList"
						 :key="index" :name="item.id">{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</u-popup>
		<!-- 类别 -->
		<u-popup v-model="show2" mode="right" z-index='10077' width="80%">
			<view class="popup-right">
				<view class="pop-title">
					<u-icon name="arrow-left" color="#000000" @click='show2=false' size="40"></u-icon>
					<view class="sx">类别</view>
					<view class="qd" @click="show2=false">
						确定
					</view>
				</view>
				<view class="pop-listt">
					<u-checkbox-group :wrap='true'>
						<u-checkbox shape="circle" @change="cartesChecked($event,index)" v-model="item.checked" v-for="(item, index) in CategoryList"
						 :key="index" :name="item.id">{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</u-popup>

		<!-- 开始时间 -->
		<u-picker mode="time" v-model="showtime" @confirm="confirmTime" title="开始时间" :params="params"></u-picker>
		<!-- 结束时间 -->
		<u-picker mode="time" v-model="showtime1" @confirm="confirmTime1" title="结束时间" :params="params"></u-picker>
	</view>
</template>

<script>
	import {
		brandList
	} from '../../api/brand.js'
	import {
		supplierList
	} from '../../api/supplier.js'
	import store from '@/store'
	import {
		goodsCategoryList
	} from '../../api/goods_category.js'
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		analyse,
		getInfoUsed
	} from '../../api/goods.js'
	export default {
		components: {
			kScrollView
		},
		data() {
			return {
				showed: false,
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				show6: false,

				options: {
					goods_category_id: [], //类别
					status: [], //状态
					price: [], //价格
				},
				brandList: [],
				CategoryList: [],
				status: [{
					name: '启用',
					id: 1,
					checked: false
				}, {
					name: '未启用',
					id: 0,
					checked: false
				}],
				background: {
					backgroundColor: '#2979ff'
				},
				navs: [{
					type: 0,
					name: "最新更新"
				}, {
					type: 1,
					name: "售罄"
				}, {
					type: 2,
					name: "毛利"
				}, {
					type: 3,
					name: "新款追踪"
				}, {
					type: 4,
					name: "滞销排序"
				}, {
					type: 5,
					name: "最好卖(销量)"
				}, {
					type: 6,
					name: "最好卖(金额)"
				}, {
					type: 7,
					name: "库存"
				}, {
					type: 8,
					name: "进货"
				}],
				form: {
					type: 0,
					sort: 1,
					day: '',
					start_time: '',
					end_time: '',
					page: 1,
					page_size: 10,
					options: {
						// keyword:'',
						// price:{
						// 	min:'',
						// 	max:''
						// }
					}
				},
				sort_checked: false,
				show: false,
				sort_name: '最新更新',
				showtime: false,
				showtime1: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},

				list: [],
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--到底了--',
				touchHeight: 50,
				height: 100,
				bottom: 0,
				autoPullUp: true,
				stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				style_input: {
					'background-color': '#ffffff'
				},
				last_page: 0,
				pull: false,
				total: {},
				active: 0,
				times: ['7天', '15天', '30天', '其他'],
				timed: ['15天', '30天', '60天', '全部'],
				infos: {
					model: [], //
					style: [],
					stores: [],
					suppliers: [],
					year: [{
							name: '2021',
							checked: false
						},
						{
							name: '2020',
							checked: false
						},
						{
							name: '2019',
							checked: false
						},
						{
							name: '2018',
							checked: false
						},
						{
							name: '2017',
							checked: false
						},
						{
							name: '2016',
							checked: false
						},
					],
					season: [{
							name: '春季',
							checked: false
						},
						{
							name: '夏季',
							checked: false
						},
						{
							name: '秋季',
							checked: false
						},
						{
							name: '冬季',
							checked: false
						},
						{
							name: '春秋',
							checked: false
						},
						{
							name: '秋夏',
							checked: false
						},
						{
							name: '春夏',
							checked: false
						},
					],

				},
				keyword: '',
				min: '',
				max: '',
				str_down_up: true, //店铺
				pp_down_up: false, //品牌
				lb_down_up: true, //类别
				gd_down_up: true, //商品
				jg_down_up: true, //价格
				year_down_up: false, //年份
				season_down_up: false, //季节
				fg_down_up: false, //风格
				ks_down_up: false, //款式
				gys_down_up: false, //供应商
				st_down_up: false, //状态
			}
		},
		filters: {
			filtersFn(list) {
				let arr = [];
				list.map(v => {
					if (v.checked) {
						arr.push(v.name)
					}
				})
				return arr.join(',')

			}
		},
		methods: {
			// 点击全部品牌
			barndArr() {
				this.show1 = true;
			},
			// 点击全部类别
			categoryArr() {
				this.show2 = true;
			},
			//
			barlistChecked(e, index) {
				this.$set(this.brandList, index, this.brandList[index])
			},
			cartesChecked(e, index) {
				this.$set(this.CategoryList, index, this.CategoryList[index])
			},
			// 点击确定
			determine() {
				let a = false;
				this.CategoryList.map((v, i) => {
					if (v.checked) {
						if(!a){
							this.form.options.goods_category_id = []
							a = true
						}
						this.form.options.goods_category_id.push(v.id)
					}
				})
				let b = false
				this.status.map((v, i) => {
					if (v.checked) {
						if(!b){
							this.form.options.status = []
							b = true
						}
						this.form.options.status.push(v.id)
					}
				})
				let c = false
				this.brandList.map(v => {
					if (v.checked) {
						if(!c){
							this.form.options.brand_id = []
							c = true
						}
						this.form.options.brand_id.push(v.id)
					}
				})
				let d = false
				this.infos.stores.map(v => {
					if (v.checked) {
						if(!d){
							this.form.options.store_ids = []
							d = true
						}
						this.form.options.store_ids.push(v.id)
					}
				})
				let e = false
				this.infos.year.map(v => {
					if (v.checked) {
						if(!e){
							this.form.options.year = []
							e = true
						}
						this.form.options.year.push(v.name)
					}
				})
				let f = false
				this.infos.season.map(v => {
					if (v.checked) {
						if(!c){
							this.form.options.season = []
							c = true
						}
						this.form.options.season.push(v.name)
					}
				})
				let g = false
				this.infos.model.map(v => {
					if (v.checked) {
						if(!g){
							this.form.options.model = []
							g = true
						}
						this.form.options.model.push(v.name)
					}
				})
				let h = false
				this.infos.style.map(v => {
					if (v.checked) {
						if(!h){
							this.form.options.style = []
							h = true
						}
						this.form.options.style.push(v.name)
					}
				})
				let i = false
				this.infos.suppliers.map(v => {
					if (v.checked) {
						if(!i){
							this.form.options.supplier_id = []
							i = true
						}
						this.form.options.supplier_id.push(v.id)
					}
				})
				
				if(this.min){
					this.form.options.price = {}
					this.form.options.price.min = this.min
				}
				if(this.max){
					this.form.options.price.max = this.max
				}
				if(this.keyword){
					this.form.options.keyword = this.keyword
				}
				this.showed = false;
				// console.log(this.options);
				this.init()
			},
			// 点击重置
			reset() {
				this.options = {
					goods_category_id: [], //类别
					status: [], //状态
					price: []
				}
				this.brandList.map(v => {
					v['checked'] = false;
				})
				
				this.CategoryList.map(v => {
					v['checked'] = false;
				})
				this.status.map(v => {
					v['checked'] = false;
				})
				this.infos.stores.map(v => {
					v['checked'] = false;
				})
				this.infos.year.map(v => {
					v['checked'] = false;
				})
				this.infos.season.map(v => {
					v['checked'] = false;
				})
				this.infos.model.map(v => {
					v['checked'] = false;
				})
				this.infos.style.map(v => {
					v['checked'] = false;
				})
				this.infos.suppliers.map(v => {
					v['checked'] = false;
				})
				if(this.form.options.price){
					this.min = ''
					this.max = ''
				}
				if(this.form.options.keyword){
					this.keyword = ''
				}
				this.$forceUpdate()
			},
			// 点击品牌
			clickBrand(item, index) {
				// this.actives1 = index;
				this.$set(this.brandList, index, this.brandList[index]);
				this.brandList[index].checked = !item.checked;
			},
			// 点击类别
			clickCate(item, index) {
				// this.actives2 = index;
				this.$set(this.CategoryList, index, this.CategoryList[index]);
				this.CategoryList[index].checked = !item.checked;
			},
			// 点击状态
			clickStatus(item, index) {
				// this.actives3 = index;
				this.$set(this.status, index, this.status[index]);
				this.status[index].checked = !item.checked;
			},
			// 点击店铺
			clickStores(item, index) {
				// this.actives3 = index;
				this.$set(this.infos.stores, index, this.infos.stores[index]);
				this.infos.stores[index].checked = !item.checked;
			},
			// 点击年份
			clickYears(item, index) {
				// this.actives3 = index;
				this.$set(this.infos.year, index, this.infos.year[index]);
				this.infos.year[index].checked = !item.checked;
			},
			// 点击季节
			clickSeason(item, index) {
				// this.actives3 = index;
				this.$set(this.infos.season, index, this.infos.season[index]);
				this.infos.season[index].checked = !item.checked;
			},
			// 点击风格
			clickModel(item, index) {
				// this.actives3 = index;
				this.$set(this.infos.model, index, this.infos.model[index]);
				this.infos.model[index].checked = !item.checked;
			},
			// 点击款式
			clickStyle(item, index) {
				// this.actives3 = index;
				this.$set(this.infos.style, index, this.infos.style[index]);
				this.infos.style[index].checked = !item.checked;
			},
			// 点击供应商
			clickSuppliers(item, index) {
				// this.actives3 = index;
				this.$set(this.infos.suppliers, index, this.infos.suppliers[index]);
				this.infos.suppliers[index].checked = !item.checked;
			},

			popup() {
				this.showed = true;
			},
			async brand() {
				let res = await brandList();
				this.brandList = res;
				let res1 = await goodsCategoryList()
				this.CategoryList = res1;
				// console.log(res);
				this.brandList.map(v => {
					v['checked'] = false;
				})
				this.CategoryList.map(v => {
					v['checked'] = false;
				})
			},
			// 详情
			toDetails(item) {
				uni.navigateTo({
					url: `/pages/goodsAnalyse/details/details?id=${item.id}`
				})
			},
			// 选择类型
			navClick(item) {
				this.show = false;
				this.sort_name = item.name;
				this.form.type = item.type;
				this.form.page = 1;
				this.active = 0;
				this.pull = false;
				// 需要时间段的类型
				if (this.form.type == 2 || this.form.type == 5 || this.form.type == 6 || this.form.type == 8) {
					let date = this.$date.sevenDays()
					this.form.start_time = date.start_time
					this.form.end_time = date.end_time
				} else {
					this.form.start_time = ''
					this.form.end_time = ''
				};
				// 需要时间点的类型
				if (this.form.type == 4) {
					this.form.day = 15
				} else {
					this.form.day = '';
				}
				this.init()
			},
			// 选择时间段
			timesFn(index) {
				this.active = index
				this.pull = false
				if (index == 0) {
					let date = this.$date.sevenDays()
					this.form.start_time = date.start_time
					this.form.end_time = date.end_time
				} else if (index == 1) {
					let date = this.$date.halfMonth()
					this.form.start_time = date.start_time
					this.form.end_time = date.end_time
				} else if (index == 2) {
					let date = this.$date.thirtyDays()
					this.form.start_time = date.start_time
					this.form.end_time = date.end_time
				} else if (index == 3) {
					this.showtime = true
				};
				this.init()
			},
			// 选择时间点
			timedFn(index) {
				this.active = index;
				this.pull = false
				this.form.page = 1;
				if (index == 0) {
					this.form.day = 15
				} else if (index == 1) {
					this.form.day = 30
				} else if (index == 2) {
					this.form.day = 60
				} else if (index == 3) {
					this.form.day = 0
				}
				this.init()
			},
			// 切换排序顺序
			sortChanged() {
				this.sort_checked = !this.sort_checked;
				if (!this.sort_checked) {
					this.form.sort = 1
				} else {
					this.form.sort = 0
				}
				this.form.page = 1;
				this.init()
			},
			// 初始化
			async init() {
				let res = await analyse(this.form)
				console.log(res);
				if (this.form.page == 1) {
					this.list = []
				}
				this.total = res.total
				if (this.form.type != 4) {

					this.list.push(...res.list.data);
					this.last_page = res.list.last_page
				} else {
					this.list.push(...res.list);
					if (this.list.length == 10) {
						this.last_page = this.form.page + 1
					} else {
						this.last_page = this.form.page
					}
				}
			},

			// 下拉刷新
			handlePullDown(stopLoad) {
				this.form.page = 1;
				this.list = []
				this.pull = false
				this.init()
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			async handleLoadMore(stopLoad) {
				if (!this.pull) {
					if (this.form.page >= this.last_page) {
						this.$refs.uToast.show({
							title: '加载到底了',
							type: 'default',
							position: 'bottom'
						})
						this.pull = true
					} else {
						this.form.page++;
						this.init()
					}
				}
			},
			/// 开始时间
			confirmTime(v) {
				this.form.start_time = `${v.year}-${v.month}-${v.day}`;
				this.showtime1 = true;
			},
			// 结束时间
			async confirmTime1(v) {
				this.form.end_time = `${v.year}-${v.month}-${v.day}`;
				this.init();
			},
			// 筛选信息
			async infoUsed() {
				let res = await getInfoUsed({
					type: "all"
				});
				let res1 = await supplierList({
					type: 1
				})
				if (!res1.code) {
					res1.map(v => {
						this.infos.suppliers.push({
							name: v.name,
							checked: false,
							id: v.id
						})
					})
				}
				console.log(res1);
				if (!res.code) {
					res.model.map(v => {
						this.infos.model.push({
							name: v,
							checked: false
						})
					})
					res.style.map(v => {
						this.infos.style.push({
							name: v,
							checked: false
						})
					})
					let arr = store.state.store.storesArr;
					if (arr != undefined) {
						arr.map(v => {
							this.infos.stores.push({
								name: v.name,
								checked: false,
								id: v.store_id
							})
						})
					}
				}
			}
		},
		onLoad() {
			this.init();
			this.brand()
			this.infoUsed()
		}
	}
</script>

<style scoped lang="scss">
	.goodsAnalyse {
		width: 100%;
		display: flex;
		flex-direction: column;
		min-height: 100%;
		background-color: #F7F6FB;
		.actives {
			background-color: #E0EAFD !important;
			color: #638FCB !important;
		}

		/deep/.u-border-bottom:after {
			border-bottom-width: 0;
		}

		.right_icon {
			margin-right: 30rpx;
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

		// 选择部分
		.nav {
			width: 100%;
			height: 120rpx;
			display: flex;
			flex-direction: row;
			background-color: #2979ff;
			justify-content: center;
			align-items: center;
			padding: 20rpx;
			position: fixed;
			top: calc(84rpx + var(--status-bar-height));
			z-index: 99;

			.select-left {
				width: 85%;
				height: 80rpx;
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
		}

		// 商品列表
		.goods-list {
			width: 100%;
			margin-top: 120rpx;
			position: relative;
			display: flex;
			flex-direction: column;

			.nav-header {
				width: 100%;
				position: sticky;
				top: calc(204rpx + var(--status-bar-height));
				display: flex;
				flex-direction: column;
				z-index: 99;

				.time-quantum {
					width: 100%;
					height: 60rpx;
					display: flex;
					padding: 0 20rpx;
					flex-direction: row;
					justify-content: space-between;
					background-color: #2979ff;
					align-items: center;

					.left {
						color: #e5e5e5;
					}

					.right {
						display: flex;
						flex-direction: row;

						.active {
							color: #FFFFFF !important;
							font-weight: 600;
						}

						.gray {
							padding: 0 10rpx;
							color: #e5e5e5;
						}
					}
				}

				.dates {
					width: 100%;
					height: 60rpx;
					display: flex;
					padding: 0 20rpx;
					flex-direction: row;
					justify-content: space-between;
					background-color: #2979ff;
					align-items: center;

					.left {
						color: #e5e5e5;
					}

					.right {
						display: flex;
						flex-direction: row;

						.gray {
							padding: 0 10rpx;
							color: #e5e5e5;
						}
					}
				}

				.nav-title {
					width: 100%;
					height: 60rpx;
					display: flex;
					padding: 0 20rpx;
					flex-direction: row;
					justify-content: space-between;
					background-color: #F7F6FB;
					align-items: center;
					color: #999999;

					.gd {
						width: 60%;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.tit-data {
						width: 40%;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;

						text {
							flex: 1;
						}
					}
				}

			}

			.list {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx;
				background-color: #FFFFFF;
				border-bottom: 0.01rem solid #E5E5E5;

				.left {
					width: 55%;
					display: flex;
					flex-direction: row;
					align-items: center;

					.sum {
						width: 100%;
						text-align: center;
					}

					.left-item {
						display: flex;
						flex-direction: column;
						width: calc(100% - 100rpx);
						margin-left: 10rpx;

						.black {
							width: 100%;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;

							.gray {
								color: #999999;
							}
						}

						.gy {
							color: #999999;
							font-size: 24rpx;
						}
					}
				}

				.right {
					width: 45%;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					.right-day {
						width: 50%;
						display: flex;
						font-size: 20rpx;
						align-items: center;
						justify-content: center;
						color: #007AFF;
					}

					.right-item {
						width: 50%;
						display: flex;
						font-size: 20rpx;
						flex-direction: column;
						align-items: center;

						text {
							width: 100%;
						}
					}
				}
			}
		}

		// 筛选
		.popup-right {
			display: flex;
			flex-direction: column;

			.pop-title {
				position: fixed;
				top: 0;
				display: flex;
				justify-content: space-between;
				flex-direction: row;
				width: 100%;
				background-color: #FFFFFF;
				padding: 10rpx 0;
				border-bottom: 10rpx solid #e2e2e2;

				.sx {
					text-align: center;
				}

				.qd {
					padding-right: 20rpx;
					color: #007AFF;
				}

				.userd {
					text-align: center;
					color: #007AFF;
				}
			}

			.pop-listt {
				margin-top: 60rpx;
				padding: 20rpx;

				.u-checkbox {
					height: 80rpx;
				}
			}

			.btn {
				width: 100%;
				position: fixed;
				bottom: 0;
				display: flex;
				flex-direction: row;

				.open {
					flex: 1;
					border-radius: 0;
					// width: 50%;
					border: 0;
				}
			}

			/deep/uni-button:after {
				border-radius: 0;
			}

			.pop-list {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 20rpx 10rpx;
				margin-top: 60rpx;
				margin-bottom: 80rpx;

				.nav-box {
					width: 100%;
					display: flex;
					flex-direction: column;
					padding: 10rpx;

					.nav-tit {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;

						.ht {
							font-size: 28rpx;
							color: #000000;
							font-weight: 600;
							padding: 10rpx;
						}

						.right {
							display: flex;
							flex-direction: row;

							.conts {
								color: #638FCB;
								font-size: 20rpx;
								width: 350rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								text-align: right;
								padding-right: 10rpx;
							}
						}
					}

					.nav-list {
						width: 100%;
						display: flex;
						// justify-content: center;
						align-items: center;
						flex-wrap: wrap;

						.lak {
							width: 33.3%;
						}

						.nav-name {
							width: 100%;
							text-align: center;
							// padding: 10rpx 0;
							margin: 10rpx 0;

							.nav-kk {
								width: 90%;
								padding: 6rpx 0;
								// text-align: center;
								border-radius: 35rpx;
								background-color: #f0f0f0;
								overflow: hidden; //将超出的部分隐藏
								text-overflow: ellipsis; //超出部分用省略号显示
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
							}
						}

						.goods-item {
							width: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							margin: 10rpx 0;

							.goods-name {
								flex: 1;
								display: flex;
								flex-direction: row;
								justify-content: center;
								align-items: center;

								.goods-kk {
									flex: 1;
									padding: 0 10rpx;
									margin: 0 10rpx;
									border-radius: 35rpx;
									background-color: #f0f0f0;
								}
							}
						}

						.gd {
							.nav-kk {
								background-color: #FFFFFF !important;
								border: 1rpx solid #C0C0C0;
							}
						}
					}
				}
			}
		}
	}
</style>
