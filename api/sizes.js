import $http from '@/js_sdk/app-request/requestConfig';
// 尺码组列表
export const sizeGroupList = (data) => {
	return $http.get("/size_group/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 新增尺码组
export const sizeGroupAdd = (data) => {
	return $http.post("/size_group/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 尺码组编辑
export const sizeGroupEdit = (id,data) => {
	return $http.post("/size_group/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 尺码组删除
export const sizeGroupDel = (id) => {
	return $http.post("/size_group/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};

// 新增尺码
export const sizeAdd = (data) => {
	return $http.post("/size/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 尺码编辑
export const sizeEdit = (id,data) => {
	return $http.post("/size/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 尺码删除
export const sizeDel = (id) => {
	return $http.post("/size/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};