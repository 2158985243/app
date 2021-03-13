import $http from '@/js_sdk/app-request/requestConfig';
// 参数设置列表
export const configList = (data) => {
	return $http.get("/member/config_list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 参数设置
export const configEdit = (data) => {
	return $http.post("/member/config_edit", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};