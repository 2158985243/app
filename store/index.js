import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		token: '',
		barcodeDa: {},
		sizerDa: [],
		colorDa: [],
		specificationOfGoods: [],
		stateGood:false,
		store:{},
		barterGoods: [],
		
	},
	getters: {

	},
	mutations: {
		loginStatusAction(state, context) {
			console.log(context);
			state.token = context.token;
		},
		barcodeAction(state, context) {
			state.barcodeDa = context.barcodes;
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
		}
	},
	actions: {

	}
});
