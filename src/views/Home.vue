<template>
	<el-container>
		<el-header class="w-100">
			<MyHeader></MyHeader>	
		</el-header>	
		 <el-container>
		        <el-aside width="200px">
					<MySide></MySide>
				</el-aside>
		        <el-main>
					<router-view></router-view>
				</el-main>
		</el-container>
	</el-container>
		
</template>

<script setup>
import MyHeader from '../components/Header.vue'	
import MySide from '../components/Aside.vue'
</script>

<style>
	.w-100{
		width: 100%;
		
	}
	.h-600{
		height: 600px;
	}
</style>