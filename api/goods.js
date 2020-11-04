import $http from '@/js_sdk/app-request/requestConfig';
// 尺码组列表
export const goodsList = (data) => {
	return $http.get("/goods/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 尺码组列表
export const goodsAdd = (data) => {
	return $http.post("/goods/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};