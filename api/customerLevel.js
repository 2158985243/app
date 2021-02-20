import $http from '@/js_sdk/app-request/requestConfig';
// 会员等级列表
export const customerLevelList = (data) => {
	return $http.get("/customer_level/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增会员等级
export const customerLevelAdd = (data) => {
	return $http.post("/customer_level/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员等级编辑
export const customerLevelEdit = (id,data) => {
	return $http.post("/customer_level/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 会员等级删除
export const customerLevelDel = (id) => {
	return $http.post("/customer_level/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 设置会员等级自动晋升
export const setAutoPromotion = (data) => {
	return $http.post("/customer_level/set_auto_promotion",data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 获取设置会员等级自动晋升
export const getAutoPromotion = () => {
	return $http.get("/customer_level/get_auto_promotion").then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};