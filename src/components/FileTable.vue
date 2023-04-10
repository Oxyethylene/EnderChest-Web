<template>
  <el-table :data='tableData' stripe style='width: 100%'>
    <el-table-column prop='name' label='Name' />
    <el-table-column label='Size' width='180' :formatter='sizeFormatter' prop='size' />
    <el-table-column label='Date' width='180' :formatter='dateFormatter' prop='mod_time' />
    <el-table-column width='180'>
      <template #default='scope'>
        <el-button
          size='small'
          type='danger'
          @click='handleDelete(scope.$index, scope.row)'
        >
          Delete
        </el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang='ts' setup>
import bytes from 'bytes'

interface File {
  name: string
  size: number
  mod_time: number
}

const tableData: File[] = [
  {
    'name': 'a.txt',
    'size': 11,
    'mod_time': 1679079579
  },
  {
    'name': 'b.txt.go',
    'size': 13,
    'mod_time': 1679079579
  },
  {
    'name': 'bili-evelod.json',
    'size': 6826,
    'mod_time': 1681142151
  }
]

const handleDelete = (index: number, row: File) => {
  console.log(index, row)
}

const sizeFormatter = (row: number, column: number, cellValue: number, index: number) => {
  return bytes.format(cellValue)
}

const dateFormatter = (row: number, column: number, cellValue: number, index: number) => {
  return new Date(cellValue * 1000).toLocaleString()
}
</script>

<style scoped>

</style>