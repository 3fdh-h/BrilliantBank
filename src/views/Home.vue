<template>
    <div>
        <el-container style="padding:0">
            <el-header style="padding:0;margin:0">
                <MyHeader></MyHeader>
            </el-header>
            <el-main style="padding:0">
                <LogoVue></LogoVue>
                <el-row></el-row>
                <FuncArea></FuncArea>
                <Slider></Slider>
                <router-view></router-view>
                <!-- TODO 还需要其他东西来填充此块区域 -->
            </el-main>
            <el-footer>
                <FootMenu></FootMenu>
            </el-footer>
        </el-container>
    </div>

</template>

<script setup>
import MyHeader from "../components/Header.vue";
import MySide from "../components/Aside.vue";
import FootMenu from "../components/Footer.vue";
import LogoVue from "../components/Logo.vue";
import FuncArea from "../components/FuncArea.vue";
import Slider from "../components/Slider.vue";
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
}

.el-footer {
    padding: 0;
}
</style>