import $http from '@/js_sdk/app-request/requestConfig';
//  供应商列表
export const supplierList = (data) => {
	return $http.get("/supplier/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增 供应商
export const supplierAdd = (data) => {
	return $http.post("/supplier/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
//  供应商编辑
export const supplierEdit = (id,data) => {
	return $http.post("/supplier/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
//  供应商删除
export const supplierDel = (id) => {
	return $http.post("/supplier/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 供应商详情
export const supplier = (id) => {
	return $http.get("/supplier/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};