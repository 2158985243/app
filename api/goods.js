import $http from '@/js_sdk/app-request/requestConfig';
// 商品列表
export const goodsList = (data) => {
	return $http.get("/goods/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 商品添加
export const goodsAdd = (data) => {
	return $http.post("/goods/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 商品详情
export const goods = (id) => {
	return $http.get("/goods/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};