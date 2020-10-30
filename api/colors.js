import $http from '@/js_sdk/app-request/requestConfig';
// 店铺列表
export const colorList = (data) => {
	return $http.get("/color/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增店铺
export const colorAdd = (data) => {
	return $http.post("/color/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 店铺编辑
export const colorEdit = (id,data) => {
	return $http.post("/color/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 店铺删除
export const colorDel = (id) => {
	return $http.post("/color/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};