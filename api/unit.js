import $http from '@/js_sdk/app-request/requestConfig';
// 店铺列表
export const unitList = (data) => {
	return $http.get("/unit/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增店铺
export const unitAdd = (data) => {
	return $http.post("/unit/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 店铺编辑
export const unitEdit = (id,data) => {
	return $http.post("/unit/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 店铺删除
export const unitDel = (id) => {
	return $http.post("/unit/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};