<template>
<!-- 轮播图组件 -->
  <div class="slider-border">
    <el-carousel height="40vw" motion-blur class="rounded-carousel">
      <el-carousel-item v-for="item in images" :key="item.src">
        <img :src="item.src" :alt="item.alt" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const images = ref([
    {src: new URL("../assets/images/banner-1.jpg", import.meta.url), alt: "banner-1"},
    {src: new URL("../assets/images/banner-2.jpg", import.meta.url), alt: "banner-2"},
    {src: new URL("../assets/images/banner-3.jpg", import.meta.url), alt: "banner-3"},
    {src: new URL("../assets/images/banner-4.jpg", import.meta.url), alt: "banner-4"}
])
</script>

<style scoped>
.el-carousel__item img {
  width: 100%;
  height: auto;
}
.rounded-carousel {
  border-radius: 20px;
}
</style>
