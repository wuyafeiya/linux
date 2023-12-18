import { defineStore } from 'pinia'
import { reactive } from 'vue'
function generateUniqueNumber() {
  return Date.now() + Math.random();
}
export const useStore = defineStore('storeId', () => {
  const tableData = reactive([
    {
      id: generateUniqueNumber(),
      date: 'INPUT',
      name: 'TCP',
      oldIP: '192.168.1.1',
      newIP: '192.168.1.2',
      oldPort: 80,
      newPort: 443,
      action: 'ACCEPT'
    },
    {
      id: generateUniqueNumber(),
      date: 'INPUT',
      name: 'TCP',
      oldIP: '192.168.1.3',
      newIP: '192.168.1.4',
      oldPort: 81,
      newPort: 111,
      action: 'ACCEPT'
    },
    {
      id: generateUniqueNumber(),
      date: 'INPUT',
      name: 'TCP',
      oldIP: '192.168.1.5',
      newIP: '192.168.1.6',
      oldPort: 100,
      newPort: 101,
      action: 'ACCEPT'
    },
    {
      id: generateUniqueNumber(),
      date: 'INPUT',
      name: 'TCP',
      oldIP: '192.168.1.7',
      newIP: '192.168.1.8',
      oldPort: 102,
      newPort: 103,
      action: 'ACCEPT'
    },
    {
      id: generateUniqueNumber(),
      date: 'INPUT',
      name: 'TCP',
      oldIP: '192.168.1.9',
      newIP: '192.168.1.10',
      oldPort: 88,
      newPort: 443,
      action: 'ACCEPT'
    },
  ])
  const addData = (data) => {
    tableData.push(data)
  }
  const changeData = (data) => {
    console.log(data)
    let index = tableData.findIndex(item => item.id === data.id); // 假设每个项都有一个唯一的 id 属性
    if (index !== -1) {
      tableData[index] = Object.assign({}, tableData[index], data);
    }
  }
  const deleteData=()=>{
    tableData.splice(0, tableData.length)
  }
  return { tableData, addData, changeData,deleteData }
})
