<script setup lang="ts">
import { computed } from 'vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

const store = useStore()

const router = useRouter()

const Sidebar = [{
  title: '设置',
  icon: 'https://api.iconify.design/material-symbols:settings.svg',
  options: [{ title: '添加', path: '/add' }, { title: '删除', path: '/delete' }, { title: '替换', path: '/update' }, { title: '插入', path: '/query' }],
}, {
  title: '高级',
  icon: 'https://api.iconify.design/eos-icons:multistate.svg',
  options: [{ title: '状态机制', path: '/state' }],
}, {
  title: '操作',
  options: [{
    title: '关闭防火墙',
  }, {
    title: '启动防火墙',
  }, {
    title: '重启防火墙',
  }, {
    title: '清空所有规则',
  }],
}]
function handleClick(val) {
  if (val === '清空所有规则')
    store.deleteData()
  ElNotification({
    title: '成功',
    message: `${val}成功}`,
    type: 'success',
  })
}

const defaultOpeneds = computed(() => {
  return Sidebar.map((_, index) => `${index + 1}`)
})
function to(menu, row) {
  if (menu.title === '操作')
    handleClick(row.title)
  else
    router.push(row.path)
}
function close() {
  ElMessageBox.confirm(
    '是否要退出登陆?',
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
        message: '退出成功!',
      })
      document.cookie = 'login=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
      router.push('/login')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消登陆',
      })
    })
}
</script>

<template>
  <div class="container">
    <section class="Sidebar">
      <el-menu
        :default-openeds="defaultOpeneds" background-color="transparent" text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-sub-menu v-for="(menu, index) in Sidebar" :key="index" :index="`${index + 1}`">
          <template #title>
            <el-icon v-if="menu.title === '设置'">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.013 2.475T12.05 15.5"
                />
              </svg>
            </el-icon>
            <el-icon v-else-if="menu.title === '高级'">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 22q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-8-3v-2h2v-7q0-2.075 1.25-3.687T10.5 4.2V2h3v1.825q-.275.55-.4 1.125T13 6.125q-.25-.05-.488-.088T12 6q-1.65 0-2.825 1.175T8 10v7h8v-6.425q.45.2.963.313T18 11v6h2v2zM18 9q-1.25 0-2.125-.875T15 6q0-1.25.875-2.125T18 3q1.25 0 2.125.875T21 6q0 1.25-.875 2.125T18 9"
                />
              </svg>
            </el-icon>
            <el-icon v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="m13.75 10.19l.63.13l4.17 2.08c.7.23 1.16.92 1.1 1.66v.26l-.9 6.12c-.06.43-.25.83-.6 1.11c-.31.3-.72.45-1.15.45h-6.88c-.49 0-.94-.18-1.27-.53L2.86 15.5l.9-1c.24-.25.62-.39.98-.37h.29L9 15V4.5a2 2 0 0 1 2-2a2 2 0 0 1 2 2v5.69z"
                />
              </svg>
            </el-icon>
            <span>{{ menu.title }}</span>
          </template>
          <el-menu-item
            v-for="(item, itemIndex) in menu.options" :key="itemIndex" :index="`${index + 1}-${itemIndex + 1}`"
            @click="to(menu, item)"
          >
            {{ item.title }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </section>
    <div style="width: 100%;">
      <div style="text-align: center;margin-bottom: 30px;">
        <h1>LINUX-防火墙设置</h1>
        <div style="color: aqua;">
          IPTABLES配置文件 IPTABLES规则链
        </div>
      </div>
      <div style="border: 1px solid #818181;padding: 10px;">
        <router-view />
      </div>
    </div>
    <div class="close" @click="close">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19.5 10.925L18.1 12.3q-.275.275-.687.288T16.7 12.3q-.275-.275-.275-.7t.275-.7l1.375-1.4L16.7 8.125q-.275-.275-.275-.687t.275-.713q.3-.3.713-.3t.712.3L19.5 8.1l1.375-1.4q.275-.3.687-.3t.713.3q.3.3.3.713t-.3.712L20.9 9.5l1.4 1.4q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288zM9 12q-1.65 0-2.825-1.175T5 8q0-1.65 1.175-2.825T9 4q1.65 0 2.825 1.175T13 8q0 1.65-1.175 2.825T9 12m-8 6v-.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2v.8q0 .825-.587 1.413T15 20H3q-.825 0-1.412-.587T1 18m2 0h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T9 15q-1.4 0-2.775.338T3.5 16.35q-.225.125-.363.35T3 17.2zm6-8q.825 0 1.413-.587T11 8q0-.825-.587-1.412T9 6q-.825 0-1.412.588T7 8q0 .825.588 1.413T9 10m0 8"
        />
      </svg>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  gap: 10px;
  overflow: hidden;
  position: relative;
}

.close {
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 30px;
}

.Sidebar {
  min-width: 160px;
  /* height: 100%; */
  height: 100vh;
  margin-right: 10px;
  border-right: 1px solid #fff;
  /* background: red; */
  /* background: #818181; */
  /* padding: 30px 20px; */
}

.el-menu {
  border: none;
}

.line {
  width: 170px;
  height: 2px;
  background: #BEBEBE;
  margin-top: 20px;
}
</style>
