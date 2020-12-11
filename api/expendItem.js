import $http from '@/js_sdk/app-request/requestConfig';
// 项目列表
export const expendItemList = (data) => {
	return $http.get("/expend_item/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增项目
export const expendItemAdd = (data) => {
	return $http.post("/expend_item/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 项目编辑
export const expendItemEdit = (id,data) => {
	return $http.post("/expend_item/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 项目删除
export const expendItemDel = (id) => {
	return $http.post("/expend_item/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};