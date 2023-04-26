<template>
  <el-table :data='tableData' stripe style='width: 100%'>
    <el-table-column prop='name' label='Name' />
    <el-table-column label='Size' width='180' :formatter='sizeFormatter' prop='size' />
    <el-table-column label='Date' width='180' :formatter='dateFormatter' prop='mod_time' />
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
import axios from 'axios'
import { onMounted, ref, Ref } from 'vue'

interface File {
  name: string
  size: number
  mod_time: number
}

const tableData: Ref<File[]> = ref<File[]>([])

const updateTableData = () => {
  axios.get('http://127.0.0.1:8080/files')
    .then(resp => {
      console.log(resp)
      tableData.value = resp.data.data
    })
    .catch((reason) => {
      console.error(reason)
      tableData.value = []
    })
}

const handleDownload = (index: number, row: File) => {
  console.log(`downloading file ${row.name} at index ${index}`)
}

const handleDelete = (index: number, row: File) => {
  console.log(`deleting file ${row.name} at index ${index}`)
}

const sizeFormatter = (row: number, column: number, cellValue: number, index: number) => {
  return bytes.format(cellValue)
}

const dateFormatter = (row: number, column: number, cellValue: number, index: number) => {
  return new Date(cellValue * 1000).toLocaleString()
}

onMounted(() => {
  updateTableData()
})
</script>

<style scoped>

</style>