<template>
    <el-row style="height:100%; witdth:100%; background-color: #ffd100; display:flex">
        <el-col :span="1"></el-col>
        <el-col :span="7">
            <el-icon>
                <Location />
            </el-icon>
            <span>武汉市 </span>
            <el-icon>
                <ArrowDown />
            </el-icon>
        </el-col>
        <el-col :span="15">
            <el-input class="search-border" placeholder="搜索交易记录">
                <template #suffix>
                    <!-- TODO 后续如果加搜索功能需要添加事件 -->
                    <el-icon style="font-size: 4vw;">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </el-col>
    </el-row>
</template>

<script setup>
</script>

<style scoped>
.el-row {
    height: 100%;
    width: 100%;
    background-color: #ffd100;
    display: flex;
}
.el-col {
    display: flex;
    align-items: center;
    font-size: 4vw;
}
.search-border {
    border-radius: 10px;
}
.el-icon {
    font-size: 6vw;
    color: rgb(109, 105, 105);
    display: flex;
    flex-direction: column;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100%;
}
</style>