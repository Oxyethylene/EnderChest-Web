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
  <el-progress :text-inside='true' :stroke-width='26' :percentage='progress' />
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { ElMessage, genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { uploadFile } from '@/service/FileSerivce'

const upload = ref<UploadInstance>()
const isUploading = ref<boolean>(false)
const progress = ref<number>(0)

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
  progress.value = 0
}

const doUpload = (options: UploadRequestOptions) => {
  const { file } = options
  isUploading.value = true
  progress.value = 0
  uploadFile(file)
    .catch((reason) => {
      ElMessage.error(reason)
    })
    .finally(() => {
      isUploading.value = false
    })
  progress.value = 100
}

const submitUpload = () => {
  upload.value!.submit()
}
</script>

<style scoped>
el-upload {
  width: 300px;
}

el-progress {
  width: 200px;
}
</style>