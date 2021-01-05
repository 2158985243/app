import $http from '@/js_sdk/app-request/requestConfig';
// 单据列表
export const salesOrderList = (data) => {
	return $http.get("/sales/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增单据
export const salesOrderAdd = (data) => {
	return $http.post("/sales/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 查看单据
export const salesOrder = (id) => {
	return $http.get("/sales/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 编辑挂单
export const salesOrderEdit = (id,data) => {
	return $http.post("/sales/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 删除挂单
export const salesOrderDel = (id) => {
	return $http.post("/sales/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 作废挂单
export const salesOrderCancel = (id) => {
	return $http.post("/sales/cancel/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 统计
export const salesOrderCounts = (data) => {
	return $http.post("/sales/counts",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};