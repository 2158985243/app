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
// 余额调整
export const balanceAdjust = (data) => {
	return $http.post("/customer/balance_adjust",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 积分调整
export const pointAdjust = (data) => {
	return $http.post("/customer/point_adjust",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 查看新增
export const getNewCustomer = (data) => {
	return $http.post("/customer/get_new_customer",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员积分记录
export const getPointLog = (data) => {
	return $http.post("/customer/get_point_log",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员余额记录
export const getBalanceLog = (data) => {
	return $http.post("/customer/get_balance_log",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员欠款记录
export const getDebtLog = (data) => {
	return $http.post("/customer/get_debt_log",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员充值
export const recharge = (data) => {
	return $http.post("/customer/recharge",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};