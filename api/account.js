import $http from '@/js_sdk/app-request/requestConfig';
// 店铺列表
export const accountList = (data) => {
	return $http.get("/account/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增店铺
export const accountAdd = (data) => {
	return $http.post("/account/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 店铺编辑
export const accountEdit = (id,data) => {
	return $http.post("/account/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 店铺删除
export const accountDel = (id) => {
	return $http.post("/account/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};