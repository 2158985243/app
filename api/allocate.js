import $http from '@/js_sdk/app-request/requestConfig';
// 调拨列表
export const allocateList = (data) => {
	return $http.get("/allocate/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增调拨
export const allocateAdd = (data) => {
	return $http.post("/allocate/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 查看调拨资料
export const allocate = (id) => {
	return $http.get("/allocate/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 编辑调拨
export const allocateEdit = (id,data) => {
	return $http.post("/allocate/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 删除调拨
export const allocateDel = (id) => {
	return $http.post("/allocate/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 作废调拨单
export const allocateCancel = (id) => {
	return $http.post("/allocate/cancel/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 调入
export const allocateCallIn = (id) => {
	return $http.post("/allocate/call_in/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 统计
export const allocateCounts = (data) => {
	return $http.post("/allocate/counts",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 统计详情
export const countsDetails = (data) => {
	return $http.post("/allocate/counts_details",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

