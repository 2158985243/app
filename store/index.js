import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		token: '',
		barcodeDa: {},//单品条码组
		goodsStockDa: [],//商品初始库存
		sizerDa: [],
		colorDa: [],
		specificationOfGoods: [],
		stateGood:false,
		store:{},
		barterGoods: [],
		storeSelet:[],//选择的店铺权限组
		tademark:[],//选择的品牌权限
		purview:[],//权限数组
		referDate:{},//查询数据
		authority:[],//权限数组
		customerObj:{name:''},//销售选择的会员
	},
	getters: {

	},
	mutations: {
		loginStatusAction(state, context) {
			console.log(context);
			state.token = context.token;
		},
		// 条码
		barcodeAction(state, context) {
			state.barcodeDa = context.barcodeDa;
		},
		// 库存
		goodsStockFn(state, context) {
			state.goodsStockDa = context.goodsStockDa;
		},
		
		colorDaAction(state, context) {
			state.colorDa = context.colorDa;
		},
		sizerDaAction(state, context) {
			state.sizerDa = context.sizerDa;
		},
		// 商品列表
		commercialSpecification(state, context) {
			state.specificationOfGoods = context.specificationOfGoods;
		},
		stateGoodFn(state,context){
			state.stateGood = context.stateGood
		},
		// 店铺
		storeFn(state,context){
			state.store = context.store
		},
		// 换货
		barterFn(state,context){
			state.barterGoods = context.barterGoods
		},
		// 店铺权限组
		storeSeletFn(state,context){
			state.storeSelet = context.storeSelet
		},
		// 品牌权限组
		tademarkFn(state,context){
			state.tademark = context.tademark
		},
		// 权限组
		purviewFn(state,context){
			state.purview = context.purview
		},
		// 查询
		referFn(state,context){
			state.referDate = context.referDate
		},
		// 权限
		authorityFn(state,context){
			state.authority = context.authority
		},
		// 销售选择的会员
		customerFn(state,context){
			state.customerObj = context.customerObj
		},
	},
	actions: {

	}
});
