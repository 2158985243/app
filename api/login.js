import $http from '@/js_sdk/app-request/requestConfig';
// 登录
export const login = (data) => {
	return $http.post("/login", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 注册
export const register = (data) => {
	return $http.post("/register", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
