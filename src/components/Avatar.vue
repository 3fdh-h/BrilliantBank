<template>
    <el-upload class="avatar-uploader" action="
https://mock.apipark.cn/m1/4606329-4256023-default/user/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {ElMessage} from "element-plus"
import type { UploadProps } from "element-plus";

const imageUrl = ref("");

const handleAvatarSuccess: UploadProps["onSuccess"] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
    if (rawFile.type !== "image/jpeg") {
        ElMessage.error("图像必须为JPG格式");
        return false;
    } else if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error("图像大小不能超过5MB");
        return false;
    }
    return true;
};
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 25vw;
    height: 25vw;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 25vw;
    height: 25vw;
    text-align: center;
}
</style>
