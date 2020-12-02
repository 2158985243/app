import $http from '@/js_sdk/app-request/requestConfig';
// 员工列表
export const purchaseRefundList = (data) => {
	return $http.get("/purchase_refund/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增员工
export const purchaseRefundAdd = (data) => {
	return $http.post("/purchase_refund/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 查看员工资料
export const purchaseRefund = (id) => {
	return $http.get("/purchase_refund/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 编辑员工
export const purchaseRefundEdit = (id,data) => {
	return $http.post("/purchase_refund/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 删除员工
export const purchaseRefundDel = (id) => {
	return $http.post("/purchase_refund/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 作废入库单
export const purchaseRefundCancel = (id) => {
	return $http.post("/purchase_refund/cancel/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};