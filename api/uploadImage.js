import $http from '@/js_sdk/app-request/requestConfig';
// 店铺列表
export const uploadImage = (id,data) => {
	return $http.post("/api/upload", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};