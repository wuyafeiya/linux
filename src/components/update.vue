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
        <el-button type="primary" @click="handleChange(scope.row)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="修改" width="30%">
    <el-form label-position="left" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
      <el-form-item label="链名">
        <el-input v-model="formLabelAlign.date" />
      </el-form-item>
      <el-form-item label="协议类型">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="源IP">
        <el-input v-model="formLabelAlign.oldIP" />
      </el-form-item>
      <el-form-item label="目的IP">
        <el-input v-model="formLabelAlign.newIP" />
      </el-form-item>
      <el-form-item label="源端口">
        <el-input v-model="formLabelAlign.oldPort" />
      </el-form-item>
      <el-form-item label="目的端口">
        <el-input v-model="formLabelAlign.newPort" />
      </el-form-item>
      <el-form-item label="动作">
        <el-input v-model="formLabelAlign.action" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveData">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useStore } from '../store/index'
const dialogVisible = ref(false)
const store = useStore()
const tableData = store.tableData
const handleChange = (row: any) => {
  dialogVisible.value = true
  Object.assign(formLabelAlign, row)  
}
const  saveData=()=>{
  dialogVisible.value=false 
  store.changeData(formLabelAlign)
}
const formLabelAlign = reactive({
  date:'',
  oldIP:'',
  newIP:'',
  oldPort:'',
  newPort:'',
  name: '',
  action: '',
})
</script>
<style>
.el-table {
  background-color: transparent !important;
  /* 设置表格背景为透明 */
  color: #fff;
}



.el-table .el-table__row,
.el-table .el-table__cell {
  background-color: transparent !important;
  /* 设置行和单元格背景为透明 */
  border-color: #fff;
}
</style>
