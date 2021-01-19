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
// 挂单列表
export const unsalesList = () => {
	return $http.get("/sales/unsales_list").then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 统计详情
export const countDetails = (data) => {
	return $http.post("/sales/counts_details",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 获取销售额
export const getSalesMoney = (data) => {
	return $http.post("/sales/get_sales_money",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 销售分析
export const analyse = (data) => {
	return $http.post("/sales/analyse",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 销售分析详情
export const analyseDetails = (data) => {
	return $http.post("/sales/analyseDetails",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};