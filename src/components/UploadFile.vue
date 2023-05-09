<template>
  <el-upload
    ref='upload'
    class='upload-demo'
    drag
    :limit='1'
    :on-exceed='handleExceed'
    :auto-upload='false'
    :http-request='doUpload'
  >
    <template #trigger>
      <el-button type='primary'>select file</el-button>
    </template>
    <el-button class='ml-3'
               type='success'
               @click='submitUpload'
               :icon='UploadFilled'
               :loading='isUploading'>
      upload to server
    </el-button>
    <template #tip>
      <div class='el-upload__tip text-red'>
        limit 1 file, new file will cover the old file
      </div>
    </template>
  </el-upload>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { ElMessage, genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import axios from 'axios'

const upload = ref<UploadInstance>()
const isUploading = ref<boolean>(false)

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const doUpload = (options: UploadRequestOptions) => {
  const { file } = options
  const filename = file.name
  const formData = new FormData()
  formData.set('object', file)

  isUploading.value = true
  axios({
    baseURL: 'http://120.24.82.106/littlebox',
    url: '/file',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      objectName: filename,
    },
    data: formData,
  })
    .catch((reason) => {
      ElMessage.error(reason)
    })
    .finally(() => {
      isUploading.value = false
    })
}

const submitUpload = () => {
  upload.value!.submit()
}
</script>

<style scoped>

</style>