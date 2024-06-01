<template>
  <el-button :icon='RefreshRight' @click='updateTableData' :loading='isFetching'>
    刷新
  </el-button>
  <el-table :data='tableData'
            stripe
            :default-sort="{prop:'name', order: 'descending'}">
    <el-table-column prop='name' label='Name' sortable />
    <el-table-column label='Size' sortable width='180' :formatter='sizeFormatter' prop='size' />
    <el-table-column label='Date' sortable width='180' :formatter='dateFormatter' prop='mod_time' />
    <el-table-column width='280'>
      <template #default='scope'>
        <el-button
          size='small'
          type='primary'
          @click='handleDownload(scope.$index, scope.row)'
        >
          Download
        </el-button>
        <el-button
          size='small'
          type='danger'
          @click='handleDelete(scope.$index, scope.row)'
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang='ts' setup>
import bytes from 'bytes'
import { deleteFile, getFileList } from '@/service/FileSerivce'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { RefreshRight } from '@element-plus/icons-vue'
import { ElMessage, type TableColumnCtx } from 'element-plus'

interface File {
  name: string
  size: number
  mod_time: number
}

const tableData: Ref<File[]> = ref<File[]>([])
const isFetching = ref<boolean>(false)

const updateTableData = () => {
  isFetching.value = true

  getFileList()
    .then(
      resp => {
        tableData.value = resp.data.data
      },
      reason => {
        if (reason != null) {
          ElMessage.error(reason)
        }
        tableData.value = []
      },
    )
    .finally(() => {
      isFetching.value = false
    })
}

const handleDownload = (index: number, row: File) => {
  console.log(`downloading file ${row.name} at index ${index}`)
}

const handleDelete = (index: number, row: File) => {
  console.log(`deleting file ${row.name} at index ${index}`)
  deleteFile(row.name)
    .then(
      response => {
        if (response.data.code == 200) {
          ElMessage.success('删除成功')
          updateTableData()
        }
      },
      reason => {
        ElMessage.error(reason)
      },
    )
}

const sizeFormatter = (row: any, column: TableColumnCtx<any>, cellValue: any, index: number) => {
  return bytes.format(cellValue)
}

const dateFormatter = (row: any, column: TableColumnCtx<any>, cellValue: any, index: number) => {
  return new Date(cellValue * 1000).toLocaleString()
}

onMounted(() => {
  updateTableData()
})
</script>

<style scoped>
el-table {
}
</style>