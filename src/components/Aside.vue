<template>
	 <el-menu
	        default-active="2"
	        class="el-menu-vertical-demo"
	        @open="handleOpen"
	        @close="handleClose"
			style="height: 600px;" >
	       
			<el-menu-item  v-for="(r,i) in myRoutes" :index="i" >
				<router-link :to="r.path">
					{{r.name}}
				</router-link>	
			</el-menu-item>
	
	
	      </el-menu>
</template>

<script setup>
//导入
import {ref,onBeforeMount} from 'vue'
import { useRouter }from  'vue-router'
const router=useRouter()


//存登录的管理员信息
const sys=ref()
//存储筛选的侧边栏导航路由信息
const myRoutes=ref()


onBeforeMount(()=>{
	//从sessionStorage获取登录后存储的用户信息
	sys.value=JSON.parse(sessionStorage.getItem("sys"))
	//筛选路由
	myRoutes.value=router.options.routes[1].children.filter(r=>r.role==sys.value.role)
	
	
	console.log(sys.value.role)
	console.log(myRoutes)
	
})

	
	
</script>

<style>

</style>