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
    <el-button class='ml-3' type='success' @click='submitUpload'>
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
import { genFileId } from 'element-plus'
import type { UploadRequestOptions } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import axios from 'axios'

const upload = ref<UploadInstance>()

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

  axios({
    baseURL: 'http://127.0.0.1:8080/',
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
}

const submitUpload = () => {
  upload.value!.submit()
}
</script>

<style scoped>

</style>