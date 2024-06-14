//站点的路由文件，写完后需要在main.js中导入、引用
import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'


//路由规则
//重点重点
const myRoutes = [
	{
		path: "/",
		redirect: "/home"
	},
	{
		path: "/login",  // 登录
		name: "Login",
		component: defineAsyncComponent(() => import(`../views/Login.vue`))
	},
	{
		path: "/register",  // 注册
		name: "Register",
		component: defineAsyncComponent(() => import(`../views/Register.vue`))
	},
	{
		path: "/home",  // 首页
		name: "Home",
		component: defineAsyncComponent(() => import(`../views/Home.vue`))
	},
	{
		path: "/my",  // 个人信息
		name: "MyInfo",
		component: defineAsyncComponent(() => import(`../views/MyInfo.vue`))
	},
	{
		path: "/accountmanage",  // 账户管理
		component: defineAsyncComponent(() => import(`../views/AccountManage.vue`))
	},
	{
		path: "/transfer",  // 转账
		name: "Transfer",
		component: defineAsyncComponent(() => import(`../views/Transfer.vue`)),
	},
	{
		path: "/trandetail",  // 转账详情
		name: "TransferDetail",
		component: defineAsyncComponent(() => import(`../views/TransferDetail.vue`))
	},
	{
		path: "/tranresult",  // 转账结果
		name: "TransferResult",
		component: defineAsyncComponent(() => import(`../views/OpResult.vue`))
	},
	{
		path: "/trancommit",  // 转账确认
		name: "TransferCommit",
		component: defineAsyncComponent(() => import(`../views/TransferCommit.vue`))
	},
	{
		path: "/tranout",  // 对外转账
		name: "TransferOut",
		component: defineAsyncComponent(() => import(`../views/TransferOut.vue`))
	},
	{
		path: "/tranoutcommit",  // 对外转账确认
		name: "TransferOutCommit",
		component: defineAsyncComponent(() => import(`../views/TranOutCommit.vue`))
	},
	{
		path: "/traninner",  // 账户间互转
		name: "TransferInner",
		component: defineAsyncComponent(() => import(`../views/Inner.vue`))
	},
	{
		path: "/transrecord",  // 转账记录
		name: "TransRecord",
		component: defineAsyncComponent(() => import(`../views/TransRecord.vue`))
	},
	{
		path: "/recorddetail",  // 转账记录详情
		name: "TransferRecordDetail",
		component: defineAsyncComponent(() => import(`../views/RecordDetail.vue`))
	},
	{
		path: "/saving",  // 存款
		name: "Saving",
		role: 1,
		component: defineAsyncComponent(() => import(`../views/Saving.vue`))
	},
	{
		path: "/payment",  // 付款
		name: "Payment",
		role: 1,
		component: defineAsyncComponent(() => import(`../views/Payment.vue`))
	},
	{
		path: "/paycommit",  // 付款确认
		name: "PayCommit",
		role: 1,
		component: defineAsyncComponent(() => import(`../views/PaymentCommit.vue`))
	}
]

//创建路由对象
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: myRoutes
})


//前置导航守卫
router.beforeEach(async (to, from) => {
	console.log(to);
	let isAuthenticated = sessionStorage.getItem("token") != null
		&& sessionStorage.getItem("token") != "" ? true : false;

	// 判断是否已登录，没登陆去login界面
	if (!isAuthenticated && to.name !== 'Login' && to.path !== '/register') {
		// 将用户重定向到登录页面
		return { name: 'Login' };
	}

	// 判断是否已登录，已登陆不允许去login界面，跳转到首页
	if (isAuthenticated && to.name === 'Login') {
		// 将用户重定向到首页
		return { name: 'Home' };
	}
})


export default router
