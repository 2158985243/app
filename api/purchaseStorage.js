import $http from '@/js_sdk/app-request/requestConfig';
// 员工列表
export const purchaseStorageList = (data) => {
	return $http.get("/purchase_storage/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增员工
export const purchaseStorageAdd = (data) => {
	return $http.post("/purchase_storage/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 查看员工资料
export const purchaseStorage = (id) => {
	return $http.get("/purchase_storage/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 编辑员工
export const purchaseStorageEdit = (id,data) => {
	return $http.post("/purchase_storage/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 删除员工
export const purchaseStorageDel = (id) => {
	return $http.post("/purchase_storage/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 作废入库单
export const purchaseStorageCancel = (id) => {
	return $http.post("/purchase_storage/cancel/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};