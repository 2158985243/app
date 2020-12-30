import $http from '@/js_sdk/app-request/requestConfig';
// 会员列表
export const customerList = (data) => {
	return $http.get("/customer/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增会员
export const customerAdd = (data) => {
	return $http.post("/customer/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员编辑
export const customerEdit = (id,data) => {
	return $http.post("/customer/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员删除
export const customerDel = (id) => {
	return $http.post("/customer/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员详情
export const customer = (id) => {
	return $http.get("/customer/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员注册统计
export const registerCount = (data) => {
	return $http.post("/customer/register_count/",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员注册统计详情
export const countDetails = (data) => {
	return $http.post("/customer/count_details/",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员余额列表
export const balanceList = (data) => {
	return $http.post("/customer/balance_list",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员分析
export const analyse = (data) => {
	return $http.post("/customer/analyse",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};