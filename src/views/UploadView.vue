<script setup lang='ts'>
import LoginInput from '@/components/LoginInput.vue'
import UploadFile from '@/components/UploadFile.vue'
import FileTable from '@/components/FileTable.vue'
import { ref } from 'vue'

const uploadVisible = ref(false)
</script>

<template>
  <el-button @click='uploadVisible = true'>Upload</el-button>
  <FileTable />

  <el-dialog
    v-model='uploadVisible'
    title='Upload'
    width='30%'
  >
    <UploadFile />
    <template #footer>
      <span class='dialog-footer'>
        <el-button @click='uploadVisible = false'>Cancel</el-button>
        <el-button type='primary' @click='uploadVisible = false'>
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>