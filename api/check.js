import $http from '@/js_sdk/app-request/requestConfig';
// 盘点列表
export const checkList = (data) => {
	return $http.get("/check/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增盘点
export const checkAdd = (data) => {
	return $http.post("/check/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 查看盘点资料
export const check = (id) => {
	return $http.get("/check/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 编辑盘点
export const checkEdit = (id,data) => {
	return $http.post("/check/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 删除盘点
export const checkDel = (id) => {
	return $http.post("/check/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 作废盘点单
export const checkCancel = (id) => {
	return $http.post("/check/cancel/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 统计
export const checkCounts = (data) => {
	return $http.post("/check/counts",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 统计详情
export const checkDetails = (data) => {
	return $http.post("/check/counts_details",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 盘点汇总
export const getCounts = (data) => {
	return $http.post("/check/get_counts",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 子单列表
export const checkLists = (data) => {
	return $http.get("/check_list/list",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 添加子单
export const checkListAdd = (data) => {
	return $http.post("/check_list/add",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 子单详情
export const checkListId = (id) => {
	return $http.get("/check_list/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};


// 更新子单
export const checkListEdit = (id,data) => {
	return $http.post("/check_list/edit/"+id,data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 更新子单
export const checkListDel = (id) => {
	return $http.post("/check_list/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};