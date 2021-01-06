import $http from '@/js_sdk/app-request/requestConfig';
// 积分列表
export const pointList = (data) => {
	return $http.get("/point/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增积分
export const pointAdd = (data) => {
	return $http.post("/point/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 积分编辑
export const pointEdit = (id,data) => {
	return $http.post("/point/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 积分删除
export const pointDel = (id) => {
	return $http.post("/point/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 获取默认积分
export const pointGetDefault = (data) => {
	return $http.get("/point/get_default").then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};