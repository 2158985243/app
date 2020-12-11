import $http from '@/js_sdk/app-request/requestConfig';
// 支出列表
export const expendLogList = (data) => {
	return $http.get("/expend_log/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增支出
export const expendLogAdd = (data) => {
	return $http.post("/expend_log/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 支出编辑
export const expendLogEdit = (id,data) => {
	return $http.post("/expend_log/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 支出删除
export const expendLogDel = (id) => {
	return $http.post("/expend_log/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 支出详情
export const expendLog = (id) => {
	return $http.get("/expend_log/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 作废支出
export const expendLogCancel = (id) => {
	return $http.post("/expend_log/cancel/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 支出分析
export const expendLogAnalyse = (data) => {
	return $http.get("/expend_log/analyse",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 支出分析-某个支出项目列表
export const expendLoganalyseDetails = (data) => {
	return $http.get("/expend_log/analyse_details",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
