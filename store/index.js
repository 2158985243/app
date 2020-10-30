import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		token:''
	},
	getters:{
		
	},
	mutations:{
		loginStatusAction(state,context){
			console.log(context);
			state.token = context.token;
		}
	},
	actions:{
		
	}
});