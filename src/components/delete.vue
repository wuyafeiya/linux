<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '../store/index'

const store = useStore()
const tableData = store.tableData
function deletes(row) {
  ElMessageBox.confirm(
    '是否要删除当前规则?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功!',
      })
      const index = tableData.findIndex(item => item.newIP === row.newIP)
      if (index !== -1)
        tableData.splice(index, 1)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
</script>

<template>
  <el-table :data="tableData" border style="width: 100%;">
    <el-table-column prop="date" label="链名" />
    <el-table-column prop="name" label="协议类型" />
    <el-table-column prop="oldIP" label="源IP地址" />
    <el-table-column prop="newIP" label="目的IP地址" />
    <el-table-column prop="oldPort" label="源端口" />
    <el-table-column prop="newPort" label="目的端口" />
    <el-table-column prop="action" label="动作" />
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button type="danger" @click="deletes(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
.el-table {
    background-color: transparent !important; /* 设置表格背景为透明 */
    color: #fff;
}

.el-table .el-table__row,
.el-table .el-table__cell {
    background-color: transparent !important; /* 设置行和单元格背景为透明 */
    border-color: #fff;
}
</style>
