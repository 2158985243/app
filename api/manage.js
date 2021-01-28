import $http from '@/js_sdk/app-request/requestConfig';
// 营业概况
export const businessOverview = (data) => {
	return $http.get("/api/business_overview", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 收支结余
export const cashierBalance = (data) => {
	return $http.get("/api/cashier_balance", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 收银对账
export const cashierReconciliation = (data) => {
	return $http.get("/sales/cashier_reconciliation", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 供应商对账列表
export const reconciliation = (data) => {
	return $http.get("/supplier/reconciliation", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};