//站点的路由文件，写完后需要在main.js中导入、引用
import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import { defineAsyncComponent } from 'vue'


//路由规则
//重点重点
const myRoutes=[
	{
		path:"/login",
		name:"Login",
		component: defineAsyncComponent(() => import(`../views/Login.vue`))
	},
	{
		path:"/home",
		name:"Home",
		component: defineAsyncComponent(() => import(`../views/Home.vue`)),
		children:[
			{
				path:"/personinfo",
				name:"PersonInfo",
				role:1,
				component: defineAsyncComponent(() => import(`../components/Person.vue`)),
			},
			{
				path:"/accut",
				name:"Account",
				role:1,
				component: defineAsyncComponent(() => import(`../components/Account.vue`)),
			},
			{
				path:"/dictype",
				name:"DicType",
				role:0,
				component: defineAsyncComponent(() => import(`../components/DicType.vue`)),
			},
			{
				path:"/trecord",
				name:"TransRecord",
				role:1,
				component: defineAsyncComponent(() => import(`../components/TransRecord.vue`)),
			},
		]
	}
		
]

//创建路由对象
const router=createRouter({
	history:createWebHistory(),
	routes:myRoutes
})


//前置导航守卫
router.beforeEach(async (to, from) => {
   console.log(to)
   let isAuthenticated=sessionStorage.getItem("token")!=null
						&&sessionStorage.getItem("token")!=""?true:false;
   
   //判断是否已登录，没登陆去login界面
   // 检查用户是否已登录 && ❗️ 避免无限重定向
   //if (  !isAuthenticated && to.path !== '/login?aaa')
   if (!isAuthenticated && to.name !== 'Login') {
     // 将用户重定向到登录页面
     return { name: 'Login' }
   }
   
   //判断是否已登录，已登陆不允许去login界面，跳转到首页
   if (isAuthenticated && to.name == 'Login') {
     // 将用户重定向到登录页面
     return { name: 'Home' }
   }
 })


export default router
