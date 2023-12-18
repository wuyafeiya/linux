<script setup lang="ts">
import { reactive } from 'vue'
import { ElNotification } from 'element-plus'
import { useStore } from '../store/index'

const store = useStore()

function generateUniqueNumber() {
  return Date.now() + Math.random()
}
const form = reactive({
  id: generateUniqueNumber,
  name: '',
  oldIP: '',
  newIP: '',
  oldPort: '',
  newPort: '',
  date: 'OUTPUT',
  action: 'ACCEPT',
})
function submit() {
  ElNotification({
    title: '成功',
    message: '添加成功',
    type: 'success',
  })
  store.addData(form)
}
</script>

<template>
  <div class="addTable">
    <h1>添加规则</h1>
    <table style="  border-collapse: collapse;width: 100%;">
      <tr>
        <td style="width: 200px">
          链名:
        </td>
        <td>
          <el-radio v-model="form.date" label="OUTPUT">
            OUTPUT
          </el-radio>
        </td>
        <td>
          <el-radio v-model="form.date" label="INPUT">
            INPUT
          </el-radio>
        </td>
      </tr>
      <tr>
        <td>协议类型:</td>
        <td colspan="2">
          <div style="display: flex;">
            <div style="width: 80px;" />
            <el-input v-model="form.name" placeholder="例:TCP UDP" clearable style="width: 200px;" />
          </div>
        </td>
      </tr>
      <tr>
        <td>IP地址: </td>
        <td>
          <div style="display: flex;">
            <div style="width: 80px;">
              源IP:
            </div>
            <el-input v-model="form.oldIP" placeholder="192.168.x.x" clearable style="width: 200px;" />
          </div>
        </td>
        <td>
          <div style="display: flex;">
            <div style="width: 80px;">
              目的IP:
            </div>
            <el-input v-model="form.newIP" placeholder="192.168.x.x" clearable style="width: 200px;" />
          </div>
        </td>
      </tr>
      <tr>
        <td>端口号: </td>
        <td>
          <div style="display: flex;">
            <div style="width: 80px;">
              源端口:
            </div>
            <el-input v-model="form.oldPort" placeholder="80" clearable style="width: 200px;" />
          </div>
        </td>
        <td>
          <div style="display: flex;">
            <div style="width: 80px;">
              目的端口:
            </div>
            <el-input v-model="form.newPort" placeholder="443" clearable style="width: 200px;" />
          </div>
        </td>
      </tr>
      <tr>
        <td>动作: </td>
        <td>
          <el-radio v-model="form.action" label="ACCEPT">
            ACCEPT
          </el-radio>
        </td>
        <td>
          <el-radio v-model="form.action" label="DROP">
            DROP
          </el-radio>
        </td>
      </tr>
    </table>
    <el-button type="primary" style="margin-top: 10px;" @click="submit">
      添加
    </el-button>
  </div>
</template>

<style>
.addTable {
  /* width: 100%; */
  flex: 1;
}

td,
th {
  border: 1px solid #6D6D6D;
  height: 50px;
  /* 设置单元格的边框样式 */
}
</style>
