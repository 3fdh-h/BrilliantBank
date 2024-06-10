//站点的路由文件，写完后需要在main.js中导入、引用
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'


//路由规则
//重点重点
const myRoutes = [
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
		component: defineAsyncComponent(() => import(`../views/Transfer.vue`))
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
		path: "/trancommit",
		name: "TransferCommit",
		component: defineAsyncComponent(() => import(`../views/TransferCommit.vue`))
	},
	{
		path: "/addpartner",  // 添加转账伙伴
		name: "AddPartner",
		component: defineAsyncComponent(() => import(`../views/AddPartner.vue`))
	},
	// {
	// 	path: "/inner",  // 账户间互转
	// 	name: "Inner",
	// 	component: defineAsyncComponent(() => import(`../views/Inner.vue`))
	// },
	{
		path: "/transrecord",  // 转账记录
		name: "TransRecord",
		component: defineAsyncComponent(() => import(`../views/TransRecord.vue`))
	},
	{
		path: "/saving",  // 存款
		name: "Saving",
		role: 1,
		component: defineAsyncComponent(() => import(`../components/Saving.vue`))
	},
	{
		path: "/pay",  // 付款
		name: "Payment",
		role: 1,
		component: defineAsyncComponent(() => import(`../components/Payment.vue`))
	}
]

//创建路由对象
const router = createRouter({
	history: createWebHistory(),
	routes: myRoutes
})


//前置导航守卫
// router.beforeEach(async (to, from) => {
//    console.log(to)
//    let isAuthenticated=sessionStorage.getItem("token")!=null
// 						&&sessionStorage.getItem("token")!=""?true:false;

//    //判断是否已登录，没登陆去login界面
//    // 检查用户是否已登录 && ❗️ 避免无限重定向
//    //if (  !isAuthenticated && to.path !== '/login?aaa')
//    if (!isAuthenticated && to.name !== 'Login') {
//      // 将用户重定向到登录页面
//      return { name: 'Login' }
//    }

//    //判断是否已登录，已登陆不允许去login界面，跳转到首页
//    if (isAuthenticated && to.name == 'Login') {
//      // 将用户重定向到登录页面
//      return { name: 'Home' }
//    }
//  })


export default router
