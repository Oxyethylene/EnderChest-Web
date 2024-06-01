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
  <el-text>{{ uploadSpeed }}</el-text>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { ElMessage, genFileId, type UploadRequestHandler } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { uploadFile } from '@/service/FileSerivce'
import type { AxiosProgressEvent } from 'axios'
import bytes from 'bytes'

const upload = ref<UploadInstance>()
const isUploading = ref<boolean>(false)
const progress = ref<number>(0)
const uploadSpeed = ref<string>('- Bytes/s')

let lastProgressUpdateTime: number
let lastBytesUploaded: number


const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
  progress.value = 0
}

const doUpload: UploadRequestHandler = (options: UploadRequestOptions) => {
  const { file } = options
  isUploading.value = true
  progress.value = 0
  uploadSpeed.value = '- Bytes/s'
  lastProgressUpdateTime = Date.now()
  lastBytesUploaded = 0
  return uploadFile(file, handleProgress)
    .catch((reason) => {
      console.error(reason)
      ElMessage.error(reason)
    })
    .finally(() => {
      isUploading.value = false
    })
}

const handleProgress = (event: AxiosProgressEvent) => {
  let currentTime = Date.now()
  let timeDurationSecond = (currentTime - lastProgressUpdateTime) / 1000
  let bytesDelta = event.loaded - lastBytesUploaded
  uploadSpeed.value = bytes.format(bytesDelta / timeDurationSecond) + '/s'
  progress.value = Math.round(event.loaded / event.total! * 10000) / 100
  lastProgressUpdateTime = currentTime
  lastBytesUploaded = event.loaded
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