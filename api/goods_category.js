import $http from '@/js_sdk/app-request/requestConfig';
// 店铺列表
export const goodsCategoryList = (data) => {
	return $http.get("/goods_category/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增店铺
export const goodsCategoryAdd = (data) => {
	return $http.post("/goods_category/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 店铺编辑
export const goodsCategoryEdit = (id,data) => {
	return $http.post("/goods_category/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 店铺删除
export const goodsCategoryDel = (id) => {
	return $http.post("/goods_category/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};