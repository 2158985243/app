import $http from '@/js_sdk/app-request/requestConfig';
// 商品列表
export const goodsList = (data) => {
	return $http.post("/goods/list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 商品添加
export const goodsAdd = (data) => {
	return $http.post("/goods/add", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
export const goodsEdit = (id,data) => {
	return $http.post("/goods/edit/"+id, data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 商品删除
export const goodsDel = (id) => {
	return $http.post("/goods/del/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 商品详情
export const goods = (id) => {
	return $http.get("/goods/"+id).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 商品总数
export const getTotal = () => {
	return $http.get("/goods/get_total").then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 库存查询
export const stockList = (data) => {
	return $http.post("/goods/stock_list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 商品详情-库存
export const getStock = (data) => {
	return $http.get("/goods/get_stock", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 商品分析
export const analyse = (data) => {
	return $http.post("/goods/analyse", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 获取商品已用的附加信息（去重）的接口
export const getInfoUsed = (data) => {
	return $http.get("/goods/get_info_used", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
//商品详情-进销比
export const getRadio = (data) => {
	return $http.get("/goods/get_radio", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 商品详情-关联款
export const getRelatedGoods = (data) => {
	return $http.get("/goods/get_related_goods", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 商品详情-销售情况
export const getSalesStatus = (data) => {
	return $http.get("/goods/get_sales_status", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 商品积分兑换列表
export const pointExchangeList = (data) => {
	return $http.get("/goods/point_exchange_list", data).then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 获取商品货号
export const generateGoodsMumber = () => {
	return $http.get("/goods/generate_goods_number").then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};
// 获取会员卡号
export const generateCustomerNumber = () => {
	return $http.get("/customer/generate_customer_number").then((res) => {
		return res;
	}).catch(function(error) {
		//这里只会在接口是失败状态返回，不需要去处理错误提示
		return error;
	});
};