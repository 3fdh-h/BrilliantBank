<template>
<el-row>
	<el-col :span="1"></el-col>
	<el-col :span="4">
		<el-input v-model="kw"></el-input>
		
	</el-col>
	<el-col :span="2">
		<el-button type="danger" @click="handleCurrentChange(1)">搜索</el-button>
	</el-col>
	<el-col :span="14"></el-col>
	<el-col :span="1">
		<el-button type="danger" >注册用户</el-button>
	</el-col>
	<el-col :span="2"></el-col>
</el-row> 


<el-row class="h-20"></el-row>

<el-row>
	<el-col :span="1"></el-col>
	<el-col :span="22">
		<!-- table  数据 -->
		 <el-table :data="page.records" border style="width: 100%">
		    <el-table-column prop="id" label="编号" width="80" />
		    <el-table-column prop="realname" label="姓名" width="100" />
		    <el-table-column prop="sex" label="性别" />
			<el-table-column prop="birthday" label="出生日期" />
			<el-table-column prop="telephone" label="电话" />
			<el-table-column prop="mail" label="邮箱" />
			<el-table-column prop="address" label="地址" />
			<el-table-column fixed="right" label="操作" width="180">
			    <template #default>
			        <el-button  type="danger" size="small">
			          编辑
			        </el-button>
			        <el-button  type="primary" size="small">删除</el-button>
			      </template>
			</el-table-column>
		  </el-table>
		
	</el-col>
	<el-col :span="1"></el-col>	
</el-row>
<el-row class="h-20"></el-row>
 <el-row>
 	<el-col :span="1"></el-col>
 	<el-col :span="22">
 		<!-- 分页控件 -->
 		<el-pagination background   layout="prev, pager, next"
			:page-size="page.size"		   
		    :total="page.total"
			:current-page="page.current"
			 @current-change="handleCurrentChange" />

		
 	</el-col>
 	<el-col :span="1"></el-col>	
 </el-row>
 

</template>

<script setup>
//导入
import { ref,onBeforeMount} from 'vue'
import { getPersonPageApi} from '../utils/requestApi'; 
import { ElMessage } from 'element-plus'	

//data
//存放分页数据
let page=ref({})
//存放搜索关键字
let kw=ref('')

//生命周  钩子函数
onBeforeMount(async()=>{
	//打开组件时加载数据
	loadData();
})


//自定义函数

//获取用户分页数据
const loadData=(pn=1,ps=2,kw=null)=>{
	//调用web请求
	getPersonPageApi(pn,ps,kw)
	//回调函数
	.then(response=>{
		//取数据放入page对象
		page.value=response.data.data
		console.log(page.value)
	})
	
}

//分页获取数据
//函数名自定义(参数一个数值)
const handleCurrentChange=(n)=>{
	loadData(n,2,kw.value==''?null:kw.value)
}

</script>

<style>
	.h-20{
		height: 20px;
	}
</style>