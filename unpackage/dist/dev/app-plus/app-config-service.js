
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/user/login","pages/home/home","pages/repertory/repertory","pages/marketing/marketing","pages/statement/statement","pages/mine/mine","pages/addMembership/addMembership","pages/inventory/inventory","pages/signIn/signIn","pages/information/information","pages/businessSetUp/businessSetUp","pages/storeManagement/storeManagement","pages/editShopInformation/editShopInformation","pages/addShopInformation/addShopInformation","components/u-avatar-cropper/u-avatar-cropper","pages/staffManagement/staffManagement","pages/addStaffsInformation/addStaffsInformation","pages/editStaffsInformation/editStaffsInformation","pages/patternOfPayment/patternOfPayment","pages/addPatternOfPayment/addPatternOfPayment","pages/editPatternOfPayment/editPatternOfPayment","pages/changePassPword/changePassPword","pages/addCommodity/addCommodity","pages/commodityManagement/commodityManagement","pages/productName/productName","pages/colors/colors","pages/editColor/editColor","pages/addColor/addColor","pages/sizes/sizes","pages/category/category","pages/addCategory/addCategory","pages/supplier/supplier","pages/addSupplier/addSupplier","pages/supplierDetails/supplierDetails","pages/editSupplier/editSupplier","pages/chooseSupplier/chooseSupplier","pages/trademark/trademark","pages/addTrademark/addTrademark","pages/unitList/unitList","pages/addUnitList/addUnitList","pages/barcode/barcode","pages/commodityDetails/commodityDetails","pages/editCommodity/editCommodity","pages/purchaseStorage/purchaseStorage","pages/selectAccount/selectAccount","pages/selectProducts/selectProducts","pages/libraryHistory/libraryHistory","pages/purchaseStorageHistory/purchaseStorageHistory","pages/storageHistory/storageHistory","pages/cancellation/cancellation","pages/refer/refer","pages/salesReturnHistory/salesReturnHistory","pages/addReturn/addReturn","pages/returnedGoodsHistory/returnedGoodsHistory","pages/haveToReturn/haveToReturn","pages/haveBeenCancelled/haveBeenCancelled","pages/allocate/allocate","pages/addCheck/addCheck","pages/checkSubmenu/checkSubmenu","pages/inventoryPreview/inventoryPreview","pages/stockTaking/stockTaking","pages/drafCheck/drafCheck","pages/stopCheck/stopCheck","pages/checkCancellation/checkCancellation","pages/addAllocate/addAllocate","pages/stopAllocate/stopAllocate","pages/draftAllocate/draftAllocate","pages/callIn/callIn","pages/cancellationAllocate/cancellationAllocate","pages/expense/expense","pages/article/article","pages/addArticle/addArticle","pages/selecSalesperson/selecSalesperson","pages/expenseBook/expenseBook"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#2979ff","borderStyle":"white","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/home","iconPath":"static/image/index.png","selectedIconPath":"static/image/index-ed.png","text":"首页"},{"pagePath":"pages/repertory/repertory","iconPath":"static/image/repertory.png","selectedIconPath":"static/image/repertory-ed.png","text":"库存"},{"pagePath":"pages/marketing/marketing","iconPath":"static/image/marketing.png","selectedIconPath":"static/image/marketing-ed.png","text":"营销"},{"pagePath":"pages/statement/statement","iconPath":"static/image/statement.png","selectedIconPath":"static/image/statement-ed.png","text":"报表"},{"pagePath":"pages/mine/mine","iconPath":"static/image/mine.png","selectedIconPath":"static/image/mine-ed.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"clothing","compilerVersion":"2.9.7","entryPagePath":"pages/user/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/user/login","meta":{"isQuit":true},"window":{"navigationStyle":"custom","titleView":false,"scrollIndicator":"none"}},{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","titleView":false,"scrollIndicator":"none"}},{"path":"/pages/repertory/repertory","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"库存","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/marketing/marketing","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"营销服务","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/statement/statement","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"报表","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","titleView":false,"scrollIndicator":"none"}},{"path":"/pages/addMembership/addMembership","meta":{},"window":{"navigationBarTitleText":"添加会员","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/inventory/inventory","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/signIn/signIn","meta":{},"window":{"navigationBarTitleText":"商家注册","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/information/information","meta":{},"window":{"navigationBarTitleText":"账户信息","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/businessSetUp/businessSetUp","meta":{},"window":{"navigationBarTitleText":"营业设置","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/storeManagement/storeManagement","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/editShopInformation/editShopInformation","meta":{},"window":{"navigationBarTitleText":"编辑店铺信息","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/addShopInformation/addShopInformation","meta":{},"window":{"navigationBarTitleText":"新增店铺信息","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/components/u-avatar-cropper/u-avatar-cropper","meta":{},"window":{"navigationBarTitleText":"头像裁剪","navigationBarBackgroundColor":"#000000"}},{"path":"/pages/staffManagement/staffManagement","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/addStaffsInformation/addStaffsInformation","meta":{},"window":{"navigationBarTitleText":"新增员工信息","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/editStaffsInformation/editStaffsInformation","meta":{},"window":{"navigationBarTitleText":"编辑员工信息","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/patternOfPayment/patternOfPayment","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/addPatternOfPayment/addPatternOfPayment","meta":{},"window":{"navigationBarTitleText":"新增支付方式","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/editPatternOfPayment/editPatternOfPayment","meta":{},"window":{"navigationBarTitleText":"编辑支付方式","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/changePassPword/changePassPword","meta":{},"window":{"navigationBarTitleText":"修改密码","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white"}},{"path":"/pages/addCommodity/addCommodity","meta":{},"window":{"navigationBarTitleText":"新增商品","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/commodityManagement/commodityManagement","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/productName/productName","meta":{},"window":{"navigationBarTitleText":"选择商品名称","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/colors/colors","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/editColor/editColor","meta":{},"window":{"navigationBarTitleText":"编辑商品颜色","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/addColor/addColor","meta":{},"window":{"navigationBarTitleText":"新增商品颜色","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/sizes/sizes","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/category/category","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/addCategory/addCategory","meta":{},"window":{"navigationBarTitleText":"新增分类","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/supplier/supplier","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/addSupplier/addSupplier","meta":{},"window":{"navigationBarTitleText":"新增供应商","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/supplierDetails/supplierDetails","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/editSupplier/editSupplier","meta":{},"window":{"navigationBarTitleText":"编辑供应商","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/chooseSupplier/chooseSupplier","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/trademark/trademark","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/addTrademark/addTrademark","meta":{},"window":{"navigationBarTitleText":"新增品牌","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/unitList/unitList","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/addUnitList/addUnitList","meta":{},"window":{"navigationBarTitleText":"新增单位","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/barcode/barcode","meta":{},"window":{"navigationBarTitleText":"单品条码","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/commodityDetails/commodityDetails","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/editCommodity/editCommodity","meta":{},"window":{"navigationBarTitleText":"编辑商品","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/purchaseStorage/purchaseStorage","meta":{},"window":{"navigationBarTitleText":"采购入库","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/selectAccount/selectAccount","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/selectProducts/selectProducts","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/libraryHistory/libraryHistory","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/purchaseStorageHistory/purchaseStorageHistory","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/storageHistory/storageHistory","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/cancellation/cancellation","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/refer/refer","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/salesReturnHistory/salesReturnHistory","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/addReturn/addReturn","meta":{},"window":{"navigationBarTitleText":"采购退货","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/returnedGoodsHistory/returnedGoodsHistory","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/haveToReturn/haveToReturn","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/haveBeenCancelled/haveBeenCancelled","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/allocate/allocate","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/addCheck/addCheck","meta":{},"window":{"navigationBarTitleText":"盘点单","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/checkSubmenu/checkSubmenu","meta":{},"window":{"navigationBarTitleText":"盘点单","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/inventoryPreview/inventoryPreview","meta":{},"window":{"navigationBarTitleText":"盘点预览","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/stockTaking/stockTaking","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/drafCheck/drafCheck","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/stopCheck/stopCheck","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/checkCancellation/checkCancellation","meta":{},"window":{"navigationBarTitleText":"库存盘点","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/addAllocate/addAllocate","meta":{},"window":{"navigationBarTitleText":"库存调拨","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/stopAllocate/stopAllocate","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/draftAllocate/draftAllocate","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/callIn/callIn","meta":{},"window":{"navigationBarTitleText":"库存调拨","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/cancellationAllocate/cancellationAllocate","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/expense/expense","meta":{},"window":{"navigationBarTitleText":"记一笔支出","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/article/article","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/addArticle/addArticle","meta":{},"window":{"navigationBarTitleText":"新增支出项目","navigationBarBackgroundColor":"#2979ff","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/selecSalesperson/selecSalesperson","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}},{"path":"/pages/expenseBook/expenseBook","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","scrollIndicator":"none"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
