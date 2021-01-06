import $http from '@/js_sdk/app-request/requestConfig';
// 折扣列表
export const discountList = (data) => {
	return $http.get("/discount/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增折扣
export const discountAdd = (data) => {
	return $http.post("/discount/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 折扣编辑
export const discountEdit = (id,data) => {
	return $http.post("/discount/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 折扣删除
export const discountDel = (id) => {
	return $http.post("/discount/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};